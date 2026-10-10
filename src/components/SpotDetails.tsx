"use client";

import { useEffect, useRef } from "react";
import type { ParkingSpot } from "@/lib/types";
import { formatDistance } from "@/lib/geo";
import { mapsLabel, mapsUrl, type MapsTarget } from "@/lib/navigation";
import { maxStay, normalizeTimeRestriction, restrictionState } from "@/lib/opening-hours";
import { spotTitle } from "@/lib/parking/display";
import { DataDisclaimer } from "./DataDisclaimer";
import { FeedbackButton } from "./FeedbackButton";
import { ShareButton } from "./ShareButton";

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

function districtLabel(district: string, cityName: string): string {
  const same = district.toLocaleLowerCase("de-DE") === cityName.toLocaleLowerCase("de-DE");
  return same ? "Stadt" : "Stadtteil";
}

export function SpotDetails({
  spot,
  distanceMeters,
  cityName,
  importedAt = null,
  mapsTarget,
  onClose,
}: SpotDetailsProps) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const href = mapsUrl(spot, mapsTarget);

  // „24/7“ und „von 00:00 Uhr bis 24:00 Uhr“ sind keine Beschränkungen –
  // als „Nur: 24/7“ gelesen wirken sie aber wie eine.
  const timeRestriction = normalizeTimeRestriction(spot.timeRestriction);
  const parkingDuration = maxStay(spot.timeRestriction);
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
          aria-label="Details schließen"
          className="-mt-1 -mr-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-2xl text-neutral-500 hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:hover:bg-neutral-800"
        >
          ×
        </button>
      </div>

      <dl className="mt-3 space-y-1.5 text-sm">
        {spot.note && (
          <div className="flex gap-2">
            <dt className="text-neutral-500">Hinweis</dt>
            <dd>{spot.note}</dd>
          </div>
        )}
        {spot.district && (
          <div className="flex gap-2">
            <dt className="text-neutral-500">{districtLabel(spot.district, cityName)}</dt>
            <dd>{spot.district}</dd>
          </div>
        )}
        <div className="flex gap-2">
          <dt className="text-neutral-500">Stellplätze</dt>
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
            <dt className="text-neutral-500">Höchstparkdauer</dt>
            <dd>{parkingDuration}</dd>
          </div>
        )}
        {!parkingDuration && timeRestriction && (
          <div className="flex gap-2">
            <dt className="text-neutral-500">Nur</dt>
            <dd>{timeRestriction}</dd>
          </div>
        )}
        <div className="flex gap-2">
          <dt className="text-neutral-500">Entfernung</dt>
          <dd>
            {distanceMeters === null
              ? "Standort nicht freigegeben"
              : formatDistance(distanceMeters)}
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
          Die Beschränkung gilt <strong>gerade nicht</strong> – der Parkplatz ist jetzt frei
          nutzbar.
        </p>
      )}
      {state === "gilt" && (
        <p className="mt-3 rounded-lg bg-amber-50 p-2.5 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-200">
          Die Beschränkung gilt <strong>gerade</strong>.
        </p>
      )}

      {spot.geoAccuracy !== "house" && (
        <p className="mt-3 rounded-lg bg-amber-50 p-2.5 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-200">
          Die Position ist nur ungefähr bekannt – der Parkplatz liegt in dieser Straße, die genaue
          Stelle kann abweichen.
        </p>
      )}

      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex min-h-12 items-center justify-center rounded-xl bg-blue-700 px-4 font-medium text-white hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {mapsLabel(mapsTarget)}
        </a>
      )}

      <div className="mt-2 space-y-2">
        <ShareButton spot={spot} />
        {/* Direkt am Parkplatz melden: Nur hier weiß die Meldung, worum es
            geht – die ID wandert in die Mail und spart jede Rückfrage. */}
        <FeedbackButton spot={spot} variant="subtle" />
      </div>

      {/* Die Bewertungen (Abschnitt 8 der ToDos) brauchen die Datenbank-
          Entscheidung D-02 und folgen danach an dieser Stelle. */}

      {/* Direkt unter dem Navigationsknopf, nicht am Seitenende: Hier wird
          entschieden, ob jemand losfährt. */}
      <DataDisclaimer importedAt={importedAt} />

      <p className="mt-2 text-xs text-neutral-500">Quelle: {sourceText(spot.source)}</p>
    </aside>
  );
}
