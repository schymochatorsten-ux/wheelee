import { NextResponse } from "next/server";
import { userFromRequest } from "@/lib/auth/session";
import { addUserSpot, UserSpotError, userSpotId } from "@/lib/db/user-spots";
import { getCities } from "@/lib/parking/spots";
import { distanceMeters } from "@/lib/geo";
import { allow, clientKey, LIMITS, retryAfter } from "@/lib/rate-limit";
import { withLogging } from "@/lib/log";
import { readJson } from "@/lib/read-json";
import { t } from "@/i18n";

/**
 * Einen fehlenden Parkplatz melden (ToDo 8.11).
 *
 *     POST /api/spots/melden   { label, lat, lng, spotCount?, street?, houseNumber?, note? }
 *
 * **Nur mit Konto** (Torsten, 2026-11-13) – dieselbe Zugangsregel wie beim
 * Bewerten, und aus demselben Grund: Ohne Zurechnung gibt es keine Grenze, die
 * sich durchsetzen lässt. Geprüft wird hier und nicht in der Oberfläche; ein
 * fehlendes Formular ist keine Zugangsprüfung.
 *
 * **Der Platz ist sofort sichtbar, aber als unsicher gekennzeichnet.** Keine
 * Warteschlange, in der Meldungen liegen bleiben: Wer einen Platz einträgt,
 * soll ihn sehen – und wer ihn auf der Karte findet, soll wissen, woran er
 * ist. Zum gewöhnlichen Platz wird er erst durch Bestätigungen anderer
 * (`lib/spot-moderation.ts`).
 */

/** Weiter als das von jeder erfassten Gemeinde ist keine Angabe plausibel. */
const MAX_ABSTAND_METER = 50_000;

async function postHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: t("api.reportNeedsAccount") }, { status: 401 });
  }

  if (!allow(`melden:${user.id}`, LIMITS.rating)) {
    return NextResponse.json(
      { error: t("api.tooManyRatings") },
      { status: 429, headers: retryAfter(LIMITS.rating) },
    );
  }
  if (!allow(`melden-ip:${clientKey(request)}`, LIMITS.ratingPerClient)) {
    return NextResponse.json(
      { error: t("api.tooManyRatings") },
      { status: 429, headers: retryAfter(LIMITS.ratingPerClient) },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await readJson(request)) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  const lat = Number(body.lat);
  const lng = Number(body.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  /*
   * **Die Stadt wird zugeordnet, nicht eingegeben.** Sie ist der Schlüssel, an
   * dem Quellenangabe, Städteliste und das Vorabladen hängen (16.1); käme sie
   * aus dem Formular, stünde ein Platz irgendwann unter einer Stadt, in der er
   * nicht liegt. Die nächstgelegene erfasste Gemeinde ist die ehrlichste
   * Zuordnung, die ohne Grenzabfrage möglich ist.
   */
  const cities = getCities();
  let nearest = cities[0];
  let best = Number.POSITIVE_INFINITY;
  for (const city of cities) {
    const abstand = distanceMeters({ lat, lng }, city.center);
    if (abstand < best) {
      best = abstand;
      nearest = city;
    }
  }

  if (best > MAX_ABSTAND_METER) {
    // Kein Raten: Ein Punkt mitten in der Nordsee bekommt keine Stadt
    // zugewiesen, nur weil eine am wenigsten weit weg ist.
    return NextResponse.json({ error: t("api.spotTooFar") }, { status: 400 });
  }

  try {
    const spot = addUserSpot(user.id, {
      label: String(body.label ?? ""),
      street: typeof body.street === "string" ? body.street : null,
      houseNumber: typeof body.houseNumber === "string" ? body.houseNumber : null,
      note: typeof body.note === "string" ? body.note : null,
      city: nearest.slug,
      lat,
      lng,
      spotCount: body.spotCount === undefined ? 1 : Number(body.spotCount),
    });

    return NextResponse.json(
      { spotId: userSpotId(spot.id), city: nearest.slug },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (error instanceof UserSpotError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    throw error;
  }
}

export const POST = withLogging(postHandler);
