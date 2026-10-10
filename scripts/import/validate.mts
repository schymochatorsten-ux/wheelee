/**
 * Prüft die importierten Parkplatzdaten.
 *
 *     npm run validate               # alle Städte
 *     npm run validate -- berlin     # eine Stadt
 *     npm run validate -- --offline  # nur Prüfungen ohne Netzzugriff
 *
 * Der Import prüft nur, ob eine Koordinate überhaupt plausibel ist. Ob der
 * einzelne Parkplatz an der richtigen Stelle liegt, zeigt erst der Abgleich
 * mit einer unabhängigen Quelle – hier OpenStreetMap gegen die amtlichen Daten.
 *
 * Ergebnis: `data/_validierung.md`. Das Skript ändert keine Daten.
 */
import fs from "node:fs/promises";
import path from "node:path";
import type { ParkingSpot } from "../../src/lib/types.js";
import { distanceMeters } from "../../src/lib/geo.js";
import { projectRoot } from "./config.mjs";
import { findCity, germanCities } from "./german-cities.mjs";
import { importFromOsm } from "./osm-source.mjs";

interface SeedFile {
  city: { slug: string; name: string; center: { lat: number; lng: number } };
  source: string;
  generatedAt: string;
  spots: ParkingSpot[];
}

interface Finding {
  /** Kurzbezeichnung der Prüfung. */
  check: string;
  /** Wie ernst der Befund ist. */
  level: "fehler" | "verdacht" | "hinweis";
  message: string;
  /** Betroffene Parkplätze, soweit benennbar. */
  examples?: string[];
}

interface CityReport {
  slug: string;
  name: string;
  population: number | null;
  source: string;
  spots: number;
  spaces: number;
  /** Anteil der Standorte, die auch OpenStreetMap kennt. */
  confirmedByOsm: number | null;
  findings: Finding[];
}

const GERMANY = { minLat: 47.2, maxLat: 55.1, minLng: 5.8, maxLng: 15.1 };

/** Zwei Standorte unter diesem Abstand gelten als derselbe Parkplatz. */
const DUPLICATE_METERS = 10;
/**
 * Bis hierher gilt zweierlei als dasselbe Objekt – dieselbe Schwelle, die
 * `scripts/import/dedupe.mts` zum Zusammenführen verwendet. Dort steht auch
 * die Begründung: Eine markierte Bucht ist breiter als das.
 */
const SAME_PLACE_METERS = 1.5;

/** So nah müssen sich zwei Quellen kommen, damit sie einander bestätigen. */
const CONFIRM_METERS = 30;

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    throw error;
  }
}

/* ------------------------------------------------------------------ *
 * Prüfungen ohne Netzzugriff
 * ------------------------------------------------------------------ */

function checkCoordinates(seed: SeedFile): Finding[] {
  const findings: Finding[] = [];
  const outside: string[] = [];
  const missing: string[] = [];

  for (const spot of seed.spots) {
    if (spot.lat === null || spot.lng === null) {
      missing.push(spot.label);
      continue;
    }
    if (
      spot.lat < GERMANY.minLat ||
      spot.lat > GERMANY.maxLat ||
      spot.lng < GERMANY.minLng ||
      spot.lng > GERMANY.maxLng
    ) {
      outside.push(`${spot.label} (${spot.lat.toFixed(4)}, ${spot.lng.toFixed(4)})`);
    }
  }

  if (outside.length > 0) {
    findings.push({
      check: "Koordinate außerhalb Deutschlands",
      level: "fehler",
      message: `${outside.length} Standorte liegen außerhalb des Landes – fast sicher ein falsch gedeutetes Koordinatensystem.`,
      examples: outside.slice(0, 5),
    });
  }
  if (missing.length > 0) {
    findings.push({
      check: "Ohne Koordinate",
      level: "hinweis",
      message: `${missing.length} Standorte haben keine Koordinate und erscheinen nur in der Liste.`,
      examples: missing.slice(0, 5),
    });
  }

  return findings;
}

/**
 * Streuung der Standorte prüfen.
 *
 * Liegen die Punkte weit auseinander oder weit vom hinterlegten Mittelpunkt,
 * stimmt etwas mit der Stadtzuordnung nicht.
 */
