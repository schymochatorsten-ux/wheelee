/**
 * Drosselung schreibender Endpunkte (ToDos 17.2, D-03).
 *
 * Ein offener Schreib-Endpunkt ohne Bremse ist eine Einladung: Die
 * Rückmeldungen kann jede:r ohne Anmeldung abschicken, und die Anmeldung
 * selbst lässt sich zum Durchprobieren von Passwörtern benutzen.
 *
 * **Absichtlich im Arbeitsspeicher und nicht in der Datenbank.** Die App läuft
 * als ein einzelner Container auf einem NAS; es gibt keine zweite Instanz, die
 * mitzählen müsste. Dafür eine Tabelle anzulegen hieße, bei jedem Versuch zu
 * schreiben – also genau das zu tun, was die Drosselung verhindern soll. Ein
 * Neustart setzt die Zähler zurück; das ist hier kein Verlust, weil die
 * Fenster Minuten lang sind.
 *
 * Gezählt wird nach einem gleitenden Fenster über die Zeitstempel der
 * Versuche, nicht mit einem Zähler je Kalenderminute. Der Unterschied ist
 * praktisch: Ein Zähler, der zur Minute zurückgesetzt wird, lässt an der
 * Grenze die doppelte Menge durch.
 */

interface Window {
  /** Zeitstempel der Versuche, aufsteigend. */
  hits: number[];
}

const windows = new Map<string, Window>();

/**
 * Damit die Tabelle nicht unbegrenzt wächst: Beim Aufräumen fliegen alle
 * Einträge heraus, deren Versuche vollständig abgelaufen sind. Ohne das
 * sammelte sich für jede IP, die je eine Meldung geschickt hat, ein Eintrag
 * für die Laufzeit des Prozesses.
 */
let lastSweep = 0;
const SWEEP_EVERY_MS = 60_000;

function sweep(nowMs: number, keepMs: number): void {
  if (nowMs - lastSweep < SWEEP_EVERY_MS) return;
  lastSweep = nowMs;

  for (const [key, window] of windows) {
    if (window.hits.every((hit) => nowMs - hit > keepMs)) windows.delete(key);
  }
}

export interface Limit {
  /** So viele Versuche sind im Fenster erlaubt. */
  max: number;
  /** Länge des Fensters in Millisekunden. */
  windowMs: number;
}

/**
 * Einen Versuch verbuchen. `true` heißt: erlaubt.
 *
 * Der Aufruf **zählt immer mit**, auch wenn er abgelehnt wird. Anders wäre die
 * Grenze wirkungslos: Wer dauerhaft zu schnell anfragt, käme nach dem
 * Ablaufen des Fensters sofort wieder durch, statt für die Dauer des Fensters
 * ausgebremst zu bleiben.
 */
export function allow(key: string, limit: Limit, nowMs: number = Date.now()): boolean {
  sweep(nowMs, limit.windowMs);

  const window = windows.get(key) ?? { hits: [] };
  window.hits = window.hits.filter((hit) => nowMs - hit < limit.windowMs);

  const permitted = window.hits.length < limit.max;
  window.hits.push(nowMs);
  // Nach oben begrenzen, damit ein Dauerbeschuss nicht beliebig Speicher
  // belegt – gezählt wird ohnehin nur bis `max`.
  if (window.hits.length > limit.max + 1) window.hits = window.hits.slice(-(limit.max + 1));
  windows.set(key, window);

  return permitted;
}

/** Nur für Tests: alle Zähler vergessen. */
export function resetLimits(): void {
  windows.clear();
  lastSweep = 0;
}

/**
 * Grenzen der einzelnen Endpunkte.
 *
 * Die Zahlen sind so gewählt, dass ein Mensch sie nicht bemerkt: Fünf
 * Meldungen in zehn Minuten schreibt niemand, der etwas zu melden hat; zehn
 * Anmeldeversuche in zehn Minuten hat auch jemand nicht, der sein Passwort
 * dreimal falsch tippt.
 */
export const LIMITS = {
  feedback: { max: 5, windowMs: 10 * 60_000 },
  login: { max: 10, windowMs: 10 * 60_000 },
  register: { max: 5, windowMs: 60 * 60_000 },
} as const;

/**
 * Welche Adresse die Anfrage hat.
 *
 * Hinter dem Nginx Proxy Manager steht die echte Adresse in
 * `X-Forwarded-For`; die Verbindung selbst kommt immer aus dem
 * Tailscale-Tunnel und wäre für alle gleich. Genommen wird der **erste**
 * Eintrag, denn die Kette wird von jedem Proxy hinten angehängt.
 *
 * Die Adresse wird **nur hier benutzt und nirgends gespeichert** – sie steht
 * in keinem Protokoll und in keiner Tabelle (siehe 17.1).
 */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unbekannt";
}
