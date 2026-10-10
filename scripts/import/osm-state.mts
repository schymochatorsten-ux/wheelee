/**
 * Behindertenparkplätze **landesweit** aus OpenStreetMap holen (ToDo 2e.7).
 *
 *     npm run import:osm-state -- saarland
 *     npm run import:osm-state -- --alle
 *     npm run import:osm-state -- saarland --dry
 *
 * **Warum das sein muss.** Der bisherige Weg stellt eine Overpass-Abfrage je
 * Gemeinde. Für 195 Gemeinden ging das gerade noch – bei zwei Minuten pro
 * Stadt. Bei 10.956 Gemeinden wären das rund zwei Wochen Dauerlast auf einem
 * Dienst, den Freiwillige bezahlen. Das wäre schlicht Missbrauch.
 *
 * Landesweit sind es **16 Abfragen für ganz Deutschland** statt 10.956. Der
 * Preis: Die Antwort sagt nicht, zu welcher Gemeinde ein Parkplatz gehört.
 * Deshalb wird je Bundesland zusätzlich die Liste der Gemeindegrenzen geholt
 * (eine zweite Abfrage) und die Zuordnung lokal gerechnet – siehe
 * `assign.mts`.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import type { ParkingSpot } from "../../src/lib/types.js";
import { projectRoot } from "./config.mjs";
import { germanCities, toSlug } from "./german-cities.mjs";
import { assignToMunicipality, type Municipality } from "./assign.mjs";
import { recordCity } from "./status.mjs";

const USER_AGENT = "wheelee-import/0.1 (Behindertenparkplatz-Karte; Kontakt via Repository)";

const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Die Stadtstaaten.
 *
 * Sie haben keine Gemeindeebene – sie **sind** eine Gemeinde. Die Abfrage
 * nach `admin_level=8` findet dort nichts oder, schlimmer, eine
 * Nachbargemeinde: Beim ersten Lauf bekam Seevetal, eine 22.000-Einwohner-
 * Gemeinde südlich von Hamburg, alle 333 Hamburger Parkplätze zugewiesen.
 * Importiert werden sie ohnehin einzeln, und zwar aus amtlicher Quelle.
 */
const STADTSTAATEN = new Set(["Berlin", "Hamburg", "Bremen"]);

/** ISO-Kürzel je Bundesland – eindeutiger als der Name. */
export const BUNDESLAENDER: Record<string, string> = {
  "Baden-Württemberg": "DE-BW",
  Bayern: "DE-BY",
  Berlin: "DE-BE",
  Brandenburg: "DE-BB",
  Bremen: "DE-HB",
  Hamburg: "DE-HH",
  Hessen: "DE-HE",
  "Mecklenburg-Vorpommern": "DE-MV",
  Niedersachsen: "DE-NI",
  "Nordrhein-Westfalen": "DE-NW",
  "Rheinland-Pfalz": "DE-RP",
  Saarland: "DE-SL",
  Sachsen: "DE-SN",
  "Sachsen-Anhalt": "DE-ST",
  "Schleswig-Holstein": "DE-SH",
  Thüringen: "DE-TH",
};

/** Dieselben Tag-Kombinationen wie beim Einzelimport – bewusst identisch. */
const TAG_FILTERS = [
  '["amenity"="parking_space"]["parking_space"~"disabled"]',
  '["amenity"="parking"]["capacity:disabled"]',
  '["amenity"="parking"]["wheelchair"="designated"]',
];

interface OverpassElement {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  bounds?: { minlat: number; minlon: number; maxlat: number; maxlon: number };
  tags?: Record<string, string>;
}

/**
 * Wie oft jeder Spiegel versucht wird.
 *
 * Nicht aus Vorsicht, sondern aus Erfahrung: Dieselbe Abfrage, die eben noch
 * mit HTTP 200 und 52 Ergebnissen durchlief, lieferte eine Minute später auf
 * allen drei Spiegeln 504. Overpass ist launisch, und ein Lauf, der daran
 * scheitert, kostet mehr als ein paar Minuten Warten.
 */
