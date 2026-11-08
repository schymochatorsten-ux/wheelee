import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cityGroups, LINK_LIST, letterPath } from "../../verzeichnis";
import { getCities } from "@/lib/parking/spots";

/**
 * Alle Städte mit einem Anfangsbuchstaben (ToDo 19.17).
 *
 * **Warum aufgeteilt:** Alle 3.763 auf einer Seite ergaben gemessene 2 MB
 * HTML. So bleibt jede Seite klein, und jede Stadt behält genau einen
 * internen Verweis – der Zweck des Verzeichnisses.
 */

interface Props {
  params: Promise<{ letter: string }>;
}

function gruppe(letter: string) {
  const { letters, groups } = cityGroups(getCities());
  const key = decodeURIComponent(letter).toUpperCase();
  const cities = groups.get(key);
  return cities ? { key, cities, letters } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = gruppe((await params).letter);
  // Kein Buchstabe, keine Seite – und kein Eintrag im Index: Eine erfundene
  // Adresse soll nicht als dünne Seite in den Suchergebnissen landen.
  if (!found) return { robots: { index: false } };

  return {
    title: `Behindertenparkplätze: Städte mit ${found.key} – wheelee`,
    description: `${found.cities.length} Städte und Gemeinden mit ${found.key}, in denen wheelee Behindertenparkplätze kennt.`,
    alternates: { canonical: letterPath(found.key) },
  };
}

export default async function BuchstabenSeite({ params }: Props) {
  const found = gruppe((await params).letter);
  if (!found) notFound();

  return (
    <main className="relative min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <Link
          href="/parkplaetze"
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-blue-800 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300"
        >
          <span aria-hidden="true">←</span> Alle Städte
        </Link>

        <h1 className="mt-3 text-2xl font-semibold">Städte mit {found.key}</h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {found.cities.length} Städte und Gemeinden.
        </p>

        <ul className={`mt-4 ${LINK_LIST}`}>
          {found.cities.map((city) => (
            <li key={city.slug}>
              <a href={`/parkplaetze/${city.slug}`}>{city.name}</a>
            </li>
          ))}
        </ul>

        {/* Die übrigen Buchstaben, damit man nicht über die Übersicht zurück
            muss – und damit jede Buchstabenseite auf jede andere zeigt. */}
        <nav aria-label="Weitere Buchstaben" className="mt-8 border-t border-neutral-200 pt-4 dark:border-neutral-800">
          <ul className={LINK_LIST}>
            {found.letters
              .filter((letter) => letter !== found.key)
              .map((letter) => (
                <li key={letter}>
                  <a href={letterPath(letter)}>{letter}</a>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
