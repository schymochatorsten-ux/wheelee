import fs from "node:fs";
import { inflateSync } from "node:zlib";

/**
 * Ein schlanker Leser für OpenStreetMap-Auszüge im `.osm.pbf`-Format
 * (ToDo 2e.11).
 *
 * Gedacht für die **Bundesland-Auszüge von Geofabrik** (ODbL, täglich): Statt
 * Overpass zu belasten, wird eine Datei geladen und lokal gefiltert. Wie
 * `zip.mts`, `xlsx.mts` und `shapefile.mts` ohne neue Abhängigkeit – das Format
 * ist Protocol Buffers in zlib-gepackten Blöcken, und gebraucht wird nur der
 * Lesepfad.
 *
 * **Aufbau der Datei:** eine Folge aus `[4 Byte Länge][BlobHeader][Blob]`. Der
 * Header nennt Art (`OSMHeader` oder `OSMData`) und Größe des Blobs, der Blob
 * ist roh oder zlib-gepackt und enthält einen `PrimitiveBlock`: Zeichentabelle,
 * Gruppen aus Knoten, dichten Knoten (Delta-kodiert), Wegen und Relationen.
 *
 * **Was hier bewusst nicht gelesen wird:** Relationen (Parkplätze als
 * Multipolygon sind selten, und ihre Mitte bräuchte alle Wege) und Metadaten
 * (Version, Zeitstempel). Nicht unterstützte Eigenschaften (`DenseNodes` mit
 * `denseinfo` ist erlaubt und wird übersprungen; Blobs in LZMA/Bzip2 sind in
 * der Praxis nicht anzutreffen) werden ehrlich abgelehnt.
 *
 * Die Datei wird **Block für Block** gelesen, nicht ganz in den Speicher: Die
 * großen Länder liegen bei mehreren hundert Megabyte.
 */

// --- Protocol Buffers: nur das, was gebraucht wird ---------------------------

interface Cursor {
  buffer: Buffer;
  pos: number;
  end: number;
}

/** Varint bis 2^53 – genug für OSM-Kennungen und Delta-Werte. */
function readVarint(c: Cursor): number {
  let result = 0;
  let factor = 1;
  for (;;) {
    if (c.pos >= c.end) throw new Error("Unerwartetes Ende im Protocol-Buffers-Strom");
    const byte = c.buffer[c.pos++];
    result += (byte & 0x7f) * factor;
    if ((byte & 0x80) === 0) return result;
    factor *= 128;
    if (factor > 2 ** 70) throw new Error("Zu langer Varint");
  }
}

/** Zickzack-Kodierung, ohne 32-Bit-Operatoren (die kürzten große Werte ab). */
function zigzag(n: number): number {
  return n % 2 === 0 ? n / 2 : -(n + 1) / 2;
}

type Field =
  | { no: number; wire: 0; value: number }
  | { no: number; wire: 2; bytes: Buffer }
  | { no: number; wire: 1 | 5; bytes: Buffer };

/** Alle Felder einer Nachricht der Reihe nach. */
function* fields(buffer: Buffer): Generator<Field> {
  const c: Cursor = { buffer, pos: 0, end: buffer.length };
  while (c.pos < c.end) {
    const key = readVarint(c);
    const no = Math.floor(key / 8);
    const wire = key % 8;
    if (wire === 0) {
      yield { no, wire: 0, value: readVarint(c) };
    } else if (wire === 2) {
      const length = readVarint(c);
      if (c.pos + length > c.end) throw new Error("Feld ragt über das Ende hinaus");
      yield { no, wire: 2, bytes: buffer.subarray(c.pos, c.pos + length) };
      c.pos += length;
    } else if (wire === 1 || wire === 5) {
      const length = wire === 1 ? 8 : 4;
      yield { no, wire, bytes: buffer.subarray(c.pos, c.pos + length) };
      c.pos += length;
    } else {
      throw new Error(`Nicht unterstützter Wire-Typ ${wire}`);
    }
  }
}

/** Gepackte Varints (`repeated … [packed=true]`) als Zahlenfolge. */
function packed(bytes: Buffer): number[] {
  const c: Cursor = { buffer: bytes, pos: 0, end: bytes.length };
  const out: number[] = [];
  while (c.pos < c.end) out.push(readVarint(c));
  return out;
}

// --- OSM-Ebene ---------------------------------------------------------------

export interface PbfElement {
  type: "node" | "way";
  id: number;
  tags: Record<string, string>;
  /** Nur bei Knoten. */
  lat?: number;
  lon?: number;
  /** Nur bei Wegen: die Knoten-Kennungen. */
  refs?: number[];
}

interface Block {
  strings: string[];
  granularity: number;
  latOffset: number;
  lonOffset: number;
  groups: Buffer[];
}

