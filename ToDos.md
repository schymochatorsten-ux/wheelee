# ToDos – wheelee

Zentrale Aufgabenliste zum Projekt (Grundlage: [Konzept.md](Konzept.md)).

**Status-Legende:** `[ ]` offen · `[~]` in Arbeit · `[x]` erledigt · `[!]` blockiert / Entscheidung nötig · `[-]` verworfen / später

**Letzte Aktualisierung:** 2026-10-09

**Stand in Zahlen:** 84 Städte, 13.370 Standorte, 33.209 Stellplätze. Karte, Liste
und Detailansicht laufen. Es fehlen vor allem: Bewertungen (brauchen die
Datenbank), Datenvalidierung, Rechtstexte und Deployment.

---

## 0. Offene Entscheidungen

- [x] **D-01 Technologie-Stack bestätigt** (2026-10-08) – Next.js 15, TypeScript, Tailwind 4, Leaflet + OSM, Postgres, Vercel.
- [x] **D-04 Geocoding-Quelle** – Nominatim, 1 Anfrage/Sekunde, Antworten versioniert zwischengespeichert.
- [!] **D-02 Datenbank konkret wählen** – Supabase oder Neon. Blockiert Abschnitt 3 und damit die Bewertungen; die Seed-Dateien sind von der Wahl unabhängig.
- [!] **D-03 Missbrauchsschutz für Bewertungen ohne Accounts** – Empfehlung: eine Bewertung pro Parkplatz pro Gerät (LocalStorage) plus IP-Rate-Limit serverseitig.
- [!] **D-05 Umgang mit Parkplätzen ohne Koordinaten** – Empfehlung: nicht auf den Stadtteil-Mittelpunkt setzen, sondern als „Position ungenau" kennzeichnen und nur in der Liste führen. Derzeit faktisch gelöst, weil alle importierten Standorte Koordinaten haben.

---

## 1. Projekt-Setup

- [x] 1.1 Next.js 15 (App Router) + TypeScript
- [x] 1.2 Tailwind CSS 4, mobile-first Layout
- [x] 1.3 ESLint, Prettier, Vitest, npm-Scripts (`lint`, `format`, `typecheck`, `test`)
- [x] 1.4 `.gitignore`, `README.md` mit Stack, Entwicklung, Importkette und Lizenzen
- [x] 1.5 Ordnerstruktur: `src/lib/` (Typen, Geo), `src/lib/parking/` (Quellenlogik), `src/components/`, `scripts/import/`, `data/`
- [x] 1.6 Mehrstädte-Fähigkeit in der Datenschicht; Seed-Index wird erzeugt, nicht gepflegt
- [!] 1.7 Erste Commits + Branch-Strategie – **blockiert:** `git` ist auf diesem Rechner nicht im PATH
- [ ] 1.8 Audit-Findings bereinigen: `postcss` (über `next`) und `braces` (über `eslint-config-next`) sind nur per Next-16-Upgrade behebbar – bewusst zurückgestellt

---

## 2. Datenquellen und Import

### 2a. Quellenstrategie

- [x] 2a.1 Rangfolge: amtlicher Geodienst → amtliche Datei → OpenStreetMap
- [x] 2a.2 `npm run sources -- <Stadt>` durchsucht **GovData**, das Metaportal von Bund, Ländern und Kommunen
- [x] 2a.3 Wheelmap geprüft und verworfen – die Parkplatzdaten stammen von Parkopedia und sind nicht frei weiterverwendbar
- [x] 2a.4 Mapy.cz geprüft und verworfen – die Bedingungen untersagen die Kombination mit anderen Kartendaten
- [ ] 2a.5 Lizenz je Stadt ins Datenmodell aufnehmen und in der Oberfläche anzeigen. GovData liefert sie oft nicht; derzeit steht dann „nicht angegeben" im Freitextfeld `source`. Für eine veröffentlichte App ist das zu wenig.

### 2b. Frankfurt am Main

- [x] 2b.1 PDF-Kette gebaut: Parser, Adress-Aufspaltung, Geocoding, Seed, Report
- [x] 2b.2 Kontrollgröße erreicht: 505 Stellplätze entsprechen exakt der Gesamtsumme der Quelle, keine ungeparste Zeile
- [x] 2b.3 **Auf den amtlichen WFS umgestellt** – 458 statt 359 Standorte, alle mit amtlicher Koordinate statt 166 hausgenauen
- [x] 2b.4 PDF-Kette als Vorlage für Städte ohne Geodienst erhalten, schreibt nach `frankfurt-pdf-liste.json`

