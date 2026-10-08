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

Die Quelle für Frankfurt ist eine PDF-Liste der Stadt ohne Koordinaten. Der
Import läuft deshalb in vier Schritten, jeder für sich wiederholbar:

```bash
npm run import:parse      # PDF -> data/frankfurt.parsed.json
npm run import:geocode    # Koordinaten -> data/geocode-cache.json
npm run import:build      # Seed-Datei -> data/frankfurt.json
npm run import:report     # Qualitätsreport -> data/frankfurt.report.md
```

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

## Daten und Lizenzen

- Parkplatzdaten: Stadt Frankfurt am Main, Liste allgemeiner
  Behindertenparkplätze.
- Kartendaten: © OpenStreetMap-Mitwirkende, ODbL. Die Attribution muss in der
  Karte sichtbar bleiben.
- Geocoding: Nominatim, betrieben von der OpenStreetMap Foundation.

## Datenschutz

Der Standort wird nur im Browser verarbeitet und nicht gespeichert. Bewertungen
enthalten keine personenbezogenen Daten.
