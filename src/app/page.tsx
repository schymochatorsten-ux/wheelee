import type { Metadata } from "next";
import { headers } from "next/headers";
import { MapSection } from "@/components/MapSection";
import { LOCALE_CODES, translator } from "@/i18n";
import { getLocale } from "@/i18n/server";
import { getCities, getDefaultCity, nearestSpots } from "@/lib/parking/spots";
import { currentUser } from "@/lib/auth/session";
import { publicUser } from "@/lib/auth/user";

/**
 * Alle Aufrufe der Startseite (auch `/?stadt=…`) nennen `/` als kanonische
 * Adresse (ToDo 19.12): Die Seite je Stadt ist `/parkplaetze/<slug>`, die
 * Startseite mit Parameter nur eine andere Ansicht derselben App.
 */
export async function generateMetadata(): Promise<Metadata> {
  return { alternates: { canonical: "/" } };
}

/**
 * Strukturierte Angaben für Suchmaschinen (schema.org). Sie sagen, was wheelee ist,
 * dass es kostenlos ist und wem es hilft – Dinge, die eine Karte ohne Text nicht
 * selbst verrät. `<` wird maskiert, damit nichts den Skript-Block beenden kann.
 */
function jsonLd(description: string): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "wheelee",
    url: "https://wheelee.de",
    description,
    applicationCategory: "TravelApplication",
    operatingSystem: "Any",
    inLanguage: LOCALE_CODES,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    audience: { "@type": "PeopleAudience", audienceType: "Menschen mit Gehbehinderung" },
    areaServed: { "@type": "Country", name: "Deutschland" },
  }).replace(/</gu, "\\u003c");
}

/**
 * Startseite: Karte und Liste der Behindertenparkplätze.
 *
 * Die Parkplatzdaten kommen vom Server, der Standort entsteht erst im Browser –
 * so verlässt er das Gerät nicht.
 *
 * Mitgeliefert wird nur eine Handvoll Parkplätze um die Stadtmitte, damit die
 * Liste sofort etwas zeigt. Alles Weitere lädt die App über `/api/spots`
 * nach: Alle Standorte ins HTML zu schreiben ergab 6,3 MB, und das lädt im
 * Mobilfunknetz niemand gern, der gerade einen Parkplatz sucht (ToDo 5.4).
 *
 * **Die Seite liest die Sitzung und wird dadurch bei jedem Aufruf gerendert.**
 * Das ist der Preis dafür, dass der Reiter „Rückmeldungen" sofort da ist, wenn
 * der Administrator die App öffnet. Die Alternative wäre eine Abfrage aus dem
 * Browser nach dem Laden – dann blitzte die Oberfläche einen Moment als
 * „nicht angemeldet" auf, und zwar bei jedem Aufruf. Die Parkplatzdaten
 * bleiben ohnehin unverändert, und für das Funkloch hält der Service Worker
 * den letzten Stand der Seite vor.
 */
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ stadt?: string | string[] }>;
}) {
  // `/?stadt=<slug>` (ToDo 19.12): die Karte öffnet in dieser Stadt, wie die Seiten
  // unter `/parkplaetze/<slug>` es verlinken. Unbekannt oder fehlend gilt die Vorgabe.
  const { stadt } = await searchParams;
  const wanted = typeof stadt === "string" ? stadt : undefined;
  const defaultCity = getCities().find((city) => city.slug === wanted) ?? getDefaultCity();
  const user = await currentUser();

  const description = translator(await getLocale())("meta.description");
  // Auch der Datenblock trägt die Nonce: Die Sicherheitsprüfung (ToDo 10.7) verlangt sie
  // für jedes `<script>`, und ein Ausnahmefall wäre schwerer zu erklären als ein Attribut.
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: jsonLd(description) }} />
      <MapSection
        initialNearby={nearestSpots(defaultCity.center, 100)}
        defaultCity={defaultCity}
        user={user ? publicUser(user) : null}
      />
    </>
  );
}
