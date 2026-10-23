import { DEFAULT_LOCALE, localeTag, type Locale } from "@/i18n";
import type { ParkingSpot, ParkingSpotWithDistance } from "./types";

const EARTH_RADIUS_METERS = 6_371_008.8;

export interface LatLng {
  lat: number;
  lng: number;
}

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

/** Luftlinie zwischen zwei Koordinaten in Metern (Haversine). */
export function distanceMeters(a: LatLng, b: LatLng): number {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.min(1, Math.sqrt(h)));
}

/**
 * Entfernung für die Anzeige formatieren: unter 1 km in Metern (auf 10 m
 * gerundet), darüber in Kilometern mit einer Dezimalstelle in der Schreibweise\n * der Sprache.
 */
export function formatDistance(meters: number, locale: Locale = DEFAULT_LOCALE): string {
  if (!Number.isFinite(meters)) return "–";
  if (meters < 1000) {
    const rounded = meters < 100 ? Math.round(meters) : Math.round(meters / 10) * 10;
    return `${rounded} m`;
  }
  const km = meters / 1000;
  // Dezimalzeichen je Sprache: „1,5 km" deutsch, „1.5 km" englisch (ToDo 15.3).
  const digits = km < 10 ? 1 : 0;
  const formatted = km.toLocaleString(localeTag(locale), {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  return `${formatted} km`;
}

/** Hat der Parkplatz eine nutzbare Koordinate? */
export function hasCoordinates(
  spot: ParkingSpot,
): spot is ParkingSpot & { lat: number; lng: number } {
  return spot.lat !== null && spot.lng !== null && spot.geoAccuracy !== "none";
}

/**
 * Parkplätze mit Koordinaten nach Entfernung zum Standort sortieren.
 * Parkplätze ohne Koordinaten werden ausgelassen – sie gehören in die
 * Listenansicht, nicht in die Entfernungsberechnung.
 */
export function sortByDistance(
  spots: readonly ParkingSpot[],
  origin: LatLng,
): ParkingSpotWithDistance[] {
  return spots
    .filter(hasCoordinates)
    .map((spot) => ({
      ...spot,
      distanceMeters: distanceMeters(origin, { lat: spot.lat, lng: spot.lng }),
    }))
    .sort((a, b) => a.distanceMeters - b.distanceMeters);
}

/** Nächstgelegener Parkplatz oder `null`, wenn keiner verortet ist. */
export function findNearest(
  spots: readonly ParkingSpot[],
  origin: LatLng,
): ParkingSpotWithDistance | null {
  let nearest: ParkingSpotWithDistance | null = null;

  for (const spot of spots) {
    if (!hasCoordinates(spot)) continue;
    const meters = distanceMeters(origin, { lat: spot.lat, lng: spot.lng });
    if (nearest === null || meters < nearest.distanceMeters) {
      nearest = { ...spot, distanceMeters: meters };
    }
  }

  return nearest;
}
