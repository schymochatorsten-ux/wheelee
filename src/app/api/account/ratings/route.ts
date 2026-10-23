import { NextResponse } from "next/server";
import { ownRatings } from "@/lib/db/ratings";
import { spotSummary } from "@/lib/parking/spot-summary";
import { userFromRequest } from "@/lib/auth/session";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";

/**
 * Die eigenen Stimmen (ToDo 11.4).
 *
 *     GET /api/account/ratings
 *
 * Nur die Stimmen des angemeldeten Kontos, nie eine Kennung aus der Anfrage –
 * wie bei `/api/account/export` gibt es nichts, womit sich fremde Stimmen
 * abrufen ließen. Zurückgezogen wird über `DELETE /api/spots/<id>/ratings`.
 *
 * Parkplätze, die der Bestand nicht mehr kennt, bleiben mit `spot: null` in der
 * Liste: Die Stimme gibt es, und sie soll sich zurückziehen lassen.
 */
async function getHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });
  }

  const ratings = ownRatings(user.id).map((rating) => ({
    ...rating,
    spot: spotSummary(rating.spotId),
  }));

  return NextResponse.json({ ratings }, { headers: { "Cache-Control": "no-store" } });
}

export const GET = withLogging(getHandler);
