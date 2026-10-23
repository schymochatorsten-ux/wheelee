import { NextResponse } from "next/server";
import { listFavorites } from "@/lib/db/favorites";
import { spotSummary } from "@/lib/parking/spot-summary";
import { userFromRequest } from "@/lib/auth/session";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";

/**
 * Die eigenen gespeicherten Parkplätze (ToDo 11.5).
 *
 *     GET /api/account/favorites
 *
 * Wie `/api/account/ratings`: nur das angemeldete Konto, keine Kennung aus der
 * Anfrage. Ein Platz, den der Bestand nicht mehr kennt, bleibt mit
 * `spot: null` in der Liste und lässt sich entfernen.
 */
async function getHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });
  }

  const favorites = listFavorites(user.id).map((favorite) => ({
    ...favorite,
    spot: spotSummary(favorite.spotId),
  }));

  return NextResponse.json({ favorites }, { headers: { "Cache-Control": "no-store" } });
}

export const GET = withLogging(getHandler);
