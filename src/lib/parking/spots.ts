import type { ParkingSpot } from "../types";
import { seeds } from "./seeds.generated";

/**
 * Zugriff auf die Parkplatzdaten.
 *
 * Aktuell liest die App die versionierten Seed-Dateien des Imports. Die
 * Funktionen hier sind die einzige Stelle, die das weiß – wenn die Daten später
 * aus einer Datenbank kommen, ändert sich nur dieses Modul.
 */

export interface SeedFile {
  city: { slug: string; name: string; center: { lat: number; lng: number } };
  source: string;
  generatedAt: string;
  spots: ParkingSpot[];
}

export interface CityInfo {
  slug: string;
  name: string;
  /** Kartenmittelpunkt, wenn kein Nutzerstandort vorliegt. */
  center: { lat: number; lng: number };
  /** Herkunft der Daten, für Attribution und Einordnung. */
  source: string;
  /** Anzahl der Standorte dieser Stadt. */
  spotCount: number;
  /** Summe der Stellplätze, nicht nur der Standorte. */
  spaceCount: number;
  /**
   * Stammt die Liste von der Stadtverwaltung (vollständig) oder aus
   * OpenStreetMap (unvollständig)? Das muss die Oberfläche sagen können.
   */
  coverage: "official" | "crowdsourced";
}

export function getCities(): CityInfo[] {
  return seeds.map(({ seed, coverage }) => ({
    ...seed.city,
    source: seed.source,
    spotCount: seed.spots.length,
    spaceCount: seed.spots.reduce((sum, spot) => sum + spot.spotCount, 0),
    coverage,
  }));
}

/** Die Stadt, auf die die Karte ohne Standort zentriert. */
export function getDefaultCity(): CityInfo {
  return getCities()[0];
}

/** Alle Parkplätze aller Städte, inklusive der nicht verorteten. */
export function getAllSpots(): ParkingSpot[] {
  return seeds.flatMap(({ seed }) => seed.spots);
}
