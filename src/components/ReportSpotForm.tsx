"use client";

import { useState } from "react";
import { useT } from "@/i18n/context";
import { fieldClass, hintClass, labelClass, primaryButton, secondaryButton } from "./ui/styles";

/**
 * Einen fehlenden Parkplatz melden (ToDo 8.11).
 *
 * **Warum es das gibt.** Der Bestand kann nur enthalten, was eine Quelle
 * hergibt. Ein neu angeordneter Stellplatz steht in keiner amtlichen Liste und
 * in OpenStreetMap, bis jemand ihn kartiert – wer davorsteht, weiß es sofort.
 * Es ist dieselbe Begründung wie bei den Bewertungen, nur in die andere
 * Richtung: Dort korrigieren Nutzer:innen zu viel, hier zu wenig.
 *
 * **Die Stelle ist die Mitte der Karte und kein Adressfeld.** Eine Adresse
 * müsste geokodiert werden – ein dritter Dienst, eine gerundete Koordinate und
 * die Frage, was bei „Hinterhof" passiert. Wer melden will, steht meist davor
 * und sieht auf der Karte genau, wo er ist; die Mitte zu verschieben ist
 * genauer als jedes Tippen. Deshalb steht hier die Koordinate sichtbar dabei:
 * Sie ist die eigentliche Angabe, nicht ein technisches Detail.
 *
 * **Nur mit Konto.** Geprüft wird am Endpunkt (401 ohne Konto); der Hinweis
 * hier ist die Höflichkeit, keine Sperre.
 */

interface ReportSpotFormProps {
  /** Die Mitte des aktuellen Kartenausschnitts. */
  center: { lat: number; lng: number } | null;
  signedIn: boolean;
  onClose: () => void;
  /** Nach erfolgreicher Meldung: Karte neu laden, damit der Platz erscheint. */
  onReported?: (spotId: string) => void;
}

export function ReportSpotForm({ center, signedIn, onClose, onReported }: ReportSpotFormProps) {
  const t = useT();
  const [label, setLabel] = useState("");
  const [spaces, setSpaces] = useState("1");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!center) return;

    setSending(true);
    setError(null);
    try {
      const response = await fetch("/api/spots/melden", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label,
          note: note || null,
          spotCount: Number(spaces),
          lat: center.lat,
          lng: center.lng,
        }),
      });
      const data = (await response.json()) as { error?: string; spotId?: string };
      if (!response.ok) {
        setError(data.error ?? t("report.failed"));
        return;
      }
      setDone(true);
      if (data.spotId) onReported?.(data.spotId);
    } catch {
      setError(t("report.failed"));
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      aria-labelledby="report-spot-title"
      className="w-full rounded-2xl bg-white p-4 shadow-md dark:bg-neutral-900"
    >
      <div className="flex items-start gap-3">
        <h2 id="report-spot-title" className="flex-1 text-base font-semibold">
          {t("report.title")}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label={t("details.close")}
          className="-mt-1 -mr-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-200/70 text-xl text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
        >
          ×
        </button>
      </div>

      {done ? (
        <>
          <p
            role="status"
            className="mt-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
          >
            {t("report.done")}
          </p>
          <button type="button" onClick={onClose} className={`${secondaryButton} mt-3`}>
            {t("report.close")}
          </button>
        </>
      ) : !signedIn ? (
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {t("report.needsAccount")}
        </p>
      ) : (
        <form onSubmit={submit} className="mt-2 space-y-3">
          <p className={hintClass}>{t("report.lead")}</p>

          <div>
            <label htmlFor="report-label" className={labelClass}>
              {t("report.label")}
            </label>
            <input
              id="report-label"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
              required
              minLength={3}
              maxLength={120}
              placeholder={t("report.labelPlaceholder")}
              className={`${fieldClass} mt-1`}
            />
          </div>

          <div>
            <label htmlFor="report-spaces" className={labelClass}>
              {t("report.spaces")}
            </label>
            <input
              id="report-spaces"
              type="number"
              min={1}
              max={50}
              inputMode="numeric"
              value={spaces}
              onChange={(event) => setSpaces(event.target.value)}
              className={`${fieldClass} mt-1`}
            />
          </div>

          <div>
            <label htmlFor="report-note" className={labelClass}>
              {t("report.note")}
            </label>
            <textarea
              id="report-note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              maxLength={300}
              rows={2}
              className={`${fieldClass} mt-1`}
            />
          </div>

          {/*
            Die Koordinate steht sichtbar da, weil sie die eigentliche Angabe
            ist. Ohne sie wäre „die Mitte der Karte" eine Behauptung, die sich
            nicht prüfen lässt – und wer sich vertippt hat, sieht es hier.
          */}
          <p className={hintClass}>
            {center
              ? t("report.position", {
                  lat: center.lat.toFixed(5),
                  lng: center.lng.toFixed(5),
                })
              : t("report.positionMissing")}
          </p>

          {error && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950 dark:text-red-200"
            >
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <button type="submit" disabled={sending || !center} className={primaryButton}>
              {sending ? t("report.sending") : t("report.submit")}
            </button>
            <button type="button" onClick={onClose} className={secondaryButton}>
              {t("report.cancel")}
            </button>
          </div>

          {/*
            **Was danach passiert, steht vorher da.** Wer etwas einträgt, soll
            wissen, dass es sofort sichtbar ist – und dass es als unsicher
            gekennzeichnet bleibt, bis andere es bestätigen. Eine Meldung, von
            der man nicht weiß, was sie bewirkt, wird entweder nicht abgegeben
            oder für mehr gehalten, als sie ist.
          */}
          <p className={hintClass}>{t("report.afterwards")}</p>
        </form>
      )}
    </section>
  );
}
