# wheelee

Mobil optimierte Web-App, die öffentliche Behindertenparkplätze auf einer Karte
zeigt, den nächstgelegenen hervorhebt und Rückmeldungen dazu sammelt, ob ein
Parkplatz noch existiert.

Fachliche Grundlage: [Konzept.md](Konzept.md). Aufgabenstand: [ToDos.md](ToDos.md).
Arbeitsweise: [CLAUDE.md](CLAUDE.md).

## Im Zweifel fragen

**Wer hier mitarbeitet – Mensch oder Claude – fragt immer nach, wenn etwas
unklar ist, statt zu raten.** Eine Rückfrage kostet eine Minute. Eine falsche
Annahme kostet die Arbeit, die darauf aufgebaut wurde, und im schlimmsten Fall
merkt es niemand.

Das gilt besonders hier, weil dieses Projekt zwei Eigenschaften hat, die
falsche Annahmen teuer machen:

- **Die Daten betreffen Menschen, die auf den Parkplatz angewiesen sind.** Eine
  geratene Zuordnung ist keine Ungenauigkeit, sondern eine vergebliche Fahrt –
  derselbe Grundsatz wie „lieber kein Import als ein falscher" in
  [Datenpflege.md](Datenpflege.md).
- **Falsches sieht hier oft richtig aus.** Mehrere Fehler in
  [Erledigt.md](Erledigt.md) sind genau deshalb entstanden: plausible
  Koordinaten 450 km daneben, eine leere Antwort als Ergebnis, grün laufende
  Tests über beschädigten Umlauten.

Lieber einmal zu viel fragen als eine Annahme einbauen, die später jemand
auseinandernehmen muss. **Unsicherheit ist kein Mangel, den man verbergen
sollte, sondern eine Information, die dem anderen gehört.** Wenn eine Frage
die Arbeit aufhält, ist der richtige Weg: alles erledigen, was nicht an der
Antwort hängt, und die Frage dann gezielt stellen – nicht alles anhalten und
nicht einfach weiterraten.

## Stack

| Bereich     | Technologie                                   |
| ----------- | --------------------------------------------- |
| Framework   | Next.js 15 (App Router), React 19, TypeScript |
| Styling     | Tailwind CSS 4                                |
| Karte       | Leaflet + react-leaflet, OpenStreetMap-Tiles  |
| Tests       | Vitest, Playwright (E2E)                      |
| Datenimport | tsx-Skripte, `pdf-parse`, Nominatim-Geocoding |

## Entwicklung

Voraussetzung: **Node.js 24 oder neuer.** Nicht mehr 20: Seit es Konten und
Rückmeldungen gibt, braucht die App eine Datenbank, und `node:sqlite` ist erst
ab Node 24 ohne Versuchsflagge nutzbar. Der Vorteil ist, dass dafür **keine
Abhängigkeit** hinzukam – dieselbe Abwägung wie beim ZIP- und Excel-Leser des
Gemeindeimports.

```bash
npm install
npm run dev
```

Die App läuft dann auf <http://localhost:3000>.

Weitere Skripte:

```bash
npm run build        # Produktionsbuild
npm run start        # Produktionsbuild ausliefern
npm run lint         # ESLint
npm run typecheck    # TypeScript ohne Emit
npm run test         # Vitest einmalig
npm run test:e2e     # Playwright-Smoke-Test (startet den Dev-Server selbst)
npm run format       # Prettier schreibend
npm run clean        # Build-Zwischenstand löschen
```

> **`npm run build` nicht starten, während `npm run dev` läuft.** Beide
> schreiben nach `.next`, und der Entwicklungsserver stolpert danach über die
> Dateien des Produktionsbuilds – sichtbar als `Cannot find module './897.js'`
> oder ähnlich. Passiert es doch: Server beenden, `npm run clean`, neu starten.

## Projektstruktur

