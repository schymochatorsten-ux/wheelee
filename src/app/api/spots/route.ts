import { NextResponse } from "next/server";
import { nearestSpots, spotById, spotsInBounds } from "@/lib/parking/spots";
import { withLogging } from "@/lib/log";

/**
 * Parkplätze nach Kartenausschnitt, Nähe oder ID (ToDo 5.4).
 *
 *     GET /api/spots?bbox=<minLng>,<minLat>,<maxLng>,<maxLat>&limit=2000
 *     GET /api/spots?lat=50.94&lng=6.96&limit=100
 *     GET /api/spots?id=koeln-1a2b3c4d5e
 *
 * Vorher trug die Startseite alle Standorte im HTML – **6,3 MB**. Wer
 * unterwegs im Mobilfunknetz einen Parkplatz sucht, wartet darauf nicht; und
 * mit jeder weiteren Ausbaustufe würde es schlimmer.
 *
 * Die Reihenfolge der Parameter in `bbox` folgt der üblichen Konvention
 * (Längengrad zuerst), wie sie auch OpenStreetMap und GeoJSON verwenden.
 */

/** Antworten dürfen zwischengespeichert werden: Die Liste ändert sich selten. */
const CACHE_CONTROL = "public, max-age=300, stale-while-revalidate=86400";

function bad(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function getHandler(request: Request) {
  const params = new URL(request.url).searchParams;

  const limitRaw = params.get("limit");
  const limit = limitRaw === null ? undefined : Number.parseInt(limitRaw, 10);
  if (limit !== undefined && (!Number.isFinite(limit) || limit < 1 || limit > 5_000)) {
    return bad("limit muss zwischen 1 und 5000 liegen.");
  }

  /*
   * Ein einzelner Parkplatz. Steht vor der Bbox-Auswertung, weil eine Anfrage
   * mit `id` nichts anderes meinen kann – und weil die Übersicht der
   * Rückmeldungen damit von einer Meldung direkt auf die Karte springt
   * (ToDo 17.4).
   */
  const id = params.get("id");
  if (id) {
    const spot = spotById(id);
    if (!spot) {
      // 404 und nicht eine leere Liste: „Diesen Parkplatz gibt es nicht
      // (mehr)" ist eine Antwort, und die Übersicht soll sie zeigen können.
      return NextResponse.json({ error: "Unbekannte Parkplatz-ID." }, { status: 404 });
    }
    return NextResponse.json({ spot }, { headers: { "Cache-Control": CACHE_CONTROL } });
  }

  const bbox = params.get("bbox");
  if (bbox) {
    const parts = bbox.split(",").map(Number);
    if (parts.length !== 4 || parts.some((value) => !Number.isFinite(value))) {
      return bad("bbox erwartet vier Zahlen: minLng,minLat,maxLng,maxLat");
    }

    const [minLng, minLat, maxLng, maxLat] = parts;
    if (minLat > maxLat || minLng > maxLng) {
      return bad("bbox: Mindestwerte müssen kleiner als die Höchstwerte sein.");
    }

    const result = spotsInBounds({ minLat, minLng, maxLat, maxLng }, limit);
    return NextResponse.json(result, { headers: { "Cache-Control": CACHE_CONTROL } });
  }

  const lat = Number(params.get("lat"));
  const lng = Number(params.get("lng"));
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return bad("Entweder bbox oder lat und lng angeben.");
  }

  const spots = nearestSpots({ lat, lng }, limit ?? 100);
  return NextResponse.json(
    { spots, truncated: false, total: spots.length },
    { headers: { "Cache-Control": CACHE_CONTROL } },
  );
}

/*
 * Jede Antwort läuft durch das Protokoll (ToDo 12.6): Status, Dauer und der
 * Pfad **ohne Parameterwerte**. Siehe `lib/log.ts`.
 */
export const GET = withLogging(getHandler);
