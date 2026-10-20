import file from "../../../data/_bestaetigt.json";
import type { ConfirmationState } from "../types";

/**
 * Welche Standorte zwei unabhängige Quellen kennen (ToDos 3.1, 3.7).
 *
 * Die Datei `data/_bestaetigt.json` entsteht in `npm run validate` **mit**
 * Netzzugriff: Dort werden die amtlichen Standorte einer Stadt gegen
 * OpenStreetMap gepaart. Hier wird sie nur gelesen.
 *
 * **Drei Zustände, und der dritte ist der wichtigste:**
 *
 * - `bestaetigt` – beide Quellen kennen den Standort.
 * - `nur_amtlich` – geprüft, aber OpenStreetMap kennt ihn nicht. **Kein
 *   Mangel am Standort**, nur eine Quelle weniger.
 * - **nicht in der Datei** – nie geprüft. Das ist etwas völlig anderes als
 *   `nur_amtlich`, und beides zu verwechseln wäre hier besonders teuer:
 *   „nicht bestätigt" an einen Standort zu schreiben, den niemand angesehen
 *   hat, ist eine Falschaussage über genau die Angabe, auf die sich jemand
 *   verlässt. Dieselbe Unterscheidung wie `⚪ geprüft, nichts gefunden` gegen
 *   `⬜ noch nicht geprüft` im Importstand (2e.9).
 *
 * **Die Datei wird statisch importiert, wie die Seed-Dateien** – kein
 * Dateizugriff zur Laufzeit, damit dieses Modul in jeder Umgebung arbeitet.
 * Sie ist versioniert (`data/_*.json` steht nicht in `.gitignore`); fehlt sie,
 * schlägt der Build fehl, und das ist besser als eine App, die stillschweigend
 * behauptet, nichts sei geprüft.
 */

interface CityEntry {
  geprueftAm: string;
  bestaetigt: number;
  nurAmtlich: number;
  nurOsm: number;
  osmGesamt: number;
}

interface ConfirmationFile {
  erzeugtAm: string;
  toleranzMeter: number;
  staedte: Record<string, CityEntry>;
  standorte: Record<string, string>;
}

const data = file as ConfirmationFile;

/**
 * Der Zustand eines Standorts, oder `null` für „nicht geprüft".
 *
 * Unbekannte Werte in der Datei werden zu `null`: Ein Zustand, den dieses
 * Modul nicht kennt, darf nicht als Bestätigung durchgehen.
 */
export function confirmationOf(spotId: string): ConfirmationState | null {
  const value = data.standorte[spotId];
  return value === "bestaetigt" || value === "nur_amtlich" ? value : null;
}

/** Wurde diese Stadt überhaupt schon abgeglichen? */
export function isCityChecked(slug: string): boolean {
  return Object.hasOwn(data.staedte, slug);
}

/** Wann der Abgleich einer Stadt gelaufen ist (ISO-Datum), oder `null`. */
export function checkedAt(slug: string): string | null {
  return data.staedte[slug]?.geprueftAm ?? null;
}

/** Toleranz, innerhalb der zwei Quellen als derselbe Standort gelten. */
export function toleranceMeters(): number {
  return data.toleranzMeter;
}

/** Wie viele Städte und Standorte abgeglichen sind – für Berichte. */
export function confirmationSummary(): {
  cities: number;
  confirmed: number;
  officialOnly: number;
} {
  const entries = Object.values(data.staedte);
  return {
    cities: entries.length,
    confirmed: entries.reduce((sum, entry) => sum + entry.bestaetigt, 0),
    officialOnly: entries.reduce((sum, entry) => sum + entry.nurAmtlich, 0),
  };
}
