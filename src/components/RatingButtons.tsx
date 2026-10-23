"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale, useT } from "@/i18n/context";
import type { RatingSummary, RatingVote } from "@/lib/types";
import { formatDate } from "./DataDisclaimer";

/**
 * „Existiert" und „Existiert nicht mehr" in der Detailansicht
 * (ToDos 8.1–8.7).
 *
 * **Die Regel, festgelegt am 2026-10-19:** Sehen darf jede:r, bewerten nur mit
 * Konto – in beide Richtungen –, und höchstens einmal je Parkplatz.
 *
 * **Warum die Knöpfe ohne Konto trotzdem dastehen**, abgeschaltet und mit dem
 * Grund daneben (8.3): Ein weggelassener Knopf sieht aus wie eine kaputte
 * App. Ein abgeschalteter sagt, dass es die Möglichkeit gibt und was dafür
 * nötig ist. Die Zählerstände sieht man ohnehin – sie sind die eigentliche
 * Auskunft, und sie hängt an keiner Anmeldung.
 */

interface RatingButtonsProps {
  spotId: string;
  /** Ob jemand angemeldet ist – entscheidet nur über die Darstellung. */
  signedIn: boolean;
}

interface RatingState {
  summary: RatingSummary;
  myVote: { vote: RatingVote; at: string } | null;
}

const ICON = "h-5 w-5";

