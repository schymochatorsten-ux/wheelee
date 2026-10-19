import { NextResponse } from "next/server";
import { castVote, ownVote, ratingSummary } from "@/lib/db/ratings";
import { spotById } from "@/lib/parking/spots";
import { userFromRequest } from "@/lib/auth/session";
import { allow, clientKey, LIMITS } from "@/lib/rate-limit";
import type { RatingVote } from "@/lib/types";

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
  return {
    summary: ratingSummary(spotId),
    myVote: accountId ? ownVote(spotId, accountId) : null,
  };
}

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!spotById(id)) {
    return NextResponse.json({ error: "Unbekannte Parkplatz-ID." }, { status: 404 });
  }

  const user = userFromRequest(request);

  return NextResponse.json(state(id, user?.id ?? null), {
    // Niemals zwischenspeichern: Die Antwort hängt davon ab, wer fragt, und
    // sie ändert sich mit jedem Antippen.
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const user = userFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Zum Bewerten brauchst du ein Konto." }, { status: 401 });
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
      { error: "Zu viele Bewertungen in kurzer Zeit. Bitte etwas warten." },
      { status: 429 },
    );
  }
  if (!allow(`rating-ip:${clientKey(request)}`, LIMITS.ratingPerClient)) {
    return NextResponse.json(
      { error: "Zu viele Bewertungen in kurzer Zeit. Bitte etwas warten." },
      { status: 429 },
    );
  }

  if (!spotById(id)) {
    return NextResponse.json({ error: "Unbekannte Parkplatz-ID." }, { status: 404 });
  }

  let body: { vote?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  if (!isVote(body.vote)) {
    return NextResponse.json({ error: "Unbekannte Bewertung." }, { status: 400 });
  }

  const result = castVote(id, user.id, body.vote);

  return NextResponse.json(
    { result, ...state(id, user.id) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
