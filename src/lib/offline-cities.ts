import { DEFAULT_LOCALE, localeTag, type Locale } from "@/i18n";
import type { CityInfo } from "@/lib/parking/spots";
import type { ParkingSpot } from "@/lib/types";

/**
 * Vorab geladene Städte (ToDo 16.1).
 *
 * Die Seite legt die Daten selbst in der Cache API ab, der Service Worker
 * (`public/sw.js`) liest sie bei fehlendem Netz. Der Name des Speichers steht
 * dort ein zweites Mal – **beide müssen übereinstimmen**, und er trägt bewusst
 * keine Versionsnummer: Ein neuer Service Worker darf mitgenommene Städte nicht
 * wegwerfen.
 */
export const OFFLINE_CACHE = "wheelee-city";

/**
 * Ab wann ein Stand als veraltet gilt. Die Daten werden halbjährlich komplett
 * neu importiert (Datenpflege.md, Abschnitt 3); was älter als ein halbes Jahr
 * plus eine Woche Spielraum ist, hat den letzten Durchgang verpasst.
 */
export const STALE_DATA_DAYS = 190;
/** Die Aktualitätsprüfung läuft monatlich – eine ältere Kopie hat sie verpasst. */
export const STALE_COPY_DAYS = 31;

export interface OfflineCityEntry {
  city: CityInfo;
  spots: ParkingSpot[];
  /** Wann diese Kopie auf das Gerät geladen wurde (ISO). */
  savedAt: string;
}

export interface OfflineCitySummary {
  slug: string;
  name: string;
  importedAt: string;
  savedAt: string;
  spotCount: number;
  bytes: number;
}

export type Staleness = "fresh" | "copy" | "data";

const DAY_MS = 86_400_000;

/** Veraltete Daten wiegen schwerer als eine alte Kopie. */
export function stalenessOf(
  entry: Pick<OfflineCitySummary, "importedAt" | "savedAt">,
  now: Date = new Date(),
): Staleness {
  const age = (iso: string) => (now.getTime() - new Date(iso).getTime()) / DAY_MS;
  if (age(entry.importedAt) > STALE_DATA_DAYS) return "data";
  if (age(entry.savedAt) > STALE_COPY_DAYS) return "copy";
  return "fresh";
}

export function formatBytes(bytes: number, locale: Locale = DEFAULT_LOCALE): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toLocaleString(localeTag(locale), { maximumFractionDigits: 1 })} MB`;
}

export function offlineSupported(): boolean {
  return typeof caches !== "undefined";
}

const keyOf = (slug: string) => `/offline/${encodeURIComponent(slug)}`;

export async function saveOfflineCity(slug: string): Promise<OfflineCitySummary> {
  const response = await fetch(`/api/offline?city=${encodeURIComponent(slug)}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = (await response.json()) as Pick<OfflineCityEntry, "city" | "spots">;

  const body = JSON.stringify({ ...data, savedAt: new Date().toISOString() });
  const cache = await caches.open(OFFLINE_CACHE);
  await cache.put(
    keyOf(slug),
    new Response(body, { headers: { "Content-Type": "application/json" } }),
  );
  return summarize(JSON.parse(body) as OfflineCityEntry, new Blob([body]).size);
}

export async function listOfflineCities(): Promise<OfflineCitySummary[]> {
  const cache = await caches.open(OFFLINE_CACHE);
  const summaries: OfflineCitySummary[] = [];
  for (const request of await cache.keys()) {
    const response = await cache.match(request);
    if (!response) continue;
    const text = await response.text();
    summaries.push(summarize(JSON.parse(text) as OfflineCityEntry, new Blob([text]).size));
  }
  return summaries.sort((a, b) => a.name.localeCompare(b.name, "de"));
}

export async function removeOfflineCity(slug: string): Promise<void> {
  const cache = await caches.open(OFFLINE_CACHE);
  await cache.delete(keyOf(slug));
}

function summarize(entry: OfflineCityEntry, bytes: number): OfflineCitySummary {
  return {
    slug: entry.city.slug,
    name: entry.city.name,
    importedAt: entry.city.importedAt,
    savedAt: entry.savedAt,
    spotCount: entry.spots.length,
    bytes,
  };
}
