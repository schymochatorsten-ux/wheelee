import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import net from "node:net";
import { closeDb } from "./db/sqlite";
import { saveMailConfig } from "./db/mail-config";
import { NOTIFY_SUBJECT, notifyNewFeedback, notifyText } from "./feedback-notify";
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

  it("tut nichts ohne eingetragene Adresse", async () => {
    const server = await fakeSmtp();
    try {
      konfiguriere(server.port, null);
      // Kein Empfänger heißt: keine Benachrichtigung – nicht etwa an
      // irgendeine andere Adresse.
      await expect(
        Promise.race([
          notifyNewFeedback(meldung()).then(() => "fertig"),
          server.received.then(() => "verschickt"),
        ]),
      ).resolves.toBe("fertig");
    } finally {
      server.close();
    }
  });

  it("wirft nicht, wenn der Mailserver nicht antwortet", async () => {
    // Die Meldung ist da; ein kaputtes Postfach darf sie nicht gefährden.
    konfiguriere(1, "betreiber@example.org");
    await expect(notifyNewFeedback(meldung())).resolves.toBeUndefined();
  });
});
