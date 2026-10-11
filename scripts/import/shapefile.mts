/**
 * Ein schlanker Leser für Shapefiles (ToDo 2e.7).
 *
 * Gebraucht für die Gemeindegrenzen aus VG250-EW des BKG. Gelesen wird genau
 * so viel, wie der Punkt-in-Fläche-Test braucht: Polygone aus der `.shp` und
 * die Textfelder aus der zugehörigen `.dbf`.
 *
 * **Warum von Hand und nicht mit Bibliothek?** Dieselbe Abwägung wie bei
 * [`zip.mts`](zip.mts) und [`xlsx.mts`](xlsx.mts): Das Format ist seit 1998
 * unverändert, gebraucht wird nur der Lesepfad, und das Skript läuft einmal im
 * Jahr. Die Alternative – ein GeoPackage, also eine SQLite-Datenbank – wäre
 * ein Vielfaches an Arbeit; siehe die Abwägung in `ToDos.md` zu 2e.7.
 *
 * **Nicht unterstützt**, und zwar ausdrücklich statt stillschweigend: alle
 * Satztypen außer Polygon (5, 15, 25), die `.shx`-Indexdatei (sie wird nicht
 * gebraucht, weil die Sätze ohnehin alle gelesen werden) und die Z- und
 * M-Werte der Typen 15 und 25 (Höhe und Messwert; Gemeindegrenzen sind
 * flach).
 */

/** Dateikennung am Anfang jeder `.shp`, immer in Big-Endian. */
const FILE_CODE = 9994;

/** Satztypen, die dieser Leser kennt: Polygon, PolygonZ, PolygonM. */
const POLYGON_TYPES = new Set([5, 15, 25]);

/** Satztyp 0 heißt „kein Objekt" und ist erlaubt – etwa für gelöschte Sätze. */
const TYPE_NULL = 0;

/**
 * Ein Ring: abwechselnd x- und y-Werte in der Projektion der Datei.
 *
 * Flach als `Float64Array` und nicht als Liste von Punktobjekten, weil
 * VG250 rund vier Millionen Punkte enthält. Als Objekte wären das vier
 * Millionen Allokationen, und der Punkt-in-Fläche-Test liest sie zehntausende
 * Mal.
 */
export type Ring = Float64Array;

export interface PolygonShape {
  /** Satznummer in der Datei, beginnend bei 1. */
  record: number;
  /** Umschließendes Rechteck, so wie es im Satz steht. */
  bbox: { minX: number; minY: number; maxX: number; maxY: number };
  /**
   * Alle Ringe des Satzes – Außengrenzen und Löcher gemischt.
   *
   * Das Format unterscheidet sie nur über die Umlaufrichtung. Für den
   * Punkt-in-Fläche-Test ist das nicht nötig: Die Gerade-Ungerade-Regel über
   * **alle** Ringe liefert dasselbe Ergebnis, weil ein Punkt in einem Loch
   * zwei Ringe kreuzt und damit außen landet. Siehe `pointInRings` in
   * [`grenzen.mts`](grenzen.mts).
   */
  rings: Ring[];
}

/**
 * Die Polygone einer `.shp` lesen.
 *
 * Sätze vom Typ 0 (kein Objekt) kommen als Satz mit null Ringen zurück,
 * damit die Satznummern weiter zu den Zeilen der `.dbf` passen – das ist die
 * einzige Verbindung zwischen den beiden Dateien.
 */
export function readPolygons(buffer: Buffer): PolygonShape[] {
  if (buffer.length < 100) throw new Error("Keine Shapefile: Datei kürzer als der Kopf.");
  if (buffer.readInt32BE(0) !== FILE_CODE) {
    throw new Error(
      `Keine Shapefile: Dateikennung ist ${buffer.readInt32BE(0)}, erwartet ${FILE_CODE}.`,
    );
  }

  const shapeType = buffer.readInt32LE(32);
  if (!POLYGON_TYPES.has(shapeType) && shapeType !== TYPE_NULL) {
    throw new Error(
      `Satztyp ${shapeType} wird nicht unterstützt – dieser Leser kann nur Polygone (5, 15, 25).`,
    );
  }

  /*
   * Die Längenangabe im Kopf steht in 16-Bit-Wörtern, eine Eigenheit des
   * Formats. Sie ist hier die verlässlichere Grenze als `buffer.length`:
   * Manche Werkzeuge hängen Füllbytes an.
   */
  const fileLength = buffer.readInt32BE(24) * 2;
  const end = Math.min(fileLength, buffer.length);

  const shapes: PolygonShape[] = [];
  let offset = 100;

  while (offset + 8 <= end) {
    const record = buffer.readInt32BE(offset);
    const contentLength = buffer.readInt32BE(offset + 4) * 2;
    const content = offset + 8;

    if (contentLength <= 0 || content + contentLength > end) {
      throw new Error(`Beschädigte Shapefile: Satz ${record} reicht über das Dateiende hinaus.`);
    }

    const type = buffer.readInt32LE(content);

    if (type === TYPE_NULL) {
      shapes.push({ record, bbox: { minX: 0, minY: 0, maxX: 0, maxY: 0 }, rings: [] });
      offset = content + contentLength;
      continue;
    }

    if (!POLYGON_TYPES.has(type)) {
      throw new Error(
        `Satz ${record} hat Typ ${type}; dieser Leser kann nur Polygone (5, 15, 25).`,
      );
    }

    const bbox = {
      minX: buffer.readDoubleLE(content + 4),
      minY: buffer.readDoubleLE(content + 12),
      maxX: buffer.readDoubleLE(content + 20),
      maxY: buffer.readDoubleLE(content + 28),
    };

    const numParts = buffer.readInt32LE(content + 36);
    const numPoints = buffer.readInt32LE(content + 40);
    const partsAt = content + 44;
    const pointsAt = partsAt + numParts * 4;

    const starts: number[] = [];
    for (let part = 0; part < numParts; part += 1) {
      starts.push(buffer.readInt32LE(partsAt + part * 4));
    }

    const rings: Ring[] = [];
    for (let part = 0; part < numParts; part += 1) {
      const from = starts[part];
      const to = part + 1 < numParts ? starts[part + 1] : numPoints;
      const ring = new Float64Array((to - from) * 2);
      for (let index = from; index < to; index += 1) {
        const at = pointsAt + index * 16;
        ring[(index - from) * 2] = buffer.readDoubleLE(at);
        ring[(index - from) * 2 + 1] = buffer.readDoubleLE(at + 8);
      }
      // Ringe mit weniger als drei Punkten umschließen keine Fläche.
      if (ring.length >= 6) rings.push(ring);
    }

    shapes.push({ record, bbox, rings });
    offset = content + contentLength;
  }

  return shapes;
}

