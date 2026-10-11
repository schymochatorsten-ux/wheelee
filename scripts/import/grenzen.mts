/**
 * Gemeindegrenzen aus VG250-EW: der echte Punkt-in-Fläche-Test (ToDo 2e.7).
 *
 *     npm run import:grenzen            # lädt die Grenzen und prüft sie
 *     npm run import:grenzen -- --datei pfad/zur/vg250-ew.shape.zip
 *
 * **Warum das nötig war.** Der landesweite Import ordnete jeden Parkplatz
 * derjenigen Gemeinde zu, deren **umschließendes Rechteck** ihn enthielt und
 * deren Mitte am nächsten lag. In dicht besiedelten Gegenden überlappen diese
 * Rechtecke stark, und dabei gewinnt systematisch die kleinere Gemeinde: Ihre
 * Mitte liegt jedem Punkt im Überlappungsbereich näher. Herdecke (22.772
 * Einwohner) bekam so 109 Standorte bis hinauf nach Witten – 86 Stellplätze
 * je 10.000 Einwohner statt der üblichen 7. Die so erzeugten Daten für 473
 * Gemeinden sind am 2026-10-10 wieder entfernt worden.
 *
 * **Warum dieselbe Quelle wie das Register.** `vg250-ew_12-31.utm32s.shape…`
 * ist dieselbe Auslieferung wie die `.excel…`-Fassung, aus der
 * [`gemeinden.mts`](gemeinden.mts) das Gemeindeverzeichnis liest: gleicher
 * Stand, gleicher AGS, gleiche Einwohnerzahlen. Register und Grenzen können
 * deshalb nicht auseinanderlaufen. Zwei verschiedene Quellen für Namen und
 * Grenzen wären eine Fehlerquelle, die niemandem auffällt.
 *
 * Die Grenzen bleiben in UTM32, so wie sie geliefert werden; umgerechnet wird
 * der abgefragte Punkt. Vier Millionen Grenzpunkte umzurechnen wäre nicht nur
 * teuer, es würde die amtliche Geometrie auch um Zentimeter verschieben.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { projectRoot } from "./config.mjs";
import { wgs84ToUtm } from "./geo-source.mjs";
import { readDbf, readPolygons, type Ring } from "./shapefile.mjs";
import { extractFile } from "./zip.mjs";

/** Dieselbe Auslieferung wie in `gemeinden.mts`, nur als Geometrie. */
const QUELLE =
  "https://daten.gdz.bkg.bund.de/produkte/vg/vg250-ew_ebenen_1231/aktuell/vg250-ew_12-31.utm32s.shape.ebenen.zip";

/** Rund 66 MB – wird nach dem ersten Lauf hier behalten, nicht versioniert. */
const CACHE = path.join(projectRoot, "data", "raw", "vg250-ew.utm32s.shape.zip");

/**
 * Das Produkt heißt „utm32s": Ganz Deutschland liegt in Zone 32, auch der
 * Osten, der geographisch in Zone 33 fällt. Darauf verlässt sich die
 * Umrechnung des Abfragepunktes.
 */
const UTM_ZONE = 32;

/**
 * Geofaktor: 1 = Wasser ohne Struktur, 2 = Wasser mit Struktur,
 * 3 = Land ohne Struktur, 4 = Land mit Struktur.
 *
 * Genommen werden die Landflächen. Die Wasseranteile gehören derselben
 * Gemeinde, liegen aber im Bodensee oder in der Nordsee – dort steht kein
 * Parkplatz, und sie würden die Rechtecke unnötig aufblähen.
 */
const LAND = new Set(["3", "4"]);

export interface GemeindeGrenze {
  /** Amtlicher Gemeindeschlüssel, achtstellig. */
  ags: string;
  name: string;
  /** Umschließendes Rechteck in UTM32-Metern. */
  bbox: { minX: number; minY: number; maxX: number; maxY: number };
  /** Außengrenzen und Löcher gemischt – siehe `pointInRings`. */
  rings: Ring[];
}