function parseBlock(raw: Buffer): Block {
  const block: Block = { strings: [], granularity: 100, latOffset: 0, lonOffset: 0, groups: [] };
  for (const field of fields(raw)) {
    if (field.no === 1 && field.wire === 2) {
      for (const entry of fields(field.bytes)) {
        if (entry.no === 1 && entry.wire === 2) block.strings.push(entry.bytes.toString("utf8"));
      }
    } else if (field.no === 2 && field.wire === 2) {
      block.groups.push(field.bytes);
    } else if (field.no === 17 && field.wire === 0) {
      block.granularity = field.value;
    } else if (field.no === 19 && field.wire === 0) {
      block.latOffset = zigzag(field.value);
    } else if (field.no === 20 && field.wire === 0) {
      block.lonOffset = zigzag(field.value);
    }
  }
  return block;
}

function tagsOf(block: Block, keys: number[], values: number[]): Record<string, string> {
  const tags: Record<string, string> = {};
  for (let i = 0; i < keys.length; i += 1) {
    tags[block.strings[keys[i]]] = block.strings[values[i]];
  }
  return tags;
}

const degrees = (block: Block, offset: number, value: number) =>
  1e-9 * (offset + block.granularity * value);

/** Knoten (einfach und dicht) und Wege einer Gruppe. */
function* elementsOf(block: Block, group: Buffer): Generator<PbfElement> {
  for (const field of fields(group)) {
    if (field.wire !== 2) continue;

    if (field.no === 1) {
      // Einzelner Knoten
      let id = 0;
      let lat = 0;
      let lon = 0;
      let keys: number[] = [];
      let values: number[] = [];
      for (const part of fields(field.bytes)) {
        if (part.no === 1 && part.wire === 0) id = zigzag(part.value);
        else if (part.no === 2 && part.wire === 2) keys = packed(part.bytes);
        else if (part.no === 3 && part.wire === 2) values = packed(part.bytes);
        else if (part.no === 8 && part.wire === 0) lat = zigzag(part.value);
        else if (part.no === 9 && part.wire === 0) lon = zigzag(part.value);
      }
      yield {
        type: "node",
        id,
        lat: degrees(block, block.latOffset, lat),
        lon: degrees(block, block.lonOffset, lon),
        tags: tagsOf(block, keys, values),
      };
    } else if (field.no === 2) {
      // Dichte Knoten: alles in Spalten, Kennung und Lage als Differenzen
      let ids: number[] = [];
      let lats: number[] = [];
      let lons: number[] = [];
      let keysVals: number[] = [];
      for (const part of fields(field.bytes)) {
        if (part.wire !== 2) continue;
        if (part.no === 1) ids = packed(part.bytes).map(zigzag);
        else if (part.no === 8) lats = packed(part.bytes).map(zigzag);
        else if (part.no === 9) lons = packed(part.bytes).map(zigzag);
        else if (part.no === 10) keysVals = packed(part.bytes);
      }
      let id = 0;
      let lat = 0;
      let lon = 0;
      let tagPos = 0;
      for (let i = 0; i < ids.length; i += 1) {
        id += ids[i];
        lat += lats[i];
        lon += lons[i];
        // Je Knoten eine Folge „Schlüssel, Wert, …", abgeschlossen mit 0
        const tags: Record<string, string> = {};
        while (tagPos < keysVals.length && keysVals[tagPos] !== 0) {
          tags[block.strings[keysVals[tagPos]]] = block.strings[keysVals[tagPos + 1]];
          tagPos += 2;
        }
        tagPos += 1;
        yield {
          type: "node",
          id,
          lat: degrees(block, block.latOffset, lat),
          lon: degrees(block, block.lonOffset, lon),
          tags,
        };
      }
    } else if (field.no === 3) {
      // Weg
      let id = 0;
      let keys: number[] = [];
      let values: number[] = [];
      let refs: number[] = [];
      for (const part of fields(field.bytes)) {
        if (part.no === 1 && part.wire === 0) id = part.value;
        else if (part.no === 2 && part.wire === 2) keys = packed(part.bytes);
        else if (part.no === 3 && part.wire === 2) values = packed(part.bytes);
        else if (part.no === 8 && part.wire === 2) {
          // Knoten-Kennungen, als Differenzen
          let ref = 0;
          refs = packed(part.bytes).map((delta) => (ref += zigzag(delta)));
        }
      }
      yield { type: "way", id, tags: tagsOf(block, keys, values), refs };
    }
    // Feld 4 (Relationen) und 5 (Änderungssätze) werden nicht gelesen.
  }
}

/**
 * Alle Knoten und Wege der Datei, Block für Block. Wirft bei einem Blob, den
 * der Leser nicht versteht – ein stilles Überspringen ergäbe einen Auszug mit
 * Lücken, der wie ein vollständiger aussieht.
 */
