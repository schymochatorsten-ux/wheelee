import { NextResponse } from "next/server";
import { createAccount } from "@/lib/db/accounts";
import { passwordProblem } from "@/lib/auth/password";
import { looksLikeEmail, normalizeEmail } from "@/lib/auth/email";
import { isAdminEmail, sessionCookie } from "@/lib/auth/session";
import { publicUser } from "@/lib/auth/user";
import { allow, clientKey, LIMITS } from "@/lib/rate-limit";
import { createSession } from "@/lib/db/accounts";
import { withLogging } from "@/lib/log";

/**
 * Konto anlegen (ToDo 11.1).
 *
 * Nach dem Anlegen ist man **sofort angemeldet**. Eine Bestätigung per E-Mail
 * wäre der übliche Weg, setzt aber einen Mailversand voraus, den es hier
 * (noch) nicht gibt – und ein Konto, das erst nach einem Klick in einer Mail
 * funktioniert, die nie ankommt, ist schlechter als keines.
 *
 * Die Folge ist bekannt und hier vertretbar: Adressen sind unbestätigt. Das
 * Konto berechtigt zu nichts außer der eigenen Meldung, und der Administrator
 * steht in der Umgebung – nicht in der Datenbank. Niemand kann sich also durch
 * eine fremde Adresse Rechte verschaffen.
 */
async function postHandler(request: Request) {
  if (!allow(`register:${clientKey(request)}`, LIMITS.register)) {
    return NextResponse.json(
      { error: "Zu viele Versuche. Bitte später erneut probieren." },
      { status: 429 },
    );
  }

  let body: { email?: unknown; password?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!looksLikeEmail(email)) {
    return NextResponse.json(
      { field: "email", error: "Diese E-Mail-Adresse sieht nicht richtig aus." },
      { status: 400 },
    );
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
        error: "Für diese Adresse gibt es schon ein Konto. Melde dich damit an.",
      },
      { status: 409 },
    );
  }

  const response = NextResponse.json({
    // `mapsPreference` gehört dazu, seit die Karten-App am Konto hängt
    // (ToDo 11.3a) – bei einem neuen Konto ist sie leer.
    user: publicUser({
      id: account.id,
      email: account.email,
      isAdmin: isAdminEmail(account.email),
      mapsPreference: null,
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
