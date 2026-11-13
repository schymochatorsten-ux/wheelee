"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale, useT } from "@/i18n/context";
import { localeTag, type Locale } from "@/i18n";
import type { ParkingSpot } from "@/lib/types";
import { formatDate } from "./DataDisclaimer";
import { SettingsSection } from "./SettingsSection";
import { secondaryButton } from "./ui/styles";

/**
 * Mehrfach als aufgehoben gemeldete Parkplätze – die Prüfliste (ToDo 8.8).
 *
 * **Der Zweck ist derselbe wie bei den Rückmeldungen: Datenkorrektur.** Ohne
 * diese Ansicht lagen die Meldungen in der Datenbank und niemand erfuhr davon;
 * eine Bewertung, die niemand liest, ist für die Datenpflege wertlos.
 *
 * **Seit dem 2026-11-13 ist die Liste nicht mehr folgenlos** (ToDo 8.11). Hier
 * stand bis dahin: „Eine Bewertung ändert nichts an den Daten (8.6), und das
 * soll so bleiben – kein Parkplatz verschwindet, weil ihn jemand gemeldet
 * hat." Torsten hat das Gegenteil verlangt: Genug Meldungen blenden den Platz
 * aus, bei unsicheren schon wenige. Diese Ansicht zeigt deshalb jetzt auch
 * **den Zustand** und hat die Knöpfe, ihn zu ändern – sie ist vom Hinweis zum
 * Nachweis geworden.
 *
 * Geschützt wird **serverseitig** (`/api/admin/reported` antwortet ohne
 * Administratorrecht mit 401). Dass diese Ansicht nur im Reiter für
 * Administratoren steckt, ist Bequemlichkeit, keine Zugangsprüfung.
 */

interface ReportedSpotView {
  spotId: string;
  goneCount: number;
  existsCount: number;
  goneWeight: number;
  existsWeight: number;
  reasons: ("lastThreeGone" | "reports")[];
  lastGoneAt: string | null;
  lastExistsAt: string | null;
  status: "sichtbar" | "hidden" | "kept";
  uncertain: boolean;
  threshold: number;
  spot: {
    label: string;
    name: string;
    street: string | null;
    district: string;
    city: string;
    spotCount: number;
  } | null;
}

