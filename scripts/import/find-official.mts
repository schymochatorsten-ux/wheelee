/**
 * Gemeinden mit amtlichen Daten finden – unabhängig von der Einwohnerzahl
 * (ToDo 2e.1).
 *
 *     npm run sources:amtlich
 *
 * **Die billigste Ausweitung, die es gibt.** Bisher richtete sich der Import
 * nach der Einwohnerzahl: erst die Großstädte, dann ab 50.000. Dabei gibt es
 * kleine Gemeinden, die ihre Behindertenparkplätze vorbildlich
 * veröffentlichen – und große, die es nicht tun. Wo ein amtlicher Datensatz
 * vorliegt, sind die Daten besser als alles, was OpenStreetMap bietet, und
 * der Importer kann sie längst lesen. Diese Gemeinden zu übergehen, nur weil
 * sie klein sind, wäre die falsche Reihenfolge.
 *
 * Der Lauf fragt **einmal** bei GovData und gleicht lokal gegen das
 * vollständige Gemeindeverzeichnis ab.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { projectRoot } from "./config.mjs";
import { germanCities, toSlug } from "./german-cities.mjs";

const GOVDATA_API = "https://ckan.govdata.de/api/3/action/package_search";
const USER_AGENT = "wheelee-import/0.1 (Behindertenparkplatz-Karte; Kontakt via Repository)";

const SEARCH_TERMS = [
  "Behindertenparkplätze",
  "Behindertenstellplätze",
  "Schwerbehindertenparkplätze",
  "Schwerbehindertenstellplätze",
  "Behindertenparkplatz",
  "Behindertenstellplatz",
  "barrierefreie Parkplätze",
  "Parken Behinderte",
];

/**
 * Hier **ohne** die breiten Begriffe „Parken" und „Parkplätze" aus
 * `scan-sources.mts`: Die liefern tausende Treffer, die über die
 * Wortgrenzenprüfung zufällig auf irgendeine der 10.956 Gemeinden passen
 * könnten. Bei einem Register dieser Größe ist eine strenge Suche richtiger
 * als eine breite – ein falscher Treffer kostet mehr als ein verpasster.
 */
const ABOUT_PARKING = /parkpl|parken|stellpl|parkraum|parkfl/iu;
const ABOUT_DISABILITY = /behinder|rollstuhl|barrierefrei/iu;

const USABLE = new Set(["WFS", "ARCGIS", "GEOJSON", "JSON", "CSV", "GML", "KML", "XLSX", "XLS"]);

interface CkanResource {
  url?: string;
  format?: string;
}

interface CkanDataset {
  name: string;
  title: string;
  license_title?: string;
  license_id?: string;
  organization?: { title?: string };
  resources?: CkanResource[];
}

interface Gemeinde {
  ags: string;
  name: string;
  state: string;
  population: number;
}

function detectFormat(resource: CkanResource): string {
  const url = resource.url ?? "";
  if (/arcgis\/rest\/services/iu.test(url)) return "ARCGIS";
  if (/service=wfs|\/wfs\b|\/wfs_|wfs\//iu.test(url)) return "WFS";
  if (/service=wms/iu.test(url)) return "WMS";
  if (/geo\+json|geojson/iu.test(resource.format ?? "") || /\.gjson|\.geojson/iu.test(url)) {
    return "GEOJSON";
  }
  return (resource.format ?? "").split("/").pop()?.replace("_SRVC", "").toUpperCase() || "?";
}

async function search(term: string): Promise<CkanDataset[]> {
  const url = new URL(GOVDATA_API);
  url.searchParams.set("q", term);
  url.searchParams.set("rows", "200");

  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
    signal: AbortSignal.timeout(60_000),
  });
  if (!response.ok) throw new Error(`GovData: HTTP ${response.status}`);

  const json = (await response.json()) as { result?: { results?: CkanDataset[] } };
  return json.result?.results ?? [];
}

const LETTER = "a-zäöüßáàéèíìóòúù";

/** Kommt der Name als eigenes Wort vor? Siehe „Essen" in „Hessen". */
function containsWord(haystack: string, needle: string): boolean {
  if (needle.length < 4) return false; // zu kurze Namen treffen zufällig
  const pattern = new RegExp(
    `(^|[^${LETTER}])${needle.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&")}([^${LETTER}]|$)`,
    "u",
  );
  return pattern.test(haystack);
}

