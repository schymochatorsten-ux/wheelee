/**
 * Import der Behindertenparkplätze kleinerer Städte aus OpenStreetMap.
 *
 *     npm run import:osm                 # alle konfigurierten Städte
 *     npm run import:osm -- idstein      # nur eine Stadt
 *
 * Hintergrund: Für Idstein und Weißenhorn gibt es keine offene Liste der
 * Stadtverwaltung. OSM ist die einzige frei nutzbare Quelle – allerdings mit
 * einer anderen Datenlage als eine Verwaltungsliste:
 *
 * - Erfasst sind überwiegend **Parkplätze mit ausgewiesenen Behindertenplätzen**
 *   (`amenity=parking` + `capacity:disabled`), nicht einzelne Stellplätze am
 *   Straßenrand.
 * - Die Abdeckung ist unvollständig und hängt davon ab, wer vor Ort kartiert.
 *
 * Beides steht im Report und muss in der Oberfläche sichtbar bleiben, damit
 * niemand die Karte für vollständig hält.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import type { GeoAccuracy, ParkingSpot } from "../../src/lib/types.js";
import { addressCachePath, cityPaths, osmCities, type OsmCity } from "./cities.mjs";

const USER_AGENT = "wheelee-import/0.1 (Behindertenparkplatz-Karte; Kontakt via Repository)";
const NOMINATIM = "https://nominatim.openstreetmap.org";
/**
 * Nur Spiegel mit weltweitem Datenbestand. Regionale Auszüge (etwa
 * overpass.osm.ch, nur Schweiz) würden eine deutsche Abfrage mit „0 Objekte"
 * beantworten und damit ein leeres Ergebnis fälschlich bestätigen.
 */
const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
];

/** Durchläufe über alle Spiegel, bevor aufgegeben wird. */
const OVERPASS_ROUNDS = 3;

/** Nominatim-Nutzungsbedingungen: höchstens eine Anfrage pro Sekunde. */
const NOMINATIM_INTERVAL_MS = 1100;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface OverpassElement {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

/**
 * Das Stadtgebiet als Overpass-Area.
 *
 * Eine Bounding-Box reicht nicht: Sie ist ein Rechteck um die Stadt und zieht
 * Nachbargemeinden mit herein – bei Weißenhorn etwa das Kloster Roggenburg,
 * bei Idstein Steinfischbach (gehört zu Waldems). Die Gemeindegrenze als Fläche
 * schneidet exakt.
 */
interface CityArea {
  /** OSM-Relations-ID der Gemeindegrenze. */
  relationId: number;
  /** Name der gefundenen Grenze, zur Kontrolle im Log. */
  displayName: string;
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    throw error;
  }
}

async function writeJson(file: string, value: unknown) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

/** Die Gemeindegrenze über Nominatim finden und in eine Overpass-Area übersetzen. */
async function fetchCityArea(city: OsmCity): Promise<CityArea> {
  const url = new URL(`${NOMINATIM}/search`);
  url.searchParams.set("q", city.searchQuery);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "5");
  url.searchParams.set("accept-language", "de");

  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) throw new Error(`Nominatim: ${response.status}`);

  const hits = (await response.json()) as {
    osm_type?: string;
    osm_id?: number;
    display_name: string;
    category?: string;
    type?: string;
  }[];

  // Nur eine Relation beschreibt eine Fläche; ein Ortspunkt hilft nicht weiter.
  const boundary = hits.find((hit) => hit.osm_type === "relation" && hit.osm_id !== undefined);
  if (!boundary?.osm_id) {
    throw new Error(
      `Keine Gemeindegrenze für "${city.searchQuery}" gefunden – ohne Grenze würde der Import ` +
        "Parkplätze der Nachbargemeinden mitnehmen.",
    );
  }

  return { relationId: boundary.osm_id, displayName: boundary.display_name };
}

/**
 * Overpass-Abfrage innerhalb der Gemeindegrenze.
 *
 * Gesucht wird dreierlei: einzelne ausgewiesene Stellplätze, Parkplätze mit
 * gezählten Behindertenplätzen und Parkplätze, die ausdrücklich für
 * Rollstuhlfahrer:innen ausgewiesen sind.
 */
