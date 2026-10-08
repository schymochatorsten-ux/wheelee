import { describe, expect, it } from "vitest";
import { distanceMeters, findNearest, formatDistance, sortByDistance } from "./geo";
import type { ParkingSpot } from "./types";

const spot = (id: string, lat: number | null, lng: number | null): ParkingSpot => ({
  id,
  city: "frankfurt",
  label: id,
  street: null,
  houseNumber: null,
  note: null,
  timeRestriction: null,
  district: "Innenstadt",
  spotCount: 1,
  lat,
  lng,
  geoAccuracy: lat === null ? "none" : "house",
  source: "test",
});

const hauptwache = { lat: 50.1138, lng: 8.6794 };

describe("distanceMeters", () => {
  it("ist für identische Punkte null", () => {
    expect(distanceMeters(hauptwache, hauptwache)).toBe(0);
  });

  it("stimmt mit einer bekannten Distanz überein (Hauptwache – Römer, ca. 700 m)", () => {
    const roemer = { lat: 50.1106, lng: 8.6816 };
    expect(distanceMeters(hauptwache, roemer)).toBeGreaterThan(300);
    expect(distanceMeters(hauptwache, roemer)).toBeLessThan(500);
  });

  it("ist symmetrisch", () => {
    const other = { lat: 50.12, lng: 8.69 };
    expect(distanceMeters(hauptwache, other)).toBeCloseTo(distanceMeters(other, hauptwache), 6);
  });
});

describe("formatDistance", () => {
  it("rundet kurze Entfernungen auf Meter", () => {
    expect(formatDistance(42.4)).toBe("42 m");
  });

  it("rundet mittlere Entfernungen auf zehn Meter", () => {
    expect(formatDistance(834)).toBe("830 m");
  });

  it("wechselt ab einem Kilometer auf Kilometer mit Komma", () => {
    expect(formatDistance(1500)).toBe("1,5 km");
    expect(formatDistance(12_400)).toBe("12 km");
  });

  it("verträgt ungültige Werte", () => {
    expect(formatDistance(Number.NaN)).toBe("–");
  });
});

describe("sortByDistance", () => {
  it("sortiert aufsteigend und lässt Parkplätze ohne Koordinaten aus", () => {
    const spots = [spot("fern", 50.2, 8.8), spot("ohne", null, null), spot("nah", 50.1139, 8.6795)];

    const sorted = sortByDistance(spots, hauptwache);
    expect(sorted.map((entry) => entry.id)).toEqual(["nah", "fern"]);
    expect(sorted[0].distanceMeters).toBeLessThan(sorted[1].distanceMeters);
  });
});

describe("findNearest", () => {
  it("findet den nächstgelegenen Parkplatz", () => {
    const nearest = findNearest([spot("a", 50.2, 8.8), spot("b", 50.1139, 8.6795)], hauptwache);
    expect(nearest?.id).toBe("b");
  });

  it("gibt null zurück, wenn kein Parkplatz verortet ist", () => {
    expect(findNearest([spot("ohne", null, null)], hauptwache)).toBeNull();
  });
});
