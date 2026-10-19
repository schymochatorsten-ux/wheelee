import Link from "next/link";

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

export function LegalPage({ title, updated, children }: LegalPageProps) {
  const date = new Date(`${updated}T00:00:00`).toLocaleDateString("de-DE", {
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
          <span aria-hidden="true">←</span> Zurück zur Karte
        </Link>

        <h1 className="mt-3 text-2xl font-semibold hyphens-auto">{title}</h1>
        <p className="mt-1 text-sm text-neutral-500">Stand: {date}</p>

        {/*
          `space-y` statt Abständen an jedem Element: Die Texte bestehen fast
          nur aus Überschriften und Absätzen, und die sollen gleichmäßig
          atmen, egal in welcher Reihenfolge sie kommen.
        */}
        <div className="mt-6 space-y-5 text-sm leading-relaxed [&_a]:underline [&_h2]:text-base [&_h2]:font-semibold [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
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
export function MissingOperator() {
  return (
    <section className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
      <h2 className="font-semibold">Diese Angaben fehlen noch</h2>
      <p className="mt-1">
        Die Betreiberangaben sind auf diesem Server nicht hinterlegt. Das ist ein Fehler in der
        Einrichtung, kein Versehen im Text – die Seite erfindet hier nichts.
      </p>
      <p className="mt-2">
        Zu setzen sind <code>WHEELEE_OPERATOR_NAME</code>, <code>WHEELEE_OPERATOR_ADDRESS</code> und{" "}
        <code>WHEELEE_OPERATOR_EMAIL</code>; die Vorlage dafür steht in{" "}
        <code>deploy/env.beispiel</code>.
      </p>
    </section>
  );
}
