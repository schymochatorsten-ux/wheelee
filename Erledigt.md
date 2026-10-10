# Erledigt – wheelee

Abgeschlossene Punkte, ausgelagert aus [ToDos.md](ToDos.md), damit dort nur
noch steht, was zu tun ist. Die Nummerierung bleibt die der ToDo-Liste – wer
in einem Commit oder einer Notiz „3.0b" liest, findet es hier wieder.

Diese Liste ist kein Änderungsprotokoll, sondern eine Begründungssammlung: Sie
hält fest, **warum** etwas so gelöst wurde. Mehrere Punkte beschreiben Fehler,
die wirklich passiert sind; sie stehen hier, damit niemand – auch kein
späterer Durchgang durch dieses Projekt – dieselbe Entscheidung noch einmal
anders trifft.

**Stand:** 98 Punkte (einschließlich Unterpunkte), zuletzt ergänzt 2026-10-10.

---

## 0. Entscheidungen

- [x] **D-01 Technologie-Stack bestätigt** (2026-10-08) – Next.js 15, TypeScript, Tailwind 4, Leaflet + OSM, Postgres, Vercel.
- [x] **D-04 Geocoding-Quelle** – Nominatim, 1 Anfrage/Sekunde, Antworten versioniert zwischengespeichert.

---

## 1. Projekt-Setup

- [x] 1.1 Next.js 15 (App Router) + TypeScript
- [x] 1.2 Tailwind CSS 4, mobile-first Layout
- [x] 1.3 ESLint, Prettier, Vitest, npm-Scripts (`lint`, `format`, `typecheck`, `test`)
- [x] 1.4 `.gitignore`, `README.md` mit Stack, Entwicklung, Importkette und Lizenzen
- [x] 1.5 Ordnerstruktur: `src/lib/` (Typen, Geo), `src/lib/parking/` (Quellenlogik), `src/components/`, `scripts/import/`, `data/`
- [x] 1.6 Mehrstädte-Fähigkeit in der Datenschicht; Seed-Index wird erzeugt, nicht gepflegt

---

## 2. Datenquellen und Import

### 2a. Quellenstrategie

- [x] 2a.1 Rangfolge: amtlicher Geodienst → amtliche Datei → OpenStreetMap
- [x] 2a.2 `npm run sources -- <Stadt>` durchsucht **GovData**, das Metaportal von Bund, Ländern und Kommunen
- [x] 2a.3 Wheelmap geprüft und verworfen – die Parkplatzdaten stammen von Parkopedia und sind nicht frei weiterverwendbar
- [x] 2a.4 Mapy.cz geprüft und verworfen – die Bedingungen untersagen die Kombination mit anderen Kartendaten

### 2b. Frankfurt am Main

- [x] 2b.1 PDF-Kette gebaut: Parser, Adress-Aufspaltung, Geocoding, Seed, Report
- [x] 2b.2 Kontrollgröße erreicht: 505 Stellplätze entsprechen exakt der Gesamtsumme der Quelle, keine ungeparste Zeile
- [x] 2b.3 **Auf den amtlichen WFS umgestellt** – 458 statt 359 Standorte, alle mit amtlicher Koordinate statt 166 hausgenauen
- [x] 2b.4 PDF-Kette als Vorlage für Städte ohne Geodienst erhalten, schreibt nach `frankfurt-pdf-liste.json`

### 2c. Idstein und Weißenhorn

- [x] 2c.1 Keine amtliche Quelle – über GovData und die Städte-Websites bestätigt
- [x] 2c.2 Aus OpenStreetMap importiert: Idstein 6 Standorte / 9 Stellplätze, Weißenhorn 4 / 7

### 2d. Die deutschen Städte

- [x] 2d.1 Städteregister aller 83 Großstädte ab 100.000 Einwohnern, nach Einwohnerzahl sortiert
- [x] 2d.2 `npm run sources:scan` prüft alle Städte in einem Durchgang gegen GovData
- [x] 2d.3 Generischer Importer: WFS (GeoJSON und GML), ArcGIS-REST, GeoJSON, JSON, CSV, mit automatischer Feldzuordnung
- [x] 2d.4 Fortschrittsverwaltung: Quelle, Abruf-URL, Anzahlen und Probleme werden nach jeder Stadt fortgeschrieben
- [x] 2d.5 Schutz gegen falsch gedeutete Koordinatensysteme: UTM-Zone aus `srsName`, zusätzlich Abstandsprüfung zum Stadtmittelpunkt
- [x] 2d.6 Adress-Rückwärtssuche für Quellen ohne Straßennamen
- [x] 2d.7 **Alle 83 Großstädte importiert** – 13.463 Standorte, 33.209 Stellplätze, davon 16 Städte amtlich
- [x] 2d.8 **Fünf Städte mit ungenutzter amtlicher Quelle untersucht** (2026-10-09). Ergebnis: bei keiner liegt es am Importer.
  - **Kiel und Krefeld haben überhaupt keine Behindertenparkplatz-Daten.** Ihre Treffer waren „Bewohnerparken Kiel" und „Bewohnerparken Krefeld" – Anwohnerparken, dieselbe Verwechslung wie bei Aachen. Dass der Importer sie ablehnt, ist richtig; OpenStreetMap ist dort die korrekte Quelle.
  - **Bochum, Bielefeld und Karlsruhe haben echte Datensätze, aber tote Links.** Bochums ArcGIS-Dienst existiert nicht mehr (der Server listet 58 Dienste, keiner davon passt), die Dateien auf `bochum.opendata.ruhr` antworten mit 403 auch mit Referer. Karlsruhes Dienstpfad liefert 404. Bielefelds Portal war nicht erreichbar.
  - **Die eigentliche Erkenntnis:** GovData verweist auf Dienste, die es nicht mehr gibt. Das trifft die monatliche Aktualitätsprüfung (4.4) – sie muss auch tote Links melden, nicht nur geänderte Datumsangaben.

### 2e. Ganz Deutschland

