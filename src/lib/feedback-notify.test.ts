import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import net from "node:net";
import { closeDb } from "./db/sqlite";
import { saveMailConfig } from "./db/mail-config";
import { NOTIFY_SUBJECT, notifyNewFeedback, notifyText } from "./feedback-notify";
import { setLogWriter } from "./log";
import { createAccount, setRole } from "./db/accounts";
import type { ValidFeedback } from "./feedback";

/** Benachrichtigung des Betreibers bei neuer Rückmeldung (ToDo 17.9). */

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-notify-"));
  process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
  closeDb();
});

afterEach(() => {
  closeDb();
  delete process.env.WHEELEE_DB_PATH;
  fs.rmSync(folder, { recursive: true, force: true });
  for (const name of ["SMTP_HOST", "SMTP_FROM", "WHEELEE_PUBLIC_URL"]) delete process.env[name];
});

const meldung = (over: Partial<ValidFeedback> = {}): ValidFeedback => ({
  kind: "fehler",
  message: "Der Platz an der Hauptstraße ist weg.",
  contactEmail: null,
  spotId: null,
  city: null,
  url: null,
  userAgent: null,
  appVersion: null,
  deviceId: null,
  ...over,
});

/** Nimmt alles an und sammelt die Nachricht – wie in `mail.test.ts`. */
function fakeSmtp(): Promise<{ port: number; received: Promise<string>; close: () => void }> {
  return new Promise((resolve) => {
    let finish: (data: string) => void = () => {};
    const received = new Promise<string>((done) => {
      finish = done;
    });

    const server = net.createServer((socket) => {
      let data = "";
      let inData = false;
      socket.write("220 fake ESMTP\r\n");
      socket.on("data", (chunk) => {
        const text = chunk.toString("utf8");
        if (inData) {
          data += text;
          if (data.endsWith("\r\n.\r\n")) {
            inData = false;
            socket.write("250 queued\r\n");
            finish(data);
          }
          return;
        }
        for (const line of text.split("\r\n").filter(Boolean)) {
          const command = line.slice(0, 4).toUpperCase();
          if (command === "EHLO") socket.write("250-fake\r\n250 8BITMIME\r\n");
          else if (command === "DATA") {
            inData = true;
            socket.write("354 go\r\n");
          } else if (command === "QUIT") socket.end("221 bye\r\n");
          else socket.write("250 ok\r\n");
        }
      });
    });

    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address() as net.AddressInfo;
      resolve({ port, received, close: () => server.close() });
    });
  });
}

/**
 * Lehnt den Empfänger ab, wie ein echter Server bei unbekanntem Postfach
 * (ToDo 10.23). Gebraucht, weil der Fall „Server antwortet nicht" eine
 * Fehlermeldung **ohne** Adresse ergibt und die Zusage deshalb nicht prüft.
 */
function ablehnenderSmtp(adresse: string): Promise<{ port: number; close: () => void }> {
  return new Promise((resolve) => {
    const server = net.createServer((socket) => {
      socket.write("220 fake ESMTP\r\n");
      socket.on("data", (chunk) => {
        for (const line of chunk.toString("utf8").split("\r\n").filter(Boolean)) {
          const command = line.slice(0, 4).toUpperCase();
          if (command === "EHLO") socket.write("250-fake\r\n250 8BITMIME\r\n");
          else if (command === "RCPT")
            socket.write(`550 5.1.1 <${adresse}>: Recipient address rejected: User unknown\r\n`);
          else if (command === "QUIT") socket.end("221 bye\r\n");
          else socket.write("250 ok\r\n");
        }
      });
    });

    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address() as net.AddressInfo;
      resolve({ port, close: () => server.close() });
    });
  });
}

function konfiguriere(port: number, notifyEmail: string | null): void {
  saveMailConfig(
    {
      host: "127.0.0.1",
      port,
      secure: false,
      username: null,
      password: null,
      fromAddress: "wheelee <noreply@example.org>",
      publicUrl: "https://wheelee.example.org",
      enabled: true,
      provider: null,
      notifyEmail,
    },
    null,
  );
}

describe("Betreff", () => {
  it("heißt wie verabredet und hängt an der Art der Meldung", () => {
    // Fest und deutsch, damit sich die Mails im Postfach filtern lassen –
    // nicht je nach Oberflächensprache verschieden.
    expect(NOTIFY_SUBJECT.fehler).toBe("Wheelee Fehler");
    expect(NOTIFY_SUBJECT.vorschlag).toBe("Wheelee Verbesserungsvorschlag");
  });
});

describe("Inhalt", () => {
  it("enthält den Meldungstext und die Antwortadresse", () => {
    const text = notifyText(meldung({ contactEmail: "wer@example.org", city: "frankfurt" }));
    expect(text).toContain("Der Platz an der Hauptstraße ist weg.");
    expect(text).toContain("Antwort an: wer@example.org");
    expect(text).toContain("Stadt: frankfurt");
  });

  it("sagt ausdrücklich, wenn keine Antwort möglich ist", () => {
    // Sonst sähe eine Meldung ohne Adresse aus wie eine, bei der man die
    // Antwort nur vergessen hat.
    expect(notifyText(meldung())).toContain("keine angegeben");
  });
});

