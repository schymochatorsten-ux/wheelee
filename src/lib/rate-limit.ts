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
  /** Passwort ändern: je Konto, denn das alte Passwort wird hier erneut abgefragt (ToDo 10.7). */
  passwordChange: { max: 5, windowMs: 10 * 60_000 },
  /** Einladung einlösen: je Herkunft, denn das Token ist das Geheimnis und darf nicht erraten werden (ToDo 18.2). */
  invitationRedeem: { max: 10, windowMs: 10 * 60_000 },
  /** Einladungen erzeugen: je Admin-Konto. */
  invitationCreate: { max: 20, windowMs: 60 * 60_000 },

  /*
   * Bewertungen (ToDo 8.4). Großzügiger als die übrigen Grenzen, weil hier ein
   * **normaler** Ablauf mehrere Aufrufe erzeugt: Wer eine Liste von Plätzen
   * durchgeht, bewertet mehrere hintereinander, und ein versehentliches
   * Doppeltippen zählt ebenfalls mit. 30 in zehn Minuten erreicht niemand, der
   * die App benutzt – wohl aber ein Skript.
   *
   * **Nach Konto**, denn das ist die Zurechnungseinheit: Zwei Stimmen zum
   * selben Parkplatz verhindert schon die Tabelle, hundert Stimmen zu hundert
   * Parkplätzen nicht.
   */
  rating: { max: 30, windowMs: 10 * 60_000 },

  /*
   * Zusätzlich nach Herkunft, und zwar **weiter** gefasst. Hinter einem
   * Carrier-NAT teilen sich viele Geräte eine Adresse; eine enge Grenze
   * träfe dort die Falschen. Sie soll nur den Fall abfangen, dass jemand
   * reihenweise Konten anlegt und über dieselbe Leitung bedient.
   */
  ratingPerClient: { max: 120, windowMs: 10 * 60_000 },

  /*
   * Gespeicherte Parkplätze (ToDo 11.5): schreibend wie das Bewerten, aus
   * demselben Grund nach Konto und zusätzlich weit gefasst nach Herkunft.
   * Wer eine Liste durchgeht und mehrere Sterne setzt, bleibt weit darunter.
   */
  favorite: { max: 60, windowMs: 10 * 60_000 },
  favoritePerClient: { max: 240, windowMs: 10 * 60_000 },

  /*
   * Ortssuche (10.9): Der Endpunkt reicht Anfragen an Nominatim weiter, dessen
   * Bedingungen höchstens eine Anfrage je Sekunde **für alle zusammen**
   * erlauben. Ohne Grenze konnte jede:r unangemeldet den Server bei Nominatim
   * sperren lassen. Je Herkunft großzügig (Vorschläge beim Tippen), insgesamt
   * knapp unter einer Anfrage je Sekunde.
   */
  geocode: { max: 40, windowMs: 60_000 },
  geocodeAll: { max: 50, windowMs: 60_000 },
} as const;

/**
 * `Retry-After` für eine 429-Antwort (ToDo 10.14).
 *
 * Es ist die **Länge des Fensters**, also die obere Grenze: Nach dieser Zeit
 * ist der älteste Versuch sicher abgelaufen. Genauer wäre die Zeit bis zum
 * ältesten Versuch im Fenster, würde aber verraten, wie viele Versuche schon
 * gezählt sind – dieselbe Überlegung wie bei den Rückmeldungen (17.2).
 */
export function retryAfter(limit: Limit): { "Retry-After": string } {
  return { "Retry-After": String(Math.ceil(limit.windowMs / 1000)) };
}

/**
 * Welche Adresse die Anfrage hat.
 *
 * Hinter dem Nginx Proxy Manager steht die echte Adresse in
 * `X-Forwarded-For`; die Verbindung selbst kommt immer aus dem
 * Tailscale-Tunnel und wäre für alle gleich. Genommen wird der **letzte**
 * Eintrag – der, den der eigene Proxy angehängt hat. Der erste stammt, wenn
 * der Proxy anhängt statt zu ersetzen, vom Absender selbst: Ein Angreifer
 * schickt bei jeder Anfrage eine andere Adresse mit und umgeht damit jede
 * Drosselung, auch die der Anmeldung (10.9). Ersetzt der Proxy die Kette, gibt
 * es nur einen Eintrag, und beides ist dasselbe.
 *
 * **Nicht belegt:** Ob der Nginx Proxy Manager anhängt oder ersetzt, ist am NAS
 * nicht zu sehen (kein Zugang). Der letzte Eintrag ist in beiden Fällen
 * richtig, deshalb wurde er gewählt, statt es zu raten.
 *
 * Die Adresse wird **nur hier benutzt und nirgends gespeichert** – sie steht
 * in keinem Protokoll und in keiner Tabelle (siehe 17.1).
 */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const last = forwarded.split(",").at(-1)?.trim();
    if (last) return last;
  }
  return request.headers.get("x-real-ip")?.trim() || "unbekannt";
}
