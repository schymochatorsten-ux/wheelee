import { createHash, randomBytes, randomUUID } from "node:crypto";
import { db, now } from "./sqlite";
import { hashPassword, verifyPassword } from "../auth/password";
import { normalizeEmail } from "../auth/email";
import { listFavorites } from "./favorites";

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
  /**
   * Gewählte Sprache der Oberfläche, geräteübergreifend (ToDo 15.5). `null`
   * heißt: nie gewählt – dann gilt Cookie, sonst Browsersprache.
   */
  language: string | null;
}

interface AccountRow {
  id: string;
  email: string;
  maps_preference?: string | null;
  language?: string | null;
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
  language: row.language ?? null,
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

/**
 * Die gewählte Sprache am Konto ablegen (ToDo 15.5) – zusätzlich zum Browser,
 * wie die Karten-App. Der Wert wird am Endpunkt geprüft, nicht hier.
 */
export function setLanguage(accountId: string, language: string | null): void {
  db().prepare("UPDATE account SET language = ? WHERE id = ?").run(language, accountId);
}

export function findAccountByEmail(email: string): Account | null {
  const row = db()
    .prepare(
      "SELECT id, email, password_hash, created_at, maps_preference, language FROM account WHERE email = ?",
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
    language: null,
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
      "SELECT id, email, password_hash, created_at, maps_preference, language FROM account WHERE email = ?",
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
      `SELECT a.id, a.email, a.password_hash, a.created_at, a.maps_preference, a.language, s.expires_at
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

/**
 * Passwort ändern und alle **anderen** Sitzungen des Kontos verwerfen
 * (ToDo 10.7).
 *
 * Beides gehört in eine Transaktion: Wer vermutet, dass sein Passwort bekannt
 * ist, will nicht, dass die Änderung gelingt und eine fremde Sitzung stehen
 * bleibt. Die Sitzung, mit der geändert wird, bleibt bestehen – sonst stünde
 * man nach dem Ändern vor einer Anmeldemaske.
 *
 * Gibt `false` zurück, wenn das alte Passwort nicht stimmt. Das alte Passwort
 * wird verlangt, weil eine gestohlene Sitzung allein nicht genügen soll, um das
 * Konto dauerhaft zu übernehmen.
 */
export function changePassword(
  accountId: string,
  oldPassword: string,
  newPassword: string,
  currentToken: string | undefined,
): boolean {
  const row = db().prepare("SELECT password_hash FROM account WHERE id = ?").get(accountId) as
    { password_hash: string } | undefined;
  if (!row || !verifyPassword(oldPassword, row.password_hash)) return false;

  const keep = currentToken ? hashToken(currentToken) : "";
  const handle = db();
  handle.exec("BEGIN");
  try {
    handle
      .prepare("UPDATE account SET password_hash = ? WHERE id = ?")
      .run(hashPassword(newPassword), accountId);
    handle
      .prepare("DELETE FROM session WHERE account_id = ? AND token_hash <> ?")
      .run(accountId, keep);
    handle.exec("COMMIT");
  } catch (error) {
    handle.exec("ROLLBACK");
    throw error;
  }
  return true;
}

/**
 * Konto samt Sitzungen und Bewertungen löschen (ToDo 11.7, Art. 17 DSGVO).
 *
 * Sitzungen und Bewertungen fallen über `ON DELETE CASCADE` weg. Rückmeldungen
 * bleiben bestehen – der Hinweis auf einen falschen Parkplatz soll nicht mit
 * dem Konto verschwinden –, verlieren aber den Bezug zum Konto (`SET NULL`).
 *
 * **Die freiwillig angegebene Antwortadresse wird mit entfernt.** Sie ist die
 * einzige Angabe an einer Rückmeldung, die auf eine Person zeigt, und wer sein
 * Konto löscht, erwartet nicht, dass sie weiter irgendwo steht. Der Zeitpunkt
 * kommt in `contact_removed_at`, damit die Übersicht „Adresse entfernt" von
 * „nie eine angegeben" unterscheiden kann (Migration 3). Der Text der Meldung
 * bleibt: Er ist der Hinweis selbst.
 *
 * Verlangt wird das Passwort (wie beim Ändern): Eine gestohlene Sitzung allein
 * soll ein Konto nicht unwiderruflich vernichten können. `false`, wenn es nicht
 * stimmt.
 */
export function deleteAccount(accountId: string, password: string): boolean {
  const handle = db();
  const row = handle.prepare("SELECT password_hash FROM account WHERE id = ?").get(accountId) as
    { password_hash: string } | undefined;
  if (!row || !verifyPassword(password, row.password_hash)) return false;

  handle.exec("BEGIN");
  try {
    handle
      .prepare(
        `UPDATE feedback SET contact_email = NULL, contact_removed_at = ?
          WHERE account_id = ? AND contact_email IS NOT NULL`,
      )
      .run(now(), accountId);
    handle.prepare("DELETE FROM account WHERE id = ?").run(accountId);
    handle.exec("COMMIT");
  } catch (error) {
    handle.exec("ROLLBACK");
    throw error;
  }
  return true;
}

/** Alles, was zu einem Konto gespeichert ist – für die Auskunft (Art. 15, 20 DSGVO). */
export interface AccountExport {
  exportedAt: string;
  account: {
    email: string;
    createdAt: string;
    lastLoginAt: string | null;
    mapsPreference: string | null;
    language: string | null;
  };
  ratings: { spotId: string; vote: string; createdAt: string; updatedAt: string | null }[];
  favorites: { spotId: string; createdAt: string }[];
  feedback: {
    kind: string;
    message: string;
    contactEmail: string | null;
    spotId: string | null;
    city: string | null;
    url: string | null;
    userAgent: string | null;
    appVersion: string | null;
    status: string;
    createdAt: string;
  }[];
}

/**
 * Die eigenen Daten als Datensatz.
 *
 * **Nicht enthalten: Passwort-Hash und Sitzungs-Hashes** (Geheimnisse, keine
 * Angaben über die Person) und die interne Notiz der Betreiber an einer
 * Rückmeldung (sie beschreibt die Bearbeitung, nicht dich).
 */
export function exportAccountData(accountId: string): AccountExport | null {
  const handle = db();
  const account = handle
    .prepare(
      "SELECT email, created_at, last_login_at, maps_preference, language FROM account WHERE id = ?",
    )
    .get(accountId) as
    | {
        email: string;
        created_at: string;
        last_login_at: string | null;
        maps_preference: string | null;
        language: string | null;
      }
    | undefined;
  if (!account) return null;

  const ratings = handle
    .prepare(
      "SELECT spot_id, vote, created_at, updated_at FROM rating WHERE account_id = ? ORDER BY created_at",
    )
    .all(accountId) as {
    spot_id: string;
    vote: string;
    created_at: string;
    updated_at: string | null;
  }[];

  const feedback = handle
    .prepare(
      `SELECT kind, message, contact_email, spot_id, city, url, user_agent, app_version, status, created_at
         FROM feedback WHERE account_id = ? ORDER BY created_at`,
    )
    .all(accountId) as {
    kind: string;
    message: string;
    contact_email: string | null;
    spot_id: string | null;
    city: string | null;
    url: string | null;
    user_agent: string | null;
    app_version: string | null;
    status: string;
    created_at: string;
  }[];

  return {
    exportedAt: now(),
    account: {
      email: account.email,
      createdAt: account.created_at,
      lastLoginAt: account.last_login_at,
      mapsPreference: account.maps_preference,
      language: account.language,
    },
    ratings: ratings.map((r) => ({
      spotId: r.spot_id,
      vote: r.vote,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    })),
    favorites: listFavorites(accountId),
    feedback: feedback.map((f) => ({
      kind: f.kind,
      message: f.message,
      contactEmail: f.contact_email,
      spotId: f.spot_id,
      city: f.city,
      url: f.url,
      userAgent: f.user_agent,
      appVersion: f.app_version,
      status: f.status,
      createdAt: f.created_at,
    })),
  };
}

/** Name des Cookies, in dem das Sitzungstoken steht. */
export const SESSION_COOKIE = "wheelee-session";

export const SESSION_MAX_AGE = SESSION_DAYS * 24 * 60 * 60;
