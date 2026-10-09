"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { ParkingSpot } from "@/lib/types";
import {
  distanceMeters,
  findNearest,
  formatDistance,
  hasCoordinates,
  sortByDistance,
} from "@/lib/geo";
import { detectMapsTarget, type MapsTarget } from "@/lib/navigation";
import type { CityInfo } from "@/lib/parking/spots";
import { useGeolocation } from "@/hooks/useGeolocation";
import { MapLegend } from "./MapLegend";
import { NearestBar } from "./NearestBar";
import { SpotDetails } from "./SpotDetails";
import { SpotList } from "./SpotList";

/**
 * Hält Karte, Liste und Detailansicht zusammen: Standort anfragen,
 * nächstgelegenen Parkplatz bestimmen, Auswahl verwalten.
 *
 * Leaflet greift beim Laden auf `window` zu und darf deshalb nicht auf dem
 * Server gerendert werden.
 */
const ParkingMap = dynamic(() => import("./map/ParkingMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <p className="text-sm text-neutral-500">Karte wird geladen …</p>
    </div>
  ),
});

interface MapSectionProps {
  spots: ParkingSpot[];
  cities: CityInfo[];
  /** Stadt, auf die ohne Nutzerstandort zentriert wird. */
  defaultCity: CityInfo;
}

type View = "map" | "list";

/** So viele Parkplätze zeigt die Liste höchstens. */
const LIST_LIMIT = 100;

/**
 * Untertitel im Kopf. Bei wenigen Städten ihre Namen, sonst die Anzahl –
 * 84 Namen nebeneinander wären unlesbar.
 */
function citySubtitle(cities: readonly CityInfo[]): string {
  const names = cities.map((city) => city.name);
  if (names.length === 1) return names[0];
  if (names.length <= 3) return `${names.slice(0, -1).join(", ")} und ${names[names.length - 1]}`;
  return `${names.length} Städte`;
}

