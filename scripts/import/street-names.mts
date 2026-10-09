/**
 * Ergänzt fehlende Straßennamen aus OpenStreetMap.
 *
 *     npm run import:streets                # alle Städte mit Lücken
 *     npm run import:streets -- augsburg
 *     npm run import:streets -- --dry       # nur rechnen, nichts schreiben
 *
 * **Warum nicht die Rückwärtssuche von Nominatim:** Die bräuchte eine Anfrage
 * je Standort – bei den offenen Lücken über 7.000 Stück und damit mehr als
 * zwei Stunden an einem freien Gemeinschaftsdienst. Dieser Weg holt stattdessen
 * mit **einer** Overpass-Abfrage je Stadt alle benannten Straßen und ordnet
 * jedem Parkplatz lokal die nächstgelegene zu. Für Augsburg sind das 6,8 MB in
 * gut zwei Sekunden statt 385 Einzelabfragen in sieben Minuten.
 *
 * Hausnummern liefert dieser Weg zusätzlich, soweit OpenStreetMap
 * Adresspunkte in der Nähe kennt.
 */
import fs from "node:fs/promises";
import path from "node:path";
import type { ParkingSpot } from "../../src/lib/types.js";
import { projectRoot } from "./config.mjs";

const USER_AGENT = "wheelee-import/0.1 (Behindertenparkplatz-Karte; Kontakt via Repository)";

const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
];

/**
 * Suchradius für den Straßennamen.
 *
 * 40 m trifft Stellplätze am Straßenrand. Größere Parkplatzflächen liegen
 * aber oft weiter von der Fahrbahn entfernt – mit 40 m blieben in Augsburg
 * 41 % ohne Namen. Bis 150 m ist die nächstgelegene Straße immer noch die
 * sinnvolle Beschreibung („Parkplatz an der Hauptstraße"), nur eben keine
 * Hausadresse.
 */
const MAX_STREET_METERS = 150;

/** Hausnummern nur übernehmen, wenn der Adresspunkt wirklich nah liegt. */
const MAX_HOUSENUMBER_METERS = 25;

/** Kantenlänge der Suchraster-Zellen in Grad – rund 200 m. */
const CELL = 0.002;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface SeedFile {
  city: { slug: string; name: string; center: { lat: number; lng: number } };
  source: string;
  generatedAt: string;
  spots: ParkingSpot[];
}

interface OverpassWay {
  type: "way";
  id: number;
  tags?: Record<string, string>;
  geometry?: { lat: number; lon: number }[];
}

interface OverpassNode {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  /** Bei Flächen liefert `out center` den Mittelpunkt hier. */
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

/** Punktkoordinate eines Adressobjekts, egal ob Knoten oder Fläche. */
const addressPoint = (node: OverpassNode) =>
  node.lat !== undefined && node.lon !== undefined
    ? { lat: node.lat, lng: node.lon }
    : node.center
      ? { lat: node.center.lat, lng: node.center.lon }
      : null;

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    throw error;
  }
}

/* ------------------------------------------------------------------ *
 * Geometrie
 * ------------------------------------------------------------------ */

/**
 * Lokale Meter-Näherung.
 *
 * Auf Stadtgröße ist die Erdkrümmung vernachlässigbar; diese Projektion ist
 * um Größenordnungen schneller als Haversine und hier genau genug, weil es
 * nur um Abstände von wenigen Dutzend Metern geht.
 */
function projector(lat0: number) {
  const metersPerLat = 110_574;
  const metersPerLng = 111_320 * Math.cos((lat0 * Math.PI) / 180);
  return {
    x: (lng: number) => lng * metersPerLng,
    y: (lat: number) => lat * metersPerLat,
  };
}

