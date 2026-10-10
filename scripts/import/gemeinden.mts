/**
 * Das amtliche Gemeindeverzeichnis einlesen (ToDo 2e.4).
 *
 *     npm run import:gemeinden            # lädt und schreibt data/_gemeinden.json
 *     npm run import:gemeinden -- --datei pfad/zur/vg250-ew.zip
 *
 * **Warum das BKG und nicht Destatis.** Inhaltlich führen beide dasselbe
 * Verzeichnis. Die Downloadseite des Statistischen Bundesamts nennt aber
 * **keine Lizenz**, und nach dem Grundsatz „lieber kein Import als ein
 * falscher" ist eine ungeklärte Lizenz ein Ausschlussgrund, solange es eine
 * klar lizenzierte Alternative gibt. Die Daten des Bundesamts für
 * Kartographie und Geodäsie stehen unter der Datenlizenz Deutschland –
 * Namensnennung 2.0; der verlangte Quellenvermerk steht unten in dieser
 * Datei und gehört in die Oberfläche, sobald die Daten dort sichtbar werden.
 *
 * **Warum überhaupt.** Bis hierher war die Städteliste handgepflegt: 187
 * Zeilen, abgetippt. Für die nächste Stufe (ab 20.000 Einwohnern, rund 650
 * Gemeinden) und erst recht für alle rund 11.000 skaliert das nicht, und
 * eine vergessene Gemeinde fiele niemandem auf.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { projectRoot } from "./config.mjs";
import { extractFile } from "./zip.mjs";
import { readSheetByName, withHeader } from "./xlsx.mjs";

/**
 * „Verwaltungsgebiete 1:250 000 mit Einwohnerzahlen", jeweils aktueller Stand.
 * Rund 7 MB; die Geometrie-Fassungen daneben sind zehnmal so groß und hier
 * nicht nötig – die Gemeindegrenzen holt der OSM-Importer ohnehin selbst.
 */
const QUELLE =
  "https://daten.gdz.bkg.bund.de/produkte/vg/vg250-ew_ebenen_1231/aktuell/vg250-ew_12-31.ee.excel.ebenen.zip";

/** Vorgeschriebener Quellenvermerk, siehe `nutzungsbedingungen_vg250.pdf`. */
export const BKG_QUELLENVERMERK =
  "© BKG (Jahr des letzten Datenbezugs) dl-de/by-2-0, Datenquellen: " +
  "https://sgx.geodatenzentrum.de/web_public/gdz/datenquellen/datenquellen_vg_nuts.pdf";

/** Verwaltungsebene 6 = Gemeinde, 2 = Land. */
const EBENE_GEMEINDE = "6";
const EBENE_LAND = "2";

export interface Gemeinde {
  /** Amtlicher Gemeindeschlüssel, achtstellig. */
  ags: string;
  name: string;
  /** Zusatz wie „Stadt" oder „Gemeinde" – gehört nicht in den Namen. */
  art: string;
  state: string;
  population: number;
}

export interface GemeindeRegister {
  quelle: string;
  quellenvermerk: string;
  abgerufenAm: string;
  gemeinden: Gemeinde[];
}

/**
 * Aus den Rohzeilen das Register bauen.
 *
 * Getrennt von Download und Dateizugriff, damit es prüfbar bleibt.
 */
