import { NextResponse } from "next/server";
import type { LatLng } from "@/lib/geo";
import { withLogging } from "@/lib/log";
import { searchLocalPlaces } from "@/lib/parking/local-places";
import { allow, clientKey, retryAfter } from "@/lib/rate-limit";
import { t } from "@/i18n";

/**
 * Orte und Straßen aus den eigenen Daten (ToDo 9.18 a) – ohne fremden Dienst.
 *
 *     GET /api/places?q=<Begriff>&lat=<…>&lng=<…>
 *
 * Eine Suche im Arbeitsspeicher, deshalb ohne die Rücksicht auf Nominatim, die
 * `/api/geocode` nehmen muss. Eine Grenze gibt es trotzdem, damit niemand den
 * Server mit Dauerabfragen beschäftigt. Der Bezugspunkt ist wie dort freiwillig
 * und `private` zwischengespeichert, weil er eine Ortsangabe ist.
 */

const LIMIT = { max: 240, windowMs: 60_000 } as const;
const CACHE_CONTROL = "private, max-age=3600, stale-while-revalidate=86400";

function reference(params: URLSearchParams): LatLng | null {
  const lat = Number(params.get("lat"));
  const lng = Number(params.get("lng"));
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
  return { lat, lng };
}

async function getHandler(request: Request) {
  const params = new URL(request.url).searchParams;
  const query = params.get("q")?.trim() ?? "";

  if (query.length < 2 || query.length > 200) {
    return NextResponse.json({ places: [] }, { headers: { "Cache-Control": CACHE_CONTROL } });
  }

  if (!allow(`places:${clientKey(request)}`, LIMIT)) {
    return NextResponse.json(
      { places: [], error: t("api.searchUnavailable") },
      { status: 429, headers: retryAfter(LIMIT) },
    );
  }

  return NextResponse.json(
    { places: searchLocalPlaces(query, reference(params)) },
    { headers: { "Cache-Control": CACHE_CONTROL } },
  );
}

export const GET = withLogging(getHandler);