/** Abstand eines Punkts zu einer Strecke, alles in Metern. */
function distanceToSegment(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
): number {
  const dx = bx - ax;
  const dy = by - ay;
  const lengthSquared = dx * dx + dy * dy;

  if (lengthSquared === 0) return Math.hypot(px - ax, py - ay);

  // Lotfußpunkt auf die Strecke begrenzen.
  let t = ((px - ax) * dx + (py - ay) * dy) / lengthSquared;
  t = Math.max(0, Math.min(1, t));

  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

/* ------------------------------------------------------------------ *
 * Overpass
 * ------------------------------------------------------------------ */

/** Durchläufe über alle Spiegel, bevor aufgegeben wird. */
const OVERPASS_ROUNDS = 4;

/**
 * Overpass fragen, mit Geduld.
 *
 * Zwei Abfragen je Stadt in schneller Folge quittiert der öffentliche Dienst
 * mit 429 und 504 – er vergibt Bearbeitungsplätze und nimmt es übel, wenn man
 * drängelt. Mehrere Durchläufe mit wachsender Pause lösen das zuverlässiger
 * als ein weiterer Spiegel.
 */
async function fetchOverpass(query: string): Promise<(OverpassWay | OverpassNode)[]> {
  const problems: string[] = [];
  const attempts = Array.from({ length: OVERPASS_ROUNDS }, () => OVERPASS_ENDPOINTS).flat();

  for (const [index, endpoint] of attempts.entries()) {
    const host = new URL(endpoint).host;

    if (index > 0 && index % OVERPASS_ENDPOINTS.length === 0) {
      // Nach jedem vollen Durchlauf länger warten.
      await sleep(15_000 * (index / OVERPASS_ENDPOINTS.length));
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "User-Agent": USER_AGENT },
        body: new URLSearchParams({ data: query }),
      });

      if (!response.ok) {
        problems.push(`${host}: HTTP ${response.status}`);
        // 429 heißt „zu schnell", 504 „zu viel auf einmal" – beidem hilft Warten.
        await sleep(response.status === 429 ? 20_000 : 5000);
        continue;
      }

      const json = (await response.json()) as {
        elements?: (OverpassWay | OverpassNode)[];
        remark?: string;
      };

      // Überlast meldet Overpass teils mit HTTP 200 und einem `remark`.
      if (json.remark) {
        problems.push(`${host}: ${json.remark}`);
        await sleep(2000);
        continue;
      }

      return json.elements ?? [];
    } catch (error) {
      problems.push(`${host}: ${(error as Error).message}`);
    }
  }

  throw new Error(`Overpass nicht erreichbar: ${problems.join("; ")}`);
}

interface BoundingBox {
  south: number;
  west: number;
  north: number;
  east: number;
}

function boundingBoxOf(spots: ParkingSpot[]): BoundingBox {
  const lats = spots.map((spot) => spot.lat!);
  const lngs = spots.map((spot) => spot.lng!);
  const pad = 0.003;
  return {
    south: Math.min(...lats) - pad,
    west: Math.min(...lngs) - pad,
    north: Math.max(...lats) + pad,
    east: Math.max(...lngs) + pad,
  };
}

/**
 * Benannte Straßen im Gebiet holen.
 *
 * Fuß- und Radwege sind ausgeschlossen: Ein Behindertenparkplatz liegt an
 * einer befahrbaren Straße, und ein danebenliegender Gehweg würde den
 * falschen Namen liefern.
 */
function streetQuery(box: BoundingBox): string {
  const bbox = `${box.south},${box.west},${box.north},${box.east}`;
  // Autobahnen und Kraftfahrstraßen sind ausgeschlossen: Dort gibt es keine
  // Behindertenstellplätze, wohl aber Parkplätze daneben, die sonst „A 9"
  // oder „A 565" heißen würden.
  return `
[out:json][timeout:240];
way["highway"]["name"]
  ["highway"!~"^(footway|cycleway|path|steps|track|bridleway|construction|proposed|raceway|motorway|motorway_link|trunk|trunk_link)$"]
  (${bbox});
out geom;
`;
}

/**
 * Adressen im Gebiet – für die Hausnummer.
 *
 * `nwr` statt `node`: In Deutschland hängt die Hausnummer meist am Gebäude,
 * also an einer Fläche, nicht an einem Punkt. Eine reine Knotenabfrage fand
 * in Augsburg deshalb keine einzige.
 */
function addressQuery(box: BoundingBox): string {
  const bbox = `${box.south},${box.west},${box.north},${box.east}`;
  return `
[out:json][timeout:240];
nwr["addr:housenumber"]["addr:street"](${bbox});
out center tags;
`;
}

/** Ein Rechteck in vier gleich große Teile zerlegen. */
function quarters(box: BoundingBox): BoundingBox[] {
  const midLat = (box.south + box.north) / 2;
  const midLng = (box.west + box.east) / 2;
  return [
    { south: box.south, west: box.west, north: midLat, east: midLng },
    { south: box.south, west: midLng, north: midLat, east: box.east },
    { south: midLat, west: box.west, north: box.north, east: midLng },
    { south: midLat, west: midLng, north: box.north, east: box.east },
  ];
}

/**
 * Straßen holen, bei Bedarf in Teilgebieten.
 *
 * Für weitläufige Gemeindegebiete wie Karlsruhe oder Hamm überschreitet die
 * Abfrage das Zeitlimit von Overpass, egal wie oft man es versucht. Vier
 * kleinere Abfragen kommen durch, wo eine große scheitert.
 */
async function fetchStreets(box: BoundingBox, depth = 0): Promise<(OverpassWay | OverpassNode)[]> {
  try {
    return await fetchOverpass(streetQuery(box));
  } catch (error) {
    if (depth >= 2) throw error;

    console.log(`    Gebiet zu groß – wird in vier Teile zerlegt (Ebene ${depth + 1})`);
    const results: (OverpassWay | OverpassNode)[] = [];

    for (const quarter of quarters(box)) {
      results.push(...(await fetchStreets(quarter, depth + 1)));
      await sleep(5000);
    }

    return results;
  }
}

