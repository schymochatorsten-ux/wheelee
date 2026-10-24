/**
 * Regionale Sammeldatensätze importieren (ToDos 2e.2, 2e.3).
 *
 *     npm run import:regional            # alle bekannten
 *     npm run import:regional -- trk     # nur einen
 *     npm run import:regional -- --dry
 *
 * **Warum eigene Behandlung.** Der normale Importer arbeitet Stadt für Stadt
 * und sucht je Stadt eine Quelle. Manche Stellen veröffentlichen aber einen
 * Datensatz für **mehrere Gemeinden auf einmal** – und die stehen nicht auf
 * GovData, sondern auf Landesportalen. Der Datensatz der Technologieregion
 * Karlsruhe etwa deckt zwölf deutsche Gemeinden ab, darunter acht, die für
 * das Register zu klein sind, aber trotzdem amtliche Daten haben. Genau das
 * war die Vermutung hinter 2e.1, die über GovData allein nicht zu finden war.
 *
 * Ein solcher Datensatz ist dreifach wertvoll: amtlich, mit Zeitangaben und
 * Höchstparkdauer, und er erschließt Gemeinden, die sonst durchs Raster
 * fielen.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import type { ParkingSpot } from "../../src/lib/types.js";
import { splitAddress } from "../../src/lib/parking/address.js";
import { projectRoot } from "./config.mjs";
import { germanCities, toSlug } from "./german-cities.mjs";
import { isPlausibleWgs84, utmToWgs84 } from "./geo-source.mjs";
import { recordCity } from "./status.mjs";

const USER_AGENT = "wheelee-import/0.1 (Behindertenparkplatz-Karte; Kontakt via Repository)";

export interface RegionalSource {
  id: string;
  title: string;
  /** Herausgeber, wie er in der Quellenangabe erscheinen soll. */
  publisher: string;
  license: string;
  url: string;
  /** UTM-Zone der Koordinaten, falls die Quelle nicht in WGS84 liefert. */
  utmZone?: number;
  /** Feldnamen der Quelle. */
  fields: {
    municipality: string;
    label: string;
    district?: string;
    spotCount?: string;
    timeRestriction?: string;
    maxStay?: string;
    note?: string;
  };
  /** Gemeinden außerhalb Deutschlands, die der Datensatz mitführt. */
  skip?: string[];
}

export const REGIONAL_SOURCES: RegionalSource[] = [
  {
    id: "trk",
    title: "Behindertenparkplätze TechnologieRegion Karlsruhe",
    publisher: "Stadt Karlsruhe / TechnologieRegion Karlsruhe",
    license: "Creative Commons Namensnennung 4.0 (CC BY 4.0)",
    url:
      "https://mobil.trk.de/geoserver/TBA/ows?service=WFS&version=1.0.0&request=GetFeature" +
      "&typeName=TBA%3Abehinderten_parkplaetze&outputFormat=application%2Fjson",
    // Der Dienst liefert Koordinaten in UTM 32N, nicht in Längen- und Breitengraden.
    utmZone: 32,
    fields: {
      municipality: "gemeinde",
      label: "standort",
      district: "stadtteil",
      spotCount: "stellplaetze",
      timeRestriction: "parkzeit",
      maxStay: "max_parkdauer",
      note: "bemerkung",
    },
    // Der Datensatz reicht über die Grenze; das Elsass gehört nicht hierher.
    skip: ["Wissembourg", "Haguenau", "Saverne"],
  },
];

/**
 * Ist das plausibel ein Straßenname?
 *
 * Nicht jede Straße endet auf „-straße". Im Bestand stehen „Im Stalbühl",
 * „Am Sonnenbad", „Hinterm Hauptbahnhof" – alles echte Straßennamen. Und
 * nicht jeder Eintrag ist einer: „Ärztehaus" ist ein Gebäude, und als
 * Straßenname eingetragen würde es jede spätere Nachbesserung blockieren,
 * weil der Standort dann als versorgt gilt. Dieser Fehler ist in diesem
 * Projekt schon einmal passiert (3.0f) und hat 36 Standorte unbrauchbar
 * gemacht.
 */
