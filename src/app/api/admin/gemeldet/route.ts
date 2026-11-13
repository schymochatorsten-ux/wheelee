import { NextResponse } from "next/server";
import { userFromRequest } from "@/lib/auth/session";
import { decideUserSpot, userSpots, type UserSpotStatus } from "@/lib/db/user-spots";
import { spotPolicy } from "@/lib/db/spot-policy";
import { withLogging } from "@/lib/log";
import { readJson } from "@/lib/read-json";
import { t } from "@/i18n";

/**
 * Von Nutzer:innen gemeldete Parkplätze – nur für den Administrator
 * (ToDo 8.11).
 *
 *     GET  /api/admin/gemeldet?status=offen
 *     POST /api/admin/gemeldet   { id, status: "bestaetigt" | "verworfen" }
 *
 * **Die Automatik ersetzt diese Liste nicht.** Ein gemeldeter Platz wird von
 * selbst zum gewöhnlichen, wenn genug Konten ihn bestätigen – aber solange
 * niemand bewertet, liegt er unbegrenzt als „unsicher" auf der Karte. Dieser
 * Weg ist der kurze: Wer die Gegend kennt, entscheidet sofort.
 *
 * **Eine Ablehnung ist nicht durch Stimmen zu überstimmen** (siehe
 * `confirmByVotes`): Was ein Mensch verworfen hat, bleibt verworfen.
 */

async function getHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user?.isAdmin) {
    return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });
  }

  const raw = new URL(request.url).searchParams.get("status");
  const status: UserSpotStatus | undefined =
    raw === "offen" || raw === "bestaetigt" || raw === "verworfen" ? raw : undefined;

  return NextResponse.json(
    { spots: userSpots(status), policy: spotPolicy() },
    { headers: { "Cache-Control": "no-store" } },
  );
}

async function postHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user?.isAdmin) {
    return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });
  }

  let body: { id?: unknown; status?: unknown };
  try {
    body = (await readJson(request)) as typeof body;
  } catch {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id : "";
  const status = body.status;
  if (!id || (status !== "bestaetigt" && status !== "verworfen")) {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  const spot = decideUserSpot(id, status, user.id);
  if (!spot) {
    return NextResponse.json({ error: t("api.unknownSpot") }, { status: 404 });
  }

  return NextResponse.json({ spot }, { headers: { "Cache-Control": "no-store" } });
}

export const GET = withLogging(getHandler);
export const POST = withLogging(postHandler);
