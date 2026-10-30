import { NextResponse } from "next/server";
import { authenticateAsync, createSession } from "@/lib/db/accounts";
import { normalizeEmail } from "@/lib/auth/email";
import { MAX_PASSWORD_LENGTH } from "@/lib/auth/password-rules";
import { isAdminAccount, sessionCookie } from "@/lib/auth/session";
import { publicUser } from "@/lib/auth/user";
import { isMapsPreference } from "@/lib/maps-preference";
import { allow, clientKey, LIMITS, retryAfter } from "@/lib/rate-limit";
import { clearLoginFailures, loginPauseSeconds, recordLoginFailure } from "@/lib/login-backoff";
import { withLogging } from "@/lib/log";
import { isLocale, t } from "@/i18n";
import { readJson } from "@/lib/read-json";

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
const MAX_EMAIL_LENGTH = 254;

async function postHandler(request: Request) {
  let body: { email?: unknown; password?: unknown };
  try {
    body = (await readJson(request)) as typeof body;
  } catch {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
  const password = typeof body.password === "string" ? body.password : "";

  /*
   * Zuerst die Herkunft allein (ToDo 10.19): Die Grenze je Herkunft **und**
   * Adresse lässt sich mit immer neuen erfundenen Adressen umgehen, und jeder
   * Versuch kostet einen scrypt-Durchlauf.
   */
  const client = clientKey(request);
  if (!allow(`login-ip:${client}`, LIMITS.loginPerClient)) {
    return NextResponse.json({ error: t("api.tooManyLogins") }, { status: 429, headers: retryAfter(LIMITS.loginPerClient) });
  }

  // Eine Adresse, die länger sein kann als jede echte, ist nie ein Konto – und
  // soll nicht als Schlüssel im Arbeitsspeicher landen.
  if (email.length > MAX_EMAIL_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
    return NextResponse.json({ error: t("api.credentialsWrong") }, { status: 401 });
  }

  const key = `login:${client}:${email}`;
  if (!allow(key, LIMITS.login)) {
    return NextResponse.json({ error: t("api.tooManyLogins") }, { status: 429, headers: retryAfter(LIMITS.login) });
  }

  if (email.length === 0 || password.length === 0) {
    return NextResponse.json({ error: t("api.credentialsRequired") }, { status: 400 });
  }

  /*
   * Zusätzlich eine Mindestpause je Adresse über alle Herkünfte (ToDo 10.15 c).
   * Sie gilt für bekannte und unbekannte Adressen gleich; `Retry-After` nennt die
   * Restzeit der Pause, sonst wüsste der Browser nicht, wann er es wieder
   * versuchen darf.
   */
  const pause = loginPauseSeconds(email);
  if (pause > 0) {
    return NextResponse.json(
      { error: t("api.tooManyLogins") },
      { status: 429, headers: { "Retry-After": String(pause) } },
    );
  }

  const account = await authenticateAsync(email, password);
  if (!account) {
    recordLoginFailure(email);
    return NextResponse.json({ error: t("api.credentialsWrong") }, { status: 401 });
  }
  clearLoginFailures(email);

  const response = NextResponse.json({
    // Mit der Anmeldung kommt die am Konto gewählte Karten-App zurück
    // (ToDo 11.3a) – das ist der Weg, auf dem sie ein zweites Gerät erreicht.
    user: publicUser({
      id: account.id,
      email: account.email,
      isAdmin: isAdminAccount(account),
      mapsPreference: isMapsPreference(account.mapsPreference) ? account.mapsPreference : null,
      language: isLocale(account.language) ? account.language : null,
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
