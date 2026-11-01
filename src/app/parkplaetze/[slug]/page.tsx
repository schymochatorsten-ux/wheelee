import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { translator } from "@/i18n";
import { getLocale } from "@/i18n/server";
import { spotTitle } from "@/lib/parking/display";
import { spotsOfCity } from "@/lib/parking/spots";

/**
 * Eine Seite je Stadt (ToDo 19.12): „Behindertenparkplätze in Hamburg“.
 *
 * **Warum es sie gibt:** Die Karte ist eine einzige Seite ohne Text, den eine
 * Suchmaschine lesen könnte. Wer „Behindertenparkplatz Hamburg“ sucht, fände
 * wheelee nie. Diese Seiten geben jeder Stadt eine eigene Adresse mit Titel,
 * Beschreibung und der Liste der Standorte als echtem Text; die Karte öffnet
 * dieselbe Stadt (`/?stadt=<slug>`).
 *
 * Der Text folgt der Sprache der Oberfläche (`city.*`); Straßennamen und
 * Quellenangaben bleiben, wie sie in den Daten stehen (D-08).
 */

/** Mehr Zeilen als diese braucht niemand zu lesen; die Karte zeigt den Rest. */
const MAX_ROWS = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = spotsOfCity(slug);
  if (!found) return { robots: { index: false } };
  const t = translator(await getLocale());
  const vars = {
    city: found.city.name,
    spots: found.city.spotCount,
    spaces: found.city.spaceCount,
  };
  return {
    title: `${t("city.title", vars)} – wheelee`,
    description: t("city.description", vars),
    alternates: { canonical: `/parkplaetze/${slug}` },
  };
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const found = spotsOfCity(slug);
  if (!found) notFound();

  const { city, spots } = found;
  const t = translator(await getLocale());
  const vars = { city: city.name, spots: city.spotCount, spaces: city.spaceCount };
  const rows = spots.slice(0, MAX_ROWS);

  return (
    <main className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-blue-800 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300"
        >
          <span aria-hidden="true">←</span> {t("error.backToMap")}
        </Link>

        <h1 className="mt-3 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-2xl font-bold text-transparent dark:from-blue-300 dark:to-cyan-300">
          {t("city.title", vars)}
        </h1>
        <p className="mt-3 text-lg leading-snug">{t("city.intro", vars)}</p>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {city.coverage === "official" ? t("city.official") : t("city.crowd")}
        </p>

        <Link
          href={`/?stadt=${encodeURIComponent(slug)}`}
          className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-4 text-sm font-medium text-white shadow-lg shadow-blue-700/30 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {t("city.openMap")}
        </Link>

        <section className="mt-6 rounded-2xl border border-neutral-200/70 bg-white/70 p-4 shadow-sm backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/50">
          <h2 className="text-base font-semibold">{t("city.list", vars)}</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {rows.map((spot) => (
              <li key={spot.id}>
                {spotTitle(spot)}
                {spot.district ? ` · ${spot.district}` : ""}
                {spot.timeRestriction ? ` · ${spot.timeRestriction}` : ""}
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-4 text-xs text-neutral-500">{city.attribution}</p>
      </div>
    </main>
  );
}