```
src/app/              Next.js-Routen und Layout
src/app/api/spots/    Parkplätze nach Kartenausschnitt, Nähe oder ID
src/app/api/geocode/  Ortssuche für das Reiseziel (Nominatim-Vorschaltung)
src/app/api/auth/     Anmelden, Konto anlegen, abmelden
src/app/api/feedback/ Rückmeldungen entgegennehmen
src/app/api/admin/    Übersicht der Rückmeldungen (nur Administrator)
e2e/                  Playwright-Tests
src/lib/types.ts      Gemeinsame Typen (Parkplatz, Bewertung)
src/lib/geo.ts        Entfernungsberechnung und -formatierung
src/lib/parking/      Einlesen und Zerlegen der städtischen Parkplatzlisten
src/lib/db/           SQLite: Schema, Konten, Rückmeldungen
src/lib/auth/         Passwörter, Sitzungen, Administratorprüfung
scripts/import/       Importkette von der Quelldatei zur Seed-Datei
data/                 Importergebnisse (versioniert)
.data/                Datenbank der Entwicklung (nicht versioniert)
Parkplätze/           Quelldateien der Städte
```

Die Trennung folgt dem Konzept: Kartendarstellung, Parkplatzdaten und
Bewertungen bleiben voneinander unabhängig.

**Die Seite lädt nur, was sichtbar ist.** Alle 17.206 Standorte ins HTML zu
schreiben ergab 6,3 MB; jetzt sind es 128 KB, und die Karte holt den
jeweiligen Ausschnitt über `/api/spots` nach. Ein Service Worker legt Seite,
zuletzt geladene Parkplätze und Kartenkacheln beiseite, damit im Funkloch
nicht eine weiße Seite steht – mit sichtbarem Hinweis, dass die Angaben vom
letzten Stand sind.

## Pflegebefehle

```bash
npm run import:gemeinden  # amtliches Gemeindeverzeichnis holen (jährlich)
npm run import:regional   # regionale Sammeldatensätze (TechnologieRegion Karlsruhe)
npm run import:osm-state  # landesweiter OSM-Lauf statt einer Abfrage je Gemeinde
npm run check:slugs       # passen Register und Seed-Dateien zusammen?
npm run report:abdeckung  # wie weit ist das Endziel?
npm run sources:amtlich   # welche Gemeinde hat amtliche Daten, egal wie groß?
npm run sources:check   # monatlich: hat sich an einer Quelle etwas geändert?
npm run validate        # Datenprüfung, mit --offline ohne Netzabfragen
npm run import:streets  # fehlende Straßennamen aus OpenStreetMap nachtragen
npm run data:dedupe     # doppelte Einträge zusammenführen (--dry zum Ansehen)
npm run report:times    # welche Zeitangaben versteht die App noch nicht?
```

## Datenimport

### Die deutschen Städte importieren

Erfasst sind die Städte **ab 50.000 Einwohnern**. Der Import läuft Stadt für
Stadt, größte zuerst, und schreibt den Stand nach **jeder einzelnen Stadt**
fort. Ein Abbruch ist dadurch unkritisch.

```bash
npm run sources:scan            # einmalig: welche Stadt hat amtliche Daten?
npm run import:city -- --next   # nächste offene Stadt
npm run import:city -- --rest   # alle verbleibenden, größte zuerst
npm run import:city -- --rest --max 10
npm run import:city -- berlin   # gezielt eine Stadt (auch erneut)
```

**Wo der Stand steht:** [data/\_import-status.md](data/_import-status.md). Die
Datei nennt oben die nächste offene Stadt samt fertigem Befehl, darunter für
jede Stadt die verwendete Quelle, die genaue Abruf-URL, die Anzahl der
Standorte und etwaige Probleme. Sie wird von den Skripten selbst geschrieben –
nicht von Hand bearbeiten.

Die Datei unterscheidet vier Zustände, und zwei davon werden leicht
verwechselt:

| Zustand                     | Bedeutung                                |
| --------------------------- | ---------------------------------------- |
| ✅ fertig                   | importiert, mindestens ein Standort      |
| ⚪ geprüft, nichts gefunden | Abfrage lief sauber durch und war leer   |
| ⬜ noch nicht geprüft       | niemand hat je nachgesehen               |
| ❌ fehlgeschlagen           | Abfrage scheiterte – Grund steht daneben |

`--rest` nimmt **nur** den Zustand „noch nicht geprüft". Eine geprüft-leere
Stadt wird dadurch nicht bei jedem Durchlauf erneut abgefragt – bei tausenden
Gemeinden wäre das ein Missbrauch von Overpass. Fehlgeschlagene Städte greift
`--rest` ebenfalls nicht; die werden namentlich nachgeholt:

```bash
npm run import:city -- konstanz celle emden
```

[data/\_quellen-status.md](data/_quellen-status.md) hält fest, welche Stadt
überhaupt eine amtliche Quelle hat und in welchen Formaten.

#### Fallstricke, die der Import abfängt

Jeder dieser Punkte ist einmal wirklich passiert und hätte falsche Daten
erzeugt, die beim Draufschauen richtig aussehen:

- **Falsche UTM-Zone.** Dresdens Dienst liefert Zone 33. Als Zone 32 gedeutet
  ergaben sich Koordinaten bei 7,7° Ost – mitten in Deutschland, aber 450 km
  daneben. Die Zone wird jetzt aus der `srsName`-Angabe gelesen, und zusätzlich
  prüft der Import, ob die Punkte überhaupt in der Nähe der Stadt liegen.
- **Stadtname als Teilstring.** „Essen" steckt in „Hessen", und Essen bekam
  dadurch den Frankfurter Datensatz. Verglichen wird jetzt auf Wortgrenzen.
- **Leere Antwort als Ergebnis.** Overpass meldet Überlast teils mit HTTP 200
  und leerer Liste. Ein leeres Ergebnis gilt erst nach Bestätigung durch einen
  zweiten Spiegel.
- **Themenfremde Treffer.** Die Suche nach „Parken Menschen mit Behinderung"
  lieferte für Hamburg Werkstätten und Tagesförderstätten; der richtige
  Datensatz heißt „Behindertenstellplätze". Datensätze müssen jetzt sowohl von
  Parken als auch von Behinderung handeln.

### Welche Quelle für eine neue Stadt?

In dieser Reihenfolge, von der besten zur schlechtesten:

1. **Amtlicher Geodienst (WFS/GeoJSON).** Vollständig, mit Koordinaten aus dem
   Kataster, klare Lizenz. → `npm run import:wfs`
2. **Amtliche Liste als Datei (CSV, XLSX, PDF).** Vollständig, aber ohne
   Koordinaten – Geocoding nötig. → die Frankfurter PDF-Kette als Vorlage
3. **OpenStreetMap.** Unvollständig und meist nur Parkplätze statt einzelner
   Stellplätze, dafür überall verfügbar und frei lizenziert. → `npm run import:osm`

Welche Quelle es für eine Stadt gibt, beantwortet:

```bash
npm run sources -- Idstein
```

Das fragt **GovData**, das Metaportal des Bundes, in dem Länder und Kommunen
ihre offenen Datensätze zusammenführen, und nennt Lizenz und Downloadformate.
Findet es nichts, lohnt die Anfrage bei der Straßenverkehrsbehörde der Stadt:
Sie führt die Liste in jedem Fall, weil jeder Stellplatz förmlich angeordnet
werden muss – veröffentlicht sie aber oft nicht.

Nicht geeignet sind **Wheelmap** (die Parkplatzdaten dort stammen von
Parkopedia und sind nicht frei weiterverwendbar; die übrigen Daten sind
ohnehin OpenStreetMap) und **Mapy.cz** (die Bedingungen untersagen, die Daten
mit anderen Kartendaten zu kombinieren).

### Frankfurt: amtlicher WFS

```bash
npm run import:wfs
```

458 Standorte mit 615 Stellplätzen, alle mit amtlicher Koordinate.

### Frankfurt: PDF-Liste (Rückfallebene)

Vor dem WFS kam Frankfurt aus einer PDF-Liste ohne Koordinaten. Die Kette
bleibt als Vorlage für Städte erhalten, die nur eine Datei anbieten:

```bash
npm run import:parse      # PDF -> data/frankfurt.parsed.json
npm run import:geocode    # Koordinaten -> data/geocode-cache.json
npm run import:build      # -> data/frankfurt-pdf-liste.json
npm run import:report     # Qualitätsreport
```

Sie schreibt bewusst **nicht** nach `data/frankfurt.json`: Zwei Importwege auf
dieselbe Datei wären eine Falle. Der Vergleich zeigt auch, warum der Geodienst
vorzuziehen ist – die PDF-Kette ergab 359 Standorte, davon 330 verortet und nur
166 hausgenau.

Wissenswertes dazu:

- **Geocoding** fragt Nominatim mit einer Anfrage pro Sekunde ab, wie es die
  Nutzungsbedingungen verlangen. Alle Antworten landen in
  `data/geocode-cache.json`; ein erneuter Lauf fragt nur Neues ab. Mit
  `-- --all` wird alles neu abgefragt, mit `-- --limit 20` nur ein Teil.
- **IDs** leiten sich aus der Örtlichkeit ab, nicht aus der Zeilennummer. Eine
  neue Fassung der Liste verschiebt Zeilen; Bewertungen müssen weiterhin
  denselben Parkplatz treffen.
- **Manuelle Korrekturen** gehören in `data/frankfurt.overrides.json`. Sie
  gewinnen gegen Parser und Geocoding und überleben jeden Importlauf.
- **Zeilenumbruch-Ausnahmen** der Quelle stehen in
  `data/frankfurt.line-fixups.json` – als geprüfte Liste statt als weitere
  Heuristik, damit jede Ausnahme sichtbar bleibt.
- **Kontrollgröße:** Die Quelle nennt eine Gesamtsumme der Stellplätze. Der
  Parse-Schritt vergleicht sie mit der eigenen Summe und warnt bei Abweichung.

### Weitere Städte aus OpenStreetMap

Für Idstein und Weißenhorn gibt es keine offene Liste der Stadtverwaltung.
Diese Städte kommen deshalb aus OpenStreetMap:

```bash
npm run import:osm                # alle konfigurierten Städte
npm run import:osm -- idstein     # nur eine Stadt
```

Neue Städte werden in `scripts/import/cities.mts` eingetragen.

Zwei Dinge, die dieser Import anders macht als der Frankfurter:

- **Die Gemeindegrenze schneidet, nicht ein Rechteck.** Eine Bounding-Box um
  Weißenhorn enthält auch das Kloster Roggenburg, eine um Idstein auch
  Steinfischbach (Gemeinde Waldems). Der Importer holt die Grenzrelation über
  Nominatim und schneidet mit `map_to_area`.
- **Ein leeres Ergebnis wird misstraut.** Overpass beantwortet Überlast
  teilweise mit HTTP 200 und einem leeren Ergebnis. Ungeprüft übernommen hieße
  das „keine Behindertenparkplätze in dieser Stadt". Der Importer akzeptiert ein
  leeres Ergebnis erst, wenn ein zweiter Spiegel es bestätigt, und bricht sonst
  lieber ab.

Die Datenlage unterscheidet sich grundlegend von einer Verwaltungsliste: OSM
kennt überwiegend **Parkplätze mit ausgewiesenen Behindertenstellplätzen**, nicht
einzelne Stellplätze am Straßenrand, und die Abdeckung ist unvollständig. Die
Listenansicht der App sagt das ausdrücklich.

## Daten und Lizenzen

- Parkplatzdaten Frankfurt: Stadt Frankfurt am Main, Open Data (WFS Parken).
- Parkplatzdaten Idstein und Weißenhorn: © OpenStreetMap-Mitwirkende, ODbL.
- Parkplatzdaten der TechnologieRegion Karlsruhe (zwölf Gemeinden um
  Karlsruhe): Stadt Karlsruhe / TechnologieRegion Karlsruhe, CC BY 4.0.
