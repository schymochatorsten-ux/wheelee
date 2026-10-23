"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/context";

/**
 * Parkplatz speichern (ToDo 11.5): der Stern in der Detailansicht.
 *
 * **Setzt ein Konto voraus, wie das Bewerten (8.3).** Ohne Konto steht der
 * Knopf abgeschaltet da und der Grund daneben – ein Knopf, der fehlt, wirkt
 * kaputt; man sucht ihn. Die eigentliche Prüfung sitzt am Endpunkt, der Knopf
 * ist nur die Höflichkeit davor.
 */

interface FavoriteButtonProps {
  spotId: string;
  signedIn: boolean;
}

export function FavoriteButton({ spotId, signedIn }: FavoriteButtonProps) {
  const t = useT();
  /** `null`: noch nicht geladen – dann ist der Knopf abgeschaltet, nicht falsch. */
  const [favorite, setFavorite] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let aktuell = true;
    setFavorite(null);
    setError(null);
    if (!signedIn) return;

    (async () => {
      try {
        const response = await fetch(`/api/spots/${encodeURIComponent(spotId)}/favorite`, {
          cache: "no-store",
        });
        if (!response.ok) return;
        const data = (await response.json()) as { favorite: boolean };
        if (aktuell) setFavorite(data.favorite);
      } catch {
        // Ohne Netz bleibt der Knopf abgeschaltet statt falsch zu zeigen.
      }
    })();

    return () => {
      aktuell = false;
    };
  }, [spotId, signedIn]);

  const toggle = async () => {
    if (!signedIn || busy || favorite === null) return;
    const wanted = !favorite;
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(`/api/spots/${encodeURIComponent(spotId)}/favorite`, {
        method: wanted ? "PUT" : "DELETE",
      });
      const data = (await response.json()) as { favorite?: boolean; error?: string };
      if (!response.ok) {
        setError(data.error ?? t(wanted ? "favorite.failed" : "favorite.removeFailed"));
        return;
      }
      setFavorite(data.favorite === true);
    } catch {
      setError(t("favorite.offline"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => void toggle()}
        disabled={!signedIn || busy || favorite === null}
        aria-pressed={favorite === true}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 px-4 font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none disabled:opacity-55 dark:border-neutral-700"
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          aria-hidden="true"
          fill={favorite ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        >
          <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
        </svg>
        {favorite ? t("favorite.saved") : t("favorite.save")}
      </button>
      {!signedIn && <p className="mt-1 text-xs text-neutral-500">{t("favorite.needAccount")}</p>}
      {error && (
        <p role="alert" className="mt-1 text-sm font-medium text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
