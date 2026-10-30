"use client";

import { useEffect, useState } from "react";
import type { CityInfo } from "@/lib/parking/spots";

/**
 * Die Städteliste, nachgeladen von `/api/cities` (ToDo 19.9).
 *
 * Bis die Antwort da ist, steht nur die Standardstadt zur Verfügung – die
 * Startseite liefert sie mit, damit der erste Eindruck nicht auf eine zweite
 * Anfrage wartet. Die Antwort wird je Seitenaufruf nur einmal geholt.
 */
/** Form der Antwort von `/api/cities` (siehe dort). */
interface CitiesResponse {
  sources: { attribution: string; license: string | null }[];
  cities: {
    slug: string;
    name: string;
    lat: number;
    lng: number;
    src: number;
    importedAt: string;
    spotCount: number;
    spaceCount: number;
    coverage: CityInfo["coverage"];
  }[];
}

let loaded: CityInfo[] | null = null;
let pending: Promise<CityInfo[]> | null = null;

function load(): Promise<CityInfo[]> {
  pending ??= fetch("/api/cities")
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json() as Promise<CitiesResponse>;
    })
    .then(({ sources, cities }) => {
      // Die verdichtete Antwort (2e.14) wieder in die gewohnte Form bringen.
      loaded = cities.map((city) => ({
        slug: city.slug,
        name: city.name,
        center: { lat: city.lat, lng: city.lng },
        attribution: sources[city.src].attribution,
        license: sources[city.src].license,
        importedAt: city.importedAt,
        spotCount: city.spotCount,
        spaceCount: city.spaceCount,
        coverage: city.coverage,
      }));
      return loaded;
    })
    .catch((error) => {
      // Beim nächsten Einhängen erneut versuchen, nicht dauerhaft aufgeben.
      pending = null;
      throw error;
    });
  return pending;
}

export function useCities(initial: CityInfo): CityInfo[] {
  const [cities, setCities] = useState<CityInfo[]>(loaded ?? [initial]);

  useEffect(() => {
    if (loaded) {
      setCities(loaded);
      return;
    }
    let cancelled = false;
    load()
      .then((all) => {
        if (!cancelled) setCities(all);
      })
      .catch(() => {
        // Ohne Netz bleibt die Standardstadt; der Service Worker hält die letzte Antwort vor.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return cities;
}
