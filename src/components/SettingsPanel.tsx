"use client";

import { useEffect, useState } from "react";
import {
  MAPS_CHOICES,
  readMapsPreference,
  writeMapsPreference,
  type MapsPreference,
} from "@/lib/maps-preference";
import { mapsShortLabel } from "@/lib/navigation";
import type { MapsTarget } from "@/lib/navigation";
import { FeedbackButton } from "./FeedbackButton";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Einstellungen (ToDo 9.1a).
 *
 * Vorher hing der Dunkelmodus-Umschalter unten in der Listenansicht. Das war
 * erreichbar, aber nicht sein Platz – spätestens mit der Wahl der Karten-App
 * (11.3) sind es zwei Dinge, die nichts mit der Parkplatzliste zu tun haben.
 */

interface SettingsPanelProps {
  /** Was die Geräteerkennung vorschlägt – für die Beschriftung von „auto". */
  detected: MapsTarget;
  /** Meldet eine geänderte Karten-App nach oben, damit sie sofort gilt. */
  onMapsPreferenceChange: (preference: MapsPreference) => void;
}

export function SettingsPanel({ detected, onMapsPreferenceChange }: SettingsPanelProps) {
  const [preference, setPreference] = useState<MapsPreference | null>(null);

  // Erst nach dem Laden lesen: Auf dem Server gibt es keinen Speicher, und
  // ein abweichender erster Rendergang führte sonst zu einem Hydrationsfehler.
  useEffect(() => {
    setPreference(readMapsPreference());
  }, []);

  const choose = (next: MapsPreference) => {
    setPreference(next);
    writeMapsPreference(next);
    onMapsPreferenceChange(next);
  };

  return (
    <div className="space-y-8">
      <section aria-labelledby="darstellung-heading">
        <h2 id="darstellung-heading" className="text-base font-semibold">
          Darstellung
        </h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Dunkel ist die Vorgabe – die App wird oft im Auto und bei Dunkelheit benutzt.
        </p>
        <div className="mt-2">
          <ThemeToggle />
        </div>
      </section>

      <section aria-labelledby="karten-app-heading">
        <h2 id="karten-app-heading" className="text-base font-semibold">
          Karten-App für die Navigation
        </h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Womit {"„Navigation starten“"} geöffnet wird. Ohne eigene Wahl richtet sich das nach dem
          Gerät – hier wäre das {mapsShortLabel(detected)}.
        </p>

        <fieldset className="mt-2">
          <legend className="sr-only">Karten-App wählen</legend>
          <div className="flex flex-col gap-1">
            {MAPS_CHOICES.map((choice) => (
              <label
                key={choice.id}
                className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-2 focus-within:ring-2 focus-within:ring-blue-600"
              >
                <input
                  type="radio"
                  name="karten-app"
                  value={choice.id}
                  checked={preference === choice.id}
                  onChange={() => choose(choice.id)}
                  className="h-5 w-5 accent-blue-700"
                />
                <span>{choice.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <p className="mt-2 text-xs text-neutral-500">
          Die Auswahl gilt nur auf diesem Gerät. Sobald es Benutzerkonten gibt, lässt sie sich
          geräteübergreifend speichern.
        </p>
      </section>

      <section aria-labelledby="feedback-heading">
        <h2 id="feedback-heading" className="text-base font-semibold">
          Fehler melden
        </h2>
        <p className="mt-1 mb-2 text-sm text-neutral-600 dark:text-neutral-400">
          Stimmt etwas nicht? Fehlt ein Parkplatz oder gibt es einen nicht mehr? Rückmeldungen sind
          die einzige Quelle, die solche Änderungen bemerkt.
        </p>
        <FeedbackButton />
      </section>
    </div>
  );
}
