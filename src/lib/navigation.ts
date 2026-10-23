import { DEFAULT_LOCALE, t, type Locale, type MessageKey } from "@/i18n";
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
  label: MessageKey;
  /** Wie `label`, für die Navigationsleiste über der Karte. */
  navigateLabel: MessageKey;
  /** Kurzname für Einstellungen und Umschalter. */
  shortLabel: MessageKey;
  /** Link zum Ziel; `null`, wenn die App nichts Passendes kann. */
  url: (lat: number, lng: number, label: string) => string;
}

export const MAPS_APPS: readonly MapsApp[] = [
  {
    id: "google",
    label: "maps.google.open",
    navigateLabel: "maps.google.navigate",
    shortLabel: "maps.google.short",
    url: (lat, lng) =>
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`,
  },
  {
    id: "apple",
    label: "maps.apple.open",
    navigateLabel: "maps.apple.navigate",
    shortLabel: "maps.apple.short",
    url: (lat, lng, label) =>
      `https://maps.apple.com/?daddr=${lat},${lng}&q=${encodeURIComponent(label)}&dirflg=d`,
  },
  {
    id: "osm",
    label: "maps.osm.open",
    navigateLabel: "maps.osm.navigate",
    shortLabel: "maps.osm.short",
    url: (lat, lng) =>
      `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=;${lat},${lng}`,
  },
  {
    id: "here",
    label: "maps.here.open",
    navigateLabel: "maps.here.navigate",
    shortLabel: "maps.here.short",
    url: (lat, lng, label) =>
      `https://share.here.com/r/mylocation/${lat},${lng}?m=d&t=${encodeURIComponent(label)}`,
  },
  {
    id: "waze",
    label: "maps.waze.open",
    navigateLabel: "maps.waze.navigate",
    shortLabel: "maps.waze.short",
    url: (lat, lng) => `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`,
  },
  {
    id: "geo",
    // Der geo:-Link überlässt dem Betriebssystem die Wahl der App.
    label: "maps.geo.open",
    navigateLabel: "maps.geo.navigate",
    shortLabel: "maps.geo.short",
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
export function mapsLabel(target: MapsTarget, locale: Locale = DEFAULT_LOCALE): string {
  return t(appById.get(target)?.label ?? "maps.fallback.open", undefined, locale);
}

/** Beschriftung des Knopfs in der Navigationsleiste. */
export function mapsNavigateLabel(target: MapsTarget, locale: Locale = DEFAULT_LOCALE): string {
  return t(appById.get(target)?.navigateLabel ?? "maps.fallback.navigate", undefined, locale);
}

/** Kurzname, etwa für eine Auswahlliste. */
export function mapsShortLabel(target: MapsTarget, locale: Locale = DEFAULT_LOCALE): string {
  return t(appById.get(target)?.shortLabel ?? "maps.fallback.short", undefined, locale);
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
