import { NextResponse } from "next/server";
import { userFromRequest } from "@/lib/auth/session";
import { withLogging } from "@/lib/log";
import { clearMailConfig, readMailConfig, saveMailConfig } from "@/lib/db/mail-config";
import { envMailConfigured, mailConfigured, validUrl } from "@/lib/mail";
import { looksLikeEmail } from "@/lib/auth/email";
import { t } from "@/i18n";

/**
 * Die SMTP-Zugangsdaten aus der Verwaltung pflegen (ToDo 10.22).
 *
 *     GET    /api/admin/mail   – was gilt, und woher es kommt
 *     PUT    /api/admin/mail   – speichern
 *     DELETE /api/admin/mail   – gespeicherte Angaben verwerfen
 *
 * **Das Passwort geht nie zurück an den Browser.** Die Antwort sagt nur, ob
 * eines hinterlegt ist. Ein Formular, das das Passwort vorausgefüllt
 * zurückliefert, reicht es bei jedem Aufruf der Seite über die Leitung und legt
 * es in jeden Browser-Verlauf – für einen Wert, den niemand ablesen muss, um
 * ihn zu ändern. Wer ihn nicht mitschickt, lässt den gespeicherten stehen.
 *
 * Nur Administratoren, wie bei allen Routen unter `/api/admin`.
 */

function unauthorized() {
  return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });
}

function state() {
  const row = readMailConfig();
  const fromEnv = envMailConfigured();

  return {
    /** Welche Angaben gerade gelten. */
    source: row ? ("db" as const) : fromEnv ? ("env" as const) : ("none" as const),
    /** Ob in der Umgebung ein zweiter Satz liegt – der Hinweis dazu steht in der Oberfläche. */
    envPresent: fromEnv,
    /** Ob der Versand im Ergebnis läuft. Beantwortet die eigentliche Frage. */
    active: mailConfigured(),
    config: row
      ? {
          host: row.host,
          port: row.port,
          secure: row.secure,
          username: row.username,
          fromAddress: row.fromAddress,
          publicUrl: row.publicUrl,
          enabled: row.enabled,
          provider: row.provider,
          notifyEmail: row.notifyEmail,
          hasPassword: row.password !== null && row.password !== "",
          updatedAt: row.updatedAt,
        }
      : null,
  };
}

function getHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user?.isAdmin) return unauthorized();
  return NextResponse.json(state(), { headers: { "Cache-Control": "no-store" } });
}

interface Body {
  host?: unknown;
  port?: unknown;
  secure?: unknown;
  username?: unknown;
  password?: unknown;
  fromAddress?: unknown;
  publicUrl?: unknown;
  enabled?: unknown;
  provider?: unknown;
  notifyEmail?: unknown;
}

const text = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

async function putHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user?.isAdmin) return unauthorized();

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: t("adminMail.invalid") }, { status: 400 });
  }

  const host = text(body.host);
  const fromAddress = text(body.fromAddress);
  const publicUrlRaw = text(body.publicUrl);
  const portRaw = Number(body.port);

  /*
   * Geprüft wird hier und nicht erst beim Versand. Eine Angabe, die beim
   * Speichern durchgeht und erst beim „Passwort vergessen" eines Fremden
   * scheitert, fällt genau dann auf, wenn niemand hinsieht.
   */
  if (!host) return NextResponse.json({ error: t("adminMail.hostMissing") }, { status: 400 });
  if (!fromAddress || !fromAddress.includes("@")) {
    return NextResponse.json({ error: t("adminMail.fromMissing") }, { status: 400 });
  }
  if (!Number.isInteger(portRaw) || portRaw < 1 || portRaw > 65_535) {
    return NextResponse.json({ error: t("adminMail.portInvalid") }, { status: 400 });
  }

  // Dieselbe Prüfung wie für die Umgebungsvariable: Ein Link zum Zurücksetzen
  // über eine unverschlüsselte Verbindung ist mitlesbar (siehe `lib/mail.ts`).
  const publicUrl = validUrl(publicUrlRaw);
  if (!publicUrl) {
    return NextResponse.json({ error: t("adminMail.urlInvalid") }, { status: 400 });
  }

  /*
   * Die Benachrichtigungsadresse ist freiwillig (leer = keine), aber wenn sie
   * dasteht, muss sie wie eine Adresse aussehen. Ein Tippfehler fiele sonst
   * erst Wochen später auf – nämlich nie, denn es kommt ja nur nichts an.
   */
  const notifyRaw = text(body.notifyEmail);
  if (notifyRaw && !looksLikeEmail(notifyRaw)) {
    return NextResponse.json({ error: t("adminMail.notifyInvalid") }, { status: 400 });
  }
  const notify = notifyRaw || null;

  saveMailConfig(
    {
      host,
      port: portRaw,
      secure: body.secure === true,
      username: text(body.username) || null,
      // Fehlt das Feld, bleibt das gespeicherte Passwort stehen; ein leerer
      // Text löscht es. Siehe `db/mail-config.ts`.
      password: body.password === undefined ? undefined : text(body.password) || null,
      fromAddress,
      publicUrl,
      enabled: body.enabled === true,
      // Fehlt er, bleibt er leer – und die Datenschutzerklärung nennt den
      // Mangel, statt einen Namen zu erfinden (10.16). Deshalb ist er hier
      // **keine** Pflicht: Wer beim Einrichten noch nicht weiß, wie der
      // Anbieter im Vertrag heißt, soll trotzdem speichern können.
      provider: text(body.provider) || null,
      notifyEmail: notify,
    },
    user.id,
  );

  return NextResponse.json(state(), { headers: { "Cache-Control": "no-store" } });
}

function deleteHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user?.isAdmin) return unauthorized();

  clearMailConfig();
  return NextResponse.json(state(), { headers: { "Cache-Control": "no-store" } });
}

export const GET = withLogging(getHandler);
export const PUT = withLogging(putHandler);
export const DELETE = withLogging(deleteHandler);
