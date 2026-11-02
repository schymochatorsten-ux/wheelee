/**
 * Entscheidet, ob ein automatischer Neuimport übernommen wird (ToDo 19.10).
 *
 * `import:city` fällt auf OpenStreetMap zurück, wenn die amtliche Quelle
 * nichts liefert, und überschreibt dabei die Seed-Datei. Für den Handlauf ist
 * das richtig, denn ein Mensch sieht die Ausgabe. Läuft der Import ungesehen
 * auf dem NAS, wäre ein stiller Rückfall von 920 amtlichen auf 300
 * OSM-Standorte genau der Schaden, den „lieber kein Import als ein falscher"
 * verhindern soll. Deshalb wird nur übernommen, was
 *
 * - weiterhin aus der amtlichen Quelle kommt und
 * - nicht auf weniger als `MIN_SHARE` des bisherigen Bestands schrumpft.
 *
 * Mehr Standorte als vorher sind kein Grund zur Ablehnung: München wuchs von
 * 218 auf 568, weil die Stadt ihre Liste erweitert hatte.
 */
export const MIN_SHARE = 0.7;

export interface BeforeState {
  locations: number | null;
}

export interface AfterState {
  status: string;
  usedSource: string | null;
  locations: number | null;
}

/**
 * Haben zwei Fassungen einer Seed-Datei dieselben Standorte? `generatedAt` und
 * die Reihenfolge der Schlüssel zählen nicht, nur der Inhalt von `spots`.
 *
 * Der Grund: GovData meldet `metadata_modified` auch bei geänderter
 * Beschreibung. Ohne diese Prüfung entstünde bei jedem solchen Hinweis ein
 * Commit, ein Push und auf dem NAS ein Neubau des Abbilds – für identische
 * Daten.
 */
export function sameSpots(a: unknown, b: unknown, options: { coarse?: boolean } = {}): boolean {
  const spots = (value: unknown) => {
    const list = (value as { spots?: Record<string, unknown>[] } | null)?.spots;
    if (!Array.isArray(list)) return "null";
    // `coarse`: nur, was der Standort **ist** (Platz, Lage, Anzahl, Zeitbeschränkung). Straßennamen
    // trägt erst `import:streets` nach; ein frisch geholter Stand hat sie noch nicht und
    // wäre sonst jedes Mal „anders“ als der angereicherte.
    const rows = options.coarse
      ? list.map((s) => [s.id, s.lat, s.lng, s.spotCount, s.timeRestriction ?? null])
      : list;
    return JSON.stringify(rows, (_key, v: unknown) =>
      v && typeof v === "object" && !Array.isArray(v)
        ? Object.fromEntries(Object.entries(v as object).sort(([x], [y]) => x.localeCompare(y)))
        : v,
    );
  };
  return spots(a) === spots(b) && spots(a) !== "null";
}

/**
 * Zustand des Tageslaufs (liegt im Zustandsverzeichnis, nicht im Klon).
 *
 * - `looked`: wann eine Stadt zuletzt angesehen und als inhaltlich unverändert
 *   befunden wurde; dieselbe Metadatenänderung löst dann nicht erneut aus.
 * - `tried`: wann ein Import zuletzt verworfen wurde; Wiederholung erst nach
 *   `RETRY_DAYS`, damit eine kaputte Quelle nicht täglich abgefragt wird.
 * - `pending`: fällige Städte, die der Tageslauf wegen der Obergrenze noch nicht
 *   geschafft hat. Ohne diese Liste ginge ein ETag-Hinweis verloren, denn der
 *   gemerkte ETag steht am nächsten Tag schon im neuen Stand.
 */
export interface UpdateState {
  looked: Record<string, string>;
  tried: Record<string, string>;
  pending: string[];
  /** Wann zuletzt der regionale Sammeldatensatz verglichen wurde. */
  regionalAt?: string;
}

export const RETRY_DAYS = 7;

export function emptyState(): UpdateState {
  return { looked: {}, tried: {}, pending: [] };
}

export interface Candidate {
  slug: string;
  /** Bezugsdatum (Import oder letztes Nachsehen), ISO; `null` = nie. */
  since: string | null;
}

/**
 * Welche Städte kommen heute dran? Höchstens `max`, die am längsten
 * unbesehenen zuerst; der Rest bleibt vorgemerkt. Wenige je Lauf halten die
 * Last auf Nominatim, Overpass und den Portalen klein und die Commits
 * überschaubar.
 */
export function pickDue(
  flagged: Candidate[],
  pending: Candidate[],
  state: Pick<UpdateState, "tried">,
  max: number,
  now: Date = new Date(),
): { run: string[]; pending: string[] } {
  const bySlug = new Map<string, Candidate>();
  for (const candidate of [...pending, ...flagged]) bySlug.set(candidate.slug, candidate);

  const retryAfter = now.getTime() - RETRY_DAYS * 86_400_000;
  const open = [...bySlug.values()]
    .filter((candidate) => {
      const tried = state.tried[candidate.slug];
      return !tried || new Date(tried).getTime() < retryAfter;
    })
    .sort((a, b) => (a.since ?? "").localeCompare(b.since ?? ""));

  return {
    run: open.slice(0, max).map((candidate) => candidate.slug),
    pending: open.slice(max).map((candidate) => candidate.slug),
  };
}

export type Judgement = { accept: true } | { accept: false; reason: string };

export function judgeUpdate(before: BeforeState, after: AfterState): Judgement {
  if (after.status !== "fertig") {
    return { accept: false, reason: `Import endete mit Status „${after.status}“` };
  }
  if (!/^amtlich/iu.test(after.usedSource ?? "")) {
    return {
      accept: false,
      reason: `amtliche Quelle lieferte nichts mehr, Rückfall auf ${after.usedSource ?? "unbekannt"}`,
    };
  }
  const now = after.locations ?? 0;
  if (now === 0) return { accept: false, reason: "0 Standorte" };
  if (before.locations && now < before.locations * MIN_SHARE) {
    return {
      accept: false,
      reason: `nur noch ${now} statt ${before.locations} Standorten (unter ${Math.round(MIN_SHARE * 100)} %)`,
    };
  }
  return { accept: true };
}
