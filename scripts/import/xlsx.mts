import { extractFile, readZipIndex, readZipEntry } from "./zip.mjs";

/**
 * Ein schlanker Leser für Excel-Dateien.
 *
 * Gebraucht für das Gemeindeverzeichnis des BKG (ToDo 2e.4), das nur als
 * `.xlsx` angeboten wird. Gelesen wird genau so viel, wie dieses eine
 * Tabellenblatt braucht: Zellwerte als Text, Zeilen in Dateireihenfolge.
 *
 * **Nicht unterstützt** – und das ist Absicht, nicht Nachlässigkeit: Formeln
 * (gelesen wird der zwischengespeicherte Wert), Zahlenformate, Datumswerte,
 * verbundene Zellen, Formatierung. Für eine amtliche Datenliste braucht es
 * davon nichts, und jedes dieser Dinge wäre eine eigene Fehlerquelle.
 */

/** XML-Entitäten auflösen, die in Zellinhalten vorkommen können. */
function decodeXml(text: string): string {
  return (
    text
      .replace(/&lt;/gu, "<")
      .replace(/&gt;/gu, ">")
      .replace(/&quot;/gu, '"')
      .replace(/&apos;/gu, "'")
      .replace(/&#(\d+);/gu, (_, code: string) => String.fromCodePoint(Number(code)))
      .replace(/&#x([0-9a-f]+);/giu, (_, code: string) =>
        String.fromCodePoint(Number.parseInt(code, 16)),
      )
      // `&amp;` zuletzt, sonst würde „&amp;lt;" zu „<" statt zu „&lt;".
      .replace(/&amp;/gu, "&")
  );
}

/**
 * Die gemeinsame Zeichenkettentabelle.
 *
 * Excel speichert Texte nicht in der Zelle, sondern als Index in diese
 * Liste. Ein `<si>` kann in mehrere `<t>` zerfallen, wenn Teile des Textes
 * unterschiedlich formatiert sind – die gehören zusammengesetzt.
 */
export function parseSharedStrings(xml: string): string[] {
  const strings: string[] = [];
  for (const item of xml.matchAll(/<si>([\s\S]*?)<\/si>/gu)) {
    const parts = [...item[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/gu)].map((part) => part[1]);
    strings.push(decodeXml(parts.join("")));
  }
  return strings;
}

/** Eine Tabellenzeile als Spaltenbuchstabe → Wert. */
export type Row = Record<string, string>;

/** Ein Tabellenblatt in Zeilen zerlegen. */
export function parseSheet(xml: string, shared: readonly string[]): Row[] {
  const rows: Row[] = [];

  for (const rowMatch of xml.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/gu)) {
    const row: Row = {};

    for (const cell of rowMatch[1].matchAll(/<c r="([A-Z]+)\d+"([^>]*)\/?>([\s\S]*?)<\/c>/gu)) {
      const column = cell[1];
      const type = /t="([^"]+)"/u.exec(cell[2])?.[1];

      // `inlineStr` trägt den Text direkt in der Zelle statt in der Tabelle.
      if (type === "inlineStr") {
        const parts = [...cell[3].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/gu)].map((part) => part[1]);
        row[column] = decodeXml(parts.join(""));
        continue;
      }

      const raw = /<v>([\s\S]*?)<\/v>/u.exec(cell[3])?.[1];
      if (raw === undefined) continue;

      row[column] = type === "s" ? (shared[Number(raw)] ?? "") : decodeXml(raw);
    }

    rows.push(row);
  }

  return rows;
}

/**
 * Ein Blatt aus einer Excel-Datei lesen, gesucht über seinen Namen.
 *
 * Die Zuordnung Blattname → Datei läuft über die Beziehungsdatei: Die
 * Reihenfolge in `workbook.xml` stimmt **nicht** zuverlässig mit den
 * Dateinamen `sheet1.xml`, `sheet2.xml` … überein, und sich darauf zu
 * verlassen wäre genau die Art stiller Verwechslung, die dieses Projekt
 * schon einmal 450 km danebenliegende Koordinaten gekostet hat.
 */
export function readSheetByName(xlsx: Buffer, sheetName: string): Row[] {
  const workbook = extractFile(xlsx, "xl/workbook.xml").toString("utf8");
  const relations = extractFile(xlsx, "xl/_rels/workbook.xml.rels").toString("utf8");

  const sheet = [...workbook.matchAll(/<sheet[^>]*\/>/gu)]
    .map((match) => match[0])
    .find((tag) => decodeXml(/name="([^"]*)"/u.exec(tag)?.[1] ?? "") === sheetName);

  if (!sheet) {
    const names = [...workbook.matchAll(/<sheet[^>]*name="([^"]*)"/gu)].map((m) => m[1]);
    throw new Error(`Blatt „${sheetName}" fehlt. Vorhanden: ${names.join(", ")}`);
  }

  const relationId = /r:id="([^"]+)"/u.exec(sheet)?.[1];
  const target = relationId
    ? /Target="([^"]+)"/u.exec(
        [...relations.matchAll(/<Relationship[^>]*\/>/gu)]
          .map((match) => match[0])
          .find((tag) => tag.includes(`Id="${relationId}"`)) ?? "",
      )?.[1]
    : undefined;

  if (!target) throw new Error(`Zu Blatt „${sheetName}" fehlt der Dateiverweis.`);

  const path = target.replace(/^\/?(xl\/)?/u, "xl/");
  const entries = readZipIndex(xlsx);
  const entry = entries.find((item) => item.name === path || item.name.endsWith(`/${path}`));
  if (!entry) throw new Error(`Blattdatei „${path}" fehlt im Archiv.`);

  const shared = parseSharedStrings(
    entries.some((item) => item.name === "xl/sharedStrings.xml")
      ? extractFile(xlsx, "xl/sharedStrings.xml").toString("utf8")
      : "",
  );

  return parseSheet(readZipEntry(xlsx, entry).toString("utf8"), shared);
}

/**
 * Zeilen mit Spaltenüberschriften benennen.
 *
 * Aus `{ A: "AGS", B: "GEN" }` in der ersten Zeile wird `{ AGS: …, GEN: … }`
 * in allen folgenden – damit der Rest des Skripts nicht mit Buchstaben
 * hantiert, die sich beim nächsten Jahrgang verschieben können.
 */
export function withHeader(rows: readonly Row[]): Row[] {
  const [header, ...rest] = rows;
  if (!header) return [];

  return rest.map((row) => {
    const named: Row = {};
    for (const [column, value] of Object.entries(row)) {
      const name = header[column];
      if (name) named[name] = value;
    }
    return named;
  });
}
