"use client";

import { useEffect, useRef, useState } from "react";
import type { ParkingSpot } from "@/lib/types";
import { FeedbackForm } from "./FeedbackForm";

/**
 * Knopf, der das Rückmeldeformular öffnet (ToDo 17.3).
 *
 * Vorher öffnete er das Mailprogramm. Das ist entfallen – die Begründung steht
 * in `src/lib/feedback.ts`. Was bleibt, ist der Ort: Der Knopf steht in den
 * Einstellungen **und** in der Detailansicht eines Parkplatzes, denn nur dort
 * weiß die Meldung, worum es geht.
 */

interface FeedbackButtonProps {
  /** Betroffener Parkplatz, falls die Meldung aus der Detailansicht kommt. */
  spot?: ParkingSpot | null;
  /** Adresse des angemeldeten Kontos, als Vorbelegung des Feldes. */
  accountEmail?: string | null;
  /** Unauffälligere Darstellung für die Detailansicht. */
  variant?: "primary" | "subtle";
}

export function FeedbackButton({
  spot = null,
  accountEmail = null,
  variant = "primary",
}: FeedbackButtonProps) {
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  /*
   * Fokus hinein und nach dem Schließen zurück auf den Knopf. Ohne das
   * springt die Tastaturbedienung an den Seitenanfang, und wer mit
   * Screenreader arbeitet, erfährt gar nicht, dass sich etwas geöffnet hat.
   */
  useEffect(() => {
    if (!open) return;
    dialog.current?.querySelector<HTMLElement>("button, textarea, input")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => {
    setOpen(false);
    opener.current?.focus();
  };

  const className =
    variant === "primary"
      ? "flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-700 px-4 text-center font-medium text-white hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none"
      : "flex min-h-12 w-full items-center justify-center rounded-xl border border-neutral-300 px-4 text-center font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700";

  return (
    <>
      <button ref={opener} type="button" onClick={() => setOpen(true)} className={className}>
        {spot ? "Fehler zu diesem Parkplatz melden" : "Fehler melden oder Vorschlag schicken"}
      </button>

      {open && (
        <div
          // Über allem, auch über der Detailansicht (z-[1000]) und der Karte:
          // Das Formular ist in diesem Moment die Hauptsache.
          className="fixed inset-0 z-[2000] flex items-end justify-center sm:items-center"
          role="presentation"
        >
          {/* Klick daneben schließt. Ein Formular, das nur über einen kleinen
              Knopf zu verlassen ist, fühlt sich wie eine Falle an. */}
          <div className="absolute inset-0 bg-black/40" onClick={close} aria-hidden="true" />

          <div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-dialog-titel"
            className="relative max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-white p-4 pb-6 shadow-[0_-4px_24px_rgba(0,0,0,.25)] sm:max-w-lg sm:rounded-2xl dark:bg-neutral-900"
          >
            <div className="flex items-start gap-3">
              <h2 id="feedback-dialog-titel" className="flex-1 text-lg font-semibold">
                Rückmeldung
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="Rückmeldung schließen"
                className="-mt-1 -mr-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-2xl text-neutral-500 hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:hover:bg-neutral-800"
              >
                ×
              </button>
            </div>

            <p className="mt-1 mb-4 text-sm text-neutral-600 dark:text-neutral-400">
              Rückmeldungen sind die einzige Quelle, die bemerkt, wenn ein Parkplatz nicht mehr
              existiert oder an der falschen Stelle liegt.
            </p>

            <FeedbackForm
              spot={spot}
              accountEmail={accountEmail}
              initialKind={spot ? "fehler" : undefined}
              onDone={close}
            />
          </div>
        </div>
      )}
    </>
  );
}