describe("Versand", () => {
  it("geht an die eingetragene Adresse", async () => {
    const server = await fakeSmtp();
    try {
      konfiguriere(server.port, "betreiber@example.org");
      await notifyNewFeedback(meldung({ kind: "vorschlag" }));

      const raw = await server.received;
      expect(raw).toContain("To: betreiber@example.org");
      expect(raw).toContain("Wheelee Verbesserungsvorschlag");
    } finally {
      server.close();
    }
  });

  /*
   * **Der Fall, der in der Wirklichkeit schiefging** (ToDo 17.11): Versand
   * eingerichtet, Feld leer – und es kam nichts an. Bis zum 2026-11-08 war
   * das so gewollt und genau deshalb falsch; jetzt gehen die Mails an die
   * Admin-Konten.
   */
  it("geht ohne eingetragene Adresse an die Admin-Konten", async () => {
    const server = await fakeSmtp();
    try {
      const admin = createAccount("chefin@example.org", "ein gutes langes Passwort");
      if (!admin) throw new Error("Konto wurde nicht angelegt");
      setRole(admin.id, "admin");
      konfiguriere(server.port, null);

      await notifyNewFeedback(meldung());
      const raw = await server.received;
      expect(raw).toContain("To: chefin@example.org");
      expect(raw).toContain("Wheelee Fehler");
    } finally {
      server.close();
    }
  });

  it("die eingetragene Adresse schlägt die Admin-Konten", async () => {
    const server = await fakeSmtp();
    try {
      const admin = createAccount("chefin@example.org", "ein gutes langes Passwort");
      if (!admin) throw new Error("Konto wurde nicht angelegt");
      setRole(admin.id, "admin");
      konfiguriere(server.port, "nur-hierhin@example.org");

      await notifyNewFeedback(meldung());
      const raw = await server.received;
      expect(raw).toContain("To: nur-hierhin@example.org");
      expect(raw).not.toContain("chefin@example.org");
    } finally {
      server.close();
    }
  });

  it("wirft nicht, wenn der Mailserver nicht antwortet", async () => {
    // Die Meldung ist da; ein kaputtes Postfach darf sie nicht gefährden.
    konfiguriere(1, "betreiber@example.org");
    await expect(notifyNewFeedback(meldung())).resolves.toBeUndefined();
  });

  /*
   * **Still heißt still gegenüber der meldenden Person, nicht gegenüber dem
   * Betreiber** (ToDo 17.10). Genau das fehlte: Am 2026-11-08 kam keine
   * Benachrichtigung an, und es gab nirgends eine Spur – die Suche begann
   * mit Raten. Jeder der drei Ausgänge hinterlässt jetzt eine Zeile.
   */
  describe("Protokoll", () => {
    const zeilen: string[] = [];

    beforeEach(() => {
      zeilen.length = 0;
      setLogWriter((line) => zeilen.push(line));
    });

    afterEach(() => {
      setLogWriter(null);
    });

    it("hält fest, dass keine Adresse eingetragen ist", async () => {
      konfiguriere(1, null);
      await notifyNewFeedback(meldung());
      expect(zeilen.join("\n")).toContain("keine_adresse");
    });

    it("hält den Fehlschlag fest – und nennt dabei keine Adresse", async () => {
      konfiguriere(1, "betreiber@example.org");
      await notifyNewFeedback(meldung());
      const text = zeilen.join("\n");
      expect(text).toContain("feedback_notify_failed");
      expect(text).not.toContain("betreiber@example.org");
    });

    /*
     * **Der Fall, den der Test darüber nicht abdeckte** (ToDo 10.23). „Server
     * antwortet nicht" ergibt `connect ECONNREFUSED 127.0.0.1:1` – eine
     * Meldung ohne Adresse. Lehnt der Server dagegen den Empfänger ab, steht
     * die Adresse in `error.message`, und bis zum 2026-11-09 stand sie damit
     * im Protokoll. Gemessen, nicht vermutet: siehe `smtpFehlerfelder`.
     */
    it("nennt auch bei abgelehntem Empfänger keine Adresse, aber den Grund", async () => {
      const server = await ablehnenderSmtp("betreiber@example.org");
      try {
        konfiguriere(server.port, "betreiber@example.org");
        await notifyNewFeedback(meldung());

        const text = zeilen.join("\n");
        expect(text).toContain("feedback_notify_failed");
        expect(text).not.toContain("betreiber@example.org");
        expect(text).not.toContain("example.org");
        // Die Einordnung bleibt: Kennung und SMTP-Status sagen, woran es lag.
        expect(text).toContain("EENVELOPE");
        expect(text).toContain("550");
      } finally {
        server.close();
      }
    });
  });
});