/* ------------------------------------------------------------------ *
 * Suchraster
 * ------------------------------------------------------------------ */

interface Segment {
  name: string;
  ax: number;
  ay: number;
  bx: number;
  by: number;
}

/**
 * Namen, die nur eine Straßennummer sind („B 10", „L 534").
 * Als Ortsangabe taugen sie wenig – niemand sucht „B 10".
 */
export const ONLY_ROAD_NUMBER = /^[ABKLSZ]\s?\d{1,4}$/u;

const cellKey = (lat: number, lng: number) => `${Math.floor(lat / CELL)}:${Math.floor(lng / CELL)}`;

/**
 * Strecken nach Rasterzellen einsortieren.
 *
 * Ohne Raster wären es bei 385 Standorten und 57.000 Stützpunkten über 20
 * Millionen Abstandsberechnungen je Stadt. Mit Raster genügt die Umgebung.
 */
function buildStreetIndex(ways: OverpassWay[], project: ReturnType<typeof projector>) {
  const grid = new Map<string, Segment[]>();

  for (const way of ways) {
    const name = way.tags?.name;
    const points = way.geometry;
    if (!name || !points || points.length < 2) continue;

    for (let i = 0; i < points.length - 1; i += 1) {
      const a = points[i];
      const b = points[i + 1];
      const segment: Segment = {
        name,
        ax: project.x(a.lon),
        ay: project.y(a.lat),
        bx: project.x(b.lon),
        by: project.y(b.lat),
      };

      // In jede Zelle eintragen, die der Abschnitt berührt.
      const minLat = Math.min(a.lat, b.lat);
      const maxLat = Math.max(a.lat, b.lat);
      const minLng = Math.min(a.lon, b.lon);
      const maxLng = Math.max(a.lon, b.lon);

      for (let lat = minLat; lat <= maxLat + CELL; lat += CELL) {
        for (let lng = minLng; lng <= maxLng + CELL; lng += CELL) {
          const key = cellKey(lat, lng);
          const bucket = grid.get(key);
          if (bucket) bucket.push(segment);
          else grid.set(key, [segment]);
        }
      }
    }
  }

  return grid;
}

function nearestStreet(
  grid: Map<string, Segment[]>,
  lat: number,
  lng: number,
  project: ReturnType<typeof projector>,
): { name: string; meters: number } | null {
  const px = project.x(lng);
  const py = project.y(lat);

  let best: { name: string; meters: number } | null = null;
  let bestNamed: { name: string; meters: number } | null = null;
  const baseLat = Math.floor(lat / CELL);
  const baseLng = Math.floor(lng / CELL);

  // Die eigene Zelle und alle Nachbarn abdecken den Suchradius sicher ab.
  for (let dLat = -1; dLat <= 1; dLat += 1) {
    for (let dLng = -1; dLng <= 1; dLng += 1) {
      for (const segment of grid.get(`${baseLat + dLat}:${baseLng + dLng}`) ?? []) {
        const meters = distanceToSegment(px, py, segment.ax, segment.ay, segment.bx, segment.by);
        const candidate = { name: segment.name, meters };

        if (!best || meters < best.meters) best = candidate;
        if (!ONLY_ROAD_NUMBER.test(segment.name) && (!bestNamed || meters < bestNamed.meters)) {
          bestNamed = candidate;
        }
      }
    }
  }

  // Eine Straße mit richtigem Namen hat Vorrang, solange sie in Reichweite
  // liegt – auch wenn eine nummerierte etwas näher ist.
  const chosen = bestNamed && bestNamed.meters <= MAX_STREET_METERS ? bestNamed : best;
  return chosen && chosen.meters <= MAX_STREET_METERS ? chosen : null;
}

/* ------------------------------------------------------------------ *
 * Ablauf
 * ------------------------------------------------------------------ */

