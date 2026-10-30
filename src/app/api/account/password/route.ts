import { NextResponse } from "next/server";
import { changePassword } from "@/lib/db/accounts";
import { sessionTokenFromRequest, userFromRequest } from "@/lib/auth/session";
import { passwordProblem } from "@/lib/auth/password-rules";
import { allow, LIMITS, retryAfter } from "@/lib/rate-limit";
import { loginPauseSeconds, recordLoginFailure } from "@/lib/login-backoff";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";
import { readJson } from "@/lib/read-json";

/**
 * Passwort ändern und alle übrigen Sitzungen verwerfen (ToDo 10.7).
 *
 *     PUT /api/account/password   { oldPassword, newPassword }
 *
 * **Gedrosselt wie die Anmeldung**, nach Konto und Herkunft zusammen: Der
 * Endpunkt prüft das alte Passwort und wäre sonst ein zweiter Weg, es zu
 * erraten – mit einer gestohlenen Sitzung als Eintrittskarte.
 */
async function putHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });
  }

  let body: { oldPassword?: unknown; newPassword?: unknown };
  try {
    body = (await readJson(request)) as typeof body;
  } catch {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  const oldPassword = typeof body.oldPassword === "string" ? body.oldPassword : "";
  const newPassword = typeof body.newPassword === "string" ? body.newPassword : "";

  // Je Konto, nicht je Herkunft und Konto (ToDo 10.19): Mit einer gestohlenen
  // Sitzung und wechselnden Adressen ließe sich das alte Passwort sonst
  // beliebig oft raten. Fehlversuche zählen außerdem für die Anmeldepause.
  if (!allow(`password:${user.id}`, LIMITS.passwordChange) || loginPauseSeconds(user.email) > 0) {
    return NextResponse.json({ error: t("api.tooManyPasswordChanges") }, { status: 429, headers: retryAfter(LIMITS.passwordChange) });
  }

  if (oldPassword.length === 0) {
    return NextResponse.json({ error: t("api.oldPasswordRequired") }, { status: 400 });
  }

  const problem = passwordProblem(newPassword);
  if (problem) return NextResponse.json({ error: problem }, { status: 400 });

  if (!changePassword(user.id, oldPassword, newPassword, sessionTokenFromRequest(request))) {
    recordLoginFailure(user.email);
    return NextResponse.json({ error: t("api.oldPasswordWrong") }, { status: 403 });
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}

export const PUT = withLogging(putHandler);
