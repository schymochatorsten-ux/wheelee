"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import type { SpotCluster } from "@/lib/parking/spots";
import { useLocale } from "@/i18n/context";
import { clusterLabel, clusterSize } from "./cluster";

/**
 * Zähler je Gebiet, wenn der Ausschnitt zu viele Standorte für Einzelmarker
 * enthält (ToDo 9.20).
 *
 * **Warum eine eigene Ebene und nicht `leaflet.markercluster`.** Die Bündel
 * jener Erweiterung entstehen aus den Markern, die der Browser hat – und das
 * sind bei abgeschnittener Antwort nur die ersten 2.000 in Seed-Reihenfolge.
 * Ein Bündel über einer unvollständigen Menge zeigt eine falsche Zahl, und
 * eine Zahl sieht aus wie Wissen: Das wäre schlechter als die leere Karte, die
 * es bisher gab (9.16). Diese Zähler kommen fertig gerechnet vom Server, über
 * **alle** Standorte des Ausschnitts.
 *
 * Aussehen und Beschriftung sind dieselben wie bei den Bündeln (`cluster.ts`,
 * 48 px Bedienmaß) – für die Nutzerin ist es dieselbe Sache, und zwei
 * verschiedene runde Zahlen auf einer Karte wären eine Unterscheidung ohne
 * Unterschied.
 */

interface SpotCountsProps {
  clusters: readonly SpotCluster[];
}

/** Wie viele Stufen ein Antippen hineingeht. Zwei Schritte vierteln die Fläche. */
const ZOOM_STEP = 2;

export function SpotCounts({ clusters }: SpotCountsProps) {
  const locale = useLocale();
  const map = useMap();

  useEffect(() => {
    const layer = L.layerGroup();

    for (const cluster of clusters) {
      const size = clusterSize(cluster.count);
      const label = clusterLabel(cluster.count, locale);

      const marker = L.marker([cluster.lat, cluster.lng], {
        icon: L.divIcon({
          className: "wheelee-cluster",
          // Rolle und Name am Element selbst, nicht an einem Kind: Leaflet
          // macht aus diesem Html den Inhalt des Markers, und der
          // Screenreader liest sonst nur die nackte Zahl.
          html: `<span role="button" aria-label="${label}">${cluster.count}</span>`,
          iconSize: L.point(size, size),
        }),
        title: label,
        keyboard: true,
      });

      // Antippen zieht die Zahl auseinander – dieselbe Erwartung wie bei den
      // Bündeln. Der Schwerpunkt ist dabei der Zielpunkt, nicht die Zellmitte.
      const zoomIn = () => {
        map.flyTo([cluster.lat, cluster.lng], Math.min(map.getZoom() + ZOOM_STEP, 19), {
          duration: 0.6,
        });
      };

      marker.on("click", zoomIn);
      marker.on("keypress", (event) => {
        const key = (event as unknown as { originalEvent?: KeyboardEvent }).originalEvent?.key;
        if (key === undefined || key === "Enter" || key === " ") zoomIn();
      });

      layer.addLayer(marker);
    }

    layer.addTo(map);
    return () => {
      map.removeLayer(layer);
    };
  }, [map, clusters, locale]);

  return null;
}
