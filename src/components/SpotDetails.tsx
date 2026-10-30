"use client";

import { useEffect, useRef } from "react";
import type { ParkingSpot } from "@/lib/types";
import { formatDistance } from "@/lib/geo";
import { mapsLabel, mapsUrl, type MapsTarget } from "@/lib/navigation";
import { formatTimeRestriction, maxStay, restrictionState } from "@/lib/opening-hours";
import { spotTitle } from "@/lib/parking/display";
import { DataDisclaimer } from "./DataDisclaimer";
import { FeedbackButton } from "./FeedbackButton";
import { RatingButtons } from "./RatingButtons";
import { FavoriteButton } from "./FavoriteButton";
import { ShareButton } from "./ShareButton";
import { useLocale, useT } from "@/i18n/context";
import type { Translate } from "@/i18n";
import { useRich } from "@/i18n/rich";

/**
 * Detailansicht eines Parkplatzes, auf dem Smartphone als Bottom-Sheet.
 *
 * Zeigt laut Konzept Adresse, Entfernung, den Link in die Karten-App und die
 * beiden Bewertungen.
 */

interface SpotDetailsProps {
  spot: ParkingSpot;
  /** Entfernung in Metern, falls ein Standort vorliegt. */
  distanceMeters: number | null;
  /** Name der Stadt, zu der der Parkplatz gehört. */
  cityName: string;
  /** Tag des Imports für diese Stadt (ISO), falls bekannt. */
  importedAt?: string | null;
  mapsTarget: MapsTarget;
  /** Adresse des angemeldeten Kontos – belegt das Rückmeldeformular vor. */
  accountEmail?: string | null;
  onClose: () => void;
}

/**
 * Beschriftung für das Ortsfeld.
 *
 * Nennt die Quelle keinen Stadtteil, setzt der Import den Stadtnamen ein.
 * „Stadtteil: Hamburg" wirkt dann wie ein Fehler. Die Angabe wegzulassen wäre
 * aber auch falsch – bei 84 Städten ist die Stadt eine nützliche Information.
 * Also richtig beschriften statt verstecken.
 */
/**
 * Quellenangabe für die Anzeige aufräumen.
 *
 * GovData nennt die Lizenz oft nicht, und der Import schreibt dann
 * „(nicht angegeben)" in die Quelle. In der Oberfläche ist das eine
 * Verwaltungsnotiz, die niemandem hilft – sie gehört in den Importbericht,
 * nicht vor die Nutzer:innen.
 */
function sourceText(source: string): string {
  return source.replace(/\s*\(nicht angegeben\)\s*$/u, "").trim();
}

function districtLabel(district: string, cityName: string, t: Translate): string {
  // Namen sind deutsch (D-08 / 15.4), also wird auch deutsch verglichen.
  const same = district.toLocaleLowerCase("de-DE") === cityName.toLocaleLowerCase("de-DE");
  return same ? t("details.city") : t("details.district");
}

