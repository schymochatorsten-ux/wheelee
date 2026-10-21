/**
 * Minimales Protokoll und Fehlermeldung (ToDo 12.6).
 *
 * **Warum kein Dienst wie Sentry.** Ein Fehler-Monitoring, das Meldungen an
 * einen fremden Server schickt, wäre der dritte Dienst, der Inhalte dieser App
 * sieht – dagegen stehen 10.4 („keine Tracker"), die Inhaltsrichtlinie
 * (`connect-src 'self'`) und die Datenschutzerklärung, die beide Gegenstellen
 * namentlich nennt. Außerdem läuft die App als **ein** Container auf einem NAS:
 * Was dort nach stdout geht, steht in `docker logs`, rotiert bei 10 MB und ist
 * nach drei Dateien weg (siehe `docker-compose.yml`). Das ist das ganze
 * benötigte Werkzeug.
 *
 * **Was nie in eine Zeile kommt, und das ist keine Sorgfaltsfrage, sondern eine
 * Zusage:** Die Datenschutzerklärung sagt, die IP-Adresse werde „in keine
 * Tabelle und in kein Protokoll geschrieben", und der Standort werde „nicht
 * protokolliert". Deshalb protokolliert diese Datei
 *
 * - **keine IP-Adresse** (auch nicht gekürzt oder gehasht – ein Hash einer
 *   IPv4-Adresse ist in Minuten zurückzurechnen),
 * - **keine Parameterwerte**, sondern nur deren Namen: `?bbox=…` ist ein
 *   Kartenausschnitt und damit eine Ortsangabe, `?lat=&lng=` erst recht,
 * - **keine Inhalte** – kein Meldungstext, keine E-Mail-Adresse, kein Cookie.
 *
 * Übrig bleibt, was eine Störung sichtbar macht: wann, welcher Pfad, welcher
 * Status, wie lange, und bei einem Fehler dessen Art und Herkunft im Code.
 */

export type LogLevel = "info" | "warn" | "error";

export type LogValue = string | number | boolean | null;

/**
 * Eine Zeile ist ein JSON-Objekt und kein Fließtext.
 *
 * Der Unterschied zeigt sich beim Nachsehen: `docker logs wheelee | findstr
 * '"level":"error"'` findet alles Fehlerhafte, und eine Zeile lässt sich ohne
 * Regeln auswerten. Fließtext müsste man beim ersten Zwischenfall zerlegen –
 * und dann ist keine Zeit dafür.
 */
export interface LogLine {
  time: string;
  level: LogLevel;
  event: string;
  [key: string]: LogValue | undefined;
}

type Writer = (line: string) => void;

/**
 * Standardmäßig nach stdout bzw. stderr – im Testlauf nirgendwohin.
 *
 * Ohne diese Ausnahme schriebe jeder Test, der einen Endpunkt aufruft, seine
 * Zeilen zwischen die Testausgabe, und ein fehlgeschlagener Test wäre
 * schlechter zu finden als vorher. Die Tests dieser Datei setzen sich mit
 * `setLogWriter` einen eigenen Schreiber.
 */
const inTest = process.env.NODE_ENV === "test" || process.env.VITEST !== undefined;

let writer: Writer | null = inTest ? () => {} : null;

/** Nur für Tests: Schreiber austauschen; `null` stellt das Übliche wieder her. */
export function setLogWriter(next: Writer | null): void {
  writer = next;
}

function write(level: LogLevel, line: string): void {
  if (writer) {
    writer(line);
    return;
  }
  // Fehler nach stderr, damit sie sich auch ohne Auswertung der Zeile vom
  // normalen Betrieb trennen lassen.
  if (level === "error") process.stderr.write(`${line}\n`);
  else process.stdout.write(`${line}\n`);
}

/**
 * Felder, die hier niemals stehen dürfen – unabhängig davon, wer aufruft.
 *
 * Die Liste ist keine Vollständigkeitsgarantie, sondern ein Fangnetz gegen den
 * naheliegenden Fehler: Jemand reicht beim Erweitern eines Endpunktes das
 * ganze Anfrageobjekt durch. Eine verbotene Angabe wird **ausgetauscht, nicht
 * weggelassen** – sonst sieht die Zeile aus, als hätte sie nie eine enthalten,
 * und der Fehler bleibt unbemerkt.
 */
const VERBOTEN = new Set([
  "ip",
  "clientIp",
  "x-forwarded-for",
  "lat",
  "lng",
  "bbox",
  "email",
  "contactEmail",
  "message",
  "password",
  "cookie",
  "session",
  "token",
  "query",
  "search",
  "url",
]);

function clean(fields: Record<string, LogValue | undefined>): Record<string, LogValue> {
  const out: Record<string, LogValue> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined) continue;
    out[key] = VERBOTEN.has(key) ? "[entfernt]" : value;
  }
  return out;
}

