"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useT } from "@/i18n/context";
import { LOCALE_CODES, LOCALES, type Locale } from "@/i18n";
import { writeLanguagePreference } from "@/i18n/preference";
import {
  effectiveMapsPreference,
  MAPS_CHOICES,
  readMapsPreference,
  writeMapsPreference,
  type MapsPreference,
} from "@/lib/maps-preference";
import {
  LOCATION_PREFERENCES,
  writeLocationPreference,
  type LocationPreference,
} from "@/lib/location-preference";
import { mapsShortLabel } from "@/lib/navigation";
import type { MapsTarget } from "@/lib/navigation";
import type { PublicUser } from "@/lib/auth/user";
import type { CityInfo } from "@/lib/parking/spots";
import type { ParkingSpot } from "@/lib/types";
import type { LatLng } from "@/lib/geo";
import { AccountPanel } from "./AccountPanel";
import { SettingsSection } from "./SettingsSection";
import { OfflineCities } from "./OfflineCities";
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
  /** Ob die App den Standort abfragen darf (ToDo 9.25). */
  locationPreference: LocationPreference;
  /** Meldet die geänderte Standortfreigabe nach oben – sie wirkt sofort. */
  onLocationPreferenceChange: (preference: LocationPreference) => void;
  /** Angemeldetes Konto, falls eines besteht. */
  user: PublicUser | null;
  /** Meldet An- und Abmelden nach oben – davon hängen die Reiter ab. */
  onUserChange: (user: PublicUser | null) => void;
  /** Alle Städte – zur Auswahl für das Vorabladen (16.1). */
  cities: readonly CityInfo[];
  /** Einen Parkplatz aus den Listen im Konto auf der Karte zeigen. */
  onShowSpot: (spot: ParkingSpot) => void;
  /** Eigener Standort, falls bekannt (Entfernung bei gespeicherten Parkplätzen). */
  position: LatLng | null;
}

