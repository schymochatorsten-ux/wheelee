import { describe, expect, it } from "vitest";
import { osmOnlySpots } from "./confirmation";
import { spotById, spotsInBounds } from "./spots";

/** Standorte nur aus OpenStreetMap werden angezeigt und gekennzeichnet (ToDo 3.11). */
describe("nur in OpenStreetMap", () => {
  const spots = osmOnlySpots();

  it("gibt es aus dem Abgleich", () => {
    expect(spots.length).toBeGreaterThan(0);
  });

  it("vergibt eindeutige, stabile IDs", () => {
    expect(new Set(spots.map((s) => s.id)).size).toBe(spots.length);
    expect(osmOnlySpots().map((s) => s.id)).toEqual(spots.map((s) => s.id));
  });

  it("liefert sie als gekennzeichnete Standorte aus", () => {
    const first = spots[0];
    const found = spotById(first.id);
    expect(found?.confirmation).toBe("nur_osm");
    expect(found?.city).toBe(first.city);
    expect(found?.source).toBe("OpenStreetMap");
  });

  it("findet sie im Kartenausschnitt", () => {
    const first = spots[0];
    const { spots: inBox } = spotsInBounds({
      minLat: first.lat - 0.0005,
      maxLat: first.lat + 0.0005,
      minLng: first.lng - 0.0005,
      maxLng: first.lng + 0.0005,
    });
    expect(inBox.some((s) => s.id === first.id)).toBe(true);
  });
});
