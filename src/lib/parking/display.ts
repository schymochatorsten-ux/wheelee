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
