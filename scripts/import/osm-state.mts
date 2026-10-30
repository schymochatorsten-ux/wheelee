/**
 * Behindertenparkplätze **landesweit** aus OpenStreetMap holen (ToDo 2e.7).
 *
 *     npm run import:osm-state -- saarland
 *     npm run import:osm-state -- --alle
 *     npm run import:osm-state -- saarland --dry
 *     npm run import:osm-state -- saarland --pbf saarland-latest.osm.pbf --dry
 *
 * Mit `--pbf` liest der Lauf einen Auszug von Geofabrik statt Overpass zu
 * fragen (ToDo 2e.11, Leser: [`pbf.mts`](pbf.mts)); er gilt für genau ein Land.
 *
 * **Warum das sein muss.** Der bisherige Weg stellt eine Overpass-Abfrage je
 * Gemeinde. Für 195 Gemeinden ging das gerade noch – bei zwei Minuten pro
 * Stadt. Bei 10.956 Gemeinden wären das rund zwei Wochen Dauerlast auf einem
 * Dienst, den Freiwillige bezahlen. Das wäre schlicht Missbrauch.
 *
 * Landesweit sind es **16 Abfragen für ganz Deutschland** statt 10.956. Der
 * Preis: Die Antwort sagt nicht, zu welcher Gemeinde ein Parkplatz gehört.
 *
 * **Die Zuordnung entscheidet die amtliche Grenzfläche** aus VG250-EW –
 * [`grenzen.mts`](grenzen.mts). Die erste Fassung holte dafür je Bundesland
 * die Gemeinderechtecke aus OpenStreetMap und nahm darin die nächstgelegene
 * Mitte. Das ging nachweislich schief: In dicht besiedelten Gegenden
 * überlappen die Rechtecke, und dabei gewinnt systematisch die kleinere
 * Gemeinde. Herdecke bekam so 109 Standorte bis hinauf nach Witten, und die
 * Daten für 473 Gemeinden mussten wieder entfernt werden. Seither entscheidet
 * ein Punkt-in-Fläche-Test; das Rechteck sortiert nur noch vor.
 *
 * Nebeneffekt: Es ist jetzt **eine** Abfrage je Bundesland statt zwei, und
 * die Zuordnung zum Register läuft über den amtlichen Gemeindeschlüssel statt
 * über Namen – „Friedberg (Hessen)" und „Friedberg (Bayern)" bekamen zuvor
 * dieselben 123 Standorte.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import type { ParkingSpot } from "../../src/lib/types.js";
import { projectRoot } from "./config.mjs";
import { allMunicipalities, germanCities, toSlug } from "./german-cities.mjs";
import { loadGrenzen, type Grenzen } from "./grenzen.mjs";
import { recordCity } from "./status.mjs";
import { extractDisabledParking } from "./pbf.mjs";

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
 *
 * **Ob die Antwort vollständig ist, gehört zum Ergebnis.** Scheitert eine der
 * Teilabfragen, fehlen Parkplätze – und zwar ohne dass es den Daten ansehen
 * könnte: Am 2026-10-11 lieferten unter Last 2 von 3 Teilen nichts, und übrig
 * blieben 7 Objekte für ganz Nordrhein-Westfalen statt 14.025. Geschrieben
 * hätte dieser Lauf Seed-Dateien mit einem Standort und sie als „fertig"
 * vermerkt; die Gemeinde wäre damit auf Dauer erledigt gewesen. Deshalb wird
 * ein unvollständiger Lauf ausgewertet, aber nicht gespeichert.
 */
