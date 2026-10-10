"use client";

import type { ParkingSpot, ParkingSpotWithDistance } from "@/lib/types";
import { formatDistance } from "@/lib/geo";
import { spotTitle, stripRedundantPrefix } from "@/lib/parking/display";
import type { CityInfo } from "@/lib/parking/spots";
import { normalizeTimeRestriction, restrictionState } from "@/lib/opening-hours";
import { DataDisclaimer, formatDate } from "./DataDisclaimer";

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
  /** Für den Hinweis, wie vollständig die Daten je Stadt sind. */
  cities: readonly CityInfo[];
  onSelect: (spot: ParkingSpot) => void;
}

export function SpotList({ nearby, unlocated, hasUserPosition, cities, onSelect }: SpotListProps) {
  const crowdsourced = cities.filter((city) => city.coverage === "crowdsourced");
  const official = cities.filter((city) => city.coverage === "official");
  const officialSpaces = official.reduce((sum, city) => sum + city.spaceCount, 0);

  return (
    <div className="space-y-6">
      <DataDisclaimer variant="lang" />

      <section aria-labelledby="nearby-heading">
        <h2 id="nearby-heading" className="text-base font-semibold">
          {hasUserPosition ? "Parkplätze in der Nähe" : "Nächste Parkplätze"}
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
                  <span className="block font-medium">{spotTitle(spot)}</span>
                  <span className="block text-sm text-neutral-500">
                    {spot.district} · {spot.spotCount}{" "}
                    {spot.spotCount === 1 ? "Stellplatz" : "Stellplätze"}
                    {normalizeTimeRestriction(spot.timeRestriction)
                      ? ` · ${normalizeTimeRestriction(spot.timeRestriction)}`
                      : ""}
                  </span>
                  {/* Dass eine Beschränkung gerade greift, entscheidet beim
                      Losfahren – dafür soll man die Details nicht öffnen müssen. */}
                  {restrictionState(spot.timeRestriction) === "gilt" && (
                    <span className="mt-0.5 inline-block rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                      Beschränkung gilt jetzt
                    </span>
                  )}
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
                <span className="block font-medium">{stripRedundantPrefix(spot.label)}</span>
                <span className="block text-sm text-neutral-500">
                  {spot.district} · {spot.spotCount}{" "}
                  {spot.spotCount === 1 ? "Stellplatz" : "Stellplätze"}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="sources-heading" className="text-sm text-neutral-500">
        <h2 id="sources-heading" className="font-semibold text-neutral-700 dark:text-neutral-300">
          Woher die Daten kommen
        </h2>

        <p className="mt-1">
          {official.length} {official.length === 1 ? "Stadt stellt" : "Städte stellen"} eine
          amtliche Liste bereit ({officialSpaces.toLocaleString("de-DE")} Stellplätze). Für{" "}
          {crowdsourced.length} weitere{crowdsourced.length === 1 ? " Stadt" : " Städte"} gibt es
          keine, dort stammen die Daten aus OpenStreetMap.
        </p>

        {/* 10.3: Die ODbL verlangt die Namensnennung. Sie steht unter der
            Karte, aber wer die Liste nutzt, sieht die Karte nicht – also auch
            hier, und nicht nur im Kleingedruckten. */}
        <p className="mt-2">
          Kartendarstellung und die meisten Parkplatzdaten:{" "}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            © OpenStreetMap-Mitwirkende
          </a>
          , Open Database License (ODbL). Die amtlichen Quellen sind je Stadt unten einzeln genannt.
        </p>

        {crowdsourced.length > 0 && (
          <p className="mt-2">
            Die OpenStreetMap-Daten zeigen überwiegend Parkplätze mit ausgewiesenen
            Behindertenstellplätzen statt einzelner Stellplätze am Straßenrand und sind
            unvollständig – ein fehlender Eintrag heißt dort nicht, dass es keinen
            Behindertenparkplatz gibt.
          </p>
        )}

        {/* Die vollständige Liste gehört dazu, soll die Seite aber nicht fluten. */}
        <details className="mt-2">
          <summary className="cursor-pointer py-2 font-medium text-neutral-700 dark:text-neutral-300">
            Alle {cities.length} Städte mit Quelle
          </summary>
          <ul className="mt-1 space-y-2">
            {[...cities]
              .sort((a, b) => a.name.localeCompare(b.name, "de-DE"))
              .map((city) => (
                <li key={city.slug}>
                  <span className="font-medium">{city.name}</span>: {city.spotCount} Standorte,{" "}
                  {city.spaceCount} Stellplätze
                  <span className="block">
                    Quelle: {city.attribution}
                    {/* 2a.5: Eine fehlende Lizenz offen benennen statt sie zu
                        verschweigen – sie ist ein Mangel der Quelle, und wer
                        die Daten weiterverwenden will, muss davon wissen. */}
                    {city.license === null && " · Lizenz nicht angegeben"}
                  </span>
                  <span className="block">Daten vom {formatDate(city.importedAt)}</span>
                </li>
              ))}
          </ul>
        </details>
      </section>
    </div>
  );
}
