/**
 * Zeigt, wie gut die Zeitangaben der Quellen deutbar sind.
 *
 *     npm run report:times
 *
 * Hintergrund: Zwei Drittel aller Zeitangaben im Bestand bedeuten „keine
 * Beschränkung" („24/7", „von 00:00 Uhr bis 24:00 Uhr"). Von den echten
 * Beschränkungen versteht die App nur die eindeutigen Formen – dieser Bericht
 * macht sichtbar, welche Formen noch fehlen und wie oft sie vorkommen.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { normalizeTimeRestriction, restrictionState } from "../../src/lib/opening-hours.js";
import { projectRoot } from "./config.mjs";

const skip =
  /^_|\.(overrides|parsed|report|line-fixups)\.|^geocode-cache|^osm-address|^frankfurt-pdf-liste/u;

async function main() {
  const dataDir = path.join(projectRoot, "data");
  const files = (await fs.readdir(dataDir)).filter(
    (file) => file.endsWith(".json") && !skip.test(file),
  );

  let total = 0;
  let notARestriction = 0;
  let real = 0;
  let understood = 0;
  const unparsed = new Map<string, number>();

  for (const file of files) {
    const seed = JSON.parse(await fs.readFile(path.join(dataDir, file), "utf8")) as {
      spots: { timeRestriction: string | null }[];
    };

    for (const spot of seed.spots) {
      total += 1;
      if (!spot.timeRestriction) continue;

      const normalized = normalizeTimeRestriction(spot.timeRestriction);
      if (!normalized) {
        notARestriction += 1;
        continue;
      }

      real += 1;
      if (restrictionState(spot.timeRestriction) !== "unbekannt") {
        understood += 1;
      } else {
        unparsed.set(normalized, (unparsed.get(normalized) ?? 0) + 1);
      }
    }
  }

  console.log(`Standorte gesamt:                    ${total}`);
  console.log(`Angaben, die keine Beschränkung sind: ${notARestriction} (werden ausgeblendet)`);
  console.log(`echte Beschränkungen:                 ${real}`);
  console.log(
    `davon sicher deutbar:                 ${understood} (${real > 0 ? Math.round((understood / real) * 100) : 0} %)`,
  );

  if (unparsed.size > 0) {
    console.log("\nNicht deutbare Formen, häufigste zuerst:");
    for (const [text, count] of [...unparsed.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20)) {
      console.log(`  ${String(count).padStart(4)}x  ${text}`);
    }
  }
}

await main();
