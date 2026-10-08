"use client";

import type { ParkingSpot, ParkingSpotWithDistance } from "@/lib/types";
import { formatDistance } from "@/lib/geo";

/**
 * Listenansicht der Parkplätze.
 *
 * Sie ist zweierlei: die Textalternative zur Karte für Screenreader und
 * Tastatur, und der einzige Ort, an dem Parkplätze ohne verlässliche Koordinate
 * überhaupt auftauchen.
 */

interface SpotListProps {
  /** Nach Entfernung sortierte Parkplätze, falls ein Standort vorliegt. */
  nearby: readonly ParkingSpotWithDistance[];
  /** Parkplätze, die nicht verortet werden konnten. */
  unlocated: readonly ParkingSpot[];
  /** Liegt ein echter Nutzerstandort vor, oder wird ab Stadtmitte gerechnet? */
  hasUserPosition: boolean;
  onSelect: (spot: ParkingSpot) => void;
}

function spotLine(spot: ParkingSpot): string {
  const street = [spot.street, spot.houseNumber].filter(Boolean).join(" ");
  return street.length > 0 ? street : spot.label;
}

export function SpotList({ nearby, unlocated, hasUserPosition, onSelect }: SpotListProps) {
  return (
    <div className="space-y-6">
      <section aria-labelledby="nearby-heading">
        <h2 id="nearby-heading" className="text-base font-semibold">
          {hasUserPosition ? "Parkplätze in der Nähe" : "Alle Parkplätze"}
        </h2>
        {!hasUserPosition && (
          <p className="mt-1 text-sm text-neutral-500">
            Ohne Standortfreigabe zählt die Entfernung ab der Stadtmitte.
          </p>
        )}

        <ul className="mt-2 divide-y divide-neutral-200 dark:divide-neutral-800">
          {nearby.map((spot) => (
            <li key={spot.id}>
              <button
                type="button"
                onClick={() => onSelect(spot)}
                className="flex min-h-12 w-full items-center gap-3 py-2.5 text-left focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
              >
                <span className="flex-1">
                  <span className="block font-medium">{spotLine(spot)}</span>
                  <span className="block text-sm text-neutral-500">
                    {spot.district} · {spot.spotCount}{" "}
                    {spot.spotCount === 1 ? "Stellplatz" : "Stellplätze"}
                    {spot.timeRestriction ? ` · ${spot.timeRestriction}` : ""}
                  </span>
                </span>
                <span className="shrink-0 text-sm font-medium tabular-nums">
                  {formatDistance(spot.distanceMeters)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {unlocated.length > 0 && (
        <section aria-labelledby="unlocated-heading">
          <h2 id="unlocated-heading" className="text-base font-semibold">
            Ohne genaue Position ({unlocated.length})
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Für diese Parkplätze nennt die Quelle keine Adresse, die sich eindeutig verorten lässt.
            Sie erscheinen deshalb nicht auf der Karte.
          </p>
          <ul className="mt-2 divide-y divide-neutral-200 dark:divide-neutral-800">
            {unlocated.map((spot) => (
              <li key={spot.id} className="py-2.5">
                <span className="block font-medium">{spot.label}</span>
                <span className="block text-sm text-neutral-500">
                  {spot.district} · {spot.spotCount}{" "}
                  {spot.spotCount === 1 ? "Stellplatz" : "Stellplätze"}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
