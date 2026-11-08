import { NextResponse } from "next/server";
import { userFromRequest } from "@/lib/auth/session";
import { withLogging } from "@/lib/log";
import { mailConfigured, sendMail } from "@/lib/mail";
import { allow, LIMITS, retryAfter } from "@/lib/rate-limit";
import { t } from "@/i18n";

/**
 * Eine Testmail verschicken (ToDo 10.22).
 *
 *     POST /api/admin/mail/test
 *
 * **Immer an die eigene Adresse des angemeldeten Administrators.** Es gibt
 * absichtlich kein Empfängerfeld: Ein Endpunkt, der eine beliebige Adresse
 * annimmt, ist ein Versandweg für fremde Post – und das Konto, das ihn
 * benutzt, ist dasselbe, das die Zugangsdaten eingetragen hat. Wer prüfen
 * will, ob der Versand läuft, braucht nur seine eigene Zustellung zu sehen.
 *
 * **Der Test sagt nicht, dass die Mail ankommt, sondern dass der Server sie
 * angenommen hat.** Was danach ein Spamfilter damit macht, weiß die App nicht;
 * genau so steht es auch in der Oberfläche. Eine Erfolgsmeldung, die mehr
 * verspricht, wäre schlechter als keine.
 */
async function postHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user?.isAdmin) {
    return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });
  }

  if (!allow(`mail-test:${user.id}`, LIMITS.mailTest)) {
    return NextResponse.json(
      { error: t("api.tooManyAttempts") },
      { status: 429, headers: retryAfter(LIMITS.mailTest) },
    );
  }

  if (!mailConfigured()) {
    return NextResponse.json({ error: t("adminMail.notConfigured") }, { status: 400 });
  }

  try {
    await sendMail({
      to: user.email,
      subject: t("adminMail.testSubject"),
      text: t("adminMail.testBody"),
    });
  } catch (error) {
    /*
     * Der Grund geht an den Administrator zurück, und das ist hier richtig:
     * „Verbindung abgelehnt", „535 Authentifizierung fehlgeschlagen" oder ein
     * Zertifikatsfehler sind genau die Auskunft, die er zum Einrichten
     * braucht. Bei den öffentlichen Mailwegen ist es umgekehrt – dort verrät
     * jede Einzelheit etwas über fremde Konten.
     */
    const reason = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: reason }, { status: 502 });
  }

  return NextResponse.json({ sentTo: user.email }, { headers: { "Cache-Control": "no-store" } });
}

export const POST = withLogging(postHandler);
