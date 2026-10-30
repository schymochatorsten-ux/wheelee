import { randomBytes, scrypt, scryptSync, timingSafeEqual } from "node:crypto";

/**
 * Passwörter prüfen und speichern.
 *
 * **Nie im Klartext, und nie mit einem schnellen Hash.** SHA-256 über ein
 * Passwort ist auf einer Grafikkarte milliardenfach pro Sekunde zu raten; die
 * Aufgabe eines Passwort-Hashes ist genau das Gegenteil – langsam zu sein.
 *
 * Genommen ist **scrypt** aus `node:crypto`: im Standardumfang enthalten,
 * speicherhart (also auch auf Spezialhardware teuer) und vom BSI wie vom OWASP
 * als Passwortverfahren genannt. Argon2id gilt als die modernere Wahl, ist
 * aber nur als native Abhängigkeit zu haben – im Alpine-Abbild zieht die
 * Compiler und Python nach, und das für einen Unterschied, der bei den
 * Parametern hier nicht praktisch wird.
 *
 * Das Format ist selbstbeschreibend:
 *
 *     scrypt$N$r$p$<salt base64>$<hash base64>
 *
 * Damit lassen sich die Kosten später erhöhen, **ohne alte Passwörter zu
 * entwerten**: Jeder Hash trägt die Parameter, mit denen er entstanden ist.
 * Ohne diese Angabe wäre eine Umstellung nur über „alle müssen ihr Passwort
 * neu setzen" möglich – und das trifft genau die Zielgruppe, der jede
 * zusätzliche Hürde am meisten kostet.
 */

/**
 * Kostenparameter.
 *
 * N = 2^16 braucht rund 64 MB Arbeitsspeicher und auf dem N100 des NAS etwa
 * 100 ms. Das ist für eine Anmeldung nicht zu spüren und macht das Durchprobieren
 * von Listen unbezahlbar. Höher geht hier nicht sinnvoll: Der Server soll
 * nebenher noch Karten ausliefern.
 */
const N = 2 ** 16;
const R = 8;
const P = 1;
const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

/**
 * Node begrenzt den Speicher von scrypt; ohne Anhebung scheitert N = 2^16 mit
 * „memory limit exceeded". Der Wert ist der von Node empfohlene: 128 · N · r
 * plus Reserve.
 */
const MAX_MEMORY = 128 * N * R * 2;

/**
 * Die Regeln selbst stehen in `password-rules.ts`, damit das Anmeldeformular
 * im Browser dieselbe Mindestlänge nennen kann, ohne `node:crypto` mitzuziehen.
 * Hier erneut herausgegeben, damit der Server nur eine Datei kennen muss.
 */
export { MIN_PASSWORD_LENGTH, passwordProblem } from "./password-rules";

/** Passwort hashen, mit frischem Salz. */
export function hashPassword(password: string): string {
  const salt = randomBytes(SALT_LENGTH);
  const hash = scryptSync(password.normalize("NFKC"), salt, KEY_LENGTH, {
    N,
    r: R,
    p: P,
    maxmem: MAX_MEMORY,
  });

  return ["scrypt", N, R, P, salt.toString("base64"), hash.toString("base64")].join("$");
}

/**
 * Passwort gegen einen gespeicherten Hash prüfen.
 *
 * Verglichen wird mit `timingSafeEqual`: Ein Vergleich, der beim ersten
 * abweichenden Byte abbricht, verrät über die Laufzeit, wie viel schon
 * stimmte.
 *
 * Ein unleserlicher Hash ergibt `false` und keinen Fehler – sonst könnte ein
 * beschädigter Eintrag in der Datenbank die Anmeldung mit einem
 * Serverfehler beantworten statt mit „stimmt nicht".
 */
export function verifyPassword(password: string, stored: string): boolean {
  const parsed = parseHash(stored);
  if (!parsed) return false;

  let actual: Buffer;
  try {
    actual = scryptSync(password.normalize("NFKC"), parsed.salt, parsed.expected.length, parsed.options);
  } catch {
    // Unsinnige Parameter in der Datei: nicht anmelden, aber auch nicht
    // abstürzen.
    return false;
  }

  return actual.length === parsed.expected.length && timingSafeEqual(actual, parsed.expected);
}

function parseHash(stored: string) {
  const parts = stored.split("$");
  if (parts.length !== 6 || parts[0] !== "scrypt") return null;

  const [, rawN, rawR, rawP, rawSalt, rawHash] = parts;
  const cost = { N: Number(rawN), r: Number(rawR), p: Number(rawP) };
  if (!Number.isInteger(cost.N) || !Number.isInteger(cost.r) || !Number.isInteger(cost.p)) {
    return null;
  }

  const expected = Buffer.from(rawHash, "base64");
  const salt = Buffer.from(rawSalt, "base64");
  if (expected.length === 0 || salt.length === 0) return null;

  return { expected, salt, options: { ...cost, maxmem: 128 * cost.N * cost.r * 2 } };
}

/**
 * So viele scrypt-Berechnungen laufen höchstens gleichzeitig (ToDo 10.19).
 *
 * `scryptSync` hält den ganzen Prozess an: Eine Flut von Anmeldeversuchen mit
 * erfundenen Adressen (je rund 100 ms und 64 MB) legte sonst Karte und Liste
 * lahm. Asynchron läuft die Berechnung im Thread-Pool, und die Warteschlange
 * hält den Speicher in Grenzen.
 */
const MAX_PARALLEL = 2;
let running = 0;
const waiting: (() => void)[] = [];

async function slot<T>(work: () => Promise<T>): Promise<T> {
  if (running >= MAX_PARALLEL) await new Promise<void>((resolve) => waiting.push(resolve));
  running += 1;
  try {
    return await work();
  } finally {
    running -= 1;
    waiting.shift()?.();
  }
}

/** Wie `verifyPassword`, aber ohne den Prozess anzuhalten – für die Anmeldung. */
export function verifyPasswordAsync(password: string, stored: string): Promise<boolean> {
  const parsed = parseHash(stored);
  if (!parsed) return Promise.resolve(false);

  return slot(
    () =>
      new Promise<boolean>((resolve) => {
        scrypt(password.normalize("NFKC"), parsed.salt, parsed.expected.length, parsed.options, (error, actual) => {
          resolve(!error && actual.length === parsed.expected.length && timingSafeEqual(actual, parsed.expected));
        });
      }),
  );
}
