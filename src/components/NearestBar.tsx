"use client";

import { useEffect, useState } from "react";
import type { ParkingSpotWithDistance } from "@/lib/types";
import { formatDistance } from "@/lib/geo";
import { mapsLabel, mapsUrl, type MapsTarget } from "@/lib/navigation";
import { restrictionState } from "@/lib/opening-hours";
import { spotTitle } from "@/lib/parking/display";

/**
 * Leiste über der Karte: der nächstgelegene Parkplatz und ein Knopf, der die
 * Navigation dorthin startet.
 *
 * Das ist der kürzeste Weg durch die App – ankommen, Knopf drücken,
 * losfahren. Vorher musste man dafür erst den richtigen Marker auf der Karte
 * finden und antippen.
 *
 * Zwei Erweiterungen, die denselben Gedanken fortsetzen:
 *
 * - **Schließbar** (ToDo 6.15). Die Leiste verdeckt auf kleinen Displays rund
 *   ein Fünftel der Karte. Wer die Karte selbst durchsehen will, soll den
 *   Vorschlag loswerden können – aber nicht endgültig: Ein kleiner Knopf holt
 *   ihn zurück, und beim nächsten Öffnen der App ist er wieder da, weil er
 *   dann meist wieder die hilfreichste Anzeige ist.
 * - **Auswahl statt eines einzigen Vorschlags** (ToDo 6.16). Der nächste
 *   Parkplatz kann belegt sein. Wer die Alternativen schon kennt, fährt nicht
 *   zweimal.
 */

interface NearestBarProps {
  /** Die nächstgelegenen Parkplätze, der erste ist der nächste. */
  candidates: readonly ParkingSpotWithDistance[];
  mapsTarget: MapsTarget;
  /** Karte auf den eigenen Standort zurückholen. */
  onBackToMe: () => void;
  /** Details eines Parkplatzes zeigen. */
  onShowDetails: (spot: ParkingSpotWithDistance) => void;
  /** Welcher Parkplatz gerade das Ziel ist – die Karte hebt ihn hervor. */
  onTargetChange: (spot: ParkingSpotWithDistance) => void;
  /** Die aufgeklappte Auswahl hebt mehrere Parkplätze gemeinsam hervor. */
  onExpandedChange: (expanded: boolean) => void;
  /** Liegt überhaupt ein Standort vor? */
  hasPosition: boolean;
}

/** Zusatzangaben einer Zeile: Stellplätze und eine geltende Beschränkung. */
function spotMeta(spot: ParkingSpotWithDistance): string {
  const parts = [formatDistance(spot.distanceMeters)];
  if (spot.spotCount > 1) parts.push(`${spot.spotCount} Stellplätze`);
  if (spot.geoAccuracy !== "house") parts.push("Position ungefähr");
  return parts.join(" · ");
}

