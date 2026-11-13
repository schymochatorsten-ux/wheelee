import type { ParkingSpot } from "../types";

/**
 * Sicher oder unsicher – die eine Stelle, an der das entschieden wird
 * (ToDo 8.11).
 *
 * **Warum es diese Unterscheidung überhaupt gibt.** Bis zum 2026-11-13 galt:
 * Was sich nicht belegen lässt, kommt nicht in den Bestand (`Datenpflege.md`,
 * „lieber kein Import als ein falscher"). Das hat 473 Gemeinden und zuletzt
 * die 22 Heidelberger Zeilen gekostet. Torstens Festlegung dreht die Abwägung
 * **für den Einzelfall**: besser ein Platz zu viel, aber **klar als unsicher
 * gekennzeichnet und vor dem Navigieren deutlich benannt** – und bei
 * Rückmeldungen verschwindet er wieder.
 *
 * **Der Grundsatz selbst bleibt gültig**, nur sein Mittel ist nicht mehr das
 * Weglassen: Eine falsche Angabe, die wie eine geprüfte aussieht, ist weiter
 * das Schlimmste, was diese App tun kann. Deshalb hängt an „unsicher" beides –
 * der sichtbare Hinweis **und** die niedrigere Schwelle zum Verschwinden.
 *
 * **Vier Gründe, und jeder allein genügt:**
 *
 * - `gemeldet` – von einer Nutzerin eingetragen und noch nicht genug
 *   bestätigt. Niemand außer ihr hat den Platz je gesehen.
 * - `nur_osm` – steht in OpenStreetMap, aber nicht in der amtlichen Liste der
 *   Stadt (3.11). Bisher schon mit gelbem Hinweis gezeigt.
 * - `lage` – die Koordinate ist nicht hausgenau (`geoAccuracy` ist nicht
 *   `house`), etwa ein Geländemittelpunkt aus dem Geocoding. Der Platz
 *   existiert vermutlich, aber nicht dort, wo die Nadel steckt – und für
 *   jemanden, der auf die letzten Meter angewiesen ist, ist das derselbe
 *   Schaden.
 * - `quelle` – der Import selbst hat die Zeile als zweifelhaft übernommen
 *   (`unsicher: true` in der Seed- oder Zusatzdatei). Das ist der Fall, für
 *   den diese Änderung gebaut wurde: Zeilen wie „Seminarstraße 4", bei denen
 *   offen ist, ob es ein neuer Platz oder derselbe unter anderer Hausnummer
 *   ist.
 *
 * **`bestaetigt` sticht nichts aus.** Ein Standort, den zwei Quellen kennen,
 * dessen Koordinate aber nur ungefähr ist, bleibt unsicher: Bestätigt ist dann
 * seine Existenz, nicht seine Lage.
 */

export type UncertaintyReason = "gemeldet" | "nur_osm" | "lage" | "quelle";

/** Alle Gründe, warum dieser Platz unsicher ist – leer heißt: gesichert. */
export function uncertaintyReasons(spot: ParkingSpot): UncertaintyReason[] {
  const reasons: UncertaintyReason[] = [];

  if (spot.origin === "gemeldet") reasons.push("gemeldet");
  if (spot.confirmation === "nur_osm") reasons.push("nur_osm");
  if (spot.geoAccuracy !== "house") reasons.push("lage");
  if (spot.unsicher === true) reasons.push("quelle");

  return reasons;
}

/** Kurzform: Gilt dieser Platz als unsicher? */
export function isUncertain(spot: ParkingSpot): boolean {
  return uncertaintyReasons(spot).length > 0;
}

/**
 * Wie viele Konten diesen Platz als aufgehoben melden müssen, damit er
 * verschwindet.
 *
 * Nimmt die Schwellen als Argument, nicht aus der Datenbank: So bleibt die
 * Regel eine reine Funktion und damit prüfbar – und dieselbe Rechnung gilt im
 * Endpunkt, in der Verwaltung und im Test.
 */
export function removalThreshold(
  spot: ParkingSpot,
  policy: { schwelleUnsicher: number; schwelleSicher: number },
): number {
  return isUncertain(spot) ? policy.schwelleUnsicher : policy.schwelleSicher;
}

/**
 * Wie viele Konten einen **gemeldeten** Platz bestätigen müssen, damit er ein
 * gewöhnlicher Platz wird.
 *
 * **Das ist ausdrücklich die Schwelle für gesicherte Plätze**, nicht die
 * niedrigere (Torsten, 2026-11-13). Etwas in den Bestand aufzunehmen muss
 * schwerer sein, als es wieder loszuwerden: Ein zu Unrecht entfernter Platz
 * ist ein Verlust, ein zu Unrecht aufgenommener eine vergebliche Fahrt – und
 * die Asymmetrie gehört in die Zahlen, nicht in gute Absichten.
 */
export function confirmationThreshold(policy: { schwelleSicher: number }): number {
  return policy.schwelleSicher;
}
