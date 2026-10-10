import fs from "node:fs";
import path from "node:path";
import { projectRoot } from "./config.mjs";

/**
 * Die Gemeinden, die importiert werden – erzeugt aus dem amtlichen
 * Gemeindeverzeichnis (ToDo 2e.4).
 *
 * Vorher war diese Liste von Hand getippt: 187 Zeilen, Einwohnerzahlen nach
 * Gedächtnis. Der Abgleich mit dem amtlichen Verzeichnis hat **13 Gemeinden
 * über 50.000 Einwohnern gefunden, die schlicht fehlten** – darunter
 * Wilhelmshaven mit 75.745 Einwohnern. Genau so verschwindet eine Stadt
 * unbemerkt, und niemandem fällt es auf.
 *
 * Grundlage ist `data/_gemeinden.json`, erzeugt von
 * `npm run import:gemeinden` aus den Daten des Bundesamts für Kartographie
 * und Geodäsie (Datenlizenz Deutschland – Namensnennung 2.0).
 */

export interface GermanCity {
  /** Rang nach Einwohnerzahl, 1 = größte Stadt. */
  rank: number;
  /** Amtlicher Name, zugleich Suchbegriff für Nominatim und GovData. */
  name: string;
  /** Slug für Dateinamen und IDs. */
  slug: string;
  /** Einwohner laut amtlichem Verzeichnis. */
  population: number;
  /** Bundesland – hilft bei der Suche im richtigen Landesportal. */
  state: string;
  /** Amtlicher Gemeindeschlüssel – eindeutig, auch bei gleichen Namen. */
  ags: string;
}

/**
 * Ab welcher Einwohnerzahl importiert wird.
 *
 * **Das ist der Hebel für die nächste Ausbaustufe** (2e.5): 50.000 ergibt
 * 195 Gemeinden, 20.000 ergibt 706, 10.000 ergibt 1.598. Vor einer Senkung
 * muss 2e.7 gelöst sein – eine Overpass-Abfrage je Gemeinde ist bei
 * tausenden Gemeinden nicht vertretbar.
 */
export const MIN_POPULATION = 50_000;

/**
 * Slugs, die vom abgeleiteten Namen abweichen.
 *
 * **Diese Tabelle darf nicht einfach aufgeräumt werden.** Der Slug steckt im
 * Dateinamen der Seed-Datei *und* in jeder Parkplatz-ID. Ändert er sich,
 * verwaist die Datei und jede spätere Bewertung zeigt ins Leere. Die
 * Schreibweisen sind uneinheitlich, weil sie gewachsen sind – das ist der
 * Preis dafür, dass die vorhandenen Daten gültig bleiben.
 */
const SLUG_OVERRIDES: Record<string, string> = {
  "Frankfurt (Oder)": "frankfurt-oder",
  "Brandenburg an der Havel": "brandenburg-havel",
  "Halle (Saale)": "halle",
  "Oldenburg (Oldb)": "oldenburg",
  "Bad Homburg v.d.Höhe": "bad-homburg",
  "Langenfeld (Rhld.)": "langenfeld",
  "Lahr/Schwarzwald": "lahr",
  "Menden (Sauerland)": "menden",
  "Gronau (Westf.)": "gronau",
  "Neustadt an der Weinstraße": "neustadt-weinstrasse",
};

/** Kürzel der Bundesländer, um gleichnamige Gemeinden zu unterscheiden. */
const STATE_SUFFIX: Record<string, string> = {
  "Baden-Württemberg": "bw",
  Bayern: "by",
  Berlin: "be",
  Brandenburg: "bb",
  Bremen: "hb",
  Hamburg: "hh",
  Hessen: "he",
  "Mecklenburg-Vorpommern": "mv",
  Niedersachsen: "ni",
  "Nordrhein-Westfalen": "nw",
  "Rheinland-Pfalz": "rp",
  Saarland: "sl",
  Sachsen: "sn",
  "Sachsen-Anhalt": "st",
  "Schleswig-Holstein": "sh",
  Thüringen: "th",
};