- [~] 2e.7 **Landesweite Overpass-Läufe – gebaut, erprobt und wieder zurückgenommen** (2026-10-10, `npm run import:osm-state`). Zwei Abfragen je Bundesland statt 10.956. Der Lauf funktioniert, **die Zuordnung der Treffer zu Gemeinden ist aber nicht gut genug**, und die damit erzeugten Daten wurden deshalb verworfen. Die Begründung steht in [ToDos.md](ToDos.md) unter 2e.7; was hier steht, ist der erledigte Teil.
  - Die Zuordnung der Treffer zu Gemeinden geschieht lokal: erst das umschließende Rechteck der Gemeindegrenze, dann die Entfernung zur Mitte (`assign.mts`, fünf Tests).
  - **Drei Fehler, die erst der Probelauf an echten Daten gezeigt hat:**
    - `out bb center tags` liefert von beiden Geometrieangaben nur eine. Die erste Fassung verlangte Rechteck **und** Mitte, bekam nur die Mitte – und verwarf daraufhin alle 52 Gemeinden des Saarlands, **ohne einen Fehler zu melden**. Jetzt `out bb tags`, Mitte aus dem Rechteck gerechnet.
    - Der Slug wurde aus dem OSM-Namen gebildet statt aus dem Register. Da `toSlug` Zusätze streicht, fielen „Weil am Rhein" und „Weil im Schönbuch" beide auf „weil" – und weil nur eine davon im Register steht, galt der Treffer als eindeutig. Ergebnis: eine Datei mit Parkplätzen aus beiden Orten, **157 km auseinander**. Zugeordnet wird jetzt über den amtlichen Gemeindeschlüssel, ersatzweise über den vollständigen Namen.
    - Der Zähler „unsicher zugeordnet" zählte auch Treffer, die danach ohnehin verworfen werden – und meldete 1.503 statt 414. Eine Warnung, die dreimal zu groß ist, ist wertlos.
  - **Gefunden wurden sie durch eine Streuungsprüfung**, nicht durch Hinsehen: Liegen die Parkplätze einer Gemeinde mehr als 15 km auseinander, stimmt die Zuordnung nicht. Fünf von 122 Gemeinden fielen damit auf; nach der Korrektur keine einzige, Median 3,2 km.
  - **Vorhandene Daten werden nicht überschrieben.** Für Saarbrücken liefert der landesweite Lauf 150 Standorte, der Einzelimport 157 – rund 4,5 % weniger, weil dieser an der echten Gemeindegrenze schneidet und jener am Rechteck. Der landesweite Lauf ist für **Breite** da, nicht für Genauigkeit.
- [x] 2e.2 / 2e.3 **Landesportale ausgewertet – und dort gefunden, was GovData nicht hat** (2026-10-10, `npm run import:regional`). Die Suche auf Open.NRW und MobiData BW bestätigt, was 2e.2 vermutet hatte: GovData spiegelt die Landesportale nicht vollständig.
  - **Der Fund: der Datensatz der TechnologieRegion Karlsruhe** – 694 Standorte in 15 Gemeinden, mit Adresse, Stellplatzzahl, Zeitbeschränkung **und Höchstparkdauer**, unter CC BY 4.0. Er steht auf MobiData BW und taucht bei GovData nicht auf. Davon sind 534 in Deutschland (das Elsass wird übersprungen).
  - **Er erschließt neun Gemeinden, die für das Register zu klein sind** (Bruchsal, Stutensee, Ettlingen, Rheinstetten, Bretten, Germersheim, Gaggenau, Waghäusel, Landau). Genau das war die Vermutung hinter 2e.1, die über GovData nicht zu belegen war. Sie werden jetzt unabhängig von der Einwohnerzahl aufgenommen – wo eine Gemeinde ihre Daten selbst veröffentlicht, ist das die bessere Quelle.
  - **Karlsruhe und Baden-Baden wurden bewusst nicht überschrieben.** Der amtliche Datensatz führt für Karlsruhe 224 Standorte, OpenStreetMap aber 330: Die Stadt listet ihre eigenen Stellplätze im Straßenraum, OSM auch die an Kliniken, Märkten und Bahnhöfen. Beides ist richtig; das Überschreiben hätte ein Drittel vernichtet. Dieselbe Lehre wie bei Rostock (3.9b), nur andersherum – nicht die Herkunft entscheidet, sondern was in den Daten steht.
  - **Zwei Fehler beim Bauen gefunden und behoben:** Die Anschrift steht mal im Ortsfeld, mal in der Bemerkung („Ärztehaus" / „Franz-Sigel-Str. 83"); und „Bahnhof" wäre beinahe als Straßenname eingetragen worden, was jede spätere Nachbesserung blockiert hätte – derselbe Mechanismus wie bei 3.0f.
  - Ergebnis: **24 statt 14 Städte aus amtlicher Quelle.**
- [x] 2e.1 **Gemeinden mit amtlichen Daten gesucht – über alle Größen hinweg** (2026-10-10, `npm run sources:amtlich`). Bericht: [data/\_amtliche-quellen.md](data/_amtliche-quellen.md). Einschränkung, die man kennen muss: Gesucht wurde mit **strengen** Begriffen – die breiten aus `sources:scan` („Parken", „Parkplätze") würden bei 10.956 Gemeinden zufällig auf falsche Namen passen. Ein Datensatz, der im Titel weder Parken noch Behinderung nennt, bleibt dadurch unentdeckt. Die Annahme war, dass kleine Gemeinden mit guten Daten übergangen werden, weil der Import sich nach der Einwohnerzahl richtet; sie wäre die billigste Ausweitung gewesen. **Das Ergebnis widerlegt sie:** Von 23 einschlägigen GovData-Datensätzen gehören alle 14 zuordenbaren zu bereits erfassten Städten. Unterhalb von 50.000 Einwohnern veröffentlicht dort niemand. Ein negatives Ergebnis, aber ein brauchbares – es lenkt die Arbeit auf 2e.2 und 2e.3, wo tatsächlich etwas zu holen ist.
- [x] 2e.0 **Abdeckung messbar gemacht** (2026-10-10, `npm run report:abdeckung` → `data/_abdeckung.md`). Gemessen wird **zweifach**, weil beide Zahlen Verschiedenes sagen und keine allein ehrlich ist:
  - **195 von 10.956 Gemeinden = 1,8 %** – die Antwort auf „sind wir fertig".
  - **34,6 von 83,6 Millionen Einwohnern = 41,4 %** – die Antwort auf „wie vielen Menschen nützt es schon".
  - Dazu die Aufschlüsselung nach Bundesland (Nordrhein-Westfalen 57 % der Einwohner, Brandenburg 16 %) und was die nächsten Stufen brächten: ab 20.000 Einwohnern wären es 60 % der Bevölkerung, ab 10.000 bereits 75 %.
  - **Beim Bauen einen Zählfehler gefunden:** Die erste Fassung ordnete den Importstand über den Gemeindenamen zu – und Gemeindenamen sind in Deutschland nicht eindeutig. Dadurch fehlten 1,4 Millionen Einwohner, ohne dass es auffiel. Maßgeblich ist jetzt die Zahl aus dem Importstand selbst.
