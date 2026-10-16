import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

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
  const parts = stored.split("$");
  if (parts.length !== 6 || parts[0] !== "scrypt") return false;

  const [, rawN, rawR, rawP, rawSalt, rawHash] = parts;
  const cost = { N: Number(rawN), r: Number(rawR), p: Number(rawP) };
  if (!Number.isInteger(cost.N) || !Number.isInteger(cost.r) || !Number.isInteger(cost.p)) {
    return false;
  }

  let expected: Buffer;
  let salt: Buffer;
  try {
    expected = Buffer.from(rawHash, "base64");
    salt = Buffer.from(rawSalt, "base64");
    if (expected.length === 0 || salt.length === 0) return false;
  } catch {
    return false;
  }

  let actual: Buffer;
  try {
    actual = scryptSync(password.normalize("NFKC"), salt, expected.length, {
      ...cost,
      maxmem: 128 * cost.N * cost.r * 2,
    });
  } catch {
    // Unsinnige Parameter in der Datei: nicht anmelden, aber auch nicht
    // abstürzen.
    return false;
  }

  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