/**
 * Liegt der Punkt in der Fläche? Strahlverfahren mit Gerade-Ungerade-Regel
 * über **alle** Ringe.
 *
 * Shapefiles unterscheiden Außengrenze und Loch nur über die Umlaufrichtung.
 * Diese auszuwerten ist hier nicht nötig und wäre eine zusätzliche
 * Fehlerquelle: Zählt man die Kreuzungen über alle Ringe zusammen, liegt ein
 * Punkt in einem Loch hinter zwei Ringen und damit außen – genau richtig.
 * Mehrteilige Gemeinden und Exklaven fallen mit demselben Zählwerk heraus,
 * und sie sind in Deutschland der Normalfall, nicht die Ausnahme.
 */
export function pointInRings(rings: readonly Ring[], x: number, y: number): boolean {
  let inside = false;

  for (const ring of rings) {
    for (
      let index = 0, previous = ring.length - 2;
      index < ring.length;
      previous = index, index += 2
    ) {
      const xi = ring[index];
      const yi = ring[index + 1];
      const xj = ring[previous];
      const yj = ring[previous + 1];

      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
        inside = !inside;
      }
    }
  }

  return inside;
}

/**
 * Ein Gitter über Deutschland, damit nicht für jeden Punkt 11.000 Rechtecke
 * geprüft werden müssen.
 *
 * Maschenweite 10 km: Deutschland ist rund 640 × 880 km, das ergibt gut 5.600
 * Zellen und je Zelle eine Handvoll Gemeinden. Das Rechteck entscheidet dabei
 * nichts mehr, es sortiert nur die Kandidaten vor – entschieden wird am
 * Polygon.
 */
const CELL_METERS = 10_000;

export class Grenzen {
  private readonly cells = new Map<string, number[]>();

  constructor(readonly gemeinden: readonly GemeindeGrenze[]) {
    for (const [index, gemeinde] of gemeinden.entries()) {
      const { bbox } = gemeinde;
      for (
        let cx = Math.floor(bbox.minX / CELL_METERS);
        cx <= Math.floor(bbox.maxX / CELL_METERS);
        cx += 1
      ) {
        for (
          let cy = Math.floor(bbox.minY / CELL_METERS);
          cy <= Math.floor(bbox.maxY / CELL_METERS);
          cy += 1
        ) {
          const key = `${cx}/${cy}`;
          const list = this.cells.get(key);
          if (list) list.push(index);
          else this.cells.set(key, [index]);
        }
      }
    }
  }

  /**
   * Die Gemeinde zu einem Punkt in WGS84 – oder `null`.
   *
   * `null` heißt: Der Punkt liegt in keiner deutschen Gemeindefläche. Das ist
   * eine Antwort, kein Fehler, und sie ist ehrlicher als die nächstgelegene
   * Mitte. Vorkommen kann es an der Küste, auf Brücken über Grenzflüssen und
   * bei Parkplätzen jenseits der Staatsgrenze, die eine landesweite Abfrage
   * mitnimmt.
   */
  find(lat: number, lng: number): GemeindeGrenze | null {
    const { easting, northing } = wgs84ToUtm(lat, lng, UTM_ZONE);
    const key = `${Math.floor(easting / CELL_METERS)}/${Math.floor(northing / CELL_METERS)}`;
    const candidates = this.cells.get(key);
    if (!candidates) return null;

    for (const index of candidates) {
      const gemeinde = this.gemeinden[index];
      const { bbox } = gemeinde;
      if (
        easting < bbox.minX ||
        easting > bbox.maxX ||
        northing < bbox.minY ||
        northing > bbox.maxY
      ) {
        continue;
      }
      if (pointInRings(gemeinde.rings, easting, northing)) return gemeinde;
    }

    return null;
  }
}

