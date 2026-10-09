/**
 * Zeitliche Beschränkungen von Parkplätzen deuten.
 *
 * Die Quellen schreiben sie in sehr unterschiedlicher Form: OpenStreetMap im
 * `opening_hours`-Format („Mo-Fr 08:00-18:00"), die Städte in Fließtext
 * („Mo - Fr 8 - 18 Uhr", „werktags 8-18 Uhr", „von 00:00 Uhr bis 24:00 Uhr").
 *
 * Grundsatz: **Im Zweifel nichts behaupten.** Eine falsch verstandene
 * Zeitangabe ist schlimmer als keine – wer glaubt, der Platz sei frei nutzbar,
 * und dann ein Knöllchen bekommt, ist schlechter dran als jemand, der selbst
 * nachsieht.
 */

/** Wochentag, 0 = Montag. */
type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface TimeWindow {
  /** Tage, an denen das Fenster gilt. */
  days: Weekday[];
  /** Beginn in Minuten seit Mitternacht. */
  from: number;
  /** Ende in Minuten seit Mitternacht. */
  to: number;
}

const DAY_NAMES: Record<string, Weekday> = {
  mo: 0,
  di: 1,
  tu: 1,
  mi: 2,
  we: 3 as Weekday,
  do: 3,
  th: 3,
  fr: 4,
  sa: 5,
  so: 6,
  su: 6,
};

// `we` kollidiert zwischen Deutsch (Mittwoch = Mi) und Englisch (Wednesday).
// Richtig ist: Mi = 2, We = 2.
DAY_NAMES.we = 2;
DAY_NAMES.mi = 2;
DAY_NAMES.do = 3;
DAY_NAMES.th = 3;

/**
 * Angaben, die *keine* Beschränkung sind.
 *
 * Zwei Drittel aller Zeitangaben im Bestand sagen nur „immer offen" – als
 * „Nur: 24/7" in der Detailansicht gelesen, wirkt das wie eine Einschränkung
 * und verunsichert ohne Grund.
 */
const ALWAYS = [
  /^24\s*\/\s*7$/iu,
  /^(mo|mon)\s*-\s*(su|so)[,\s]*(ph)?\s*00:00\s*-\s*24:00$/iu,
  /^0?0[:.]?0?0?\s*(uhr)?\s*(-|bis)\s*24[:.]?0?0?\s*(uhr)?$/iu,
  /^von\s*00:00\s*uhr\s*bis\s*24:00\s*uhr$/iu,
  /^(durchgehend|ganztägig|ganztaegig|immer|rund um die uhr|jederzeit|ja)$/iu,
  /^0\s*bis\s*24\s*uhr$/iu,
  /^00:00\s*-\s*24:00$/iu,
];

/** Bedeutet die Angabe „keine Beschränkung"? */
export function isAlwaysOpen(text: string | null | undefined): boolean {
  if (!text) return false;
  const clean = text.trim();
  return ALWAYS.some((pattern) => pattern.test(clean));
}

/**
 * Zeitangabe für die Anzeige aufbereiten.
 * Gibt `null` zurück, wenn es gar keine Beschränkung ist.
 */
export function normalizeTimeRestriction(text: string | null | undefined): string | null {
  if (!text) return null;
  const clean = text.replace(/\s+/gu, " ").trim();
  if (clean.length === 0 || isAlwaysOpen(clean)) return null;
  return clean;
}

/** „8", „8:30", „08:00" → Minuten seit Mitternacht. */
function parseClock(value: string): number | null {
  const match = /^(\d{1,2})(?:[:.](\d{2}))?$/u.exec(value.trim());
  if (!match) return null;

  const hours = Number.parseInt(match[1], 10);
  const minutes = match[2] ? Number.parseInt(match[2], 10) : 0;
  if (hours > 24 || minutes > 59) return null;

  return hours * 60 + minutes;
}

/** „Mo-Fr", „Mo - Fr", „Mo, Di, Do" → Wochentage. */
function parseDays(value: string): Weekday[] | null {
  const clean = value.toLowerCase().replace(/\s+/gu, "");
  if (/^(werktags|wochentags)$/u.test(clean)) return [0, 1, 2, 3, 4, 5];

  const range = /^([a-zä]{2})-([a-zä]{2})$/u.exec(clean);
  if (range) {
    const from = DAY_NAMES[range[1]];
    const to = DAY_NAMES[range[2]];
    if (from === undefined || to === undefined) return null;

    const days: Weekday[] = [];
    for (let day = from; ; day = ((day + 1) % 7) as Weekday) {
      days.push(day);
      if (day === to) break;
      if (days.length > 7) return null;
    }
    return days;
  }

  const single = clean.split(/[,+]/u).filter(Boolean);
  const days = single.map((name) => DAY_NAMES[name]);
  return days.every((day) => day !== undefined) ? (days as Weekday[]) : null;
}

