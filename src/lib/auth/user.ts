/**
 * Wie ein angemeldetes Konto aussieht – für Server **und** Browser.
 *
 * Eine eigene Datei, damit Komponenten den Typ benutzen können, ohne
 * `session.ts` zu berühren: Das zieht `next/headers` und die Datenbank nach
 * sich und gehört nicht in ein Browser-Bundle.
 */

import type { Locale } from "../../i18n";
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
  /**
   * Am Konto gewählte Sprache (ToDo 15.5) – `null`, solange nie eine gewählt
   * wurde. Dann gilt das Cookie, sonst die Browsersprache.
   */
  language: Locale | null;
}

/**
 * Was die Oberfläche wirklich braucht.
 *
 * Die Konto-ID bleibt bewusst auf dem Server. Sie wird im Browser für nichts
 * gebraucht, und was nicht ausgeliefert wird, kann auch nicht aus Versehen in
 * einer Anfrage landen.
 */
export type PublicUser = Pick<SessionUser, "email" | "isAdmin" | "mapsPreference" | "language">;

export const publicUser = (user: SessionUser): PublicUser => ({
  email: user.email,
  isAdmin: user.isAdmin,
  mapsPreference: user.mapsPreference,
  language: user.language,
});
