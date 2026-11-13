/**
 * Wie viele Behindertenstellplätze trägt ein OpenStreetMap-Objekt – und ist
 * die Angabe belastbar? (ToDo 8.11)
 *
 * **Diese Funktion stand dreimal im Projekt**, in `osm-state.mts`,
 * `osm-import.mts` und `osm-source.mts`, Wort für Wort gleich bis auf die
 * Kommentare. Das ist derselbe Zustand, den 9.31 bei den Bedienelementen
 * aufgeräumt hat: Beim nächsten Mal weicht eine Fassung ab, und dann liefert
 * der landesweite Lauf andere Zahlen als der Einzelimport – ohne dass jemand
 * sagen könnte, woran es liegt. Jetzt steht sie einmal hier, mit Tests.
 *
 * **Was sich am 2026-11-14 inhaltlich geändert hat** (Torstens Vorgabe vom
 * 2026-11-13: „lieber etwas zu viele Parkplätze übernehmen und als unsicher
 * markieren"): Ein Wert, der **nicht zu deuten** ist, führte bisher zum
 * Verwerfen des Objekts. Jetzt kommt es mit **einem** Stellplatz herein und
 * trägt `unsicher`.
 *
 * **Die Grenze dieser Umstellung ist wichtiger als die Umstellung selbst:**
 * „Zweifelhaft" heißt aufnehmen und kennzeichnen, „falsch" heißt weiter
 * verwerfen. Deshalb bleibt es bei `null`, wenn
 *
 * - die Quelle **ausdrücklich sagt, dass es keine gibt** (`no`, `none`, `0`) –
 *   hier etwas aufzunehmen wäre nicht Großzügigkeit, sondern das Gegenteil der
 *   Angabe, die dort steht;
 * - **gar kein Hinweis auf einen Behindertenstellplatz** vorliegt (kein
 *   `capacity:disabled`, kein `parking_space=…disabled…`, kein
 *   `wheelchair=designated`). Ein gewöhnlicher Parkplatz ist kein unsicherer
 *   Behindertenparkplatz, sondern keiner.
 */

export interface SpotCount {
  /** Zahl der Stellplätze. Bei unsicherer Angabe die vorsichtige Annahme: 1. */
  count: number;
  /**
   * Ließ sich die Angabe nicht deuten? Dann ist zwar belegt, **dass** es
   * Stellplätze gibt, nicht aber wie viele – und der Standort gehört als
   * unsicher in die Karte (`src/lib/parking/certainty.ts`).
   */
  unsicher: boolean;
}

export function readSpotCount(tags: Record<string, string>): SpotCount | null {
  const raw = tags["capacity:disabled"];

  if (raw === undefined) {
    // Kein Zähler, aber anderweitig als Behindertenstellplatz ausgewiesen.
    const ausgewiesen =
      tags.parking_space?.includes("disabled") === true || tags.wheelchair === "designated";
    return ausgewiesen ? { count: 1, unsicher: false } : null;
  }

  // „hier ausdrücklich keine" – das ist eine Aussage, keine Lücke.
  if (/^(no|none|0)$/iu.test(raw)) return null;

  const parsed = Number.parseInt(raw, 10);
  if (Number.isFinite(parsed) && parsed > 0) return { count: parsed, unsicher: false };

  // „yes" und „designated": vorhanden, Anzahl unbekannt – das ist in OSM die
  // übliche Schreibweise und keine zweifelhafte Angabe.
  if (/^(yes|designated)$/iu.test(raw)) return { count: 1, unsicher: false };

  /*
   * Alles andere: „unknown", „ja", „einige", „?", „0,5" … Es steht ein Wert
   * da, also hat sich jemand mit dem Objekt befasst – nur ist er nicht zu
   * deuten. **Bis zum 2026-11-14 fiel das Objekt hier heraus.** Jetzt kommt
   * es mit einem Stellplatz und der Kennzeichnung herein: Ein Platz, den es
   * vielleicht gibt, hilft mit Warnung mehr als ein Platz, den niemand sieht.
   */
  return { count: 1, unsicher: true };
}
