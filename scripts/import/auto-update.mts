/**
 * Täglicher Lauf: prüfen, ob sich amtliche Quellen geändert haben, und die
 * wenigen betroffenen Städte neu importieren (ToDo 19.10).
 *
 *     npm run data:update            # prüfen und importieren
 *     npm run data:update -- --dry   # nur zeigen, was fällig wäre
 *
 * Ablauf: `sources:check` (fragt nur nach Änderungsdaten, rund 20 Sekunden) →
 * je fälliger Stadt `import:city` → bei Erfolg `import:streets`, `data:dedupe`,
 * `import:index`.
 *
 * **Warum täglich und dafür wenig auf einmal.** Die Prüfung kostet fast nichts;
 * teuer ist nur der Neubau des Abbilds nach einem Push, und der entsteht nur bei
 * echter Datenänderung (gleiche Standorte → kein Commit). Täglich heißt:
 * Änderungen kommen binnen eines Tages an, und je Lauf werden höchstens
 * `WHEELEE_MAX_STAEDTE` (Vorgabe 5) Städte angefasst – die am längsten
 * unbesehenen zuerst, der Rest bleibt vorgemerkt. Das hält die Last auf
 * Nominatim, Overpass und die Portale klein.
 *
 * **Was automatisch läuft und was nicht.** Neu importiert werden nur Städte, die
 * schon aus einer amtlichen Quelle kommen und deren Quelle sich geändert hat
 * (oder deren letztes Nachsehen älter als ein halbes Jahr ist). OpenStreetMap-
 * Gemeinden bleiben außen vor: Es gibt kein Änderungsdatum, und rund 3.700
 * Overpass-Abfragen ungesehen zu starten wäre der Missbrauch, den CLAUDE.md
 * beschreibt.
 *
 * **Täglich darf nichts täglich dasselbe tun.** Zwei Merker im Zustand
 * (`update-guard.mts`): Eine Stadt, die angesehen und inhaltlich unverändert
 * befunden wurde, gilt bis zur nächsten Änderung der Quelle als erledigt; ein
 * verworfener Import wird erst nach einer Woche wiederholt. Sonst riefe eine
 * Metadatenänderung bei GovData oder ein kaputter Dienst (Köln) jeden Tag
 * dieselbe Abfrage hervor.
 *
 * **Schutz gegen stille Verschlechterung:** Vor jeder Stadt wird die Seed-Datei
 * samt Importstatus gesichert. Wird der neue Stand nicht übernommen (Rückfall
 * auf OSM, starker Rückgang, Fehler), kommt der alte zurück und der Grund
 * steht in `data/_auto-update.md`.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { checkAll } from "./check-sources.mjs";
import { projectRoot } from "./config.mjs";
import { loadStatus } from "./status.mjs";
import { emptyState, judgeUpdate, pickDue, sameSpots, type UpdateState } from "./update-guard.mjs";

const data = (name: string) => path.join(projectRoot, "data", name);
const tsx = path.join(projectRoot, "node_modules", "tsx", "dist", "cli.mjs");

/** Der Zustand überlebt die Läufe: auf dem NAS im Zustandsverzeichnis, sonst in data/. */
const statePath = process.env.WHEELEE_STATE_DIR
  ? path.join(process.env.WHEELEE_STATE_DIR, "auto-update.json")
  : data("_auto-update.json");

const MAX_CITIES = Number.parseInt(process.env.WHEELEE_MAX_STAEDTE ?? "5", 10) || 5;

/** Quellen, die jetzt amtlich geführt werden – „ungenutzt“, „tot“ und OSM bleiben Handarbeit. */
const OFFICIAL_VERDICTS = ["geaendert", "unveraendert", "unpruefbar"];

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

async function loadState(): Promise<UpdateState> {
  const raw = await readOrNull(statePath);
  if (!raw) return emptyState();
  try {
    return { ...emptyState(), ...(JSON.parse(raw) as Partial<UpdateState>) };
  } catch {
    return emptyState();
  }
}

