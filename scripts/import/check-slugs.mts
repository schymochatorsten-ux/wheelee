/**
 * Prüft, ob das Register und die vorhandenen Seed-Dateien zusammenpassen.
 *
 *     npm run check:slugs
 *
 * **Warum das eine eigene Prüfung wert ist.** Der Slug steckt im Dateinamen
 * der Seed-Datei *und* in jeder Parkplatz-ID. Ändert er sich – etwa weil das
 * amtliche Verzeichnis eine Stadt anders schreibt als die alte Handliste –,
 * dann verwaist die Datei: Der Importer legt eine neue an, die alte bleibt
 * liegen, und in der App taucht die Stadt doppelt oder gar nicht auf. Das
 * fällt beim Draufschauen nicht auf.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { projectRoot } from "./config.mjs";
import { allMunicipalities, germanCities } from "./german-cities.mjs";

/** Städte, die absichtlich nicht im Register stehen. */
const AUSSERHALB = new Set(["idstein", "weissenhorn", "frankfurt-pdf-liste"]);

/** Importstand lesen, ohne das Register zu berühren. */
async function readStatus(): Promise<{ records: { slug: string; status: string }[] }> {
  try {
    const raw = await fs.readFile(path.join(projectRoot, "data", "_import-status.json"), "utf8");
    return JSON.parse(raw) as { records: { slug: string; status: string }[] };
  } catch {
    return { records: [] };
  }
}

async function main() {
  const dataDir = path.join(projectRoot, "data");
  const dateien = (await fs.readdir(dataDir))
    .filter((file) => file.endsWith(".json") && !file.startsWith("_"))
    .map((file) => file.replace(/\.json$/u, ""))
    .filter((name) => !name.includes("."))
    .filter((name) => !/cache/u.test(name));

  /*
   * Eine Gemeinde ohne Seed-Datei ist nicht zwingend ungeprüft: Wo die
   * Quelle sauber durchlief und nichts fand, wird keine Datei geschrieben
   * (Zustand `leer`, siehe 2e.9). Sie hier erneut vorzuschlagen hieße, sie
   * bei jedem Durchlauf neu abzufragen – genau das, was 2e.9 verhindern
   * soll.
   */
  const status = await readStatus();
  const geprueftLeer = new Set(
    status.records.filter((record) => record.status === "leer").map((record) => record.slug),
  );

  /*
   * **Verwaist wird gegen das volle Verzeichnis geprüft, nicht gegen die
   * Importliste** (seit 2e.10).
   *
   * Vorher meldete diese Prüfung fünf angeblich verwaiste Dateien – Emden,
   * Freising, Goslar, Speyer, Willich. Keine davon war verwaist: Sie liegen
   * nur knapp unter der Einwohnergrenze und fielen deshalb aus der gefilterten
   * Liste. Die Meldung musste das umständlich erklären („oder sie liegt knapp
   * unter der Einwohnergrenze: Dann ist nichts zu tun").
   *
   * **Eine Warnung, die man wegerklären muss, wird beim nächsten Mal
   * überlesen** – und mit ihr die echte. Verwaist heißt jetzt: zu dieser Datei
   * gibt es im ganzen amtlichen Verzeichnis keine Gemeinde. Das ist ein
   * Fehler, und nur das.
   */
  const imRegister = new Set(allMunicipalities.map((city) => city.slug));
  const verwaist = dateien.filter((name) => !imRegister.has(name) && !AUSSERHALB.has(name));

  /*
   * Fehlende Dateien dagegen nur für die Gemeinden, die **an der Reihe**
   * sind. Sonst stünden hier 10.550 Zeilen „noch nicht importiert", und der
   * vorgeschlagene Befehl wäre ein Overpass-Massenlauf.
   */
  const ohneDatei = germanCities.filter(
    (city) => !dateien.includes(city.slug) && !geprueftLeer.has(city.slug),
  );

  console.log(
    `Verzeichnis: ${allMunicipalities.length.toLocaleString("de-DE")} Gemeinden · ` +
      `davon an der Reihe: ${germanCities.length} · Seed-Dateien: ${dateien.length}`,
  );

  if (verwaist.length > 0) {
    console.log(`\n⚠ ${verwaist.length} Seed-Datei(en) ohne Gemeinde im amtlichen Verzeichnis:`);
    for (const name of verwaist) console.log(`   ${name}.json`);
    console.log(
      "   Die Gemeinde heißt im Verzeichnis anders – SLUG_OVERRIDES ergänzen.\n" +
        "   Sonst verwaist die Datei und die Stadt erscheint doppelt oder gar nicht.",
    );
  }

  if (ohneDatei.length > 0) {
    console.log(`\n⬜ ${ohneDatei.length} Gemeinde(n) im Register ohne Seed-Datei:`);
    for (const city of ohneDatei.slice(0, 30)) {
      console.log(
        `   ${city.name} (${city.state}, ${city.population.toLocaleString("de-DE")}) → ${city.slug}`,
      );
    }
    if (ohneDatei.length > 30) console.log(`   … und ${ohneDatei.length - 30} weitere`);
    console.log("\n   Importieren mit:");
    console.log(`   npm run import:city -- ${ohneDatei.map((c) => c.slug).join(" ")}`);
  }

  if (verwaist.length === 0 && ohneDatei.length === 0) {
    console.log("\n✅ Register und Seed-Dateien stimmen überein.");
  }
}

if (process.argv[1]?.replace(/\\/gu, "/").endsWith("check-slugs.mts")) {
  await main();
}
