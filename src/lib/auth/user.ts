/**
 * Wie ein angemeldetes Konto aussieht – für Server **und** Browser.
 *
 * Eine eigene Datei, damit Komponenten den Typ benutzen können, ohne
 * `session.ts` zu berühren: Das zieht `next/headers` und die Datenbank nach
 * sich und gehört nicht in ein Browser-Bundle.
 */

import type { MapsPreference } from "../maps-preference";

export interface SessionUser {
  id: string;
  email: string;
  /** Darf die Übersicht der Rückmeldungen sehen und ändern. */
  isAdmin: boolean;
  /**
   * Am Konto gewählte Karten-App (ToDo 11.3a) – `null`, solange nie eine
   * gewählt wurde. Dann gilt die Wahl im Browser.
   */
  mapsPreference: MapsPreference | null;
}

/**
 * Was die Oberfläche wirklich braucht.
 *
 * Die Konto-ID bleibt bewusst auf dem Server. Sie wird im Browser für nichts
 * gebraucht, und was nicht ausgeliefert wird, kann auch nicht aus Versehen in
 * einer Anfrage landen.
 */
export type PublicUser = Pick<SessionUser, "email" | "isAdmin" | "mapsPreference">;

export const publicUser = (user: SessionUser): PublicUser => ({
  email: user.email,
  isAdmin: user.isAdmin,
  mapsPreference: user.mapsPreference,
});
