/**
 * Abdeckung messen (ToDo 2e.0).
 *
 *     npm run report:abdeckung
 *
 * **Warum das nötig ist.** Das Endziel lautet „jeden öffentlichen
 * Behindertenparkplatz in Deutschland". Ohne Maßstab bleibt das eine
 * Absichtserklärung: 195 erfasste Gemeinden klingen nach viel oder nach
 * wenig, je nachdem, woran man sie misst.
 *
 * Gemessen wird deshalb **zweifach**, und die beiden Zahlen sagen
 * Verschiedenes:
 *
 * - **Nach Gemeinden**: 204 von 10.754 sind 1,9 %. Das ist die strenge Zahl
 *   und die ehrliche Antwort auf „sind wir fertig".
 * - **Nach Einwohnern**: Dieselben 204 Gemeinden sind der Wohnort eines weit
 *   größeren Teils der Bevölkerung – rund 42 %. Das ist die Antwort auf „wie
 *   vielen Menschen nützt es schon".
 *
 * Der Nenner sind die Gemeinden **mit Einwohnern**, seit 2e.10 identisch mit
 * dem in `data/_import-status.md`. Die Begründung steht unten bei der
 * Filterung.
 *
 * Beide gehören in den Bericht. Nur die erste zu nennen macht die Arbeit
 * kleiner, als sie ist; nur die zweite macht sie größer.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { projectRoot } from "./config.mjs";

interface Gemeinde {
  ags: string;
  name: string;
  state: string;
  population: number;
}

interface StatusRecord {
  slug: string;
  city: string;
  state: string;
  /** Einwohnerzahl aus dem Register – maßgeblich, siehe unten. */
  population: number;
  status: string;
  usedSource: string | null;
  locations: number | null;
  spaces: number | null;
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

const prozent = (teil: number, ganzes: number) =>
  ganzes === 0 ? "0,0 %" : `${((teil / ganzes) * 100).toFixed(1).replace(".", ",")} %`;

const zahl = (value: number) => value.toLocaleString("de-DE");

