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
 * Drei Dinge werden entfernt, und das zweite stand nicht auf der Liste:
 *
 * - **Erledigte und verworfene Rückmeldungen** nach zwölf Monaten, samt der
 *   freiwillig angegebenen Antwortadresse. Das Formular sagt zu, dass die
 *   Adresse „mit der Meldung gelöscht" wird (`CONTACT_PRIVACY`) – ohne diesen
 *   Lauf wäre das eine Zusage ohne Ausführung.
 * - **Die Antwortadresse an offenen Meldungen** nach zwei Jahren (17.6, seit
 *   dem 2026-10-21). Die Meldung selbst bleibt – siehe
 *   `CONTACT_RETENTION_DAYS`.
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

/**
 * Wie lange die Antwortadresse an einer **offenen** Meldung stehen bleibt
 * (ToDo 17.6).
 *
 * **Das Problem, das diese zweite Frist löst:** 17.5 löscht nur erledigte
 * Meldungen, und das bleibt richtig – eine unbearbeitete Meldung ist nicht
 * erledigt, sondern liegen geblieben, und sie nach einer Frist zu löschen
 * hieße, einen Hinweis zu verlieren, weil sich niemand gekümmert hat. Damit
 * stand aber eine freiwillig angegebene Adresse unbegrenzt in der Datenbank,
 * gegen die Zusage im Formular.
 *
 * **Entfernt wird deshalb die Adresse, nicht die Meldung.** Der Hinweis
 * bleibt vollständig nachlesbar und kann weiter zur Korrektur der Daten
 * beitragen; verloren geht allein die Möglichkeit zu antworten – und die war
 * nach zwei Jahren ohne Bearbeitung ohnehin keine ernsthafte mehr. Die
 * Alternative wäre gewesen, offene Meldungen nach einer Frist maschinell auf
 * „verworfen" zu setzen; dann entschiede ein Zeitablauf über einen Hinweis von
 * jemandem, der sich die Mühe gemacht hat.
 *
 * **Doppelt so lang wie die Frist für erledigte Meldungen**, weil hier nichts
 * abgeschlossen ist: Zwei Jahre sind lang genug, dass niemand sagen kann, die
 * Meldung sei übergangen worden, weil die Technik zu schnell war.
 */
export const CONTACT_RETENTION_DAYS = 730;

export interface PurgeResult {
  feedback: number;
  sessions: number;
  /** Offene Meldungen, deren Antwortadresse entfernt wurde. */
  contacts: number;
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

  /*
   * Die Antwortadresse an einer offenen Meldung (17.6).
   *
   * Maßgeblich ist hier `created_at` und **nicht** `updated_at`: Eine Notiz
   * des Administrators ändert `updated_at`, ohne dass die Meldung bearbeitet
   * wäre – die Frist würde sich dann durch Hinsehen verlängern. Gezählt wird
   * ab dem Tag, an dem die Adresse angegeben wurde.
   */
  const contactCutoff = new Date(
    nowMs - CONTACT_RETENTION_DAYS * 24 * 60 * 60 * 1000,
  ).toISOString();

  const contacts = db()
    .prepare(
      `UPDATE feedback
          SET contact_email = NULL, contact_removed_at = ?
        WHERE contact_email IS NOT NULL
          AND status NOT IN (${CLOSED_STATUSES.map(() => "?").join(", ")})
          AND created_at < ?`,
    )
    .run(now(), ...CLOSED_STATUSES, contactCutoff);

  const sessions = db().prepare("DELETE FROM session WHERE expires_at <= ?").run(now());

  return {
    feedback: Number(feedback.changes),
    contacts: Number(contacts.changes),
    sessions: Number(sessions.changes),
  };
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