/** Eine Nachkommastelle, mit dem Dezimalzeichen der Sprache. */
function formatWeight(value: number, locale: Locale): string {
  return value.toLocaleString(localeTag(locale), {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

interface ReportedSpotsProps {
  /** Einen gemeldeten Parkplatz auf der Karte zeigen. */
  onShowSpot: (spot: ParkingSpot) => void;
}

export function ReportedSpots({ onShowSpot }: ReportedSpotsProps) {
  const t = useT();
  const locale = useLocale();
  const [spots, setSpots] = useState<ReportedSpotView[]>([]);
  const [minimum, setMinimum] = useState(2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/reported?min=${minimum}`);
      if (response.status === 401) {
        setError(t("admin.unauthorized"));
        setSpots([]);
        return;
      }
      if (!response.ok) {
        setError(t("reported.loadFailed"));
        return;
      }
      const data = (await response.json()) as { spots: ReportedSpotView[] };
      setSpots(data.spots);
    } catch {
      setError(t("admin.noConnection"));
    } finally {
      setLoading(false);
    }
  }, [minimum, t]);

  useEffect(() => {
    void load();
  }, [load]);

  /**
   * Von Hand entscheiden (ToDo 8.11).
   *
   * Danach wird die Liste **neu geladen** und nicht im Browser nachgerechnet:
   * Ob ein Platz nach dem Zurückholen sichtbar bleibt, hängt von den Schwellen
   * und den Stimmen ab – das entscheidet der Server, und nur er kennt den
   * Stand. Ein hier geratener Zustand wäre beim nächsten Laden anders.
   */
  const decide = async (spotId: string, status: "hidden" | "kept" | "auto") => {
    setError(null);
    try {
      const response = await fetch("/api/admin/reported", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spotId, status }),
      });
      if (!response.ok) {
        setError(t("reported.decideFailed"));
        return;
      }
      await load();
    } catch {
      setError(t("admin.noConnection"));
    }
  };

  /** Den gemeldeten Parkplatz holen und auf der Karte zeigen. */
  const showSpot = async (spotId: string) => {
    try {
      const response = await fetch(`/api/spots?id=${encodeURIComponent(spotId)}`);
      if (!response.ok) {
        setError(t("reported.spotGone", { id: spotId }));
        return;
      }
      const data = (await response.json()) as { spot: ParkingSpot };
      onShowSpot(data.spot);
    } catch {
      setError(t("admin.noConnection"));
    }
  };

  return (
    <SettingsSection
      title={t("reported.title")}
      /* „mindestens 1 Meldungen“ stand hier, bis es im Browser auffiel. Kein
         Test hätte das gefunden – geprüft wird der Zählerstand, nicht die
         Grammatik. */
      description={t(minimum === 1 ? "reported.introOne" : "reported.introMany", {
        count: minimum,
      })}
    >
      <div className="space-y-3">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label htmlFor="gemeldet-ab" className="block text-sm font-medium">
              {t("reported.minimum")}
            </label>
            <select
              id="gemeldet-ab"
              value={minimum}
              onChange={(event) => setMinimum(Number(event.target.value))}
              className="mt-1 min-h-11 rounded-xl bg-neutral-200/70 px-2 text-sm dark:bg-neutral-800/70"
            >
              {/* 1 ist bewusst wählbar: Um sich alles anzusehen, was gemeldet
                wurde. Die Vorgabe bleibt 2, weil eine einzelne Meldung auch
                ein Fehlgriff sein kann. */}
              <option value={1}>{t("reported.minimumAll")}</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
            </select>
          </div>
          <button type="button" onClick={() => void load()} className={secondaryButton}>
            {t("admin.reload")}
          </button>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950 dark:text-red-200"
          >
            {error}
          </p>
        )}

        {loading && <p className="text-sm text-neutral-500">{t("admin.loading")}</p>}

        {!loading && spots.length === 0 && !error && (
          <p className="rounded-xl bg-neutral-100/70 p-4 text-sm text-neutral-500 dark:bg-neutral-800/40">
            {t("reported.none")}
          </p>
        )}

        <ul className="space-y-3">
          {spots.map((entry) => (
            <li
              key={entry.spotId}
              className="rounded-xl bg-neutral-100/70 p-3 dark:bg-neutral-800/40"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded bg-amber-100 px-1.5 py-0.5 font-medium text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                  {t("reported.goneCount", { count: entry.goneCount })}
                </span>
                {/*
                Der Gegenwert steht daneben, und zwar nur wenn es ihn gibt:
                Drei Meldungen bei null Bestätigungen sind eine andere Lage als
                drei bei zwanzig. Ohne diese Zahl liest man die Liste als
                Urteil statt als Hinweis.
              */}
                {entry.existsCount > 0 && (
                  <span className="rounded bg-emerald-100 px-1.5 py-0.5 font-medium text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
                    {t("reported.existsCount", { count: entry.existsCount })}
                  </span>
                )}
                {/*
                  Der Zustand steht ganz oben und nicht unten bei den Knöpfen:
                  „ausgeblendet" ändert die Bedeutung aller Zahlen daneben.
                */}
                {entry.status === "hidden" && (
                  <span className="rounded bg-red-100 px-1.5 py-0.5 font-medium text-red-900 dark:bg-red-950 dark:text-red-200">
                    {t("reported.statusHidden")}
                  </span>
                )}
                {entry.status === "kept" && (
                  <span className="rounded bg-blue-100 px-1.5 py-0.5 font-medium text-blue-900 dark:bg-blue-950 dark:text-blue-200">
                    {t("reported.statusKept")}
                  </span>
                )}
                <span className="text-neutral-500">
                  {t(entry.uncertain ? "reported.uncertain" : "reported.certain", {
                    count: entry.threshold,
                  })}
                </span>
                <span className="text-neutral-500">{entry.spotId}</span>
              </div>

              <p className="mt-2 text-sm font-medium">
                {entry.spot ? entry.spot.name : t("reported.notInStock")}
              </p>

              {/* Warum dieser Parkplatz hier steht – sonst liest man die Liste als Urteil. */}
              <ul className="mt-1 space-y-0.5 text-xs" aria-label={t("reported.reasonLabel")}>
                {entry.reasons.map((reason) => (
                  <li key={reason} className="font-medium text-amber-900 dark:text-amber-200">
                    {t(`reported.reason.${reason}`, { count: entry.goneCount })}
                  </li>
                ))}
              </ul>
              <p className="mt-1 text-xs text-neutral-500" title={t("reported.weightedHint")}>
                {t("reported.weighted", {
                  gone: formatWeight(entry.goneWeight, locale),
                  exists: formatWeight(entry.existsWeight, locale),
                })}
              </p>

              <dl className="mt-1 space-y-0.5 text-xs text-neutral-500">
                {entry.spot && (
                  <div className="flex gap-2">
                    <dt>{t("reported.place")}</dt>
                    <dd>
                      {entry.spot.district}
                      {entry.spot.spotCount > 1 &&
                        t("reported.spaces", { count: entry.spot.spotCount })}
                    </dd>
                  </div>
                )}
                {entry.lastGoneAt && (
                  <div className="flex gap-2">
                    <dt>{t("reported.lastReported")}</dt>
                    <dd>{formatDate(entry.lastGoneAt.slice(0, 10), locale)}</dd>
                  </div>
                )}
                {entry.lastExistsAt && (
                  <div className="flex gap-2">
                    <dt>{t("reported.lastConfirmed")}</dt>
                    <dd>{formatDate(entry.lastExistsAt.slice(0, 10), locale)}</dd>
                  </div>
                )}
              </dl>

              {/*
              Ein Parkplatz, den der Bestand nicht mehr kennt, bleibt in der
              Liste stehen – das ist kein Fehlerfall, sondern die
              Bestätigung der Meldung. Nur der Knopf auf die Karte fehlt dann,
              denn es gibt nichts zu zeigen.
            */}
              <div className="mt-2 flex flex-wrap gap-2">
                {entry.spot ? (
                  <button
                    type="button"
                    onClick={() => void showSpot(entry.spotId)}
                    className="min-h-11 rounded-xl bg-neutral-200/80 px-2.5 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:bg-neutral-800"
                  >
                    {t("reported.showOnMap")}
                  </button>
                ) : (
                  <p className="text-xs text-neutral-500">{t("reported.confirmedGone")}</p>
                )}

                {/*
                  **Zurückholen setzt „behalten", nicht „Entscheidung weg".**
                  Die Stimmen bleiben stehen; ohne diesen eigenen Zustand wäre
                  der Platz beim nächsten Durchlauf sofort wieder weg, und der
                  Knopf hätte sichtbar nichts getan. Begründung in
                  `lib/db/spot-state.ts`.
                */}
                {entry.status === "hidden" ? (
                  <button
                    type="button"
                    onClick={() => void decide(entry.spotId, "kept")}
                    className={secondaryButton}
                  >
                    {t("reported.restore")}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => void decide(entry.spotId, "hidden")}
                    className={secondaryButton}
                  >
                    {t("reported.hide")}
                  </button>
                )}

                {entry.status !== "sichtbar" && (
                  <button
                    type="button"
                    onClick={() => void decide(entry.spotId, "auto")}
                    className={secondaryButton}
                    title={t("reported.autoHint")}
                  >
                    {t("reported.auto")}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SettingsSection>
  );
}
