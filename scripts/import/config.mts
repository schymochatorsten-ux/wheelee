import { createHash } from "node:crypto";
import path from "node:path";

/** Projektwurzel, unabhängig vom Arbeitsverzeichnis des Aufrufs. */
export const projectRoot = path.resolve(import.meta.dirname, "..", "..");

export const paths = {
  /** Quell-PDF der Stadt Frankfurt. */
  sourcePdf: path.join(projectRoot, "Parkplätze", "Frankfurt", "Liste_allgemeiner_Parkplaetze.pdf"),
  /** Rohtext aus dem PDF – Zwischenergebnis, nicht versioniert. */
  rawText: path.join(projectRoot, "data", "raw", "frankfurt.txt"),
  /** Geprüfte Zeilenumbruch-Ausnahmen der Quelle. */
  lineFixups: path.join(projectRoot, "data", "frankfurt.line-fixups.json"),
  /** Geparste Zeilen inklusive Adress-Aufspaltung. */
  parsed: path.join(projectRoot, "data", "frankfurt.parsed.json"),
  /** Geocoding-Ergebnisse, versioniert, damit Läufe nicht neu anfragen. */
  geocodeCache: path.join(projectRoot, "data", "geocode-cache.json"),
  /** Manuelle Korrekturen; gewinnen immer gegen das Geocoding. */
  overrides: path.join(projectRoot, "data", "frankfurt.overrides.json"),
  /**
   * Ergebnis der PDF-Kette.
   *
   * Bewusst **nicht** `frankfurt.json`: Seit die Stadt ihre Daten als WFS
   * anbietet (`npm run import:wfs`), ist das die bessere Quelle – amtliche
   * Koordinaten statt Geocoding, 458 statt 359 Standorte. Die PDF-Kette bleibt
   * als Rückfallebene erhalten, darf die Seed-Datei der App aber nicht
   * überschreiben; zwei Importwege auf dieselbe Datei wären eine Falle.
   */
  seed: path.join(projectRoot, "data", "frankfurt-pdf-liste.json"),
  /** Qualitätsreport der PDF-Kette. */
  report: path.join(projectRoot, "data", "frankfurt-pdf-liste.report.md"),
} as const;

export const city = {
  slug: "frankfurt",
  name: "Frankfurt am Main",
  country: "Germany",
  /** Kartenmittelpunkt als Fallback, wenn kein Standort verfügbar ist. */
  center: { lat: 50.1109, lng: 8.6821 },
  source: "Stadt Frankfurt am Main – Liste allgemeiner Behindertenparkplätze",
} as const;

/** ID-Präfix pro Stadt. */
const idPrefix = "ffm";

/**
 * Stabile ID aus der Örtlichkeit ableiten.
 *
 * Bewusst nicht aus der Zeilennummer: Eine neue Fassung der Liste verschiebt
 * Zeilen, und Bewertungen müssen weiterhin denselben Parkplatz treffen.
 */
export function spotId(label: string): string {
  const normalized = label.toLocaleLowerCase("de-DE").replace(/\s+/gu, " ").trim();
  const hash = createHash("sha256").update(normalized, "utf8").digest("hex");
  return `${idPrefix}-${hash.slice(0, 10)}`;
}