/** Nur Wochentage, keine Uhrzeit – etwa „Mo - Fr". */
const DAYS_ONLY = /^[A-Za-zÄÖÜäöü]{2}(\s*[-,]\s*[A-Za-zÄÖÜäöü]{2})*$/u;

/**
 * Angabe in Abschnitte zerlegen.
 *
 * Das Semikolon trennt normalerweise Abschnitte („Mo-Fr 6-19; Sa 6-13"),
 * manche Quellen setzen es aber zwischen Tage und Uhrzeit („Mo - Fr; 8 - 18
 * Uhr"). Steht in einem Abschnitt nur ein Tagesbereich, gehört er zum
 * nächsten.
 */
function splitSections(text: string): string[] {
  const parts = text.split(/[;]/u).map((part) => part.replace(/\s+/gu, " ").trim());
  const sections: string[] = [];

  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];
    const next = parts[index + 1];

    if (next !== undefined && DAYS_ONLY.test(part)) {
      sections.push(`${part} ${next}`);
      index += 1;
      continue;
    }
    sections.push(part);
  }

  return sections;
}

/**
 * Zeitfenster aus einer Angabe lesen.
 * Nur die Formen, die eindeutig sind – alles andere ergibt eine leere Liste,
 * und die Oberfläche sagt dann nichts über die aktuelle Gültigkeit.
 */
export function parseTimeWindows(text: string | null | undefined): TimeWindow[] {
  if (!text || isAlwaysOpen(text)) return [];

  const windows: TimeWindow[] = [];
  const ALL_DAYS: Weekday[] = [0, 1, 2, 3, 4, 5, 6];

  for (const part of splitSections(text)) {
    const clean = part.replace(/\s+/gu, " ").trim();
    if (clean.length === 0 || /\b(ph|feiertag)\b/iu.test(clean)) continue;

    // Reine Uhrzeit ohne Wochentage („7 - 19 Uhr", „08:00-21:00") gilt täglich.
    const timeOnly =
      /^(\d{1,2}(?:[:.]\d{2})?)\s*(?:-|bis)\s*(\d{1,2}(?:[:.]\d{2})?)\s*(?:uhr|h)?$/iu.exec(clean);
    if (timeOnly) {
      const from = parseClock(timeOnly[1]);
      const to = parseClock(timeOnly[2]);
      if (from !== null && to !== null && to > from) {
        windows.push({ days: ALL_DAYS, from, to });
      }
      continue;
    }

    // „Mo-Fr 8-18 Uhr", „werktags 8-18 Uhr", „Mo - Fr, 8 - 18 Uhr"
    const match =
      /^([A-Za-zÄÖÜäöü]{2}\s*-\s*[A-Za-zÄÖÜäöü]{2}|werktags|wochentags|(?:[A-Za-zÄÖÜäöü]{2}[,\s]*)+?)[,;\s]+(\d{1,2}(?:[:.]\d{2})?)\s*(?:-|bis)\s*(\d{1,2}(?:[:.]\d{2})?)\s*(?:uhr|h)?$/iu.exec(
        clean,
      );
    if (!match) continue;

    const days = parseDays(match[1]);
    const from = parseClock(match[2]);
    const to = parseClock(match[3]);
    if (!days || from === null || to === null || to <= from) continue;

    windows.push({ days, from, to });
  }

  return windows;
}

export type RestrictionState =
  /** Gilt gerade – der Parkplatz ist nutzbar. */
  | "gilt"
  /** Gilt gerade nicht. */
  | "gilt-nicht"
  /** Angabe nicht sicher deutbar. */
  | "unbekannt";

/**
 * Gilt die Beschränkung zum gegebenen Zeitpunkt?
 *
 * `unbekannt` ist das richtige Ergebnis, wann immer die Angabe nicht
 * zweifelsfrei zu deuten ist. Lieber nichts sagen als etwas Falsches.
 */
export function restrictionState(
  text: string | null | undefined,
  now: Date = new Date(),
): RestrictionState {
  const normalized = normalizeTimeRestriction(text);
  if (!normalized) return "unbekannt";

  const windows = parseTimeWindows(normalized);
  if (windows.length === 0) return "unbekannt";

  // JavaScript zählt Sonntag als 0; hier ist Montag die 0.
  const day = ((now.getDay() + 6) % 7) as Weekday;
  const minutes = now.getHours() * 60 + now.getMinutes();

  const active = windows.some(
    (window) => window.days.includes(day) && minutes >= window.from && minutes < window.to,
  );

  return active ? "gilt" : "gilt-nicht";
}
