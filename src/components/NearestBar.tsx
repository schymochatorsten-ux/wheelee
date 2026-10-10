"use client";

import { useEffect, useState } from "react";
import type { ParkingSpotWithDistance } from "@/lib/types";
import { formatDistance } from "@/lib/geo";
import { mapsLabel, mapsUrl, type MapsTarget } from "@/lib/navigation";
import { spotTitle } from "@/lib/parking/display";
import { SpotRow } from "./SpotRow";

/**
 * Leiste über der Karte: der nächstgelegene Parkplatz und ein Knopf, der die
 * Navigation dorthin startet.
 *
 * Das ist der kürzeste Weg durch die App – ankommen, Knopf drücken,
 * losfahren. Vorher musste man dafür erst den richtigen Marker auf der Karte
 * finden und antippen.
 *
 * Drei Erweiterungen, die denselben Gedanken fortsetzen:
 *
 * - **Schließbar** (ToDo 6.15). Die Leiste verdeckt auf kleinen Displays rund
 *   ein Fünftel der Karte. Wer die Karte selbst durchsehen will, soll den
 *   Vorschlag loswerden können – aber nicht endgültig: Ein kleiner Knopf holt
 *   ihn zurück, und beim nächsten Öffnen der App ist er wieder da, weil er
 *   dann meist wieder die hilfreichste Anzeige ist.
 * - **Auswahl statt eines einzigen Vorschlags** (ToDo 6.16). Der nächste
 *   Parkplatz kann belegt sein. Wer die Alternativen schon kennt, fährt nicht
 *   zweimal.
 * - **Jeder Eintrag führt auf die Karte** (2026-10-10). Eine Entfernung in
 *   Metern sagt nicht, in welche Richtung – und ob die Hauptstraße dazwischen
 *   liegt. Antippen bringt den Platz ins Bild, mit Luftlinie zum Bezugspunkt,
 *   ohne die Detailansicht darüberzulegen.
 */

interface NearestBarProps {
  /** Die nächstgelegenen Parkplätze, der erste ist der nächste. */
  candidates: readonly ParkingSpotWithDistance[];
  mapsTarget: MapsTarget;
  /** Karte auf den eigenen Standort zurückholen. */
  onBackToMe: () => void;
  /** Details eines Parkplatzes zeigen. */
  onShowDetails: (spot: ParkingSpotWithDistance) => void;
  /** Karte auf einen Parkplatz bringen, ohne die Detailansicht zu öffnen. */
  onJumpTo: (spot: ParkingSpotWithDistance) => void;
  /** Welcher Parkplatz gerade das Ziel ist – die Karte hebt ihn hervor. */
  onTargetChange: (spot: ParkingSpotWithDistance) => void;
  /** Die aufgeklappte Auswahl hebt mehrere Parkplätze gemeinsam hervor. */
  onExpandedChange: (expanded: boolean) => void;
  /** Liegt überhaupt ein Standort vor? */
  hasPosition: boolean;
  /** Name des Reiseziels, falls eines gesetzt ist – sonst `null`. */
  destinationLabel?: string | null;
  /** Gewählter Umkreis um das Ziel in Metern. */
  radius?: number;
  /**
   * Wie viele der `candidates` innerhalb des Umkreises liegen. Die übrigen
   * stehen dahinter und werden als „darüber hinaus" ausgewiesen – sie sind
   * eine Hilfe, aber keine Zusage, dass sie nah genug sind.
   */
  inRadiusCount?: number;
  onRadiusChange?: (meters: number) => void;
}

/** Umkreise, die zur Auswahl stehen (ToDo 6.12). */
const RADIUS_CHOICES = [300, 500, 1000];

function radiusLabel(meters: number): string {
  return meters >= 1000 ? `${meters / 1000} km` : `${meters} m`;
}

/** Zusatzangaben einer Zeile: Entfernung, Stellplätze, Genauigkeit. */
function spotMeta(spot: ParkingSpotWithDistance): string {
  const parts = [formatDistance(spot.distanceMeters)];
  if (spot.spotCount > 1) parts.push(`${spot.spotCount} Stellplätze`);
  if (spot.geoAccuracy !== "house") parts.push("Position ungefähr");
  return parts.join(" · ");
}

/**
 * Die Symbole als Inline-SVG statt als Schriftzeichen.
 *
 * Zeichen wie ◎ und × hängen von der Schriftart des Geräts ab: Auf manchen
 * Android-Telefonen fehlen sie und werden als leeres Rechteck gezeichnet.
 * Ein SVG sieht überall gleich aus und skaliert mit der Schriftgröße mit
 * (`1em`), was bei 200 % Vergrößerung zählt – ToDo 9.8.
 */
