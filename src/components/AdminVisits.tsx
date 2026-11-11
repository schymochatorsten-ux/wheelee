"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale, useT } from "@/i18n/context";
import { SettingsSection } from "./SettingsSection";
import { segmentGroup, segmentItem } from "./ui/styles";

/**
 * Besucherzahlen der letzten Tage (ToDo 20.1) – nur für Administratoren.
 *
 * Die Zugangsprüfung steckt in `/api/admin/visits`; dass die Ansicht nur Admins
 * gezeigt wird, ist Bequemlichkeit, keine Sperre.
 */

interface VisitDay {
  day: string;
  visitors: number;
  views: number;
}

interface Response {
  today: string;
  days: VisitDay[];
  total: { visitors: number; views: number; since: string | null };
}

const RANGES = [7, 30, 90] as const;

export function AdminVisits() {
  const t = useT();
  const locale = useLocale();
  const [range, setRange] = useState<(typeof RANGES)[number]>(30);
  const [data, setData] = useState<Response | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/visits?days=${range}`);
      if (!response.ok) {
        setError(response.status === 401 ? t("admin.unauthorized") : t("visits.loadFailed"));
        return;
      }
      setData((await response.json()) as Response);
      setError(null);
    } catch {
      setError(t("admin.noConnection"));
    }
  }, [range, t]);

  useEffect(() => {
    void load();
  }, [load]);

  const date = (day: string) => new Date(`${day}T12:00:00`).toLocaleDateString(locale);
  const days = data?.days ?? [];
  const peak = Math.max(1, ...days.map((entry) => entry.visitors));
  const sum = (entries: VisitDay[], key: "visitors" | "views") =>
    entries.reduce((total, entry) => total + entry[key], 0);
  const todayRow = days.find((entry) => entry.day === data?.today);

  return (
    <SettingsSection title={t("visits.title")} description={t("visits.note")}>
      <div role="radiogroup" aria-label={t("visits.range")} className={segmentGroup}>
        {RANGES.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={range === option}
            onClick={() => setRange(option)}
            className={segmentItem(range === option)}
          >
            {t("visits.lastDays", { count: option })}
          </button>
        ))}
      </div>

      {error ? (
        <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-400">
          {error}
        </p>
      ) : null}

      {data ? (
        <>
          <dl className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
            <div className="rounded-xl bg-neutral-100/70 p-2 dark:bg-neutral-800/40">
              <dt className="text-xs text-neutral-500">{t("visits.today")}</dt>
              <dd className="text-lg font-semibold">
                {(todayRow?.visitors ?? 0).toLocaleString(locale)}
              </dd>
            </div>
            <div className="rounded-xl bg-neutral-100/70 p-2 dark:bg-neutral-800/40">
              <dt className="text-xs text-neutral-500">{t("visits.inRange", { count: range })}</dt>
              <dd className="text-lg font-semibold">
                {sum(days, "visitors").toLocaleString(locale)}
              </dd>
            </div>
            <div className="rounded-xl bg-neutral-100/70 p-2 dark:bg-neutral-800/40">
              <dt className="text-xs text-neutral-500">{t("visits.views")}</dt>
              <dd className="text-lg font-semibold">{sum(days, "views").toLocaleString(locale)}</dd>
            </div>
            <div className="rounded-xl bg-neutral-100/70 p-2 dark:bg-neutral-800/40">
              <dt className="text-xs text-neutral-500">
                {data.total.since
                  ? t("visits.totalSince", { date: date(data.total.since) })
                  : t("visits.total")}
              </dt>
              <dd className="text-lg font-semibold">
                {data.total.visitors.toLocaleString(locale)}
              </dd>
            </div>
          </dl>

          {days.length === 0 ? (
            <p className="mt-3 text-sm text-neutral-500">{t("visits.none")}</p>
          ) : (
            <ul className="mt-3 space-y-1" aria-label={t("visits.title")}>
              {days.map((entry) => (
                <li key={entry.day} className="flex items-center gap-2 text-sm">
                  <span className="w-24 shrink-0 text-neutral-600 tabular-nums dark:text-neutral-400">
                    {date(entry.day)}
                  </span>
                  <span
                    className="h-3 flex-1 rounded bg-neutral-100 dark:bg-neutral-900"
                    aria-hidden="true"
                  >
                    <span
                      className="block h-3 rounded bg-blue-700"
                      style={{ width: `${Math.max(2, (entry.visitors / peak) * 100)}%` }}
                    />
                  </span>
                  <span className="w-20 shrink-0 text-right tabular-nums">
                    {t("visits.row", { visitors: entry.visitors, views: entry.views })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : null}
    </SettingsSection>
  );
}
