import Link from "next/link";
import { DEFAULT_LOCALE, localeTag, translator } from "@/i18n";
import { getLocale } from "@/i18n/server";
import { tRich } from "@/i18n/rich";

/**
 * Rahmen für Impressum und Datenschutzerklärung (ToDo 10.2).
 *
 * Die App ist sonst **eine** Ansicht: Karte, darüber ein paar Leisten. Diese
 * beiden Seiten sind die einzigen, die man liest statt bedient, und sie
 * brauchen deshalb das Gegenteil – eine begrenzte Zeilenlänge, Luft zwischen
 * den Absätzen und einen Weg zurück.
 *
 * **Der Weg zurück ist kein Schmuck.** Wer aus der Fußzeile hierher kommt,
 * steht sonst vor einer Seite ohne Kopfzeile und ohne Reiter; auf dem Telefon
 * bleibt dann nur die Zurück-Geste, und die kennt nicht jede:r. Ein sichtbarer
 * Link kostet eine Zeile.
 */

interface LegalPageProps {
  title: string;
  /** Datum der letzten Änderung (ISO), erscheint unter der Überschrift. */
  updated: string;
  children: React.ReactNode;
}

/**
 * **Der Text bleibt deutsch (D-08, Ausnahmeliste); nur der Rahmen folgt der
 * Sprache** – Rückweg, „Stand" und der Hinweis, dass die deutsche Fassung
 * maßgeblich ist. Der Hinweis steht in der Sprache der Oberfläche, weil sonst
 * ausgerechnet der, der den deutschen Text nicht lesen kann, ihn nicht läse.
 */
export async function LegalPage({ title, updated, children }: LegalPageProps) {
  const locale = await getLocale();
  const t = translator(locale);
  const date = new Date(`${updated}T00:00:00`).toLocaleDateString(localeTag(locale), {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    // `min-h-0 flex-1 overflow-y-auto`, weil das Layout die Bildschirmhöhe
    // hält (für den Offline-Hinweis über der Karte). Ohne das wächst die Seite
    // über den Rand hinaus und lässt sich nicht scrollen.
    <main className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-blue-800 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300"
        >
          <span aria-hidden="true">←</span> {t("error.backToMap")}
        </Link>

        <h1 lang="de" className="mt-3 text-2xl font-semibold hyphens-auto">
          {title}
        </h1>
        <p className="mt-1 text-sm text-neutral-500">{t("legal.updated", { date })}</p>
        {locale !== DEFAULT_LOCALE && (
          <p
            lang={locale}
            className="mt-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            {t("legal.germanOnly")}
          </p>
        )}

        {/*
          `space-y` statt Abständen an jedem Element: Die Texte bestehen fast
          nur aus Überschriften und Absätzen, und die sollen gleichmäßig
          atmen, egal in welcher Reihenfolge sie kommen.
        */}
        <div
          lang="de"
          className="mt-6 space-y-5 text-sm leading-relaxed [&_a]:underline [&_h2]:text-base [&_h2]:font-semibold [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5"
        >
          {children}
        </div>
      </div>
    </main>
  );
}

/**
 * Was dasteht, wenn die Betreiberangaben fehlen.
 *
 * **Bewusst auffällig und bewusst ehrlich.** Die Versuchung wäre, hier
 * Platzhalter zu zeigen („Max Mustermann, Musterstraße 1"). Das sähe nach
 * einem erfüllten Impressum aus und wäre keines – und niemandem fiele es auf,
 * am wenigsten dem Betreiber, der die Seite selten selbst aufruft.
 */
export async function MissingOperator() {
  const locale = await getLocale();
  const t = translator(locale);
  return (
    <section className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
      <h2 className="font-semibold">{t("legal.missingTitle")}</h2>
      <p className="mt-1">{t("legal.missingText")}</p>
      <p className="mt-2">
        {tRich(
          "legal.missingHow",
          {
            name: <code>WHEELEE_OPERATOR_NAME</code>,
            address: <code>WHEELEE_OPERATOR_ADDRESS</code>,
            email: <code>WHEELEE_OPERATOR_EMAIL</code>,
            template: <code>deploy/env.beispiel</code>,
          },
          undefined,
          locale,
        )}
      </p>
    </section>
  );
}
