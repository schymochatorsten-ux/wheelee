"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";
import type { ParkingSpot } from "@/lib/types";
import { hasCoordinates } from "@/lib/geo";
import { useLocale, useT } from "@/i18n/context";
import { iconFor } from "./icons";
import { clusterLabel, clusterSize } from "./cluster";

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
  /** ID des hervorgehobenen Parkplatzes (nächster oder gewähltes Ziel). */
  nearestId: string | null;
  /**
   * Weitere Parkplätze, die gemeinsam hervorgehoben werden – die Auswahl der
   * Leiste (ToDo 6.16). Damit ist erkennbar, wie die Angebote zueinander
   * liegen, statt sie nur als Liste zu lesen.
   */
  highlightIds?: ReadonlySet<string> | null;
  onSelect: (spot: ParkingSpot) => void;
}

export function SpotMarkers({ spots, nearestId, highlightIds = null, onSelect }: SpotMarkersProps) {
  const t = useT();
  const locale = useLocale();
  const map = useMap();

  useEffect(() => {
    const cluster = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 50,
      // Der hervorgehobene Parkplatz darf nicht in einem Cluster verschwinden.
      disableClusteringAtZoom: 17,
      chunkedLoading: true,

      /*
       * Eigene Bündel statt der mitgelieferten (ToDo 9.17). Deren 40 px waren
       * der einzige Mangel, den die Barrierefreiheitsprüfung am 2026-10-21
       * fand; die Begründung für 48 px und für die Beschriftung steht in
       * `cluster.ts`.
       */
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();
        const size = clusterSize(count);

        return L.divIcon({
          className: "wheelee-cluster",
          // `aria-label` am Element selbst, nicht an einem Kind: Leaflet macht
          // aus diesem Html den Inhalt des Markers, und der Screenreader liest
          // sonst nur die nackte Zahl.
          html: `<span role="button" aria-label="${clusterLabel(count, locale)}">${count}</span>`,
          iconSize: L.point(size, size),
        });
      },
    });

    for (const spot of spots) {
      if (!hasCoordinates(spot)) continue;

      const isTarget = spot.id === nearestId;
      const isCandidate = highlightIds?.has(spot.id) ?? false;

      const spaces = t(spot.spotCount === 1 ? "list.spacesOne" : "list.spacesMany", {
        count: spot.spotCount,
      });
      const name = isTarget
        ? t("map.markerTarget", { label: spot.label, spaces })
        : isCandidate
          ? t("map.markerCandidate", { label: spot.label, spaces })
          : t("map.marker", { label: spot.label, spaces });

      const marker = L.marker([spot.lat, spot.lng], {
        icon: iconFor({
          isNearest: isTarget,
          isCandidate,
          isApproximate: spot.geoAccuracy !== "house",
        }),
        title: name,
        keyboard: true,
        riseOnHover: true,
        zIndexOffset: isTarget ? 1000 : isCandidate ? 500 : 0,
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
  }, [map, spots, nearestId, highlightIds, onSelect, t, locale]);

  return null;
}
