import { deflateRawSync } from "node:zlib";
import { describe, expect, it } from "vitest";
import { extractFile, readZipIndex } from "./zip.mjs";

/**
 * Baut ein ZIP-Archiv im Speicher.
 *
 * Bewusst von Hand statt mit einer Bibliothek: Ein Test, der dieselbe
 * Bibliothek zum Schreiben nimmt, die er beim Lesen prüfen soll, bestätigt
 * nur sich selbst. So steht hier das Format, nicht eine zweite Meinung
 * darüber.
 */
function buildZip(files: { name: string; content: string; store?: boolean }[]): Buffer {
  const locals: Buffer[] = [];
  const centrals: Buffer[] = [];
  let offset = 0;

  for (const file of files) {
    const name = Buffer.from(file.name, "utf8");
    const raw = Buffer.from(file.content, "utf8");
    const data = file.store ? raw : deflateRawSync(raw);
    const method = file.store ? 0 : 8;

    const local = Buffer.alloc(30 + name.length);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(method, 8);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(raw.length, 22);
    local.writeUInt16LE(name.length, 26);
    name.copy(local, 30);

    const central = Buffer.alloc(46 + name.length);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(method, 10);
    central.writeUInt32LE(data.length, 20);
    central.writeUInt32LE(raw.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt32LE(offset, 42);
    name.copy(central, 46);

    locals.push(local, data);
    centrals.push(central);
    offset += local.length + data.length;
  }

  const directory = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(directory.length, 12);
  end.writeUInt32LE(offset, 16);

  return Buffer.concat([...locals, directory, end]);
}

describe("readZipIndex", () => {
  it("listet alle Einträge", () => {
    const zip = buildZip([
      { name: "erste.txt", content: "eins" },
      { name: "ordner/zweite.xml", content: "<a/>" },
    ]);
    expect(readZipIndex(zip).map((entry) => entry.name)).toEqual([
      "erste.txt",
      "ordner/zweite.xml",
    ]);
  });

  it("weist etwas zurück, das kein ZIP ist", () => {
    expect(() => readZipIndex(Buffer.from("das ist kein Archiv, sondern Text"))).toThrow(
      /zentrale Verzeichnis/u,
    );
  });
});

describe("extractFile", () => {
  it("entpackt gepackte Einträge", () => {
    const text = "Behindertenparkplatz Köln, Gleueler Straße 83. ".repeat(50);
    const zip = buildZip([{ name: "xl/sharedStrings.xml", content: text }]);
    expect(extractFile(zip, "sharedStrings.xml").toString("utf8")).toBe(text);
  });

  it("entpackt ungepackte Einträge", () => {
    const zip = buildZip([{ name: "klein.txt", content: "kurz", store: true }]);
    expect(extractFile(zip, "klein.txt").toString("utf8")).toBe("kurz");
  });

  it("findet auch über einen regulären Ausdruck", () => {
    const zip = buildZip([{ name: "tief/verschachtelt/daten.xlsx", content: "x" }]);
    expect(extractFile(zip, /\.xlsx$/u).toString("utf8")).toBe("x");
  });

  it("nennt beim Fehlschlag, was stattdessen drin ist", () => {
    const zip = buildZip([{ name: "a.txt", content: "a" }]);
    expect(() => extractFile(zip, "fehlt.txt")).toThrow(/a\.txt/u);
  });

  it("erhält Umlaute über die Packung hinweg", () => {
    const zip = buildZip([{ name: "u.txt", content: "Gemeinde Weißenhorn, Lübeck, Köln" }]);
    expect(extractFile(zip, "u.txt").toString("utf8")).toBe("Gemeinde Weißenhorn, Lübeck, Köln");
  });
});
