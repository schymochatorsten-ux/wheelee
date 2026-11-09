import { gzipSync } from "node:zlib";

/**
 * Große JSON-Antworten komprimiert ausliefern (ToDo 12.16).
 *
 * **Der Anlass ist gemessen, nicht vermutet.** Am Produktionsbau
 * (`node .next/standalone/server.js`, 2026-11-09) ging über die Leitung:
 *
 * | Antwort                       | vorher   | gzip    |
 * | ----------------------------- | -------- | ------- |
 * | `/api/spots` (Stadtansicht)   | 429,2 KB | 41,2 KB |
 * | `/api/cities` (3.763 Städte)  | 591,2 KB | 84,1 KB |
 * | `/api/offline?city=koeln`     | 359,2 KB | 32,5 KB |
 *
 * **Next komprimiert HTML und statische Dateien, Route-Handler aber nicht.**
 * Gemessen mit `node:http` und `accept-encoding: gzip` – `fetch` packt
 * transparent aus und zeigt deshalb immer die Rohgröße, weshalb das lange
 * nicht auffiel: Die Startseite kam mit 12,1 KB statt 63,6 KB an (`gzip`,
 * `Vary: Accept-Encoding`), die Schnittstellen dagegen ohne
 * `Content-Encoding` und ohne `Vary` – die Kompression hatte sie gar nicht
 * angesehen. *In `Erledigt.md` stand zu 2e.6 Stufe 4 „87 KB gzip-komprimiert"
 * für `/api/cities`; diese Zahl war errechnet, nicht an der Antwort gemessen.
 * Sie stimmt (84,1 KB) – ausgeliefert wurden trotzdem 591 KB.*
 *
 * **Warum in der Anwendung und nicht im Nginx Proxy Manager** – dieselbe
 * Begründung wie bei den Sicherheits-Kopfzeilen (10.6): Im Proxy wäre es im
 * Entwicklungsbetrieb nicht da, also genau dort nicht, wo ein Rückschritt
 * auffallen müsste. Dazu kommt: Ob der NPM `gzip` für `application/json`
 * eingeschaltet hat, ist von hier **nicht nachzusehen** (kein Zugang). Eine
 * Verbesserung, die davon abhängt, wäre eine Vermutung; so trägt die App sie
 * selbst. Komprimiert der Proxy zusätzlich, passiert nichts – eine Antwort mit
 * `Content-Encoding` reicht er durch.
 *
 * **Stufe 6 (die Vorgabe von zlib), gemessen an der Stadtansicht:**
 *
 * | Stufe | Größe   | Zeit (Median) |
 * | ----- | ------- | ------------- |
 * | 1     | 47,4 KB | 1,0 ms        |
 * | 6     | 41,2 KB | 2,5 ms        |
 * | 9     | 39,4 KB | 4,7 ms        |
 *
 * Stufe 9 kostet das Doppelte für 1,8 KB; Stufe 1 spart 1,5 ms und gibt 6 KB
 * her. **Brotli wäre noch kleiner** (30,7 KB), rechnet aber deutlich länger –
 * bei 388 gesparten Kilobyte entscheidet nicht das letzte Zehntel, sondern
 * dass überhaupt komprimiert wird. Der N100 des NAS ist langsamer als der
 * Rechner, auf dem gemessen wurde; auch verdreifacht bleibt es ein
 * Bruchteil der Übertragungszeit im Mobilfunknetz.
 */

/**
 * Darunter wird nicht komprimiert.
 *
 * Nicht wegen der Rechenzeit – die ist bei einem Kilobyte nicht messbar –,
 * sondern weil `Content-Encoding` und `Vary` jede Antwort für jeden
 * Zwischenspeicher zweiteilen. Für ein paar hundert gesparte Bytes ist das
 * kein Tausch.
 */
export const MIN_GZIP_BYTES = 1024;

/** Akzeptiert der Aufrufer gzip? Ohne die Kopfzeile: nein, nicht geraten. */
export function acceptsGzip(request: Request): boolean {
  const header = request.headers.get("accept-encoding");
  if (!header) return false;
  return header
    .split(",")
    .map((teil) => teil.split(";")[0]?.trim().toLowerCase())
    .some((wert) => wert === "gzip" || wert === "*");
}

/**
 * Wie `NextResponse.json`, aber mit gzip, wenn es sich lohnt.
 *
 * `Vary: Accept-Encoding` steht **in beiden Fällen** – auch in der
 * unkomprimierten Antwort. Sonst könnte ein Zwischenspeicher die Antwort, die
 * er für einen Browser ohne gzip aufgehoben hat, an einen mit gzip ausliefern
 * oder umgekehrt. `/api/spots` und `/api/cities` tragen `Cache-Control:
 * public`, es gibt also wirklich etwas zu verwechseln.
 */
export function jsonCompressed(
  request: Request,
  data: unknown,
  init: { status?: number; headers?: Record<string, string> } = {},
): Response {
  const body = Buffer.from(JSON.stringify(data), "utf8");

  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.append("Vary", "Accept-Encoding");

  if (body.byteLength < MIN_GZIP_BYTES || !acceptsGzip(request)) {
    headers.set("Content-Length", String(body.byteLength));
    return new Response(body, { status: init.status ?? 200, headers });
  }

  const packed = gzipSync(body, { level: 6 });
  headers.set("Content-Encoding", "gzip");
  headers.set("Content-Length", String(packed.byteLength));
  return new Response(packed, { status: init.status ?? 200, headers });
}
