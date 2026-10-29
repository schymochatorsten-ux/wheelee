/**
 * Abstand jedes Standorts zur nächsten Straße (ToDo 3.4).
 *
 *     npm run check:streets -- frankfurt
 *     npm run check:streets -- frankfurt --max 40
 *
 * **Warum:** Ein Behindertenparkplatz liegt an einer Straße oder auf einem
 * Parkplatz, der an einer liegt. Ein Punkt, der weiter als 25 m von jeder
 * Straße entfernt ist, ist fast immer falsch verortet – etwa weil ein
 * Geocoder die Hausnummer in die Gebäudemitte gelegt hat. Das fängt, was die
 * Prüfung „liegt die Koordinate in der Stadt" nicht fängt (vgl.
 * Datenpflege.md: plausibel je Datenpunkt genügt nicht).
 *
 * **Ein Befund ist kein Beweis.** Große private Parkplätze, Parkhäuser auf
 * Werksgelände und Plätze in Fußgängerzonen liegen legitim abseits. Der Lauf
 * schreibt eine Liste zum Ansehen und ändert nichts.
 *
 * Eine Overpass-Abfrage je Stadt (Straßengeometrie im Rechteck um die
 * Standorte), danach wird lokal gerechnet. Ein leeres Ergebnis gilt als Fehler,
 * nicht als „keine Straßen" (Überlast kommt auch als HTTP 200 mit leerer
 * Liste zurück, CLAUDE.md).
 */
import fs from "node:fs/promises";
import path from "node:path";
import { projectRoot } from "./config.mjs";

const USER_AGENT = "wheelee-import/0.1 (Behindertenparkplatz-Karte; Kontakt via Repository)";

const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
];

/** Ab dieser Entfernung (Meter) wird ein Standort gemeldet. */
export const THRESHOLD_METERS = 25;

export interface LatLng {
  lat: number;
  lng: number;
}

/** Eine Straße als Linienzug. */
export type Polyline = LatLng[];

const METERS_PER_DEGREE_LAT = 110_540;
const METERS_PER_DEGREE_LNG_AT_EQUATOR = 111_320;

/**
 * Abstand eines Punkts zu einer Strecke in Metern. Gerechnet wird in einer
 * ebenen Näherung um den Punkt – bei Abständen von Metern bis Kilometern
 * weit genauer als die Koordinaten selbst.
 */
export function distanceToSegment(point: LatLng, a: LatLng, b: LatLng): number {
  const scaleX = Math.cos((point.lat * Math.PI) / 180) * METERS_PER_DEGREE_LNG_AT_EQUATOR;
  const toXY = (p: LatLng) => ({
    x: (p.lng - point.lng) * scaleX,
    y: (p.lat - point.lat) * METERS_PER_DEGREE_LAT,
  });
  const pa = toXY(a);
  const pb = toXY(b);

  const dx = pb.x - pa.x;
  const dy = pb.y - pa.y;
  const lengthSquared = dx * dx + dy * dy;
  // Der Punkt liegt im Ursprung; t ist der Fußpunkt auf der Strecke.
  const t = lengthSquared === 0 ? 0 : Math.max(0, Math.min(1, -(pa.x * dx + pa.y * dy) / lengthSquared));
  return Math.hypot(pa.x + t * dx, pa.y + t * dy);
}

/** Abstand zur nächsten Straße; `Infinity`, wenn es keine gibt. */
export function distanceToNearestStreet(point: LatLng, streets: readonly Polyline[]): number {
  let best = Infinity;
  for (const line of streets) {
    for (let i = 1; i < line.length; i += 1) {
      const distance = distanceToSegment(point, line[i - 1], line[i]);
      if (distance < best) best = distance;
    }
    // Ein einzelner Punkt ist keine Straße, zählt aber, falls es der einzige ist.
    if (line.length === 1) best = Math.min(best, distanceToSegment(point, line[0], line[0]));
  }
  return best;
}

export interface Finding {
  id: string;
  label: string;
  lat: number;
  lng: number;
  distanceMeters: number;
}

/** Standorte über der Schwelle, weiteste zuerst. */
export function farFromStreets(
  spots: readonly { id: string; label: string; lat: number | null; lng: number | null }[],
  streets: readonly Polyline[],
  threshold = THRESHOLD_METERS,
): Finding[] {
  const findings: Finding[] = [];
  for (const spot of spots) {
    if (spot.lat === null || spot.lng === null) continue;
    const distanceMeters = distanceToNearestStreet({ lat: spot.lat, lng: spot.lng }, streets);
    if (distanceMeters > threshold) {
      findings.push({ id: spot.id, label: spot.label, lat: spot.lat, lng: spot.lng, distanceMeters });
    }
  }
  return findings.sort((a, b) => b.distanceMeters - a.distanceMeters);
}

