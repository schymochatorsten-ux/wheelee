# Erledigt – wheelee

Abgeschlossene Punkte, ausgelagert aus [ToDos.md](ToDos.md), damit dort nur
noch steht, was zu tun ist. Die Nummerierung bleibt die der ToDo-Liste – wer
in einem Commit oder einer Notiz „3.0b" liest, findet es hier wieder.

Diese Liste ist kein Änderungsprotokoll, sondern eine Begründungssammlung: Sie
hält fest, **warum** etwas so gelöst wurde. Mehrere Punkte beschreiben Fehler,
die wirklich passiert sind; sie stehen hier, damit niemand – auch kein
späterer Durchgang durch dieses Projekt – dieselbe Entscheidung noch einmal
anders trifft.

**Stand:** 112 Einträge auf oberster Ebene (111 `[x]` plus 2e.10 als `[~]`,
dessen gebauter Teil hier steht und dessen offener Rest in `ToDos.md` bleibt),
zuletzt ergänzt 2026-10-17. Gezählt werden die Einträge der obersten Ebene; die
Unterpunkte darunter sind Begründung, keine eigenen Aufgaben.

> **Am 2026-10-16 abgeglichen.** Die Abschnitte 11 (Benutzerkonten) und 17
> (Rückmeldungen) sowie D-02 standen hier vollständig, in
> [ToDos.md](ToDos.md) aber weiter als offen – die beiden Dateien
> widersprachen sich. Nachgeführt wurde deshalb `ToDos.md`; hier war nichts zu
> ergänzen. **Die Lehre, und sie steht nicht umsonst in
> [CLAUDE.md](CLAUDE.md):** Der Rückschnitt in `ToDos.md` gehört zur Aufgabe,
> nicht ans Ende der Sitzung. Fünf Tage lang hat die offene Liste Arbeit als
> ungetan geführt, die längst erledigt war – genau die Frage, die sie als
> einzige beantworten soll.

---

## 0. Entscheidungen

