import { describe, expect, it } from "vitest";
import type { ParkingSpot } from "../../src/lib/types.js";
import { mergeZusatz } from "./zusatz.mjs";

function spot(id: string, label = id): ParkingSpot {
  return {
    id,
    city: "heidelberg",
    label,
    street: label,
    houseNumber: null,
    note: null,
    timeRestriction: null,
    district: "Heidelberg",
    spotCount: 1,
    lat: 49.41,
    lng: 8.69,
    geoAccuracy: "house",
    source: "Prüfung",
  };
}

describe("mergeZusatz", () => {
  it("hängt ergänzte Standorte an", () => {
    const merged = mergeZusatz([spot("a")], [spot("b")]);
    expect(merged.map((s) => s.id)).toEqual(["a", "b"]);
  });

  it("lässt der Quelle den Vortritt", () => {
    // Käme die Stadt je mit einer eigenen Datei zurück, soll ihre Fassung
    // gelten – sonst überlebt eine von Hand abgeschriebene Zeile die amtliche.
    const merged = mergeZusatz([spot("a", "amtlich")], [spot("a", "abgeschrieben")]);
    expect(merged).toHaveLength(1);
    expect(merged[0].label).toBe("amtlich");
  });

  it("ändert nichts ohne Ergänzung", () => {
    expect(mergeZusatz([spot("a")], [])).toHaveLength(1);
  });
});
