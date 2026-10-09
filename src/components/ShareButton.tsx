"use client";

import { useEffect, useState } from "react";
import type { ParkingSpot } from "@/lib/types";

/**
 * Parkplatz teilen.
 *
 * Nützlicher als es klingt: Wer jemanden abholt oder begleitet wird, muss den
 * Treffpunkt mitteilen können. Geteilt wird die Koordinate, nicht die Adresse –
 * bei vielen Parkplätzen ist der Straßenname nur die nächstgelegene Straße.
 */

interface ShareButtonProps {
  spot: ParkingSpot;
}

type State = "bereit" | "kopiert" | "fehler";

function shareText(spot: ParkingSpot): { title: string; text: string; url: string } | null {
  if (spot.lat === null || spot.lng === null) return null;

  const name = [spot.street, spot.houseNumber].filter(Boolean).join(" ") || spot.label;
  return {
    title: `Behindertenparkplatz ${name}`,
    text:
      `Behindertenparkplatz: ${name}` +
      (spot.spotCount > 1 ? ` (${spot.spotCount} Stellplätze)` : ""),
    // Ein Link auf OpenStreetMap funktioniert überall und braucht keine App.
    url: `https://www.openstreetmap.org/?mlat=${spot.lat}&mlon=${spot.lng}#map=19/${spot.lat}/${spot.lng}`,
  };
}

export function ShareButton({ spot }: ShareButtonProps) {
  const [state, setState] = useState<State>("bereit");
  const [canShare, setCanShare] = useState(false);

  // Erst nach dem Laden prüfen: Auf dem Server gibt es kein `navigator`.
  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  // Rückmeldung nach kurzer Zeit zurücksetzen.
  useEffect(() => {
    if (state === "bereit") return;
    const timer = setTimeout(() => setState("bereit"), 2500);
    return () => clearTimeout(timer);
  }, [state]);

  const payload = shareText(spot);
  if (!payload) return null;

  const share = async () => {
    // Auf dem Smartphone das System-Teilen, sonst in die Zwischenablage.
    if (canShare) {
      try {
        await navigator.share(payload);
        return;
      } catch (error) {
        // Abbruch durch die Nutzer:in ist kein Fehler.
        if ((error as Error)?.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(`${payload.text}\n${payload.url}`);
      setState("kopiert");
    } catch {
      setState("fehler");
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className="min-h-12 w-full rounded-xl border border-neutral-300 px-4 font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700"
    >
      {state === "kopiert" && "Link kopiert"}
      {state === "fehler" && "Kopieren nicht möglich"}
      {state === "bereit" && (canShare ? "Parkplatz teilen" : "Link kopieren")}
    </button>
  );
}
