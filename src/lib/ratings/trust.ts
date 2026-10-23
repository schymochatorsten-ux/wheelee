/**
 * Gewichtung von Bewertungen für die Prüflisten (ToDo 11.6).
 *
 * **Reine Rechnung, ohne Datenbank, ohne Uhr:** Die Uhrzeit kommt als Parameter
 * herein, damit ein Test „vor zwei Jahren" ohne Warten prüfen kann. Das SQL
 * steht in `db/ratings.ts` und `scripts/import/ratings.mts`; beide füttern
 * diese Datei.
 *
 * **Nichts hiervon ändert Parkplatzdaten (8.6).** Das Ergebnis entscheidet nur,
 * *in welcher Lage* ein Mensch auf einer Prüfliste nachsieht und warum.
 */

export type TrustVote = "exists" | "gone";

/** Eine Stimme, wie sie aus der Tabelle `rating` kommt. */
export interface VoteRecord {
  spotId: string;
  accountId: string;
  vote: TrustVote;
  /** `COALESCE(updated_at, created_at)` – wann die Stimme zuletzt galt. */
  at: string;
}

/** Zählstände und gewichtete Summen zu einem Parkplatz. */
export interface SpotAssessment {
  existsCount: number;
  goneCount: number;
  existsWeight: number;
  goneWeight: number;
  /** Die letzten drei Stimmen sind alle „aufgehoben". */
  lastThreeGone: boolean;
}

const MONTH_MS = 30.4375 * 24 * 60 * 60 * 1000;

/**
 * Stützstellen des Altersgewichts (Torsten, 2026-10-23): 0 Monate 100 %,
 * 6 Monate 75 %, 1 Jahr 50 %, 2 Jahre 25 %; dazwischen linear.
 *
 * **Über zwei Jahre bleibt es bei 25 %** – das ist eine Annahme, keine
 * Vorgabe: Eine uralte Stimme verliert Aussage, aber nie ganz; sonst könnte ein
 * Parkplatz, den niemand mehr anfasst, durch bloßes Warten „unbewertet" werden.
 */
const AGE_POINTS: readonly (readonly [months: number, weight: number])[] = [
  [0, 1],
  [6, 0.75],
  [12, 0.5],
  [24, 0.25],
];

/** Gewicht einer Stimme nach Alter. Zukunft (Uhrenabweichung) zählt als frisch. */
export function ageWeight(at: string, now: Date): number {
  const time = Date.parse(at);
  if (Number.isNaN(time)) return 1;

  const months = Math.max(0, (now.getTime() - time) / MONTH_MS);
  const last = AGE_POINTS[AGE_POINTS.length - 1];
  if (months >= last[0]) return last[1];

  for (let i = 1; i < AGE_POINTS.length; i++) {
    const [m1, w1] = AGE_POINTS[i];
    if (months <= m1) {
      const [m0, w0] = AGE_POINTS[i - 1];
      return w0 + ((w1 - w0) * (months - m0)) / (m1 - m0);
    }
  }
  return last[1];
}

/**
 * Konto-Gewichtung: wer mit den anderen übereinstimmt, zählt mehr.
 *
 * Grenzen, jeweils mit Grund:
 *
 * - **Mindestens 3 Konten je Parkplatz** (`MIN_RATERS`): Mit zwei Stimmen gäbe
 *   es keine „anderen", gegen die man übereinstimmt. Der Vergleich ist
 *   **ohne die eigene Stimme** (mindestens 2 andere, kein Gleichstand) – sonst
 *   bestätigte sich jede Stimme selbst.
 * - **Mindestens 5 gezählte Parkplätze je Konto** (`MIN_COUNTED_SPOTS`): Eine
 *   Quote aus 1 von 1 ist keine Auskunft. Darunter bleibt der Faktor 1,0.
 * - **Faktor 1,0 bis 2,0** (`FACTOR_MAX`): Das Gewicht wächst linear mit der
 *   Quote, nach oben gedeckelt, damit ein einzelnes Konto nie mehr als doppelt
 *   zählt – und nach unten nie unter eine normale Stimme fällt. Wer oft von
 *   der Mehrheit abweicht, hatte vielleicht als Einziger recht; das darf ihn
 *   nicht zum Schweigen bringen.
 *
 * **Restgrenze, offen benannt:** Absprachen. Mehrere Konten, die sich
 * gegenseitig bestätigen, erhöhen sich so gegenseitig das Gewicht. Die Deckelung
 * begrenzt den Schaden, verhindert ihn nicht.
 */
