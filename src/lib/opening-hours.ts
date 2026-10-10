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

/**
 * Bedeutet die Angabe „keine Beschränkung"?
 *
 * Neben den festen Formen oben erkennt sie auch jede Angabe, deren
 * **ausgewertete Zeitfenster alle sieben Tage rund um die Uhr abdecken** –
 * etwa „PH,Mo-Su 00:00-24:00" oder „Mo-Su,PH 00:00+". Diese Formen einzeln
 * aufzulisten wäre ein Fass ohne Boden; die Quellen schreiben dasselbe auf
 * ein Dutzend Arten.
 */
export function isAlwaysOpen(text: string | null | undefined): boolean {
  if (!text) return false;
  const clean = text.trim();
  if (ALWAYS.some((pattern) => pattern.test(clean))) return true;
  return coversWholeWeek(parseWindows(clean));
}

/** Decken die Fenster alle sieben Tage vollständig ab? */
function coversWholeWeek(windows: TimeWindow[]): boolean {
  if (windows.length === 0) return false;

  for (let day = 0; day < 7; day += 1) {
    const forDay = windows
      .filter((window) => window.days.includes(day as Weekday))
      .sort((a, b) => a.from - b.from);
    if (forDay.length === 0) return false;

    let reached = 0;
    for (const window of forDay) {
      if (window.from > reached) return false;
      reached = Math.max(reached, window.to);
    }
    if (reached < 24 * 60) return false;
  }

  return true;
}

/**
 * Höchstparkdauer statt Zeitfenster.
 *
 * „2 Stunden" oder „15 min" ist keine Angabe, *wann* der Platz gilt, sondern
 * *wie lange* man stehen darf. Als „Nur: 2 Stunden" gelesen wirkt es wie eine
 * Öffnungszeit – zwei verschiedene Dinge, die man nicht verwechseln darf.
 */
export function maxStay(text: string | null | undefined): string | null {
  if (!text) return null;
  const clean = text.replace(/\s+/gu, " ").trim();

  const match = /^(\d+(?:[.,]\d+)?)\s*(min(?:uten)?|std\.?|stunden?|h)$/iu.exec(clean);
  if (!match) return null;

  const value = match[1].replace(".", ",");
  const unit = /^min/iu.test(match[2]) ? "Minuten" : value === "1" ? "Stunde" : "Stunden";
  return `${value} ${unit}`;
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
 * Schreibfehler und Eigenheiten der Quellen glätten, bevor geparst wird.
 *
 * Alle Fälle stammen aus echten Einträgen: „Mo - Fr, 8 . 18 Uhr" (Punkt statt
 * Bindestrich), „8- - 18 Uhr" (doppeltes Trennzeichen), „Mo bis Fr" statt
 * „Mo-Fr". Das sind keine erfundenen Vorsichtsmaßnahmen – es sind die
 * Angaben, an denen der Parser gescheitert ist.
 */
function tidy(text: string): string {
  return (
    text
      .replace(/\s+/gu, " ")
      // „Mo bis Fr" → „Mo-Fr", aber „8 bis 18" bleibt unangetastet.
      .replace(/([A-Za-zÄÖÜäöü]{2})\s+bis\s+([A-Za-zÄÖÜäöü]{2})\b/giu, "$1-$2")
      // „8 . 18 Uhr" → „8 - 18 Uhr": ein Punkt zwischen Leerzeichen ist nie
      // ein Dezimaltrenner.
      .replace(/(\d)\s+\.\s+(\d)/gu, "$1-$2")
      // „8- - 18" → „8-18"
      .replace(/-\s*-+/gu, "-")
      // „und" trennt Abschnitte wie das Semikolon.
      .replace(/\s+und\s+/giu, "; ")
      .trim()
  );
}

/** Feiertagsangaben entfernen – sie sagen nichts über die Uhrzeit. */
function stripHolidays(days: string): string {
  return days
    .replace(/\bph\b/giu, "")
    .replace(/\bfeiertage?\b/giu, "")
    .replace(/[,\s]+$/u, "")
    .replace(/^[,\s]+/u, "")
    .replace(/,\s*,/gu, ",")
    .trim();
}

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
  if (!text) return [];
  // Eine Angabe, die „immer offen" bedeutet, ist keine Beschränkung – die
  // Fenster werden dann nicht gebraucht.
  if (ALWAYS.some((pattern) => pattern.test(text.trim()))) return [];
  return parseWindows(text);
}

const ALL_DAYS: Weekday[] = [0, 1, 2, 3, 4, 5, 6];

/** Eine oder mehrere Uhrzeitspannen aus einem Abschnitt lesen. */
function parseRanges(text: string, days: Weekday[]): TimeWindow[] {
  const windows: TimeWindow[] = [];

  // Mehrere Spannen je Abschnitt: „00:00-07:00, 13:00-24:00".
  for (const piece of text.split(",")) {
    const clean = piece.trim();
    if (clean.length === 0) continue;

    // „00:00+" heißt im OSM-Format: ab dieser Zeit ohne Ende.
    const open = /^(\d{1,2}(?:[:.]\d{2})?)\s*\+$/u.exec(clean);
    if (open) {
      const from = parseClock(open[1]);
      if (from !== null) windows.push({ days, from, to: 24 * 60 });
      continue;
    }

    const range =
      /^(\d{1,2}(?:[:.]\d{2})?)\s*(?:-|bis)\s*(\d{1,2}(?:[:.]\d{2})?)\s*(?:uhr|h)?$/iu.exec(clean);
    if (!range) continue;

    const from = parseClock(range[1]);
    let to = parseClock(range[2]);
    if (from === null || to === null) continue;

    // „00:00-00:00" meint den ganzen Tag, nicht eine Spanne der Länge null.
    if (from === 0 && to === 0) to = 24 * 60;

    if (to > from) {
      windows.push({ days, from, to });
      continue;
    }

    /*
     * Über Mitternacht: „Fr-Sa 06:00-02:00" heißt freitags ab 6 Uhr bis
     * samstags um 2 Uhr. Als zwei Fenster abgebildet, damit die Prüfung „gilt
     * das gerade?" ohne Sonderfall auskommt. Der zweite Teil gehört auf den
     * **Folgetag** – sonst läge er am selben Morgen, also zwölf Stunden
     * daneben.
     */
    if (to < from) {
      windows.push({ days, from, to: 24 * 60 });
      windows.push({ days: days.map((day) => ((day + 1) % 7) as Weekday), from: 0, to });
    }
  }

  return windows;
}

/** Die eigentliche Auswertung, ohne die Prüfung auf „immer offen". */
function parseWindows(text: string): TimeWindow[] {
  const windows: TimeWindow[] = [];

  for (const part of splitSections(tidy(text))) {
    const clean = part.trim();
    if (clean.length === 0) continue;

    // Reine Uhrzeit ohne Wochentage („7 - 19 Uhr", „08:00-21:00") gilt täglich.
    if (/^[\d\s:.,+-]+(?:uhr|h)?$/iu.test(clean)) {
      windows.push(...parseRanges(clean, ALL_DAYS));
      continue;
    }

    // „Mo-Fr 8-18 Uhr", „Mo, Tu, Th, PH 00:00-24:00", „werktags 8-18 Uhr"
    const match = /^([^\d]+?)[,;\s]+([\d].*)$/u.exec(clean);
    if (!match) continue;

    const days = parseDays(stripHolidays(match[1]));
    if (!days || days.length === 0) continue;

    windows.push(...parseRanges(match[2], days));
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