async function saveState(state: UpdateState): Promise<void> {
  await fs.mkdir(path.dirname(statePath), { recursive: true });
  await fs.writeFile(statePath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
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

  const state = await loadState();
  const results = await checkAll([], state.looked, !dry);
  const eligible = results.filter((result) => OFFICIAL_VERDICTS.includes(result.verdict));
  const toCandidate = (result: { slug: string; since: string | null }) => ({
    slug: result.slug,
    since: result.since,
  });

  const picked = pickDue(
    eligible.filter((result) => result.reimport).map(toCandidate),
    eligible.filter((result) => state.pending.includes(result.slug)).map(toCandidate),
    state,
    MAX_CITIES,
  );
  const bySlug = new Map(results.map((result) => [result.slug, result]));

  console.log(
    `\n${picked.run.length} amtliche Stadt/Städte heute: ${picked.run.join(", ") || "–"}` +
      (picked.pending.length > 0 ? ` · vorgemerkt: ${picked.pending.join(", ")}` : ""),
  );
  // Ein Probelauf schreibt weder Bericht noch Zustand: Er würde die des letzten echten Laufs ersetzen.
  if (dry) return;

  state.pending = picked.pending;
  if (picked.run.length === 0) {
    await saveState(state);
    return;
  }

  const outcomes: Outcome[] = [];
  for (const slug of picked.run) {
    const result = bySlug.get(slug)!;
    const seedFile = data(`${slug}.json`);
    const savedSeed = await readOrNull(seedFile);
    const savedJson = await readOrNull(data("_import-status.json"));
    const savedMd = await readOrNull(data("_import-status.md"));
    const before = (await loadStatus()).records.find((r) => r.slug === slug);

    const ran = run("import-city.mts", [slug]);
    const after = (await loadStatus()).records.find((r) => r.slug === slug);

    const judgement =
      ran && after
        ? judgeUpdate({ locations: before?.locations ?? null }, after)
        : { accept: false as const, reason: "Importlauf abgebrochen" };

    const newSeed = await readOrNull(seedFile);
    const unchanged =
      judgement.accept &&
      savedSeed !== null &&
      newSeed !== null &&
      sameSpots(JSON.parse(savedSeed), JSON.parse(newSeed));

    const base = {
      city: result.city,
      slug,
      before: before?.locations ?? null,
      after: after?.locations ?? null,
    };

    if (unchanged) {
      // Inhalt gleich: alles auf den alten Stand, damit nichts zu committen ist.
      await restore(seedFile, savedSeed);
      await restore(data("_import-status.json"), savedJson);
      await restore(data("_import-status.md"), savedMd);
      state.looked[slug] = new Date().toISOString();
      delete state.tried[slug];
      outcomes.push({ ...base, accepted: false, unchanged: true, note: "Quelle neu geholt, Standorte unverändert" });
      console.log(`  = ${result.city}: Standorte unverändert, nichts zu übernehmen`);
    } else if (judgement.accept) {
      state.looked[slug] = new Date().toISOString();
      delete state.tried[slug];
      outcomes.push({ ...base, accepted: true, note: result.detail });
    } else {
      await restore(seedFile, savedSeed);
      await restore(data("_import-status.json"), savedJson);
      await restore(data("_import-status.md"), savedMd);
      state.tried[slug] = new Date().toISOString();
      outcomes.push({ ...base, accepted: false, note: judgement.reason });
      console.log(`  ↩ ${result.city}: alter Stand wiederhergestellt – ${judgement.reason}`);
    }
    // Nach jeder Stadt, damit ein Abbruch das Gemerkte nicht verliert.
    await saveState(state);
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
  await writeReport(outcomes);
}

async function writeReport(outcomes: Outcome[]) {
  const lines = [
    "# Automatische Aktualisierung",
    "",
    `Stand: ${new Date().toISOString().slice(0, 10)}`,
    "",
    "Erzeugt von `npm run data:update`. Nicht von Hand bearbeiten; die Geschichte steht in den Commits.",
    "",
    "## Ergebnis",
    "",
    "| Stadt | Befund | Standorte vorher → nachher | Hinweis |",
    "| --- | --- | --- | --- |",
  ];
  for (const o of outcomes) {
    const verdict = o.accepted ? "✅ übernommen" : o.unchanged ? "= unverändert" : "↩ verworfen";
    lines.push(
      `| ${o.city} | ${verdict} | ${o.before ?? "–"} → ${o.accepted ? (o.after ?? "–") : "unverändert"} | ${o.note} |`,
    );
  }
  lines.push("");
  await fs.writeFile(data("_auto-update.md"), lines.join("\n"), "utf8");
  console.log("Geschrieben: data/_auto-update.md");
}

await main();
