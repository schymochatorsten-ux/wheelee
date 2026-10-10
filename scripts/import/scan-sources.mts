/**
 * Prüft für alle deutschen Großstädte auf einen Schlag, ob es einen amtlichen
 * Datensatz zu Behindertenparkplätzen gibt.
 *
 *     npm run sources:scan
 *
 * Der Abruf bei GovData passiert einmal für alle Suchbegriffe; die Zuordnung
 * zu den Städten geschieht danach lokal. Das Ergebnis landet in
 * `data/_quellen-status.json` und `data/_quellen-status.md` und steuert, welche
 * Stadt amtlich und welche aus OpenStreetMap importiert wird.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { projectRoot } from "./config.mjs";
import { germanCities } from "./german-cities.mjs";

const GOVDATA_API = "https://ckan.govdata.de/api/3/action/package_search";
const USER_AGENT = "wheelee-import/0.1 (Behindertenparkplatz-Karte; Kontakt via Repository)";

const SEARCH_TERMS = [
  "Behindertenparkplätze",
  "Behindertenstellplätze",
  "Schwerbehindertenparkplätze",
  "Schwerbehindertenstellplätze",
  "Behindertenparkplatz",
  "Behindertenstellplatz",
  "Parken Behinderte",
  "barrierefreie Parkplätze",
  // Breitere Begriffe für Dienste, die Behindertenparkplätze als eine Ebene
  // unter mehreren führen. Die Relevanzprüfung siebt den Rest aus.
  "Parken",
  "Parkplätze",
];

interface CkanResource {
  url?: string;
  format?: string;
  name?: string;
}

export interface CkanDataset {
  name: string;
  title: string;
  notes?: string;
  license_id?: string;
  license_title?: string;
  organization?: { title?: string };
  resources?: CkanResource[];
}

export interface SourceStatus {
  rank: number;
  city: string;
  slug: string;
  state: string;
  population: number;
  official: {
    title: string;
    govdata: string;
    license: string;
    resources: { format: string; url: string }[];
  }[];
  plan: "official" | "osm";
}

/**
 * Der Datensatz muss wirklich von Parkplätzen handeln **und** von Behinderung.
 *
 * Ohne diese Prüfung schlug die Suche für Hamburg Werkstätten für Menschen mit
 * Behinderung und Tagesförderstätten vor. Der Importer probierte sie der Reihe
 * nach durch und fiel am Ende auf OpenStreetMap zurück – während der richtige
 * Datensatz, "Behindertenstellplätze Hamburg", unbeachtet blieb.
 */
const ABOUT_PARKING = /parkpl|parken|stellpl|parkraum|parkfl/iu;
const ABOUT_DISABILITY = /behinder|rollstuhl|barrierefrei/iu;

/**
 * Ein Geodienst darf auch ohne "Behinderten" im Titel durchgelassen werden:
 * Frankfurts Datensatz heißt schlicht "WFS Parken in der Stadt Frankfurt am
 * Main", die Behindertenparkplätze sind eine Ebene darin. Beim Abruf wird
 * ohnehin gezielt nach dieser Ebene gesucht; findet sich keine, geht der
 * Importer weiter. Bei fertigen Dateien ist das nicht möglich – dort muss der
 * Bezug zur Behinderung im Titel oder in der URL stehen.
 */
function isRelevant(dataset: CkanDataset): boolean {
  const text = [dataset.title, ...(dataset.resources ?? []).map((r) => r.url ?? "")]
    .filter(Boolean)
    .join(" ");

  if (!ABOUT_PARKING.test(text)) return false;
  if (ABOUT_DISABILITY.test(text)) return true;

  return (dataset.resources ?? []).some((resource) =>
    ["WFS", "ARCGIS"].includes(detectFormat(resource)),
  );
}

/**
 * Format bestimmen – notfalls aus der URL.
 *
 * GovData trägt Formate uneinheitlich ein: mal als EU-Vokabular-URI, mal als
 * Kürzel, mal als Medientyp. Berlins WFS stand dort als "HTML", weil die URL
 * auf GetCapabilities zeigt. Deshalb entscheidet die URL mit.
 */
