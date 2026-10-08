# ToDos – wheelee

Zentrale Aufgabenliste zum Projekt (Grundlage: [Konzept.md](Konzept.md)).

**Status-Legende:** `[ ]` offen · `[~]` in Arbeit · `[x]` erledigt · `[!]` blockiert / Entscheidung nötig · `[-]` verworfen / später

**Letzte Aktualisierung:** 2026-10-08

---

## 0. Offene Entscheidungen

- [x] **D-01 Technologie-Stack bestätigt** (2026-10-08) – Next.js 15, TypeScript, Tailwind 4, Leaflet + OSM, Postgres, Vercel.
- [x] **D-04 Geocoding-Quelle** – Nominatim, 1 Anfrage/Sekunde, Antworten versioniert in `data/geocode-cache.json`.
- [!] **D-02 Datenbank konkret wählen** – Supabase oder Neon. Erst relevant für Abschnitt 3; die Seed-Datei ist von der Wahl unabhängig.
- [!] **D-03 Missbrauchsschutz für Bewertungen ohne Accounts** – Empfehlung: 1 Bewertung pro Parkplatz pro Gerät (LocalStorage) + IP-Rate-Limit serverseitig.
- [!] **D-05 Umgang mit Parkplätzen ohne Koordinaten** – Empfehlung: nicht auf Stadtteil-Mittelpunkt setzen, sondern als „Position ungenau" kennzeichnen und nur in der Listenansicht führen.

---

## 1. Projekt-Setup

- [x] 1.1 Node-Projekt mit Next.js 15 (App Router) + TypeScript initialisiert
- [~] 1.2 Tailwind CSS 4 eingerichtet; mobile-first Basis-Layout steht noch aus (kommt mit Abschnitt 4)
- [x] 1.3 ESLint + Prettier + Vitest + npm-Scripts (`lint`, `format`, `typecheck`, `test`)
- [x] 1.4 `.gitignore` ergänzt, `README.md` mit Stack, Entwicklung, Importkette und Lizenzen
- [x] 1.5 Ordnerstruktur angelegt: `src/lib/` (Daten, Geo), `src/lib/parking/` (Quellenlogik), `scripts/import/`, `data/`
- [x] 1.8 Mehrstädte-Fähigkeit in der Datenschicht: `src/lib/parking/spots.ts` lädt alle Seed-Dateien, die Karte zeigt alle Städte gemeinsam
- [!] 1.6 Erste Commits + Branch-Strategie – **blockiert:** `git` ist auf diesem Rechner nicht im PATH, ich kann nicht committen
- [ ] 1.7 Rest-Audit-Findings bereinigen: `postcss` (über `next`) und `braces` (über `eslint-config-next`) sind nur per Next-16-Upgrade behebbar – bewusst zurückgestellt

## 2. Datenimport Frankfurt

