import { describe, expect, it } from "vitest";
import {
  DEFAULT_LOCATION_PREFERENCE,
  isLocationPreference,
  LOCATION_PREFERENCES,
} from "./location-preference";

describe("Standortfreigabe (ToDo 9.25)", () => {
  it("kennt genau zwei Werte", () => {
    // Absichtlich keine dritte Stufe „nur dieses Mal": Die eigentliche
    // Rückfrage stellt ohnehin der Browser, und eine zweite Rückfrage davor
    // wäre eine Hürde mehr für jemanden, der einen Parkplatz sucht.
    expect([...LOCATION_PREFERENCES]).toEqual(["on", "off"]);
  });

  it("fragt, solange niemand etwas gewählt hat", () => {
    expect(DEFAULT_LOCATION_PREFERENCE).toBe("on");
  });

  it("weist alles andere ab – auch das, was aus der Datenbank kommen könnte", () => {
    // Die Spalte hat keine CHECK-Bedingung (Migration 16), deshalb ist diese
    // Prüfung die einzige Stelle, an der ein unsinniger Wert hängen bleibt.
    expect(isLocationPreference("on")).toBe(true);
    expect(isLocationPreference("off")).toBe(true);
    expect(isLocationPreference("ON")).toBe(false);
    expect(isLocationPreference("")).toBe(false);
    expect(isLocationPreference(null)).toBe(false);
    expect(isLocationPreference(undefined)).toBe(false);
    expect(isLocationPreference(true)).toBe(false);
  });
});
