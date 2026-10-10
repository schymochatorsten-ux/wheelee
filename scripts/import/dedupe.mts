/**
 * Doppelte Einträge zusammenführen (ToDo 3.5).
 *
 *     npm run data:dedupe          # alle Städte bereinigen
 *     npm run data:dedupe -- --dry # nur zeigen, was passieren würde
 *
 * **Warum die Schwelle so niedrig ist.** Die Validierung meldet jedes Paar
 * unter 10 m als mögliche Dublette; über den ganzen Bestand sind das 4.460
 * Paare. Ein Blick auf ihre Abstände zeigt aber, dass das weit überwiegend
 * keine Dubletten sind:
 *
 * | Abstand          | Paare | Deutung                                    |
 * | ---------------- | ----: | ------------------------------------------ |
 * | 0 m (identisch)  |    26 | sicher dasselbe Objekt                     |
 * | unter 1 m        |    40 | sicher dasselbe Objekt                     |
 * | 1–3 m            |   480 | unklar                                     |
 * | 3–10 m           | 3.914 | benachbarte, real getrennte Stellplätze    |
 *
 * Ein markierter Stellplatz ist rund 3,5 m breit. Zwei Einträge in 4 m
 * Abstand sind deshalb im Regelfall **zwei echte Buchten nebeneinander**, wie
 * OpenStreetMap sie als einzelne `parking_space`-Objekte führt. Sie zusammen-
 * zufassen würde Stellplätze vernichten, die es wirklich gibt – und zwar
 * genau dort, wo viele davon sind, also an Krankenhäusern und Bahnhöfen.
 *
 * Zusammengeführt wird deshalb nur, was **praktisch auf demselben Punkt**
 * liegt und **denselben Namen** trägt. Das sind typischerweise Objekte, die
 * OpenStreetMap doppelt führt: einmal die Parkfläche mit `capacity:disabled`
 * und einmal der einzelne Stellplatz darauf.
 */
import fs from "node:fs/promises";
import path from "node:path";
import type { ParkingSpot } from "../../src/lib/types.js";
import { projectRoot } from "./config.mjs";

/**
 * Höchstabstand, bis zu dem zwei Einträge als dasselbe Objekt gelten.
 *
 * 1,5 m ist weniger als die Breite eines Stellplatzes – darunter kann es
 * keine zwei nebeneinanderliegenden Buchten geben.
 */
export const SAME_PLACE_METERS = 1.5;

const EARTH_RADIUS_METERS = 6_371_008.8;
const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

