/**
 * Mindestpause nach vielen Fehlversuchen **je Adresse** (ToDo 10.15 c).
 *
 * Die Drosselung der Anmeldung (`LIMITS.login`) zählt je Herkunft **und**
 * Adresse. Das schützt vor dem Aussperren durch Fremde, bremst aber nicht, wenn
 * dieselbe Adresse von vielen Herkünften aus durchprobiert wird. Hier kommt die
 * Grenze, die über alle Herkünfte zählt – aber als **Pause und nicht als
 * Sperre**: Bis zum 20. Fehlversuch in einer Stunde merkt niemand etwas, danach
 * gilt zwischen zwei Versuchen eine Mindestpause, die sich mit jedem weiteren
 * Fehlversuch verdoppelt (30 Sekunden bis höchstens 15 Minuten). Das Passwort
 * lässt sich so nur noch sehr langsam erraten, und die Besitzerin wartet im
 * ungünstigsten Fall 15 Minuten statt eine Stunde.
 *
 * **Es zählen nur Fehlversuche**, nicht jeder Versuch; eine gelungene Anmeldung
 * setzt den Zähler zurück. **Unbekannte Adressen werden genauso behandelt** wie
 * bekannte, sonst verriete die Pause, wer ein Konto hat.
 *
 * Wie die übrige Drosselung im Arbeitsspeicher (siehe `rate-limit.ts`): Es gibt
 * nur einen Container, und ein Neustart setzt die Zähler zurück.
 */

export const BACKOFF = {
  /** Fenster, in dem Fehlversuche zählen. */
  windowMs: 60 * 60_000,
  /** So viele Fehlversuche bleiben ohne Pause. */
  freeFailures: 20,
  /** Pause nach dem ersten Fehlversuch über der Grenze. */
  firstPauseMs: 30_000,
  /** Obergrenze der Pause. */
  maxPauseMs: 15 * 60_000,
  /** So viele Adressen werden höchstens verfolgt, damit der Speicher begrenzt bleibt. */
  maxTracked: 20_000,
} as const;

const failures = new Map<string, number[]>();

let lastSweep = 0;
const SWEEP_EVERY_MS = 60_000;

function sweep(nowMs: number): void {
  if (nowMs - lastSweep < SWEEP_EVERY_MS) return;
  lastSweep = nowMs;
  for (const [key, hits] of failures) {
    if (hits.every((hit) => nowMs - hit >= BACKOFF.windowMs)) failures.delete(key);
  }
}

function recent(address: string, nowMs: number): number[] {
  return (failures.get(address) ?? []).filter((hit) => nowMs - hit < BACKOFF.windowMs);
}

/** Länge der Pause nach `count` Fehlversuchen im Fenster. */
function pauseAfter(count: number): number {
  if (count <= BACKOFF.freeFailures) return 0;
  const doublings = Math.min(count - BACKOFF.freeFailures - 1, 20);
  return Math.min(BACKOFF.firstPauseMs * 2 ** doublings, BACKOFF.maxPauseMs);
}

/**
 * Wie lange (in Sekunden) für diese Adresse noch gewartet werden muss; `0`
 * heißt: Versuch erlaubt.
 */
export function loginPauseSeconds(address: string, nowMs: number = Date.now()): number {
  sweep(nowMs);
  const hits = recent(address, nowMs);
  if (hits.length === 0) return 0;

  const waitUntil = hits[hits.length - 1] + pauseAfter(hits.length);
  return waitUntil > nowMs ? Math.ceil((waitUntil - nowMs) / 1000) : 0;
}

/** Einen Fehlversuch für diese Adresse verbuchen. */
export function recordLoginFailure(address: string, nowMs: number = Date.now()): void {
  const hits = recent(address, nowMs);
  if (hits.length === 0 && failures.size >= BACKOFF.maxTracked) {
    // Den ältesten Eintrag verdrängen statt neue Adressen zu ignorieren: Sonst
    // schaltet, wer die Tabelle mit erfundenen Adressen füllt, die Pause für
    // alle weiteren aus (ToDo 10.19).
    const oldest = failures.keys().next().value;
    if (oldest !== undefined) failures.delete(oldest);
  }
  failures.delete(address);
  hits.push(nowMs);
  failures.set(address, hits);
}

/** Nach gelungener Anmeldung: die Fehlversuche dieser Adresse vergessen. */
export function clearLoginFailures(address: string): void {
  failures.delete(address);
}

/** Nur für Tests. */
export function resetLoginBackoff(): void {
  failures.clear();
  lastSweep = 0;
}
