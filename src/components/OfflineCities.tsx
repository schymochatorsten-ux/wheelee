"use client";

import { useEffect, useState } from "react";
import { useLocale, useT } from "@/i18n/context";
import { localeTag, type Locale } from "@/i18n";
import type { CityInfo } from "@/lib/parking/spots";
import {
  formatBytes,
  listOfflineCities,
  offlineSupported,
  removeOfflineCity,
  saveOfflineCity,
  stalenessOf,
  type OfflineCitySummary,
} from "@/lib/offline-cities";

/**
 * Städte vorab laden (ToDo 16.1) – nur die Parkplatzdaten, keine Kartenkacheln
 * (16.2 wurde verworfen, Begründung in `Erledigt.md`).
 */

const formatDate = (iso: string, locale: Locale) =>
  new Intl.DateTimeFormat(localeTag(locale), { dateStyle: "medium" }).format(new Date(iso));

const buttonClass =
  "inline-flex min-h-11 items-center rounded-lg border border-neutral-300 px-4 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none disabled:opacity-50 dark:border-neutral-700";

export function OfflineCities({ cities }: { cities: readonly CityInfo[] }) {
  const t = useT();
  const locale = useLocale();
  const [saved, setSaved] = useState<OfflineCitySummary[]>([]);
  const [supported, setSupported] = useState(true);
  const [choice, setChoice] = useState(cities[0]?.slug ?? "");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const reload = () =>
    listOfflineCities()
      .then(setSaved)
      .catch(() => setSupported(false));

  // Erst nach dem Laden prüfen: Auf dem Server gibt es keine Cache API.
  useEffect(() => {
    if (!offlineSupported()) {
      setSupported(false);
      return;
    }
    void reload();
  }, []);

  const download = async (slug: string) => {
    setBusy(true);
    setMessage(null);
    try {
      const summary = await saveOfflineCity(slug);
      setMessage(t("offline.saved", { name: summary.name }));
      await reload();
    } catch {
      setMessage(t("offline.failed"));
    } finally {
      setBusy(false);
    }
  };

  const remove = async (entry: OfflineCitySummary) => {
    await removeOfflineCity(entry.slug);
    setMessage(t("offline.removed", { name: entry.name }));
    await reload();
  };

  const total = saved.reduce((sum, entry) => sum + entry.bytes, 0);
  const sorted = [...cities].sort((a, b) => a.name.localeCompare(b.name, localeTag(locale)));

  return (
    <section aria-labelledby="offline-heading">
      <h2 id="offline-heading" className="text-base font-semibold">
        {t("offline.heading")}
      </h2>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{t("offline.note")}</p>

      {!supported ? (
        <p className="mt-2 text-sm">{t("offline.unsupported")}</p>
      ) : (
        <>
          <div className="mt-2 flex flex-wrap items-end gap-2">
            <label className="flex flex-col gap-1 text-sm">
              {t("offline.cityLabel")}
              <select
                data-testid="offline-city"
                value={choice}
                onChange={(event) => setChoice(event.target.value)}
                className="min-h-11 rounded-lg border border-neutral-300 bg-transparent px-2 dark:border-neutral-700"
              >
                {sorted.map((city) => (
                  <option key={city.slug} value={city.slug} className="text-black">
                    {city.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              className={buttonClass}
              disabled={busy || !choice}
              onClick={() => void download(choice)}
            >
              {busy ? t("offline.downloading") : t("offline.download")}
            </button>
          </div>

          <p aria-live="polite" data-testid="offline-message" className="mt-2 min-h-5 text-sm">
            {message}
          </p>

          {saved.length === 0 ? (
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {t("offline.none")}
            </p>
          ) : (
            <>
              <ul aria-label={t("offline.listLabel")} className="mt-1 space-y-3">
                {saved.map((entry) => {
                  const staleness = stalenessOf(entry);
                  return (
                    <li
                      key={entry.slug}
                      data-testid={`offline-${entry.slug}`}
                      className="rounded-lg border border-neutral-200 p-3 dark:border-neutral-800"
                    >
                      <p className="font-medium">{entry.name}</p>
                      <p className="text-sm">
                        {t("offline.entry", {
                          count: entry.spotCount,
                          size: formatBytes(entry.bytes, locale),
                        })}
                      </p>
                      <p className="text-sm">
                        {t("offline.dataDate", { date: formatDate(entry.importedAt, locale) })} ·{" "}
                        {t("offline.savedDate", { date: formatDate(entry.savedAt, locale) })}
                      </p>
                      {staleness !== "fresh" && (
                        <p className="mt-1 text-sm font-medium text-amber-800 dark:text-amber-300">
                          {staleness === "data" ? t("offline.staleData") : t("offline.staleCopy")}
                        </p>
                      )}
                      <div className="mt-2 flex flex-wrap gap-2">
                        <button
                          type="button"
                          className={buttonClass}
                          disabled={busy}
                          aria-label={t("offline.refreshLabel", { name: entry.name })}
                          onClick={() => void download(entry.slug)}
                        >
                          {t("offline.refresh")}
                        </button>
                        <button
                          type="button"
                          className={buttonClass}
                          aria-label={t("offline.removeLabel", { name: entry.name })}
                          onClick={() => void remove(entry)}
                        >
                          {t("offline.remove")}
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-2 text-sm">
                {t("offline.total", { size: formatBytes(total, locale) })}
              </p>
            </>
          )}
        </>
      )}
    </section>
  );
}
