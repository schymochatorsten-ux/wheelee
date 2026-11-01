/**
 * Monatlicher Lauf: prüfen, ob sich amtliche Quellen geändert haben, und die
 * betroffenen Städte neu importieren (ToDo 19.10).
 *
 *     npm run data:update            # prüfen und importieren
 *     npm run data:update -- --dry   # nur zeigen, was fällig wäre
 *
 * Ablauf: `sources:check` (fragt nur nach Änderungsdaten) → je fälliger Stadt
 * `import:city` → bei Erfolg `import:streets`, `data:dedupe`, `import:index`.
 *
 * **Was automatisch läuft und was nicht.** Neu importiert werden nur Städte, die
 * schon aus einer amtlichen Quelle kommen und deren Quelle sich geändert hat
 * (oder deren Import älter als ein halbes Jahr ist). OpenStreetMap-Gemeinden
 * bleiben außen vor: Es gibt kein Änderungsdatum, und rund 3.700 Overpass-
 * Abfragen ungesehen zu starten wäre der Missbrauch, den CLAUDE.md beschreibt.
 *
 * **Schutz gegen stille Verschlechterung** (`update-guard.mts`): Vor jeder Stadt
 * wird die Seed-Datei samt Importstatus gesichert. Wird der neue Stand nicht
 * übernommen (Rückfall auf OSM, starker Rückgang, Fehler), kommt der alte
 * zurück und der Grund steht in `data/_auto-update.md`.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { checkAll } from "./check-sources.mjs";
import { projectRoot } from "./config.mjs";
import { loadStatus } from "./status.mjs";
import { judgeUpdate, sameSpots } from "./update-guard.mjs";

const data = (name: string) => path.join(projectRoot, "data", name);
const tsx = path.join(projectRoot, "node_modules", "tsx", "dist", "cli.mjs");

function run(script: string, args: string[] = []): boolean {
  const result = spawnSync(process.execPath, [tsx, path.join("scripts", "import", script), ...args], {
    cwd: projectRoot,
    stdio: "inherit",
  });
  return result.status === 0;
}

async function readOrNull(file: string): Promise<string | null> {
  try {
    return await fs.readFile(file, "utf8");
  } catch {
    return null;
  }
}

async function restore(file: string, content: string | null): Promise<void> {
  if (content === null) await fs.rm(file, { force: true });
  else await fs.writeFile(file, content, "utf8");
}

interface Outcome {
  city: string;
  slug: string;
  accepted: boolean;
  /** Neu geholt, aber inhaltlich gleich – kein Fehler, nur nichts zu tun. */
  unchanged?: boolean;
  before: number | null;
  after: number | null;
  note: string;
}

async function main() {
  const dry = process.argv.includes("--dry");

  const results = await checkAll();
  // Nur Städte, die jetzt amtlich geführt werden – „ungenutzt" und OSM bleiben
  // Handarbeit (siehe Kopfkommentar).
  const due = results.filter(
    (result) => result.reimport && ["geaendert", "unveraendert", "unpruefbar"].includes(result.verdict),
  );

  console.log(`\n${due.length} amtliche Stadt/Städte fällig: ${due.map((r) => r.slug).join(", ") || "–"}`);
  // Ein Probelauf schreibt keinen Bericht: Er würde den des letzten echten Laufs ersetzen.
  if (dry) return;
  if (due.length === 0) {
    await writeReport([], false, []);
    return;
  }

  const outcomes: Outcome[] = [];
  for (const result of due) {
    const seedFile = data(`${result.slug}.json`);
    const savedSeed = await readOrNull(seedFile);
    const savedJson = await readOrNull(data("_import-status.json"));
    const savedMd = await readOrNull(data("_import-status.md"));
    const before = (await loadStatus()).records.find((r) => r.slug === result.slug);

    const ran = run("import-city.mts", [result.slug]);
    const after = (await loadStatus()).records.find((r) => r.slug === result.slug);

    const judgement = ran && after
      ? judgeUpdate({ locations: before?.locations ?? null }, after)
      : { accept: false as const, reason: "Importlauf abgebrochen" };

    const newSeed = await readOrNull(seedFile);
    const unchanged =
      judgement.accept &&
      savedSeed !== null &&
      newSeed !== null &&
      sameSpots(JSON.parse(savedSeed), JSON.parse(newSeed));

    if (unchanged) {
      // Inhalt gleich: alles auf den alten Stand, damit nichts zu committen ist.
      await restore(seedFile, savedSeed);
      await restore(data("_import-status.json"), savedJson);
      await restore(data("_import-status.md"), savedMd);
      outcomes.push({
        city: result.city, slug: result.slug, accepted: false, unchanged: true,
        before: before?.locations ?? null, after: after?.locations ?? null,
        note: "Quelle neu geholt, Standorte unverändert",
      });
      console.log(`  = ${result.city}: Standorte unverändert, nichts zu übernehmen`);
    } else if (judgement.accept) {
      outcomes.push({
        city: result.city, slug: result.slug, accepted: true,
        before: before?.locations ?? null, after: after?.locations ?? null,
        note: result.detail,
      });
    } else {
      await restore(seedFile, savedSeed);
      await restore(data("_import-status.json"), savedJson);
      await restore(data("_import-status.md"), savedMd);
      outcomes.push({
        city: result.city, slug: result.slug, accepted: false,
        before: before?.locations ?? null, after: after?.locations ?? null,
        note: judgement.reason,
      });
      console.log(`  ↩ ${result.city}: alter Stand wiederhergestellt – ${judgement.reason}`);
    }
  }

  if (outcomes.some((o) => o.accepted)) {
    // Schritte 5 bis 7 aus Datenpflege.md.
    // Nur die eben importierten Städte, nicht alle mit Lücken: Das hielte Overpass
    // länger als nötig beschäftigt, und fremde Seed-Dateien blieben unberührt.
    const slugs = outcomes.filter((o) => o.accepted).map((o) => o.slug);
    run("street-names.mts", slugs);
    run("dedupe.mts", slugs);
    run("generate-index.mts");
  }
  await writeReport(outcomes, false, []);
}

async function writeReport(outcomes: Outcome[], dry: boolean, planned: string[]) {
  const lines = [
    "# Automatische Aktualisierung",
    "",
    `Stand: ${new Date().toISOString().slice(0, 10)}${dry ? " (Probelauf, nichts importiert)" : ""}`,
    "",
    "Erzeugt von `npm run data:update`. Nicht von Hand bearbeiten; die Geschichte steht in den Commits.",
    "",
  ];
  if (planned.length > 0) lines.push("## Fällig", "", ...planned.map((p) => `- ${p}`), "");
  if (outcomes.length === 0 && planned.length === 0) lines.push("Nichts fällig.", "");
  if (outcomes.length > 0) {
    lines.push("## Ergebnis", "", "| Stadt | Befund | Standorte vorher → nachher | Hinweis |", "| --- | --- | --- | --- |");
    for (const o of outcomes) {
      lines.push(`| ${o.city} | ${o.accepted ? "✅ übernommen" : o.unchanged ? "= unverändert" : "↩ verworfen"} | ${o.before ?? "–"} → ${o.accepted ? (o.after ?? "–") : "unverändert"} | ${o.note} |`);
    }
    lines.push("");
  }
  await fs.writeFile(data("_auto-update.md"), lines.join("\n"), "utf8");
  console.log("Geschrieben: data/_auto-update.md");
}

await main();
