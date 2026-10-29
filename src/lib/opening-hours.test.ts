import { describe, expect, it } from "vitest";
import { LOCALE_CODES, type Locale } from "@/i18n";
import {
  describeRestriction,
  formatTimeRestriction,
  isAlwaysOpen,
  maxStay,
  normalizeTimeRestriction,
  parseTimeWindows,
  restrictionState,
  splitSeason,
  understandRestriction,
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

/**
 * Zeitangaben je Sprache (ToDo 15.4).
 *
 * Die Angabe wird **ausgegeben, nicht je Sprache neu gedeutet**: Die Tests
 * prüfen deshalb nicht nur, was in welcher Sprache dasteht, sondern dass das
 * Verstandene dasselbe ist wie das, woraus „gilt gerade?" gerechnet wird – für
 * jede Sprache.
 */
describe("Zeitangaben je Sprache", () => {
  /** Echte und nachgebaute Formen aus dem Bestand, die sicher verstanden werden. */
  const verstanden = [
    "Mo - Fr 8 - 18 Uhr",
    "Mo-Fr 06:00-19:00; Sa 06:00-13:00",
    "werktags 8-18 Uhr",
    "Apr-Oct: Mo-Su 09:00-18:00",
    "Fr-Sa 06:00-02:00",
    "Mo-Fr 00:00-07:00, 13:00-24:00",
    "7 - 19 Uhr",
    "Mo, Di, Do 08:00-12:00",
  ];

  /** Formen, bei denen etwas verloren ginge – dort bleibt der deutsche Text stehen. */
  const unsicher = [
    "Mo-Su 08:00-18:00, Sa off",
    "Mo-Fr 08:00-19:00, PH off",
    "Mo-Fr 8-18 Uhr, Feiertage ausgenommen",
    'Mo-Fr 06:00-22:00 || "Ausfahrt jederzeit möglich"',
    "Mo-Fr 08:00+",
    "open; Fr 06:00-14:00 off",
    "nach Vereinbarung",
  ];

  const montag = (stunde: number, tag = 5) =>
    new Date(`2026-10-${String(tag).padStart(2, "0")}T${String(stunde).padStart(2, "0")}:00:00`);

  it("lässt Deutsch unverändert – der Quelltext steht so da, wie er in den Daten steht", () => {
    expect(formatTimeRestriction("Mo - Fr   8 - 18 Uhr", "de")).toBe("Mo - Fr 8 - 18 Uhr");
    expect(formatTimeRestriction("24/7", "de")).toBeNull();
  });

  it("schreibt Wochentage und Uhrzeiten in der Sprache", () => {
    expect(describeRestriction("Mo - Fr 8 - 18 Uhr", "en")).toBe("Mon–Fri 08:00–18:00");
    expect(describeRestriction("Mo - Fr 8 - 18 Uhr", "es")).toBe("lun–vie 08:00–18:00");
    expect(describeRestriction("Mo-Fr 06:00-19:00; Sa 06:00-13:00", "en")).toBe(
      "Mon–Fri 06:00–19:00; Sat 06:00–13:00",
    );
    expect(describeRestriction("Mo, Di, Do 08:00-12:00", "en")).toBe("Mon, Tue, Thu 08:00–12:00");
  });

  it("schreibt Monate bei saisonalen Angaben in der Sprache", () => {
    expect(describeRestriction("Apr-Oct: Mo-Su 09:00-18:00", "en")).toBe(
      "Apr–Oct: Mon–Sun 09:00–18:00",
    );
    expect(describeRestriction("Apr-Oct: Mo-Su 09:00-18:00", "es")).toBe(
      "abr–oct: lun–dom 09:00–18:00",
    );
  });

  it("zeigt über Mitternacht die Spanne, wie die Quelle sie nennt", () => {
    expect(describeRestriction("Fr-Sa 06:00-02:00", "en")).toBe("Fri, Sat 06:00–02:00");
  });

  for (const sprache of LOCALE_CODES as Locale[]) {
    describe(sprache, () => {
      it("versteht jede der Formen und gibt sie vollständig aus", () => {
        for (const text of verstanden) {
          const ausgabe = formatTimeRestriction(text, sprache);
          expect(ausgabe, text).not.toBeNull();
          // Jede Uhrzeit der Quelle steht in der Ausgabe.
          const verstandene = understandRestriction(text)!;
          if (sprache !== "de") {
            for (const { ranges } of verstandene.sections) {
              for (const { from, to } of ranges) {
                const uhr = (m: number) =>
                  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
                expect(ausgabe, text).toContain(`${uhr(from)}–${uhr(to)}`);
              }
            }
          }
        }
      });

      it("behält bei Unsicherem den deutschen Quelltext, statt etwas wegzulassen", () => {
        for (const text of unsicher) {
          expect(describeRestriction(text, sprache), text).toBeNull();
          expect(formatTimeRestriction(text, sprache), text).toBe(
            text.replace(/\s+/gu, " ").trim(),
          );
        }
      });

      it("meldet für jeden Zeitpunkt denselben Zustand wie der Quelltext", () => {
        // Aus dem Verstandenen gerechnet – dasselbe, was die Sprache ausgibt.
        const zustand = (text: string, jetzt: Date) => {
          const v = understandRestriction(text)!;
          if (v.season) {
            const m = jetzt.getMonth() + 1;
            const drin =
              v.season.from <= v.season.to
                ? m >= v.season.from && m <= v.season.to
                : m >= v.season.from || m <= v.season.to;
            if (!drin) return "gilt-nicht";
          }
          const tag = (jetzt.getDay() + 6) % 7;
          const minuten = jetzt.getHours() * 60 + jetzt.getMinutes();
          const gilt = v.sections.some(({ days, ranges }) =>
            ranges.some(({ from, to }) =>
              to > from
                ? days.includes(tag as never) && minuten >= from && minuten < to
                : (days.includes(tag as never) && minuten >= from) ||
                  (days.map((d) => (d + 1) % 7).includes(tag) && minuten < to),
            ),
          );
          return gilt ? "gilt" : "gilt-nicht";
        };

        for (const text of verstanden) {
          for (const stunde of [0, 1, 5, 7, 10, 18, 20, 23]) {
            for (const tag of [5, 6, 9, 10, 11]) {
              const jetzt = montag(stunde, tag);
              expect(zustand(text, jetzt), `${text} @ ${jetzt.toISOString()}`).toBe(
                restrictionState(text, jetzt),
              );
            }
          }
        }
      });

      it("schreibt Höchstparkdauern in der Sprache", () => {
        const erwartet: Record<string, string[]> = {
          de: ["2 Stunden", "1 Stunde", "15 Minuten", "0,5 Stunden"],
          en: ["2 hours", "1 hour", "15 minutes", "0.5 hours"],
          es: ["2 horas", "1 hora", "15 minutos", "0,5 horas"],
          fr: ["2 heures", "1 heure", "15 minutes", "0,5 heures"],
          it: ["2 ore", "1 ora", "15 minuti", "0,5 ore"],
          pl: ["2 godz.", "1 godz.", "15 min", "0,5 godz."],
        };
        expect(
          ["2 Stunden", "1 Stunde", "15 min", "0,5 Stunden"].map((q) => maxStay(q, sprache)),
        ).toEqual(erwartet[sprache]);
      });
    });
  }
});
