/**
 * Fortschrittsverwaltung des Städte-Imports.
 *
 * Jeder Importschritt schreibt sein Ergebnis sofort hierher, nicht erst am
 * Ende eines Laufs. Dadurch ist nach einem Abbruch – egal ob Netzfehler,
 * Zeitüberschreitung oder Ende des Budgets – ohne Rätselraten klar, welche
 * Stadt fertig ist, aus welcher Quelle sie stammt und wo weiterzumachen ist.
 *
 * `data/_import-status.md` ist die lesbare Fassung derselben Daten.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { projectRoot } from "./config.mjs";
import { germanCities } from "./german-cities.mjs";

const statusJson = path.join(projectRoot, "data", "_import-status.json");
const statusMarkdown = path.join(projectRoot, "data", "_import-status.md");

export type ImportState =
  /** Noch nicht angefasst. */
  | "offen"
  /** Erfolgreich importiert. */
  | "fertig"
  /** Versucht, aber fehlgeschlagen – Grund steht in `message`. */
  | "fehlgeschlagen"
  /** Quelle vorhanden, aber nicht automatisch verwertbar – Handarbeit nötig. */
  | "handarbeit";

export interface CityImportRecord {
  rank: number;
  city: string;
  slug: string;
  state: string;
  population: number;
  /** Geplante Quelle laut `npm run sources:scan`. */
  plan: "official" | "osm";
  /** Tatsächlich verwendete Quelle, sobald importiert. */
  usedSource: string | null;
  /** Genaue URL oder Abfrage, aus der die Daten stammen. */
  usedUrl: string | null;
  status: ImportState;
  /** Anzahl Standorte. */
  locations: number | null;
  /** Summe der Stellplätze. */
  spaces: number | null;
  /** Zeitpunkt des letzten Versuchs. */
  attemptedAt: string | null;
  /** Fehler oder Hinweis. */
  message: string | null;
}

export interface ImportStatusFile {
  updatedAt: string;
  records: CityImportRecord[];
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    throw error;
  }
}

/** Status laden und dabei mit der Städteliste abgleichen. */
export async function loadStatus(): Promise<ImportStatusFile> {
  const existing = await readJson<ImportStatusFile>(statusJson, {
    updatedAt: "",
    records: [],
  });
  const bySlug = new Map(existing.records.map((record) => [record.slug, record]));

  const plans = await readJson<{ slug: string; plan: "official" | "osm" }[]>(
    path.join(projectRoot, "data", "_quellen-status.json"),
    [],
  );
  const planBySlug = new Map(plans.map((entry) => [entry.slug, entry.plan]));

  const records = germanCities.map((city) => {
    const previous = bySlug.get(city.slug);
    return {
      rank: city.rank,
      city: city.name,
      slug: city.slug,
      state: city.state,
      population: city.population,
      plan: planBySlug.get(city.slug) ?? "osm",
      usedSource: previous?.usedSource ?? null,
      usedUrl: previous?.usedUrl ?? null,
      status: previous?.status ?? "offen",
      locations: previous?.locations ?? null,
      spaces: previous?.spaces ?? null,
      attemptedAt: previous?.attemptedAt ?? null,
      message: previous?.message ?? null,
    } as CityImportRecord;
  });

  return { updatedAt: existing.updatedAt, records };
}

/** Einen Stadt-Eintrag aktualisieren und beide Dateien sofort schreiben. */
export async function recordCity(
  slug: string,
  update: Partial<Omit<CityImportRecord, "slug" | "rank" | "city" | "state" | "population">>,
): Promise<void> {
  const status = await loadStatus();
  const record = status.records.find((entry) => entry.slug === slug);
  if (!record) throw new Error(`Unbekannte Stadt: ${slug}`);

  Object.assign(record, update, { attemptedAt: new Date().toISOString() });
  status.updatedAt = new Date().toISOString();

  await fs.mkdir(path.dirname(statusJson), { recursive: true });
  await fs.writeFile(statusJson, `${JSON.stringify(status, null, 2)}\n`, "utf8");
  await fs.writeFile(statusMarkdown, renderMarkdown(status), "utf8");
}

const SYMBOL: Record<ImportState, string> = {
  fertig: "✅",
  fehlgeschlagen: "❌",
  handarbeit: "✋",
  offen: "⬜",
};

function renderMarkdown(status: ImportStatusFile): string {
  const done = status.records.filter((record) => record.status === "fertig");
  const open = status.records.filter((record) => record.status === "offen");
  const problems = status.records.filter(
    (record) => record.status === "fehlgeschlagen" || record.status === "handarbeit",
  );
  const next = open[0];

  const totalLocations = done.reduce((sum, record) => sum + (record.locations ?? 0), 0);
  const totalSpaces = done.reduce((sum, record) => sum + (record.spaces ?? 0), 0);

  return [
    "# Importstand der deutschen Großstädte",
    "",
    `Zuletzt aktualisiert: ${status.updatedAt}`,
    "",
    "Diese Datei schreiben die Importskripte selbst nach **jeder einzelnen Stadt**.",
    "Sie ist damit auch nach einem Abbruch mitten im Lauf korrekt.",
    "",
    "## Wo weitermachen",
    "",
    next
      ? `Nächste Stadt: **${next.city}** (Rang ${next.rank}, ${next.state}, geplante Quelle: ${
          next.plan === "official" ? "amtlich" : "OpenStreetMap"
        })`
      : "Alle Städte abgearbeitet.",
    "",
    "```bash",
    next ? `npm run import:city -- ${next.slug}` : "# nichts offen",
    "# oder alle verbleibenden nacheinander:",
    "npm run import:city -- --rest",
    "```",
    "",
    "## Überblick",
    "",
    "| Kennzahl | Wert |",
    "| --- | --- |",
    `| Städte gesamt | ${status.records.length} |`,
    `| fertig | ${done.length} |`,
    `| offen | ${open.length} |`,
    `| mit Problem | ${problems.length} |`,
    `| importierte Standorte | ${totalLocations} |`,
    `| importierte Stellplätze | ${totalSpaces} |`,
    "",
    "## Städte in Bearbeitungsreihenfolge",
    "",
    "| | Rang | Stadt | Einwohner | Quelle | Standorte | Stellplätze | Stand |",
    "| --- | ---: | --- | ---: | --- | ---: | ---: | --- |",
    ...status.records.map((record) =>
      [
        "",
        SYMBOL[record.status],
        record.rank,
        record.city,
        record.population.toLocaleString("de-DE"),
        record.usedSource ?? (record.plan === "official" ? "(amtlich geplant)" : "(OSM geplant)"),
        record.locations ?? "–",
        record.spaces ?? "–",
        record.message ?? record.status,
        "",
      ].join(" | "),
    ),
    "",
    "## Genaue Herkunft je Stadt",
    "",
    ...status.records
      .filter((record) => record.usedUrl)
      .flatMap((record) => [`- **${record.city}** (${record.usedSource}): \`${record.usedUrl}\``]),
    "",
  ].join("\n");
}
