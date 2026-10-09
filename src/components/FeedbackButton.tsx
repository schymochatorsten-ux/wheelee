"use client";

import { useEffect, useState } from "react";
import type { ParkingSpot } from "@/lib/types";
import {
  FEEDBACK_EMAIL,
  FEEDBACK_SUBJECT,
  feedbackMailto,
  hasFeedbackAddress,
} from "@/lib/feedback";

/**
 * Knopf für Rückmeldungen und Fehlermeldungen.
 *
 * Öffnet das E-Mail-Programm mit vorbereitetem Betreff und Text. Solange
 * keine Empfängeradresse feststeht, sagt der Knopf das offen, statt eine Mail
 * ins Leere zu schicken – eine verlorene Fehlermeldung ist schlimmer als ein
 * ehrlicher Hinweis.
 */

interface FeedbackButtonProps {
  /** Betroffener Parkplatz, falls die Meldung aus der Detailansicht kommt. */
  spot?: ParkingSpot | null;
  /** Unauffälligere Darstellung für die Detailansicht. */
  variant?: "primary" | "subtle";
}

export function FeedbackButton({ spot = null, variant = "primary" }: FeedbackButtonProps) {
  const [context, setContext] = useState<{ userAgent?: string; url?: string }>({});

  // Erst nach dem Laden: Auf dem Server gibt es weder `navigator` noch `location`.
  useEffect(() => {
    setContext({ userAgent: navigator.userAgent, url: window.location.href });
  }, []);

  const className =
    variant === "primary"
      ? "flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-700 px-4 text-center font-medium text-white hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none"
      : "flex min-h-12 w-full items-center justify-center rounded-xl border border-neutral-300 px-4 text-center font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700";

  if (!hasFeedbackAddress) {
    return (
      <div className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-200">
        <p className="font-medium">Fehler melden ist noch nicht eingerichtet.</p>
        <p className="mt-1">
          Es fehlt die Empfängeradresse. Sie wird in <code>src/lib/feedback.ts</code> unter{" "}
          <code>FEEDBACK_EMAIL</code> eingetragen; der Betreff steht bereits auf
          {` „${FEEDBACK_SUBJECT}“.`}
        </p>
      </div>
    );
  }

  return (
    <a href={feedbackMailto({ spot, ...context })} className={className}>
      {spot ? "Fehler zu diesem Parkplatz melden" : "Fehler melden oder Rückmeldung geben"}
    </a>
  );
}

/** Nur zur Anzeige, etwa im Einstellungsbereich. */
export const feedbackAddress = FEEDBACK_EMAIL;
