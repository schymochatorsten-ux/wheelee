import { NextResponse } from "next/server";
import { revokeInvitation } from "@/lib/db/admin";
import { userFromRequest } from "@/lib/auth/session";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";

/**
 * Eine offene Einladung zurückziehen (ToDo 18.3) – nur für Administratoren.
 *
 *     DELETE /api/admin/invitations/<id>
 */
async function deleteHandler(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = userFromRequest(request);
  if (!user?.isAdmin) {
    return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });
  }

  const { id } = await context.params;
  if (!revokeInvitation(id)) {
    return NextResponse.json({ error: t("api.notFoundOrNoChange") }, { status: 404 });
  }
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}

export const DELETE = withLogging(deleteHandler);
