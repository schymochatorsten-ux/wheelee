import { describe, expect, it } from "vitest";
import { judgeUpdate, pickDue, sameSpots } from "./update-guard.mjs";

describe("pickDue", () => {
  const now = new Date("2026-11-10T04:00:00Z");
  const c = (slug: string, since: string | null) => ({ slug, since });

  it("nimmt höchstens max Städte, die am längsten unbesehenen zuerst", () => {
    const result = pickDue(
      [c("a", "2026-10-05T00:00:00Z"), c("b", "2026-09-01T00:00:00Z"), c("c", null), c("d", "2026-10-30T00:00:00Z")],
      [],
      { tried: {} },
      2,
      now,
    );
    expect(result.run).toEqual(["c", "b"]);
    expect(result.pending).toEqual(["a", "d"]);
  });

  it("holt Vorgemerktes nach und führt Doppelte nur einmal", () => {
    const result = pickDue([c("a", "2026-10-05T00:00:00Z")], [c("a", "2026-10-05T00:00:00Z"), c("z", "2026-08-01T00:00:00Z")], { tried: {} }, 5, now);
    expect(result.run).toEqual(["z", "a"]);
  });

  it("wartet nach einem verworfenen Import eine Woche", () => {
    const state = { tried: { a: "2026-11-05T00:00:00Z", b: "2026-11-01T00:00:00Z" } };
    const result = pickDue([c("a", null), c("b", null)], [], state, 5, now);
    expect(result.run).toEqual(["b"]);
    expect(result.pending).toEqual([]);
  });
});

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

  it("vergleicht grob: Straßennamen zählen nicht, Lage und Anzahl schon", () => {
    const withStreet = { spots: [{ id: "x", lat: 1, lng: 2, spotCount: 1, label: "Parkplatz", street: "Hauptstraße" }] };
    const fresh = { spots: [{ id: "x", lat: 1, lng: 2, spotCount: 1, label: "Behindertenparkplatz Ulm", street: null }] };
    expect(sameSpots(withStreet, fresh)).toBe(false);
    expect(sameSpots(withStreet, fresh, { coarse: true })).toBe(true);
    expect(sameSpots(withStreet, { spots: [{ ...fresh.spots[0], spotCount: 2 }] }, { coarse: true })).toBe(false);
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
