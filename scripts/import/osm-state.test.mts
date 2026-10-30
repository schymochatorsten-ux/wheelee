import { describe, expect, it } from "vitest";
import { spreadKm } from "./osm-state.mjs";

describe("spreadKm", () => {
  it("ist null bei weniger als zwei verorteten Standorten", () => {
    expect(spreadKm([])).toBe(0);
    expect(spreadKm([{ lat: 50, lng: 8 }])).toBe(0);
    expect(spreadKm([{ lat: 50, lng: 8 }, { lat: null, lng: null }])).toBe(0);
  });

  it("misst die Diagonale des Rechtecks in Kilometern", () => {
    // 0,1° Breite ≈ 11 km; 0,1° Länge auf 50° ≈ 7,2 km → Diagonale ≈ 13 km
    const km = spreadKm([
      { lat: 50, lng: 8 },
      { lat: 50.1, lng: 8.1 },
    ]);
    expect(km).toBeGreaterThan(12.5);
    expect(km).toBeLessThan(13.5);
  });

  it("trennt eine zusammenhängende Stadt von einer falschen Zuordnung (157 km)", () => {
    const stadt = spreadKm([
      { lat: 49.4, lng: 8.67 },
      { lat: 49.43, lng: 8.7 },
    ]);
    // „Weil am Rhein“ und „Weil im Schönbuch“ in einer Datei (2e.7): rund 157 km.
    const falsch = spreadKm([
      { lat: 47.59, lng: 7.62 },
      { lat: 48.65, lng: 9.0 },
    ]);
    expect(stadt).toBeLessThan(15);
    expect(falsch).toBeGreaterThan(100);
  });
});
