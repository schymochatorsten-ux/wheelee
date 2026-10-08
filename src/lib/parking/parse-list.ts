/**
 * Parser für die Liste „Allgemeine Behindertenparkplätze" der Stadt Frankfurt.
 *
 * Die Quelle ist ein PDF mit drei Spalten – Örtlichkeit, Anzahl, Stadtteil –,
 * die beim Textextrakt zu einer Zeile verschmelzen:
 *
 *     Berger Straße 106 1 Nordend-Ost
 *
 * Dazu kommen Eigenheiten der Quelle, die der Parser abfangen muss:
 * Örtlichkeiten brechen über zwei Zeilen um, einzelne Zeilen tragen keinen
 * Stadtteil, Abschnitts-Buchstaben (A, B, …) und Seitenköpfe stehen zwischen
 * den Daten, und am Ende folgt die Gesamtsumme.
 *
 * Der Parser ist absichtlich frei von Datei- und Netzzugriffen, damit er
 * direkt testbar bleibt.
 */

/** Eine Zeile der Quelle, noch ohne Adress-Aufspaltung und Koordinaten. */
export interface ParsedListEntry {
  /** Örtlichkeit, unverändert wie in der Quelle (Umbrüche zusammengefügt). */
  label: string;
  /** Anzahl der Stellplätze. */
  spotCount: number;
  /** Stadtteil, oder `null`, wenn die Quelle an dieser Stelle keinen nennt. */
  district: string | null;
}

/**
 * Geprüfte Ausnahmen: Zeilen, die inhaltlich mit der Folgezeile zusammengehören,
 * ohne dass die Heuristik das erkennen kann – weil die Fortsetzung wie ein
 * eigener Eintrag aussieht („Std. 1 Westend", „KiGa 2 Dornbusch").
 *
 * Bewusst als Liste exakter Zeilen und nicht als weitere Heuristik: so bleibt
 * jede Ausnahme sichtbar und überprüfbar.
 */
export interface ParseListOptions {
  /** Zeilen (normalisiert), die immer mit der Folgezeile verbunden werden. */
  forcedJoins?: readonly string[];
}

export interface ParseListResult {
  entries: ParsedListEntry[];
  /** Zeilen, die zu keinem Eintrag wurden – für den Qualitätsreport. */
  unparsed: string[];
  /** Die in der Quelle angegebene Gesamtsumme, falls gefunden. */
  declaredTotal: number | null;
}

/**
 * Eine vollständige Datenzeile endet auf „<Anzahl> <Stadtteil>".
 * `(.*)` ist absichtlich greedy: Örtlichkeiten enthalten selbst Zahlen
 * (Hausnummern, Öffnungszeiten), gesucht ist die *letzte* Zahl, auf die nur
 * noch ein Stadtteil ohne Ziffern folgt.
 */
const ENTRY_PATTERN = /^(.*\S)\s+(\d{1,3})\s+([^\d]{2,})$/u;

/** Datenzeile ohne Stadtteil – endet direkt auf der Anzahl. */
const ENTRY_WITHOUT_DISTRICT = /^(.*\S)\s+(\d{1,3})$/u;

/** Seitenmarkierung, die das Textextrakt einfügt („-- 1 of 9 --"). */
const PAGE_MARKER = /^--\s*\d+\s*(?:of|von)\s*\d+\s*--$/iu;

/** Abschnittstrenner: eine einzelne Initiale wie „A" oder „Sch". */
const SECTION_HEADING = /^[A-ZÄÖÜ][a-zäöüß]{0,2}$/u;

/** Tabellenkopf, der sich auf jeder Seite wiederholen kann. */
const TABLE_HEADER = /^Örtlichkeit\s+Anzahl\s+Stadtteil$/iu;

/** Eine Zeile, die nur aus einer Zahl besteht – die Gesamtsumme. */
const TOTAL_ONLY = /^\d{2,5}$/u;

/**
 * Stray-Glyphen des Textextrakts („Uhr+A270", „Nordend+D332-West",
 * „/A307Gesundheitsamt", „Seufzerbrücke A266"). Es sind Platzhalter für
 * Zeichen, die im Klartext nichts beitragen. In dieser Quelle treten
 * ausschließlich die Formen A### und D### auf – echte Bezeichnungen mit
 * Buchstabe plus drei Ziffern (etwa eine Autobahn) kommen darin nicht vor.
 */