/** Umlaute und Sonderzeichen in einen Dateinamen überführen. */
export function toSlug(name: string): string {
  return (
    name
      .replace(/\s*\([^)]*\)/gu, "")
      // „am Main", „an der Ruhr", „im Breisgau" gehören nicht in den Slug.
      .replace(/\s+(am|an der|an dem|im|in der|auf dem|bei)\s+.*$/iu, "")
      .replace(/\//gu, " ")
      .toLowerCase()
      .replace(/ä/gu, "ae")
      .replace(/ö/gu, "oe")
      .replace(/ü/gu, "ue")
      .replace(/ß/gu, "ss")
      .replace(/[^a-z0-9]+/gu, "-")
      .replace(/^-+|-+$/gu, "")
  );
}

/**
 * Gemeinden, die **unabhängig von der Einwohnerzahl** aufgenommen werden,
 * weil sie amtliche Daten veröffentlichen (ToDo 2e.1).
 *
 * Der Gedanke hinter der Einwohnergrenze ist, die Arbeit nach Nutzen zu
 * ordnen – nicht, gute Daten liegen zu lassen. Wo eine Gemeinde ihre
 * Behindertenparkplätze selbst veröffentlicht, sind die Angaben besser als
 * alles, was OpenStreetMap bietet, und der Importer kann sie lesen. Sie zu
 * übergehen, nur weil der Ort klein ist, wäre die falsche Reihenfolge.
 *
 * Diese zwölf stammen aus dem Datensatz der TechnologieRegion Karlsruhe
 * (`npm run import:regional`), gefunden über MobiData BW – nicht über
 * GovData, das ihn nicht führt.
 */
const ALWAYS_INCLUDE = new Set([
  "Bretten",
  "Bruchsal",
  "Ettlingen",
  "Gaggenau",
  "Germersheim",
  "Landau in der Pfalz",
  "Rheinstetten",
  "Stutensee",
  "Waghäusel",
]);

interface RegisterFile {
  gemeinden: { ags: string; name: string; state: string; population: number }[];
}

interface RegisterEntry {
  ags: string;
  name: string;
  art?: string;
  state: string;
  population: number;
}

function readRegister(): RegisterEntry[] {
  const file = path.join(projectRoot, "data", "_gemeinden.json");

  let register: RegisterFile;
  try {
    register = JSON.parse(fs.readFileSync(file, "utf8")) as RegisterFile;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      throw new Error(
        "data/_gemeinden.json fehlt. Einmal `npm run import:gemeinden` laufen lassen – " +
          "es lädt das amtliche Gemeindeverzeichnis.",
      );
    }
    throw error;
  }

  return register.gemeinden as RegisterEntry[];
}

/**
 * Alle Gemeinden mit Einwohnern, größte zuerst (ToDo 2e.10).
 *
 * **Warum über alle und nicht über die Importgrenze gefiltert.** Bis hierher
 * kannte das Projekt nur die 204 Gemeinden oberhalb von `MIN_POPULATION`, und
 * `data/_import-status.md` meldete deshalb „Alle Städte abgearbeitet" –
 * zutreffend für die eingestellte Grenze, falsch für das Endziel. Die übrigen
 * Gemeinden standen nicht auf „offen"; **sie kamen in der Datei gar nicht
 * vor.** Eine Gemeinde, die in keiner Liste steht, fehlt niemandem auf.
 *
 * Die Einwohnergrenze ist eine Aussage über **Vorrang**, nicht über
 * Zugehörigkeit. Sie bestimmt weiterhin die Reihenfolge; wer dazugehört,
 * bestimmt das amtliche Verzeichnis.
 *
 * **Ohne Einwohner wird nicht aufgenommen.** Das Verzeichnis führt 204
 * gemeindefreie Gebiete – Seen, Wälder und Truppenübungsplätze wie „Ammersee"
 * oder „Abenberger Wald". 202 davon haben keine Einwohner. Dort gibt es keinen
 * öffentlichen Behindertenparkplatz zu erfassen, keine Verwaltung zu fragen,
 * und die Kennzahl „Stellplätze je Einwohner" wäre eine Division durch null.
 * Die beiden bewohnten (Lohheide, Osterheide) bleiben drin: Dort leben
 * Menschen, und das ist der Maßstab – nicht, ob es eine Gemeindeverwaltung
 * gibt.
 */
