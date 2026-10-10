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
import { allMunicipalities, MIN_POPULATION } from "./german-cities.mjs";

const statusJson = path.join(projectRoot, "data", "_import-status.json");
const statusMarkdown = path.join(projectRoot, "data", "_import-status.md");

export type ImportState =
  /** Noch nicht angefasst – niemand hat je nachgesehen. */
  | "offen"
  /** Erfolgreich importiert, mindestens ein Standort. */
  | "fertig"
  /**
   * Geprüft, aber die Quelle kennt hier keinen einzigen Behindertenparkplatz.
   *
   * Das ist ausdrücklich **kein** `offen` und **kein** `fehlgeschlagen`: Die
   * Abfrage lief sauber durch und hatte ein Ergebnis, es war nur leer. Ohne
   * eigenen Zustand wäre diese Gemeinde von „noch nicht geprüft" nicht zu
   * unterscheiden und würde bei jedem Durchlauf erneut abgefragt – bei
   * tausenden Gemeinden ein Missbrauch von Overpass. Dass eine Gemeinde
   * geprüft ist und nichts hat, ist zudem selbst eine Information: Sie gehört
   * in die Abdeckungsrechnung (2e.0), nicht in die Warteschlange.
   */
  | "leer"
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
  /** Amtlicher Gemeindeschlüssel; die ersten fünf Stellen sind der Kreis. */
  ags: string;
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

/**
 * Zustand eines vorhandenen Eintrags bestimmen.
 *
 * Bis zur Einführung von `leer` wurde eine geprüfte Gemeinde ohne Treffer als
 * `fertig` mit 0 Standorten vermerkt. Das trennt dieser Schritt nachträglich
 * auf, damit der Altbestand dieselbe Aussage trägt wie neue Läufe – sonst
 * zählte die Übersicht Gemeinden als erfasst, in denen nichts gefunden wurde.
 */
function migrateState(previous: CityImportRecord | undefined): ImportState {
  if (!previous) return "offen";
  if (previous.status === "fertig" && (previous.locations ?? 0) === 0) return "leer";
  return previous.status;
}

