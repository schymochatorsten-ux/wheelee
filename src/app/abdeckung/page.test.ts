import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Abdeckung from "./page";

/**
 * Die beiden Datumszeilen der Abdeckungsseite (ToDo 19.16).
 *
 * **Warum dafür ein Test:** Vorher stand oben ein einziges Datum, der jüngere
 * von letztem Import und letztem Lauf. Damit sah ein Bestand, an dem sich seit
 * Wochen nichts geändert hatte, jede Nacht frisch aus. Dass die beiden Zeilen
 * getrennt bleiben, ist der ganze Zweck – und genau das, was beim nächsten
 * Umbau leicht wieder zusammenfällt.
 *
 * Wie bei `datenschutz/page.test.ts`: keine Anfrage, also steht die Sprache fest.
 */

vi.mock("@/i18n/server", () => ({
  getLocale: async () => "de",
}));

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-abdeckung-"));
  // `readChecked` sucht `geprueft.json` neben der Datenbank. Ein eigener Ordner
  // je Fall, sonst entschiede die Entwicklungsumgebung über das Ergebnis.
  process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
});

afterEach(() => {
  delete process.env.WHEELEE_DB_PATH;
  fs.rmSync(folder, { recursive: true, force: true });
});

function schreibeGeprueft(updatedAt: string): void {
  fs.writeFileSync(
    path.join(folder, "geprueft.json"),
    JSON.stringify({ updatedAt, cities: {} }),
    "utf8",
  );
}

async function seite(): Promise<string> {
  const { prelude } = await prerenderToNodeStream(createElement(Abdeckung));
  const chunks: Buffer[] = [];
  for await (const chunk of prelude) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString("utf8");
}

describe("Abdeckungsseite", () => {
  it("nennt das Datum des Laufs und das der Daten getrennt", async () => {
    schreibeGeprueft("2026-12-24T04:41:00.000Z");
    const html = await seite();

    expect(html).toContain("Zuletzt aktualisiert (nächtlicher Lauf): 24. Dezember 2026");
    expect(html).toContain("Daten vom:");
    // Der Lauf darf das Datum der Daten nicht mitziehen: Er hat nur nachgesehen.
    expect(html).not.toContain("Daten vom: 24. Dezember 2026");
  });

  it("behauptet ohne Datei keinen Lauf", async () => {
    const html = await seite();
    // Kein erfundenes Datum – dieselbe Haltung wie beim Impressum.
    expect(html).toContain("noch nicht gelaufen");
  });

  it("schreibt nicht mehr „Stand“, das wäre wieder die alte Verwechslung", async () => {
    schreibeGeprueft("2026-12-24T04:41:00.000Z");
    const html = await seite();
    expect(html).not.toContain("Stand:");
  });
});
