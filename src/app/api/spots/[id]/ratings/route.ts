import { NextResponse } from "next/server";
import { castVote, ownVote, ratingSummary, withdrawVote } from "@/lib/db/ratings";
import { spotById, spotByIdAny } from "@/lib/parking/spots";
import { userFromRequest } from "@/lib/auth/session";
import { allow, clientKey, LIMITS, retryAfter } from "@/lib/rate-limit";
import type { RatingVote } from "@/lib/types";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";
import { readJson } from "@/lib/read-json";
import { spotPolicy } from "@/lib/db/spot-policy";
import { isUncertain, removalThreshold } from "@/lib/parking/certainty";
import { evaluateSpot } from "@/lib/spot-moderation";

/**
 * Bewertungen zu einem Parkplatz (ToDos 8.2–8.5).
 *
 *     GET  /api/spots/<id>/ratings   → Zählerstände, für alle
 *     POST /api/spots/<id>/ratings   → eigene Stimme, nur mit Konto
 *
 * **Die Zugangsregel steht hier und nicht in der Oberfläche.** Ein
 * abgeschalteter Knopf ist eine Verabredung, keine Prüfung – wer die Anfrage
 * selbst schickt, umgeht ihn. Dass der Knopf trotzdem abgeschaltet
 * **aussieht**, ist eine Höflichkeit gegenüber der Nutzerin, kein Schutz.
 */

/** Die beiden einzigen gültigen Richtungen. */
function isVote(value: unknown): value is RatingVote {
  return value === "exists" || value === "gone";
}

/**
 * Antwort für beide Wege: Zählerstände plus die eigene Stimme.
 *
 * Zusammen und nicht getrennt, weil die Oberfläche beides zugleich braucht –
 * sonst zeichnet sie den Knopf einmal falsch, bis die zweite Antwort da ist.
 */
function state(spotId: string, accountId: string | null) {
  const spot = spotByIdAny(spotId);
  const policy = spotPolicy();

  return {
    summary: ratingSummary(spotId),
    myVote: accountId ? ownVote(spotId, accountId) : null,
    /*
     * Wie viele Meldungen diesen Platz entfernen (ToDo 8.11) und ob er als
     * unsicher gilt. **Beides gehört in die Antwort, nicht nur in den Server:**
     * Wer eine Stimme abgibt, soll vorher wissen, was sie bewirkt – „noch zwei
     * Meldungen und dieser Platz verschwindet" ist eine andere Entscheidung als
     * ein Daumen ins Leere.
     */
    threshold: spot ? removalThreshold(spot, policy) : null,
    uncertain: spot ? isUncertain(spot) : null,
  };
}

async function getHandler(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!spotById(id)) {
    return NextResponse.json({ error: t("api.unknownSpot") }, { status: 404 });
  }

  const user = userFromRequest(request);

  return NextResponse.json(state(id, user?.id ?? null), {
    // Niemals zwischenspeichern: Die Antwort hängt davon ab, wer fragt, und
    // sie ändert sich mit jedem Antippen.
    headers: { "Cache-Control": "no-store" },
  });
}

