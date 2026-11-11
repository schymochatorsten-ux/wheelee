import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
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

/**
 * Strukturierte Angaben für diese Stadt (ToDo 19.17).
 *
 * **Zwei Dinge, die eine Suchmaschine aus der Liste allein nicht liest:** wo
 * sie sich im Aufbau der Seite befindet (`BreadcrumbList` – Google zeigt den
 * Pfad im Suchergebnis an, statt nur die nackte Adresse) und dass es sich um
 * eine Sammlung von Orten handelt (`CollectionPage` mit `about`). `<` wird
 * maskiert, damit nichts den Skript-Block beenden kann – wie auf der
 * Startseite.
 */
function cityJsonLd(name: string, slug: string, spots: number, description: string): string {
  const base = "https://wheelee.de";
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "wheelee", item: base },
          { "@type": "ListItem", position: 2, name: "Städte", item: `${base}/parkplaetze` },
          { "@type": "ListItem", position: 3, name, item: `${base}/parkplaetze/${slug}` },
        ],
      },
      {
        "@type": "CollectionPage",
        name: `Behindertenparkplätze in ${name}`,
        url: `${base}/parkplaetze/${slug}`,
        description,
        isPartOf: { "@type": "WebSite", name: "wheelee", url: base },
        about: { "@type": "Place", name },
        mainEntity: { "@type": "ItemList", numberOfItems: spots },
      },
    ],
  }).replace(/</gu, "\\u003c");
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const found = spotsOfCity(slug);
  if (!found) notFound();

  const { city, spots } = found;
  // Auch dieser Datenblock trägt die Nonce – die Inhaltsrichtlinie verlangt
  // sie für jedes `<script>` (10.7), wie auf der Startseite.
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const t = translator(await getLocale());
  const vars = { city: city.name, spots: city.spotCount, spaces: city.spaceCount };
  const rows = spots.slice(0, MAX_ROWS);

  return (
    // `relative` aus dem Grund in 9.22: Ein `sr-only`-Element unterhalb des
    // sichtbaren Bereichs wäre sonst nicht vom `overflow` erfasst.
    <main className="relative min-h-0 flex-1 overflow-y-auto">
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: cityJsonLd(city.name, slug, city.spotCount, t("city.description", vars)),
        }}
      />
      <div className="mx-auto max-w-2xl px-4 py-6">
        {/* Der Weg zurück führt jetzt auch über das Verzeichnis: ein Verweis
            von jeder Stadtseite dorthin und von dort auf jede andere. */}
        <nav aria-label="Pfad" className="mt-1 text-xs text-neutral-500">
          <Link href="/parkplaetze" className="hover:underline">
            Alle Städte
          </Link>
        </nav>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-blue-800 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:text-blue-300"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            ‹
          </span>{" "}
          {t("error.backToMap")}
        </Link>

        <h1 className="mt-3 text-[28px] leading-tight font-bold tracking-tight text-blue-800 dark:text-blue-200">
          {t("city.title", vars)}
        </h1>
        <p className="mt-3 text-lg leading-snug">{t("city.intro", vars)}</p>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {city.coverage === "official" ? t("city.official") : t("city.crowd")}
        </p>
        {/*
          Die gebräuchlichen anderen Namen stehen im Text, nicht in einer
          Schlagwortliste (19.17). `meta keywords` wertet keine Suchmaschine
          mehr aus; was zählt, sind die Wörter, nach denen Menschen wirklich
          suchen – „Schwerbehindertenparkplatz" findet sonst niemand hier.
          Der Satz erklärt zugleich, was gemeint ist, und ist damit auch ohne
          Suchmaschine seinen Platz wert.
        */}
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{t("city.synonyms")}</p>

        <Link
          href={`/?stadt=${encodeURIComponent(slug)}`}
          className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-blue-700 px-4 text-sm font-medium text-white hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {t("city.openMap")}
        </Link>

        <section className="mt-6 rounded-2xl border border-neutral-200/70 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/60">
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
