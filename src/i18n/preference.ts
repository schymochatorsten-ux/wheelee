import { isLocale, type Locale } from "./index";

/**
 * Gewählte Sprache merken (ToDo 15.5) – im Browser **und** am Konto, wie die
 * Karten-App (`maps-preference.ts`, 11.3a).
 *
 * Zusätzlich zum Speicher steht die Wahl in einem Cookie, und das ist der
 * Grund, warum es hier zwei Orte im Browser gibt: Der Server muss die Sprache
 * schon beim ersten Zeichnen kennen (`<html lang>`, Beschriftungen, sonst
 * blitzt Deutsch auf), und `localStorage` sieht er nicht. Das Cookie enthält
 * nur den Sprachcode, läuft nach einem Jahr ab und wird nie ausgewertet, um
 * jemanden wiederzuerkennen.
 */

export const LANGUAGE_COOKIE = "wheelee-lang";
export const STORAGE_KEY = "wheelee-language";

const ONE_YEAR_SECONDS = 365 * 24 * 60 * 60;

/** Im Browser gemerkte Wahl, oder `null`, wenn nie gewählt wurde. */
export function readLanguagePreference(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(stored) ? stored : null;
  } catch {
    return null;
  }
}

/** Wahl im Browser merken: Speicher und Cookie. */
export function writeLanguagePreference(locale: Locale): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Ohne Speicher trägt das Cookie die Wahl.
  }
  document.cookie = `${LANGUAGE_COOKIE}=${locale}; Max-Age=${ONE_YEAR_SECONDS}; Path=/; SameSite=Lax`;
}

/**
 * Welche Wahl gilt, wenn Konto und Browser etwas Verschiedenes sagen.
 * **Das Konto gewinnt, sobald dort etwas steht** – Begründung wie bei
 * `effectiveMapsPreference`: Wer die App auf einem zweiten Gerät öffnet,
 * erwartet seine Sprache, und der Browser dort hat nicht „etwas anderes
 * gewählt", sondern nichts.
 */
export function effectiveLanguage(
  fromAccount: Locale | null | undefined,
  fromBrowser: Locale | null,
): Locale | null {
  return isLocale(fromAccount) ? fromAccount : fromBrowser;
}
