import { describe, expect, it } from "vitest";
import { dedupeSpots } from "./dedupe.mjs";
import type { ParkingSpot } from "../../src/lib/types.js";

function spot(overrides: Partial<ParkingSpot> & { id: string }): ParkingSpot {
  return {
    city: "test",
    label: "Teststraße",
    street: "Teststraße",
    houseNumber: null,
    note: null,
    timeRestriction: null,
    district: "Test",
    spotCount: 1,
    lat: 50.0,
    lng: 8.0,
    geoAccuracy: "house",
    source: "Test",
    ...overrides,
  };
}

/** 1 m entspricht bei 50° Nord rund 0,000009° Breite. */
const METER_LAT = 0.000009;

describe("dedupeSpots", () => {
  it("führt zwei Einträge auf demselben Punkt mit gleichem Namen zusammen", () => {
    const result = dedupeSpots([spot({ id: "a" }), spot({ id: "b" })]);
    expect(result.removed).toBe(1);
    expect(result.spots).toHaveLength(1);
  });

  it("nimmt das Maximum der Stellplätze, nicht die Summe", () => {
    // Zwei Sichten auf dieselbe Fläche: der einzelne kartierte Stellplatz und
    // die Fläche mit dreien. Zu addieren hieße, dieselben Plätze doppelt zu
    // zählen – derselbe Fehlertyp, der Freiburg das Sechzigfache bescherte.
    const result = dedupeSpots([spot({ id: "a", spotCount: 1 }), spot({ id: "b", spotCount: 3 })]);
    expect(result.spots).toHaveLength(1);
    expect(result.spots[0].spotCount).toBe(3);
  });

  it("lässt benachbarte Stellplätze in 4 m Abstand unangetastet", () => {
    // Eine markierte Bucht ist rund 3,5 m breit: Zwei Einträge in 4 m Abstand
    // sind zwei echte Plätze nebeneinander, keine Dublette.
    const result = dedupeSpots([spot({ id: "a" }), spot({ id: "b", lat: 50.0 + 4 * METER_LAT })]);
    expect(result.removed).toBe(0);
    expect(result.spots).toHaveLength(2);
  });

  it("führt nichts zusammen, was verschieden heißt", () => {
    const result = dedupeSpots([
      spot({ id: "a", label: "Teststraße", street: "Teststraße" }),
      spot({ id: "b", label: "Andere Straße", street: "Andere Straße" }),
    ]);
    expect(result.removed).toBe(0);
  });

  it("behält den Eintrag mit mehr Angaben", () => {
    const result = dedupeSpots([
      spot({ id: "a", street: null, houseNumber: null }),
      spot({ id: "b", street: "Teststraße", houseNumber: "7" }),
    ]);
    expect(result.spots).toHaveLength(1);
    expect(result.spots[0].id).toBe("b");
  });

  it("ist bei gleicher Eingabe wiederholbar", () => {
    const input = [spot({ id: "z" }), spot({ id: "a" })];
    expect(dedupeSpots(input).spots[0].id).toBe(dedupeSpots([...input].reverse()).spots[0].id);
  });

  it("lässt Einträge ohne Koordinate stehen", () => {
    const result = dedupeSpots([
      spot({ id: "a", lat: null, lng: null, geoAccuracy: "none" }),
      spot({ id: "b", lat: null, lng: null, geoAccuracy: "none" }),
    ]);
    expect(result.spots).toHaveLength(2);
  });

  it("führt auch drei Einträge auf einem Punkt auf einen zusammen", () => {
    const result = dedupeSpots([spot({ id: "a" }), spot({ id: "b" }), spot({ id: "c" })]);
    expect(result.spots).toHaveLength(1);
    expect(result.removed).toBe(2);
  });
});