function detectFormat(resource: CkanResource): string {
  const url = resource.url ?? "";
  if (/arcgis\/rest\/services/iu.test(url)) return "ARCGIS";
  if (/service=wfs|\/wfs\b|\/wfs_|wfs\//iu.test(url)) return "WFS";
  if (/service=wms/iu.test(url)) return "WMS";

  const declared = (resource.format ?? "").split("/").pop()?.replace("_SRVC", "") ?? "";
  if (/geo\+json|geojson/iu.test(resource.format ?? "") || /\.gjson|\.geojson/iu.test(url)) {
    return "GEOJSON";
  }
  return declared.toUpperCase() || "?";
}

/** Formate, aus denen der Importer direkt lesen kann. */
const USABLE = new Set([
  "WFS",
  "ARCGIS",
  "GEOJSON",
  "JSON",
  "CSV",
  "GML",
  "KML",
  "XLSX",
  "XLS",
  "SHP",
]);

async function search(term: string): Promise<CkanDataset[]> {
  const url = new URL(GOVDATA_API);
  url.searchParams.set("q", term);
  url.searchParams.set("rows", "200");

  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) throw new Error(`GovData: HTTP ${response.status}`);

  const json = (await response.json()) as { result?: { results?: CkanDataset[] } };
  return json.result?.results ?? [];
}

/** Stadtname ohne unterscheidenden Zusatz: „Frankfurt (Oder)" → „frankfurt". */
export function cityCore(cityName: string): string {
  return cityName
    .replace(/\s*\(.*\)$/u, "")
    .replace(/\s+(am|an der|im)\s+.*$/iu, "")
    .toLocaleLowerCase("de-DE");
}

/**
 * Stadtnamen, die im Register mehrfach vorkommen – „Frankfurt" steht für
 * Frankfurt am Main **und** Frankfurt (Oder).
 *
 * Bei diesen genügt der Kernname nicht: Frankfurt (Oder) bekam dadurch den
 * Datensatz von Frankfurt am Main zugewiesen. Gefangen hat das damals nur die
 * Abstandsprüfung beim Import – ein Glücksfall, denn bei zwei gleichnamigen
 * Städten nahe beieinander hätte sie nicht angeschlagen.
 */
export function ambiguousCores(cities: readonly { name: string }[]): Set<string> {
  const seenOnce = new Set<string>();
  const twice = new Set<string>();
  for (const city of cities) {
    const core = cityCore(city.name);
    if (seenOnce.has(core)) twice.add(core);
    seenOnce.add(core);
  }
  return twice;
}

const letterClass = "a-zäöüßáàéèíìóòúù";

/** Kommt `needle` als eigenes Wort in `haystack` vor? */
function containsWord(haystack: string, needle: string): boolean {
  // `\b` reicht nicht, weil Umlaute dort nicht als Wortzeichen gelten –
  // deshalb explizit auf nicht-buchstabige Nachbarn prüfen. Nötig, weil
  // „Essen" in „Hessen" steckt und Essen dadurch einmal den Frankfurter
  // Datensatz bekam.
  const pattern = new RegExp(
    `(^|[^${letterClass}])${needle.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&")}([^${letterClass}]|$)`,
    "u",
  );
  return pattern.test(haystack);
}

/**
 * Passt ein Datensatz zur Stadt?
 *
 * Geprüft werden Titel, Herausgeber und die Ressourcen-URLs. Letztere sind
 * nötig, weil der Stadtname manchmal nur dort steht – Berlins Datensatz trägt
 * als Herausgeber "GDI-DE", liegt aber auf gdi.berlin.de.
 *
 * Bei mehrdeutigen Namen muss zusätzlich etwas Unterscheidendes vorkommen:
 * der Zusatz selbst („Oder", „Main") oder das Bundesland. Sonst gewinnt die
 * größere Stadt jeden Treffer der kleineren.
 */
