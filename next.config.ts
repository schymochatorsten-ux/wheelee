import type { NextConfig } from "next";

/**
 * Sicherheits-Kopfzeilen (ToDo 10.6, ergänzt 2026-10-17).
 *
 * **Die Nummer hieß bis zum 2026-10-20 „10.3".** Das war eine Doppelbelegung:
 * 10.3 ist die Lizenz- und Attributionsfrage. Umbenannt beim Aufräumen der
 * Aufgabenlisten; siehe den Eintrag dazu in `Erledigt.md`.
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
 * **Die Inhaltsrichtlinie (CSP) steht nicht hier**, sondern in `src/lib/csp.ts`
 * und wird von `src/middleware.ts` gesetzt: Sie braucht seit 10.7 eine Nonce
 * je Anfrage, und die kann eine statische Konfiguration nicht liefern. Alles
 * übrige hier ist für alle Anfragen gleich.
 */
const SICHERHEITS_HEADER = [
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
 * Loch, sondern eine Notwendigkeit. (Die Middleware schließt `/sw.js` über
 * ihren `matcher` aus; hier bekommt die Datei nur die übrigen Zeilen.)
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
  // Keine Kopfzeile „X-Powered-By: Next.js": Sie sagt Angreifern nur, welche
  // Schwachstellenliste sie durchgehen müssen (10.9).
  poweredByHeader: false,
  /*
   * Bewusst **ohne Abschaltmöglichkeit über die Umgebung.** Ein Schalter, der
   * alle Sicherheitskopfzeilen entfernt, ist selbst eine Schwachstelle: Er
   * steht in der `.env` auf dem NAS neben Dingen, die man tatsächlich
   * umstellt, und eine versehentlich gesetzte Variable fällt niemandem auf –
   * die Seite funktioniert ja weiter.
   */
  headers: () => Promise.resolve([{ source: "/:path*", headers: SICHERHEITS_HEADER }]),
};

export default nextConfig;
