import { MapSection } from "@/components/MapSection";
import { getAllSpots, getCities, getDefaultCity, nearestSpots } from "@/lib/parking/spots";

/**
 * Startseite: Karte und Liste der Behindertenparkplätze.
 *
 * Die Parkplatzdaten kommen vom Server, der Standort entsteht erst im Browser –
 * so verlässt er das Gerät nicht.
 *
 * Mitgeliefert wird nur eine Handvoll Parkplätze um die Stadtmitte, damit die
 * Liste sofort etwas zeigt. Alles Weitere lädt die App über `/api/spots`
 * nach: Alle Standorte ins HTML zu schreiben ergab 6,3 MB, und das lädt im
 * Mobilfunknetz niemand gern, der gerade einen Parkplatz sucht (ToDo 5.4).
 */
export default function Home() {
  const defaultCity = getDefaultCity();

  return (
    <MapSection
      initialNearby={nearestSpots(defaultCity.center, 100)}
      cities={getCities()}
      defaultCity={defaultCity}
      totalSpots={getAllSpots().length}
    />
  );
}
