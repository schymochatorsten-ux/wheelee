import { describe, expect, it } from "vitest";
import { judgeUpdate, sameSpots } from "./update-guard.mjs";

describe("sameSpots", () => {
  const a = { generatedAt: "2026-10-08", spots: [{ id: "x", lat: 1, lng: 2, label: "A" }] };

  it("ignoriert Datum und Schlüsselreihenfolge", () => {
    const b = { spots: [{ label: "A", lng: 2, lat: 1, id: "x" }], generatedAt: "2026-11-01" };
    expect(sameSpots(a, b)).toBe(true);
  });

  it("erkennt jede Änderung an den Standorten", () => {
    expect(sameSpots(a, { spots: [{ id: "x", lat: 1, lng: 2.0001, label: "A" }] })).toBe(false);
    expect(sameSpots(a, { spots: [] })).toBe(false);
  });

  it("hält fehlende oder kaputte Dateien nie für gleich", () => {
    expect(sameSpots(null, null)).toBe(false);
    expect(sameSpots({}, {})).toBe(false);
  });
});

const amtlich = { status: "fertig", usedSource: "amtlich (WFS)" };

describe("judgeUpdate", () => {
  it("übernimmt einen gleich großen oder größeren amtlichen Import", () => {
    expect(judgeUpdate({ locations: 500 }, { ...amtlich, locations: 500 }).accept).toBe(true);
    expect(judgeUpdate({ locations: 218 }, { ...amtlich, locations: 568 }).accept).toBe(true);
  });

  it("lehnt einen Rückfall auf OpenStreetMap ab", () => {
    const result = judgeUpdate({ locations: 900 }, { status: "fertig", usedSource: "OpenStreetMap", locations: 950 });
    expect(result.accept).toBe(false);
  });

  it("lehnt einen starken Rückgang ab, toleriert einen kleinen", () => {
    expect(judgeUpdate({ locations: 1000 }, { ...amtlich, locations: 600 }).accept).toBe(false);
    expect(judgeUpdate({ locations: 1000 }, { ...amtlich, locations: 800 }).accept).toBe(true);
  });

  it("lehnt Fehlschlag und leeres Ergebnis ab", () => {
    expect(judgeUpdate({ locations: 10 }, { status: "fehlgeschlagen", usedSource: null, locations: null }).accept).toBe(false);
    expect(judgeUpdate({ locations: 10 }, { ...amtlich, locations: 0 }).accept).toBe(false);
  });
});
