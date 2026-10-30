import type { ParkingSpot, ParkingSpotWithDistance } from "../types";
import { sortByDistance, type LatLng } from "../geo";
import { attributionOf, licenseOf } from "./license";
import { confirmationOf } from "./confirmation";
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
  /** Lizenz der Quelle. Fehlt bei Dateien, die vor 2026-10-10 erzeugt wurden. */
  license?: string | null;
  generatedAt: string;
  spots: ParkingSpot[];
}

export interface CityInfo {
  slug: string;
  name: string;
  /** Kartenmittelpunkt, wenn kein Nutzerstandort vorliegt. */
  center: { lat: number; lng: number };
  /**
   * Titel und Lizenz zusammengesetzt, wie sie in der Attribution steht. Die
   * rohe Quellenangabe steht bewusst nicht mehr hier: Sie steckt in der
   * Attribution schon drin und wurde für 648 Städte doppelt ins erste HTML
   * geschrieben (ToDo 19.9).
   */
  attribution: string;
  /** Lizenz im Klartext, `null` wenn die Quelle keine nennt. */
  license: string | null;
  /** Tag des Imports (ISO), damit niemand veraltete Daten für aktuell hält. */
  importedAt: string;
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
    attribution: attributionOf(seed),
    license: licenseOf(seed),
    importedAt: seed.generatedAt,
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

/**
 * Alle Parkplätze, einmal je Prozess aufgebaut.
 *
 * `getAllSpots()` baut bei jedem Aufruf ein neues Array aus 187 Seed-Dateien
 * zusammen; für eine API, die pro Kartenbewegung antwortet, wäre das Verschwendung.
 *
 * **Hier wird auch das Ergebnis des Kreuzvergleichs angehängt** (ToDo 3.7).
 * Einmal beim Aufbau und nicht je Anfrage: Es ist ein Nachschlagen in einer
 * Map, aber bei 18.072 Standorten und einer Antwort je Kartenbewegung zählt
 * das. Die Seed-Dateien bleiben unberührt – `confirmation` ist kein Datum der
 * Quelle, sondern das Ergebnis einer Prüfung.
 */
let cached: ParkingSpot[] | null = null;

function allSpots(): ParkingSpot[] {
  cached ??= getAllSpots().map((spot) => {
    const confirmation = confirmationOf(spot.id);
    return confirmation ? { ...spot, confirmation } : spot;
  });
  return cached;
}

export interface Bounds {
  minLat: number;
  minLng: number;
  maxLat: number;
  maxLng: number;
}

/**
 * Parkplätze im Kartenausschnitt (ToDo 5.4).
 *
 * Der Grund ist handfest: Alle Standorte in die Seite zu schreiben ergab
 * **6,3 MB HTML**. Im Mobilfunknetz ist das kein Ladeverhalten, das man
 * jemandem zumuten kann, der gerade einen Parkplatz sucht – und mit jeder
 * weiteren Ausbaustufe würde es schlimmer.
 *
 * `limit` ist eine Notbremse gegen einen weit herausgezoomten Ausschnitt. Wird
 * sie erreicht, sagt das Ergebnis es – die Oberfläche kann dann zum
 * Hineinzoomen auffordern, statt stillschweigend die Hälfte zu verschweigen.
 */
export function spotsInBounds(
  bounds: Bounds,
  limit = 2_000,
): { spots: ParkingSpot[]; truncated: boolean; total: number } {
  const found: ParkingSpot[] = [];
  let total = 0;

  for (const spot of allSpots()) {
    if (spot.lat === null || spot.lng === null) continue;
    if (spot.lat < bounds.minLat || spot.lat > bounds.maxLat) continue;
    if (spot.lng < bounds.minLng || spot.lng > bounds.maxLng) continue;

    total += 1;
    if (found.length < limit) found.push(spot);
  }

  return { spots: found, truncated: total > found.length, total };
}

/**
 * Die nächstgelegenen Parkplätze zu einem Punkt.
 *
 * Für die Liste und die Navigationsleiste: Beide brauchen die nächsten
 * Standorte, nicht den Kartenausschnitt – wer am Rand der Karte steht, soll
 * trotzdem den nächsten Parkplatz genannt bekommen.
 */
export function nearestSpots(origin: LatLng, limit = 100): ParkingSpotWithDistance[] {
  return sortByDistance(allSpots(), origin).slice(0, limit);
}

/**
 * Alle Parkplätze einer Stadt, für das bewusste Vorabladen (ToDo 16.1).
 *
 * Gefiltert wird über die IDs der Seed-Datei und nicht über den Kartenausschnitt:
 * Ein Rechteck um die Stadtmitte nähme Nachbargemeinden mit und ließe Ränder aus.
 */
export function spotsOfCity(slug: string): { city: CityInfo; spots: ParkingSpot[] } | null {
  const index = seeds.findIndex(({ seed }) => seed.city.slug === slug);
  if (index === -1) return null;

  const ids = new Set(seeds[index].seed.spots.map((spot) => spot.id));
  return { city: getCities()[index], spots: allSpots().filter((spot) => ids.has(spot.id)) };
}

/**
 * Ein einzelner Parkplatz über seine ID.
 *
 * Gebraucht für die Übersicht der Rückmeldungen (ToDo 17.4): Eine Meldung
 * trägt die ID des gemeldeten Parkplatzes, und ohne diesen Weg müsste man ihn
 * von Hand zusammensuchen – genau die Arbeit, die den Unterschied macht, ob
 * eine Meldung zu einer Korrektur führt oder liegen bleibt.
 *
 * Lineare Suche über den Bestand: Das ist derselbe Durchlauf, den
 * `spotsInBounds` bei jeder Kartenbewegung macht, und er geschieht hier
 * höchstens beim Anklicken einer Meldung. Eine zusätzliche Map über 18.000
 * Einträge im Speicher zu halten, wäre für diesen Zweck verschenkt.
 */
export function spotById(id: string): ParkingSpot | null {
  return allSpots().find((spot) => spot.id === id) ?? null;
}
