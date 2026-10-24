"use client";

/**
 * Haftungs- und Aktualitätshinweis.
 *
 * Diese App sagt Menschen, wo sie parken können, die auf einen bestimmten
 * Stellplatz angewiesen sind. Wer sich darauf verlässt und vor einem
 * aufgehobenen Parkplatz steht, hat einen echten Schaden – eine vergebliche
 * Fahrt, manchmal einen verpassten Termin. Deshalb steht der Hinweis dort, wo
 * die Entscheidung fällt, und nicht im Kleingedruckten (ToDo 10.5).
 *
 * Bewusst nüchtern formuliert: Eine Warnung, die wie eine Rechtsfloskel
 * klingt, wird überlesen. Eine, die Angst macht, entwertet die App. Gesagt
 * werden muss nur, was wahr ist – die Daten sind eine Momentaufnahme einer
 * fremden Quelle.
 *
 * Die Texte stehen in `src/i18n/*.ts` (`disclaimer.*`). Englisch und Spanisch
 * sind maschinell übersetzt und mehrfach maschinell geprüft, **nicht von
 * Muttersprachler:innen** (Entscheidung vom 2026-10-24, ToDo 15.6 in
 * Erledigt.md): Die Aussage, auf die es ankommt – vor Ort gilt die
 * Beschilderung –, darf nicht an der Sprache hängen.
 */

import { DEFAULT_LOCALE, localeTag, type Locale } from "@/i18n";
import { useLocale, useT } from "@/i18n/context";

interface DataDisclaimerProps {
  /** Tag des Imports (ISO), falls für diese Stadt bekannt. */
  importedAt?: string | null;
  /** `kurz` für die Detailansicht, `lang` für die Listenansicht. */
  variant?: "kurz" | "lang";
}

/** ISO-Datum für die Anzeige, z. B. „8. Oktober 2026". */
export function formatDate(iso: string, locale: Locale = DEFAULT_LOCALE): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString(localeTag(locale), {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function DataDisclaimer({ importedAt = null, variant = "kurz" }: DataDisclaimerProps) {
  const locale = useLocale();
  const t = useT();
  const stand = importedAt ? ` ${t("disclaimer.stand", { date: formatDate(importedAt, locale) })}` : "";

  if (variant === "kurz") {
    return (
      <div className="mt-3 text-xs text-neutral-500">
        <p lang={locale}>
          {t("disclaimer.short")}
          {stand}
        </p>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="disclaimer-heading"
      lang={locale}
      className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100"
    >
      <h2 id="disclaimer-heading" className="font-semibold">
        {t("disclaimer.heading")}
      </h2>
      <p className="mt-1">
        {t("disclaimer.body")} <strong>{t("disclaimer.bodyStrong")}</strong> {t("disclaimer.bodyEnd")}
      </p>
      <p className="mt-2">{t("disclaimer.feedback")}</p>
    </section>
  );
}