async function fetchSpots(
  iso: string,
): Promise<{ elements: OverpassElement[]; vollstaendig: boolean }> {
  try {
    return {
      elements: await overpass(spotQuery(iso, TAG_FILTERS), "Parkplätze"),
      vollstaendig: true,
    };
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
        /*
         * Overpass meldet Überlast auch als leere Antwort mit HTTP 200;
         * `overpass` wirft deshalb schon bei leerem Ergebnis. Ein
         * gescheiterter Teil heißt hier also: Dieses Merkmal ist ungeprüft,
         * nicht „kommt nicht vor".
         */
        problems.push((error as Error).message);
      }
    }

    if (byId.size === 0) throw combinedError;
    if (problems.length > 0) {
      console.log(
        `    ⚠ ${problems.length} von ${TAG_FILTERS.length} Teilabfragen ohne Ergebnis – ` +
          "der Lauf ist unvollständig",
      );
    }
    return { elements: [...byId.values()], vollstaendig: problems.length === 0 };
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
 * Stellplätze je 10.000 Einwohner melden – die Kennzahl aus
 * [CLAUDE.md](../../CLAUDE.md), die den Zuordnungsfehler gefunden hat.
 *
 * Sie steht hier und nicht erst in `validate.mts`, weil sie **vor** dem
 * Schreiben gebraucht wird. Herdecke lag bei 86 statt bei 7, und das war
 * nirgends zu sehen, bis 473 Gemeinden geschrieben waren und wieder entfernt
 * werden mussten. Ein Probelauf soll die Zahl von selbst zeigen.
 */
/** Ausdehnung der Standorte einer Gemeinde in Kilometern (Diagonale des umschließenden Rechtecks). */
export function spreadKm(spots: readonly { lat: number | null; lng: number | null }[]): number {
  const located = spots.filter((s) => s.lat !== null && s.lng !== null);
  if (located.length < 2) return 0;
  const lats = located.map((s) => s.lat!);
  const lngs = located.map((s) => s.lng!);
  const midLat = (Math.min(...lats) + Math.max(...lats)) / 2;
  const dy = (Math.max(...lats) - Math.min(...lats)) * 110.54;
  const dx = (Math.max(...lngs) - Math.min(...lngs)) * 111.32 * Math.cos((midLat * Math.PI) / 180);
  return Math.hypot(dx, dy);
}

/**
 * Die Prüfungen aus CLAUDE.md, vor dem Schreiben: Dichte über dem Dreifachen des
 * Medians und Streuung über 15 km. **Gibt die Gemeinden an der Reihe zurück,
 * die eine der beiden Prüfungen nicht bestehen** – sie werden nicht geschrieben,
 * sondern zum Ansehen aufgeführt (D-07: jede Stufe erst nach den Prüfungen). Ein
 * Befund ist kein Beweis (Witten, Hattingen: dort ist OSM einfach dichter
 * erfasst), aber „lieber kein Import als ein falscher“.
 */
