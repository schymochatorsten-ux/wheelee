"use client";

import { useMemo, useState } from "react";
import type { ParkingSpot, ParkingSpotWithDistance } from "@/lib/types";
import { formatDistance } from "@/lib/geo";
import { stripRedundantPrefix } from "@/lib/parking/display";
import type { CityInfo } from "@/lib/parking/spots";
import { formatTimeRestriction } from "@/lib/opening-hours";
import { DataDisclaimer, formatDate } from "./DataDisclaimer";
import { SpotRow } from "./SpotRow";
import { useLocale, useT } from "@/i18n/context";
import { localeTag, type Locale, type Translate } from "@/i18n";
import { useRich } from "@/i18n/rich";
import { STALE_DATA_DAYS } from "@/lib/offline-cities";

function isOld(importedAt: string): boolean {
  return Date.now() - new Date(importedAt).getTime() > STALE_DATA_DAYS * 86_400_000;
}

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

/**
 * Nebenzeile der Liste: Stadtteil, Stellplätze, Beschränkung.
 *
 * Sie unterscheidet sich absichtlich von der Nebenzeile der Auswahl über der
 * Karte: Dort steht die Entfernung an erster Stelle, weil man zwischen nahen
 * Plätzen wählt. Hier steht sie rechts, und der Platz vorn gehört dem
 * Stadtteil – er ordnet den Eintrag ein, wenn man die ganze Stadt durchsieht.
 */
function spaceCount(count: number, t: Translate): string {
  return t(count === 1 ? "list.spacesOne" : "list.spacesMany", { count });
}

function listMeta(spot: ParkingSpotWithDistance, t: Translate, locale: Locale): string {
  const parts = [spot.district, spaceCount(spot.spotCount, t)];
  const restriction = formatTimeRestriction(spot.timeRestriction, locale);
  if (restriction) parts.push(restriction);
  return parts.join(" · ");
}

/** So viele Städte zeigt die Liste auf einmal – bei tausenden wäre sie sonst zäh (ToDo 2e.14). */
const CITY_PAGE = 100;

/**
 * Die vollständige Liste der Städte mit Quelle (ToDo 2e.14).
 *
 * Sie entsteht erst, wenn der Bereich aufgeklappt wird: Ein zugeklapptes
 * `<details>` lässt seinen Inhalt trotzdem im Dokument, und bei tausenden
 * Städten kostet schon das Aufbauen spürbar. Dazu ein Suchfeld, damit man eine
 * Stadt findet, ohne zu blättern.
 */
function CityList({ cities }: { cities: readonly CityInfo[] }) {
  const t = useT();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const sorted = useMemo(
    () => [...cities].sort((a, b) => a.name.localeCompare(b.name, localeTag(locale))),
    [cities, locale],
  );

  const needle = query.trim().toLocaleLowerCase(localeTag(locale));
  const matches = needle
    ? sorted.filter((city) => city.name.toLocaleLowerCase(localeTag(locale)).includes(needle))
    : sorted;
  const shown = matches.slice(0, CITY_PAGE);

  return (
    <details className="mt-2" onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary className="cursor-pointer py-2 font-medium text-neutral-700 dark:text-neutral-300">
        {t("list.allCities", { count: cities.length })}
      </summary>
      {open && (
        <>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label={t("list.cityFilter")}
            placeholder={t("list.cityFilter")}
            className="mt-1 w-full rounded border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
          />
          {shown.length === 0 && <p className="mt-2">{t("list.cityNone")}</p>}
          <ul className="mt-2 space-y-2">
            {shown.map((city) => (
              <li key={city.slug}>
                <span className="font-medium">{city.name}</span>
                {t("list.cityCounts", { spots: city.spotCount, spaces: city.spaceCount })}
                <span className="block">
                  {t("list.source", { source: city.attribution })}
                  {/* 2a.5: Eine fehlende Lizenz offen benennen statt sie zu
                      verschweigen – sie ist ein Mangel der Quelle, und wer
                      die Daten weiterverwenden will, muss davon wissen. */}
                  {city.license === null && t("list.licenseMissing")}
                </span>
                <span className="block">
                  {t("list.dataFrom", { date: formatDate(city.importedAt, locale) })}
                </span>
                {/* 19.7: Die Offline-Ansicht warnte schon bei alten Daten, die
                    Online-Ansicht nicht – dieselbe Grenze, derselbe Text. */}
                {isOld(city.importedAt) && (
                  <span className="block text-amber-800 dark:text-amber-300">
                    {t("offline.staleData")}
                  </span>
                )}
              </li>
            ))}
          </ul>
          {matches.length > shown.length && (
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              {t("list.cityShown", { shown: shown.length, count: matches.length })}
            </p>
          )}
        </>
      )}
    </details>
  );
}

