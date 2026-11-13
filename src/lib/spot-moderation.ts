import { ratingSummary } from "./db/ratings";
import { spotPolicy, type SpotPolicy } from "./db/spot-policy";
import { clearDecision, hideSpot, spotDecision } from "./db/spot-state";
import { confirmByVotes, userSpotIdOf } from "./db/user-spots";
import { isUncertain, removalThreshold, confirmationThreshold } from "./parking/certainty";
import { spotByIdAny } from "./parking/spots";

/**
 * Was nach einer Stimme mit dem Parkplatz geschieht (ToDo 8.11).
 *
 * **Hier wird die Festlegung aus dem Konzept umgedreht**, auf Torstens
 * Anweisung vom 2026-11-13. Bisher galt: „Die Bewertungen lösen zunächst keine
 * automatischen Änderungen an den Parkplatzdaten aus" (Konzept, Abschnitt 2)
 * und 8.6: kein Parkplatz verschwindet. Jetzt gilt:
 *
 * - Genug Meldungen „existiert nicht mehr" **blenden den Platz aus** – wie
 *   viele, hängt davon ab, ob er als unsicher gilt.
 * - Genug Bestätigungen machen aus einem **gemeldeten** Platz einen
 *   gewöhnlichen.
 *
 * **Die Prüfliste in der Verwaltung bleibt** (`reportedSpots`). Sie ist jetzt
 * nicht mehr die einzige Wirkung der Meldungen, sondern der Nachweis: Dort
 * steht mit Begründung und gewichteten Summen, was die Automatik getan hat,
 * und von dort lässt sich jeder Platz zurückholen.
 *
 * **Diese Funktion läuft bei jeder Stimme, nicht in einem Hintergrundprozess.**
 * Einen solchen hat die App nicht (siehe `db/cleanup.ts`), und sie soll keinen
 * bekommen: Eine Stimme, die erst in der Nacht wirkt, wäre für den, der sie
 * abgibt, ein Knopf ohne Antwort. Es sind zwei Abfragen auf kleinen Tabellen.
 */

export interface ModerationResult {
  /** Ist der Platz jetzt ausgeblendet? */
  hidden: boolean;
  /** Wurde er **durch diese Stimme** ausgeblendet? */
  justHidden: boolean;
  /** Wurde ein gemeldeter Platz **durch diese Stimme** bestätigt? */
  justConfirmed: boolean;
  /** Wie viele Meldungen nötig sind – für die Anzeige („3 von 5"). */
  threshold: number;
  goneCount: number;
  existsCount: number;
  uncertain: boolean;
}

/**
 * Den Zustand eines Parkplatzes nach den Schwellen neu bestimmen.
 *
 * Ohne Nebenwirkung, wenn nichts zu tun ist – die Funktion lässt sich also
 * gefahrlos nach jeder Stimme aufrufen.
 */
export function evaluateSpot(spotId: string, policy: SpotPolicy = spotPolicy()): ModerationResult {
  // Ausdrücklich die Suche, die auch Ausgeblendete findet: Sonst wäre der
  // Rückweg unten unmöglich – ein ausgeblendeter Platz ist für `spotById`
  // nicht vorhanden.
  const spot = spotByIdAny(spotId);
  const summary = ratingSummary(spotId);
  const decision = spotDecision(spotId);

  /*
   * Ein Platz, den die Verwaltung von Hand behalten hat, ist der Automatik
   * entzogen. Sonst hätte „zurückholen" keine Wirkung: Die Stimmen bleiben
   * stehen, die Schwelle wäre beim nächsten Durchlauf wieder überschritten.
   */
  if (decision?.status === "kept") {
    return {
      hidden: false,
      justHidden: false,
      justConfirmed: false,
      threshold: spot ? removalThreshold(spot, policy) : policy.schwelleSicher,
      goneCount: summary.goneCount,
      existsCount: summary.existsCount,
      uncertain: spot ? isUncertain(spot) : true,
    };
  }

  /*
   * Kennt der Bestand den Platz nicht, ist er schon ausgeblendet (dann steht
   * er in `spot_decision`) oder es gibt ihn nicht mehr. In beiden Fällen ist
   * hier nichts zu entscheiden – und **vor allem nichts zu raten**: Ohne den
   * Standort wüssten wir nicht, welche der beiden Schwellen gilt.
   */
  if (!spot) {
    return {
      hidden: decision?.status === "hidden",
      justHidden: false,
      justConfirmed: false,
      threshold: policy.schwelleSicher,
      goneCount: summary.goneCount,
      existsCount: summary.existsCount,
      uncertain: true,
    };
  }

  const uncertain = isUncertain(spot);
  const threshold = removalThreshold(spot, policy);

  /*
   * **Bestätigungen zählen gegen Meldungen.** Fünf „existiert nicht mehr" bei
   * zwölf „existiert" sind kein Beleg für eine Aufhebung, sondern ein Streit –
   * und in einem Streit verschwindet nichts automatisch. Maßgeblich ist der
   * Überhang.
   */
  const ueberhang = summary.goneCount - summary.existsCount;

  /*
   * **Der Rückweg gehört dazu.** Zieht jemand seine Meldung zurück oder
   * bestätigt ein anderer den Platz, sodass der Überhang wieder unter der
   * Schwelle liegt, kommt der Platz zurück – aber **nur**, wenn die Automatik
   * ihn weggenommen hat. Was ein Mensch entschieden hat (`reason: 'admin'`),
   * hebt keine Stimme auf.
   *
   * Ohne diesen Weg wäre eine zurückgezogene Stimme folgenlos: Zwei Leute
   * blenden einen Platz aus, einer merkt seinen Irrtum – und der Platz bliebe
   * trotzdem weg, bis jemand in die Verwaltung schaut. Das wäre eine Falle
   * genau für den sorgfältigen Fall.
   */
  if (decision?.status === "hidden" && decision.reason === "votes" && ueberhang < threshold) {
    clearDecision(spotId);
    return {
      hidden: false,
      justHidden: false,
      justConfirmed: false,
      threshold,
      goneCount: summary.goneCount,
      existsCount: summary.existsCount,
      uncertain,
    };
  }

  let justHidden = false;
  if (ueberhang >= threshold && decision?.status !== "hidden") {
    hideSpot(
      {
        spotId,
        goneCount: summary.goneCount,
        existsCount: summary.existsCount,
        wasUnsicher: uncertain,
      },
      "votes",
    );
    justHidden = true;
  }

  /*
   * Ein gemeldeter Platz wird zum gewöhnlichen, wenn genug Konten ihn
   * bestätigt haben – gemessen an der Schwelle für **gesicherte** Plätze.
   */
  let justConfirmed = false;
  const userSpot = userSpotIdOf(spotId);
  if (userSpot && !justHidden && spot.origin === "gemeldet") {
    const noetig = confirmationThreshold(policy);
    if (summary.existsCount - summary.goneCount >= noetig) {
      justConfirmed = confirmByVotes(userSpot);
    }
  }

  return {
    hidden: justHidden || decision?.status === "hidden",
    justHidden,
    justConfirmed,
    threshold,
    goneCount: summary.goneCount,
    existsCount: summary.existsCount,
    uncertain,
  };
}