export function* readPbf(file: string): Generator<PbfElement> {
  const fd = fs.openSync(file, "r");
  try {
    let position = 0;
    const size = fs.fstatSync(fd).size;
    const lengthBuffer = Buffer.alloc(4);

    while (position < size) {
      if (fs.readSync(fd, lengthBuffer, 0, 4, position) !== 4) throw new Error("Abgeschnittene Datei");
      const headerLength = lengthBuffer.readUInt32BE(0);
      position += 4;
      if (headerLength > 64 * 1024) throw new Error("Unplausible Kopfgröße – keine PBF-Datei?");

      const header = Buffer.alloc(headerLength);
      fs.readSync(fd, header, 0, headerLength, position);
      position += headerLength;

      let type = "";
      let dataSize = 0;
      for (const field of fields(header)) {
        if (field.no === 1 && field.wire === 2) type = field.bytes.toString("utf8");
        else if (field.no === 3 && field.wire === 0) dataSize = field.value;
      }
      if (dataSize <= 0 || dataSize > 64 * 1024 * 1024) throw new Error("Unplausible Blockgröße");

      const blob = Buffer.alloc(dataSize);
      if (fs.readSync(fd, blob, 0, dataSize, position) !== dataSize) {
        throw new Error("Abgeschnittene Datei");
      }
      position += dataSize;

      if (type !== "OSMData") continue;

      let raw: Buffer | null = null;
      for (const field of fields(blob)) {
        if (field.no === 1 && field.wire === 2) raw = field.bytes;
        else if (field.no === 3 && field.wire === 2) raw = inflateSync(field.bytes);
        else if ((field.no === 4 || field.no === 5 || field.no === 6) && field.wire === 2) {
          throw new Error("Nicht unterstützte Blob-Kompression (nur roh und zlib)");
        }
      }
      if (!raw) throw new Error("Leerer Block");

      const block = parseBlock(raw);
      for (const group of block.groups) yield* elementsOf(block, group);
    }
  } finally {
    fs.closeSync(fd);
  }
}

// --- Behindertenparkplätze ---------------------------------------------------

/**
 * Dieselben drei Merkmals-Kombinationen wie bei Overpass (`osm-state.mts`,
 * `TAG_FILTERS`) – **bewusst identisch**, damit ein Auszug und eine Abfrage
 * dieselben Objekte meinen. Wer eine ändert, ändert beide.
 */
export function isDisabledParking(tags: Record<string, string>): boolean {
  if (tags.amenity === "parking_space" && tags.parking_space?.includes("disabled")) return true;
  if (tags.amenity === "parking" && tags["capacity:disabled"] !== undefined) return true;
  if (tags.amenity === "parking" && tags.wheelchair === "designated") return true;
  return false;
}

/** So sieht ein Treffer aus, damit `toSpot` aus `osm-state.mts` ihn unverändert nimmt. */
export interface ParkingElement {
  type: "node" | "way";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags: Record<string, string>;
}

/**
 * Alle Behindertenparkplätze einer Datei, in zwei Durchgängen.
 *
 * Wege haben keine eigene Koordinate. Im ersten Durchgang werden Treffer und die
 * Knoten ihrer Wege vorgemerkt, im zweiten nur die gebrauchten Knoten gelesen
 * (Knoten stehen in der Datei vor den Wegen, deshalb geht es nicht in einem
 * Zug). Als Mitte gilt wie bei Overpass (`out center`) die Mitte des
 * umschließenden Rechtecks.
 *
 * Wege, deren Knoten nicht alle im Auszug liegen (Länderrand), werden mit den
 * vorhandenen Knoten gerechnet; fehlen alle, entfällt der Weg und wird gezählt.
 */
export function extractDisabledParking(file: string): {
  elements: ParkingElement[];
  waysWithoutNodes: number;
} {
  const nodes: ParkingElement[] = [];
  const ways: { id: number; tags: Record<string, string>; refs: number[] }[] = [];
  const needed = new Set<number>();

  for (const element of readPbf(file)) {
    if (!isDisabledParking(element.tags)) continue;
    if (element.type === "node") {
      nodes.push({
        type: "node",
        id: element.id,
        lat: element.lat,
        lon: element.lon,
        tags: element.tags,
      });
    } else {
      ways.push({ id: element.id, tags: element.tags, refs: element.refs ?? [] });
      for (const ref of element.refs ?? []) needed.add(ref);
    }
  }

  const coordinates = new Map<number, [number, number]>();
  if (needed.size > 0) {
    for (const element of readPbf(file)) {
      if (element.type === "way") break; // Ab hier stehen keine Knoten mehr.
      if (needed.has(element.id) && element.lat !== undefined && element.lon !== undefined) {
        coordinates.set(element.id, [element.lat, element.lon]);
      }
    }
  }

  let waysWithoutNodes = 0;
  const elements: ParkingElement[] = [...nodes];
  for (const way of ways) {
    const points = way.refs.map((ref) => coordinates.get(ref)).filter((p) => p !== undefined);
    if (points.length === 0) {
      waysWithoutNodes += 1;
      continue;
    }
    const lats = points.map((p) => p[0]);
    const lons = points.map((p) => p[1]);
    elements.push({
      type: "way",
      id: way.id,
      center: {
        lat: (Math.min(...lats) + Math.max(...lats)) / 2,
        lon: (Math.min(...lons) + Math.max(...lons)) / 2,
      },
      tags: way.tags,
    });
  }

  return { elements, waysWithoutNodes };
}
