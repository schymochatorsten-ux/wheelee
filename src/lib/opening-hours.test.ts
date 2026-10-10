import { describe, expect, it } from "vitest";
import {
  isAlwaysOpen,
  maxStay,
  normalizeTimeRestriction,
  parseTimeWindows,
  restrictionState,
  splitSeason,
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
    // „Mo - Fr; 8 - 18 Uhr“ meint einen Abschnitt, nicht zwei.
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

/**
 * Formen, an denen der Parser bisher gescheitert ist (ToDo 7.7).
 * Alle stammen aus `npm run report:times`, also aus echten Einträgen des
 * Bestands – keine erfundenen Fälle.
 */
describe("bisher nicht gedeutete Formen", () => {
  describe("Angaben, die in Wahrheit keine Beschränkung sind", () => {
    const immerOffen = [
      "PH,Mo-Su 00:00-24:00",
      "Mo-Su,PH 00:00+",
      "Mo-Su,PH 00:00-00:00",
      "Mo-Su 00:00-24:00",
    ];

    for (const angabe of immerOffen) {
      it(`erkennt „${angabe}“ als immer offen`, () => {
        expect(isAlwaysOpen(angabe)).toBe(true);
        expect(normalizeTimeRestriction(angabe)).toBeNull();
      });
    }

    it("hält eine echte Beschränkung nicht für immer offen", () => {
      expect(isAlwaysOpen("Mo-Fr 08:00-18:00")).toBe(false);
      expect(isAlwaysOpen("Mo-Sa 00:00-24:00")).toBe(false);
    });
  });

  describe("über Mitternacht", () => {
    it("teilt „07:00-02:00“ in zwei Fenster", () => {
      const fenster = parseTimeWindows("07:00-02:00");
      expect(fenster).toHaveLength(2);
      expect(fenster[0]).toMatchObject({ from: 7 * 60, to: 24 * 60 });
      expect(fenster[1]).toMatchObject({ from: 0, to: 2 * 60 });
    });

    it("legt den Teil nach Mitternacht auf den Folgetag", () => {
      // Freitag 06:00-02:00 heißt: Samstag früh um 1 Uhr gilt es noch.
      const freitagAbend = new Date("2026-10-09T23:00:00");
      const samstagNacht = new Date("2026-10-10T01:00:00");
      const samstagVormittag = new Date("2026-10-10T10:00:00");

      expect(restrictionState("Fr 06:00-02:00", freitagAbend)).toBe("gilt");
      expect(restrictionState("Fr 06:00-02:00", samstagNacht)).toBe("gilt");
      expect(restrictionState("Fr 06:00-02:00", samstagVormittag)).toBe("gilt-nicht");
    });
  });

  describe("mehrere Spannen und Feiertagsangaben", () => {
    it("liest zwei Spannen in einem Abschnitt", () => {
      const fenster = parseTimeWindows("We 00:00-07:00, 13:00-24:00");
      expect(fenster).toHaveLength(2);
    });

    it("überspringt die Feiertagsangabe, statt den Abschnitt zu verwerfen", () => {
      // Vorher verwarf der Parser jeden Abschnitt mit „PH“ komplett – die
      // Uhrzeit ging dabei verloren.
      expect(parseTimeWindows("Mo-Fr,PH 08:00-18:00").length).toBeGreaterThan(0);
    });

    it("versteht „und“ als Abschnittstrenner", () => {
      const fenster = parseTimeWindows("Mo-Fr 7-12 Uhr und Di 14-18 Uhr");
      expect(fenster).toHaveLength(2);
    });
  });

  describe("Schreibfehler der Quellen", () => {
    it("verträgt Umschreibungen wie „Mo bis Fr 7 -18 Uhr“", () => {
      expect(parseTimeWindows("Mo bis Fr 7 -18 Uhr")).toHaveLength(1);
    });
  });
});

describe("maxStay", () => {
  it("erkennt Höchstparkdauern", () => {
    expect(maxStay("2 Stunden")).toBe("2 Stunden");
    expect(maxStay("1 Stunde")).toBe("1 Stunde");
    expect(maxStay("15 min")).toBe("15 Minuten");
    expect(maxStay("0,5 Stunden")).toBe("0,5 Stunden");
  });

  it("verwechselt sie nicht mit Zeitfenstern", () => {
    expect(maxStay("Mo-Fr 08:00-18:00")).toBeNull();
    expect(maxStay("24/7")).toBeNull();
  });
});

/**
 * Die letzten offenen Formen aus `npm run report:times` (ToDo 7.7).
 *
 * Jede Zeichenkette hier ist ein **echter Eintrag aus dem Bestand**, keine
 * ausgedachte Variante. Das ist der Grund, warum diese vier und nicht
 * irgendwelche anderen gebaut wurden.
 */
describe("die letzten Formen aus dem Bestand", () => {
  it("liest Null statt O im Wochentag: „M0 - Fr 7 -19 Uhr“", () => {
    const fenster = parseTimeWindows("M0 - Fr 7 -19 Uhr");
    expect(fenster).toHaveLength(1);
    expect(fenster[0].days).toEqual([0, 1, 2, 3, 4]);
    expect(fenster[0].from).toBe(7 * 60);
  });

  it("wirft HTML aus den Daten weg und trennt daran die Abschnitte", () => {
    const fenster = parseTimeWindows("<br>Mo-Fr 9:00-20:00<br>Sa 9:00-14:00");
    expect(fenster).toHaveLength(2);
    expect(fenster[1].days).toEqual([5]);
  });

  it("verträgt den Tippfehler „Vvon“", () => {
    expect(isAlwaysOpen("Vvon 00:00 Uhr bis 24:00 Uhr")).toBe(true);
  });

  it("liest „bis“ auch zwischen Uhrzeiten: „7 bis 17 Uhr“", () => {
    const fenster = parseTimeWindows("7 bis 17 Uhr");
    expect(fenster).toHaveLength(1);
    // Ohne Wochentage gilt die Angabe täglich.
    expect(fenster[0].days).toHaveLength(7);
    expect(fenster[0].to).toBe(17 * 60);
  });

  it("liest den Gedankenstrich wie einen Bindestrich: „8–18 Uhr“", () => {
    const fenster = parseTimeWindows("8–18 Uhr");
    expect(fenster).toHaveLength(1);
    expect(fenster[0].from).toBe(8 * 60);
    expect(fenster[0].to).toBe(18 * 60);
  });

  it("trennt am Schrägstrich: „Mo-Fr 8-18/Sa 9-12“", () => {
    const fenster = parseTimeWindows("Mo-Fr 8-18/Sa 9-12");
    expect(fenster).toHaveLength(2);
    expect(fenster[1].days).toEqual([5]);
  });

  it("zerschneidet dabei nicht „24/7“", () => {
    // Die häufigste Angabe im Bestand – sie darf die neue Regel nicht treffen.
    expect(isAlwaysOpen("24/7")).toBe(true);
  });

  describe("saisonale Angaben", () => {
    /** Mittwoch im Juli, 10:00 – innerhalb von Apr-Oct. */
    const imSommer = new Date("2026-07-15T10:00:00");
    /** Donnerstag im Januar, 10:00 – außerhalb. */
    const imWinter = new Date("2026-01-15T10:00:00");

    const saison = "Apr-Oct: Mo-Su 09:00-18:00; PH 09:00-18:00";

    it("trennt den Monatsteil ab", () => {
      expect(splitSeason(saison)).toMatchObject({ from: 4, to: 10 });
    });

    it("gilt im Sommer und nicht im Winter", () => {
      expect(restrictionState(saison, imSommer)).toBe("gilt");
      expect(restrictionState(saison, imWinter)).toBe("gilt-nicht");
    });

    it("kommt über den Jahreswechsel: Nov-Mär gilt im Januar", () => {
      expect(restrictionState("Nov-Mär: Mo-Su 09:00-18:00", imWinter)).toBe("gilt");
      expect(restrictionState("Nov-Mär: Mo-Su 09:00-18:00", imSommer)).toBe("gilt-nicht");
    });
  });

  describe("Ausnahmen mit „off“", () => {
    /** Freitag, 10:00 – innerhalb der ausgenommenen Zeit. */
    const freitagVormittag = new Date("2026-10-09T10:00:00");
    /** Freitag, 20:00 – außerhalb davon. */
    const freitagAbend = new Date("2026-10-09T20:00:00");

    const mitAusnahme = "open; Fr 06:00-14:00 off";

    it("zieht die Ausnahme von der Grundregel ab", () => {
      expect(restrictionState(mitAusnahme, freitagVormittag)).toBe("gilt-nicht");
      expect(restrictionState(mitAusnahme, freitagAbend)).toBe("gilt");
      expect(restrictionState(mitAusnahme, montagVormittag)).toBe("gilt");
    });

    it("ist dadurch keine durchgehende Öffnung mehr", () => {
      // Ohne den Abzug wäre „open" allein „immer offen" – die Ausnahme
      // verschwiegen, und das wäre die schlimmere Auskunft.
      expect(isAlwaysOpen(mitAusnahme)).toBe(false);
      expect(isAlwaysOpen("open")).toBe(true);
    });

    it("zieht ausgenommene ganze Tage ab: „Mo-Fr 04:00-23:00, Sa-Su off“", () => {
      const fenster = parseTimeWindows("Mo-Fr 04:00-23:00, Sa-Su off");
      expect(fenster.every((window) => !window.days.includes(5))).toBe(true);
      expect(fenster.every((window) => !window.days.includes(6))).toBe(true);
      expect(fenster.length).toBeGreaterThan(0);
    });

    it("zieht sie auch dann ab, wenn sie die Regel überschneiden", () => {
      // Hier sagt die Ausnahme etwas Neues: Ohne Abzug wäre der Samstag
      // fälschlich dabei.
      const fenster = parseTimeWindows("Mo-Su 08:00-18:00, Sa off");
      expect(fenster.every((window) => !window.days.includes(5))).toBe(true);
      expect(fenster.some((window) => window.days.includes(0))).toBe(true);
    });

    it("verwirft die Bemerkung hinter „||“", () => {
      const fenster = parseTimeWindows('06:00-22:00 || "Ausfahrt jederzeit möglich"');
      expect(fenster).toHaveLength(1);
      expect(fenster[0].to).toBe(22 * 60);
    });

    it("behauptet nichts, wenn nur eine Ausnahme ohne Grundregel dasteht", () => {
      // „PH off" und „Mo-Su,PH off" stehen so im Bestand. Was sie für eine
      // Beschränkung bedeuten sollen, ist nicht zu entscheiden.
      expect(restrictionState("PH off", montagVormittag)).toBe("unbekannt");
      expect(restrictionState("Mo-Su,PH off", montagVormittag)).toBe("unbekannt");
    });
  });
});