function overpassQuery(area: CityArea): string {
  // `map_to_area` statt `area(3600000000 + id)`: Der Area-Index von Overpass
  // wird nur periodisch erzeugt und enthält nicht jede Gemeindegrenze – für
  // Weißenhorn fehlt sie, und die Abfrage schlug mit HTTP 500 fehl.
  return `
[out:json][timeout:180];
rel(${area.relationId}); map_to_area ->.city;
(
  nwr["amenity"="parking_space"]["parking_space"~"disabled"](area.city);
  nwr["amenity"="parking"]["capacity:disabled"](area.city);
  nwr["amenity"="parking"]["wheelchair"="designated"](area.city);
);
out center tags;
`;
}

/**
 * Overpass fragen, bei Problemen den nächsten Spiegel versuchen.
 *
 * Vorsicht ist hier der ganze Punkt: Overpass meldet Überlast und abgebrochene
 * Abfragen teilweise mit HTTP 200 und einem `remark` im sonst leeren Ergebnis.
 * Wer das ungeprüft übernimmt, schreibt „keine Behindertenparkplätze" in die
 * Daten, obwohl es welche gibt. Deshalb gilt ein leeres Ergebnis erst als
 * echtes Ergebnis, wenn ein zweiter Spiegel es bestätigt.
 */
async function fetchOverpass(area: CityArea): Promise<OverpassElement[]> {
  const problems: string[] = [];
  let emptyConfirmations = 0;

  const attempts = Array.from({ length: OVERPASS_ROUNDS }, () => OVERPASS_ENDPOINTS).flat();

  for (const [index, endpoint] of attempts.entries()) {
    const host = new URL(endpoint).host;

    // Zwischen den Durchläufen länger warten – Overpass-Timeouts sind meist
    // Überlast, die sich von selbst legt.
    if (index > 0 && index % OVERPASS_ENDPOINTS.length === 0) {
      console.log("  Alle Spiegel durch, neuer Versuch in 30 Sekunden …");
      await sleep(30_000);
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "User-Agent": USER_AGENT },
        body: new URLSearchParams({ data: overpassQuery(area) }),
      });

      if (!response.ok) {
        problems.push(`${host}: HTTP ${response.status}`);
        // 429 heißt Überlast, nicht „kaputt" – dem Dienst Zeit lassen.
        await sleep(response.status === 429 ? 10_000 : 2000);
        continue;
      }

      const json = (await response.json()) as { elements?: OverpassElement[]; remark?: string };

      if (json.remark) {
        problems.push(`${host}: ${json.remark}`);
        await sleep(2000);
        continue;
      }

      const elements = json.elements ?? [];
      if (elements.length > 0) return elements;

      emptyConfirmations += 1;
      problems.push(`${host}: 0 Objekte`);
      if (emptyConfirmations >= 2) {
        console.warn("  Zwei Spiegel melden übereinstimmend 0 Objekte – Stadt bleibt leer.");
        return [];
      }
      await sleep(2000);
    } catch (error) {
      problems.push(`${host}: ${(error as Error).message}`);
    }
  }

  throw new Error(
    `Overpass lieferte kein verwertbares Ergebnis:\n  ${problems.join("\n  ")}\n` +
      "Später erneut versuchen – lieber kein Import als ein falsch leerer.",
  );
}

/**
 * Anzahl der Behindertenstellplätze aus den Tags lesen.
 * `capacity:disabled` ist oft eine Zahl, manchmal „yes"; „no" bedeutet, dass es
 * dort ausdrücklich keine gibt – solche Einträge gehören nicht in die Karte.
 */
function readSpotCount(tags: Record<string, string>): number | null {
  const raw = tags["capacity:disabled"];

  if (raw === undefined) {
    // Kein Zähler, aber als Behindertenstellplatz ausgewiesen.
    return tags.parking_space?.includes("disabled") || tags.wheelchair === "designated" ? 1 : null;
  }
  if (/^(no|none|0)$/iu.test(raw)) return null;

  const parsed = Number.parseInt(raw, 10);
  if (Number.isFinite(parsed) && parsed > 0) return parsed;

  // „yes" und Ähnliches: vorhanden, Anzahl unbekannt.
  return /^(yes|designated)$/iu.test(raw) ? 1 : null;
}

