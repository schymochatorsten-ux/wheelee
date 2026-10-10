"use client";

import { useEffect } from "react";
import { MapContainer, Marker, Polyline, TileLayer, useMap } from "react-leaflet";
import type { ParkingSpot } from "@/lib/types";
import type { LatLng } from "@/lib/geo";
import { SpotMarkers } from "./SpotMarkers";
import { destinationIcon, userIcon } from "./icons";
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
  /** Eingegebenes Reiseziel, falls eines gewählt wurde (ToDo 6.12). */
  destination: (LatLng & { label: string }) | null;
  nearestId: string | null;
  /** Gemeinsam hervorgehobene Parkplätze der Auswahl, falls aufgeklappt. */
  highlightIds?: ReadonlySet<string> | null;
  /** Parkplatz, auf den die Karte zentrieren soll. */
  focus: { lat: number; lng: number; key: string } | null;
  /**
   * Luftlinie vom Bezugspunkt (Standort oder Ziel) zum gewählten Parkplatz.
   * `null`, solange es keinen Bezugspunkt oder keine Auswahl gibt.
   */
  line?: { from: LatLng; to: LatLng } | null;
  onSelect: (spot: ParkingSpot) => void;
  /** Meldet den sichtbaren Ausschnitt, damit nur dessen Parkplätze geladen werden. */
  onBoundsChange?: (bounds: MapBounds) => void;
}

/** Sichtbarer Kartenausschnitt. */
export interface MapBounds {
  minLat: number;
  minLng: number;
  maxLat: number;
  maxLng: number;
}

/**
 * Meldet den sichtbaren Ausschnitt nach oben, damit nur dessen Parkplätze
 * geladen werden (ToDo 5.4).
 *
 * `moveend` deckt Ziehen und Zoomen ab. Der erste Aufruf kommt beim Einhängen,
 * denn ohne Bewegung gäbe es sonst nie eine Grenze – und damit keine Marker.
 */
function BoundsReporter({ onChange }: { onChange: (bounds: MapBounds) => void }) {
  const map = useMap();

  useEffect(() => {
    const report = () => {
      const bounds = map.getBounds();
      onChange({
        minLat: bounds.getSouth(),
        minLng: bounds.getWest(),
        maxLat: bounds.getNorth(),
        maxLng: bounds.getEast(),
      });
    };

    report();
    map.on("moveend", report);
    return () => {
      map.off("moveend", report);
    };
  }, [map, onChange]);

  return null;
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
  destination,
  nearestId,
  highlightIds = null,
  focus,
  line = null,
  onSelect,
  onBoundsChange,
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

      {/*
        Die Luftlinie liegt **unter** den Markern, damit sie keinen Marker
        verdeckt und keinen Klick abfängt (`interactive={false}`).

        Gestrichelt, und das ist eine inhaltliche Entscheidung: Eine
        durchgezogene Linie auf einer Karte liest sich als Route. Diese ist
        keine – sie zeigt Richtung und Luftlinienentfernung. Die Striche sagen
        „so weit, in dieser Richtung", nicht „hier fährst du".

        Die zweite, breitere Linie darunter ist eine weiße Fassung derselben
        Strecke. Ohne sie verschwindet Rot auf den roten Dächern und Straßen
        der OSM-Kacheln; mit ihr bleibt die Linie auch über dicht bebautem
        Gebiet erkennbar – und im Sonnenlicht auf dem Display, dem Fall aus
        ToDo 14.4.
      */}
      {line && (
        <>
          <Polyline
            positions={[
              [line.from.lat, line.from.lng],
              [line.to.lat, line.to.lng],
            ]}
            pathOptions={{ color: "#ffffff", weight: 7, opacity: 0.85 }}
            interactive={false}
          />
          <Polyline
            positions={[
              [line.from.lat, line.from.lng],
              [line.to.lat, line.to.lng],
            ]}
            pathOptions={{
              color: "#dc2626",
              weight: 3,
              opacity: 0.95,
              dashArray: "8 7",
            }}
            interactive={false}
          />
        </>
      )}

      <SpotMarkers
        spots={spots}
        nearestId={nearestId}
        highlightIds={highlightIds}
        onSelect={onSelect}
      />

      {userPosition && (
        <Marker
          position={[userPosition.lat, userPosition.lng]}
          icon={userIcon}
          alt="Dein Standort"
          interactive={false}
        />
      )}

      {destination && (
        <Marker
          position={[destination.lat, destination.lng]}
          icon={destinationIcon}
          alt={`Ziel: ${destination.label}`}
          title={`Ziel: ${destination.label}`}
          interactive={false}
        />
      )}

      <MapFocus target={focus} />
      {onBoundsChange && <BoundsReporter onChange={onBoundsChange} />}
    </MapContainer>
  );
}