const ICON = "h-[1.15em] w-[1.15em]";

function LocateIcon() {
  return (
    <svg className={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="7" strokeWidth="2" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
      <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" strokeWidth="2" />
    </svg>
  );
}

/**
 * Gemeinsame Klassen der runden Nebenknöpfe.
 *
 * `h-11 w-11` bleibt, auch wenn die Leiste schlanker geworden ist: 44 px ist
 * das Maß, das sich einhändig im Auto noch treffen lässt, und genau diese
 * Bedienung ist der Zweck der App (ToDo 14.5). Schlanker heißt hier leichter
 * aussehen, nicht kleiner zu treffen.
 */
const ICON_BUTTON =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:hover:bg-neutral-800 dark:hover:text-neutral-100";

/** Die schwebenden Flächen über der Karte – einheitlich, damit es ruhig wirkt. */
const PANEL =
  "pointer-events-auto rounded-2xl border border-black/5 bg-white/90 shadow-lg ring-1 ring-black/5 backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/90 dark:ring-white/10";

export function NearestBar({
  candidates,
  mapsTarget,
  onBackToMe,
  onShowDetails,
  onJumpTo,
  onTargetChange,
  onExpandedChange,
  hasPosition,
  destinationLabel = null,
  radius = 500,
  inRadiusCount = 0,
  onRadiusChange,
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

  /**
   * Einen Eintrag wählen heißt: Er wird das Navigationsziel **und** die Karte
   * fährt hin. Das war vorher getrennt – man konnte einen Platz auswählen und
   * sah trotzdem weiter den alten Kartenausschnitt, was die Auswahl zu einer
   * Entscheidung ohne Grundlage machte.
   */
  const choose = (spot: ParkingSpotWithDistance) => {
    setTargetId(spot.id);
    onJumpTo(spot);
  };

  // Geschlossen bleibt nur eine schmale Zeile – zusammen mit „zurück zu
  // meinem Standort", damit nicht zwei Knopfreihen über der Karte stehen.
  if (closed) {
    return (
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setClosed(false)}
          className={`${PANEL} flex min-h-11 items-center gap-2 px-4 text-sm font-medium`}
        >
          <span className="text-blue-700 dark:text-blue-400">
            <PinIcon />
          </span>
          {formatDistance(nearest!.distanceMeters)}
        </button>
        <button
          type="button"
          onClick={onBackToMe}
          aria-label="Karte auf meinen Standort zentrieren"
          className={`${PANEL} ${ICON_BUTTON}`}
        >
          <LocateIcon />
        </button>
      </div>
    );
  }

  const href = mapsUrl(target, mapsTarget);
  const alternatives = candidates.slice(1);
  /** Nur bei gesetztem Ziel wird nach Umkreis gruppiert. */
  const grouped = destinationLabel !== null;

  return (
    <div className={`${PANEL} max-h-[46vh] overflow-y-auto p-2.5`}>
      <div className="flex items-start gap-1">
        {/*
          Der ganze Textblock ist der Knopf „auf der Karte zeigen". Das ist die
          große Fläche, die man einhändig trifft – ein eigenes kleines Symbol
          daneben wäre schwerer zu treffen und würde die Leiste verbreitern.
          Das Nadelsymbol rechts zeigt an, dass hier etwas passiert.
        */}
        <button
          type="button"
          onClick={() => onJumpTo(target)}
          className="-m-1 flex min-w-0 flex-1 items-center gap-2 rounded-xl p-1 text-left transition-colors hover:bg-neutral-100/70 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:hover:bg-neutral-800/70"
        >
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-medium tracking-wide text-neutral-500 uppercase">
              {destinationLabel
                ? `Parkplatz bei ${destinationLabel}`
                : target === nearest
                  ? "Nächster Behindertenparkplatz"
                  : "Gewähltes Ziel"}
            </span>
            <span className="block truncate font-semibold">{spotTitle(target)}</span>
            <span className="block text-sm text-neutral-600 dark:text-neutral-400">
              {spotMeta(target)}
            </span>
          </span>
          <span aria-hidden="true" className="shrink-0 text-neutral-400">
            <PinIcon />
          </span>
          <span className="sr-only">Auf der Karte zeigen</span>
        </button>

        <button
          type="button"
          onClick={() => setClosed(true)}
          aria-label="Vorschlag schließen und Karte freigeben"
          className={ICON_BUTTON}
        >
          <CloseIcon />
        </button>
      </div>

      <div className="mt-2.5 flex gap-2">
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 flex-1 items-center justify-center rounded-xl bg-blue-700 px-4 text-center font-medium text-white transition-colors hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {mapsLabel(mapsTarget).replace("In ", "Navigation: ")}
          </a>
        )}
        <button
          type="button"
          onClick={() => onShowDetails(target)}
          className="min-h-12 shrink-0 rounded-xl px-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          Details
        </button>
        <button
          type="button"
          onClick={onBackToMe}
          aria-label="Karte auf meinen Standort zentrieren"
          className={ICON_BUTTON}
        >
          <LocateIcon />
        </button>
      </div>

      {/*
        Umkreis nur bei gesetztem Ziel. Ohne Ziel ist die Frage „was ist am
        nächsten", mit Ziel „was ist nah genug" – und das entscheidet, wer
        hinfährt, nicht die App.
      */}
      {destinationLabel && onRadiusChange && (
        <div className="mt-2 flex items-center gap-2">
          <span id="umkreis-label" className="text-[11px] text-neutral-500 uppercase">
            Umkreis
          </span>
          <div
            role="radiogroup"
            aria-labelledby="umkreis-label"
            className="flex gap-1 rounded-xl bg-neutral-100 p-0.5 text-sm dark:bg-neutral-800"
          >
            {RADIUS_CHOICES.map((meters) => (
              <button
                key={meters}
                type="button"
                role="radio"
                aria-checked={radius === meters}
                onClick={() => onRadiusChange(meters)}
                className={`min-h-10 rounded-lg px-2.5 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                  radius === meters
                    ? "bg-white font-medium text-blue-800 shadow-sm dark:bg-neutral-900 dark:text-blue-300"
                    : "text-neutral-600 dark:text-neutral-400"
                }`}
              >
                {radiusLabel(meters)}
              </button>
            ))}
          </div>
          <span className="text-xs text-neutral-500">
            {inRadiusCount === 0 ? "nichts im Umkreis" : `${inRadiusCount} im Umkreis`}
          </span>
        </div>
      )}

      {alternatives.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setExpanded((previous) => !previous)}
            aria-expanded={expanded}
            aria-controls="parkplatz-auswahl"
            className="mt-2 min-h-11 w-full rounded-xl text-sm font-medium text-blue-800 transition-colors hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300 dark:hover:bg-neutral-800"
          >
            {expanded ? "Auswahl schließen" : `Weitere in der Nähe (${alternatives.length})`}
          </button>

          {/*
            Eigene Höhe für die Liste statt die der ganzen Leiste (ToDo 6.21).
            Vorher durfte die Leiste 60 % des Bildschirms einnehmen, und bei
            34 Treffern im Umkreis – am Hamburger Rathausmarkt ein echter Fall
            – blieb von der Karte fast nichts übrig. Jetzt scrollt die Liste
            für sich, Vorschlag und Navigationsknopf bleiben stehen, und
            darunter ist Karte zu sehen.
          */}
          {expanded && (
            <ul id="parkplatz-auswahl" className="mt-1 max-h-[22vh] overflow-y-auto">
              {candidates.map((spot, index) => (
                <li key={spot.id}>
                  {/*
                    Zwischenüberschriften nur bei gesetztem Ziel. Sie trennen,
                    was im Umkreis liegt, von dem, was knapp dahinter kommt –
                    sonst stünden beide gleichwertig da, und der Umkreis wäre
                    als Aussage wertlos.
                  */}
                  {grouped && index === 0 && inRadiusCount > 0 && (
                    <p className="px-1 pt-2 pb-1 text-[11px] font-medium tracking-wide text-neutral-500 uppercase">
                      Im Umkreis ({radiusLabel(radius)})
                    </p>
                  )}
                  {grouped && index === inRadiusCount && (
                    <p className="px-1 pt-3 pb-1 text-[11px] font-medium tracking-wide text-neutral-500 uppercase">
                      Darüber hinaus
                    </p>
                  )}

                  <SpotRow
                    spot={spot}
                    meta={spotMeta(spot)}
                    selected={spot.id === target.id}
                    actionHint="als Ziel wählen und auf der Karte zeigen"
                    onClick={() => choose(spot)}
                    trailing={
                      <span
                        aria-hidden="true"
                        className={
                          spot.id === target.id
                            ? "text-blue-700 dark:text-blue-400"
                            : "text-neutral-300 dark:text-neutral-600"
                        }
                      >
                        <PinIcon />
                      </span>
                    }
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
