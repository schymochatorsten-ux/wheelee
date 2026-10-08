/**
 * Schritt 1 des Imports: PDF der Stadt Frankfurt einlesen, in Einträge
 * zerlegen und die Örtlichkeiten in Straße / Hausnummer / Zusatz / Zeit
 * aufspalten.
 *
 *     npm run import:parse
 *
 * Ergebnis: `data/frankfurt.parsed.json` (versioniert) und der Rohtext unter
 * `data/raw/frankfurt.txt` zum Nachsehen.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { PDFParse } from "pdf-parse";
import { parseParkingList, totalSpotCount } from "../../src/lib/parking/parse-list.js";
import { splitAddress } from "../../src/lib/parking/address.js";
import { city, paths, spotId } from "./config.mjs";

/** Ein geparster Eintrag, wie ihn die Folgeschritte erwarten. */
export interface ParsedSpot {
  id: string;
  label: string;
  street: string | null;
  houseNumber: string | null;
  note: string | null;
  timeRestriction: string | null;
  /** `null`, wenn die Quelle für diese Zeile keinen Stadtteil nennt. */
  district: string | null;
  spotCount: number;
}

export interface ParsedFile {
  city: string;
  source: string;
  parsedAt: string;
  declaredTotal: number | null;
  spots: ParsedSpot[];
  unparsed: string[];
}

async function extractText(pdfPath: string): Promise<string> {
  const buffer = await fs.readFile(pdfPath);
  const parser = new PDFParse({ data: new Uint8Array(buffer) });
  try {
    const result = await parser.getText();
    return result.text;
  } finally {
    await parser.destroy();
  }
}

async function main() {
  const rawText = await extractText(paths.sourcePdf);
  await fs.mkdir(path.dirname(paths.rawText), { recursive: true });
  await fs.writeFile(paths.rawText, rawText, "utf8");

  const fixups = JSON.parse(await fs.readFile(paths.lineFixups, "utf8")) as {
    forcedJoins?: string[];
  };
  const { entries, unparsed, declaredTotal } = parseParkingList(rawText, {
    forcedJoins: fixups.forcedJoins,
  });

  const seen = new Map<string, number>();
  const spots: ParsedSpot[] = entries.map((entry) => {
    const address = splitAddress(entry.label);
    const id = spotId(entry.label);
    seen.set(id, (seen.get(id) ?? 0) + 1);

    return {
      id,
      label: entry.label,
      street: address.street,
      houseNumber: address.houseNumber,
      note: address.note,
      timeRestriction: address.timeRestriction,
      district: entry.district,
      spotCount: entry.spotCount,
    };
  });

  const duplicates = [...seen.entries()].filter(([, count]) => count > 1);

  const output: ParsedFile = {
    city: city.slug,
    source: city.source,
    parsedAt: new Date().toISOString().slice(0, 10),
    declaredTotal,
    spots,
    unparsed,
  };

  await fs.mkdir(path.dirname(paths.parsed), { recursive: true });
  await fs.writeFile(paths.parsed, `${JSON.stringify(output, null, 2)}\n`, "utf8");

  const sum = totalSpotCount(entries);
  console.log(`Örtlichkeiten:        ${spots.length}`);
  console.log(`Stellplätze (Summe):  ${sum}`);
  console.log(`Stellplätze (Quelle): ${declaredTotal ?? "unbekannt"}`);
  if (declaredTotal !== null && declaredTotal !== sum) {
    console.warn(`WARNUNG: Summe weicht um ${sum - declaredTotal} von der Quelle ab.`);
  }
  if (duplicates.length > 0) {
    console.warn(`WARNUNG: ${duplicates.length} doppelte Örtlichkeiten (gleiche ID).`);
  }
  console.log(`Nicht geparste Zeilen: ${unparsed.length}`);
  console.log(`Geschrieben: ${path.relative(process.cwd(), paths.parsed)}`);
}

await main();
