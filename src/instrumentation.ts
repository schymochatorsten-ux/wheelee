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
 *
 * Seit es eine Middleware gibt (10.7), lädt Next diese Datei auch für die
 * Edge-Laufzeit, in der es `process.stdout` nicht gibt – der Start brach mit
 * „Cannot read properties of undefined (reading 'write')" ab und jede Seite
 * antwortete mit 404. Das Protokoll gehört in die Node-Laufzeit; die Arbeit
 * liegt deshalb in `instrumentation-node.ts` und wird nur dort geladen.
 */
export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  (await import("./instrumentation-node")).registerNode();
}

export async function onRequestError(
  error: unknown,
  request: { path?: string; method?: string },
  context: { routerKind?: string; routePath?: string; renderSource?: string },
): Promise<void> {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  (await import("./instrumentation-node")).reportRequestError(error, request, context);
}