function dichteMelden(
  byCity: Map<string, ParkingSpot[]>,
  imRegister: Map<string, { name: string; population: number }>,
  anDerReihe: ReadonlySet<string> = new Set(),
): Set<string> {
  const dichten: { slug: string; name: string; wert: number; standorte: number }[] = [];
  const flagged = new Set<string>();

  for (const [slug, spots] of byCity) {
    const city = imRegister.get(slug);
    if (!city || city.population <= 0) continue;
    const plaetze = spots.reduce((sum, spot) => sum + (spot.spotCount ?? 1), 0);
    dichten.push({
      slug,
      name: city.name,
      wert: (plaetze / city.population) * 10_000,
      standorte: spots.length,
    });
  }

  if (dichten.length === 0) return flagged;

  const sortiert = [...dichten].sort((a, b) => a.wert - b.wert);
  const median = sortiert[Math.floor(sortiert.length / 2)].wert;
  const auffaellig = dichten.filter((eintrag) => eintrag.wert > median * 3);

  console.log(`  Stellplätze je 10.000 Einwohner: Median ${median.toFixed(1)}`);

  if (auffaellig.length === 0) {
    console.log("  keine Gemeinde über dem Dreifachen des Medians");
  } else {
    console.log(
      `  ⚠️ ${auffaellig.length} Gemeinden über dem Dreifachen (alle Größen; Kleinstgemeinden ` +
        "mit ein, zwei Standorten rutschen leicht darüber):",
    );
    for (const eintrag of auffaellig.sort((a, b) => b.wert - a.wert).slice(0, 5)) {
      console.log(
        `     ${eintrag.name}: ${eintrag.wert.toFixed(1)} (${eintrag.standorte} Standorte)`,
      );
    }
  }

  // Für die Gemeinden an der Reihe zählt es: Sie würden geschrieben.
  for (const eintrag of dichten) {
    if (anDerReihe.has(eintrag.slug) && eintrag.wert > median * 3) flagged.add(eintrag.slug);
  }
  const weit: { slug: string; name: string; km: number }[] = [];
  for (const [slug, spots] of byCity) {
    if (!anDerReihe.has(slug)) continue;
    const km = spreadKm(spots);
    if (km > 15) {
      flagged.add(slug);
      weit.push({ slug, name: imRegister.get(slug)?.name ?? slug, km });
    }
  }

  if (weit.length > 0) {
    console.log(`  ⚠️ ${weit.length} Gemeinden an der Reihe mit Streuung über 15 km (Zuordnung prüfen):`);
    for (const eintrag of weit.sort((a, b) => b.km - a.km).slice(0, 8)) {
      console.log(`     ${eintrag.name}: ${eintrag.km.toFixed(1)} km`);
    }
  }
  const dicht = dichten
    .filter((e) => anDerReihe.has(e.slug) && e.wert > median * 3)
    .sort((a, b) => b.wert - a.wert);
  if (dicht.length > 0) {
    console.log(`  ⚠️ ${dicht.length} Gemeinden an der Reihe über dem Dreifachen (werden nicht geschrieben):`);
    for (const e of dicht.slice(0, 8)) {
      console.log(`     ${e.name}: ${e.wert.toFixed(1)} (${e.standorte} Standorte)`);
    }
  }
  return flagged;
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

async function importState(
  stateName: string,
  grenzen: Grenzen,
  dryRun: boolean,
  overwrite: boolean,
  pbfFile: string | null = null,
): Promise<void> {
  const iso = BUNDESLAENDER[stateName];
  if (!iso) throw new Error(`Unbekanntes Bundesland: ${stateName}`);

  console.log(`\n=== ${stateName} (${iso}) ===`);

  if (STADTSTAATEN.has(stateName)) {
    console.log("  Stadtstaat – keine Gemeindeebene, wird einzeln importiert. Übersprungen.");
    return;
  }

  /*
   * Mit `--pbf` kommen die Objekte aus einem Geofabrik-Auszug statt von
   * Overpass (ToDo 2e.11): keine Last auf dem Gemeinschaftsdienst, und die Datei
   * ist vollständig oder sie bricht beim Lesen ab – eine halbe Antwort wie bei
   * Overpass unter Last gibt es hier nicht. Alles danach (Zuordnung über die
   * Grenzflächen, Kennzahl, Schreiben) ist derselbe Weg.
   */
  let elements: OverpassElement[];
  let vollstaendig: boolean;
  if (pbfFile) {
    const extract = extractDisabledParking(pbfFile);
    elements = extract.elements;
    vollstaendig = true;
    console.log(`  ${elements.length} Objekte aus ${path.basename(pbfFile)}`);
    if (extract.waysWithoutNodes > 0) {
      console.log(`  ⚠ ${extract.waysWithoutNodes} Wege ohne Knoten im Auszug (Rand) übersprungen`);
    }
  } else {
    ({ elements, vollstaendig } = await fetchSpots(iso));
    console.log(`  ${elements.length} Objekte`);
  }

  /** Nur Gemeinden oberhalb der Einwohnergrenze bekommen eine Seed-Datei. */
  const anDerReihe = new Map(germanCities.map((city) => [city.slug, city]));

  /*
   * Zuordnung Grenzfläche → Registereintrag über den **amtlichen
   * Gemeindeschlüssel**, und nur darüber.
   *
   * Grenzen und Register kommen aus derselben Auslieferung des BKG; der
   * Schlüssel passt deshalb immer. Über den Namen ging es schief, und zwar
   * sichtbar: „Weil am Rhein" und „Weil der Stadt" ergeben beide den Slug
   * „weil", „Friedberg (Hessen)" und „Friedberg (Bayern)" erhielten
   * dieselben 123 Standorte – 300 km auseinander.
   *
   * Zugeordnet wird gegen **alle** Gemeinden, nicht nur gegen die oberhalb
   * der Einwohnergrenze. Geschrieben wird nur für die, die an der Reihe sind
   * – aber die Kennzahl unten soll auch die anderen zeigen. Genau dort saß
   * der Fehler: Herdecke (22.772 Einwohner) stand nie zur Einfuhr an und
   * fehlte deshalb in jeder Auswertung, während es die Standorte seiner
   * Nachbarn sammelte.
   */
  const byAgs = new Map(allMunicipalities.map((city) => [city.ags, city]));

  const byCity = new Map<string, ParkingSpot[]>();
  const counts = { zugeordnet: 0, ausserhalb: 0, ohneGemeinde: 0, verworfen: 0 };

  for (const element of elements) {
    const lat = element.lat ?? element.center?.lat;
    const lng = element.lon ?? element.center?.lon;
    if (lat === undefined || lng === undefined) {
      counts.verworfen += 1;
      continue;
    }

    /*
     * Keine Fläche enthält den Punkt: Dann liegt er außerhalb Deutschlands
     * oder auf einer Brücke über der Grenze. Das ist eine Antwort und wird
     * so gezählt – geraten wird nicht mehr.
     */
    const gemeinde = grenzen.find(lat, lng);
    if (!gemeinde) {
      counts.ausserhalb += 1;
      continue;
    }

    /*
     * Keine Gemeinde zu diesem Schlüssel: Das Verzeichnis führt nur
     * Gemeinden mit Einwohnern, und gemeindefreie Gebiete – Seen, Wälder,
     * Truppenübungsplätze – haben keine. Dort steht kein öffentlicher
     * Behindertenparkplatz, den jemand erfassen könnte.
     */
    const city = byAgs.get(gemeinde.ags);
    if (!city) {
      counts.ohneGemeinde += 1;
      continue;
    }

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

  const fuerDateien = [...byCity.keys()].filter((slug) => anDerReihe.has(slug)).length;

  console.log(
    `  zugeordnet: ${counts.zugeordnet} in ${byCity.size} Gemeinden, davon ${fuerDateien} an der ` +
      `Reihe · gemeindefreies Gebiet: ${counts.ohneGemeinde} · ` +
      `außerhalb jeder Gemeindefläche: ${counts.ausserhalb} · verworfen: ${counts.verworfen}`,
  );

  const auffaellig = dichteMelden(
    byCity,
    new Map(allMunicipalities.map((city) => [city.slug, city])),
    new Set(anDerReihe.keys()),
  );

  if (dryRun) {
    // Was ein echter Lauf schreiben würde: an der Reihe, kein Befund, noch keine Datei.
    let neu = 0;
    let neuStandorte = 0;
    for (const [slug, spots] of byCity) {
      if (!anDerReihe.has(slug) || auffaellig.has(slug)) continue;
      if (!overwrite && (await hasSeed(slug))) continue;
      neu += 1;
      neuStandorte += spots.length;
    }
    console.log(
      `  → ein echter Lauf schriebe ${neu} neue Seed-Dateien mit ${neuStandorte} Standorten`,
    );
    console.log("  (Probelauf – nichts geschrieben)");
    return;
  }

  /*
   * Lieber kein Import als ein falscher: Ein unvollständiger Lauf würde
   * Gemeinden als „fertig" vermerken, denen Parkplätze fehlen – und sie
   * damit dauerhaft aus der Arbeitsliste nehmen.
   */
  if (!vollstaendig) {
    throw new Error(
      "Die Abfrage war unvollständig (gescheiterte Teilabfragen) – nichts geschrieben. " +
        "Später erneut versuchen, Overpass war überlastet.",
    );
  }

  let geschrieben = 0;
  let uebersprungenVorhanden = 0;

  let nochNichtAnDerReihe = 0;
  let nichtGeschriebenAuffaellig = 0;

  for (const [slug, spots] of byCity) {
    const city = anDerReihe.get(slug);

    /*
     * Gemeinden unterhalb der Einwohnergrenze werden zugeordnet und
     * ausgewertet, aber nicht geschrieben. Die Reihenfolge der Einfuhr ist
     * eine Entscheidung (siehe `MIN_POPULATION`), kein Nebenprodukt eines
     * landesweiten Laufs.
     */
    if (!city) {
      nochNichtAnDerReihe += 1;
      continue;
    }

    /*
     * **Vorhandene Daten werden nicht überschrieben**, außer mit
     * `--ueberschreiben`.
     *
     * Gemessen wurde das vor dem Punkt-in-Fläche-Test: Für Saarbrücken
     * lieferte der landesweite Lauf 150 Standorte, der Einzelimport 157 –
     * rund 4,5 % weniger, weil der Einzelimport an der echten Gemeindegrenze
     * schneidet (`map_to_area`) und der landesweite nur am umschließenden
     * Rechteck. Diesen Grund gibt es nicht mehr; ob der Unterschied bleibt,
     * ist aber **nicht nachgemessen**.
     *
     * Die Regel bleibt deshalb, bis sie es ist. Der landesweite Lauf ist für
     * **Breite** da – Gemeinden, zu denen es noch gar nichts gibt. Einen
     * geprüften Bestand ungeprüft zu ersetzen wäre der teurere Fehler.
     */
    /*
     * Eine Gemeinde, die Dichte oder Streuung nicht besteht, wird **nicht
     * geschrieben** (D-07, CLAUDE.md: lieber kein Import als ein falscher). Sie
     * steht oben in der Liste und wird von Hand angesehen; `--trotzdem` nimmt
     * sie mit.
     */
    if (auffaellig.has(slug) && !process.argv.includes("--trotzdem")) {
      nichtGeschriebenAuffaellig += 1;
      continue;
    }

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
      usedSource: pbfFile ? "OpenStreetMap (Geofabrik-Auszug)" : "OpenStreetMap (landesweit)",
      usedUrl: pbfFile
        ? `Geofabrik, ${stateName} (${path.basename(pbfFile)})`
        : `Overpass, ${stateName} (${iso})`,
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
        : "") +
      (nichtGeschriebenAuffaellig > 0
        ? ` · ${nichtGeschriebenAuffaellig} wegen Dichte oder Streuung nicht geschrieben (Liste oben, mit --trotzdem erzwingen)`
        : "") +
      (nochNichtAnDerReihe > 0
        ? ` · ${nochNichtAnDerReihe} unter der Einwohnergrenze, nicht geschrieben`
        : ""),
  );
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry");
  const overwrite = args.includes("--ueberschreiben");

  // `--pbf <datei>`: statt Overpass einen Geofabrik-Auszug lesen (2e.11).
  const pbfIndex = args.indexOf("--pbf");
  const pbfFile = pbfIndex >= 0 ? (args[pbfIndex + 1] ?? null) : null;
  if (pbfIndex >= 0 && (!pbfFile || pbfFile.startsWith("--"))) {
    console.log("--pbf braucht eine Datei: npm run import:osm-state -- saarland --pbf saarland-latest.osm.pbf");
    return;
  }
  if (pbfFile && args.includes("--alle")) {
    console.log("--pbf gilt für genau ein Bundesland (ein Auszug enthält nur eines) – nicht mit --alle.");
    return;
  }

  const wanted = args.filter(
    (argument, index) => !argument.startsWith("--") && !(pbfFile && index === pbfIndex + 1),
  );

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

  /*
   * Die Grenzen **vor** der ersten Overpass-Abfrage laden. Fehlt die Quelle
   * oder hat sich ihr Aufbau geändert, soll das auffallen, bevor ein
   * Gemeinschaftsdienst eine große Abfrage für die Tonne rechnet.
   */
  const grenzen = await loadGrenzen();
  console.log(
    `${new Set(grenzen.gemeinden.map((gemeinde) => gemeinde.ags)).size.toLocaleString("de-DE")} ` +
      "Gemeindeflächen aus VG250-EW geladen",
  );

  if (pbfFile && namen.length !== 1) {
    console.log("--pbf gilt für genau ein Bundesland, genannt wurden " + namen.length + ".");
    return;
  }

  for (const [index, name] of namen.entries()) {
    if (index > 0) {
      // Pause zwischen Bundesländern: Die Abfragen sind groß, und der Dienst
      // wird von Freiwilligen bezahlt.
      console.log("\n  … 60 Sekunden Pause");
      await sleep(60_000);
    }

    try {
      await importState(name, grenzen, dryRun, overwrite, pbfFile);
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
