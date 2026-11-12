/**
 * Von Hand ergänzte Standorte: `data/<stadt>.zusatz.json` (ToDo 2d.8a).
 *
 * **Warum es diese Datei gibt.** `data/<stadt>.overrides.json` korrigiert
 * vorhandene Einträge über ihre ID – neue hinzufügen kann sie nicht. Für
 * Heidelberg war aber genau das nötig: Die amtliche Datei ist tot, die Stadt
 * verweist auf ihre Webseite, und deren Standorte gibt es im Bestand nicht.
 *
 * **Getrennt von der Seed-Datei, weil die Seed-Datei erzeugt wird.** Käme je
 * wieder ein Import für Heidelberg, überschriebe er sie – und die Ergänzung
 * wäre lautlos weg. Hier steht sie außerhalb und wird beim Bauen angehängt.
 *
 * Eine Ergänzung gewinnt **nicht** gegen die Quelle: Trägt die Quelle einen
 * Eintrag mit derselben ID, bleibt deren Fassung stehen.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ParkingSpot } from "../../src/lib/types.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

export interface ZusatzFile {
  /** Woher die Einträge stammen – steht auch an jedem Standort. */
  source: string;
  /** Die Seite, von der abgeschrieben wurde. */
  page?: string;
  /** Tag des Abrufs. */
  fetchedAt?: string;
  spots: ParkingSpot[];
}

export function zusatzPath(slug: string): string {
  return path.join(projectRoot, "data", `${slug}.zusatz.json`);
}

export async function readZusatz(slug: string): Promise<ZusatzFile | null> {
  try {
    return JSON.parse(await fs.readFile(zusatzPath(slug), "utf8")) as ZusatzFile;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

/** Ergänzungen anhängen; vorhandene IDs gewinnen. */
export function mergeZusatz(spots: ParkingSpot[], zusatz: ParkingSpot[]): ParkingSpot[] {
  const vorhanden = new Set(spots.map((spot) => spot.id));
  return [...spots, ...zusatz.filter((spot) => !vorhanden.has(spot.id))];
}