/** Eine Zeile schreiben. `event` ist ein kurzer, gleichbleibender Name. */
export function logEvent(
  level: LogLevel,
  event: string,
  fields: Record<string, LogValue | undefined> = {},
): void {
  const line: LogLine = { time: new Date().toISOString(), level, event, ...clean(fields) };
  write(level, JSON.stringify(line));
}

/**
 * Der Pfad einer Anfrage, ohne die Werte.
 *
 * Aus `/api/spots?bbox=6.9,50.9,7.0,51.0&limit=2000` wird `/api/spots?bbox,limit`.
 * **Die Namen bleiben, weil sie der Grund fürs Protokollieren sind:** Ein
 * Fehler, der nur die Nähe-Abfrage trifft, ist etwas anderes als einer, der die
 * Bbox-Abfrage trifft. Die Werte sagen dagegen, wo jemand ist.
 */
export function safePath(url: string): string {
  let parsed: URL;
  try {
    parsed = new URL(url, "http://intern");
  } catch {
    return "[unlesbar]";
  }

  const names = [...new Set(parsed.searchParams.keys())].sort();
  return names.length === 0 ? parsed.pathname : `${parsed.pathname}?${names.join(",")}`;
}

/**
 * Was von einem Fehler übrig bleibt.
 *
 * Die Meldung wird mitgeschrieben, weil eine Zeile ohne sie nutzlos ist. Das
 * setzt voraus, dass **in eigenen Fehlermeldungen keine Eingaben stehen** –
 * `new Error("Unbekannte Stadt: " + eingabe)` wäre genau der Weg, auf dem ein
 * Inhalt doch ins Protokoll gerät. Fremde Meldungen (SQLite, fetch) nennen
 * keine Nutzereingaben.
 */
export function errorFields(error: unknown): Record<string, LogValue> {
  if (error instanceof Error) {
    return {
      errorName: error.name,
      errorMessage: error.message,
      // Nur die ersten Zeilen: Der ganze Stapel macht die Zeile unlesbar, und
      // die Stelle steht oben.
      stack: (error.stack ?? "").split("\n").slice(1, 4).join(" | ") || null,
    };
  }
  return { errorName: "NichtFehler", errorMessage: String(error), stack: null };
}

/** Ab hier gilt eine Antwort als langsam und wird vermerkt. */
export const LANGSAM_MS = 1_000;

/**
 * Welche Anfragen eine Zeile wert sind.
 *
 * **Nicht jede.** Beim Ziehen der Karte fragt der Browser `/api/spots`
 * fortlaufend ab; jede davon zu protokollieren hieße, die wenigen
 * interessanten Zeilen unter Zehntausenden gleichförmigen zu begraben – und
 * die Rotation bei 10 MB würde einen Fehler von gestern löschen, um die
 * Kartenbewegung von heute aufzuheben. Vermerkt wird deshalb:
 *
 * - alles ab Status 400 – das sind die Fälle, in denen jemandem etwas fehlt,
 * - alles, was länger als eine Sekunde dauert,
 * - **jede schreibende Anfrage**, denn die sind selten und folgenreich: eine
 *   Rückmeldung, eine Anmeldung, eine Bewertung. Ohne sie ließe sich später
 *   nicht sagen, ob eine Meldung je angekommen ist.
 */
export function worthLogging(method: string, status: number, ms: number): boolean {
  if (status >= 400) return true;
  if (ms >= LANGSAM_MS) return true;
  return method !== "GET" && method !== "HEAD";
}

/**
 * Einen Endpunkt mit Protokoll umgeben.
 *
 * Der Fehlerfall wird **weitergeworfen** und nicht in eine 500er-Antwort
 * umgebogen: Next macht daraus seine eigene Antwort, und eine zweite Stelle,
 * die das auch tut, wäre eine Stelle, an der sich beide unterscheiden können.
 * Hier steht nur, dass es passiert ist.
 */
export function withLogging<A extends unknown[]>(
  handler: (request: Request, ...rest: A) => Response | Promise<Response>,
): (request: Request, ...rest: A) => Promise<Response> {
  return async (request, ...rest) => {
    const started = Date.now();
    const path = safePath(request.url);

    try {
      const response = await handler(request, ...rest);
      const ms = Date.now() - started;
      if (worthLogging(request.method, response.status, ms)) {
        logEvent(
          response.status >= 500 ? "error" : response.status >= 400 ? "warn" : "info",
          "api",
          {
            method: request.method,
            path,
            status: response.status,
            ms,
          },
        );
      }
      return response;
    } catch (error) {
      logEvent("error", "api-fehler", {
        method: request.method,
        path,
        ms: Date.now() - started,
        ...errorFields(error),
      });
      throw error;
    }
  };
}
