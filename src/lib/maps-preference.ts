import type { MessageKey } from "@/i18n";
import { detectMapsTarget, MAPS_APPS, type MapsTarget } from "./navigation";

/**
 * Bevorzugte Karten-App (ToDo 11.3).
 *
 * Bisher riet die App anhand des Geräts: Apple Karten auf iPhone und Mac,
 * sonst Google Maps. Das trifft oft zu, aber eben nicht immer – wer Waze oder
 * OpenStreetMap nutzt, musste die Fehlannahme bei jeder einzelnen Navigation
 * hinnehmen.
 *
 * Gespeichert wird im Browser – und **seit dem 2026-10-21 zusätzlich am Konto**
 * (ToDo 11.3a), damit die Wahl auf allen Geräten gilt. Zusätzlich, nicht
 * stattdessen: Welche Karten-App jemand nutzt, ist nichts, wofür man sich
 * anmelden sollte, und ohne Konto muss die Einstellung genauso funktionieren.
 */

/** `auto` heißt: weiter nach Gerät raten. */
export type MapsPreference = MapsTarget | "auto";

export const STORAGE_KEY = "wheelee-maps-app";

export const DEFAULT_PREFERENCE: MapsPreference = "auto";

/** Die Auswahl für die Einstellungen, mit „automatisch" an erster Stelle. */
export const MAPS_CHOICES: { id: MapsPreference; label: MessageKey }[] = [
  { id: "auto", label: "maps.auto" },
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
 * Welche Wahl gilt, wenn Konto und Browser etwas Verschiedenes sagen
 * (ToDo 11.3a).
 *
 * **Das Konto gewinnt, sobald dort etwas steht.** Die Begründung ist der Zweck
 * der ganzen Übung: Wer die App auf einem zweiten Gerät öffnet, erwartet seine
 * Einstellung – und der Browser-Wert dort ist nicht „die andere Entscheidung",
 * sondern **gar keine**, nämlich der Vorgabewert.
 *
 * **Steht am Konto nichts, zählt der Browser**, und zwar auch nach der
 * Anmeldung. So geht die Wahl, die jemand vor dem Anlegen eines Kontos
 * getroffen hat, nicht verloren; sie wandert beim nächsten Umstellen von selbst
 * nach oben.
 */
export function effectiveMapsPreference(
  fromAccount: MapsPreference | null | undefined,
  fromBrowser: MapsPreference,
): MapsPreference {
  return isMapsPreference(fromAccount) ? fromAccount : fromBrowser;
}

/**
 * Welche Karten-App tatsächlich verwendet wird: die gewählte, sonst die
 * geratene.
 */
export function resolveMapsTarget(preference: MapsPreference, userAgent: string): MapsTarget {
  return preference === "auto" ? detectMapsTarget(userAgent) : preference;
}
