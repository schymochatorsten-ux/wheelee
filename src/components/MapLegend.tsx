"use client";

import { useState } from "react";
import { type MessageKey } from "@/i18n";
import { useT } from "@/i18n/context";

/**
 * Erklärt die Farben der Kartenmarker.
 *
 * Ohne diese Legende bleibt unverständlich, warum manche Marker grau und
 * manche blau sind – und gerade Grau trägt eine wichtige Information: Die
 * Position ist dort nur ungefähr bekannt.
 */

const ENTRIES: { color: string; label: MessageKey; note: MessageKey }[] = [
  { color: "#047857", label: "legend.target", note: "legend.targetNote" },
  { color: "#047857", label: "legend.others", note: "legend.othersNote" },
  { color: "#1d4ed8", label: "legend.exact", note: "legend.exactNote" },
  { color: "#dc2626", label: "legend.approx", note: "legend.approxNote" },
];

export function MapLegend() {
  const t = useT();
  const [open, setOpen] = useState(false);

  return (
    <div className="pointer-events-none absolute right-3 bottom-8 z-[1000] flex flex-col items-end gap-2">
      {open && (
        <div
          id="karten-legende"
          className="pointer-events-auto max-w-72 rounded-xl bg-white/95 p-3 text-sm shadow-lg backdrop-blur dark:bg-neutral-900/95"
        >
          <h2 className="font-semibold">{t("legend.title")}</h2>
          <ul className="mt-2 space-y-2">
            {ENTRIES.map((entry) => (
              <li key={entry.label} className="flex gap-2">
                <span
                  aria-hidden="true"
                  className="mt-1 h-3 w-3 shrink-0 rounded-full"
                  style={{ background: entry.color }}
                />
                <span>
                  <span className="block">{t(entry.label)}</span>
                  <span className="block text-xs text-neutral-500">{t(entry.note)}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-neutral-500">{t("legend.clusters")}</p>
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
        <span className="sr-only">{open ? t("legend.close") : t("legend.open")}</span>
      </button>
    </div>
  );
}
