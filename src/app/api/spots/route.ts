import { NextResponse } from "next/server";
import { nearestSpots, spotsInBounds } from "@/lib/parking/spots";

/**
 * Parkplätze nach Kartenausschnitt oder Nähe (ToDo 5.4).
 *
 *     GET /api/spots?bbox=<minLng>,<minLat>,<maxLng>,<maxLat>&limit=2000
 *     GET /api/spots?lat=50.94&lng=6.96&limit=100
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

export function GET(request: Request) {
  const params = new URL(request.url).searchParams;

  const limitRaw = params.get("limit");
  const limit = limitRaw === null ? undefined : Number.parseInt(limitRaw, 10);
  if (limit !== undefined && (!Number.isFinite(limit) || limit < 1 || limit > 5_000)) {
    return bad("limit muss zwischen 1 und 5000 liegen.");
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
