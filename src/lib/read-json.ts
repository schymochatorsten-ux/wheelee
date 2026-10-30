/**
 * JSON-Rümpfe mit Obergrenze lesen (ToDo 10.14).
 *
 * `request.json()` liest alles, was kommt – gemessen wurden 5 MB. Keine Route
 * dieser App braucht mehr als wenige Kilobyte (die längste Eingabe ist eine
 * Rückmeldung mit 2.000 Zeichen).
 *
 * **Gezählt wird beim Lesen, nicht nach `Content-Length`.** Die Kopfzeile kann
 * fehlen (chunked) oder lügen; die Middleware weist ehrliche Überlängen früh ab,
 * dies hier ist der Riegel dahinter.
 *
 * **Fehler tragen keinen Inhalt.** Die Meldung nennt weder den Rumpf noch einen
 * Auszug, damit eine Zeile in `log.ts` nichts davon enthalten kann.
 */

/** Obergrenze in Bytes für den Rumpf einer JSON-Anfrage. */
export const MAX_JSON_BYTES = 16 * 1024;

export class BodyTooLargeError extends Error {
  constructor() {
    super("Anfragerumpf zu groß");
    this.name = "BodyTooLargeError";
  }
}

/** Wie `request.json()`, wirft aber bei mehr als `maxBytes` Bytes. */
export async function readJson(request: Request, maxBytes: number = MAX_JSON_BYTES): Promise<unknown> {
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > maxBytes) throw new BodyTooLargeError();

  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError("Kein Rumpf");

  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel().catch(() => {});
      throw new BodyTooLargeError();
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));
  // Alle Routen lesen Felder aus einem Objekt; `null`, eine Zahl oder eine
  // Liste ließen sie mit einem 500 scheitern (ToDo 10.19). Als ungültiges JSON
  // behandeln, damit jede Route ihre 400-Antwort nimmt.
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new SyntaxError("Kein Objekt");
  }
  return parsed;
}
