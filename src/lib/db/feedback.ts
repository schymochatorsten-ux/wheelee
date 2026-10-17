import { createHash } from "node:crypto";
import { db, now } from "./sqlite";
import { maybePurge } from "./cleanup";
import type { FeedbackKind, FeedbackStatus, ValidFeedback } from "../feedback";

/**
 * Rückmeldungen speichern und verwalten (ToDos 17.1, 17.4).
 *
 * **Was ausdrücklich nicht gespeichert wird:** Standort, Name, IP-Adresse. Der
 * Standort verlässt das Gerät in dieser App nirgends, und eine Fehlermeldung
 * ist kein Grund, damit anzufangen.
 *
 * Die E-Mail-Adresse ist die **eine** Ausnahme, und sie ist eine bewusste
 * Änderung gegenüber der ursprünglichen Festlegung in 17.1: Sie wird
 * gespeichert, wenn jemand sie **freiwillig** angibt, weil ohne Adresse keine
 * Rückfrage möglich ist – und eine Rückfrage ist bei einer Parkplatzmeldung
 * oft der Unterschied zwischen „irgendwo stimmt was nicht" und einer
 * Korrektur. Sie ist nie Pflicht, das Formular sagt offen, wofür sie dient,
 * und sie verschwindet mit der Meldung (17.5).
 */

export interface FeedbackEntry {
  id: number;
  kind: FeedbackKind;
  message: string;
  contactEmail: string | null;
  /** Adresse des angemeldeten Kontos, falls die Meldung aus einem kam. */
  accountEmail: string | null;
  spotId: string | null;
  city: string | null;
  url: string | null;
  userAgent: string | null;
  appVersion: string | null;
  status: FeedbackStatus;
  note: string | null;
  createdAt: string;
  updatedAt: string | null;
}

interface FeedbackRow {
  id: number;
  kind: FeedbackKind;
  message: string;
  contact_email: string | null;
  account_email: string | null;
  spot_id: string | null;
  city: string | null;
  url: string | null;
  user_agent: string | null;
  app_version: string | null;
  status: FeedbackStatus;
  note: string | null;
  created_at: string;
  updated_at: string | null;
}