### 2c. Idstein und Weißenhorn

- [x] 2c.1 Keine amtliche Quelle – über GovData und die Städte-Websites bestätigt
- [x] 2c.2 Aus OpenStreetMap importiert: Idstein 6 Standorte / 9 Stellplätze, Weißenhorn 4 / 7
- [ ] 2c.3 Bei beiden Stadtverwaltungen nach einer amtlichen Liste fragen – das wäre die deutlich bessere Quelle
- [ ] 2c.4 Fehlende Parkplätze in OpenStreetMap nachtragen; davon profitieren auch alle anderen Nutzungen

### 2d. Alle deutschen Großstädte

Laufender Stand: **[data/\_import-status.md](data/_import-status.md)** – von den Skripten selbst geschrieben, nach jeder einzelnen Stadt aktualisiert.

- [x] 2d.1 Städteregister aller 83 Großstädte ab 100.000 Einwohnern, nach Einwohnerzahl sortiert
- [x] 2d.2 `npm run sources:scan` prüft alle Städte in einem Durchgang gegen GovData
- [x] 2d.3 Generischer Importer: WFS (GeoJSON und GML), ArcGIS-REST, GeoJSON, JSON, CSV, mit automatischer Feldzuordnung
- [x] 2d.4 Fortschrittsverwaltung: Quelle, Abruf-URL, Anzahlen und Probleme werden nach jeder Stadt fortgeschrieben
- [x] 2d.5 Schutz gegen falsch gedeutete Koordinatensysteme: UTM-Zone aus `srsName`, zusätzlich Abstandsprüfung zum Stadtmittelpunkt
- [x] 2d.6 Adress-Rückwärtssuche für Quellen ohne Straßennamen
- [x] 2d.7 **Alle 83 Großstädte importiert** – 13.370 Standorte, 33.209 Stellplätze, davon 16 Städte amtlich
- [ ] 2d.8 **Fünf Städte mit ungenutzter amtlicher Quelle nachziehen** – dort steht derzeit OpenStreetMap, obwohl es Besseres gäbe: **Bochum** (Portal antwortet 403), **Bielefeld** (CKAN-Ressourcenseiten statt Dateien), **Karlsruhe** (ArcGIS-Pfade liefern 404), **Kiel**, **Krefeld**. Wie groß der Unterschied ist, zeigt Düsseldorf: 171 Standorte aus OSM gegenüber 340 aus der amtlichen Quelle.
- [ ] 2d.9 **Regensburg** hat weder amtliche Daten noch OSM-Treffer – prüfen, ob die Abfrage oder die Datenlage schuld ist
- [ ] 2d.10 Auffällig niedrige OSM-Zahlen stichprobenartig prüfen, etwa Wuppertal mit 66 Standorten bei 359.000 Einwohnern

### 2e. Alle übrigen Städte Deutschlands

- [ ] 2e.1 **Mittel- und Kleinstädte erfassen, für die Daten existieren.** Die 83 Großstädte sind nur der Anfang; die Mehrheit der Menschen in Deutschland lebt anderswo. Vorgehen: alle GovData-Datensätze zu Behindertenparkplätzen durchgehen, unabhängig von der Einwohnerzahl, und jede Stadt importieren, die einen hat.
- [ ] 2e.2 Landesportale einbeziehen, die GovData nicht vollständig spiegelt: Open.NRW, MobiData BW, Open Data Hessen, daten.berlin.de, Geodatenportal Bayern
- [ ] 2e.3 Städte ohne amtliche Daten aus OpenStreetMap ergänzen – der Importer kann das schon, es fehlt nur die Städteliste. Sinnvoller Schnitt: alle Gemeinden ab 20.000 Einwohnern, danach nach Bedarf.
- [ ] 2e.4 Laufzeit und Last im Blick behalten: Nominatim und Overpass vertragen keine Massenabfragen. Bei mehreren hundert Städten den Lauf über Tage verteilen und Zwischenstände nutzen.

---

## 3. Datenvalidierung

Bisher prüft der Import nur, ob eine Koordinate überhaupt plausibel ist (liegt sie
in Deutschland, liegt sie nahe der richtigen Stadt). Das fängt grobe Fehler ab,
aber keine einzelne falsch verorteten Parkplätze. Dafür braucht es einen
Abgleich mit einer zweiten, unabhängigen Quelle.

