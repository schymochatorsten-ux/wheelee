/**
 * Schritt 3 des Imports: geparste Einträge, Geocoding-Ergebnisse und manuelle
 * Korrekturen zur fertigen Seed-Datei `data/frankfurt.json` zusammenführen.
 *
 *     npm run import:build
 *
 * Der Lauf ist idempotent: Er liest nur, was in `data/` liegt, und schreibt
 * dieselbe Datei neu. Manuelle Korrekturen aus `frankfurt.overrides.json`
 * gewinnen gegen Parser und Geocoding und überleben damit jeden Importlauf.
 */
import fs from "node:fs/promises";
import path from "node:path";
import type { GeoAccuracy, ParkingSpot } from "../../src/lib/types.js";
import { city, paths } from "./config.mjs";
import type { ParsedFile } from "./parse-pdf.mjs";
import type { GeocodeResult } from "./geocode.mjs";

/** Felder, die eine manuelle Korrektur setzen darf. */
type SpotOverride = Partial<
  Pick<
    ParkingSpot,
    | "label"
    | "street"
    | "houseNumber"
    | "note"
    | "timeRestriction"
    | "district"
    | "spotCount"
    | "lat"
    | "lng"
    | "geoAccuracy"
  >
> & { reason?: string };

interface OverridesFile {
  spots?: Record<string, SpotOverride>;
}

export interface SeedFile {
  city: {
    slug: string;
    name: string;
    center: { lat: number; lng: number };
  };
  source: string;
  /** Datum des Importlaufs (ISO, nur Tag). */
  generatedAt: string;
  spots: ParkingSpot[];
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    throw error;
  }
}

/** Stadtteil ist in wenigen Zeilen der Quelle nicht angegeben. */
const UNKNOWN_DISTRICT = "unbekannt";

async function main() {
  const parsed = await readJson<ParsedFile | null>(paths.parsed, null);
  if (!parsed) {
    throw new Error(`${paths.parsed} fehlt – bitte zuerst "npm run import:parse" ausführen.`);
  }

  const geocode = await readJson<Record<string, GeocodeResult>>(paths.geocodeCache, {});
  const overrides = (await readJson<OverridesFile>(paths.overrides, {})).spots ?? {};

  const spots: ParkingSpot[] = parsed.spots.map((entry) => {
    const hit = geocode[entry.id];
    const override = overrides[entry.id] ?? {};

    const base: ParkingSpot = {
      id: entry.id,
      city: city.slug,
      label: entry.label,
      street: entry.street,
      houseNumber: entry.houseNumber,
      note: entry.note,
      timeRestriction: entry.timeRestriction,
      district: entry.district ?? UNKNOWN_DISTRICT,
      spotCount: entry.spotCount,
      lat: hit?.lat ?? null,
      lng: hit?.lng ?? null,
      geoAccuracy: (hit?.accuracy ?? "none") as GeoAccuracy,
      source: city.source,
    };

    const { reason: _reason, ...fields } = override;
    const merged: ParkingSpot = { ...base, ...fields };

    // Eine Koordinate aus der Korrekturdatei ist per Definition geprüft.
    if (override.lat != null && override.lng != null && override.geoAccuracy === undefined) {
      merged.geoAccuracy = "house";
    }

    return merged;
  });

  spots.sort((a, b) => a.label.localeCompare(b.label, "de-DE"));

  const seed: SeedFile = {
    city: { slug: city.slug, name: city.name, center: city.center },
    source: city.source,
    generatedAt: new Date().toISOString().slice(0, 10),
    spots,
  };

  await fs.mkdir(path.dirname(paths.seed), { recursive: true });
  await fs.writeFile(paths.seed, `${JSON.stringify(seed, null, 2)}\n`, "utf8");

  const byAccuracy = spots.reduce<Record<string, number>>((counts, spot) => {
    counts[spot.geoAccuracy] = (counts[spot.geoAccuracy] ?? 0) + 1;
    return counts;
  }, {});

  console.log(`Parkplätze:  ${spots.length}`);
  console.log(`Stellplätze: ${spots.reduce((sum, spot) => sum + spot.spotCount, 0)}`);
  console.log(`Korrekturen: ${Object.keys(overrides).length}`);
  console.log("Genauigkeit:");
  for (const [accuracy, count] of Object.entries(byAccuracy).sort(([, a], [, b]) => b - a)) {
    console.log(`  ${accuracy.padEnd(12)} ${count}`);
  }
  console.log(`Geschrieben: ${path.relative(process.cwd(), paths.seed)}`);
}

await main();
