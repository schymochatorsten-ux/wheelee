/**
 * Monatliche Aktualitätsprüfung (ToDos 4.1, 4.3, 4.4).
 *
 *     npm run sources:check
 *     npm run sources:check -- berlin koeln   # nur bestimmte Städte
 *
 * **Sie lädt keine Parkplatzdaten.** Gefragt wird nur nach dem
 * Änderungsdatum – das kostet fast nichts und findet trotzdem jede Änderung,
 * die eine Quelle meldet:
 *
 * | Quellenart     | Abfrage                                | Aufwand                   |
 * | -------------- | -------------------------------------- | ------------------------- |
 * | GovData (CKAN) | `metadata_modified` über die Paket-API | eine Anfrage je Datensatz |
 * | direkte Datei  | `HTTP HEAD`, `Last-Modified`/`ETag`    | kein Download             |
 * | WFS            | `GetCapabilities`                      | klein                     |
 * | OpenStreetMap  | kein Änderungsdatum je Stadt           | fester Takt statt Prüfung |
 *
 * **Warum ohne gespeicherte Vergleichswerte auskommt:** Wo die Quelle ein
 * echtes Datum liefert, wird es mit dem **Importdatum** verglichen – ist die
 * Quelle jünger, gibt es etwas Neues. Nur wo es bloß ein `ETag` gibt, braucht
 * es einen gemerkten Wert aus dem vorigen Lauf.
 *
 * **Tote Links sind wichtiger als Änderungen.** Die Untersuchung zu 2d.8 hat
 * gezeigt, dass GovData auf Dienste verweist, die es nicht mehr gibt –
 * Bochums ArcGIS-Dienst etwa. Ein Datensatz, der nicht mehr abrufbar ist,
 * fällt sonst erst beim nächsten Import auf.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { projectRoot } from "./config.mjs";
import { loadStatus, type CityImportRecord } from "./status.mjs";

const USER_AGENT = "wheelee-import/0.1 (Behindertenparkplatz-Karte; Kontakt via Repository)";

/** OSM wird ohne Änderungsdatum nach festem Takt neu geholt (ToDo 4.2). */
const OSM_INTERVAL_DAYS = 90;
/** Auch amtliche Quellen werden halbjährlich ungefragt neu geholt. */
const FULL_REIMPORT_DAYS = 182;

interface QuellenEintrag {
  slug: string;
  official: {
    title: string;
    govdata: string;
    license: string;
    resources: { format: string; url: string }[];
  }[];
}

/** Was der vorige Lauf gesehen hat – nur für Quellen ohne echtes Datum. */
type SeenFile = Record<string, { marker: string; seenAt: string }>;

type Verdict =
  /** Quelle unverändert seit dem Import. */
  | "unveraendert"
  /** Quelle hat sich seit dem Import geändert – neu importieren. */
  | "geaendert"
  /** Nicht mehr abrufbar – wichtiger als jede Änderung. */
  | "tot"
  /**
   * Die Stadt kommt aus OpenStreetMap, obwohl es eine erreichbare amtliche
   * Quelle gibt. Einen Versuch wert (ToDo 2d.8a): Düsseldorf kam von 171
   * Standorten aus OSM auf 340 aus der amtlichen Quelle.
   */
  | "ungenutzt"
  /** Kein Änderungsdatum verfügbar; es gilt der feste Takt. */
  | "kein-datum"
  /** Abruf nicht möglich (Netzfehler, Zeitüberschreitung). */
  | "unpruefbar";

interface Result {
  slug: string;
  city: string;
  verdict: Verdict;
  detail: string;
  /** Soll diese Stadt neu importiert werden? */
  reimport: boolean;
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    throw error;
  }
}

/** Abruf mit Zeitgrenze – ein hängender Server darf den Lauf nicht blockieren. */
async function fetchWithTimeout(url: string, init: RequestInit = {}, ms = 20_000) {
  return fetch(url, {
    ...init,
    headers: { "User-Agent": USER_AGENT, ...(init.headers ?? {}) },
    signal: AbortSignal.timeout(ms),
  });
}

const daysBetween = (a: Date, b: Date) => Math.round((b.getTime() - a.getTime()) / 86_400_000);

/**
 * Änderungsdatum eines GovData-Datensatzes.
 *
 * Die Paket-API liefert `metadata_modified` ohne die Daten selbst.
 *
 * **Vorbehalt:** Das Feld meldet jede Änderung an den *Metadaten* – auch eine
 * korrigierte Beschreibung oder einen neuen Ansprechpartner. „Geändert"
 * heißt hier also „sieh nach", nicht „die Daten sind neu". Das ist die
 * richtige Richtung zu irren: Ein überflüssiger Import kostet eine
 * Overpass-freie Abfrage, ein übersehener kostet jemandem eine vergebliche
 * Fahrt.
 */
