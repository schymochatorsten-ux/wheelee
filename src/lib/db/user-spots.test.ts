import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb } from "./sqlite";
import { createAccount } from "./accounts";
import { castVote } from "./ratings";
import {
  addUserSpot,
  confirmByVotes,
  decideUserSpot,
  MELDUNGEN_JE_TAG,
  userSpot,
  userSpotId,
  userSpotIdOf,
  UserSpotError,
  userSpots,
  visibleUserSpots,
} from "./user-spots";

/**
 * Gemeldete Parkplätze (ToDo 8.11).
 *
 * Gegen eine echte Datenbank, weil die Zählerstände aus einer Unterabfrage auf
 * `rating` kommen – und weil die Drosselung je Konto in der Abfrage steckt,
 * nicht im Code.
 */

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-userspot-"));
  process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
  closeDb();
});

afterEach(() => {
  closeDb();
  delete process.env.WHEELEE_DB_PATH;
  fs.rmSync(folder, { recursive: true, force: true });
});

const PASSWORD = "ein gutes langes Passwort";

function konto(email: string): string {
  const account = createAccount(email, PASSWORD);
  if (!account) throw new Error("Konto konnte nicht angelegt werden");
  return account.id;
}

const EINGABE = {
  label: "Bahnhofstraße 12",
  street: "Bahnhofstraße",
  houseNumber: "12",
  note: null,
  city: "frankfurt",
  lat: 50.107,
  lng: 8.663,
  spotCount: 2,
};

describe("Gemeldete Parkplätze", () => {
  it("legt einen Platz an, der sofort sichtbar und unsicher ist", () => {
    const account = konto("a@example.de");
    const row = addUserSpot(account, EINGABE);

    expect(row.status).toBe("offen");

    const sichtbar = visibleUserSpots();
    expect(sichtbar).toHaveLength(1);
    expect(sichtbar[0].id).toBe(userSpotId(row.id));
    // **Das ist die ganze Kennzeichnung:** `origin: "gemeldet"` macht ihn in
    // `certainty.ts` unsicher und damit leichter wieder loszuwerden.
    expect(sichtbar[0].origin).toBe("gemeldet");
    expect(sichtbar[0].spotCount).toBe(2);
  });

  it("erkennt die eigene ID wieder", () => {
    expect(userSpotIdOf(userSpotId("abc"))).toBe("abc");
    expect(userSpotIdOf("koeln-1a2b")).toBeNull();
  });

  it("weist unbrauchbare Angaben ab", () => {
    const account = konto("b@example.de");

    expect(() => addUserSpot(account, { ...EINGABE, label: "x" })).toThrow(UserSpotError);
    expect(() => addUserSpot(account, { ...EINGABE, lat: 999 })).toThrow(UserSpotError);
    expect(() => addUserSpot(account, { ...EINGABE, spotCount: 0 })).toThrow(UserSpotError);
    expect(userSpots()).toHaveLength(0);
  });

  it("drosselt je Konto", () => {
    const account = konto("c@example.de");
    for (let index = 0; index < MELDUNGEN_JE_TAG; index += 1) {
      addUserSpot(account, { ...EINGABE, label: `Teststraße ${index}` });
    }

    expect(() => addUserSpot(account, EINGABE)).toThrow(UserSpotError);

    // Ein anderes Konto ist davon nicht betroffen.
    expect(() => addUserSpot(konto("d@example.de"), EINGABE)).not.toThrow();
  });

  it("zählt Bestätigungen und Meldungen zum gemeldeten Platz", () => {
    const melder = konto("e@example.de");
    const row = addUserSpot(melder, EINGABE);

    castVote(userSpotId(row.id), konto("f@example.de"), "exists");
    castVote(userSpotId(row.id), konto("g@example.de"), "exists");
    castVote(userSpotId(row.id), konto("h@example.de"), "gone");

    const nachher = userSpot(row.id)!;
    expect(nachher.existsCount).toBe(2);
    expect(nachher.goneCount).toBe(1);
  });

  it("macht aus einem bestätigten Platz einen gewöhnlichen", () => {
    const row = addUserSpot(konto("i@example.de"), EINGABE);

    expect(confirmByVotes(row.id)).toBe(true);
    expect(userSpot(row.id)?.status).toBe("bestaetigt");
    // `origin` ist jetzt nicht mehr „gemeldet" – der Platz gilt als gesichert.
    expect(visibleUserSpots()[0].origin).toBe("import");
  });

  it("holt einen verworfenen Platz nicht durch Stimmen zurück", () => {
    const row = addUserSpot(konto("j@example.de"), EINGABE);
    decideUserSpot(row.id, "verworfen", null);

    expect(visibleUserSpots()).toHaveLength(0);
    // **Was ein Mensch verworfen hat, bleibt verworfen.** Sonst wäre die
    // Ablehnung nur eine Verzögerung, und zwar genau bei dem Eintrag, den
    // jemand bewusst abgelehnt hat.
    expect(confirmByVotes(row.id)).toBe(false);
    expect(userSpot(row.id)?.status).toBe("verworfen");
  });
});
