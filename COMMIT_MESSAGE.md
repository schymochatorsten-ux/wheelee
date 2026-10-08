feat: Projekt-Setup, Frankfurt-Datenimport und Kartenansicht

Erster lauffähiger Stand der App aus Konzept.md: Next.js-Projekt, die
komplette Importkette für die Frankfurter Parkplatzliste und eine
bedienbare Karte mit Liste und Detailansicht.

Projekt-Setup
- Next.js 15 (App Router), React 19, TypeScript, Tailwind 4
- ESLint, Prettier, Vitest; Scripts für lint, format, typecheck, test
- Ordnertrennung nach Konzept: Kartendarstellung, Parkplatzdaten,
  Bewertungen bleiben unabhängig voneinander
- README mit Stack, Entwicklung, Importkette und Lizenzpflichten

Datenimport Frankfurt
- Vierstufige, einzeln wiederholbare Kette: parse -> geocode -> build
  -> report
- Parser für die PDF-Liste der Stadt: Zeilenumbrüche mitten in der
  Örtlichkeit, Zeilen ohne Stadtteil, Abschnitts-Buchstaben, Seitenköpfe
  und Glyph-Artefakte des Textextrakts
- Adress-Aufspaltung in Straße, Hausnummer, Zusatz, Zeitfenster und
  Lagehinweise ("ggü. Hsnr.")
- Geocoding über Nominatim mit einer Anfrage pro Sekunde, versioniertem
  Cache und Plausibilitätsprüfung auf das Stadtgebiet
- Stabile IDs aus der Örtlichkeit statt aus der Zeilennummer, damit
  Bewertungen eine neue Fassung der Quelle überstehen
- Vier Umbruch-Ausnahmen als geprüfte Liste in
  frankfurt.line-fixups.json statt als weitere Heuristik
- Ergebnis: 359 Örtlichkeiten, 505 Stellplätze. Die Summe stimmt exakt
  mit der Gesamtsumme der Quelle überein, keine ungeparste Zeile.
  330 Örtlichkeiten verortet, davon 166 hausgenau.

Karte und Liste
- Leaflet mit OpenStreetMap-Tiles und sichtbarer Attribution
- Marker-Clustering für 330 Marker, eigene Symbole für normal,
  nächstgelegen und nur ungefähr verortet
- Standortbestimmung im Browser mit Behandlung von Ablehnung,
  Zeitüberschreitung und fehlender Unterstützung; der Standort verlässt
  das Gerät nicht
- Nächstgelegener Parkplatz wird hervorgehoben und benannt
- Detailansicht als Bottom-Sheet mit Adresse, Stadtteil, Stellplatzzahl,
  Zeitfenster, Entfernung und Link in Apple Karten oder Google Maps
- Listenansicht als Textalternative zur Karte; sie führt auch die 29
  Parkplätze, die sich nicht verorten ließen

Noch nicht enthalten
- Bewertungen (Abschnitt 6 der ToDos): brauchen die Datenbank-
  Entscheidung D-02
- Nacharbeit aus dem Importreport: 29 Parkplätze ohne Koordinate und
  2 unsichere Treffer

Tests: 42 Tests zu Parser, Adress-Aufspaltung, Entfernungsberechnung und
Karten-App-Links. typecheck, lint und build laufen sauber.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
