import { NextResponse } from "next/server";
import { userFromRequest } from "@/lib/auth/session";
import { PolicyError, SCHWELLE_MAX, setSpotPolicy, spotPolicy } from "@/lib/db/spot-policy";
import { withLogging } from "@/lib/log";
import { readJson } from "@/lib/read-json";
import { t } from "@/i18n";

/**
 * Die zwei Schwellen, ab denen ein Parkplatz verschwindet (ToDo 8.11).
 *
 *     GET  /api/admin/schwellen
 *     POST /api/admin/schwellen   { schwelleUnsicher, schwelleSicher }
 *
 * **Dieselbe Zugangsregel wie bei den Rückmeldungen** (17.4): ohne
 * Administratorrecht 401 und nicht 403 – auch ein angemeldeter Benutzer muss
 * nicht erfahren, dass es diese Einstellung gibt.
 *
 * **Warum das in die Verwaltung gehört und nicht in die `.env`:** dieselbe
 * Begründung wie beim Mailversand (10.22). Die `.env` liegt auf dem NAS, und
 * dorthin kommt nur Niklas. Eine Schwelle, die sich nach den ersten
 * Erfahrungen nicht nachstellen lässt, ist keine Einstellung, sondern eine
 * Konstante mit Umweg.
 */

async function getHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user?.isAdmin) {
    return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });
  }

  return NextResponse.json(
    { policy: spotPolicy(), max: SCHWELLE_MAX },
    { headers: { "Cache-Control": "no-store" } },
  );
}

async function postHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user?.isAdmin) {
    return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });
  }

  let body: { schwelleUnsicher?: unknown; schwelleSicher?: unknown };
  try {
    body = (await readJson(request)) as typeof body;
  } catch {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  const unsicher = Number(body.schwelleUnsicher);
  const sicher = Number(body.schwelleSicher);

  try {
    const policy = setSpotPolicy({ schwelleUnsicher: unsicher, schwelleSicher: sicher }, user.id);
    return NextResponse.json({ policy }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof PolicyError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    throw error;
  }
}

export const GET = withLogging(getHandler);
export const POST = withLogging(postHandler);
