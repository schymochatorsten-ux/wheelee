import { MapSection } from "@/components/MapSection";
import { getAllSpots, getCities, getDefaultCity } from "@/lib/parking/spots";

/**
 * Startseite: Karte und Liste der Behindertenparkplätze.
 *
 * Die Parkplatzdaten kommen vom Server, der Standort entsteht erst im Browser –
 * so verlässt er das Gerät nicht.
 */
export default function Home() {
  return <MapSection spots={getAllSpots()} cities={getCities()} defaultCity={getDefaultCity()} />;
}
