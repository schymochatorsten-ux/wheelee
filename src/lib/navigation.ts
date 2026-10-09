import type { ParkingSpot } from "./types";

/**
 * Links in die Karten-App des Geräts.
 *
 * Die App navigiert laut Konzept nicht selbst, sondern übergibt das Ziel an
 * eine vorhandene Karten-App. Geführt wird immer über die **Koordinate**, nicht
 * über die Adresse – bei vielen Parkplätzen ist der Straßenname nur die
 * nächstgelegene Straße, die Koordinate dagegen stimmt.
 */

export type MapsTarget = "google" | "apple" | "osm" | "here" | "waze" | "geo";

interface MapsApp {
  id: MapsTarget;
  label: string;
  /** Kurzname für Einstellungen und Umschalter. */
  shortLabel: string;
  /** Link zum Ziel; `null`, wenn die App nichts Passendes kann. */
  url: (lat: number, lng: number, label: string) => string;
}

export const MAPS_APPS: readonly MapsApp[] = [
  {
    id: "google",
    label: "In Google Maps öffnen",
    shortLabel: "Google Maps",
    url: (lat, lng) =>
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`,
  },
  {
    id: "apple",
    label: "In Apple Karten öffnen",
    shortLabel: "Apple Karten",
    url: (lat, lng, label) =>
      `https://maps.apple.com/?daddr=${lat},${lng}&q=${encodeURIComponent(label)}&dirflg=d`,
  },
  {
    id: "osm",
    label: "In OpenStreetMap öffnen",
    shortLabel: "OpenStreetMap",
    url: (lat, lng) =>
      `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=;${lat},${lng}`,
  },
  {
    id: "here",
    label: "In HERE WeGo öffnen",
    shortLabel: "HERE WeGo",
    url: (lat, lng, label) =>
      `https://share.here.com/r/mylocation/${lat},${lng}?m=d&t=${encodeURIComponent(label)}`,
  },
  {
    id: "waze",
    label: "In Waze öffnen",
    shortLabel: "Waze",
    url: (lat, lng) => `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`,
  },
  {
    id: "geo",
    // Der geo:-Link überlässt dem Betriebssystem die Wahl der App.
    label: "In der Standard-Karten-App öffnen",
    shortLabel: "Standard-App",
    url: (lat, lng) => `geo:${lat},${lng}?q=${lat},${lng}`,
  },
];

const appById = new Map(MAPS_APPS.map((app) => [app.id, app]));

/**
 * Zielplattform aus dem User-Agent ableiten.
 *
 * Apple-Geräte bekommen Apple Karten, weil die dort vorinstalliert ist. Alles
 * andere – auch der Desktop – bekommt Google Maps, das überall ohne
 * Installation im Browser funktioniert.
 */
export function detectMapsTarget(userAgent: string): MapsTarget {
  return /iphone|ipad|ipod|macintosh/iu.test(userAgent) ? "apple" : "google";
}

/** Beschriftung der Schaltfläche. */
export function mapsLabel(target: MapsTarget): string {
  return appById.get(target)?.label ?? "In Karten-App öffnen";
}

/** Kurzname, etwa für eine Auswahlliste. */
export function mapsShortLabel(target: MapsTarget): string {
  return appById.get(target)?.shortLabel ?? "Karten-App";
}

/** Link zum Parkplatz als Navigationsziel. */
export function mapsUrl(
  spot: Pick<ParkingSpot, "lat" | "lng" | "label">,
  target: MapsTarget,
): string | null {
  if (spot.lat === null || spot.lng === null) return null;

  const app = appById.get(target) ?? appById.get("google")!;
  return app.url(spot.lat, spot.lng, spot.label);
}
