/**
 * Eine eigene „Herkunft“ für einen Aufruf der Schnittstelle (ToDo 12.12).
 *
 * Die Registrierung ist auf fünf je Stunde und Herkunft gedrosselt
 * (`LIMITS.register`). Die Specs legen zusammen weit mehr Konten an; im
 * Entwicklungsserver fiel das nicht auf, weil dessen Module bei Änderungen neu
 * geladen werden und die Zähler dabei verloren gehen. Der Produktionsbau hat
 * einen Zähler für die ganze Laufzeit – und antwortete dem sechsten Konto mit
 * 429. Hinter dem Proxy hat im Betrieb jede Anfrage ohnehin ihre eigene
 * `x-forwarded-for`-Adresse, so gesehen ist das der wirklichkeitsnähere Fall.
 */
export function herkunft(): Record<string, string> {
  const z = () => 1 + Math.floor(Math.random() * 250);
  return { "x-forwarded-for": `10.${z()}.${z()}.${z()}` };
}