async function main() {
  const dataDir = path.join(projectRoot, "data");

  const register = await readJson<{ gemeinden: Gemeinde[] }>(
    path.join(dataDir, "_gemeinden.json"),
    { gemeinden: [] },
  );
  const status = await readJson<{ records: StatusRecord[] }>(
    path.join(dataDir, "_import-status.json"),
    { records: [] },
  );

  if (register.gemeinden.length === 0) {
    throw new Error(
      "data/_gemeinden.json fehlt. Erst `npm run import:gemeinden` laufen lassen – " +
        "ohne das amtliche Verzeichnis gibt es keinen Nenner.",
    );
  }

  /*
   * **Der Nenner sind die Gemeinden mit Einwohnern** (seit 2e.10), nicht alle
   * Einträge des Verzeichnisses. Es führt 204 gemeindefreie Gebiete – Seen,
   * Wälder und Truppenübungsplätze wie „Ammersee" oder „Abenberger Wald" –,
   * davon 202 ohne jede Einwohnerzahl. Dort gibt es keinen öffentlichen
   * Behindertenparkplatz zu erfassen und keine Verwaltung zu fragen; sie
   * mitzuzählen würde die Abdeckung dauerhaft und grundlos drücken.
   *
   * Wichtiger noch: `data/_import-status.md` zählt seit 2e.10 genauso. Zwei
   * Dokumente mit zwei verschiedenen Gesamtzahlen wären schlimmer als eine
   * ungenaue Zahl – man glaubt dann keiner von beiden.
   */
  const gemeinden = register.gemeinden.filter((g) => g.population > 0);
  const alleEinwohner = gemeinden.reduce((sum, g) => sum + g.population, 0);

  /*
   * Die Einwohnerzahl kommt aus dem Importstand selbst, nicht aus einer
   * Zuordnung über den Namen: **Gemeindenamen sind in Deutschland nicht
   * eindeutig.** Über den Namen gesucht, landete die Auswertung bei
   * gleichnamigen Orten auf dem falschen – und zählte 1,4 Millionen
   * Einwohner zu wenig, ohne dass es auffiel.
   */
  const geprueft = status.records.filter(
    (record) => record.status === "fertig" || record.status === "leer",
  );

  const mitTreffer = geprueft.filter((record) => (record.locations ?? 0) > 0);
  const ohneTreffer = geprueft.filter((record) => (record.locations ?? 0) === 0);
  const probleme = status.records.filter((record) => record.status === "fehlgeschlagen");

  const einwohnerGeprueft = geprueft.reduce((sum, record) => sum + (record.population ?? 0), 0);

  const amtlich = geprueft.filter((record) => /amtlich/iu.test(record.usedSource ?? ""));
  const standorte = geprueft.reduce((sum, record) => sum + (record.locations ?? 0), 0);
  const stellplaetze = geprueft.reduce((sum, record) => sum + (record.spaces ?? 0), 0);

  /** Je Bundesland: wie viele Gemeinden gibt es, wie viele sind geprüft? */
  const laender = new Map<
    string,
    { gesamt: number; geprueft: number; einwohner: number; erfasst: number }
  >();
  for (const gemeinde of gemeinden) {
    const eintrag = laender.get(gemeinde.state) ?? {
      gesamt: 0,
      geprueft: 0,
      einwohner: 0,
      erfasst: 0,
    };
    eintrag.gesamt += 1;
    eintrag.einwohner += gemeinde.population;
    laender.set(gemeinde.state, eintrag);
  }
  for (const record of geprueft) {
    const eintrag = laender.get(record.state);
    if (!eintrag) continue;
    eintrag.geprueft += 1;
    eintrag.erfasst += record.population ?? 0;
  }

  const zeilen = [
    "# Abdeckung",
    "",
    `Stand: ${new Date().toISOString().slice(0, 10)}`,
    "",
    "Erzeugt von `npm run report:abdeckung`. Nicht von Hand bearbeiten.",
    "",
    "## Wie weit ist das Endziel",
    "",
    "Das Ziel ist jeder öffentliche Behindertenparkplatz in Deutschland, der",
    "sich aus einer öffentlichen Quelle importieren lässt. Gemessen wird",
    "zweifach, weil beide Zahlen Verschiedenes sagen.",
    "",
    "| Maß | Erfasst | Insgesamt | Anteil |",
    "| --- | ---: | ---: | ---: |",
    `| Gemeinden | ${zahl(geprueft.length)} | ${zahl(gemeinden.length)} | ${prozent(geprueft.length, gemeinden.length)} |`,
    `| Einwohner in erfassten Gemeinden | ${zahl(einwohnerGeprueft)} | ${zahl(alleEinwohner)} | ${prozent(einwohnerGeprueft, alleEinwohner)} |`,
    "",
    `**Die erste Zahl ist die ehrliche Antwort auf „sind wir fertig" – die`,
    `zweite auf „wie vielen Menschen nützt es schon".**`,
    "",
    "## Woraus sich das zusammensetzt",
    "",
    "| | Gemeinden |",
    "| --- | ---: |",
    `| geprüft, mit Treffer | ${zahl(mitTreffer.length)} |`,
    `| geprüft, nichts gefunden | ${zahl(ohneTreffer.length)} |`,
    `| noch nicht geprüft | ${zahl(gemeinden.length - geprueft.length - probleme.length)} |`,
    `| Importversuch fehlgeschlagen | ${zahl(probleme.length)} |`,
    "",
    `Davon aus amtlicher Quelle: **${zahl(amtlich.length)}**, der Rest aus OpenStreetMap.`,
    `Erfasst sind **${zahl(standorte)} Standorte** mit **${zahl(stellplaetze)} Stellplätzen**.`,
    "",
    "## Nach Bundesland",
    "",
    "| Land | geprüft | Gemeinden | Anteil | Einwohner erfasst |",
    "| --- | ---: | ---: | ---: | ---: |",
    ...[...laender.entries()]
      .sort((a, b) => b[1].erfasst / b[1].einwohner - a[1].erfasst / a[1].einwohner)
      .map(
        ([name, werte]) =>
          `| ${name} | ${zahl(werte.geprueft)} | ${zahl(werte.gesamt)} | ` +
          `${prozent(werte.geprueft, werte.gesamt)} | ${prozent(werte.erfasst, werte.einwohner)} |`,
      ),
    "",
    "## Was als Nächstes am meisten bringt",
    "",
    "Die Stufen beziehen sich auf die Einwohnergrenze in",
    "`scripts/import/german-cities.mts`:",
    "",
    "| Grenze | Gemeinden | davon neu | Einwohner gesamt | Anteil |",
    "| ---: | ---: | ---: | ---: | ---: |",
    ...[100_000, 50_000, 20_000, 10_000, 5_000, 0].map((grenze) => {
      const inStufe = gemeinden.filter((g) => g.population >= grenze);
      const einwohner = inStufe.reduce((sum, g) => sum + g.population, 0);
      const neu = inStufe.length - geprueft.length;
      return (
        `| ab ${zahl(grenze)} | ${zahl(inStufe.length)} | ${zahl(Math.max(0, neu))} | ` +
        `${zahl(einwohner)} | ${prozent(einwohner, alleEinwohner)} |`
      );
    }),
    "",
    "Die letzte Zeile zeigt, warum die Stufen sinnvoll sind: Die ersten",
    "Tausend Gemeinden decken den weitaus größten Teil der Bevölkerung ab,",
    "der lange Rest dagegen viele kleine Orte – in denen die Parkplatzsuche",
    "ohne Karte besonders mühsam ist, weil es dort wenige gibt und niemand",
    "sie auflistet.",
    "",
  ];

  await fs.writeFile(path.join(dataDir, "_abdeckung.md"), zeilen.join("\n"), "utf8");

  console.log(
    `Gemeinden: ${zahl(geprueft.length)} von ${zahl(gemeinden.length)} ` +
      `(${prozent(geprueft.length, gemeinden.length)})`,
  );
  console.log(
    `Einwohner: ${zahl(einwohnerGeprueft)} von ${zahl(alleEinwohner)} ` +
      `(${prozent(einwohnerGeprueft, alleEinwohner)})`,
  );
  console.log("Geschrieben: data/_abdeckung.md");
}

if (process.argv[1]?.replace(/\\/gu, "/").endsWith("coverage.mts")) {
  await main();
}
