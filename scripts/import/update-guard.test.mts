import { describe, expect, it } from "vitest";
import { judgeUpdate } from "./update-guard.mjs";

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
