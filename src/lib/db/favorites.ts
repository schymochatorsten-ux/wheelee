import { db, now } from "./sqlite";

/**
 * Gespeicherte Parkplätze (Favoriten) am Konto (ToDo 11.5).
 *
 * Für Ziele, die jemand häufig ansteuert – die Arztpraxis, die Bahnhofsseite.
 * **Setzt ein Konto voraus**, wie das Bewerten: Ohne Konto gäbe es nichts, woran
 * die Liste hängen könnte, und eine Liste im Browser allein wäre nach einem
 * geleerten Speicher weg.
 *
 * Gespeichert werden nur Parkplatz, Konto und Zeitpunkt – nichts über Ort oder
 * Gerät. Die Liste verschwindet mit dem Konto (`ON DELETE CASCADE`).
 */

/** Mehr als das ist keine Merkliste mehr, sondern ein Abbild des Bestands. */
export const MAX_FAVORITES = 100;

export interface Favorite {
  spotId: string;
  createdAt: string;
}

/** Alle Favoriten **eines** Kontos, der zuletzt gespeicherte zuerst. */
export function listFavorites(accountId: string): Favorite[] {
  const rows = db()
    .prepare(
      `SELECT spot_id AS spotId, created_at AS createdAt
         FROM favorite WHERE account_id = ?
        ORDER BY created_at DESC, spot_id`,
    )
    .all(accountId) as unknown as Favorite[];

  return rows.map((row) => ({ spotId: row.spotId, createdAt: row.createdAt }));
}

export function isFavorite(spotId: string, accountId: string): boolean {
  const row = db()
    .prepare("SELECT 1 AS found FROM favorite WHERE spot_id = ? AND account_id = ?")
    .get(spotId, accountId);
  return row !== undefined;
}

/**
 * Speichern. Wiederholtes Speichern desselben Platzes ist wirkungslos und
 * gilt als Erfolg („gesetzt"), damit doppeltes Antippen folgenlos bleibt.
 * `"voll"`, wenn die Obergrenze erreicht ist.
 */
export function addFavorite(spotId: string, accountId: string): "gesetzt" | "voll" {
  if (isFavorite(spotId, accountId)) return "gesetzt";

  const row = db()
    .prepare("SELECT COUNT(*) AS anzahl FROM favorite WHERE account_id = ?")
    .get(accountId) as { anzahl: number };
  if (Number(row.anzahl) >= MAX_FAVORITES) return "voll";

  db()
    .prepare("INSERT OR IGNORE INTO favorite (spot_id, account_id, created_at) VALUES (?, ?, ?)")
    .run(spotId, accountId, now());
  return "gesetzt";
}

/** Entfernen; wirkungslos (`false`), wenn der Platz nicht gespeichert war. */
export function removeFavorite(spotId: string, accountId: string): boolean {
  const result = db()
    .prepare("DELETE FROM favorite WHERE spot_id = ? AND account_id = ?")
    .run(spotId, accountId);
  return Number(result.changes) > 0;
}
