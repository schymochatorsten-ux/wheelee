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
import { isGenericLabel, spotTitle } from "../../src/lib/parking/display.js";
import { projectRoot } from "./config.mjs";
import { findCity, germanCities } from "./german-cities.mjs";
import { importFromOsm } from "./osm-source.mjs";
import { databaseFile, readGoneReports, type GoneReport } from "./ratings.mjs";
import { pairSpots, type CrossCheckGroups } from "./crosscheck.mjs";

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
 *
 * **Drei Stufen statt zwei** (ToDo 2d.10, 2026-10-10). Vorher begann die
 * Meldung erst bei einem Viertel des Medians – das traf 7 von 205 Städten.
 * Wuppertal mit 66 Standorten auf 358.000 Einwohner (3,8 je 10.000, also
 * knapp die Hälfte des Medians) blieb dadurch unsichtbar, obwohl es der Fall
 * ist, der diesen Punkt überhaupt ausgelöst hat. Die halbe Mediandichte ist
 * jetzt ein **Hinweis**: nennenswert, aber keine Behauptung.
 *
 * Die Stufen sind bewusst verschieden laut. Ein Viertel des Medians zu
 * unterschreiten ist schwer anders als durch eine Lücke zu erklären; die
 * Hälfte kann auch eine kompakte Stadt mit wenig Straßenraum sein. Eine
 * Prüfung, die beides gleich laut meldet, wird abgeschaltet statt gelesen.
 */
function checkDensity(report: CityReport, median: number): Finding[] {
  if (report.population === null || report.population === 0) return [];

  const perTenThousand = (report.spaces / report.population) * 10_000;
  if (perTenThousand >= median * 0.5) return [];

  const level =
    perTenThousand < median * 0.1
      ? "fehler"
      : perTenThousand < median * 0.25
        ? "verdacht"
        : "hinweis";

  /*
   * **Keine Erklärung mitliefern, die nicht belegt ist.** Hier stand
   * „vermutlich eine lückenhafte Quelle, keine lückenhafte Stadt". Der
   * Vergleich über den ganzen Bestand stützt das nicht: Städte mit amtlicher
   * Quelle liegen im Median bei 8,2 Stellplätzen je 10.000 Einwohner, Städte
   * aus OpenStreetMap bei 7,7 – praktisch gleichauf. OSM ist also nicht
   * pauschal die dünnere Quelle, und ein niedriger Wert ist zunächst nur
   * eine Auffälligkeit. Woran es liegt, zeigt erst der Blick auf die Stadt.
   */
  return [
    {
      check: "Auffällig wenige Stellplätze",
      level,
      message:
        `${perTenThousand.toFixed(1)} Stellplätze je 10.000 Einwohner, ` +
        `Median aller Städte ${median.toFixed(1)}. ` +
        "Das kann eine lückenhafte Quelle sein oder eine Stadt mit wenig Straßenraum – " +
        "nachsehen, nicht annehmen.",
    },
  ];
}

/* ------------------------------------------------------------------ *
 * Bewertungen als Prüfhinweis (ToDo 8.9)
 * ------------------------------------------------------------------ */

/** So viele Meldungen aus verschiedenen Konten bringen einen Platz auf die Liste. */
const GONE_MINIMUM = 2;

/**
 * Was die Nutzer:innen gemeldet haben, einem Parkplatz zugeordnet.
 *
 * Die Zuordnung läuft über die Parkplatz-ID, und das ist der Grund, warum die
 * IDs sich aus der Örtlichkeit ableiten und nicht aus der Zeilennummer (2b.1):
 * Eine Meldung von vor einem Jahr muss nach einem Neuimport denselben
 * Parkplatz treffen.
 */
interface GoneMatch extends GoneReport {
  /** `null`, wenn der Bestand diese ID nicht mehr kennt. */
  spot: ParkingSpot | null;
  /** Stadt-Slug, soweit bekannt. */
  city: string | null;
}

