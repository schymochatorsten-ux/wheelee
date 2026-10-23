import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb, db } from "./sqlite";
import {
  accountForSession,
  authenticate,
  changePassword,
  createAccount,
  createSession,
  deleteAccount,
  exportAccountData,
} from "./accounts";
import { castVote, ratingSummary } from "./ratings";

/** Konto-Funktionen gegen eine echte Datenbank (ToDo 10.7). */

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-account-"));
  process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
  closeDb();
});

afterEach(() => {
  closeDb();
  delete process.env.WHEELEE_DB_PATH;
  fs.rmSync(folder, { recursive: true, force: true });
});

const ALT = "ein gutes langes Passwort";
const NEU = "ein ganz anderes Passwort";

function rueckmeldung(accountId: string | null, adresse: string | null): void {
  db()
    .prepare(
      `INSERT INTO feedback (kind, message, contact_email, account_id, status, created_at)
       VALUES ('fehler', 'Platz fehlt', ?, ?, 'neu', '2026-10-23T10:00:00.000Z')`,
    )
    .run(adresse, accountId);
}

describe("deleteAccount", () => {
  it("löscht Konto, Sitzungen und Bewertungen, behält die Rückmeldung ohne Adresse", () => {
    const konto = createAccount("a@example.de", ALT)!;
    const token = createSession(konto.id);
    castVote("koeln-1a2b3c", konto.id, "exists");
    rueckmeldung(konto.id, "antwort@example.de");
    rueckmeldung(null, "fremd@example.de");

    expect(deleteAccount(konto.id, ALT)).toBe(true);

    expect(accountForSession(token)).toBeNull();
    expect(authenticate("a@example.de", ALT)).toBeNull();
    expect(ratingSummary("koeln-1a2b3c").existsCount).toBe(0);

    const zeilen = db()
      .prepare("SELECT account_id, contact_email, contact_removed_at FROM feedback ORDER BY id")
      .all() as {
      account_id: string | null;
      contact_email: string | null;
      contact_removed_at: string | null;
    }[];
    expect(zeilen).toHaveLength(2);
    expect(zeilen[0].account_id).toBeNull();
    expect(zeilen[0].contact_email).toBeNull();
    expect(zeilen[0].contact_removed_at).not.toBeNull();
    // Fremde Meldungen bleiben unberührt.
    expect(zeilen[1].contact_email).toBe("fremd@example.de");
  });

  it("löscht nichts bei falschem Passwort", () => {
    const konto = createAccount("a@example.de", ALT)!;
    expect(deleteAccount(konto.id, "falsch falsch falsch")).toBe(false);
    expect(authenticate("a@example.de", ALT)).not.toBeNull();
  });
});

describe("exportAccountData", () => {
  it("liefert die eigenen Daten und sonst nichts", () => {
    const a = createAccount("a@example.de", ALT)!;
    const b = createAccount("b@example.de", ALT)!;
    castVote("koeln-1a2b3c", a.id, "gone");
    castVote("koeln-1a2b3c", b.id, "exists");
    rueckmeldung(a.id, "antwort@example.de");
    rueckmeldung(b.id, null);

    const daten = exportAccountData(a.id)!;

    expect(daten.account.email).toBe("a@example.de");
    expect(daten.ratings).toHaveLength(1);
    expect(daten.ratings[0].vote).toBe("gone");
    expect(daten.feedback).toHaveLength(1);
    expect(daten.feedback[0].contactEmail).toBe("antwort@example.de");
    expect(JSON.stringify(daten)).not.toContain("scrypt");
    expect(JSON.stringify(daten)).not.toContain("b@example.de");
  });

  it("gibt null für ein unbekanntes Konto", () => {
    expect(exportAccountData("gibt-es-nicht")).toBeNull();
  });
});

describe("changePassword", () => {
  it("ändert das Passwort und behält nur die aktuelle Sitzung", () => {
    const konto = createAccount("a@example.de", ALT)!;
    const aktuell = createSession(konto.id);
    const fremd = createSession(konto.id);

    expect(changePassword(konto.id, ALT, NEU, aktuell)).toBe(true);

    expect(accountForSession(aktuell)?.id).toBe(konto.id);
    expect(accountForSession(fremd)).toBeNull();
    expect(authenticate("a@example.de", NEU)).not.toBeNull();
    expect(authenticate("a@example.de", ALT)).toBeNull();
  });

  it("lässt bei falschem bisherigem Passwort alles unverändert", () => {
    const konto = createAccount("a@example.de", ALT)!;
    const aktuell = createSession(konto.id);
    const fremd = createSession(konto.id);

    expect(changePassword(konto.id, "falsch falsch falsch", NEU, aktuell)).toBe(false);

    expect(accountForSession(fremd)?.id).toBe(konto.id);
    expect(authenticate("a@example.de", ALT)).not.toBeNull();
  });

  it("rührt Sitzungen anderer Konten nicht an", () => {
    const a = createAccount("a@example.de", ALT)!;
    const b = createAccount("b@example.de", ALT)!;
    const tokenA = createSession(a.id);
    const tokenB = createSession(b.id);

    changePassword(a.id, ALT, NEU, tokenA);

    expect(accountForSession(tokenB)?.id).toBe(b.id);
  });
});