/**
 * `-hof` fehlt hier bewusst: „Bahnhof" ist das häufigste Wort auf -hof im
 * Bestand und keine Straße. Echte Straßen wie „Lindenhof" bekommen dadurch
 * zunächst keinen Straßennamen – den holt `import:streets` aus
 * OpenStreetMap, und das ist besser, als einen Bahnhof zur Straße zu
 * erklären und jede Nachbesserung zu blockieren.
 */
const STREET_SUFFIX =
  /(stra(ß|ss)e|str\.?|weg|allee|platz|ring|gasse|damm|ufer|chaussee|markt|pfad|steig|brücke|promenade)\b/iu;
const STREET_PREFIX =
  /^(im|am|an der|an den|auf dem|auf der|hinterm|hinter der|zur|zum|bei der|beim|vor dem)\s/iu;
const HOUSE_NUMBER_AT_END = /\d+\s*[a-z]?$/iu;

export function looksLikeStreet(value: string): boolean {
  const clean = value.trim();
  if (clean.length < 3) return false;
  return STREET_SUFFIX.test(clean) || STREET_PREFIX.test(clean) || HOUSE_NUMBER_AT_END.test(clean);
}

/** Wie viele Standorte stehen schon in der Seed-Datei? `null`, wenn keine da ist. */
async function readExisting(slug: string): Promise<number | null> {
  try {
    const raw = await fs.readFile(path.join(projectRoot, "data", `${slug}.json`), "utf8");
    const seed = JSON.parse(raw) as { spots?: unknown[] };
    return Array.isArray(seed.spots) ? seed.spots.length : null;
  } catch {
    return null;
  }
}

interface GeoJsonFeature {
  properties?: Record<string, unknown>;
  geometry?: { type?: string; coordinates?: unknown };
}

const text = (value: unknown): string | null => {
  if (value === null || value === undefined) return null;
  const s = String(value).trim();
  return s.length > 0 && s.toLowerCase() !== "null" ? s : null;
};

/** Koordinate aus einem Punkt lesen und nötigenfalls umrechnen. */
function coordinates(feature: GeoJsonFeature, utmZone?: number) {
  const raw = feature.geometry?.coordinates;
  if (!Array.isArray(raw) || raw.length < 2) return null;

  const [x, y] = raw as number[];
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;

  if (utmZone === undefined) {
    return isPlausibleWgs84(y, x) ? { lat: y, lng: x } : null;
  }

  const converted = utmToWgs84(x, y, utmZone);
  return isPlausibleWgs84(converted.lat, converted.lng) ? converted : null;
}

/**
 * Höchstparkdauer und Zeitfenster zusammenführen.
 *
 * Die Quelle führt beides getrennt – „werktags 8 bis 20 Uhr" und „2 Std.".
 * Die App kennt nur ein Feld, deutet aber beides: Eine reine Dauerangabe
 * wird als Höchstparkdauer erkannt (siehe `src/lib/opening-hours.ts`).
 * Stehen beide, gewinnt das Zeitfenster – es sagt, *wann* die Regel gilt,
 * und das ist die Frage vor der Abfahrt.
 */
function restriction(timeWindow: string | null, maxStay: string | null): string | null {
  return timeWindow ?? maxStay;
}

/**
 * Den Datensatz laden und je Gemeinde zerlegen – ohne etwas zu schreiben.
 *
 * Getrennt von `importSource`, damit die Gegenprüfung (ToDo 3.2,
 * `crosscheck-regional.mts`) dieselben Standorte lesen kann, ohne eine
 * Seed-Datei anzufassen.
 */
