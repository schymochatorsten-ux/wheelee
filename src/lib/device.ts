/**
 * Eine Zufallskennung je Browser – allein für die Drosselung (ToDo 17.2).
 *
 * Sie sagt dem Server nur: „Diese Meldungen kommen aus derselben Quelle." Sie
 * entsteht im Browser, enthält nichts über das Gerät oder die Person, wird
 * nicht an Dritte geschickt und steht in der Datenbank nur als gekürzter Hash
 * (siehe `src/lib/db/feedback.ts`).
 *
 * Löscht jemand seine Browserdaten, entsteht eine neue – das ist kein Mangel.
 * Eine Kennung, die das überlebt, wäre ein Wiedererkennungsmerkmal, und genau
 * das soll sie nicht sein.
 */

export const DEVICE_KEY = "wheelee-geraet";

export function deviceId(): string | null {
  if (typeof window === "undefined") return null;

  try {
    const existing = window.localStorage.getItem(DEVICE_KEY);
    if (existing && existing.length >= 8) return existing;

    const fresh = crypto.randomUUID();
    window.localStorage.setItem(DEVICE_KEY, fresh);
    return fresh;
  } catch {
    // Privater Modus oder blockierter Speicher: Dann greift nur die
    // Drosselung nach Herkunft. Besser als die Meldung abzulehnen.
    return null;
  }
}
