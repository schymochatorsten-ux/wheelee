import { NextResponse } from "next/server";
import { createAccount } from "@/lib/db/accounts";
import { passwordProblem } from "@/lib/auth/password";
import { looksLikeEmail, normalizeEmail } from "@/lib/auth/email";
import { isAdminAccount, sessionCookie } from "@/lib/auth/session";
import { publicUser } from "@/lib/auth/user";
import { allow, clientKey, LIMITS, retryAfter } from "@/lib/rate-limit";
import { createSession } from "@/lib/db/accounts";
import { createVerificationToken, MAIL_TOKEN_MINUTES } from "@/lib/db/mail-tokens";
import { mailConfigured, publicUrl, sendMail } from "@/lib/mail";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";
import { readJson } from "@/lib/read-json";

/**
 * Konto anlegen (ToDo 11.1).
 *
 * Nach dem Anlegen ist man **sofort angemeldet**. Eine Bestätigung per E-Mail
 * wäre der übliche Weg, setzt aber einen Mailversand voraus, den es hier
 * (noch) nicht gibt – und ein Konto, das erst nach einem Klick in einer Mail
 * funktioniert, die nie ankommt, ist schlechter als keines.
 *
 * Die Folge ist bekannt und hier vertretbar: Adressen sind unbestätigt. Das
 * Konto berechtigt zu nichts außer der eigenen Meldung. Admin wird man nur über
 * die Rolle in der Datenbank; eine Adresse aus `ADMIN_EMAILS` hebt nur Konten,
 * die **vor** dem Start schon bestanden (`bootstrapAdmins`, ToDo 10.19). Eine
 * hier neu registrierte Adresse bekommt nie Rechte.
 */
async function postHandler(request: Request) {
  if (!allow(`register:${clientKey(request)}`, LIMITS.register)) {
    return NextResponse.json({ error: t("api.tooManyAttempts") }, { status: 429, headers: retryAfter(LIMITS.register) });
  }

  let body: { email?: unknown; password?: unknown };
  try {
    body = (await readJson(request)) as typeof body;
  } catch {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!looksLikeEmail(email)) {
    return NextResponse.json({ field: "email", error: t("account.emailInvalid") }, { status: 400 });
  }

  const problem = passwordProblem(password);
  if (problem) {
    return NextResponse.json({ field: "password", error: problem }, { status: 400 });
  }

  const account = createAccount(email, password);
  if (!account) {
    /*
     * Dass die Adresse schon vergeben ist, wird offen gesagt – obwohl das
     * verrät, wer hier ein Konto hat. Die Alternative („wir haben dir eine
     * Mail geschickt") braucht einen Mailversand, und ohne ihn bliebe nur,
     * jemanden ratlos vor einem Formular stehen zu lassen, das nicht sagt,
     * warum es nicht weitergeht. Gegen das Abklopfen von Adresslisten steht
     * die Drosselung oben.
     */
    return NextResponse.json(
      {
        field: "email",
        error: t("api.accountExists"),
      },
      { status: 409 },
    );
  }

  // Mit eingerichtetem Mailversand wird die Adresse bestätigt (ToDo 10.21). Das
  // Konto funktioniert sofort weiter; die Bestätigung entscheidet, ob die
  // Adresse Admin werden kann. Im Hintergrund, die Antwort wartet nicht.
  if (mailConfigured() && allow(`mail-to:${email}`, LIMITS.mailPerAddress)) {
    void sendMail({
      to: account.email,
      subject: t("mail.verify.subject"),
      text: t("mail.verify.body", {
        link: `${publicUrl()}/email-bestaetigen#${createVerificationToken(account.id, account.email)}`,
        minutes: MAIL_TOKEN_MINUTES,
      }),
    }).catch(() => {});
  }

  const response = NextResponse.json({
    // `mapsPreference` gehört dazu, seit die Karten-App am Konto hängt
    // (ToDo 11.3a) – bei einem neuen Konto ist sie leer.
    user: publicUser({
      id: account.id,
      email: account.email,
      isAdmin: isAdminAccount(account),
      mapsPreference: null,
      language: null,
    }),
  }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(sessionCookie(createSession(account.id)));
  return response;
}

/*
 * Jede Antwort läuft durch das Protokoll (ToDo 12.6): Status, Dauer und der
 * Pfad **ohne Parameterwerte**. Siehe `lib/log.ts`.
 */
export const POST = withLogging(postHandler);
