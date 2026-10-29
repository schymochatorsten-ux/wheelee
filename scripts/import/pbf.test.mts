import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { deflateSync } from "node:zlib";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { extractDisabledParking, isDisabledParking, readPbf } from "./pbf.mjs";

/**
 * Baut eine PBF-Datei von Hand – aus demselben Grund wie in `zip.test.mts`: Ein
 * Test, der dieselbe Bibliothek zum Schreiben nimmt, die er beim Lesen prüfen
 * soll, bestätigt nur sich selbst. So steht hier das Format.
 */

const varint = (n: number): Buffer => {
  const out: number[] = [];
  let rest = n;
  while (rest >= 128) {
    out.push((rest % 128) | 0x80);
    rest = Math.floor(rest / 128);
  }
  out.push(rest);
  return Buffer.from(out);
};
const zig = (n: number): number => (n >= 0 ? n * 2 : -n * 2 - 1);
const key = (no: number, wire: number) => varint(no * 8 + wire);
const bytesField = (no: number, data: Buffer) =>
  Buffer.concat([key(no, 2), varint(data.length), data]);
const intField = (no: number, value: number) => Buffer.concat([key(no, 0), varint(value)]);
const packedField = (no: number, values: number[]) =>
  bytesField(no, Buffer.concat(values.map(varint)));

/** Zeichentabelle: Index 0 ist immer der leere String. */
function stringTable(strings: string[]): Buffer {
  return bytesField(
    1,
    Buffer.concat(["", ...strings].map((s) => bytesField(1, Buffer.from(s, "utf8")))),
  );
}

/** Koordinaten in der Einheit der Datei: Granularität 100, also 1e-7 Grad. */
const unit = (degrees: number) => Math.round(degrees / 1e-7);

function blob(raw: Buffer, compress: boolean): Buffer {
  return compress
    ? Buffer.concat([intField(2, raw.length), bytesField(3, deflateSync(raw))])
    : bytesField(1, raw);
}

function frame(type: string, data: Buffer): Buffer {
  const header = Buffer.concat([bytesField(1, Buffer.from(type)), intField(3, data.length)]);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(header.length);
  return Buffer.concat([length, header, data]);
}

interface TestNode {
  id: number;
  lat: number;
  lon: number;
  tags?: Record<string, string>;
}

/** Ein Block mit dichten Knoten und danach Wegen (Reihenfolge wie bei Geofabrik). */
function buildFile(
  nodes: TestNode[],
  ways: { id: number; refs: number[]; tags: Record<string, string> }[],
  compress = true,
): Buffer {
  const strings: string[] = [];
  const index = (s: string) => {
    let i = strings.indexOf(s);
    if (i < 0) {
      strings.push(s);
      i = strings.length - 1;
    }
    return i + 1; // 0 ist der leere String
  };

  // Knoten (dicht): Kennung und Lage als Differenzen
  let lastId = 0;
  let lastLat = 0;
  let lastLon = 0;
  const ids: number[] = [];
  const lats: number[] = [];
  const lons: number[] = [];
  const keysVals: number[] = [];
  for (const node of nodes) {
    ids.push(zig(node.id - lastId));
    lats.push(zig(unit(node.lat) - lastLat));
    lons.push(zig(unit(node.lon) - lastLon));
    lastId = node.id;
    lastLat = unit(node.lat);
    lastLon = unit(node.lon);
    for (const [k, v] of Object.entries(node.tags ?? {})) keysVals.push(index(k), index(v));
    keysVals.push(0);
  }
  const dense = bytesField(
    2,
    Buffer.concat([
      packedField(1, ids),
      packedField(8, lats),
      packedField(9, lons),
      packedField(10, keysVals),
    ]),
  );

  const wayFields = ways.map((way) => {
    const entries = Object.entries(way.tags);
    let last = 0;
    const deltas = way.refs.map((ref) => {
      const d = zig(ref - last);
      last = ref;
      return d;
    });
    return bytesField(
      3,
      Buffer.concat([
        intField(1, way.id),
        packedField(2, entries.map(([k]) => index(k))),
        packedField(3, entries.map(([, v]) => index(v))),
        packedField(8, deltas),
      ]),
    );
  });

  const group = bytesField(2, Buffer.concat([dense, ...wayFields]));
  // Die Zeichentabelle erst jetzt bauen: `index` hat sie beim Aufbau der
  // Gruppe gefüllt.
  const block = Buffer.concat([stringTable(strings), group, intField(17, 100)]);

  return Buffer.concat([
    frame("OSMHeader", blob(Buffer.from([]), false)),
    frame("OSMData", blob(block, compress)),
  ]);
}

