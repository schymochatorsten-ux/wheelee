import type { ParkingSpot } from "../types";
import seed from "../../../data/frankfurt.json";

/**
 * Zugriff auf die Parkplatzdaten.
 *
 * Aktuell liest die App die versionierte Seed-Datei des Imports. Die Funktionen
 * hier sind die einzige Stelle, die das weiß – wenn die Daten später aus einer
 * Datenbank kommen, ändert sich nur dieses Modul.
 */

export interface CityInfo {
  slug: string;
  name: string;
  /** Kartenmittelpunkt, wenn kein Nutzerstandort vorliegt. */
  center: { lat: number; lng: number };
}

export function getCity(): CityInfo {
  return seed.city;
}

export function getSource(): string {
  return seed.source;
}

/** Alle Parkplätze der Stadt, inklusive der nicht verorteten. */
export function getAllSpots(): ParkingSpot[] {
  return seed.spots as ParkingSpot[];
}
