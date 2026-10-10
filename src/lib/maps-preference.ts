import { detectMapsTarget, MAPS_APPS, type MapsTarget } from "./navigation";

/**
 * Bevorzugte Karten-App (ToDo 11.3).
 *
 * Bisher riet die App anhand des Geräts: Apple Karten auf iPhone und Mac,
 * sonst Google Maps. Das trifft oft zu, aber eben nicht immer – wer Waze oder
 * OpenStreetMap nutzt, musste die Fehlannahme bei jeder einzelnen Navigation
 * hinnehmen.
 *
 * Gespeichert wird im Browser, **nicht** im Benutzerkonto: Welche Karten-App
 * jemand nutzt, ist nichts, wofür man sich anmelden sollte – und Konten gibt
 * es ohnehin noch nicht. Sobald es sie gibt, gehört die Einstellung
 * zusätzlich dorthin, damit sie auf allen Geräten gilt.
 */

/** `auto` heißt: weiter nach Gerät raten. */
export type MapsPreference = MapsTarget | "auto";

export const STORAGE_KEY = "wheelee-maps-app";

export const DEFAULT_PREFERENCE: MapsPreference = "auto";

/** Die Auswahl für die Einstellungen, mit „automatisch" an erster Stelle. */
export const MAPS_CHOICES: { id: MapsPreference; label: string }[] = [
  { id: "auto", label: "Automatisch (nach Gerät)" },
  ...MAPS_APPS.map((app) => ({ id: app.id as MapsPreference, label: app.shortLabel })),
];

export function isMapsPreference(value: unknown): value is MapsPreference {
  return value === "auto" || MAPS_APPS.some((app) => app.id === value);
}

/** Gespeicherte Auswahl lesen. */
export function readMapsPreference(): MapsPreference {
  if (typeof window === "undefined") return DEFAULT_PREFERENCE;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isMapsPreference(stored) ? stored : DEFAULT_PREFERENCE;
  } catch {
    // Privater Modus oder blockierter Speicher: dann eben raten.
    return DEFAULT_PREFERENCE;
  }
}

/** Auswahl merken. */
export function writeMapsPreference(preference: MapsPreference): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, preference);
  } catch {
    // Ohne Speicher gilt die Auswahl nur für diese Sitzung – besser als nichts.
  }
}

/**
 * Welche Karten-App tatsächlich verwendet wird: die gewählte, sonst die
 * geratene.
 */
export function resolveMapsTarget(preference: MapsPreference, userAgent: string): MapsTarget {
  return preference === "auto" ? detectMapsTarget(userAgent) : preference;
}
