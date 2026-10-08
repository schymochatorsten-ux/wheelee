import type { ParkingSpot } from "../types";
import frankfurt from "../../../data/frankfurt.json";
import idstein from "../../../data/idstein.json";
import weissenhorn from "../../../data/weissenhorn.json";

/**
 * Zugriff auf die Parkplatzdaten.
 *
 * Aktuell liest die App die versionierten Seed-Dateien des Imports. Die
 * Funktionen hier sind die einzige Stelle, die das weiß – wenn die Daten später
 * aus einer Datenbank kommen, ändert sich nur dieses Modul.
 */

export interface CityInfo {
  slug: string;
  name: string;
  /** Kartenmittelpunkt, wenn kein Nutzerstandort vorliegt. */
  center: { lat: number; lng: number };
  /** Herkunft der Daten, für Attribution und Einordnung. */
  source: string;
  /** Anzahl der Standorte dieser Stadt. */
  spotCount: number;
  /**
   * Stammt die Liste von der Stadtverwaltung (vollständig) oder aus
   * OpenStreetMap (unvollständig)? Das muss die Oberfläche sagen können.
   */
  coverage: "official" | "crowdsourced";
  /** Summe der Stellplätze, nicht nur der Standorte. */
  spaceCount: number;
}

interface SeedFile {
  city: { slug: string; name: string; center: { lat: number; lng: number } };
  source: string;
  generatedAt: string;
  spots: ParkingSpot[];
}

/**
 * Reihenfolge bestimmt die Vorauswahl der Karte: Frankfurt ist die größte
 * Stadt und hat die einzige amtliche Liste.
 */
const seeds: { seed: SeedFile; coverage: CityInfo["coverage"] }[] = [
  { seed: frankfurt as SeedFile, coverage: "official" },
  { seed: idstein as SeedFile, coverage: "crowdsourced" },
  { seed: weissenhorn as SeedFile, coverage: "crowdsourced" },
];

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
