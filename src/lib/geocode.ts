/**
 * Ortssuche für das Reiseziel (ToDo 6.12).
 *
 * Bisher beantwortet die App nur „wo parke ich *hier*". Die häufigere Frage
 * ist „wo parke ich *dort*, wo ich hinwill" – zum Arzttermin, zum Amt, zum
 * Besuch. Und man will das **vor** der Abfahrt wissen, nicht nach der Ankunft.
 */

export interface Place {
  /** Anzeigename, gekürzt auf das Wesentliche. */
  label: string;
  /** Vollständige Anschrift, als zweite Zeile. */
  detail: string;
  lat: number;
  lng: number;
}

interface NominatimResult {
  display_name?: string;
  lat?: string;
  lon?: string;
  name?: string;
  address?: Record<string, string>;
}

/**
 * Aus Nominatims `display_name` eine lesbare Überschrift und eine Unterzeile
 * machen.
 *
 * `display_name` ist eine lange Kette („Kölner Dom, Domkloster, Altstadt-Nord,
 * Innenstadt, Köln, Nordrhein-Westfalen, 50667, Deutschland"). Ungekürzt
 * passt sie in keine Telefonzeile, und das Wichtigste steht vorn.
 */
export function toPlace(result: NominatimResult): Place | null {
  const lat = Number(result.lat);
  const lng = Number(result.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  const parts = (result.display_name ?? "").split(",").map((part) => part.trim());
  if (parts.length === 0 || parts[0].length === 0) return null;

  const label = result.name?.trim() || parts[0];

  // „Deutschland" am Ende hilft niemandem, der in Deutschland sucht.
  const rest = parts.slice(1).filter((part) => part !== "Deutschland" && part.length > 0);

  return { label, detail: rest.slice(0, 3).join(", "), lat, lng };
}

/** Treffer von Nominatim in unsere Form bringen, leere Einträge verwerfen. */
export function toPlaces(results: unknown): Place[] {
  if (!Array.isArray(results)) return [];
  return results
    .map((result) => toPlace(result as NominatimResult))
    .filter((place): place is Place => place !== null);
}

/** Zuletzt gesuchte Ziele – wiederkehrende Fahrten sind der Normalfall. */
export const RECENT_KEY = "wheelee-ziele";
const MAX_RECENT = 5;

export function readRecent(): Place[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry): entry is Place =>
        typeof entry === "object" &&
        entry !== null &&
        typeof (entry as Place).label === "string" &&
        Number.isFinite((entry as Place).lat),
    );
  } catch {
    return [];
  }
}

/** Ein Ziel vorn einfügen, Dubletten entfernen, Liste kurz halten. */
export function rememberPlace(place: Place, existing: Place[] = readRecent()): Place[] {
  const without = existing.filter(
    (entry) => !(entry.label === place.label && Math.abs(entry.lat - place.lat) < 1e-6),
  );
  const next = [place, ...without].slice(0, MAX_RECENT);

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      // Ohne Speicher gilt die Liste nur für diese Sitzung.
    }
  }

  return next;
}
