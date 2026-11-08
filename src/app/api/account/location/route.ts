import { NextResponse } from "next/server";
import { setLocationPreference } from "@/lib/db/accounts";
import { userFromRequest } from "@/lib/auth/session";
import { isLocationPreference } from "@/lib/location-preference";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";
import { readJson } from "@/lib/read-json";

/**
 * Die Standortfreigabe am Konto ablegen (ToDo 9.25).
 *
 *     PUT /api/account/location   { preference: "on" | "off" }
 *
 * **Hier geht kein Standort über die Leitung, nur ein Wort.** Die Koordinaten
 * bleiben im Browser, wie in der Datenschutzerklärung zugesagt; gespeichert
 * wird allein, ob die App von sich aus fragen darf.
 *
 * Ohne Drosselung, aus demselben Grund wie bei `/api/account/maps`: Der
 * Aufruf setzt eine Anmeldung voraus, ändert ein Feld am eigenen Konto und
 * legt keine Zeile an.
 */
async function putHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await readJson(request)) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  const preference = body.preference;
  if (!isLocationPreference(preference)) {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  setLocationPreference(user.id, preference);
  return NextResponse.json({ ok: true, preference }, { headers: { "Cache-Control": "no-store" } });
}

export const PUT = withLogging(putHandler);