/** Aus Shapefile-Sätzen und Tabellenzeilen die Gemeindeflächen bauen. */
export function buildGrenzen(
  shp: Buffer,
  dbf: Buffer,
): { gemeinden: GemeindeGrenze[]; uebersprungen: number } {
  const shapes = readPolygons(shp);
  const rows = readDbf(dbf);

  if (shapes.length !== rows.length) {
    throw new Error(
      `Shapefile und Tabelle passen nicht zusammen: ${shapes.length} Sätze, ${rows.length} Zeilen. ` +
        "Die Zuordnung läuft allein über die Satznummer; nichts gelesen.",
    );
  }

  const gemeinden: GemeindeGrenze[] = [];
  let uebersprungen = 0;

  for (const [index, shape] of shapes.entries()) {
    const row = rows[index];
    const ags = (row.AGS ?? "").trim();
    const name = (row.GEN ?? "").trim();

    if (shape.rings.length === 0 || ags.length === 0 || !LAND.has((row.GF ?? "").trim())) {
      uebersprungen += 1;
      continue;
    }

    gemeinden.push({ ags, name, bbox: shape.bbox, rings: shape.rings });
  }

  return { gemeinden, uebersprungen };
}

/** Das Archiv holen – aus dem Zwischenspeicher, einer Datei oder vom BKG. */
async function archivLesen(datei?: string): Promise<Buffer> {
  if (datei) return fs.readFile(datei);

  try {
    const cached = await fs.readFile(CACHE);
    console.log(
      `Aus dem Zwischenspeicher: ${CACHE} (${(cached.length / 1024 / 1024).toFixed(1)} MB)`,
    );
    return cached;
  } catch {
    // Noch nicht geladen – weiter unten.
  }

  console.log(`Lade ${QUELLE}`);
  const response = await fetch(QUELLE, { signal: AbortSignal.timeout(600_000) });
  if (!response.ok) throw new Error(`BKG: HTTP ${response.status}`);
  const archiv = Buffer.from(await response.arrayBuffer());
  console.log(`Geladen: ${(archiv.length / 1024 / 1024).toFixed(1)} MB`);

  await fs.mkdir(path.dirname(CACHE), { recursive: true });
  await fs.writeFile(CACHE, archiv);
  return archiv;
}

/**
 * Die Gemeindegrenzen laden, einsatzbereit für `find`.
 *
 * Wird auch vom landesweiten Import gerufen; deshalb steht das Laden hier und
 * nicht in `main`.
 */
export async function loadGrenzen(datei?: string): Promise<Grenzen> {
  const archiv = await archivLesen(datei);
  const shp = extractFile(archiv, /VG250_GEM\.shp$/u);
  const dbf = extractFile(archiv, /VG250_GEM\.dbf$/u);

  const { gemeinden, uebersprungen } = buildGrenzen(shp, dbf);

  /*
   * Deutschland hat rund 11.000 Gemeinden. Kommen deutlich weniger an, hat
   * sich der Aufbau der Quelle geändert – dann lieber abbrechen als die
   * Hälfte der Parkplätze als „nicht zuordenbar" wegzuwerfen.
   */
  const schluessel = new Set(gemeinden.map((gemeinde) => gemeinde.ags));
  if (schluessel.size < 10_000) {
    throw new Error(
      `Nur ${schluessel.size} Gemeindeschlüssel mit Fläche – erwartet sind rund 11.000. ` +
        `Übersprungen wurden ${uebersprungen} Sätze. Hat sich der Aufbau der Quelle geändert?`,
    );
  }

  return new Grenzen(gemeinden);
}

