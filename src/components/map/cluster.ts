/**
 * Größe und Beschriftung der Punktbündel auf der Karte (ToDo 9.17).
 *
 * **Eigene Datei ohne Leaflet, damit es Tests gibt.** `icons.ts` lädt Leaflet
 * beim Import, und das verlangt ein `window`; eine Prüfung dieser Zahlen wäre
 * dort nur mit einem künstlichen Browser möglich. Die Regeln selbst sind reines
 * Rechnen und gehören deshalb hierher.
 *
 * **Warum 48 und nicht die 40 der Bibliothek:** Die Prüfung am 2026-10-21 fand
 * die mitgelieferten Bündel als einzigen Mangel der Barrierefreiheit – zu klein
 * und zu dicht beieinander. Für eine App, deren Nutzer:innen eingeschränkt
 * beweglich sind, einhändig und oft im Sitzen im Auto bedienen, ist das kein
 * Schönheitsfehler: Wer danebentippt, öffnet den falschen Parkplatz oder
 * verschiebt die Karte. 48 px ist das Maß, das Android und iOS für Bedienziele
 * empfehlen; die Vorgabe der Prüfwerkzeuge (24 px) ist das Minimum, nicht das
 * Ziel.
 */

/** Kleinster Durchmesser eines Bündels in Pixeln. */
export const MIN_CLUSTER_PX = 48;

/**
 * Der Durchmesser wächst mit der Anzahl – aber begrenzt.
 *
 * Die Größe ist die einzige Angabe, die man **ohne zu lesen** erfasst, und
 * deshalb bleibt sie. Nach oben gedeckelt, weil ein Bündel über 64 px auf einem
 * Telefon mehr Karte verdeckt, als es an Übersicht bringt.
 */
export function clusterSize(count: number): number {
  if (count < 10) return MIN_CLUSTER_PX;
  if (count < 100) return 56;
  return 64;
}

/**
 * Was der Screenreader vorliest.
 *
 * Ohne das meldet er eine Schaltfläche mit einer nackten Zahl – „47" sagt
 * niemandem, dass sich dahinter Parkplätze verbergen und dass ein Antippen sie
 * auseinanderzieht.
 */
export function clusterLabel(count: number): string {
  const was = count === 1 ? "Parkplatz" : "Parkplätze";
  return `${count} ${was} in diesem Bereich, zum Aufteilen antippen`;
}