- [x] 2e.4 **Gemeinderegister aus dem amtlichen Verzeichnis** (2026-10-10, `npm run import:gemeinden`). Statt einer handgetippten Städteliste liest das Projekt jetzt das amtliche Verzeichnis des Bundesamts für Kartographie und Geodäsie: **10.956 Gemeinden, 83.577.140 Einwohner** – die Summe stimmt auf die Person mit der amtlichen Einwohnerzahl Deutschlands überein.
  - **Der Abgleich hat sofort 13 fehlende Gemeinden über 50.000 Einwohnern gefunden**, darunter Wilhelmshaven mit 75.745. Genau so verschwindet eine Stadt unbemerkt aus einer handgepflegten Liste. Umgekehrt lagen fünf Städte, die ich aufgenommen hatte, knapp unter der Grenze – ihre Daten bleiben, schaden aber nicht.
  - **BKG statt Destatis**, weil die Downloadseite des Statistischen Bundesamts keine Lizenz nennt. Die BKG-Daten stehen unter der Datenlizenz Deutschland – Namensnennung 2.0; die beigelegten Nutzungsbedingungen wurden gelesen, nicht nur die Produktseite, und der vorgeschriebene Quellenvermerk steht im Skript.
  - **Ohne neue Abhängigkeit.** Die Daten kommen als ZIP, darin eine `.xlsx` – die ihrerseits ein ZIP ist. Für ein Skript, das einmal im Jahr läuft, wären zwei Bibliotheken mit eigener Pflegegeschichte ein schlechtes Geschäft; stattdessen ein schlanker Leser für beides (`zip.mts`, `xlsx.mts`), der nur den Lesepfad kann und alles andere ehrlich ablehnt. Sieben Tests dafür bauen das ZIP im Test selbst, statt dieselbe Bibliothek zum Schreiben und Prüfen zu nehmen.
  - **Die Einwohnergrenze ist jetzt eine Zahl** (`MIN_POPULATION`): 50.000 ergibt 195 Gemeinden, 20.000 ergibt 706, 10.000 ergibt 1.598. Damit ist 2e.5 nur noch eine Entscheidung, keine Tipparbeit.
  - **Die Quellenwahl, zum Nachschlagen beim nächsten Jahrgang:**
    - **Genommen: BKG, „Verwaltungsgebiete 1:250 000 mit Einwohnerzahlen" (VG250-EW).** Alle Gemeinden mit amtlichem Schlüssel, Name, Einwohnerzahl, Fläche und Geometrie. Lizenz Datenlizenz Deutschland – Namensnennung 2.0. Fertige Excel-Fassung, rund 7 MB, keine Geometrie nötig: `https://daten.gdz.bkg.bund.de/produkte/vg/vg250-ew_ebenen_1231/aktuell/vg250-ew_12-31.ee.excel.ebenen.zip`. Das Verzeichnis `.../aktuell/` zeigt immer auf den neuesten Stand; daneben liegen Shape- und GeoPackage-Fassungen mit 64–69 MB (die wären für 2e.7 interessant).
    - **Nicht genommen: das Gemeindeverzeichnis GV100AD von Destatis.** Inhaltlich dasselbe, aber die Downloadseite nennt **keine Lizenz**. Eine ungeklärte Lizenz ist ein Ausschlussgrund, solange es eine klar lizenzierte Alternative gibt. Das Format (feste Spaltenbreiten) wäre außerdem unbequemer.
    - Die Gemeindegeometrie wird aus dieser Quelle nicht gebraucht: Der OSM-Importer holt die Grenzrelation über Nominatim. Aus VG250-EW genügen Schlüssel, Name, Bundesland, Einwohnerzahl.
  - **`npm run check:slugs` schützt die vorhandenen Daten.** Der Slug steckt im Dateinamen _und_ in jeder Parkplatz-ID; ändert ihn das amtliche Verzeichnis durch eine andere Schreibweise („Oldenburg (Oldb)"), verwaist die Seed-Datei lautlos. Die Prüfung meldet das, und eine Ausnahmetabelle hält die gewachsenen Schreibweisen fest.
- [x] 2e.5 **Stufe „ab 50.000 Einwohnern" abgeschlossen** (2026-10-09). Register von 83 auf **187 Städte** erweitert (104 neue, darunter Hanau mit 100.800 Einwohnern – als Großstadt eine echte Lücke). Alle 187 geprüft: 185 mit Treffer, 2 ohne. Zwei neue amtliche Quellen: Norderstedt und Viersen. Ergebnis: 17.215 Standorte, 28.865 Stellplätze.
- [x] 2e.9 **Gemeinden ohne Treffer getrennt festhalten** (2026-10-09). Neuer Zustand `leer` in `scripts/import/status.mts`: Die Abfrage lief sauber durch und war leer. Vorher galten solche Gemeinden als `fertig` mit 0 Standorten – ununterscheidbar von einem echten Import und in der Übersicht nicht zählbar.
  - `--rest` nimmt nur Gemeinden im Zustand `offen`; eine geprüfte leere Gemeinde wird damit **nicht erneut abgefragt**. Genau darum ging es: Bei tausenden Gemeinden wäre das ein Missbrauch von Overpass.
  - Der Altbestand wird beim Laden migriert (`migrateState`), damit alte und neue Läufe dieselbe Aussage tragen.
  - `data/_import-status.md` weist jetzt getrennt aus: geprüft (mit Prozentsatz), davon mit Treffer, davon geprüft ohne Treffer, noch nicht geprüft.
  - Bewährte sich sofort: Regensburg und Bad Kreuznach sind seither als „geprüft, nichts gefunden" vermerkt statt als Rätsel.

---

## 3. Datenvalidierung

- [x] 3.0 **Der größte Qualitätsmangel im Bestand: 61 % aller Standorte ohne Straßennamen** (8.209 von 13.380). In Nürnberg hießen 473 von 487 Einträgen wörtlich „Behindertenparkplatz Nürnberg". Ursache: OpenStreetMap-Objekte tragen selten ein `addr:street`. Behoben in mehreren Schritten:
  - [x] 3.0a **Von 61 % auf 1 %** (89 von 13.463). 42 % der Standorte haben jetzt zusätzlich eine Hausnummer. Nürnberg hat statt 15 nun 279 verschiedene Bezeichnungen.
  - [x] 3.0b **Über OpenStreetMap statt über Nominatim gelöst** (`npm run import:streets`): eine Overpass-Abfrage je Stadt für alle benannten Straßen, dann lokal die nächstgelegene zuordnen – über ein Raster, sonst wären es Millionen Abstandsberechnungen. Statt 8.200 Einzelabfragen an einen freien Geocoder sind es rund 140 Abfragen, und der Lauf dauert Minuten statt Stunden.
  - [x] 3.0c `npm run import:addresses` (Nominatim, eine Anfrage je Standort) bleibt als Rückfallebene für Städte, in denen OpenStreetMap keine Straßen führt
  - [x] 3.0d **Die letzten Lücken geschlossen.** Von 89 verbliebenen Standorten bekamen 84 über die Rückwärtssuche einen Namen. Es bleiben **5**, und die tragen aussagekräftige Namen aus OpenStreetMap („IKEA", „Tiefgarage Klinikum", „Wanderparkplatz Tiergarten"); eine Straße wäre dort keine Verbesserung.
  - [x] 3.0e **Straßennummern als Namen behoben.** Betroffen waren 11 Standorte („A 9", „B 10", „L 534"). Autobahnen und Kraftfahrstraßen kommen als Namensgeber nicht mehr in Frage – dort gibt es keine Behindertenstellplätze –, und eine Straße mit richtigem Namen hat Vorrang vor einer nummerierten, auch wenn die etwas näher liegt.
  - [x] 3.0f **Datenfehler behoben: Platzhalter im Straßenfeld.** Bei 36 Standorten stand „Behindertenparkplatz Dresden" als _Straßenname_ – der Platzhalter war durch die Adress-Aufspaltung gelaufen. Dadurch galten sie als versorgt und wurden von jeder Nachbesserung übersprungen.
- [x] 3.0h **Straßennamen für die 104 neu importierten Städte nachgetragen** (2026-10-10). Nach dem Import standen wieder **3.658 Standorte (21 %) ohne Straßennamen** da – genau der Mangel, den 3.0 für die ersten 84 Städte behoben hatte, weil `import:streets` nicht Teil der Importanleitung war. Der Lauf ergänzte **1.347 Straßennamen, davon 497 mit Hausnummer**; es bleiben 66 Standorte (0 %), die aussagekräftige Namen aus OpenStreetMap tragen. Die Validierung fiel von **106 Städten mit Befund auf 8**. Damit der Fehler nicht wiederkehrt, ist der Schritt jetzt in [Datenpflege.md](Datenpflege.md) als Schritt 5 festgeschrieben.
- [x] 3.9a / 3.9b **Rostock: amtliche Quelle war der falsche Datensatz** (2026-10-10). Die Quelle hieß „Rostocker Heide" und lieferte 5 Stellplätze für 210.000 Einwohner – 0,2 je 10.000 gegenüber 8 im Mittel. Ein Blick auf die URL erklärt alles: `rostocker_heide_parkplaetze.csv`, daneben Reit- und Wanderwege. Waldparkplätze, keine Behindertenstellplätze.
  - **Automatisiert statt einzeln behoben:** Der Importer prüft eine amtliche Quelle jetzt auf Plausibilität und überspringt sie, wenn sie weniger als ein Viertel des üblichen Bestands je Einwohner liefert. Der Grund wird im Importstand vermerkt, statt stillschweigend die schlechtere Quelle zu nehmen.
  - „Amtlich vor allem anderen" bleibt richtig – aber nur für Datensätze, die tatsächlich von Behindertenparkplätzen handeln. Ein Zwanzigstel des Üblichen ist kein dünn besetzter Datensatz mehr, sondern der falsche.
  - Ergebnis: Rostock hat **99 statt 5 Standorte** (218 statt 5 Stellplätze).
- [x] 3.6 **Kennzahlen je Stadt vergleichen** – Stellplätze je 10.000 Einwohner, als `checkDensity` in der Validierung. Der billigste Test überhaupt: Ausreißer nach unten zeigen eine Lücke in der Datenlage, nicht in der Wirklichkeit, und Hamburgs zunächst importierte 10 Standorte für 1,9 Millionen Einwohner wären sofort aufgefallen. Meldet derzeit drei Städte; die sind unter 2d.10 zu prüfen.
- [x] 3.8 Validierungslauf als eigenes Skript (`npm run validate`) mit Bericht je Stadt
- [x] 3.9 **Erste vollständige Prüfung durchgeführt** – sie hat vier echte Fehler gefunden, drei davon sofort behoben:
  - [x] **Aachen hatte den falschen Datensatz.** Importiert waren „Bewohnerparkzonen" – Anwohnerparken, nicht Behindertenparkplätze. Durchgerutscht, weil der Importer bei Diensten mit nur einer Ebene diese ungefragt nahm. Jetzt nur noch, wenn der Datensatz-Titel selbst von Behinderung handelt. Aachen hat jetzt 111 statt 28 Standorte.
  - [x] **Freiburg hatte 11.485 Stellplätze an 330 Standorten** – das 60-Fache des Üblichen. Die Zählung entfernte alle Nicht-Ziffern, aus „1.1.2012" wurde so 112012. Jetzt werden nur reine Zahlen bis 50 akzeptiert; Freiburg hat 334 Stellplätze.
  - [x] **„0 % von OpenStreetMap bestätigt" war irreführend**, wenn die Overpass-Abfrage gar nichts geliefert hatte. Ein nicht durchgeführter Abgleich wird jetzt als solcher ausgewiesen.

---

## 6. Karte und Standort

- [x] 6.1 Kartenkomponente mit OpenStreetMap-Tiles, Attribution sichtbar
- [x] 6.2 Marker für alle Parkplätze mit Clustering
- [x] 6.3 Browser-Geolocation mit Einwilligung, Standortmarker
- [x] 6.4 Zustände abgedeckt: verweigert, nicht verfügbar, Zeitüberschreitung – mit verständlichem Hinweis und Fallback auf die Stadtmitte
- [x] 6.5 Nächstgelegener Parkplatz wird berechnet, hervorgehoben und benannt
- [x] 6.6 Entfernungsformatierung in m und km, Aktualisierung bei Standortänderung
- [x] 6.8 **Beim Start auf den eigenen Standort zentrieren** statt auf den nächstgelegenen Parkplatz – die erste Frage beim Öffnen ist „wo bin ich"
- [x] 6.9 Knopf „zurück zu meinem Standort" (◎ in der Leiste über der Karte)
- [x] 6.10 **Navigationsleiste über der Karte:** nächster Parkplatz mit Entfernung und ein Knopf, der direkt die Navigation startet – ohne erst den richtigen Marker suchen zu müssen
- [x] 6.11 **Legende für die Markerfarben** (Fragezeichen unten rechts). Grün ist der nächstgelegene, Blau eine genaue Position, Rot eine nur ungefähre. Ohne Erklärung war besonders die dritte Farbe irreführend, obwohl sie die wichtigste Information trägt.

---

## 4. Datenaktualität

- [x] 4.2 **Takt festgelegt** – Änderungsprüfung monatlich, Neuimport bei gemeldeter Änderung, Vollimport halbjährlich, OpenStreetMap vierteljährlich (dort gibt es kein Änderungsdatum je Stadt, dafür wird laufend kartiert). Steht in [Datenpflege.md](Datenpflege.md) und ist in `sources:check` als `OSM_INTERVAL_DAYS` und `FULL_REIMPORT_DAYS` eingebaut.
- [x] 4.1 / 4.3 / 4.4 **Monatliche Aktualitätsprüfung gebaut** (2026-10-10, `npm run sources:check`). Fragt je Quelle nur nach dem Änderungsdatum und **lädt keine Parkplatzdaten**: GovData über `metadata_modified`, Dateien über `HTTP HEAD`, dazu die Ressourcen-URLs auf Erreichbarkeit. Schreibt `data/_aktualitaet.md` mit Befund je Stadt und den fertigen Befehlen für das, was neu zu importieren ist.
  - **4.3 anders gelöst als geplant:** Es braucht keinen mitgeführten Vergleichswert, weil das Datum der Quelle direkt mit dem **Importdatum** verglichen werden kann – ist die Quelle jünger, gibt es etwas Neues. Nur für Quellen, die bloß ein `ETag` liefern, merkt sich `data/_aktualitaet.json` den vorigen Wert.
  - **Tote Links werden gemeldet**, wie 2d.8 es verlangt hatte. Dabei fiel auf, dass `HTTP HEAD` dafür allein untauglich ist: Berlins WFS-Dienste antworten darauf mit 502, per GET aber einwandfrei. Ohne den zweiten Versuch hätte die Prüfung drei lebende Dienste als verschwunden gemeldet.
  - **Neuer Befund „amtliche Quelle ungenutzt":** acht Städte kommen aus OpenStreetMap, obwohl ihre amtliche Quelle antwortet – das ist 2d.8a, jetzt automatisch erkannt statt von Hand gesucht. Der Bericht sagt dazu, dass nicht jede davon ein Versäumnis ist: Bei Kiel, Krefeld und Aachen beschreiben die Datensätze Anwohnerparken, die Ablehnung ist richtig.
  - **Vorbehalt, der im Bericht steht:** `metadata_modified` meldet jede Änderung an den Metadaten, auch eine korrigierte Beschreibung. „Geändert" heißt „sieh nach", nicht „die Daten sind neu".
- [x] 4.6 **Importdatum je Stadt in der Oberfläche** (2026-10-10). „Daten vom 9. Oktober 2026" steht in der Quellenliste je Stadt und im Haftungshinweis der Detailansicht. Ohne diese Angabe hält jede:r die Daten für aktuell – bei einer Quelle, die halbjährlich nachgeführt wird, ist das eine stille Falschaussage.

---

## 2d / 3. Import und Validierung (Fortsetzung)

- [x] 2d.11 **Städtezuordnung geschärft** (2026-10-10). „Frankfurt (Oder)" bekam den Datensatz von „Frankfurt am Main", weil `matches()` beide auf „frankfurt" verkürzte. Jetzt wird erkannt, welche Kernnamen im Register mehrfach vorkommen; bei denen muss zusätzlich der Zusatz („Oder") oder das Bundesland vorkommen. Lässt sich keine der beiden Städte eindeutig zuordnen, bekommt **keine** den Datensatz – lieber OpenStreetMap als die Daten der falschen Stadt. Der erneute Quellenlauf bestätigte es: 24 → 23 amtliche Quellen, genau die eine falsche weniger. Sieben Tests halten das fest.
- [x] 3.0g **„Behindertenparkplatz"-Präfix entfernt** (2026-10-10). Gelsenkirchen stellt es jedem Eintrag voran; in einer App voller Behindertenparkplätze ist das eine Zeile für nichts. Entfernt wird nur für die Anzeige und nur, wenn danach ein echter Name steht – `label` bleibt laut Datenmodell der unveränderte Text der Quelle. Dabei wurde die dreifach kopierte Namenslogik zu `src/lib/parking/display.ts` zusammengeführt.
- [x] 3.5 **Doppelte Einträge zusammengeführt** (2026-10-10, `npm run data:dedupe`). **Der Befund war wichtiger als die Behebung:** Die Validierung meldete 4.460 „mögliche Dubletten" unter 10 m. Die Abstände zeigen, dass das weit überwiegend keine sind:

  | Abstand   | Paare | Deutung                                 |
  | --------- | ----: | --------------------------------------- |
  | 0 m       |    26 | dasselbe Objekt                         |
  | unter 1 m |    40 | dasselbe Objekt                         |
  | 1–3 m     |   480 | unklar                                  |
  | 3–10 m    | 3.914 | benachbarte, real getrennte Stellplätze |

  Eine markierte Bucht ist rund 3,5 m breit – pauschales Zusammenführen hätte tausende echte Stellplätze vernichtet, und zwar dort, wo es viele gibt: an Krankenhäusern und Bahnhöfen. Zusammengeführt wird deshalb nur unter 1,5 m **und** bei gleichem Namen: 103 Einträge in 41 Städten. Die Stellplatzzahl wird dabei **nicht addiert**, sondern als Maximum genommen – addieren hieße, dieselben Plätze doppelt zu zählen.

- [x] **Fehlalarm der Validierung abgestellt** (2026-10-10). Zwei Prüfungen meldeten Dinge, die keine Fehler sind:
  - „Mögliche Dubletten" für alles unter 10 m – jetzt getrennt in echte Dubletten (Verdacht) und „dicht beieinander" (bloßer Hinweis).
  - „Namen nicht unterscheidbar", sobald weniger verschiedene Namen als Standorte existierten. Seit die Standorte ihre Straßennamen tragen (3.0), ist das normal: In Göttingen teilen sich 419 Standorte 146 Straßen, weil eine Straße mehrere Stellplätze hat. Die Prüfung meldete dadurch 104 von 187 Städten rot. Jetzt schlägt sie an, wenn **ein einzelner Name** mehr als die Hälfte des Bestands trägt – also beim echten Platzhalter-Fehler.

  Beides derselbe Gedanke: Ein Bericht, der bei jeder zweiten Stadt Alarm schlägt, wird nicht mehr gelesen.

---

## 5. Datenmodell und Backend

- [x] 5.4 / 2e.8 / 6.7 **Parkplätze nach Kartenausschnitt laden statt alle in die Seite zu schreiben** (2026-10-10). Die Startseite trug sämtliche 17.112 Standorte im HTML: **6,3 MB**. Im Mobilfunknetz ist das kein Ladeverhalten, das man jemandem zumuten kann, der gerade einen Parkplatz sucht – und mit jeder weiteren Ausbaustufe wäre es schlimmer geworden.
  - Neue Route `GET /api/spots`: entweder `?bbox=minLng,minLat,maxLng,maxLat` für den Kartenausschnitt oder `?lat&lng` für die nächstgelegenen. Liest die Seed-Dateien serverseitig – **keine Datenbank nötig**, die Entscheidung D-02 blockiert das also nicht.
  - Die Karte meldet ihren Ausschnitt bei jeder Bewegung, der Rest wird nachgeladen; die Liste und die Navigationsleiste holen die nächstgelegenen Standorte. Beides gebremst, damit beim Ziehen nicht Dutzende Anfragen entstehen, und gegen identische Wiederholungen gesperrt.
  - **Ergebnis: 6.332 KB → 128 KB.** Der E2E-Durchlauf wurde dadurch von 45,8 s auf 4,5 s schneller.
  - Erreicht der Ausschnitt die Obergrenze, **sagt die Karte das**. Eine Karte, die stillschweigend die Hälfte verschweigt, ist schlimmer als eine, die zum Hineinzoomen auffordert – man verlässt sich sonst darauf, dass hier keiner ist.
  - Damit ist auch 6.7 erledigt (es wurden alle Marker erzeugt) und die Voraussetzung aus 2e.8 für die nächste Ausbaustufe geschaffen.
- [x] 5.8 **Caching** für die Parkplatz-Antworten (`max-age=300`, `stale-while-revalidate=86400`). Die Liste ändert sich selten; die Bewertungen, die sich häufig ändern, bekommen später eigene Endpunkte.

---

## 6. Karte und Standort (Fortsetzung)

- [x] 6.12 / 6.14 **Zieladresse eingeben und am Ziel parken** (2026-10-10). Die App beantwortete bisher nur „wo parke ich _hier_". Die häufigere Frage ist „wo parke ich _dort_, wo ich hinwill" – zum Arzttermin, zum Amt, zum Besuch –, und man will das **vor** der Abfahrt wissen.
  - Ortssuche über einen eigenen Endpunkt `/api/geocode`. Der Umweg über den Server hat einen Grund: Nominatims Nutzungsbedingungen verlangen eine aussagekräftige Kennung je Anfrage, und die kann ein Browser nicht setzen – der `User-Agent` gehört ihm. Die Antworten werden zwischengespeichert, und erst ab drei Zeichen und einer halben Sekunde Tippruhe wird überhaupt gefragt.
  - Ist ein Ziel gesetzt, rechnen Liste und Navigationsleiste **ab dem Ziel** statt ab dem eigenen Standort.
  - **Eigener Zielmarker** – ein Fähnchen in einer Farbe, die sonst nirgends vorkommt. Ein zweiter Parkplatz-Pin wäre gefährlich: Wer Ziel und Stellplatz verwechselt, fährt an die falsche Stelle.
  - **Umkreis-Auswahl 300 m / 500 m / 1 km.** Mit Ziel ist die Frage nicht „was ist am nächsten", sondern „was ist nah genug". 500 m als Vorgabe – etwa fünf Gehminuten, und für jemanden mit Gehbehinderung schon eine Entscheidung wert. Liegt im Umkreis nichts, wird trotzdem der nächstgelegene genannt statt einer leeren Liste.
  - Zuletzt gesuchte Ziele bleiben im Browser gespeichert – wiederkehrende Fahrten sind der Normalfall.
  - **Beim Prüfen im Browser gefunden und behoben:** Die Zielzeile saß zunächst am unteren Kartenrand und verdeckte dort die OpenStreetMap-Attribution. Das ist kein Schönheitsfehler, sondern ein Lizenzverstoß – die ODbL verlangt die sichtbare Namensnennung. Jetzt stehen Leiste und Zielzeile gemeinsam oben.
  - Drei E2E-Tests sichern das ab; die Ortssuche wird darin abgefangen, damit nicht jeder Testlauf einen fremden, kostenlos betriebenen Dienst befragt.
- [x] 6.13 / 6.15 **Navigationsleiste schließbar** (2026-10-10). Ein × gibt die Karte frei; danach bleibt eine schmale Zeile mit der Entfernung zum nächsten Parkplatz und dem ◎-Knopf, über die sich der Vorschlag zurückholen lässt. Der Zustand gilt **nur für die Sitzung** – beim nächsten Öffnen ist der Vorschlag wieder die wahrscheinlich hilfreichste Anzeige. Damit erledigt sich auch 6.13 (die Leiste verdeckte ein Fünftel der Karte): Ein Schließen-Knopf löst das eindeutiger als ein Einklappen beim Scrollen, weil die Karte gar nicht scrollt.
- [x] 6.16 **Kurze Auswahl naher Parkplätze statt nur des nächsten** (2026-10-10). Die Leiste bietet die fünf nächstgelegenen zur Auswahl; je Eintrag Adresse, Entfernung, Stellplätze und – falls sie gerade greift – die Zeitbeschränkung. Die Auswahl setzt das Navigationsziel, der Knopf „Navigation starten" bleibt. Auf der Karte werden die angebotenen Parkplätze gemeinsam grün hervorgehoben, das gewählte Ziel größer. Grund: Der nächstgelegene Platz kann belegt sein; wer die Alternativen kennt, fährt nicht zweimal.

---

## 7. Parkplatzdetails und Navigation

- [x] 7.1 Detailansicht beim Markerklick, auf dem Smartphone als Bottom-Sheet
- [x] 7.2 Anzeige: Adresse, Stadtteil, Anzahl Stellplätze, Zeitbeschränkung, Entfernung
- [x] 7.3 „In Karten-App öffnen" mit Plattformerkennung – Apple Karten auf iOS, sonst Google Maps
- [x] 7.4 **Teilen-Funktion.** Auf dem Smartphone über das System-Teilen, sonst Link in die Zwischenablage. Geteilt wird ein OpenStreetMap-Link auf die Koordinate – der funktioniert überall und braucht keine App. Nützlicher als es klingt: Wer abgeholt wird oder jemanden begleitet, muss den Treffpunkt mitteilen können.
- [x] 7.5 **Zeitbeschränkungen gedeutet statt nur angezeigt** (`src/lib/opening-hours.ts`)
  - **801 Angaben waren gar keine Beschränkung** – „24/7", „von 00:00 Uhr bis 24:00 Uhr". Als „Nur: 24/7" gelesen wirkten sie wie eine Einschränkung. Sie werden jetzt ausgeblendet; es bleiben 394 echte.
  - Davon versteht die App 83 % sicher und sagt in der Detailansicht, ob die Beschränkung **gerade gilt** oder **gerade nicht**.
  - Wo die Angabe nicht zweifelsfrei deutbar ist, steht bewusst nichts. Eine falsch verstandene Zeitangabe ist schlimmer als keine: Wer glaubt, der Platz sei frei, und ein Knöllchen bekommt, ist schlechter dran als jemand, der selbst nachsieht.
- [x] 7.7 **Zeitangaben: von 82 % auf 93 % sicher gedeutet** (2026-10-10). Alle geprüften Formen stammen aus `npm run report:times`, also aus echten Einträgen:
  - **Feiertagsangaben verwarfen bisher den ganzen Abschnitt.** `Mo-Fr,PH 08:00-18:00` fiel komplett durch, weil der Parser bei „PH" abbrach – die Uhrzeit ging mit verloren. Jetzt wird nur die Feiertagsangabe übersprungen.
  - **Über Mitternacht.** `Fr 06:00-02:00` wird in zwei Fenster geteilt, und der Teil nach Mitternacht landet auf dem **Folgetag** – sonst läge er zwölf Stunden daneben.
  - **„Immer offen" wird jetzt errechnet statt aufgezählt.** Decken die ausgewerteten Fenster alle sieben Tage rund um die Uhr ab, gilt die Angabe als keine Beschränkung. Damit sind auch `PH,Mo-Su 00:00-24:00`, `Mo-Su,PH 00:00+` und `Mo-Su,PH 00:00-00:00` erfasst, ohne für jede Schreibweise ein eigenes Muster zu pflegen. Zehn weitere Angaben verschwinden dadurch aus der Oberfläche, die nie eine Einschränkung waren.
  - **Mehrere Spannen je Abschnitt** (`We 00:00-07:00, 13:00-24:00`) und **„und" als Trenner** (`Mo-Fr 7-12 Uhr und Di 14-18 Uhr`).
  - **Schreibfehler der Quellen geglättet:** `Mo bis Fr`, `8 . 18 Uhr`, `8- - 18 Uhr`.
  - **Höchstparkdauer von Zeitfenster getrennt.** „2 Stunden" sagt, wie lange man stehen darf, „Mo-Fr 8-18 Uhr", wann die Regel gilt. Unter derselben Beschriftung „Nur" gelesen waren sie verwechselbar – und wer eine Höchstparkdauer für eine Öffnungszeit hält, bekommt ein Knöllchen. Die Detailansicht beschriftet sie jetzt getrennt.
- [x] 7.6 **Hinweis auch in der Liste** – „Beschränkung gilt jetzt" steht neben dem Eintrag, dafür muss man die Details nicht öffnen
- [x] 7.8 **Feedback- und Fehlermeldeknopf.** Öffnet eine vorbereitete E-Mail mit dem Betreff „Wheelee Fehlermeldung", vorausgefüllt mit Gerät, Browser und – falls die Detailansicht offen war – dem betroffenen Parkplatz samt ID. Der Standort wird **nicht** mitgeschickt. Die Empfängeradresse steht als einzelne Konstante in `src/lib/feedback.ts` und ist noch offen (D-06); bis dahin sagt der Knopf das sichtbar, statt ins Leere zu schicken.

---

## 9. Darstellung und Bedienung

- [x] 9.1 **Dark Mode mit Umschalter** – dunkel ist Vorgabe, auch wenn das System hell steht
  - Drei Stellungen: Dunkel (Vorgabe), Hell, System
  - Auswahl in `localStorage`, überlebt das Neuladen
  - Ein Skript im `<head>` setzt `data-theme`, bevor die Seite gezeichnet wird – sonst blitzte sie kurz hell auf, was bei einer dunklen Vorgabe am meisten stört
  - `dark:` in Tailwind hört auf `data-theme` statt auf die Systemeinstellung
- [x] 9.2 **Kartenkacheln im Dunkelmodus abgedunkelt.** OpenStreetMap liefert nur helle Kacheln. Statt einen zweiten Anbieter mit eigener Lizenz einzubinden, kehrt ein CSS-Filter die Helligkeit um und dreht den Farbton zurück – Wasser bleibt blau, Grünflächen grün. Die Marker sind ausgenommen, ihre Farben tragen die Bedeutung.
- [x] 9.3 Tastaturbedienung und sichtbarer Fokus
- [x] 9.4 Screenreader: Marker haben Rolle und Namen, die Liste ist die Textalternative zur Karte
- [x] 9.5 Große Touch-Ziele (mindestens 44 px)
- [x] 9.6 `prefers-reduced-motion` wird beachtet
- [x] 9.1a **Eigene Einstellungsseite** (2026-10-10). Dritte Ansicht neben Karte und Liste (auf schmalen Displays ein Zahnrad), mit Darstellung, Karten-App und Fehlermeldung. Vorher hing der Dunkelmodus-Umschalter unten in der Parkplatzliste – erreichbar, aber nicht sein Platz.
- [x] 9.7 **Kontraste nach WCAG AA geprüft** (2026-10-10). Gemessen am echten Rendering in beiden Modi, nicht an einer Farbtabelle. Ergebnis: außerhalb der Karte **kein einziger Verstoß**. Ein echter Mangel fand sich auf der Karte: Die Cluster-Kreise von `leaflet.markercluster` sind hellgrün und halbdurchsichtig, mit der Schriftfarbe der Seite ergab das **1,73 : 1** – verlangt sind 4,5 : 1. Die Zahl darin sagt, wie viele Parkplätze sich dahinter verbergen, und war bei Sonnenlicht praktisch nicht zu lesen. Jetzt deckendes Blau mit weißer Schrift: **6,7 : 1**.
- [x] 9.8 **Schriftgrößen skalieren ohne Layoutbruch** (2026-10-10). Bei 200 % Schriftgröße auf 375 px ließ sich die Seite seitwärts schieben – störend genau dort, wo jemand die Vergrößerung braucht, weil der Text beim Lesen wegrutscht. Drei Ursachen: Überschrift und Ansichtswahl standen nebeneinander fest (jetzt `flex-wrap`), die Überschrift konnte nicht schrumpfen (`min-w-0`), und Leaflet setzt Kacheln über den Rand hinaus (`overflow-x: hidden` am Body). „Behindertenparkplätze" wird jetzt per `hyphens-auto` getrennt statt abgeschnitten.

---

## 10. Datenschutz und Recht

- [x] 10.1 Standort wird nur im Browser verarbeitet und nicht gespeichert
- [x] 10.5 **Haftungshinweis sichtbar formuliert** (2026-10-10, `src/components/DataDisclaimer.tsx`). Zweimal, an den Stellen, wo er zählt: ausführlich oben in der Listenansicht („Bitte vor der Fahrt lesen … vor Ort gilt die Beschilderung"), und knapp in der Detailansicht direkt unter dem Navigationsknopf, zusammen mit dem Stand der Daten. Bewusst nüchtern: Eine Warnung, die wie eine Rechtsfloskel klingt, wird überlesen; eine, die Angst macht, entwertet die App.
- [x] **Lizenzangabe je Stadt im Datenmodell** (2026-10-10, Teil von 2a.5/10.3). `license` ist ein eigenes Feld statt eingebettet im Freitext; `src/lib/parking/license.ts` zerlegt ältere Angaben und unterscheidet dabei eine fehlende Lizenz von einer Lizenz namens „nicht angegeben". Die Oberfläche benennt die Lücke offen, statt sie zu verschweigen.

---

## 12. Qualität und Deployment

- [x] 12.1 Unit-Tests: Parser, Adress-Aufspaltung, Distanzberechnung, Karten-App-Links, Theme, Zeitangaben
- [x] 12.2 **Tests für die Importkette** – 25 Tests zu UTM-Umrechnung, Zonenerkennung aus `srsName`, Koordinatenableitung, Feldzuordnung, GML-Parser und CSV-Leser. Alle geprüften Fälle stammen aus echten Quellen, nicht aus Erfundenem; darunter der Dresden-Fehler, der belegt, dass die falsche Zone ein plausibel aussehendes Ergebnis liefert.
- [x] 12.8 / 12.9 **Offline-Fähigkeit und Service Worker** (2026-10-10, `public/sw.js`). Zweck ist nicht „offline arbeiten", sondern **nicht dazustehen, wenn das Netz wegbricht** – im Parkhaus, in der Tiefgarage, im Funkloch kurz vor dem Ziel. Wer dort eine weiße Seite sieht, ist schlechter dran als mit einem Zettel.
  - Drei Regeln: Programmdateien mit Hash im Namen aus dem Zwischenspeicher, Seite und Parkplatzdaten zuerst aus dem Netz mit Rückfall auf den Speicher, Kartenkacheln zuerst aus dem Speicher (auf 300 begrenzt).
  - **Ein sichtbarer Hinweis gehört dazu:** „Kein Netz – angezeigt wird der zuletzt geladene Stand." Eine App, die offline stillschweigend alte Daten zeigt, ist gefährlicher als eine, die sagt, dass sie gerade nichts Neues weiß.
  - Der Standort wird **nicht** zwischengespeichert – er entsteht im Browser und verlässt das Gerät nicht.
  - Angemeldet nur im Produktionsbetrieb; im Entwicklungsbetrieb würde er die eigenen Änderungen zwischenspeichern. Geprüft mit einem eigenen E2E-Test gegen den Produktionsbuild: Nach `setOffline` und Neuladen steht die App samt Hinweis.
- [x] 12.3 **E2E-Smoke-Test** (2026-10-10, Playwright, `npm run test:e2e`). Fünf Tests im Telefonformat: Karte mit Attribution und Markern, Liste mit Haftungshinweis, Detailansicht mit Fokussprung und Escape, Navigationsleiste mit Auswahl und Schließen, gemerkte Karten-App. Bewusst flach – ein Smoke-Test, der bei jeder Textänderung umfällt, wird abgeschaltet statt repariert.
  - Er hat sich sofort bezahlt gemacht: Er fand eine Beschädigung aller Umlaute in zwei Komponenten, die `typecheck`, `lint` und 148 Unit-Tests anstandslos passiert hatte. Ursache war eine Umschreibung per PowerShell, die UTF-8 als Windows-1252 las.
- [x] 11.3 **Bevorzugte Karten-App wählbar** (2026-10-10). Auswahl aus Google Maps, Apple Karten, OpenStreetMap, HERE WeGo, Waze und der Standard-App des Geräts; „Automatisch" bleibt die Vorgabe und rät wie bisher nach Gerät. Gespeichert im Browser – welche Karten-App jemand nutzt, ist nichts, wofür man sich anmelden sollte. Offen bleibt nur die geräteübergreifende Speicherung, die ein Benutzerkonto voraussetzt.
- [x] 12.7 **PWA-Grundlagen.** Manifest unter `/manifest.webmanifest`, eigenes Symbol (Kartenmarker mit Rollstuhl) als SVG, daraus erzeugte PNGs in 192 und 512 sowie ein maskable Symbol mit Rand, damit Android es beschneiden kann, ohne das Motiv anzuschneiden. `npm run icons` erzeugt sie neu.

---

## 14. Befunde des Zwischentests (2026-10-09)

Ein Durchgang durch den damaligen Stand, mobil (375 × 812), in hellem und
dunklem Modus. **Was funktionierte:** Karte mit Clustering und sichtbarer
Attribution; alle drei Wege der Standortbestimmung (abgelehnt, erneut
versucht, erteilt); Detailansicht mit Fokussprung und Escape; korrekte
Karten-App-Links; 102 fokussierbare Elemente, keines ohne Namen, kein
Touch-Ziel unter 44 px, kein horizontales Scrollen.

Was dabei auffiel und behoben wurde:

- [x] 14.10 Dark-Mode-Umschalter ergänzt (siehe 9.1)
- [x] 14.11 „Stadtteil: Hamburg" behoben – das Feld heißt jetzt „Stadt", wenn die Quelle keinen Stadtteil nennt. Weglassen wäre falsch gewesen: Bei vielen Städten ist die Stadt eine nützliche Angabe, nur die Beschriftung war es nicht.
- [x] 14.12 „(nicht angegeben)" wird in der Oberfläche nicht mehr angezeigt. Die fehlende Lizenz bleibt ein Problem der Daten (2a.5), ist aber eine Verwaltungsnotiz und gehört in den Importbericht, nicht vor die Nutzer:innen.