const toEntry = (row: FeedbackRow): FeedbackEntry => ({
  id: row.id,
  kind: row.kind,
  message: row.message,
  contactEmail: row.contact_email,
  accountEmail: row.account_email,
  spotId: row.spot_id,
  city: row.city,
  url: row.url,
  userAgent: row.user_agent,
  appVersion: row.app_version,
  status: row.status,
  note: row.note,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

/**
 * Kennung des Geräts, die **keine Person identifiziert**.
 *
 * Der Browser schickt eine Zufallszahl aus seinem eigenen Speicher mit; hier
 * wird daraus ein gekürzter Hash. Zweck ist allein die Drosselung: Erkennen,
 * dass dieselbe Quelle gerade zwanzig Meldungen schickt. Rückwärts führt
 * nichts von diesem Wert zu einem Gerät oder einer Person, und ohne die
 * mitgeschickte Zufallszahl ist er wertlos – wer die Datenbank liest, kann
 * damit niemanden wiedererkennen, der nicht selbst schreibt.
 */
function deviceHash(deviceId: string | null): string | null {
  if (!deviceId) return null;
  return createHash("sha256").update(`wheelee:${deviceId}`, "utf8").digest("hex").slice(0, 16);
}

/** Eine Meldung ablegen und ihre Nummer zurückgeben. */
export function saveFeedback(input: ValidFeedback, accountId: string | null): number {
  // Beim Schreiben aufräumen (17.5), höchstens einmal am Tag. Eine eingehende
  // Meldung ist der verlässlichste wiederkehrende Zugriff, den diese App hat –
  // verlässlicher als ein Blick in die Übersicht.
  maybePurge();

  const result = db()
    .prepare(
      `INSERT INTO feedback
         (kind, message, contact_email, account_id, spot_id, city, url,
          user_agent, app_version, device_hash, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'neu', ?)`,
    )
    .run(
      input.kind,
      input.message,
      input.contactEmail,
      accountId,
      input.spotId,
      input.city,
      input.url,
      input.userAgent,
      input.appVersion,
      deviceHash(input.deviceId),
      now(),
    );

  return Number(result.lastInsertRowid);
}

export interface FeedbackFilter {
  kind?: FeedbackKind | null;
  status?: FeedbackStatus | null;
}

/**
 * Die Meldungen für die Übersicht – neueste zuerst.
 *
 * Die Adresse des Kontos wird mitgelesen, nicht nur die ID: In der Übersicht
 * hilft „von torsten@…" weiter, eine UUID nicht.
 */
export function listFeedback(filter: FeedbackFilter = {}): FeedbackEntry[] {
  // Auch hier, damit abgelaufene Einträge dem Administrator nicht noch einmal
  // vorgelegt werden – er soll nicht über Daten entscheiden, die längst zu
  // löschen waren.
  maybePurge();

  const where: string[] = [];
  const values: string[] = [];

  if (filter.kind) {
    where.push("f.kind = ?");
    values.push(filter.kind);
  }
  if (filter.status) {
    where.push("f.status = ?");
    values.push(filter.status);
  }

  const rows = db()
    .prepare(
      `SELECT f.id, f.kind, f.message, f.contact_email, a.email AS account_email,
              f.spot_id, f.city, f.url, f.user_agent, f.app_version,
              f.status, f.note, f.created_at, f.updated_at
         FROM feedback f
         LEFT JOIN account a ON a.id = f.account_id
         ${where.length > 0 ? `WHERE ${where.join(" AND ")}` : ""}
        ORDER BY f.created_at DESC, f.id DESC
        LIMIT 500`,
    )
    // `node:sqlite` gibt `Record<string, SQLOutputValue>` zurück – die Spalten
    // kennt es nicht. Der Umweg über `unknown` ist die Stelle, an der das
    // Schema oben und der Typ hier zusammenpassen müssen.
    .all(...values) as unknown as FeedbackRow[];

  return rows.map(toEntry);
}

/** Anzahl je Stand – für die Zähler über der Liste. */
export function feedbackCounts(): Record<FeedbackStatus | "gesamt", number> {
  const rows = db()
    .prepare("SELECT status, COUNT(*) AS anzahl FROM feedback GROUP BY status")
    .all() as { status: FeedbackStatus; anzahl: number }[];

  const counts = {
    neu: 0,
    in_arbeit: 0,
    umgesetzt: 0,
    verworfen: 0,
    gesamt: 0,
  };

  for (const row of rows) {
    counts[row.status] = Number(row.anzahl);
    counts.gesamt += Number(row.anzahl);
  }

  return counts;
}

/**
 * Stand und interne Notiz ändern.
 *
 * Gibt zurück, ob es den Eintrag überhaupt gab – sonst meldete die Oberfläche
 * Erfolg für eine Nummer, die längst gelöscht ist.
 */
export function updateFeedback(
  id: number,
  changes: { status?: FeedbackStatus; note?: string | null },
): boolean {
  const sets: string[] = [];
  const values: (string | null)[] = [];

  if (changes.status !== undefined) {
    sets.push("status = ?");
    values.push(changes.status);
  }
  if (changes.note !== undefined) {
    sets.push("note = ?");
    values.push(changes.note === null ? null : changes.note.trim().slice(0, 2_000) || null);
  }
  if (sets.length === 0) return false;

  sets.push("updated_at = ?");
  values.push(now());

  const result = db()
    .prepare(`UPDATE feedback SET ${sets.join(", ")} WHERE id = ?`)
    .run(...values, id);

  return Number(result.changes) > 0;
}

export function deleteFeedback(id: number): boolean {
  const result = db().prepare("DELETE FROM feedback WHERE id = ?").run(id);
  return Number(result.changes) > 0;
}