/**
 * Befund für eine Stadt: Welche ihrer Standorte sind gemeldet?
 *
 * **Als `verdacht` und nicht als `fehler`.** Zwei Meldungen sind ein Hinweis,
 * kein Beweis: Vielleicht ist der Platz aufgehoben, vielleicht war das
 * Halteverbot zugeparkt, vielleicht stand jemand vor der falschen Hausnummer.
 * Die Bewertungen ändern nichts an den Daten (8.6) – und ein Bericht, der sie
 * als Fehler ausgibt, würde genau dazu verleiten.
 */
function checkReportedGone(slug: string, matches: GoneMatch[]): Finding[] {
  const own = matches.filter((match) => match.city === slug);
  if (own.length === 0) return [];

  return [
    {
      check: "Als aufgehoben gemeldet",
      level: "verdacht",
      message:
        `${own.length} ${own.length === 1 ? "Standort ist" : "Standorte sind"} von mindestens ` +
        `${GONE_MINIMUM} Konten als „existiert nicht mehr" gemeldet. Vor Ort prüfen; ` +
        "die Bewertungen ändern die Daten nicht von selbst.",
      examples: own
        .slice(0, 5)
        .map(
          (match) =>
            `${match.spot ? spotTitle(match.spot) : match.spotId} – ` +
            `${match.goneCount}× aufgehoben, ${match.existsCount}× bestätigt ` +
            `(gewichtet ${match.goneWeight} / ${match.existsWeight})` +
            (match.reasons.includes("lastThreeGone") ? " – die letzten drei Stimmen: aufgehoben" : ""),
        ),
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
 *
 * **Seit dem 2026-10-20 liefert der Abgleich drei Gruppen statt einer Zahl**
 * (ToDo 3.1) und hält das Ergebnis **je Standort** fest. Vorher wurde nur
 * gezählt, wie viele einen Gegenpart haben; welche es sind, fiel weg. Damit
 * konnte die Detailansicht nichts kennzeichnen (3.7), und jede Anzeige hätte
 * den Lauf wiederholen müssen – also eine Overpass-Abfrage je Seitenaufruf.
 */
async function crossCheckWithOsm(
  seed: SeedFile,
): Promise<{ finding: Finding; groups: CrossCheckGroups; osmTotal: number } | null> {
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

  const groups = pairSpots(
    located.map((spot) => ({
      id: spot.id,
      lat: spot.lat,
      lng: spot.lng,
      label: spotTitle(spot),
    })),
    osmSpots
      .filter(
        (spot): spot is ParkingSpot & { lat: number; lng: number } =>
          spot.lat !== null && spot.lng !== null,
      )
      .map((spot) => ({
        id: spot.id,
        lat: spot.lat,
        lng: spot.lng,
        /*
         * **Der Platzhalter darf hier nicht wie ein Name aussehen.** OSM-Objekte
         * ohne eigenen Namen heißen „Behindertenparkplatz <Stadt>", und
         * `spotTitle` kürzt das auf den Stadtnamen – in der Liste stand dann
         * neunmal „Germersheim" untereinander, als wäre das die Bezeichnung
         * des Stellplatzes. Die Auskunft steckt dort in der Koordinate.
         */
        label:
          !spot.street && isGenericLabel(spot.label, seed.city.name)
            ? "(ohne Namen in OSM)"
            : spotTitle(spot),
      })),
    CONFIRM_METERS,
  );

  const share = located.length > 0 ? (groups.confirmed.length / located.length) * 100 : 0;

  return {
    groups,
    osmTotal: osmSpots.length,
    finding: {
      check: "Abgleich mit OpenStreetMap",
      /*
       * **„Nur OSM" ist der einzige Teil, der ein Verdacht ist.** Dort steht
       * ein Stellplatz, den die amtliche Liste nicht führt – entweder neu
       * oder dort vergessen. Eine amtliche Liste gilt als vollständig, und
       * genau deshalb sucht niemand in ihr nach Fehlendem. Die beiden anderen
       * Gruppen sind bloße Hinweise: Bestätigung ist eine gute Nachricht, und
       * „nur amtlich" heißt ungeprüft, nicht falsch.
       */
      level: groups.osmOnly.length > located.length * 0.25 ? "verdacht" : "hinweis",
      message:
        `${groups.confirmed.length} von ${located.length} Standorten (${share.toFixed(0)} %) ` +
        `kennt auch OpenStreetMap; ${groups.officialOnly.length} nur amtlich, ` +
        `${groups.osmOnly.length} nur in OpenStreetMap ` +
        `(${osmSpots.length} OSM-Standorte, Toleranz ${CONFIRM_METERS} m).`,
      examples:
        groups.osmOnly.length > 0
          ? groups.osmOnly
              .slice(0, 5)
              .map(
                (spot) =>
                  `nur OSM: ${spot.label} (${spot.lat.toFixed(5)}, ${spot.lng.toFixed(5)}) – fehlt in der amtlichen Liste?`,
              )
          : undefined,
    },
  };
}

/**
 * Das Ergebnis je Standort, damit die Oberfläche es lesen kann (ToDo 3.7).
 *
 * **Warum eine eigene Datei und nicht ein Feld in der Seed-Datei:** Die
 * Seed-Dateien erzeugt der Importer; ein Prüfergebnis darin wäre beim nächsten
 * Import weg, und [Datenpflege.md](../../Datenpflege.md) verbietet aus
 * demselben Grund das Bearbeiten von Hand. Der Unterstrich im Namen sagt
 * außerdem, was die Datei ist: Arbeitsstand, von einem Skript geschrieben.
 *
 * **Beide Zustände werden geschrieben, nicht nur „bestätigt".** Stünden nur
 * die bestätigten IDs darin, könnte die Oberfläche „geprüft und nicht
 * bestätigt" nicht von „noch nie geprüft" unterscheiden – derselbe Fehler,
 * der im Importstand einmal eine leere Overpass-Antwort als Ergebnis
 * durchgehen ließ (2e.9), und die Unterscheidung ist hier besonders wichtig:
 * „nicht bestätigt" an einen Standort zu schreiben, der nie geprüft wurde,
 * wäre eine Falschaussage über eine Angabe, auf die sich jemand verlässt.
 */
interface ConfirmationFile {
  erzeugtAm: string;
  toleranzMeter: number;
  staedte: Record<
    string,
    {
      geprueftAm: string;
      bestaetigt: number;
      nurAmtlich: number;
      nurOsm: number;
      osmGesamt: number;
      /** Die Standorte, die OSM kennt, die amtliche Liste aber nicht. */
      nurOsmStandorte: { label: string; lat: number; lng: number }[];
    }
  >;
  /** Parkplatz-ID → Zustand. Fehlt eine ID, wurde sie nicht geprüft. */
  standorte: Record<string, "bestaetigt" | "nur_amtlich">;
}

/* ------------------------------------------------------------------ *
 * Bericht
 * ------------------------------------------------------------------ */

const LEVEL_SYMBOL = { fehler: "🔴", verdacht: "🟡", hinweis: "⬜" } as const;

/**
 * Der Abschnitt zu den Bewertungen (ToDo 8.9).
 *
 * **Als eigener Abschnitt und nicht nur als Befund je Stadt** – aus demselben
 * Grund wie bei der dünnen Datenlage: Eine Stadt mit einem einzigen gemeldeten
 * Platz taucht oben womöglich gar nicht auf, und dann stünde die Meldung im
 * Bericht, ohne gelesen zu werden. Hier ist sie eine Arbeitsliste, von der man
 * Zeile für Zeile abarbeiten kann.
 */
function renderGoneSection(matches: GoneMatch[] | null): string[] {
  const lines = ["## Als aufgehoben gemeldet", ""];

  /*
   * **„Nicht geprüft" ist etwas anderes als „nichts gemeldet"**, und das muss
   * im Bericht stehen. Wer ihn auf seinem Rechner erzeugt, hat die Datenbank
   * des Betriebs nicht – ein stillschweigend leerer Abschnitt läse sich dort
   * als „niemand hat etwas gemeldet", und das wäre eine Falschaussage über
   * Daten, die man gar nicht angesehen hat.
   */
  if (matches === null) {
    lines.push(
      "**Nicht geprüft:** Es liegt keine Datenbank vor " +
        `(erwartet unter \`${path.relative(projectRoot, databaseFile())}\`).`,
      "",
      "Die Bewertungen entstehen im Betrieb und liegen auf dem NAS. Dieser",
      "Abschnitt bleibt leer, bis der Bericht dort erzeugt wird oder eine Kopie",
      'der Datenbank vorliegt – „nichts gemeldet" wäre hier eine Behauptung',
      "über Daten, die niemand angesehen hat.",
      "",
    );
    return lines;
  }

  if (matches.length === 0) {
    lines.push(
      `Geprüft, nichts gefunden: Kein Parkplatz ist von ${GONE_MINIMUM} oder mehr Konten ` +
        'als „existiert nicht mehr" gemeldet.',
      "",
    );
    return lines;
  }

  lines.push(
    `${matches.length} ${matches.length === 1 ? "Parkplatz ist" : "Parkplätze sind"} von ` +
      `mindestens ${GONE_MINIMUM} Konten als aufgehoben gemeldet.`,
    "",
    "**Die Bewertungen ändern die Daten nicht** (ToDo 8.6) – das ist eine Liste",
    'zum Nachsehen. Die Spalte „bestätigt" gehört dazu: Drei Meldungen bei null',
    "Bestätigungen sind eine andere Lage als drei bei zwanzig.",
    "",
    "„Gewichtet“ (ToDo 11.6): ältere Stimmen zählen weniger (nach zwei Jahren ein",
    "Viertel), Konten, die oft mit den anderen übereinstimmen, bis doppelt. Die",
    "rohen Zähler bleiben daneben stehen. Das ordnet nur ein – es ändert keine Daten.",
    "",
    "| Parkplatz | Stadt | aufgehoben | bestätigt | gewichtet (auf./best.) | Grund | zuletzt gemeldet |",
    "| --- | --- | ---: | ---: | ---: | --- | --- |",
  );

  for (const match of matches) {
    const name = match.spot ? spotTitle(match.spot) : `${match.spotId} (nicht im Bestand)`;
    const reason = match.reasons.includes("lastThreeGone")
      ? "die letzten drei Stimmen: aufgehoben"
      : `${match.goneCount} Meldungen`;
    lines.push(
      `| ${name} | ${match.city ?? "–"} | ${match.goneCount} | ${match.existsCount} | ` +
        `${match.goneWeight} / ${match.existsWeight} | ${reason} | ` +
        `${match.lastGoneAt?.slice(0, 10) ?? "–"} |`,
    );
  }

  /*
   * Ein gemeldeter Parkplatz, den der Bestand nicht mehr kennt, ist **kein
   * Fehler, sondern die Bestätigung der Meldung**: Der nächste Import hat ihn
   * nicht mehr geliefert. Er bleibt deshalb in der Liste stehen, nur eben
   * benannt – ihn herauszufiltern hieße, die beste Nachricht zu verschweigen,
   * die diese Liste haben kann.
   */
  const verschwunden = matches.filter((match) => match.spot === null).length;
  if (verschwunden > 0) {
    lines.push(
      "",
      `Bei ${verschwunden} davon kennt der Bestand die ID nicht mehr – diese Meldungen ` +
        "haben sich mit dem letzten Import bestätigt.",
    );
  }

  lines.push("");
  return lines;
}

/**
 * Der Abschnitt zum Kreuzvergleich (ToDo 3.1).
 *
 * **Er zeigt den gespeicherten Stand samt Datum, auch im Offline-Lauf.** Das
 * ist der Unterschied zur Spalte in „Alle Städte", die nur den aktuellen Lauf
 * kennt: Ein Abgleich vom letzten Monat ist eine Auskunft – „nicht geprüft"
 * wäre an dieser Stelle falsch, denn geprüft wurde ja.
 */
function renderCrossCheckSection(stored: ConfirmationFile): string[] {
  const slugs = Object.keys(stored.staedte);
  if (slugs.length === 0) {
    return [
      "## Abgleich mit OpenStreetMap",
      "",
      "**Noch nicht gelaufen.** `npm run validate` **mit** Netzzugriff holt für",
      "jede amtliche Stadt die OSM-Standorte und paart sie. Ohne diesen Lauf gibt",
      "es keine bestätigten Standorte – und `data/_bestaetigt.json`, aus dem die",
      "Detailansicht die Kennzeichnung liest, bleibt leer.",
      "",
    ];
  }

  const lines = [
    "## Abgleich mit OpenStreetMap",
    "",
    `Stand der Datei \`data/_bestaetigt.json\`: ${stored.erzeugtAm}, Toleranz ${stored.toleranzMeter} m.`,
    "",
    "**Drei Gruppen, und sie bedeuten Verschiedenes:**",
    "",
    "- **bestätigt** – beide Quellen kennen den Standort. Die verlässlichste Angabe im Bestand.",
    "- **nur amtlich** – in OpenStreetMap nicht erfasst. Kein Fehler, nur ungeprüft.",
    "- **nur OSM** – fehlt in der amtlichen Liste. **Das ist die interessante Gruppe:** entweder neu hinzugekommen oder dort vergessen. Eine amtliche Liste gilt als vollständig, und genau deshalb sucht niemand in ihr nach Fehlendem.",
    "",
    "| Stadt | bestätigt | nur amtlich | nur OSM | OSM gesamt | geprüft am |",
    "| --- | ---: | ---: | ---: | ---: | --- |",
  ];

  for (const slug of slugs.sort((a, b) => a.localeCompare(b, "de-DE"))) {
    const entry = stored.staedte[slug];
    lines.push(
      `| ${slug} | ${entry.bestaetigt} | ${entry.nurAmtlich} | ${entry.nurOsm} | ` +
        `${entry.osmGesamt} | ${entry.geprueftAm} |`,
    );
  }

  const nurOsm = slugs.flatMap((slug) =>
    stored.staedte[slug].nurOsmStandorte.map((spot) => ({ slug, ...spot })),
  );

  if (nurOsm.length > 0) {
    lines.push(
      "",
      `### Nur in OpenStreetMap: ${nurOsm.length} Standorte`,
      "",
      "Für jeden gilt die Frage: neu entstanden oder in der amtlichen Liste",
      "vergessen? Das unterscheidet nur der Blick vor Ort oder eine Anfrage bei",
      "der Stadt – und beides lohnt sich, weil hier ein Stellplatz steht, den die",
      "App aus der amtlichen Quelle nicht kennt.",
      "",
      "| Stadt | Bezeichnung | Lage |",
      "| --- | --- | --- |",
    );

    // Nicht alle: Die Liste soll lesbar bleiben. Die vollständige steht in
    // `_bestaetigt.json`, und darauf verweist die Zeile darunter.
    for (const spot of nurOsm.slice(0, 40)) {
      lines.push(
        `| ${spot.slug} | ${spot.label} | ${spot.lat.toFixed(5)}, ${spot.lng.toFixed(5)} |`,
      );
    }
    if (nurOsm.length > 40) {
      lines.push("", `Weitere ${nurOsm.length - 40} in \`data/_bestaetigt.json\`.`);
    }
  }

  lines.push("");
  return lines;
}

function renderReport(
  reports: CityReport[],
  densityMedian: number,
  goneMatches: GoneMatch[] | null,
  confirmations: ConfirmationFile,
): string {
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

  /*
   * Eigener Abschnitt für die dünne Datenlage (ToDo 2d.10).
   *
   * Warum nicht einfach als Befund bei der jeweiligen Stadt: Städte, deren
   * einziger Befund ein Hinweis ist, erscheinen oben gar nicht – `withFindings`
   * filtert sie heraus. Ein Hinweis allein wäre also folgenlos geblieben, und
   * das ist schlimmer als keine Prüfung: Er stünde im Code und niemand sähe
   * ihn je.
   *
   * Als eigene Liste erfüllt er seinen Zweck: Er drängt sich nicht zwischen
   * die echten Verdachtsfälle, ist aber da, wenn jemand die Frage stellt
   * „wo lohnt sich das Nachsehen?" – und er ist eine **Liste**, keine
   * einzelne Stadt. Der Punkt begann mit „etwa Wuppertal"; so etwas von Hand
   * zu sammeln ist die Arbeit, die ein Bericht abnehmen soll.
   */
  const thin = reports
    .filter((report) => report.population && report.population > 0)
    .map((report) => ({ report, density: (report.spaces / report.population!) * 10_000 }))
    .filter((entry) => entry.density < densityMedian * 0.5)
    .sort((a, b) => a.density - b.density);

  if (thin.length > 0) {
    /*
     * Die beiden Vergleichswerte werden **gerechnet, nicht hingeschrieben.**
     * Sie standen hier zuerst als feste Zahlen im Text – in einem erzeugten
     * Bericht ist das eine Behauptung, die beim nächsten Import still falsch
     * wird und trotzdem gelesen und geglaubt wird.
     */
    const medianOf = (entries: CityReport[]) => {
      const values = entries
        .filter((report) => report.population && report.population > 0)
        .map((report) => (report.spaces / report.population!) * 10_000)
        .sort((a, b) => a - b);
      return values.length > 0 ? (values[Math.floor(values.length / 2)] ?? 0) : 0;
    };
    const isOsm = (report: CityReport) => /OpenStreetMap/iu.test(report.source);
    const medianOfficial = medianOf(reports.filter((report) => !isOsm(report)));
    const medianOsm = medianOf(reports.filter(isOsm));

    lines.push("## Auffällig dünne Datenlage", "");
    lines.push(
      `${thin.length} Städte liegen unter der halben Mediandichte ` +
        `(${densityMedian.toFixed(1)} Stellplätze je 10.000 Einwohner).`,
      "",
      "Das ist **kein Fehler, sondern eine Rangliste für das Nachsehen.** Ein",
      "niedriger Wert kann eine lückenhafte Quelle sein oder eine kompakte Stadt",
      "mit wenig Straßenraum.",
      "",
      "Eine pauschale Erklärung gibt der Bestand nicht her: Städte mit amtlicher " +
        `Quelle liegen im Median bei ${medianOfficial.toFixed(1)}, Städte aus ` +
        `OpenStreetMap bei ${medianOsm.toFixed(1)} Stellplätzen je 10.000 Einwohner. ` +
        "OpenStreetMap ist also nicht grundsätzlich die dünnere Quelle – woran es " +
        "bei einer einzelnen Stadt liegt, zeigt erst der Blick auf sie.",
      "",
      "| Stadt | je 10.000 Einw. | Einwohner | Standorte | Quelle |",
      "| --- | ---: | ---: | ---: | --- |",
    );

    for (const { report, density } of thin) {
      const kind = /OpenStreetMap/iu.test(report.source) ? "OpenStreetMap" : "amtlich";
      lines.push(
        `| ${report.name} | ${density.toFixed(1)} | ` +
          `${report.population!.toLocaleString("de-DE")} | ${report.spots} | ${kind} |`,
      );
    }
    lines.push("");
  }

  lines.push(...renderCrossCheckSection(confirmations));
  lines.push(...renderGoneSection(goneMatches));

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

  /**
   * Parkplatz-ID → Standort, über **alle** Seed-Dateien.
   *
   * Bewusst auch dann vollständig, wenn nur eine Stadt geprüft wird: Eine
   * Meldung trägt nur die ID, und ohne den ganzen Bestand wüsste das Skript
   * nicht, ob eine unbekannte ID zu einer anderen Stadt gehört oder gar nicht
   * mehr existiert. Das ist der Unterschied zwischen „nicht zuständig" und
   * „verschwunden", und er steht im Bericht.
   */
  const spotIndex = new Map<string, { spot: ParkingSpot; city: string }>();

  for (const file of files) {
    const seed = await readJson<SeedFile | null>(path.join(dataDir, file), null);
    if (!seed?.city?.slug || !Array.isArray(seed.spots)) continue;

    for (const spot of seed.spots) spotIndex.set(spot.id, { spot, city: seed.city.slug });

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

  /*
   * Bewertungen einbeziehen (ToDo 8.9).
   *
   * Das ist der Schritt, der aus Bewertungen Datenpflege macht: Bis hierher
   * lagen die Meldungen in der Datenbank, und wer den Bericht las, erfuhr
   * nichts davon. Gelesen wird **nur**; `readGoneReports` öffnet die Datei
   * ausdrücklich read-only und legt sie nicht an.
   */
  const rawGone = readGoneReports(GONE_MINIMUM);

  let goneMatches: GoneMatch[] | null = null;
  if (rawGone !== null) {
    const all = rawGone.map((report) => {
      const found = spotIndex.get(report.spotId);
      return { ...report, spot: found?.spot ?? null, city: found?.city ?? null };
    });

    /*
     * Bei gesetztem Städtefilter nur die gewünschten Städte. Eine Meldung zu
     * einer ID, die der Bestand gar nicht kennt, lässt sich keiner Stadt
     * zuordnen – sie erscheint deshalb nur im vollständigen Lauf, wo sie auch
     * jemanden erreicht. Sie in einem gefilterten Bericht aufzuführen hieße,
     * sie der falschen Stadt anzuhängen.
     */
    goneMatches =
      wanted.length > 0 ? all.filter((match) => wanted.includes(match.city ?? "")) : all;

    for (const report of reports) {
      report.findings.push(...checkReportedGone(report.slug, goneMatches));
    }

    console.log(
      `Bewertungen gelesen: ${goneMatches.length} Parkplätze mit ${GONE_MINIMUM}+ Meldungen.`,
    );
  } else {
    console.log(
      `Keine Datenbank unter ${path.relative(projectRoot, databaseFile())} – ` +
        "Bewertungen nicht geprüft (nicht: nichts gemeldet).",
    );
  }

  console.log(`${reports.length} Städte geprüft (offline).`);
  const problems = reports.filter((report) =>
    report.findings.some((finding) => finding.level !== "hinweis"),
  );
  console.log(`Mit Befund: ${problems.length}`);

  /*
   * Der vorhandene Stand wird **geladen und ergänzt, nicht ersetzt.** Ein
   * Lauf für eine einzelne Stadt (`npm run validate -- koeln`) darf das
   * Ergebnis der übrigen nicht löschen – sonst stünden in der Oberfläche
   * plötzlich 22 Städte als „nie geprüft" da, weil jemand eine einzelne
   * nachgesehen hat. Geladen wird auch im Offline-Lauf: Der Bericht soll den
   * letzten Abgleich samt Datum zeigen und nicht „nicht geprüft" behaupten.
   */
  const confirmationPath = path.join(dataDir, "_bestaetigt.json");
  const stored = await readJson<ConfirmationFile>(confirmationPath, {
    erzeugtAm: new Date().toISOString().slice(0, 10),
    toleranzMeter: CONFIRM_METERS,
    staedte: {},
    standorte: {},
  });

  // Zweite Quelle nur für amtliche Städte – bei OSM-Städten wäre es ein
  // Abgleich mit sich selbst.
  if (!offline) {
    const official = reports.filter((report) => !/OpenStreetMap/iu.test(report.source));
    console.log(`\nAbgleich mit OpenStreetMap für ${official.length} amtliche Städte …`);

    let changed = false;

    for (const report of official) {
      const seed = await readJson<SeedFile | null>(path.join(dataDir, `${report.slug}.json`), null);
      if (!seed) continue;

      try {
        const result = await crossCheckWithOsm(seed);
        if (result) {
          report.confirmedByOsm = result.groups.confirmed.length;
          report.findings.push(result.finding);
          console.log(`  ${report.name}: ${result.finding.message}`);

          // Alte Einträge dieser Stadt verwerfen, damit ein Standort, den es
          // nicht mehr gibt, nicht als bestätigt stehen bleibt.
          for (const id of Object.keys(stored.standorte)) {
            if (id.startsWith(`${report.slug}-`)) delete stored.standorte[id];
          }

          for (const id of result.groups.confirmed) stored.standorte[id] = "bestaetigt";
          for (const id of result.groups.officialOnly) stored.standorte[id] = "nur_amtlich";

          stored.staedte[report.slug] = {
            geprueftAm: new Date().toISOString().slice(0, 10),
            bestaetigt: result.groups.confirmed.length,
            nurAmtlich: result.groups.officialOnly.length,
            nurOsm: result.groups.osmOnly.length,
            osmGesamt: result.osmTotal,
            nurOsmStandorte: result.groups.osmOnly.map((spot) => ({
              label: spot.label,
              lat: spot.lat,
              lng: spot.lng,
            })),
          };
          changed = true;
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

    /*
     * Nur schreiben, wenn wirklich etwas abgeglichen wurde. Ein Lauf, in dem
     * jede Abfrage scheitert, soll den vorhandenen Stand nicht mit einem
     * frischen Datum versehen – das sähe aus wie ein erfolgreicher Lauf.
     */
    if (changed) {
      stored.erzeugtAm = new Date().toISOString().slice(0, 10);
      stored.toleranzMeter = CONFIRM_METERS;
      await fs.writeFile(confirmationPath, `${JSON.stringify(stored, null, 2)}\n`, "utf8");
      console.log(
        `\nGeschrieben: ${path.relative(process.cwd(), confirmationPath)} ` +
          `(${Object.keys(stored.standorte).length} Standorte, ${Object.keys(stored.staedte).length} Städte)`,
      );
    }
  }

  const target = path.join(dataDir, "_validierung.md");
  /*
   * Die Spalte „von OSM bestätigt" aus dem gespeicherten Stand füllen, wo
   * dieser Lauf nicht abgeglichen hat. Sonst stünde im Offline-Bericht „nicht
   * geprüft" an einer Stadt, die geprüft ist – und das ist die eine Aussage,
   * die dieser Bericht nicht machen darf: Er unterscheidet an jeder anderen
   * Stelle sorgfältig zwischen „geprüft, nichts gefunden" und „nicht
   * geprüft". Wann geprüft wurde, nennt der Abschnitt darüber je Stadt.
   */
  for (const report of reports) {
    if (report.confirmedByOsm === null && stored.staedte[report.slug]) {
      report.confirmedByOsm = stored.staedte[report.slug].bestaetigt;
    }
  }

  await fs.writeFile(target, renderReport(reports, median, goneMatches, stored), "utf8");
  console.log(`\nGeschrieben: ${path.relative(process.cwd(), target)}`);
}

await main();
