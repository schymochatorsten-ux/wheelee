import { randomUUID } from "node:crypto";
import { db, now } from "./sqlite";
import type { ParkingSpot } from "../types";

/**
 * Von Nutzer:innen gemeldete Parkplätze (ToDo 8.11).
 *
 * **Warum es das gibt.** Der Bestand kann nur enthalten, was eine Quelle
 * hergibt – amtliche Listen oder OpenStreetMap. Ein neu angeordneter
 * Stellplatz steht in keiner von beiden, bis jemand ihn kartiert oder die
 * Stadt ihre Liste erneuert; das kann Monate dauern. Wer davorsteht, weiß es
 * sofort. Dieselbe Begründung wie bei den Bewertungen: **Die Menschen, die
 * diese Plätze brauchen, sind die einzige Quelle, die eine Änderung in der
 * Wirklichkeit bemerkt.**
 *
 * **Nur mit Konto** (Torsten, 2026-11-13), dieselbe Zugangsregel wie beim
 * Bewerten. Eine Karte, in die jeder ohne Konto Punkte setzen kann, ist in
 * einer Woche voller Unsinn – und es gäbe niemanden, dem man die Stimme
 * entziehen könnte.
 *
 * **Sichtbar sofort, aber als unsicher.** Der Platz steht von der ersten
 * Sekunde an auf der Karte, mit Hinweis und mit der niedrigen Schwelle zum
 * Verschwinden. Er wird zum gewöhnlichen Platz, wenn ihn so viele Konten
 * bestätigt haben, wie die Schwelle für **gesicherte** Plätze verlangt – nicht
 * die niedrige: Aufnehmen muss schwerer sein als loswerden
 * (`parking/certainty.ts`).
 *
 * **Die ID trägt ihre Herkunft** (`gemeldet-…`). Bewertungen, Favoriten und
 * Rückmeldungen hängen an Zeichenketten; wer eine davon sieht, soll ihr
 * ansehen können, dass sie nicht aus einer Seed-Datei kommt.
 */

export type UserSpotStatus = "offen" | "bestaetigt" | "verworfen";

export interface UserSpotInput {
  label: string;
  street: string | null;
  houseNumber: string | null;
  note: string | null;
  city: string;
  lat: number;
  lng: number;
  spotCount: number;
}

export interface UserSpotRow extends UserSpotInput {
  id: string;
  accountId: string;
  status: UserSpotStatus;
  createdAt: string;
  /** Konten, die den Platz bestätigt bzw. als nicht vorhanden gemeldet haben. */
  existsCount: number;
  goneCount: number;
}

interface Raw {
  id: string;
  account_id: string;
  label: string;
  street: string | null;
  house_number: string | null;
  note: string | null;
  city: string;
  lat: number;
  lng: number;
  spot_count: number;
  status: UserSpotStatus;
  created_at: string;
  exists_count: number;
  gone_count: number;
}

/**
 * Die Zählerstände kommen per Unterabfrage mit, nicht in einem zweiten Lauf.
 *
 * Die Liste in der Verwaltung soll in einer Abfrage fertig sein; sonst wäre es
 * eine Abfrage je gemeldetem Platz, und genau daraus werden später hundert.
 */
const SELECT = `
  SELECT u.id, u.account_id, u.label, u.street, u.house_number, u.note, u.city,
         u.lat, u.lng, u.spot_count, u.status, u.created_at,
         (SELECT COUNT(*) FROM rating r
           WHERE r.spot_id = 'gemeldet-' || u.id AND r.vote = 'exists') AS exists_count,
         (SELECT COUNT(*) FROM rating r
           WHERE r.spot_id = 'gemeldet-' || u.id AND r.vote = 'gone') AS gone_count
    FROM user_spot u`;

const toRow = (row: Raw): UserSpotRow => ({
  id: row.id,
  accountId: row.account_id,
  label: row.label,
  street: row.street,
  houseNumber: row.house_number,
  note: row.note,
  city: row.city,
  lat: Number(row.lat),
  lng: Number(row.lng),
  spotCount: Number(row.spot_count),
  status: row.status,
  createdAt: row.created_at,
  existsCount: Number(row.exists_count),
  goneCount: Number(row.gone_count),
});

/** Die Parkplatz-ID zu einem gemeldeten Eintrag. */
export function userSpotId(id: string): string {
  return `gemeldet-${id}`;
}

/** Umgekehrt: Steckt in dieser Parkplatz-ID ein gemeldeter Eintrag? */
export function userSpotIdOf(spotId: string): string | null {
  return spotId.startsWith("gemeldet-") ? spotId.slice("gemeldet-".length) : null;
}

export class UserSpotError extends Error {}

/** Wie viele Meldungen ein Konto am Tag abgeben darf. */
export const MELDUNGEN_JE_TAG = 10;

/**
 * Einen Platz melden.
 *
 * **Die Drosselung je Konto ist kein Misstrauen, sondern Statik.** Ein
 * Versehen in einem Skript oder ein verärgerter Mensch kann sonst in einer
 * Nacht tausend Punkte setzen, die alle sichtbar sind – und jeder einzelne
 * müsste von Hand bewertet werden. Zehn am Tag reichen für jeden ehrlichen
 * Zweck.
 */