export function NearestBar({
  candidates,
  mapsTarget,
  onBackToMe,
  onShowDetails,
  onTargetChange,
  onExpandedChange,
  hasPosition,
}: NearestBarProps) {
  /**
   * Geschlossen und aufgeklappt sind **Sitzungszustand**, bewusst nicht in
   * `localStorage`: Beim nächsten Öffnen ist der Vorschlag wieder die
   * wahrscheinlich hilfreichste Anzeige (ToDo 6.15).
   */
  const [closed, setClosed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);

  const nearest = candidates[0] ?? null;
  const target = candidates.find((spot) => spot.id === targetId) ?? nearest;

  // Läuft man weiter, ändert sich die Reihenfolge. Eine bewusste Auswahl soll
  // das überleben – ein Ziel, das gar nicht mehr in der Liste steht, nicht.
  useEffect(() => {
    if (targetId && !candidates.some((spot) => spot.id === targetId)) setTargetId(null);
  }, [candidates, targetId]);

  useEffect(() => {
    onExpandedChange(expanded && !closed);
  }, [expanded, closed, onExpandedChange]);

  useEffect(() => {
    if (target) onTargetChange(target);
  }, [target, onTargetChange]);

  if (!hasPosition || !target) return null;

  // Geschlossen bleibt nur eine schmale Zeile – zusammen mit „zurück zu
  // meinem Standort", damit nicht zwei Knopfreihen über der Karte stehen.
  if (closed) {
    return (
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1000] flex justify-end gap-2 p-3">
        <button
          type="button"
          onClick={() => setClosed(false)}
          className="pointer-events-auto flex min-h-11 items-center rounded-full bg-white/95 px-4 text-sm font-medium shadow-lg backdrop-blur focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:bg-neutral-900/95"
        >
          Nächster Parkplatz: {formatDistance(nearest!.distanceMeters)}
        </button>
        <button
          type="button"
          onClick={onBackToMe}
          aria-label="Karte auf meinen Standort zentrieren"
          className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/95 text-lg shadow-lg backdrop-blur focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:bg-neutral-900/95"
        >
          <span aria-hidden="true">◎</span>
        </button>
      </div>
    );
  }

  const href = mapsUrl(target, mapsTarget);
  const alternatives = candidates.slice(1);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[1000] p-3">
      <div className="pointer-events-auto rounded-xl bg-white/95 p-3 shadow-lg backdrop-blur dark:bg-neutral-900/95">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-neutral-500">
              {target === nearest ? "Nächster Behindertenparkplatz" : "Gewähltes Ziel"}
            </p>
            <p className="truncate font-semibold">{spotTitle(target)}</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{spotMeta(target)}</p>
          </div>

          <button
            type="button"
            onClick={onBackToMe}
            aria-label="Karte auf meinen Standort zentrieren"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-lg focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700"
          >
            <span aria-hidden="true">◎</span>
          </button>
          <button
            type="button"
            onClick={() => setClosed(true)}
            aria-label="Vorschlag schließen und Karte freigeben"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-2xl text-neutral-500 hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:hover:bg-neutral-800"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="mt-3 flex gap-2">
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 flex-1 items-center justify-center rounded-xl bg-blue-700 px-4 text-center font-medium text-white hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {mapsLabel(mapsTarget).replace("In ", "Navigation: ")}
            </a>
          )}
          <button
            type="button"
            onClick={() => onShowDetails(target)}
            className="min-h-12 shrink-0 rounded-xl border border-neutral-300 px-4 font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700"
          >
            Details
          </button>
        </div>

        {alternatives.length > 0 && (
          <>
            <button
              type="button"
              onClick={() => setExpanded((previous) => !previous)}
              aria-expanded={expanded}
              aria-controls="parkplatz-auswahl"
              className="mt-2 min-h-11 w-full rounded-lg text-sm font-medium text-blue-800 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300 dark:hover:bg-neutral-800"
            >
              {expanded
                ? "Auswahl schließen"
                : `Weitere Parkplätze in der Nähe (${alternatives.length})`}
            </button>

            {expanded && (
              <ul
                id="parkplatz-auswahl"
                className="mt-1 divide-y divide-neutral-200 dark:divide-neutral-800"
              >
                {candidates.map((spot) => (
                  <li key={spot.id}>
                    <button
                      type="button"
                      onClick={() => setTargetId(spot.id)}
                      aria-current={spot.id === target.id}
                      className={`flex min-h-12 w-full items-center gap-2 px-1 py-2 text-left text-sm focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                        spot.id === target.id ? "font-semibold" : ""
                      }`}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate">{spotTitle(spot)}</span>
                        <span className="block text-xs text-neutral-500">{spotMeta(spot)}</span>
                        {/* Dass eine Beschränkung gerade greift, entscheidet
                            mit darüber, welchen Platz man ansteuert. */}
                        {restrictionState(spot.timeRestriction) === "gilt" && (
                          <span className="mt-0.5 inline-block rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                            Beschränkung gilt jetzt
                          </span>
                        )}
                      </span>
                      {spot.id === target.id && (
                        <span aria-hidden="true" className="shrink-0 text-blue-700">
                          ✓
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
