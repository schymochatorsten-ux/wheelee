"use client";

import { useCallback, useEffect, useState } from "react";
import { useT } from "@/i18n/context";
import { SettingsSection } from "./SettingsSection";
import { fieldClass, hintClass, labelClass, primaryButton } from "./ui/styles";

/**
 * Die zwei Schwellen, ab denen ein Parkplatz verschwindet (ToDo 8.11).
 *
 * **Warum zwei Felder und nicht eins.** Ein gesicherter Platz aus einer
 * amtlichen Liste, dessen Lage zwei Quellen bestätigen, soll nicht an zwei
 * Stimmen scheitern; ein unsicherer – gemeldet, nur in OpenStreetMap, Lage nur
 * ungefähr – hat dieses Gewicht nicht. Eine einzige Zahl müsste sich zwischen
 * beiden entscheiden und wäre für den einen Fall zu hoch, für den anderen zu
 * niedrig.
 *
 * **Gezählt werden Konten**, nicht die gewichteten Summen aus 11.6: „drei
 * Leute" soll drei Leute heißen. Und gezählt wird der **Überhang** – fünf
 * Meldungen bei zwölf Bestätigungen sind ein Streit und kein Beleg.
 *
 * Geschützt wird **serverseitig** (`/api/admin/schwellen` antwortet ohne
 * Administratorrecht mit 401).
 */

interface Policy {
  schwelleUnsicher: number;
  schwelleSicher: number;
  updatedAt: string | null;
}

export function SpotThresholds() {
  const t = useT();
  const [unsicher, setUnsicher] = useState("2");
  const [sicher, setSicher] = useState("5");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/schwellen");
      if (response.status === 401) {
        setError(t("admin.unauthorized"));
        return;
      }
      if (!response.ok) {
        setError(t("thresholds.loadFailed"));
        return;
      }
      const data = (await response.json()) as { policy: Policy };
      setUnsicher(String(data.policy.schwelleUnsicher));
      setSicher(String(data.policy.schwelleSicher));
    } catch {
      setError(t("admin.noConnection"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void load();
  }, [load]);

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch("/api/admin/schwellen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schwelleUnsicher: Number(unsicher),
          schwelleSicher: Number(sicher),
        }),
      });
      const data = (await response.json()) as { error?: string; policy?: Policy };
      if (!response.ok) {
        setError(data.error ?? t("thresholds.saveFailed"));
        return;
      }
      setMessage(t("thresholds.saved"));
    } catch {
      setError(t("admin.noConnection"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <SettingsSection title={t("thresholds.title")} description={t("thresholds.intro")}>
      <form onSubmit={save} className="space-y-3">
        <div>
          <label htmlFor="schwelle-unsicher" className={labelClass}>
            {t("thresholds.uncertain")}
          </label>
          <input
            id="schwelle-unsicher"
            type="number"
            min={1}
            max={100}
            inputMode="numeric"
            value={unsicher}
            onChange={(event) => setUnsicher(event.target.value)}
            disabled={loading}
            className={`${fieldClass} mt-1`}
          />
          <p className={`${hintClass} mt-1`}>{t("thresholds.uncertainHint")}</p>
        </div>

        <div>
          <label htmlFor="schwelle-sicher" className={labelClass}>
            {t("thresholds.certain")}
          </label>
          <input
            id="schwelle-sicher"
            type="number"
            min={1}
            max={100}
            inputMode="numeric"
            value={sicher}
            onChange={(event) => setSicher(event.target.value)}
            disabled={loading}
            className={`${fieldClass} mt-1`}
          />
          <p className={`${hintClass} mt-1`}>{t("thresholds.certainHint")}</p>
        </div>

        {/*
          Der Satz steht hier und nicht nur im Quelltext: Wer die Zahl für
          „sicher" ändert, ändert damit **auch**, wie viele Bestätigungen ein
          gemeldeter Platz braucht. Diese Kopplung ist Absicht (Aufnehmen muss
          schwerer sein als Loswerden), aber sie ist nicht zu erraten.
        */}
        <p className={hintClass}>{t("thresholds.coupledHint")}</p>

        {error && (
          <p
            role="alert"
            className="rounded-xl bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950 dark:text-red-200"
          >
            {error}
          </p>
        )}
        {message && (
          <p
            role="status"
            className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
          >
            {message}
          </p>
        )}

        <button type="submit" disabled={loading || saving} className={primaryButton}>
          {saving ? t("thresholds.saving") : t("thresholds.save")}
        </button>
      </form>
    </SettingsSection>
  );
}