const ROUNDS = 3;

async function overpass(query: string, label: string): Promise<OverpassElement[]> {
  const problems: string[] = [];
  const attempts = Array.from({ length: ROUNDS }, () => OVERPASS_ENDPOINTS).flat();

  for (const [index, endpoint] of attempts.entries()) {
    const host = new URL(endpoint).host;
    // Zwischen den Spiegeln kurz, zwischen den Runden deutlich länger warten.
    if (index > 0) {
      await sleep(index % OVERPASS_ENDPOINTS.length === 0 ? 60_000 : 15_000);
    }

    try {
      console.log(`    ${label} über ${host} …`);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "User-Agent": USER_AGENT },
        body: new URLSearchParams({ data: query }),
        // Landesweite Abfragen dauern; ohne Grenze hängt der Lauf aber ewig.
        signal: AbortSignal.timeout(900_000),
      });

      if (!response.ok) {
        problems.push(`${host}: HTTP ${response.status}`);
        continue;
      }

      const json = (await response.json()) as { elements?: OverpassElement[]; remark?: string };
      if (json.remark) {
        problems.push(`${host}: ${json.remark}`);
        continue;
      }

      const elements = json.elements ?? [];
      /*
       * Ein leeres Ergebnis ist landesweit **immer** verdächtig: Kein
       * Bundesland hat null Behindertenparkplätze und keines null
       * Gemeinden. Anders als beim Einzelimport braucht es hier keine
       * Zweitmeinung – es ist schlicht falsch.
       */
      if (elements.length === 0) {
        problems.push(`${host}: leeres Ergebnis`);
        continue;
      }

      return elements;
    } catch (error) {
      problems.push(`${host}: ${(error as Error).message}`);
    }
  }

  throw new Error(`${label} fehlgeschlagen: ${problems.join("; ")}`);
}

/**
 * Alle Gemeindegrenzen eines Bundeslandes – Ausdehnung und Namen, ohne
 * Geometrie.
 *
 * `out bb tags` und **nicht** `out bb center tags`: Overpass liefert von
 * beiden Geometrieangaben nur eine, und zwar die letzte. Die erste Fassung
 * verlangte Rechteck *und* Mitte, bekam nur die Mitte – und verwarf
 * daraufhin alle 52 Gemeinden des Saarlands, ohne dass ein Fehler gemeldet
 * wurde. Die Mitte wird jetzt aus dem Rechteck gerechnet; für die Zuordnung
 * ist das genau genug und spart eine zweite Abfrage.
 */
async function fetchMunicipalities(iso: string): Promise<Municipality[]> {
  const query = `
[out:json][timeout:600];
area["ISO3166-2"="${iso}"]["admin_level"="4"]->.land;
rel["admin_level"="8"]["boundary"="administrative"](area.land);
out bb tags;
`;

  const elements = await overpass(query, "Gemeindegrenzen");
  const municipalities: Municipality[] = [];

  for (const element of elements) {
    const bounds = element.bounds;
    const name = element.tags?.name;
    if (!bounds || !name) continue;

    municipalities.push({
      ags: element.tags?.["de:amtlicher_gemeindeschluessel"] ?? null,
      name,
      lat: (bounds.minlat + bounds.maxlat) / 2,
      lng: (bounds.minlon + bounds.maxlon) / 2,
      bounds: {
        minLat: bounds.minlat,
        minLng: bounds.minlon,
        maxLat: bounds.maxlat,
        maxLng: bounds.maxlon,
      },
    });
  }

  /*
   * Ein Bundesland ohne Gemeindegrenzen gibt es nicht. Kommt nichts zurück,
   * ist etwas an der Abfrage falsch – dann lieber abbrechen als alle
   * Parkplätze als „nicht zuordenbar" wegzuwerfen.
   */
  if (municipalities.length === 0) {
    throw new Error(
      `Keine Gemeindegrenzen für ${iso} – die Antwort enthielt ${elements.length} Objekte, ` +
        "aber keines mit Rechteck und Namen. Hat sich das Ausgabeformat geändert?",
    );
  }

  return municipalities;
}

