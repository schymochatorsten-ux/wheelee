import { NextResponse } from "next/server";
import { feedbackCounts, listFeedback } from "@/lib/db/feedback";
import { isFeedbackKind, isFeedbackStatus } from "@/lib/feedback";
import { userFromRequest } from "@/lib/auth/session";
import { withLogging } from "@/lib/log";

/**
 * Die Rückmeldungen für die Übersicht (ToDo 17.4).
 *
 * **Ohne Anmeldung gibt diese Route nichts preis – auch nicht die Anzahl.**
 * Geprüft wird serverseitig; eine nur im Browser versteckte Ansicht ist keine
 * Zugangsprüfung, sondern eine Verabredung. Dass das so bleibt, hält ein
 * E2E-Test fest (`e2e/rueckmeldungen.spec.ts`): Er ruft ohne Anmeldung auf und
 * erwartet 401. Eine Zugangsprüfung, die niemand prüft, ist beim nächsten
 * Umbau still verschwunden.
 *
 * Auch ein **angemeldeter** Benutzer ohne Administratorrecht bekommt 401 und
 * nicht 403: Dass es diese Übersicht gibt, muss er nicht erfahren.
 */
async function getHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const params = new URL(request.url).searchParams;
  const kind = params.get("kind");
  const status = params.get("status");

  const entries = listFeedback({
    kind: isFeedbackKind(kind) ? kind : null,
    status: isFeedbackStatus(status) ? status : null,
  });

  return NextResponse.json(
    { entries, counts: feedbackCounts() },
    // Niemals zwischenspeichern: Das sind personenbezogene Angaben, und sie
    // ändern sich mit jedem Klick in der Übersicht.
    { headers: { "Cache-Control": "no-store" } },
  );
}

/*
 * Jede Antwort läuft durch das Protokoll (ToDo 12.6): Status, Dauer und der
 * Pfad **ohne Parameterwerte**. Siehe `lib/log.ts`.
 */
export const GET = withLogging(getHandler);
