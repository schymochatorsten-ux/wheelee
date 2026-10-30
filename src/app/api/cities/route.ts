import { NextResponse } from "next/server";
import { getCities } from "@/lib/parking/spots";
import { withLogging } from "@/lib/log";

/**
 * Alle Städte mit Quelle, Lizenz und Zahlen (ToDo 19.9, 2e.14).
 *
 *     GET /api/cities
 *
 * Die Liste stand bisher im HTML der Startseite. Mit 648 Städten waren das
 * 179 KB, mit jeder Importstufe (2e.6) mehr – und gebraucht wird sie erst in der
 * Liste „Alle Städte" und in den Einstellungen, nicht für den ersten Eindruck.
 * Die Startseite trägt jetzt nur die Standardstadt; der Rest kommt von hier.
 *
 * **Verdichtet** (2e.14): Es gibt nur wenige verschiedene Quellenangaben
 * (18 bei 2.435 Städten), aber jede Stadt trug ihre in voller Länge – zusammen
 * 39 % der Antwort. Sie stehen jetzt einmal in `sources`, die Stadt verweist per
 * Index (`src`). Der Mittelpunkt ist auf vier Nachkommastellen gerundet (rund
 * 11 m); er dient nur dem Zentrieren, genauer braucht ihn nichts. `useCities`
 * baut daraus wieder die gewohnten `CityInfo`.
 */

/** Ändert sich nur durch einen neuen Import, also selten. */
const CACHE_CONTROL = "public, max-age=3600, stale-while-revalidate=86400";

const round4 = (value: number) => Math.round(value * 1e4) / 1e4;

function getHandler() {
  const sources: { attribution: string; license: string | null }[] = [];
  const indexOf = new Map<string, number>();

  const cities = getCities().map((city) => {
    const key = `${city.attribution}\u0000${city.license ?? ""}`;
    let src = indexOf.get(key);
    if (src === undefined) {
      src = sources.length;
      sources.push({ attribution: city.attribution, license: city.license });
      indexOf.set(key, src);
    }
    return {
      slug: city.slug,
      name: city.name,
      lat: round4(city.center.lat),
      lng: round4(city.center.lng),
      src,
      importedAt: city.importedAt,
      spotCount: city.spotCount,
      spaceCount: city.spaceCount,
      coverage: city.coverage,
    };
  });

  return NextResponse.json({ sources, cities }, { headers: { "Cache-Control": CACHE_CONTROL } });
}

export const GET = withLogging(getHandler);
