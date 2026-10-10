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
 */

interface DataDisclaimerProps {
  /** Tag des Imports (ISO), falls für diese Stadt bekannt. */
  importedAt?: string | null;
  /** `kurz` für die Detailansicht, `lang` für die Listenansicht. */
  variant?: "kurz" | "lang";
}

/** ISO-Datum für die Anzeige, z. B. „8. Oktober 2026". */
export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
}

export function DataDisclaimer({ importedAt = null, variant = "kurz" }: DataDisclaimerProps) {
  const stand = importedAt ? ` Stand der Daten für diese Stadt: ${formatDate(importedAt)}.` : "";

  if (variant === "kurz") {
    return (
      <p className="mt-3 text-xs text-neutral-500">
        Angaben ohne Gewähr: Ein Parkplatz kann aufgehoben, verlegt oder gerade belegt sein.
        {stand}
      </p>
    );
  }

  return (
    <section
      aria-labelledby="disclaimer-heading"
      className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100"
    >
      <h2 id="disclaimer-heading" className="font-semibold">
        Bitte vor der Fahrt lesen
      </h2>
      <p className="mt-1">
        Die Angaben stammen aus amtlichen Listen und aus OpenStreetMap und können veraltet sein. Ein
        Parkplatz kann aufgehoben, verlegt oder gerade belegt sein, und eine Zeitbeschränkung kann
        sich geändert haben. <strong>Verlass dich nicht allein auf diese App</strong> – vor Ort gilt
        die Beschilderung.
      </p>
      <p className="mt-2">
        Stimmt etwas nicht, hilft eine Rückmeldung mehr als alles andere: Rückmeldungen sind die
        einzige Quelle, die solche Änderungen überhaupt bemerkt.
      </p>
    </section>
  );
}
