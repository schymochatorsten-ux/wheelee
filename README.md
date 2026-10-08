# wheelee

Mobil optimierte Web-App, die öffentliche Behindertenparkplätze auf einer Karte
zeigt, den nächstgelegenen hervorhebt und Rückmeldungen dazu sammelt, ob ein
Parkplatz noch existiert.

Fachliche Grundlage: [Konzept.md](Konzept.md). Aufgabenstand: [ToDos.md](ToDos.md).

## Stack

| Bereich     | Technologie                                   |
| ----------- | --------------------------------------------- |
| Framework   | Next.js 15 (App Router), React 19, TypeScript |
| Styling     | Tailwind CSS 4                                |
| Karte       | Leaflet + react-leaflet, OpenStreetMap-Tiles  |
| Tests       | Vitest                                        |
| Datenimport | tsx-Skripte, `pdf-parse`, Nominatim-Geocoding |

## Entwicklung

Voraussetzung: Node.js 20 oder neuer.

```bash
npm install
npm run dev
```

Die App läuft dann auf <http://localhost:3000>.

Weitere Skripte:

```bash
npm run build        # Produktionsbuild
npm run lint         # ESLint
npm run typecheck    # TypeScript ohne Emit
npm run test         # Vitest einmalig
npm run format       # Prettier schreibend
```

## Projektstruktur

```
src/app/              Next.js-Routen und Layout
src/lib/types.ts      Gemeinsame Typen (Parkplatz, Bewertung)
src/lib/geo.ts        Entfernungsberechnung und -formatierung
src/lib/parking/      Einlesen und Zerlegen der städtischen Parkplatzlisten
scripts/import/       Importkette von der Quelldatei zur Seed-Datei
data/                 Importergebnisse (versioniert)
Parkplätze/           Quelldateien der Städte
```

Die Trennung folgt dem Konzept: Kartendarstellung, Parkplatzdaten und
Bewertungen bleiben voneinander unabhängig.

## Datenimport

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
- Kartendaten: © OpenStreetMap-Mitwirkende, ODbL. Die Attribution muss in der
  Karte sichtbar bleiben.
- Geocoding: Nominatim, betrieben von der OpenStreetMap Foundation.

## Datenschutz

Der Standort wird nur im Browser verarbeitet und nicht gespeichert. Bewertungen
enthalten keine personenbezogenen Daten.
