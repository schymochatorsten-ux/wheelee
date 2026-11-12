import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb } from "./sqlite";
import {
  clearMailConfig,
  readMailConfig,
  saveMailConfig,
  type MailConfigInput,
} from "./mail-config";

/** SMTP-Zugangsdaten in der Datenbank (ToDo 10.22), gegen eine echte Datei. */

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-mailconf-"));
  process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
  closeDb();
});

afterEach(() => {
  closeDb();
  delete process.env.WHEELEE_DB_PATH;
  fs.rmSync(folder, { recursive: true, force: true });
});

const eingabe = (over: Partial<MailConfigInput> = {}): MailConfigInput => ({
  host: "smtp.example.org",
  port: 587,
  secure: false,
  username: "post",
  password: "geheim",
  fromAddress: "wheelee <noreply@example.org>",
  publicUrl: "https://wheelee.example.org",
  enabled: true,
  provider: "Beispiel Mail GmbH, Berlin",
  notifyEmail: null,
  ...over,
});

describe("mail_config", () => {
  it("ist am Anfang leer – dann gilt die Umgebung", () => {
    expect(readMailConfig()).toBeNull();
  });

  it("speichert und liest alle Felder zurück", () => {
    saveMailConfig(eingabe(), null);
    const row = readMailConfig();
    expect(row).toMatchObject({
      host: "smtp.example.org",
      port: 587,
      secure: false,
      username: "post",
      password: "geheim",
      fromAddress: "wheelee <noreply@example.org>",
      publicUrl: "https://wheelee.example.org",
      enabled: true,
      provider: "Beispiel Mail GmbH, Berlin",
    });
  });

  it("lässt das Passwort stehen, wenn keines mitkommt", () => {
    saveMailConfig(eingabe(), null);
    // Genau der Alltagsfall: Die Oberfläche kennt das Passwort nicht (der
    // Server liefert es nie aus) und ändert nur den Server. Ohne diese Regel
    // wäre jedes Speichern ein Löschen.
    saveMailConfig({ ...eingabe(), password: undefined, host: "smtp.anders.org" }, null);

    const row = readMailConfig();
    expect(row?.host).toBe("smtp.anders.org");
    expect(row?.password).toBe("geheim");
  });

  it("löscht das Passwort bei leerer Angabe", () => {
    saveMailConfig(eingabe(), null);
    saveMailConfig(eingabe({ password: "" }), null);
    expect(readMailConfig()?.password).toBeNull();
  });

  it("legt keine zweite Zeile an", () => {
    saveMailConfig(eingabe(), null);
    saveMailConfig(eingabe({ host: "zweiter.example.org" }), null);
    // Eine Tabelle mit zwei Konfigurationen hätte eine stille
    // Reihenfolgefrage; CHECK (id = 1) verhindert sie.
    expect(readMailConfig()?.host).toBe("zweiter.example.org");
  });

  it("merkt sich das Abschalten, ohne die Angaben zu verlieren", () => {
    saveMailConfig(eingabe(), null);
    saveMailConfig(eingabe({ enabled: false, password: undefined }), null);
    const row = readMailConfig();
    expect(row?.enabled).toBe(false);
    expect(row?.password).toBe("geheim");
  });

  it("verwirft auf Wunsch alles", () => {
    saveMailConfig(eingabe(), null);
    clearMailConfig();
    expect(readMailConfig()).toBeNull();
  });
});
