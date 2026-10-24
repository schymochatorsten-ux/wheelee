/**
 * Regionale Sammeldatensätze gegen den OSM-Bestand halten (ToDo 3.2).
 *
 *     npm run check:regional
 *
 * **Wozu.** `import:regional` überschreibt eine vorhandene Seed-Datei nicht,
 * wenn sie deutlich größer ist (Karlsruhe: 330 Standorte aus OSM gegen 224 der
 * TechnologieRegion). Die amtlichen Daten werden dort also geholt und
 * verworfen – obwohl sie genau das sind, was dem OSM-Bestand fehlt: eine
 * zweite, unabhängige Quelle. Dieses Skript hält beide nebeneinander, **ohne
 * etwas in `data/` zu ändern außer dem Bericht**.
 *
 * **Was der Bericht nicht sagt.** Die Stadt führt nur Stellplätze im
 * Straßenraum, OSM auch die an Kliniken, Märkten und Bahnhöfen. „Nur OSM“ ist
 * deshalb hier **kein Verdacht auf eine Lücke der Liste**, sondern oft schlicht
 * eine andere Grundgesamtheit. Bestätigt heißt: beide Quellen kennen einen
 * Platz an derselben Stelle (Toleranz wie in `validate.mts`).
 *
 * **Eingetragen wird nur „bestätigt“, nie das Gegenteil** (Entscheidung
 * Torsten, 2026-10-24). Die OSM-Plätze, an denen die regionale Quelle einen
 * Platz kennt, bekommen in `data/_bestaetigt.json` den Zustand `bestaetigt`;
 * die Detailansicht zeigt dann „Von zwei Quellen bestätigt“. Ein Gegenstück
 * „nur OSM“ gibt es bewusst nicht: Die Stadt führt nur den Straßenraum, ein
 * OSM-Platz an einer Klinik wäre sonst als „unbestätigt“ markiert, obwohl er
 * außerhalb der Grundgesamtheit der Liste liegt. Wer keinen Eintrag hat,
 * wurde **nicht** bestätigt – das heißt nicht „widerlegt“.
 *
 * Die Herkunft steht unter `regional` in derselben Datei, getrennt von
 * `staedte`, das `validate.mts` für den Vergleich amtlich/OSM pflegt.
 */
import fs from "node:fs/promises";
import path from "node:path";
import type { ParkingSpot } from "../../src/lib/types.js";
import { projectRoot } from "./config.mjs";
import { pairSpots, type CrossCheckPoint } from "./crosscheck.mjs";
import { REGIONAL_SOURCES, loadRegional } from "./regional.mjs";

/** Wie in `validate.mts` (`CONFIRM_METERS`): höchstens so weit auseinander. */
const TOLERANCE_METERS = 30;

interface Seed {
  city: { slug: string; name: string };
  source: string;
  spots: ParkingSpot[];
}

/**
 * Die OSM-Standorte, die eine regionale Quelle bestätigt.
 *
 * `pairSpots` nennt die bestätigten Standorte der *amtlichen* Seite. Hier wird
 * die OSM-Seite gebraucht: Das sind alle, die nicht als „nur OSM“ übrig
 * blieben. Weil die Paarung eins zu eins ist, sind beide Zahlen gleich.
 */
export function confirmedOsmIds(osm: readonly CrossCheckPoint[], osmOnly: readonly CrossCheckPoint[]): string[] {
  const unmatched = new Set(osmOnly.map((point) => point.id));
  return osm.filter((point) => !unmatched.has(point.id)).map((point) => point.id);
}

const located = (spot: ParkingSpot): CrossCheckPoint | null =>
  spot.lat === null || spot.lng === null
    ? null
    : {
        id: spot.id,
        lat: spot.lat,
        lng: spot.lng,
        label: [spot.street, spot.houseNumber].filter(Boolean).join(" ") || spot.label,
      };

