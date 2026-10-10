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
const VERSION = "v1";

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
  const keep = new Set([SHELL_CACHE, DATA_CACHE, TILE_CACHE]);
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

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    throw error;
  }
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

  if (url.pathname.startsWith("/api/spots")) {
    event.respondWith(networkFirst(request, DATA_CACHE));
    return;
  }

  // Die Seite selbst: im Zweifel den letzten bekannten Stand zeigen.
  if (request.mode === "navigate") {
    event.respondWith(
      networkFirst(request, SHELL_CACHE).catch(() => caches.match("/", { cacheName: SHELL_CACHE })),
    );
  }
});