export function matchesCity(
  dataset: CkanDataset,
  city: { name: string; state: string },
  ambiguous: ReadonlySet<string>,
): boolean {
  const core = cityCore(city.name);

  const haystack = [
    dataset.title,
    dataset.organization?.title,
    ...(dataset.resources ?? []).map((resource) => resource.url ?? ""),
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("de-DE");

  if (!containsWord(haystack, core)) return false;
  if (!ambiguous.has(core)) return true;

  // Der Zusatz, der die Städte unterscheidet: „(Oder)" → „oder",
  // „am Main" → „main". Das Bundesland zählt ebenso.
  const qualifier = city.name
    .toLocaleLowerCase("de-DE")
    .replace(core, "")
    .replace(/[()]/gu, " ")
    .replace(/\b(am|an|der|im)\b/gu, " ")
    .trim();

  const state = city.state.toLocaleLowerCase("de-DE");
  return (
    (qualifier.length > 0 && containsWord(haystack, qualifier)) || containsWord(haystack, state)
  );
}

async function main() {
  const seen = new Map<string, CkanDataset>();
  for (const term of SEARCH_TERMS) {
    for (const dataset of await search(term)) seen.set(dataset.name, dataset);
  }

  const datasets = [...seen.values()].filter(isRelevant);
  console.log(
    `GovData: ${seen.size} Datensätze gefunden, davon ${datasets.length} tatsächlich zu Behindertenparkplätzen.\n`,
  );

  const ambiguous = ambiguousCores(germanCities);
  if (ambiguous.size > 0) {
    console.log(`Mehrdeutige Stadtnamen im Register: ${[...ambiguous].join(", ")}\n`);
  }

  const status: SourceStatus[] = germanCities.map((city) => {
    const official = datasets
      .filter((dataset) => matchesCity(dataset, city, ambiguous))
      .map((dataset) => {
        const resources = (dataset.resources ?? [])
          .filter((resource) => resource.url)
          .map((resource) => ({ format: detectFormat(resource), url: resource.url! }))
          .filter((resource) => USABLE.has(resource.format));

        return {
          title: dataset.title,
          govdata: `https://www.govdata.de/suche/daten/${dataset.name}`,
          license: dataset.license_title || dataset.license_id || "nicht angegeben",
          resources,
        };
      })
      .filter((entry) => entry.resources.length > 0);

    return {
      rank: city.rank,
      city: city.name,
      slug: city.slug,
      state: city.state,
      population: city.population,
      official,
      plan: official.length > 0 ? "official" : "osm",
    };
  });

  const withOfficial = status.filter((entry) => entry.plan === "official");

  await fs.mkdir(path.join(projectRoot, "data"), { recursive: true });
  await fs.writeFile(
    path.join(projectRoot, "data", "_quellen-status.json"),
    `${JSON.stringify(status, null, 2)}\n`,
    "utf8",
  );

  const lines = [
    "# Quellenlage der deutschen Großstädte",
    "",
    `Stand: ${new Date().toISOString().slice(0, 10)}`,
    "",
    `Geprüft: ${status.length} Großstädte gegen ${datasets.length} einschlägige GovData-Datensätze.`,
    `Mit amtlichem, maschinenlesbarem Datensatz: **${withOfficial.length}**.`,
    "Für alle übrigen ist OpenStreetMap die Quelle.",
    "",
    "Erzeugt von `npm run sources:scan`. Nicht von Hand bearbeiten.",
    "",
    "| Rang | Stadt | Land | Plan | Amtliche Quelle |",
    "| ---: | --- | --- | --- | --- |",
    ...status.map((entry) => {
      const source =
        entry.official.length > 0
          ? entry.official
              .map(
                (official) =>
                  `[${official.title}](${official.govdata}) (${[...new Set(official.resources.map((r) => r.format))].join(", ")})`,
              )
              .join("<br>")
          : "–";
      return `| ${entry.rank} | ${entry.city} | ${entry.state} | ${entry.plan === "official" ? "amtlich" : "OSM"} | ${source} |`;
    }),
    "",
  ];

  await fs.writeFile(
    path.join(projectRoot, "data", "_quellen-status.md"),
    lines.join("\n"),
    "utf8",
  );

  console.log(`Mit amtlicher Quelle: ${withOfficial.length} von ${status.length}`);
  for (const entry of withOfficial) {
    const formats = [...new Set(entry.official.flatMap((o) => o.resources.map((r) => r.format)))];
    console.log(
      `  ${String(entry.rank).padStart(2)} ${entry.city.padEnd(22)} ${formats.join(", ")}`,
    );
  }
  console.log("\nGeschrieben: data/_quellen-status.md und data/_quellen-status.json");
}

// Nur ausführen, wenn das Skript selbst aufgerufen wird – die Tests
// importieren `matchesCity` aus dieser Datei und sollen dabei nichts abrufen.
if (process.argv[1]?.replace(/\\/gu, "/").endsWith("scan-sources.mts")) {
  await main();
}
