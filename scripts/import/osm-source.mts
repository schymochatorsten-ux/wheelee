/**
 * Behindertenparkplätze einer Stadt aus OpenStreetMap holen.
 *
 * Rückfallebene für Städte ohne amtlichen Datensatz. Die Vorsichtsmaßnahmen
 * hier sind nicht theoretisch, sondern beide schon eingetreten:
 *
 * - Overpass meldet Überlast teils mit HTTP 200 und leerem Ergebnis. Ungeprüft
 *   übernommen hieße das „in dieser Stadt gibt es keine Behindertenparkplätze".
 * - Eine Bounding-Box um eine Stadt enthält Nachbargemeinden. Geschnitten wird
 *   deshalb an der Gemeindegrenze.
 */
import { createHash } from "node:crypto";
import type { ParkingSpot } from "../../src/lib/types.js";
import type { GermanCity } from "./german-cities.mjs";

const USER_AGENT = "wheelee-import/0.1 (Behindertenparkplatz-Karte; Kontakt via Repository)";
const NOMINATIM = "https://nominatim.openstreetmap.org";

/** Nur Spiegel mit weltweitem Datenbestand – regionale Auszüge bestätigen sonst fälschlich „leer". */
const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
];

const OVERPASS_ROUNDS = 3;
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

/** Gemeindegrenze als OSM-Relation finden. */
async function findBoundary(city: GermanCity): Promise<{ relationId: number; name: string }> {
  await sleep(NOMINATIM_INTERVAL_MS);

  const url = new URL(`${NOMINATIM}/search`);
  url.searchParams.set("q", `${city.name}, ${city.state}, Deutschland`);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "5");
  url.searchParams.set("accept-language", "de");

  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) throw new Error(`Nominatim: HTTP ${response.status}`);

  const hits = (await response.json()) as {
    osm_type?: string;
    osm_id?: number;
    display_name: string;
  }[];

  const boundary = hits.find((hit) => hit.osm_type === "relation" && hit.osm_id);
  if (!boundary?.osm_id) {
    throw new Error(`Keine Gemeindegrenze für ${city.name} gefunden.`);
  }
  return { relationId: boundary.osm_id, name: boundary.display_name };
}

/**
 * Die drei gesuchten Tag-Kombinationen, einzeln abfragbar.
 *
 * Für große Städte lief die kombinierte Abfrage regelmäßig in einen Timeout
 * (HTTP 504 bei Stuttgart, Bremen, Duisburg). Einzeln gestellt sind die
 * Abfragen klein genug; die Ergebnisse werden danach zusammengeführt.
 */
const TAG_FILTERS = [
  '["amenity"="parking_space"]["parking_space"~"disabled"]',
  '["amenity"="parking"]["capacity:disabled"]',
  '["amenity"="parking"]["wheelchair"="designated"]',
];

function buildQuery(relationId: number, filters: readonly string[]): string {
  // `map_to_area` statt `area(3600000000 + id)`: Der Area-Index von Overpass
  // enthält nicht jede Gemeindegrenze.
  return `
[out:json][timeout:300];
rel(${relationId}); map_to_area ->.city;
(
${filters.map((filter) => `  nwr${filter}(area.city);`).join("\n")}
);
out center tags;
`;
}

async function fetchOverpass(query: string): Promise<OverpassElement[]> {
  const problems: string[] = [];
  let emptyConfirmations = 0;

  const attempts = Array.from({ length: OVERPASS_ROUNDS }, () => OVERPASS_ENDPOINTS).flat();

  for (const [index, endpoint] of attempts.entries()) {
    const host = new URL(endpoint).host;

    if (index > 0 && index % OVERPASS_ENDPOINTS.length === 0) {
      await sleep(30_000);
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "User-Agent": USER_AGENT },
        body: new URLSearchParams({ data: query }),
      });

      if (!response.ok) {
        problems.push(`${host}: HTTP ${response.status}`);
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

      // Ein leeres Ergebnis gilt erst nach Bestätigung durch einen zweiten Spiegel.
      emptyConfirmations += 1;
      if (emptyConfirmations >= 2) return [];
      await sleep(2000);
    } catch (error) {
      problems.push(`${host}: ${(error as Error).message}`);
    }
  }

  throw new Error(`Overpass lieferte kein verwertbares Ergebnis: ${problems.join("; ")}`);
}

/**
 * Anzahl der Behindertenstellplätze aus den Tags.
 * `capacity:disabled=no` heißt ausdrücklich „hier keine" – solche Objekte
 * gehören nicht in die Karte.
 */
function readSpotCount(tags: Record<string, string>): number | null {
  const raw = tags["capacity:disabled"];

  if (raw === undefined) {
    return tags.parking_space?.includes("disabled") || tags.wheelchair === "designated" ? 1 : null;
  }
  if (/^(no|none|0)$/iu.test(raw)) return null;

  const parsed = Number.parseInt(raw, 10);
  if (Number.isFinite(parsed) && parsed > 0) return parsed;
  return /^(yes|designated)$/iu.test(raw) ? 1 : null;
}

export async function importFromOsm(
  city: GermanCity,
): Promise<{ spots: ParkingSpot[]; query: string }> {
  const boundary = await findBoundary(city);

  let elements: OverpassElement[];
  try {
    elements = await fetchOverpass(buildQuery(boundary.relationId, TAG_FILTERS));
  } catch (combinedError) {
    // Zu groß für eine Abfrage: einzeln holen und zusammenführen.
    console.log("    Kombinierte Abfrage gescheitert, zerlege sie …");
    const byId = new Map<string, OverpassElement>();

    for (const filter of TAG_FILTERS) {
      const partial = await fetchOverpass(buildQuery(boundary.relationId, [filter]));
      for (const element of partial) byId.set(`${element.type}/${element.id}`, element);
      await sleep(2000);
    }

    if (byId.size === 0) throw combinedError;
    elements = [...byId.values()];
  }

  const query = `Overpass, OSM relation/${boundary.relationId} (${boundary.name})`;

  const spots: ParkingSpot[] = [];

  for (const element of elements) {
    const tags = element.tags ?? {};
    const spotCount = readSpotCount(tags);
    if (spotCount === null) continue;

    const lat = element.lat ?? element.center?.lat;
    const lng = element.lon ?? element.center?.lon;
    if (lat === undefined || lng === undefined) continue;

    const street = tags["addr:street"] ?? null;
    const houseNumber = tags["addr:housenumber"] ?? null;
    const label =
      tags.name ?? [street, houseNumber].filter(Boolean).join(" ") ?? "Behindertenparkplatz";

    const isLot = tags.amenity === "parking";

    spots.push({
      id: `${city.slug}-${createHash("sha256")
        .update(`${element.type}/${element.id}`, "utf8")
        .digest("hex")
        .slice(0, 10)}`,
      city: city.slug,
      label: label.length > 0 ? label : `Behindertenparkplatz ${city.name}`,
      street,
      houseNumber,
      note:
        [
          isLot ? "Parkplatz mit ausgewiesenen Behindertenstellplätzen" : null,
          tags.fee === "yes" ? "gebührenpflichtig" : null,
        ]
          .filter(Boolean)
          .join(" · ") || null,
      timeRestriction: tags.opening_hours ?? null,
      district: tags["addr:suburb"] ?? city.name,
      spotCount,
      lat,
      lng,
      // Punkte sind genau, Flächen liefern ihren Mittelpunkt.
      geoAccuracy: element.type === "node" ? "house" : "street",
      source: `OpenStreetMap (${element.type}/${element.id}), ODbL`,
    });
  }

  return { spots, query };
}