function checkSpread(seed: SeedFile): Finding[] {
  const located = seed.spots.filter(
    (spot): spot is ParkingSpot & { lat: number; lng: number } =>
      spot.lat !== null && spot.lng !== null,
  );
  if (located.length < 3) return [];

  const center = seed.city.center;
  const distances = located
    .map((spot) => distanceMeters(center, { lat: spot.lat, lng: spot.lng }) / 1000)
    .sort((a, b) => a - b);

  const far = located.filter(
    (spot) => distanceMeters(center, { lat: spot.lat, lng: spot.lng }) / 1000 > 40,
  );

  const findings: Finding[] = [];
  if (far.length > 0) {
    findings.push({
      check: "Weit vom Stadtmittelpunkt",
      level: far.length > located.length * 0.1 ? "fehler" : "verdacht",
      message: `${far.length} Standorte liegen über 40 km vom Stadtmittelpunkt entfernt (größter Abstand ${distances[distances.length - 1].toFixed(0)} km).`,
      examples: far.slice(0, 5).map((spot) => spot.label),
    });
  }
  return findings;
}

/**
 * Dubletten finden.
 *
 * Zwei Standorte wenige Meter auseinander sind meist derselbe Parkplatz –
 * etwa wenn eine Quelle je Stellplatz einen Eintrag führt.
 * Vorsortiert nach Breitengrad, sonst wären es bei 900 Standorten zu viele
 * Vergleiche.
 */
function checkDuplicates(seed: SeedFile): Finding[] {
  const located = seed.spots
    .filter(
      (spot): spot is ParkingSpot & { lat: number; lng: number } =>
        spot.lat !== null && spot.lng !== null,
    )
    .sort((a, b) => a.lat - b.lat);

  const pairs: string[] = [];
  const adjacent: string[] = [];
  // 10 m entsprechen knapp 0,0001° Breite; mit Puffer vergleichen.
  const latWindow = 0.0005;

  for (let i = 0; i < located.length; i += 1) {
    for (let j = i + 1; j < located.length && located[j].lat - located[i].lat < latWindow; j += 1) {
      const meters = distanceMeters(
        { lat: located[i].lat, lng: located[i].lng },
        { lat: located[j].lat, lng: located[j].lng },
      );
      if (meters > DUPLICATE_METERS) continue;

      // Nur was praktisch auf demselben Punkt liegt und gleich heißt, ist
      // wirklich eine Dublette. Alles andere sind benachbarte Buchten.
      const sameName =
        located[i].label.trim().toLocaleLowerCase("de-DE") ===
        located[j].label.trim().toLocaleLowerCase("de-DE");

      const entry = `${located[i].label} ↔ ${located[j].label} (${meters.toFixed(1)} m)`;
      if (meters <= SAME_PLACE_METERS && sameName) pairs.push(entry);
      else adjacent.push(entry);
    }
  }

  const findings: Finding[] = [];

  if (pairs.length > 0) {
    findings.push({
      check: "Dubletten",
      level: "verdacht",
      message:
        `${pairs.length} Paare liegen unter ${SAME_PLACE_METERS} m auseinander und heißen gleich – ` +
        "das ist dasselbe Objekt. `npm run data:dedupe` führt sie zusammen.",
      examples: pairs.slice(0, 5),
    });
  }

  if (adjacent.length > 0) {
    findings.push({
      check: "Dicht beieinander",
      // Ausdrücklich nur ein Hinweis: Eine markierte Bucht ist rund 3,5 m
      // breit, zwei Einträge in 4 m Abstand sind also zwei echte Plätze
      // nebeneinander. Früher meldete die Prüfung sie als „mögliche
      // Dubletten" – über den ganzen Bestand 4.460 Paare, fast alle
      // harmlos. Ein Bericht, der so oft falschen Alarm schlägt, wird nicht
      // mehr gelesen.
      level: "hinweis",
      message:
        `${adjacent.length} Paare liegen zwischen ${SAME_PLACE_METERS} und ${DUPLICATE_METERS} m ` +
        "auseinander. Das sind im Regelfall benachbarte Stellplätze, keine Dubletten.",
      examples: adjacent.slice(0, 3),
    });
  }

  return findings;
}

