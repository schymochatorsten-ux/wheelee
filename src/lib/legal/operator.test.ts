import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { addressLines, operator } from "./operator";

/**
 * Betreiberangaben für Impressum und Datenschutzerklärung (ToDo 10.2).
 *
 * **Der wichtigste Test ist der auf `null`.** Eine unvollständige
 * Konfiguration muss als „nicht vorhanden" gelten, damit die Seite den Hinweis
 * zeigt statt ein halbes Impressum. Ein halbes Impressum erfüllt die Pflicht
 * nicht, sieht aber so aus – und genau das fällt niemandem auf.
 */

const KEYS = [
  "WHEELEE_OPERATOR_NAME",
  "WHEELEE_OPERATOR_ADDRESS",
  "WHEELEE_OPERATOR_EMAIL",
  "WHEELEE_OPERATOR_PHONE",
  "WHEELEE_OPERATOR_VAT_ID",
] as const;

let saved: Record<string, string | undefined>;

beforeEach(() => {
  saved = Object.fromEntries(KEYS.map((key) => [key, process.env[key]]));
  for (const key of KEYS) delete process.env[key];
});

afterEach(() => {
  for (const key of KEYS) {
    if (saved[key] === undefined) delete process.env[key];
    else process.env[key] = saved[key];
  }
});

function setPflichtangaben() {
  process.env.WHEELEE_OPERATOR_NAME = "Erika Mustermann";
  process.env.WHEELEE_OPERATOR_ADDRESS = "Hauptstraße 1|12345 Musterstadt|Deutschland";
  process.env.WHEELEE_OPERATOR_EMAIL = "kontakt@example.de";
}

describe("operator", () => {
  it("liest die Pflichtangaben", () => {
    setPflichtangaben();

    const result = operator();

    expect(result?.name).toBe("Erika Mustermann");
    expect(result?.address).toEqual(["Hauptstraße 1", "12345 Musterstadt", "Deutschland"]);
    expect(result?.email).toBe("kontakt@example.de");
  });

  it("gibt null zurück, wenn gar nichts gesetzt ist", () => {
    expect(operator()).toBeNull();
  });

  it.each([
    ["Name", "WHEELEE_OPERATOR_NAME"],
    ["Anschrift", "WHEELEE_OPERATOR_ADDRESS"],
    ["E-Mail", "WHEELEE_OPERATOR_EMAIL"],
  ])("gibt null zurück, wenn die %s fehlt", (_label, key) => {
    setPflichtangaben();
    delete process.env[key];

    expect(operator()).toBeNull();
  });

  it("behandelt eine leere Angabe wie eine fehlende", () => {
    // Eine Variable, die in der `.env` steht, aber nichts enthält, ist der
    // wahrscheinlichste Fall beim Einrichten – jemand kopiert die Vorlage und
    // löscht den Beispielwert, statt ihn zu ersetzen.
    setPflichtangaben();
    process.env.WHEELEE_OPERATOR_EMAIL = "   ";

    expect(operator()).toBeNull();
  });

  it("gibt null zurück, wenn die Anschrift nur Trennzeichen enthält", () => {
    setPflichtangaben();
    process.env.WHEELEE_OPERATOR_ADDRESS = "||";

    expect(operator()).toBeNull();
  });

  it("nimmt Telefon und Umsatzsteuer-ID mit, wenn sie da sind", () => {
    setPflichtangaben();
    process.env.WHEELEE_OPERATOR_PHONE = "+49 123 4567890";
    process.env.WHEELEE_OPERATOR_VAT_ID = "DE123456789";

    const result = operator();

    expect(result?.phone).toBe("+49 123 4567890");
    expect(result?.vatId).toBe("DE123456789");
  });

  it("lässt Telefon und Umsatzsteuer-ID null, wenn sie fehlen", () => {
    // Beides ist freiwillig: Eine Telefonnummer ist nicht vorgeschrieben, und
    // ein unentgeltliches Privatprojekt hat keine Umsatzsteuer-ID.
    setPflichtangaben();

    const result = operator();

    expect(result?.phone).toBeNull();
    expect(result?.vatId).toBeNull();
  });
});

describe("addressLines", () => {
  it("trennt an | und an echten Zeilenumbrüchen", () => {
    // Beides muss gehen: `|` für die `.env`, der Zeilenumbruch für den Fall,
    // dass jemand die Variable über ein Compose-File mehrzeilig setzt.
    expect(addressLines("A|B")).toEqual(["A", "B"]);
    expect(addressLines("A\nB")).toEqual(["A", "B"]);
  });

  it("wirft leere Zeilen und Leerraum weg", () => {
    expect(addressLines(" A | | B ")).toEqual(["A", "B"]);
  });
});
