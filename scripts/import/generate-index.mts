/**
 * Erzeugt `src/lib/parking/seeds.generated.ts` – die Liste aller Seed-Dateien,
 * die die App lädt.
 *
 *     npm run import:index
 *
 * Von Hand gepflegt wäre diese Liste bei 85 Städten eine ständige Fehlerquelle;
 * ein importierter Datensatz, der nicht in der App auftaucht, fiele kaum auf.
 * Deshalb liest das Skript, was in `data/` tatsächlich liegt.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { projectRoot } from "./config.mjs";

/** Dateien, die keine Stadt-Seeds sind. */
const SKIP = /^_|\.(overrides|parsed|report|line-fixups)\.|^geocode-cache|^frankfurt-pdf-liste/u;

async function main() {
  const dataDir = path.join(projectRoot, "data");
  const files = (await fs.readdir(dataDir))
    .filter((file) => file.endsWith(".json") && !SKIP.test(file))
    .sort();

  const entries: { slug: string; file: string; official: boolean; spots: number }[] = [];

  for (const file of files) {
    const content = JSON.parse(await fs.readFile(path.join(dataDir, file), "utf8")) as {
      city?: { slug?: string };
      source?: string;
      spots?: unknown[];
    };
    if (!content.city?.slug || !Array.isArray(content.spots)) continue;

    entries.push({
      slug: content.city.slug,
      file,
      // OpenStreetMap-Quellen sind unvollständig; das muss die App wissen.
      official: !/OpenStreetMap/iu.test(content.source ?? ""),
      spots: content.spots.length,
    });
  }

  // Größte zuerst – die Karte zentriert auf die erste Stadt.
  entries.sort((a, b) => b.spots - a.spots);

  const lines = [
    "// Automatisch erzeugt von `npm run import:index` – nicht von Hand ändern.",
    "// Quelle sind die Seed-Dateien in `data/`.",
    "",
    'import type { SeedFile } from "./spots";',
    "",
    ...entries.map((entry, index) => `import seed${index} from "../../../data/${entry.file}";`),
    "",
    "export interface SeedEntry {",
    "  seed: SeedFile;",
    '  coverage: "official" | "crowdsourced";',
    "}",
    "",
    "export const seeds: SeedEntry[] = [",
    ...entries.map(
      (entry, index) =>
        `  { seed: seed${index} as SeedFile, coverage: "${entry.official ? "official" : "crowdsourced"}" },`,
    ),
    "];",
    "",
  ];

  const target = path.join(projectRoot, "src", "lib", "parking", "seeds.generated.ts");
  await fs.writeFile(target, lines.join("\n"), "utf8");

  const official = entries.filter((entry) => entry.official).length;
  console.log(
    `${entries.length} Städte eingebunden (${official} amtlich, ${entries.length - official} OSM).`,
  );
  console.log(`Standorte gesamt: ${entries.reduce((sum, entry) => sum + entry.spots, 0)}`);
  console.log(`Geschrieben: ${path.relative(process.cwd(), target)}`);
}

await main();