function spotQuery(iso: string, filters: readonly string[]): string {
  return `
[out:json][timeout:900];
area["ISO3166-2"="${iso}"]["admin_level"="4"]->.land;
(
${filters.map((filter) => `  nwr${filter}(area.land);`).join("\n")}
);
out center tags;
`;
}

/**
 * Alle Behindertenparkplätze eines Bundeslandes.
 *
 * Erst alle drei Tag-Kombinationen in einer Abfrage – das ist die eine
 * Anfrage, um die es bei 2e.7 geht. Scheitert sie, wird sie zerlegt: Drei
 * kleinere Abfragen sind immer noch unendlich viel besser als eine je
 * Gemeinde. Dass das nötig ist, hat sich beim ersten Probelauf gezeigt;
 * Nordrhein-Westfalen und Bayern sind für eine kombinierte Abfrage zu groß.
 */
async function fetchSpots(iso: string): Promise<OverpassElement[]> {
  try {
    return await overpass(spotQuery(iso, TAG_FILTERS), "Parkplätze");
  } catch (combinedError) {
    console.log("    Kombinierte Abfrage gescheitert, zerlege sie nach Merkmal …");

    const byId = new Map<string, OverpassElement>();
    const problems: string[] = [];

    for (const [index, filter] of TAG_FILTERS.entries()) {
      if (index > 0) await sleep(20_000);
      try {
        for (const element of await overpass(spotQuery(iso, [filter]), `Teil ${index + 1}`)) {
          byId.set(`${element.type}/${element.id}`, element);
        }
      } catch (error) {
        // Ein leerer Teil ist möglich – nicht jedes Merkmal kommt überall vor.
        problems.push((error as Error).message);
      }
    }

    if (byId.size === 0) throw combinedError;
    if (problems.length > 0) {
      console.log(`    ⚠ ${problems.length} von ${TAG_FILTERS.length} Teilabfragen ohne Ergebnis`);
    }
    return [...byId.values()];
  }
}

/** Wie der Einzelimport: `capacity:disabled=no` heißt ausdrücklich „hier keine". */
function readSpotCount(tags: Record<string, string>): number | null {
  const raw = tags["capacity:disabled"];
  if (raw === undefined) {
    return tags.parking_space?.includes("disabled") || tags.wheelchair === "designated" ? 1 : null;
  }
  if (/^(no|none|0)$/iu.test(raw)) return null;
  const parsed = Number.parseInt(raw, 10);
  if (Number.isFinite(parsed) && parsed > 0) return parsed;
  return /^(yes|designated)$/iu.test(raw) ? 1 : null;
}

function toSpot(element: OverpassElement, slug: string, cityName: string): ParkingSpot | null {
  const tags = element.tags ?? {};
  const spotCount = readSpotCount(tags);
  if (spotCount === null) return null;

  const lat = element.lat ?? element.center?.lat;
  const lng = element.lon ?? element.center?.lon;
  if (lat === undefined || lng === undefined) return null;

  const street = tags["addr:street"] ?? null;
  const houseNumber = tags["addr:housenumber"] ?? null;
  const label = tags.name ?? [street, houseNumber].filter(Boolean).join(" ");
  const isLot = tags.amenity === "parking";

  return {
    id: `${slug}-${createHash("sha256")
      .update(`${element.type}/${element.id}`, "utf8")
      .digest("hex")
      .slice(0, 10)}`,
    city: slug,
    label: label.length > 0 ? label : `Behindertenparkplatz ${cityName}`,
    street,
    houseNumber,
    note:
      [
        isLot ? "Parkplatz mit ausgewiesenen Behindertenstellplätzen" : null,
        tags.fee === "yes" ? "gebührenpflichtig" : null,
      ]
        .filter(Boolean)
        .join(" · ") || null,
    timeRestriction: tags.opening_hours ?? null,
    district: tags["addr:suburb"] ?? cityName,
    spotCount,
    lat,
    lng,
    geoAccuracy: element.type === "node" ? "house" : "street",
    source: `OpenStreetMap (${element.type}/${element.id}), ODbL`,
  };
}

