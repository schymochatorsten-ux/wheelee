import { NextResponse } from "next/server";
import { spotsOfCity } from "@/lib/parking/spots";
import { withLogging } from "@/lib/log";
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
  return NextResponse.json(found, { headers: { "Cache-Control": "no-store" } });
}

export const GET = withLogging(getHandler);