- [x] 2.1 PDF nach Rohtext extrahieren – `npm run import:parse`, Rohtext unter `data/raw/frankfurt.txt`
- [x] 2.2 Parser `src/lib/parking/parse-list.ts`: Seitenköpfe, Abschnitts-Buchstaben, Zeilenumbrüche, fehlende Stadtteile und Glyph-Artefakte der Quelle
- [x] 2.3 Adress-Aufspaltung `src/lib/parking/address.ts`: Straße, Hausnummer, Zusatz, Zeitfenster, Lagehinweise („ggü. Hsnr.")
- [x] 2.4 Geocoding `scripts/import/geocode.mts`: Nominatim, 1 Anfrage/Sekunde, Cache, Plausibilitätsprüfung auf das Stadtgebiet
- [x] 2.5 Stabile IDs aus der Örtlichkeit (SHA-256-Präfix, `ffm-…`) statt aus der Zeilennummer
- [x] 2.6 Qualitätsreport `npm run import:report` → `data/frankfurt.report.md`; Korrekturdatei `data/frankfurt.overrides.json`
- [x] 2.7 Seed-Datei `data/frankfurt.json` über `npm run import:build`
- [x] 2.8 Alle vier Schritte wiederholbar; Korrekturen und Geocoding-Cache sind versioniert und werden nicht überschrieben
- [x] 2.9 Kontrollgröße: eigene Stellplatzsumme (505) stimmt mit der Gesamtsumme der Quelle (505) überein, keine ungeparsten Zeilen
- [ ] 2.10 Nacharbeit aus dem Report abarbeiten: Parkplätze ohne Koordinate und unsichere Treffer in `frankfurt.overrides.json` korrigieren
- [ ] 2.11 Drei Örtlichkeiten ohne Stadtteil in der Quelle nachtragen (im Report gelistet)

## 2a. Quellenstrategie

- [x] 2a.1 Rangfolge festgelegt: amtlicher Geodienst → amtliche Datei → OpenStreetMap
- [x] 2a.2 `npm run sources -- <Stadt>` durchsucht **GovData**, das Metaportal von Bund, Ländern und Kommunen, nach amtlichen Datensätzen inklusive Lizenz und Downloadformaten
- [x] 2a.3 Wheelmap geprüft und verworfen: die Parkplatzdaten dort stammen von Parkopedia und sind nicht frei weiterverwendbar; die übrigen Daten sind ohnehin OpenStreetMap
- [x] 2a.4 Mapy.cz geprüft und verworfen: die Nutzungsbedingungen untersagen die Kombination mit anderen Kartendaten
- [x] 2a.5 **Frankfurt auf den amtlichen WFS umgestellt** – 458 statt 359 Standorte, 615 statt 505 Stellplätze, alle mit amtlicher Koordinate statt 166 hausgenauen
- [ ] 2a.6 Weitere Städte mit amtlichem Datensatz anbinden – GovData listet u. a. Berlin, Köln, Düsseldorf, Bochum, Neuss, Bottrop, Gelsenkirchen, Heidelberg, Freiburg, Ulm und gebündelte Daten für NRW und Baden-Württemberg
- [ ] 2a.7 Lizenzangabe je Stadt im Datenmodell führen und in der Oberfläche anzeigen (bisher nur als Freitext in `source`)

## 2b. Weitere Städte: Idstein und Weißenhorn

- [x] 2b.1 Quellenrecherche: **keine** offene Liste der Stadtverwaltung für Idstein oder Weißenhorn – bestätigt über GovData (0 von 122 bundesweiten Datensätzen passen) und über die Websites beider Städte; OpenStreetMap ist die einzige frei nutzbare Quelle
- [x] 2b.2 OSM-Importer `scripts/import/osm-import.mts` (`npm run import:osm`), konfigurierbar über `scripts/import/cities.mts`
- [x] 2b.3 Abgrenzung über die Gemeindegrenze (`map_to_area`) statt Bounding-Box – sonst landen Nachbargemeinden mit in den Daten
- [x] 2b.4 Schutz gegen falsch leere Importe: Overpass meldet Überlast teils mit HTTP 200 und leerem Ergebnis; ein leeres Ergebnis gilt erst nach Bestätigung durch einen zweiten Spiegel
- [x] 2b.5 Adressen über Nominatim-Rückwärtssuche ergänzt, Ergebnis in `data/osm-address-cache.json`
- [x] 2b.6 Ergebnis: Idstein 6 Standorte / 9 Stellplätze, Weißenhorn 4 Standorte / 7 Stellplätze
- [x] 2b.7 Unvollständigkeit in der Oberfläche benannt (Quellenabschnitt in der Listenansicht)
- [ ] 2b.8 Bei beiden Stadtverwaltungen nach einer amtlichen Liste fragen – das wäre die deutlich bessere Quelle
- [ ] 2b.9 Fehlende Parkplätze in OpenStreetMap nachtragen; davon profitiert die App und alle anderen Nutzungen

## 3. Datenmodell & Backend

- [ ] 3.1 Schema `parking_spot`: id, city, street, house_number, label, district, lat, lng, spot_count, time_restriction, geo_accuracy, source, created_at
- [ ] 3.2 Schema `rating`: id, spot_id, vote (`exists` / `gone`), created_at, device_hash
- [ ] 3.3 Mehrstädte-Fähigkeit vorsehen (Tabelle `city`, Datenquelle pro Stadt)
- [ ] 3.4 API: `GET /api/spots` (optional Bounding-Box / Stadt-Filter)
- [ ] 3.5 API: `GET /api/spots/:id` inkl. Bewertungs-Aggregat (Anzahl 👍/👎, letzte Bewertung je Richtung)
- [ ] 3.6 API: `POST /api/spots/:id/ratings` mit Validierung + Rate-Limit
- [ ] 3.7 Migrationen + Seed-Lauf aus `data/frankfurt.json`
- [ ] 3.8 Caching-Strategie für Parkplatzliste (ändert sich selten)

## 4. Karte & Standort

- [ ] 4.1 Kartenkomponente mit OpenStreetMap-Tiles einbinden, Attribution korrekt anzeigen
- [ ] 4.2 Marker für alle Parkplätze, Clustering bei großer Anzahl
- [ ] 4.3 Browser-Geolocation mit Einwilligung; Standortmarker anzeigen
- [ ] 4.4 Zustände abdecken: Erlaubnis verweigert, nicht verfügbar, Timeout, ungenau → verständliche Hinweise, Fallback auf Stadtmittelpunkt
- [ ] 4.5 Nächstgelegenen Parkplatz berechnen (Haversine) und hervorheben inkl. Entfernung
- [ ] 4.6 Entfernungsformatierung (m / km) und Live-Aktualisierung bei Standortänderung
- [ ] 4.7 Karte auf Mobilgeräten performant halten (nur sichtbare Marker, Debouncing)

## 5. Parkplatzdetails & Navigation

- [ ] 5.1 Detail-Ansicht beim Markerklick (Bottom-Sheet auf Mobil)
- [ ] 5.2 Anzeige: Adresse / Örtlichkeit, Stadtteil, Anzahl Stellplätze, Zeitbeschränkung, Entfernung
- [ ] 5.3 Button „In Karten-App öffnen" – Plattformerkennung: Apple Maps auf iOS, Google Maps sonst, Geo-Link als Fallback
- [ ] 5.4 Teilen-/Kopieren-Option für Koordinaten (optional)

## 6. Bewertungen

- [ ] 6.1 UI: 👍 „Existiert" / 👎 „Existiert nicht mehr" in der Detailansicht
- [ ] 6.2 Anzeige der Zählerstände und Zeitpunkte („zuletzt bestätigt am …", „gemeldet als entfernt am …")
- [ ] 6.3 Keine automatische Änderung der Parkplatzdaten durch Bewertungen (laut Konzept)
- [ ] 6.4 Optimistisches UI-Update + Fehlerbehandlung bei Offline/Fehler
- [ ] 6.5 Doppel-Abstimmung begrenzen (siehe D-03)
- [ ] 6.6 Interne Übersicht der gemeldeten Parkplätze für späteres manuelles Review

## 7. Barrierefreiheit & UX

- [ ] 7.1 Tastatur-Bedienbarkeit und sichtbarer Fokus für alle Interaktionen
- [ ] 7.2 Screenreader: ARIA-Labels für Marker/Buttons, Textalternative zur Karte (Listenansicht der nächsten Parkplätze)
- [ ] 7.3 Große Touch-Ziele (min. 44 px), einhändige Bedienung
- [ ] 7.4 Kontraste nach WCAG AA prüfen, Dark Mode
- [ ] 7.5 Reduzierte Bewegung respektieren (`prefers-reduced-motion`)

## 8. Datenschutz & Recht

- [ ] 8.1 Standort nur im Client verarbeiten, nicht persistieren
- [ ] 8.2 Datenschutzhinweis + Impressum (statische Seiten)
- [ ] 8.3 Lizenz-/Attributionshinweise für OSM und die Parkplatzdatenquelle (Stadt Frankfurt)
- [ ] 8.4 Keine Tracker/Drittanbieter-Cookies; falls Analytics, dann datenschutzfreundlich und opt-in

## 9. Qualität & Deployment

- [x] 9.1 Unit-Tests: Parser, Adress-Aufspaltung, Distanzberechnung (36 Tests, `npm run test`)
- [ ] 9.2 Komponenten-/E2E-Smoke-Test: Karte lädt, Marker klickbar, Bewertung wird gespeichert
- [ ] 9.3 Lighthouse-Check (Performance + Accessibility) auf Mobil
- [ ] 9.4 Deployment-Pipeline (Vercel), Environment-Variablen dokumentieren
- [ ] 9.5 Fehler-Monitoring / Logging minimal einrichten
- [ ] 9.6 PWA-Basics: Manifest, Icons, „Zum Homescreen hinzufügen"

## 10. Bewusst später (nicht im MVP)

- [-] 10.1 Benutzerkonten und Registrierung
- [-] 10.2 Automatische Prüfung/Löschung gemeldeter Parkplätze
- [-] 10.3 Echtzeit-Belegung
- [-] 10.4 Automatischer Datenimport weiterer Städte
- [-] 10.5 In-App-Navigation

---

## Bestätigter Stack (D-01, 2026-10-08)

| Bereich     | Vorschlag                                                                 | Begründung                                                                              |
| ----------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Framework   | Next.js 15 (App Router) + TypeScript                                      | Eine Codebasis für UI und API-Routen, gutes Mobile-/SEO-Verhalten, einfaches Deployment |
| Styling     | Tailwind CSS                                                              | Schnelles, konsistentes mobile-first Layout                                             |
| Karte       | Leaflet + react-leaflet, OSM-Raster-Tiles, Marker-Clustering              | Leichtgewichtig, sehr gut mobil erprobt, keine API-Keys nötig                           |
| Datenbank   | Postgres (Supabase oder Neon)                                             | Relational passend für Spots + Bewertungen, kostenlose Stufe, später mehrstädtefähig    |
| Datenimport | Node-Skript: PDF-Parsing + Nominatim-Geocoding → geprüfte JSON-Seed-Datei | Geocoding einmalig offline, Ergebnis versioniert und manuell korrigierbar               |
| Hosting     | Vercel                                                                    | Nahtlos zu Next.js, kostenlose Stufe ausreichend                                        |

Konkret installiert: Next.js 15.5, React 19.1, Tailwind 4, Leaflet 1.9 + react-leaflet 5, `leaflet.markercluster` fürs Clustering, Vitest 5, tsx für die Importskripte.

---

## Notizen zur Datenlage

- Quelle enthält pro Zeile: Örtlichkeit, Anzahl Stellplätze, Stadtteil – **keine Koordinaten**. Geocoding ist daher Pflichtschritt.
- Tatsächlicher Umfang nach dem Parsen: **359 Örtlichkeiten, 505 Stellplätze** – die Summe stimmt mit der Gesamtsumme im PDF überein.
- Örtlichkeiten sind heterogen: teils reine Adresse („Berger Straße 106"), teils Kreuzung („Adalbertstr./Barmer Ersatzkasse"), teils mit POI und Zeitfenster („Zobelstraße 5 / Arztpraxis Mo Di Do Fr 8-11 h …").
- Eigenheiten der Quelle, die der Parser abfängt: Zeilenumbrüche mitten in der Örtlichkeit, drei Zeilen ohne Stadtteil, Glyph-Artefakte des Textextrakts (`A266`, `+D332`), Abschnitts-Buchstaben und Seitenköpfe.
- Vier Zeilenumbrüche lassen sich nicht heuristisch erkennen, weil die Fortsetzung wie ein eigener Eintrag aussieht („Std. 1 Westend", „KiGa 2 Dornbusch"). Sie stehen als geprüfte Liste in `data/frankfurt.line-fixups.json`.
- Kreuzungen und POI-Angaben werden nicht zuverlässig geocodiert → manuelle Nachkorrektur über `data/frankfurt.overrides.json` (2.10).
