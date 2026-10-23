import { cookies } from "next/headers";
import { accountForSession, SESSION_COOKIE, SESSION_MAX_AGE, type Account } from "../db/accounts";
import { normalizeEmail } from "./email";
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

/**
 * Wer Administrator ist, steht in der Umgebung – nicht in der Datenbank und
 * nicht im Quelltext (ToDo 17.0, entschieden 2026-10-11).
 *
 * `ADMIN_EMAILS` nimmt eine oder mehrere Adressen, durch Komma getrennt. Das
 * ist der kleinste Weg, der ohne Benutzerverwaltung auskommt: Es gibt keine
 * Rollentabelle, die gepflegt werden müsste, und kein Fenster, in dem sich
 * jemand selbst zum Administrator erklären könnte.
 *
 * **Bewusst kein Rückfall auf „der erste angemeldete Benutzer".** Das ist das
 * übliche Muster, und es ist hier falsch: wheelee.de steht offen im Netz, und
 * die Registrierung ist für jede:n offen. Wer zuerst da ist, bekäme die
 * Übersicht aller Rückmeldungen samt der freiwillig angegebenen
 * E-Mail-Adressen. Ist die Variable leer, hat lieber **niemand** Zugriff.
 */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((entry) => normalizeEmail(entry))
    .filter((entry) => entry.length > 0);
}

export function isAdminEmail(email: string): boolean {
  return adminEmails().includes(normalizeEmail(email));
}

const toUser = (account: Account): SessionUser => ({
  id: account.id,
  email: account.email,
  isAdmin: isAdminEmail(account.email),
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

function readCookie(request: Request, name: string): string | undefined {
  const header = request.headers.get("cookie");
  if (!header) return undefined;

  for (const part of header.split(";")) {
    const index = part.indexOf("=");
    if (index < 0) continue;
    if (part.slice(0, index).trim() !== name) continue;
    return decodeURIComponent(part.slice(index + 1).trim());
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