export function SpotList({ nearby, unlocated, hasUserPosition, cities, onSelect }: SpotListProps) {
  const t = useT();
  const locale = useLocale();
  const tr = useRich();
  const crowdsourced = cities.filter((city) => city.coverage === "crowdsourced");
  const official = cities.filter((city) => city.coverage === "official");
  const officialSpaces = official.reduce((sum, city) => sum + city.spaceCount, 0);

  return (
    <div className="space-y-6">
      <DataDisclaimer variant="lang" />

      <section aria-labelledby="nearby-heading">
        <h2 id="nearby-heading" className="text-base font-semibold">
          {hasUserPosition ? t("list.nearby") : t("list.nearest")}
        </h2>
        {!hasUserPosition && (
          <p className="mt-1 text-sm text-neutral-500">{t("list.noLocation")}</p>
        )}

        <ul className="mt-2 divide-y divide-neutral-200 dark:divide-neutral-800">
          {nearby.map((spot) => (
            <li key={spot.id}>
              <SpotRow
                spot={spot}
                meta={listMeta(spot, t, locale)}
                actionHint={t("list.showDetails")}
                onClick={() => onSelect(spot)}
                trailing={
                  <span className="text-sm font-medium tabular-nums">
                    {formatDistance(spot.distanceMeters, locale)}
                  </span>
                }
              />
            </li>
          ))}
        </ul>
      </section>

      {unlocated.length > 0 && (
        <section aria-labelledby="unlocated-heading">
          <h2 id="unlocated-heading" className="text-base font-semibold">
            {t("list.unlocated", { count: unlocated.length })}
          </h2>
          <p className="mt-1 text-sm text-neutral-500">{t("list.unlocatedNote")}</p>
          <ul className="mt-2 divide-y divide-neutral-200 dark:divide-neutral-800">
            {unlocated.map((spot) => (
              <li key={spot.id} className="py-2.5">
                <span className="block font-medium">{stripRedundantPrefix(spot.label)}</span>
                <span className="block text-sm text-neutral-500">
                  {spot.district} · {spaceCount(spot.spotCount, t)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="sources-heading" className="text-sm text-neutral-500">
        <h2 id="sources-heading" className="font-semibold text-neutral-700 dark:text-neutral-300">
          {t("list.sources")}
        </h2>

        <p className="mt-1">
          {t(official.length === 1 ? "list.officialOne" : "list.officialMany", {
            count: official.length,
            spaces: officialSpaces.toLocaleString(localeTag(locale)),
          })}{" "}
          {t(crowdsourced.length === 1 ? "list.crowdsourcedOne" : "list.crowdsourcedMany", {
            count: crowdsourced.length,
          })}
        </p>

        {/* 10.3: Die ODbL verlangt die Namensnennung. Sie steht unter der
            Karte, aber wer die Liste nutzt, sieht die Karte nicht – also auch
            hier, und nicht nur im Kleingedruckten. */}
        <p className="mt-2">
          {tr("list.osmCredit", {
            link: (
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {t("list.osmLink")}
              </a>
            ),
          })}
        </p>

        {/*
          Gemeindenamen und die Auswahl der Städte stammen aus dem amtlichen
          Verzeichnis des Bundesamts für Kartographie und Geodäsie. Dessen
          Lizenz schreibt diesen Vermerk wörtlich vor, einschließlich beider
          Verweise – das ist keine Höflichkeit, sondern Bedingung.
        */}
        <p className="mt-2">
          {tr("list.bkgCredit", {
            bkg: (
              <a
                href="https://www.bkg.bund.de"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                BKG
              </a>
            ),
            license: (
              <a
                href="https://www.govdata.de/dl-de/by-2-0"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                dl-de/by-2-0
              </a>
            ),
          })}
        </p>

        {crowdsourced.length > 0 && <p className="mt-2">{t("list.osmNote")}</p>}

        <CityList cities={cities} />
      </section>
    </div>
  );
}
