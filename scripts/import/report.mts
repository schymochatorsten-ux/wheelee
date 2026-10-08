/**
 * Schritt 4 des Imports: Qualitätsreport schreiben.
 *
 *     npm run import:report
 *
 * Der Report macht sichtbar, was nachgearbeitet werden muss – fehlende
 * Koordinaten, nur auf Straßenebene verortete Parkplätze, fehlende Stadtteile
 * und Treffer, deren Adresse nicht zur Quelle passt. Jede Zeile nennt die ID,
 * damit sie direkt in `data/frankfurt.overrides.json` korrigiert werden kann.
 */
import fs from "node:fs/promises";
import path from "node:path";
import type { ParkingSpot } from "../../src/lib/types.js";
import { paths } from "./config.mjs";
import type { SeedFile } from "./build-seed.mjs";
import type { GeocodeResult } from "./geocode.mjs";

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    throw error;
  }
}

const row = (spot: ParkingSpot, extra = "") =>
  `| \`${spot.id}\` | ${spot.label} | ${spot.district} |${extra}`;

function section(title: string, header: string, rows: string[]): string {
  if (rows.length === 0) return `## ${title}\n\nKeine.\n`;
  return [`## ${title} (${rows.length})`, "", header, ...rows, ""].join("\n");
}

/**
 * Passt die von Nominatim gelieferte Adresse zur Straße aus der Quelle?
 * Ein Nein ist kein Fehler, aber ein Grund zum Nachsehen.
 */
function streetMismatch(spot: ParkingSpot, hit: GeocodeResult | undefined): boolean {
  if (!hit?.displayName || !spot.street) return false;
  const normalize = (value: string) =>
    value
      .toLocaleLowerCase("de-DE")
      .replace(/straße|strasse|str\.?\b/gu, "str")
      .replace(/[^a-zäöüß]/gu, "");
  return !normalize(hit.displayName).includes(normalize(spot.street));
}

async function main() {
  const seed = await readJson<SeedFile | null>(paths.seed, null);
  if (!seed) {
    throw new Error(`${paths.seed} fehlt – bitte zuerst "npm run import:build" ausführen.`);
  }
  const geocode = await readJson<Record<string, GeocodeResult>>(paths.geocodeCache, {});

  const { spots } = seed;
  const missing = spots.filter((spot) => spot.geoAccuracy === "none");
  const streetOnly = spots.filter(
    (spot) => spot.geoAccuracy === "street" || spot.geoAccuracy === "approximate",
  );
  const noDistrict = spots.filter((spot) => spot.district === "unbekannt");
  const mismatched = spots.filter((spot) => streetMismatch(spot, geocode[spot.id]));

  const total = spots.length;
  const placed = total - missing.length;
  const exact = spots.filter((spot) => spot.geoAccuracy === "house").length;

  const lines = [
    `# Importreport ${seed.city.name}`,
    "",
    `Stand: ${seed.generatedAt}`,
    `Quelle: ${seed.source}`,
    "",
    "## Überblick",
    "",
    "| Kennzahl | Wert |",
    "| --- | --- |",
    `| Örtlichkeiten | ${total} |`,
    `| Stellplätze | ${spots.reduce((sum, spot) => sum + spot.spotCount, 0)} |`,
    `| verortet | ${placed} (${Math.round((placed / total) * 100)} %) |`,
    `| davon hausgenau | ${exact} |`,
    `| nur Straßenebene | ${streetOnly.length} |`,
    `| ohne Koordinate | ${missing.length} |`,
    "",
    section(
      "Ohne Koordinate – nur Listenansicht",
      "| ID | Örtlichkeit | Stadtteil |\n| --- | --- | --- |",
      missing.map((spot) => row(spot)),
    ),
    section(
      "Nur auf Straßenebene verortet",
      "| ID | Örtlichkeit | Stadtteil | Anfrage |\n| --- | --- | --- | --- |",
      streetOnly.map((spot) => row(spot, ` ${geocode[spot.id]?.query ?? "–"} |`)),
    ),
    section(
      "Treffer passt nicht zur Straße der Quelle",
      "| ID | Örtlichkeit | Stadtteil | Treffer |\n| --- | --- | --- | --- |",
      mismatched.map((spot) => row(spot, ` ${geocode[spot.id]?.displayName ?? "–"} |`)),
    ),
    section(
      "Stadtteil fehlt in der Quelle",
      "| ID | Örtlichkeit | Stadtteil |\n| --- | --- | --- |",
      noDistrict.map((spot) => row(spot)),
    ),
    "## Nacharbeiten",
    "",
    "Korrekturen gehören in `data/frankfurt.overrides.json` (Schlüssel = ID).",
    "Sie gewinnen gegen Parser und Geocoding und überleben jeden erneuten Importlauf.",
    "",
  ];

  await fs.writeFile(paths.report, lines.join("\n"), "utf8");

  console.log(`Verortet: ${placed}/${total}, hausgenau: ${exact}`);
  console.log(
    `Nacharbeit: ${missing.length} ohne Koordinate, ${mismatched.length} unsichere Treffer`,
  );
  console.log(`Geschrieben: ${path.relative(process.cwd(), paths.report)}`);
}

await main();
