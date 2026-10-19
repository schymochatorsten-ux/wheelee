import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb, db } from "./sqlite";
import { createAccount } from "./accounts";
import { castVote, ownVote, ratingSummary, spotsReportedGone } from "./ratings";

/**
 * Bewertungen (ToDos 8.1–8.7, Regel festgelegt 2026-10-19).
 *
 * Geprüft wird gegen eine echte Datenbank, denn die eigentliche Regel steckt
 * **im Schema**: `UNIQUE (spot_id, account_id)`. Eine Nachbildung im Test
 * würde genau das nicht prüfen, was den Schutz ausmacht.
 */

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-rating-"));
  process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
  closeDb();
});

afterEach(() => {
  closeDb();
  delete process.env.WHEELEE_DB_PATH;
  fs.rmSync(folder, { recursive: true, force: true });
});

const SPOT = "koeln-1a2b3c";

function konto(email: string): string {
  const account = createAccount(email, "ein gutes langes Passwort");
  if (!account) throw new Error("Konto konnte nicht angelegt werden");
  return account.id;
}

describe("castVote", () => {
  it("legt eine Stimme an", () => {
    const a = konto("a@example.de");

    expect(castVote(SPOT, a, "exists")).toBe("gesetzt");
    expect(ratingSummary(SPOT).existsCount).toBe(1);
    expect(ownVote(SPOT, a)?.vote).toBe("exists");
  });

  it("zählt dieselbe Richtung nicht doppelt, sondern nimmt zurück", () => {
    /*
     * Der häufigste Fall von allen ist kein Angriff, sondern das zweite
     * Antippen. Ein Knopf, der beim zweiten Druck nichts tut, wäre nicht
     * erklärbar – also nimmt er zurück.
     */
    const a = konto("a@example.de");

    castVote(SPOT, a, "exists");
    expect(castVote(SPOT, a, "exists")).toBe("zurueckgenommen");

    expect(ratingSummary(SPOT).existsCount).toBe(0);
    expect(ownVote(SPOT, a)).toBeNull();
  });

  it("dreht die Stimme um, statt eine zweite anzulegen", () => {
    const a = konto("a@example.de");

    castVote(SPOT, a, "exists");
    expect(castVote(SPOT, a, "gone")).toBe("geaendert");

    const summary = ratingSummary(SPOT);
    expect(summary.existsCount).toBe(0);
    expect(summary.goneCount).toBe(1);
  });

  it("erlaubt das Ändern auch viel später – das ist kein Schlupfloch", () => {
    /*
     * Ein Parkplatz, den jemand vor einem Jahr bestätigt hat, kann heute
     * aufgehoben sein. Wäre die erste Stimme endgültig, könnte ausgerechnet
     * die Person, die es am besten weiß, die Korrektur nicht melden.
     */
    const a = konto("a@example.de");
    castVote(SPOT, a, "exists");

    db()
      .prepare("UPDATE rating SET created_at = ? WHERE spot_id = ?")
      .run("2025-10-19T10:00:00.000Z", SPOT);

    expect(castVote(SPOT, a, "gone")).toBe("geaendert");
    expect(ratingSummary(SPOT).goneCount).toBe(1);
  });

  it("hält höchstens eine Zeile je Konto und Parkplatz vor", () => {
    // Die Grenze ist eine Eigenschaft der Tabelle, keine Regel im Code.
    const a = konto("a@example.de");

    castVote(SPOT, a, "exists");
    castVote(SPOT, a, "gone");
    castVote(SPOT, a, "exists");

    const row = db()
      .prepare("SELECT COUNT(*) AS anzahl FROM rating WHERE spot_id = ? AND account_id = ?")
      .get(SPOT, a) as { anzahl: number };
    expect(Number(row.anzahl)).toBe(1);
  });

  it("verhindert eine zweite Zeile auch gegen rohes SQL", () => {
    /*
     * Der Beweis, dass die Eindeutigkeit wirklich im Schema steht und nicht
     * nur in `castVote`. Ginge das hier durch, wäre jede Zählung angreifbar,
     * sobald jemand einen zweiten Schreibweg einbaut.
     */
    const a = konto("a@example.de");
    castVote(SPOT, a, "exists");

    expect(() =>
      db()
        .prepare("INSERT INTO rating (spot_id, account_id, vote, created_at) VALUES (?, ?, ?, ?)")
        .run(SPOT, a, "gone", new Date().toISOString()),
    ).toThrow(/UNIQUE/u);
  });

  it("hält die Stimmen verschiedener Konten auseinander", () => {
    const a = konto("a@example.de");
    const b = konto("b@example.de");

    castVote(SPOT, a, "exists");
    castVote(SPOT, b, "exists");

    expect(ratingSummary(SPOT).existsCount).toBe(2);
  });

  it("hält die Stimmen zu verschiedenen Parkplätzen auseinander", () => {
    const a = konto("a@example.de");

    castVote(SPOT, a, "exists");
    castVote("berlin-9z8y", a, "gone");

    expect(ratingSummary(SPOT).existsCount).toBe(1);
    expect(ratingSummary("berlin-9z8y").goneCount).toBe(1);
  });

  it("nimmt die Stimmen mit, wenn das Konto gelöscht wird", () => {
    // ON DELETE CASCADE: Wer sein Konto löscht, löscht seine Spuren mit
    // (Abschnitt 10, ToDo 11.7).
    const a = konto("a@example.de");
    castVote(SPOT, a, "exists");

    db().prepare("DELETE FROM account WHERE id = ?").run(a);

    expect(ratingSummary(SPOT).existsCount).toBe(0);
  });
});

