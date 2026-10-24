import { NextResponse } from "next/server";
import { setDisabled, setRole } from "@/lib/db/accounts";
import { deleteAccountByAdmin } from "@/lib/db/admin";
import { userFromRequest } from "@/lib/auth/session";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";
import { readJson } from "@/lib/read-json";

/**
 * Ein Konto verwalten (ToDo 18.3) – nur für Administratoren.
 *
 *     PATCH  /api/admin/accounts/<id>   { role?: "admin" | "user", disabled?: boolean }
 *     DELETE /api/admin/accounts/<id>
 *
 * Das **letzte aktive Admin-Konto** lässt sich weder herabstufen noch sperren
 * noch löschen (409); geprüft wird in der Datenbankschicht. Das eigene Konto
 * löscht man hier nicht, sondern über die Kontoeinstellungen mit Passwort.
 * Sich selbst die Rolle `admin` zu geben ist erlaubt: Wer über `ADMIN_EMAILS`
 * hereinkommt, hat sonst keinen Weg, selbst in der Datenbank Admin zu werden.
 *
 * Rolle und Sperre wirken sofort, denn `isAdmin` wird je Anfrage aus der
 * Datenbank gelesen. Das Protokoll hält Pfad (mit Konto-ID) und Status fest,
 * nie die Adresse.
 */

type Context = { params: Promise<{ id: string }> };

async function admin(request: Request, context: Context) {
  const user = userFromRequest(request);
  if (!user?.isAdmin) return null;
  return { user, id: (await context.params).id };
}

async function patchHandler(request: Request, context: Context) {
  const acting = await admin(request, context);
  if (!acting) return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });

  let body: { role?: unknown; disabled?: unknown };
  try {
    body = (await readJson(request)) as typeof body;
  } catch {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  const hasRole = body.role !== undefined;
  const hasDisabled = body.disabled !== undefined;
  if (
    (!hasRole && !hasDisabled) ||
    (hasRole && body.role !== "admin" && body.role !== "user") ||
    (hasDisabled && typeof body.disabled !== "boolean")
  ) {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  // Nicht atomar: Scheitert die zweite Änderung, bleibt die erste bestehen. Die
  // Oberfläche sendet immer nur eine von beiden.
  if (hasRole && !setRole(acting.id, body.role as "admin" | "user")) {
    return NextResponse.json({ error: t("api.adminCannotChange") }, { status: 409 });
  }
  if (hasDisabled && !setDisabled(acting.id, body.disabled as boolean)) {
    return NextResponse.json({ error: t("api.adminCannotChange") }, { status: 409 });
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}

async function deleteHandler(request: Request, context: Context) {
  const acting = await admin(request, context);
  if (!acting) return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });

  const result = deleteAccountByAdmin(acting.id, acting.user.id);
  if (result === "not-found") {
    return NextResponse.json({ error: t("api.notFound") }, { status: 404 });
  }
  if (result !== "deleted") {
    return NextResponse.json({ error: t("api.adminCannotChange") }, { status: 409 });
  }
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}

export const PATCH = withLogging(patchHandler);
export const DELETE = withLogging(deleteHandler);
