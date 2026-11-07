/*
 * Service Worker (ToDos 12.8, 12.9).
 *
 * Zweck ist nicht „offline arbeiten können", sondern **nicht dazustehen, wenn
 * das Netz wegbricht**. Genau dann braucht man diese App am ehesten: im
 * Parkhaus, in der Tiefgarage, im Funkloch kurz vor dem Ziel. Wer dort eine
 * weiße Seite sieht, ist schlechter dran als mit einem Zettel.
 *
 * Drei Regeln, je nach Art der Anfrage:
 *
 * - **Programmdateien** (`/_next/static/…`) tragen einen Hash im Namen und
 *   ändern sich nie: aus dem Zwischenspeicher, ohne Rückfrage.
 * - **Seite und Parkplatzdaten**: zuerst das Netz, bei Fehlschlag der
 *   Zwischenspeicher. So sind die Daten im Normalfall aktuell und im
 *   Funkloch wenigstens vorhanden.
 * - **Kartenkacheln**: zuerst der Zwischenspeicher, weil sie sich praktisch
 *   nie ändern und der Platz begrenzt ist.
 *
 * Bewusst **nicht** zwischengespeichert wird der Standort – er entsteht im
 * Browser und verlässt das Gerät nicht.
 */

/** Bei jeder Änderung hochzählen – sonst bleibt der alte Stand liegen. */
const VERSION = "v4";

/**
 * Vorab geladene Städte (ToDo 16.1). **Ohne Versionsnummer und von `activate`
 * ausgenommen**: Die Seite schreibt hinein (`src/lib/offline-cities.ts`, dort
 * steht derselbe Name); ein neuer Service Worker darf sie nicht leeren.
 */
const CITY_CACHE = "wheelee-city";

const SHELL_CACHE = `wheelee-shell-${VERSION}`;
const DATA_CACHE = `wheelee-data-${VERSION}`;
const TILE_CACHE = `wheelee-tiles-${VERSION}`;

/** So viele Kartenkacheln werden behalten – rund ein Stadtgebiet. */
const MAX_TILES = 300;

const SHELL = ["/", "/manifest.webmanifest", "/icon.svg", "/icon-192.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      // Einzeln, damit eine fehlende Datei nicht die ganze Installation
      // scheitern lässt: Ein halb funktionierender Zwischenspeicher ist
      // besser als gar keiner.
      .then((cache) => Promise.allSettled(SHELL.map((url) => cache.add(url))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  const keep = new Set([SHELL_CACHE, DATA_CACHE, TILE_CACHE, CITY_CACHE]);
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(names.filter((name) => !keep.has(name)).map((name) => caches.delete(name))),
      )
      .then(() => self.clients.claim()),
  );
});

/** Ältere Einträge wegwerfen, damit der Kachelspeicher nicht unbegrenzt wächst. */
async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= max) return;
  await Promise.all(keys.slice(0, keys.length - max).map((key) => cache.delete(key)));
}

async function networkFirst(request, cacheName, fallback) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    const generated = fallback ? await fallback(request) : null;
    if (generated) return generated;
    throw error;
  }
}

/**
 * Zähler je Gebiet – dieselbe Rechnung wie `cellSize`/`cellKey` in
 * `src/lib/parking/grid.ts` und `spotClusters` in `spots.ts` (ToDo 9.20).
 *
 * Doppelt geschrieben, weil der Service Worker kein Modul aus `src/` laden
 * kann; wer dort etwas ändert, ändert es hier mit. Die Zahlen müssen
 * übereinstimmen, sonst zeigt dieselbe Stelle online und offline Verschiedenes.
 */
function cluster(spots, bounds, zoom) {
  const spanLng = Math.max(bounds.maxLng - bounds.minLng, 0);
  const spanLat = Math.max(bounds.maxLat - bounds.minLat, 0);
  const midLat = (bounds.minLat + bounds.maxLat) / 2;
  const cosLat = Math.max(Math.cos((midLat * Math.PI) / 180), 0.05);

  const stufe = zoom === null ? null : Math.min(Math.max(zoom, 1), 18);
  let lng = stufe === null ? spanLng / 12 : (88 * 360) / (256 * Math.pow(2, stufe));
  lng = Math.max(lng, spanLng / 64, spanLat / (64 * cosLat), 1e-6);
  const cellLat = lng * cosLat;

  const buckets = new Map();
  for (const spot of spots) {
    const key = `${Math.floor((spot.lat + 90) / cellLat)}:${Math.floor((spot.lng + 180) / lng)}`;
    const bucket = buckets.get(key);
    if (bucket) {
      bucket.sumLat += spot.lat;
      bucket.sumLng += spot.lng;
      bucket.count += 1;
    } else {
      buckets.set(key, { sumLat: spot.lat, sumLng: spot.lng, count: 1 });
    }
  }

  return [...buckets.values()]
    .map((b) => ({ lat: b.sumLat / b.count, lng: b.sumLng / b.count, count: b.count }))
    .sort((a, b) => b.count - a.count || a.lat - b.lat || a.lng - b.lng);
}

