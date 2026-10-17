import type { NextConfig } from "next";

/**
 * Sicherheits-Kopfzeilen (ToDo 10.3, ergänzt 2026-10-17).
 *
 * **Die App lieferte bis hierher keine einzige davon aus.** Für eine Seite,
 * die unter wheelee.de offen im Netz steht, Standortzugriff anfragt und eine
 * Anmeldung mit Sitzungscookie führt, ist das kein Schönheitsfehler. Die
 * Kopfzeilen setzt bewusst die **App** und nicht der Nginx Proxy Manager auf
 * dem VPS: Sie gehören zur Anwendung, sie wären im Proxy für Torsten nicht
 * einsehbar (er hat keinen NPM-Zugang, siehe `wheelee-infrastruktur.md`), und
 * im Entwicklungsbetrieb gäbe es sie dann gar nicht – also genau dort nicht,
 * wo ein Verstoß auffallen müsste.
 */

/**
 * Was die Seite laden darf.
 *
 * Aufgestellt an dem, was die App **wirklich** braucht; alles andere ist
 * verboten. Der E2E-Test `e2e/datenschutz.spec.ts` prüft dieselbe Zusage von
 * der anderen Seite – er zählt die tatsächlichen Verbindungen. Die beiden
 * dürfen sich nicht widersprechen.
 */
/**
 * Im Entwicklungsbetrieb braucht Next zwei Dinge mehr – und nur dort.
 *
 * React Refresh wertet Code mit `eval` aus, und das Nachladen geänderter
 * Dateien läuft über eine WebSocket-Verbindung. Ohne diese Ausnahmen
 * **startet die App im Browser gar nicht**, und zwar mit einer
 * Konsolenmeldung, die niemand mit der Konfigurationsdatei in Verbindung
 * bringt.
 *
 * Dass die Ausnahmen an `NODE_ENV` hängen, ist der Punkt: Im Produktionsbau
 * sind sie nicht da. Eine Richtlinie, die man zum Entwickeln aufweicht und
 * dann aufgeweicht ausliefert, wäre keine.
 */
const ENTWICKLUNG = process.env.NODE_ENV === "development";

