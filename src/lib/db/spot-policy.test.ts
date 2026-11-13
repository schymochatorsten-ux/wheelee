import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb } from "./sqlite";
import {
  PolicyError,
  POLICY_DEFAULT,
  SCHWELLE_MAX,
  setSpotPolicy,
  spotPolicy,
} from "./spot-policy";

/**
 * Die zwei Schwellen (ToDo 8.11), gegen eine echte Datenbank.
 *
 * Geprüft wird vor allem, **was bei Unsinn passiert**: Diese Zahlen
 * entscheiden, ob Parkplätze verschwinden – eine 0 würde beim ersten Aufruf
 * den halben Bestand ausblenden.
 */

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-policy-"));
  process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
  closeDb();
});

afterEach(() => {
  closeDb();
  delete process.env.WHEELEE_DB_PATH;
  fs.rmSync(folder, { recursive: true, force: true });
});

describe("Schwellen", () => {
  it("gilt die Vorgabe, solange niemand etwas eingestellt hat", () => {
    expect(spotPolicy()).toEqual(POLICY_DEFAULT);
    expect(POLICY_DEFAULT.schwelleUnsicher).toBeLessThan(POLICY_DEFAULT.schwelleSicher);
  });

  it("speichert und liest beide Zahlen", () => {
    setSpotPolicy({ schwelleUnsicher: 3, schwelleSicher: 8 }, null);

    const policy = spotPolicy();
    expect(policy.schwelleUnsicher).toBe(3);
    expect(policy.schwelleSicher).toBe(8);
    expect(policy.updatedAt).not.toBeNull();
  });

  it("überschreibt die eine Zeile statt eine zweite anzulegen", () => {
    setSpotPolicy({ schwelleUnsicher: 3, schwelleSicher: 8 }, null);
    setSpotPolicy({ schwelleUnsicher: 4, schwelleSicher: 9 }, null);

    expect(spotPolicy().schwelleUnsicher).toBe(4);
    expect(spotPolicy().schwelleSicher).toBe(9);
  });

  it("weist 0, Brüche und Unsinn ab", () => {
    for (const value of [0, -1, 1.5, Number.NaN]) {
      expect(() => setSpotPolicy({ schwelleUnsicher: value, schwelleSicher: 5 }, null)).toThrow(
        PolicyError,
      );
    }
    // Und nichts davon ist angekommen.
    expect(spotPolicy()).toEqual(POLICY_DEFAULT);
  });

  it("weist eine Zahl ab, die das Melden stilllegen würde", () => {
    expect(() =>
      setSpotPolicy({ schwelleUnsicher: 2, schwelleSicher: SCHWELLE_MAX + 1 }, null),
    ).toThrow(PolicyError);
  });
});
