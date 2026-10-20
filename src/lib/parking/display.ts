import type { ParkingSpot } from "../types";

/**
 * Wie ein Parkplatz benannt wird.
 *
 * Vorher stand dieselbe Logik in drei Komponenten (Liste, Detailansicht,
 * Navigationsleiste) – mit kleinen Abweichungen, die niemand beabsichtigt
 * hatte. Sie gehört an eine Stelle, schon damit eine Verbesserung überall
 * ankommt.
 */

/**
 * „Behindertenparkplatz" als Präfix entfernen.
 *
 * Gelsenkirchen stellt es jedem Eintrag voran: „Behindertenparkplatz
 * Ahstraße". In einer App, die ausschließlich Behindertenparkplätze zeigt,
 * ist das eine Zeile Platz für nichts – und auf einem Telefon ist die Zeile
 * knapp. Entfernt wird nur, wenn danach noch ein echter Name steht; bleibt
 * nichts übrig, ist das Präfix die einzige Information, die es gibt (ToDo
 * 3.0g).
 *
 * Bewusst nur für die Anzeige: `label` ist laut Datenmodell der unveränderte
 * Text der Quelle und soll das bleiben.
 */
export function stripRedundantPrefix(label: string): string {
  const match =
    /^(?:behinderten(?:park|stell)platz|behindertenparken)\b[\s:,-]*(?<rest>.+)$/iu.exec(
      label.trim(),
    );
  const rest = match?.groups?.rest?.trim();
  return rest && rest.length > 0 ? rest : label.trim();
}

/**
 * Ist diese Bezeichnung ein Platzhalter – oder ein echter Name?
 *
 * Gebraucht beim Nachtragen der Straßennamen (ToDo 3.0i): Der OSM-Importer
 * setzt „Behindertenparkplatz <Stadt>", wenn das Objekt keinen eigenen Namen
 * trägt. Solche Einträge **sind** die Lücke, die `import:streets` schließen
 * soll. Ein Objekt, das „IKEA", „Tiefgarage Klinikum" oder
 * „Richard-Hecht-Schule" heißt, ist dagegen **keine Lücke**: Die Quelle nennt
 * etwas Besseres als die nächstgelegene Straße.
 *
 * **Warum das eine eigene Funktion ist und nicht eine Zeile im Importskript:**
 * Am 2026-10-20 hätte `import:streets` genau diese Namen durch den Namen der
 * nächsten Straße innerhalb von 150 m ersetzt – „Richard-Hecht-Schule" wäre zu
 * einer Straße geworden, und die Angabe der Quelle wäre weg. Dieselbe Gefahr
 * stand schon einmal da: Beim Karlsruher Import wäre „Bahnhof" beinahe als
 * Straßenname eingetragen worden (siehe 2e.2/2e.3 in `Erledigt.md`). Die Regel
 * gehört deshalb an eine Stelle und unter Tests.
 *
 * Als Platzhalter gilt: nach Abzug des Präfixes bleibt nichts übrig, oder es
 * bleibt genau der Stadtname (auch mit Klammerzusatz wie „Frankfurt (Oder)").
 */
export function isGenericLabel(label: string, cityName: string): boolean {
  const rest = stripRedundantPrefix(label);
  const plain = rest.trim().toLocaleLowerCase("de-DE");

  // Nichts übrig: Das Label war ausschließlich das Präfix.
  if (plain.length === 0) return true;

  // `stripRedundantPrefix` gibt das Label unverändert zurück, wenn danach
  // nichts Echtes stünde – dann ist der Vergleich mit dem Präfix selbst nötig.
  if (plain === "behindertenparkplatz" || plain === "behindertenstellplatz") return true;

  return plain === cityName.trim().toLocaleLowerCase("de-DE");
}

/**
 * Überschrift für einen Parkplatz: Straße und Hausnummer, sonst die
 * Bezeichnung der Quelle.
 *
 * Die Straße hat Vorrang, weil sie die Frage beantwortet, die jemand vor der
 * Abfahrt hat – „wo ist das".
 */
export function spotTitle(spot: Pick<ParkingSpot, "street" | "houseNumber" | "label">): string {
  const street = [spot.street, spot.houseNumber].filter(Boolean).join(" ").trim();
  return street.length > 0 ? street : stripRedundantPrefix(spot.label);
}
