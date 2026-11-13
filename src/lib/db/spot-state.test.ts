import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb } from "./sqlite";
import {
  clearDecision,
  decideSpot,
  hiddenSpotIds,
  hideSpot,
  spotDecision,
  spotDecisions,
} from "./spot-state";

/**
 * Ausgeblendete und von Hand behaltene Parkplätze (ToDo 8.11).
 *
 * **Der wichtigste Fall steht unten: `kept` muss das Ausblenden überleben.**
 * Ohne diesen Zustand hätte der Knopf „Zurückholen" in der Verwaltung sichtbar
 * nichts getan – die Stimmen bleiben stehen, also hätte die nächste Prüfung
 * den Platz sofort wieder weggenommen.
 */

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-spotstate-"));
  process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
  closeDb();
});

afterEach(() => {
  closeDb();
  delete process.env.WHEELEE_DB_PATH;
  fs.rmSync(folder, { recursive: true, force: true });
});

const COUNTS = { spotId: "koeln-abc", goneCount: 3, existsCount: 0, wasUnsicher: true };

describe("Ausblenden", () => {
  it("blendet aus und nennt den Grund samt Zählerstand", () => {
    hideSpot(COUNTS, "votes");

    const decision = spotDecision("koeln-abc");
    expect(decision?.status).toBe("hidden");
    expect(decision?.reason).toBe("votes");
    expect(decision?.goneCount).toBe(3);
    expect(decision?.wasUnsicher).toBe(true);
    expect(hiddenSpotIds().has("koeln-abc")).toBe(true);
  });

  it("behält die erste Begründung, wenn später noch Stimmen kommen", () => {
    hideSpot(COUNTS, "votes");
    hideSpot({ ...COUNTS, goneCount: 99 }, "votes");

    // Sonst überschriebe eine spätere Stimme genau die Zahl, die erklärt,
    // weshalb der Platz ging.
    expect(spotDecision("koeln-abc")?.goneCount).toBe(3);
  });

  it("hält einen von Hand behaltenen Platz sichtbar", () => {
    hideSpot(COUNTS, "votes");
    decideSpot(COUNTS, "kept", null);

    expect(spotDecision("koeln-abc")?.status).toBe("kept");
    expect(hiddenSpotIds().has("koeln-abc")).toBe(false);
  });

  it("lässt die Entscheidung von Hand das Ausblenden überschreiben, nicht umgekehrt", () => {
    decideSpot(COUNTS, "kept", null);
    // Die Automatik versucht es – und darf nicht gewinnen.
    hideSpot(COUNTS, "votes");

    expect(spotDecision("koeln-abc")?.status).toBe("kept");
  });

  it("gibt den Platz mit `clearDecision` der Automatik zurück", () => {
    decideSpot(COUNTS, "kept", null);
    expect(clearDecision("koeln-abc")).toBe(true);
    expect(spotDecision("koeln-abc")).toBeNull();
    expect(clearDecision("koeln-abc")).toBe(false);
  });

  it("listet nach Zustand", () => {
    hideSpot(COUNTS, "votes");
    decideSpot({ ...COUNTS, spotId: "koeln-xyz" }, "kept", null);

    expect(spotDecisions("hidden").map((entry) => entry.spotId)).toEqual(["koeln-abc"]);
    expect(spotDecisions("kept").map((entry) => entry.spotId)).toEqual(["koeln-xyz"]);
    expect(spotDecisions()).toHaveLength(2);
  });
});
