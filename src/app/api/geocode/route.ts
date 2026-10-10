import { NextResponse } from "next/server";
import { toPlaces } from "@/lib/geocode";

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

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";

  // Unter drei Zeichen liefert jede Suche nur Rauschen – und belastet den Dienst.
  if (query.length < 3) {
    return NextResponse.json({ places: [] }, { headers: { "Cache-Control": CACHE_CONTROL } });
  }

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "5");
  url.searchParams.set("countrycodes", "de");
  url.searchParams.set("accept-language", "de");
  url.searchParams.set("addressdetails", "1");

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) {
      return NextResponse.json({ places: [], error: "Suche gerade nicht erreichbar." });
    }

    return NextResponse.json(
      { places: toPlaces(await response.json()) },
      { headers: { "Cache-Control": CACHE_CONTROL } },
    );
  } catch {
    // Zeitüberschreitung oder Netzfehler: ehrlich melden, nicht leer tun –
    // „nichts gefunden" und „konnte nicht suchen" sind verschiedene Dinge.
    return NextResponse.json({ places: [], error: "Suche gerade nicht erreichbar." });
  }
}
