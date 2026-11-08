import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb, db } from "./sqlite";
import {
  accountForSession,
  authenticate,
  createAccount,
  createSession,
  resetPasswordByAdmin,
  setEmailByAdmin,
  setUsername,
} from "./accounts";
import { listAccounts } from "./admin";

/**
 * Konten durch einen Administrator ändern (ToDo 18.8), gegen eine echte
 * Datenbank – eigene Datei je Fall, wie in `store.test.ts` begründet.
 */

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-edit-"));
  process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
  closeDb();
});

afterEach(() => {
  closeDb();
  delete process.env.WHEELEE_DB_PATH;
  fs.rmSync(folder, { recursive: true, force: true });
});

const PASSWORT = "ein gutes langes Passwort";

function konto(email: string) {
  const account = createAccount(email, PASSWORT);
  if (!account) throw new Error("Konto nicht angelegt");
  return account;
}

describe("Benutzername setzen", () => {
  it("setzt ihn und macht die Anmeldung damit möglich", () => {
    const a = konto("a@example.org");
    expect(setUsername(a.id, "Torsten")).toBe("ok");
    expect(authenticate("Torsten", PASSWORT)?.id).toBe(a.id);
  });

  it("nimmt ihn auf Wunsch wieder weg – dann gilt die Adresse", () => {
    const a = konto("a@example.org");
    setUsername(a.id, "Torsten");
    expect(setUsername(a.id, null)).toBe("ok");
    expect(authenticate("Torsten", PASSWORT)).toBeNull();
    expect(authenticate("a@example.org", PASSWORT)?.id).toBe(a.id);
  });

  it("lehnt einen vergebenen Namen ab, auch in anderer Schreibweise", () => {
    const a = konto("a@example.org");
    const b = konto("b@example.org");
    setUsername(a.id, "Torsten");
    // Migration 12 macht den Index unabhängig von Groß- und Kleinschreibung:
    // „Torsten“ und „torsten“ sollen nicht zwei Konten sein.
    expect(setUsername(b.id, "torsten")).toBe("taken");
  });

  it("lehnt unzulässige Namen ab", () => {
    const a = konto("a@example.org");
    expect(setUsername(a.id, "ab")).toBe("invalid");
    expect(setUsername(a.id, "mit@zeichen")).toBe("invalid");
  });

  it("meldet ein unbekanntes Konto", () => {
    expect(setUsername("gibt-es-nicht", "Torsten")).toBe("not-found");
  });
});

describe("Adresse ändern", () => {
  it("ändert sie und führt sie danach als unbestätigt", () => {
    const a = konto("alt@example.org");
    expect(setEmailByAdmin(a.id, "Neu@Example.org")).toBe("ok");

    const row = listAccounts().find((account) => account.id === a.id);
    // Kleingeschrieben wie überall (normalizeEmail), sonst wären
    // „Neu@…“ und „neu@…“ zwei Postfächer.
    expect(row?.email).toBe("neu@example.org");
    // Niemand hat nachgewiesen, dass das Postfach erreichbar ist – auch der
    // Administrator nicht, der sie eingetippt hat.
    expect(row?.emailVerified).toBe(false);
    expect(authenticate("neu@example.org", PASSWORT)?.id).toBe(a.id);
  });

  it("lässt die Sitzungen bestehen", () => {
    const a = konto("alt@example.org");
    const token = createSession(a.id);
    setEmailByAdmin(a.id, "neu@example.org");
    // Eine Adressänderung ist kein Hinweis auf Missbrauch; wer jemanden
    // hinauswerfen will, sperrt das Konto.
    expect(accountForSession(token)?.id).toBe(a.id);
  });

  it("lehnt eine vergebene und eine unsinnige Adresse ab", () => {
    const a = konto("a@example.org");
    konto("b@example.org");
    expect(setEmailByAdmin(a.id, "b@example.org")).toBe("taken");
    expect(setEmailByAdmin(a.id, "keine adresse")).toBe("invalid");
    // Nach einem abgelehnten Versuch steht die alte noch.
    expect(authenticate("a@example.org", PASSWORT)?.id).toBe(a.id);
  });
});

describe("Passwort zurücksetzen", () => {
  it("setzt ein Startpasswort und beendet alle Sitzungen", () => {
    const chef = konto("chef@example.org");
    const wer = konto("wer@example.org");
    const token = createSession(wer.id);

    expect(resetPasswordByAdmin(wer.id, chef.id, "start-123")).toBe("ok");
    expect(authenticate("wer@example.org", "start-123")?.mustChangePassword).toBe(true);
    expect(authenticate("wer@example.org", PASSWORT)).toBeNull();
    // Wer zurücksetzt, tut es, weil der bisherige Zugang nicht mehr stimmt.
    expect(accountForSession(token)).toBeNull();
  });

  it("entwertet offene Links aus Mails", () => {
    const chef = konto("chef@example.org");
    const wer = konto("wer@example.org");
    db()
      .prepare(
        `INSERT INTO mail_token (id, token_hash, account_id, kind, created_at, expires_at)
         VALUES ('t1', 'hash', ?, 'reset', ?, ?)`,
      )
      .run(wer.id, new Date().toISOString(), new Date(Date.now() + 3_600_000).toISOString());

    resetPasswordByAdmin(wer.id, chef.id, "start-123");
    const row = db().prepare("SELECT used_at FROM mail_token WHERE id = 't1'").get() as {
      used_at: string | null;
    };
    expect(row.used_at).not.toBeNull();
  });

  it("verweigert das eigene Konto", () => {
    const chef = konto("chef@example.org");
    // Sonst wäre die Regel aus 10.7 umgangen: Das eigene Passwort verlangt
    // das bisherige, damit eine gestohlene Sitzung allein nicht genügt.
    expect(resetPasswordByAdmin(chef.id, chef.id, "egal")).toBe("self");
    expect(authenticate("chef@example.org", PASSWORT)).not.toBeNull();
  });

  it("meldet ein unbekanntes Konto", () => {
    const chef = konto("chef@example.org");
    expect(resetPasswordByAdmin("gibt-es-nicht", chef.id, "start-123")).toBe("not-found");
  });
});

describe("Liste", () => {
  it("findet ein Konto auch über den Benutzernamen", () => {
    const a = konto("unauffaellig@example.org");
    setUsername(a.id, "Torsten");
    // Wer „Torsten“ sucht und nichts findet, obwohl das Konto so heißt, hält
    // es für nicht vorhanden.
    expect(listAccounts({ query: "torsten" }).map((row) => row.id)).toEqual([a.id]);
  });
});
