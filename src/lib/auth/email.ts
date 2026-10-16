/**
 * Prüfung und Vereinheitlichung von E-Mail-Adressen.
 *
 * **Eine eigene Datei, und zwar aus einem handfesten Grund:** Diese Funktionen
 * werden auf beiden Seiten gebraucht – im Browser, damit ein Tippfehler sofort
 * am Feld steht, und auf dem Server, weil eine Prüfung im Browser keine
 * Prüfung ist. Lägen sie bei den Passwortfunktionen, zöge jede Komponente, die
 * sie benutzt, über `node:crypto` die halbe Node-Laufzeit in das
 * Browser-Bundle – im besten Fall ein Bauabbruch, im schlechteren eine
 * aufgeblähte Seite.
 */

/**
 * `Torsten@Example.de` und `torsten@example.de` sind dasselbe Postfach.
 *
 * Ohne diese Vereinheitlichung ließe sich dieselbe Adresse zweimal
 * registrieren, und der Vergleich mit `ADMIN_EMAILS` würde an einem
 * Großbuchstaben scheitern – also ausgerechnet an der Stelle, an der es um den
 * Zugang zu allen Rückmeldungen geht.
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Sieht die Adresse nach einer Adresse aus?
 *
 * Bewusst grob. Eine vollständige Prüfung nach RFC 5322 ist berühmt dafür,
 * gültige Adressen abzulehnen, und sie nützt hier nichts: Ob das Postfach
 * existiert, weiß man ohnehin erst, wenn eine Antwort ankommt. Abgefangen
 * werden soll der Tippfehler, nicht der Grenzfall.
 */
export function looksLikeEmail(email: string): boolean {
  const value = normalizeEmail(email);
  if (value.length < 5 || value.length > 254) return false;
  return /^[^\s@,:;<>"]+@[^\s@.,:;<>"]+(\.[^\s@.,:;<>"]+)+$/u.test(value);
}
