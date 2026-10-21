import { NextResponse } from "next/server";
import { setMapsPreference } from "@/lib/db/accounts";
import { userFromRequest } from "@/lib/auth/session";
import { isMapsPreference } from "@/lib/maps-preference";
import { withLogging } from "@/lib/log";

/**
 * Die bevorzugte Karten-App am Konto ablegen (ToDo 11.3a).
 *
 *     PUT /api/account/maps   { preference: "auto" | "google" | … }
 *
 * **Ohne Drosselung, anders als die übrigen schreibenden Endpunkte.** Hier
 * gibt es nichts zu erraten und nichts zu fluten: Der Aufruf setzt eine
 * Anmeldung voraus, ändert genau ein Feld am eigenen Konto und legt keine
 * Zeile an. Wer ihn tausendmal aufruft, hat danach dieselbe eine Zeile.
 *
 * **Geprüft wird der Wert hier und nicht in der Datenbank.** Die Liste der
 * Karten-Apps steht im Code und wächst dort; eine CHECK-Bedingung müsste bei
 * jeder neuen App über eine Migration nachgezogen werden (siehe Migration 4).
 */
async function putHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const preference = body.preference;
  if (!isMapsPreference(preference)) {
    return NextResponse.json({ error: "Unbekannte Karten-App." }, { status: 400 });
  }

  setMapsPreference(user.id, preference);
  return NextResponse.json({ ok: true, preference }, { headers: { "Cache-Control": "no-store" } });
}

export const PUT = withLogging(putHandler);
