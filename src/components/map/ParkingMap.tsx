"use client";

import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import type { ParkingSpot } from "@/lib/types";
import type { LatLng } from "@/lib/geo";
import { SpotMarkers } from "./SpotMarkers";
import { userIcon } from "./icons";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

/**
 * Die Kartendarstellung. Wird nur im Browser geladen (siehe MapSection),
 * weil Leaflet auf `window` zugreift.
 */

interface ParkingMapProps {
  spots: readonly ParkingSpot[];
  center: LatLng;
  /** Nutzerstandort, falls erlaubt und ermittelt. */
  userPosition: LatLng | null;
  nearestId: string | null;
  /** Parkplatz, auf den die Karte zentrieren soll. */
  focus: { lat: number; lng: number; key: string } | null;
  onSelect: (spot: ParkingSpot) => void;
}

/** Zentriert die Karte, wenn ein neuer Standort oder Parkplatz dazukommt. */
function MapFocus({ target }: { target: { lat: number; lng: number; key: string } | null }) {
  const map = useMap();

  useEffect(() => {
    if (!target) return;
    map.flyTo([target.lat, target.lng], Math.max(map.getZoom(), 17), { duration: 0.8 });
    // Nur auf einen echten Wechsel reagieren, nicht auf jedes Rendern.
  }, [map, target?.key]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

export default function ParkingMap({
  spots,
  center,
  userPosition,
  nearestId,
  focus,
  onSelect,
}: ParkingMapProps) {
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      zoomControl={false}
      className="h-full w-full"
      // Die Karte ist eine Ergänzung zur Liste; Screenreader nutzen die Liste.
      aria-label="Karte mit Behindertenparkplätzen"
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende'
      />

      <SpotMarkers spots={spots} nearestId={nearestId} onSelect={onSelect} />

      {userPosition && (
        <Marker
          position={[userPosition.lat, userPosition.lng]}
          icon={userIcon}
          alt="Dein Standort"
          interactive={false}
        />
      )}

      <MapFocus target={focus} />
    </MapContainer>
  );
}