/** Vollständigkeit und Qualität der Textfelder. */
function checkFields(seed: SeedFile): Finding[] {
  const findings: Finding[] = [];
  const total = seed.spots.length;
  if (total === 0) return findings;

  /**
   * Trägt ein einzelner Name den halben Bestand?
   *
   * Gesucht ist der Fehler, bei dem das Adressfeld der Quelle nicht erkannt
   * wurde und überall derselbe Platzhalter steht – „Behindertenparkplatz
   * Nürnberg" bei 473 von 487 Einträgen.
   *
   * Früher zählte die Prüfung schlicht die verschiedenen Namen und schlug an,
   * sobald es weniger als halb so viele wie Standorte waren. Seit die
   * Standorte ihre Straßennamen haben (3.0), ist das falsch: In Göttingen
   * teilen sich 419 Standorte 146 Straßen, und das ist genau richtig – eine
   * Straße hat eben mehrere Stellplätze. Die alte Fassung meldete dadurch
   * 104 von 187 Städten als fehlerhaft, und ein Bericht, der bei jeder
   * zweiten Stadt rot wird, wird nicht mehr gelesen.
   */
  const labelCounts = new Map<string, number>();
  for (const spot of seed.spots) {
    labelCounts.set(spot.label, (labelCounts.get(spot.label) ?? 0) + 1);
  }
  const [mostCommon, mostCommonCount] = [...labelCounts.entries()].reduce((best, entry) =>
    entry[1] > best[1] ? entry : best,
  );

  if (mostCommonCount > total * 0.5 && total > 10) {
    findings.push({
      check: "Platzhalter statt Adresse",
      level: "fehler",
      message:
        `${mostCommonCount} von ${total} Standorten heißen „${mostCommon}" – das Adressfeld ` +
        "der Quelle wurde vermutlich nicht erkannt.",
    });
  }

  const withoutStreet = seed.spots.filter((spot) => !spot.street).length;
  if (withoutStreet > total * 0.2) {
    findings.push({
      check: "Ohne Straße",
      level: "verdacht",
      message: `${withoutStreet} von ${total} Standorten haben keinen Straßennamen.`,
    });
  }

  const districtIsCity = seed.spots.filter((spot) => spot.district === seed.city.name).length;
  if (districtIsCity === total && total > 20) {
    findings.push({
      check: "Kein Stadtteil",
      level: "hinweis",
      message: "Bei allen Standorten steht der Stadtname als Stadtteil – die Quelle nennt keinen.",
    });
  }

  return findings;
}

/**
 * Stellplätze je 10.000 Einwohner.
 *
 * Die wirksamste Prüfung überhaupt und die billigste: Ausreißer nach unten
 * zeigen eine Lücke in der Datenlage, nicht in der Wirklichkeit. Hamburgs
 * zunächst importierte 10 Standorte für 1,9 Millionen Einwohner wären hier
 * sofort aufgefallen.
 */
function checkDensity(report: CityReport, median: number): Finding[] {
  if (report.population === null || report.population === 0) return [];

  const perTenThousand = (report.spaces / report.population) * 10_000;
  if (perTenThousand >= median * 0.25) return [];

  return [
    {
      check: "Auffällig wenige Stellplätze",
      level: perTenThousand < median * 0.1 ? "fehler" : "verdacht",
      message:
        `${perTenThousand.toFixed(1)} Stellplätze je 10.000 Einwohner, ` +
        `Mittelwert aller Städte ${median.toFixed(1)}. Vermutlich eine lückenhafte Quelle, keine lückenhafte Stadt.`,
    },
  ];
}

/* ------------------------------------------------------------------ *
 * Prüfung mit zweiter Quelle
 * ------------------------------------------------------------------ */

/**
 * Amtliche Daten gegen OpenStreetMap halten.
 *
 * Standorte, die beide Quellen unabhängig kennen, sind die verlässlichsten.
 * Ein fehlender Gegenpart ist kein Fehler – OSM ist unvollständig –, aber die
 * Quote zeigt, wie gut eine Stadt doppelt belegt ist.
 */