function distanceMeters(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(a.lat)) * Math.cos(toRadians(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Namen vergleichbar machen: Groß-/Kleinschreibung und Leerraum egal. */
function normalizeLabel(label: string): string {
  return label.replace(/\s+/gu, " ").trim().toLocaleLowerCase("de-DE");
}

/**
 * Welcher der beiden Einträge bleibt?
 *
 * Der mit mehr Angaben – eine Straße und eine Hausnummer sind mehr wert als
 * ein Eintrag ohne beides. Bei Gleichstand der mit der kleineren ID, damit
 * das Ergebnis bei gleicher Eingabe immer dasselbe ist.
 */
function richer(a: ParkingSpot, b: ParkingSpot): ParkingSpot {
  const score = (spot: ParkingSpot) =>
    (spot.street ? 2 : 0) + (spot.houseNumber ? 1 : 0) + (spot.timeRestriction ? 1 : 0);
  const diff = score(b) - score(a);
  if (diff !== 0) return diff > 0 ? b : a;
  return a.id <= b.id ? a : b;
}

export interface DedupeResult {
  spots: ParkingSpot[];
  /** Wie viele Einträge entfernt wurden. */
  removed: number;
  /** Lesbare Beschreibung je Zusammenführung, für den Bericht. */
  merges: string[];
}

/**
 * Einträge zusammenführen, die praktisch auf demselben Punkt liegen und
 * denselben Namen tragen.
 *
 * Die Stellplatzzahl wird **nicht addiert, sondern das Maximum genommen.**
 * Zwei Einträge am selben Punkt sind zwei Sichten auf dieselbe Fläche – „1"
 * ist der einzelne kartierte Stellplatz, „3" die Fläche mit drei. Zu addieren
 * hieße, dieselben Plätze doppelt zu zählen; genau diese Art Fehler hat in
 * Freiburg schon einmal das Sechzigfache des Üblichen erzeugt.
 */
export function dedupeSpots(spots: readonly ParkingSpot[]): DedupeResult {
  const located = spots.filter((spot) => spot.lat !== null && spot.lng !== null);
  const unlocated = spots.filter((spot) => spot.lat === null || spot.lng === null);

  // Raster, damit nicht jeder mit jedem verglichen wird. Eine Zelle ist rund
  // 20 m groß, also deutlich größer als die Schwelle.
  const cell = (spot: ParkingSpot) =>
    `${Math.round(spot.lat! * 5000)}:${Math.round(spot.lng! * 5000)}`;

  const grid = new Map<string, ParkingSpot[]>();
  for (const spot of located) {
    const key = cell(spot);
    const bucket = grid.get(key);
    if (bucket) bucket.push(spot);
    else grid.set(key, [spot]);
  }

  const removedIds = new Set<string>();
  const merges: string[] = [];
  const counts = new Map<string, number>();

  for (const spot of located) {
    if (removedIds.has(spot.id)) continue;
    const [gx, gy] = cell(spot).split(":").map(Number);

    for (let dx = -1; dx <= 1; dx += 1) {
      for (let dy = -1; dy <= 1; dy += 1) {
        for (const other of grid.get(`${gx + dx}:${gy + dy}`) ?? []) {
          if (other.id === spot.id || removedIds.has(other.id)) continue;
          if (normalizeLabel(other.label) !== normalizeLabel(spot.label)) continue;

          const meters = distanceMeters(
            { lat: spot.lat!, lng: spot.lng! },
            { lat: other.lat!, lng: other.lng! },
          );
          if (meters > SAME_PLACE_METERS) continue;

          const keep = richer(spot, other);
          const drop = keep === spot ? other : spot;
          removedIds.add(drop.id);
          counts.set(keep.id, Math.max(counts.get(keep.id) ?? keep.spotCount, drop.spotCount));
          const merged = Math.max(counts.get(keep.id)!, keep.spotCount);
          merges.push(
            `${keep.label} (${meters.toFixed(2)} m, ${keep.spotCount}+${drop.spotCount} → ` +
              `${merged} ${merged === 1 ? "Stellplatz" : "Stellplätze"})`,
          );

          if (drop.id === spot.id) break;
        }
      }
    }
  }

  const kept = [...located, ...unlocated]
    .filter((spot) => !removedIds.has(spot.id))
    .map((spot) =>
      counts.has(spot.id)
        ? { ...spot, spotCount: Math.max(spot.spotCount, counts.get(spot.id)!) }
        : spot,
    );

  return { spots: kept, removed: removedIds.size, merges };
}

/** Alle Seed-Dateien bereinigen. */
async function main() {
  const dryRun = process.argv.includes("--dry");
  const dataDir = path.join(projectRoot, "data");
  const files = (await fs.readdir(dataDir))
    .filter((file) => file.endsWith(".json") && !file.startsWith("_"))
    .filter((file) => !file.replace(/\.json$/u, "").includes("."))
    .filter((file) => !/(cache|pdf-liste)/u.test(file));

  let totalRemoved = 0;
  const touched: string[] = [];

  for (const file of files) {
    const full = path.join(dataDir, file);
    const seed = JSON.parse(await fs.readFile(full, "utf8")) as {
      spots: ParkingSpot[];
      [key: string]: unknown;
    };
    if (!Array.isArray(seed.spots)) continue;

    const result = dedupeSpots(seed.spots);
    if (result.removed === 0) continue;

    totalRemoved += result.removed;
    touched.push(`${file.replace(/\.json$/u, "")}: ${result.removed}`);
    for (const merge of result.merges.slice(0, 3)) console.log(`    ${merge}`);

    if (!dryRun) {
      seed.spots = result.spots;
      await fs.writeFile(full, `${JSON.stringify(seed, null, 2)}\n`, "utf8");
    }
  }

  console.log(`\n${dryRun ? "Würde entfernen" : "Entfernt"}: ${totalRemoved} Einträge`);
  console.log(`Betroffene Städte: ${touched.join(", ") || "keine"}`);
  if (!dryRun && totalRemoved > 0) {
    console.log("\nJetzt `npm run import:index` laufen lassen.");
  }
}

if (process.argv[1]?.replace(/\\/gu, "/").endsWith("dedupe.mts")) {
  await main();
}