- [x] **D-01 Technologie-Stack bestätigt** (2026-10-08) – Next.js 15, TypeScript, Tailwind 4, Leaflet + OSM, Postgres, Vercel.
- [x] **D-04 Geocoding-Quelle** – Nominatim, 1 Anfrage/Sekunde, Antworten versioniert zwischengespeichert.
- [x] **D-02 Datenbank: SQLite in einem Docker-Volume** (entschieden 2026-10-11). Die Frage stand seit dem 2026-10-08 offen und blockierte die Abschnitte 5, 8, 11 und 17.

  **Nicht Supabase und nicht Neon**, obwohl beide in D-01 vorgemerkt waren. Dazwischen hat sich die Lage geändert: Die App läuft seit dem 2026-10-11 nicht auf Vercel, sondern auf dem eigenen NAS hinter einem Tailscale-Tunnel – **ohne Portfreigabe und ohne offenen Port am Heimanschluss** (siehe [wheelee-infrastruktur.md](wheelee-infrastruktur.md)). Eine Cloud-Datenbank hätte genau diese Eigenschaft aufgegeben, und zwar für ein paar tausend Zeilen. Das Infrastruktur-Briefing nennt „SQLite in einem Volume" dort ausdrücklich als Hausmuster.

  - **Ohne neue Abhängigkeit, wie schon bei 2e.4.** `node:sqlite` gehört seit Node 24 zum Standardumfang. `better-sqlite3` wäre eine native Abhängigkeit, für die das Alpine-Abbild erst Compiler und Python nachziehen müsste. Dafür steht das Abbild jetzt auf **Node 24 statt 22** – in Node 22 ist `node:sqlite` nur hinter einer Versuchsflagge zu haben, und eine Datenbank hinter einer Flagge ist keine Grundlage.
  - **Die Datei liegt nicht in `data/`.** Dort stehen die versionierten Seed-Dateien des Imports; eine Datei, die sich im Betrieb ändert, stünde dort bei jedem Importlauf im Weg und würde im Zweifel mitversioniert. Sie liegt unter `/app/var` im Container (ein benanntes Volume) und unter `.data/` in der Entwicklung.
  - **Das ändert die Natur eines Deploys, und das muss man wissen.** Bisher war jeder Neubau ein vollständiger Ersatz, der nichts verlieren konnte – die App hat nur gelesen. Jetzt gibt es Daten, die den Neubau überleben müssen. Der entsprechende Satz in `next.config.ts` („kein Volume gebraucht") war ab diesem Tag falsch und ist berichtigt.
  - **WAL ist nicht Feinschliff, sondern nötig.** Ohne ihn sperrt ein Schreibvorgang die ganze Datei; schon zwei gleichzeitige Anfragen – jemand schickt eine Meldung ab, während die Übersicht lädt – liefen in „database is locked".
  - **Migrationen über `PRAGMA user_version`**, nicht von Hand gepflegte Tabellen. Von Hand hieße: Das Schema auf dem NAS weicht von dem im Repository ab, und niemand merkt es, bis eine Abfrage auf eine Spalte zugreift, die dort nie angelegt wurde.

- [x] **D-06 E-Mail-Adresse für Fehlermeldungen: es gibt keine** (entschieden 2026-10-11, umgesetzt am selben Tag). Die Entscheidung stand seit dem Morgen fest, blieb aber in `ToDos.md` stehen, weil `src/lib/feedback.ts` noch den `mailto:`-Weg enthielt. **Mit 17.3 ist `FEEDBACK_EMAIL` entfallen**; die Begründung, warum E-Mail der falsche Weg war, steht dort.

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
- [x] 2d.10 **Auffällig niedrige Zahlen geprüft – und dabei falsche Daten gefunden** (2026-10-10). Der Punkt lautete „etwa Wuppertal mit 66 Standorten bei 359.000 Einwohnern". Aus der einen Stadt wurde eine Liste, und aus der Liste ein Befund.

  **Der Fund: Chemnitz zeigte Wohnmobilstellplätze als Behindertenparkplätze.** 13 Standorte aus dem amtlichen Datensatz „Parkplätze Wohnmobil" – mit Straßennamen, plausiblen Koordinaten, je drei Stellplätzen. Beim Draufschauen sah nichts falsch aus; auffällig war allein die Kennzahl: 2,3 Stellplätze je 10.000 Einwohner bei einem Median von 8,2. Nach dem Neuimport aus OpenStreetMap sind es **221 Standorte mit 337 Stellplätzen** – siebzehnmal so viel, und diesmal die richtigen.

  - **Warum es durchrutschte.** `isRelevant` in `scan-sources.mts` lässt einen Datensatz über Parken ohne Behindertenbezug zu, wenn er WFS oder ArcGIS anbietet. Die Ausnahme ist richtig und nötig – Frankfurts Datensatz heißt schlicht „WFS Parken in der Stadt Frankfurt am Main", und die Behindertenparkplätze sind eine Ebene darin. Sie war nur zu weit: „Parkplätze Wohnmobil" handelt ebenfalls von Parken und trägt ebenfalls einen Geodienst.
  - **Die Korrektur.** Nennt der **Titel** eine andere Zielgruppe – Wohnmobil, Reisebus, LKW, Fahrrad, Ladesäule, Anwohner, Taxi –, ist der Datensatz ausgeschlossen, bevor irgendeine Ausnahme greift. Geprüft wird nur der Titel, nicht die URLs: In einer Portal-URL steht oft der ganze Themenbaum einer Stadt. Vier Tests halten die Fälle fest, einer davon ausdrücklich die Frankfurter Ausnahme – sie darf nicht mitgerissen werden.
  - **Der Schutz existierte und verfehlte knapp.** `looksTooSmall` verwirft eine amtliche Quelle unter einem Viertel des Üblichen, also unter 2,0 je 10.000. Chemnitz lag bei 2,28. **Eine Schwelle, die um 0,28 danebenliegt, ist kein Schutz, sondern ein Gefühl von Schutz** – gefangen hat es erst der Vergleich über alle Städte. Die Schwelle wurde trotzdem nicht nachgezogen: Sie entscheidet automatisch über Verwerfen, und ohne Beleg daran zu drehen hieße, legitime dünne Datensätze zu verlieren. Die neue Titelprüfung trifft die Ursache statt des Symptoms.
  - **Tragweite geprüft, bevor gehandelt wurde.** Die korrigierte Regel wurde zunächst nur lesend auf den gespeicherten Bestand angewandt: sieben Städte verlieren Datensätze, sechs davon schadlos (Hamburg verliert Parkhäuser und Reisebusparkplätze, behält die „Behindertenstellplätze"; Aachen, Kiel und Krefeld verlieren Bewohnerparken, das laut 2d.8 ohnehin richtig abgelehnt wurde). **Nur Chemnitz verlor alles** – und das war der Fall, der falsch war.
  - **Neu erzeugt statt von Hand geändert.** `sources:scan` fragt GovData **einmal je Suchbegriff**, nicht je Stadt – ein vollständiger Neulauf kostet rund zehn Abfragen, nicht 209. Das war die Voraussetzung dafür, den erzeugten Zwischenstand sauber neu zu erzeugen, statt ihn zu bearbeiten.

  **Zum eigentlichen Anlass, der dünnen Datenlage:** `npm run validate` hat jetzt einen eigenen Abschnitt „Auffällig dünne Datenlage" mit allen Städten unter der halben Mediandichte – 49 Stück, Wuppertal darunter.
  - **Als eigene Liste, nicht als Befund je Stadt.** Ein Hinweis bei der Stadt wäre folgenlos geblieben: Der Bericht zeigt nur Städte, die mindestens einen Verdacht tragen. Er hätte im Code gestanden und niemand hätte ihn je gesehen – schlimmer als keine Prüfung.
  - **Die Schwelle ging von einem Viertel auf die Hälfte des Medians.** Vorher meldete die Prüfung 7 von 205 Städten; Wuppertal mit 48 % des Medians blieb unsichtbar, obwohl es den Punkt ausgelöst hat. Die Stufen sind verschieden laut: unter einem Viertel ist Verdacht, unter einem Zehntel Fehler, die Hälfte nur eine Rangliste. Eine Prüfung, die alles gleich laut meldet, wird abgeschaltet statt gelesen.
  - **Zwei Behauptungen im Bericht waren falsch und sind weg.** Er nannte den Median „Mittelwert" – das ist er nicht, er wird als Median gerechnet. Und er erklärte jeden niedrigen Wert mit „vermutlich eine lückenhafte Quelle, keine lückenhafte Stadt". Der Bestand stützt das nicht: Städte mit amtlicher Quelle liegen im Median bei 8,4, Städte aus OpenStreetMap bei 7,8 – praktisch gleichauf. Beide Vergleichswerte werden jetzt **gerechnet und nicht hingeschrieben**, sonst veralten sie still im nächsten Import und werden trotzdem geglaubt.

- [x] 2d.8 **Fünf Städte mit ungenutzter amtlicher Quelle untersucht** (2026-10-09). Ergebnis: bei keiner liegt es am Importer.
  - **Kiel und Krefeld haben überhaupt keine Behindertenparkplatz-Daten.** Ihre Treffer waren „Bewohnerparken Kiel" und „Bewohnerparken Krefeld" – Anwohnerparken, dieselbe Verwechslung wie bei Aachen. Dass der Importer sie ablehnt, ist richtig; OpenStreetMap ist dort die korrekte Quelle.
  - **Bochum, Bielefeld und Karlsruhe haben echte Datensätze, aber tote Links.** Bochums ArcGIS-Dienst existiert nicht mehr (der Server listet 58 Dienste, keiner davon passt), die Dateien auf `bochum.opendata.ruhr` antworten mit 403 auch mit Referer. Karlsruhes Dienstpfad liefert 404. Bielefelds Portal war nicht erreichbar.
  - **Die eigentliche Erkenntnis:** GovData verweist auf Dienste, die es nicht mehr gibt. Das trifft die monatliche Aktualitätsprüfung (4.4) – sie muss auch tote Links melden, nicht nur geänderte Datumsangaben.

### 2e. Ganz Deutschland

- [x] 2e.7 **Landesweite Overpass-Läufe – und die Zuordnung, die sie brauchbar macht** (2026-10-10 gebaut, 2026-10-11 richtiggestellt; `npm run import:osm-state`, `npm run import:grenzen`). Eine Abfrage je Bundesland statt 10.956, und die Zuordnung entscheidet jetzt die amtliche Grenzfläche.

  **Der Fehler, um den es ging.** Ohne Grenzgeometrie entschied das umschließende Rechteck und die Entfernung zur Rechteckmitte. In dicht besiedelten Gegenden überlappen diese Rechtecke stark, und dabei gewinnt **systematisch die kleinere Gemeinde**: Ihre Mitte liegt jedem Punkt im Überlappungsbereich näher. Herdecke (22.772 Einwohner) bekam so 109 Standorte bis hinauf nach Witten; 80 von 472 Gemeinden lagen über dem Dreifachen des Medians. Die Daten für 473 Gemeinden wurden deshalb wieder entfernt.

  - **Punkt-in-Fläche aus VG250-EW** – [`grenzen.mts`](scripts/import/grenzen.mts) mit [`shapefile.mts`](scripts/import/shapefile.mts). **Dieselbe Auslieferung wie das Gemeindeverzeichnis**, nur im Shape- statt im Excel-Format: gleicher Stand, gleicher AGS, gleiche Einwohnerzahlen. Register und Grenzen können deshalb nicht auseinanderlaufen – zwei Quellen für Namen und Grenzen wären eine Fehlerquelle, die niemandem auffällt. 10.956 Flächen, 1.908.150 Grenzpunkte, in 3,6 Sekunden gelesen.
  - **Das Shapefile und nicht das GeoPackage**, obwohl beide dasselbe enthalten: Ein GeoPackage ist eine SQLite-Datenbank; sie zu lesen heißt, Seitenverwaltung und B-Bäume nachzubauen oder eine Abhängigkeit aufzunehmen. Ein Shapefile ist eine Folge von Binärsätzen mit festen Feldlängen – dieselbe Größenordnung wie [`xlsx.mts`](scripts/import/xlsx.mts), das aus demselben Grund von Hand geschrieben ist. Dazu neun Tests, die das Format prüfen und nicht eine zweite Meinung darüber.
  - **Gerade-Ungerade über alle Ringe statt Umlaufrichtung.** Ein Shapefile unterscheidet Außengrenze und Loch nur daran, in welcher Richtung der Ring läuft. Das auszuwerten ist nicht nötig: Zählt man die Kreuzungen über alle Ringe, liegt ein Punkt in einem Loch hinter zwei Ringen und damit außen. Exklaven und vollständig umschlossene Gemeinden – in Deutschland der Normalfall – fallen mit demselben Zählwerk heraus. Eine Entscheidung weniger, die falsch ausgehen kann.
  - **Umgerechnet wird der Punkt, nicht die Grenze.** Die Flächen bleiben in UTM32, wie das Bundesamt sie liefert; `wgs84ToUtm` rechnet den abgefragten Parkplatz dorthin. Vier Millionen Grenzpunkte umzurechnen wäre nicht nur teuer, es würde die amtliche Geometrie auch um Zentimeter verschieben. Der Rundlauf ist auf 10 cm geprüft.
  - **Das Rechteck entscheidet nicht mehr, es sortiert vor.** Ein Gitter mit 10-km-Maschen reduziert 10.956 Flächen auf eine Handvoll Kandidaten je Punkt; erst das Polygon entscheidet. Genau so verschwindet der Herdecke-Fehler, ohne dass die Prüfung unbezahlbar wird.
  - **Prüfstein 1 – der Bestand ordnet sich selbst wieder zu:** 17.801 von 18.072 Standorten aus 209 Seed-Dateien landen in ihrer eigenen Gemeinde (98,5 %). Die 270 Abweichungen liegen an Stadtgrenzen (Augsburg → Stadtbergen, Bremerhaven → Bremen); einer liegt außerhalb jeder deutschen Gemeindefläche. Das sind keine Zuordnungsfehler des Tests, sondern Standorte, die der Einzelimport über die Grenze mitgenommen hat.
  - **Prüfstein 2 – Herdecke sammelt nicht mehr ein:** Von den 830 Standorten seiner Nachbarn (Witten, Hagen, Dortmund, Bochum) landet **kein einziger** in Herdecke; vorher waren es 109. Und Witten, aus dem sie kamen, erhält im landesweiten Lauf 235 Standorte – der Einzelimport mit echter Grenze (`map_to_area`) kommt auf 233. Zwei unabhängige Wege, 1 % Unterschied.
  - **Die Erwartung „Herdecke muss bei etwa 7 liegen" war falsch, und das ist ein Befund.** Gemessen sind 31 Standorte mit 62 Stellplätzen, also **27,2 je 10.000 Einwohner** statt 86. Das ist nicht der Median von 7,1 – aber die Nachbarschaft liegt genauso hoch: Witten 39,6, Hattingen 29,6, Bergisch Gladbach 27,6. Im mittleren Ruhrgebiet ist OpenStreetMap einfach dichter erfasst als im Bundesschnitt, und für Witten belegt der unabhängige Einzelimport dieselbe Zahl. **Die Kennzahl bleibt eine Warnung, kein Urteil** – sie findet den Zuordnungsfehler, aber sie weiß nicht, wo fleißig kartiert wird.
  - **Die Kennzahl steht jetzt im Probelauf**, nicht erst in `validate.mts`: Median und jede Gemeinde über dem Dreifachen, **vor** dem Schreiben. Der Herdecke-Fehler war nirgends zu sehen, bis 473 Gemeinden geschrieben waren.
  - **Zugeordnet wird gegen alle 10.754 Gemeinden, geschrieben nur für die an der Reihe.** Genau dort saß der blinde Fleck: Herdecke stand nie zur Einfuhr an, fehlte deshalb in jeder Auswertung – und sammelte währenddessen die Standorte seiner Nachbarn.
  - **Ein unvollständiger Lauf wird nicht mehr gespeichert.** Am 2026-10-11 lieferten unter Last 2 von 3 Teilabfragen nichts; übrig blieben **7 Objekte für ganz Nordrhein-Westfalen statt 14.025**. Die alte Fassung hätte daraus Seed-Dateien mit einem Standort geschrieben und die Gemeinden als „fertig" vermerkt – damit wären sie auf Dauer aus der Arbeitsliste gewesen. Ob die Antwort vollständig war, gehört seitdem zum Ergebnis von `fetchSpots`.
  - **Zwei Abfragen je Bundesland sind eine geworden**, weil die Gemeindegrenzen nicht mehr aus Overpass kommen. Und die Zuordnung zum Register läuft nur noch über den AGS: „Friedberg (Hessen)" und „Friedberg (Bayern)" bekamen zuvor dieselben 123 Standorte. `assign.mts` und `nameKey` sind damit entfallen – die Näherung, die sie ersetzen sollte, gibt es nicht mehr.
  - **Vorhandene Daten werden trotzdem nicht überschrieben.** Der alte Grund ist weg (der landesweite Lauf schnitt am Rechteck, der Einzelimport an der Grenze: Saarbrücken 150 gegen 157 Standorte), und für Witten stimmen beide Wege jetzt auf 1 % überein. **Nachgemessen ist es aber nur dort.** Bis es für mehr gilt, bleibt die Regel: Der landesweite Lauf ist für **Breite** da – Gemeinden, zu denen es noch gar nichts gibt. Einen geprüften Bestand ungeprüft zu ersetzen wäre der teurere Fehler.
  - **Drei Fehler aus den ersten Probeläufen**, der Vollständigkeit halber festgehalten; die ersten zwei betrafen Code, den die Grenzflächen ersetzt haben:
    - `out bb center tags` liefert von beiden Geometrieangaben nur eine. Die erste Fassung verlangte Rechteck **und** Mitte, bekam nur die Mitte – und verwarf daraufhin alle 52 Gemeinden des Saarlands, **ohne einen Fehler zu melden**. Stille Teilergebnisse sind in dieser Importkette der häufigste Fehler.
    - Der Slug wurde aus dem OSM-Namen gebildet statt aus dem Register. Da `toSlug` Zusätze streicht, fielen „Weil am Rhein" und „Weil im Schönbuch" beide auf „weil", und der Treffer galt als eindeutig: eine Datei mit Parkplätzen aus beiden Orten, **157 km auseinander**. Gemeindenamen sind in Deutschland kein Schlüssel; zugeordnet wird nur über den AGS.
    - Der Zähler „unsicher zugeordnet" zählte auch Treffer, die danach ohnehin verworfen werden – und meldete 1.503 statt 414. Eine Warnung, die dreimal zu groß ist, ist wertlos.
  - **Gefunden wurden sie durch eine Streuungsprüfung**, nicht durch Hinsehen: Liegen die Parkplätze einer Gemeinde mehr als 15 km auseinander, stimmt die Zuordnung nicht. Fünf von 122 Gemeinden fielen damit auf; nach der Korrektur keine einzige, Median 3,2 km.

- [x] 2e.2 / 2e.3 **Landesportale ausgewertet – und dort gefunden, was GovData nicht hat** (2026-10-10, `npm run import:regional`). Die Suche auf Open.NRW und MobiData BW bestätigt, was 2e.2 vermutet hatte: GovData spiegelt die Landesportale nicht vollständig.
  - **Der Fund: der Datensatz der TechnologieRegion Karlsruhe** – 694 Standorte in 15 Gemeinden, mit Adresse, Stellplatzzahl, Zeitbeschränkung **und Höchstparkdauer**, unter CC BY 4.0. Er steht auf MobiData BW und taucht bei GovData nicht auf. Davon sind 534 in Deutschland (das Elsass wird übersprungen).
  - **Er erschließt neun Gemeinden, die für das Register zu klein sind** (Bruchsal, Stutensee, Ettlingen, Rheinstetten, Bretten, Germersheim, Gaggenau, Waghäusel, Landau). Genau das war die Vermutung hinter 2e.1, die über GovData nicht zu belegen war. Sie werden jetzt unabhängig von der Einwohnerzahl aufgenommen – wo eine Gemeinde ihre Daten selbst veröffentlicht, ist das die bessere Quelle.
  - **Karlsruhe und Baden-Baden wurden bewusst nicht überschrieben.** Der amtliche Datensatz führt für Karlsruhe 224 Standorte, OpenStreetMap aber 330: Die Stadt listet ihre eigenen Stellplätze im Straßenraum, OSM auch die an Kliniken, Märkten und Bahnhöfen. Beides ist richtig; das Überschreiben hätte ein Drittel vernichtet. Dieselbe Lehre wie bei Rostock (3.9b), nur andersherum – nicht die Herkunft entscheidet, sondern was in den Daten steht.
  - **Zwei Fehler beim Bauen gefunden und behoben:** Die Anschrift steht mal im Ortsfeld, mal in der Bemerkung („Ärztehaus" / „Franz-Sigel-Str. 83"); und „Bahnhof" wäre beinahe als Straßenname eingetragen worden, was jede spätere Nachbesserung blockiert hätte – derselbe Mechanismus wie bei 3.0f.
  - Ergebnis: **24 statt 14 Städte aus amtlicher Quelle.**
  - **Die Annahme über NRW hat sich nicht bestätigt** (erledigter Teil von 3.2, hierher verschoben am 2026-10-10). Erwartet war ein landesweiter NRW-Sammeldatensatz. Auf Open.NRW stehen elf einschlägige Datensätze, aber **alle von einzelnen Städten, die längst erfasst sind**; einen gebündelten gibt es dort nicht. Die beiden „Gebündelte Daten"-Datensätze von MobiData BW betreffen Parkplätze allgemein, nicht Behindertenstellplätze. Das steht hier, damit niemand dieselbe Suche ein zweites Mal führt: **Landesweite Sammeldatensätze sind in NRW und BW nicht die Lücke, die sie zu sein schienen** – der Weg zu den kleinen Gemeinden führt über 2e.7 und 2e.10, nicht über die Landesportale.
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
- [~] 2e.10 **Die Arbeitsliste führt alle Gemeinden, nicht nur die an der Reihe** (2026-10-11). Vorher baute `loadStatus()` die Liste aus `germanCities` – dem auf `MIN_POPULATION` gefilterten Verzeichnis. `_import-status.md` meldete deshalb „Alle Städte abgearbeitet", während 10.550 Gemeinden **nicht einmal als offen geführt wurden**: Sie standen nicht auf `offen`, sie kamen in der Datei nicht vor. Eine Gemeinde, die in keiner Liste steht, fehlt niemandem auf.

  Jetzt: **10.754 Gemeinden, 204 geprüft (2 %), 10.550 offen.** Die Einwohnergrenze steuert die Reihenfolge, nicht die Zugehörigkeit.

  - **Die Slugs waren das eigentliche Risiko, nicht die Umstellung.** Ein Slug steckt im Dateinamen _und_ in jeder Parkplatz-ID; verschiebt er sich, verwaist die Seed-Datei und jede Bewertung zeigt später ins Leere. Deshalb werden die Slugs jetzt **einmal über den ganzen Bestand** vergeben, und `germanCities` ist nur noch ein Filter über dieselben Objekte – es kann gar nicht mehr auseinanderlaufen. Nachgewiesen vor dem Weiterarbeiten: 0 Slug-Kollisionen unter 10.754 Gemeinden, 0 verwaiste Seed-Dateien, 0 Abweichungen zwischen beiden Listen.
  - **Nur die angefassten Gemeinden werden gespeichert.** Alle zu schreiben ergäbe rund fünf Megabyte, neu geschrieben nach **jeder einzelnen Stadt** – für Zeilen, die ausnahmslos „noch nicht angefasst" bedeuten. `offen` ist der Normalfall und braucht keinen Eintrag: Wer dazugehört, steht im amtlichen Verzeichnis, die Statusdatei hält nur die Abweichungen fest. Die Datei blieb dadurch bei 97 KB statt auf das Fünfzigfache zu wachsen.
  - **Der Bericht fasst zusammen, statt 10.754 Zeilen zu zeigen.** Neu: Fortschritt je Größenstufe und je Bundesland, jeweils nach Gemeinden **und** nach Einwohnern – „sind wir fertig" und „wie vielen Menschen nützt es schon" sind verschiedene Fragen. Einzeln aufgeführt werden nur die angefassten Gemeinden; zehntausend gleichlautende Zeilen liest niemand.
  - **„Alle Städte abgearbeitet" ist weg.** Stattdessen: Innerhalb der Grenze von 50.000 ist alles erledigt, die nächstgrößere offene Gemeinde wäre Cuxhaven mit 49.697 Einwohnern, und dafür muss `MIN_POPULATION` sinken – „das ist eine Entscheidung, keine Routine". Der Satz steht so im Bericht, weil die alte Formulierung genau dort in die Irre führte.
  - **Ein Risiko dabei selbst erzeugt und wieder geschlossen.** Mit dem vollen Register sah `--rest` plötzlich 10.550 offene Gemeinden – ein Aufruf hätte über zehntausend Overpass-Abfragen gestartet, genau den Missbrauch aus 2e.7a. Dass es nicht geschah, lag allein daran, dass `findCity` nur die gefilterte Liste kennt und der Rest hinterher aus dem Ergebnis fiel. **Das ist ein Zufall, kein Schutz.** `--rest` und `--next` nehmen jetzt ausdrücklich nur Gemeinden oberhalb der Grenze; namentlich lässt sich weiterhin jede einzelne importieren.
  - **Gemeindefreie Gebiete bleiben draußen.** Das Verzeichnis führt 204 davon – Seen, Wälder und Truppenübungsplätze wie „Ammersee" oder „Abenberger Wald" –, 202 ohne jede Einwohnerzahl. Dort gibt es keinen öffentlichen Behindertenparkplatz zu erfassen und keine Verwaltung zu fragen, und „Stellplätze je Einwohner" wäre eine Division durch null. Die beiden bewohnten (Lohheide, Osterheide) bleiben drin: Maßstab ist, ob dort Menschen leben, nicht ob es eine Gemeindeverwaltung gibt.
  - **Zwei Folgefehler wurden erst dadurch sichtbar.** `check:slugs` meldete fünf Seed-Dateien als verwaist (Emden, Freising, Goslar, Speyer, Willich) – keine war es, sie liegen nur unter der Grenze. Die Meldung musste sich selbst wegerklären, und **eine Warnung, die man wegerklären muss, wird beim nächsten Mal überlesen** – mitsamt der echten. Sie prüft jetzt gegen das volle Verzeichnis und schweigt. Und `report:abdeckung` rechnete gegen 10.956, der Importstand gegen 10.754; zwei Dokumente mit zwei Gesamtzahlen sind schlimmer als eine ungenaue, weil man dann keiner mehr glaubt.
  - **Offen bleibt die Kennzeichnung der Verbandsgemeinden** – die Daten dafür liest `gemeinden.mts` nicht ein. Steht als einziger Rest in [ToDos.md](ToDos.md).
  - **Zum zweiten Mal an einem Tag in dieselbe Falle getappt:** Eine Prüfung über `new Map(... [name, x])` meldete 10 angebliche Slug-Abweichungen. Es waren keine – bei gleichnamigen Gemeinden behält `Map` den letzten Eintrag, und Münster (Bayern) überschrieb Münster (NRW). Derselbe Fehler wie zuvor bei der Einwohner-Zuordnung. **Gemeindenamen sind in Deutschland kein Schlüssel; der AGS ist es.** Die Prüfung läuft jetzt über den AGS und meldet 0.

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
- [x] 7.7 **Zeitangaben: abgeschlossen bei 96 %** (2026-10-10, zweiter Durchgang; vorher 93 %, davor 82 %). Die vier in der Aufgabe genannten Restformen sind gebaut, dazu drei, die dabei auffielen. **Jede stammt aus `npm run report:times`, also aus echten Einträgen** – keine ausgedachten Varianten:
  - **Saisonale Angaben** (`Apr-Oct: Mo-Su 09:00-18:00`). Typisch für Freibäder und Ausflugsziele. Ohne Monatsprüfung stünde im Januar eine Beschränkung, die es dort nicht gibt – eine stille Falschaussage. Außerhalb der Saison meldet die App jetzt „gilt nicht", und das ist eine Aussage, keine Unkenntnis. Funktioniert auch über den Jahreswechsel (Nov-Mär).
  - **Ausnahmen mit `off`** (`open; Fr 06:00-14:00 off`). Das OSM-Format kennt Grundregel plus Ausnahme. Ohne Abzug blieb nur die Wahl zwischen „alles offen" (Ausnahme verschwiegen) und „nichts verstanden"; das erste wäre falsch, das zweite verschenkt eine eindeutige Angabe. Gerechnet wird je Tag auf Minutenspannen.
  - **Ausgenommene ganze Tage hinter einem Komma** (`Mo-Fr 04:00-23:00, Sa-Su off`). Sie werden abgezogen, **nicht weggeworfen** – meist sagen sie nur, was ohnehin nicht in der Regel steht, aber bei `Mo-Su 08:00-18:00, Sa off` überschneiden sie sich, und Wegwerfen hieße, den Samstag fälschlich mitzuzählen. Beide Fälle stehen als Test da.
  - **HTML aus den Daten** (`<br>Mo-Fr 9:00-20:00<br>Sa 9:00-14:00`). Das Markup ist beim Export mitgekommen; die Marke wird zum Abschnittstrenner, denn genau das ist hier ihre Bedeutung.
  - **Null statt O im Wochentag** (`M0 - Fr`). Auf der Tastatur liegen 0 und O nicht nebeneinander, in vielen Schriften sehen sie fast gleich aus – beim Abtippen einer Liste passiert das. Begrenzt auf Mo, Di, Do, Sa, So, damit keine Uhrzeit getroffen wird.
  - **Gedankenstrich statt Bindestrich** (`8–18 Uhr`). Sieht für Menschen gleich aus, ist für den Parser ein anderes Zeichen. Textverarbeitungen setzen ihn beim Tippen automatisch – die Quelle kann nichts dafür.
  - **Schrägstrich als Trenner** (`Mo-Fr 8-18/Sa 9-12`) und **`||` als Bemerkungstrenner**. Der Schrägstrich greift nur zwischen Zahl und Wochentag, sonst zerschnitte er `24/7` – die häufigste Angabe im ganzen Bestand. Ein Test hält genau das fest.
  - **Nicht gedeutet, und zwar absichtlich:** `PH off` und `Mo-Su,PH off` ohne Grundregel. Was sie für eine _Beschränkung_ bedeuten sollen, ist nicht zu entscheiden – „gilt nie" wäre eine Lesart, „Parkplatz geschlossen" eine andere. Die Oberfläche zeigt den Text unverändert.
  - **Der Bericht selbst maß falsch.** `report:times` fragte nur `restrictionState`, und eine Höchstparkdauer („2 Stunden") hat kein Zeitfenster – sie galt als Lücke, obwohl `maxStay()` sie längst richtig deutet und die Detailansicht sie korrekt anzeigt (7.5). Acht Angaben standen dadurch auf der Arbeitsliste, die niemand mehr anfassen musste. **Ein Bericht, der zu bereits getaner Arbeit auffordert, ist schlimmer als keiner** – er wird nachgeschlagen und geglaubt. Die Quote von 93 % war aus demselben Grund zu niedrig.
  - **Was offen bleibt, bleibt bewusst offen:** 17 Angaben, davon neun gar keine Zeitangaben („nur an Veranstaltungen", „matchdays only", „Parkplatz durch Baustelle stark eingeschränkt") und eine, die nur so aussieht: `gegenüber 18–20` ist eine Hausnummernspanne. Dass die App daraus nichts macht, ist das richtige Ergebnis. Lohnender wäre, die Quellen zu bitten, so etwas nicht ins Zeitfeld zu schreiben.
- [x] 7.6 **Hinweis auch in der Liste** – „Beschränkung gilt jetzt" steht neben dem Eintrag, dafür muss man die Details nicht öffnen
- [x] 7.8 **Feedback- und Fehlermeldeknopf.** Öffnet eine vorbereitete E-Mail mit dem Betreff „Wheelee Fehlermeldung", vorausgefüllt mit Gerät, Browser und – falls die Detailansicht offen war – dem betroffenen Parkplatz samt ID. Der Standort wird **nicht** mitgeschickt. Die Empfängeradresse steht als einzelne Konstante in `src/lib/feedback.ts` und ist noch offen (D-06); bis dahin sagt der Knopf das sichtbar, statt ins Leere zu schicken.

---

## 6. Karte und Standort (Fortsetzung 2026-10-10)

Sechs Änderungen aus einer gemeinsamen Beobachtung: Die Leiste über der Karte
**nannte** einen Parkplatz, zeigte ihn aber nicht. Eine Entfernung in Metern
beantwortet nicht die Frage, die man vor der Abfahrt hat – „in welche Richtung,
und was liegt dazwischen?"

- [x] 6.17 **Jeder Eintrag führt auf die Karte.** Der Textblock der Leiste und jede Zeile der aufgeklappten Auswahl sind Knöpfe: Antippen bringt den Parkplatz ins Bild. Bei den Zeilen der Auswahl ist es **beides zugleich** – Ziel setzen und hinspringen. Vorher waren das zwei getrennte Dinge, und man konnte einen Platz auswählen, während die Karte den alten Ausschnitt zeigte; die Auswahl war damit eine Entscheidung ohne Grundlage. Bewusst **ohne** Detailansicht: Die legt sich über genau die Karte, auf die man schauen will – dafür gibt es den Knopf „Details".
- [x] 6.18 **Rote Luftlinie vom Bezugspunkt zum gewählten Parkplatz.** Bezugspunkt ist das Ziel, wenn eines eingegeben ist, sonst der eigene Standort – dieselbe Regel wie für die Auswahl.
  - **Gestrichelt, nicht durchgezogen.** Eine durchgezogene Linie auf einer Karte liest sich als Route. Diese ist keine: Die App navigiert nicht, sie übergibt an eine Karten-App. Eine Strecke, die wie ein Fahrweg aussieht, aber keiner ist, wäre eine Zusage, die sie nicht halten kann.
  - **Zwei Linien übereinander.** Darunter liegt eine breitere weiße. Ohne sie verschwindet Rot auf den roten Dächern und Straßen der OSM-Kacheln – und erst recht bei Sonnenlicht auf dem Display (ToDo 14.4).
  - Sie liegt **unter** den Markern und ist `interactive={false}`, fängt also keinen Klick ab.
- [x] 6.16a **Eine Zeilen-Komponente für Liste und Auswahl** (2026-10-10, `src/components/SpotRow.tsx`). Beide zeigten dasselbe in zwei Fassungen.
  - **Der Anlass war nicht die Doppelung, sondern was aus ihr wurde.** Beim Umbau der Leiste am selben Tag bekam die eine Fassung Hervorhebung, größere Trefferfläche und ein Symbol – die andere blieb stehen, **ohne dass jemand entschieden hätte, dass sie verschieden aussehen sollen.** Der Punkt stand seit dem Bauen von 6.16 als „keine Voraussetzung für irgendetwas" auf der Liste; genau so sieht es aus, bis es passiert.
  - **Was verschieden bleiben darf, bleibt beweglich:** die Nebenzeile (in der Liste der Stadtteil, in der Leiste die Entfernung) und was rechts steht (Entfernung oder Nadel). Das ist ein bewusster Unterschied – in der Leiste wählt man zwischen nahen Plätzen, in der Liste sieht man eine Stadt durch. Alles andere steht jetzt an einer Stelle, und ein künftiger Unterschied muss absichtlich sein.
  - **Geprüft, obwohl der Reiter „Liste" ausgeblendet ist** (9.11): Die Ansicht wurde einmal freigeschaltet, im Browser angesehen – Überschrift, Zeilen, Haftungshinweis, 60 px Trefferfläche – und wieder ausgeblendet. Eine Komponente umzubauen, die man danach nicht ansieht, weil sie gerade nicht erreichbar ist, wäre die Art Änderung, die ein halbes Jahr später als Fehler auffällt.
- [x] 6.21 **Die aufgeklappte Auswahl lässt Karte übrig – und zeigt dort ihre Parkplätze** (2026-10-10). Vorher deckte sie auf dem Telefon rund 70 % der Karte zu, und darunter lagen genau die Parkplätze, über die sie Auskunft gab: Man las Namen und Entfernungen, ohne zu sehen, wo sie liegen. Gemessen am Telefonformat: 70 % → 59 %, freier Streifen 175 → 248 px, darin 9 Marker der Auswahl statt fast keiner.
  - **Zwei Änderungen, die nur zusammen wirken.** Die Liste bekam eine eigene Höhe (22 % des Bildschirms, eigener Bildlauf), damit Vorschlag und Navigationsknopf stehen bleiben – und beim Aufklappen passt die Karte die ganze Auswahl ein. Nur das eine hätte wenig gebracht: Eine kleinere Leiste über einem Ausschnitt, der den Zielparkplatz formatfüllend zeigt, lässt die Alternativen weiterhin außerhalb.
  - **Dabei fiel ein Fehler in der frischen Einpassung auf.** Sie rechnete gegen die _ganze_ Karte, nicht gegen den nach Abzug der Leisten verbleibenden Platz. Ein Ausschnitt galt dadurch als passend, der zur Hälfte unter der aufgeklappten Auswahl lag – die Marker waren rechnerisch im Bild und tatsächlich verdeckt. Gerechnet wird jetzt gegen den nutzbaren Rest.
  - **Die Höhe der Leiste ist eine Schätzung** (`EXPANDED_BAR_HEIGHT`), und bewusst eine großzügige. Zu großzügig heißt: Der Ausschnitt wird etwas enger als nötig. Zu knapp heißt: Die Marker landen unter der Leiste – also wieder genau der Fehler, den dieser Punkt behebt.
  - **59 % sind immer noch viel**, und das bleibt so: Darunter stecken der Zielparkplatz, der Navigationsknopf und die Umkreiswahl. Sie kleiner zu machen, um Karte zu gewinnen, hieße die Hauptsache für die Nebensache zu opfern.
- [x] 6.22 **Beide Enden der Luftlinie bleiben im Bild** (2026-10-10). Vorher sprang die Karte allein auf den Parkplatz und zoomte dabei auf Stufe 17 – der Bezugspunkt lag dann oft außerhalb, und die Linie lief ohne Erklärung aus dem Bild. Man sah eine Linie, aber nicht, worauf sie zeigt; das ist weniger wert als gar keine.
  - Beim Sprung wird jetzt auf beide Punkte gezoomt (`flyToBounds`), mit **ungleichem Rand oben und unten**: Oben sitzen Parkplatzvorschlag und Zielsuche, und ohne diesen Abstand landet der angesteuerte Punkt darunter – unsichtbar genau in dem Moment, in dem man ihn ansieht.
  - **Nur, solange beides brauchbar darstellbar ist.** Liegt der Bezugspunkt 40 km entfernt, wäre das Ergebnis eine Landkarte, auf der der Parkplatz verschwindet. Unterhalb von Zoomstufe 14 – etwa einem Stadtviertel – gilt deshalb weiter der Parkplatz allein, denn er ist das, was man ansteuert. Nachgerechnet: 550 m ergeben Stufe 17, 40 km ergeben Stufe 10.
  - Der Test prüft **nicht die Zoomstufe, sondern das Ergebnis**: ob beide Enden der Linie im sichtbaren Ausschnitt liegen. Eine Zahl zu prüfen hieße, die Umsetzung festzuschreiben statt die Zusage.
- [x] 6.19 **Am Ziel gibt es jetzt eine Auswahl, nicht nur einen Vorschlag.** Der Anlass war ein beobachteter Fall: Am Klinikum Frankfurt (Oder) lag genau ein Parkplatz im Umkreis von 500 m. Die Leiste zeigte ihn – und bot nichts weiter an, weil es im Umkreis nichts weiter gab. Wer dort ankommt und den Platz besetzt findet, steht ohne zweite Möglichkeit da.
  - Jetzt stehen bis zu drei Parkplätze **außerhalb** des Umkreises dahinter, unter einer eigenen Zwischenüberschrift „Darüber hinaus".
  - **Die Trennung ist der Punkt, nicht die Ergänzung.** Stünden sie gleichwertig in einer Liste, wäre der Umkreis als Aussage wertlos. So bleibt er eine klare Angabe („das ist nah genug"), verschweigt aber nicht mehr, was knapp dahinter liegt.
- [x] 6.20 **Vorschläge beim Tippen in der Zielsuche**, mit Pfeiltasten und Eingabetaste bedienbar (ARIA-Combobox).
  - **Warum es trotzdem keine echte Autovervollständigung ist:** Nominatims Nutzungsbedingungen nennen eine Abfrage je Sekunde als Obergrenze und führen Autovervollständigung ausdrücklich als unerwünschte Nutzung auf. Eine Anfrage je Tastendruck wäre nicht Ungeschicklichkeit, sondern ein Verstoß mit Sperre als Folge – und der Dienst wird von Freiwilligen bezahlt, derselbe Grundsatz wie bei Overpass.
  - **Der Weg stattdessen:** Gesucht wird erst nach 350 ms ohne Tastendruck, also einmal je Wortpause statt je Buchstabe. Jede Antwort bleibt im Browser (`cache` in `DestinationSearch.tsx`), sodass Löschen und Neutippen nichts kostet; der Server legt zusätzlich eine Stunde lang ab. Das fühlt sich an wie Autovervollständigung, ohne sich wie Missbrauch zu verhalten.
  - Soll es wirklich bei jedem Buchstaben vorschlagen, braucht es einen eigenen Geocoder. Das ist eine Entscheidung mit Kosten, keine Einstellung – deshalb steht es nicht als Schalter da.

---

## 6. Karte und Standort (Fortsetzung 2026-10-16)

- [x] 6.23 **Die Zielsuche ordnet ihre Treffer nach Nähe** (2026-10-16, auf Zuruf: „viel schlechter als Google Maps").

  **Der Befund war handfest und nicht eine Frage des Geschmacks.** `/api/geocode` fragte Nominatim **ohne jeden Ortsbezug**. Nominatim sortiert dann nach `importance`, einer Kennzahl aus Wikipedia-Verweisen und Objektart – eine Antwort auf die Frage „was ist das bekannteste Objekt dieses Namens in Deutschland". Die Frage der Nutzerin ist eine andere. Gemessen am 2026-10-16, Suche nach „Bahnhofstraße":

  | ohne Bezugspunkt (vorher)               | von Köln aus (jetzt)          |
  | --------------------------------------- | ----------------------------- |
  | Werben, Burg (Spreewald)                | Sürth, Rodenkirchen, **Köln** |
  | Altstadt, Mitte, Hannover               | Porz, **Köln**                |
  | Hänichen, Bannewitz, Sächsische Schweiz | Angermund, **Düsseldorf**     |
  | Sankt Peter, Walchsing, Aldersbach      | Schöntal, Alt-Wetter, Wetter  |
  | Kernstadt, Heilbronn                    |                               |

  Es gibt die Bahnhofstraße in über 5.000 deutschen Gemeinden. Die eigene stand nicht in der Liste – nicht weiter unten, sondern gar nicht.

  **Die Regel steht in `lib/geocode.ts` und ist in zwei Stufen geteilt**, weil eine nicht genügt:
  - **Was im Umkreis von 50 km liegt, kommt zuerst, nach Entfernung sortiert.** Zwischen zwei Bahnhofstraßen in Reichweite entscheidet die Entfernung, nicht die Bekanntheit.
  - **Alles Weitere behält Nominatims Reihenfolge.** Jenseits davon ist die Entfernung keine Auskunft mehr: Zwischen zwei Treffern in 300 und 400 km entschiede sie nach Zufall, während die Bekanntheit immerhin ein Hinweis darauf ist, was gemeint war. Eine durchgehende Sortierung nach Entfernung hätte ein zweites Problem erzeugt statt das erste zu lösen.

  **Der Bezugspunkt geht als `viewbox` mit, aber ohne `bounded=1`** – das ist kein Detail. `bounded=1` würde alles außerhalb wegwerfen; von Köln aus fände man Hamburg dann nicht mehr, und eine weite Fahrt zu planen ist genau der Fall, für den die Zielsuche gebaut wurde (6.12). Ohne `bounded` gewichtet Nominatim das Fenster nur höher, und die eigentliche Sortierung geschieht hier, wo sie nachvollziehbar und geprüft ist.

  **Der Standort wird auf zwei Dezimalstellen gerundet** (rund ein Kilometer), bevor er die App verlässt. Zwei Gründe, und der zweite wäre sonst übersehen worden: Für die Sortierung ist ein Kilometer genau genug, also wird mehr nicht geschickt (Abschnitt 10) – **und ungerundet wäre der Zwischenspeicher wirkungslos gewesen.** Ein GPS-Standort schwankt bei jedem Messwert in der sechsten Dezimalstelle; jede Messung hätte einen eigenen Schlüssel bekommen, und derselbe Begriff zweimal getippt wären zwei Anfragen an Nominatim. Die Schonung des Dienstes aus 6.20 hätte sich damit still selbst aufgehoben.

  **Dubletten werden zusammengeführt, und die zweite Regel dafür kam erst aus der Probe gegen echte Daten:**
  - Gleiche Beschriftung unter **150 m** Abstand. Maßgeblich ist die Ausdehnung eines großen Gebäudes, nicht die Messgenauigkeit: OpenStreetMap kennt dasselbe Haus oft als Adresspunkt **und** als Gebäudefläche, und beim Hamburger Rathaus liegen die beiden 98 m auseinander – es stand zweimal in der Liste. Eine zuerst angesetzte Grenze von 30 m („eine Straßenbreite") war am Schreibtisch plausibel und in der Sache zu eng.
  - Gleiche Beschriftung **und** gleiche Unterzeile, ohne Rücksicht auf den Abstand. Eine Straße ist in OpenStreetMap in Abschnitte geteilt und Nominatim liefert jeden einzeln: Von Köln aus stand dreimal „Bahnhofstraße | Porz, Köln" da – drei Zeilen für dieselbe Straße, auf Kosten der echten Alternativen. Eine **leere** Unterzeile gilt dabei ausdrücklich nicht als Übereinstimmung, sonst bliebe von zehn Treffern ohne Ortsangabe genau einer übrig.

  **Beides zusammen ist der Grund, warum es jetzt acht Vorschläge statt fünf sein dürfen** (geholt werden 15): Vorher blieben nach dem Entdoppeln drei brauchbare Zeilen übrig. Die Last bleibt gleich – es ist weiter **eine** Anfrage, nur mit größerem Ergebnis.

  **Vier Dinge an der Bedienung, jedes davon eine Sackgasse, die wirklich dastand:**
  - **Enter tat nichts**, solange die 350 ms Tippause noch liefen. Wer eine vollständige Adresse tippt und Enter drückt – der Normalfall – bekam keinen Treffer, keine Meldung, keinen Hinweis. Jetzt sucht Enter sofort und übernimmt den besten Treffer. Dass dabei ungesehen ein Ziel gesetzt wird, ist vertretbar: Es ist derselbe Treffer, den Enter auch bei sichtbarer Liste nimmt, er steht danach mit Namen in der Zielzeile, und ein Fehlgriff kostet einen Druck auf „Ziel aufheben".
  - **Die Eingabe ließ sich nicht löschen.** Nur über „alles markieren" oder langes Drücken der Rücktaste – einhändig auf dem Telefon kaum zu machen, und genau dann nötig, wenn die Treffer nicht passen. Der ×-Knopf leert das Feld und lässt die Suche offen. Der Knopf zum Zuklappen daneben wurde deshalb zum **Pfeil**: zwei gleich aussehende ×-Knopfe nebeneinander wären nicht auseinanderzuhalten gewesen.
  - **Bei einem Fehler gab es keinen zweiten Versuch.** Nominatim antwortet unter Last auch mal nicht; man musste einen Buchstaben löschen und neu tippen. Jetzt steht „Erneut" neben der Meldung.
  - **Zwei Suchen konnten sich überholen.** „Köln" braucht länger als „Kölner Dom", wenn die erste nicht im Zwischenspeicher lag – die späte Antwort überschrieb dann die richtige Liste, und man las Vorschläge zu einem Wort, das nicht mehr im Feld stand. Ein Zähler verwirft überholte Antworten.

  **Die Entfernung steht jetzt an jedem Vorschlag**, aber nur mit Bezugspunkt. Sie ist die Angabe, die zwischen zehn gleichnamigen Straßen überhaupt erst entscheiden lässt – „Bahnhofstraße, 1,2 km" gegen „Bahnhofstraße, 340 km". Ohne Standort und ohne gesetztes Ziel steht dort **nichts**: Eine Entfernung ab der Stadtmitte wäre keine Auskunft, sondern Zufall. Dasselbe gilt für die Sortierung, die dann unverändert die des Dienstes bleibt.

  **Was absichtlich nicht geändert wurde:** die zugeklappte Schaltfläche „Wohin willst du?" (auf Nachfrage bestätigt), die 350 ms Tippause und die Mindestlänge von drei Zeichen. Alle drei stehen aus einem genannten Grund da – Platz für die Karte (9.15) und die Nutzungsbedingungen von Nominatim (6.20) –, und „schneller vorschlagen" hieße einen eigenen Geocoder zu betreiben. Das bleibt eine Entscheidung mit Kosten, keine Einstellung.

  **Ein Fallstrick aus [CLAUDE.md](CLAUDE.md) ist beim Schreiben der Tests sofort zugeschnappt:** `„Deutschland"` in einem Testnamen beendet die Zeichenkette am ASCII-Anführungszeichen. Der Parser hat es gemeldet, die Datei ließ sich nicht laden – anders als bei den beschädigten Umlauten, die seinerzeit grün durchliefen. Behoben mit `'…'` als äußerer Begrenzung.

  Geprüft mit **16 neuen Unit-Tests** (`src/lib/geocode.test.ts`, Reihenfolge und Entdopplung) und **5 neuen E2E-Tests** (Bezugspunkt in der Anfrage und seine Rundung, Entfernung am Vorschlag, Löschen, Enter, „Erneut"). Dazu die Probe gegen echte Nominatim-Daten, aus der die zweite Entdopplungsregel und die 150 m überhaupt erst kamen – **am Schreibtisch wäre beides nicht aufgefallen.**

---

## 17 / 10. Aufräumen und Sicherheit (2026-10-17)

- [x] 17.5 **Erledigte Rückmeldungen laufen nach zwölf Monaten ab** (2026-10-17, `src/lib/db/cleanup.ts`).

  Eine Tabelle, die nur wächst, wird nach einem Jahr nicht mehr gelesen – und personenbezogene Angaben, die niemand mehr braucht, gehören gelöscht. Das ist hier nicht Ordnungsliebe, sondern die Speicherbegrenzung aus Art. 5 Abs. 1 lit. e DSGVO. **Vor allem aber stand im Formular eine Zusage, die niemand einlöste:** `CONTACT_PRIVACY` verspricht, die freiwillige Antwortadresse werde „mit der Meldung gelöscht". Gelöscht wurde bis hierher nichts.

  **Gerechnet wird ab der Erledigung, nicht ab dem Eingang** (`COALESCE(updated_at, created_at)`). Der Unterschied ist kein Detail: Eine Meldung, die dreizehn Monate offen lag und gestern abgeschlossen wurde, verschwände sonst noch am selben Tag – und niemand könnte mehr nachsehen, worauf sich die Korrektur stützte. Ein Test hält genau diesen Fall fest.

  **Offene Meldungen laufen nicht ab, und das ist Absicht.** Eine Meldung, die niemand bearbeitet hat, ist nicht erledigt, sondern liegen geblieben. Sie nach einer Frist zu löschen hieße, einen Hinweis auf einen womöglich falschen Parkplatz zu verlieren, **weil sich niemand darum gekümmert hat** – die Nachlässigkeit würde ihre eigenen Spuren beseitigen. Was daraus folgt, steht als neuer Punkt 17.6 in `ToDos.md`: Die Adresse an einer ewig offenen Meldung bleibt damit ebenso ewig stehen, und das ist die verbliebene Lücke.

  **Zwölf Monate sind nicht gegriffen:** Die Spanne überdeckt einen vollständigen Jahreslauf der Datenpflege – ein halbjährlicher Vollimport und eine halbjährliche Validierung fallen garantiert hinein. Eine Meldung bleibt also mindestens so lange nachlesbar, wie sie für die Prüfung der Daten noch etwas beitragen kann.

  **Dabei kam eine zweite Lücke heraus, die nicht auf der Liste stand:** Abgelaufene Sitzungen verschwanden bisher erst beim nächsten Versuch, sie zu benutzen (`accountForSession`). Wer sich einmal anmeldet und nie wiederkommt, hinterließ damit **dauerhaft** eine Zeile, die sein Konto mit einem Zeitpunkt verknüpft – nutzlos und länger aufbewahrt als nötig. Sie werden jetzt mitgelöscht.

  **Kein Zeitgeber, und das ist eine Abwägung mit benannter Grenze.** Die App ist ein einzelner Container ohne Hintergrundprozess; ein `setInterval` in einem Next-Modul läuft je nach Laufzeitumgebung gar nicht oder mehrfach. Der Lauf hängt sich deshalb an die Zugriffe, die es ohnehin gibt – eine eingehende Meldung, ein Blick in die Übersicht –, höchstens einmal am Tag. Käme über Monate weder das eine noch das andere, liefe er gar nicht. Eine Frist von zwölf Monaten verträgt eine Verzögerung von Tagen, aber das ist eine **Annahme über den Betrieb und keine Zusage der Technik**; sobald es den monatlichen Lauf aus 4.5 gibt, gehört `purgeExpired` dort hinein. Vom Öffnen der Datenbank aus ginge es nicht: `cleanup.ts` benutzt `db()`, ein Aufruf aus `sqlite.ts` wäre ein Importzyklus.

  Geprüft mit **11 Unit-Tests** gegen eine echte Datenbank – die Bedingung steckt in SQL, und dort wäre ein Fehler unsichtbar: Er löschte entweder zu viel oder nie etwas, und beides fiele erst nach Monaten auf.

- [x] 10.3 **Sicherheits-Kopfzeilen** (2026-10-17, `next.config.ts`, Teil der Sicherheitsprüfung aus 10.3).

  **Der Befund zuerst: Die App lieferte keine einzige davon aus.** Keine Inhaltsrichtlinie, kein `nosniff`, kein Schutz gegen fremde Rahmen, keine `Referrer-Policy`, keine `Permissions-Policy`. Für eine Seite, die offen unter wheelee.de steht, Standortzugriff anfragt und eine Anmeldung mit Sitzungscookie führt, ist das kein Schönheitsfehler.

  **Gesetzt werden sie von der Anwendung, nicht vom Nginx Proxy Manager.** Drei Gründe: Sie gehören zur Anwendung und ändern sich mit ihr; im Proxy wären sie für Torsten nicht einsehbar (er hat keinen NPM-Zugang, siehe `wheelee-infrastruktur.md`); und im Entwicklungsbetrieb gäbe es sie dann gar nicht – also genau dort nicht, wo ein Verstoß auffallen müsste.

  Was gesetzt wird und warum, im Einzelnen:
  - **`frame-ancestors 'none'` und `X-Frame-Options: DENY`.** Bei einer Karten-App ist Clickjacking nicht theoretisch: Wer die Seite unsichtbar über eine andere legt, kann Klicks auf Knöpfe lenken, die Standortfreigabe oder Navigation auslösen.
  - **`Permissions-Policy`.** Die App braucht genau **eine** Gerätefunktion, den Standort. Kamera, Mikrofon, Zahlung und USB stehen ausdrücklich auf leer, damit ein späterer Einbau nicht stillschweigend Zugriff bekommt.
  - **`Referrer-Policy: strict-origin-when-cross-origin`.** Beim Sprung in Google Maps soll die Adresse der eigenen Seite nicht mitgehen. Sie enthält keinen Standort – der verlässt das Gerät nirgends –, aber den gewählten Parkplatz, und das ist eine Angabe über eine Behinderung.
  - **`Strict-Transport-Security`, ein Jahr, aber ohne `includeSubDomains` und ohne `preload`.** Das ist eine Entscheidung und kein Vergessen: Der Webhook aus Abschnitt 6 des Infrastruktur-Briefings soll womöglich unter `deploy.wheelee.de` laufen. `includeSubDomains` legte jeden künftigen Unterbereich für ein Jahr auf HTTPS fest – auch einen ohne Zertifikat, und ohne Weg zurück in einem Browser, der es sich gemerkt hat.

  **Was die Inhaltsrichtlinie nicht leistet, steht ausdrücklich dabei.** Sie führt `'unsafe-inline'` bei den Skripten, weil Next die Hydrationsdaten inline schreibt und das Theme-Skript in `layout.tsx` vor dem ersten Zeichnen laufen muss. Damit ist sie **kein Schutz vor eingeschleustem Code in der eigenen Seite**; dafür bräuchte es eine Nonce je Anfrage und eine Middleware. Was sie leistet: Kein fremder Server darf Skripte liefern – der Weg, über den ein nachlässig eingebundenes Analysewerkzeug oder eine kompromittierte CDN-Adresse in einer kleinen App tatsächlich landet. Es wäre unredlich, sie ohne diesen Hinweis als XSS-Schutz zu führen.

  **Zwei Ausnahmen, beide nötig und beide eng gefasst:**
  - Im **Entwicklungsbetrieb** kommen `'unsafe-eval'` und `ws:` dazu, sonst startet die App im Browser gar nicht (React Refresh wertet mit `eval` aus, das Nachladen läuft über WebSocket). Sie hängen an `NODE_ENV`; im Produktionsbau sind sie nicht da. Eine Richtlinie, die man zum Entwickeln aufweicht und dann aufgeweicht ausliefert, wäre keine.
  - Der **Service Worker bekommt keine Inhaltsrichtlinie.** Die CSP eines Worker-Skripts gilt für den Worker selbst, und der holt Kartenkacheln von `tile.openstreetmap.org`. Unter `connect-src 'self'` gäbe es im Funkloch keine Karte mehr, sondern nur eine Liste – die Hälfte dessen, wofür 12.8/12.9 gebaut wurden. Die übrigen Kopfzeilen bekommt er.

  **Ein Irrtum unterwegs, und er gehört hierher, weil er die Art Fehler ist, die diese Datei sammeln soll.** Im eingebetteten Browser scheiterte `register('/sw.js')` mit „An unknown error occurred when fetching the script", und die naheliegende Erklärung war die neue CSP – die Begründung stand schon im Code. Die Gegenprobe **ohne jede Kopfzeile** ergab denselben Fehler: Es ist eine Eigenschaft jener Umgebung. Die Ausnahme für den Service Worker bleibt richtig, aber aus dem anderen Grund (den Kacheln), und die falsche Begründung ist aus dem Code heraus. **Eine plausible Ursache ist keine gemessene.**

  Dabei wurde auch eine **Hintertür wieder entfernt**, die für genau diese Gegenprobe entstanden war: ein `WHEELEE_NO_HEADERS=1`, das alle Kopfzeilen abschaltet. Ein solcher Schalter ist selbst eine Schwachstelle – er stünde in der `.env` auf dem NAS neben Dingen, die man tatsächlich umstellt, und eine versehentlich gesetzte Variable fiele niemandem auf, weil die Seite weiterläuft.

  Festgehalten von **5 E2E-Tests** (`e2e/sicherheit.spec.ts`). Der Grund für Tests ausgerechnet hier: Fehlt eine dieser Zeilen, **geht nichts kaputt.** Die App läuft tadellos weiter, nur der Schutz ist weg – und das sieht niemand.

  **Was die Prüfung sonst ergab, und zwar ohne Befund:** Passwörter liegen als scrypt-Hash mit Parametern im Hash; das Sitzungstoken steht nur als SHA-256 in der Datenbank; `authenticate` rechnet auch bei unbekannter Adresse einen Hash, sodass die Antwortzeit keine Adressen verrät; `timingSafeEqual` beim Vergleich; `httpOnly` und `sameSite: "lax"` am Cookie, womit die schreibenden Endpunkte ohne eigenes Token gegen CSRF geschützt sind; alle Abfragen laufen über vorbereitete Anweisungen, auch die mit zusammengesetztem `WHERE`; jeder `target="_blank"` trägt `rel="noopener noreferrer"`; die einzige zusammengebaute Adresse (`mailto:`) kann wegen `looksLikeEmail` kein `javascript:` werden; die Zugangsprüfung der Übersicht sitzt serverseitig und antwortet auch angemeldeten Nicht-Administratoren mit 401 statt 403. **Diese Aufzählung steht hier, damit die nächste Prüfung nicht bei null anfängt.**

---

## 9. Darstellung und Bedienung

- [x] 9.15 **Alles außer Karte und Einstellungen kleiner** (2026-10-11, auf Wunsch). Die Startseite zeigte ihre Hinweise in derselben Schriftgröße wie die Inhalte, für die man sie öffnet. Auf einem Telefon kostete das vor der ersten Geste rund ein Fünftel des Bildschirms – und zwar genau den oberen Teil, in dem die Karte zeigt, wo man selbst steht.

  **Was kleiner wurde:** Überschrift und Reiter (14 px statt 18, schmalere Polsterung), Statuszeile (12 px), der Parkplatzvorschlag samt Auswahlliste, und die Flächen selbst sind ruhiger (`rounded-xl`, `shadow-md` statt `rounded-2xl`, `shadow-lg`). **Was gleich blieb:** die Karte, die Einstellungen – und jede Trefferfläche. Alle Knöpfe behalten 44 px Höhe (ToDo 9.8); schlanker heißt weniger Fläche **um** die Knöpfe, nicht kleinere Knöpfe. Wer die App einhändig im Auto bedient, merkt den Unterschied sofort, und zwar negativ.

  - **„Wohin willst du?" steht jetzt oben links und ist klein** (ausdrücklicher Wunsch). Vorher lief die Zielsuche über die volle Breite und nahm so viel Platz ein wie der Parkplatzvorschlag darüber – für eine Möglichkeit, die die meisten gar nicht brauchen: Wer die App öffnet, sucht meistens hier und jetzt. Sie steht deshalb **über** dem Vorschlag, aber nur so breit wie ihr Text.
  - **Statuszeile und „Erneut" teilen sich eine Zeile.** Bei abgelehntem Standort – dem Fall, in dem die Karte am meisten zählt, weil es keinen Vorschlag gibt – war die Kopfzeile 125 px hoch; jetzt sind es 104, mit Standort rund 80. Der Knopf heißt sichtbar nur noch „Erneut", weil die Meldung daneben den Grund nennt; vorgelesen bleibt es „Standort erneut versuchen".
  - **Ein E2E-Test hing an einer Gestaltungsklasse.** Er suchte die Vorschlagsleiste über `div[class*="rounded-2xl"]` und schlug fehl, sobald die Ecken schlanker wurden – ein Fehlalarm über eine Änderung, die nichts kaputt gemacht hatte. Die Leiste hat jetzt eine `id`, und der Test fragt danach. **Ein Test, der an der Optik hängt, prüft die Optik** – gemeint war aber, ob von der Karte genug übrig bleibt.

- [x] 9.14 **Keine Bestandszahlen mehr in der Kopfzeile** (2026-10-11, auf Wunsch). Unter der Überschrift stand „209 Städte", in der Statuszeile „18.072 Parkplätze in 209 Städten". Beides beantwortet eine Frage, die niemand stellt, der gerade einen Parkplatz sucht – und beides nahm auf dem Telefon zwei Zeilen direkt über der Karte ein.
  - **Die Zahlen sind nicht verloren**, nur nicht mehr im Weg: Sie stehen in der Listenansicht unter „Woher die Daten kommen" und in `data/_abdeckung.md`, also dort, wo jemand sie wirklich nachschlägt.
  - **Nebenbei eine Server-Last weniger.** `totalSpots` war eine Eigenschaft, für die `page.tsx` bei jedem Seitenaufruf `getAllSpots()` rief – alle 18.072 Standorte aus 209 Seed-Dateien zusammengesetzt, um sie zu zählen. Mit der Anzeige fiel auch der Aufruf weg.
- [x] 9.11 **Reiter „Liste" ausgeblendet** (2026-10-10, auf Wunsch). Die Ansicht selbst bleibt vollständig erhalten – `View` kennt sie, der Zweig rendert sie; sichtbar wird sie durch einen Eintrag in `VISIBLE_VIEWS`. Entfernt wird sie bewusst nicht: Sie ist der Zugang für Screenreader, denn die Karte ist laut ihrer eigenen Beschriftung nur eine Ergänzung.
  - **Dabei wäre beinahe der Haftungshinweis verschwunden.** Die ausführliche Fassung („Bitte vor der Fahrt lesen") hing ausschließlich oben in der Listenansicht. Laut 10.5 soll sie an zwei Stellen stehen; mit dem Reiter war eine davon weg, und niemandem wäre es aufgefallen. Sie steht jetzt in den Einstellungen – der Ansicht, in der man in Ruhe liest. **Die Lehre:** Eine Ansicht auszublenden heißt zu prüfen, was sonst noch darin wohnte.
- [x] 9.12 **Kopfzeile schweigt in den Einstellungen** (2026-10-10, auf Wunsch). Die Statuszeile beantwortet „wo ist der nächste Parkplatz" – eine Frage, die sich in den Einstellungen niemand stellt. Wer Darstellung oder Karten-App ändert, braucht keine Bestandszahlen, und die nebenher laufende Standortsuche zu melden lenkt nur ab.
- [x] 9.13 **Menüs schlanker und ruhiger** (2026-10-10). Einheitliche schwebende Flächen (`rounded-2xl`, weiche Ränder, `backdrop-blur`), Symbole als Inline-SVG statt als Schriftzeichen, Umkreiswahl als Segmentschalter statt als Knopfreihe, Statuszeilen nur wenn sie etwas zu sagen haben.
  - **Was dabei ausdrücklich nicht kleiner wurde: die Trefferflächen.** `min-h-11` (44 px) bleibt überall. Schlanker heißt hier leichter aussehen, nicht schwerer zu treffen – die App wird einhändig im Sitzen bedient (ToDo 14.5), und genau dort wäre das Einsparen von Fläche der falsche Gewinn.
  - **Warum die Symbole jetzt SVG sind:** Zeichen wie ◎ und × hängen von der Schriftart des Geräts ab; auf manchen Android-Telefonen fehlen sie und werden als leeres Rechteck gezeichnet. Ein SVG sieht überall gleich aus und skaliert mit `1em` bei 200 % Vergrößerung mit (ToDo 9.8).
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
- [x] 10.4 **Keine Tracker, keine Drittanbieter-Cookies** (2026-10-10 geprüft und belegt, `e2e/datenschutz.spec.ts`).

  Der Zustand: Der Browser spricht ausschließlich mit dem eigenen Server und mit `tile.openstreetmap.org` für die Kartenkacheln. Im `localStorage` liegen drei Schlüssel, alle mit `wheelee-` beginnend – Darstellung, Karten-App, zuletzt gesuchte Ziele. Cookies setzt die App keine.

  - **Das steht als Test da, nicht als Zusage.** Eine Prüfung von Hand hätte nur für diesen Tag gegolten. Eine eingebundene Schriftart, ein Kartenanbieter, ein Fehler-Monitoring – jedes davon holt sich beim Einbauen nebenbei eine fremde Verbindung, und niemandem fällt es auf. Der Test führt eine Liste erlaubter Hosts und lässt den Lauf scheitern, sobald eine Anfrage woandershin geht.
  - **Der Fall, der genau das belegt: die Schriftart.** `src/app/layout.tsx` bindet Geist über `next/font/google` ein – dem Namen nach ein Drittanbieter. Nachgemessen am laufenden Server kommt sie von `localhost:3000/__nextjs_font/geist-latin.woff2`: Next.js lädt solche Schriften beim Bauen herunter und hostet sie selbst, es geht keine Anfrage an Google. Richtig, aber **nicht am Quelltext ablesbar** – und genau deshalb hängt die Aussage am Test und nicht am Hinsehen.
  - **Die Zielsuche ist der einzige Weg nach außen**, und sie läuft über `/api/geocode`, also über unseren Server. Aus dem Browser geht keine Verbindung zu Nominatim. Der Test übt sie seit 2026-10-10 mit aus: Ein direkter Aufruf aus der Komponente wäre ein naheliegender Umbau, würde Nutzerdaten an einen Dritten tragen und fiele sonst niemandem auf.
  - **Statistik gibt es nicht**, und damit auch keine Einwilligungsfrage. Der zweite Halbsatz des ursprünglichen Punktes („falls Statistik, dann datenschutzfreundlich und mit Einwilligung") beschreibt eine Bedingung, die nicht eingetreten ist. Käme sie, hinge sie ohnehin an 10.2 und an der Abwägung in 13.2.

- [x] 10.5 **Haftungshinweis sichtbar formuliert** (2026-10-10, `src/components/DataDisclaimer.tsx`). Zweimal, an den Stellen, wo er zählt: ausführlich oben in der Listenansicht („Bitte vor der Fahrt lesen … vor Ort gilt die Beschilderung"), und knapp in der Detailansicht direkt unter dem Navigationsknopf, zusammen mit dem Stand der Daten. Bewusst nüchtern: Eine Warnung, die wie eine Rechtsfloskel klingt, wird überlesen; eine, die Angst macht, entwertet die App.
- [x] **Lizenzangabe je Stadt im Datenmodell** (2026-10-10, Teil von 2a.5/10.3). `license` ist ein eigenes Feld statt eingebettet im Freitext; `src/lib/parking/license.ts` zerlegt ältere Angaben und unterscheidet dabei eine fehlende Lizenz von einer Lizenz namens „nicht angegeben". Die Oberfläche benennt die Lücke offen, statt sie zu verschweigen.

---

## 11. Benutzerkonten

- [~] 11.1 **Registrierung und Anmeldung gebaut** (2026-10-11). E-Mail-Adresse und Passwort, Sitzung über ein Cookie. Der Wunsch aus der Aufgabe lautete „möglichst ohne Passwort (Magic Link oder Passkey)" – **das geht derzeit nicht**, und der Grund ist kein technischer: Ein Magic Link setzt einen Mailversand voraus, und über den ist noch nicht entschieden (siehe [wheelee-infrastruktur.md](wheelee-infrastruktur.md), Abschnitt 7). Ein Anmeldeverfahren, dessen einziger Weg eine Mail ist, die nie ankommt, sperrt alle aus – auch den Administrator. Der offene Rest steht in [ToDos.md](ToDos.md).

  - **scrypt aus `node:crypto`, nicht SHA-256 und nicht Argon2.** Ein schneller Hash über ein Passwort ist auf einer Grafikkarte milliardenfach je Sekunde zu raten; die Aufgabe eines Passwort-Hashes ist genau das Gegenteil. Argon2id gilt als die modernere Wahl, ist aber nur als native Abhängigkeit zu haben – dieselbe Abwägung wie bei der Datenbank (D-02).
  - **Die Kostenparameter stehen im Hash selbst** (`scrypt$N$r$p$salt$hash`). Damit lassen sie sich später erhöhen, **ohne alte Passwörter zu entwerten**. Ohne diese Angabe wäre eine Umstellung nur über „alle müssen ihr Passwort neu setzen" möglich – und das trifft genau die Zielgruppe, der jede zusätzliche Hürde am meisten kostet.
  - **Bei unbekannter Adresse wird trotzdem ein Hash gerechnet.** Sonst wäre an der Antwortzeit ablesbar, welche Adressen registriert sind: unbekannt sofort, bekannt erst nach den ~100 ms des scrypt-Durchlaufs. Genau so werden Adresslisten auf Treffer abgeklopft.
  - **In der Datenbank steht nur der SHA-256 des Sitzungstokens**, nicht das Token. Wer die Datei in die Hand bekommt – etwa aus einem Backup –, kann damit keine Sitzung übernehmen. Ein Test hält das fest, denn am Verhalten der App ist es nicht zu sehen.
  - **Zehn Zeichen Mindestlänge, keine Zeichenklassen-Regeln.** Eine Vorschrift wie „ein Großbuchstabe, eine Zahl, ein Sonderzeichen" erzeugt nachweislich `Passwort1!` und nichts Besseres; die Länge ist der Faktor, der zählt. Nach oben sind 200 Zeichen die Grenze, weil scrypt über die ganze Eingabe rechnet und ein Megabyte-Passwort den Server bei jedem Versuch beschäftigen würde.
  - **Umlaute werden normalisiert** (`NFKC`). „ü" gibt es in Unicode zweimal – als eigenes Zeichen und als u mit Trema. Wer sein Passwort auf einem anderen Gerät eintippt, bekommt womöglich die andere Schreibweise und käme sonst nicht mehr hinein.
  - **Dass die Adresse schon vergeben ist, sagt die App offen.** Das verrät, wer hier ein Konto hat – die saubere Alternative („wir haben dir eine Mail geschickt") braucht wieder den Mailversand. Dagegen steht die Drosselung: fünf Registrierungen je Stunde und Herkunft.
  - **Kein „Passwort vergessen".** Ohne Mailversand gibt es keinen Weg, und ein Knopf, der nichts verschickt, wäre schlimmer als der Satz, der jetzt unter dem Formular steht.
  - **`ON DELETE CASCADE` für Sitzungen – mit Test.** In SQLite sind Fremdschlüssel standardmäßig **aus**; ohne das `PRAGMA foreign_keys = ON` bliebe nach dem Löschen eines Kontos eine gültige Sitzung zurück. Das ist am Verhalten nicht zu sehen, deshalb steht es als Test da.

- [x] 11.2 **Anmeldung wird so spät wie möglich verlangt – nämlich nie** (2026-10-11). Karte, Standort, Zielsuche, Detailansicht **und das Melden eines Fehlers** funktionieren ohne Konto. Die Anmeldung sitzt unten in den Einstellungen, hinter Darstellung und Karten-App.
  - **Kein eigener Reiter dafür.** Ein dritter Reiter über der Karte kostet Platz für etwas, das die meisten nie brauchen – genau die Abwägung aus 9.15, wo die Kopfzeile aus demselben Grund kleiner wurde.
  - **Das Konto ist ein Angebot, keine Bedingung.** Jede zusätzliche Hürde trifft die Zielgruppe, der die App helfen soll. Wer vor einem aufgehobenen Parkplatz steht, soll ihn melden können, ohne sich vorher zu registrieren.

---

## 17. Rückmeldungen: Fehler melden und Vorschläge

- [x] 17.0 **Wer Administrator ist, steht in der Umgebung** (entschieden und gebaut 2026-10-11). `ADMIN_EMAILS` nimmt eine oder mehrere Adressen, durch Komma getrennt; wer sich mit einer davon anmeldet, sieht den Reiter „Rückmeldungen". Die Datei liegt als `/opt/wheelee/.env` **nur auf dem NAS**, Vorlage ist [deploy/env.beispiel](deploy/env.beispiel).
  - **Keine Rollentabelle in der Datenbank.** Es gibt nichts zu pflegen und kein Fenster, in dem sich jemand selbst zum Administrator erklären könnte.
  - **Und bewusst kein Rückfall auf „der erste angemeldete Benutzer".** Das ist das übliche Muster und hier falsch: wheelee.de steht offen im Netz, die Registrierung ist für jede:n offen. Wer zuerst da wäre, bekäme alle Meldungen samt der freiwillig angegebenen Adressen zu sehen. **Ist die Variable leer, hat lieber niemand Zugriff.**
  - **Die Adresse steht nicht im Repository**, auch nicht in der Deploy-Anleitung. Begründung ist die des Abschnitts selbst: Eine Adresse im ausgelieferten Quelltext ist öffentlich und bekommt Spam – genau der Mangel, der den `mailto:`-Weg erledigt hat.

- [x] 17.1 **Tabelle `feedback`** (2026-10-11). Felder wie vorgesehen, dazu `contact_email`.

  **Eine Abweichung von der ursprünglichen Festlegung, und sie ist bewusst:** 17.1 hielt fest, dass **keine** E-Mail-Adresse gespeichert wird. Das ist auf deinen Wunsch geändert – aber nur in eine Richtung: Die Adresse ist **freiwillig**, das Formular sagt offen, wofür sie dient, und sie verschwindet mit der Meldung. Der Grund dafür wiegt schwerer als die Ersparnis: Ohne Rückfragemöglichkeit bleibt „irgendwo stimmt etwas nicht" oft genau das. Alles Übrige steht unverändert: **kein Standort, kein Name, keine IP-Adresse** – und das ist als Test festgehalten, nicht als Vorsatz.

  - `spot_id` macht aus der Meldung eine Datenkorrektur: Häufen sich „existiert nicht mehr" zu einem Parkplatz, gehört er auf die Prüfliste aus Abschnitt 3.
  - **Vom Gerät wird nur ein gekürzter Hash gespeichert.** Der Browser schickt eine Zufallszahl aus seinem eigenen Speicher; daraus entsteht `device_hash`. Zweck ist allein die Drosselung. Wer die Datenbank liest, kann damit niemanden wiedererkennen, der nicht selbst schreibt – und wer seine Browserdaten löscht, bekommt eine neue. Das ist kein Mangel: Eine Kennung, die das überlebt, wäre ein Wiedererkennungsmerkmal.
  - **`ON DELETE SET NULL` für das Konto, nicht `CASCADE`.** Eine Meldung beschreibt einen Fehler in den Parkplatzdaten. Dass das Konto dahinter verschwindet, macht den Fehler nicht ungeschehen.

- [x] 17.2 **`POST /api/feedback` mit Prüfung und Drosselung** (2026-10-11).
  - **Die Prüfung läuft zweimal, aus derselben Datei** (`src/lib/feedback.ts`). Im Browser ist sie eine Höflichkeit – der Hinweis steht sofort am Feld, ohne Wartezeit und ohne Anfrage ins Funkloch. Auf dem Server ist sie die eigentliche Prüfung, denn eine Prüfung im Browser ist keine.
  - **Die Antwort ist immer dieselbe**, ob gedrosselt oder gespeichert. Wer die Grenze auslotet, soll nicht erfahren, wo sie liegt – und wer aus Versehen zweimal abschickt, bekommt kein beunruhigendes „abgelehnt".
  - **Gezählt wird im Arbeitsspeicher, nicht in der Datenbank.** Die App läuft als ein Container; eine Tabelle dafür hieße, bei jedem Versuch zu schreiben – also genau das zu tun, was die Drosselung verhindern soll.
  - **Gleitendes Fenster statt Zähler je Kalenderminute.** Ein Zähler, der zur Minute zurückgesetzt wird, lässt an der Grenze die doppelte Menge durch. Und **abgelehnte Versuche zählen mit**: Sonst käme ein Dauerbeschuss nach Ablauf des Fensters sofort wieder mit voller Menge durch. Beides steht als Test da, mit übergebener Uhrzeit statt Wartezeit – ein Test, der zehn Minuten schläft, wird abgeschaltet.
  - **Die IP-Adresse wird nur gelesen, nirgends gespeichert.** Hinter dem Nginx Proxy Manager steht sie im ersten Eintrag von `X-Forwarded-For`; die Verbindung selbst käme sonst für alle gleich aus dem Tailscale-Tunnel.

- [x] 17.3 **Formular in der App statt `mailto:`** (2026-10-11). Damit ist `FEEDBACK_EMAIL` entfallen (D-06).

  **Was der alte Weg falsch machte**, vier Dinge, und jedes hätte Meldungen verloren: Eine Adresse im Quelltext ist öffentlich und bekommt Spam. `mailto:` setzt ein eingerichtetes Mailprogramm voraus – auf einem geliehenen oder frisch aufgesetzten Telefon passiert beim Antippen **nichts**, und die Meldung ist weg, ohne dass es jemand merkt. Meldungen in einem Postfach lassen sich nicht auswerten. Und wer schreibt, gibt dabei unfreiwillig seine Absenderadresse preis.

  - **Zwei Schaltflächen, kein Auswahlmenü.** Es sind genau zwei Möglichkeiten, und sie unterscheiden sich im Ton: Wer einen falschen Parkplatz meldet, ist in Eile; wer einen Vorschlag schreibt, nimmt sich Zeit. Ein Menü verlangt erst einen Griff, um zu zeigen, dass es zwei sind.
  - **Aus der Detailansicht heraus ist der Parkplatz vorbelegt und sichtbar genannt** („Meldung zu: Burchardstraße 24"). Nur dort weiß die Meldung, worum es geht – und genau diese ID macht später die Datenkorrektur möglich.
  - **Die Bestätigung steht in der App.** Das ist der eigentliche Fortschritt: Der alte Weg endete im Mailprogramm und ließ offen, ob etwas angekommen ist.
  - **Der Hinweis zur Adresse steht über dem Feld, nicht darunter**, und er ist in der Richtung formuliert, die wahr ist und nicht drängt: nicht „gib deine Adresse an, dann antworten wir", sondern **„nur mit Adresse können wir dir antworten"**. Darunter steht, was mit ihr geschieht. Beide Sätze stehen als Konstanten im Quelltext und sind durch einen Test gesichert – sie enthalten zwei Zusagen, und eine davon beim Umformulieren zu verlieren wäre leicht.
  - **Die Bestätigung sagt die Wahrheit über die Folgen:** mit Adresse „wir melden uns", ohne Adresse „du hörst nichts von uns – deine Meldung hilft trotzdem". Das Zweite wegzulassen hieße, jemanden auf eine Antwort warten zu lassen, die nie kommt.
  - **Kein Pflichtfeld für Kontaktdaten**, und der Fehlschlag wird benannt: Bricht die Verbindung weg, steht da „die Meldung ist **nicht** abgeschickt". Der Fall ist hier wahrscheinlicher als sonst – wer vor einem aufgehobenen Parkplatz steht, steht oft im Funkloch.

- [x] 17.4 **Übersichtsseite für Administratoren** (2026-10-11). Liste mit Filter nach Art und Stand, neueste zuerst, Stand ändern, interne Notiz, löschen.
  - **Als Reiter in der App und nicht als eigene Seite unter `/admin/feedback`**, wie ursprünglich vorgesehen. Der Grund steht in der Aufgabe selbst: Eine Meldung mit Parkplatz soll **direkt auf die Karte springen**. Eine zweite Seite hieße eine zweite Hülle ohne Karte – und dann sucht man den Parkplatz doch wieder von Hand zusammen, also genau die Arbeit, an der eine Korrektur scheitert. Der Reiter erscheint nur für Administratoren; für alle anderen bleibt die Kopfzeile bei zwei Reitern (9.15).
  - **Dass der Reiter fehlt, ist kein Schutz**, und das ist der Punkt: Geprüft wird serverseitig in `/api/admin/feedback`. Ein angemeldeter Benutzer **ohne** Administratorrecht bekommt ebenfalls 401 und nicht 403 – dass es diese Übersicht gibt, muss er nicht erfahren.
  - **Ein E2E-Test ruft ohne Anmeldung auf und erwartet 401 – für alle drei Wege**: lesen, ändern, löschen. Ein vergessener davon wäre die Lücke, die niemand sucht. Zusätzlich prüft er, dass die Antwort nicht einmal Zahlen durchsickern lässt. Eine Zugangsprüfung, die niemand prüft, ist beim nächsten Umbau still verschwunden.
  - **`GET /api/spots?id=…` kam dafür dazu** – ein Teil von 5.5, ohne das dort vorgesehene Bewertungs-Aggregat. Ohne diesen Weg wäre die Parkplatz-ID in der Meldung eine Zeichenkette zum Abtippen.
  - **Löschen fragt nach.** Eine Meldung ist der einzige Hinweis, den es auf diesen Fehler gibt; ein Fehlgriff auf dem Telefon soll ihn nicht vernichten.
  - **Stand und Notiz sind getrennt änderbar.** Sonst löschte jeder Klick auf „umgesetzt" die Notiz, in der steht, warum – ein Test hält das fest.
  - **Nach jeder Änderung wird die Liste neu geholt, statt sie im Browser nachzubessern.** Bei gesetztem Filter wandert der Eintrag sonst womöglich heraus, und eine Zeile, die laut Anzeige „umgesetzt" ist, aber im Filter „neu" noch steht, wäre eine falsche Auskunft über den eigenen Datenstand.
  - **`robots.txt` schließt `/api/` aus.** Das ist eine Bitte und kein Schutz – es steht da, damit die Adressen nicht über einen Suchindex auffindbar werden, falls doch einmal etwas durchrutscht.

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
