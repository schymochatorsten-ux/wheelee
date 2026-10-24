import { NextResponse } from "next/server";
import { deleteFeedback, updateFeedback } from "@/lib/db/feedback";
import { isFeedbackStatus, type FeedbackStatus } from "@/lib/feedback";
import { userFromRequest } from "@/lib/auth/session";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";
import { readJson } from "@/lib/read-json";

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
    return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });
  }

  const { id: raw } = await context.params;
  const id = Number.parseInt(raw, 10);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ error: t("api.invalidNumber") }, { status: 400 });
  }

  return { id };
}

/** Obergrenze der Verwaltungsnotiz in Zeichen (ToDo 10.14); eine Rückmeldung selbst hat 2.000. */
const MAX_NOTE_LENGTH = 2000;

async function patchHandler(request: Request, context: { params: Promise<{ id: string }> }) {
  const result = await check(request, context);
  if (result instanceof NextResponse) return result;

  let body: { status?: unknown; note?: unknown };
  try {
    body = (await readJson(request)) as typeof body;
  } catch {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  const changes: { status?: FeedbackStatus; note?: string | null } = {};

  if (body.status !== undefined) {
    if (!isFeedbackStatus(body.status)) {
      return NextResponse.json({ error: t("api.unknownStatus") }, { status: 400 });
    }
    changes.status = body.status;
  }

  // `null` heißt „Notiz löschen", ein fehlendes Feld heißt „unverändert".
  // Beides zu unterscheiden ist nötig, damit ein Statuswechsel nicht
  // stillschweigend die Notiz mitnimmt.
  if (body.note !== undefined) {
    if (typeof body.note === "string" && body.note.length > MAX_NOTE_LENGTH) {
      return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
    }
    changes.note = typeof body.note === "string" ? body.note : null;
  }

  if (!updateFeedback(result.id, changes)) {
    return NextResponse.json({ error: t("api.notFoundOrNoChange") }, { status: 404 });
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}

async function deleteHandler(request: Request, context: { params: Promise<{ id: string }> }) {
  const result = await check(request, context);
  if (result instanceof NextResponse) return result;

  if (!deleteFeedback(result.id)) {
    return NextResponse.json({ error: t("api.notFound") }, { status: 404 });
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}

/*
 * Jede Antwort läuft durch das Protokoll (ToDo 12.6): Status, Dauer und der
 * Pfad **ohne Parameterwerte**. Siehe `lib/log.ts`.
 */
export const PATCH = withLogging(patchHandler);
export const DELETE = withLogging(deleteHandler);
