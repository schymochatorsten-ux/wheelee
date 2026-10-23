"use client";

import { t } from "@/i18n";
import "./globals.css";

/**
 * Der Notfall unter den Fehlerseiten (ToDo 12.6).
 *
 * `error.tsx` fängt alles, was **innerhalb** des Layouts passiert. Reißt das
 * Layout selbst – oder der Rahmen in `layout.tsx` –, greift nur diese Datei,
 * und sie muss deshalb ihr eigenes `<html>` und `<body>` mitbringen.
 *
 * Entsprechend karg: keine Komponenten, keine Schriftarten, kein
 * Dunkelmodus-Skript. Alles, was sie zusätzlich benutzte, wäre eine weitere
 * Sache, die in genau diesem Moment auch kaputt sein könnte.
 */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="de">
      <body className="flex min-h-dvh items-center justify-center p-6 antialiased">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold">{t("globalError.title")}</h1>
          <p className="mt-2 text-sm leading-relaxed">{t("globalError.text")}</p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 min-h-11 rounded-xl bg-blue-700 px-4 font-medium text-white"
          >
            {t("error.retry")}
          </button>
        </div>
      </body>
    </html>
  );
}
