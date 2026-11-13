import { db, now } from "./sqlite";

/**
 * Die zwei Schwellen, ab denen ein Parkplatz verschwindet (ToDo 8.11).
 *
 * **Warum zwei und nicht eine.** Ein Parkplatz, dessen Lage gemessen und von
 * zwei Quellen bestätigt ist, soll nicht an zwei Stimmen scheitern – dort
 * steht eine geprüfte amtliche Angabe gegen eine Meldung, und Irrtümer gibt
 * es in beide Richtungen (verwechselter Platz, kurzzeitige Baustelle,
 * zugeparkt statt aufgehoben). Ein Platz, der von Anfang an als **unsicher**
 * gekennzeichnet ist, hat dieses Gewicht nicht: Bei ihm ist offen, ob er
 * überhaupt stimmt, und zwei unabhängige Meldungen genügen.
 *
 * **Beide Zahlen gehören dem Betreiber, nicht dem Code.** Die richtige Höhe
 * hängt davon ab, wie viele Menschen die App benutzen – bei hundert
 * Besucher:innen im Monat ist „fünf Konten" eine Schwelle, die nie erreicht
 * wird, bei hunderttausend eine, die zu früh greift. Deshalb stehen sie in der
 * Verwaltung und nicht als Konstante hier.
 *
 * **Gezählt werden Konten.** Nicht die gewichteten Summen aus 11.6: Eine
 * Schwelle muss erklärbar bleiben („drei Leute heißt drei Leute"), und die
 * Eindeutigkeitsbedingung von `rating` macht aus Konten und Stimmen ohnehin
 * dasselbe. Die Gewichtung bleibt der Prüfliste in der Verwaltung.
 */

export interface SpotPolicy {
  /** Konten mit „existiert nicht mehr", die einen **unsicheren** Platz entfernen. */
  schwelleUnsicher: number;
  /** Dasselbe für einen **gesicherten** Platz. */
  schwelleSicher: number;
  updatedAt: string | null;
}

/**
 * Die Vorgabe, solange niemand etwas eingestellt hat.
 *
 * **2 und 5 sind gewählt, nicht gemessen** – es gibt noch keine Zahlen, aus
 * denen sich etwas ableiten ließe (117 Besucher im letzten Monat). Die
 * Begründung ist nur die Rangfolge: Zwei unabhängige Meldungen sind das
 * Minimum, bei dem nicht eine einzelne Person etwas entfernen kann, und fünf
 * ist genug, dass eine amtliche Angabe nicht an einer Verwechslung scheitert.
 * Sobald es Nutzung gibt, gehören beide Zahlen angesehen.
 */
export const POLICY_DEFAULT: SpotPolicy = {
  schwelleUnsicher: 2,
  schwelleSicher: 5,
  updatedAt: null,
};

interface Raw {
  schwelle_unsicher: number;
  schwelle_sicher: number;
  updated_at: string;
}

/**
 * Die geltenden Schwellen.
 *
 * Fehlt die Zeile, gilt die Vorgabe oben – **nicht** „keine Schwelle". Eine
 * fehlende Einstellung darf nicht heißen, dass nie etwas verschwindet oder
 * dass alles sofort verschwindet; beides wäre eine stille Entscheidung.
 */
export function spotPolicy(): SpotPolicy {
  const row = db()
    .prepare(`SELECT schwelle_unsicher, schwelle_sicher, updated_at FROM spot_policy WHERE id = 1`)
    .get() as Raw | undefined;

  if (!row) return POLICY_DEFAULT;

  return {
    schwelleUnsicher: Number(row.schwelle_unsicher),
    schwelleSicher: Number(row.schwelle_sicher),
    updatedAt: row.updated_at,
  };
}

/** Obergrenze, damit niemand „1000" einträgt und damit das Melden stilllegt. */
export const SCHWELLE_MAX = 100;

export class PolicyError extends Error {}

/**
 * Schwellen setzen.
 *
 * **Geprüft wird hier und nicht nur am Endpunkt**, weil diese Zahlen
 * entscheiden, ob Daten verschwinden. Eine 0 würde jeden Platz beim ersten
 * Laden entfernen – das ist kein Tippfehler, den man durchlassen darf.
 */
export function setSpotPolicy(
  input: { schwelleUnsicher: number; schwelleSicher: number },
  accountId: string | null,
): SpotPolicy {
  for (const value of [input.schwelleUnsicher, input.schwelleSicher]) {
    if (!Number.isInteger(value) || value < 1 || value > SCHWELLE_MAX) {
      throw new PolicyError(`Schwellen müssen ganze Zahlen zwischen 1 und ${SCHWELLE_MAX} sein.`);
    }
  }

  db()
    .prepare(
      `INSERT INTO spot_policy (id, schwelle_unsicher, schwelle_sicher, updated_at, updated_by)
            VALUES (1, ?, ?, ?, ?)
       ON CONFLICT (id) DO UPDATE SET
            schwelle_unsicher = excluded.schwelle_unsicher,
            schwelle_sicher   = excluded.schwelle_sicher,
            updated_at        = excluded.updated_at,
            updated_by        = excluded.updated_by`,
    )
    .run(input.schwelleUnsicher, input.schwelleSicher, now(), accountId);

  return spotPolicy();
}