async function govdataModified(govdataUrl: string): Promise<Date | null> {
  const name = govdataUrl.split("/").pop();
  if (!name) return null;

  const api = new URL("https://ckan.govdata.de/api/3/action/package_show");
  api.searchParams.set("id", name);

  const response = await fetchWithTimeout(api.toString());
  if (!response.ok) return null;

  const json = (await response.json()) as { result?: { metadata_modified?: string } };
  const raw = json.result?.metadata_modified;
  if (!raw) return null;

  const date = new Date(raw.endsWith("Z") ? raw : `${raw}Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

interface HeadInfo {
  ok: boolean;
  status: number;
  modified: Date | null;
  etag: string | null;
}

function readHeaders(response: Response): HeadInfo {
  const raw = response.headers.get("last-modified");
  const date = raw ? new Date(raw) : null;
  return {
    ok: response.ok,
    status: response.status,
    modified: date && !Number.isNaN(date.getTime()) ? date : null,
    etag: response.headers.get("etag"),
  };
}

/**
 * Erreichbarkeit und Änderungsdatum einer Ressource feststellen, ohne sie zu
 * laden.
 *
 * Zuerst `HTTP HEAD`. **Scheitert das, heißt es nicht, dass die Quelle tot
 * ist:** Berlins WFS-Dienste antworten auf HEAD mit 502, liefern per GET aber
 * einwandfrei – viele Kartendienste kennen die Methode schlicht nicht. Ohne
 * diesen zweiten Versuch hätte die Prüfung drei lebende Dienste als
 * verschwunden gemeldet, und solche Fehlalarme sind der sichere Weg, einen
 * Bericht unbrauchbar zu machen.
 *
 * Der Rückfall ist ein GET, dessen Körper sofort verworfen wird – geladen
 * wird dadurch nur der Anfang der Antwort.
 */
async function probe(url: string): Promise<HeadInfo> {
  let headInfo: HeadInfo | null = null;
  try {
    headInfo = readHeaders(await fetchWithTimeout(url, { method: "HEAD" }));
    if (headInfo.ok) return headInfo;
  } catch {
    // Auch ein Fehler bei HEAD rechtfertigt den zweiten Versuch.
  }

  const response = await fetchWithTimeout(url, { method: "GET" });
  await response.body?.cancel();
  const info = readHeaders(response);

  // Das Änderungsdatum aus dem HEAD behalten, falls der GET keines nennt.
  return { ...info, modified: info.modified ?? headInfo?.modified ?? null };
}

/** Eine Stadt prüfen. */
async function checkCity(
  record: CityImportRecord,
  quellen: QuellenEintrag | undefined,
  seen: SeenFile,
): Promise<Result> {
  const base = { slug: record.slug, city: record.city };
  const importedAt = record.attemptedAt ? new Date(record.attemptedAt) : null;
  const age = importedAt ? daysBetween(importedAt, new Date()) : null;

  const usesOsm = /OpenStreetMap/iu.test(record.usedSource ?? "");

  // Ohne amtliche Quelle entscheidet bei OpenStreetMap allein der Takt.
  if (!quellen || quellen.official.length === 0) {
    const due = age !== null && age >= OSM_INTERVAL_DAYS;
    return {
      ...base,
      verdict: "kein-datum",
      detail:
        age === null
          ? "OpenStreetMap, kein Importdatum vermerkt"
          : `OpenStreetMap, zuletzt vor ${age} Tagen geholt` +
            (due ? ` – über dem Takt von ${OSM_INTERVAL_DAYS} Tagen` : ""),
      reimport: due,
    };
  }

  const problems: string[] = [];
  let newest: Date | null = null;
  let etagChanged = false;
  let anyReachable = false;

  for (const official of quellen.official) {
    try {
      const modified = await govdataModified(official.govdata);
      if (modified) {
        anyReachable = true;
        if (!newest || modified > newest) newest = modified;
      }
    } catch {
      // Die Paket-API ist nicht entscheidend; die Ressourcen zählen.
    }

    for (const resource of official.resources.slice(0, 3)) {
      try {
        const info = await probe(resource.url);
        if (!info.ok) {
          problems.push(`HTTP ${info.status}: ${resource.url.slice(0, 70)}`);
          continue;
        }
        anyReachable = true;
        if (info.modified && (!newest || info.modified > newest)) newest = info.modified;

        if (!info.modified && info.etag) {
          const key = `${record.slug}|${resource.url}`;
          const previous = seen[key]?.marker;
          if (previous && previous !== info.etag) etagChanged = true;
          seen[key] = { marker: info.etag, seenAt: new Date().toISOString() };
        }
      } catch (error) {
        problems.push(`${(error as Error).name}: ${resource.url.slice(0, 70)}`);
      }
    }
  }

  if (!anyReachable && problems.length > 0) {
    return {
      ...base,
      verdict: "tot",
      detail:
        `keine Ressource erreichbar – ${problems[0]}` +
        (usesOsm ? " (die Stadt kommt ohnehin aus OpenStreetMap)" : ""),
      reimport: false,
    };
  }

  /*
   * Die Stadt kommt aus OpenStreetMap, obwohl die amtliche Quelle antwortet.
   * Beim Import war sie es nicht – vielleicht war der Dienst damals gestört,
   * vielleicht scheiterte das Einlesen. Beides ist einen erneuten Versuch
   * wert, denn amtliche Daten sind vollständiger: Düsseldorf kam von 171 auf
   * 340 Standorte.
   */
  if (usesOsm) {
    const due = age !== null && age >= OSM_INTERVAL_DAYS;
    return {
      ...base,
      verdict: "ungenutzt",
      detail:
        "amtliche Quelle erreichbar, verwendet wird OpenStreetMap" +
        (newest ? ` · Quelle vom ${newest.toISOString().slice(0, 10)}` : "") +
        // Der Importvermerk sagt oft schon, warum – etwa dass der Datensatz
        // Anwohnerparken ist und zu Recht abgelehnt wurde.
        (record.message ? ` · Importvermerk: ${record.message}` : ""),
      reimport: due,
    };
  }

  if (newest && importedAt && newest > importedAt) {
    return {
      ...base,
      verdict: "geaendert",
      detail: `Quelle vom ${newest.toISOString().slice(0, 10)}, Import vom ${importedAt
        .toISOString()
        .slice(0, 10)}`,
      reimport: true,
    };
  }

  if (etagChanged) {
    return { ...base, verdict: "geaendert", detail: "ETag hat sich geändert", reimport: true };
  }

  if (!newest) {
    const due = age !== null && age >= FULL_REIMPORT_DAYS;
    return {
      ...base,
      verdict: "unpruefbar",
      detail:
        "Quelle nennt kein Änderungsdatum" +
        (problems.length > 0 ? ` · ${problems.length} Ressource(n) mit Problem` : ""),
      reimport: due,
    };
  }

  const due = age !== null && age >= FULL_REIMPORT_DAYS;
  return {
    ...base,
    verdict: "unveraendert",
    detail:
      `Quelle vom ${newest.toISOString().slice(0, 10)}` +
      (due ? ` – trotzdem fällig, Import ist ${age} Tage alt` : "") +
      (problems.length > 0 ? ` · ${problems.length} Ressource(n) mit Problem` : ""),
    reimport: due,
  };
}

const SYMBOL: Record<Verdict, string> = {
  unveraendert: "✅",
  geaendert: "🔄",
  tot: "💀",
  ungenutzt: "🟡",
  "kein-datum": "⬜",
  unpruefbar: "❔",
};

const TITLE: Record<Verdict, string> = {
  unveraendert: "unverändert",
  geaendert: "geändert",
  tot: "nicht mehr abrufbar",
  ungenutzt: "amtliche Quelle ungenutzt",
  "kein-datum": "kein Änderungsdatum",
  unpruefbar: "nicht prüfbar",
};

function render(results: Result[]): string {
  const by = (verdict: Verdict) => results.filter((result) => result.verdict === verdict);
  const reimport = results.filter((result) => result.reimport);

  const lines = [
    "# Aktualität der Quellen",
    "",
    `Stand: ${new Date().toISOString().slice(0, 10)}`,
    "",
    "Erzeugt von `npm run sources:check`. Der Lauf lädt **keine** Parkplatzdaten,",
    "er fragt nur nach dem Änderungsdatum. Nicht von Hand bearbeiten.",
    "",
    "„Geändert“ stützt sich bei GovData auf `metadata_modified`. Das Feld meldet",
    "jede Änderung an den Metadaten, auch eine korrigierte Beschreibung – es",
    "heißt also „sieh nach“, nicht „die Daten sind neu“.",
    "",
    "## Überblick",
    "",
    "| Befund | Städte |",
    "| --- | ---: |",
    ...(
      ["geaendert", "tot", "ungenutzt", "unveraendert", "unpruefbar", "kein-datum"] as Verdict[]
    ).map((verdict) => `| ${SYMBOL[verdict]} ${TITLE[verdict]} | ${by(verdict).length} |`),
    "",
  ];

  if (by("tot").length > 0) {
    lines.push(
      "## Nicht mehr abrufbar",
      "",
      "Wichtiger als jede Änderung: Diese Quellen gibt es nicht mehr. Für sie",
      "muss ein neuer Bezugsweg gesucht werden, sonst veraltet der Bestand",
      "unbemerkt.",
      "",
      ...by("tot").map((result) => `- **${result.city}** – ${result.detail}`),
      "",
    );
  }

  if (by("ungenutzt").length > 0) {
    lines.push(
      "## Amtliche Quelle vorhanden, aber ungenutzt",
      "",
      "Diese Städte kommen aus OpenStreetMap, obwohl ihre amtliche Quelle",
      "antwortet. Ein erneuter Importversuch lohnt: Düsseldorf kam damit von",
      "171 Standorten auf 340 (ToDo 2d.8a).",
      "",
      "**Nicht jede davon ist ein Versäumnis.** „Erreichbar“ heißt nur, dass der",
      "Dienst antwortet – nicht, dass er die richtigen Daten führt. Für Kiel,",
      "Krefeld und Aachen hat die Untersuchung zu 2d.8 ergeben, dass ihre",
      "Datensätze Anwohnerparken beschreiben; dass der Importer sie ablehnt, ist",
      "richtig. Der Importvermerk in der Zeile sagt, was beim letzten Versuch",
      "geschah.",
      "",
      "```bash",
      `npm run import:city -- ${by("ungenutzt")
        .map((result) => result.slug)
        .join(" ")}`,
      "```",
      "",
      ...by("ungenutzt").map((result) => `- **${result.city}** – ${result.detail}`),
      "",
    );
  }

  if (reimport.length > 0) {
    lines.push(
      "## Neu zu importieren",
      "",
      "```bash",
      `npm run import:city -- ${reimport.map((result) => result.slug).join(" ")}`,
      "npm run import:streets",
      "npm run import:index",
      "```",
      "",
      ...reimport.map((result) => `- **${result.city}** – ${result.detail}`),
      "",
    );
  } else {
    lines.push("## Neu zu importieren", "", "Nichts fällig.", "");
  }

  lines.push(
    "## Alle Städte",
    "",
    "| | Stadt | Befund | Einzelheiten |",
    "| --- | --- | --- | --- |",
    ...results.map(
      (result) =>
        `| ${SYMBOL[result.verdict]} | ${result.city} | ${TITLE[result.verdict]} | ${result.detail} |`,
    ),
    "",
  );

  return lines.join("\n");
}

