import { randomBytes, randomUUID } from "node:crypto";
import { db } from "./sqlite";
import { hashToken } from "./accounts";
import { hashPassword, verifyPassword } from "../auth/password";
import { normalizeEmail } from "../auth/email";

/**
 * Einmal-Links per Mail (ToDos 11.1 „Passwort vergessen" und 11.8 „E-Mail
 * ändern", Entscheidung D-10).
 *
 * Gebaut wie ein Sitzungstoken und eine Einladung: 256 Bit Zufall, in der
 * Datenbank nur der SHA-256. Ein Link ist **einmal einlösbar**, **eine Stunde
 * gültig** und gehört zu genau einem Konto. Ein neuer Link derselben Art
 * entwertet die früheren – sonst blieben mehrere gültige Links im Umlauf, und
 * ein alter, vielleicht in einem fremden Postfach liegender, funktionierte
 * weiter.
 *
 * Abgelaufen, benutzt und unbekannt sind von außen nicht zu unterscheiden.
 */

export const MAIL_TOKEN_MINUTES = 60;

const now = () => new Date().toISOString();

function expiry(): string {
  return new Date(Date.now() + MAIL_TOKEN_MINUTES * 60_000).toISOString();
}

type Kind = "reset" | "email";

/** Neuen Token anlegen und die früheren derselben Art für dieses Konto entwerten. */
function issue(accountId: string, kind: Kind, newEmail: string | null): string {
  const token = randomBytes(32).toString("base64url");
  const handle = db();
  handle.exec("BEGIN");
  try {
    handle
      .prepare("UPDATE mail_token SET used_at = ? WHERE account_id = ? AND kind = ? AND used_at IS NULL")
      .run(now(), accountId, kind);
    handle
      .prepare(
        `INSERT INTO mail_token (id, token_hash, account_id, kind, new_email, created_at, expires_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(randomUUID(), hashToken(token), accountId, kind, newEmail, now(), expiry());
    handle.exec("COMMIT");
  } catch (error) {
    handle.exec("ROLLBACK");
    throw error;
  }
  return token;
}

/**
 * Den Token verbrauchen und seine Daten zurückgeben – `null`, wenn er nicht
 * gilt. **Das `UPDATE … WHERE used_at IS NULL` ist die Prüfung:** Zwei
 * gleichzeitige Einlösungen kämen bei einem vorgelagerten `SELECT` beide durch.
 * Muss innerhalb einer Transaktion des Aufrufers laufen, damit die Wirkung und
 * das Verbrauchen zusammen gelten.
 */
function claim(token: string, kind: Kind): { accountId: string; newEmail: string | null } | null {
  if (!token) return null;
  const handle = db();
  const row = handle
    .prepare("SELECT id, account_id, new_email FROM mail_token WHERE token_hash = ? AND kind = ?")
    .get(hashToken(token), kind) as { id: string; account_id: string; new_email: string | null } | undefined;
  if (!row) return null;

  const result = handle
    .prepare("UPDATE mail_token SET used_at = ? WHERE id = ? AND used_at IS NULL AND expires_at > ?")
    .run(now(), row.id, now());
  if (Number(result.changes) !== 1) return null;
  return { accountId: row.account_id, newEmail: row.new_email };
}

/**
 * Link zum Zurücksetzen für diese Adresse. `null`, wenn es kein (nutzbares)
 * Konto gibt – **der Aufrufer antwortet trotzdem gleich**, sonst ließe sich
 * ablesen, welche Adressen registriert sind. Gesperrte Konten bekommen keinen.
 */
export function createResetToken(email: string): { token: string; email: string } | null {
  const address = normalizeEmail(email);
  const row = db()
    .prepare("SELECT id, email, disabled_at FROM account WHERE email = ?")
    .get(address) as { id: string; email: string; disabled_at: string | null } | undefined;
  if (!row || row.disabled_at) return null;
  return { token: issue(row.id, "reset", null), email: row.email };
}

/**
 * Passwort mit einem Reset-Token neu setzen. Beendet **alle** Sitzungen des
 * Kontos: Wer sein Passwort vergessen hat, weiß nicht, wer es sonst noch kennt
 * – oder ob eine fremde Sitzung läuft.
 */
export function resetPassword(token: string, newPassword: string): boolean {
  const handle = db();
  handle.exec("BEGIN");
  try {
    const claimed = claim(token, "reset");
    if (!claimed) {
      handle.exec("ROLLBACK");
      return false;
    }
    handle
      .prepare("UPDATE account SET password_hash = ? WHERE id = ?")
      .run(hashPassword(newPassword), claimed.accountId);
    handle.prepare("DELETE FROM session WHERE account_id = ?").run(claimed.accountId);
    handle.exec("COMMIT");
    return true;
  } catch (error) {
    handle.exec("ROLLBACK");
    throw error;
  }
}

export type EmailChangeRequest =
  | { status: "wrong-password" }
  | { status: "same" }
  | { status: "taken" }
  | { status: "ok"; token: string };

/**
 * Wechsel der Adresse beantragen. Verlangt das Passwort – eine gestohlene
 * Sitzung allein soll das Konto nicht an eine fremde Adresse binden.
 *
 * **`taken` gibt es nur hier, nicht nach außen:** Der Aufrufer antwortet dem
 * Menschen in beiden Fällen gleich und verschickt bei `taken` nichts, damit der
 * Endpunkt nicht als Prüfung dient, ob eine Adresse registriert ist.
 */
export function requestEmailChange(
  accountId: string,
  password: string,
  newEmail: string,
): EmailChangeRequest {
  const row = db()
    .prepare("SELECT email, password_hash FROM account WHERE id = ?")
    .get(accountId) as { email: string; password_hash: string } | undefined;
  if (!row || !verifyPassword(password, row.password_hash)) return { status: "wrong-password" };

  const address = normalizeEmail(newEmail);
  if (address === row.email) return { status: "same" };
  if (db().prepare("SELECT 1 FROM account WHERE email = ?").get(address)) return { status: "taken" };

  return { status: "ok", token: issue(accountId, "email", address) };
}

/**
 * Adresse mit dem Token tauschen. Gibt die neue Adresse zurück, sonst `null`.
 * Hat zwischen Antrag und Klick jemand die Adresse anderweitig belegt, schlägt
 * die `UNIQUE`-Bedingung an – dann ändert sich nichts.
 */
export function confirmEmailChange(token: string): string | null {
  const handle = db();
  handle.exec("BEGIN");
  try {
    const claimed = claim(token, "email");
    if (!claimed || !claimed.newEmail) {
      handle.exec("ROLLBACK");
      return null;
    }
    try {
      handle
        .prepare("UPDATE account SET email = ? WHERE id = ?")
        .run(claimed.newEmail, claimed.accountId);
    } catch (error) {
      handle.exec("ROLLBACK");
      if (String((error as Error).message).includes("UNIQUE")) return null;
      throw error;
    }
    handle.exec("COMMIT");
    return claimed.newEmail;
  } catch (error) {
    try {
      handle.exec("ROLLBACK");
    } catch {
      // Schon zurückgerollt.
    }
    throw error;
  }
}
