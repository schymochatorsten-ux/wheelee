import { errorFields, logEvent, safePath } from "@/lib/log";

/**
 * Der Teil von `instrumentation.ts`, der Node-Schnittstellen braucht
 * (`process.stdout`, `process.version`). Er steht in einer eigenen Datei, die
 * dort nur in der Node-Laufzeit geladen wird: Sonst untersucht der Bundler auch
 * für Edge jeden Zugriff und warnt bei jedem Seitenaufruf im Entwicklungsmodus
 * („A Node.js API is used … not supported in the Edge Runtime“).
 */

export function registerNode(): void {
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

export function reportRequestError(
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
