import { afterEach, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import Datenschutz from "./page";

/**
 * Der Abschnitt zum Mailversand erscheint nur, wenn es ihn gibt (ToDo 10.16),
 * und fehlt der Anbieter, steht dort ein sichtbarer Hinweis statt eines
 * erfundenen Namens.
 *
 * Die Seite fragt Cookie und Kopfzeilen der Anfrage nach der Sprache; hier gibt
 * es keine Anfrage, also steht die Sprache fest auf Deutsch.
 */

vi.mock("@/i18n/server", () => ({
  getLocale: async () => "de",
}));

const VARIABLEN = [
  "SMTP_HOST",
  "SMTP_FROM",
  "WHEELEE_PUBLIC_URL",
  "WHEELEE_MAIL_PROVIDER",
] as const;

afterEach(() => {
  for (const name of VARIABLEN) delete process.env[name];
});

async function seite(): Promise<string> {
  const { prelude } = await prerenderToNodeStream(createElement(Datenschutz));
  const chunks: Buffer[] = [];
  for await (const chunk of prelude) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString("utf8");
}

function mailAn() {
  process.env.SMTP_HOST = "smtp.example.org";
  process.env.SMTP_FROM = "wheelee <noreply@example.org>";
  process.env.WHEELEE_PUBLIC_URL = "https://wheelee.example.org";
}

describe("Datenschutzerklärung und Mailversand", () => {
  it("nennt ohne Mailversand keinen Versanddienstleister", async () => {
    const html = await seite();
    expect(html).not.toContain("Versanddienstleister");
    // Auch ohne Mail steht die Kachel-Ausnahme da: Die OpenStreetMap Foundation sitzt im Vereinigten Königreich.
    expect(html).toContain("Vereinigten Königreich");
  });

  it("nennt mit Mailversand den Anbieter, wenn er eingetragen ist", async () => {
    mailAn();
    process.env.WHEELEE_MAIL_PROVIDER = "Beispiel Mail GmbH, Berlin";
    const html = await seite();
    expect(html).toContain("E-Mails der App");
    expect(html).toContain("Beispiel Mail GmbH, Berlin");
    expect(html).not.toContain("Angabe fehlt");
  });

  it("zeigt mit Mailversand ohne Anbieter einen Hinweis, statt einen zu erfinden", async () => {
    mailAn();
    const html = await seite();
    expect(html).toContain("Angabe fehlt");
    expect(html).toContain("WHEELEE_MAIL_PROVIDER");
  });
});
