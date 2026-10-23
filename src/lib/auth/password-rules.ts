/**
 * Die Regeln für Passwörter, ohne Node-Bezug.
 *
 * Getrennt von `password.ts`, weil das Anmeldeformular im Browser läuft und
 * dieselbe Mindestlänge nennen soll, die der Server durchsetzt. Über
 * `password.ts` käme `node:crypto` mit ins Bundle – und zwei Stellen mit zwei
 * Zahlen wären die Alternative, bei der eine davon irgendwann abweicht.
 */

import { t } from "@/i18n";

/** Mindestlänge eines Passworts. */
export const MIN_PASSWORD_LENGTH = 10;

/**
 * Warum zehn Zeichen und keine Zeichenklassen-Regeln: Eine Vorschrift wie
 * „ein Großbuchstabe, eine Zahl, ein Sonderzeichen" erzeugt nachweislich
 * `Passwort1!` und nichts Besseres. Die Länge ist der Faktor, der wirklich
 * zählt – so sehen es auch die aktuellen Empfehlungen von BSI und NIST.
 */
export function passwordProblem(password: string): string | null {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return t("account.passwordTooShort", { min: MIN_PASSWORD_LENGTH });
  }
  /*
   * Oben offen zu lassen wäre eine Einladung: scrypt rechnet über die
   * **ganze** Eingabe, und ein Passwort von einem Megabyte würde den Server
   * bei jedem Versuch für Sekunden beschäftigen. 200 Zeichen schränken
   * niemanden ein, der sich einen Satz merkt.
   */
  if (password.length > 200) return t("account.passwordTooLong", { max: 200 });
  return null;
}
