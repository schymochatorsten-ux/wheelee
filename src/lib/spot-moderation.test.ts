import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb } from "./db/sqlite";
import { createAccount } from "./db/accounts";
import { castVote, withdrawVote } from "./db/ratings";
import { setSpotPolicy } from "./db/spot-policy";
import { decideSpot, spotDecision } from "./db/spot-state";
import { addUserSpot, userSpot, userSpotId } from "./db/user-spots";
import { getAllSpots, spotById, spotByIdAny } from "./parking/spots";
import { isUncertain } from "./parking/certainty";
import { evaluateSpot } from "./spot-moderation";

/**
 * Was nach einer Stimme mit dem Parkplatz geschieht (ToDo 8.11).
 *
 * **Hier wird die Umkehrung geprüft, die Torsten am 2026-11-13 verlangt hat:**
 * Bis dahin galt „Bewertungen ändern nichts an den Daten" (Konzept, 8.6).
 * Jetzt verschwindet ein Platz, und zwar unsicher früher als gesichert. Das
 * ist die Stelle, an der ein Fehler echten Schaden anrichtet – in beide
 * Richtungen: Ein Platz, der zu früh geht, fehlt jemandem; einer, der nie
 * geht, schickt Leute ins Leere.
 */

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-moderation-"));
  process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
  closeDb();
});

afterEach(() => {
  closeDb();
  delete process.env.WHEELEE_DB_PATH;
  fs.rmSync(folder, { recursive: true, force: true });
});

const PASSWORD = "ein gutes langes Passwort";
let zaehler = 0;

function konto(): string {
  zaehler += 1;
  const account = createAccount(`konto${zaehler}@example.de`, PASSWORD);
  if (!account) throw new Error("Konto konnte nicht angelegt werden");
  return account.id;
}

/**
 * Ein gesicherter Standort aus dem echten Bestand.
 *
 * Gesucht und nicht festgeschrieben: Eine ID aus einer Seed-Datei würde beim
 * nächsten Import wandern, und der Test prüfte dann stillschweigend nichts
 * mehr (dieselbe Falle wie bei den IDs aus der Zeilennummer, 2b).
 */
function gesicherterStandort(): string {
  const spot = getAllSpots().find((candidate) => !isUncertain(candidate));
  if (!spot) throw new Error("Kein gesicherter Standort im Bestand");
  return spot.id;
}

