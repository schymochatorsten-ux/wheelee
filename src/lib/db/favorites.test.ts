import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb, db } from "./sqlite";
import { createAccount, deleteAccount, exportAccountData } from "./accounts";
import {
  addFavorite,
  isFavorite,
  listFavorites,
  MAX_FAVORITES,
  removeFavorite,
} from "./favorites";

/**
 * Gespeicherte Parkplätze (ToDo 11.5), gegen eine echte Datenbank – die
 * Eindeutigkeit und das Mitlöschen mit dem Konto stehen im Schema, nicht im
 * Code.
 */

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-favorite-"));
  process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
  closeDb();
});

afterEach(() => {
  closeDb();
  delete process.env.WHEELEE_DB_PATH;
  fs.rmSync(folder, { recursive: true, force: true });
});

const SPOT = "koeln-1a2b3c";
const PASSWORD = "ein gutes langes Passwort";

function konto(email: string): string {
  const account = createAccount(email, PASSWORD);
  if (!account) throw new Error("Konto konnte nicht angelegt werden");
  return account.id;
}

describe("Favoriten", () => {
  it("speichert und entfernt einen Parkplatz", () => {
    const a = konto("a@example.de");

    expect(addFavorite(SPOT, a)).toBe("gesetzt");
    expect(isFavorite(SPOT, a)).toBe(true);

    expect(removeFavorite(SPOT, a)).toBe(true);
    expect(isFavorite(SPOT, a)).toBe(false);
  });

  it("macht doppeltes Speichern und Entfernen folgenlos", () => {
    const a = konto("a@example.de");

    addFavorite(SPOT, a);
    addFavorite(SPOT, a);
    expect(listFavorites(a)).toHaveLength(1);

    removeFavorite(SPOT, a);
    expect(removeFavorite(SPOT, a)).toBe(false);
  });

  it("verhindert eine zweite Zeile auch gegen rohes SQL", () => {
    const a = konto("a@example.de");
    addFavorite(SPOT, a);

    expect(() =>
      db()
        .prepare("INSERT INTO favorite (spot_id, account_id, created_at) VALUES (?, ?, ?)")
        .run(SPOT, a, new Date().toISOString()),
    ).toThrow(/UNIQUE/u);
  });

  it("hält die Listen verschiedener Konten auseinander, jüngster zuerst", () => {
    const a = konto("a@example.de");
    const b = konto("b@example.de");

    addFavorite("alt-1", a);
    addFavorite("neu-2", a);
    addFavorite("fremd-3", b);
    db()
      .prepare("UPDATE favorite SET created_at = ? WHERE spot_id = ?")
      .run("2025-01-01T10:00:00.000Z", "alt-1");

    expect(listFavorites(a).map((f) => f.spotId)).toEqual(["neu-2", "alt-1"]);
    expect(listFavorites(b).map((f) => f.spotId)).toEqual(["fremd-3"]);
    expect(isFavorite("fremd-3", a)).toBe(false);
  });

  it("nennt die Obergrenze, statt unbegrenzt zu speichern", () => {
    const a = konto("a@example.de");
    for (let i = 0; i < MAX_FAVORITES; i += 1) addFavorite(`platz-${i}`, a);

    expect(addFavorite("einer-zu-viel", a)).toBe("voll");
    // Ein bereits gespeicherter Platz bleibt auch bei voller Liste „gesetzt".
    expect(addFavorite("platz-0", a)).toBe("gesetzt");
  });

  it("verschwindet mit dem Konto (ON DELETE CASCADE)", () => {
    const a = konto("a@example.de");
    const b = konto("b@example.de");
    addFavorite(SPOT, a);
    addFavorite(SPOT, b);

    expect(deleteAccount(a, PASSWORD)).toBe(true);

    const rest = db().prepare("SELECT account_id FROM favorite").all() as { account_id: string }[];
    expect(rest.map((row) => row.account_id)).toEqual([b]);
  });

  it("steht in der Auskunft", () => {
    const a = konto("a@example.de");
    addFavorite(SPOT, a);

    const auskunft = exportAccountData(a);

    expect(auskunft?.favorites.map((f) => f.spotId)).toEqual([SPOT]);
  });
});
