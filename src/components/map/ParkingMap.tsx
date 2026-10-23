"use client";

import { useEffect } from "react";
import { latLngBounds, point } from "leaflet";
import { MapContainer, Marker, Polyline, TileLayer, useMap } from "react-leaflet";
import { useT } from "@/i18n/context";
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
  focus: FocusTarget | null;
  /**
   * Luftlinie vom Bezugspunkt (Standort oder Ziel) zum gewählten Parkplatz.
   * `null`, solange es keinen Bezugspunkt oder keine Auswahl gibt.
   */
  line?: { from: LatLng; to: LatLng } | null;
  onSelect: (spot: ParkingSpot) => void;
  /** Meldet den sichtbaren Ausschnitt, damit nur dessen Parkplätze geladen werden. */
  onBoundsChange?: (bounds: MapBounds) => void;
}

/**
 * Wohin die Karte fahren soll.
 *
 * Eine Liste statt eines Punktes, weil die drei Anlässe dasselbe brauchen und
 * sich nur in der Anzahl unterscheiden: ein Punkt beim Zentrieren auf den
 * eigenen Standort, zwei beim Sprung auf einen Parkplatz (mit Bezugspunkt,
 * ToDo 6.22), viele beim Aufklappen der Auswahl (ToDo 6.21). Drei Sonderfälle
 * nebeneinander wären dreimal dieselbe Rechnung mit drei Gelegenheiten, sie
 * unterschiedlich falsch zu machen.
 *
 * **Der erste Punkt ist der wichtigste.** Passen nicht alle in ein brauchbares
 * Bild, gilt er allein.
 */
export interface FocusTarget {
  /** Ein Wechsel dieses Werts löst die Fahrt aus, nicht jedes Rendern. */
  key: string;
  points: readonly LatLng[];
  /**
   * Wie viele Pixel oben für die schwebenden Leisten frei bleiben müssen.
   *
   * Die Angabe kommt von oben, weil nur dort bekannt ist, wie hoch die Leiste
   * gerade ist: Aufgeklappt deckt sie ein Vielfaches ab. Ohne das würden die
   * eingepassten Marker genau darunter landen – sichtbar gerechnet, aber
   * nicht zu sehen.
   */
  padTop?: number;
}

/** Sichtbarer Kartenausschnitt. */
export interface MapBounds {
  minLat: number;
  minLng: number;
  maxLat: number;
  maxLng: number;
  /** Zoomstufe des Ausschnitts (ToDo 9.16): bestimmt, welcher Hinweis passt. */
  zoom: number;
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
        zoom: map.getZoom(),
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

/**
 * Ab welcher Zoomstufe es sich noch lohnt, beide Punkte gemeinsam zu zeigen.
 *
 * Darunter ist ein Parkplatzmarker nur noch ein Punkt in einer Stadtansicht –
 * dann ist es nützlicher, nah am Parkplatz zu stehen, auch wenn der
 * Bezugspunkt dabei aus dem Bild fällt. 14 entspricht grob einem
 * Stadtviertel.
 */
const MIN_FIT_ZOOM = 14;

/**
 * Luft für die schwebenden Leisten.
 *
 * Oben sitzen Parkplatzvorschlag und Zielsuche; ohne diesen Abstand landet
 * der angesteuerte Punkt darunter und ist genau dann nicht zu sehen, wenn man
 * ihn ansieht. Unten sitzt die OpenStreetMap-Attribution.
 */
const PAD_TOP_DEFAULT = 170;
const PAD_BOTTOM: [number, number] = [40, 70];

/** Zentriert die Karte, wenn ein neuer Standort oder Parkplatz dazukommt. */
function MapFocus({ target }: { target: FocusTarget | null }) {
  const map = useMap();

  useEffect(() => {
    const points = target?.points ?? [];
    if (points.length === 0) return;

    const primary = points[0];
    const centre = () =>
      map.flyTo([primary.lat, primary.lng], Math.max(map.getZoom(), 17), { duration: 0.8 });

    if (points.length === 1) {
      centre();
      return;
    }

    /*
     * Mehrere Punkte gemeinsam ins Bild holen – den Bezugspunkt beim Sprung
     * auf einen Parkplatz (ToDo 6.22), die ganze Auswahl beim Aufklappen
     * (ToDo 6.21). Vorher sprang die Karte allein auf einen Punkt, und die
     * Luftlinie lief ohne Erklärung aus dem Bild: Man sah eine Linie, aber
     * nicht, worauf sie zeigt.
     *
     * **Nur wenn das Ergebnis noch etwas zeigt.** Liegt ein Punkt 40 km
     * entfernt, wäre es eine Landkarte, auf der der Parkplatz verschwindet.
     * Dann gilt der erste Punkt allein, denn er ist das, was man ansteuert.
     */
    {
      const padTop = target?.padTop ?? PAD_TOP_DEFAULT;
      const bounds = latLngBounds(points.map((spot) => [spot.lat, spot.lng])).pad(0.08);

      /*
       * Gerechnet wird gegen den Platz, der **nach Abzug der Leisten** übrig
       * bleibt – nicht gegen die ganze Karte. Sonst gälte ein Ausschnitt als
       * passend, der zur Hälfte unter der aufgeklappten Auswahl liegt.
       */
      const usable = point(40 * 2, padTop + PAD_BOTTOM[1]);
      if (map.getBoundsZoom(bounds, false, usable) >= MIN_FIT_ZOOM) {
        map.flyToBounds(bounds, {
          paddingTopLeft: [40, padTop],
          paddingBottomRight: PAD_BOTTOM,
          maxZoom: 17,
          duration: 0.8,
        });
        return;
      }
    }

    centre();
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
  const t = useT();
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      zoomControl={false}
      className="h-full w-full"
      // Die Karte ist eine Ergänzung zur Liste; Screenreader nutzen die Liste.
      aria-label={t("map.label")}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
        attribution={t("map.attribution")}
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
          alt={t("map.yourLocation")}
          interactive={false}
        />
      )}

      {destination && (
        <Marker
          position={[destination.lat, destination.lng]}
          icon={destinationIcon}
          alt={t("map.destination", { label: destination.label })}
          title={t("map.destination", { label: destination.label })}
          interactive={false}
        />
      )}

      <MapFocus target={focus} />
      {onBoundsChange && <BoundsReporter onChange={onBoundsChange} />}
    </MapContainer>
  );
}
