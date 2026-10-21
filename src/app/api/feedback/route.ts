import { NextResponse } from "next/server";
import { saveFeedback } from "@/lib/db/feedback";
import { validateFeedback } from "@/lib/feedback";
import { userFromRequest } from "@/lib/auth/session";
import { allow, clientKey, LIMITS } from "@/lib/rate-limit";
import { withLogging } from "@/lib/log";

/**
 * Eine Rückmeldung entgegennehmen (ToDo 17.2).
 *
 *     POST /api/feedback
 *     { kind, message, contactEmail?, spotId?, city?, url?, userAgent?, deviceId? }
 *
 * **Ohne Anmeldung möglich, und das ist Absicht.** Wer einen aufgehobenen
 * Parkplatz meldet, steht womöglich gerade davor. Eine Registrierung
 * dazwischen würde genau die Meldungen verhindern, auf die es ankommt. Ist
 * jemand angemeldet, wird das Konto vermerkt – dann ist die Meldung
 * zurechenbar, ohne dass es jemand sein muss.
 */
async function postHandler(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const check = validateFeedback({
    kind: String(body.kind ?? ""),
    message: String(body.message ?? ""),
    contactEmail: typeof body.contactEmail === "string" ? body.contactEmail : null,
    spotId: typeof body.spotId === "string" ? body.spotId : null,
    city: typeof body.city === "string" ? body.city : null,
    url: typeof body.url === "string" ? body.url : null,
    userAgent: typeof body.userAgent === "string" ? body.userAgent : null,
    appVersion: typeof body.appVersion === "string" ? body.appVersion : null,
    deviceId: typeof body.deviceId === "string" ? body.deviceId : null,
  });

  // Die Prüfung läuft hier **noch einmal**, obwohl das Formular sie schon
  // gemacht hat: Eine Prüfung im Browser ist eine Hilfe für den Nutzer, kein
  // Schutz für den Server.
  if (!check.ok) {
    return NextResponse.json({ field: check.field, error: check.error }, { status: 400 });
  }

  /*
   * Gedrosselt wird nach Herkunft **und** Gerät, und die Antwort ist in beiden
   * Fällen dieselbe wie bei Erfolg (ToDo 17.2): Wer die Grenze auslotet, soll
   * nicht erfahren, wo sie liegt. Für jemanden, der aus Versehen zweimal
   * abschickt, ändert sich dadurch nichts – die Meldung gilt als angekommen.
   */
  const withinLimit =
    allow(`feedback:${clientKey(request)}`, LIMITS.feedback) &&
    (check.value.deviceId === null ||
      allow(`feedback-device:${check.value.deviceId}`, LIMITS.feedback));

  if (withinLimit) {
    const user = userFromRequest(request);
    saveFeedback(check.value, user?.id ?? null);
  }

  return NextResponse.json({ ok: true, willReply: check.value.contactEmail !== null });
}

/*
 * Jede Antwort läuft durch das Protokoll (ToDo 12.6): Status, Dauer und der
 * Pfad **ohne Parameterwerte**. Siehe `lib/log.ts`.
 */
export const POST = withLogging(postHandler);
