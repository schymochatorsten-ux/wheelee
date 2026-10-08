/**
 * Import aus amtlichen WFS-Diensten der Städte.
 *
 *     npm run import:wfs               # alle konfigurierten Städte
 *     npm run import:wfs -- frankfurt
 *
 * Das ist die beste verfügbare Quelle: Die Stadt liefert ihre eigenen Daten
 * samt Koordinaten aus dem Kataster. Gegenüber der PDF-Liste, die dieselbe Stadt
 * veröffentlicht, entfällt das Geocoding vollständig – und damit die
 * Hauptfehlerquelle des Imports.
 *
 * Zum Vergleich für Frankfurt: Die PDF-Liste ergab 359 Örtlichkeiten, von denen
 * sich 330 verorten ließen und nur 166 hausgenau. Der WFS liefert 458 Einträge,
 * alle mit amtlicher Koordinate.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import type { ParkingSpot } from "../../src/lib/types.js";
import { splitAddress } from "../../src/lib/parking/address.js";
import { cityPaths, wfsCities, type WfsCity } from "./cities.mjs";

const USER_AGENT = "wheelee-import/0.1 (Behindertenparkplatz-Karte; Kontakt via Repository)";

interface GeoJsonFeature {
  id?: string;
  geometry: { type: string; coordinates: number[] } | null;
  properties: Record<string, string | number | null>;
}

interface GeoJsonCollection {
  features?: GeoJsonFeature[];
  numberMatched?: number;
  numberReturned?: number;
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    throw error;
  }
}

/** GeoJSON vom WFS holen, in WGS84 und ohne Paginierung. */
async function fetchFeatures(city: WfsCity): Promise<GeoJsonFeature[]> {
  const url = new URL(city.url);
  url.searchParams.set("service", "WFS");
  url.searchParams.set("version", "2.0.0");
  url.searchParams.set("request", "GetFeature");
  url.searchParams.set("typeNames", city.typeName);
  url.searchParams.set("outputFormat", "application/json");
  url.searchParams.set("srsName", "EPSG:4326");

  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) throw new Error(`WFS ${city.slug}: HTTP ${response.status}`);

  const text = await response.text();
  if (!text.trimStart().startsWith("{")) {
    // WFS meldet Fehler als XML-Dokument mit Status 200.
    throw new Error(`WFS ${city.slug} antwortete nicht mit GeoJSON: ${text.slice(0, 200)}`);
  }

  const collection = JSON.parse(text) as GeoJsonCollection;
  const features = collection.features ?? [];

  // Stiller Teilabruf wäre schlimmer als ein Abbruch: Er würde Parkplätze
  // unbemerkt verschwinden lassen.
  if (collection.numberMatched !== undefined && collection.numberMatched > features.length) {
    throw new Error(
      `WFS ${city.slug} lieferte nur ${features.length} von ${collection.numberMatched} ` +
        "Objekten – der Dienst paginiert. Bitte den Import um Seitenabruf erweitern.",
    );
  }

  return features;
}

/** Stabile ID aus der Objekt-ID des Dienstes. */
function spotId(city: WfsCity, feature: GeoJsonFeature, index: number): string {
  const identity = feature.id ?? `${city.slug}-${index}`;
  const hash = createHash("sha256").update(identity, "utf8").digest("hex").slice(0, 10);
  return `${city.slug}-${hash}`;
}

const asText = (value: string | number | null | undefined): string | null => {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  return text.length > 0 ? text : null;
};

/**
 * „durchgehend" heißt: keine zeitliche Beschränkung. Als Zeitangabe in der
 * Detailansicht wäre es irreführend – dort gehört nur hin, was einschränkt.
 */
const NO_RESTRICTION = /^(durchgehend|ganztägig|rund um die uhr|24\/7|immer)$/iu;

function readTimeRestriction(value: string | number | null | undefined): string | null {
  const text = asText(value);
  return text !== null && NO_RESTRICTION.test(text) ? null : text;
}

async function importCity(city: WfsCity) {
  console.log(`\n=== ${city.name} ===`);

  const features = await fetchFeatures(city);
  console.log(`WFS-Objekte: ${features.length}`);

  const overrides = await readJson<{ spots?: Record<string, Partial<ParkingSpot>> }>(
    cityPaths(city.slug).overrides,
    {},
  );

  const spots: ParkingSpot[] = [];
  let withoutGeometry = 0;

  for (const [index, feature] of features.entries()) {
    const properties = feature.properties ?? {};
    const label = asText(properties[city.fields.label]);

    if (!feature.geometry || feature.geometry.type !== "Point") {
      withoutGeometry += 1;
      continue;
    }

    // GeoJSON-Reihenfolge ist [Länge, Breite].
    const [lng, lat] = feature.geometry.coordinates;

    const address = splitAddress(label ?? "");
    const rawCount = Number.parseInt(String(properties[city.fields.spotCount] ?? "1"), 10);
    const id = spotId(city, feature, index);

    const base: ParkingSpot = {
      id,
      city: city.slug,
      label: label ?? "Behindertenparkplatz",
      street: address.street,
      houseNumber: address.houseNumber,
      note: address.note,
      // Die Zeitangabe aus dem Dienst ist verlässlicher als die aus dem Text.
      timeRestriction:
        readTimeRestriction(properties[city.fields.timeRestriction]) ?? address.timeRestriction,
      district: asText(properties[city.fields.district]) ?? city.name,
      spotCount: Number.isFinite(rawCount) && rawCount > 0 ? rawCount : 1,
      lat,
      lng,
      // Amtliche Koordinate – genauer geht es nicht.
      geoAccuracy: "house",
      source: city.source,
    };

    spots.push({ ...base, ...(overrides.spots?.[id] ?? {}) });
  }

  spots.sort((a, b) => a.label.localeCompare(b.label, "de-DE"));

  const paths = cityPaths(city.slug);
  await fs.mkdir(path.dirname(paths.seed), { recursive: true });
  await fs.writeFile(
    paths.seed,
    `${JSON.stringify(
      {
        city: { slug: city.slug, name: city.name, center: city.center },
        source: city.source,
        generatedAt: new Date().toISOString().slice(0, 10),
        spots,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  const totalSpaces = spots.reduce((sum, spot) => sum + spot.spotCount, 0);
  console.log(`Standorte: ${spots.length}, Stellplätze: ${totalSpaces}`);
  if (withoutGeometry > 0) console.log(`Ohne Punktgeometrie übersprungen: ${withoutGeometry}`);
  console.log(`Geschrieben: ${path.relative(process.cwd(), paths.seed)}`);
}

async function main() {
  const wanted = process.argv.slice(2).filter((argument) => !argument.startsWith("-"));
  const selected =
    wanted.length > 0 ? wfsCities.filter((city) => wanted.includes(city.slug)) : wfsCities;

  if (selected.length === 0) {
    throw new Error(`Unbekannte Stadt. Verfügbar: ${wfsCities.map((c) => c.slug).join(", ")}`);
  }

  for (const city of selected) {
    await importCity(city);
  }
}

await main();
