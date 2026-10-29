import { NextResponse } from "next/server";
import { confirmEmailChange } from "@/lib/db/mail-tokens";
import { mailConfigured } from "@/lib/mail";
import { allow, clientKey, LIMITS, retryAfter } from "@/lib/rate-limit";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";
import { readJson } from "@/lib/read-json";

/**
 * Den Adresswechsel mit dem Link aus der Mail bestätigen (ToDo 11.8).
 *
 *     POST /api/account/email/confirm   { token }
 *
 * **Keine Anmeldung nötig, und das ist Absicht:** Der Link wird oft auf einem
 * anderen Gerät geöffnet als dem, auf dem man angemeldet ist, und der Besitz
 * des Postfachs der neuen Adresse ist genau der Nachweis, um den es geht. Das
 * Token gehört zu einem Konto und gibt nur diese eine Änderung frei.
 */
async function postHandler(request: Request) {
  if (!mailConfigured()) return NextResponse.json({ error: t("api.notFound") }, { status: 404 });

  if (!allow(`mail-redeem:${clientKey(request)}`, LIMITS.mailRedeem)) {
    return NextResponse.json({ error: t("api.tooManyAttempts") }, { status: 429, headers: retryAfter(LIMITS.mailRedeem) });
  }

  let body: { token?: unknown };
  try {
    body = (await readJson(request)) as typeof body;
  } catch {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  const token = typeof body.token === "string" ? body.token : "";
  const email = confirmEmailChange(token);
  if (!email) return NextResponse.json({ error: t("api.mailLinkInvalid") }, { status: 400 });

  return NextResponse.json({ ok: true, email }, { headers: { "Cache-Control": "no-store" } });
}

export const POST = withLogging(postHandler);
