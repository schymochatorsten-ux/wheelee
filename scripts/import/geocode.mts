/**
 * Schritt 2 des Imports: Koordinaten für die geparsten Örtlichkeiten besorgen.
 *
 *     npm run import:geocode            # nur fehlende Einträge
 *     npm run import:geocode -- --all   # alles neu abfragen
 *     npm run import:geocode -- --limit 20
 *
 * Quelle ist Nominatim (OpenStreetMap). Die Nutzungsbedingungen verlangen
 * maximal eine Anfrage pro Sekunde und einen aussagekräftigen User-Agent;
 * beides hält dieses Skript ein. Alle Antworten landen in
 * `data/geocode-cache.json`, damit ein erneuter Lauf nichts doppelt anfragt.
 */
import fs from "node:fs/promises";
import path from "node:path";
import type { GeoAccuracy } from "../../src/lib/types.js";
import { city, paths } from "./config.mjs";
import type { ParsedFile, ParsedSpot } from "./parse-pdf.mjs";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

/** Pflichtangabe laut Nominatim-Nutzungsbedingungen. */
const USER_AGENT = "wheelee-import/0.1 (Behindertenparkplatz-Karte; Kontakt via Repository)";

/** Mindestabstand zwischen zwei Anfragen in Millisekunden. */
const REQUEST_INTERVAL_MS = 1100;

/** Plausibilitätsrahmen für Frankfurt am Main – schützt vor Fehltreffern. */
const BOUNDS = { minLat: 50.0, maxLat: 50.26, minLng: 8.42, maxLng: 8.85 };

export interface GeocodeResult {
  lat: number | null;
  lng: number | null;
  accuracy: GeoAccuracy;
  /** Die Anfrage, die zum Treffer führte – für Nachvollziehbarkeit. */
  query: string | null;
  /** Von Nominatim gelieferte Adresse des Treffers. */
  displayName: string | null;
  /** Zeitpunkt der Abfrage. */
  fetchedAt: string;
}

type GeocodeCache = Record<string, GeocodeResult>;

interface NominatimPlace {
  lat: string;
  lon: string;
  display_name: string;
  /** „building", „house", „road", „neighbourhood", … */
  addresstype?: string;
  class?: string;
  type?: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    throw error;
  }
}

/** Liegt der Treffer im erwarteten Stadtgebiet? */
function isPlausible(lat: number, lng: number): boolean {
  return (
    lat >= BOUNDS.minLat && lat <= BOUNDS.maxLat && lng >= BOUNDS.minLng && lng <= BOUNDS.maxLng
  );
}

/**
 * Genauigkeit aus dem Nominatim-Typ ableiten. Nur Haus- und Gebäudetreffer
 * gelten als punktgenau; Straßentreffer sind brauchbar, aber ungenau.
 */
function accuracyFor(place: NominatimPlace, withHouseNumber: boolean): GeoAccuracy {
  const type = place.addresstype ?? place.type ?? "";
  if (withHouseNumber && ["building", "house", "house_number", "amenity", "shop"].includes(type)) {
    return "house";
  }
  if (["road", "street", "residential", "pedestrian", "footway"].includes(type)) return "street";
  return withHouseNumber ? "house" : "approximate";
}

/** Eine Anfrage an Nominatim; `null`, wenn kein plausibler Treffer vorliegt. */
async function queryNominatim(
  query: string,
  withHouseNumber: boolean,
): Promise<Omit<GeocodeResult, "fetchedAt"> | null> {
  const url = new URL(NOMINATIM_URL);
  url.searchParams.set("q", `${query}, ${city.name}, ${city.country}`);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  url.searchParams.set("addressdetails", "0");
  url.searchParams.set("accept-language", "de");

  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) {
    throw new Error(`Nominatim antwortete mit ${response.status} ${response.statusText}`);
  }

  const places = (await response.json()) as NominatimPlace[];
  const place = places[0];
  if (!place) return null;

  const lat = Number.parseFloat(place.lat);
  const lng = Number.parseFloat(place.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || !isPlausible(lat, lng)) return null;

  return {
    lat,
    lng,
    accuracy: accuracyFor(place, withHouseNumber),
    query,
    displayName: place.display_name,
  };
}