export function addUserSpot(accountId: string, input: UserSpotInput): UserSpotRow {
  const label = input.label.trim();
  if (label.length < 3) throw new UserSpotError("Die Bezeichnung ist zu kurz.");
  if (label.length > 120) throw new UserSpotError("Die Bezeichnung ist zu lang.");
  if (!Number.isFinite(input.lat) || input.lat < -90 || input.lat > 90) {
    throw new UserSpotError("Der Breitengrad fehlt oder ist unbrauchbar.");
  }
  if (!Number.isFinite(input.lng) || input.lng < -180 || input.lng > 180) {
    throw new UserSpotError("Der Längengrad fehlt oder ist unbrauchbar.");
  }
  if (!Number.isInteger(input.spotCount) || input.spotCount < 1 || input.spotCount > 50) {
    throw new UserSpotError("Die Zahl der Stellplätze muss zwischen 1 und 50 liegen.");
  }

  const seit = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { anzahl } = db()
    .prepare("SELECT COUNT(*) AS anzahl FROM user_spot WHERE account_id = ? AND created_at > ?")
    .get(accountId, seit) as { anzahl: number };
  if (Number(anzahl) >= MELDUNGEN_JE_TAG) {
    throw new UserSpotError(
      `Mehr als ${MELDUNGEN_JE_TAG} Meldungen an einem Tag gehen nicht. Morgen wieder.`,
    );
  }

  const id = randomUUID();
  db()
    .prepare(
      `INSERT INTO user_spot
            (id, account_id, label, street, house_number, note, city, lat, lng, spot_count, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      id,
      accountId,
      label,
      input.street?.trim() || null,
      input.houseNumber?.trim() || null,
      input.note?.trim() || null,
      input.city,
      input.lat,
      input.lng,
      input.spotCount,
      now(),
    );

  return userSpot(id)!;
}

export function userSpot(id: string): UserSpotRow | null {
  const row = db().prepare(`${SELECT} WHERE u.id = ?`).get(id) as Raw | undefined;
  return row ? toRow(row) : null;
}

/** Alle gemeldeten Plätze, die jüngsten zuerst – für die Verwaltung. */
export function userSpots(status?: UserSpotStatus): UserSpotRow[] {
  const sql = `${SELECT} ${status ? "WHERE u.status = ?" : ""} ORDER BY u.created_at DESC`;
  const rows = (status
    ? db().prepare(sql).all(status)
    : db().prepare(sql).all()) as unknown as Raw[];
  return rows.map(toRow);
}

/**
 * Die sichtbaren gemeldeten Plätze als gewöhnliche Parkplätze.
 *
 * `verworfen` fällt heraus – das ist der Zweck der Ablehnung. `offen` kommt
 * **mit** `origin: "gemeldet"` heraus und ist damit unsicher (siehe
 * `parking/certainty.ts`), `bestaetigt` ohne.
 */
export function visibleUserSpots(): ParkingSpot[] {
  const rows = db()
    .prepare(`${SELECT} WHERE u.status IN ('offen', 'bestaetigt')`)
    .all() as unknown as Raw[];

  return rows.map((raw) => {
    const row = toRow(raw);
    return {
      id: userSpotId(row.id),
      city: row.city,
      label: row.label,
      street: row.street,
      houseNumber: row.houseNumber,
      note: row.note,
      timeRestriction: null,
      district: "",
      spotCount: row.spotCount,
      lat: row.lat,
      lng: row.lng,
      // Die Koordinate hat jemand auf der Karte gesetzt, also hausgenau im
      // Sinne von „nicht aus einer Adresse geschätzt". Unsicher ist der Platz
      // trotzdem, solange er `offen` ist – über `origin`, nicht über die Lage.
      geoAccuracy: "house",
      source: "Meldung aus der App",
      origin: row.status === "offen" ? "gemeldet" : "import",
    } satisfies ParkingSpot;
  });
}

/** Von Hand entscheiden: bestätigen oder verwerfen. */
export function decideUserSpot(
  id: string,
  status: Exclude<UserSpotStatus, "offen">,
  accountId: string | null,
): UserSpotRow | null {
  db()
    .prepare("UPDATE user_spot SET status = ?, decided_at = ?, decided_by = ? WHERE id = ?")
    .run(status, now(), accountId, id);
  return userSpot(id);
}

/**
 * Einen gemeldeten Platz zum gewöhnlichen machen, weil genug Konten ihn
 * bestätigt haben.
 *
 * **Nur aus `offen` heraus**, und ohne `decided_by`: Hier hat niemand
 * entschieden, sondern eine Schwelle ist überschritten. Ein verworfener Platz
 * kommt dadurch nicht zurück – eine Ablehnung von Hand soll nicht durch
 * Stimmen zu überstimmen sein.
 */
export function confirmByVotes(id: string): boolean {
  const result = db()
    .prepare(
      "UPDATE user_spot SET status = 'bestaetigt', decided_at = ? WHERE id = ? AND status = 'offen'",
    )
    .run(now(), id);
  return Number(result.changes) > 0;
}
