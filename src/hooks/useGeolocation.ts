"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { type MessageKey } from "@/i18n";
import { useT } from "@/i18n/context";
import type { LatLng } from "@/lib/geo";

/**
 * Standortbestimmung über die Browser-API.
 *
 * Der Standort bleibt ausschließlich im Browser – er wird nicht gespeichert und
 * nicht an den Server geschickt (siehe Konzept, Datenschutz).
 */

export type GeolocationStatus =
  /** Noch nicht angefragt. */
  | "idle"
  /** Anfrage läuft, Nutzer:in entscheidet oder das Gerät sucht. */
  | "locating"
  /** Standort liegt vor. */
  | "ready"
  /** Zugriff verweigert. */
  | "denied"
  /** Gerät oder Browser kann keinen Standort liefern. */
  | "unavailable"
  /** Zeitüberschreitung. */
  | "timeout";

export interface GeolocationState {
  status: GeolocationStatus;
  position: LatLng | null;
  /** Genauigkeit in Metern, wie vom Gerät gemeldet. */
  accuracyMeters: number | null;
  /** Verständliche Meldung für die Oberfläche, sonst `null`. */
  message: string | null;
}

const MESSAGES: Record<Exclude<GeolocationStatus, "idle" | "locating" | "ready">, MessageKey> = {
  denied: "geo.denied",
  unavailable: "geo.unavailable",
  timeout: "geo.timeout",
};

const OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10_000,
  // Eine halbe Minute alter Wert ist für die Parkplatzsuche genau genug und
  // spart dem Gerät eine erneute Ortung.
  maximumAge: 30_000,
};

export function useGeolocation(): GeolocationState & {
  /** Standortbestimmung starten oder wiederholen. */
  request: () => void;
} {
  const [state, setState] = useState<GeolocationState>({
    status: "idle",
    position: null,
    accuracyMeters: null,
    message: null,
  });

  const t = useT();
  const watchId = useRef<number | null>(null);

  const request = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState({
        status: "unavailable",
        position: null,
        accuracyMeters: null,
        message: t(MESSAGES.unavailable),
      });
      return;
    }

    setState((previous) => ({ ...previous, status: "locating", message: null }));

    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
    }

    // watchPosition statt getCurrentPosition: Beim Gehen zum Parkplatz soll die
    // Entfernung mitlaufen.
    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        setState({
          status: "ready",
          position: { lat: position.coords.latitude, lng: position.coords.longitude },
          accuracyMeters: position.coords.accuracy,
          message: null,
        });
      },
      (error) => {
        const status: GeolocationStatus =
          error.code === error.PERMISSION_DENIED
            ? "denied"
            : error.code === error.TIMEOUT
              ? "timeout"
              : "unavailable";

        setState({
          status,
          position: null,
          accuracyMeters: null,
          message: t(MESSAGES[status as keyof typeof MESSAGES]),
        });
      },
      OPTIONS,
    );
  }, [t]);

  useEffect(() => {
    return () => {
      if (watchId.current !== null && typeof navigator !== "undefined") {
        navigator.geolocation?.clearWatch(watchId.current);
      }
    };
  }, []);

  return { ...state, request };
}
