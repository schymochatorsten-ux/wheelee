import { NextResponse } from "next/server";
import { exportAccountData } from "@/lib/db/accounts";
import { userFromRequest } from "@/lib/auth/session";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";

/**
 * Auskunft über die eigenen Daten als JSON-Download (ToDo 11.7, Art. 15 und 20
 * DSGVO).
 *
 *     GET /api/account/export
 *
 * Nur die Daten des angemeldeten Kontos, nie eine Kennung aus der Anfrage – es
 * gibt nichts, womit sich die Daten eines anderen abrufen ließen.
 */
async function getHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });
  }

  const data = exportAccountData(user.id);
  if (!data) {
    return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });
  }

  return new NextResponse(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": 'attachment; filename="wheelee-meine-daten.json"',
      "Cache-Control": "no-store",
    },
  });
}

export const GET = withLogging(getHandler);