export function SettingsPanel({
  detected,
  cities,
  onMapsPreferenceChange,
  locationPreference,
  onLocationPreferenceChange,
  user,
  onUserChange,
  onShowSpot,
  position,
}: SettingsPanelProps) {
  const t = useT();
  const [preference, setPreference] = useState<MapsPreference | null>(null);
  const locale = useLocale();
  const router = useRouter();

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

  /*
   * Standortfreigabe wählen (ToDo 9.25). Dieselbe Regel wie bei der
   * Karten-App: Lokal gilt sie sofort, der Weg zum Konto läuft nebenher und
   * ohne Fehlermeldung. Es geht nur ein Wort über die Leitung, nie ein
   * Standort.
   */
  const chooseLocation = (next: LocationPreference) => {
    onLocationPreferenceChange(next);
    writeLocationPreference(next);
    if (!user) return;
    void fetch("/api/account/location", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ preference: next }),
    }).catch(() => {});
  };

  /*
   * Sprache wählen (ToDo 15.5). Browser (Speicher und Cookie) zuerst, dann –
   * mit Konto – am Konto, und **erst danach neu laden lassen**: Der Server liest
   * beim Neuholen das Cookie, aber `LanguageSync` stellt bei einem Unterschied
   * zum Konto wieder zurück. Deshalb wird der Kontowert im Zustand der
   * Oberfläche nachgeführt, ehe die Seite neu geholt wird. Fehlschlag am Konto
   * bleibt wie bei der Karten-App still: lokal gilt die Wahl bereits.
   */
  const chooseLanguage = async (next: Locale) => {
    writeLanguagePreference(next);
    if (user) {
      onUserChange({ ...user, language: next });
      await fetch("/api/account/language", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: next }),
      }).catch(() => {});
    }
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <DataDisclaimer variant="lang" />

      {/*
        **Ein Sprung zum Konto, ganz oben** (ToDo 9.23). Der Kontoblock steht
        bewusst zuletzt (Begründung weiter unten), aber über ihm liegen
        inzwischen fünf Blöcke und die Städteliste – rund 2.000 px. Torsten
        suchte am 2026-11-08 auf dem Telefon vergeblich, wo man sich anmeldet.
        Die Zeile verlangt keine Anmeldung, sie zeigt nur, dass es eine gibt.
      */}
      <p className="text-sm">
        <a
          href="#konto"
          className="inline-flex min-h-11 items-center text-blue-800 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300"
        >
          {user ? t("settings.account") : t("account.login")} ↓
        </a>
      </p>

      {/*
        **Der Standort steht vor allem anderen** (ToDo 9.25). Er ist die eine
        Einstellung, von der abhängt, ob die App überhaupt etwas Nützliches
        anzeigt – und die einzige, bei der jemand ein Interesse daran hat, sie
        schnell wiederzufinden.
      */}
      <SettingsSection title={t("settings.location")} description={t("settings.locationNote")}>
        <fieldset>
          <legend className="sr-only">{t("settings.location")}</legend>
          <div className="flex flex-col gap-1">
            {LOCATION_PREFERENCES.map((value) => (
              <label
                key={value}
                className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-2 focus-within:ring-2 focus-within:ring-blue-600"
              >
                <input
                  type="radio"
                  name="standort"
                  value={value}
                  checked={locationPreference === value}
                  onChange={() => chooseLocation(value)}
                  className="h-5 w-5 accent-blue-700"
                />
                <span>{t(value === "on" ? "settings.locationOn" : "settings.locationOff")}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </SettingsSection>

      <SettingsSection title={t("settings.appearance")} description={t("settings.appearanceNote")}>
        <ThemeToggle />
      </SettingsSection>

      <SettingsSection title={t("settings.language")} description={t("settings.languageNote")}>
        <select
          id="sprache-auswahl"
          aria-label={t("settings.languageChoose")}
          value={locale}
          onChange={(event) => void chooseLanguage(event.target.value as Locale)}
          className="min-h-11 w-full rounded-xl border border-neutral-300 bg-white px-3 text-sm focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700 dark:bg-neutral-950"
        >
          {LOCALE_CODES.map((code) => (
            // Der Name steht in der eigenen Sprache und wird nie übersetzt.
            <option key={code} value={code} lang={code}>
              {LOCALES[code].name}
            </option>
          ))}
        </select>
        {LOCALE_CODES.length > 1 && (
          <p className="mt-2 text-xs text-neutral-500">{t("settings.languageUnreviewed")}</p>
        )}
      </SettingsSection>

      <SettingsSection
        title={t("settings.mapsApp")}
        description={t("settings.mapsAppNote", { detected: mapsShortLabel(detected, locale) })}
      >
        <fieldset>
          <legend className="sr-only">{t("settings.mapsAppChoose")}</legend>
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
                <span>{t(choice.label)}</span>
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
        <p className="mt-2 text-xs text-neutral-500">{t("settings.mapsAppDeviceOnly")}</p>
      </SettingsSection>

      <OfflineCities cities={cities} />

      <SettingsSection title={t("settings.feedback")} description={t("settings.feedbackNote")}>
        <FeedbackButton accountEmail={user?.email ?? null} />
      </SettingsSection>

      {/*
        Das Konto steht **zuletzt**, und das ist Absicht: Es ist das, was die
        wenigsten brauchen. Darstellung und Karten-App betreffen jede:n, eine
        Anmeldung niemanden, der nur einen Parkplatz sucht (ToDo 11.2 –
        „Anmeldung so spät wie möglich verlangen").
      */}
      <SettingsSection
        anchor="konto"
        title={t("settings.account")}
        description={t("settings.accountNote")}
      >
        <AccountPanel
          user={user}
          onUserChange={onUserChange}
          onShowSpot={onShowSpot}
          position={position}
        />
      </SettingsSection>

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
        <nav aria-label={t("settings.legal")} className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          <Link
            href="/info"
            className="inline-flex min-h-11 items-center text-blue-800 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300"
          >
            {t("settings.info")}
          </Link>
          {/*
            Das Städteverzeichnis gehört in die Fußzeile und nicht nur in die
            Sitemap (19.17): Erst ein echter Verweis macht aus den 3.700
            Stadtseiten etwas, das eine Suchmaschine für wichtig hält.
          */}
          <Link
            href="/parkplaetze"
            className="inline-flex min-h-11 items-center text-blue-800 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300"
          >
            {t("settings.cities")}
          </Link>
          <Link
            href="/impressum"
            className="inline-flex min-h-11 items-center text-blue-800 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300"
          >
            {t("settings.imprint")}
          </Link>
          <Link
            href="/datenschutz"
            className="inline-flex min-h-11 items-center text-blue-800 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300"
          >
            {t("settings.privacy")}
          </Link>
          <Link
            href="/quellen"
            className="inline-flex min-h-11 items-center text-blue-800 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300"
          >
            {t("settings.sources")}
          </Link>
          <Link
            href="/abdeckung"
            className="inline-flex min-h-11 items-center text-blue-800 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300"
          >
            {t("settings.coverage")}
          </Link>
        </nav>
        {locale !== "de" && (
          <p lang={locale} className="mt-1 text-xs text-neutral-500">
            {t("legal.germanOnly")}
          </p>
        )}
      </footer>
    </div>
  );
}
