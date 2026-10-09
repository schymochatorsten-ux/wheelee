import type { ParkingSpot } from "./types";

/**
 * Feedback und Fehlermeldungen.
 *
 * Nutzer:innen sind die einzige Quelle, die merkt, wenn ein Parkplatz nicht
 * mehr existiert oder an der falschen Stelle liegt. Die Hürde dafür muss
 * niedrig sein.
 */

/**
 * Empfängeradresse für Fehlermeldungen.
 *
 * **Noch nicht festgelegt** – siehe D-06 in ToDos.md. Hier eintragen und
 * fertig; sonst ist keine weitere Änderung nötig.
 *
 * Bedenken für die Wahl: Die Adresse steht im ausgelieferten Quelltext und
 * ist damit öffentlich. Eine eigene Adresse mit Spamfilter ist einer privaten
 * vorzuziehen.
 */
export const FEEDBACK_EMAIL = "BITTE-FESTLEGEN@example.invalid";

/** Vom Nutzer gewünschter Betreff, unverändert. */
export const FEEDBACK_SUBJECT = "Wheelee Fehlermeldung";

/** Ist schon eine echte Adresse hinterlegt? */
export const hasFeedbackAddress = !FEEDBACK_EMAIL.endsWith(".invalid");

/**
 * Text der Mail vorbereiten.
 *
 * Gerät und Browser kommen mit hinein, weil eine Fehlermeldung ohne sie oft
 * nicht nachvollziehbar ist. Der **Standort wird nicht mitgeschickt** – er
 * verlässt das Gerät auch hier nicht.
 */
export function feedbackBody(options: {
  spot?: ParkingSpot | null;
  userAgent?: string;
  url?: string;
}): string {
  const lines = [
    "Bitte beschreibe hier, was nicht stimmt:",
    "",
    "",
    "",
    "---",
    "Angaben zur Einordnung (bitte stehen lassen, sie helfen bei der Suche):",
  ];

  if (options.spot) {
    const spot = options.spot;
    const address = [spot.street, spot.houseNumber].filter(Boolean).join(" ") || spot.label;
    lines.push(
      `Parkplatz: ${address}`,
      `Stadt: ${spot.district}`,
      `Kennung: ${spot.id}`,
      spot.lat !== null && spot.lng !== null ? `Koordinate: ${spot.lat}, ${spot.lng}` : "",
      `Quelle: ${spot.source}`,
    );
  }

  lines.push(
    options.url ? `Seite: ${options.url}` : "",
    options.userAgent ? `Browser: ${options.userAgent}` : "",
    `Zeitpunkt: ${new Date().toLocaleString("de-DE")}`,
  );

  return lines.filter((line) => line !== "").join("\n");
}

/** Fertiger `mailto:`-Link. */
export function feedbackMailto(options: {
  spot?: ParkingSpot | null;
  userAgent?: string;
  url?: string;
}): string {
  const subject = encodeURIComponent(FEEDBACK_SUBJECT);
  const body = encodeURIComponent(feedbackBody(options));
  return `mailto:${FEEDBACK_EMAIL}?subject=${subject}&body=${body}`;
}
