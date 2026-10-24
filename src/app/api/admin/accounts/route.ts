import { NextResponse } from "next/server";
import {
  ACCOUNTS_MAX,
  ACCOUNTS_PAGE_SIZE,
  countAccounts,
  listAccounts,
  listInvitations,
} from "@/lib/db/admin";
import { userFromRequest } from "@/lib/auth/session";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";

/**
 * Konten und Einladungen für die Benutzerverwaltung (ToDo 18.3, 18.6).
 *
 *     GET /api/admin/accounts?q=<Teil der Adresse>&limit=<Anzahl>
 *
 * Nur für Administratoren, serverseitig geprüft – ohne Recht 401, wie bei den
 * übrigen Verwaltungsrouten. Ausgeliefert werden Adresse, Rolle und Zeitpunkte;
 * weder Passwort-Hash noch Sitzungen noch Einladungstoken.
 *
 * **Begrenzt wird hier und nicht in der Oberfläche:** ohne `limit` kommen
 * `ACCOUNTS_PAGE_SIZE` Konten, nie mehr als `ACCOUNTS_MAX`. `total` ist die
 * Zahl der Treffer der Suche, damit die Ansicht „25 von 158“ zeigen kann.
 */
async function getHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user?.isAdmin) {
    return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });
  }

  const params = new URL(request.url).searchParams;
  const query = params.get("q") ?? "";
  const asked = Number(params.get("limit"));
  const limit = Number.isFinite(asked) && asked > 0 ? Math.min(Math.floor(asked), ACCOUNTS_MAX) : ACCOUNTS_PAGE_SIZE;

  return NextResponse.json(
    {
      accounts: listAccounts({ query, limit }).map((account) => ({
        ...account,
        isYou: account.id === user.id,
      })),
      total: countAccounts(query),
      invitations: listInvitations(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export const GET = withLogging(getHandler);