async function crossCheckWithOsm(
  seed: SeedFile,
): Promise<{ finding: Finding; confirmed: number } | null> {
  const city = findCity(seed.city.slug);
  if (!city) return null;

  const { spots: osmSpots } = await importFromOsm(city);
  if (osmSpots.length === 0) {
    // Nicht als "0 % bestätigt" ausweisen: Für Berlin oder Hamburg kann das
    // nur bedeuten, dass die Overpass-Abfrage nichts geliefert hat. Ein
    // nicht durchgeführter Abgleich darf nicht wie ein schlechtes Ergebnis
    // aussehen.
    return null;
  }

  const located = seed.spots.filter(
    (spot): spot is ParkingSpot & { lat: number; lng: number } =>
      spot.lat !== null && spot.lng !== null,
  );

  let confirmed = 0;
  for (const spot of located) {
    const match = osmSpots.some(
      (other) =>
        other.lat !== null &&
        other.lng !== null &&
        distanceMeters({ lat: spot.lat, lng: spot.lng }, { lat: other.lat, lng: other.lng }) <
          CONFIRM_METERS,
    );
    if (match) confirmed += 1;
  }

  const share = located.length > 0 ? (confirmed / located.length) * 100 : 0;

  return {
    confirmed,
    finding: {
      check: "Abgleich mit OpenStreetMap",
      level: "hinweis",
      message:
        `${confirmed} von ${located.length} Standorten (${share.toFixed(0)} %) kennt auch OpenStreetMap ` +
        `(${osmSpots.length} OSM-Standorte, Toleranz ${CONFIRM_METERS} m).`,
    },
  };
}

/* ------------------------------------------------------------------ *
 * Bericht
 * ------------------------------------------------------------------ */

const LEVEL_SYMBOL = { fehler: "🔴", verdacht: "🟡", hinweis: "⬜" } as const;

function renderReport(reports: CityReport[]): string {
  const withFindings = reports.filter((report) =>
    report.findings.some((finding) => finding.level !== "hinweis"),
  );
  const errors = reports.filter((report) =>
    report.findings.some((finding) => finding.level === "fehler"),
  );

  const lines = [
    "# Validierung der Parkplatzdaten",
    "",
    `Stand: ${new Date().toISOString().slice(0, 10)}`,
    "",
    "Erzeugt von `npm run validate`. Das Skript ändert keine Daten – es benennt,",
    "was ein Mensch ansehen sollte. Vorgehen siehe [Datenpflege.md](../Datenpflege.md).",
    "",
    "## Überblick",
    "",
    "| Kennzahl | Wert |",
    "| --- | --- |",
    `| geprüfte Städte | ${reports.length} |`,
    `| Standorte | ${reports.reduce((sum, report) => sum + report.spots, 0).toLocaleString("de-DE")} |`,
    `| Stellplätze | ${reports.reduce((sum, report) => sum + report.spaces, 0).toLocaleString("de-DE")} |`,
    `| Städte mit Fehlern | ${errors.length} |`,
    `| Städte mit Verdachtsfällen | ${withFindings.length - errors.length} |`,
    "",
    "Bewertung: 🔴 Fehler – muss angesehen werden · 🟡 Verdacht – sollte angesehen werden · ⬜ Hinweis",
    "",
  ];

  if (withFindings.length > 0) {
    lines.push("## Städte mit Befund", "");
    for (const report of withFindings.sort((a, b) => b.spots - a.spots)) {
      lines.push(`### ${report.name}`, "");
      lines.push(
        `${report.spots} Standorte, ${report.spaces} Stellplätze · Quelle: ${report.source}`,
        "",
      );
      for (const finding of report.findings) {
        lines.push(`- ${LEVEL_SYMBOL[finding.level]} **${finding.check}:** ${finding.message}`);
        for (const example of finding.examples ?? []) lines.push(`  - ${example}`);
      }
      lines.push("");
    }
  }

  lines.push("## Alle Städte", "");
  lines.push("| Stadt | Standorte | Stellplätze | je 10.000 Einw. | von OSM bestätigt | Befunde |");
  lines.push("| --- | ---: | ---: | ---: | ---: | --- |");

  for (const report of [...reports].sort((a, b) => a.name.localeCompare(b.name, "de-DE"))) {
    const density =
      report.population && report.population > 0
        ? ((report.spaces / report.population) * 10_000).toFixed(1)
        : "–";
    const confirmed =
      report.confirmedByOsm === null
        ? "nicht geprüft"
        : `${report.confirmedByOsm} (${report.spots > 0 ? Math.round((report.confirmedByOsm / report.spots) * 100) : 0} %)`;
    const worst = report.findings.some((f) => f.level === "fehler")
      ? "🔴"
      : report.findings.some((f) => f.level === "verdacht")
        ? "🟡"
        : "–";

    lines.push(
      `| ${report.name} | ${report.spots} | ${report.spaces} | ${density} | ${confirmed} | ${worst} |`,
    );
  }

  lines.push("");
  return lines.join("\n");
}

