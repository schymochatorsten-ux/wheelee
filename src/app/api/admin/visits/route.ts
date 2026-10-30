import { NextResponse } from "next/server";
import { readVisits, totalVisits, dayKey } from "@/lib/visits";
import { userFromRequest } from "@/lib/auth/session";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";

/**
 * Besucherzahlen für die Verwaltung (ToDo 20.1) – nur für Administratoren.
 *
 *     GET /api/admin/visits?days=30
 *
 * Ohne Administratorrecht 401 wie bei den übrigen Verwaltungsrouten. Die
 * Antwort enthält nur Summen je Tag.
 */
async function getHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user?.isAdmin) {
    return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });
  }

  const requested = Number(new URL(request.url).searchParams.get("days"));
  const days = Number.isFinite(requested) && requested > 0 ? Math.min(requested, 366) : 30;

  return NextResponse.json(
    { today: dayKey(), days: readVisits(days), total: totalVisits() },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export const GET = withLogging(getHandler);
