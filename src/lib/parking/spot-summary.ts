import { hasCoordinates } from "@/lib/geo";
import { spotTitle } from "./display";
import { spotById } from "./spots";

/**
 * Kurzangaben zu einem Parkplatz für die Listen im Konto (ToDos 11.4, 11.5).
 *
 * **`null`, wenn der Bestand den Parkplatz nicht mehr kennt.** Das ist kein
 * Fehlerfall: Eine Stimme oder ein Favorit auf einen Platz, der beim letzten
 * Import verschwunden ist, bleibt in der Liste stehen und sagt das – ihn
 * stillschweigend auszublenden ließe die Eintragung grundlos verschwinden
 * (wie bei der Prüfliste der Gemeldeten, 8.8).
 */
export interface SpotSummary {
  name: string;
  district: string;
  city: string;
  spotCount: number;
  /** Nur gesetzt, wenn die Koordinate brauchbar ist – für die Entfernung. */
  lat: number | null;
  lng: number | null;
}

export function spotSummary(spotId: string): SpotSummary | null {
  const spot = spotById(spotId);
  if (!spot) return null;

  const located = hasCoordinates(spot);
  return {
    name: spotTitle(spot),
    district: spot.district,
    city: spot.city,
    spotCount: spot.spotCount,
    lat: located ? spot.lat : null,
    lng: located ? spot.lng : null,
  };
}
