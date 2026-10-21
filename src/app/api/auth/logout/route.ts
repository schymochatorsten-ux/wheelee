import { NextResponse } from "next/server";
import { deleteSession, SESSION_COOKIE } from "@/lib/db/accounts";
import { clearedSessionCookie } from "@/lib/auth/session";
import { withLogging } from "@/lib/log";

/**
 * Abmelden.
 *
 * Die Sitzung wird **in der Datenbank gelöscht**, nicht nur das Cookie
 * entfernt. Ein gelöschtes Cookie wäre nur eine Bitte an den Browser; das
 * Token bliebe gültig, und wer es vorher abgefangen hat, könnte es weiter
 * benutzen. Abmelden soll heißen, dass diese Sitzung vorbei ist.
 */
async function postHandler(request: Request) {
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

/*
 * Jede Antwort läuft durch das Protokoll (ToDo 12.6): Status, Dauer und der
 * Pfad **ohne Parameterwerte**. Siehe `lib/log.ts`.
 */
export const POST = withLogging(postHandler);
