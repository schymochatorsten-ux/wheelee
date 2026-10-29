/**
 * Handgepflegte amtliche Quellen (ToDo 2d.8a).
 *
 * Was GovData nicht kennt, kann `sources:scan` nicht finden – und ein Eintrag
 * in `data/_quellen-status.json` würde beim nächsten Scan überschrieben, denn
 * die Datei wird erzeugt. München veröffentlicht seine Behindertenparkplätze
 * auf dem eigenen Open-Data-Portal, nicht bei GovData. Solche Quellen stehen
 * deshalb hier, im Quelltext, und der Importer stellt sie **vor** die
 * gefundenen.
 *
 * Eine Quelle hier muss belegt sein: Datensatzseite, Lizenz und Stand stehen im
 * Kommentar, und `Erledigt.md` begründet, warum sie genommen wurde.
 */

export interface ManualSource {
  title: string;
  license: string;
  resources: { format: string; url: string }[];
  /**
   * Zusatzhinweis je Feature (etwa „Baustelle“) – wird an den Hinweis des
   * Standorts gehängt. `null` heißt: nichts zu vermerken.
   */
  noteOf?: (properties: Record<string, unknown>) => string | null;
  /**
   * Stabile Kennung je Feature. Die laufende Nummer eines WFS
   * (`behindertenparkplaetze.17`) ändert sich, sobald ein Eintrag wegfällt –
   * und mit ihr die ID, an der Bewertungen hängen.
   */
  idOf?: (properties: Record<string, unknown>) => string | null;
}

/** „20261211103557“ und „11.12.2026“ zu „11.12.2026“; sonst unverändert. */
function readDate(value: string): string {
  const compact = /^(\d{4})(\d{2})(\d{2})\d{0,6}$/u.exec(value);
  return compact ? `${compact[3]}.${compact[2]}.${compact[1]}` : value;
}

const text = (value: unknown): string | null => {
  const s = typeof value === "string" ? value.trim() : "";
  return s.length > 0 && s !== "null" ? s : null;
};

/**
 * München – Mobilitätsreferat der Landeshauptstadt, Datensatz
 * „Behindertenparkplätze“ auf opendata.muenchen.de, Datenlizenz Deutschland –
 * Namensnennung 2.0, laut Portal täglich aktualisiert (geprüft 2026-10-29).
 * WFS-Ebene `mor_wfs:behindertenparkplaetze`, GeoJSON, EPSG:25832.
 *
 * **Standorte im Status „Baustelle“ bleiben im Bestand**, mit Hinweis und
 * Zeitraum: Ausgeblendet wäre ein Platz, der nach der Baustelle wieder da ist,
 * für niemanden mehr zu finden (Entscheidung D-11 in `Erledigt.md`).
 */
const MUENCHEN: ManualSource = {
  title: "Behindertenparkplätze (Mobilitätsreferat München)",
  license: "Datenlizenz Deutschland – Namensnennung – Version 2.0",
  resources: [
    {
      format: "GEOJSON",
      url: "https://geoportal.muenchen.de/geoserver/mor_wfs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=mor_wfs:behindertenparkplaetze&outputFormat=application/json",
    },
  ],
  noteOf: (properties) => {
    if (text(properties.status)?.toLowerCase() !== "baustelle") return null;
    const ende = text(properties.baustelle_ende);
    const bis = ende ? readDate(ende) : null;
    const hinweis = text(properties.hinweis);
    return [
      // Der Hinweis der Stadt sagt, was geändert ist („Standort befindet sich
      // vor Nr. 15“) – manche Plätze sind nur verlegt, nicht gesperrt. Deshalb
      // keine Behauptung „nicht nutzbar“, sondern die Angabe der Stadt.
      `Wegen einer Baustelle vorübergehend geändert${bis ? ` (bis ${bis})` : ""}`,
      hinweis,
    ]
      .filter(Boolean)
      .join(" – ");
  },
  idOf: (properties) => {
    const id = properties.parkplatz_id;
    return typeof id === "number" || typeof id === "string" ? `muenchen-${id}` : null;
  },
};

export const MANUAL_SOURCES: Record<string, ManualSource[]> = {
  muenchen: [MUENCHEN],
};

export function manualSourcesFor(slug: string): ManualSource[] {
  return MANUAL_SOURCES[slug] ?? [];
}
