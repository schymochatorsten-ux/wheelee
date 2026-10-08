import type { ParkingSpot } from "./types";

/**
 * Links in die Karten-App des Geräts.
 *
 * Die App navigiert laut Konzept nicht selbst, sondern übergibt das Ziel an
 * Apple Karten (iOS/macOS) oder Google Maps (alles andere).
 */

export type MapsTarget = "apple" | "google";

/**
 * Zielplattform aus dem User-Agent ableiten.
 * Nur für die Beschriftung und die Link-Form – schiefgehen kann dabei nichts,
 * weil beide Links überall funktionieren.
 */
export function detectMapsTarget(userAgent: string): MapsTarget {
  return /iphone|ipad|ipod|macintosh/iu.test(userAgent) ? "apple" : "google";
}

/** Beschriftung der Schaltfläche. */
export function mapsLabel(target: MapsTarget): string {
  return target === "apple" ? "In Apple Karten öffnen" : "In Google Maps öffnen";
}

/**
 * Link zum Parkplatz als Navigationsziel.
 * Die Koordinate führt, der Adresstext dient nur der Beschriftung im Zielsystem.
 */
export function mapsUrl(
  spot: Pick<ParkingSpot, "lat" | "lng" | "label">,
  target: MapsTarget,
): string | null {
  if (spot.lat === null || spot.lng === null) return null;

  const coordinates = `${spot.lat},${spot.lng}`;
  const name = encodeURIComponent(spot.label);

  if (target === "apple") {
    return `https://maps.apple.com/?daddr=${coordinates}&q=${name}&dirflg=d`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${coordinates}&destination_place_id=&travelmode=driving`;
}
