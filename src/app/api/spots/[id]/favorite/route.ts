import { NextResponse } from "next/server";
import { addFavorite, isFavorite, removeFavorite } from "@/lib/db/favorites";
import { spotById } from "@/lib/parking/spots";
import { userFromRequest } from "@/lib/auth/session";
import { allow, clientKey, LIMITS, retryAfter } from "@/lib/rate-limit";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";

/**
 * Ein Parkplatz als gespeicherter merken (ToDo 11.5).
 *
 *     GET    /api/spots/<id>/favorite   → ist er gespeichert?
 *     PUT    /api/spots/<id>/favorite   → speichern
 *     DELETE /api/spots/<id>/favorite   → entfernen
 *
 * Alles nur mit Konto und nur für das eigene – die Zugangsregel steht hier
 * und nicht in der Oberfläche (vgl. die Bewertungen: ein abgeschalteter Knopf
 * ist eine Verabredung, keine Prüfung). Die Liste steht unter
 * `GET /api/account/favorites`.
 */

type Context = { params: Promise<{ id: string }> };

const NO_STORE = { "Cache-Control": "no-store" };

function needsAccount() {
  return NextResponse.json({ error: t("api.favoriteNeedsAccount") }, { status: 401 });
}

function throttled(request: Request, accountId: string) {
  const tooMany =
    !allow(`favorite:${accountId}`, LIMITS.favorite) ||
    !allow(`favorite-ip:${clientKey(request)}`, LIMITS.favoritePerClient);
  return tooMany
    ? NextResponse.json({ error: t("api.tooManyFavorites") }, { status: 429, headers: retryAfter(LIMITS.favorite) })
    : null;
}

async function getHandler(request: Request, context: Context) {
  const { id } = await context.params;
  const user = userFromRequest(request);
  if (!user) return needsAccount();

  return NextResponse.json({ favorite: isFavorite(id, user.id) }, { headers: NO_STORE });
}

async function putHandler(request: Request, context: Context) {
  const { id } = await context.params;
  const user = userFromRequest(request);
  if (!user) return needsAccount();

  const limited = throttled(request, user.id);
  if (limited) return limited;

  // Gespeichert wird nur, was der Bestand kennt – sonst ließe sich die
  // Tabelle mit erfundenen Kennungen füllen. Entfernen geht dagegen immer.
  if (!spotById(id)) {
    return NextResponse.json({ error: t("api.unknownSpot") }, { status: 404 });
  }

  if (addFavorite(id, user.id) === "voll") {
    return NextResponse.json({ error: t("api.favoritesFull") }, { status: 409 });
  }

  return NextResponse.json({ favorite: true }, { headers: NO_STORE });
}

async function deleteHandler(request: Request, context: Context) {
  const { id } = await context.params;
  const user = userFromRequest(request);
  if (!user) return needsAccount();

  const limited = throttled(request, user.id);
  if (limited) return limited;

  removeFavorite(id, user.id);
  return NextResponse.json({ favorite: false }, { headers: NO_STORE });
}

export const GET = withLogging(getHandler);
export const PUT = withLogging(putHandler);
export const DELETE = withLogging(deleteHandler);