/**
 * Vergleichsschlüssel für Gemeindenamen.
 *
 * **Nicht `toSlug` verwenden.** Der streicht Zusätze wie „am Main" oder „im
 * Schönbuch", damit Dateinamen kurz bleiben – als Suchschlüssel ist das
 * verhängnisvoll: „Weil am Rhein" und „Weil im Schönbuch" fielen beide auf
 * „weil" zusammen, und weil nur eine davon im Register steht, galt der
 * Treffer als eindeutig. Ergebnis war eine Datei mit Parkplätzen aus beiden
 * Orten, 157 km auseinander.
 *
 * Hier bleibt jedes Wort erhalten; nur Schreibweise und Zeichensetzung
 * werden vereinheitlicht.
 */
export function nameKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/ä/gu, "ae")
    .replace(/ö/gu, "oe")
    .replace(/ü/gu, "ue")
    .replace(/ß/gu, "ss")
    .replace(/[^a-z0-9]+/gu, " ")
    .trim();
}

/** Wie viele Gemeinden hat ein Bundesland laut amtlichem Verzeichnis? */
async function countMunicipalities(stateName: string): Promise<number> {
  try {
    const raw = await fs.readFile(path.join(projectRoot, "data", "_gemeinden.json"), "utf8");
    const register = JSON.parse(raw) as { gemeinden: { state: string }[] };
    return register.gemeinden.filter((gemeinde) => gemeinde.state === stateName).length;
  } catch {
    return 0;
  }
}

/** Gibt es für diese Gemeinde schon eine Seed-Datei? */
async function hasSeed(slug: string): Promise<boolean> {
  try {
    await fs.access(path.join(projectRoot, "data", `${slug}.json`));
    return true;
  } catch {
    return false;
  }
}

