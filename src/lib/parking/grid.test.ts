import { describe, expect, it } from "vitest";
import { cellKey, cellSize } from "./grid";

/** Rhein-Main, grob der Ausschnitt aus dem Screenshot zu 9.20. */
const rheinMain = { minLat: 49.6, minLng: 7.4, maxLat: 50.6, maxLng: 9.1 };

describe("cellSize", () => {
  it("wird mit jeder Zoomstufe halb so groß", () => {
    const grob = cellSize(rheinMain, 8);
    const fein = cellSize(rheinMain, 9);
    expect(fein.lng).toBeCloseTo(grob.lng / 2, 10);
  });

  it("macht Zellen auf dem Bildschirm quadratisch, also in Grad niedriger als breit", () => {
    const cell = cellSize(rheinMain, 9);
    // In Deutschland ist cos(Breite) rund 0,64 – die Höhe in Grad muss
    // entsprechend kleiner sein, sonst stünden die Zähler in Reihen.
    expect(cell.lat).toBeLessThan(cell.lng);
    expect(cell.lat / cell.lng).toBeCloseTo(Math.cos((50.1 * Math.PI) / 180), 6);
  });

  it("begrenzt die Zellen je Achse, auch bei abwegiger Zoomstufe", () => {
    const welt = { minLat: -85, minLng: -180, maxLat: 85, maxLng: 180 };
    const cell = cellSize(welt, 22);
    expect(360 / cell.lng).toBeLessThanOrEqual(64);
    expect(170 / cell.lat).toBeLessThanOrEqual(64);
  });

  it("liefert ohne Zoomstufe zwölf Spalten aus dem Ausschnitt", () => {
    const cell = cellSize(rheinMain, null);
    expect(cell.lng).toBeCloseTo(1.7 / 12, 10);
  });

  it("ergibt auch ohne Ausdehnung eine Zelle über null", () => {
    const punkt = { minLat: 50, minLng: 8, maxLat: 50, maxLng: 8 };
    expect(cellSize(punkt, null).lng).toBeGreaterThan(0);
    expect(cellSize(punkt, null).lat).toBeGreaterThan(0);
  });
});

describe("cellKey", () => {
  const cell = { lat: 0.5, lng: 1 };

  it("legt nahe beieinander liegende Punkte in dieselbe Zelle", () => {
    expect(cellKey(50.1, 8.1, cell)).toBe(cellKey(50.3, 8.9, cell));
  });

  it("trennt Punkte jenseits der Zellgrenze", () => {
    expect(cellKey(50.4, 8.5, cell)).not.toBe(cellKey(50.6, 8.5, cell));
  });

  it("hängt nicht vom Ausschnitt ab, sondern am Erdursprung", () => {
    // Derselbe Punkt, egal von welchem Kartenausschnitt aus gefragt wird:
    // sonst sprängen die Zahlen beim Ziehen der Karte.
    expect(cellKey(50.1, 8.1, cell)).toBe("280:188");
  });
});
