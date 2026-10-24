import { NextResponse } from "next/server";
import { createInvitation } from "@/lib/db/invitations";
import { looksLikeEmail, normalizeEmail } from "@/lib/auth/email";
import { userFromRequest } from "@/lib/auth/session";
import { allow, LIMITS, retryAfter } from "@/lib/rate-limit";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";
import { readJson } from "@/lib/read-json";

/**
 * Einladung erzeugen (ToDo 18.2) – nur für Administratoren.
 *
 *     POST /api/admin/invitations   { email, role?: "admin" | "user" }
 *
 * Die Antwort enthält das Token **genau einmal**; die App sendet nichts (D-09).
 * Der Link lautet `/einladung#<token>` und wird von der Oberfläche mit der
 * eigenen Adresse zusammengesetzt. Das Token steht im **Fragment**, nicht im
 * Pfad: Ein Fragment geht nie an einen Server, steht also in keinem Protokoll
 * und in keinem Referer.
 *
 * Ohne Administratorrecht gibt es 401 und nicht 403, wie bei den übrigen
 * Verwaltungsrouten: Dass es sie gibt, muss niemand erfahren.
 */
async function postHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user?.isAdmin) {
    return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });
  }

  if (!allow(`invite:${user.id}`, LIMITS.invitationCreate)) {
    return NextResponse.json({ error: t("api.tooManyInvitations") }, { status: 429, headers: retryAfter(LIMITS.invitationCreate) });
  }

  let body: { email?: unknown; role?: unknown };
  try {
    body = (await readJson(request)) as typeof body;
  } catch {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
  if (!looksLikeEmail(email)) {
    return NextResponse.json({ field: "email", error: t("account.emailInvalid") }, { status: 400 });
  }

  const role = body.role === undefined || body.role === "admin" ? "admin" : body.role;
  if (role !== "admin" && role !== "user") {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  const invitation = createInvitation(user.id, email, role);
  if (!invitation) {
    return NextResponse.json({ field: "email", error: t("api.accountExists") }, { status: 409 });
  }

  return NextResponse.json(
    {
      token: invitation.token,
      path: `/einladung#${invitation.token}`,
      email: invitation.email,
      role: invitation.role,
      expiresAt: invitation.expiresAt,
    },
    // Das Token darf nirgends zwischengespeichert werden.
    { headers: { "Cache-Control": "no-store" }, status: 201 },
  );
}

export const POST = withLogging(postHandler);
