import { NextResponse } from "next/server";
import { spotsOfCity } from "@/lib/parking/spots";
import { withLogging } from "@/lib/log";
import { jsonCompressed } from "@/lib/json-compressed";
import { t } from "@/i18n";

/**
 * Die Parkplatzdaten einer ganzen Stadt, zum bewussten Mitnehmen (ToDo 16.1).
 *
 *     GET /api/offline?city=koeln
 *
 * Eine eigene Route und nicht `/api/spots`: Der Service Worker behandelt
 * `/api/spots` als „zuletzt geladener Ausschnitt" und würde diese Antwort
 * unter einem Schlüssel ablegen, den niemand mehr trifft. Hier liefert der
 * Server die Daten, abgelegt wird sie von der Seite selbst.
 *
 * Kein `Cache-Control`: Wer „Vorab laden" oder „Aktualisieren" drückt, will den
 * aktuellen Stand, nicht eine Kopie aus dem HTTP-Zwischenspeicher.
 */
function getHandler(request: Request) {
  const slug = new URL(request.url).searchParams.get("city");
  const found = slug ? spotsOfCity(slug) : null;
  if (!found) {
    return NextResponse.json({ error: t("api.unknownCity") }, { status: 404 });
  }
  // Komprimiert (ToDo 12.16): Köln 359,2 KB → 32,5 KB. Das ist die Route, bei
  // der es am meisten zählt – sie wird im Mobilfunknetz bewusst angefordert.
  return jsonCompressed(request, found, { headers: { "Cache-Control": "no-store" } });
}

export const GET = withLogging(getHandler);
