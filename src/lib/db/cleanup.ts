import { db, now } from "./sqlite";

/**
 * Aufräumen: was niemand mehr braucht, wird gelöscht (ToDos 17.5, 10.3).
 *
 * **Eine Tabelle, die nur wächst, wird nach einem Jahr nicht mehr gelesen** –
 * und personenbezogene Angaben, die niemand mehr braucht, gehören ohnehin
 * gelöscht. Das ist keine Aufräumarbeit aus Ordnungsliebe, sondern die
 * Speicherbegrenzung aus Art. 5 Abs. 1 lit. e DSGVO: Daten dürfen nur so lange
 * vorgehalten werden, wie der Zweck es verlangt. Bei einer erledigten
 * Parkplatzmeldung ist der Zweck mit der Korrektur erfüllt.
 *
 * Zwei Dinge werden entfernt, und das zweite stand nicht auf der Liste:
 *
 * - **Erledigte und verworfene Rückmeldungen** nach zwölf Monaten, samt der
 *   freiwillig angegebenen Antwortadresse. Das Formular sagt zu, dass die
 *   Adresse „mit der Meldung gelöscht" wird (`CONTACT_PRIVACY`) – ohne diesen
 *   Lauf wäre das eine Zusage ohne Ausführung.
 * - **Abgelaufene Sitzungen.** Bisher verschwand eine Sitzung erst beim
 *   nächsten Versuch, sie zu benutzen (`accountForSession`). Wer sich einmal
 *   anmeldet und nie wieder kommt, hinterließ damit dauerhaft eine Zeile, die
 *   sein Konto mit einem Zeitpunkt verknüpft – nutzlos und länger aufbewahrt
 *   als nötig.
 */

/**
 * Wie lange eine abgeschlossene Meldung noch steht.
 *
 * Zwölf Monate, wie in 17.5 vorgeschlagen. Die Spanne hat einen Zweck und ist
 * nicht gegriffen: Sie überdeckt einen vollständigen Jahreslauf der
 * Datenpflege – ein halbjährlicher Vollimport und eine halbjährliche
 * Validierung (siehe [Datenpflege.md](../../../Datenpflege.md)) fallen
 * garantiert hinein. Eine Meldung bleibt also mindestens so lange nachlesbar,
 * wie sie für die Prüfung der Daten noch etwas beitragen kann.
 */
export const FEEDBACK_RETENTION_DAYS = 365;

/** Nur erledigte Stände laufen ab. Offene Meldungen bleiben, bis jemand sie bearbeitet. */
const CLOSED_STATUSES = ["umgesetzt", "verworfen"] as const;

export interface PurgeResult {
  feedback: number;
  sessions: number;
}

/**
 * Aufräumen, sofort und unbedingt.
 *
 * Maßgeblich ist bei einer Meldung `updated_at`, ersatzweise `created_at` –
 * also **wann sie erledigt wurde, nicht wann sie ankam.** Der Unterschied ist
 * kein Detail: Eine Meldung, die dreizehn Monate offen lag und gestern
 * abgeschlossen wurde, verschwände sonst noch am selben Tag, und niemand
 * könnte mehr nachsehen, worauf sich die Korrektur stützte.
 */
export function purgeExpired(nowMs: number = Date.now()): PurgeResult {
  const cutoff = new Date(nowMs - FEEDBACK_RETENTION_DAYS * 24 * 60 * 60 * 1000).toISOString();

  const feedback = db()
    .prepare(
      `DELETE FROM feedback
        WHERE status IN (${CLOSED_STATUSES.map(() => "?").join(", ")})
          AND COALESCE(updated_at, created_at) < ?`,
    )
    .run(...CLOSED_STATUSES, cutoff);

  const sessions = db().prepare("DELETE FROM session WHERE expires_at <= ?").run(now());

  return { feedback: Number(feedback.changes), sessions: Number(sessions.changes) };
}

/**
 * Wann zuletzt aufgeräumt wurde – im Arbeitsspeicher, wie bei der Drosselung.
 *
 * Eine Spalte in der Datenbank wäre genauer, aber sie müsste bei jedem Aufruf
 * geschrieben werden, und der Container startet ohnehin bei jedem Deploy neu.
 */
let lastPurge = 0;
const PURGE_EVERY_MS = 24 * 60 * 60 * 1000;

/**
 * Höchstens einmal am Tag aufräumen.
 *
 * **Warum kein Zeitgeber und keine geplante Aufgabe:** Die App ist ein
 * einzelner Container ohne Hintergrundprozess, und ein `setInterval` in einem
 * Next-Modul läuft je nach Laufzeitumgebung gar nicht oder mehrfach. Der Lauf
 * hängt sich deshalb an die Zugriffe, die es ohnehin gibt: eine eingehende
 * Meldung und jeden Blick in die Übersicht. Da der Zähler im Arbeitsspeicher
 * steht, läuft er nach jedem Neustart des Containers beim **ersten** dieser
 * Zugriffe – also nach jedem Deploy.
 *
 * **Vom Start der Datenbank aus geht es nicht**, und das ist kein Versäumnis:
 * Dieses Modul benutzt `db()`, ein Aufruf aus `sqlite.ts` heraus wäre ein
 * Importzyklus.
 *
 * **Die Grenze dieses Weges ist zu benennen:** Käme über Monate weder eine
 * Meldung noch ein Administrator, liefe das Aufräumen gar nicht. Eine
 * Löschfrist von zwölf Monaten verträgt eine Verzögerung von Tagen – aber es
 * ist eine Annahme über den Betrieb und keine Zusage der Technik. Sobald es
 * einen regelmäßigen Lauf gibt (ToDo 4.5 nennt einen monatlichen
 * GitHub-Actions-Lauf), gehört `purgeExpired` dort hinein.
 */
export function maybePurge(nowMs: number = Date.now()): PurgeResult | null {
  if (nowMs - lastPurge < PURGE_EVERY_MS) return null;
  lastPurge = nowMs;
  return purgeExpired(nowMs);
}

/** Nur für Tests: die Sperre vergessen, damit der nächste Lauf wirklich läuft. */
export function resetPurgeThrottle(): void {
  lastPurge = 0;
}
