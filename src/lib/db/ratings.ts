import { db, now } from "./sqlite";
import type { RatingSummary, RatingVote } from "../types";

/**
 * Bewertungen: „Existiert" und „Existiert nicht mehr" (ToDos 8.1–8.7).
 *
 * **Die Regel, festgelegt am 2026-10-19:**
 *
 * - **Sehen darf jede:r** – Zählerstände und Zeitpunkte stehen in der
 *   Detailansicht, auch ohne Konto.
 * - **Bewerten nur mit Konto**, und zwar in **beide** Richtungen.
 * - **Höchstens eine Stimme je Konto und Parkplatz**, entweder hoch oder
 *   runter.
 *
 * Das weicht von der ursprünglichen Festlegung vom 2026-10-09 ab, nach der
 * der Daumen hoch **ohne** Konto möglich sein sollte. Die Begründung für die
 * Änderung steht in `Erledigt.md`; hier steht sie, damit niemand die
 * Anmeldepflicht für eine Nachlässigkeit hält und „repariert".
 *
 * **Was hier bewusst fehlt: eine Gerätekennung.** Sie war nötig, solange
 * anonym bewertet werden durfte – mit Anmeldepflicht ist das Konto die
 * Zurechnungseinheit, und eine zweite, schwächere daneben wäre nur eine
 * weitere Spur ohne Nutzen (Abschnitt 10: Datensparsamkeit).
 */

/** Eine Stimme, wie die Oberfläche sie kennt. */
export interface OwnVote {
  vote: RatingVote;
  /** Wann zuletzt gesetzt oder geändert. */
  at: string;
}

interface CountRow {
  vote: RatingVote;
  anzahl: number;
  letzte: string | null;
}

const EMPTY = (spotId: string): RatingSummary => ({
  spotId,
  existsCount: 0,
  goneCount: 0,
  lastExistsAt: null,
  lastGoneAt: null,
});

/**
 * Zählerstände und Zeitpunkte zu einem Parkplatz.
 *
 * Maßgeblich ist `COALESCE(updated_at, created_at)` – wann die Stimme
 * **zuletzt gegolten** hat, nicht wann sie zuerst abgegeben wurde. Wer vor
 * einem Jahr bestätigt und gestern auf „existiert nicht mehr" gewechselt ist,
 * soll bei „zuletzt bestätigt am" nicht mit dem alten Datum erscheinen.
 */
export function ratingSummary(spotId: string): RatingSummary {
  const rows = db()
    .prepare(
      `SELECT vote, COUNT(*) AS anzahl, MAX(COALESCE(updated_at, created_at)) AS letzte
         FROM rating
        WHERE spot_id = ?
        GROUP BY vote`,
    )
    .all(spotId) as unknown as CountRow[];

  const summary = EMPTY(spotId);

  for (const row of rows) {
    if (row.vote === "exists") {
      summary.existsCount = Number(row.anzahl);
      summary.lastExistsAt = row.letzte;
    } else {
      summary.goneCount = Number(row.anzahl);
      summary.lastGoneAt = row.letzte;
    }
  }

  return summary;
}

/** Die eigene Stimme zu einem Parkplatz, oder `null`. */
export function ownVote(spotId: string, accountId: string): OwnVote | null {
  const row = db()
    .prepare(
      `SELECT vote, COALESCE(updated_at, created_at) AS at
         FROM rating WHERE spot_id = ? AND account_id = ?`,
    )
    .get(spotId, accountId) as { vote: RatingVote; at: string } | undefined;

  return row ? { vote: row.vote, at: row.at } : null;
}

/**
 * Stimme abgeben, umdrehen oder zurücknehmen.
 *
 * Der Rückgabewert sagt, was geschehen ist – die Oberfläche braucht das, um
 * den Knopf richtig zu zeichnen.
 *
 * **Dreimal dieselbe Richtung ist keine dreifache Stimme, sondern ein
 * Umschalter.** Das ist die einzige Bedienung, die sich erklären lässt: Wer
 * den schon gedrückten Daumen noch einmal antippt, will ihn zurücknehmen –
 * alles andere wäre ein Knopf, der beim zweiten Druck nichts tut.
 *
 * **Die Stimme lässt sich jederzeit ändern, und das ist kein Schlupfloch.**
 * Ein Parkplatz, den jemand vor einem Jahr bestätigt hat, kann heute
 * aufgehoben sein. Wäre die erste Stimme endgültig, könnte ausgerechnet die
 * Person, die am besten Bescheid weiß, die Korrektur nicht melden. Die Grenze
 * „höchstens eine" bleibt dabei gewahrt – es wird ersetzt, nicht ergänzt.
 */
export type VoteResult = "gesetzt" | "geaendert" | "zurueckgenommen";

export function castVote(spotId: string, accountId: string, vote: RatingVote): VoteResult {
  const existing = ownVote(spotId, accountId);

  if (existing?.vote === vote) {
    db().prepare("DELETE FROM rating WHERE spot_id = ? AND account_id = ?").run(spotId, accountId);
    return "zurueckgenommen";
  }

  if (existing) {
    db()
      .prepare("UPDATE rating SET vote = ?, updated_at = ? WHERE spot_id = ? AND account_id = ?")
      .run(vote, now(), spotId, accountId);
    return "geaendert";
  }

  db()
    .prepare("INSERT INTO rating (spot_id, account_id, vote, created_at) VALUES (?, ?, ?, ?)")
    .run(spotId, accountId, vote, now());
  return "gesetzt";
}

/**
 * Parkplätze, die mehrfach als „existiert nicht mehr" gemeldet wurden
 * (ToDo 8.9).
 *
 * **Gezählt werden Konten, nicht Stimmen** – das ist durch die
 * Eindeutigkeitsbedingung ohnehin dasselbe, und genau deshalb ist diese Liste
 * belastbar: Zehn Meldungen heißen zehn verschiedene Menschen, nicht
 * zehnmal dieselbe Person mit frisch geleertem Browser.
 *
 * Die Liste ändert **nichts** an den Daten (8.6). Sie sagt einem Menschen,
 * wo er nachsehen sollte.
 */
export function spotsReportedGone(minimum = 2): { spotId: string; goneCount: number }[] {
  const rows = db()
    .prepare(
      `SELECT spot_id AS spotId, COUNT(*) AS goneCount
         FROM rating
        WHERE vote = 'gone'
        GROUP BY spot_id
       HAVING COUNT(*) >= ?
        ORDER BY COUNT(*) DESC, spot_id`,
    )
    .all(minimum) as unknown as { spotId: string; goneCount: number }[];

  return rows.map((row) => ({ spotId: row.spotId, goneCount: Number(row.goneCount) }));
}
