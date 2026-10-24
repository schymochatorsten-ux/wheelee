import { NextResponse } from "next/server";
import { createSession } from "@/lib/db/accounts";
import { redeemInvitation } from "@/lib/db/invitations";
import { passwordProblem } from "@/lib/auth/password";
import { isAdminAccount, sessionCookie } from "@/lib/auth/session";
import { publicUser } from "@/lib/auth/user";
import { allow, clientKey, LIMITS, retryAfter } from "@/lib/rate-limit";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";
import { readJson } from "@/lib/read-json";

/**
 * Einladung einlösen (ToDo 18.2).
 *
 *     POST /api/auth/invitation   { token, password }
 *
 * Keine Anmeldung nötig – das Token ist der Nachweis. Gedrosselt nach
 * Herkunft, damit es nicht erraten werden kann (256 Bit, die Drosselung ist
 * Gürtel zum Hosenträger). Die Adresse kommt aus der Einladung, nicht aus
 * dieser Anfrage. Danach ist man angemeldet, wie nach der Registrierung.
 */
async function postHandler(request: Request) {
  if (!allow(`invitation:${clientKey(request)}`, LIMITS.invitationRedeem)) {
    return NextResponse.json({ error: t("api.tooManyAttempts") }, { status: 429, headers: retryAfter(LIMITS.invitationRedeem) });
  }

  let body: { token?: unknown; password?: unknown };
  try {
    body = (await readJson(request)) as typeof body;
  } catch {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  const token = typeof body.token === "string" ? body.token : "";
  const password = typeof body.password === "string" ? body.password : "";

  // Erst das Passwort prüfen, dann einlösen: Ein zu schwaches Passwort darf die
  // Einladung nicht verbrauchen.
  const problem = passwordProblem(password);
  if (problem) return NextResponse.json({ field: "password", error: problem }, { status: 400 });

  const result = redeemInvitation(token, password);
  if ("error" in result) {
    return NextResponse.json(
      { error: t(result.error === "exists" ? "api.accountExists" : "api.invitationInvalid") },
      { status: result.error === "exists" ? 409 : 400 },
    );
  }

  const { account } = result;
  const response = NextResponse.json(
    {
      user: publicUser({
        id: account.id,
        email: account.email,
        isAdmin: isAdminAccount(account),
        mapsPreference: null,
        language: null,
      }),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
  response.cookies.set(sessionCookie(createSession(account.id)));
  return response;
}

export const POST = withLogging(postHandler);