export function SpotDetails({
  spot,
  distanceMeters,
  cityName,
  importedAt = null,
  mapsTarget,
  accountEmail = null,
  onClose,
}: SpotDetailsProps) {
  const t = useT();
  const locale = useLocale();
  const tr = useRich();
  const closeButton = useRef<HTMLButtonElement>(null);
  const href = mapsUrl(spot, mapsTarget);

  // „24/7“ und „von 00:00 Uhr bis 24:00 Uhr“ sind keine Beschränkungen –
  // als „Nur: 24/7“ gelesen wirken sie aber wie eine.
  const timeRestriction = formatTimeRestriction(spot.timeRestriction, locale);
  const parkingDuration = maxStay(spot.timeRestriction, locale);
  const state = restrictionState(spot.timeRestriction);

  // Fokus in das Sheet holen, damit Tastatur und Screenreader hier weiterarbeiten.
  useEffect(() => {
    closeButton.current?.focus();
  }, [spot.id]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby="spot-details-title"
      className="pointer-events-auto absolute inset-x-0 bottom-0 z-[1000] max-h-[70vh] overflow-y-auto rounded-t-2xl bg-white p-4 pb-6 shadow-[0_-4px_24px_rgba(0,0,0,.18)] sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-96 sm:rounded-2xl dark:bg-neutral-900"
    >
      <div className="flex items-start gap-3">
        <h2 id="spot-details-title" className="flex-1 text-lg leading-snug font-semibold">
          {spotTitle(spot)}
        </h2>
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          aria-label={t("details.close")}
          className="-mt-1 -mr-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-2xl text-neutral-500 hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:hover:bg-neutral-800"
        >
          ×
        </button>
      </div>

      <dl className="mt-3 space-y-1.5 text-sm">
        {spot.note && (
          <div className="flex gap-2">
            <dt className="text-neutral-500">{t("details.note")}</dt>
            <dd>{spot.note}</dd>
          </div>
        )}
        {spot.district && (
          <div className="flex gap-2">
            <dt className="text-neutral-500">{districtLabel(spot.district, cityName, t)}</dt>
            <dd>{spot.district}</dd>
          </div>
        )}
        <div className="flex gap-2">
          <dt className="text-neutral-500">{t("details.spaces")}</dt>
          <dd>{spot.spotCount}</dd>
        </div>
        {/*
          Höchstparkdauer und Zeitfenster sind zwei verschiedene Dinge:
          „2 Stunden" sagt, wie lange man stehen darf, „Mo-Fr 8-18 Uhr", wann
          die Regel gilt. Unter derselben Beschriftung „Nur" gelesen wären sie
          verwechselbar – und wer eine Höchstparkdauer für eine Öffnungszeit
          hält, bekommt ein Knöllchen.
        */}
        {parkingDuration && (
          <div className="flex gap-2">
            <dt className="text-neutral-500">{t("details.maxStay")}</dt>
            <dd>{parkingDuration}</dd>
          </div>
        )}
        {!parkingDuration && timeRestriction && (
          <div className="flex gap-2">
            <dt className="text-neutral-500">{t("details.only")}</dt>
            <dd>{timeRestriction}</dd>
          </div>
        )}
        <div className="flex gap-2">
          <dt className="text-neutral-500">{t("details.distance")}</dt>
          <dd>
            {distanceMeters === null
              ? t("details.noLocation")
              : formatDistance(distanceMeters, locale)}
          </dd>
        </div>
      </dl>

      {/*
        Ob die Beschränkung gerade greift, ist beim Losfahren wichtiger als
        die Öffnungszeit im Kleingedruckten. Wo sich die Angabe nicht sicher
        deuten lässt, steht hier bewusst nichts.
      */}
      {state === "gilt-nicht" && (
        <p className="mt-3 rounded-lg bg-emerald-50 p-2.5 text-sm text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
          {tr("details.restrictionOff", {
            strong: <strong>{t("details.restrictionOffStrong")}</strong>,
          })}
        </p>
      )}
      {state === "gilt" && (
        <p className="mt-3 rounded-lg bg-amber-50 p-2.5 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-200">
          {tr("details.restrictionOn", {
            strong: <strong>{t("details.restrictionOnStrong")}</strong>,
          })}
        </p>
      )}

      {/*
        **Von zwei Quellen bestätigt** (ToDo 3.7).

        Das ist die Angabe, die vor einer vergeblichen Fahrt schützt: Zwei
        unabhängige Quellen – die Liste der Stadtverwaltung und
        OpenStreetMap – kennen diesen Stellplatz an derselben Stelle.

        **Angezeigt wird nur der positive Fall, und das ist eine
        Entscheidung.** „Nur eine Quelle" steht an rund vier von fünf
        Standorten und wäre dort eine Warnung ohne Anlass: Eine amtliche Liste
        ist nicht schlechter, weil OpenStreetMap den Platz nicht kennt. Vor
        allem aber ließe sich „nicht bestätigt" nicht von „noch nie geprüft"
        unterscheiden – erst 23 von 209 Städten haben überhaupt eine zweite
        Quelle, und ein Hinweis bei allen anderen wäre eine Behauptung über
        Daten, die niemand angesehen hat. Das Fehlen dieses Felds ist deshalb
        **keine** Aussage.
      */}
      {spot.confirmation === "bestaetigt" && (
        <p className="mt-3 rounded-lg bg-emerald-50 p-2.5 text-sm text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
          {tr("details.confirmed", { strong: <strong>{t("details.confirmedStrong")}</strong> })}
        </p>
      )}

      {spot.confirmation === "nur_osm" && (
        <p className="mt-3 rounded-lg bg-amber-50 p-2.5 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-200">
          {tr("details.osmOnly", { strong: <strong>{t("details.osmOnlyStrong")}</strong> })}
        </p>
      )}

      {spot.geoAccuracy !== "house" && (
        <p className="mt-3 rounded-lg bg-amber-50 p-2.5 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-200">
          {t("details.approx")}
        </p>
      )}

      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex min-h-12 items-center justify-center rounded-xl bg-blue-700 px-4 font-medium text-white hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {mapsLabel(mapsTarget, locale)}
        </a>
      )}

      <div className="mt-2 space-y-2">
        <ShareButton spot={spot} />
        <FavoriteButton spotId={spot.id} signedIn={accountEmail !== null} />
        {/* Direkt am Parkplatz melden: Nur hier weiß die Meldung, worum es
            geht – die Parkplatz-ID geht mit und spart jede Rückfrage. Genau
            diese ID macht aus einer Meldung später eine Datenkorrektur
            (ToDo 17.1). */}
        <FeedbackButton spot={spot} accountEmail={accountEmail} variant="subtle" />
      </div>

      {/*
        Die Bewertungen (Abschnitt 8, gebaut 2026-10-19).

        **Unter dem Navigationsknopf und über dem Haftungshinweis.** Die
        Reihenfolge ist die der Entscheidung: zuerst hinfahren, dann die
        Frage „gibt es den noch", dann das Kleingedruckte. Wer schon
        losfährt, soll nicht erst an einer Umfrage vorbei.
      */}
      <RatingButtons spotId={spot.id} signedIn={accountEmail !== null} />

      {/* Direkt unter dem Navigationsknopf, nicht am Seitenende: Hier wird
          entschieden, ob jemand losfährt. */}
      <DataDisclaimer importedAt={importedAt} />

      <p className="mt-2 text-xs text-neutral-500">
        {t("details.source", { source: sourceText(spot.source) })}
      </p>
    </aside>
  );
}
