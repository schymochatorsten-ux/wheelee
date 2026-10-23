import { NextResponse } from "next/server";
import { setLanguage } from "@/lib/db/accounts";
import { userFromRequest } from "@/lib/auth/session";
import { withLogging } from "@/lib/log";
import { isLocale, t } from "@/i18n";

/**
 * Die gewählte Sprache am Konto ablegen (ToDo 15.5).
 *
 *     PUT /api/account/language   { language: "de" | … }
 *
 * Gebaut wie `/api/account/maps` (11.3a), mit denselben Gründen: ohne
 * Drosselung, weil der Aufruf ein Feld am eigenen Konto setzt und nichts
 * anlegt; der Wert wird hier geprüft und nicht in der Datenbank, weil die
 * Liste der Sprachen im Code steht und dort wächst.
 */
async function putHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  const language = body.language;
  if (!isLocale(language)) {
    return NextResponse.json({ error: t("api.unknownLanguage") }, { status: 400 });
  }

  setLanguage(user.id, language);
  return NextResponse.json({ ok: true, language }, { headers: { "Cache-Control": "no-store" } });
}

export const PUT = withLogging(putHandler);
