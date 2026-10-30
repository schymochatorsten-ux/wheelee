import { MapSection } from "@/components/MapSection";
import { getDefaultCity, nearestSpots } from "@/lib/parking/spots";
import { currentUser } from "@/lib/auth/session";
import { publicUser } from "@/lib/auth/user";

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
 *
 * **Die Seite liest die Sitzung und wird dadurch bei jedem Aufruf gerendert.**
 * Das ist der Preis dafür, dass der Reiter „Rückmeldungen" sofort da ist, wenn
 * der Administrator die App öffnet. Die Alternative wäre eine Abfrage aus dem
 * Browser nach dem Laden – dann blitzte die Oberfläche einen Moment als
 * „nicht angemeldet" auf, und zwar bei jedem Aufruf. Die Parkplatzdaten
 * bleiben ohnehin unverändert, und für das Funkloch hält der Service Worker
 * den letzten Stand der Seite vor.
 */
export default async function Home() {
  const defaultCity = getDefaultCity();
  const user = await currentUser();

  return (
    <MapSection
      initialNearby={nearestSpots(defaultCity.center, 100)}
      defaultCity={defaultCity}
      user={user ? publicUser(user) : null}
    />
  );
}
