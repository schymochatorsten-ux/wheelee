"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  effectiveMapsPreference,
  MAPS_CHOICES,
  readMapsPreference,
  writeMapsPreference,
  type MapsPreference,
} from "@/lib/maps-preference";
import { mapsShortLabel } from "@/lib/navigation";
import type { MapsTarget } from "@/lib/navigation";
import type { PublicUser } from "@/lib/auth/user";
import { AccountPanel } from "./AccountPanel";
import { DataDisclaimer } from "./DataDisclaimer";
import { FeedbackButton } from "./FeedbackButton";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Einstellungen (ToDo 9.1a).
 *
 * Vorher hing der Dunkelmodus-Umschalter unten in der Listenansicht. Das war
 * erreichbar, aber nicht sein Platz – spätestens mit der Wahl der Karten-App
 * (11.3) sind es zwei Dinge, die nichts mit der Parkplatzliste zu tun haben.
 *
 * **Der ausführliche Haftungshinweis steht seit 2026-10-10 hier.** Er hing
 * ausschließlich oben in der Listenansicht; als die auf Wunsch ausgeblendet
 * wurde, war er nicht mehr erreichbar. Laut 10.5 soll er bewusst an zwei
 * Stellen stehen – ausführlich dort, wo man in Ruhe liest, und knapp in der
 * Detailansicht unter dem Navigationsknopf. Die Einstellungen sind jetzt die
 * Ansicht, in der man in Ruhe liest.
 */

interface SettingsPanelProps {
  /** Was die Geräteerkennung vorschlägt – für die Beschriftung von „auto". */
  detected: MapsTarget;
  /** Meldet eine geänderte Karten-App nach oben, damit sie sofort gilt. */
  onMapsPreferenceChange: (preference: MapsPreference) => void;
  /** Angemeldetes Konto, falls eines besteht. */
  user: PublicUser | null;
  /** Meldet An- und Abmelden nach oben – davon hängen die Reiter ab. */
  onUserChange: (user: PublicUser | null) => void;
}

export function SettingsPanel({
  detected,
  onMapsPreferenceChange,
  user,
  onUserChange,
}: SettingsPanelProps) {
  const [preference, setPreference] = useState<MapsPreference | null>(null);

  // Erst nach dem Laden lesen: Auf dem Server gibt es keinen Speicher, und
  // ein abweichender erster Rendergang führte sonst zu einem Hydrationsfehler.
  // Was am Konto steht, schlägt den Browser (ToDo 11.3a) – die Begründung
  // steht bei `effectiveMapsPreference`.
  useEffect(() => {
    setPreference(effectiveMapsPreference(user?.mapsPreference, readMapsPreference()));
  }, [user?.mapsPreference]);

  const choose = (next: MapsPreference) => {
    setPreference(next);
    writeMapsPreference(next);
    onMapsPreferenceChange(next);

    /*
     * Am Konto ablegen, wenn eines da ist (ToDo 11.3a).
     *
     * **Ohne auf die Antwort zu warten und ohne Fehlermeldung.** Lokal gilt die
     * Wahl bereits; schlägt die Anfrage fehl, ist die Folge, dass sie auf einem
     * anderen Gerät noch nicht gilt – das ist keine Lage, in der man jemanden
     * mit einer roten Meldung aufhalten sollte, während er einen Parkplatz
     * sucht. Beim nächsten Umstellen geht sie ohnehin erneut mit.
     */
    if (!user) return;
    void fetch("/api/account/maps", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ preference: next }),
    }).catch(() => {});
  };

  return (
    <div className="space-y-8">
      <DataDisclaimer variant="lang" />

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

        {/*
          Stand bis zum 2026-10-11 auf „Sobald es Benutzerkonten gibt, lässt
          sie sich geräteübergreifend speichern" – seit es Konten gibt, war
          das eine Zusage, die die App nicht einlöst. Die Auswahl liegt
          weiterhin nur im Browser; sie ins Konto zu übernehmen, steht als
          ToDo 11.3a offen.
        */}
        <p className="mt-2 text-xs text-neutral-500">
          Die Auswahl gilt nur auf diesem Gerät – auch mit Konto.
        </p>
      </section>

      <section aria-labelledby="feedback-heading">
        <h2 id="feedback-heading" className="text-base font-semibold">
          Fehler melden oder Vorschlag schicken
        </h2>
        <p className="mt-1 mb-2 text-sm text-neutral-600 dark:text-neutral-400">
          Stimmt etwas nicht? Fehlt ein Parkplatz oder gibt es einen nicht mehr? Rückmeldungen sind
          die einzige Quelle, die solche Änderungen bemerkt. Wenn du magst, kannst du eine
          E-Mail-Adresse angeben – dann antworten wir dir.
        </p>
        <FeedbackButton accountEmail={user?.email ?? null} />
      </section>

      {/*
        Das Konto steht **zuletzt**, und das ist Absicht: Es ist das, was die
        wenigsten brauchen. Darstellung und Karten-App betreffen jede:n, eine
        Anmeldung niemanden, der nur einen Parkplatz sucht (ToDo 11.2 –
        „Anmeldung so spät wie möglich verlangen").
      */}
      <section aria-labelledby="konto-heading">
        <h2 id="konto-heading" className="text-base font-semibold">
          Konto
        </h2>
        <p className="mt-1 mb-2 text-sm text-neutral-600 dark:text-neutral-400">
          Freiwillig. Die App funktioniert ohne Konto vollständig – auch das Melden von Fehlern. Ein
          Konto merkt sich nur, dass deine Rückmeldungen zusammengehören.
        </p>
        <AccountPanel user={user} onUserChange={onUserChange} />
      </section>

      {/*
        Impressum und Datenschutzerklärung (ToDo 10.2).

        **In den Einstellungen und nicht am Kartenrand**, weil die Karte jeden
        Millimeter braucht (9.15) – und weil hier ohnehin die Ansicht ist, in
        der man liest statt bedient. Erreichbar müssen sie sein, nicht
        aufdringlich: Die Pflicht ist „leicht erkennbar und unmittelbar
        erreichbar", und zwei Antippen von jeder Stelle der App erfüllen das.

        Als normale Links und nicht als Knöpfe: Sie führen auf eine andere
        Seite, sollen sich in einem neuen Tab öffnen lassen und müssen für
        Suchmaschinen als Verweise erkennbar sein.
      */}
      <footer className="border-t border-neutral-200 pt-4 dark:border-neutral-800">
        <nav aria-label="Rechtliches" className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          <Link
            href="/impressum"
            className="inline-flex min-h-11 items-center text-blue-800 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="inline-flex min-h-11 items-center text-blue-800 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300"
          >
            Datenschutzerklärung
          </Link>
        </nav>
      </footer>
    </div>
  );
}
