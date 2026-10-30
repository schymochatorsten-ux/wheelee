import { NextResponse } from "next/server";
import { requestEmailChange, MAIL_TOKEN_MINUTES } from "@/lib/db/mail-tokens";
import { userFromRequest } from "@/lib/auth/session";
import { looksLikeEmail, normalizeEmail } from "@/lib/auth/email";
import { mailConfigured, publicUrl, sendMail } from "@/lib/mail";
import { allow, clientKey, LIMITS, retryAfter } from "@/lib/rate-limit";
import { recordLoginFailure } from "@/lib/login-backoff";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";
import { readJson } from "@/lib/read-json";

/**
 * Eigene E-Mail-Adresse ändern (ToDo 11.8, D-10).
 *
 *     POST /api/account/email   { password, newEmail }
 *
 * Verlangt das Passwort, schickt einen Link an die **neue** Adresse; erst der
 * Klick tauscht sie. Die alte bleibt bis dahin gültig. **Die Antwort ist gleich,
 * ob die neue Adresse schon vergeben ist oder nicht** (dann geht keine Mail
 * hinaus) – sonst prüfte der Endpunkt, ob eine Adresse registriert ist.
 */
async function postHandler(request: Request) {
  if (!mailConfigured()) return NextResponse.json({ error: t("api.notFound") }, { status: 404 });

  const user = userFromRequest(request);
  if (!user) return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });

  if (
    !allow(`mail:${clientKey(request)}`, LIMITS.mailRequest) ||
    !allow(`mail-account:${user.id}`, LIMITS.passwordChange)
  ) {
    return NextResponse.json({ error: t("api.tooManyAttempts") }, { status: 429, headers: retryAfter(LIMITS.mailRequest) });
  }

  let body: { password?: unknown; newEmail?: unknown };
  try {
    body = (await readJson(request)) as typeof body;
  } catch {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";
  const newEmail = typeof body.newEmail === "string" ? normalizeEmail(body.newEmail) : "";

  if (password.length === 0) return NextResponse.json({ error: t("api.passwordRequired") }, { status: 400 });
  if (!looksLikeEmail(newEmail)) {
    return NextResponse.json({ error: t("account.emailInvalid") }, { status: 400 });
  }

  const result = requestEmailChange(user.id, password, newEmail);
  if (result.status === "wrong-password") {
    recordLoginFailure(user.email);
    return NextResponse.json({ error: t("api.passwordWrong") }, { status: 403 });
  }
  if (result.status === "same") {
    return NextResponse.json({ error: t("api.emailSame") }, { status: 400 });
  }

  // Je Zieladresse gedrosselt: Das Postfach eines Dritten soll nicht mit Mails
  // überschüttet werden, nur weil jemand es als „neue Adresse" einträgt.
  if (result.status === "ok" && allow(`mail-to:${newEmail}`, LIMITS.mailPerAddress)) {
    // Nicht abwarten (ToDo 10.19): Sonst verriete die Antwortzeit, ob die neue
    // Adresse schon vergeben ist (dann geht keine Mail hinaus). Ein
    // Versandfehler ist deshalb auch nicht mehr zu melden; bleibt die Mail
    // aus, wird der Wechsel erneut beantragt.
    void sendMail({
      to: newEmail,
      subject: t("mail.email.subject"),
      text: t("mail.email.body", {
        link: `${publicUrl()}/email-bestaetigen#${result.token}`,
        minutes: MAIL_TOKEN_MINUTES,
      }),
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}

export const POST = withLogging(postHandler);