/* ------------------------------------------------------------------ *
 * Ablauf
 * ------------------------------------------------------------------ */

async function main() {
  const args = process.argv.slice(2);
  const offline = args.includes("--offline");
  const wanted = args.filter((argument) => !argument.startsWith("--"));

  const dataDir = path.join(projectRoot, "data");
  const skip =
    /^_|\.(overrides|parsed|report|line-fixups)\.|^geocode-cache|^osm-address|^frankfurt-pdf-liste/u;

  const files = (await fs.readdir(dataDir)).filter(
    (file) => file.endsWith(".json") && !skip.test(file),
  );

  const reports: CityReport[] = [];

  for (const file of files) {
    const seed = await readJson<SeedFile | null>(path.join(dataDir, file), null);
    if (!seed?.city?.slug || !Array.isArray(seed.spots)) continue;
    if (wanted.length > 0 && !wanted.includes(seed.city.slug)) continue;

    const city = germanCities.find((entry) => entry.slug === seed.city.slug);

    const report: CityReport = {
      slug: seed.city.slug,
      name: seed.city.name,
      population: city?.population ?? null,
      source: seed.source,
      spots: seed.spots.length,
      spaces: seed.spots.reduce((sum, spot) => sum + spot.spotCount, 0),
      confirmedByOsm: null,
      findings: [
        ...checkCoordinates(seed),
        ...checkSpread(seed),
        ...checkDuplicates(seed),
        ...checkFields(seed),
      ],
    };

    reports.push(report);
  }

  // Dichte erst bewerten, wenn alle Städte bekannt sind.
  const densities = reports
    .filter((report) => report.population && report.population > 0)
    .map((report) => (report.spaces / report.population!) * 10_000)
    .sort((a, b) => a - b);
  const median = densities[Math.floor(densities.length / 2)] ?? 0;

  for (const report of reports) {
    report.findings.push(...checkDensity(report, median));
  }

  console.log(`${reports.length} Städte geprüft (offline).`);
  const problems = reports.filter((report) =>
    report.findings.some((finding) => finding.level !== "hinweis"),
  );
  console.log(`Mit Befund: ${problems.length}`);

  // Zweite Quelle nur für amtliche Städte – bei OSM-Städten wäre es ein
  // Abgleich mit sich selbst.
  if (!offline) {
    const official = reports.filter((report) => !/OpenStreetMap/iu.test(report.source));
    console.log(`\nAbgleich mit OpenStreetMap für ${official.length} amtliche Städte …`);

    for (const report of official) {
      const seed = await readJson<SeedFile | null>(path.join(dataDir, `${report.slug}.json`), null);
      if (!seed) continue;

      try {
        const result = await crossCheckWithOsm(seed);
        if (result) {
          report.confirmedByOsm = result.confirmed;
          report.findings.push(result.finding);
          console.log(`  ${report.name}: ${result.finding.message}`);
        }
      } catch (error) {
        report.findings.push({
          check: "Abgleich mit OpenStreetMap",
          level: "hinweis",
          message: `Abgleich nicht möglich: ${(error as Error).message.slice(0, 120)}`,
        });
        console.log(`  ${report.name}: Abgleich fehlgeschlagen`);
      }
    }
  }

  const target = path.join(dataDir, "_validierung.md");
  await fs.writeFile(target, renderReport(reports), "utf8");
  console.log(`\nGeschrieben: ${path.relative(process.cwd(), target)}`);
}

await main();
