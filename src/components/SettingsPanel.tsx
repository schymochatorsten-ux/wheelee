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
import { writeLocationPreference, type LocationPreference } from "@/lib/location-preference";
import { mapsShortLabel } from "@/lib/navigation";
import type { MapsTarget } from "@/lib/navigation";
import type { PublicUser } from "@/lib/auth/user";
import type { CityInfo } from "@/lib/parking/spots";
import { Chevron, ListGroup, Row, SelectRow, Switch } from "./ui/List";
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
}

export function SettingsPanel({
  detected,
  cities,
  onMapsPreferenceChange,
  locationPreference,
  onLocationPreferenceChange,
  user,
  onUserChange,
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
    <div className="mx-auto max-w-2xl space-y-6">
      <DataDisclaimer variant="lang" />

      {/*
        **Der Standort steht vor allem anderen** (ToDo 9.25). Er ist die eine
        Einstellung, von der abhängt, ob die App überhaupt etwas Nützliches
        anzeigt – und die einzige, bei der jemand ein Interesse daran hat, sie
        schnell wiederzufinden.

        **Ein Schalter statt zweier Auswahlfelder** (ToDo 9.31, Torsten:
        „Slider für an/aus statt 2 Auswahlfelder"). „Standort verwenden" und
        „Nicht verwenden" waren zwei Zeilen für eine Frage mit zwei Antworten;
        ein Schalter ist dieselbe Entscheidung in einem Griff und sagt seinen
        Zustand selbst.
      */}
      <ListGroup title={t("settings.location")} footer={t("settings.locationNote")}>
        <Row label={t("settings.locationOn")}>
          <Switch
            checked={locationPreference === "on"}
            onChange={(next) => chooseLocation(next ? "on" : "off")}
            label={t("settings.locationOn")}
          />
        </Row>
      </ListGroup>

      <ListGroup title={t("settings.appearance")}>
        <Row>
          <ThemeToggle />
        </Row>
      </ListGroup>

      {/*
        **Sprache und Karten-App als Auswahlzeile** (ToDo 9.31): rechts steht,
        was gilt – wie in den Systemapps. Die neun Sprachen als Liste von
        Radioknöpfen hätten einen halben Bildschirm gefüllt, die
        Erklärungssätze darüber den anderen halben. Beides war Text zu einer
        Sache, die sich selbst erklärt.
      */}
      <ListGroup
        title={t("settings.language")}
        footer={LOCALE_CODES.length > 1 ? t("settings.languageUnreviewed") : undefined}
      >
        <SelectRow
          id="sprache-auswahl"
          label={t("settings.language")}
          ariaLabel={t("settings.languageChoose")}
          value={locale}
          onChange={(next) => void chooseLanguage(next)}
          // Der Name steht in der eigenen Sprache und wird nie übersetzt.
          options={LOCALE_CODES.map((code) => ({
            value: code,
            label: LOCALES[code].name,
            lang: code,
          }))}
        />
      </ListGroup>

      <ListGroup title={t("settings.mapsApp")}>
        <SelectRow
          // Die Gruppe heißt „Navigation“, die Zeile nennt die Sache:
          // zweimal dasselbe Wort untereinander sagt nichts.
          label={t("maps.fallback.short")}
          ariaLabel={t("settings.mapsAppChoose")}
          // Vor dem ersten Lesen des Speichers gilt „automatisch" – sonst
          // stünde dort kurz nichts.
          value={preference ?? "auto"}
          onChange={choose}
          options={MAPS_CHOICES.map((item) => ({
            value: item.id,
            label:
              item.id === "auto"
                ? t("settings.mapsAppAuto", { detected: mapsShortLabel(detected, locale) })
                : t(item.label),
          }))}
        />
      </ListGroup>

      <OfflineCities cities={cities} />

      {/*
        `clip={false}`: Das Formular öffnet als Blatt über der Seite und darf
        nicht an der Gruppe abgeschnitten werden.
      */}
      <ListGroup title={t("settings.feedback")} clip={false}>
        <Row>
          <FeedbackButton accountEmail={user?.email ?? null} />
        </Row>
      </ListGroup>

      {/*
        **Das Konto steht seit dem 2026-11-08 nicht mehr hier** (ToDo 9.27).
        Es war der letzte Block – gemessen 1.978 px tief, hinter Darstellung,
        Sprache, Karten-App und der Städteliste. Die Begründung dafür (11.2:
        „Anmeldung so spät wie möglich verlangen") war richtig und ist es
        immer noch; nur war aus „nicht aufdrängen" ein „nicht auffindbar"
        geworden. Jetzt liegt es hinter dem Benutzersymbol oben rechts: nicht
        aufdringlicher als vorher und mit einem Griff erreichbar.
      */}

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

        **Seit 9.31 als Gruppe von Zeilen mit Winkelzeichen** statt als Reihe
        blauer Textlinks: Das Städteverzeichnis (19.17) bleibt dabei ein echter
        Verweis, es sieht nur nicht mehr nach Kleingedrucktem aus.
      */}
      <footer>
        <nav aria-label={t("settings.legal")}>
          <ListGroup
            title={t("settings.legal")}
            footer={
              locale !== "de" ? <span lang={locale}>{t("legal.germanOnly")}</span> : undefined
            }
          >
            {[
              { href: "/info", label: t("settings.info") },
              { href: "/parkplaetze", label: t("settings.cities") },
              { href: "/impressum", label: t("settings.imprint") },
              { href: "/datenschutz", label: t("settings.privacy") },
              { href: "/quellen", label: t("settings.sources") },
              { href: "/abdeckung", label: t("settings.coverage") },
            ].map((entry) => (
              <Link
                key={entry.href}
                href={entry.href}
                className="flex min-h-12 items-center justify-between gap-3 px-4 py-2 text-[15px] focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
              >
                <span>{entry.label}</span>
                <Chevron direction="right" />
              </Link>
            ))}
          </ListGroup>
        </nav>
      </footer>
    </div>
  );
}
