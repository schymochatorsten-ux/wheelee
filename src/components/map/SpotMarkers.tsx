"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";
import type { ParkingSpot } from "@/lib/types";
import { hasCoordinates } from "@/lib/geo";
import { iconFor } from "./icons";

/**
 * Alle Parkplätze als Cluster-Layer.
 *
 * Bei 350 Markern wäre eine einzelne Marker-Ebene auf dem Smartphone träge und
 * unübersichtlich; `leaflet.markercluster` fasst sie zusammen, bis man
 * hineinzoomt. Die Marker werden imperativ gesetzt, weil die Cluster-Erweiterung
 * eine Leaflet-Ebene ist und keine React-Komponenten kennt.
 */

interface SpotMarkersProps {
  spots: readonly ParkingSpot[];
  /** ID des nächstgelegenen Parkplatzes, falls bekannt. */
  nearestId: string | null;
  onSelect: (spot: ParkingSpot) => void;
}

export function SpotMarkers({ spots, nearestId, onSelect }: SpotMarkersProps) {
  const map = useMap();

  useEffect(() => {
    const cluster = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 50,
      // Der hervorgehobene Parkplatz darf nicht in einem Cluster verschwinden.
      disableClusteringAtZoom: 17,
      chunkedLoading: true,
    });

    for (const spot of spots) {
      if (!hasCoordinates(spot)) continue;

      const name = `${spot.label}, ${spot.spotCount} ${
        spot.spotCount === 1 ? "Stellplatz" : "Stellplätze"
      }${spot.id === nearestId ? ", nächstgelegener Parkplatz" : ""}`;

      const marker = L.marker([spot.lat, spot.lng], {
        icon: iconFor({
          isNearest: spot.id === nearestId,
          isApproximate: spot.geoAccuracy !== "house",
        }),
        title: name,
        keyboard: true,
        riseOnHover: true,
        zIndexOffset: spot.id === nearestId ? 1000 : 0,
      });

      // `alt` wirkt nur bei Bild-Icons. Unsere Marker sind DivIcons, deshalb
      // bekommen sie Rolle und Namen direkt am Element – sonst meldet der
      // Screenreader nur eine leere Schaltfläche.
      marker.on("add", () => {
        const element = marker.getElement();
        if (!element) return;
        element.setAttribute("role", "button");
        element.setAttribute("aria-label", name);
      });

      marker.on("click", () => onSelect(spot));
      marker.on("keypress", (event) => {
        const key = (event as unknown as { originalEvent?: KeyboardEvent }).originalEvent?.key;
        if (key === undefined || key === "Enter" || key === " ") onSelect(spot);
      });

      cluster.addLayer(marker);
    }

    map.addLayer(cluster);
    return () => {
      map.removeLayer(cluster);
    };
  }, [map, spots, nearestId, onSelect]);

  return null;
}