const CSP = [
  // Grundregel: alles vom eigenen Server. Jede Zeile darunter ist eine
  // begründete Ausnahme davon.
  "default-src 'self'",

  /*
   * Kartenkacheln von OpenStreetMap – ohne sie gibt es keine Karte. `data:`
   * und `blob:` braucht Leaflet für die eigenen Marker-Symbole.
   */
  "img-src 'self' data: blob: https://tile.openstreetmap.org",

  /*
   * `'unsafe-inline'` für Stile ist hier nicht zu vermeiden: Leaflet setzt die
   * Position jeder Kachel und jedes Markers als `style`-Attribut. Das ist die
   * Bauart der Bibliothek, keine Nachlässigkeit.
   */
  "style-src 'self' 'unsafe-inline'",

  /*
   * **Hier ist diese Richtlinie schwach, und das gehört gesagt:**
   * `'unsafe-inline'` steht auch bei den Skripten. Next.js schreibt die Daten
   * für die Hydration als Inline-Skript in die Seite, und das Theme-Skript in
   * `layout.tsx` muss vor dem ersten Zeichnen laufen, sonst blitzt die Seite
   * in der falschen Helligkeit auf.
   *
   * Was diese Zeile **trotzdem leistet:** Kein fremder Server darf Skripte
   * liefern. Ein nachlässig eingebundenes Analysewerkzeug oder eine
   * kompromittierte CDN-Adresse wäre damit blockiert – der Weg, über den
   * solche Sachen in einer kleinen App tatsächlich landen.
   *
   * Was sie **nicht** leistet: Schutz vor eingeschleustem Code in der eigenen
   * Seite. Dafür bräuchte es eine Nonce je Anfrage und damit eine Middleware.
   * Das ist der nächste Schritt, nicht dieser – und es wäre unredlich, die
   * Richtlinie ohne diesen Hinweis als XSS-Schutz zu führen.
   */
  `script-src 'self' 'unsafe-inline'${ENTWICKLUNG ? " 'unsafe-eval'" : ""}`,

  /*
   * Der Browser spricht **nur** mit dem eigenen Server. Die Ortssuche läuft
   * über `/api/geocode`; eine direkte Verbindung zu Nominatim aus einer
   * Komponente heraus wäre genau der Fehler, den `datenschutz.spec.ts` sucht –
   * hier wird er zusätzlich vom Browser verhindert.
   */
  `connect-src 'self'${ENTWICKLUNG ? " ws:" : ""}`,

  // Schriften kommen über `next/font` aus dem eigenen Bundle, nicht von Google.
  "font-src 'self'",

  /*
   * **Die Seite darf in keinen fremden Rahmen.** Das ist bei einer Karten-App
   * nicht theoretisch: Wer sie unsichtbar über eine andere Seite legt, kann
   * Klicks auf Knöpfe lenken, die Standortfreigabe oder Navigation auslösen.
   */
  "frame-ancestors 'none'",
  "object-src 'none'",

  // Verhindert, dass eingeschleuster Code relative Pfade umbiegt oder ein
  // Formular auf einen fremden Server schickt.
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const SICHERHEITS_HEADER = [
  { key: "Content-Security-Policy", value: CSP },

  /*
   * Ohne das rät der Browser den Inhaltstyp. Eine hochgeladene oder
   * ausgelieferte Datei, die er für HTML hält, wird dann als HTML ausgeführt.
   */
  { key: "X-Content-Type-Options", value: "nosniff" },

  // Für alte Browser, die `frame-ancestors` nicht kennen. Doppelt gemoppelt,
  // aber kostenlos.
  { key: "X-Frame-Options", value: "DENY" },

  /*
   * Beim Sprung in Google Maps oder Apple Karten soll die Adresse der eigenen
   * Seite nicht mitgehen. Sie enthält zwar keinen Standort – der verlässt das
   * Gerät nirgends –, aber den gewählten Parkplatz, und das ist eine Angabe
   * über eine Behinderung.
   */
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  /*
   * Die App braucht **genau eine** Gerätefunktion: den Standort. Alles andere
   * wird ausdrücklich abgeschaltet, damit es auch dann nicht geht, wenn später
   * versehentlich etwas eingebaut wird, das danach fragt.
   */
  {
    key: "Permissions-Policy",
    value: ["geolocation=(self)", "camera=()", "microphone=()", "payment=()", "usb=()"].join(", "),
  },

  /*
   * HTTPS erzwingen, ein Jahr lang.
   *
   * **Ohne `includeSubDomains`, und das ist eine Entscheidung.** Der Webhook
   * aus Abschnitt 6 des Infrastruktur-Briefings soll womöglich unter
   * `deploy.wheelee.de` laufen. `includeSubDomains` würde jeden künftigen
   * Unterbereich für ein Jahr auf HTTPS festlegen – auch einen, der noch gar
   * kein Zertifikat hat, und zwar ohne Weg zurück im Browser, der es sich
   * gemerkt hat. Ohne `preload` aus demselben Grund.
   *
   * Über HTTP wird die Zeile vom Browser ignoriert; im Entwicklungsbetrieb auf
   * `localhost` richtet sie also nichts an.
   */
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
];

/**
 * Der Service Worker bekommt **keine** Inhaltsrichtlinie – und das ist kein
 * Loch, sondern eine Notwendigkeit.
 *
 * Die CSP, die mit einem Service-Worker-Skript ausgeliefert wird, gilt für den
 * **Worker selbst**, nicht für die Seite. Und der Worker tut genau das, was
 * `connect-src 'self'` verbietet: Er holt Kartenkacheln von
 * `tile.openstreetmap.org` und legt sie beiseite (`cacheFirst` in
 * `public/sw.js`). Mit der Richtlinie oben gäbe es im Funkloch keine Karte
 * mehr, sondern nur noch eine Liste – also genau die Hälfte dessen, wofür
 * 12.8/12.9 gebaut wurden.
 *
 * **Was dadurch nicht verloren geht:** Der Worker liegt auf dem eigenen
 * Server, wird nur von dort geladen und führt nur aus, was in seiner eigenen
 * Datei steht. Die Richtlinie der *Seite* gilt unverändert – sie ist es, die
 * fremde Skripte und fremde Rahmen verhindert, und sie erlaubt das Laden von
 * `/sw.js` über `script-src 'self'`. Die übrigen Kopfzeilen bekommt auch diese
 * Datei.
 *
 * **Nicht verwechseln:** Im eingebetteten Browser des Entwicklungswerkzeugs
 * scheitert `register('/sw.js')` mit „An unknown error occurred when fetching
 * the script" – **auch ohne jede Kopfzeile** (geprüft am 2026-10-17, einmal
 * mit und einmal ohne). Das ist eine Eigenschaft jener Umgebung und kein
 * Befund über diese Konfiguration. Der Offline-Test `e2e/offline.spec.ts`
 * überspringt sich in solchen Fällen selbst; geprüft wird der Offline-Betrieb
 * in einem echten Browser gegen `npm run start`.
 */
const SW_HEADER = SICHERHEITS_HEADER.filter((header) => header.key !== "Content-Security-Policy");

const nextConfig: NextConfig = {
  /**
   * Für den Betrieb im Container: `standalone` legt unter
   * `.next/standalone` einen eigenständigen Server mit genau den
   * `node_modules` ab, die er wirklich braucht.
   *
   * Der Unterschied ist nicht kosmetisch: Ohne diese Einstellung müsste das
   * Abbild den vollständigen `node_modules`-Baum mitschleppen – mehrere
   * hundert Megabyte, von denen das Meiste Bauwerkzeug ist (TypeScript,
   * Vitest, Playwright, die Importskripte). Die Parkplatzdaten selbst sind
   * statisch importiert und liegen damit im Bundle; zur Laufzeit wird keine
   * Datei aus `data/` gelesen.
   *
   * **Ein Volume braucht der Container seit dem 2026-10-11 doch** – nicht für
   * die Parkplatzdaten, sondern für die Konten und Rückmeldungen in SQLite.
   * Sie liegen unter `/app/var`, und das ist der einzige Pfad, der einen
   * Neubau des Abbilds überlebt (siehe docker-compose.yml).
   */
  output: "standalone",
  /*
   * Bewusst **ohne Abschaltmöglichkeit über die Umgebung.** Ein Schalter, der
   * alle Sicherheitskopfzeilen entfernt, ist selbst eine Schwachstelle: Er
   * steht in der `.env` auf dem NAS neben Dingen, die man tatsächlich
   * umstellt, und eine versehentlich gesetzte Variable fällt niemandem auf –
   * die Seite funktioniert ja weiter.
   */
  headers: () =>
    Promise.resolve([
      { source: "/:path((?!sw\\.js$).*)", headers: SICHERHEITS_HEADER },
      { source: "/sw.js", headers: SW_HEADER },
    ]),
};

export default nextConfig;