async function main() {
  const args = process.argv.slice(2);
  const dateiIndex = args.indexOf("--datei");
  const datei = dateiIndex >= 0 ? args[dateiIndex + 1] : undefined;

  const begonnen = Date.now();
  const grenzen = await loadGrenzen(datei);
  const schluessel = new Set(grenzen.gemeinden.map((gemeinde) => gemeinde.ags));
  const punkte = grenzen.gemeinden.reduce(
    (sum, gemeinde) => sum + gemeinde.rings.reduce((inner, ring) => inner + ring.length / 2, 0),
    0,
  );

  console.log(
    `\n${grenzen.gemeinden.length.toLocaleString("de-DE")} Flächen für ` +
      `${schluessel.size.toLocaleString("de-DE")} Gemeinden, ` +
      `${punkte.toLocaleString("de-DE")} Grenzpunkte ` +
      `(${((Date.now() - begonnen) / 1000).toFixed(1)} s)`,
  );

  await pruefen(grenzen);
}

/**
 * Der Prüfstein: Die schon importierten Gemeinden müssen dieselbe Zuordnung
 * ergeben wie der Einzelimport.
 *
 * Der Einzelimport schneidet an der echten Gemeindegrenze (`map_to_area` in
 * Overpass). Seine Seed-Dateien sind damit die beste verfügbare Wahrheit:
 * Jeder Standort darin **muss** nach dem Punkt-in-Fläche-Test wieder bei
 * derselben Gemeinde landen. Wo das nicht gilt, ist entweder der Test falsch
 * oder der Bestand – und beides muss man wissen, bevor landesweit geschrieben
 * wird.
 */
async function pruefen(grenzen: Grenzen) {
  const { allMunicipalities } = await import("./german-cities.mjs");
  const agsBySlug = new Map(allMunicipalities.map((city) => [city.slug, city.ags]));

  const dataDir = path.join(projectRoot, "data");
  const dateien = (await fs.readdir(dataDir)).filter(
    (name) => name.endsWith(".json") && agsBySlug.has(name.replace(/\.json$/u, "")),
  );

  let geprueft = 0;
  let getroffen = 0;
  const fremd: { slug: string; label: string; ziel: string }[] = [];
  const draussen: { slug: string; label: string }[] = [];

  for (const name of dateien) {
    const slug = name.replace(/\.json$/u, "");
    const erwartet = agsBySlug.get(slug);
    if (!erwartet) continue;

    const raw = JSON.parse(await fs.readFile(path.join(dataDir, name), "utf8")) as {
      spots?: { lat?: number; lng?: number; street?: string; label?: string }[];
    };

    for (const spot of raw.spots ?? []) {
      if (typeof spot.lat !== "number" || typeof spot.lng !== "number") continue;
      geprueft += 1;

      const treffer = grenzen.find(spot.lat, spot.lng);
      const label = spot.label ?? spot.street ?? `${spot.lat},${spot.lng}`;

      if (!treffer) {
        draussen.push({ slug, label });
        continue;
      }
      if (treffer.ags === erwartet) {
        getroffen += 1;
        continue;
      }
      fremd.push({ slug, label, ziel: `${treffer.name} (${treffer.ags})` });
    }
  }

  const quote = geprueft > 0 ? (getroffen / geprueft) * 100 : 0;
  console.log(
    `\nPrüfstein: ${getroffen.toLocaleString("de-DE")} von ${geprueft.toLocaleString("de-DE")} ` +
      `Standorten aus ${dateien.length} Seed-Dateien landen wieder in ihrer eigenen ` +
      `Gemeinde (${quote.toFixed(2)} %).`,
  );
  console.log(
    `  andere Gemeinde: ${fremd.length.toLocaleString("de-DE")} · ` +
      `keine Gemeindefläche: ${draussen.length.toLocaleString("de-DE")}`,
  );

  for (const eintrag of fremd.slice(0, 15)) {
    console.log(`  ${eintrag.slug}: „${eintrag.label}" → ${eintrag.ziel}`);
  }
  for (const eintrag of draussen.slice(0, 5)) {
    console.log(`  ${eintrag.slug}: „${eintrag.label}" → außerhalb jeder Gemeindefläche`);
  }
}

if (process.argv[1]?.replace(/\\/gu, "/").endsWith("grenzen.mts")) {
  await main();
}