interface OverpassWay {
  type: "way";
  geometry?: { lat: number; lon: number }[];
}

async function fetchStreets(box: {
  south: number;
  west: number;
  north: number;
  east: number;
}): Promise<Polyline[]> {
  /*
   * Alles mit `highway`, außer Geplantem und Im-Bau-Befindlichem. Fuß- und
   * Radwege bleiben drin: Ein Behindertenparkplatz an einer Fußgängerzone ist
   * kein Fehler, und ein Rollstuhlfahrer erreicht ihn über genau diese Wege.
   */
  const query = `
[out:json][timeout:180];
way["highway"]["highway"!~"^(proposed|construction|abandoned|razed)$"](${box.south},${box.west},${box.north},${box.east});
out geom;
`;
  const problems: string[] = [];
  for (let round = 0; round < 3; round += 1) {
    for (const endpoint of OVERPASS_ENDPOINTS) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "User-Agent": USER_AGENT, "Content-Type": "application/x-www-form-urlencoded" },
          body: `data=${encodeURIComponent(query)}`,
          signal: AbortSignal.timeout(200_000),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = (await response.json()) as { elements?: OverpassWay[] };
        const lines = (data.elements ?? [])
          .filter((element) => element.type === "way" && element.geometry && element.geometry.length > 0)
          .map((element) => element.geometry!.map((p) => ({ lat: p.lat, lng: p.lon })));
        // Leer heißt hier: Überlast, nicht „keine Straßen" – in einer Stadt gibt es welche.
        if (lines.length === 0) throw new Error("leere Antwort");
        return lines;
      } catch (error) {
        problems.push(`${new URL(endpoint).host}: ${(error as Error).message}`);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 20_000));
  }
  throw new Error(`Straßen nicht abrufbar – ${problems.slice(-3).join("; ")}`);
}

interface Seed {
  city: { slug: string; name: string };
  spots: { id: string; label: string; lat: number | null; lng: number | null }[];
}

async function main() {
  const args = process.argv.slice(2);
  const maxIndex = args.indexOf("--max");
  const max = maxIndex >= 0 ? Number(args[maxIndex + 1]) || 40 : 40;
  const slugs = args.filter((a, i) => !a.startsWith("--") && !(maxIndex >= 0 && i === maxIndex + 1));

  if (slugs.length === 0) {
    console.log("Welche Stadt? npm run check:streets -- frankfurt");
    return;
  }

  for (const slug of slugs) {
    const raw = await fs.readFile(path.join(projectRoot, "data", `${slug}.json`), "utf8");
    const seed = JSON.parse(raw.replace(/^﻿/u, "")) as Seed;
    const located = seed.spots.filter((s) => s.lat !== null && s.lng !== null);
    if (located.length === 0) {
      console.log(`${seed.city.name}: keine verorteten Standorte.`);
      continue;
    }

    // Etwas Rand, damit eine Straße unmittelbar hinter dem Rechteck nicht fehlt.
    const margin = 0.003;
    const box = {
      south: Math.min(...located.map((s) => s.lat!)) - margin,
      north: Math.max(...located.map((s) => s.lat!)) + margin,
      west: Math.min(...located.map((s) => s.lng!)) - margin,
      east: Math.max(...located.map((s) => s.lng!)) + margin,
    };

    console.log(`\n=== ${seed.city.name}: ${located.length} Standorte, Straßen werden geladen …`);
    const streets = await fetchStreets(box);
    const findings = farFromStreets(located, streets);

    console.log(
      `${streets.length.toLocaleString("de-DE")} Straßen · ${findings.length} von ${located.length} ` +
        `Standorten über ${THRESHOLD_METERS} m von der nächsten Straße`,
    );
    for (const f of findings.slice(0, max)) {
      console.log(
        `  ${Math.round(f.distanceMeters).toString().padStart(5)} m  ${f.id}  ${f.label}  ` +
          `(${f.lat.toFixed(5)}, ${f.lng.toFixed(5)})`,
      );
    }
    if (findings.length > max) console.log(`  … und ${findings.length - max} weitere (mit --max erhöhen)`);
  }
}

if (process.argv[1]?.replace(/\\/gu, "/").endsWith("street-distance.mts")) {
  await main();
}
