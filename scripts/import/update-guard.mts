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
export function sameSpots(a: unknown, b: unknown): boolean {
  const spots = (value: unknown) =>
    JSON.stringify(
      (value as { spots?: unknown[] } | null)?.spots ?? null,
      (_key, v: unknown) =>
        v && typeof v === "object" && !Array.isArray(v)
          ? Object.fromEntries(Object.entries(v as object).sort(([x], [y]) => x.localeCompare(y)))
          : v,
    );
  return spots(a) === spots(b) && spots(a) !== "null";
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
