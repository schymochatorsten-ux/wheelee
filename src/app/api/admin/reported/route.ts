import { NextResponse } from "next/server";
import { ratingSummary, reportedSpots } from "@/lib/db/ratings";
import { roundWeight, type ReportReason } from "@/lib/ratings/trust";
import { spotByIdAny } from "@/lib/parking/spots";
import { userFromRequest } from "@/lib/auth/session";
import { spotTitle } from "@/lib/parking/display";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";
import { readJson } from "@/lib/read-json";
import { spotPolicy } from "@/lib/db/spot-policy";
import { clearDecision, decideSpot, spotDecision } from "@/lib/db/spot-state";
import { isUncertain, removalThreshold } from "@/lib/parking/certainty";
import { evaluateSpot } from "@/lib/spot-moderation";

/**
 * Parkplätze, die mehrfach als „existiert nicht mehr" gemeldet wurden
 * (ToDo 8.8) – nur für den Administrator.
 *
 *     GET /api/admin/reported?min=2
 *
 * **Das ist die Prüfliste, die aus Bewertungen Datenpflege macht.**
 *
 * **Seit dem 2026-11-13 ist sie nicht mehr die einzige Wirkung der Meldungen**
 * (ToDo 8.11): Genug Meldungen blenden einen Platz von selbst aus. Der frühere
 * Satz an dieser Stelle – „die Bewertungen ändern nichts an den Daten (8.6),
 * kein Parkplatz verschwindet" – gilt nicht mehr; er stand hier, solange die
 * Festlegung aus dem Konzept galt, und ist auf Torstens Anweisung aufgehoben.
 * Die Begründung steht in `lib/spot-moderation.ts`.
 *
 * Diese Liste ist damit zweierlei: der Ort, an dem ein Mensch nachsieht, **und
 * der Nachweis dessen, was die Automatik getan hat** – mit dem Knopf, es
 * zurückzunehmen (`POST`).
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
  /**
   * Gewichtete Summen nach Alter und Konto (11.6) – neben, nicht statt der
   * rohen Zähler. Nur zum Einordnen; ändern nichts an den Daten (8.6).
   */
  goneWeight: number;
  existsWeight: number;
  /** Warum der Parkplatz auf der Liste steht. */
  reasons: ReportReason[];
  lastGoneAt: string | null;
  lastExistsAt: string | null;
  /** Zustand nach den Schwellen (ToDo 8.11). */
  status: "sichtbar" | "hidden" | "kept";
  /** Gilt der Platz als unsicher? Davon hängt die Schwelle ab. */
  uncertain: boolean;
  /** Wie viele Meldungen Überhang ihn entfernen. */
  threshold: number;
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

async function getHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user?.isAdmin) {
    return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });
  }

  const raw = new URL(request.url).searchParams.get("min");
  const parsed = Number.parseInt(raw ?? "", 10);
  const minimum =
    Number.isInteger(parsed) && parsed >= 1 && parsed <= MAX_MINIMUM ? parsed : DEFAULT_MINIMUM;

  const policy = spotPolicy();

  const spots: ReportedSpotView[] = reportedSpots(minimum).map((entry) => {
    const { spotId, goneCount } = entry;
    const summary = ratingSummary(spotId);
    // Ausdrücklich die Suche, die Ausgeblendete findet: Sonst stünde genau bei
    // den Plätzen, die die Automatik weggenommen hat, „nicht im Bestand" – und
    // das heißt hier etwas anderes (siehe unten).
    const spot = spotByIdAny(spotId);
    const decision = spotDecision(spotId);

    return {
      spotId,
      goneCount,
      existsCount: entry.existsCount,
      goneWeight: roundWeight(entry.goneWeight),
      existsWeight: roundWeight(entry.existsWeight),
      reasons: entry.reasons,
      lastGoneAt: summary.lastGoneAt,
      lastExistsAt: summary.lastExistsAt,
      status: decision?.status ?? "sichtbar",
      uncertain: spot ? isUncertain(spot) : true,
      threshold: spot ? removalThreshold(spot, policy) : policy.schwelleSicher,
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
    { spots, minimum, policy },
    // Nicht zwischenspeichern: Die Liste ändert sich mit jeder Bewertung, und
    // sie ist nur für ein Konto bestimmt.
    { headers: { "Cache-Control": "no-store" } },
  );
}

/**
 * Einen Platz von Hand ausblenden, zurückholen oder der Automatik
 * zurückgeben (ToDo 8.11).
 *
 *     POST /api/admin/reported   { spotId, status: "hidden" | "kept" | "auto" }
 *
 * **`kept` ist nicht dasselbe wie `auto`.** `kept` heißt „sichtbar, und die
 * Automatik lässt die Finger davon" – nötig, weil die Stimmen stehen bleiben
 * und die Schwelle sonst sofort wieder greifen würde. `auto` nimmt die
 * Entscheidung ganz zurück, für den Fall, dass sie ein Versehen war.
 */
async function postHandler(request: Request) {
  const user = userFromRequest(request);
  if (!user?.isAdmin) {
    return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });
  }

  let body: { spotId?: unknown; status?: unknown };
  try {
    body = (await readJson(request)) as typeof body;
  } catch {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  const spotId = typeof body.spotId === "string" ? body.spotId : "";
  const status = body.status;
  if (!spotId || (status !== "hidden" && status !== "kept" && status !== "auto")) {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  if (status === "auto") {
    clearDecision(spotId);
    return NextResponse.json(
      { ok: true, status: "sichtbar", moderation: evaluateSpot(spotId) },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const spot = spotByIdAny(spotId);
  const summary = ratingSummary(spotId);
  const decision = decideSpot(
    {
      spotId,
      goneCount: summary.goneCount,
      existsCount: summary.existsCount,
      wasUnsicher: spot ? isUncertain(spot) : true,
    },
    status,
    user.id,
  );

  return NextResponse.json(
    { ok: true, status: decision.status },
    { headers: { "Cache-Control": "no-store" } },
  );
}

/*
 * Jede Antwort läuft durch das Protokoll (ToDo 12.6): Status, Dauer und der
 * Pfad **ohne Parameterwerte**. Siehe `lib/log.ts`.
 */
export const GET = withLogging(getHandler);
export const POST = withLogging(postHandler);
