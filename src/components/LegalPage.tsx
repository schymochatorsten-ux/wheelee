import Link from "next/link";
import { DEFAULT_LOCALE, localeTag, translator } from "@/i18n";
import { getLocale } from "@/i18n/server";

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
  /**
   * Wie die erste Zeile heißt. Vorgabe „Stand“ – für die Abdeckungsseite
   * „Daten vom“, denn dort ist es kein Stand der Seite, sondern der Tag, an
   * dem sich der Bestand zuletzt geändert hat (ToDo 19.16).
   */
  updatedKey?: "legal.updated" | "legal.dataFrom";
  /**
   * Wann der nächtliche Datenlauf zuletzt durchlief (ISO), für eine zweite
   * Zeile darunter.
   *
   * **Getrennt vom Datum oben, und das ist der ganze Zweck:** Ein Lauf, der
   * die Quellen prüft und nichts Neues findet, ist etwas anderes als neue
   * Daten. Beides in eine Zeile zu legen hieße, einen unveränderten Bestand
   * jede Nacht als frisch auszuweisen.
   *
   * `null` heißt „nie gelaufen oder nicht bekannt" und wird auch so
   * geschrieben – nie ein erfundenes Datum.
   */
  lastRun?: string | null;
  children: React.ReactNode;
}

/**
 * **Der Text bleibt deutsch (D-08, Ausnahmeliste); nur der Rahmen folgt der
 * Sprache** – Rückweg, „Stand" und der Hinweis, dass die deutsche Fassung
 * maßgeblich ist. Der Hinweis steht in der Sprache der Oberfläche, weil sonst
 * ausgerechnet der, der den deutschen Text nicht lesen kann, ihn nicht läse.
 */
export async function LegalPage({
  title,
  updated,
  updatedKey = "legal.updated",
  lastRun,
  children,
}: LegalPageProps) {
  const locale = await getLocale();
  const t = translator(locale);
  const tag = localeTag(locale);
  const format = (iso: string) =>
    new Date(iso.length === 10 ? `${iso}T00:00:00` : iso).toLocaleDateString(tag, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  const date = format(updated);

  return (
    // `min-h-0 flex-1 overflow-y-auto`, weil das Layout die Bildschirmhöhe
    // hält (für den Offline-Hinweis über der Karte). Ohne das wächst die Seite
    // über den Rand hinaus und lässt sich nicht scrollen.
    // `relative` aus demselben Grund wie im Einstellungsreiter (ToDo 9.22):
    // Ein `sr-only`-Element unterhalb des sichtbaren Bereichs wäre sonst nicht
    // vom `overflow` erfasst und zöge die Seite auf.
    <main className="relative min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-blue-800 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300"
        >
          {/*
            Das Winkelzeichen nach links ist in den Systemapps das Zeichen für
            „zurück“ (ToDo 9.31); der Pfeil ← war dafür ein Behelf.
          */}
          <span aria-hidden="true" className="text-lg leading-none">
            ‹
          </span>{" "}
          {t("error.backToMap")}
        </Link>

        {/* Große, eng gesetzte Überschrift wie in den Systemapps. */}
        <h1
          lang="de"
          className="mt-3 text-[28px] leading-tight font-bold tracking-tight hyphens-auto"
        >
          {title}
        </h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {t(updatedKey, { date })}
        </p>
        {lastRun !== undefined && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {lastRun === null
              ? t("legal.lastRunNever")
              : t("legal.lastRun", { date: format(lastRun) })}
          </p>
        )}
        {locale !== DEFAULT_LOCALE && (
          <p
            lang={locale}
            className="mt-3 rounded-xl bg-neutral-100/70 p-3 text-sm dark:bg-neutral-800/40"
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
