import { db } from "./sqlite";
import { activeAdminCount, type Role } from "./accounts";

/**
 * Was die Benutzerverwaltung braucht (ToDo 18.3).
 *
 * Bewusst **ohne** Passwort-Hash und ohne Sitzungstoken: Die Verwaltung muss
 * wissen, wer ein Konto hat und welche Rolle es trägt – mehr nicht. Was nicht
 * ausgeliefert wird, kann nicht aus Versehen in einer Antwort landen.
 */

export interface AccountSummary {
  id: string;
  email: string;
  role: Role;
  createdAt: string;
  lastLoginAt: string | null;
  disabledAt: string | null;
}

/** Seitengröße der Kontenliste und deren Obergrenze (ToDo 18.6). */
export const ACCOUNTS_PAGE_SIZE = 25;
export const ACCOUNTS_MAX = 200;
export const ACCOUNT_SEARCH_MAX = 100;

export interface AccountListOptions {
  /** Teil der Adresse, Groß-/Kleinschreibung egal; leer = alle. */
  query?: string;
  /** Höchstens so viele Konten; ohne Angabe alle. */
  limit?: number;
}

/**
 * `instr` statt `LIKE`: Eine Suche nach „50%“ oder „a_b“ soll die Zeichen
 * suchen und nicht als Muster gelten – dann müsste man sie maskieren.
 */
function accountFilter(query: string | undefined): { where: string; params: string[] } {
  const needle = (query ?? "").trim().slice(0, ACCOUNT_SEARCH_MAX).toLowerCase();
  return needle ? { where: "WHERE instr(lower(email), ?) > 0", params: [needle] } : { where: "", params: [] };
}

/** Wie viele Konten die Suche trifft – unabhängig von der Seitengröße. */
export function countAccounts(query?: string): number {
  const { where, params } = accountFilter(query);
  const row = db().prepare(`SELECT COUNT(*) AS n FROM account ${where}`).get(...params) as { n: number };
  return row.n;
}

/**
 * Konten, **Admins und gesperrte zuerst**, dann neueste zuerst: Wer die
 * Verwaltung öffnet, sucht meist die, an denen etwas zu tun ist.
 */
export function listAccounts(options: AccountListOptions = {}): AccountSummary[] {
  const { where, params } = accountFilter(options.query);
  const limit =
    options.limit === undefined ? -1 : Math.max(0, Math.min(Math.floor(options.limit), ACCOUNTS_MAX));
  const rows = db()
    .prepare(
      `SELECT id, email, role, created_at, last_login_at, disabled_at
         FROM account ${where}
         ORDER BY (role = 'admin') DESC, (disabled_at IS NOT NULL) DESC, created_at DESC, id
         LIMIT ?`,
    )
    .all(...params, limit) as {
    id: string;
    email: string;
    role: string;
    created_at: string;
    last_login_at: string | null;
    disabled_at: string | null;
  }[];

  return rows.map((row) => ({
    id: row.id,
    email: row.email,
    role: row.role === "admin" ? "admin" : "user",
    createdAt: row.created_at,
    lastLoginAt: row.last_login_at,
    disabledAt: row.disabled_at,
  }));
}

export type InvitationState = "open" | "used" | "expired" | "revoked";

export interface InvitationSummary {
  id: string;
  email: string;
  role: Role;
  createdAt: string;
  expiresAt: string;
  state: InvitationState;
}

/** Alle Einladungen, neueste zuerst – ohne Token (das gibt es nach dem Erzeugen nicht mehr). */
export function listInvitations(nowMs: number = Date.now()): InvitationSummary[] {
  const rows = db()
    .prepare(
      `SELECT id, email, role, created_at, expires_at, used_at, revoked_at
         FROM invitation ORDER BY created_at DESC`,
    )
    .all() as {
    id: string;
    email: string;
    role: string;
    created_at: string;
    expires_at: string;
    used_at: string | null;
    revoked_at: string | null;
  }[];

  return rows.map((row) => ({
    id: row.id,
    email: row.email,
    role: row.role === "admin" ? "admin" : "user",
    createdAt: row.created_at,
    expiresAt: row.expires_at,
    state: row.used_at
      ? "used"
      : row.revoked_at
        ? "revoked"
        : new Date(row.expires_at).getTime() <= nowMs
          ? "expired"
          : "open",
  }));
}

/** Eine noch offene Einladung zurückziehen. `false`, wenn es keine offene gibt. */
export function revokeInvitation(id: string): boolean {
  const result = db()
    .prepare(
      "UPDATE invitation SET revoked_at = ? WHERE id = ? AND used_at IS NULL AND revoked_at IS NULL",
    )
    .run(new Date().toISOString(), id);
  return Number(result.changes) === 1;
}

/**
 * Ein fremdes Konto löschen – ohne dessen Passwort, durch einen Administrator.
 *
 * Wie beim Löschen durch die Person selbst (`deleteAccount`) verschwinden
 * Sitzungen, Bewertungen und Favoriten mit dem Konto, und die Antwortadresse
 * an dessen Rückmeldungen wird entfernt, die Meldung selbst bleibt. **Das letzte
 * aktive Admin-Konto ist geschützt**, und das eigene Konto löscht man nicht
 * hier, sondern über die Kontoeinstellungen mit Passwort.
 */
export function deleteAccountByAdmin(
  accountId: string,
  actingAccountId: string,
): "deleted" | "not-found" | "self" | "last-admin" {
  if (accountId === actingAccountId) return "self";
  const handle = db();

  const row = handle.prepare("SELECT role, disabled_at FROM account WHERE id = ?").get(accountId) as
    | { role: string; disabled_at: string | null }
    | undefined;
  if (!row) return "not-found";
  if (row.role === "admin" && !row.disabled_at && activeAdminCount() <= 1) return "last-admin";

  const now = new Date().toISOString();
  handle.exec("BEGIN");
  try {
    handle
      .prepare(
        `UPDATE feedback SET contact_email = NULL, contact_removed_at = ?
          WHERE account_id = ? AND contact_email IS NOT NULL`,
      )
      .run(now, accountId);
    handle.prepare("DELETE FROM account WHERE id = ?").run(accountId);
    handle.exec("COMMIT");
  } catch (error) {
    handle.exec("ROLLBACK");
    throw error;
  }
  return "deleted";
}
