"use client";

import type { ReactNode } from "react";
import type { ParkingSpot } from "@/lib/types";
import { spotTitle } from "@/lib/parking/display";
import { RestrictionBadge } from "./RestrictionBadge";

/**
 * Eine Parkplatzzeile – gemeinsam für Listenansicht und Auswahl über der
 * Karte (ToDo 6.16a).
 *
 * Vorher stand dieselbe Zeile zweimal im Quelltext, einmal in `SpotList` und
 * einmal in `NearestBar`. Beim Umbau der Leiste am 2026-10-10 fiel auf, wohin
 * das führt: Die eine Fassung bekam Hervorhebung, Trefferfläche und ein
 * Symbol, die andere blieb stehen – **ohne dass jemand entschieden hätte,
 * dass sie verschieden aussehen sollen.** Genau das ist der Fall, in dem eine
 * gemeinsame Komponente trägt: nicht weil es weniger Zeilen sind, sondern
 * weil der Unterschied dann absichtlich sein muss.
 *
 * Was sich die beiden Stellen **zu Recht** unterscheiden, bleibt beweglich:
 * die Nebenzeile (in der Liste der Stadtteil, in der Leiste die Entfernung)
 * und das, was rechts steht (dort die Entfernung, hier eine Nadel). Alles
 * andere – Überschrift, Aufbau, Trefferfläche, Hinweis auf eine gerade
 * geltende Beschränkung – ist hier und nur hier beschrieben.
 */

interface SpotRowProps {
  spot: ParkingSpot;
  /** Nebenzeile unter der Überschrift, schon fertig zusammengesetzt. */
  meta: string;
  /** Was rechts in der Zeile steht – Entfernung oder Symbol. */
  trailing?: ReactNode;
  /** Ist das gerade das gewählte Ziel? */
  selected?: boolean;
  /**
   * Was der Klick bewirkt, für Screenreader. Sichtbar steht es nicht da, weil
   * die Zeile es zeigt – vorgelesen fehlt es aber.
   */
  actionHint?: string;
  onClick: () => void;
}

export function SpotRow({
  spot,
  meta,
  trailing,
  selected = false,
  actionHint,
  onClick,
}: SpotRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={selected || undefined}
      className={`flex min-h-12 w-full items-center gap-2 rounded-xl px-1.5 py-2 text-left transition-colors hover:bg-neutral-100/70 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:hover:bg-neutral-800/70 ${
        selected ? "bg-blue-50/70 dark:bg-blue-950/40" : ""
      }`}
    >
      <span className="min-w-0 flex-1">
        <span className={`block truncate ${selected ? "font-semibold" : "font-medium"}`}>
          {spotTitle(spot)}
        </span>
        <span className="block text-sm text-neutral-500">{meta}</span>
        {/* Dass eine Beschränkung gerade greift, entscheidet beim Losfahren –
            dafür soll man die Details nicht öffnen müssen. */}
        <RestrictionBadge spot={spot} />
      </span>
      {trailing !== undefined && <span className="shrink-0">{trailing}</span>}
      {actionHint && <span className="sr-only">{actionHint}</span>}
    </button>
  );
}