const GLYPH_ARTIFACT = /\+?\b[A-D]\d{3}\b/gu;

/**
 * Erkennt die zweite Hälfte einer umgebrochenen Örtlichkeit.
 *
 * Fortsetzungen beginnen klein, mit einer Ziffer („12) 1 Zeilsheim",
 * „14-17 Uhr 1 Riederwald") oder tragen eine schließende Klammer, zu der in
 * derselben Zeile keine öffnende gehört („Uhr) 2 Ostend"). Das ist nötig, weil
 * solche Fragmente für sich genommen wie eine vollständige Datenzeile aussehen.
 */
function isContinuation(line: string): boolean {
  if (/^[a-zäöüß0-9]/u.test(line)) return true;
  return /^[^(]*\)/u.test(line);
}

const normalizeLine = (value: string) =>
  value.replace(GLYPH_ARTIFACT, "").replace(/\s+/gu, " ").trim();

/**
 * Zwei Hälften einer umgebrochenen Zeile zusammenfügen. Endet die erste Hälfte
 * auf einem Binde-/Gedankenstrich, gehört er zum Wert („So 9-" + „12)") und es
 * darf kein Leerzeichen dazwischen.
 */
function joinWrappedLines(first: string, second: string): string {
  return /[-–/]$/u.test(first) ? `${first}${second}` : `${first} ${second}`;
}

function isNoise(line: string): boolean {
  return (
    line.length === 0 ||
    PAGE_MARKER.test(line) ||
    TABLE_HEADER.test(line) ||
    SECTION_HEADING.test(line)
  );
}

/**
 * Rohtext der Parkplatzliste in Einträge überführen.
 *
 * Vorgehen: erst Rauschen und Gesamtsumme entfernen, dann Fortsetzungszeilen an
 * ihren Vorgänger hängen, dann jede zusammengesetzte Zeile in Örtlichkeit,
 * Anzahl und Stadtteil zerlegen. Was sich nicht zerlegen lässt, landet in
 * `unparsed` statt den nächsten Eintrag zu verfälschen.
 */
export function parseParkingList(rawText: string, options: ParseListOptions = {}): ParseListResult {
  const forcedJoins = new Set((options.forcedJoins ?? []).map(normalizeLine));
  const entries: ParsedListEntry[] = [];
  const unparsed: string[] = [];
  let declaredTotal: number | null = null;

  const lines: string[] = [];
  for (const rawLine of rawText.split(/\r?\n/u)) {
    const line = normalizeLine(rawLine);
    if (isNoise(line)) continue;
    if (TOTAL_ONLY.test(line)) {
      declaredTotal = Number.parseInt(line, 10);
      continue;
    }
    lines.push(line);
  }

  for (let index = 0; index < lines.length; index += 1) {
    let candidate = lines[index];

    while (
      index + 1 < lines.length &&
      (forcedJoins.has(candidate) || isContinuation(lines[index + 1]))
    ) {
      index += 1;
      candidate = joinWrappedLines(candidate, lines[index]);
    }

    const withDistrict = ENTRY_PATTERN.exec(candidate);
    if (withDistrict) {
      entries.push({
        label: withDistrict[1].trim(),
        spotCount: Number.parseInt(withDistrict[2], 10),
        district: withDistrict[3].trim(),
      });
      continue;
    }

    const withoutDistrict = ENTRY_WITHOUT_DISTRICT.exec(candidate);
    if (withoutDistrict) {
      entries.push({
        label: withoutDistrict[1].trim(),
        spotCount: Number.parseInt(withoutDistrict[2], 10),
        district: null,
      });
      continue;
    }

    unparsed.push(candidate);
  }

  return { entries, unparsed, declaredTotal };
}

/** Summe der Stellplätze über alle Einträge. */
export function totalSpotCount(entries: readonly ParsedListEntry[]): number {
  return entries.reduce((sum, entry) => sum + entry.spotCount, 0);
}