async function processCity(file: string, seed: SeedFile, dryRun: boolean) {
  const open = seed.spots.filter((spot) => !spot.street && spot.lat !== null && spot.lng !== null);
  if (open.length === 0) return { assigned: 0, withNumber: 0, open: 0 };

  const box = boundingBoxOf(open);
  const project = projector(seed.city.center.lat);

  const ways = (await fetchStreets(box)).filter(
    (element): element is OverpassWay => element.type === "way",
  );
  const grid = buildStreetIndex(ways, project);

  await sleep(6000);

  // Adresspunkte sind klein und liefern die Hausnummer dazu.
  let addressNodes: OverpassNode[] = [];
  try {
    addressNodes = (await fetchOverpass(addressQuery(box))) as OverpassNode[];
  } catch {
    // Ohne Hausnummern ist das Ergebnis immer noch brauchbar.
  }

  const addressGrid = new Map<string, { lat: number; lng: number; node: OverpassNode }[]>();
  for (const node of addressNodes) {
    const point = addressPoint(node);
    if (!point) continue;
    const key = cellKey(point.lat, point.lng);
    const entry = { ...point, node };
    const bucket = addressGrid.get(key);
    if (bucket) bucket.push(entry);
    else addressGrid.set(key, [entry]);
  }

  let assigned = 0;
  let withNumber = 0;

  for (const spot of open) {
    const street = nearestStreet(grid, spot.lat!, spot.lng!, project);
    if (!street) continue;

    spot.street = street.name;
    assigned += 1;

    // Hausnummer nur, wenn der Adresspunkt zur selben Straße gehört.
    const px = project.x(spot.lng!);
    const py = project.y(spot.lat!);
    const baseLat = Math.floor(spot.lat! / CELL);
    const baseLng = Math.floor(spot.lng! / CELL);

    let bestNode: { number: string; meters: number } | null = null;
    for (let dLat = -1; dLat <= 1; dLat += 1) {
      for (let dLng = -1; dLng <= 1; dLng += 1) {
        for (const entry of addressGrid.get(`${baseLat + dLat}:${baseLng + dLng}`) ?? []) {
          if (entry.node.tags?.["addr:street"] !== street.name) continue;
          const meters = Math.hypot(px - project.x(entry.lng), py - project.y(entry.lat));
          if (!bestNode || meters < bestNode.meters) {
            bestNode = { number: entry.node.tags["addr:housenumber"]!, meters };
          }
        }
      }
    }

    if (bestNode && bestNode.meters <= MAX_HOUSENUMBER_METERS) {
      spot.houseNumber = bestNode.number;
      withNumber += 1;
    }

    spot.label = [spot.street, spot.houseNumber].filter(Boolean).join(" ");
  }

  if (assigned > 0 && !dryRun) {
    seed.spots.sort((a, b) => a.label.localeCompare(b.label, "de-DE"));
    await fs.writeFile(
      path.join(projectRoot, "data", file),
      `${JSON.stringify(seed, null, 2)}\n`,
      "utf8",
    );
  }

  return { assigned, withNumber, open: open.length };
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry");
  const wanted = args.filter((argument) => !argument.startsWith("--"));

  const dataDir = path.join(projectRoot, "data");
  const skip =
    /^_|\.(overrides|parsed|report|line-fixups)\.|^geocode-cache|^osm-address|^frankfurt-pdf-liste/u;

  const files = (await fs.readdir(dataDir)).filter(
    (file) => file.endsWith(".json") && !skip.test(file),
  );

  const todo: { file: string; seed: SeedFile; open: number }[] = [];
  for (const file of files) {
    const seed = await readJson<SeedFile | null>(path.join(dataDir, file), null);
    if (!seed?.city?.slug || !Array.isArray(seed.spots)) continue;
    if (wanted.length > 0 && !wanted.includes(seed.city.slug)) continue;

    const open = seed.spots.filter(
      (spot) => !spot.street && spot.lat !== null && spot.lng !== null,
    ).length;
    if (open > 0) todo.push({ file, seed, open });
  }

  todo.sort((a, b) => b.open - a.open);
  const totalOpen = todo.reduce((sum, entry) => sum + entry.open, 0);

  console.log(`${todo.length} Städte, zusammen ${totalOpen} Standorte ohne Straßennamen.`);
  if (dryRun) console.log("Probelauf – es wird nichts geschrieben.\n");

  let assignedTotal = 0;
  let numberTotal = 0;

  for (const entry of todo) {
    try {
      const result = await processCity(entry.file, entry.seed, dryRun);
      assignedTotal += result.assigned;
      numberTotal += result.withNumber;

      const share = result.open > 0 ? Math.round((result.assigned / result.open) * 100) : 0;
      console.log(
        `${entry.seed.city.name.padEnd(24)} ${String(result.assigned).padStart(4)}/${String(result.open).padEnd(4)} (${share} %)` +
          `${result.withNumber > 0 ? `, davon ${result.withNumber} mit Hausnummer` : ""}`,
      );
    } catch (error) {
      console.log(
        `${entry.seed.city.name.padEnd(24)} Fehler: ${(error as Error).message.slice(0, 90)}`,
      );
    }

    // Dem Dienst zwischen den Städten Luft lassen.
    await sleep(8000);
  }

  console.log(
    `\nFertig. ${assignedTotal} Straßennamen ergänzt, davon ${numberTotal} mit Hausnummer.`,
  );
}

await main();
