import { db, now } from "./sqlite";

/**
 * Ausgeblendete und von Hand behaltene Parkplätze (ToDo 8.11).
 *
 * **Was sich hier umkehrt.** Bis zum 2026-11-13 galt die Festlegung aus dem
 * Konzept und aus 8.6: Bewertungen ändern nichts an den Daten, kein Parkplatz
 * verschwindet, die Meldungen führen auf eine Prüfliste für einen Menschen
 * (`reportedSpots`). Diese Liste bleibt – sie ist jetzt der Nachweis statt der
 * einzigen Wirkung. **Neu ist, dass genügend Meldungen den Platz von selbst
 * ausblenden.**
 *
 * **Ausgeblendet, nicht gelöscht**, und das ist der ganze Unterschied:
 *
 * - Ein Irrtum ist umkehrbar. Fünf Leute können sich im Platz vertun oder eine
 *   Baustelle für eine Aufhebung halten; die Verwaltung holt ihn zurück.
 * - Bei einem Standort aus einer Seed-Datei wäre Löschen ohnehin wirkungslos –
 *   der nächste Import legt ihn wieder an. Dann aber ohne jede Spur, dass ihn
 *   jemand gemeldet hat.
 * - Die Zählerstände aus dem Moment der Entscheidung bleiben als Beleg
 *   stehen, auch wenn Stimmen später zurückgezogen werden.
 *
 * **`kept` ist der Gegenzustand und kein Löschen der Zeile.** Wer einen Platz
 * zurückholt, widerspricht der Schlussfolgerung, nicht den Meldungen: Die
 * Stimmen bleiben stehen, also würde die nächste Prüfung die Schwelle sofort
 * wieder überschreiten. Ein Knopf, der nichts bewirkt, wäre schlimmer als
 * keiner – deshalb setzt „zurückholen" eine eigene Entscheidung, die die
 * Automatik nicht anrührt.
 */

export type SpotStatus = "hidden" | "kept";

export interface SpotDecision {
  spotId: string;
  status: SpotStatus;
  reason: "votes" | "admin";
  goneCount: number;
  existsCount: number;
  wasUnsicher: boolean;
  decidedAt: string;
}

interface Raw {
  spot_id: string;
  status: SpotStatus;
  reason: "votes" | "admin";
  gone_count: number;
  exists_count: number;
  was_unsicher: number;
  decided_at: string;
}

const toDecision = (row: Raw): SpotDecision => ({
  spotId: row.spot_id,
  status: row.status,
  reason: row.reason,
  goneCount: Number(row.gone_count),
  existsCount: Number(row.exists_count),
  wasUnsicher: Number(row.was_unsicher) === 1,
  decidedAt: row.decided_at,
});

/**
 * Die IDs aller ausgeblendeten Plätze.
 *
 * Als `Set`, weil der Aufrufer über 18.000 Standorte läuft und je Standort
 * nachsieht. Die Tabelle selbst bleibt klein: Hier landet nur, was mehrfach
 * gemeldet oder von Hand entschieden wurde.
 */
export function hiddenSpotIds(): Set<string> {
  const rows = db()
    .prepare("SELECT spot_id FROM spot_decision WHERE status = 'hidden'")
    .all() as unknown as { spot_id: string }[];
  return new Set(rows.map((row) => row.spot_id));
}

/** Die Entscheidungen für die Verwaltung, die jüngste zuerst. */
export function spotDecisions(status?: SpotStatus): SpotDecision[] {
  const sql = `SELECT spot_id, status, reason, gone_count, exists_count, was_unsicher, decided_at
                 FROM spot_decision ${status ? "WHERE status = ?" : ""}
                ORDER BY decided_at DESC`;
  const rows = (status
    ? db().prepare(sql).all(status)
    : db().prepare(sql).all()) as unknown as Raw[];
  return rows.map(toDecision);
}

/** Der Zustand eines einzelnen Platzes, oder `null` für „nie entschieden". */
export function spotDecision(spotId: string): SpotDecision | null {
  const row = db()
    .prepare(
      `SELECT spot_id, status, reason, gone_count, exists_count, was_unsicher, decided_at
         FROM spot_decision WHERE spot_id = ?`,
    )
    .get(spotId) as Raw | undefined;
  return row ? toDecision(row) : null;
}

interface Counts {
  spotId: string;
  goneCount: number;
  existsCount: number;
  wasUnsicher: boolean;
}

/**
 * Ausblenden.
 *
 * Eine bestehende Entscheidung wird **nicht** überschrieben: Ein Platz, der
 * schon weg ist, behält seine erste Begründung, und ein von Hand behaltener
 * bleibt sichtbar. Wer das ändern will, nimmt `decideSpot`.
 */
export function hideSpot(
  counts: Counts,
  reason: "votes" | "admin",
  accountId: string | null = null,
): void {
  db()
    .prepare(
      `INSERT INTO spot_decision
            (spot_id, status, reason, gone_count, exists_count, was_unsicher, decided_at, decided_by)
            VALUES (?, 'hidden', ?, ?, ?, ?, ?, ?)
       ON CONFLICT (spot_id) DO NOTHING`,
    )
    .run(
      counts.spotId,
      reason,
      counts.goneCount,
      counts.existsCount,
      counts.wasUnsicher ? 1 : 0,
      now(),
      accountId,
    );
}

/**
 * Von Hand entscheiden: ausblenden oder dauerhaft behalten.
 *
 * Überschreibt eine vorhandene Entscheidung – das ist hier richtig, denn es
 * ist ein Mensch, der sie trifft, und er sieht die Zählerstände dabei.
 */
export function decideSpot(
  counts: Counts,
  status: SpotStatus,
  accountId: string | null = null,
): SpotDecision {
  db()
    .prepare(
      `INSERT INTO spot_decision
            (spot_id, status, reason, gone_count, exists_count, was_unsicher, decided_at, decided_by)
            VALUES (?, ?, 'admin', ?, ?, ?, ?, ?)
       ON CONFLICT (spot_id) DO UPDATE SET
            status       = excluded.status,
            reason       = 'admin',
            gone_count   = excluded.gone_count,
            exists_count = excluded.exists_count,
            was_unsicher = excluded.was_unsicher,
            decided_at   = excluded.decided_at,
            decided_by   = excluded.decided_by`,
    )
    .run(
      counts.spotId,
      status,
      counts.goneCount,
      counts.existsCount,
      counts.wasUnsicher ? 1 : 0,
      now(),
      accountId,
    );

  return spotDecision(counts.spotId)!;
}

/**
 * Die Entscheidung ganz zurücknehmen – der Platz ist wieder sichtbar **und**
 * unterliegt wieder der Automatik.
 *
 * Gebraucht für den Fall, dass jemand versehentlich „behalten" gesetzt hat.
 * Nicht derselbe Knopf wie „zurückholen": Dort ist die Aussetzung der
 * Automatik der Zweck.
 */
export function clearDecision(spotId: string): boolean {
  const result = db().prepare("DELETE FROM spot_decision WHERE spot_id = ?").run(spotId);
  return Number(result.changes) > 0;
}
