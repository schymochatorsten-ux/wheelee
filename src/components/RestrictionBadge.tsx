import { useT } from "@/i18n/context";
import type { ParkingSpot } from "@/lib/types";
import { restrictionState } from "@/lib/opening-hours";

/**
 * „Beschränkung gilt jetzt" – das Kennzeichen, das vor einem Knöllchen
 * bewahrt.
 *
 * Stand wortgleich in der Liste und in der Navigationsleiste (ToDo 6.16a).
 * Zwei Kopien derselben Warnung sind eine Kopie zu viel: Wird die Formulierung
 * oder die Farbe an einer Stelle verbessert, bleibt die andere zurück – und
 * zwar unbemerkt, weil beide selten gleichzeitig zu sehen sind.
 *
 * Gezeigt wird sie nur, wenn die Zeitangabe **sicher** gedeutet werden
 * konnte und gerade greift. Im Zweifel steht hier nichts; eine falsch
 * verstandene Zeitangabe ist schlimmer als keine.
 */
export function RestrictionBadge({ spot }: { spot: Pick<ParkingSpot, "timeRestriction"> }) {
  const t = useT();
  if (restrictionState(spot.timeRestriction) !== "gilt") return null;

  return (
    <span className="mt-0.5 inline-block rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-900 dark:bg-amber-950 dark:text-amber-200">
      {t("restriction.nowApplies")}
    </span>
  );
}