- [ ] 3.1 **Kreuzvergleich amtliche Daten gegen OpenStreetMap.** Für jede Stadt beide Quellen holen und Standorte paaren, die weniger als etwa 30 m auseinanderliegen. Daraus drei Gruppen: _bestätigt_ (beide kennen den Platz), _nur amtlich_ (wahrscheinlich in OSM nicht erfasst), _nur OSM_ (möglicherweise neu oder in der amtlichen Liste vergessen). Der Importer holt beide Quellen ohnehin schon – es fehlt nur der Vergleich.
- [ ] 3.2 **Landesweite Sammeldatensätze als dritte Quelle.** Auf der Mobilithek gibt es „Gebündelte Daten Behindertenparkplätze NRW", über MobiData BW eine Park-API für Baden-Württemberg. Beide fassen zusammen, was die Kommunen melden, und eignen sich sowohl zum Gegenprüfen als auch zum Schließen von Lücken – sie decken unter anderem Bochum, Bielefeld, Krefeld und Karlsruhe ab, also vier der fünf Städte aus 2d.8.
- [ ] 3.3 **Straßenabgleich.** Für jeden Standort prüfen, ob die Rückwärtssuche bei der Koordinate dieselbe Straße nennt wie die Quelle. Eine Abweichung ist kein Beweis für einen Fehler, aber ein guter Filter: nur die Treffer müssen von Hand angesehen werden. Für Frankfurt gibt es das schon im Importreport; es fehlt für alle anderen Städte.
- [ ] 3.4 **Abstand zur nächsten Straße.** Ein Behindertenparkplatz liegt am Straßenrand. Punkte, die mehr als etwa 25 m von jeder Straße entfernt sind, sind fast immer falsch verortet. Über eine einzige Overpass-Abfrage je Stadt prüfbar.
- [ ] 3.5 **Doppelte Einträge finden.** Zwei Standorte derselben Stadt im Abstand weniger Meter sind meist derselbe Parkplatz – etwa wenn eine Quelle je Stellplatz einen Eintrag führt und eine andere je Standort.
- [ ] 3.6 **Kennzahlen je Stadt vergleichen.** Stellplätze je 10.000 Einwohner über alle Städte auftragen; Ausreißer nach unten zeigen Lücken in der Datenlage, nicht in der Wirklichkeit. Das ist der billigste Test überhaupt und hätte Hamburgs 10 Standorte sofort auffallen lassen.
- [ ] 3.7 Ergebnis sichtbar machen: Standorte, die von zwei Quellen bestätigt sind, in der Detailansicht als geprüft kennzeichnen. Das ist genau die Information, die Nutzer:innen vor einer vergeblichen Fahrt bewahrt.
- [ ] 3.8 Validierungslauf als eigenes Skript (`npm run validate`) mit Bericht je Stadt, analog zum Importreport

---

## 4. Datenaktualität

Parkplätze verschwinden und kommen hinzu. Die Daten einmal zu importieren
genügt nicht – es braucht einen regelmäßigen, möglichst billigen Blick darauf,
ob sich an der Quelle etwas getan hat.

- [ ] 4.1 **Monatliche Änderungsprüfung, ohne die Daten zu laden.** Für jede Stadt nur das Änderungsdatum der Quelle abfragen und mit dem gespeicherten vergleichen:
  - GovData-Datensätze: Feld `metadata_modified` über die CKAN-API (eine Anfrage liefert alle Städte auf einmal)
  - direkte Dateien: `HTTP HEAD` und der Header `Last-Modified` oder `ETag`
  - WFS-Dienste: `GetCapabilities` ist klein und trägt oft ein Aktualisierungsdatum
  - OpenStreetMap: hier gibt es kein Änderungsdatum je Stadt – dort reicht ein fester Takt
