import { NextResponse } from "next/server";
import { deleteFeedback, updateFeedback } from "@/lib/db/feedback";
import { isFeedbackStatus, type FeedbackStatus } from "@/lib/feedback";
import { userFromRequest } from "@/lib/auth/session";

/**
 * Eine Rückmeldung ändern oder löschen (ToDo 17.4).
 *
 *     PATCH  /api/admin/feedback/42   { status?, note? }
 *     DELETE /api/admin/feedback/42
 *
 * Beides nur für den Administrator, geprüft serverseitig – und mit derselben
 * Antwort wie die Übersicht, wenn er es nicht ist.
 */

/** Zugang und Nummer in einem Schritt prüfen. */
async function check(
  request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<{ id: number } | NextResponse> {
  const user = userFromRequest(request);
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { id: raw } = await context.params;
  const id = Number.parseInt(raw, 10);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ error: "Ungültige Nummer." }, { status: 400 });
  }

  return { id };
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const result = await check(request, context);
  if (result instanceof NextResponse) return result;

  let body: { status?: unknown; note?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const changes: { status?: FeedbackStatus; note?: string | null } = {};

  if (body.status !== undefined) {
    if (!isFeedbackStatus(body.status)) {
      return NextResponse.json({ error: "Unbekannter Stand." }, { status: 400 });
    }
    changes.status = body.status;
  }

  // `null` heißt „Notiz löschen", ein fehlendes Feld heißt „unverändert".
  // Beides zu unterscheiden ist nötig, damit ein Statuswechsel nicht
  // stillschweigend die Notiz mitnimmt.
  if (body.note !== undefined) {
    changes.note = typeof body.note === "string" ? body.note : null;
  }

  if (!updateFeedback(result.id, changes)) {
    return NextResponse.json({ error: "Nicht gefunden oder nichts zu ändern." }, { status: 404 });
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const result = await check(request, context);
  if (result instanceof NextResponse) return result;

  if (!deleteFeedback(result.id)) {
    return NextResponse.json({ error: "Nicht gefunden." }, { status: 404 });
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
