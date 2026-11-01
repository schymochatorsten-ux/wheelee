import type { Metadata } from "next";
import Link from "next/link";
import { translator } from "@/i18n";
import { getLocale } from "@/i18n/server";

/**
 * Worum es bei wheelee geht (ToDo 19.11): kurz sagen, wofür die Seite da ist,
 * und um Rückmeldungen bitten – nur mit der Gemeinschaft entstehen aktuelle
 * Daten.
 *
 * Anders als Impressum und Datenschutzerklärung folgt der Text der Sprache der
 * Oberfläche (`info.*`, alle neun Sprachen), er ist also keine Ausnahme nach
 * D-08. Eigener Rahmen statt `LegalPage`, weil dessen Text fest auf Deutsch
 * steht und einen Hinweis „nur deutsch maßgeblich" trägt.
 */

export async function generateMetadata(): Promise<Metadata> {
  const t = translator(await getLocale());
  return { title: `${t("settings.info")} – wheelee`, description: t("info.lead") };
}

export default async function Info() {
  const locale = await getLocale();
  const t = translator(locale);

  return (
    <main className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-blue-800 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300"
        >
          <span aria-hidden="true">←</span> {t("error.backToMap")}
        </Link>

        <h1 className="mt-3 text-2xl font-semibold">{t("settings.info")}</h1>
        <p className="mt-3 text-lg leading-snug">{t("info.lead")}</p>

        <div className="mt-6 space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-base font-semibold">{t("info.goal.title")}</h2>
            <p className="mt-1">{t("info.goal.text")}</p>
          </section>

          <section>
            <h2 className="text-base font-semibold">{t("info.how.title")}</h2>
            <ol className="mt-1 list-decimal space-y-1 pl-5">
              <li>{t("info.how.1")}</li>
              <li>{t("info.how.2")}</li>
              <li>{t("info.how.3")}</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-semibold">{t("info.data.title")}</h2>
            <p className="mt-1">{t("info.data.text")}</p>
          </section>

          <section className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
            <h2 className="text-base font-semibold">{t("info.help.title")}</h2>
            <p className="mt-1">{t("info.help.text")}</p>
          </section>
        </div>

        <Link
          href="/"
          className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-blue-700 px-4 text-sm font-medium text-white hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {t("info.toMap")}
        </Link>
      </div>
    </main>
  );
}