function ThumbUpIcon() {
  return (
    <svg className={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        d="M7 10v10H4V10h3zm0 0 4.5-7a2 2 0 0 1 3.4 2L13.5 9H19a2 2 0 0 1 2 2.3l-1 6A2 2 0 0 1 18 19H7"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ThumbDownIcon() {
  return (
    <svg className={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        d="M7 14V4H4v10h3zm0 0 4.5 7a2 2 0 0 0 3.4-2L13.5 15H19a2 2 0 0 0 2-2.3l-1-6A2 2 0 0 0 18 5H7"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RatingButtons({ spotId, signedIn }: RatingButtonsProps) {
  const t = useT();
  const locale = useLocale();
  const [state, setState] = useState<RatingState | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Beim Öffnen laden. Scheitert es, bleibt die Anzeige leer statt auf null
   * zu stehen: „0 Bestätigungen" wäre eine Aussage, „noch nicht geladen" ist
   * die Wahrheit.
   */
  useEffect(() => {
    let aktuell = true;
    setState(null);
    setError(null);

    (async () => {
      try {
        const response = await fetch(`/api/spots/${encodeURIComponent(spotId)}/ratings`);
        if (!response.ok) return;
        const data = (await response.json()) as RatingState;
        if (aktuell) setState(data);
      } catch {
        // Ohne Netz bleibt die Anzeige leer – siehe oben.
      }
    })();

    return () => {
      aktuell = false;
    };
  }, [spotId]);

  const vote = useCallback(
    async (direction: RatingVote) => {
      if (!signedIn || busy || !state) return;

      /*
       * Optimistisch zeichnen (8.7): Der Knopf reagiert sofort, die Anfrage
       * läuft nebenher. Wer im Funkloch steht, sieht sonst sekundenlang
       * nichts und tippt erneut.
       *
       * **Der alte Stand wird vorher weggelegt**, nicht neu berechnet –
       * scheitert die Anfrage, wird genau das wiederhergestellt, was dastand.
       * Eine Rücknahme, die selbst rechnet, driftet vom Server weg.
       */
      const vorher = state;
      setState(optimistic(state, direction));
      setBusy(true);
      setError(null);

      try {
        const response = await fetch(`/api/spots/${encodeURIComponent(spotId)}/ratings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ vote: direction }),
        });

        const data = (await response.json()) as RatingState & { error?: string };

        if (!response.ok) {
          setState(vorher);
          setError(data.error ?? t("rating.saveFailed"));
          return;
        }

        // Der Server hat das letzte Wort – er kennt auch die Stimmen anderer.
        setState({ summary: data.summary, myVote: data.myVote });
      } catch {
        setState(vorher);
        setError(t("rating.offline"));
      } finally {
        setBusy(false);
      }
    },
    [signedIn, busy, state, spotId, t],
  );

  const summary = state?.summary;
  const myVote = state?.myVote?.vote ?? null;

  return (
    <section aria-labelledby={`bewertung-${spotId}`} className="mt-4">
      <h3 id={`bewertung-${spotId}`} className="text-sm font-semibold">
        {t("rating.question")}
      </h3>

      <div className="mt-2 flex gap-2">
        <RatingButton
          label={t("rating.exists")}
          icon={<ThumbUpIcon />}
          count={summary?.existsCount}
          active={myVote === "exists"}
          disabled={!signedIn || busy || !state}
          tone="positive"
          onClick={() => void vote("exists")}
        />
        <RatingButton
          label={t("rating.gone")}
          icon={<ThumbDownIcon />}
          count={summary?.goneCount}
          active={myVote === "gone"}
          disabled={!signedIn || busy || !state}
          tone="negative"
          onClick={() => void vote("gone")}
        />
      </div>

      {/*
        Zeitpunkte, nicht nur Zahlen (8.5). „3" sagt nicht, ob die
        Bestätigungen von gestern oder von vorletztem Jahr sind – und genau
        das entscheidet, ob man sich darauf verlässt.
      */}
      {summary && (summary.lastExistsAt || summary.lastGoneAt) && (
        <dl className="mt-2 space-y-0.5 text-xs text-neutral-500">
          {summary.lastExistsAt && (
            <div className="flex gap-1.5">
              <dt>{t("rating.lastConfirmed")}</dt>
              <dd>{formatDate(summary.lastExistsAt.slice(0, 10), locale)}</dd>
            </div>
          )}
          {summary.lastGoneAt && (
            <div className="flex gap-1.5">
              <dt>{t("rating.lastGone")}</dt>
              <dd>{formatDate(summary.lastGoneAt.slice(0, 10), locale)}</dd>
            </div>
          )}
        </dl>
      )}

      {!signedIn && <p className="mt-2 text-xs text-neutral-500">{t("rating.needAccount")}</p>}

      {signedIn && myVote && <p className="mt-2 text-xs text-neutral-500">{t("rating.voted")}</p>}

      {error && (
        <p role="alert" className="mt-2 text-xs text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
    </section>
  );
}

/**
 * Den Zählerstand sofort weiterdrehen, als wäre der Server schon da.
 *
 * Die drei Fälle sind dieselben wie im Server (`castVote`): dieselbe Richtung
 * nimmt zurück, die andere dreht um, keine setzt neu. Dass die Rechnung
 * zweimal existiert, ist der Preis für eine Oberfläche, die im Funkloch
 * sofort antwortet – deshalb gewinnt die Antwort des Servers, sobald sie da
 * ist.
 */
function optimistic(state: RatingState, direction: RatingVote): RatingState {
  const summary = { ...state.summary };
  const current = state.myVote?.vote ?? null;
  const at = new Date().toISOString();

  const add = (vote: RatingVote, delta: number) => {
    if (vote === "exists") summary.existsCount = Math.max(0, summary.existsCount + delta);
    else summary.goneCount = Math.max(0, summary.goneCount + delta);
  };

  if (current) add(current, -1);

  if (current === direction) {
    return { summary, myVote: null };
  }

  add(direction, 1);
  if (direction === "exists") summary.lastExistsAt = at;
  else summary.lastGoneAt = at;

  return { summary, myVote: { vote: direction, at } };
}

interface RatingButtonProps {
  label: string;
  icon: React.ReactNode;
  count: number | undefined;
  active: boolean;
  disabled: boolean;
  tone: "positive" | "negative";
  onClick: () => void;
}

function RatingButton({ label, icon, count, active, disabled, tone, onClick }: RatingButtonProps) {
  const t = useT();
  const base =
    "flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none disabled:opacity-55";

  const colours = active
    ? tone === "positive"
      ? "border-emerald-600 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100"
      : "border-amber-600 bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-100"
    : "border-neutral-300 dark:border-neutral-700";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      // `aria-pressed` statt Farbe allein: Dass die eigene Stimme gesetzt ist,
      // muss auch ankommen, wenn man die Farbe nicht sieht (ToDo 9.9).
      aria-pressed={active}
      aria-label={count === undefined ? label : t("rating.votes", { label, count })}
      className={`${base} ${colours}`}
    >
      <span aria-hidden="true">{icon}</span>
      <span aria-hidden="true">{label}</span>
      {/* Der Zählerstand bleibt leer, solange nichts geladen ist – „0" wäre
          eine Aussage, die noch niemand gemacht hat. */}
      <span aria-hidden="true" className="tabular-nums">
        {count ?? "–"}
      </span>
    </button>
  );
}
