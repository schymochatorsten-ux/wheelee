import { inflateRawSync } from "node:zlib";

/**
 * Ein schlanker ZIP-Leser.
 *
 * Gebraucht wird er für das Gemeindeverzeichnis des BKG (ToDo 2e.4): Die
 * Daten kommen als ZIP, und darin liegt eine `.xlsx` – die ihrerseits ein ZIP
 * ist. Node bringt für beides nichts mit.
 *
 * **Warum ohne Bibliothek?** Für ein Skript, das einmal im Jahr läuft, wäre
 * eine Abhängigkeit mit eigener Pflege- und Sicherheitsgeschichte ein
 * schlechtes Geschäft. Das Format ist seit 1989 stabil, und gebraucht wird
 * nur der Lesepfad: zentrales Verzeichnis lesen, Eintrag entpacken. Der
 * Rest – Verschlüsselung, Spannen über mehrere Dateien, ZIP64 – kommt bei
 * amtlichen Downloads dieser Größe nicht vor und wird ehrlich abgelehnt,
 * statt stillschweigend Unsinn zu liefern.
 */

const SIGNATURE_EOCD = 0x06054b50;
const SIGNATURE_CENTRAL = 0x02014b50;
const SIGNATURE_LOCAL = 0x04034b50;

/** Nur „gespeichert" und „deflate" – alles andere ist hier nie aufgetreten. */
const METHOD_STORED = 0;
const METHOD_DEFLATE = 8;

export interface ZipEntry {
  name: string;
  method: number;
  compressedSize: number;
  localHeaderOffset: number;
}

/** Das zentrale Verzeichnis am Dateiende finden. */
function findEndOfCentralDirectory(buffer: Buffer): number {
  // Der Eintrag ist mindestens 22 Byte lang und kann einen Kommentar von bis
  // zu 64 KB hinter sich haben – deshalb rückwärts suchen.
  const earliest = Math.max(0, buffer.length - 22 - 0xffff);
  for (let offset = buffer.length - 22; offset >= earliest; offset -= 1) {
    if (buffer.readUInt32LE(offset) === SIGNATURE_EOCD) return offset;
  }
  throw new Error("Keine ZIP-Datei: Das zentrale Verzeichnis fehlt.");
}

/** Inhaltsverzeichnis eines ZIP-Archivs. */
export function readZipIndex(buffer: Buffer): ZipEntry[] {
  const eocd = findEndOfCentralDirectory(buffer);
  const count = buffer.readUInt16LE(eocd + 10);
  let offset = buffer.readUInt32LE(eocd + 16);

  if (offset === 0xffffffff) {
    throw new Error("ZIP64 wird nicht unterstützt – das Archiv ist zu groß für diesen Leser.");
  }

  const entries: ZipEntry[] = [];
  for (let index = 0; index < count; index += 1) {
    if (buffer.readUInt32LE(offset) !== SIGNATURE_CENTRAL) {
      throw new Error(`Beschädigtes ZIP: Eintrag ${index} hat keine gültige Kennung.`);
    }

    const nameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);

    entries.push({
      name: buffer.toString("utf8", offset + 46, offset + 46 + nameLength),
      method: buffer.readUInt16LE(offset + 10),
      compressedSize: buffer.readUInt32LE(offset + 20),
      localHeaderOffset: buffer.readUInt32LE(offset + 42),
    });

    offset += 46 + nameLength + extraLength + commentLength;
  }

  return entries;
}

/** Einen Eintrag entpacken. */
export function readZipEntry(buffer: Buffer, entry: ZipEntry): Buffer {
  if (buffer.readUInt32LE(entry.localHeaderOffset) !== SIGNATURE_LOCAL) {
    throw new Error(`Beschädigtes ZIP: „${entry.name}" hat keinen gültigen lokalen Kopf.`);
  }

  // Namens- und Zusatzlänge stehen im lokalen Kopf teils anders als im
  // zentralen Verzeichnis – deshalb hier erneut lesen.
  const nameLength = buffer.readUInt16LE(entry.localHeaderOffset + 26);
  const extraLength = buffer.readUInt16LE(entry.localHeaderOffset + 28);
  const start = entry.localHeaderOffset + 30 + nameLength + extraLength;
  const data = buffer.subarray(start, start + entry.compressedSize);

  if (entry.method === METHOD_STORED) return Buffer.from(data);
  if (entry.method === METHOD_DEFLATE) return inflateRawSync(data);

  throw new Error(
    `„${entry.name}" ist mit Verfahren ${entry.method} gepackt; dieser Leser kann nur ` +
      "gespeichert und deflate.",
  );
}

/** Eine Datei aus dem Archiv holen, gesucht über einen Teil ihres Pfades. */
export function extractFile(buffer: Buffer, match: string | RegExp): Buffer {
  const entries = readZipIndex(buffer);
  const found = entries.find((entry) =>
    typeof match === "string" ? entry.name.endsWith(match) : match.test(entry.name),
  );
  if (!found) {
    throw new Error(
      `„${match}" nicht im Archiv. Enthalten sind: ${entries
        .slice(0, 10)
        .map((entry) => entry.name)
        .join(", ")}`,
    );
  }
  return readZipEntry(buffer, found);
}
