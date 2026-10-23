"use client";

import { useCallback, useState } from "react";
import { useLocale, useT } from "@/i18n/context";
import { distanceMeters, formatDistance, type LatLng } from "@/lib/geo";
import type { ParkingSpot } from "@/lib/types";

/**
 * Gespeicherte Parkplätze im Konto-Bereich (ToDo 11.5).
 *
 * Wie `MyRatings`: lädt erst beim Aufklappen, ein nicht mehr bekannter Platz
 * bleibt mit Hinweis in der Liste (nur ohne Kartenknopf), und ein Eintrag führt
 * über `onShowSpot` auf die Karte. Die Entfernung ist die Luftlinie vom
 * Standort – und fehlt einfach, wenn keiner vorliegt.
 */

interface FavoriteView {
  spotId: string;
  createdAt: string;
  spot: {
    name: string;
    district: string;
    city: string;
    spotCount: number;
    lat: number | null;
    lng: number | null;
  } | null;
}

interface MyFavoritesProps {
  onShowSpot: (spot: ParkingSpot) => void;
  /** Eigener Standort, falls bekannt. */
  position: LatLng | null;
}

const SMALL_BUTTON =
  "min-h-11 rounded-lg border border-neutral-300 px-2.5 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none disabled:opacity-60 dark:border-neutral-700";

export function MyFavorites({ onShowSpot, position }: MyFavoritesProps) {
  const t = useT();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteView[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/account/favorites", { cache: "no-store" });
      if (!response.ok) {
        setError(t("myFavorites.loadFailed"));
        return;
      }
      const data = (await response.json()) as { favorites: FavoriteView[] };
      setFavorites(data.favorites);
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

  const remove = async (spotId: string) => {
    setBusyId(spotId);
    setError(null);
    try {
      const response = await fetch(`/api/spots/${encodeURIComponent(spotId)}/favorite`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? t("favorite.removeFailed"));
        return;
      }
      setFavorites((current) => current?.filter((entry) => entry.spotId !== spotId) ?? current);
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
      aria-labelledby="meine-favoriten"
      className="border-t border-neutral-200 pt-3 dark:border-neutral-800"
    >
      <h3 id="meine-favoriten" className="sr-only">
        {t("myFavorites.open")}
      </h3>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="meine-favoriten-liste"
        className={SMALL_BUTTON}
      >
        {open ? t("myFavorites.close") : t("myFavorites.open")}
      </button>

      {open && (
        <div id="meine-favoriten-liste" className="mt-3 space-y-3">
          <p className="text-xs text-neutral-500">{t("myFavorites.intro")}</p>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-700 dark:text-red-400">
              {error}
            </p>
          )}

          {loading && <p className="text-sm text-neutral-500">{t("myRatings.loading")}</p>}

          {!loading && favorites?.length === 0 && !error && (
            <p className="text-sm text-neutral-500">{t("myFavorites.none")}</p>
          )}

          <ul className="space-y-3">
            {favorites?.map((entry) => {
              const name = entry.spot?.name ?? entry.spotId;
              const distance =
                position && entry.spot && entry.spot.lat !== null && entry.spot.lng !== null
                  ? formatDistance(
                      distanceMeters(position, { lat: entry.spot.lat, lng: entry.spot.lng }),
                      locale,
                    )
                  : null;
              return (
                <li
                  key={entry.spotId}
                  className="rounded-xl border border-neutral-200 p-3 dark:border-neutral-800"
                >
                  <p className="text-sm font-medium">
                    {entry.spot ? name : t("myFavorites.notInStock")}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {entry.spot ? entry.spot.district : entry.spotId}
                    {distance && ` · ${t("myFavorites.distance", { distance })}`}
                  </p>
                  {!entry.spot && (
                    <p className="mt-1 text-xs text-neutral-500">
                      {t("myFavorites.notInStockNote")}
                    </p>
                  )}

                  <div className="mt-2 flex flex-wrap gap-2">
                    {entry.spot && (
                      <button
                        type="button"
                        onClick={() => void showSpot(entry.spotId)}
                        aria-label={t("myFavorites.showLabel", { name })}
                        className={SMALL_BUTTON}
                      >
                        {t("myFavorites.showOnMap")}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => void remove(entry.spotId)}
                      disabled={busyId === entry.spotId}
                      aria-label={t("myFavorites.removeLabel", { name })}
                      className={SMALL_BUTTON}
                    >
                      {t("myFavorites.remove")}
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
