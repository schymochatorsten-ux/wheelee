"use client";

import { useId } from "react";

/**
 * Ein umrahmter Einstellungsblock – die eine Form für **alle** Bereiche, in
 * denen etwas eingestellt wird (ToDo 9.21).
 *
 * **Warum eine gemeinsame Komponente und nicht dieselben Klassen fünfmal.**
 * Bis hierher trug jeder Bereich seinen eigenen Rahmen: Der Reiter
 * „Einstellungen“ hatte Karten (Überschrift innen), die Verwaltung nur dünne
 * Trennlinien, der Mailversand gar nichts. Das war kein Schönheitsfehler,
 * sondern ein Lesbarkeitsproblem: Wo nichts umrahmt ist, sieht man nicht,
 * welche Angabe zu welcher Einstellung gehört – und beim fünften Mal
 * Klassenkopieren weicht ohnehin eine Fassung ab.
 *
 * **Die Überschrift steht über dem Rahmen, nicht darin** (so das Beispiel, das
 * Torsten am 2026-11-08 gezeigt hat). Sie wird damit zur Beschriftung der
 * Gruppe statt zu deren erster Zeile, und zwei Blöcke untereinander sind auf
 * einen Blick zu trennen.
 *
 * **Der Erklärungssatz gehört in den Rahmen**, weil er zum Inhalt gehört und
 * nicht zur Beschriftung.
 */

interface SettingsSectionProps {
  title: string;
  /** Ein Satz, was dieser Block tut. Steht oben im Rahmen. */
  description?: React.ReactNode;
  /**
   * Zusatz rechts neben der Überschrift – etwa ein Zustand („Der Versand
   * läuft“). Steht außerhalb des Rahmens, weil es die Gruppe beschreibt.
   */
  aside?: React.ReactNode;
  children: React.ReactNode;
}

export function SettingsSection({ title, description, aside, children }: SettingsSectionProps) {
  // `useId`, damit zwei Blöcke mit gleichem Titel nicht dieselbe ID tragen –
  // eine doppelte ID macht `aria-labelledby` für Screenreader unbrauchbar.
  const headingId = useId();

  return (
    <section aria-labelledby={headingId}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h2 id={headingId} className="text-base font-semibold">
          {title}
        </h2>
        {aside}
      </div>
      <div className="mt-2 rounded-2xl border border-neutral-200/70 bg-white/70 p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/50">
        {description ? (
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
        ) : null}
        <div className={description ? "mt-3" : undefined}>{children}</div>
      </div>
    </section>
  );
}
