/**
 * Zerlegt die „Örtlichkeit" aus der Parkplatzliste in Straße, Hausnummer,
 * Zusatzangabe und Zeitbeschränkung.
 *
 * Die Quelle ist heterogen; typische Formen sind:
 *
 *     Berger Straße 106
 *     Adalbertstr./Barmer Ersatzkasse
 *     Zobelstraße 5 / Arztpraxis Mo Di Do Fr 8-11 h und 15-17 h
 *     Adolf-Miersch-Straße 4e; Mo-Fr 8-20h und Sa 10-14h
 *     Bechtenwaldstraße / Bechtenwaldplatz ( Mo-Sa, 8-18 Uhr )
 *
 * Die Heuristik ist bewusst konservativ: Was nicht sicher erkannt wird, bleibt
 * `null` und wandert in `note`, damit nichts stillschweigend falsch zugeordnet
 * wird. Der Importreport macht unsichere Fälle sichtbar.
 */

export interface SplitAddress {
  street: string | null;
  houseNumber: string | null;
  note: string | null;
  timeRestriction: string | null;
}

/** Wochentage und Zeitwörter, an denen eine Zeitangabe beginnt. */
const TIME_START =
  /(?:\b(?:Mo|Di|Mi|Do|Fr|Sa|So)\b|\bwerktags\b|\btäglich\b|\bMontag\b|\bSamstag\b|\bSonntag\b)/iu;

/** Klammerausdrücke, die eine Zeitangabe enthalten. */
const PARENTHESISED = /\(([^()]*)\)/gu;

/** Enthält der Text überhaupt eine Zeitangabe? */
const LOOKS_LIKE_TIME = /\d\s*(?:[-–.:]\s*\d|\s*(?:h|Uhr)\b)|\b(?:Mo|Di|Mi|Do|Fr|Sa|So)\s*[-–]/iu;

/**
 * Hausnummer am Ende eines Segments: Ziffern, optional mit Buchstabe, Bereich
 * oder Mehrfachnennung („4e", „18-20", „33-35", „1/3", „94/96").
 */
const HOUSE_NUMBER =
  /^(?<street>.*?[^\s\d])[\s,]+(?<number>\d+\s*[a-z]?(?:\s*[-–/]\s*\d+\s*[a-z]?)*)$/u;

/**
 * Hausnummer in der Mitte, gefolgt von einer Einrichtung ohne Trennzeichen
 * („Alt Griesheim 18 Ärzthaus"). Der Nachtext wird zur Zusatzangabe.
 */
const HOUSE_NUMBER_INFIX =
  /^(?<street>.*?[^\s\d])[\s,]+(?<number>\d+[a-z]?(?:\s*[-–/]\s*\d+[a-z]?)*)\s+(?<note>[A-ZÄÖÜa-zäöüß].*)$/u;

/**
 * Lagehinweise, die hinter dem Straßennamen stehen und beim Geocoding stören
 * („Adalbertstr. vor Hausnummer 4", „Rat-Beil-Straße ggü. Hsnr. 41",
 * „Eckenheimer Landstr. geg. Hauptfriedhof", „Amperestraße Höhe Kleingartenanlage").
 */
const POSITION_HINT = /\s+(?:vor|gegenüber|geg\.|ggü\.?|Höhe|Ecke|hinter|neben)(?=\s|$)[\s\S]*$/u;

const collapse = (value: string) => value.replace(/\s+/gu, " ").trim();

/**
 * Rand-Interpunktion entfernen, ohne Inhalte zu verändern.
 * Ein abschließender Punkt bleibt stehen – er gehört zur Abkürzung („Adalbertstr.").
 */
const trimPunctuation = (value: string) =>
  collapse(value)
    .replace(/^[\s,;./–-]+/u, "")
    .replace(/[\s,;/–-]+$/u, "");

/**
 * Zeitbeschränkung aus dem Label lösen.
 * Zuerst Klammerausdrücke, dann ein Resttext ab dem ersten Wochentag.
 */
export function extractTimeRestriction(label: string): {
  rest: string;
  timeRestriction: string | null;
} {
  const parts: string[] = [];

  let rest = label.replace(PARENTHESISED, (whole, inner: string) => {
    if (LOOKS_LIKE_TIME.test(inner) || TIME_START.test(inner)) {
      parts.push(collapse(inner));
      return " ";
    }
    return whole;
  });

  const match = TIME_START.exec(rest);
  if (match && match.index > 0 && LOOKS_LIKE_TIME.test(rest.slice(match.index))) {
    parts.push(trimPunctuation(rest.slice(match.index)));
    rest = rest.slice(0, match.index);
  }

  return {
    rest: trimPunctuation(rest),
    timeRestriction: parts.length > 0 ? parts.join("; ") : null,
  };
}

/**
 * Label in Straße, Hausnummer, Zusatz und Zeitbeschränkung zerlegen.
 *
 * Das erste Segment vor „/" oder „;" gilt als Adresse, alles Weitere als
 * Zusatzangabe (Einrichtung, Kreuzung). Lässt sich im ersten Segment keine
 * Hausnummer erkennen, bleibt `houseNumber` leer – das Geocoding verortet dann
 * nur die Straße.
 */
export function splitAddress(label: string): SplitAddress {
  const { rest, timeRestriction } = extractTimeRestriction(label);

  // Klammerzusätze („(Zoo)", „(Epiphaniaskirche)") gehören zur Beschreibung,
  // nicht zur Adresse – sonst scheitert die Hausnummernerkennung an ihnen.
  const parenthesised: string[] = [];
  const withoutParentheses = rest.replace(PARENTHESISED, (_whole, inner: string) => {
    parenthesised.push(collapse(inner));
    return " ";
  });

  const segments = withoutParentheses
    .split(/\s*[/;]\s*/u)
    .map(trimPunctuation)
    .filter((segment) => segment.length > 0);

  if (segments.length === 0) {
    const onlyNote = parenthesised.length > 0 ? parenthesised.join(" / ") : null;
    return { street: null, houseNumber: null, note: onlyNote, timeRestriction };
  }

  const [first, ...others] = [...segments, ...parenthesised];
  const houseMatch = HOUSE_NUMBER.exec(first) ?? HOUSE_NUMBER_INFIX.exec(first);
  const notes = [...others];

  let street = first;
  let houseNumber: string | null = null;

  if (houseMatch) {
    street = trimPunctuation(houseMatch.groups!.street);
    houseNumber = collapse(houseMatch.groups!.number).replace(/\s+/gu, "");
    const inlineNote = houseMatch.groups!.note;
    if (inlineNote) notes.unshift(trimPunctuation(inlineNote));
  }

  // Lagehinweis vom Straßennamen trennen: „Adalbertstr. vor Hausnummer" findet
  // kein Geocoder, „Adalbertstr." schon. Der Hinweis bleibt als Zusatz erhalten.
  const hintMatch = POSITION_HINT.exec(street);
  if (hintMatch && hintMatch.index > 0) {
    notes.unshift(trimPunctuation(hintMatch[0]));
    street = trimPunctuation(street.slice(0, hintMatch.index));
  }

  const note = notes.length > 0 ? notes.join(" / ") : null;

  return {
    street: street.length > 0 ? street : null,
    houseNumber,
    note,
    timeRestriction,
  };
}
