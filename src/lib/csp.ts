/**
 * Was die Seite laden darf (ToDo 10.6, Nonce seit 10.7).
 *
 * Aufgestellt an dem, was die App **wirklich** braucht; alles andere ist
 * verboten. Der E2E-Test `e2e/datenschutz.spec.ts` prüft dieselbe Zusage von
 * der anderen Seite – er zählt die tatsächlichen Verbindungen. Die beiden
 * dürfen sich nicht widersprechen.
 *
 * **Im Entwicklungsbetrieb braucht Next zwei Dinge mehr – und nur dort.**
 * React Refresh wertet Code mit `eval` aus, und das Nachladen geänderter
 * Dateien läuft über eine WebSocket-Verbindung. Ohne diese Ausnahmen startet
 * die App im Browser gar nicht, und zwar mit einer Konsolenmeldung, die
 * niemand mit der Konfiguration in Verbindung bringt. Dass sie am Parameter
 * `development` hängen, ist der Punkt: Im Produktionsbau sind sie nicht da.
 */
export function contentSecurityPolicy(nonce: string, development: boolean): string {
  return [
    // Grundregel: alles vom eigenen Server. Jede Zeile darunter ist eine
    // begründete Ausnahme davon.
    "default-src 'self'",

    // Kartenkacheln von OpenStreetMap – ohne sie gibt es keine Karte. `data:`
    // und `blob:` braucht Leaflet für die eigenen Marker-Symbole.
    "img-src 'self' data: blob: https://tile.openstreetmap.org",

    // `'unsafe-inline'` für Stile ist hier nicht zu vermeiden: Leaflet setzt die
    // Position jeder Kachel und jedes Markers als `style`-Attribut. Das ist die
    // Bauart der Bibliothek, keine Nachlässigkeit. Skripte sind davon nicht
    // betroffen.
    "style-src 'self' 'unsafe-inline'",

    // **Skripte nur mit der Nonce dieser Anfrage** (oder vom eigenen Server).
    // Eingeschleuster Inline-Code trägt sie nicht und läuft deshalb nicht.
    `script-src 'self' 'nonce-${nonce}'${development ? " 'unsafe-eval'" : ""}`,

    // Der Browser spricht **nur** mit dem eigenen Server. Die Ortssuche läuft
    // über `/api/geocode`; eine direkte Verbindung zu Nominatim aus einer
    // Komponente heraus wäre genau der Fehler, den `datenschutz.spec.ts` sucht.
    `connect-src 'self'${development ? " ws:" : ""}`,

    // Schriften kommen über `next/font` aus dem eigenen Bundle, nicht von Google.
    "font-src 'self'",

    // **Die Seite darf in keinen fremden Rahmen.** Bei einer Karten-App nicht
    // theoretisch: Wer sie unsichtbar über eine andere Seite legt, kann Klicks
    // auf Knöpfe lenken, die Standortfreigabe oder Navigation auslösen.
    "frame-ancestors 'none'",
    "object-src 'none'",

    // Verhindert, dass eingeschleuster Code relative Pfade umbiegt oder ein
    // Formular auf einen fremden Server schickt.
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
}