export const MIN_RATERS = 3;
export const MIN_COUNTED_SPOTS = 5;
export const FACTOR_MAX = 2;

export function accountFactors(votes: readonly VoteRecord[]): Map<string, number> {
  const bySpot = new Map<string, VoteRecord[]>();
  for (const record of votes) {
    const list = bySpot.get(record.spotId);
    if (list) list.push(record);
    else bySpot.set(record.spotId, [record]);
  }

  const counted = new Map<string, number>();
  const agreed = new Map<string, number>();

  for (const list of bySpot.values()) {
    if (list.length < MIN_RATERS) continue;
    const gone = list.filter((record) => record.vote === "gone").length;
    const exists = list.length - gone;

    for (const record of list) {
      const othersGone = gone - (record.vote === "gone" ? 1 : 0);
      const othersExists = exists - (record.vote === "exists" ? 1 : 0);
      if (othersGone === othersExists) continue; // kein Mehrheitsbild
      const majority: TrustVote = othersGone > othersExists ? "gone" : "exists";

      counted.set(record.accountId, (counted.get(record.accountId) ?? 0) + 1);
      if (record.vote === majority) {
        agreed.set(record.accountId, (agreed.get(record.accountId) ?? 0) + 1);
      }
    }
  }

  const factors = new Map<string, number>();
  for (const [accountId, total] of counted) {
    if (total < MIN_COUNTED_SPOTS) continue;
    const share = (agreed.get(accountId) ?? 0) / total;
    factors.set(accountId, Math.min(FACTOR_MAX, 1 + share));
  }
  return factors;
}

/** Sind die letzten drei Stimmen alle „aufgehoben"? Weniger als drei: nein. */
export function lastThreeGone(votes: readonly VoteRecord[]): boolean {
  if (votes.length < 3) return false;
  const newest = [...votes]
    .sort((a, b) => (a.at < b.at ? 1 : a.at > b.at ? -1 : a.accountId.localeCompare(b.accountId)))
    .slice(0, 3);
  // UNIQUE (spot_id, account_id) macht die drei zu drei verschiedenen Konten.
  return newest.every((record) => record.vote === "gone");
}

/** Zählstände und gewichtete Summen zu **einem** Parkplatz. */
export function assessSpot(
  votes: readonly VoteRecord[],
  factors: ReadonlyMap<string, number>,
  now: Date,
): SpotAssessment {
  const result: SpotAssessment = {
    existsCount: 0,
    goneCount: 0,
    existsWeight: 0,
    goneWeight: 0,
    lastThreeGone: lastThreeGone(votes),
  };

  for (const record of votes) {
    const weight = ageWeight(record.at, now) * (factors.get(record.accountId) ?? 1);
    if (record.vote === "gone") {
      result.goneCount += 1;
      result.goneWeight += weight;
    } else {
      result.existsCount += 1;
      result.existsWeight += weight;
    }
  }
  return result;
}

/** Warum steht ein Parkplatz auf der Prüfliste? */
export type ReportReason = "lastThreeGone" | "reports";

export function reportReasons(assessment: SpotAssessment, minimum: number): ReportReason[] {
  const reasons: ReportReason[] = [];
  if (assessment.lastThreeGone) reasons.push("lastThreeGone");
  if (assessment.goneCount >= minimum) reasons.push("reports");
  return reasons;
}

/** Gewichtete Summe für die Anzeige: eine Nachkommastelle. */
export function roundWeight(value: number): number {
  return Math.round(value * 10) / 10;
}
