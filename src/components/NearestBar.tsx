"use client";

import type { ParkingSpotWithDistance } from "@/lib/types";
import { formatDistance } from "@/lib/geo";
import { mapsLabel, mapsUrl, type MapsTarget } from "@/lib/navigation";

/**
 * Leiste über der Karte: nächstgelegener Parkplatz und ein Knopf, der die
 * Navigation dorthin startet.
 *
 * Das ist der kürzeste Weg durch die App – ankommen, Knopf drücken, losfahren.
 * Vorher musste man dafür erst den richtigen Marker auf der Karte finden und
 * antippen.
 */

interface NearestBarProps {
  nearest: ParkingSpotWithDistance | null;
  mapsTarget: MapsTarget;
  /** Karte auf den eigenen Standort zurückholen. */
  onBackToMe: () => void;
  /** Details des nächstgelegenen Parkplatzes zeigen. */
  onShowDetails: (spot: ParkingSpotWithDistance) => void;
  /** Liegt überhaupt ein Standort vor? */
  hasPosition: boolean;
}

function spotName(spot: ParkingSpotWithDistance): string {
  const street = [spot.street, spot.houseNumber].filter(Boolean).join(" ");
  return street.length > 0 ? street : spot.label;
}

export function NearestBar({
  nearest,
  mapsTarget,
  onBackToMe,
  onShowDetails,
  hasPosition,
}: NearestBarProps) {
  if (!hasPosition || !nearest) return null;

  const href = mapsUrl(nearest, mapsTarget);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[1000] p-3">
      <div className="pointer-events-auto rounded-xl bg-white/95 p-3 shadow-lg backdrop-blur dark:bg-neutral-900/95">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-neutral-500">Nächster Behindertenparkplatz</p>
            <p className="truncate font-semibold">{spotName(nearest)}</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {formatDistance(nearest.distanceMeters)}
              {nearest.spotCount > 1 ? ` · ${nearest.spotCount} Stellplätze` : ""}
              {nearest.geoAccuracy !== "house" ? " · Position ungefähr" : ""}
            </p>
          </div>

          <button
            type="button"
            onClick={onBackToMe}
            aria-label="Karte auf meinen Standort zentrieren"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-lg focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700"
          >
            <span aria-hidden="true">◎</span>
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
            onClick={() => onShowDetails(nearest)}
            className="min-h-12 shrink-0 rounded-xl border border-neutral-300 px-4 font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
