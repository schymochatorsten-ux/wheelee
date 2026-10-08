import { MapSection } from "@/components/MapSection";
import { getAllSpots, getCity } from "@/lib/parking/spots";

/**
 * Startseite: Karte und Liste der Behindertenparkplätze.
 *
 * Die Parkplatzdaten kommen vom Server, der Standort entsteht erst im Browser –
 * so verlässt er das Gerät nicht.
 */
export default function Home() {
  const city = getCity();
  const spots = getAllSpots();

  return <MapSection spots={spots} center={city.center} cityName={city.name} />;
}
