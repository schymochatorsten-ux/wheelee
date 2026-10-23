import { errorFields, logEvent, safePath } from "@/lib/log";

/**
 * Serverseitige Fehler zentral vermerken (ToDo 12.6).
 *
 * Next ruft `onRequestError` bei **jedem** Fehler auf, der eine Anfrage
 * abbricht – in einem Endpunkt, beim Rendern einer Seite, in einer
 * Server-Komponente. Das ist der Grund, warum es diese Datei gibt und nicht nur
 * `withLogging`: Letzteres sieht nur die Endpunkte, und ein Fehler beim Rendern
 * der Startseite wäre sonst eine leere Seite ohne eine einzige Zeile im
 * Protokoll.
 *
 * Doppelt vermerkt wird dadurch nichts von Belang: `withLogging` schreibt
 * `api-fehler` mit Dauer, hier steht `server-fehler` mit der Art der Anfrage.
 * Beide Zeilen zusammen sagen mehr als jede einzelne.
 */
export function register(): void {
  /*
   * Seit es eine Middleware gibt (10.7), lädt Next diese Datei auch für die
   * Edge-Laufzeit, in der es `process.stdout` nicht gibt – der Start brach mit
   * „Cannot read properties of undefined (reading 'write')" ab und jede Seite
   * antwortete mit 404. Das Protokoll gehört in die Node-Laufzeit.
   */
  if (process.env.NEXT_RUNTIME === "edge") return;

  /*
   * Eine Zeile beim Start, und die ist keine Zierde: Am 2026-10-19 stellte
   * sich heraus, dass auf wheelee.de acht Tage lang ein alter Stand lief
   * (12.5a). Eine Startzeile im `docker logs` beantwortet genau diese Frage –
   * wann hat dieser Container zuletzt neu gestartet, und in welchem Modus.
   */
  logEvent("info", "start", {
    node: process.version,
    mode: process.env.NODE_ENV ?? "unbekannt",
  });
}

export function onRequestError(
  error: unknown,
  request: { path?: string; method?: string },
  context: { routerKind?: string; routePath?: string; renderSource?: string },
): void {
  logEvent("error", "server-fehler", {
    method: request.method ?? null,
    // Auch hier ohne Parameterwerte – `path` enthält die Abfrage mitsamt
    // Koordinaten, und die stehen in keinem Protokoll (siehe `lib/log.ts`).
    path: request.path ? safePath(request.path) : null,
    route: context.routePath ?? null,
    quelle: context.renderSource ?? context.routerKind ?? null,
    ...errorFields(error),
  });
}