let folder: string;
beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-pbf-"));
});
afterEach(() => {
  fs.rmSync(folder, { recursive: true, force: true });
});

function write(content: Buffer): string {
  const file = path.join(folder, "test.osm.pbf");
  fs.writeFileSync(file, content);
  return file;
}

describe("readPbf", () => {
  it("liest dichte Knoten mit Lage und Merkmalen (Differenzen, auch negative)", () => {
    const file = write(
      buildFile(
        [
          { id: 100, lat: 51.5, lon: 7.25, tags: { amenity: "parking" } },
          { id: 90, lat: 50.25, lon: 8.75 }, // fällt zurück: negative Differenz
          { id: 91, lat: 50.2501, lon: 8.7502, tags: { name: "Äpfel" } },
        ],
        [],
      ),
    );
    const nodes = [...readPbf(file)];
    expect(nodes.map((n) => n.id)).toEqual([100, 90, 91]);
    expect(nodes[0].lat).toBeCloseTo(51.5, 6);
    expect(nodes[0].lon).toBeCloseTo(7.25, 6);
    expect(nodes[0].tags).toEqual({ amenity: "parking" });
    expect(nodes[1].lat).toBeCloseTo(50.25, 6);
    expect(nodes[1].tags).toEqual({});
    expect(nodes[2].tags).toEqual({ name: "Äpfel" });
  });

  it("liest auch ungepackte Blöcke und Wege mit Differenz-Kennungen", () => {
    const file = write(
      buildFile(
        [{ id: 1, lat: 50, lon: 8 }],
        [{ id: 7, refs: [5, 3, 9], tags: { amenity: "parking" } }],
        false,
      ),
    );
    const way = [...readPbf(file)].find((e) => e.type === "way");
    expect(way?.id).toBe(7);
    expect(way?.refs).toEqual([5, 3, 9]);
  });

  it("lehnt eine Datei ab, die keine PBF ist", () => {
    const file = write(Buffer.from("das ist keine Karte, sondern Text mit genügend Zeichen"));
    expect(() => [...readPbf(file)]).toThrow();
  });
});

describe("isDisabledParking", () => {
  it("erkennt dieselben drei Merkmals-Kombinationen wie die Overpass-Abfrage", () => {
    expect(isDisabledParking({ amenity: "parking_space", parking_space: "disabled" })).toBe(true);
    expect(isDisabledParking({ amenity: "parking", "capacity:disabled": "2" })).toBe(true);
    expect(isDisabledParking({ amenity: "parking", wheelchair: "designated" })).toBe(true);
    expect(isDisabledParking({ amenity: "parking" })).toBe(false);
    expect(isDisabledParking({ amenity: "parking_space", parking_space: "surface" })).toBe(false);
    expect(isDisabledParking({ wheelchair: "designated" })).toBe(false);
  });
});

describe("extractDisabledParking", () => {
  it("liefert Knoten direkt und Wege mit der Mitte ihres Rechtecks", () => {
    const file = write(
      buildFile(
        [
          { id: 1, lat: 50.0, lon: 8.0 },
          { id: 2, lat: 50.0, lon: 8.002 },
          { id: 3, lat: 50.004, lon: 8.002 },
          { id: 4, lat: 51.0, lon: 9.0, tags: { amenity: "parking_space", parking_space: "disabled" } },
          { id: 5, lat: 52.0, lon: 10.0, tags: { amenity: "bench" } },
        ],
        [
          { id: 20, refs: [1, 2, 3], tags: { amenity: "parking", "capacity:disabled": "3" } },
          { id: 21, refs: [1, 2], tags: { amenity: "parking" } },
          { id: 22, refs: [99], tags: { amenity: "parking", wheelchair: "designated" } },
        ],
      ),
    );
    const { elements, waysWithoutNodes } = extractDisabledParking(file);

    const node = elements.find((e) => e.type === "node");
    expect(node?.id).toBe(4);
    expect(node?.lat).toBeCloseTo(51, 6);

    const way = elements.find((e) => e.type === "way");
    expect(way?.id).toBe(20);
    expect(way?.center?.lat).toBeCloseTo(50.002, 6);
    expect(way?.center?.lon).toBeCloseTo(8.001, 6);
    expect(way?.tags["capacity:disabled"]).toBe("3");

    // Weg 21 ist kein Treffer; Weg 22 ist einer, aber sein Knoten fehlt im Auszug.
    expect(elements).toHaveLength(2);
    expect(waysWithoutNodes).toBe(1);
  });
});
