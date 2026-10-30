import { cookies } from "next/headers";
import { accountForSession, SESSION_COOKIE, SESSION_MAX_AGE, type Account } from "../db/accounts";
import { isLocale } from "../../i18n";
import { isMapsPreference } from "../maps-preference";
import type { SessionUser } from "./user";

/**
 * Wer ist angemeldet, und ist das der Administrator?
 *
 * Diese Datei ist die **einzige** Stelle, die beides beantwortet. Zwei
 * Zugangsprüfungen nebeneinander sind der Fall, in dem eine davon beim
 * nächsten Umbau vergessen wird – und eine vergessene Prüfung fällt niemandem
 * auf, weil alles weiter funktioniert.
 */

export type { SessionUser, PublicUser } from "./user";

export { adminEmails, isAdminEmail } from "./admin-emails";

/**
 * Ist dieses Konto Administrator? (ToDos 18.1, 10.19)
 *
 * **Allein die Rolle am Konto zählt.** `ADMIN_EMAILS` wirkt nur noch als
 * einmalige Hochstufung vorhandener Konten (siehe `bootstrapAdmins`). Vorher
 * wurde die Adresse bei jeder Anfrage verglichen, solange kein Admin in der
 * Datenbank stand: Wer eine dieser Adressen zuerst registrierte, wurde Admin
 * (die Adresse wird nicht bestätigt), und der eigentliche Besitzer verlor sein
 * Recht, sobald ein zweiter Admin existierte.
 */
export function isAdminAccount(account: Pick<Account, "role" | "disabledAt">): boolean {
  return !account.disabledAt && account.role === "admin";
}

const toUser = (account: Account): SessionUser => ({
  id: account.id,
  email: account.email,
  isAdmin: isAdminAccount(account),
  // Ein unbekannter Wert in der Spalte wird zu `null` – dasselbe Verhalten wie
  // bei einem unlesbaren Browser-Speicher (siehe Migration 4).
  mapsPreference: isMapsPreference(account.mapsPreference) ? account.mapsPreference : null,
  language: isLocale(account.language) ? account.language : null,
});

/** Das angemeldete Konto, oder `null`. */
export async function currentUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const account = accountForSession(store.get(SESSION_COOKIE)?.value);
  return account ? toUser(account) : null;
}

/**
 * Dasselbe für Route-Handler, die das Cookie selbst aus der Anfrage lesen.
 *
 * `cookies()` aus `next/headers` funktioniert dort ebenfalls, aber der Weg über
 * die Anfrage ist der direktere und in Tests ohne Next-Laufzeit benutzbar.
 */
export function userFromRequest(request: Request): SessionUser | null {
  const account = accountForSession(readCookie(request, SESSION_COOKIE));
  return account ? toUser(account) : null;
}

/** Das Sitzungstoken der Anfrage – für Endpunkte, die die eigene Sitzung schonen müssen. */
export function sessionTokenFromRequest(request: Request): string | undefined {
  return readCookie(request, SESSION_COOKIE);
}

/**
 * Ein ungültiger %-Code im Cookie (`%E0%A4%A`) ließ `decodeURIComponent` werfen
 * und jede Sitzungsroute mit 500 antworten (gemessen im Produktionsbau,
 * 10.9). Jetzt gilt der Wert als nicht vorhanden – also 401 statt 500.
 */
export function readCookie(request: Request, name: string): string | undefined {
  const header = request.headers.get("cookie");
  if (!header) return undefined;

  for (const part of header.split(";")) {
    const index = part.indexOf("=");
    if (index < 0) continue;
    if (part.slice(0, index).trim() !== name) continue;
    try {
      return decodeURIComponent(part.slice(index + 1).trim());
    } catch {
      return undefined;
    }
  }
  return undefined;
}

/**
 * Einstellungen des Sitzungscookies.
 *
 * - `httpOnly`: Kein JavaScript kommt daran. Ohne das wäre jede eingebundene
 *   Fremddatei ein Weg zur Sitzungsübernahme.
 * - `sameSite: "lax"`: Das Cookie wird bei Anfragen von fremden Seiten nicht
 *   mitgeschickt, außer beim normalen Aufruf eines Links. Damit sind die
 *   schreibenden Endpunkte gegen CSRF geschützt, ohne ein eigenes Token.
 * - `secure` nur in Produktion: Im Entwicklungsbetrieb läuft die App über
 *   `http://localhost`, und ein `secure`-Cookie käme dort nie an.
 */
export function sessionCookie(token: string) {
  return {
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

/** Cookie löschen – gleiche Einstellungen, Laufzeit null. */
export function clearedSessionCookie() {
  return { ...sessionCookie(""), maxAge: 0 };
}