- Gemeindeverzeichnis (Namen, Schlüssel, Einwohnerzahlen): © BKG
  (2026) [dl-de/by-2-0](https://www.govdata.de/dl-de/by-2-0), Datenquellen:
  <https://sgx.geodatenzentrum.de/web_public/gdz/datenquellen/datenquellen_vg_nuts.pdf>.
  Dieser Quellenvermerk ist vorgeschrieben; die Bedingungen liegen dem
  Download bei.
- Kartendaten: © OpenStreetMap-Mitwirkende, ODbL. Die Attribution muss in der
  Karte sichtbar bleiben.
- Geocoding: Nominatim, betrieben von der OpenStreetMap Foundation.

## Konten und Rückmeldungen

Seit dem 2026-10-11 gibt es beides, und damit erstmals Daten, die zur Laufzeit
entstehen. Sie liegen in **SQLite** – in der Entwicklung unter `.data/`, im
Container in einem Docker-Volume unter `/app/var`. Entschieden wurde das gegen
Supabase und Neon, weil die App auf dem eigenen NAS hinter einem
Tailscale-Tunnel läuft und keine Verbindung nach außen braucht.

| Umgebungsvariable | Wofür                                                                  |
| ----------------- | ---------------------------------------------------------------------- |
| `ADMIN_EMAILS`    | Adressen, die die Übersicht der Rückmeldungen sehen dürfen (per Komma) |
| `WHEELEE_DB_PATH` | Pfad der Datenbankdatei; im Container bereits gesetzt                  |

**Ist `ADMIN_EMAILS` leer, hat niemand Zugriff** – auch nicht der erste
angemeldete Benutzer. Das ist Absicht: Die Registrierung steht jedem offen, und
wer zuerst da wäre, bekäme sonst alle Meldungen samt der freiwillig angegebenen
Adressen zu sehen. Vorlage für die Datei auf dem NAS:
[deploy/env.beispiel](deploy/env.beispiel).

Was die App **ohne** Konto kann: alles, was mit Parkplätzen zu tun hat – Karte,
Standort, Zielsuche, Detailansicht und das Melden eines Fehlers. Ein Konto ist
ein Angebot, keine Bedingung.

## Datenschutz

Der Standort wird nur im Browser verarbeitet und nicht gespeichert – auch nicht
mit Konto, und auch nicht in einer Rückmeldung.

Gespeichert wird nur, was jemand selbst einträgt:

- **Konto:** E-Mail-Adresse und das Passwort als scrypt-Hash. Die App setzt
  genau ein Cookie, und erst nach dem Anmelden: das Sitzungstoken. Wer die App
  nur benutzt, bekommt keines – das prüft ein E2E-Test.
- **Rückmeldung:** der geschriebene Text, der betroffene Parkplatz und – **nur
  freiwillig** – eine E-Mail-Adresse für die Antwort. Das Formular sagt offen,
  dass ohne Adresse keine Antwort möglich ist, und dass die Adresse mit der
  Meldung gelöscht wird.
- **Nicht gespeichert:** Standort, Name und IP-Adresse. Die IP wird für die
  Drosselung gelesen und landet in keiner Tabelle und in keinem Protokoll.

### Was von selbst gelöscht wird

Seit dem 2026-10-17 räumt die App auf (`src/lib/db/cleanup.ts`):

| Was                                    | Wann                                            |
| -------------------------------------- | ----------------------------------------------- |
| Erledigte und verworfene Rückmeldungen | **12 Monate** nach der Erledigung, samt Adresse |
| Abgelaufene Sitzungen                  | mit dem Ablauf                                  |

Gerechnet wird ab der **Erledigung**, nicht ab dem Eingang: Eine Meldung, die
lange offen lag und gestern abgeschlossen wurde, bleibt noch ein Jahr
nachlesbar. Offene Meldungen laufen **nicht** ab – eine Meldung, die niemand
bearbeitet hat, ist nicht erledigt, sondern liegen geblieben.

Der Lauf hängt an den Zugriffen, die es ohnehin gibt (eine eingehende Meldung,
ein Blick in die Übersicht), und läuft höchstens einmal am Tag. Einen
Hintergrundprozess hat die App nicht.

## Sicherheit

Die App liefert seit dem 2026-10-17 Sicherheits-Kopfzeilen aus; sie stehen in
[next.config.ts](next.config.ts) und werden von
[e2e/sicherheit.spec.ts](e2e/sicherheit.spec.ts) festgehalten. Dass sie aus der
**Anwendung** kommen und nicht aus dem Nginx Proxy Manager, ist Absicht: Im
Proxy wären sie für den Entwicklungsbetrieb nicht da – also genau dort nicht,
wo ein Verstoß auffallen müsste.

Die Inhaltsrichtlinie (CSP) erlaubt als fremde Herkunft **nur** die
Kartenkacheln von OpenStreetMap und verbietet jeden fremden Rahmen
(`frame-ancestors 'none'`). Sie führt allerdings `'unsafe-inline'` bei den
Skripten, weil Next die Hydrationsdaten und das Theme-Skript inline in die
Seite schreibt. **Sie ist damit kein Schutz vor eingeschleustem Code in der
eigenen Seite** – dafür bräuchte es eine Nonce je Anfrage und eine Middleware.
Was sie leistet, ist das Blockieren fremder Skriptquellen; was sie nicht
leistet, steht hier, damit niemand sich auf mehr verlässt.