describe("ratingSummary", () => {
  it("gibt für einen unbewerteten Parkplatz Nullen zurück", () => {
    const summary = ratingSummary("noch-nie-bewertet");

    expect(summary.existsCount).toBe(0);
    expect(summary.goneCount).toBe(0);
    expect(summary.lastExistsAt).toBeNull();
    expect(summary.lastGoneAt).toBeNull();
  });

  it("nennt den Zeitpunkt der letzten Geltung, nicht den der Abgabe", () => {
    /*
     * Wer vor einem Jahr bestätigt und gestern umgedreht hat, darf bei
     * „zuletzt bestätigt am" nicht mit dem alten Datum erscheinen – sonst
     * liest sich eine zurückgezogene Bestätigung wie eine frische.
     */
    const a = konto("a@example.de");
    const b = konto("b@example.de");

    castVote(SPOT, a, "exists");
    db()
      .prepare("UPDATE rating SET created_at = ? WHERE account_id = ?")
      .run("2025-01-01T10:00:00.000Z", a);

    castVote(SPOT, b, "exists");

    const summary = ratingSummary(SPOT);
    expect(summary.existsCount).toBe(2);
    expect(summary.lastExistsAt?.startsWith("2025-01-01")).toBe(false);
  });
});

describe("spotsReportedGone", () => {
  it("führt nur Parkplätze mit genügend Meldungen", () => {
    const a = konto("a@example.de");
    const b = konto("b@example.de");

    castVote(SPOT, a, "gone");
    castVote("nur-einmal", b, "gone");
    castVote(SPOT, b, "gone");

    const liste = spotsReportedGone(2);

    expect(liste).toEqual([{ spotId: SPOT, goneCount: 2 }]);
  });

  it("zählt Konten, nicht Stimmen – dieselbe Person bleibt eine", () => {
    // Darum ist diese Liste belastbar: Zehn Meldungen heißen zehn Menschen,
    // nicht zehnmal dieselbe Person mit frisch geleertem Browser.
    const a = konto("a@example.de");

    castVote(SPOT, a, "gone");
    castVote(SPOT, a, "exists");
    castVote(SPOT, a, "gone");

    expect(spotsReportedGone(2)).toEqual([]);
  });
});