/** Luftlinie in Metern – dieselbe Formel wie `distanceMeters` in `src/lib/geo.ts`. */
function distanceMeters(a, b) {
  const rad = (deg) => (deg * Math.PI) / 180;
  const h =
    Math.sin(rad(b.lat - a.lat) / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lng - a.lng) / 2) ** 2;
  return 2 * 6_371_000 * Math.asin(Math.sqrt(h));
}

/**
 * Beantwortet `/api/spots` aus den vorab geladenen Städten (ToDo 16.1), wenn
 * weder Netz noch eine gleichlautende frühere Antwort da sind – also genau für
 * den Kartenausschnitt, den man vorher nie angesehen hat.
 *
 * Spiegelt `spotsInBounds`, `nearestSpots` und `spotById` aus
 * `src/lib/parking/spots.ts`. `null`, wenn keine Stadt gespeichert ist: dann
 * bleibt es beim bisherigen Verhalten.
 */
async function answerFromCities(request) {
  const cache = await caches.open(CITY_CACHE);
  const entries = await cache.keys();
  if (entries.length === 0) return null;

  const spots = [];
  for (const key of entries) {
    const stored = await cache.match(key);
    if (stored) spots.push(...(await stored.json()).spots);
  }

  const params = new URL(request.url).searchParams;
  const limitRaw = params.get("limit");
  const limit = limitRaw === null ? undefined : Number.parseInt(limitRaw, 10);

  const id = params.get("id");
  if (id) {
    const spot = spots.find((candidate) => candidate.id === id);
    return spot ? Response.json({ spot }) : null;
  }

  const bbox = params.get("bbox");
  if (bbox) {
    const [minLng, minLat, maxLng, maxLat] = bbox.split(",").map(Number);
    const inside = spots.filter(
      (spot) =>
        spot.lat !== null &&
        spot.lng !== null &&
        spot.lat >= minLat &&
        spot.lat <= maxLat &&
        spot.lng >= minLng &&
        spot.lng <= maxLng,
    );
    const max = limit ?? 2_000;
    const found = inside.slice(0, max);
    if (inside.length > found.length) {
      /*
       * Dasselbe wie auf dem Server (ToDo 9.20): Statt einer willkürlichen
       * Teilmenge gehen Zähler je Gebiet hinaus. Offline ist das selten –
       * zwischengespeichert sind einzelne Städte –, aber eine Antwort ohne
       * `clusters` ließe die Karte nach der alten Regel leer bleiben, obwohl
       * die Daten da sind.
       */
      const zoomRaw = Number(params.get("zoom"));
      const zoom = Number.isFinite(zoomRaw) && zoomRaw >= 0 && zoomRaw <= 22 ? zoomRaw : null;
      return Response.json({
        spots: [],
        truncated: true,
        total: inside.length,
        clusters: cluster(inside, { minLat, minLng, maxLat, maxLng }, zoom),
      });
    }
    return Response.json({ spots: found, truncated: false, total: inside.length });
  }

  const lat = Number(params.get("lat"));
  const lng = Number(params.get("lng"));
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  const nearest = spots
    .filter((spot) => spot.lat !== null && spot.lng !== null)
    .map((spot) => ({ ...spot, distanceMeters: distanceMeters({ lat, lng }, spot) }))
    .sort((a, b) => a.distanceMeters - b.distanceMeters)
    .slice(0, limit ?? 100);
  return Response.json({ spots: nearest, truncated: false, total: nearest.length });
}

async function cacheFirst(request, cacheName, max) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    await cache.put(request, response.clone());
    if (max) await trim(cacheName, max);
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Kartenkacheln: fremde Herkunft, aber unverzichtbar für eine Karte.
  if (/(^|\.)tile\.openstreetmap\.org$/u.test(url.hostname)) {
    event.respondWith(cacheFirst(request, TILE_CACHE, MAX_TILES));
    return;
  }

  if (url.origin !== self.location.origin) return;

  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request, SHELL_CACHE));
    return;
  }

  // Die Städteliste (19.9) gehört zu den Daten: im Funkloch die letzte Antwort.
  if (url.pathname.startsWith("/api/spots") || url.pathname === "/api/cities") {
    event.respondWith(networkFirst(request, DATA_CACHE, answerFromCities));
    return;
  }

  // Die Seite selbst: im Zweifel den letzten bekannten Stand zeigen.
  if (request.mode === "navigate") {
    event.respondWith(
      networkFirst(request, SHELL_CACHE).catch(() => caches.match("/", { cacheName: SHELL_CACHE })),
    );
  }
});
