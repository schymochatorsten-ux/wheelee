import { NextResponse } from "next/server";
import { dedupePlaces, orderByProximity, toPlaces } from "@/lib/geocode";
import type { LatLng } from "@/lib/geo";

/**
 * Ortssuche, über unseren Server statt direkt aus dem Browser (ToDo 6.12).
 *
 * Nominatims Nutzungsbedingungen verlangen eine aussagekräftige Kennung je
 * Anfrage. Die kann ein Browser nicht setzen – der `User-Agent` gehört ihm.
 * Also fragt der Server, nennt sich ordentlich, und die Antwort wird
 * zwischengespeichert, damit dieselbe Suche den Dienst nicht zweimal
 * belastet.
 */

const USER_AGENT = "wheelee/0.1 (Behindertenparkplatz-Karte; Kontakt via Repository)";

/** Eine Stunde: Ortsnamen ändern sich nicht, Tippfehler wiederholen sich. */
const CACHE_CONTROL = "public, max-age=3600, stale-while-revalidate=86400";

/**
 * So viele Treffer holt der Dienst, bevor entdoppelt und geordnet wird.
 *
 * Vorher waren es fünf, und das war zu wenig: Nach dem Entdoppeln blieben für
 * „Köln Hauptbahnhof" drei Zeilen übrig, und von zehn gleichnamigen
 * Bahnhofstraßen kam die eigene gar nicht erst mit. Die Last ist dieselbe –
 * es bleibt **eine** Anfrage, nur mit größerem Ergebnis.
 */
const FETCH_LIMIT = 15;

/** So viele Vorschläge bekommt die Oberfläche am Ende. */
const SHOW_LIMIT = 8;

/**
 * Wie weit das Suchfenster um den Bezugspunkt reicht – grob 55 km in jede
 * Richtung, passend zu `NEARBY_RADIUS_METERS` in `lib/geocode`.
 *
 * Der Längengrad braucht den größeren Wert, weil die Längenkreise nach Norden
 * zusammenlaufen: Auf deutscher Breite ist ein Grad Länge nur etwa 70 km weit,
 * ein Grad Breite 111 km.
 */
const VIEWBOX_LAT = 0.5;
const VIEWBOX_LNG = 0.8;

/**
 * Der Bezugspunkt aus der Anfrage, wenn einer mitkam.
 *
 * Er ist **freiwillig**: Die Suche funktioniert ohne ihn, nur eben ohne
 * Nähe-Sortierung. Ein ungültiger Wert wird verworfen und nicht gemeldet – die
 * Suche ist wichtiger als die Sortierung.
 */
function reference(params: URLSearchParams): LatLng | null {
  const lat = Number(params.get("lat"));
  const lng = Number(params.get("lng"));
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
  return { lat, lng };
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const query = params.get("q")?.trim() ?? "";
  const origin = reference(params);

  // Unter drei Zeichen liefert jede Suche nur Rauschen – und belastet den Dienst.
  if (query.length < 3) {
    return NextResponse.json({ places: [] }, { headers: { "Cache-Control": CACHE_CONTROL } });
  }

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", String(FETCH_LIMIT));
  url.searchParams.set("countrycodes", "de");
  url.searchParams.set("accept-language", "de");
  url.searchParams.set("addressdetails", "1");

  /*
   * Der Bezugspunkt geht als `viewbox` mit, aber **ohne** `bounded=1`.
   *
   * Der Unterschied ist wichtig: `bounded=1` würde alles außerhalb des Fensters
   * wegwerfen. Dann fände man von Köln aus Hamburg nicht mehr – und genau das
   * ist eine normale Suche, wenn man eine weite Fahrt plant. Ohne `bounded`
   * gewichtet Nominatim das Fenster nur höher; die Sortierung nach Nähe
   * geschieht ohnehin hier, wo sie nachvollziehbar ist.
   */
  if (origin) {
    const box = [
      origin.lng - VIEWBOX_LNG,
      origin.lat + VIEWBOX_LAT,
      origin.lng + VIEWBOX_LNG,
      origin.lat - VIEWBOX_LAT,
    ];
    url.searchParams.set("viewbox", box.join(","));
  }

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) {
      return NextResponse.json({ places: [], error: "Suche gerade nicht erreichbar." });
    }

    const places = orderByProximity(dedupePlaces(toPlaces(await response.json())), origin).slice(
      0,
      SHOW_LIMIT,
    );

    return NextResponse.json({ places }, { headers: { "Cache-Control": CACHE_CONTROL } });
  } catch {
    // Zeitüberschreitung oder Netzfehler: ehrlich melden, nicht leer tun –
    // „nichts gefunden" und „konnte nicht suchen" sind verschiedene Dinge.
    return NextResponse.json({ places: [], error: "Suche gerade nicht erreichbar." });
  }
}
