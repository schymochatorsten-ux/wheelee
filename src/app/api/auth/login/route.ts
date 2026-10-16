import { NextResponse } from "next/server";
import { authenticate, createSession } from "@/lib/db/accounts";
import { normalizeEmail } from "@/lib/auth/email";
import { isAdminEmail, sessionCookie } from "@/lib/auth/session";
import { allow, clientKey, LIMITS } from "@/lib/rate-limit";

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
export async function POST(request: Request) {
  let body: { email?: unknown; password?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
  const password = typeof body.password === "string" ? body.password : "";

  const key = `login:${clientKey(request)}:${email}`;
  if (!allow(key, LIMITS.login)) {
    return NextResponse.json(
      { error: "Zu viele Anmeldeversuche. Bitte in einigen Minuten erneut probieren." },
      { status: 429 },
    );
  }

  if (email.length === 0 || password.length === 0) {
    return NextResponse.json(
      { error: "Bitte E-Mail-Adresse und Passwort eingeben." },
      { status: 400 },
    );
  }

  const account = authenticate(email, password);
  if (!account) {
    return NextResponse.json(
      { error: "E-Mail-Adresse oder Passwort stimmt nicht." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({
    user: { email: account.email, isAdmin: isAdminEmail(account.email) },
  });
  response.cookies.set(sessionCookie(createSession(account.id)));
  return response;
}