/**
 * Anfragen für einen Parkplatz, von genau nach grob.
 * Kreuzungen und Einrichtungen treffen oft erst über die Straße allein.
 */
function queryCandidates(spot: ParsedSpot): { query: string; withHouseNumber: boolean }[] {
  const candidates: { query: string; withHouseNumber: boolean }[] = [];
  const { street, houseNumber, note } = spot;

  if (street && houseNumber) {
    candidates.push({ query: `${street} ${houseNumber}`, withHouseNumber: true });
  }
  if (street && note) {
    candidates.push({ query: `${note}, ${street}`, withHouseNumber: false });
  }
  if (street) {
    candidates.push({ query: street, withHouseNumber: false });
  }
  if (!street) {
    candidates.push({ query: spot.label, withHouseNumber: false });
  }

  // Doppelte Anfragen vermeiden – jede kostet eine Sekunde.
  const seen = new Set<string>();
  return candidates.filter(({ query }) => {
    const key = query.toLocaleLowerCase("de-DE");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function parseArgs(argv: readonly string[]) {
  const limitIndex = argv.indexOf("--limit");
  return {
    all: argv.includes("--all"),
    limit:
      limitIndex >= 0 ? Number.parseInt(argv[limitIndex + 1] ?? "", 10) : Number.POSITIVE_INFINITY,
  };
}

async function main() {
  const { all, limit } = parseArgs(process.argv.slice(2));

  const parsed = await readJson<ParsedFile | null>(paths.parsed, null);
  if (!parsed) {
    throw new Error(`${paths.parsed} fehlt – bitte zuerst "npm run import:parse" ausführen.`);
  }

  const cache = await readJson<GeocodeCache>(paths.geocodeCache, {});
  const todo = parsed.spots.filter((spot) => all || !(spot.id in cache)).slice(0, limit);

  console.log(`Örtlichkeiten gesamt: ${parsed.spots.length}`);
  console.log(`Bereits im Cache:     ${Object.keys(cache).length}`);
  console.log(`Abzufragen:           ${todo.length}`);
  if (todo.length === 0) return;

  const estimateMinutes = Math.ceil((todo.length * REQUEST_INTERVAL_MS) / 60_000);
  console.log(`Geschätzte Dauer:     ca. ${estimateMinutes} Minuten (1 Anfrage/Sekunde)\n`);

  let done = 0;
  let failed = 0;

  /** Cache nach jedem Treffer sichern, damit ein Abbruch nichts verliert. */
  const persist = async () => {
    await fs.mkdir(path.dirname(paths.geocodeCache), { recursive: true });
    const sorted = Object.fromEntries(Object.entries(cache).sort(([a], [b]) => a.localeCompare(b)));
    await fs.writeFile(paths.geocodeCache, `${JSON.stringify(sorted, null, 2)}\n`, "utf8");
  };

  for (const spot of todo) {
    let result: GeocodeResult | null = null;

    for (const { query, withHouseNumber } of queryCandidates(spot)) {
      await sleep(REQUEST_INTERVAL_MS);
      try {
        const hit = await queryNominatim(query, withHouseNumber);
        if (hit) {
          result = { ...hit, fetchedAt: new Date().toISOString() };
          break;
        }
      } catch (error) {
        console.error(`  Fehler bei "${query}": ${(error as Error).message}`);
        // Netzfehler nicht als „nicht gefunden" zwischenspeichern.
        result = null;
        break;
      }
    }

    if (result) {
      cache[spot.id] = result;
      done += 1;
    } else {
      cache[spot.id] = {
        lat: null,
        lng: null,
        accuracy: "none",
        query: null,
        displayName: null,
        fetchedAt: new Date().toISOString(),
      };
      failed += 1;
    }

    await persist();

    const index = done + failed;
    if (index % 10 === 0 || index === todo.length) {
      console.log(`${index}/${todo.length} – Treffer: ${done}, ohne Koordinate: ${failed}`);
    }
  }

  console.log(`\nFertig. Treffer: ${done}, ohne Koordinate: ${failed}`);
  console.log(`Cache: ${path.relative(process.cwd(), paths.geocodeCache)}`);
}

await main();