/**
 * Status laden und dabei mit dem **vollständigen Gemeindeverzeichnis**
 * abgleichen (ToDo 2e.10).
 *
 * Vorher lief das über `germanCities`, also über das auf `MIN_POPULATION`
 * gefilterte Verzeichnis – und damit meldete die Übersicht „Alle Städte
 * abgearbeitet", während 10.550 Gemeinden nicht einmal als offen geführt
 * wurden. Die Einwohnergrenze steuert jetzt nur noch die Reihenfolge.
 *
 * **Gespeichert wird nur, was tatsächlich geschehen ist.** Alle Gemeinden in
 * die Datei zu schreiben, ergäbe rund fünf Megabyte, die nach **jeder
 * einzelnen Stadt** neu geschrieben würden – für Zeilen, die ausnahmslos
 * „noch nicht angefasst" bedeuten. Der Zustand `offen` ist der Normalfall und
 * braucht keinen Eintrag: Wer dazugehört, steht im amtlichen Verzeichnis; die
 * Statusdatei hält nur die Abweichungen davon fest.
 */
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

  const records = allMunicipalities.map((city) => {
    const previous = bySlug.get(city.slug);
    return {
      rank: city.rank,
      city: city.name,
      slug: city.slug,
      state: city.state,
      population: city.population,
      ags: city.ags,
      plan: planBySlug.get(city.slug) ?? "osm",
      usedSource: previous?.usedSource ?? null,
      usedUrl: previous?.usedUrl ?? null,
      status: migrateState(previous),
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

  /*
   * Nur die angefassten Gemeinden werden gespeichert – siehe `loadStatus`.
   * Die Markdown-Fassung bekommt trotzdem den vollständigen Stand, denn sie
   * soll die Frage „wie weit sind wir insgesamt" beantworten.
   */
  const touched = status.records.filter((entry) => entry.status !== "offen");

  await fs.mkdir(path.dirname(statusJson), { recursive: true });
  await fs.writeFile(
    statusJson,
    `${JSON.stringify({ updatedAt: status.updatedAt, records: touched }, null, 2)}\n`,
    "utf8",
  );
  await fs.writeFile(statusMarkdown, renderMarkdown(status), "utf8");
}

const SYMBOL: Record<ImportState, string> = {
  fertig: "✅",
  leer: "⚪",
  fehlgeschlagen: "❌",
  handarbeit: "✋",
  offen: "⬜",
};

/** Größenstufen des Ausbaus (ToDo 2e.5) – von oben nach unten abgearbeitet. */
const STUFEN = [
  { ab: 100_000, label: "ab 100.000" },
  { ab: 50_000, label: "ab 50.000" },
  { ab: 20_000, label: "ab 20.000" },
  { ab: 10_000, label: "ab 10.000" },
  { ab: 5_000, label: "ab 5.000" },
  { ab: 0, label: "unter 5.000" },
] as const;

const anteil = (teil: number, ganz: number) =>
  ganz === 0 ? "–" : `${Math.round((teil / ganz) * 100)} %`;

/** Eine Fortschrittszeile: geprüft von gesamt, dazu die Einwohner dahinter. */
function fortschritt(gruppe: readonly CityImportRecord[]): string {
  const geprueft = gruppe.filter(
    (record) => record.status === "fertig" || record.status === "leer",
  );
  const einwohner = gruppe.reduce((sum, record) => sum + record.population, 0);
  const einwohnerGeprueft = geprueft.reduce((sum, record) => sum + record.population, 0);

  return (
    `${geprueft.length.toLocaleString("de-DE")} von ${gruppe.length.toLocaleString("de-DE")} | ` +
    `${anteil(geprueft.length, gruppe.length)} | ${anteil(einwohnerGeprueft, einwohner)}`
  );
}

function renderMarkdown(status: ImportStatusFile): string {
  const done = status.records.filter((record) => record.status === "fertig");
  const open = status.records.filter((record) => record.status === "offen");
  const empty = status.records.filter((record) => record.status === "leer");
  // Geprüft heißt: wir haben nachgesehen – unabhängig davon, ob etwas da war.
  const checked = done.length + empty.length;
  const problems = status.records.filter(
    (record) => record.status === "fehlgeschlagen" || record.status === "handarbeit",
  );

  /*
   * Die nächste offene Gemeinde **innerhalb der eingestellten Grenze**. Alles
   * darunter steht zwar in der Liste, ist aber bewusst noch nicht an der
   * Reihe – sonst verwiese die Datei auf ein Dorf, während die Stufe noch
   * nicht freigegeben ist.
   */
  const next = open.find((record) => record.population >= MIN_POPULATION);
  const naechsteDarunter = open[0];

  const totalLocations = done.reduce((sum, record) => sum + (record.locations ?? 0), 0);
  const totalSpaces = done.reduce((sum, record) => sum + (record.spaces ?? 0), 0);

  /** Nur die angefassten Gemeinden kommen einzeln in die Tabelle. */
  const touched = status.records.filter((record) => record.status !== "offen");

  const laender = [...new Set(status.records.map((record) => record.state))].sort((a, b) =>
    a.localeCompare(b, "de-DE"),
  );

  return [
    "# Importstand der deutschen Gemeinden",
    "",
    `Zuletzt aktualisiert: ${status.updatedAt}`,
    "",
    "Diese Datei schreiben die Importskripte selbst nach **jeder einzelnen Stadt**.",
    "Sie ist damit auch nach einem Abbruch mitten im Lauf korrekt.",
    "",
    "Geführt werden **alle Gemeinden mit Einwohnern**, nicht nur die oberhalb der",
    "Importgrenze (ToDo 2e.10). Die Einwohnergrenze bestimmt die Reihenfolge, nicht",
    'die Zugehörigkeit – sonst meldet diese Datei „alles abgearbeitet", während der',
    "weitaus größte Teil des Landes nie angesehen wurde.",
    "",
    "## Wo weitermachen",
    "",
    next
      ? `Nächste Gemeinde: **${next.city}** (Rang ${next.rank}, ${next.state}, ` +
        `${next.population.toLocaleString("de-DE")} Einwohner, geplante Quelle: ` +
        `${next.plan === "official" ? "amtlich" : "OpenStreetMap"})`
      : `Innerhalb der eingestellten Grenze von ${MIN_POPULATION.toLocaleString("de-DE")} ` +
        "Einwohnern ist alles abgearbeitet." +
        (naechsteDarunter
          ? ` Die nächstgrößere offene Gemeinde darunter wäre **${naechsteDarunter.city}** ` +
            `(${naechsteDarunter.population.toLocaleString("de-DE")} Einwohner). ` +
            "Für sie muss `MIN_POPULATION` in `scripts/import/german-cities.mts` sinken – " +
            "das ist eine Entscheidung, keine Routine."
          : ""),
    "",
    "```bash",
    next ? `npm run import:city -- ${next.slug}` : "# innerhalb der Grenze nichts offen",
    "# oder alle verbleibenden nacheinander:",
    "npm run import:city -- --rest",
    "```",
    "",
    "## Überblick",
    "",
    "| Kennzahl | Wert |",
    "| --- | --- |",
    `| Gemeinden im Register | ${status.records.length.toLocaleString("de-DE")} |`,
    `| geprüft | ${checked.toLocaleString("de-DE")} (${anteil(checked, status.records.length)}) |`,
    `| davon mit Treffer | ${done.length.toLocaleString("de-DE")} |`,
    `| davon geprüft, nichts gefunden | ${empty.length} |`,
    `| noch nicht geprüft | ${open.length.toLocaleString("de-DE")} |`,
    `| mit Problem | ${problems.length} |`,
    `| importierte Standorte | ${totalLocations.toLocaleString("de-DE")} |`,
    `| importierte Stellplätze | ${totalSpaces.toLocaleString("de-DE")} |`,
    "",
    '„Geprüft, nichts gefunden" ist etwas anderes als „noch nicht geprüft": Dort',
    "lief die Abfrage sauber durch und war leer. Diese Gemeinden werden nicht",
    "erneut abgefragt – bei tausenden Gemeinden wäre das ein Missbrauch von",
    "Overpass. Ein erneuter Versuch geht gezielt über den Namen der Gemeinde.",
    "",
    "## Fortschritt nach Größenstufe",
    "",
    "Zwei Prozentzahlen, weil sie Verschiedenes sagen: **Gemeinden** beantwortet",
    '„sind wir fertig", **Einwohner** beantwortet „wie vielen Menschen nützt es',
    'schon". Beides allein wäre schief.',
    "",
    "| Stufe | geprüft | Gemeinden | Einwohner |",
    "| --- | ---: | ---: | ---: |",
    ...STUFEN.map((stufe, index) => {
      const obergrenze = index === 0 ? Infinity : STUFEN[index - 1].ab;
      const gruppe = status.records.filter(
        (record) => record.population >= stufe.ab && record.population < obergrenze,
      );
      return `| ${stufe.label} | ${fortschritt(gruppe)} |`;
    }),
    "",
    "## Fortschritt nach Bundesland",
    "",
    "Die Einheit des landesweiten Abrufs (2e.7) – hier wird sichtbar, wo ein Lauf",
    "etwas gebracht hat und wo nicht.",
    "",
    "| Bundesland | geprüft | Gemeinden | Einwohner |",
    "| --- | ---: | ---: | ---: |",
    ...laender.map((land) => {
      const gruppe = status.records.filter((record) => record.state === land);
      return `| ${land} | ${fortschritt(gruppe)} |`;
    }),
    "",
    "## Angesehene Gemeinden",
    "",
    `${touched.length.toLocaleString("de-DE")} von ${status.records.length.toLocaleString("de-DE")} ` +
      "Gemeinden sind angefasst worden. Nur sie stehen hier einzeln – die übrigen",
    'sind sämtlich „noch nicht geprüft", und zehntausend gleichlautende Zeilen',
    "liest niemand.",
    "",
    "| | Rang | Gemeinde | Einwohner | Quelle | Standorte | Stellplätze | Stand |",
    "| --- | ---: | --- | ---: | --- | ---: | ---: | --- |",
    ...touched.map((record) =>
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
    "## Genaue Herkunft je Gemeinde",
    "",
    ...touched
      .filter((record) => record.usedUrl)
      .flatMap((record) => [`- **${record.city}** (${record.usedSource}): \`${record.usedUrl}\``]),
    "",
  ].join("\n");
}
