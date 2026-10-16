/**
 * Wie ein angemeldetes Konto aussieht – für Server **und** Browser.
 *
 * Eine eigene Datei, damit Komponenten den Typ benutzen können, ohne
 * `session.ts` zu berühren: Das zieht `next/headers` und die Datenbank nach
 * sich und gehört nicht in ein Browser-Bundle.
 */

export interface SessionUser {
  id: string;
  email: string;
  /** Darf die Übersicht der Rückmeldungen sehen und ändern. */
  isAdmin: boolean;
}

/**
 * Was die Oberfläche wirklich braucht.
 *
 * Die Konto-ID bleibt bewusst auf dem Server. Sie wird im Browser für nichts
 * gebraucht, und was nicht ausgeliefert wird, kann auch nicht aus Versehen in
 * einer Anfrage landen.
 */
export type PublicUser = Pick<SessionUser, "email" | "isAdmin">;

export const publicUser = (user: SessionUser): PublicUser => ({
  email: user.email,
  isAdmin: user.isAdmin,
});