/** Mittelpunkt eines Elements – Knoten direkt, Flächen über `out center`. */
function coordinatesOf(element: OverpassElement): { lat: number; lng: number } | null {
  if (element.lat !== undefined && element.lon !== undefined) {
    return { lat: element.lat, lng: element.lon };
  }
  if (element.center) return { lat: element.center.lat, lng: element.center.lon };
  return null;
}

type AddressCache = Record<
  string,
  { street: string | null; houseNumber: string | null; district: string | null }
>;

/**
 * Straße und Stadtteil zu einer Koordinate nachschlagen.
 * OSM-Parkplätze tragen selten vollständige Adressen; ohne Straßenname wäre die
 * Detailansicht aber nutzlos.
 */
async function reverseGeocode(
  lat: number,
  lng: number,
  cache: AddressCache,
): Promise<AddressCache[string]> {
  const key = `${lat.toFixed(6)},${lng.toFixed(6)}`;
  const cached = cache[key];
  if (cached) return cached;

  await sleep(NOMINATIM_INTERVAL_MS);

  const url = new URL(`${NOMINATIM}/reverse`);
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lng));
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("zoom", "18");
  url.searchParams.set("accept-language", "de");

  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) throw new Error(`Nominatim reverse: ${response.status}`);

  const json = (await response.json()) as {
    address?: Record<string, string>;
  };
  const address = json.address ?? {};

  const result = {
    street: address.road ?? address.pedestrian ?? address.footway ?? null,
    houseNumber: address.house_number ?? null,
    // Nur echte Ortsteil-Felder. `village` ist hier unbrauchbar: Für die
    // Weißenhorner Innenstadt liefert Nominatim „Hegelhofen" – ein Ortspunkt in
    // der Nähe, nicht der Ortsteil der Adresse. Lieber kein Stadtteil als ein
    // falscher; der Aufrufer setzt dann den Stadtnamen ein.
    district: address.suburb ?? address.city_district ?? address.borough ?? address.quarter ?? null,
  };

  cache[key] = result;
  return result;
}

/** Stabile ID aus der OSM-Identität – sie überlebt Neuimporte. */
function spotId(city: OsmCity, element: OverpassElement): string {
  const hash = createHash("sha256")
    .update(`${element.type}/${element.id}`, "utf8")
    .digest("hex")
    .slice(0, 10);
  return `${city.slug}-${hash}`;
}

interface CityResult {
  city: OsmCity;
  spots: ParkingSpot[];
  skipped: number;
}

async function importCity(city: OsmCity, cache: AddressCache): Promise<CityResult> {
  console.log(`\n=== ${city.name} ===`);

  await sleep(NOMINATIM_INTERVAL_MS);
  const area = await fetchCityArea(city);
  console.log(`Gemeindegrenze: ${area.displayName} (relation/${area.relationId})`);

  const elements = await fetchOverpass(area);
  console.log(`OSM-Objekte: ${elements.length}`);

  const overrides = await readJson<{ spots?: Record<string, Partial<ParkingSpot>> }>(
    cityPaths(city.slug).overrides,
    {},
  );

  const spots: ParkingSpot[] = [];
  let skipped = 0;

  for (const element of elements) {
    const tags = element.tags ?? {};
    const spotCount = readSpotCount(tags);
    const coordinates = coordinatesOf(element);

    if (spotCount === null || !coordinates) {
      skipped += 1;
      continue;
    }

    const id = spotId(city, element);
    const address = await reverseGeocode(coordinates.lat, coordinates.lng, cache);

    const street = tags["addr:street"] ?? address.street;
    const houseNumber = tags["addr:housenumber"] ?? address.houseNumber;

    // Ein Parkplatz mit mehreren Behindertenplätzen ist nicht dasselbe wie ein
    // einzelner Stellplatz am Straßenrand – der Name macht das deutlich.
    const isLot = tags.amenity === "parking";
    const label = tags.name ?? [street, houseNumber].filter(Boolean).join(" ") ?? "Parkplatz";

    // Der Name steht schon in der Überschrift – im Hinweis wäre er doppelt.
    const note = [
      isLot ? "Parkplatz mit ausgewiesenen Behindertenstellplätzen" : null,
      tags.fee === "yes" ? "gebührenpflichtig" : null,
    ]
      .filter(Boolean)
      .join(" · ");

    const base: ParkingSpot = {
      id,
      city: city.slug,
      label: label.length > 0 ? label : `Parkplatz ${city.name}`,
      street: street ?? null,
      houseNumber: houseNumber ?? null,
      note: note.length > 0 ? note : null,
      timeRestriction: tags["opening_hours"] ?? null,
      district: address.district ?? city.name,
      spotCount,
      lat: coordinates.lat,
      lng: coordinates.lng,
      // Die Koordinate stammt aus der Geometrie des Objekts selbst, nicht aus
      // einer Adresssuche – bei Flächen ist sie der Mittelpunkt.
      geoAccuracy: (element.type === "node" ? "house" : "street") as GeoAccuracy,
      source: `OpenStreetMap (${element.type}/${element.id}), ODbL`,
    };

    spots.push({ ...base, ...(overrides.spots?.[id] ?? {}) });
  }

  spots.sort((a, b) => a.label.localeCompare(b.label, "de-DE"));
  return { city, spots, skipped };
}

