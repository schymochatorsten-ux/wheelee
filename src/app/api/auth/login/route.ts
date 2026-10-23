import { NextResponse } from "next/server";
import { authenticate, createSession } from "@/lib/db/accounts";
import { normalizeEmail } from "@/lib/auth/email";
import { isAdminEmail, sessionCookie } from "@/lib/auth/session";
import { publicUser } from "@/lib/auth/user";
import { isMapsPreference } from "@/lib/maps-preference";
import { allow, clientKey, LIMITS } from "@/lib/rate-limit";
import { withLogging } from "@/lib/log";
import { isLocale, t } from "@/i18n";

/**
 * Anmelden (ToDo 11.1).
 *
 * **Eine Fehlermeldung für beide Fälle.** Ob die Adresse unbekannt ist oder
 * das Passwort falsch, bleibt offen – sonst wäre das Formular ein Werkzeug,
 * um herauszufinden, wer hier ein Konto hat. Dass auch die Antwortzeit das
 * nicht verrät, stellt `authenticate` sicher (es rechnet bei unbekannter
 * Adresse trotzdem einen Hash).
 *
 * Gedrosselt wird nach **Adresse und Herkunft zusammen**: Nur nach Herkunft
 * ließe sich ein gemeinsamer Anschluss – ein Büro, ein Mobilfunknetz – durch
 * einen anderen Nutzer aussperren; nur nach Adresse ließe sich dieselbe
 * Adresse von vielen Rechnern aus durchprobieren.
 */
async function postHandler(request: Request) {
  let body: { email?: unknown; password?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
  const password = typeof body.password === "string" ? body.password : "";

  const key = `login:${clientKey(request)}:${email}`;
  if (!allow(key, LIMITS.login)) {
    return NextResponse.json({ error: t("api.tooManyLogins") }, { status: 429 });
  }

  if (email.length === 0 || password.length === 0) {
    return NextResponse.json({ error: t("api.credentialsRequired") }, { status: 400 });
  }

  const account = authenticate(email, password);
  if (!account) {
    return NextResponse.json({ error: t("api.credentialsWrong") }, { status: 401 });
  }

  const response = NextResponse.json({
    // Mit der Anmeldung kommt die am Konto gewählte Karten-App zurück
    // (ToDo 11.3a) – das ist der Weg, auf dem sie ein zweites Gerät erreicht.
    user: publicUser({
      id: account.id,
      email: account.email,
      isAdmin: isAdminEmail(account.email),
      mapsPreference: isMapsPreference(account.mapsPreference) ? account.mapsPreference : null,
      language: isLocale(account.language) ? account.language : null,
    }),
  });
  response.cookies.set(sessionCookie(createSession(account.id)));
  return response;
}

/*
 * Jede Antwort läuft durch das Protokoll (ToDo 12.6): Status, Dauer und der
 * Pfad **ohne Parameterwerte**. Siehe `lib/log.ts`.
 */
export const POST = withLogging(postHandler);
