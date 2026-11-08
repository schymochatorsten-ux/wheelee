import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb } from "@/lib/db/sqlite";
import { saveMailConfig } from "@/lib/db/mail-config";
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

/*
 * Eigene Datenbankdatei je Fall, seit die Seite den Versanddienstleister auch
 * dort sucht (ToDo 10.22). Ohne das liefe der Test gegen die
 * Entwicklungsdatenbank: Stünde dort ein Anbieter, schlüge „ohne Anbieter
 * steht der Hinweis" fehl – und zwar nur auf dem Rechner, auf dem jemand den
 * Versand einmal ausprobiert hat.
 */
let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-ds-"));
  process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
  closeDb();
});

afterEach(() => {
  closeDb();
  delete process.env.WHEELEE_DB_PATH;
  fs.rmSync(folder, { recursive: true, force: true });
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

  it("nimmt den Anbieter aus der Verwaltung vor dem aus der Umgebung", async () => {
    // Der eigentliche Zweck von 10.22: Wer den Versand ohne Zugang zum NAS
    // einschaltet, muss die Datenschutzerklärung auch ohne ihn vollständig
    // bekommen.
    process.env.WHEELEE_MAIL_PROVIDER = "Alt GmbH, aus der Umgebung";
    saveMailConfig(
      {
        host: "smtp.example.org",
        port: 587,
        secure: false,
        username: null,
        password: null,
        fromAddress: "wheelee <noreply@example.org>",
        publicUrl: "https://wheelee.example.org",
        enabled: true,
        provider: "Neu GmbH, aus der Verwaltung",
      },
      null,
    );

    const html = await seite();
    expect(html).toContain("Neu GmbH, aus der Verwaltung");
    expect(html).not.toContain("Alt GmbH");
    expect(html).not.toContain("Angabe fehlt");
  });
});