async function writeCity({ city, spots, skipped }: CityResult) {
  const paths = cityPaths(city.slug);

  await writeJson(paths.seed, {
    city: { slug: city.slug, name: city.name, center: city.center },
    source: city.source,
    generatedAt: new Date().toISOString().slice(0, 10),
    spots,
  });

  const totalSpaces = spots.reduce((sum, spot) => sum + spot.spotCount, 0);
  const lines = [
    `# Importreport ${city.name}`,
    "",
    `Stand: ${new Date().toISOString().slice(0, 10)}`,
    `Quelle: ${city.source}`,
    "",
    "## Wichtig zur Datenlage",
    "",
    `Für ${city.name} gibt es keine offene Liste der Stadtverwaltung. Diese Daten stammen`,
    "aus OpenStreetMap und unterscheiden sich dadurch grundlegend von der Frankfurter Liste:",
    "",
    "- Erfasst sind überwiegend **Parkplätze mit ausgewiesenen Behindertenstellplätzen**,",
    "  nicht einzelne Stellplätze am Straßenrand.",
    "- Die Abdeckung ist **unvollständig** und hängt davon ab, wer vor Ort kartiert hat.",
    "- Ein fehlender Eintrag bedeutet nicht, dass es dort keinen Behindertenparkplatz gibt.",
    "",
    "## Überblick",
    "",
    "| Kennzahl | Wert |",
    "| --- | --- |",
    `| Standorte | ${spots.length} |`,
    `| Stellplätze (laut OSM) | ${totalSpaces} |`,
    `| verworfene OSM-Objekte | ${skipped} |`,
    "",
    "## Standorte",
    "",
    "| ID | Bezeichnung | Straße | Stellplätze | OSM-Objekt |",
    "| --- | --- | --- | --- | --- |",
    ...spots.map(
      (spot) =>
        `| \`${spot.id}\` | ${spot.label} | ${[spot.street, spot.houseNumber].filter(Boolean).join(" ") || "–"} | ${spot.spotCount} | ${spot.source.replace("OpenStreetMap (", "").replace("), ODbL", "")} |`,
    ),
    "",
    "## Nacharbeiten",
    "",
    `Korrekturen gehören in \`data/${city.slug}.overrides.json\` (Schlüssel = ID).`,
    "Besser noch: fehlende Parkplätze direkt in OpenStreetMap eintragen – davon haben alle etwas.",
    "",
  ];

  await fs.writeFile(paths.report, lines.join("\n"), "utf8");

  console.log(`Standorte: ${spots.length}, Stellplätze: ${totalSpaces}, verworfen: ${skipped}`);
  console.log(`Geschrieben: ${path.relative(process.cwd(), paths.seed)}`);
}

async function main() {
  const wanted = process.argv.slice(2).filter((argument) => !argument.startsWith("-"));
  const selected =
    wanted.length > 0 ? osmCities.filter((city) => wanted.includes(city.slug)) : osmCities;

  if (selected.length === 0) {
    throw new Error(
      `Unbekannte Stadt. Verfügbar: ${osmCities.map((city) => city.slug).join(", ")}`,
    );
  }

  const cache = await readJson<AddressCache>(addressCachePath, {});

  for (const city of selected) {
    const result = await importCity(city, cache);
    await writeJson(addressCachePath, cache);
    await writeCity(result);
  }
}

await main();