export function MapSection({ spots, cities, defaultCity }: MapSectionProps) {
  const center = defaultCity.center;
  const geo = useGeolocation();
  const [selected, setSelected] = useState<ParkingSpot | null>(null);
  const [view, setView] = useState<View>("map");
  const [mapsTarget, setMapsTarget] = useState<MapsTarget>("google");
  const [focus, setFocus] = useState<{ lat: number; lng: number; key: string } | null>(null);

  // Standort direkt anfragen: Der Nutzen der App hängt daran, und der Browser
  // fragt selbst um Erlaubnis.
  useEffect(() => {
    geo.request();
  }, [geo.request]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setMapsTarget(detectMapsTarget(navigator.userAgent));
  }, []);

  const origin = geo.position ?? center;

  const nearest = useMemo(
    () => (geo.position ? findNearest(spots, geo.position) : null),
    [spots, geo.position],
  );

  // Nur die nächsten Parkplätze listen. 13.000 Einträge zu rendern würde das
  // Gerät blockieren, und weiter entfernte helfen beim Parken ohnehin nicht.
  const nearby = useMemo(() => sortByDistance(spots, origin).slice(0, LIST_LIMIT), [spots, origin]);

  const unlocated = useMemo(
    () => spots.filter((spot) => !hasCoordinates(spot)).slice(0, LIST_LIMIT),
    [spots],
  );

  /**
   * Beim ersten Standort auf **den Nutzer** zentrieren, nicht auf den
   * nächstgelegenen Parkplatz.
   *
   * Vorher sprang die Karte zum Parkplatz, und man sah sich selbst nicht mehr.
   * Die erste Frage beim Öffnen ist aber „wo bin ich", nicht „wo ist das Ziel" –
   * zumal der Parkplatz in Sichtweite liegen kann und beides dann ohnehin im
   * Bild ist.
   */
  const centeredOnUser = useRef(false);

  useEffect(() => {
    if (geo.status !== "ready" || !geo.position || centeredOnUser.current) return;
    centeredOnUser.current = true;
    setFocus({ lat: geo.position.lat, lng: geo.position.lng, key: "eigener-standort" });
  }, [geo.status, geo.position]);

  /** Karte zurück auf den eigenen Standort holen. */
  const backToMe = useCallback(() => {
    if (!geo.position) return;
    setView("map");
    setFocus({ lat: geo.position.lat, lng: geo.position.lng, key: `standort-${Date.now()}` });
  }, [geo.position]);

  const select = useCallback((spot: ParkingSpot) => {
    setSelected(spot);
    setView("map");
    if (hasCoordinates(spot)) {
      setFocus({ lat: spot.lat, lng: spot.lng, key: `spot-${spot.id}-${Date.now()}` });
    }
  }, []);

  const selectedDistance =
    selected && geo.position && hasCoordinates(selected)
      ? distanceMeters(geo.position, { lat: selected.lat, lng: selected.lng })
      : null;

  return (
    <div className="flex h-dvh flex-col">
      <header className="shrink-0 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
        <div className="flex items-baseline justify-between gap-3">
          <h1 className="text-lg font-semibold">
            Behindertenparkplätze{" "}
            <span className="block text-sm font-normal text-neutral-500">
              {citySubtitle(cities)}
            </span>
          </h1>
          <div
            role="tablist"
            aria-label="Ansicht wählen"
            className="flex shrink-0 overflow-hidden rounded-lg border border-neutral-300 text-sm dark:border-neutral-700"
          >
            {(["map", "list"] as const).map((option) => (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={view === option}
                onClick={() => setView(option)}
                className={`min-h-11 px-3 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                  view === option
                    ? "bg-blue-700 text-white"
                    : "bg-white text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
                }`}
              >
                {option === "map" ? "Karte" : "Liste"}
              </button>
            ))}
          </div>
        </div>

        <p aria-live="polite" className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400">
          {geo.status === "locating" && "Standort wird ermittelt …"}
          {geo.status === "ready" &&
            (nearest
              ? `Nächster Parkplatz: ${nearest.street ?? nearest.label} – ${formatDistance(nearest.distanceMeters)}`
              : "Kein verorteter Parkplatz in der Nähe.")}
          {geo.message}
          {geo.status === "idle" &&
            `${spots.length.toLocaleString("de-DE")} Parkplätze in ${cities.length} Städten.`}
        </p>

        {(geo.status === "denied" || geo.status === "timeout" || geo.status === "unavailable") && (
          <button
            type="button"
            onClick={geo.request}
            className="mt-2 min-h-11 rounded-lg border border-neutral-300 px-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700"
          >
            Standort erneut versuchen
          </button>
        )}
      </header>

      <main className="relative min-h-0 flex-1">
        {view === "map" ? (
          <>
            <ParkingMap
              spots={spots}
              center={center}
              userPosition={geo.position}
              nearestId={nearest?.id ?? null}
              focus={focus}
              onSelect={select}
            />
            {/* Nur zeigen, solange keine Detailansicht offen ist – sonst
                stünden zwei Navigationsknöpfe übereinander. */}
            {!selected && (
              <NearestBar
                nearest={nearest}
                mapsTarget={mapsTarget}
                hasPosition={geo.position !== null}
                onBackToMe={backToMe}
                onShowDetails={select}
              />
            )}
            <MapLegend />
            {selected && (
              <SpotDetails
                spot={selected}
                distanceMeters={selectedDistance}
                mapsTarget={mapsTarget}
                onClose={() => setSelected(null)}
              />
            )}
          </>
        ) : (
          <div className="h-full overflow-y-auto px-4 py-4">
            <SpotList
              nearby={nearby}
              unlocated={unlocated}
              hasUserPosition={geo.position !== null}
              cities={cities}
              onSelect={select}
            />
          </div>
        )}
      </main>
    </div>
  );
}
