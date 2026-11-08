import type { Metadata } from "next";
import Link from "next/link";
import { cityGroups, LINK_LIST, letterPath } from "./verzeichnis";
import { getCities } from "@/lib/parking/spots";

/**
 * Verzeichnis der Städte (ToDo 19.17).
 *
 * **Der Grund ist nicht Bequemlichkeit, sondern Auffindbarkeit.** Die Seiten
 * unter `/parkplaetze/<stadt>` (19.12) standen bisher **nur** in der Sitemap –
 * kein einziger Link der Seite zeigte auf sie. Solche verwaisten Seiten
 * besucht eine Suchmaschine selten und bewertet sie niedrig: Interne Verweise
 * sind ihr Hinweis darauf, was wichtig ist, und hier gab es keinen.
 *
 * **Aufgeteilt nach Anfangsbuchstaben, und das ist gemessen.** Alle 3.763
 * Städte auf einer Seite ergaben **2 MB HTML** – derselbe Fehler wie die
 * 6,3 MB der Startseite (5.4), nur kleiner. Mit einer Seite je Buchstabe
 * bleibt jede klein, und jede Stadt hat trotzdem genau einen internen
 * Verweis. Nicht `next/link` war die Ursache (ohne ihn waren es noch 2,0 MB),
 * sondern die schiere Menge samt dem Datenblock, den React daneben ausliefert.
 *
 * Deutsch wie die übrigen Textseiten (D-08): Es sind Ortsnamen und Zahlen.
 */

export const metadata: Metadata = {
  title: "Behindertenparkplätze nach Stadt – wheelee",
  description:
    "Alle erfassten Städte und Gemeinden mit Behindertenparkplätzen: Schwerbehindertenparkplätze und Stellplätze für Menschen mit Parkausweis, nach Ort sortiert.",
  alternates: { canonical: "/parkplaetze" },
};

/** Großstädte zuerst – sie beantworten die meisten Suchanfragen. */
const PROMINENT = 40;

export default function StaedteIndex() {
  const cities = getCities();
  const number = (value: number) => value.toLocaleString("de-DE");
  const largest = [...cities].sort((a, b) => b.spaceCount - a.spaceCount).slice(0, PROMINENT);
  const { letters, groups } = cityGroups(cities);

  return (
    <main className="relative min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-blue-800 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300"
        >
          <span aria-hidden="true">←</span> Zurück zur Karte
        </Link>

        <h1 className="mt-3 text-2xl font-semibold">Behindertenparkplätze nach Stadt</h1>
        <p className="mt-3 text-sm leading-relaxed">
          wheelee kennt {number(cities.length)} Städte und Gemeinden mit zusammen{" "}
          {number(cities.reduce((sum, city) => sum + city.spotCount, 0))} Standorten. Jede Stadt hat
          eine eigene Seite mit der Liste der Standorte; die Karte zeigt dieselben Plätze mit
          Entfernung zum eigenen Standort.
        </p>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Wo die Stadtverwaltung eine Liste veröffentlicht, ist sie vollständig. Sonst stammen die
          Daten aus OpenStreetMap und sind eine <strong>Mindestzahl</strong> – fehlende Einträge
          bedeuten nicht, dass es dort keine Plätze gibt.
        </p>

        <section className="mt-6">
          <h2 className="text-base font-semibold">Die größten Städte</h2>
          <ul className={`mt-2 ${LINK_LIST}`}>
            {largest.map((city) => (
              <li key={city.slug}>
                <a href={`/parkplaetze/${city.slug}`}>{city.name}</a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-base font-semibold">Alle Städte von A bis Z</h2>
          <ul className={`mt-2 ${LINK_LIST}`}>
            {letters.map((letter) => (
              <li key={letter}>
                <a href={letterPath(letter)}>
                  {letter} <span className="text-neutral-500">({groups.get(letter)?.length})</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
