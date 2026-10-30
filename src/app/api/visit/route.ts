import { NextResponse } from "next/server";
import { recordVisit } from "@/lib/visits";
import { allow, clientKey, LIMITS } from "@/lib/rate-limit";
import { withLogging } from "@/lib/log";

/**
 * Besuch melden (ToDo 20.1) – vom Browser nach dem Laden der Seite, ohne Rumpf.
 *
 *     POST /api/visit
 *
 * Die Antwort ist immer 204, auch bei Robotern und bei Drosselung: Wer zählt oder
 * nicht zählt, geht niemanden etwas an, und ein Roboter soll nichts daran
 * erkennen, wie man den Filter umgeht. Gelesen werden `User-Agent`, die
 * Herkunft der Anfrage und die Wünsche „nicht verfolgen" (`DNT`, `Sec-GPC`) –
 * nichts davon wird gespeichert (`lib/visits.ts`).
 */
async function postHandler(request: Request) {
  const empty = () => new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });

  // Zu viele Pings von einer Herkunft zählen nicht mehr mit: Ein Browser schickt
  // einen je Seitenaufruf, ein Skript Tausende.
  if (!allow(`visit:${clientKey(request)}`, LIMITS.visit)) return empty();

  // Ein Aufruf, den JavaScript auf einer anderen Seite auslöst, ist kein Besuch bei uns.
  const site = request.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return empty();

  recordVisit({
    ip: clientKey(request),
    userAgent: request.headers.get("user-agent"),
    optedOut: request.headers.get("dnt") === "1" || request.headers.get("sec-gpc") === "1",
  });

  return empty();
}

export const POST = withLogging(postHandler);