async function main() {
  const wanted = process.argv.slice(2).filter((argument) => !argument.startsWith("--"));

  const status = await loadStatus();
  const quellen = await readJson<QuellenEintrag[]>(
    path.join(projectRoot, "data", "_quellen-status.json"),
    [],
  );
  const quellenBySlug = new Map(quellen.map((entry) => [entry.slug, entry]));

  const seenPath = path.join(projectRoot, "data", "_aktualitaet.json");
  const seen = await readJson<SeenFile>(seenPath, {});

  const records = status.records.filter(
    (record) =>
      (record.status === "fertig" || record.status === "leer") &&
      (wanted.length === 0 || wanted.includes(record.slug)),
  );

  const results: Result[] = [];
  for (const record of records) {
    const result = await checkCity(record, quellenBySlug.get(record.slug), seen);
    results.push(result);
    if (result.verdict !== "kein-datum") {
      console.log(`  ${SYMBOL[result.verdict]} ${result.city.padEnd(24)} ${result.detail}`);
    }
  }

  await fs.writeFile(seenPath, `${JSON.stringify(seen, null, 2)}\n`, "utf8");
  await fs.writeFile(path.join(projectRoot, "data", "_aktualitaet.md"), render(results), "utf8");

  const reimport = results.filter((result) => result.reimport);
  const dead = results.filter((result) => result.verdict === "tot");

  console.log(`\n${results.length} Städte geprüft, keine Parkplatzdaten geladen.`);
  if (dead.length > 0) console.log(`💀 ${dead.length} Quelle(n) nicht mehr abrufbar.`);
  console.log(`🔄 ${reimport.length} Stadt/Städte sollten neu importiert werden.`);
  console.log("Geschrieben: data/_aktualitaet.md");
}

if (process.argv[1]?.replace(/\\/gu, "/").endsWith("check-sources.mts")) {
  await main();
}