/* ------------------------------------------------------------------ *
 * dBASE-Tabelle (.dbf)
 * ------------------------------------------------------------------ */

interface DbfField {
  name: string;
  length: number;
}

/** Ende der Feldbeschreibungen im Kopf. */
const HEADER_TERMINATOR = 0x0d;

/** Markierung für einen gelöschten Satz im ersten Byte der Zeile. */
const DELETED = 0x2a;

/**
 * Die Zeichenkodierung aus dem „language driver"-Byte bestimmen.
 *
 * Steht dort nichts Brauchbares, wird UTF-8 angenommen: Das BKG liefert
 * UTF-8, und ein falsch geratenes Windows-1252 würde aus „Köln" ein „KÃ¶ln"
 * machen – derselbe Schaden, den [CLAUDE.md](../../CLAUDE.md) für PowerShell
 * beschreibt, nur eine Ebene tiefer.
 */
function encodingOf(languageDriver: number): BufferEncoding {
  // 0x57 = ANSI (Windows-1252), 0x03 = DOS-Codepage 437/850.
  return languageDriver === 0x57 || languageDriver === 0x03 ? "latin1" : "utf8";
}

/**
 * Eine `.dbf` als Zeilen lesen – alle Felder als Text.
 *
 * Alles als Text, weil die gebrauchten Felder Text sind: Der amtliche
 * Gemeindeschlüssel ist achtstellig **mit** führenden Nullen, und als Zahl
 * gelesen würde aus Flensburg (01001) die 1001.
 */
export function readDbf(
  buffer: Buffer,
  encodingOverride?: BufferEncoding,
): Record<string, string>[] {
  if (buffer.length < 32) throw new Error("Keine dBASE-Datei: Datei kürzer als der Kopf.");

  const count = buffer.readUInt32LE(4);
  const headerLength = buffer.readUInt16LE(8);
  const recordLength = buffer.readUInt16LE(10);
  const encoding = encodingOverride ?? encodingOf(buffer[29]);

  const fields: DbfField[] = [];
  for (let at = 32; at < headerLength - 1; at += 32) {
    if (buffer[at] === HEADER_TERMINATOR) break;
    const raw = buffer.subarray(at, at + 11);
    const zero = raw.indexOf(0);
    fields.push({
      name: raw
        .subarray(0, zero === -1 ? 11 : zero)
        .toString("latin1")
        .trim(),
      length: buffer[at + 16],
    });
  }

  if (fields.length === 0) throw new Error("dBASE-Datei ohne Felder – der Kopf ist unbrauchbar.");

  const rows: Record<string, string>[] = [];
  for (let index = 0; index < count; index += 1) {
    const start = headerLength + index * recordLength;
    if (start + recordLength > buffer.length) break;
    /*
     * Gelöschte Sätze werden **nicht** übersprungen, sondern leer
     * durchgereicht. Die Zeilen der `.dbf` sind über ihre Nummer mit den
     * Sätzen der `.shp` verbunden, und das ist die einzige Verbindung
     * zwischen beiden Dateien: Eine ausgelassene Zeile verschiebt jede
     * folgende Gemeinde auf die Grenzen ihrer Nachbarin – ein Fehler, der
     * nirgends auffällt.
     */
    if (buffer[start] === DELETED) {
      rows.push({});
      continue;
    }

    const row: Record<string, string> = {};
    let at = start + 1;
    for (const field of fields) {
      row[field.name] = buffer
        .subarray(at, at + field.length)
        .toString(encoding)
        .trim();
      at += field.length;
    }
    rows.push(row);
  }

  return rows;
}
