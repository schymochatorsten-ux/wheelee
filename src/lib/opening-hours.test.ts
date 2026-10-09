import { describe, expect, it } from "vitest";
import {
  isAlwaysOpen,
  normalizeTimeRestriction,
  parseTimeWindows,
  restrictionState,
} from "./opening-hours";

/** Montag, 10:00 Uhr. */
const montagVormittag = new Date("2026-10-05T10:00:00");
/** Montag, 20:00 Uhr. */
const montagAbend = new Date("2026-10-05T20:00:00");
/** Sonntag, 10:00 Uhr. */
const sonntagVormittag = new Date("2026-10-11T10:00:00");

describe("isAlwaysOpen", () => {
  it("erkennt die häufigsten Formen aus den Daten", () => {
    // Diese beiden machen zwei Drittel aller Zeitangaben im Bestand aus.
    expect(isAlwaysOpen("24/7")).toBe(true);
    expect(isAlwaysOpen("von 00:00 Uhr bis 24:00 Uhr")).toBe(true);

    expect(isAlwaysOpen("0 bis 24 Uhr")).toBe(true);
    expect(isAlwaysOpen("Mo-Su,PH 00:00-24:00")).toBe(true);
    expect(isAlwaysOpen("durchgehend")).toBe(true);
    expect(isAlwaysOpen("00:00-24:00")).toBe(true);
  });

  it("hält echte Beschränkungen nicht für „immer offen“", () => {
    expect(isAlwaysOpen("Mo - Fr 8 - 18 Uhr")).toBe(false);
    expect(isAlwaysOpen("werktags 8-18 Uhr")).toBe(false);
    expect(isAlwaysOpen("Mo-Sa 08:00-20:00")).toBe(false);
  });

  it("verträgt leere Angaben", () => {
    expect(isAlwaysOpen(null)).toBe(false);
    expect(isAlwaysOpen("")).toBe(false);
  });
});

describe("normalizeTimeRestriction", () => {
  it("entfernt Angaben, die keine Beschränkung sind", () => {
    expect(normalizeTimeRestriction("24/7")).toBeNull();
    expect(normalizeTimeRestriction("von 00:00 Uhr bis 24:00 Uhr")).toBeNull();
  });

  it("behält echte Beschränkungen und räumt Leerzeichen auf", () => {
    expect(normalizeTimeRestriction("Mo - Fr   8 - 18 Uhr")).toBe("Mo - Fr 8 - 18 Uhr");
  });
});

describe("parseTimeWindows", () => {
  it("liest einen Tagesbereich mit Uhrzeiten", () => {
    const [window] = parseTimeWindows("Mo - Fr 8 - 18 Uhr");
    expect(window.days).toEqual([0, 1, 2, 3, 4]);
    expect(window.from).toBe(8 * 60);
    expect(window.to).toBe(18 * 60);
  });

  it("versteht das OpenStreetMap-Format", () => {
    const [window] = parseTimeWindows("Mo-Sa 08:00-20:00");
    expect(window.days).toEqual([0, 1, 2, 3, 4, 5]);
    expect(window.to).toBe(20 * 60);
  });

  it("versteht „werktags“", () => {
    const [window] = parseTimeWindows("werktags 8-18 Uhr");
    expect(window.days).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("liest halbe Stunden", () => {
    const [window] = parseTimeWindows("Mo - Fr 7:30 - 17 Uhr");
    expect(window.from).toBe(7 * 60 + 30);
  });

  it("liest mehrere Abschnitte", () => {
    const windows = parseTimeWindows("Mo-Fr 06:00-19:00; Sa 06:00-13:00");
    expect(windows).toHaveLength(2);
    expect(windows[1].days).toEqual([5]);
  });

  it("versteht reine Uhrzeiten als tägliche Angabe", () => {
    const [window] = parseTimeWindows("7 - 19 Uhr");
    expect(window.days).toEqual([0, 1, 2, 3, 4, 5, 6]);
    expect(window.from).toBe(7 * 60);
  });

  it("versteht das Semikolon zwischen Tagen und Uhrzeit", () => {
    // „Mo - Fr; 8 - 18 Uhr" meint einen Abschnitt, nicht zwei.
    const windows = parseTimeWindows("Mo - Fr; 8 - 18 Uhr");
    expect(windows).toHaveLength(1);
    expect(windows[0].days).toEqual([0, 1, 2, 3, 4]);
    expect(windows[0].to).toBe(18 * 60);
  });

  it("gibt nichts zurück, was es nicht sicher versteht", () => {
    // Lieber keine Aussage als eine falsche.
    expect(parseTimeWindows("Mo Di Do Fr 8-11 h und 15-17 h, Mi 8-11 h")).toEqual([]);
    expect(parseTimeWindows("nach Vereinbarung")).toEqual([]);
    expect(parseTimeWindows("24/7")).toEqual([]);
  });
});

describe("restrictionState", () => {
  it("erkennt, dass eine Beschränkung gerade gilt", () => {
    expect(restrictionState("Mo - Fr 8 - 18 Uhr", montagVormittag)).toBe("gilt");
  });

  it("erkennt, dass sie gerade nicht gilt", () => {
    expect(restrictionState("Mo - Fr 8 - 18 Uhr", montagAbend)).toBe("gilt-nicht");
    expect(restrictionState("Mo - Fr 8 - 18 Uhr", sonntagVormittag)).toBe("gilt-nicht");
  });

  it("sagt nichts, wenn die Angabe nicht deutbar ist", () => {
    expect(restrictionState("nach Vereinbarung", montagVormittag)).toBe("unbekannt");
    expect(restrictionState(null, montagVormittag)).toBe("unbekannt");
  });

  it("sagt nichts bei „immer offen“ – dort gibt es nichts zu melden", () => {
    expect(restrictionState("24/7", montagAbend)).toBe("unbekannt");
  });

  it("behandelt den Sonntag richtig", () => {
    // JavaScript zählt Sonntag als 0, hier ist Montag die 0 – ein beliebter
    // Fehler um genau einen Tag.
    expect(restrictionState("Mo-Sa 08:00-20:00", sonntagVormittag)).toBe("gilt-nicht");
    expect(restrictionState("Mo-Sa 08:00-20:00", montagVormittag)).toBe("gilt");
  });
});
