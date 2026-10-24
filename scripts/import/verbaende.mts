/**
 * Den Verband je Gemeinde ins Verzeichnis eintragen (ToDo 2e.10).
 *
 *     npm run import:verbaende
 *     npm run import:verbaende -- --datei pfad/zur/vg250-ew.shape.zip
 *
 * Liest dieselbe Auslieferung wie `grenzen.mts` (`data/raw/…shape.zip`, geholt
 * mit `npm run import:grenzen`) und ergänzt jede Gemeinde in
 * `data/_gemeinden.json` um `verband`.
 *
 * **Was das Feld sagt und was nicht.** Es gibt wieder, was das BKG führt: Die
 * Gemeinde gehört einer Verwaltungsgemeinschaft an (Amt, Verbandsgemeinde,
 * Samtgemeinde, Verwaltungsverband, Verwaltungsgemeinschaft, erfüllende
 * Gemeinde) – Name und Art dieses Verbands. **Es sagt nicht, wer die
 * Straßenverkehrsbehörde ist.** Das ist Landesrecht; in Baden-Württemberg etwa
 * sind auch Große Kreisstädte „gemeinschaftsangehörig" (Konstanz, Aalen), und
 * bei kleinen Gemeinden ist die Behörde häufig der Landkreis. Wer das Feld als
 * Zuständigkeit liest, schickt Anfragen an die falsche Stelle.
 *
 * `null` heißt: laut Quelle keiner Gemeinschaft angehörig (amtsfrei,
 * verbandsfrei, kreisfrei).
 *
 * **Nach `import:gemeinden` erneut laufen lassen**: Das Register wird dort neu
 * geschrieben und verliert das Feld.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { projectRoot } from "./config.mjs";
import { extractFile } from "./zip.mjs";
import { readDbf } from "./shapefile.mjs";

/** Wert von `BEM` bei Gemeinden, die einem Verband angehören. */
const ANGEHOERIG = "gemeinschaftsangehörig";

/** Nutzbare Flächen (Geofaktum 4); 2 = Wasser u. Ä. ohne Einwohner. */
const LANDFLAECHE = "4";

/** Standort der Auslieferung, die `grenzen.mts` bereits holt. */
const CACHE = path.join(projectRoot, "data", "raw", "vg250-ew.utm32s.shape.zip");

export interface Verband {
  name: string;
  art: string;
}

/**
 * AGS der Gemeinde → ihr Verband (oder `null`).
 *
 * Verknüpft wird über den Regionalschlüssel: Die ersten 9 Stellen der
 * 12-stelligen ARS einer Gemeinde sind die ARS ihres Verbands. Fehlt die
 * Verbandszeile bei einer als angehörig geführten Gemeinde, bricht der Lauf ab
 * – ein stilles `null` sähe aus wie „keinem Verband angehörig".
 */
export function buildVerbaende(
  gemeindeRows: readonly Record<string, string>[],
  verbandRows: readonly Record<string, string>[],
): Map<string, Verband | null> {
  const verbaende = new Map<string, Verband>();
  for (const row of verbandRows) {
    if (row.GF !== LANDFLAECHE || !row.ARS) continue;
    verbaende.set(row.ARS.trim(), { name: (row.GEN ?? "").trim(), art: (row.BEZ ?? "").trim() });
  }

  const result = new Map<string, Verband | null>();
  for (const row of gemeindeRows) {
    if (row.GF !== LANDFLAECHE) continue;
    const ags = (row.AGS ?? "").trim();
    const ars = (row.ARS ?? "").trim();
    if (!ags || !ars) continue;

    if ((row.BEM ?? "").trim() !== ANGEHOERIG) {
      result.set(ags, null);
      continue;
    }

    const verband = verbaende.get(ars.slice(0, 9));
    if (!verband) {
      throw new Error(`Gemeinde ${ags} (${row.GEN}) gilt als gemeinschaftsangehörig, aber der Verband ${ars.slice(0, 9)} fehlt.`);
    }
    result.set(ags, verband);
  }
  return result;
}

async function main() {
  const args = process.argv.slice(2);
  const dateiIndex = args.indexOf("--datei");
  const datei = dateiIndex >= 0 && args[dateiIndex + 1] ? args[dateiIndex + 1] : CACHE;

  const archiv = await fs.readFile(datei).catch(() => {
    throw new Error(`${datei} fehlt. Erst \`npm run import:grenzen\` laufen lassen.`);
  });
  const zuordnung = buildVerbaende(
    readDbf(extractFile(archiv, /VG250_GEM\.dbf$/u)),
    readDbf(extractFile(archiv, /VG250_VWG\.dbf$/u)),
  );

  const registerDatei = path.join(projectRoot, "data", "_gemeinden.json");
  const register = JSON.parse(await fs.readFile(registerDatei, "utf8")) as {
    gemeinden: { ags: string; verband?: Verband | null }[];
  };

  const fehlend = register.gemeinden.filter((g) => !zuordnung.has(g.ags));
  if (fehlend.length > 0) {
    throw new Error(
      `${fehlend.length} Gemeinden des Registers fehlen in der Quelle (z. B. ${fehlend[0].ags}) – ` +
        "Stand von Register und Grenzen verschieden? Nichts geschrieben.",
    );
  }

  for (const gemeinde of register.gemeinden) gemeinde.verband = zuordnung.get(gemeinde.ags) ?? null;
  await fs.writeFile(registerDatei, `${JSON.stringify(register, null, 1)}\n`, "utf8");

  const angehoerig = register.gemeinden.filter((g) => g.verband).length;
  console.log(
    `${register.gemeinden.length} Gemeinden, davon ${angehoerig} einem Verband zugeordnet, ` +
      `${register.gemeinden.length - angehoerig} ohne.`,
  );
}

if (process.argv[1]?.replace(/\\/gu, "/").endsWith("verbaende.mts")) {
  await main();
}