describe("Moderation nach Stimmen", () => {
  it("blendet einen gesicherten Platz erst bei der höheren Schwelle aus", () => {
    setSpotPolicy({ schwelleUnsicher: 2, schwelleSicher: 3 }, null);
    const id = gesicherterStandort();

    castVote(id, konto(), "gone");
    expect(evaluateSpot(id).hidden).toBe(false);

    castVote(id, konto(), "gone");
    // Zwei genügen bei unsicheren – hier nicht.
    expect(evaluateSpot(id).hidden).toBe(false);
    expect(spotById(id)).not.toBeNull();

    castVote(id, konto(), "gone");
    const result = evaluateSpot(id);
    expect(result.justHidden).toBe(true);
    expect(result.threshold).toBe(3);
    // **Die Wirkung, auf die alles hinausläuft:** Der Platz ist von der Karte.
    expect(spotById(id)).toBeNull();
    // Aber nicht gelöscht – die Verwaltung findet ihn noch.
    expect(spotByIdAny(id)).not.toBeNull();
  });

  it("blendet einen gemeldeten Platz schon bei der niedrigen Schwelle aus", () => {
    setSpotPolicy({ schwelleUnsicher: 2, schwelleSicher: 5 }, null);
    const row = addUserSpot(konto(), {
      label: "Teststraße 1",
      street: "Teststraße",
      houseNumber: "1",
      note: null,
      city: "frankfurt",
      lat: 50.107,
      lng: 8.663,
      spotCount: 1,
    });
    const id = userSpotId(row.id);

    castVote(id, konto(), "gone");
    expect(evaluateSpot(id).hidden).toBe(false);

    castVote(id, konto(), "gone");
    expect(evaluateSpot(id).justHidden).toBe(true);
    expect(spotById(id)).toBeNull();
  });

  it("rechnet Bestätigungen gegen Meldungen", () => {
    setSpotPolicy({ schwelleUnsicher: 2, schwelleSicher: 5 }, null);
    const row = addUserSpot(konto(), {
      label: "Streitstraße 1",
      street: "Streitstraße",
      houseNumber: "1",
      note: null,
      city: "frankfurt",
      lat: 50.107,
      lng: 8.663,
      spotCount: 1,
    });
    const id = userSpotId(row.id);

    castVote(id, konto(), "gone");
    castVote(id, konto(), "gone");
    castVote(id, konto(), "exists");

    /*
     * Zwei Meldungen bei einer Bestätigung sind ein Überhang von eins – und
     * damit kein Beleg. **In einem Streit verschwindet nichts automatisch;**
     * sonst entscheidet, wer zuerst tippt.
     */
    expect(evaluateSpot(id).hidden).toBe(false);
  });

  it("holt den Platz zurück, wenn eine Meldung zurückgezogen wird", () => {
    setSpotPolicy({ schwelleUnsicher: 2, schwelleSicher: 5 }, null);
    const row = addUserSpot(konto(), {
      label: "Irrtumstraße 1",
      street: "Irrtumstraße",
      houseNumber: "1",
      note: null,
      city: "frankfurt",
      lat: 50.107,
      lng: 8.663,
      spotCount: 1,
    });
    const id = userSpotId(row.id);

    const reue = konto();
    castVote(id, konto(), "gone");
    castVote(id, reue, "gone");
    expect(evaluateSpot(id).hidden).toBe(true);

    withdrawVote(id, reue);
    // Ein erkannter Irrtum darf nicht folgenlos bleiben.
    expect(evaluateSpot(id).hidden).toBe(false);
    expect(spotById(id)).not.toBeNull();
  });

  it("rührt einen von Hand behaltenen Platz nicht an", () => {
    setSpotPolicy({ schwelleUnsicher: 1, schwelleSicher: 1 }, null);
    const id = gesicherterStandort();

    decideSpot({ spotId: id, goneCount: 0, existsCount: 0, wasUnsicher: false }, "kept", null);
    castVote(id, konto(), "gone");
    castVote(id, konto(), "gone");

    /*
     * **Das ist der Fall, für den `kept` überhaupt existiert.** Die Stimmen
     * bleiben stehen, wenn die Verwaltung einen Platz zurückholt – ohne diesen
     * Zustand wäre er sofort wieder weg und der Knopf hätte sichtbar nichts
     * getan.
     */
    expect(evaluateSpot(id).hidden).toBe(false);
    expect(spotDecision(id)?.status).toBe("kept");
  });

  it("macht aus einem gemeldeten Platz einen gewöhnlichen – erst ab der höheren Schwelle", () => {
    setSpotPolicy({ schwelleUnsicher: 2, schwelleSicher: 3 }, null);
    const row = addUserSpot(konto(), {
      label: "Bestätigungsstraße 1",
      street: "Bestätigungsstraße",
      houseNumber: "1",
      note: null,
      city: "frankfurt",
      lat: 50.107,
      lng: 8.663,
      spotCount: 1,
    });
    const id = userSpotId(row.id);

    castVote(id, konto(), "exists");
    castVote(id, konto(), "exists");
    expect(evaluateSpot(id).justConfirmed).toBe(false);
    expect(userSpot(row.id)?.status).toBe("offen");

    castVote(id, konto(), "exists");
    expect(evaluateSpot(id).justConfirmed).toBe(true);
    expect(userSpot(row.id)?.status).toBe("bestaetigt");
    // Und ab jetzt gilt für ihn die höhere Schwelle zum Verschwinden.
    expect(evaluateSpot(id).threshold).toBe(3);
  });
});
