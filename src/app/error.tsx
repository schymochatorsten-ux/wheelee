"use client";

import Link from "next/link";
import { useT } from "@/i18n/context";

/**
 * Was dasteht, wenn in der Oberfläche etwas abstürzt (ToDo 12.6).
 *
 * **Ohne diese Datei zeigt Next eine weiße Seite** mit „Application error: a
 * client-side exception has occurred" – ein Satz, der niemandem hilft und
 * besonders dem nicht, der gerade im Auto sitzt und einen Parkplatz sucht.
 *
 * Drei Dinge gehören hier hin und sonst nichts: dass es ein Fehler der App ist
 * und nicht der eigenen Bedienung, ein Knopf, der es noch einmal versucht, und
 * ein Weg zurück zur Karte. **Kein Fehlertext für Menschen** – der Stapel sagt
 * ihnen nichts; er steht im Protokoll des Servers, wenn er von dort kam.
 */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  const t = useT();
  return (
    <main className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-md px-4 py-10 text-center">
        <h1 className="text-xl font-semibold">{t("error.title")}</h1>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {t("error.text")}
        </p>

        <div className="mt-6 flex flex-col items-stretch gap-2">
          <button
            type="button"
            onClick={reset}
            className="min-h-11 rounded-xl bg-blue-700 px-4 font-medium text-white hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
          >
            {t("error.retry")}
          </button>
          <Link
            href="/"
            className="min-h-11 content-center rounded-xl border border-neutral-300 px-4 font-medium hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700 dark:hover:bg-neutral-900"
          >
            {t("error.backToMap")}
          </Link>
        </div>
      </div>
    </main>
  );
}
