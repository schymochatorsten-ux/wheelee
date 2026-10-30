/**
 * Benannte Straßen und Adresspunkte aus einem Geofabrik-Auszug (ToDo 2e.13).
 *
 * **Warum:** `import:streets` fragt Overpass je Stadt zweimal ab, mit Pausen und
 * Wiederholungen. Für die Gemeinden aus Stufe 1 schaffte der Lauf in acht
 * Stunden rund 130 Städte. Der Auszug liegt ohnehin auf der Platte (2e.11); hier
 * wird er ein zweites Mal gelesen, diesmal nach Straßen.
 *
 * **Dieselben Regeln wie die Overpass-Abfrage** in `street-names.mts`
 * (`streetQuery`, `addressQuery`) – bewusst identisch, damit beide Wege
 * dasselbe Ergebnis meinen:
 *
 * - Straßen: `highway` mit `name`, ohne Fuß- und Radwege, Pfade, Treppen,
 *   Feldwege, Bau- und Planungsobjekte sowie Autobahnen und Kraftfahrstraßen.
 * - Adressen: `addr:housenumber` und `addr:street`. Overpass liefert bei
 *   Gebäuden die Mitte (`out center`). Hier wird der **erste Knoten des
 *   Gebäudes** genommen: Das spart den Speicher für alle Knoten aller
 *   Gebäude, und ein Gebäude ist wenige Meter groß – die Grenze für eine
 *   Hausnummer liegt bei 25 m.
 *
 * Zwei Durchgänge, weil Knoten in der Datei vor den Wegen stehen (siehe
 * `extractDisabledParking` in `pbf.mts`). Der Speicher reicht für Nordrhein-
 * Westfalen mit rund 6 Mio. Knoten; gestartet wird mit mehr Haldengröße.
 */
import { readPbf } from "./pbf.mjs";

const EXCLUDED_HIGHWAYS = new Set([
  "footway",
  "cycleway",
  "path",
  "steps",
  "track",
  "bridleway",
  "construction",
  "proposed",
  "raceway",
  "motorway",
  "motorway_link",
  "trunk",
  "trunk_link",
]);

export interface StreetWay {
  id: number;
  name: string;
  geometry: { lat: number; lon: number }[];
}

export interface AddressPoint {
  lat: number;
  lon: number;
  street: string;
  number: string;
}

export interface PbfStreets {
  /** Straßen, deren Rechteck das gesuchte schneidet. */
  waysIn(box: { south: number; west: number; north: number; east: number }): StreetWay[];
  addressesIn(box: { south: number; west: number; north: number; east: number }): AddressPoint[];
  counts: { ways: number; addresses: number };
}

/** Kantenlänge der Suchzellen in Grad (rund 5 km). */
const TILE = 0.05;
const tileOf = (lat: number, lon: number) => `${Math.floor(lat / TILE)}:${Math.floor(lon / TILE)}`;

function tilesOf(box: { south: number; west: number; north: number; east: number }): string[] {
  const tiles: string[] = [];
  for (let la = Math.floor(box.south / TILE); la <= Math.floor(box.north / TILE); la += 1) {
    for (let lo = Math.floor(box.west / TILE); lo <= Math.floor(box.east / TILE); lo += 1) {
      tiles.push(`${la}:${lo}`);
    }
  }
  return tiles;
}

export function extractStreets(file: string): PbfStreets {
  const streetWays: { id: number; name: string; refs: number[] }[] = [];
  const addressWays: { street: string; number: string; ref: number }[] = [];
  const addressNodes: AddressPoint[] = [];
  const needed = new Set<number>();

  for (const element of readPbf(file)) {
    const { tags } = element;

    if (element.type === "node") {
      if (tags["addr:housenumber"] && tags["addr:street"] && element.lat !== undefined) {
        addressNodes.push({
          lat: element.lat,
          lon: element.lon!,
          street: tags["addr:street"],
          number: tags["addr:housenumber"],
        });
      }
      continue;
    }

    const refs = element.refs ?? [];
    if (refs.length === 0) continue;

    if (tags.highway && tags.name && !EXCLUDED_HIGHWAYS.has(tags.highway)) {
      streetWays.push({ id: element.id, name: tags.name, refs });
      for (const ref of refs) needed.add(ref);
    } else if (tags["addr:housenumber"] && tags["addr:street"]) {
      addressWays.push({ street: tags["addr:street"], number: tags["addr:housenumber"], ref: refs[0] });
      needed.add(refs[0]);
    }
  }

  const coordinates = new Map<number, [number, number]>();
  for (const element of readPbf(file)) {
    if (element.type === "way") break; // Ab hier stehen keine Knoten mehr.
    if (needed.has(element.id) && element.lat !== undefined && element.lon !== undefined) {
      coordinates.set(element.id, [element.lat, element.lon]);
    }
  }
  needed.clear();

  const ways = new Map<string, StreetWay[]>();
  let wayCount = 0;
  for (const way of streetWays) {
    // Fehlende Knoten (Länderrand) lassen die Strecke an dieser Stelle enden.
    const geometry = way.refs
      .map((ref) => coordinates.get(ref))
      .filter((c): c is [number, number] => c !== undefined)
      .map(([lat, lon]) => ({ lat, lon }));
    if (geometry.length < 2) continue;
    wayCount += 1;
    const entry: StreetWay = { id: way.id, name: way.name, geometry };
    const seen = new Set<string>();
    for (const point of geometry) {
      const tile = tileOf(point.lat, point.lon);
      if (seen.has(tile)) continue;
      seen.add(tile);
      const bucket = ways.get(tile);
      if (bucket) bucket.push(entry);
      else ways.set(tile, [entry]);
    }
  }
  streetWays.length = 0;

  const addresses = new Map<string, AddressPoint[]>();
  let addressCount = 0;
  const addAddress = (point: AddressPoint) => {
    addressCount += 1;
    const tile = tileOf(point.lat, point.lon);
    const bucket = addresses.get(tile);
    if (bucket) bucket.push(point);
    else addresses.set(tile, [point]);
  };
  for (const point of addressNodes) addAddress(point);
  for (const building of addressWays) {
    const c = coordinates.get(building.ref);
    if (c) addAddress({ lat: c[0], lon: c[1], street: building.street, number: building.number });
  }
  coordinates.clear();

  return {
    waysIn(box) {
      const unique = new Map<number, StreetWay>();
      for (const tile of tilesOf(box)) for (const way of ways.get(tile) ?? []) unique.set(way.id, way);
      return [...unique.values()];
    },
    addressesIn(box) {
      const found: AddressPoint[] = [];
      for (const tile of tilesOf(box)) {
        for (const point of addresses.get(tile) ?? []) {
          if (point.lat >= box.south && point.lat <= box.north && point.lon >= box.west && point.lon <= box.east) {
            found.push(point);
          }
        }
      }
      return found;
    },
    counts: { ways: wayCount, addresses: addressCount },
  };
}
