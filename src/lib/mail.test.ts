import { afterEach, describe, expect, it } from "vitest";
import net from "node:net";
import { mailConfigured, publicUrl, sendMail } from "./mail";

/**
 * Mailversand (D-10), gegen einen kleinen SMTP-Server im Test statt gegen
 * einen echten Dienst: Es soll geprüft werden, was **wir** schicken.
 */

const VARIABLEN = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM",
  "SMTP_SECURE",
  "WHEELEE_PUBLIC_URL",
] as const;

afterEach(() => {
  for (const name of VARIABLEN) delete process.env[name];
});

/** Ein SMTP-Server, der alles annimmt und die Nachricht sammelt. */
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

describe("Konfiguration", () => {
  it("ist ohne Server, Absender oder öffentliche Adresse aus", () => {
    expect(mailConfigured()).toBe(false);
    process.env.SMTP_HOST = "smtp.example.org";
    expect(mailConfigured()).toBe(false);
    process.env.SMTP_FROM = "wheelee <noreply@example.org>";
    expect(mailConfigured()).toBe(false);
    process.env.WHEELEE_PUBLIC_URL = "https://wheelee.example.org/";
    expect(mailConfigured()).toBe(true);
  });

  it("nimmt für Links nur https (oder localhost) und streicht den Schrägstrich", () => {
    process.env.WHEELEE_PUBLIC_URL = "https://wheelee.example.org///";
    expect(publicUrl()).toBe("https://wheelee.example.org");
    process.env.WHEELEE_PUBLIC_URL = "http://wheelee.example.org";
    expect(publicUrl()).toBeNull();
    process.env.WHEELEE_PUBLIC_URL = "http://localhost:3000";
    expect(publicUrl()).toBe("http://localhost:3000");
    process.env.WHEELEE_PUBLIC_URL = "kein link";
    expect(publicUrl()).toBeNull();
  });
});

describe("Versand", () => {
  it("verschickt Betreff, Empfänger und Text", async () => {
    const server = await fakeSmtp();
    try {
      process.env.SMTP_HOST = "127.0.0.1";
      process.env.SMTP_PORT = String(server.port);
      process.env.SMTP_FROM = "wheelee <noreply@example.org>";
      process.env.WHEELEE_PUBLIC_URL = "https://wheelee.example.org";

      await sendMail({ to: "jemand@example.com", subject: "Hallo Test", text: "Der Link: https://x.example/#abc" });
      const raw = await server.received;
      expect(raw).toContain("Subject: Hallo Test");
      expect(raw).toContain("To: jemand@example.com");
      expect(raw).toContain("Der Link: https://x.example/#abc");
    } finally {
      server.close();
    }
  });

  it("wirft ohne Einrichtung, statt still nichts zu tun", async () => {
    await expect(sendMail({ to: "a@example.org", subject: "x", text: "y" })).rejects.toThrow();
  });
});