export function buildRegister(rows: readonly Record<string, string>[]): Gemeinde[] {
  const laender = new Map<string, string>();
  for (const row of rows) {
    if (row.ADE === EBENE_LAND && row.SN_L && row.GEN) laender.set(row.SN_L, row.GEN);
  }

  /**
   * Eine Gemeinde kann mehrfach vorkommen – das Verzeichnis führt Land- und
   * Wasseranteile getrennt. Die Einwohnerzahl steht dann nur beim
   * Landanteil, der andere trägt 0. Das Maximum zu nehmen ist richtig;
   * addieren würde doppelt zählen.
   */
  const bySchluessel = new Map<string, Gemeinde>();

  for (const row of rows) {
    if (row.ADE !== EBENE_GEMEINDE) continue;

    const ags = (row.AGS ?? "").trim();
    const name = (row.GEN ?? "").trim();
    if (ags.length === 0 || name.length === 0) continue;

    const population = Number.parseInt(row.EWZ ?? "0", 10);
    const gemeinde: Gemeinde = {
      ags,
      name,
      art: (row.BEZ ?? "").trim(),
      state: laender.get(row.SN_L ?? "") ?? "",
      population: Number.isFinite(population) ? population : 0,
    };

    const vorhanden = bySchluessel.get(ags);
    if (!vorhanden || gemeinde.population > vorhanden.population) {
      bySchluessel.set(ags, gemeinde);
    }
  }

  return [...bySchluessel.values()].sort(
    (a, b) => b.population - a.population || a.name.localeCompare(b.name, "de-DE"),
  );
}

async function main() {
  const args = process.argv.slice(2);
  const dateiIndex = args.indexOf("--datei");

  let archiv: Buffer;
  if (dateiIndex >= 0 && args[dateiIndex + 1]) {
    archiv = await fs.readFile(args[dateiIndex + 1]);
    console.log(
      `Gelesen: ${args[dateiIndex + 1]} (${(archiv.length / 1024 / 1024).toFixed(1)} MB)`,
    );
  } else {
    console.log(`Lade ${QUELLE}`);
    const response = await fetch(QUELLE, { signal: AbortSignal.timeout(300_000) });
    if (!response.ok) throw new Error(`BKG: HTTP ${response.status}`);
    archiv = Buffer.from(await response.arrayBuffer());
    console.log(`Geladen: ${(archiv.length / 1024 / 1024).toFixed(1)} MB`);
  }

  const xlsx = extractFile(archiv, /verwaltungsgebiete\.xlsx$/u);
  const rows = withHeader(readSheetByName(xlsx, "VGTB_ATT_VG"));
  const gemeinden = buildRegister(rows);

  if (gemeinden.length < 10_000) {
    throw new Error(
      `Nur ${gemeinden.length} Gemeinden gefunden – Deutschland hat rund 11.000. ` +
        "Vermutlich hat sich der Aufbau der Quelle geändert; nichts geschrieben.",
    );
  }

  const einwohner = gemeinden.reduce((sum, gemeinde) => sum + gemeinde.population, 0);
  if (einwohner < 70_000_000 || einwohner > 95_000_000) {
    throw new Error(
      `Summe der Einwohner ist ${einwohner.toLocaleString("de-DE")} – das kann nicht stimmen. ` +
        "Nichts geschrieben.",
    );
  }

  const register: GemeindeRegister = {
    quelle: QUELLE,
    quellenvermerk: BKG_QUELLENVERMERK,
    abgerufenAm: new Date().toISOString().slice(0, 10),
    gemeinden,
  };

  const ziel = path.join(projectRoot, "data", "_gemeinden.json");
  await fs.writeFile(ziel, `${JSON.stringify(register, null, 1)}\n`, "utf8");

  const stufe = (grenze: number) => gemeinden.filter((g) => g.population >= grenze).length;
  console.log(
    `\n${gemeinden.length.toLocaleString("de-DE")} Gemeinden, ` +
      `${einwohner.toLocaleString("de-DE")} Einwohner`,
  );
  console.log("Stufen nach Einwohnerzahl:");
  for (const grenze of [100_000, 50_000, 20_000, 10_000, 5_000]) {
    console.log(`  ab ${grenze.toLocaleString("de-DE").padStart(7)}: ${stufe(grenze)}`);
  }
  console.log(`\nGeschrieben: data/_gemeinden.json`);
}

if (process.argv[1]?.replace(/\\/gu, "/").endsWith("gemeinden.mts")) {
  await main();
}
