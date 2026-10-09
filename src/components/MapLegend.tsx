"use client";

import { useState } from "react";

/**
 * Erklärt die Farben der Kartenmarker.
 *
 * Ohne diese Legende bleibt unverständlich, warum manche Marker grau und
 * manche blau sind – und gerade Grau trägt eine wichtige Information: Die
 * Position ist dort nur ungefähr bekannt.
 */

const ENTRIES = [
  {
    color: "#047857",
    label: "Nächstgelegener Parkplatz",
    note: "größer dargestellt",
  },
  {
    color: "#1d4ed8",
    label: "Parkplatz, Position genau",
    note: "Koordinate aus der Quelle",
  },
  {
    color: "#dc2626",
    label: "Parkplatz, Position ungefähr",
    note: "liegt in dieser Straße, die genaue Stelle kann abweichen",
  },
];

export function MapLegend() {
  const [open, setOpen] = useState(false);

  return (
    <div className="pointer-events-none absolute right-3 bottom-8 z-[1000] flex flex-col items-end gap-2">
      {open && (
        <div
          id="karten-legende"
          className="pointer-events-auto max-w-72 rounded-xl bg-white/95 p-3 text-sm shadow-lg backdrop-blur dark:bg-neutral-900/95"
        >
          <h2 className="font-semibold">Was die Farben bedeuten</h2>
          <ul className="mt-2 space-y-2">
            {ENTRIES.map((entry) => (
              <li key={entry.label} className="flex gap-2">
                <span
                  aria-hidden="true"
                  className="mt-1 h-3 w-3 shrink-0 rounded-full"
                  style={{ background: entry.color }}
                />
                <span>
                  <span className="block">{entry.label}</span>
                  <span className="block text-xs text-neutral-500">{entry.note}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-neutral-500">
            Kreise mit Zahl fassen mehrere Parkplätze zusammen – hineinzoomen zeigt sie einzeln.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-controls="karten-legende"
        className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-lg font-semibold shadow-lg backdrop-blur focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:bg-neutral-900/95"
      >
        <span aria-hidden="true">?</span>
        <span className="sr-only">{open ? "Legende schließen" : "Legende der Kartenfarben"}</span>
      </button>
    </div>
  );
}
