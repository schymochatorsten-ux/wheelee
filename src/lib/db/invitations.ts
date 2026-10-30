import { randomBytes, randomUUID } from "node:crypto";
import { db } from "./sqlite";
import { hashToken, type Account, type Role } from "./accounts";
import { hashPassword } from "../auth/password";
import { normalizeEmail } from "../auth/email";

/**
 * Einladungen (ToDo 18.2, Zustellung als Link nach D-09).
 *
 * Wie ein Sitzungstoken: 256 Bit Zufall, und in der Datenbank steht nur der
 * SHA-256. Wer die Datei oder eine Sicherung in die Hand bekommt, kann damit
 * keine Einladung einlösen. Das Token selbst existiert einmal – in der Antwort,
 * die es erzeugt – und danach nur noch im Link, den ein Mensch weitergibt.
 *
 * Eine Einladung ist **an eine Adresse gebunden**, **einmal einlösbar** und
 * **befristet**. Die Adresse kann der Einlösende nicht ändern: Sie kommt aus
 * der Einladung, nicht aus dem Formular.
 */

/** Wie lange ein Link gilt. Sieben Tage: lang genug, um ihn zu übergeben, kurz genug, um zu verfallen. */
export const INVITATION_DAYS = 7;

const now = () => new Date().toISOString();

export interface CreatedInvitation {
  id: string;
  /** Das Klartext-Token – nur hier, nie wieder abrufbar. */
  token: string;
  email: string;
  role: Role;
  expiresAt: string;
}

/**
 * Einladung anlegen. `null`, wenn für die Adresse schon ein Konto besteht –
 * eine Einladung dorthin könnte nicht eingelöst werden.
 *
 * Eine noch offene frühere Einladung derselben Adresse wird zurückgezogen:
 * Sonst blieben mehrere gültige Links für ein und dieselbe Stelle im Umlauf,
 * und niemand wüsste, welcher der richtige ist.
 */
export function createInvitation(
  invitedBy: string,
  email: string,
  role: Role,
): CreatedInvitation | null {
  const address = normalizeEmail(email);
  const handle = db();

  if (handle.prepare("SELECT 1 FROM account WHERE email = ?").get(address)) return null;

  const token = randomBytes(32).toString("base64url");
  const invitation: CreatedInvitation = {
    id: randomUUID(),
    token,
    email: address,
    role,
    expiresAt: new Date(Date.now() + INVITATION_DAYS * 24 * 60 * 60 * 1000).toISOString(),
  };

  handle.exec("BEGIN");
  try {
    handle
      .prepare(
        "UPDATE invitation SET revoked_at = ? WHERE email = ? AND used_at IS NULL AND revoked_at IS NULL",
      )
      .run(now(), address);
    handle
      .prepare(
        `INSERT INTO invitation (id, token_hash, email, role, invited_by, created_at, expires_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(invitation.id, hashToken(token), address, role, invitedBy, now(), invitation.expiresAt);
    handle.exec("COMMIT");
  } catch (error) {
    handle.exec("ROLLBACK");
    throw error;
  }
  return invitation;
}

export type Redeemed = { account: Account } | { error: "invalid" | "exists" };

/**
 * Einladung einlösen: Konto mit der eingeladenen Adresse und Rolle anlegen.
 *
 * **Verbraucht wird atomar:** Das `UPDATE … WHERE used_at IS NULL` ist die
 * Prüfung. Zwei gleichzeitige Einlösungen desselben Links kämen bei einem
 * vorgelagerten `SELECT` beide durch; so gewinnt genau eine. Abgelaufen,
 * benutzt, zurückgezogen und unbekannt sind von außen nicht zu unterscheiden
 * (`invalid`) – wer ein Token rät, erfährt nichts über die Lage.
 */
export function redeemInvitation(token: string, password: string): Redeemed {
  if (!token) return { error: "invalid" };
  const handle = db();

  handle.exec("BEGIN");
  try {
    const row = handle
      .prepare("SELECT id, email, role FROM invitation WHERE token_hash = ?")
      .get(hashToken(token)) as { id: string; email: string; role: string } | undefined;

    const claimed = row
      ? handle
          .prepare(
            `UPDATE invitation SET used_at = ?
              WHERE id = ? AND used_at IS NULL AND revoked_at IS NULL AND expires_at > ?`,
          )
          .run(now(), row.id, now())
      : null;

    if (!row || !claimed || Number(claimed.changes) !== 1) {
      handle.exec("ROLLBACK");
      return { error: "invalid" };
    }

    const role: Role = row.role === "admin" ? "admin" : "user";
    const account: Account = {
      id: randomUUID(),
      email: row.email,
      createdAt: now(),
      mapsPreference: null,
      language: null,
      role,
      disabledAt: null,
    };

    try {
      handle
        .prepare(
          "INSERT INTO account (id, email, password_hash, created_at, role, email_verified_at) VALUES (?, ?, ?, ?, ?, ?)",
        )
        // Die Einladung ging an diese Adresse, der Link war der Nachweis: bestätigt (ToDo 10.21).
        .run(account.id, account.email, hashPassword(password), account.createdAt, role, account.createdAt);
    } catch (error) {
      handle.exec("ROLLBACK");
      if (String((error as Error).message).includes("UNIQUE")) return { error: "exists" };
      throw error;
    }

    handle.exec("COMMIT");
    return { account };
  } catch (error) {
    try {
      handle.exec("ROLLBACK");
    } catch {
      // Schon zurückgerollt.
    }
    throw error;
  }
}