function toCities(entries: readonly RegisterEntry[]): GermanCity[] {
  const cities = [...entries]
    .sort((a, b) => b.population - a.population || a.name.localeCompare(b.name, "de-DE"))
    .map((gemeinde, index) => ({
      rank: index + 1,
      name: gemeinde.name,
      slug: SLUG_OVERRIDES[gemeinde.name] ?? toSlug(gemeinde.name),
      population: gemeinde.population,
      state: gemeinde.state,
      ags: gemeinde.ags,
    }));

  /*
   * Zwei Gemeinden mit demselben Slug würden sich gegenseitig die Seed-Datei
   * überschreiben – lautlos, und erst beim Blick auf die Karte fiele auf,
   * dass eine Stadt die Parkplätze einer anderen zeigt. Bei 11.000 Gemeinden
   * sind gleiche Namen der Normalfall: „Neustadt" gibt es ein Dutzend Mal,
   * „Friedberg" in Hessen und in Bayern.
   *
   * **Die größere Gemeinde behält den schlichten Slug.** Sie ist die, die
   * wahrscheinlich schon importiert ist – und ein geänderter Slug würde ihre
   * Seed-Datei verwaisen lassen und jede Parkplatz-ID entwerten. Die
   * kleinere bekommt das Landeskürzel angehängt, notfalls den amtlichen
   * Schlüssel. Da nach Einwohnerzahl absteigend sortiert ist, ergibt sich
   * das von selbst und bleibt zwischen zwei Läufen gleich.
   */
  const bySlug = new Map<string, string>();

  for (const city of cities) {
    if (!bySlug.has(city.slug)) {
      bySlug.set(city.slug, city.name);
      continue;
    }

    const mitLand = `${city.slug}-${STATE_SUFFIX[city.state] ?? toSlug(city.state).slice(0, 2)}`;
    const eindeutig = bySlug.has(mitLand) ? `${city.slug}-${city.ags}` : mitLand;

    city.slug = eindeutig;
    bySlug.set(eindeutig, city.name);
  }

  return cities;
}

/**
 * Alle Gemeinden mit Einwohnern – die vollständige Arbeitsmenge (ToDo 2e.10).
 *
 * **Die Slugs werden hier über den ganzen Bestand vergeben, nicht je Auswahl.**
 * Das ist die eigentliche Bedingung dafür, dass diese Umstellung gefahrlos
 * ist: Täte man es getrennt, könnte dieselbe Gemeinde in der Importliste
 * anders heißen als in der Gesamtliste – und ein Slug steckt im Dateinamen
 * *und* in jeder Parkplatz-ID.
 */
export const allMunicipalities: readonly GermanCity[] = toCities(
  readRegister().filter((gemeinde) => gemeinde.population > 0),
);

/**
 * Die Gemeinden, die **jetzt** importiert werden – gefiltert, nicht neu
 * benannt. Sie tragen dieselben Slugs und Ränge wie in `allMunicipalities`.
 */
export const germanCities: readonly GermanCity[] = allMunicipalities.filter(
  (city) => city.population >= MIN_POPULATION || ALWAYS_INCLUDE.has(city.name),
);

/** Kreisschlüssel: die ersten fünf Stellen des amtlichen Gemeindeschlüssels. */
export function kreisOf(city: Pick<GermanCity, "ags">): string {
  return city.ags.slice(0, 5);
}

export function findCity(slugOrName: string): GermanCity | undefined {
  const needle = slugOrName.toLocaleLowerCase("de-DE");
  return germanCities.find(
    (city) => city.slug === needle || city.name.toLocaleLowerCase("de-DE") === needle,
  );
}