async function postHandler(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const user = userFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: t("api.ratingNeedsAccount") }, { status: 401 });
  }

  /*
   * Gedrosselt wird trotz Anmeldepflicht – und zwar nach **Konto**, nicht nur
   * nach Herkunft. Die Eindeutigkeit der Tabelle verhindert zwei Stimmen zum
   * selben Parkplatz, aber nicht, dass ein Konto in einer Minute hundert
   * verschiedene Parkplätze abwertet. Genau das ist der Fall, den ein Konto
   * allein nicht abfängt.
   */
  if (!allow(`rating:${user.id}`, LIMITS.rating)) {
    return NextResponse.json(
      { error: t("api.tooManyRatings") },
      { status: 429, headers: retryAfter(LIMITS.rating) },
    );
  }
  if (!allow(`rating-ip:${clientKey(request)}`, LIMITS.ratingPerClient)) {
    return NextResponse.json(
      { error: t("api.tooManyRatings") },
      { status: 429, headers: retryAfter(LIMITS.ratingPerClient) },
    );
  }

  /*
   * **Auch ein ausgeblendeter Platz nimmt Stimmen an** (ToDo 8.11). Er ist
   * nicht verschwunden, sondern von Meldungen weggenommen – und genau dort
   * muss ein „doch, den gibt es" ankommen, sonst ist das Ausblenden
   * endgültig und nur noch von der Verwaltung umkehrbar.
   */
  if (!spotByIdAny(id)) {
    return NextResponse.json({ error: t("api.unknownSpot") }, { status: 404 });
  }

  let body: { vote?: unknown };
  try {
    body = (await readJson(request)) as typeof body;
  } catch {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  if (!isVote(body.vote)) {
    return NextResponse.json({ error: t("api.unknownRating") }, { status: 400 });
  }

  const result = castVote(id, user.id, body.vote);

  /*
   * **Jetzt entscheidet die Stimme etwas** (ToDo 8.11): Genug Meldungen
   * blenden den Platz aus, genug Bestätigungen machen aus einem gemeldeten
   * einen gewöhnlichen. Die Begründung, warum das von der alten Festlegung
   * abweicht, steht in `lib/spot-moderation.ts`.
   *
   * **Die Auswertung läuft nach dem Schreiben der Stimme**, nicht davor und
   * nicht in derselben Abfrage: Scheitert sie, ist die Stimme trotzdem
   * gespeichert. Dieselbe Reihenfolge wie bei der Benachrichtigungsmail zu
   * einer Rückmeldung (17.9) – die Hauptsache darf nicht am Nebenwerk hängen.
   */
  const moderation = evaluateSpot(id);

  return NextResponse.json(
    { result, moderation, ...state(id, user.id) },
    { headers: { "Cache-Control": "no-store" } },
  );
}

/**
 * Die eigene Stimme zurückziehen (ToDo 11.4) – ohne Umschalten, in welche
 * Richtung sie auch ging. Der Parkplatz muss dem Bestand **nicht** mehr
 * bekannt sein: Auch eine Stimme auf einen verschwundenen Platz soll sich
 * zurückziehen lassen. Wirkt nur auf das eigene Konto.
 */
async function deleteHandler(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const user = userFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: t("api.ratingNeedsAccount") }, { status: 401 });
  }

  if (!allow(`rating:${user.id}`, LIMITS.rating)) {
    return NextResponse.json(
      { error: t("api.tooManyRatings") },
      { status: 429, headers: retryAfter(LIMITS.rating) },
    );
  }
  if (!allow(`rating-ip:${clientKey(request)}`, LIMITS.ratingPerClient)) {
    return NextResponse.json(
      { error: t("api.tooManyRatings") },
      { status: 429, headers: retryAfter(LIMITS.ratingPerClient) },
    );
  }

  withdrawVote(id, user.id);

  /*
   * Auch das Zurückziehen wird ausgewertet: Fällt der Überhang damit unter die
   * Schwelle, kommt ein automatisch ausgeblendeter Platz zurück. Sonst wäre
   * ein erkannter Irrtum folgenlos – siehe `lib/spot-moderation.ts`.
   */
  const moderation = evaluateSpot(id);

  return NextResponse.json(
    { ok: true, moderation, ...state(id, user.id) },
    { headers: { "Cache-Control": "no-store" } },
  );
}

/*
 * Jede Antwort läuft durch das Protokoll (ToDo 12.6): Status, Dauer und der
 * Pfad **ohne Parameterwerte**. Siehe `lib/log.ts`.
 */
export const GET = withLogging(getHandler);
export const POST = withLogging(postHandler);
export const DELETE = withLogging(deleteHandler);
