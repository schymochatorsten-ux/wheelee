import { NextResponse } from "next/server";
import { deleteAccount } from "@/lib/db/accounts";
import { clearedSessionCookie, userFromRequest } from "@/lib/auth/session";
import { allow, clientKey, LIMITS } from "@/lib/rate-limit";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";

/**
 * Das eigene Konto löschen (ToDo 11.7).
 *
 *     DELETE /api/account   { password }
 *
 * Sitzungen und Bewertungen fallen mit weg, die Antwortadresse an eigenen
 * Rückmeldungen wird entfernt (siehe `deleteAccount`). Gedrosselt wie das
 * Ändern des Passworts, weil auch hier das Passwort abgefragt wird.
 */
async function deleteHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });
  }

  let body: { password?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }
  const password = typeof body.password === "string" ? body.password : "";

  if (!allow(`delete:${clientKey(request)}:${user.id}`, LIMITS.passwordChange)) {
    return NextResponse.json({ error: t("api.tooManyPasswordChanges") }, { status: 429 });
  }

  if (password.length === 0) {
    return NextResponse.json({ error: t("api.passwordRequired") }, { status: 400 });
  }

  if (!deleteAccount(user.id, password)) {
    return NextResponse.json({ error: t("api.passwordWrong") }, { status: 403 });
  }

  const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(clearedSessionCookie());
  return response;
}

export const DELETE = withLogging(deleteHandler);
