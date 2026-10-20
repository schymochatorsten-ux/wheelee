import { NextResponse } from "next/server";
import { ratingSummary, spotsReportedGone } from "@/lib/db/ratings";
import { spotById } from "@/lib/parking/spots";
import { userFromRequest } from "@/lib/auth/session";
import { spotTitle } from "@/lib/parking/display";

/**
 * Parkplätze, die mehrfach als „existiert nicht mehr" gemeldet wurden
 * (ToDo 8.8) – nur für den Administrator.
 *
 *     GET /api/admin/reported?min=2
 *
 * **Das ist die Prüfliste, die aus Bewertungen Datenpflege macht.** Die
 * Bewertungen selbst ändern nichts an den Daten (8.6): Kein Parkplatz
 * verschwindet, egal wie oft er gemeldet wird. Diese Route sagt einem
 * Menschen, wo er nachsehen sollte.
 *
 * **Dieselbe Zugangsregel wie bei den Rückmeldungen** (17.4): ohne
 * Administratorrecht 401 und nicht 403 – auch ein angemeldeter Benutzer muss
 * nicht erfahren, dass es diese Liste gibt. Geprüft wird hier und nicht in der
 * Oberfläche; ein fehlender Reiter ist keine Zugangsprüfung.
 */

/**
 * Wie viele Meldungen einen Parkplatz auf die Liste bringen.
 *
 * Zwei, nicht eine: Eine einzelne Meldung kann ein Fehlgriff sein, ein
 * verwechselter Parkplatz oder jemand, der vor der falschen Hausnummer stand.
 * Zwei verschiedene **Konten** (die Eindeutigkeit der Tabelle macht daraus
 * zwei Menschen) sind ein Hinweis, dem sich Nachsehen lohnt.
 *
 * Nach unten offen bis 1, damit sich die Liste bei Bedarf vollständig ansehen
 * lässt; nach oben begrenzt, weil ein unsinnig großer Wert nur eine leere
 * Liste ergäbe, die wie „nichts gemeldet" aussieht.
 */
const DEFAULT_MINIMUM = 2;
const MAX_MINIMUM = 50;

export interface ReportedSpotView {
  spotId: string;
  goneCount: number;
  /** Gegengewicht: Wie viele haben ihn bestätigt? */
  existsCount: number;
  lastGoneAt: string | null;
  lastExistsAt: string | null;
  /**
   * Die Angaben aus dem Bestand – `null`, wenn es den Parkplatz dort nicht
   * mehr gibt.
   *
   * **Das ist kein Fehlerfall, sondern selbst eine Auskunft:** Ein gemeldeter
   * Platz, der beim nächsten Import verschwunden ist, war wahrscheinlich
   * richtig gemeldet. Ihn aus der Liste zu werfen hieße, die Bestätigung der
   * Meldung zu verschweigen – und der Zählerstand bliebe unerklärt stehen.
   */
  spot: {
    label: string;
    name: string;
    street: string | null;
    district: string;
    city: string;
    spotCount: number;
  } | null;
}

export async function GET(request: Request) {
  const user = userFromRequest(request);
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const raw = new URL(request.url).searchParams.get("min");
  const parsed = Number.parseInt(raw ?? "", 10);
  const minimum =
    Number.isInteger(parsed) && parsed >= 1 && parsed <= MAX_MINIMUM ? parsed : DEFAULT_MINIMUM;

  const spots: ReportedSpotView[] = spotsReportedGone(minimum).map(({ spotId, goneCount }) => {
    const summary = ratingSummary(spotId);
    const spot = spotById(spotId);

    return {
      spotId,
      goneCount,
      existsCount: summary.existsCount,
      lastGoneAt: summary.lastGoneAt,
      lastExistsAt: summary.lastExistsAt,
      spot: spot
        ? {
            label: spot.label,
            name: spotTitle(spot),
            street: spot.street,
            district: spot.district,
            city: spot.city,
            spotCount: spot.spotCount,
          }
        : null,
    };
  });

  return NextResponse.json(
    { spots, minimum },
    // Nicht zwischenspeichern: Die Liste ändert sich mit jeder Bewertung, und
    // sie ist nur für ein Konto bestimmt.
    { headers: { "Cache-Control": "no-store" } },
  );
}
