import { NextResponse } from "next/server";
import { createResetToken } from "@/lib/db/mail-tokens";
import { normalizeEmail, looksLikeEmail } from "@/lib/auth/email";
import { mailConfigured, publicUrl, sendMail } from "@/lib/mail";
import { MAIL_TOKEN_MINUTES } from "@/lib/db/mail-tokens";
import { allow, clientKey, LIMITS, retryAfter } from "@/lib/rate-limit";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";
import { readJson } from "@/lib/read-json";

/**
 * „Passwort vergessen" (ToDo 11.1, D-10).
 *
 *     POST /api/auth/forgot   { email }
 *
 * **Die Antwort ist immer dieselbe**, ob die Adresse ein Konto hat oder nicht –
 * sonst wäre das Formular ein Werkzeug, um herauszufinden, wer hier registriert
 * ist. Der Link steht nur in der Mail, nie in der Antwort. Das Token kommt im
 * **Fragment** des Links (`/passwort-zuruecksetzen#…`): Es erreicht keinen
 * Server, steht in keinem Protokoll und in keinem Referer.
 *
 * Ohne eingerichteten Mailversand gibt es den Endpunkt nicht (404).
 */
async function postHandler(request: Request) {
  if (!mailConfigured()) return NextResponse.json({ error: t("api.notFound") }, { status: 404 });

  if (!allow(`mail:${clientKey(request)}`, LIMITS.mailRequest)) {
    return NextResponse.json({ error: t("api.tooManyAttempts") }, { status: 429, headers: retryAfter(LIMITS.mailRequest) });
  }

  let body: { email?: unknown };
  try {
    body = (await readJson(request)) as typeof body;
  } catch {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
  if (!looksLikeEmail(email)) {
    return NextResponse.json({ error: t("account.emailInvalid") }, { status: 400 });
  }

  // Je Zieladresse gedrosselt, **auch wenn es sie nicht gibt** – sonst verriete
  // die Drosselung selbst, welche Adressen bekannt sind. Über die Grenze hinaus
  // wird still nichts mehr verschickt, die Antwort bleibt dieselbe.
  const allowedForAddress = allow(`mail-to:${email}`, LIMITS.mailPerAddress);

  if (allowedForAddress) {
    const issued = createResetToken(email);
    if (issued) {
      // **Nicht abwarten** (ToDo 10.19): Der Versand dauert Sekunden, und nur bei
      // einem vorhandenen Konto – die Antwortzeit verriet sonst, wer eines hat.
      // Ein Versandfehler darf ebenfalls nicht an der Antwort erkennbar sein;
      // der Mensch fordert bei Ausbleiben der Mail einfach noch einmal an.
      void sendMail({
        to: issued.email,
        subject: t("mail.reset.subject"),
        text: t("mail.reset.body", {
          link: `${publicUrl()}/passwort-zuruecksetzen#${issued.token}`,
          minutes: MAIL_TOKEN_MINUTES,
        }),
      }).catch(() => {});
    }
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}

export const POST = withLogging(postHandler);
