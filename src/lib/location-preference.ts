/**
 * Ob die App den Standort von sich aus abfragen darf (ToDo 9.25).
 *
 * **Das ist eine Absicht, keine Erlaubnis.** Die Erlaubnis vergibt der Browser
 * je Gerät, und kein Server kann sie setzen oder auslesen – das ist eine
 * Zusage des Browsers an die Nutzerin und keine Lücke, die sich schließen
 * ließe. Gespeichert wird deshalb nur, **ob überhaupt gefragt werden soll**.
 *
 * Das ist trotzdem der Unterschied, um den es geht: Wer die Abfrage einmal
 * abgelehnt hat, wird bisher auf jedem Gerät und nach jedem Löschen der
 * Browserdaten erneut gefragt. Mit Konto steht die Entscheidung jetzt am
 * Konto; ohne Konto bleibt sie wie bisher im Browser.
 *
 * Der Standort selbst verlässt das Gerät weiterhin nie (siehe
 * `useGeolocation` und die Datenschutzerklärung). Gespeichert wird ein Wort.
 */

export const LOCATION_PREFERENCES = ["on", "off"] as const;

export type LocationPreference = (typeof LOCATION_PREFERENCES)[number];

/**
 * Was gilt, solange niemand etwas gewählt hat: fragen. Der Nutzen der App
 * hängt am Standort, und die eigentliche Entscheidung trifft ohnehin der
 * Browser mit seiner eigenen Rückfrage.
 */
export const DEFAULT_LOCATION_PREFERENCE: LocationPreference = "on";

/** Schlüssel im `localStorage` – ohne Konto gilt nur dieser. */
export const LOCATION_PREFERENCE_KEY = "wheelee-standort";

export function isLocationPreference(value: unknown): value is LocationPreference {
  return typeof value === "string" && (LOCATION_PREFERENCES as readonly string[]).includes(value);
}

/**
 * Die Wahl im Browser lesen. Fehlschläge sind still: Im privaten Modus mancher
 * Browser wirft schon der Zugriff auf `localStorage`, und daran darf die Karte
 * nicht scheitern.
 */
export function readLocationPreference(): LocationPreference | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(LOCATION_PREFERENCE_KEY);
    return isLocationPreference(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function writeLocationPreference(value: LocationPreference): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCATION_PREFERENCE_KEY, value);
  } catch {
    // Siehe oben: lieber ohne Gedächtnis als ohne Karte.
  }
}
