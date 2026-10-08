/**
 * Sucht amtliche Datensätze zu Behindertenparkplätzen.
 *
 *     npm run sources                 # bundesweit alle Datensätze
 *     npm run sources -- Idstein      # nur Treffer, die zu einer Stadt passen
 *
 * Hintergrund: Amtliche Listen sind jeder anderen Quelle vorzuziehen. Sie sind
 * vollständig, kennen einzelne Stellplätze statt nur Parkplätze und tragen eine
 * klare Lizenz. GovData ist das Metaportal des Bundes und führt die offenen
 * Datensätze von Ländern und Kommunen zusammen; es ist damit die richtige
 * erste Anlaufstelle, bevor man auf OpenStreetMap ausweicht.
 *
 * Das Skript schreibt nichts – es ist ein Rechercheschritt vor dem Import.
 */

const GOVDATA_API = "https://ckan.govdata.de/api/3/action/package_search";
const USER_AGENT = "wheelee-import/0.1 (Behindertenparkplatz-Karte; Kontakt via Repository)";

/** Suchbegriffe, unter denen Kommunen diese Daten veröffentlichen. */
const SEARCH_TERMS = [
  "Behindertenparkplätze",
  "Schwerbehindertenparkplätze",
  "Behindertenparkplatz",
  "Parken Menschen mit Behinderung",
];

interface CkanResource {
  name?: string;
  url?: string;
  format?: string;
  description?: string;
}

interface CkanDataset {
  name: string;
  title: string;
  notes?: string;
  license_id?: string;
  license_title?: string;
  organization?: { title?: string };
  resources?: CkanResource[];
  extras?: { key: string; value: string }[];
}

/**
 * GovData liefert Formate teils als EU-Vokabular-URI
 * („…/file-type/GEOJSON"). Für die Ausgabe reicht das letzte Segment.
 */
const shortFormat = (format: string | undefined) =>
  (format ?? "").split("/").pop()?.replace("_SRVC", "").toUpperCase() || "?";

/** Formate, aus denen sich direkt importieren lässt. */
const USABLE = new Set([
  "GEOJSON",
  "JSON",
  "CSV",
  "XLSX",
  "XLS",
  "WFS",
  "GML",
  "KML",
  "SHP",
  "XML",
]);

async function search(term: string): Promise<CkanDataset[]> {
  const url = new URL(GOVDATA_API);
  url.searchParams.set("q", term);
  url.searchParams.set("rows", "100");

  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) throw new Error(`GovData: HTTP ${response.status}`);

  const json = (await response.json()) as { result?: { results?: CkanDataset[] } };
  return json.result?.results ?? [];
}

/** Lizenz aus den verschiedenen Feldern zusammensuchen, die GovData befüllt. */
function licenseOf(dataset: CkanDataset): string {
  const fromExtras = dataset.extras?.find((extra) =>
    ["license_id", "licence", "licenseAttributionByText"].includes(extra.key),
  )?.value;
  return dataset.license_title || dataset.license_id || fromExtras || "nicht angegeben";
}

function matchesCity(dataset: CkanDataset, city: string): boolean {
  const needle = city.toLocaleLowerCase("de-DE");
  const haystack = [dataset.title, dataset.notes, dataset.organization?.title]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("de-DE");
  return haystack.includes(needle);
}

async function main() {
  const city = process.argv.slice(2).find((argument) => !argument.startsWith("-"));

  const byName = new Map<string, CkanDataset>();
  for (const term of SEARCH_TERMS) {
    for (const dataset of await search(term)) {
      byName.set(dataset.name, dataset);
    }
  }

  const all = [...byName.values()];
  const matching = city ? all.filter((dataset) => matchesCity(dataset, city)) : all;

  console.log(
    city
      ? `Amtliche Datensätze mit Bezug zu "${city}": ${matching.length} von ${all.length}\n`
      : `Amtliche Datensätze zu Behindertenparkplätzen auf GovData: ${all.length}\n`,
  );

  if (matching.length === 0) {
    console.log("Kein amtlicher Datensatz gefunden. Nächste Schritte:");
    console.log("  1. Auf der Website der Stadt nach 'Parken' / 'Behindertenparkplätze' suchen.");
    console.log("  2. Beim Open-Data-Portal des Landes nachsehen (z. B. MobiData BW, Open.NRW).");
    console.log("  3. Die Straßenverkehrsbehörde der Stadt anfragen – sie führt die Liste,");
    console.log("     weil jeder Stellplatz förmlich angeordnet werden muss.");
    console.log("  4. Erst danach auf OpenStreetMap ausweichen (npm run import:osm).");
    return;
  }

  for (const dataset of matching.sort((a, b) => a.title.localeCompare(b.title, "de-DE"))) {
    console.log(`## ${dataset.title}`);
    if (dataset.organization?.title) console.log(`   Herausgeber: ${dataset.organization.title}`);
    console.log(`   Lizenz:      ${licenseOf(dataset)}`);

    const resources = (dataset.resources ?? [])
      .map((resource) => ({ ...resource, short: shortFormat(resource.format) }))
      .filter((resource) => resource.url);

    const usable = resources.filter((resource) => USABLE.has(resource.short));
    for (const resource of usable.length > 0 ? usable : resources) {
      console.log(`   ${resource.short.padEnd(8)} ${resource.url}`);
    }
    if (usable.length === 0 && resources.length > 0) {
      console.log("   (kein direkt importierbares Format – Seite von Hand prüfen)");
    }
    console.log(`   GovData:     https://www.govdata.de/suche/daten/${dataset.name}`);
    console.log();
  }
}

await main();
