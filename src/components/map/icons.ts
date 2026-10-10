import L from "leaflet";

/**
 * Marker-Symbole der Karte.
 *
 * Als Inline-SVG statt Bilddateien: keine zusätzlichen Requests, und die Farben
 * bleiben an einer Stelle definiert. Die Größen folgen der Touch-Vorgabe aus dem
 * Konzept – der Marker ist groß genug, um ihn mit dem Daumen zu treffen.
 */

const PARKING_SYMBOL = `
  <path d="M9.6 19.2V6.4h5.1c2.6 0 4.3 1.6 4.3 4s-1.7 4-4.3 4h-2.3v4.8z"
        fill="#fff"/>
  <path d="M12.4 9.1h2c1 0 1.6.5 1.6 1.3s-.6 1.3-1.6 1.3h-2z" fill="currentColor"/>
`;

function pin(color: string, size: number, extraClass = ""): L.DivIcon {
  const height = Math.round(size * 1.3);
  return L.divIcon({
    className: `wheelee-pin ${extraClass}`.trim(),
    html: `
      <svg width="${size}" height="${height}" viewBox="0 0 28 36" aria-hidden="true"
           style="color:${color};display:block">
        <path d="M14 0C6.3 0 0 6.2 0 13.9 0 23.4 14 36 14 36s14-12.6 14-22.1C28 6.2 21.7 0 14 0z"
              fill="currentColor" stroke="rgba(0,0,0,.25)" stroke-width="1"/>
        ${PARKING_SYMBOL}
      </svg>`,
    iconSize: [size, height],
    iconAnchor: [size / 2, height],
    popupAnchor: [0, -height],
  });
}

/** Normaler Parkplatz. */
export const spotIcon = pin("#1d4ed8", 28);

/** Der nächstgelegene Parkplatz – deutlich größer und in Signalfarbe. */
export const nearestIcon = pin("#047857", 38, "wheelee-pin--nearest");

/**
 * Parkplatz, dessen Koordinate nur auf Straßenebene bekannt ist.
 *
 * Rot statt des früheren Grau: Die ungenaue Position ist die wichtigste
 * Warnung der Karte und ging in Grau unter.
 */
export const approximateIcon = pin("#dc2626", 28, "wheelee-pin--approximate");

/**
 * Das eingegebene Reiseziel (ToDo 6.12).
 *
 * Bewusst **kein** Parkplatz-Pin: Ziel und Parkplatz müssen auf einen Blick
 * unterscheidbar sein, sonst fährt jemand zum Ziel statt zum Stellplatz. Ein
 * Fähnchen statt eines Tropfens, und eine Farbe, die sonst nirgends vorkommt.
 */
export const destinationIcon = L.divIcon({
  className: "wheelee-destination",
  html: `
    <svg width="30" height="36" viewBox="0 0 30 36" aria-hidden="true" style="display:block">
      <path d="M6 36V2" stroke="#1f2937" stroke-width="3" stroke-linecap="round"/>
      <path d="M7.5 3h16l-4 6 4 6h-16z" fill="#7c3aed" stroke="rgba(0,0,0,.25)"/>
    </svg>`,
  iconSize: [30, 36],
  // Der Fahnenmast steht auf dem Punkt, nicht die Fahne.
  iconAnchor: [6, 36],
});

/** Der eigene Standort. */
export const userIcon = L.divIcon({
  className: "wheelee-user",
  html: `
    <span aria-hidden="true" style="
      display:block;width:18px;height:18px;border-radius:50%;
      background:#2563eb;border:3px solid #fff;
      box-shadow:0 0 0 2px rgba(37,99,235,.35);"></span>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

/**
 * Ein Parkplatz aus der angebotenen Auswahl (ToDo 6.16).
 *
 * Dieselbe Signalfarbe wie das Ziel, aber in normaler Größe: Die Auswahl soll
 * als Gruppe erkennbar sein, ohne dass unklar wird, welcher davon gerade das
 * Ziel ist.
 */
export const candidateIcon = pin("#047857", 28, "wheelee-pin--candidate");

/** Passendes Symbol für einen Parkplatz. */
export function iconFor(options: {
  isNearest: boolean;
  isCandidate?: boolean;
  isApproximate: boolean;
}): L.DivIcon {
  if (options.isNearest) return nearestIcon;
  if (options.isCandidate) return candidateIcon;
  return options.isApproximate ? approximateIcon : spotIcon;
}