export async function loadRegional(source: RegionalSource) {
  console.log(`\n=== ${source.title} ===`);

  const response = await fetch(source.url, {
    headers: { "User-Agent": USER_AGENT },
    signal: AbortSignal.timeout(180_000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const json = (await response.json()) as { features?: GeoJsonFeature[] };
  const features = json.features ?? [];
  console.log(`  ${features.length} Objekte geladen`);

  if (features.length === 0) {
    throw new Error("Leeres Ergebnis – nichts geschrieben.");
  }

  const bySlug = new Map<string, { name: string; spots: ParkingSpot[] }>();
  const uebersprungen = new Map<string, number>();
  let ohneKoordinate = 0;

  for (const [index, feature] of features.entries()) {
    const properties = feature.properties ?? {};
    const municipality = text(properties[source.fields.municipality]);
    if (!municipality) continue;

    if (source.skip?.includes(municipality)) {
      uebersprungen.set(municipality, (uebersprungen.get(municipality) ?? 0) + 1);
      continue;
    }

    const position = coordinates(feature, source.utmZone);
    if (!position) {
      ohneKoordinate += 1;
      continue;
    }

    const slug = toSlug(municipality);
    const label = text(properties[source.fields.label]) ?? `Behindertenparkplatz ${municipality}`;
    const spotCountRaw = source.fields.spotCount
      ? Number.parseInt(String(properties[source.fields.spotCount] ?? ""), 10)
      : Number.NaN;

    /*
     * Die Quelle nennt meist echte Anschriften („Ettlinger Allee 5"). Die zu
     * zerlegen ist besser, als später die nächstgelegene Straße aus
     * OpenStreetMap zu raten – hier steht, wo der Platz wirklich ist.
     *
     * Manchmal steht im Ortsfeld aber ein Gebäude („Ärztehaus") und die
     * Anschrift in der Bemerkung („Franz-Sigel-Str. 83"). Dann gilt die
     * Bemerkung. Taugt keines von beiden, bleibt die Straße leer – dann holt
     * sie `npm run import:streets` aus OpenStreetMap. Lieber kein
     * Straßenname als ein falscher.
     */
    const bemerkung = source.fields.note ? text(properties[source.fields.note]) : null;
    const adresse = looksLikeStreet(label)
      ? label
      : bemerkung && looksLikeStreet(bemerkung)
        ? bemerkung
        : null;
    const parsed = adresse
      ? // Ein angehängter Ortsname („…, Bruchsal") gehört nicht in das
        // Straßenfeld – die Stadt steht ohnehin schon am Datensatz.
        splitAddress(adresse.replace(new RegExp(`\\s*,\\s*${municipality}\\s*$`, "iu"), ""))
      : { street: null, houseNumber: null, note: null, timeRestriction: null };

    const spot: ParkingSpot = {
      id: `${slug}-${createHash("sha256")
        .update(`${source.id}/${properties.id ?? index}`, "utf8")
        .digest("hex")
        .slice(0, 10)}`,
      city: slug,
      label,
      street: parsed.street,
      houseNumber: parsed.houseNumber,
      note: [bemerkung, parsed.note].filter(Boolean).join(" · ") || null,
      timeRestriction: restriction(
        source.fields.timeRestriction ? text(properties[source.fields.timeRestriction]) : null,
        source.fields.maxStay ? text(properties[source.fields.maxStay]) : null,
      ),
      district:
        (source.fields.district ? text(properties[source.fields.district]) : null) ?? municipality,
      // „0 Stellplätze" kommt vor und meint eher „unbekannt" als „keiner".
      spotCount: Number.isFinite(spotCountRaw) && spotCountRaw > 0 ? spotCountRaw : 1,
      lat: position.lat,
      lng: position.lng,
      geoAccuracy: "house",
      source: `${source.title} (${source.license})`,
    };

    const eintrag = bySlug.get(slug);
    if (eintrag) eintrag.spots.push(spot);
    else bySlug.set(slug, { name: municipality, spots: [spot] });
  }

  return { bySlug, uebersprungen, ohneKoordinate };
}

async function importSource(source: RegionalSource, dryRun: boolean): Promise<void> {
  const { bySlug, uebersprungen, ohneKoordinate } = await loadRegional(source);

  console.log(
    `  ${bySlug.size} Gemeinden · ${ohneKoordinate} ohne verwertbare Koordinate` +
      (uebersprungen.size > 0
        ? ` · übersprungen: ${[...uebersprungen].map(([n, c]) => `${n} (${c})`).join(", ")}`
        : ""),
  );

  const imRegister = new Set(germanCities.map((city) => city.slug));

  for (const [slug, { name, spots }] of [...bySlug].sort(
    (a, b) => b[1].spots.length - a[1].spots.length,
  )) {
    const marke = imRegister.has(slug) ? "im Register" : "neu, unter der Einwohnergrenze";
    console.log(`    ${name.padEnd(16)} ${String(spots.length).padStart(4)} Standorte  (${marke})`);
  }

  if (dryRun) {
    console.log("  (Probelauf – nichts geschrieben)");
    return;
  }

  let geschrieben = 0;

  for (const [slug, { name, spots }] of bySlug) {
    /*
     * **Amtlich heißt nicht automatisch besser.** Für Karlsruhe führt dieser
     * Datensatz 224 Standorte, OpenStreetMap aber 330 – die Stadt listet nur
     * ihre eigenen Stellplätze im Straßenraum, OSM auch die an Kliniken,
     * Märkten und Bahnhöfen. Beides ist richtig, aber das Überschreiben
     * würde ein Drittel der Standorte vernichten.
     *
     * Dieselbe Lehre wie bei Rostock (3.9b), nur andersherum: Nicht die
     * Herkunft entscheidet, sondern was in den Daten steht. Wo der
     * vorhandene Bestand deutlich größer ist, bleibt er – und der Fall
     * gehört in den Kreuzvergleich (3.1), nicht in ein stilles Überschreiben.
     */
    const vorhanden = await readExisting(slug);
    if (vorhanden !== null && vorhanden > spots.length * 1.25) {
      console.log(
        `    ⚠ ${name}: vorhanden ${vorhanden} Standorte, hier nur ${spots.length} – ` +
          "nicht überschrieben",
      );
      continue;
    }

    const sorted = [...spots].sort((a, b) => a.label.localeCompare(b.label, "de-DE"));
    const lats = sorted.map((spot) => spot.lat!).sort((a, b) => a - b);
    const lngs = sorted.map((spot) => spot.lng!).sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    await fs.writeFile(
      path.join(projectRoot, "data", `${slug}.json`),
      `${JSON.stringify(
        {
          city: { slug, name, center: { lat: lats[middle], lng: lngs[middle] } },
          source: `${source.title} – ${source.publisher} (${source.license})`,
          license: source.license,
          generatedAt: new Date().toISOString().slice(0, 10),
          spots: sorted,
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
    /*
     * Den Importstand mitführen, sonst zählt die Abdeckungsrechnung (2e.0)
     * diese Gemeinden als ungeprüft – obwohl sie amtliche Daten haben.
     */
    if (imRegister.has(slug)) {
      await recordCity(slug, {
        status: "fertig",
        usedSource: `amtlich (regional: ${source.id})`,
        usedUrl: source.url,
        locations: sorted.length,
        spaces: sorted.reduce((sum, spot) => sum + spot.spotCount, 0),
        message: null,
      });
    }

    geschrieben += 1;
  }

  console.log(`  ✅ ${geschrieben} von ${bySlug.size} Seed-Dateien geschrieben`);
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry");
  const wanted = args.filter((argument) => !argument.startsWith("--"));

  const sources =
    wanted.length > 0
      ? REGIONAL_SOURCES.filter((source) => wanted.includes(source.id))
      : REGIONAL_SOURCES;

  if (sources.length === 0) {
    console.log("Keine passende Quelle. Bekannt sind:");
    for (const source of REGIONAL_SOURCES) console.log(`  ${source.id} – ${source.title}`);
    return;
  }

  for (const source of sources) await importSource(source, dryRun);

  if (!dryRun) {
    console.log("\nJetzt `npm run import:streets` und `npm run import:index`.");
  }
}

// Dateiname exakt, nicht `endsWith`: „crosscheck-regional.mts“ endet auch so und
// ließ beim Import dieses Moduls den ganzen Import mitlaufen (2026-10-24).
if (path.basename(process.argv[1] ?? "") === "regional.mts") {
  await main();
}