async function main() {
  const registerDatei = path.join(projectRoot, "data", "_gemeinden.json");
  const register = JSON.parse(await fs.readFile(registerDatei, "utf8")) as {
    gemeinden: Gemeinde[];
  };

  const seen = new Map<string, CkanDataset>();
  for (const term of SEARCH_TERMS) {
    for (const dataset of await search(term)) seen.set(dataset.name, dataset);
  }

  const relevant = [...seen.values()].filter((dataset) => {
    const text = [dataset.title, ...(dataset.resources ?? []).map((r) => r.url ?? "")].join(" ");
    return ABOUT_PARKING.test(text) && ABOUT_DISABILITY.test(text);
  });

  console.log(
    `GovData: ${seen.size} Datensätze, davon ${relevant.length} zu Behindertenparkplätzen.\n`,
  );

  const imRegister = new Set(germanCities.map((city) => city.slug));
  const treffer: {
    gemeinde: Gemeinde;
    titel: string;
    lizenz: string;
    formate: string[];
    bereitsErfasst: boolean;
  }[] = [];

  for (const dataset of relevant) {
    const haystack = [
      dataset.title,
      dataset.organization?.title,
      ...(dataset.resources ?? []).map((resource) => resource.url ?? ""),
    ]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase("de-DE");

    const formate = [
      ...new Set(
        (dataset.resources ?? [])
          .filter((resource) => resource.url)
          .map(detectFormat)
          .filter((format) => USABLE.has(format)),
      ),
    ];
    if (formate.length === 0) continue;

    /*
     * Die größte passende Gemeinde gewinnt. „Neustadt" gibt es vielfach;
     * trifft der Datensatz auf mehrere, ist die größte die wahrscheinlichste
     * – und der Abstandstest beim Import fängt einen Fehlgriff ohnehin ab.
     */
    const passende = register.gemeinden
      .filter((gemeinde) => containsWord(haystack, gemeinde.name.toLocaleLowerCase("de-DE")))
      .sort((a, b) => b.population - a.population);

    const gemeinde = passende[0];
    if (!gemeinde) continue;

    treffer.push({
      gemeinde,
      titel: dataset.title,
      lizenz: dataset.license_title || dataset.license_id || "nicht angegeben",
      formate,
      bereitsErfasst: imRegister.has(toSlug(gemeinde.name)),
    });
  }

  const neu = treffer
    .filter((eintrag) => !eintrag.bereitsErfasst)
    .sort((a, b) => b.gemeinde.population - a.gemeinde.population);

  const zeilen = [
    "# Gemeinden mit amtlichen Daten",
    "",
    `Stand: ${new Date().toISOString().slice(0, 10)}`,
    "",
    "Erzeugt von `npm run sources:amtlich`. Nicht von Hand bearbeiten.",
    "",
    `Geprüft wurden ${relevant.length} einschlägige GovData-Datensätze gegen alle`,
    `${register.gemeinden.length.toLocaleString("de-DE")} Gemeinden – nicht nur gegen die`,
    "bereits erfassten. Wo eine Gemeinde ihre Daten selbst veröffentlicht, sind",
    "sie besser als alles, was OpenStreetMap bietet.",
    "",
    "## Noch nicht erfasst",
    "",
    neu.length === 0
      ? "Keine. Jede Gemeinde mit amtlichem Datensatz ist bereits im Register."
      : `**${neu.length} Gemeinde(n)** haben einen amtlichen Datensatz, stehen aber nicht im Register:`,
    "",
    ...(neu.length > 0
      ? [
          "| Gemeinde | Land | Einwohner | Datensatz | Formate | Lizenz |",
          "| --- | --- | ---: | --- | --- | --- |",
          ...neu.map(
            (eintrag) =>
              `| ${eintrag.gemeinde.name} | ${eintrag.gemeinde.state} | ` +
              `${eintrag.gemeinde.population.toLocaleString("de-DE")} | ${eintrag.titel} | ` +
              `${eintrag.formate.join(", ")} | ${eintrag.lizenz} |`,
          ),
          "",
          "Diese Gemeinden liegen unter der Einwohnergrenze des Registers. Um sie",
          "aufzunehmen, entweder `MIN_POPULATION` senken oder sie einzeln eintragen.",
          "",
        ]
      : []),
    "## Bereits erfasst",
    "",
    `${treffer.length - neu.length} von ${treffer.length} Datensätzen gehören zu Gemeinden,`,
    "die schon im Register stehen.",
    "",
  ];

  await fs.writeFile(
    path.join(projectRoot, "data", "_amtliche-quellen.md"),
    zeilen.join("\n"),
    "utf8",
  );

  console.log(`Datensätze mit erkannter Gemeinde: ${treffer.length}`);
  console.log(`davon noch nicht im Register: ${neu.length}`);
  for (const eintrag of neu.slice(0, 20)) {
    console.log(
      `  ${eintrag.gemeinde.name.padEnd(24)} ${eintrag.gemeinde.population
        .toLocaleString("de-DE")
        .padStart(9)}  ${eintrag.formate.join(", ")}`,
    );
  }
  console.log("\nGeschrieben: data/_amtliche-quellen.md");
}

if (process.argv[1]?.replace(/\\/gu, "/").endsWith("find-official.mts")) {
  await main();
}
