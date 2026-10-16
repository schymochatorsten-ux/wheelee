import { NextResponse } from "next/server";
import { deleteSession, SESSION_COOKIE } from "@/lib/db/accounts";
import { clearedSessionCookie } from "@/lib/auth/session";

/**
 * Abmelden.
 *
 * Die Sitzung wird **in der Datenbank gelöscht**, nicht nur das Cookie
 * entfernt. Ein gelöschtes Cookie wäre nur eine Bitte an den Browser; das
 * Token bliebe gültig, und wer es vorher abgefangen hat, könnte es weiter
 * benutzen. Abmelden soll heißen, dass diese Sitzung vorbei ist.
 */
export async function POST(request: Request) {
  const cookie = request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE}=`));

  if (cookie) deleteSession(decodeURIComponent(cookie.slice(SESSION_COOKIE.length + 1)));

  const response = NextResponse.json({ ok: true });
  response.cookies.set(clearedSessionCookie());
  return response;
}
