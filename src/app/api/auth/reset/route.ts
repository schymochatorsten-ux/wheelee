import { NextResponse } from "next/server";
import { resetPassword } from "@/lib/db/mail-tokens";
import { passwordProblem } from "@/lib/auth/password-rules";
import { mailConfigured } from "@/lib/mail";
import { allow, clientKey, LIMITS, retryAfter } from "@/lib/rate-limit";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";
import { readJson } from "@/lib/read-json";

/**
 * Neues Passwort mit dem Link aus der Mail setzen (ToDo 11.1).
 *
 *     POST /api/auth/reset   { token, password }
 *
 * Danach ist **niemand** mehr angemeldet – auch dieses Gerät nicht: Wer sein
 * Passwort vergessen hat, weiß nicht, wer es sonst noch kennt. Angemeldet wird
 * bewusst nicht automatisch; der Mensch meldet sich mit dem neuen Passwort an.
 * Ein zu schwaches Passwort verbraucht den Link nicht.
 */
async function postHandler(request: Request) {
  if (!mailConfigured()) return NextResponse.json({ error: t("api.notFound") }, { status: 404 });

  if (!allow(`mail-redeem:${clientKey(request)}`, LIMITS.mailRedeem)) {
    return NextResponse.json({ error: t("api.tooManyAttempts") }, { status: 429, headers: retryAfter(LIMITS.mailRedeem) });
  }

  let body: { token?: unknown; password?: unknown };
  try {
    body = (await readJson(request)) as typeof body;
  } catch {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  const token = typeof body.token === "string" ? body.token : "";
  const password = typeof body.password === "string" ? body.password : "";

  const problem = passwordProblem(password);
  if (problem) return NextResponse.json({ field: "password", error: problem }, { status: 400 });

  if (!resetPassword(token, password)) {
    return NextResponse.json({ error: t("api.mailLinkInvalid") }, { status: 400 });
  }
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}

export const POST = withLogging(postHandler);
