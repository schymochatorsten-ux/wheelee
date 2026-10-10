"use client";

import { useEffect, useRef, useState } from "react";
import type { ParkingSpot, ParkingSpotWithDistance } from "@/lib/types";
import { distanceMeters, type LatLng } from "@/lib/geo";
import type { Bounds } from "@/lib/parking/spots";

/**
 * Parkplätze vom Server holen, statt alle in die Seite zu schreiben
 * (ToDo 5.4 / 2e.8).
 *
 * Vorher trug die Startseite sämtliche Standorte im HTML – 6,3 MB. Das ist im
 * Mobilfunknetz kein Ladeverhalten, das man jemandem zumuten kann, der gerade
 * einen Parkplatz sucht.
 */

interface SpotResponse {
  spots: ParkingSpot[];
  truncated: boolean;
  total: number;
}

/** Verwirft Antworten, die von einer überholten Anfrage stammen. */
function useLatestOnly() {
  const current = useRef(0);
  return () => {
    current.current += 1;
    const mine = current.current;
    return () => mine === current.current;
  };
}

/**
 * Die Parkplätze im Kartenausschnitt.
 *
 * Wartet eine kurze Zeit ab, bevor geladen wird: Beim Ziehen der Karte
 * entstehen sonst Dutzende Anfragen, von denen nur die letzte zählt.
 */
export function useSpotsInBounds(
  bounds: Bounds | null,
  initial: ParkingSpot[] = [],
): { spots: ParkingSpot[]; truncated: boolean; loading: boolean } {
  const [state, setState] = useState<{ spots: ParkingSpot[]; truncated: boolean }>({
    spots: initial,
    truncated: false,
  });
  const [loading, setLoading] = useState(false);
  const isLatest = useLatestOnly();
  /**
   * Zuletzt geladener Ausschnitt.
   *
   * Beim Einhängen melden Karte und Entwicklungsmodus denselben Ausschnitt
   * mehrfach; ohne diese Sperre liefen vier identische Anfragen.
   */
  const lastBbox = useRef<string | null>(null);

  useEffect(() => {
    if (!bounds) return;
    const bbox = [bounds.minLng, bounds.minLat, bounds.maxLng, bounds.maxLat].join(",");
    if (bbox === lastBbox.current) return;

    const stillCurrent = isLatest();

    const timer = setTimeout(async () => {
      setLoading(true);
      lastBbox.current = bbox;
      try {
        const response = await fetch(`/api/spots?bbox=${bbox}&limit=2000`);
        if (!response.ok) return;
        const data = (await response.json()) as SpotResponse;
        if (stillCurrent()) setState({ spots: data.spots, truncated: data.truncated });
      } catch {
        // Kein Netz: Die zuletzt geladenen Marker bleiben stehen. Besser eine
        // veraltete Karte als eine leere – im Funkloch ist beides möglich,
        // und die alten Marker sind mit hoher Wahrscheinlichkeit noch richtig.
      } finally {
        if (stillCurrent()) setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bounds?.minLat, bounds?.minLng, bounds?.maxLat, bounds?.maxLng]);

  return { ...state, loading };
}

/**
 * Die nächstgelegenen Parkplätze zu einem Punkt.
 *
 * Nicht bei jeder Standortmeldung neu: Das Gerät meldet beim Gehen im
 * Sekundentakt, und ein paar Meter ändern an der Reihenfolge nichts.
 */
const REFETCH_AFTER_METERS = 150;

export function useNearbySpots(
  origin: LatLng | null,
  initial: ParkingSpotWithDistance[] = [],
  limit = 100,
): ParkingSpotWithDistance[] {
  const [spots, setSpots] = useState<ParkingSpotWithDistance[]>(initial);
  const lastOrigin = useRef<LatLng | null>(null);
  const isLatest = useLatestOnly();

  useEffect(() => {
    if (!origin) return;
    if (lastOrigin.current && distanceMeters(lastOrigin.current, origin) < REFETCH_AFTER_METERS) {
      return;
    }
    lastOrigin.current = origin;
    const stillCurrent = isLatest();

    (async () => {
      try {
        const response = await fetch(
          `/api/spots?lat=${origin.lat}&lng=${origin.lng}&limit=${limit}`,
        );
        if (!response.ok) return;
        const data = (await response.json()) as { spots: ParkingSpotWithDistance[] };
        if (stillCurrent()) setSpots(data.spots);
      } catch {
        // Siehe oben: lieber die zuletzt bekannten Parkplätze behalten.
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin?.lat, origin?.lng, limit]);

  return spots;
}
