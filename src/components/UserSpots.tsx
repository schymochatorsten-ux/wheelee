"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale, useT } from "@/i18n/context";
import { formatDate } from "./DataDisclaimer";
import { SettingsSection } from "./SettingsSection";
import { secondaryButton } from "./ui/styles";

/**
 * Von Nutzer:innen gemeldete Parkplätze – die Liste in der Verwaltung
 * (ToDo 8.11).
 *
 * **Die Automatik ersetzt sie nicht.** Ein gemeldeter Platz wird von selbst
 * zum gewöhnlichen, wenn genug Konten ihn bestätigen; solange aber niemand
 * bewertet, liegt er unbegrenzt als „unsicher" auf der Karte. Das ist kein
 * Fehler – sichtbar und gekennzeichnet ist besser als unsichtbar –, aber wer
 * die Gegend kennt, soll ihn in einem Klick klären können.
 *
 * **Verwerfen ist endgültig gegen Stimmen**, nicht gegen Menschen: Ein
 * verworfener Platz kommt durch Bestätigungen nicht zurück (siehe
 * `confirmByVotes`), ein zweiter Klick auf „bestätigen" holt ihn aber wieder.
 */

interface UserSpotView {
  id: string;
  label: string;
  street: string | null;
  houseNumber: string | null;
  note: string | null;
  city: string;
  lat: number;
  lng: number;
  spotCount: number;
  status: "offen" | "bestaetigt" | "verworfen";
  createdAt: string;
  existsCount: number;
  goneCount: number;
}

export function UserSpots() {
  const t = useT();
  const locale = useLocale();
  const [spots, setSpots] = useState<UserSpotView[]>([]);
  const [needed, setNeeded] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/gemeldet");
      if (response.status === 401) {
        setError(t("admin.unauthorized"));
        setSpots([]);
        return;
      }
      if (!response.ok) {
        setError(t("userSpots.loadFailed"));
        return;
      }
      const data = (await response.json()) as {
        spots: UserSpotView[];
        policy: { schwelleSicher: number };
      };
      setSpots(data.spots);
      setNeeded(data.policy.schwelleSicher);
    } catch {
      setError(t("admin.noConnection"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void load();
  }, [load]);

  const decide = async (id: string, status: "bestaetigt" | "verworfen") => {
    setError(null);
    try {
      const response = await fetch("/api/admin/gemeldet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!response.ok) {
        setError(t("userSpots.decideFailed"));
        return;
      }
      await load();
    } catch {
      setError(t("admin.noConnection"));
    }
  };

  return (
    <SettingsSection
      title={t("userSpots.title")}
      description={t("userSpots.intro", { count: needed })}
    >
      <div className="space-y-3">
        <button type="button" onClick={() => void load()} className={secondaryButton}>
          {t("admin.reload")}
        </button>

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
            {t("userSpots.none")}
          </p>
        )}

        <ul className="space-y-3">
          {spots.map((spot) => (
            <li key={spot.id} className="rounded-xl bg-neutral-100/70 p-3 dark:bg-neutral-800/40">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded bg-neutral-200 px-1.5 py-0.5 font-medium dark:bg-neutral-700">
                  {t(`userSpots.status.${spot.status}`)}
                </span>
                <span className="rounded bg-emerald-100 px-1.5 py-0.5 font-medium text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
                  {t("userSpots.confirmations", { count: spot.existsCount, needed })}
                </span>
                {spot.goneCount > 0 && (
                  <span className="rounded bg-amber-100 px-1.5 py-0.5 font-medium text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                    {t("reported.goneCount", { count: spot.goneCount })}
                  </span>
                )}
                <span className="text-neutral-500">
                  {formatDate(spot.createdAt.slice(0, 10), locale)}
                </span>
              </div>

              <p className="mt-2 text-sm font-medium">{spot.label}</p>
              {spot.note && <p className="text-xs text-neutral-500">{spot.note}</p>}
              <p className="mt-1 text-xs text-neutral-500">
                {t("userSpots.place", {
                  city: spot.city,
                  spaces: spot.spotCount,
                  lat: spot.lat.toFixed(5),
                  lng: spot.lng.toFixed(5),
                })}
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {spot.status !== "bestaetigt" && (
                  <button
                    type="button"
                    onClick={() => void decide(spot.id, "bestaetigt")}
                    className={secondaryButton}
                  >
                    {t("userSpots.approve")}
                  </button>
                )}
                {spot.status !== "verworfen" && (
                  <button
                    type="button"
                    onClick={() => void decide(spot.id, "verworfen")}
                    className={secondaryButton}
                  >
                    {t("userSpots.reject")}
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