async function main() {
  const bestaetigtPfad = path.join(projectRoot, "data", "_bestaetigt.json");
  const bestaetigt = JSON.parse(await fs.readFile(bestaetigtPfad, "utf8")) as {
    standorte: Record<string, string>;
    regional?: Record<string, { quelle: string; geprueftAm: string; bestaetigt: number; toleranzMeter: number }>;
  };
  bestaetigt.regional ??= {};
  const heute = new Date().toISOString().slice(0, 10);

  const zeilen: string[] = [
    "# Gegenprüfung regionaler Quellen gegen OpenStreetMap",
    "",
    "Erzeugt von `npm run check:regional` (ToDo 3.2) – nicht von Hand bearbeiten.",
    "",
    `Toleranz ${TOLERANCE_METERS} m, Paarung eins zu eins zum nächstgelegenen Platz. ` +
      "**„Nur OSM“ ist hier meist kein Fehler der Liste:** Die Stadt führt nur " +
      "Stellplätze im Straßenraum, OSM auch Kliniken, Märkte und Bahnhöfe.",
    "",
  ];

  for (const source of REGIONAL_SOURCES) {
    const { bySlug } = await loadRegional(source);
    zeilen.push(`## ${source.title}`, "", `Lizenz: ${source.license}`, "");
    zeilen.push("| Gemeinde | amtlich | OSM-Bestand | bestätigt | nur amtlich | nur OSM |");
    zeilen.push("| --- | ---: | ---: | ---: | ---: | ---: |");
    const beispiele: string[] = [];

    for (const [slug, { name, spots }] of [...bySlug].sort((a, b) => b[1].spots.length - a[1].spots.length)) {
      let seed: Seed;
      try {
        seed = JSON.parse(await fs.readFile(path.join(projectRoot, "data", `${slug}.json`), "utf8")) as Seed;
      } catch {
        continue;
      }
      // Nur dort, wo der Bestand aus OSM kommt: bei den übrigen *ist* die
      // regionale Quelle der Bestand, und der Abgleich liefe gegen sich selbst.
      if (!/OpenStreetMap/iu.test(seed.source)) continue;

      const official = spots.map(located).filter((p): p is CrossCheckPoint => p !== null);
      const osm = seed.spots.map(located).filter((p): p is CrossCheckPoint => p !== null);
      const groups = pairSpots(official, osm, TOLERANCE_METERS);

      // Vorherigen Stand dieser Stadt ersetzen, damit ein verschwundener Platz
      // sein Etikett verliert; fremde Einträge anderer Städte bleiben.
      for (const id of Object.keys(bestaetigt.standorte)) {
        if (id.startsWith(`${slug}-`)) delete bestaetigt.standorte[id];
      }
      const confirmedIds = confirmedOsmIds(osm, groups.osmOnly);
      for (const id of confirmedIds) bestaetigt.standorte[id] = "bestaetigt";
      bestaetigt.regional[slug] = {
        quelle: source.id,
        geprueftAm: heute,
        bestaetigt: confirmedIds.length,
        toleranzMeter: TOLERANCE_METERS,
      };

      zeilen.push(
        `| ${name} | ${official.length} | ${osm.length} | ${groups.confirmed.length} | ` +
          `${groups.officialOnly.length} | ${groups.osmOnly.length} |`,
      );
      const byId = new Map(official.map((p) => [p.id, p]));
      beispiele.push(
        `### ${name}: amtlich, aber nicht in OSM (${groups.officialOnly.length})`,
        "",
        ...groups.officialOnly.slice(0, 15).map((id) => {
          const p = byId.get(id)!;
          return `- ${p.label} (${p.lat.toFixed(5)}, ${p.lng.toFixed(5)})`;
        }),
        "",
      );
      console.log(
        `${name}: ${groups.confirmed.length} bestätigt, ${groups.officialOnly.length} nur amtlich, ` +
          `${groups.osmOnly.length} nur OSM (amtlich ${official.length}, OSM ${osm.length})`,
      );
    }
    zeilen.push("", ...beispiele);
  }

  await fs.writeFile(bestaetigtPfad, `${JSON.stringify(bestaetigt, null, 2)}\n`, "utf8");
  await fs.writeFile(path.join(projectRoot, "data", "_gegenpruefung-regional.md"), `${zeilen.join("\n")}\n`, "utf8");
  console.log("\nGeschrieben: data/_gegenpruefung-regional.md");
}

if (process.argv[1]?.replace(/\\/gu, "/").endsWith("crosscheck-regional.mts")) {
  await main();
}
