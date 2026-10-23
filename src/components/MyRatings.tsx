"use client";

import { useCallback, useState } from "react";
import { useLocale, useT } from "@/i18n/context";
import type { ParkingSpot, RatingVote } from "@/lib/types";
import { formatDate } from "./DataDisclaimer";

/**
 * Die eigenen Bewertungen einsehen und zurückziehen (ToDo 11.4).
 *
 * Steht im Konto-Bereich der Einstellungen und lädt erst beim Aufklappen: Die
 * meisten öffnen die Einstellungen, um etwas anderes zu tun.
 *
 * **Ein Parkplatz, den der Bestand nicht mehr kennt, bleibt in der Liste**
 * (wie in der Prüfliste der Gemeldeten, 8.8): Die Stimme gibt es, und sie soll
 * sich zurückziehen lassen. Nur der Knopf auf die Karte fehlt, denn es gibt
 * nichts zu zeigen.
 */

interface OwnRatingView {
  spotId: string;
  vote: RatingVote;
  at: string;
  spot: { name: string; district: string; city: string; spotCount: number } | null;
}

interface MyRatingsProps {
  /** Einen Parkplatz auf der Karte zeigen. */
  onShowSpot: (spot: ParkingSpot) => void;
}

const SMALL_BUTTON =
  "min-h-11 rounded-lg border border-neutral-300 px-2.5 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none disabled:opacity-60 dark:border-neutral-700";

export function MyRatings({ onShowSpot }: MyRatingsProps) {
  const t = useT();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [ratings, setRatings] = useState<OwnRatingView[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/account/ratings", { cache: "no-store" });
      if (!response.ok) {
        setError(t("myRatings.loadFailed"));
        return;
      }
      const data = (await response.json()) as { ratings: OwnRatingView[] };
      setRatings(data.ratings);
    } catch {
      setError(t("account.offline"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) void load();
  };

  const withdraw = async (spotId: string) => {
    setBusyId(spotId);
    setError(null);
    try {
      const response = await fetch(`/api/spots/${encodeURIComponent(spotId)}/ratings`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? t("myRatings.withdrawFailed"));
        return;
      }
      setRatings((current) => current?.filter((entry) => entry.spotId !== spotId) ?? current);
    } catch {
      setError(t("account.offline"));
    } finally {
      setBusyId(null);
    }
  };

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
      setError(t("account.offline"));
    }
  };

  return (
    <section
      aria-labelledby="meine-bewertungen"
      className="border-t border-neutral-200 pt-3 dark:border-neutral-800"
    >
      <h3 id="meine-bewertungen" className="sr-only">
        {t("myRatings.open")}
      </h3>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="meine-bewertungen-liste"
        className={SMALL_BUTTON}
      >
        {open ? t("myRatings.close") : t("myRatings.open")}
      </button>

      {open && (
        <div id="meine-bewertungen-liste" className="mt-3 space-y-3">
          <p className="text-xs text-neutral-500">{t("myRatings.intro")}</p>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-700 dark:text-red-400">
              {error}
            </p>
          )}

          {loading && <p className="text-sm text-neutral-500">{t("myRatings.loading")}</p>}

          {!loading && ratings?.length === 0 && !error && (
            <p className="text-sm text-neutral-500">{t("myRatings.none")}</p>
          )}

          <ul className="space-y-3">
            {ratings?.map((entry) => {
              const name = entry.spot?.name ?? entry.spotId;
              return (
                <li
                  key={entry.spotId}
                  className="rounded-xl border border-neutral-200 p-3 dark:border-neutral-800"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span
                      className={`rounded px-1.5 py-0.5 font-medium ${
                        entry.vote === "exists"
                          ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
                          : "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200"
                      }`}
                    >
                      {entry.vote === "exists" ? t("rating.exists") : t("rating.gone")}
                    </span>
                    <span className="text-neutral-500">
                      {t("myRatings.date", { date: formatDate(entry.at.slice(0, 10), locale) })}
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-medium">
                    {entry.spot ? name : t("myRatings.notInStock")}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {entry.spot ? entry.spot.district : entry.spotId}
                  </p>
                  {!entry.spot && (
                    <p className="mt-1 text-xs text-neutral-500">{t("myRatings.notInStockNote")}</p>
                  )}

                  <div className="mt-2 flex flex-wrap gap-2">
                    {entry.spot && (
                      <button
                        type="button"
                        onClick={() => void showSpot(entry.spotId)}
                        aria-label={t("myRatings.showLabel", { name })}
                        className={SMALL_BUTTON}
                      >
                        {t("myRatings.showOnMap")}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => void withdraw(entry.spotId)}
                      disabled={busyId === entry.spotId}
                      aria-label={t("myRatings.withdrawLabel", { name })}
                      className={SMALL_BUTTON}
                    >
                      {t("myRatings.withdraw")}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