async function importState(stateName: string, dryRun: boolean, overwrite: boolean): Promise<void> {
  const iso = BUNDESLAENDER[stateName];
  if (!iso) throw new Error(`Unbekanntes Bundesland: ${stateName}`);

  console.log(`\n=== ${stateName} (${iso}) ===`);

  if (STADTSTAATEN.has(stateName)) {
    console.log("  Stadtstaat – keine Gemeindeebene, wird einzeln importiert. Übersprungen.");
    return;
  }

  const municipalities = await fetchMunicipalities(iso);
  console.log(`  ${municipalities.length} Gemeindegrenzen`);

  /*
   * Plausibilitätsprüfung gegen das amtliche Verzeichnis.
   *
   * Findet die Abfrage deutlich weniger Gemeinden als es gibt, deckt sie
   * das Land nicht ab – und jeder Parkplatz außerhalb der gefundenen
   * Grenzen landet bei der nächstgelegenen, also irgendwo. Lieber abbrechen
   * als Daten verteilen, die niemand mehr auseinanderhält.
   */
  const erwartet = await countMunicipalities(stateName);
  if (erwartet > 0 && municipalities.length < erwartet * 0.5) {
    throw new Error(
      `Nur ${municipalities.length} Gemeindegrenzen für ${stateName}, erwartet wären rund ` +
        `${erwartet}. Die Abfrage deckt das Land nicht ab – nichts geschrieben.`,
    );
  }
  await sleep(5_000);

  const elements = await fetchSpots(iso);
  console.log(`  ${elements.length} Objekte`);

  /** Nur Gemeinden, die im Register stehen, bekommen eine Seed-Datei. */
  const imRegister = new Map(germanCities.map((city) => [city.slug, city]));

  /*
   * Zuordnung OSM-Gemeinde → Registereintrag, **vorrangig über den
   * amtlichen Gemeindeschlüssel**.
   *
   * Über den Namen allein geht es schief, und zwar sichtbar: „Weil am
   * Rhein" und „Weil der Stadt" ergeben beide den Slug „weil", „Weingarten
   * (Baden)" und „Weingarten (Württemberg)" beide „weingarten". Die erste
   * Fassung dieses Importers hat deren Parkplätze in je eine Datei geworfen
   * – mit 160 km zwischen den Punkten. Das Register löst gleiche Namen
   * bereits auf; hier muss nur der richtige Eintrag gefunden werden.
   */
  const byAgs = new Map(germanCities.filter((city) => city.ags).map((city) => [city.ags, city]));
  const byName = new Map<string, (typeof germanCities)[number][]>();
  for (const city of germanCities) {
    const key = nameKey(city.name);
    const list = byName.get(key);
    if (list) list.push(city);
    else byName.set(key, [city]);
  }

  /** Den Registereintrag zu einer OSM-Gemeinde finden. */
  const findCityFor = (municipality: Municipality) => {
    if (municipality.ags) {
      const treffer = byAgs.get(municipality.ags);
      if (treffer) return treffer;
    }
    const kandidaten = byName.get(nameKey(municipality.name)) ?? [];
    // Bei mehreren gleichnamigen ohne Schlüssel lieber keine Zuordnung als
    // die falsche – sonst landen zwei Städte in derselben Datei.
    return kandidaten.length === 1 ? kandidaten[0] : undefined;
  };

  const byCity = new Map<string, ParkingSpot[]>();
  const counts = { zugeordnet: 0, geraten: 0, ohneRegister: 0, verworfen: 0 };

  for (const element of elements) {
    const lat = element.lat ?? element.center?.lat;
    const lng = element.lon ?? element.center?.lon;
    if (lat === undefined || lng === undefined) {
      counts.verworfen += 1;
      continue;
    }

    const assignment = assignToMunicipality({ lat, lng }, municipalities);
    if (!assignment) {
      counts.verworfen += 1;
      continue;
    }
    const city = findCityFor(assignment.municipality);
    if (!city) {
      counts.ohneRegister += 1;
      continue;
    }

    /*
     * Erst hier zählen, nicht vorher: Eine unsichere Zuordnung zu einer
     * Gemeinde, die ohnehin nicht ins Register kommt, ist folgenlos. Die
     * erste Fassung meldete 1.503 unsichere Treffer für Baden-Württemberg
     * und erweckte damit den Eindruck eines großen Problems – tatsächlich
     * landete davon fast nichts in einer Datei.
     */
    if (assignment.confidence === "geraten") counts.geraten += 1;

    const spot = toSpot(element, city.slug, city.name);
    if (!spot) {
      counts.verworfen += 1;
      continue;
    }

    counts.zugeordnet += 1;
    const list = byCity.get(city.slug);
    if (list) list.push(spot);
    else byCity.set(city.slug, [spot]);
  }

  console.log(
    `  zugeordnet: ${counts.zugeordnet} in ${byCity.size} Gemeinden · ` +
      `ohne Registereintrag: ${counts.ohneRegister} · ` +
      `unsicher zugeordnet: ${counts.geraten} · verworfen: ${counts.verworfen}`,
  );

  if (dryRun) {
    console.log("  (Probelauf – nichts geschrieben)");
    return;
  }

  let geschrieben = 0;
  let uebersprungenVorhanden = 0;

  for (const [slug, spots] of byCity) {
    const city = imRegister.get(slug)!;

    /*
     * **Vorhandene Daten werden nicht überschrieben**, außer mit
     * `--ueberschreiben`.
     *
     * Der Grund ist gemessen, nicht vermutet: Für Saarbrücken liefert der
     * landesweite Lauf 150 Standorte, der Einzelimport 157 – rund 4,5 %
     * weniger. Der Einzelimport schneidet an der **echten** Gemeindegrenze
     * (`map_to_area`), der landesweite nur am umschließenden Rechteck mit
     * nächster Mitte. Grenznahe Parkplätze landen dadurch bei der
     * Nachbargemeinde.
     *
     * Daraus folgt die Arbeitsteilung: Der landesweite Lauf ist für
     * **Breite** da – Gemeinden, zu denen es noch gar nichts gibt. Wo schon
     * Daten liegen, ist der Einzelimport genauer und bleibt.
     */
    if (!overwrite && (await hasSeed(slug))) {
      uebersprungenVorhanden += 1;
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
          city: { slug, name: city.name, center: { lat: lats[middle], lng: lngs[middle] } },
          source: "OpenStreetMap-Mitwirkende (ODbL)",
          license: "Open Database License (ODbL)",
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
     * diese Gemeinden als ungeprüft – und der nächste `--rest`-Lauf fragte
     * sie einzeln noch einmal ab, also genau das, was 2e.7 vermeiden soll.
     */
    await recordCity(slug, {
      status: "fertig",
      usedSource: "OpenStreetMap (landesweit)",
      usedUrl: `Overpass, ${stateName} (${iso})`,
      locations: sorted.length,
      spaces: sorted.reduce((sum, spot) => sum + spot.spotCount, 0),
      message: null,
    });

    geschrieben += 1;
  }

  console.log(
    `  ✅ ${geschrieben} Seed-Dateien geschrieben` +
      (uebersprungenVorhanden > 0
        ? ` · ${uebersprungenVorhanden} übersprungen, weil schon vorhanden ` +
          "(mit --ueberschreiben erzwingen)"
        : ""),
  );
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry");
  const overwrite = args.includes("--ueberschreiben");
  const wanted = args.filter((argument) => !argument.startsWith("--"));

  const namen = args.includes("--alle")
    ? Object.keys(BUNDESLAENDER)
    : Object.keys(BUNDESLAENDER).filter((name) =>
        wanted.some((w) => toSlug(name) === toSlug(w) || name.toLowerCase() === w.toLowerCase()),
      );

  if (namen.length === 0) {
    console.log("Kein Bundesland genannt. Möglich sind:");
    for (const name of Object.keys(BUNDESLAENDER)) console.log(`  ${toSlug(name)}`);
    console.log("\nOder alle auf einmal: npm run import:osm-state -- --alle");
    return;
  }

  /*
   * Ein gescheitertes Bundesland darf den Lauf nicht beenden.
   *
   * Overpass antwortet unzuverlässig; beim ersten Durchlauf brach der Lauf
   * nach zwei von sechzehn Ländern ab, weil Berlin gerade nicht zu haben
   * war – und die vierzehn danach wurden gar nicht erst versucht. Derselbe
   * Grundsatz wie beim Städte-Import: weitermachen, Stand sichern, am Ende
   * berichten.
   */
  const gescheitert: { name: string; grund: string }[] = [];

  for (const [index, name] of namen.entries()) {
    if (index > 0) {
      // Pause zwischen Bundesländern: Die Abfragen sind groß, und der Dienst
      // wird von Freiwilligen bezahlt.
      console.log("\n  … 60 Sekunden Pause");
      await sleep(60_000);
    }

    try {
      await importState(name, dryRun, overwrite);
    } catch (error) {
      const grund = (error as Error).message.slice(0, 160);
      console.log(`  ❌ ${name}: ${grund}`);
      gescheitert.push({ name, grund });
    }
  }

  if (gescheitert.length > 0) {
    console.log(`\n❌ ${gescheitert.length} von ${namen.length} Bundesländern fehlgeschlagen:`);
    for (const eintrag of gescheitert) console.log(`   ${eintrag.name}: ${eintrag.grund}`);
    console.log(
      `\n   Erneut versuchen: npm run import:osm-state -- ${gescheitert
        .map((eintrag) => toSlug(eintrag.name))
        .join(" ")}`,
    );
  }

  if (!dryRun) console.log("\nJetzt `npm run import:streets` und `npm run import:index`.");
}

if (process.argv[1]?.replace(/\\/gu, "/").endsWith("osm-state.mts")) {
  await main();
}