- [ ] 4.2 **Vorschlag für den Takt:** die Änderungsprüfung **monatlich**, ein vollständiger Neuimport nur dann, wenn sie eine Änderung meldet. Zusätzlich **alle sechs Monate** ein Neuimport aller Städte, unabhängig vom gemeldeten Datum – manche Portale pflegen ihr Änderungsdatum nicht. Die OSM-Städte alle **drei Monate**, weil dort laufend kartiert wird und ein Lauf wenig kostet.
- [ ] 4.3 Änderungsdatum je Stadt im Importstatus mitführen, damit die Prüfung weiß, womit sie vergleicht
- [ ] 4.4 `npm run sources:check` als eigener Befehl, der nur prüft und berichtet, ohne etwas zu schreiben
- [ ] 4.5 Automatisieren, sobald die App läuft – etwa als monatlicher GitHub-Actions-Lauf, der bei Änderungen einen Pull Request mit den neuen Daten öffnet. So bleibt die Kontrolle beim Menschen.
- [ ] 4.6 Importdatum je Stadt in der Oberfläche zeigen („Daten vom …"), damit niemand veraltete Angaben für aktuell hält

---

## 5. Datenmodell und Backend

- [ ] 5.1 Schema `parking_spot`: id, city, street, house_number, label, district, lat, lng, spot_count, time_restriction, geo_accuracy, source, license, verified, created_at
- [ ] 5.2 Schema `rating`: id, spot_id, vote (`exists` / `gone`), created_at, device_hash
- [ ] 5.3 Tabelle `city` mit Quelle, Lizenz, Importdatum und Abdeckungsgrad
- [ ] 5.4 API: `GET /api/spots` mit Bounding-Box-Filter – 13.370 Standorte an den Browser zu schicken skaliert nicht ewig
- [ ] 5.5 API: `GET /api/spots/:id` inklusive Bewertungs-Aggregat
- [ ] 5.6 API: `POST /api/spots/:id/ratings` mit Validierung und Rate-Limit
- [ ] 5.7 Migrationen und Seed-Lauf aus den Dateien in `data/`
- [ ] 5.8 Caching: die Parkplatzliste ändert sich selten, die Bewertungen häufig

---

## 6. Karte und Standort

- [x] 6.1 Kartenkomponente mit OpenStreetMap-Tiles, Attribution sichtbar
- [x] 6.2 Marker für alle Parkplätze mit Clustering
- [x] 6.3 Browser-Geolocation mit Einwilligung, Standortmarker
- [x] 6.4 Zustände abgedeckt: verweigert, nicht verfügbar, Zeitüberschreitung – mit verständlichem Hinweis und Fallback auf die Stadtmitte
- [x] 6.5 Nächstgelegener Parkplatz wird berechnet, hervorgehoben und benannt
- [x] 6.6 Entfernungsformatierung in m und km, Aktualisierung bei Standortänderung
- [~] 6.7 Mobile Leistung: Clustering und stückweises Laden sind drin, aber alle 13.370 Marker werden erzeugt. Besser: nur laden, was im Kartenausschnitt liegt (hängt mit 5.4 zusammen).
- [ ] 6.8 Stadtwechsel ohne Standortfreigabe – derzeit zentriert die Karte fest auf eine Stadt, eine Suche nach Ort oder Adresse fehlt
- [ ] 6.9 Knopf „zurück zu meinem Standort", wenn man weggescrollt hat

---

## 7. Parkplatzdetails und Navigation

- [x] 7.1 Detailansicht beim Markerklick, auf dem Smartphone als Bottom-Sheet
- [x] 7.2 Anzeige: Adresse, Stadtteil, Anzahl Stellplätze, Zeitbeschränkung, Entfernung
- [x] 7.3 „In Karten-App öffnen" mit Plattformerkennung – Apple Karten auf iOS, sonst Google Maps
- [ ] 7.4 Teilen-Funktion für einen Parkplatz (Web Share API, Fallback Link kopieren)
- [ ] 7.5 Hinweis anzeigen, wenn die Zeitbeschränkung gerade **nicht** gilt – „jetzt nicht nutzbar" ist beim Losfahren wichtiger als die Öffnungszeit im Kleingedruckten

---

## 8. Bewertungen

Blockiert durch D-02 (Datenbank).

- [ ] 8.1 UI: 👍 „Existiert" / 👎 „Existiert nicht mehr" in der Detailansicht
- [ ] 8.2 Zählerstände und Zeitpunkte anzeigen („zuletzt bestätigt am …")
- [ ] 8.3 Keine automatische Änderung der Parkplatzdaten durch Bewertungen (laut Konzept)
- [ ] 8.4 Optimistisches UI-Update mit Fehlerbehandlung bei Offline
- [ ] 8.5 Doppelabstimmung begrenzen (siehe D-03)
- [ ] 8.6 Interne Übersicht gemeldeter Parkplätze für das manuelle Review
- [ ] 8.7 Bewertungen in die Validierung einbeziehen: mehrfach als „existiert nicht mehr" gemeldete Plätze gehören auf die Prüfliste aus Abschnitt 3

---

## 9. Darstellung und Bedienung

- [ ] 9.1 **Dark Mode mit Umschalter.** Standardmäßig an, abschaltbar.
  - Umschalter mit drei Stellungen: dunkel (Vorgabe), hell, Systemeinstellung
  - Auswahl in `localStorage` merken
  - Vor dem ersten Rendern setzen, damit es beim Laden nicht kurz hell aufblitzt
  - Umschalter gut erreichbar unterbringen, nicht in einem versteckten Menü
  - Derzeit folgt die App nur `prefers-color-scheme` und hat keinen Umschalter
- [ ] 9.2 Kartenkacheln an den Modus anpassen – eine helle Karte in dunkler Oberfläche blendet nachts
- [x] 9.3 Tastaturbedienung und sichtbarer Fokus
- [x] 9.4 Screenreader: Marker haben Rolle und Namen, die Liste ist die Textalternative zur Karte
- [x] 9.5 Große Touch-Ziele (mindestens 44 px)
- [x] 9.6 `prefers-reduced-motion` wird beachtet
- [ ] 9.7 Kontraste nach WCAG AA prüfen – in beiden Modi, bisher ungeprüft
- [ ] 9.8 Schriftgrößen skalieren lassen, ohne dass das Layout bricht
- [ ] 9.9 Mit echten Hilfsmitteln testen, nicht nur mit Prüfwerkzeugen (NVDA oder VoiceOver, Tastatur, Vergrößerung)

---

## 10. Datenschutz und Recht

- [x] 10.1 Standort wird nur im Browser verarbeitet und nicht gespeichert
- [ ] 10.2 Impressum und Datenschutzerklärung – für eine veröffentlichte Seite in Deutschland Pflicht
- [ ] 10.3 Lizenz- und Attributionshinweise vollständig: OpenStreetMap (ODbL) und jede amtliche Quelle einzeln. Teilweise vorhanden, aber nicht für alle 84 Städte sauber belegt (hängt an 2a.5).
- [ ] 10.4 Keine Tracker, keine Drittanbieter-Cookies; falls Statistik, dann datenschutzfreundlich und mit Einwilligung
- [ ] 10.5 Haftungshinweis: Die Daten können veraltet sein. Bei einer App, auf die sich Menschen beim Losfahren verlassen, gehört das sichtbar und verständlich formuliert – nicht ins Kleingedruckte.

---

## 11. Benutzerkonten

Laut Konzept bewusst nicht im ersten Umfang. Für später vorgemerkt, weil mehrere
spätere Funktionen daran hängen.

- [ ] 11.1 Entscheiden, **ob** Konten überhaupt gebraucht werden. Sie lösen das Missbrauchsproblem bei Bewertungen (D-03) sauberer als Gerätekennungen, kosten aber Hürde, Aufwand und Datenschutzverantwortung. Eine Zwischenstufe wäre ein anonymer, gerätegebundener Schlüssel ohne Registrierung.
- [ ] 11.2 Falls ja: Registrierung und Anmeldung, möglichst ohne Passwort (Magic Link oder Passkey)
- [ ] 11.3 Eigene Bewertungen einsehen und zurückziehen
- [ ] 11.4 Gespeicherte Parkplätze (Favoriten) – häufig angefahrene Ziele
- [ ] 11.5 Vertrauensstufen: Wer wiederholt zutreffend meldet, bekommt mehr Gewicht in der Validierung
- [ ] 11.6 Datenschutz: Datensparsamkeit, Löschfunktion, Auskunft nach DSGVO

---

## 12. Qualität und Deployment

- [x] 12.1 Unit-Tests: Parser, Adress-Aufspaltung, Distanzberechnung, Karten-App-Links (42 Tests)
- [ ] 12.2 Tests für die Importkette: Feldzuordnung, UTM-Umrechnung, GML-Parser, CSV-Leser. Genau dort sind die teuren Fehler passiert, und genau dort gibt es bisher keine Tests.
- [ ] 12.3 E2E-Smoke-Test: Karte lädt, Marker klickbar, Liste wechselt, Detailansicht öffnet
- [ ] 12.4 Lighthouse-Prüfung auf Mobil (Leistung und Barrierefreiheit)
- [ ] 12.5 Deployment-Pipeline (Vercel), Umgebungsvariablen dokumentieren
- [ ] 12.6 Fehler-Monitoring und minimales Logging
- [ ] 12.7 PWA-Grundlagen: Manifest, Icons, „Zum Homescreen hinzufügen"
- [ ] 12.8 Offline-Fähigkeit prüfen – im Parkhaus oder Funkloch ist genau dann kein Netz, wenn man die App braucht

---

## 13. Abschlusstest

**Erst ausführen, wenn alle übrigen Punkte erledigt sind.** Ein vollständiger
Durchgang durch die fertige App, von Hand, auf echten Geräten – nicht als
Ersatz für die automatischen Tests, sondern als letzter Blick darauf, ob das
Ganze im Alltag funktioniert.

- [ ] 13.1 Alle Funktionen durchspielen: Karte, Standort, nächster Parkplatz, Suche, Detailansicht, Navigation starten, Bewerten, Dark Mode umschalten
- [ ] 13.2 Alle Zustände der Standortbestimmung: erlaubt, abgelehnt, später erlaubt, Zeitüberschreitung, ungenau, Standort wechselt während der Nutzung
- [ ] 13.3 Echte Geräte: iPhone (Safari), Android (Chrome), Desktop; kleines Display, großes Display, Querformat
- [ ] 13.4 Schlechte Bedingungen: langsames Netz, Funkloch mitten in der Nutzung, Akkusparmodus, Sonnenlicht auf dem Display
- [ ] 13.5 Bedienung einhändig und im Sitzen, mit Handschuhen, bei Vergrößerung auf 200 %
- [ ] 13.6 Mit Screenreader und nur mit Tastatur durch alle Abläufe
- [ ] 13.7 Stichprobe in der Wirklichkeit: zehn Parkplätze aussuchen und vor Ort prüfen, ob sie existieren und die Angaben stimmen. Kein Test am Schreibtisch ersetzt das.
- [ ] 13.8 Von jemandem testen lassen, der die App wirklich braucht – Rollstuhlfahrer:innen oder Inhaber:innen eines Parkausweises. Deren Urteil wiegt schwerer als jede Prüfliste hier.
- [ ] 13.9 Gefundene Mängel sammeln, bewerten und vor der Veröffentlichung abarbeiten

---

## Bestätigter Stack (D-01, 2026-10-08)

| Bereich     | Technologie                                                 |
| ----------- | ----------------------------------------------------------- |
| Framework   | Next.js 15.5 (App Router), React 19.1, TypeScript           |
| Styling     | Tailwind CSS 4                                              |
| Karte       | Leaflet 1.9 + react-leaflet 5, `leaflet.markercluster`, OSM |
| Datenbank   | Postgres (Supabase oder Neon) – noch nicht entschieden      |
| Datenimport | tsx-Skripte: WFS, ArcGIS, GeoJSON, CSV, Overpass, Nominatim |
| Tests       | Vitest 5                                                    |
| Hosting     | Vercel                                                      |

---

## Notizen zur Datenlage

- **84 Städte, 13.370 Standorte, 33.209 Stellplätze.** 16 Städte aus amtlicher Quelle (17.966 Stellplätze), der Rest aus OpenStreetMap.
- Die beiden Quellenarten sind nicht vergleichbar: amtliche Listen führen einzelne Stellplätze am Straßenrand, OpenStreetMap überwiegend Parkplätze mit ausgewiesenen Behindertenstellplätzen. Die Oberfläche sagt das, und so muss es bleiben.
- Vier Fehlerklassen sind beim Import aufgetreten und werden jetzt abgefangen; alle vier hätten Daten erzeugt, die beim Draufschauen richtig aussehen:
  - **Falsche UTM-Zone.** Dresdens Dienst liefert Zone 33. Als Zone 32 gedeutet ergaben sich Koordinaten bei 7,7° Ost – mitten in Deutschland, aber 450 km daneben.
  - **Stadtname als Teilstring.** „Essen" steckt in „Hessen"; Essen bekam dadurch den Frankfurter Datensatz.
  - **Leere Antwort als Ergebnis.** Overpass meldet Überlast teils mit HTTP 200 und leerer Liste.
  - **Themenfremde Treffer.** Die Suche schlug für Hamburg Werkstätten und Tagesförderstätten vor; der richtige Datensatz heißt „Behindertenstellplätze".
- Die Lehre daraus steckt in Abschnitt 3: Plausibilität je Datenpunkt reicht nicht, es braucht den Abgleich mit einer unabhängigen Quelle und Kennzahlen über die ganze Stadt.
