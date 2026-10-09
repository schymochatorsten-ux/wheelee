/**
 * Löscht den Build-Zwischenstand von Next.js.
 *
 *     npm run clean
 *
 * Nötig, wenn der Entwicklungsserver mit Meldungen wie
 * „Cannot find module './897.js'" abbricht. Ursache ist fast immer, dass
 * `npm run build` gelaufen ist, **während** `npm run dev` lief: Beide
 * schreiben in dasselbe Verzeichnis `.next`, und der Entwicklungsserver
 * stolpert anschließend über die Dateien des Produktionsbuilds.
 *
 * Danach `npm run dev` neu starten.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const target = path.join(projectRoot, ".next");

if (fs.existsSync(target)) {
  fs.rmSync(target, { recursive: true, force: true });
  console.log("`.next` gelöscht. Jetzt `npm run dev` neu starten.");
} else {
  console.log("`.next` war bereits leer – nichts zu tun.");
}
