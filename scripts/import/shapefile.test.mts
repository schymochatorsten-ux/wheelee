import { describe, expect, it } from "vitest";
import { readDbf, readPolygons } from "./shapefile.mjs";
import { pointInRings } from "./grenzen.mjs";

/**
 * Baut eine `.shp` im Speicher – von Hand, aus derselben Überlegung wie in
 * [`zip.test.mts`](zip.test.mts): Ein Test, der zum Schreiben die Bibliothek
 * nimmt, die er beim Lesen prüfen soll, bestätigt nur sich selbst.
 */
function buildShp(records: { rings: number[][][] }[], shapeType = 5): Buffer {
  const bodies: Buffer[] = [];

  for (const [index, record] of records.entries()) {
    const points = record.rings.reduce((sum, ring) => sum + ring.length, 0);
    const content = Buffer.alloc(44 + record.rings.length * 4 + points * 16);
    content.writeInt32LE(shapeType, 0);

    const all = record.rings.flat();
    const xs = all.map((point) => point[0]);
    const ys = all.map((point) => point[1]);
    content.writeDoubleLE(Math.min(...xs), 4);
    content.writeDoubleLE(Math.min(...ys), 12);
    content.writeDoubleLE(Math.max(...xs), 20);
    content.writeDoubleLE(Math.max(...ys), 28);
    content.writeInt32LE(record.rings.length, 36);
    content.writeInt32LE(points, 40);

    let start = 0;
    for (const [part, ring] of record.rings.entries()) {
      content.writeInt32LE(start, 44 + part * 4);
      start += ring.length;
    }

    let at = 44 + record.rings.length * 4;
    for (const [x, y] of all) {
      content.writeDoubleLE(x, at);
      content.writeDoubleLE(y, at + 8);
      at += 16;
    }

    const header = Buffer.alloc(8);
    header.writeInt32BE(index + 1, 0);
    header.writeInt32BE(content.length / 2, 4);
    bodies.push(header, content);
  }

  const body = Buffer.concat(bodies);
  const head = Buffer.alloc(100);
  head.writeInt32BE(9994, 0);
  head.writeInt32BE((100 + body.length) / 2, 24);
  head.writeInt32LE(1000, 28);
  head.writeInt32LE(shapeType, 32);

  return Buffer.concat([head, body]);
}

/** Baut eine `.dbf` im Speicher; alle Felder sind Textfelder. */
function buildDbf(
  fields: { name: string; length: number }[],
  rows: string[][],
  options: { languageDriver?: number; deleted?: number[] } = {},
): Buffer {
  const headerLength = 32 + fields.length * 32 + 1;
  const recordLength = 1 + fields.reduce((sum, field) => sum + field.length, 0);

  const head = Buffer.alloc(headerLength);
  head[0] = 0x03;
  head.writeUInt32LE(rows.length, 4);
  head.writeUInt16LE(headerLength, 8);
  head.writeUInt16LE(recordLength, 10);
  head[29] = options.languageDriver ?? 0;

  for (const [index, field] of fields.entries()) {
    const at = 32 + index * 32;
    head.write(field.name, at, 11, "latin1");
    head.write("C", at + 11, 1, "latin1");
    head[at + 16] = field.length;
  }
  head[headerLength - 1] = 0x0d;

  const body = Buffer.alloc(rows.length * recordLength, 0x20);
  for (const [index, row] of rows.entries()) {
    let at = index * recordLength;
    body[at] = options.deleted?.includes(index) ? 0x2a : 0x20;
    at += 1;
    for (const [column, field] of fields.entries()) {
      body.write(row[column] ?? "", at, field.length, "utf8");
      at += field.length;
    }
  }

  return Buffer.concat([head, body, Buffer.from([0x1a])]);
}

describe("readPolygons", () => {
  const quadrat: number[][] = [
    [0, 0],
    [0, 10],
    [10, 10],
    [10, 0],
    [0, 0],
  ];

  it("liest Rechteck, Ringe und Punkte", () => {
    const shapes = readPolygons(buildShp([{ rings: [quadrat] }]));

    expect(shapes).toHaveLength(1);
    expect(shapes[0].record).toBe(1);
    expect(shapes[0].bbox).toEqual({ minX: 0, minY: 0, maxX: 10, maxY: 10 });
    expect([...shapes[0].rings[0]]).toEqual([0, 0, 0, 10, 10, 10, 10, 0, 0, 0]);
  });

  it("trennt mehrere Teile an den Ringgrenzen", () => {
    const insel: number[][] = [
      [20, 20],
      [20, 25],
      [25, 25],
      [20, 20],
    ];
    const shapes = readPolygons(buildShp([{ rings: [quadrat, insel] }]));

    expect(shapes[0].rings).toHaveLength(2);
    expect(shapes[0].rings[1].length).toBe(8);
  });

  it("lehnt andere Satztypen ab, statt Unsinn zu liefern", () => {
    // Typ 1 = Punkt. Der Leser kann nur Polygone.
    expect(() => readPolygons(buildShp([{ rings: [quadrat] }], 1))).toThrow(/Satztyp 1/u);
  });

  it("erkennt eine Datei, die keine Shapefile ist", () => {
    expect(() => readPolygons(Buffer.alloc(200))).toThrow(/Dateikennung/u);
  });
});

describe("readDbf", () => {
  const felder = [
    { name: "AGS", length: 8 },
    { name: "GEN", length: 20 },
  ];

  it("liest Felder als Text und schneidet Leerzeichen ab", () => {
    const rows = readDbf(buildDbf(felder, [["01001", "Flensburg"]]));
    expect(rows).toEqual([{ AGS: "01001", GEN: "Flensburg" }]);
  });

  it("behält führende Nullen im Gemeindeschlüssel", () => {
    // Als Zahl gelesen würde aus Flensburg die 1001.
    const rows = readDbf(buildDbf(felder, [["01001", "Flensburg"]]));
    expect(rows[0].AGS).toBe("01001");
  });

  it("liest Umlaute als UTF-8", () => {
    const rows = readDbf(buildDbf(felder, [["05315000", "Köln"]]));
    expect(rows[0].GEN).toBe("Köln");
  });

  it("reicht gelöschte Sätze leer durch, damit die Satznummern passen", () => {
    const rows = readDbf(
      buildDbf(
        felder,
        [
          ["01001", "Flensburg"],
          ["01002", "Kiel"],
        ],
        { deleted: [0] },
      ),
    );

    expect(rows).toHaveLength(2);
    expect(rows[0]).toEqual({});
    expect(rows[1].GEN).toBe("Kiel");
  });
});

describe("pointInRings", () => {
  const quadrat = new Float64Array([0, 0, 0, 10, 10, 10, 10, 0, 0, 0]);
  /** Loch in der Mitte: 4,4 bis 6,6. */
  const loch = new Float64Array([4, 4, 4, 6, 6, 6, 6, 4, 4, 4]);

  it("findet Punkte innen und außen", () => {
    expect(pointInRings([quadrat], 5, 5)).toBe(true);
    expect(pointInRings([quadrat], 15, 5)).toBe(false);
  });

  it("schließt Löcher aus – ohne die Umlaufrichtung auszuwerten", () => {
    expect(pointInRings([quadrat, loch], 5, 5)).toBe(false);
    expect(pointInRings([quadrat, loch], 2, 2)).toBe(true);
  });

  it("erfasst Exklaven, nicht nur den ersten Ring", () => {
    const exklave = new Float64Array([20, 20, 20, 24, 24, 24, 24, 20, 20, 20]);
    expect(pointInRings([quadrat, exklave], 22, 22)).toBe(true);
  });
});
