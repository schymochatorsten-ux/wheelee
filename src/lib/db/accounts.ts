import { createHash, randomBytes, randomUUID } from "node:crypto";
import { db, now } from "./sqlite";
import { hashPassword, verifyPassword } from "../auth/password";
import { normalizeEmail } from "../auth/email";

/**
 * Benutzerkonten und Sitzungen (ToDos 11.1, 11.2).
 *
 * Konten sind in diesem Projekt kein Selbstzweck – das Konzept nennt sie
 * ausdrücklich als „bewusst nicht im ersten Umfang". Gebraucht werden sie,
 * weil Rückmeldungen zurechenbar sein sollen und weil die Übersichtsseite
 * eine Anmeldung braucht. Entsprechend verlangt die App eine Anmeldung
 * **nirgends**, wo es ohne geht: Karte, Suche und das Melden eines Fehlers
 * funktionieren weiterhin ohne Konto.
 */

export interface Account {
  id: string;
  email: string;
  createdAt: string;
  /**
   * Bevorzugte Karten-App, geräteübergreifend (ToDo 11.3a). `null` heißt: nie
   * etwas gewählt – dann gilt, was im Browser steht, sonst „automatisch".
   */
  mapsPreference: string | null;
}

interface AccountRow {
  id: string;
  email: string;
  maps_preference?: string | null;
  password_hash: string;
  created_at: string;
}

/** Wie lange eine Sitzung gilt. */
const SESSION_DAYS = 30;

/**
 * Dreißig Tage, nicht zwei Stunden: Wer die App benutzt, sucht einen
 * Parkplatz und soll sich nicht anmelden müssen, während er im Auto sitzt. Es
 * hängen hier keine Zahlungsdaten und keine fremden Geheimnisse daran – das
 * Schutzbedürfnis ist ein anderes als bei einem Bankkonto.
 */
function expiry(): string {
  return new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString();
}

const toAccount = (row: AccountRow): Account => ({
  id: row.id,
  email: row.email,
  createdAt: row.created_at,
  mapsPreference: row.maps_preference ?? null,
});

/**
 * Die gewählte Karten-App am Konto ablegen (ToDo 11.3a).
 *
 * **Zusätzlich zum Browser-Speicher, nicht statt seiner.** Ohne Anmeldung gibt
 * es weiterhin eine Wahl – sie zu verlangen, nur um eine Karten-App
 * einzustellen, wäre genau die Hürde, die dieses Projekt sonst vermeidet.
 */
export function setMapsPreference(accountId: string, preference: string | null): void {
  db().prepare("UPDATE account SET maps_preference = ? WHERE id = ?").run(preference, accountId);
}

export function findAccountByEmail(email: string): Account | null {
  const row = db()
    .prepare(
      "SELECT id, email, password_hash, created_at, maps_preference FROM account WHERE email = ?",
    )
    .get(normalizeEmail(email)) as AccountRow | undefined;
  return row ? toAccount(row) : null;
}

export function accountCount(): number {
  const row = db().prepare("SELECT COUNT(*) AS anzahl FROM account").get() as { anzahl: number };
  return Number(row.anzahl);
}

/**
 * Konto anlegen.
 *
 * Gibt `null` zurück, wenn die Adresse schon vergeben ist. Geprüft wird das
 * über die `UNIQUE`-Bedingung der Tabelle und nicht mit einem vorgelagerten
 * `SELECT`: Zwei gleichzeitige Registrierungen derselben Adresse kämen sonst
 * beide durch die Prüfung und erst an der Datenbank auseinander.
 */
export function createAccount(email: string, password: string): Account | null {
  const account: Account = {
    id: randomUUID(),
    email: normalizeEmail(email),
    createdAt: now(),
    // Ein neues Konto hat noch keine Wahl getroffen; es gilt, was im Browser
    // steht (ToDo 11.3a).
    mapsPreference: null,
  };

  try {
    db()
      .prepare("INSERT INTO account (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)")
      .run(account.id, account.email, hashPassword(password), account.createdAt);
  } catch (error) {
    if (String((error as Error).message).includes("UNIQUE")) return null;
    throw error;
  }

  return account;
}

/**
 * Anmeldedaten prüfen.
 *
 * **Auch bei unbekannter Adresse wird ein Hash gerechnet.** Ohne das wäre an
 * der Antwortzeit ablesbar, welche Adressen registriert sind – eine
 * unbekannte Adresse wäre sofort abgelehnt, eine bekannte erst nach den
 * 100 ms des scrypt-Durchlaufs. Das ist kein theoretischer Einwand: Genau so
 * werden Adresslisten auf Treffer abgeklopft.
 */
export function authenticate(email: string, password: string): Account | null {
  const row = db()
    .prepare(
      "SELECT id, email, password_hash, created_at, maps_preference FROM account WHERE email = ?",
    )
    .get(normalizeEmail(email)) as AccountRow | undefined;

  if (!row) {
    verifyPassword(password, DUMMY_HASH);
    return null;
  }

  if (!verifyPassword(password, row.password_hash)) return null;

  db().prepare("UPDATE account SET last_login_at = ? WHERE id = ?").run(now(), row.id);
  return toAccount(row);
}

/**
 * Ein Hash gegen ein Passwort, das niemand hat – nur damit der Weg bei
 * unbekannter Adresse genauso lange dauert. Einmal beim Laden gerechnet, nicht
 * bei jedem Versuch.
 */
const DUMMY_HASH = hashPassword(randomBytes(32).toString("hex"));

/**
 * Sitzung anlegen und das **Token** zurückgeben.
 *
 * In der Datenbank steht nur dessen SHA-256. Das Token selbst existiert danach
 * ausschließlich im Cookie des Browsers: Wer die Datei in die Hand bekommt –
 * etwa aus einem Backup –, kann damit keine Sitzung übernehmen. Ein Hash
 * genügt hier ohne Salz und ohne Kosten, weil das Token 256 Bit Zufall ist und
 * nicht zu erraten.
 */
export function createSession(accountId: string): string {
  const token = randomBytes(32).toString("base64url");

  db()
    .prepare(
      "INSERT INTO session (token_hash, account_id, created_at, expires_at) VALUES (?, ?, ?, ?)",
    )
    .run(hashToken(token), accountId, now(), expiry());

  return token;
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

/**
 * Konto zu einem Sitzungstoken – oder `null`, wenn es keines (mehr) gibt.
 *
 * Abgelaufene Sitzungen werden hier gleich entfernt. Ein eigener Aufräumlauf
 * wäre mehr Apparat; so verschwindet jede Sitzung spätestens beim nächsten
 * Versuch, sie zu benutzen.
 */
export function accountForSession(token: string | undefined): Account | null {
  if (!token) return null;

  const row = db()
    .prepare(
      `SELECT a.id, a.email, a.password_hash, a.created_at, a.maps_preference, s.expires_at
         FROM session s JOIN account a ON a.id = s.account_id
        WHERE s.token_hash = ?`,
    )
    .get(hashToken(token)) as (AccountRow & { expires_at: string }) | undefined;

  if (!row) return null;

  if (new Date(row.expires_at).getTime() <= Date.now()) {
    deleteSession(token);
    return null;
  }

  return toAccount(row);
}

export function deleteSession(token: string | undefined): void {
  if (!token) return;
  db().prepare("DELETE FROM session WHERE token_hash = ?").run(hashToken(token));
}

/** Name des Cookies, in dem das Sitzungstoken steht. */
export const SESSION_COOKIE = "wheelee-session";

export const SESSION_MAX_AGE = SESSION_DAYS * 24 * 60 * 60;
