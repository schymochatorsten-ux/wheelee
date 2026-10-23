/**
 * Welcher Hinweis am Kartenrand steht, wenn nicht alle Parkplätze des
 * Ausschnitts geladen sind (ToDo 9.16).
 *
 * „Näher heranzoomen" ist nur dann eine brauchbare Aufforderung, wenn ein bis
 * zwei Zoomschritte genügen. Bei kontinentaler Zoomstufe sind es ein Dutzend,
 * im Bild liegt überwiegend Ausland ohne Daten – und die geladenen 2.000
 * Marker sind eine zufällige Auswahl, die an manchen Orten „hier ist nichts"
 * vortäuscht.
 *
 * **Die Schwelle ist gemessen, nicht gegriffen** (2026-10-23, Bestand mit
 * 18.072 Standorten, Telefon 375 × 600 und Desktop 1400 × 800, Essen, Köln,
 * Berlin, Hamburg, Frankfurt, München): Bei Stufe 10 liegen am Desktop im
 * Ruhrgebiet noch 3.458 Standorte im Bild, bei Stufe 11 knapp unter 2.000
 * (Essen 1.955); auf dem Telefon bleibt Köln bei Stufe 10 mit 1.950 knapp
 * darunter, bei Stufe 9 mit 3.581 darüber. Ab Stufe 10 hilft also ein bis zwei
 * Schritte Zoomen; darunter nicht mehr zuverlässig.
 */
export const MIN_ZOOM_FOR_MARKERS = 10;

export type TruncationHint =
  /** Alles geladen – kein Hinweis. */
  | "none"
  /** Fast passend: ein, zwei Zoomschritte lösen es. */
  | "zoom-in"
  /** Viel zu weit draußen: Marker ausblenden, auf Stadtgröße verweisen. */
  | "city-level";

/**
 * Nur bei abgeschnittener Antwort gibt es überhaupt einen Hinweis. Ist alles
 * geladen, bleiben die Marker auch bei niedriger Stufe stehen – in dünn
 * besiedelten Gegenden ist ein weiter Ausschnitt vollständig.
 *
 * Ohne bekannte Zoomstufe gilt der mildere Hinweis: Ein Marker-Ausblenden ohne
 * Grundlage wäre schlimmer als ein überflüssiger Satz.
 */
export function truncationHint(truncated: boolean, zoom: number | null): TruncationHint {
  if (!truncated) return "none";
  if (zoom === null || zoom >= MIN_ZOOM_FOR_MARKERS) return "zoom-in";
  return "city-level";
}
