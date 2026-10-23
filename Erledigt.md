# Erledigt – wheelee

Abgeschlossene Punkte, ausgelagert aus [ToDos.md](ToDos.md), damit dort nur
noch steht, was zu tun ist. Die Nummerierung bleibt die der ToDo-Liste – wer
in einem Commit oder einer Notiz „3.0b" liest, findet es hier wieder.

Diese Liste ist kein Änderungsprotokoll, sondern eine Begründungssammlung: Sie
hält fest, **warum** etwas so gelöst wurde. Mehrere Punkte beschreiben Fehler,
die wirklich passiert sind; sie stehen hier, damit niemand – auch kein
späterer Durchgang durch dieses Projekt – dieselbe Entscheidung noch einmal
anders trifft.

**Stand (nachgezählt 2026-10-23):** **150 Einträge** auf oberster Ebene –
davon 140, die mit einer ToDo-Nummer **beginnen**, und 10, die das nicht tun
(die Entscheidungen D-01, D-02, D-04, D-06, D-08 sowie fünf Einträge, die zu
keinem nummerierten Punkt gehören).
Einige stehen als `[~]`: Ihr gebauter Teil steht hier, ihr offener Rest in
`ToDos.md`.

> **Mehrere Einträge sind kein gebauter Code**, sondern der Rückschnitt der
> offenen Liste: verworfene Pläne (Abschnitt 5), ein Punkt, den die
> Wirklichkeit beantwortet hat (8.10), eine Doppelung (10.3) und am 2026-10-20
> die große Kürzung von `ToDos.md`. Sie stehen hier, weil sonst niemand
> erführe, **warum** sie dort verschwunden sind – und der Nächste sie wieder
> aufnähme.
>
> **Dazu drei Abschnitte ohne Kästchen**, weil sie Begründung ohne eigene
> Aufgabe sind: „Fallstricke beim Arbeiten am Datenbestand", „Zurückgestellte
> Vorhaben (13, 15, 16)" und der Befund zu 12.5a, dessen Messung abgeschlossen
> ist, während der Punkt selbst offen bleibt.

Unterpunkte werden **nicht** mitgezählt – sie sind Begründung, keine eigenen
Aufgaben.

> **Die Zählweise stand bis zum 2026-10-17 nur als „Einträge der obersten
> Ebene" da, und die Zahl war seither 112.** Das sind die _nummerierten_
> Einträge; die sechs Entscheidungen fehlten in der Rechnung, ohne dass die
> Beschreibung das hergab. Beide Zahlen stehen jetzt ausdrücklich da, weil
> nachgezählt sonst jedes Mal etwas anderes herauskommt – je nachdem, wen man
> fragt:
>
> ```bash
> node -e "const l=require('fs').readFileSync('Erledigt.md','utf8').split('\n').filter(x=>/^- \[(x|~)\]/.test(x)); console.log('gesamt',l.length,'| mit Nummer',l.filter(x=>/^- \[(x|~)\] [0-9D]/.test(x)).length);"
> ```
>
> **7.7 steht absichtlich zweimal** (zwei Durchgänge, 82 → 93 → 96 %); der
> zweite Eintrag nennt den ersten. Das ist die Ausnahme von der Regel „ein
> doppelter Eintrag ist schlimmer als keiner" aus [CLAUDE.md](CLAUDE.md) –
> erlaubt, weil er die Vorgeschichte benennt statt sie zu wiederholen.

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

## 8. Bewertungen (2026-10-19)

- [x] 8.1–8.7 **Bewertungen gebaut** (2026-10-19). Die Kernfunktion aus [Konzept.md](Konzept.md), die als einzige noch ganz fehlte.

  **Die Regel ist am 2026-10-19 geändert worden, und das gehört an den Anfang**, weil sie in `ToDos.md` seit dem 2026-10-09 anders dastand:

  |                    | vorher (2026-10-09)          | **jetzt (2026-10-19)**         |
  | ------------------ | ---------------------------- | ------------------------------ |
  | 👍 Existiert       | ohne Konto                   | **nur mit Konto**              |
  | 👎 Existiert nicht | nur mit Konto                | nur mit Konto                  |
  | Sehen              | –                            | **ohne Konto**                 |
  | Grenze             | 1× pro Parkplatz pro Sitzung | **1× pro Parkplatz pro Konto** |

  Die alte Regel wollte die Hürde dort niedrig halten, wo sie nützt. Der Preis war, dass der Daumen hoch **anonym** blieb und damit nur über eine Gerätekennung zu begrenzen gewesen wäre – also über den Browser-Speicher, den ein privates Fenster aushebelt. **Die neue Regel macht die Zählung erst belastbar:** Zehn Bestätigungen heißen zehn Konten, nicht zehnmal dieselbe Person mit geleertem Browser. Dass die Zählerstände **ohne** Konto sichtbar sind, hält den Verlust klein – die Auskunft, auf die es ankommt, hängt an keiner Anmeldung.

  **Der Schutz steckt im Schema, nicht im Code:** `UNIQUE (spot_id, account_id)` in Migrationsschritt 2. „Höchstens eine Stimme je Konto und Parkplatz" ist damit keine Regel, die ein Server durchsetzen muss, sondern eine Eigenschaft der Tabelle – ein zweiter Schreibweg könnte sie gar nicht verletzen. Ein Test schießt deshalb bewusst mit rohem SQL daneben und erwartet den `UNIQUE`-Fehler; ginge er durch, wäre jede Zählung angreifbar, sobald jemand einen zweiten Weg einbaut.

  **Drei Fälle, eine Bedienung.** Dieselbe Richtung noch einmal nimmt zurück, die andere dreht um, keine setzt neu. Das ist die einzige Variante, die sich erklären lässt: Ein Knopf, der beim zweiten Druck nichts tut, wäre nicht zu verstehen – und das zweite Antippen ist der häufigste Fall überhaupt, lange vor jedem Angriff.

  **Die Stimme lässt sich jederzeit ändern, und das ist kein Schlupfloch.** Ein Parkplatz, den jemand vor einem Jahr bestätigt hat, kann heute aufgehoben sein. Wäre die erste Stimme endgültig, könnte ausgerechnet die Person, die es am besten weiß, die Korrektur nicht melden. Die Grenze bleibt gewahrt: Es wird ersetzt, nicht ergänzt.

  **Gedrosselt wird trotz Anmeldepflicht**, und zwar nach Konto (30 in zehn Minuten) und zusätzlich nach Herkunft (120). Der Grund ist genau der Fall, den das Schema **nicht** abfängt: Zwei Stimmen zum selben Parkplatz sind unmöglich, hundert Stimmen zu hundert Parkplätzen nicht. Die Grenze nach Herkunft ist bewusst weit – hinter einem Carrier-NAT teilen sich viele Geräte eine Adresse, und eine enge Grenze träfe dort die Falschen.

  **Keine Gerätekennung mehr.** Sie war nötig, solange anonym bewertet werden durfte. Mit Anmeldepflicht ist das Konto die Zurechnungseinheit, und eine zweite, schwächere daneben wäre nur eine weitere Spur ohne Nutzen (Abschnitt 10).

  **Zeitpunkte, nicht nur Zahlen** (8.5): „Zuletzt bestätigt am …" steht unter den Knöpfen. Maßgeblich ist `COALESCE(updated_at, created_at)` – wann die Stimme **zuletzt galt**, nicht wann sie abgegeben wurde. Sonst läse sich eine längst umgedrehte Bestätigung wie eine frische.

  **Ohne Konto stehen die Knöpfe trotzdem da, abgeschaltet, mit dem Grund daneben** (8.3). Ein weggelassener Knopf sieht aus wie eine kaputte App – man sucht ihn. Dass er abgeschaltet aussieht, ist dabei Höflichkeit und **kein Schutz**: Die Prüfung sitzt in der Route, und ein E2E-Test ruft sie ohne Anmeldung auf und erwartet 401.

  **Bewertungen ändern nichts an den Daten** (8.6). Kein Parkplatz verschwindet, egal wie oft er gemeldet wird. `spotsReportedGone()` liefert eine Prüfliste für einen Menschen – und zählt Konten, nicht Stimmen.

  **Ein Fehlschlag, der die Tests besser gemacht hat:** Einzeln liefen alle sechs E2E-Tests grün, parallel scheiterten drei. Grund war keine Schwäche im Code, sondern eine Annahme im Test: Acht Arbeiter teilen sich **einen** Entwicklungsserver und damit eine Datenbank, und alle öffnen denselben erstbesten Parkplatz – ihre Stimmen addierten sich. Geprüft wird jetzt die **Änderung** statt fester Zahlen. **Ein Test, der nur allein grün ist, ist schlimmer als keiner:** Er macht die Suite unzuverlässig, und irgendwann sieht niemand mehr hin.

  Die Datenschutzerklärung hat einen eigenen Abschnitt dazu bekommen – gespeichert werden Parkplatz, Richtung, Konto und Zeitpunkt, **kein** Standort und **keine** Gerätekennung; anderen werden nur Summen gezeigt, nie wer wie bewertet hat. Eine Löschfrist gibt es bewusst nicht: Eine Bestätigung, die nach einem Jahr verschwände, ließe den Parkplatz wieder als ungeprüft dastehen.

  Geprüft mit **13 Unit-Tests** (`src/lib/db/ratings.test.ts`, gegen eine echte Datenbank, weil die Regel im Schema steht) und **6 E2E-Tests** (sichtbar ohne Konto, Endpunkt lehnt ohne Konto ab, Zählerstände öffentlich, unbekannte ID als 404, setzen/umdrehen/zurücknehmen, Bestand nach dem Schließen).

- [x] 8.8 / 8.9 **Aus Bewertungen wird Datenpflege** (2026-10-20). Die Knöpfe standen seit dem 2026-10-19, aber die Meldungen lagen in der Datenbank und erreichten niemanden. **Eine Bewertung, die niemand liest, ist für die Datenpflege wertlos** – das war der fehlende Schritt, nicht ein weiteres Feature.

  **8.8: Die Prüfliste im Reiter „Rückmeldungen"** (`/api/admin/reported`, `src/components/ReportedSpots.tsx`).

  - **Im selben Reiter, nicht in einem eigenen.** Beide Abschnitte beantworten dieselbe Frage – „wo stimmen die Daten nicht?" –, nur aus zwei Quellen: geschriebene Meldungen und Daumen nach unten. Ein dritter Reiter kostete Platz in der Kopfzeile, den die Karte braucht (9.15), und man müsste zwischen zwei Listen wechseln, um sich ein Bild zu machen.
  - **Sie steht oben, und das wurde erst im Browser entschieden.** Zuerst stand sie unter den Rückmeldungen – und war dort hinter zehn Meldungen nur nach langem Scrollen zu sehen. Das ist genau der Fehler, den dieses Projekt zweimal gemacht hat: der folgenlose Hinweis bei der dünnen Datenlage (2d.10) und der beinahe verschwundene Haftungshinweis (9.11). **Ein Hinweis, den niemand sieht, ist schlimmer als keine Prüfung.** Dazu passt die Reihenfolge auch sachlich: Die Prüfliste ist nach oben begrenzt (Mindestzahl) und im Normalfall drei Zeilen lang, die Rückmeldungen wachsen unbegrenzt.
  - **Die Bestätigungen stehen neben den Meldungen.** Drei Meldungen bei null Bestätigungen sind eine andere Lage als drei bei zwanzig. Ohne diese Zahl liest sich die Liste als Urteil statt als Hinweis – und die Bewertungen ändern die Daten nach wie vor nicht (8.6).
  - **Ein gemeldeter Parkplatz, den der Bestand nicht mehr kennt, bleibt in der Liste.** Das ist kein Fehlerfall, sondern die **Bestätigung** der Meldung: Der nächste Import hat ihn nicht mehr geliefert. Ihn herauszufiltern hieße, die beste Nachricht zu verschweigen, die diese Liste haben kann; stattdessen steht sie als Satz daneben.
  - **Die Mindestzahl ist zwei und wählbar bis eins.** Eine einzelne Meldung kann ein Fehlgriff sein, ein verwechselter Platz oder jemand vor der falschen Hausnummer. Zwei Meldungen sind zwei **Konten** – dank `UNIQUE (spot_id, account_id)` also zwei Menschen –, und das ist der Punkt, an dem Nachsehen lohnt. Die Stufe „1 (alle)" gibt es, um sich trotzdem alles ansehen zu können.
  - **Dieselbe Zugangsregel wie bei 17.4:** ohne Administratorrecht 401 und nicht 403, geprüft serverseitig. Ein eigener E2E-Test ruft die Route ohne Anmeldung auf – auch mit eigenem `min`-Wert – und prüft, dass nicht einmal ein Zählerstand durchsickert. Dass er dem Test für `/api/admin/feedback` gleicht, ist beabsichtigt: **Eine zweite Zugangsprüfung ist genau der Ort, an dem eine vergessen wird.**

  **8.9: `npm run validate` liest die Bewertungen** (`scripts/import/ratings.mts`, neuer Abschnitt im Bericht).

  - **Eine eigene, ausdrücklich lesende Verbindung – und das ist der Grund, warum die Datei überhaupt existiert.** `src/lib/db/sqlite.ts` legt die Datenbank an, erzeugt das Verzeichnis und führt Migrationen aus. Ein Prüfskript, das von sich sagt „ändert keine Daten", darf das nicht: Es würde auf einem frischen Rechner eine leere Datenbank anlegen, nur weil jemand einen Bericht erzeugt hat. `readGoneReports` öffnet die Datei mit `readOnly` und legt sie nicht an – zwei Tests halten genau das fest.
  - **„Nicht geprüft" ist nicht „nichts gemeldet", und der Bericht sagt, welches von beidem gilt.** Fehlt die Datei, steht dort ausdrücklich, dass nicht geprüft wurde und wo die Datenbank erwartet wird; sie liegt im Betrieb auf dem NAS, und wer den Bericht auf seinem Rechner erzeugt, hat sie nicht. Ein stillschweigend leerer Abschnitt läse sich als „niemand hat etwas gemeldet" – **eine Behauptung über Daten, die niemand angesehen hat.** Das ist dieselbe Unterscheidung wie `⚪ geprüft, nichts gefunden` gegen `⬜ noch nicht geprüft` im Importstand (2e.9), und sie steht hier aus demselben Grund.
  - **Eine Datenbank ohne Tabelle `rating` ergibt „nichts gemeldet", nicht „nicht geprüft".** Stammt die Datei aus der Zeit vor Migrationsschritt 2, **kann** es keine Bewertungen geben – dann ist die leere Antwort die wahre Auskunft.
  - **Befund je Stadt und zusätzlich ein eigener Abschnitt.** Dieselbe Lehre wie bei der dünnen Datenlage: Eine Stadt, deren einziger Befund ein Hinweis ist, erscheint oben gar nicht – die Meldung stünde im Bericht und würde nie gelesen. Als eigener Abschnitt ist sie eine Arbeitsliste, die man Zeile für Zeile abarbeiten kann.
  - **Als `verdacht`, nicht als `fehler`.** Zwei Meldungen sind ein Hinweis, kein Beweis: Vielleicht ist der Platz aufgehoben, vielleicht war er zugeparkt. Ein Bericht, der das als Fehler ausgibt, verleitet zu genau dem, was 8.6 ausschließt – Daten zu ändern, weil jemand abgestimmt hat.
  - **Der Bestand wird über alle Seed-Dateien aufgebaut, auch wenn nur eine Stadt geprüft wird.** Eine Meldung trägt nur die ID; ohne den ganzen Bestand wüsste das Skript nicht, ob eine unbekannte ID zu einer anderen Stadt gehört oder gar nicht mehr existiert. Das ist der Unterschied zwischen „nicht zuständig" und „verschwunden". Bei gesetztem Städtefilter bleiben unbekannte IDs deshalb außen vor – sie der falschen Stadt anzuhängen wäre schlimmer, als sie erst im vollständigen Lauf zu zeigen.
  - **Die Zuordnung läuft über die Parkplatz-ID**, und das ist der Grund, warum die IDs sich aus der Örtlichkeit ableiten und nicht aus der Zeilennummer (2b.1): Eine Meldung von vor einem Jahr muss nach einem Neuimport denselben Parkplatz treffen.

  **Der Fallstrick aus [CLAUDE.md](CLAUDE.md) ist beim Schreiben sofort zugeschnappt:** `„existiert nicht mehr"` in einer mit `"` begrenzten Zeichenkette endet am ASCII-Anführungszeichen – drei Stellen, alle von `tsc` gemeldet und mit `'…'` als äußerer Begrenzung behoben. Anders als bei den beschädigten Umlauten merkt man es also sofort.

  **Zwei Befunde aus dem Browser, die kein Test gefunden hätte** – geprüft wurde mit einem Testkonto gegen den Entwicklungsserver, mit echten Meldungen auf echte Frankfurter IDs:
  - Die Reihenfolge der beiden Abschnitte (siehe oben) – der wichtigere der beiden.
  - „Parkplätze mit mindestens **1 Meldungen**" bei der Stufe „1 (alle)". Geprüft wird der Zählerstand, nicht die Grammatik.

  Der Lauf gegen eine Probe-Datenbank hat alle drei Wege des Berichts gezeigt: keine Datenbank („nicht geprüft"), leere Tabelle („geprüft, nichts gefunden") und Meldungen samt einer ID, die der Bestand nicht mehr kennt. **Der versionierte Bericht `data/_validierung.md` wurde dabei nicht verändert** – ein reiner Offline-Lauf hätte die OSM-Abgleiche des letzten Netz-Laufs verloren; er wird beim nächsten vollständigen Lauf (3.10) ordentlich neu erzeugt.

  Geprüft mit **9 Unit-Tests** (`scripts/import/ratings.test.mts`, gegen eine echte Datenbank, weil die Auswertung in SQL steckt und ein Fehler dort unsichtbar wäre) und **1 E2E-Test** für die Zugangsprüfung.

- [x] 3.0i **Straßennamen: Dormagen behoben, und zwei Fehler im Werkzeug gefunden** (2026-10-20). Der Befund lautete „174 von 18.072 Standorten ohne Straßennamen, Dormagen 82 von 82". Behoben ist der eigentliche Fall; **was offen bleibt, ist keine Lücke mehr, sondern eine Entscheidung** – sie steht in [ToDos.md](ToDos.md).

  **Dormagen: 75 von 82 ergänzt, 24 davon mit Hausnummer.** Statt 8 verschiedener Bezeichnungen hat die Stadt jetzt 54, und kein einziger Eintrag heißt mehr „Behindertenparkplatz Dormagen". Liste und Detailansicht sind damit für diese Stadt überhaupt erst brauchbar.

  **Die Vermutung in der Aufgabe war falsch, und das gehört hierher.** Dort stand: „ein Platzhalter bei 75 von 82 Einträgen deutet auf einen nicht erkannten Spaltennamen". Dormagen kommt aber aus **OpenStreetMap**, nicht aus einer amtlichen Quelle – es gibt keine Spalte, die man übersehen könnte. Die Ursache war banal: `import:streets` ist für diese Stadt nie gelaufen. Die Zahl 75 stimmte, die Erklärung nicht. **Eine plausible Ursache ist keine gemessene** ([CLAUDE.md](CLAUDE.md)).

  **Fehler 1: Der Lauf hätte 29 echte Namen zerstört.** `street-names.mts` setzt `label` auf „Straße Hausnummer" – bedingungslos, für jeden Standort, dem es eine Straße zuordnet. Unter den 174 offenen Standorten waren aber 29 mit einem **eigenen** Namen: „IKEA" (Duisburg), „Tiefgarage Klinikum" (Mannheim), „Wanderparkplatz Tiergarten" (Siegen), „Richard-Hecht-Schule" (Stutensee), „Messe Karlsruhe" (Rheinstetten), „P+R Bahnhof" (Germersheim) und weitere – sieben davon aus **amtlichen** Quellen, wo die Angabe nicht wiederkommt. Sie wären durch den Namen einer Straße innerhalb von 150 m ersetzt worden.
  - **Gefunden hat es nicht ein Test, sondern der Blick auf die Daten, bevor der Lauf schreiben durfte.** Der Lauf war gestartet; beim Durchsehen der sieben amtlichen Städte fiel auf, was dort in `label` steht. Abgebrochen, bevor die erste Datei geschrieben war – nachgewiesen: 174 unverändert, keine Datei angefasst.
  - **Dieselbe Gefahr war schon einmal knapp abgewendet worden:** Beim Karlsruher Import wäre „Bahnhof" beinahe als Straßenname eingetragen worden (2e.2/2e.3), und 3.0d hielt fest, dass bei aussagekräftigen OSM-Namen „eine Straße keine Verbesserung wäre". Die Regel stand also zweimal in dieser Datei – nur nicht im Code.
  - **Die Korrektur ist eine eigene Funktion unter Tests:** `isGenericLabel` in `src/lib/parking/display.ts` entscheidet, was ein Platzhalter ist („Behindertenparkplatz <Stadt>", das Präfix allein) und was ein Name. Nur Platzhalter gelten als Lücke; alles andere bleibt unangetastet, und der Lauf **nennt**, wie viele er übergangen hat – sonst setzt der Nächste die Regel außer Kraft, um „die letzten Lücken" zu schließen. Zwölf Tests, jeder Fall aus dem Bestand.

  **Fehler 2: Eine leere Overpass-Antwort galt als Ergebnis.** Vier Städte meldeten hintereinander „0/14 (0 %)", während der Dienst nachweislich mit HTTP 502 und 504 antwortete. Für ein Stadtgebiet mit Parkplätzen kann es keine benannte Straße geben – der Lauf nahm die leere Liste aber als Befund („hier gibt es nichts zu ergänzen"). **Genau der Fallstrick, der in [README](README.md) und [Datenpflege.md](Datenpflege.md) für den Parkplatz-Import ausdrücklich steht und hier fehlte.** Jetzt bricht die Stadt mit einer Meldung ab und bleibt auf der Liste. Er griff sofort: Baden-Baden meldete im nächsten Lauf „keine einzige benannte Straße geliefert" statt „0/5".

  **Und ein Befund, der eine Entscheidung ist, keine Aufgabe.** Nach Dormagen blieben 70 Platzhalter in 19 Städten – alle mit 0 %. Gemessen, unabhängig vom Skript nachgerechnet: **Diese Standorte liegen 150 bis 205 m von der nächsten benannten Straße entfernt**, die Grenze steht auf 150 m (`MAX_STREET_METERS`). Neumünster 151 m, Euskirchen 152 m, Chemnitz 150 m, Marl 183 m.
  - **Das ist kein Zufall, sondern ein Auswahleffekt:** Der Lauf von 3.0h hat mit derselben Grenze alles erfasst, was näher liegt. Was übrig ist, **muss** jenseits der Grenze liegen – deshalb drängt sich das Minimum knapp darüber.
  - Es sind überwiegend große Parkplätze an Einkaufszentren, deren Stellplätze weit von der Fahrbahn liegen. Ob „Wasbeker Straße" für einen Stellplatz 205 m abseits eine Hilfe oder eine Irreführung ist, ist eine Abwägung und keine Messung – **und an einem Schwellenwert ohne Beleg zu drehen ist genau der Fehler, der bei Chemnitz schon einmal passiert ist** (2d.10: „eine Schwelle, die um 0,28 danebenliegt, ist kein Schutz"). Die Frage liegt deshalb bei Torsten und steht als Entscheidung in `ToDos.md`.
  - **Die Ausgabe sagt jetzt, warum 0 % herauskommt** („14 zu weit von jeder Straße, nächste 151 m, Grenze 150 m"). Vorher las sich ein richtiges Ergebnis wie ein Fehlschlag – und hat beim Suchen nach der Ursache echte Zeit gekostet.
  - **Entschieden am 2026-10-20: Die Grenze bleibt bei 150 m.** Torsten auf Vorlage der drei Möglichkeiten (so lassen / 250 m / 175 m). Damit behalten diese 70 Standorte ihren Platzhalter, und das ist die ehrlichere Angabe: Eine Straße 200 m entfernt ist keine Adresse, sondern eine Richtungsangabe. Ein zweiter gegriffener Schwellenwert („nur bis 175 m") wäre genau die Art Zahl, die später niemand mehr begründen kann. **Damit ist 3.0i abgeschlossen** – die 99 verbliebenen Standorte sind keine offene Aufgabe, sondern ein benannter Rest: 29 mit eigenem Namen, 70 ohne Straße in Reichweite.

  Stand danach: **99 von 18.072 Standorten ohne Straßennamen** (0,5 %), davon 29 mit eigenem Namen (keine Lücke) und 70 jenseits der 150-m-Grenze. Tests: 320 Unit-Tests, 43 E2E-Tests.

  **Was an diesem Lauf offen blieb, der Vollständigkeit halber:** Von den 19 Städten mit Platzhaltern sind 13 gemessen (61 der 70 Standorte); die letzten 6 Städte mit 9 Standorten wurden nicht mehr abgefragt, weil Overpass an diesem Tag unter Last stand und je Stadt rund zehn Minuten mit Wiederholungen brauchte. Der Lauf ist gefahrlos wiederholbar – er nimmt von selbst nur Städte mit Platzhaltern, und bei 0 % schreibt er nichts. Für den Befund ändert es nichts: Das Muster ist über 13 Städte hinweg dasselbe.

- [x] 3.1 **Kreuzvergleich zu Ende geführt: drei Gruppen und ein Ergebnis je Standort** (2026-10-20). Die Hälfte stand seit dem 2026-10-09 – `crossCheckWithOsm` paarte und schrieb eine Quote. Was fehlte, war das, was die Quote nicht sagen kann.

  **Die dritte Gruppe ist der eigentliche Gewinn.** Bisher wurde gezählt, wie viele amtliche Standorte einen OSM-Gegenpart haben. Jetzt gibt es:
  - **bestätigt** – beide Quellen kennen ihn, die verlässlichste Angabe im Bestand;
  - **nur amtlich** – in OSM nicht erfasst; kein Fehler, nur ungeprüft;
  - **nur OSM** – **fehlt in der amtlichen Liste.** Entweder neu entstanden oder dort vergessen. Diese Gruppe fiel vorher komplett weg, und sie ist die interessanteste: Eine amtliche Liste gilt als vollständig, und genau deshalb sucht niemand in ihr nach Fehlendem. Beim Probelauf für Germersheim kennt OpenStreetMap **11 Stellplätze, die die amtliche Liste nicht führt** – bei 6 amtlichen Standorten.

  **Die Paarung ist eins zu eins, und das ist keine Feinheit.** Ohne diese Regel wäre die Quote geschmeichelt: An einem Krankenhaus liegen zwanzig amtliche Stellplätze auf engem Raum, und ein einziger OSM-Parkplatz mit `capacity:disabled=20` hätte sie alle als „von zwei Quellen bestätigt" ausgewiesen. **Dann heißt bestätigt nichts mehr** – und das Wort steht später in der Oberfläche, wo sich jemand darauf verlässt (3.7). Ein Test hält genau diesen Fall fest.

  **Zugeordnet wird nach dem kürzesten Abstand, nicht nach der Reihenfolge der Datei.** Steht ein 28 m entferntes Paar vor einem 3 m entfernten, nähme das falsche den Gegenpart weg und der richtige Standort gälte als unbestätigt. Eine Auskunft, die von der Sortierung der Quelldatei abhängt, ist keine. Auch das steht als Test da.

  **Das Ergebnis je Standort steht in `data/_bestaetigt.json`:**
  - **Eine eigene Datei, nicht ein Feld in der Seed-Datei.** Seed-Dateien erzeugt der Importer; ein Prüfergebnis darin wäre beim nächsten Lauf weg, und [Datenpflege.md](Datenpflege.md) verbietet aus demselben Grund das Bearbeiten von Hand. Der Unterstrich sagt, was die Datei ist: Arbeitsstand, von einem Skript geschrieben.
  - **Beide Zustände werden geschrieben, nicht nur „bestätigt".** Stünden nur die bestätigten IDs darin, könnte die Oberfläche „geprüft und nicht bestätigt" nicht von „noch nie geprüft" unterscheiden. Das ist derselbe Fehler, der im Importstand einmal eine leere Overpass-Antwort als Ergebnis durchgehen ließ (2e.9) – hier wiegt er schwerer, weil „nicht bestätigt" an einem nie geprüften Standort eine Falschaussage über eine Angabe wäre, auf die sich jemand verlässt.
  - **Der Stand wird ergänzt, nicht ersetzt.** `npm run validate -- koeln` darf das Ergebnis der übrigen 22 Städte nicht löschen – sonst stünden sie plötzlich als „nie geprüft" da, weil jemand eine einzelne Stadt nachgesehen hat. Die alten Einträge **der geprüften Stadt** werden dagegen verworfen, damit ein Standort, den es nicht mehr gibt, nicht als bestätigt stehen bleibt.
  - **Geschrieben wird nur, wenn wirklich abgeglichen wurde.** Ein Lauf, in dem jede Abfrage scheitert, soll den vorhandenen Stand nicht mit einem frischen Datum versehen – das sähe aus wie ein erfolgreicher Lauf.

  **Die Rechnung liegt in einer eigenen Datei** (`scripts/import/crosscheck.mts`) **und nicht in `validate.mts`** – nicht aus Ordnungsliebe: `validate.mts` ruft beim Laden `main()` auf, ein Test davon würde also das ganze Prüfskript starten. Die Paarung ist dadurch mit **8 Unit-Tests** abgedeckt, ohne einen Gemeinschaftsdienst zu befragen.

  **Im Bericht steht der gespeicherte Stand samt Datum, auch im Offline-Lauf.** Ein Abgleich vom letzten Monat ist eine Auskunft; „nicht geprüft" wäre dort falsch, denn geprüft wurde ja. Dasselbe gilt für die Spalte in „Alle Städte", die jetzt aus der Datei gefüllt wird, wenn der aktuelle Lauf nicht abgeglichen hat.

  **Ein Mangel, der erst am Ergebnis auffiel:** Die Liste „nur in OpenStreetMap" zeigte neunmal „Germersheim" untereinander – `spotTitle` kürzt den OSM-Platzhalter „Behindertenparkplatz Germersheim" auf den Stadtnamen, und das liest sich wie die Bezeichnung des Stellplatzes. Dort steht jetzt „(ohne Namen in OSM)", die Auskunft trägt die Koordinate. Gefunden mit `isGenericLabel` aus 3.0i – dieselbe Unterscheidung, zweiter Anwendungsfall am selben Tag.

  **Was offen bleibt und warum es nicht hierher gehört:** Der vollständige Lauf über alle 23 amtlichen Städte ist **3.10** und braucht Netz; am 2026-10-20 stand Overpass unter Last (502/504). Geprüft ist die Kette an Germersheim, Ende zu Ende: Abgleich, Datei, Bericht. Die Anzeige in der Detailansicht ist **3.7**.

- [x] 3.7 **„Von zwei Quellen bestätigt" steht in der Detailansicht** (2026-10-20). Das ist die Angabe, auf die sich jemand verlässt, **bevor** er losfährt – zwei unabhängige Quellen kennen denselben Stellplatz an derselben Stelle.

  **Nur der positive Fall wird angezeigt, und das ist eine Entscheidung.** „Nur eine Quelle" träfe rund vier von fünf geprüften Standorten und wäre dort eine Warnung ohne Anlass: Eine amtliche Liste ist nicht schlechter, weil OpenStreetMap den Platz nicht kennt. Vor allem aber ließe sich „nicht bestätigt" **nicht von „noch nie geprüft" unterscheiden** – erst 23 von 209 Städten haben überhaupt eine zweite Quelle. Ein Hinweis bei allen anderen wäre eine Behauptung über Daten, die niemand angesehen hat. **Das Fehlen dieses Felds ist deshalb keine Aussage**, und genau das hält ein E2E-Test fest: An einem nicht abgeglichenen Standort darf weder „bestätigt" noch „nicht bestätigt" stehen.

  **Der Weg der Angabe in die Oberfläche war die eigentliche Frage.** Die Datei `data/_bestaetigt.json` dem Browser mitzuschicken wäre die naheliegende Lösung – und falsch: Das ist eine Liste mit tausenden IDs, und die 128 KB der Seite sind hart erarbeitet (5.4). Stattdessen hängt `spots.ts` den Zustand beim Aufbau des Bestands an jeden Standort, und er geht mit der ohnehin fälligen Antwort von `/api/spots` mit – ein Feld, meist leer, je Parkplatz.
  - **Einmal beim Aufbau, nicht je Anfrage:** Es ist nur ein Nachschlagen, aber bei 18.072 Standorten und einer Antwort je Kartenbewegung zählt das.
  - **`spots.ts` ist die richtige Stelle**, weil es laut eigenem Kommentar „die einzige Stelle ist, die weiß, woher die Parkplätze kommen". Die Seed-Dateien bleiben unberührt: `confirmation` ist kein Datum der Quelle, sondern das Ergebnis einer Prüfung – es steht als **optionales** Feld im Datenmodell, mit genau dieser Begründung daneben.

  **Ein Test, der allein grün war und im vollen Lauf rot** – dieselbe Falle wie bei den Bewertungen (8.1–8.7), und sie hat beim zweiten Mal weniger Zeit gekostet, weil die Lehre schon dastand. Grund war ein Wettlauf: Die Leiste zeigt beim Laden die servergerenderten Standorte um die Stadtmitte und ersetzt sie erst, wenn die Standortfreigabe da ist; der Test klickte auf den Vorschlag von vorher. Jetzt wartet er, bis die Leiste **den gemeinten** Standort nennt, und prüft im Dialog zuerst die Überschrift und dann die Angabe. **Die Gegenprobe gehört dazu:** Ein Test, der nur nach dem grünen Hinweis sucht, wäre auch dann grün, wenn er den falschen Parkplatz offen hat.

  **Die ID steht nicht im Test.** Welche Standorte bestätigt sind, ändert sich mit jedem `npm run validate`; der Test liest sich eine bestätigte ID aus der Datei und holt die Koordinate über die API. Gibt es keine, überspringt er sich selbst – dass niemand abgeglichen hat, ist kein Fehler der Oberfläche.

  Geprüft mit **6 Unit-Tests** (`src/lib/parking/confirmation.test.ts` – sie prüfen die **Regeln**, nicht den Inhalt der Datei: ein Test auf „Germersheim ist bestätigt" wäre beim nächsten Lauf falsch, ohne dass etwas kaputt wäre) und **2 E2E-Tests**. Stand: 334 Unit-Tests, 45 E2E-Tests.

### Ein Fallstrick der Testsuite, über den ich selbst gestolpert bin (2026-10-20)

**Die E2E-Suite lässt sich nicht mehr als zweimal je Stunde vollständig laufen
lassen** – und der Fehlschlag sieht aus wie ein Fehler in den Bewertungen.

Zwei Tests in `e2e/bewertungen.spec.ts` legen je Lauf **ein neues Konto** an
(`bewertung-<Zeitstempel>@example.de`). Die Drosselung erlaubt
`register: { max: 5, windowMs: 60 * 60_000 }` – fünf Registrierungen je Stunde
und Herkunft. Ab dem dritten Lauf innerhalb einer Stunde scheitert die
Anmeldung, und was man sieht, ist ein **abgeschalteter Bewertungsknopf**:

```
locator resolved to <button disabled aria-label="Existiert, 10 Stimmen">
  - unexpected value "disabled"
```

Das liest sich wie „die Anmeldepflicht ist kaputt" und ist das Gegenteil: Die
Drosselung tut genau das, wofür sie gebaut ist. **Der Zähler liegt im
Arbeitsspeicher** (17.2: „Gezählt wird im Arbeitsspeicher, nicht in der
Datenbank"), ein Neustart des Entwicklungsservers setzt ihn also zurück – das
ist die Abhilfe, nicht eine Stunde warten.

Nicht geändert, und zwar bewusst: Die Grenze heraufzusetzen würde einen echten
Schutz für die Bequemlichkeit beim Testen aufweichen. Die saubere Lösung wäre,
dass sich die beiden Tests **ein** Konto teilen und es wiederverwenden – das
ist eine Änderung an fremden Tests und gehört nicht in einen Punkt über die
Anzeige bestätigter Standorte. Hier steht es, damit der nächste Durchgang nicht
wieder eine halbe Stunde nach einem Fehler sucht, den es nicht gibt.

> **Nachtrag vom 2026-10-21: genau so gemacht, weil es wieder passiert ist.**
> Der neue Test zu 11.3a legte ein weiteres Konto an, und damit fiel der zweite
> Durchlauf innerhalb einer Stunde um – diesmal in `bewertungen.spec.ts`, also
> wieder an einer Stelle, die mit der Änderung nichts zu tun hatte. Beide
> Dateien legen jetzt **je ein** Konto über die Schnittstelle an (`beforeAll`)
> und melden sich damit an; die Anmeldung ist mit zehn Versuchen je zehn
> Minuten weit genug gefasst. Aus vier Registrierungen je Lauf sind zwei
> geworden, und zwei vollständige Durchläufe gegen denselben
> Entwicklungsserver sind nachgemessen grün. Die Grenze selbst blieb
> unverändert.

---

## 10. Impressum und Datenschutzerklärung (2026-10-19)

- [x] 10.2 **Impressum und Datenschutzerklärung** (2026-10-19, `/impressum` und `/datenschutz`).

  **Der Anlass war kein fehlendes Feature, sondern ein laufendes Risiko.** wheelee.de ist seit dem 2026-10-11 erreichbar – mit offener Registrierung, einem Sitzungscookie und gespeicherten E-Mail-Adressen – und hatte acht Tage lang weder Impressum noch Datenschutzerklärung. Beides ist in Deutschland Pflicht (§ 5 DDG, Art. 13 DSGVO) und abmahnfähig. Auf der Aufgabenliste stand es an sechster Stelle hinter lauter Funktionen; es ist deshalb am 2026-10-19 nach vorn geholt worden.

  **Die Betreiberangaben stehen in der Umgebung, nicht im Quelltext** (`WHEELEE_OPERATOR_NAME`, `_ADDRESS`, `_EMAIL`, dazu freiwillig `_PHONE` und `_VAT_ID`). Das ist dieselbe Entscheidung wie bei `ADMIN_EMAILS`, hier aber zwingender: Ein Impressum verlangt eine **ladungsfähige Anschrift**, bei einem Privatprojekt also die Wohnadresse einer Person. In einer versionierten Datei landete sie in der Git-Historie – dort bleibt sie auch nach dem Löschen, und bei einem öffentlichen Repository liest sie jeder. Auf der Seite selbst steht sie trotzdem, denn genau das verlangt das Gesetz; der Unterschied ist, **woher sie kommt**.

  **Fehlt die Konfiguration, wird nichts erfunden.** Beide Seiten zeigen dann einen Hinweis, welche Variablen fehlen. Die naheliegende Alternative wären Platzhalter gewesen – „Max Mustermann, Musterstraße 1" –, und das ist der schlechtere Weg: Es sieht nach einem erfüllten Impressum aus und wäre keines, und es fiele niemandem auf, am wenigsten dem Betreiber, der die Seite selten selbst aufruft. Ein E2E-Test hält fest, dass dort ein Hinweis steht und kein Name.

  **Beide Seiten sind `force-dynamic`, und das ist kein Beiwerk.** Würden sie beim Bauen erzeugt, trügen sie die Umgebung des **Bauzeitpunkts** – im Container also die aus dem Dockerfile, nicht die aus der `.env`. Das Ergebnis wäre ein Impressum, das nach jedem Neubau leer ist, ohne dass jemand etwas geändert hat.

  **Die Datenschutzerklärung ist aus dem Code belegt, nicht aus einem Generator.** Der Unterschied ist nachprüfbar: Ein Generator hätte Server-Logfiles mit IP-Adresse, Analysedienste und ein Kontaktformular per Mail genannt – alles Dinge, die es hier nicht gibt – und hätte das eine verschwiegen, was es wirklich gibt: **den Abruf der Kartenkacheln.** Der Browser lädt sie direkt von `tile.openstreetmap.org`, und damit erfährt die OpenStreetMap Foundation die IP-Adresse der Nutzerin und den betrachteten Ausschnitt. Das ist der einzige fremde Abruf der App, und er gehört genannt. Jede Aussage der Seite hat eine Fundstelle; der Kopf der Datei führt sie als Tabelle.

  **Zwei Dinge stehen offen dabei, statt verschwiegen zu werden:**
  - Die Zielsuche schickt den Bezugspunkt an den eigenen Server, auf zwei Nachkommastellen gerundet. Das ist eine Ausnahme von „der Standort verlässt das Gerät nicht" und wird als solche benannt, statt die Zusage pauschal stehen zu lassen.
  - Konto und Daten lassen sich derzeit **nicht in der App** löschen (11.7). Bis das gebaut ist (seit 2026-10-23 gebaut, siehe 11.7), stand dort der Weg über eine formlose Nachricht – mit dem Hinweis, dass von Hand gelöscht wird. Eine Datenschutzerklärung, die ein Löschrecht beschreibt, ohne zu sagen, dass die Schaltfläche fehlt, wäre irreführend.

  **Verlinkt sind beide aus den Einstellungen**, nicht vom Kartenrand: Die Karte braucht jeden Millimeter (9.15), und die Einstellungen sind ohnehin die Ansicht, in der man liest statt bedient. Zwei Antippen von jeder Stelle der App erfüllen „leicht erkennbar und unmittelbar erreichbar".

  **Was diese Seiten nicht sind: eine Rechtsberatung.** Sie beschreiben die Verarbeitung wahrheitsgemäß, soweit sie aus dem Code hervorgeht. Ob die Einordnung der Rechtsgrundlagen trägt, gehört einmal von jemandem angesehen, der das darf – das steht so in der Datei und in der README.

  **Ein Befund aus dem Browser, den kein Test gefunden hätte:** Mit gesetzten Angaben lief der Name ohne Punkt in den nächsten Satz – „Erika Mustermann wheelee ist ein unentgeltliches Privatprojekt." Die Tests prüfen gegen leere Konfiguration, und genau dort trat es nicht auf. Behoben, und der Grund steht als Kommentar daneben.

  **Ein Fehlschlag, der keiner war:** Der E2E-Test auf den Link in der Fußzeile lief in die Zeitüberschreitung, weil die Entwicklerleiste von Next.js unten links schwebt und den Klick abfängt. Im Produktionsbau gibt es sie nicht. Sie wird im Test auf `pointer-events: none` gesetzt statt versteckt – erschiene dort einmal die **Fehleranzeige** von Next, bliebe sie sichtbar und landete im Screenshot. Sie ganz auszublenden hieße, Fehler auszublenden.

  Geprüft mit **11 Unit-Tests** (`src/lib/legal/operator.test.ts`, vor allem die Fälle, in denen die Konfiguration unvollständig ist) und **6 E2E-Tests** (Erreichbarkeit aus den Einstellungen, Pflichtabschnitte, die drei Kernaussagen des Datenschutztextes, keine erfundenen Angaben, Rückweg, gegenseitige Verlinkung).

---

## 5 / 8. Datenmodell: was nicht gebaut wurde und warum (2026-10-19)

- [x] 5.1 / 5.3 / 5.7 **Die Parkplatzdaten kommen nicht in die Datenbank** (entschieden durch die Umsetzung, festgehalten 2026-10-19).

  Abschnitt 5 der ToDo-Liste stammte aus der Planung vom 2026-10-08 und sah ein Schema `parking_spot`, eine Tabelle `city` und einen Seed-Lauf aus `data/` vor. **Gebaut wurde das Gegenteil, und zwar mit Absicht:** Die Parkplatzdaten sind versionierte Seed-Dateien, statisch ins Bundle importiert; die Datenbank führt genau drei Tabellen – `account`, `session`, `feedback` –, also nur das, was zur Laufzeit entsteht.

  **Der Grund steht im Code selbst** (`src/lib/parking/spots.ts`): Die Datei ist die einzige Stelle, die weiß, woher die Parkplätze kommen. Daten, die sich nur beim Import ändern, in eine Datenbank zu legen, hieße: eine Migration je Datenänderung, ein Seed-Lauf beim Deploy, und ein Bestand auf dem NAS, der von dem im Repository abweichen kann, ohne dass es jemand sieht. Als Dateien sind sie versioniert, im Pull Request lesbar und mit `npm run check:slugs` prüfbar.

  **Warum das hier steht und nicht einfach gelöscht wurde:** Die drei Punkte standen ein Jahr lang als offene Aufgaben da und sahen aus wie Arbeit, die noch kommt. Wer sie abarbeitet, baut die Architektur um, die bewusst anders gewählt wurde. Ein verworfener Plan gehört benannt, nicht stillschweigend entfernt.

  **Was bleibt:** Sollten die Parkplätze eines Tages doch in die Datenbank wandern – etwa wenn Korrekturen aus Bewertungen direkt greifen sollen –, ist `spots.ts` der einzige Ort, der sich ändert. Das war der Zweck der Trennung und gilt unverändert.

- [x] 5.2 / 5.5 / 5.6 **In Abschnitt 8 eingeschmolzen** (2026-10-19). Schema `rating`, `GET /api/spots/:id` mit Bewertungs-Aggregat und `POST …/ratings` beschrieben dieselbe Arbeit wie 8.2, 8.3 und 8.4 – nur in einer zweiten Liste. Dieselbe Sache an zwei Stellen zu führen ist genau der Fall, vor dem [CLAUDE.md](CLAUDE.md) warnt: Bei der nächsten Änderung wird eine davon nachgeführt. Die technischen Angaben (Spalten, Routen) stehen jetzt bei 8.2–8.4, wo auch die fachlichen Regeln stehen.

- [x] 8.10 **Gegenstandslos geworden** (2026-10-19). Der Punkt stellte eine Wahl: „8.3 setzt Abschnitt 11 voraus – entweder Konten vorziehen oder zunächst nur Upvotes ausliefern." **Die Konten sind am 2026-10-11 gebaut worden**, damit ist die Wahl nicht getroffen, sondern überholt. 8.3 kann direkt gebaut werden. Ein Punkt, der eine beantwortete Frage stellt, kostet bei jedem Durchsehen der Liste Aufmerksamkeit und gibt nichts zurück.

---

## 17 / 10. Aufräumen und Sicherheit (2026-10-17)

- [x] 17.6 **Die Antwortadresse an offenen Meldungen läuft nach zwei Jahren ab** (2026-10-21, `cleanup.ts`, Migration 3). Die Lücke, die 17.5 offen ließ: Offene Meldungen laufen bewusst nicht ab – damit stand eine freiwillig angegebene Adresse unbegrenzt in der Datenbank, gegen die Zusage im Formular.
  - **Entfernt wird die Adresse, nicht die Meldung.** Der zweite erwogene Weg – offene Meldungen nach einer Frist maschinell auf „verworfen" setzen, damit 17.5 greift – ist verworfen: Dann entschiede ein Zeitablauf über einen Hinweis von jemandem, der sich die Mühe gemacht hat. So bleibt der Hinweis vollständig lesbar und kann weiter zur Korrektur beitragen; verloren geht allein die Möglichkeit zu antworten, und die war nach zwei Jahren ohne Bearbeitung ohnehin keine ernsthafte mehr.
  - **Zwei Jahre, also doppelt so lang wie die Frist für Erledigtes**, weil hier nichts abgeschlossen ist. Niemand soll sagen können, eine Meldung sei übergangen worden, weil die Technik zu schnell war.
  - **Gerechnet wird ab `created_at`, nicht ab `updated_at`** – anders als bei 17.5, und aus demselben Denken heraus: Eine Notiz des Administrators ändert `updated_at`, ohne dass die Meldung bearbeitet wäre. Sonst verlängerte bloßes Hinsehen die Frist, und die Adresse stünde ausgerechnet dort am längsten, wo sich niemand kümmert. Ein Test hält den Fall fest.
  - **Eine eigene Spalte `contact_removed_at`**, damit die Übersicht den Unterschied zeigen kann: „nie eine Adresse angegeben" sieht sonst aus wie „Adresse nach der Frist entfernt". Dort steht jetzt ein Satz statt einer Leerstelle. Fünf Tests, dazu die Fristen in Datenschutzerklärung und Formulartext nachgeführt.
- [x] 17.5 **Erledigte Rückmeldungen laufen nach zwölf Monaten ab** (2026-10-17, `src/lib/db/cleanup.ts`).

  Eine Tabelle, die nur wächst, wird nach einem Jahr nicht mehr gelesen – und personenbezogene Angaben, die niemand mehr braucht, gehören gelöscht. Das ist hier nicht Ordnungsliebe, sondern die Speicherbegrenzung aus Art. 5 Abs. 1 lit. e DSGVO. **Vor allem aber stand im Formular eine Zusage, die niemand einlöste:** `CONTACT_PRIVACY` verspricht, die freiwillige Antwortadresse werde „mit der Meldung gelöscht". Gelöscht wurde bis hierher nichts.

  **Gerechnet wird ab der Erledigung, nicht ab dem Eingang** (`COALESCE(updated_at, created_at)`). Der Unterschied ist kein Detail: Eine Meldung, die dreizehn Monate offen lag und gestern abgeschlossen wurde, verschwände sonst noch am selben Tag – und niemand könnte mehr nachsehen, worauf sich die Korrektur stützte. Ein Test hält genau diesen Fall fest.

  **Offene Meldungen laufen nicht ab, und das ist Absicht.** Eine Meldung, die niemand bearbeitet hat, ist nicht erledigt, sondern liegen geblieben. Sie nach einer Frist zu löschen hieße, einen Hinweis auf einen womöglich falschen Parkplatz zu verlieren, **weil sich niemand darum gekümmert hat** – die Nachlässigkeit würde ihre eigenen Spuren beseitigen. Was daraus folgt, steht als neuer Punkt 17.6 in `ToDos.md`: Die Adresse an einer ewig offenen Meldung bleibt damit ebenso ewig stehen, und das ist die verbliebene Lücke.

  **Zwölf Monate sind nicht gegriffen:** Die Spanne überdeckt einen vollständigen Jahreslauf der Datenpflege – ein halbjährlicher Vollimport und eine halbjährliche Validierung fallen garantiert hinein. Eine Meldung bleibt also mindestens so lange nachlesbar, wie sie für die Prüfung der Daten noch etwas beitragen kann.

  **Dabei kam eine zweite Lücke heraus, die nicht auf der Liste stand:** Abgelaufene Sitzungen verschwanden bisher erst beim nächsten Versuch, sie zu benutzen (`accountForSession`). Wer sich einmal anmeldet und nie wiederkommt, hinterließ damit **dauerhaft** eine Zeile, die sein Konto mit einem Zeitpunkt verknüpft – nutzlos und länger aufbewahrt als nötig. Sie werden jetzt mitgelöscht.

  **Kein Zeitgeber, und das ist eine Abwägung mit benannter Grenze.** Die App ist ein einzelner Container ohne Hintergrundprozess; ein `setInterval` in einem Next-Modul läuft je nach Laufzeitumgebung gar nicht oder mehrfach. Der Lauf hängt sich deshalb an die Zugriffe, die es ohnehin gibt – eine eingehende Meldung, ein Blick in die Übersicht –, höchstens einmal am Tag. Käme über Monate weder das eine noch das andere, liefe er gar nicht. Eine Frist von zwölf Monaten verträgt eine Verzögerung von Tagen, aber das ist eine **Annahme über den Betrieb und keine Zusage der Technik**; sobald es den monatlichen Lauf aus 4.5 gibt, gehört `purgeExpired` dort hinein. Vom Öffnen der Datenbank aus ginge es nicht: `cleanup.ts` benutzt `db()`, ein Aufruf aus `sqlite.ts` wäre ein Importzyklus.

  Geprüft mit **11 Unit-Tests** gegen eine echte Datenbank – die Bedingung steckt in SQL, und dort wäre ein Fehler unsichtbar: Er löschte entweder zu viel oder nie etwas, und beides fiele erst nach Monaten auf.

- [x] 10.6 **Sicherheits-Kopfzeilen** (2026-10-17, `next.config.ts`, Teil der Sicherheitsprüfung aus 10.7). **Bis zum 2026-10-20 als „10.3" geführt** – siehe die Berichtigung der Nummern am Ende dieser Datei.

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

- [x] 9.16 **Der Hinweis am Kartenrand: Darstellung (2026-10-21) und Inhalt (2026-10-23)** (`MapSection.tsx`, `lib/map-hint.ts`).

  **Inhalt, 2026-10-23, auf Torstens „ja, so umsetzen":** Unterhalb von **Zoomstufe 10** steht bei abgeschnittener Antwort „Zoome auf Stadtgröße, um Parkplätze zu sehen." und die Karte zeichnet **keine** Marker; ab Stufe 10 bleibt „näher heranzoomen".
  - **Die Marker verschwinden, weil die 2.000 geladenen eine Teilmenge in Serverreihenfolge sind**, keine Auswahl nach Nähe. Sie zu zeigen hieße, an manchen Orten „hier ist nichts" vorzutäuschen – schlimmer als eine leere Karte mit Erklärung.
  - **Nur bei abgeschnittener Antwort.** Ist alles geladen, bleiben die Marker bei jeder Stufe (München hat bei Stufe 9 nur 258 im Bild). Das ist enger als der erste Vorschlag („unter 10 immer ausblenden") und vermeidet, vollständige Ausschnitte grundlos zu leeren.
  - **Die Schwelle ist gemessen, nicht gegriffen:** Standorte im Bild je Stufe, Telefon 375 × 600 und Desktop 1400 × 800, sechs Städte. Desktop Essen: Stufe 10 = 3.458, Stufe 11 = 1.955; Telefon Köln: Stufe 10 = 1.950, Stufe 9 = 3.581. Ab Stufe 10 lösen ein bis zwei Zoomschritte die Abschneidung, darunter nicht zuverlässig. Die Zahlen stehen als Kommentar in `map-hint.ts`.
  - **Ohne bekannte Zoomstufe der mildere Hinweis**, nie Ausblenden ohne Grundlage. Vier Unit-Tests (`map-hint.test.ts`).
  - **Im Browser geprüft** (Dev-Server, Telefonformat, Mausrad per Skript): weit herausgezoomt Hinweis da und 0 Marker; wieder hineingezoomt kommen die Marker zurück, der Hinweis verschwindet. **Nicht beobachtet:** der Hinweis „näher heranzoomen" bei Stufe ≥ 10, weil dafür ein Ausschnitt mit über 2.000 Standorten nötig ist (dichtes Ruhrgebiet, Desktop); dort trägt nur der Unit-Test.

  **Darstellung, 2026-10-21:** Der Hinweisstreifen klebte randlos an beiden Seiten. `w-fit` heißt bei einem Satz, der länger ist als der Bildschirm, **volle Breite** – aus der Pille wurde ein Balken von Kante zu Kante. Jetzt mit begrenzter Breite und 21 px Rand auf beiden Seiten (im Telefonformat nachgemessen). Der Satz ist dabei kürzer geworden: „dieses Ausschnitts" stand da, wo ohnehin nur der sichtbare Ausschnitt gemeint sein kann, und war genau das Wort, das die Zeile sprengte. Der Inhalt war damals noch offen und ist oben beantwortet.
- [x] 9.17 **Punktbündel auf Bedienmaß vergrößert** (2026-10-21, `components/map/cluster.ts`, `SpotMarkers.tsx`, `globals.css`). `leaflet.markercluster` liefert 40 px; jetzt sind es **48** und bei vielen Punkten 56 bzw. 64 – das Maß, das Android und iOS für Bedienziele empfehlen. Die 24 px der Prüfwerkzeuge sind das Minimum, nicht das Ziel: Wer einhändig, im Sitzen und im Auto tippt, trifft sonst den falschen Parkplatz oder verschiebt die Karte.
  - Die Bündel kommen jetzt aus einer eigenen `iconCreateFunction`. Das kostet die mitgelieferte Gestaltung, bringt aber zweierlei: einen hellen Ring, der zwei dicht beieinander liegende Bündel trennt, und **eine Beschriftung für den Screenreader** – vorher las er eine nackte Zahl vor, die nicht verriet, dass sich Parkplätze dahinter verbergen und ein Antippen sie auseinanderzieht.
  - Größe und Beschriftung stehen **ohne Leaflet** in `cluster.ts`, damit es vier Unit-Tests dafür gibt; `icons.ts` lädt Leaflet beim Import und bräuchte dafür einen künstlichen Browser.
  - **Der Prüfbericht meldet `target-size` trotzdem weiter, und das ist ehrlich zu sagen:** Das Maß stimmt jetzt (48 × 48 im Quelltext der Seite nachgemessen), bemängelt wird nun eine **Überdeckung** – der Knopf „Wohin willst du?" liegt über der Karte und verdeckt ein Bündel darunter. Das trifft jede Karte mit Bedienelementen darüber; erreichbar bleibt das Bündel durch Verschieben der Karte. Der Wert blieb bei 96 von 100.

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
- [x] 10.7 **Rest der Sicherheitsprüfung vom 2026-10-17: Nonce-CSP und Passwort ändern** (beide 2026-10-23; bis zum 2026-10-20 als 10.5 geführt – doppelt belegt mit dem Haftungshinweis).

  **Nonce-CSP** (`src/middleware.ts`, `src/lib/csp.ts`, `src/app/layout.tsx`):
  - **Die CSP führt kein `'unsafe-inline'` mehr bei den Skripten**, sondern `'nonce-…'` je Anfrage. Die Middleware schreibt die Richtlinie auf die *Anfrage* – daraus liest Next die Nonce für seine Hydrationsskripte – und auf die Antwort; das Theme-Skript nimmt sie aus dem Kopf `x-nonce`. Gemessen im Produktionsbau (`npm run build`, Start): alle Skripte tragen die Nonce, die Seite hydriert, kein Verstoß.
  - **Stile behalten `'unsafe-inline'`** (Leaflet setzt `style`-Attribute). README und Kommentar sagen das ausdrücklich, damit niemand die Richtlinie für lückenlos hält.
  - **Alle Seiten sind jetzt dynamisch** (`ƒ` im Bauprotokoll): `headers()` im Wurzel-Layout. Eine vorab erzeugte Seite kann keine Nonce je Anfrage tragen. Unbedenklich, weil die Startseite es schon war und die Daten ohnehin aus Paketen kommen.
  - **Fund beim Einbau:** Mit Middleware lädt Next `src/instrumentation.ts` auch für die Edge-Laufzeit; dort gibt es `process.stdout` nicht, der Start brach ab und jede Seite antwortete 404. `register()` kehrt in der Edge-Laufzeit jetzt zurück. Ohne den E2E-Lauf wäre das erst aufgefallen, wenn der Container nicht antwortet.
  - **Die CSP wanderte aus `next.config.ts`** (statisch, für alle gleich – eine feste Nonce schützt nichts) nach `src/lib/csp.ts`; die übrigen Kopfzeilen bleiben dort. `/sw.js` bleibt ohne CSP (der Worker muss Kacheln von OSM holen): die Middleware schließt ihn per `matcher` aus.
  - Tests: `src/lib/csp.test.ts`; `e2e/sicherheit.spec.ts` prüft Nonce je Anfrage verschieden, jedes Inline-Skript trägt sie, kein `'unsafe-inline'` bei Skripten, Start ohne Verstoß. Einmalig trat im Lauf `bewertungen.spec.ts` (Stimme überlebt Schließen) rot auf; zwei weitere Läufe grün – nicht untersucht, ob ein Zusammenhang besteht.

  **Passwort ändern** (`PUT /api/account/password`, `changePassword` in `src/lib/db/accounts.ts`, Oberfläche in `AccountPanel`):
  - **Beides in einer Transaktion.** Wer vermutet, dass sein Passwort bekannt ist, will nicht, dass die Änderung gelingt und eine fremde Sitzung stehen bleibt (oder umgekehrt).
  - **Die aktuelle Sitzung bleibt**, alle anderen des Kontos fallen weg. Sonst stünde man nach dem Ändern vor der Anmeldemaske – und die Zielgruppe soll nicht im Auto neu anmelden müssen.
  - **Das bisherige Passwort wird verlangt.** Eine gestohlene Sitzung allein soll nicht genügen, das Konto dauerhaft zu übernehmen.
  - **Gedrosselt wie die Anmeldung** (`LIMITS.passwordChange`, 5 je 10 Minuten, nach Herkunft und Konto): Der Endpunkt prüft das alte Passwort und wäre sonst ein zweiter Weg, es zu erraten.
  - **Neue Regeln gibt es nicht**: `passwordProblem` aus `password-rules.ts` gilt wie bei der Registrierung. Tests: `accounts.test.ts` (Datenbank), `e2e/passwort-aendern.spec.ts`. Eine Sitzungsübersicht (welche Geräte) wurde nicht gebaut; „alle übrigen verwerfen" deckt den Zweck ab.
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

- [x] 11.4 **Eigene Bewertungen einsehen und zurückziehen** (2026-10-23; `ownRatings` und `withdrawVote` in `src/lib/db/ratings.ts`, `GET /api/account/ratings`, `DELETE /api/spots/<id>/ratings`, `src/components/MyRatings.tsx` im Konto-Bereich der Einstellungen, Texte `myRatings.*` in `de.ts`).
  - **Eigener Endpunkt ohne Parameter, wie die Auskunft.** `GET /api/account/ratings` nimmt die Konto-Kennung aus der Sitzung und sonst nichts; es gibt keinen Weg, damit fremde Stimmen abzurufen. Zurückgezogen wird über `DELETE` auf dem bestehenden Pfad `/api/spots/<id>/ratings` – das trifft immer nur die Stimme des angemeldeten Kontos und ist wirkungslos, wenn es keine gibt (doppeltes Antippen bleibt folgenlos). Dieselbe Drosselung wie beim Abstimmen (`LIMITS.rating`, nach Konto und Herkunft).
  - **„Zurückziehen" ist nicht das Umschalten aus `castVote`.** Ein erneutes Abstimmen in dieselbe Richtung nähme auch zurück, aber an einem Knopf mit dem Wort „Zurückziehen" darf nie die Gegenrichtung herauskommen; deshalb eine eigene Funktion statt eines Umwegs über `castVote`.
  - **Ein Parkplatz, den der Bestand nicht mehr kennt, bleibt in der Liste** (mit Hinweis, ohne Kartenknopf), wie in der Prüfliste der Gemeldeten (8.8): Die Stimme gibt es, und sie soll sich zurückziehen lassen. Der Server schlägt die Kurzangaben über `spotSummary` nach (`src/lib/parking/spot-summary.ts`, von 11.5 mitbenutzt) und liefert `spot: null`, statt den Eintrag wegzulassen.
  - **Die Liste lädt erst beim Aufklappen**, weil die meisten die Einstellungen aus einem anderen Grund öffnen. Ein Eintrag führt über `select` aus `MapSection` auf die Karte, dieselbe Bewegung wie in der Rückmeldungsübersicht.

- [x] 11.5 **Gespeicherte Parkplätze (Favoriten)** (2026-10-23; Migration 5 mit Tabelle `favorite`, `src/lib/db/favorites.ts`, `GET/PUT/DELETE /api/spots/<id>/favorite`, `GET /api/account/favorites`, `FavoriteButton` in der Detailansicht, `MyFavorites` im Konto-Bereich, Texte `favorite.*` und `myFavorites.*` in `de.ts`).
  - **Setzt ein Konto voraus, wie das Bewerten – und der Server prüft es.** Ohne Konto steht der Knopf abgeschaltet da, der Grund daneben (wie bei den Bewertungsknöpfen, 8.3); der Endpunkt lehnt ohne Konto mit 401 ab (E2E geprüft). Eine Liste nur im Browser wäre nach einem geleerten Speicher weg und fiele nicht unter die Auskunft und Löschung.
  - **Tabelle wie `rating`:** `UNIQUE (spot_id, account_id)` und `ON DELETE CASCADE`, ohne Fremdschlüssel auf den Bestand (der liegt in Dateien). Gespeichert wird nur Parkplatz, Konto, Zeitpunkt. Die Auskunft (`exportAccountData`) nennt die Liste, `deleteAccount` nimmt sie über das Cascade mit (Test gegen eine echte Datenbank), die Datenschutzerklärung (Abschnitt 7, Speicherfristen, Rechte) beschreibt es.
  - **Nur bekannte Parkplätze lassen sich speichern (404 sonst), entfernen geht immer.** Sonst ließe sich die Tabelle mit erfundenen Kennungen füllen; ein Platz, der beim Import verschwindet, bleibt dagegen in der Liste (`spot: null`, mit Hinweis, ohne Kartenknopf) und lässt sich entfernen – dieselbe Entscheidung wie in 11.4 und 8.8.
  - **Obergrenze 100 je Konto (409).** Mehr ist keine Merkliste, sondern ein Abbild des Bestands; die Grenze steht als Konstante `MAX_FAVORITES` und ist getestet. Gedrosselt wie die übrigen schreibenden Endpunkte (`LIMITS.favorite` nach Konto, `favoritePerClient` nach Herkunft).
  - **Die Entfernung rechnet der Browser** aus dem Standort, den er ohnehin hat (`position` aus `MapSection`); der Server bekommt ihn nicht – die Liste liefert nur die Koordinate des Parkplatzes. Ohne Standort steht keine Entfernung da.
  - **Wackelnder Test `bewertungen.spec.ts` („Stimme überlebt Schließen") behoben und die Ursache gemessen:** Im Ablaufprotokoll eines Fehlschlags wurde die Stimme auf `hamburg-…` abgegeben (vorgerenderter nächster Platz, bevor der Standort da ist) und die Detailansicht beim zweiten Öffnen für `koeln-…` geöffnet – die Stimme war nicht verloren, der Test sah einen anderen Parkplatz. Der Test wartet jetzt auf die standortbezogene Abfrage. Keine Fehlfunktion der App; der Verdacht „Bewertung geht verloren" war eine plausible, aber falsche Ursache.

- [x] 11.7 **Konto löschen und Auskunft nach DSGVO** (2026-10-23; `DELETE /api/account`, `GET /api/account/export`, `deleteAccount` und `exportAccountData` in `src/lib/db/accounts.ts`, Knöpfe in `AccountPanel`; Datenschutzerklärung nachgeführt).
  - **Löschen = Konto, Sitzungen, Bewertungen.** Die beiden letzten fallen über `ON DELETE CASCADE` weg (der Test prüft es gegen eine echte Datenbank, denn Fremdschlüssel sind in SQLite nur mit dem PRAGMA aktiv). Verlangt wird das Passwort, damit eine gestohlene Sitzung ein Konto nicht unwiderruflich vernichten kann; gedrosselt wie das Ändern des Passworts.
  - **Rückmeldungen bleiben, die Antwortadresse nicht.** Der Text einer Meldung ist der Hinweis auf einen falschen Parkplatz und soll nicht mit dem Konto verschwinden; `account_id` wird `NULL`. Die freiwillig angegebene Antwortadresse ist die einzige Angabe daran, die auf eine Person zeigt, und wird beim Löschen entfernt (`contact_removed_at` gesetzt, damit die Übersicht „Adresse entfernt" von „nie eine angegeben" unterscheiden kann). **Das ist eine Entscheidung aus dem Zweck der Löschung; Torsten hat sie am 2026-10-23 bestätigt.** Wer es ändern will: eine einzige Anweisung in `deleteAccount`.
  - **Auskunft als JSON-Download:** E-Mail, Anlagedatum, letzte Anmeldung, Karten-App, Bewertungen, eigene Rückmeldungen samt Antwortadresse. **Nicht enthalten:** Passwort-Hash und Sitzungs-Hashes (Geheimnisse, keine Angaben über die Person) sowie die interne Notiz der Betreiber an einer Rückmeldung (sie beschreibt die Bearbeitung). Es gibt keinen Parameter, mit dem sich die Daten eines anderen Kontos abrufen ließen.
  - **Rückmeldungen ohne Konto sind nicht zuzuordnen** und bleiben über die formlose Nachricht an den Betreiber; die Datenschutzerklärung sagt das jetzt so statt „lässt sich nicht in der App löschen".
  - Tests: `accounts.test.ts`, `e2e/konto-loeschen.spec.ts`, `e2e/rechtstexte.spec.ts` (die alte Aussage darf nicht mehr stehen).

- [x] 11.6 **Vertrauensstufen für Bewertungen** (2026-10-23; Rechnung in `src/lib/ratings/trust.ts`, SQL in `reportedSpots` (`src/lib/db/ratings.ts`) und `readGoneReports` (`scripts/import/ratings.mts`), Anzeige in `ReportedSpots.tsx` / `/api/admin/reported`, Texte `reported.reason.*` und `reported.weighted*` in `de.ts`; der versionierte Bericht `data/_validierung.md` wurde bewusst nicht neu erzeugt).
  - **Wirkt nur auf die Prüflisten, nie auf Parkplatzdaten (8.6).** Die Auswahl bleibt die bisherige (mindestens N Meldungen); die Gewichtung ordnet ein und erklärt, schließt nichts aus. Rohe Zähler und gewichtete Summen stehen nebeneinander, weil die Liste sonst als Urteil gelesen würde.
  - **„Zutreffend" = Übereinstimmung mit den anderen Konten** (Torsten, 2026-10-23), nicht Entscheidungen der Administratoren – sonst hinge das Vertrauen an der Zeit, die jemand zum Auswerten hat, und Bewertungen ohne Prüfung bekämen nie ein Gewicht.
  - **Altersgewicht** ab `COALESCE(updated_at, created_at)`: 0 Monate 100 %, 6 Monate 75 %, 1 Jahr 50 %, 2 Jahre 25 %, dazwischen linear. **Annahme für über zwei Jahre: es bleibt bei 25 %** (nicht auf null) – eine Stimme verliert Aussage, aber ein Parkplatz, den niemand mehr anfasst, soll nicht durch Warten „unbewertet" werden. Das ist keine Vorgabe von Torsten und eine einzige Konstante (`AGE_POINTS`).
  - **Letzte drei Stimmen alle „aufgehoben" ⇒ eigener Grund auf der Prüfliste**, auch bei älteren Bestätigungen in der Überzahl. Wegen `UNIQUE (spot_id, account_id)` sind die letzten drei Stimmen zwangsläufig drei verschiedene Konten (Test hält es fest). Die Liste nennt den Grund im Klartext („Die letzten drei Stimmen: aufgehoben …"). Er gilt nur innerhalb der Mindestzahl-Auswahl: Wer im Reiter „ab 5" wählt, sieht einen Parkplatz mit drei Meldungen weiterhin nicht – die Auswahl des Menschen bleibt maßgeblich.
  - **Konto-Gewichtung, so weit sauber definierbar:** Übereinstimmung zählt erst bei Parkplätzen mit **mindestens 3 Konten**, verglichen **ohne die eigene Stimme** (mindestens 2 andere, kein Gleichstand), sonst bestätigte sich jede Stimme selbst. Faktor = 1 + Quote (Übereinstimmungen / gezählte Parkplätze), also **1,0 bis 2,0**: nach unten nie unter eine normale Stimme, damit Abweichung (vielleicht als Einziger recht gehabt) nicht zum Schweigen bringt; nach oben gedeckelt, damit ein Konto nie mehr als doppelt zählt. **Erst ab 5 gezählten Parkplätzen**, darunter 1,0 – eine Quote aus 1 von 1 ist keine Auskunft. **Die Zahlen 3, 5 und 2,0 sind meine Festlegung, nicht von Torsten bestätigt** (Konstanten `MIN_RATERS`, `MIN_COUNTED_SPOTS`, `FACTOR_MAX`).
  - **Restgrenze, offen:** Absprachen unter Konten. Mehrere Konten, die sich gegenseitig bestätigen, erhöhen sich das Gewicht gegenseitig; die Deckelung begrenzt den Schaden, verhindert ihn nicht. Dazu kommt: Die Übereinstimmung wird nur auf Parkplätzen mit mindestens drei Konten gemessen, in dünn bewerteten Gegenden bleibt jeder Faktor bei 1,0.
  - Tests: `trust.test.ts` (ohne Datenbank, Uhrzeit als Parameter), `ratings.test.ts`, `scripts/import/ratings.test.mts`. Reiter im Telefonformat mit zwei Testparkplätzen in einer Wegwerf-Datenbank angesehen.

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
- [x] 11.3a **Die Karten-App gilt jetzt geräteübergreifend** (2026-10-21, Migration 4, `api/account/maps`, `maps-preference.ts`). Die Wahl lag nur im Browser; wer die App auf dem Telefon und am Rechner benutzt, stellte sie zweimal ein – und nach einem geleerten Speicher wieder.
  - **Zusätzlich zum Browser, nicht statt seiner.** Ohne Konto gibt es die Wahl unverändert. Eine Anmeldung zu verlangen, nur um die Karten-App einzustellen, wäre genau die Hürde, die dieses Projekt sonst vermeidet.
  - **Das Konto gewinnt, sobald dort etwas steht** (`effectiveMapsPreference`). Begründung ist der Zweck der Sache: Auf dem zweiten Gerät ist der Browser-Wert nicht „die andere Entscheidung", sondern gar keine. Steht am Konto nichts, zählt weiter der Browser – so geht die Wahl von vor der Registrierung nicht verloren.
  - **Die Speicherung läuft ohne Rückmeldung und ohne Warten.** Lokal gilt die Wahl sofort; scheitert die Anfrage, ist die Folge, dass sie auf einem anderen Gerät noch nicht gilt. Das ist keine Lage, in der man jemanden mit einer roten Meldung aufhält, der gerade einen Parkplatz sucht.
  - **Keine CHECK-Bedingung in der Datenbank**, anders als bei `status` und `vote`: Die Liste der Karten-Apps steht im Code und wächst dort; eine neue App ließe sich sonst bis zur nächsten Migration nicht speichern. Geprüft wird am Endpunkt, ein unbekannter Wert fällt beim Lesen auf „automatisch" zurück – dasselbe Verhalten wie bei einem blockierten Browser-Speicher. Ein E2E-Test weist eine erfundene App zurück.
  - **Dabei aufgefallen:** Anmeldung und Registrierung bauten ihre Antwort von Hand zusammen (`{ email, isAdmin }`) statt über `publicUser`. Das neue Feld fehlte dort stillschweigend, und TypeScript sagte nichts, weil ein Objektliteral in `NextResponse.json` gegen nichts geprüft wird. Beide gehen jetzt über `publicUser`; gefunden hat es der E2E-Test, nicht der Typprüfer.
- [x] 11.3 **Bevorzugte Karten-App wählbar** (2026-10-10). Auswahl aus Google Maps, Apple Karten, OpenStreetMap, HERE WeGo, Waze und der Standard-App des Geräts; „Automatisch" bleibt die Vorgabe und rät wie bisher nach Gerät. Gespeichert im Browser – welche Karten-App jemand nutzt, ist nichts, wofür man sich anmelden sollte. Offen bleibt nur die geräteübergreifende Speicherung, die ein Benutzerkonto voraussetzt.
- [x] 12.4 **Lighthouse auf Mobil gemessen** (2026-10-21, `lighthouse@12` gegen `npm run start`, gedrosseltes Telefonprofil): **Leistung 89, Barrierefreiheit 96, Best Practices 93, SEO 92.** FCP 1,4 s · Speed Index 1,7 s · Blockierzeit 20 ms · Layoutsprung 0,05 – alles im grünen Bereich.
  - **Die einzige schwache Zahl ist LCP mit 3,6 s, und sie ist keine, die sich wegoptimieren lässt:** Das größte Element ist eine **Kartenkachel von OpenStreetMap**. Sie lässt sich nicht vorladen, weil erst im Browser feststeht, wo jemand ist und welche Kachel gebraucht wird. Dieselbe Herkunft haben die Hinweise „Bilder in neuen Formaten" und „zu geringe Auflösung" (167 KB bzw. Retina): osm.org liefert PNG in 256 px, ein anderes Format gäbe es nur bei einem anderen Anbieter – und das ist 9.2a/16.2, nicht hier.
  - **„Fragt beim Laden nach dem Standort" ist gewollt und bleibt.** Lighthouse zählt es als Mangel, weil ein Berechtigungsdialog beim Öffnen überrumpeln kann. Hier ist es der Zweck der App: Wer sie aufmacht, sucht einen Platz in der Nähe. Abgelehnt oder nicht beantwortet führt zu einer vollständig brauchbaren Karte samt Erklärung (`useGeolocation.ts`); genau das ist der Grund, warum die Frage vertretbar ist.
  - **Zwei Befunde sind echt und stehen als 9.17 und 12.10 offen:** zu kleine Berührungsziele bei den Punktbündeln, und Titel/Beschreibung/OpenGraph im Körper statt im Kopf.
  - **Der ausdrückliche `<head>` in `layout.tsx` ist dafür nicht die Ursache.** Einmal ohne ihn gebaut und gemessen – die Angaben landen genauso im Körper, das Theme-Skript dagegen weiterhin im Kopf. Eine plausible Ursache ist keine gemessene; der Versuch kostete zwei Minuten und steht jetzt als Kommentar an der Stelle, damit ihn niemand ein zweites Mal macht.
  - Nicht weiterverfolgt: 46 KB ungenutztes JavaScript in den Leaflet-Bündeln. Das ist der Preis der Bibliothek und keine Nachlässigkeit der App.
- [x] 12.10 **Titel und OpenGraph im Körper statt im Kopf – nachgemessen, und es ist kein Mangel** (2026-10-21, `e2e/linkvorschau.spec.ts`). Lighthouse meldete „Document does not have a meta description". Der naheliegende Schluss wäre gewesen, dass geteilte Links keine Vorschau zeigen – **und er wäre falsch.**
  - Gemessen mit sechs Browserkennungen gegen den Produktionsbau: WhatsApp, Twitterbot, facebookexternalhit und Slackbot bekommen Titel, Beschreibung und OpenGraph **im Kopf**; ein gewöhnlicher Browser und Googlebot nicht. Next hält für Messenger, die kein JavaScript ausführen, eine eigene Liste bereit (`htmlLimitedBots`) und wartet bei ihnen mit der Antwort. Im Browser hängt React den Titel nachträglich in den Kopf um – `document.title` stimmt, die Beschreibung bleibt im Körper, und genau das sieht Lighthouse.
  - **Abschalten lässt sich das Streaming nicht mehr**; der frühere Schalter ist in Next 15.5 nicht mehr in der Konfiguration (nachgesehen in `config-schema.js`). Die Startseite statisch zu machen, wäre der einzige andere Weg – sie ist dynamisch, weil sie die Sitzung liest, und das ist in `page.tsx` begründet. Dafür einen Aufblitzer „nicht angemeldet" bei jedem Aufruf einzutauschen, lohnt eine Zahl in einem Prüfwerkzeug nicht.
  - **Vier E2E-Tests halten es fest**, denn das ist der Punkt: Es hängt an einer Liste innerhalb von Next, auf einer Seite, die aus einem anderen Grund dynamisch ist – und wenn es wegfällt, zeigt ein geteilter Link einfach nichts mehr, ohne dass irgendwo ein Fehler erscheint.
- [x] 12.6 **Fehler-Monitoring und minimales Logging** (2026-10-21, `src/lib/log.ts`, `src/instrumentation.ts`, `src/app/error.tsx`, `src/app/global-error.tsx`). Bis hierher gab es **keine einzige Zeile**: Ein Absturz im Betrieb hinterließ nichts, und ob die App überhaupt neu gestartet war, ließ sich nicht sagen – genau die Frage, an der 12.5a acht Tage lang hing.
  - **Kein Dienst wie Sentry, und das war keine Sparentscheidung.** Er wäre der dritte Server, der Inhalte dieser App sieht; dagegen stehen 10.4 („keine Tracker"), die Inhaltsrichtlinie `connect-src 'self'` und eine Datenschutzerklärung, die ihre beiden Gegenstellen namentlich nennt. Die App läuft als **ein** Container auf einem NAS – was nach stdout geht, steht in `docker logs`, rotiert bei 10 MB über drei Dateien (`docker-compose.yml`) und braucht kein weiteres Werkzeug.
  - **Was eine Zeile nie enthält, ist durch die Datenschutzerklärung vorgegeben, nicht durch Sorgfalt:** Dort steht, die IP-Adresse werde „in kein Protokoll geschrieben" und der Standort werde „nicht protokolliert". Deshalb schreibt `logEvent` **keine IP** (auch nicht gehasht – ein Hash einer IPv4-Adresse ist in Minuten zurückgerechnet), **keine Parameterwerte**, sondern nur deren Namen (`/api/spots?bbox,limit`), und **keine Inhalte**. Eine Liste verbotener Feldnamen ersetzt sie durch `[entfernt]` statt sie wegzulassen – sonst sähe die Zeile aus, als wäre nie eine dagewesen.
  - **Nicht jede Anfrage wird vermerkt.** Beim Ziehen der Karte fragt der Browser `/api/spots` fortlaufend ab; jede davon zu protokollieren hieße, die Rotation bei 10 MB mit Gleichförmigem zu füllen und damit den Fehler von gestern zu löschen. Vermerkt wird, was ab Status 400 kommt, was länger als eine Sekunde dauert, und **jede schreibende Anfrage** – die sind selten und folgenreich.
  - **Zwei Stellen, nicht eine:** `withLogging` umgibt die zehn Endpunkte (Status, Dauer), `onRequestError` in `instrumentation.ts` fängt zusätzlich alles, was beim **Rendern** abbricht. Ohne das zweite wäre ein Fehler in einer Server-Komponente eine leere Seite ohne eine Zeile. Geprüft mit einer absichtlich abstürzenden Route, die danach wieder entfernt wurde: Die Zeile kam, mit `"path":"/api/pruefung-12-6?lat"` – ohne den Wert.
  - **Dazu zwei Fehlerseiten**, die es vorher nicht gab: Ohne sie zeigt Next „Application error: a client-side exception has occurred" – ein Satz, der niemandem hilft und am wenigsten jemandem, der im Auto sitzt. Jetzt steht da, dass es nicht an der Bedienung liegt, ein Knopf für den zweiten Versuch und ein Weg zurück zur Karte. **Sie sind von keinem Test abgedeckt**, weil sich ein Absturz der Oberfläche nicht herbeiführen lässt, ohne Code dafür einzubauen.
  - 13 Unit-Tests, die vor allem prüfen, was **nicht** in einer Zeile steht. Eine zusätzliche Angabe fällt beim Lesen des Codes nicht auf; die Zusage der Datenschutzerklärung hält nur ein Test aufrecht.
  - Die Datenschutzerklärung nennt das Protokoll jetzt selbst (Abschnitt 9, umbenannt in „IP-Adresse und Serverprotokoll"). Ein Protokoll, das es gibt und das dort nicht steht, wäre genau der Mangel, den diese Seite vermeiden will.
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

---

## D-08 Wie übersetzt wird (2026-10-20)

- [x] **D-08 Übersetzungsweg: Dateien je Sprache, maschinell vorübersetzt, von Menschen geprüft – mit einer Ausnahmeliste, die nie maschinell übersetzt wird.** Entschieden auf die Frage „automatischer Übersetzer oder alles einzeln lokalisieren?" bei der Freigabe von Abschnitt 15.

  **Ein Übersetzer zur Laufzeit ist ausgeschlossen, und zwar aus vier Gründen, von denen jeder einzelne genügt:**

  - **Er würde Nutzerdaten an einen Dritten tragen.** Die App spricht heute mit genau zwei Gegenstellen: dem eigenen Server und `tile.openstreetmap.org`. Das ist als Test festgehalten (10.4, `e2e/datenschutz.spec.ts`), steht in der Datenschutzerklärung und in der Inhaltsrichtlinie (`connect-src 'self'`). Ein Übersetzungsdienst wäre der dritte – und der erste, der Inhalte sieht.
  - **Er braucht Netz, und die App ist für das Gegenteil gebaut.** Der Service Worker existiert, damit im Parkhaus und im Funkloch nicht eine weiße Seite steht (12.8/12.9). Eine Oberfläche, deren Beschriftungen aus dem Netz kommen, ist dort unbeschriftet.
  - **Er liefert jedes Mal eine andere Formulierung.** Ein Knopf, der heute „Navigation starten" und morgen „Navigation beginnen" heißt, ist für jemanden, der die App einhändig im Auto bedient, keine Kleinigkeit – und für einen Screenreader-Nutzer, der Beschriftungen auswendig kennt, ein Rückschritt.
  - **Er kostet je Anfrage.** Bei einem unentgeltlichen Privatprojekt ist das die Art laufende Kosten, die Abschnitt 13 überhaupt erst nötig macht.

  **Gewählt ist deshalb der Weg in der Mitte** – nicht „alles von Hand", nicht „alles automatisch":

  1. **Zuerst die Struktur** (15.2): eine Übersetzungsdatei je Sprache und ein schlanker Zugriff darauf. Ohne sie ist jede Übersetzung eine Suche durch die Komponenten.
  2. **Dann maschinell vorübersetzen, einmalig und beim Entwickeln** – nicht im Betrieb. Das Ergebnis wird **eingecheckt**, ist damit nachlesbar, im Pull Request prüfbar und ändert sich nicht hinter dem Rücken.
  3. **Dann prüfen, bevor es ausgeliefert wird.** Eine maschinelle Übersetzung ist ein Vorschlag, keine Fassung.

  **Die Ausnahmeliste – was nie maschinell übersetzt wird:**

  - **Der Haftungshinweis.** Er ist rechtlich bedeutsam und gehört übersetzt, nicht sinngemäß übertragen (so steht es seit dem Anlegen von 15.4 dort). „Vor Ort gilt die Beschilderung" falsch übersetzt ist schlimmer als gar kein Hinweis.
  - **Impressum und Datenschutzerklärung.** Sie sind nach deutschem Recht geschuldet und beschreiben die Verarbeitung verbindlich; eine schiefe Übersetzung erzeugt Haftung, wo vorher keine war. Empfehlung: deutsche Fassung maßgeblich, Übersetzung nur mit fachlicher Prüfung (10.2b) – und bis dahin ein Hinweis statt einer Behelfsübersetzung.
  - **Die Daten selbst** (15.4, unverändert): Straßennamen werden nicht übersetzt, und die Zeitangaben sind deutscher Freitext, dessen Deutung sprachgebunden ist. Sie werden **je Sprache ausgegeben**, nicht je Sprache neu geparst – das ist Code (`opening-hours.ts`), keine Übersetzung.

  **Was daran die eigentliche Arbeit ist, und das gehört vorher gesagt:** nicht die Sätze, sondern die Stellen, die nicht nach Text aussehen – `<html lang>` für Silbentrennung und Screenreader-Aussprache, Datums- und Zahlenformate, die Sortierung der Städteliste, „1,5 km" gegen „1.5 km". Das steht als 15.3 und ist der Teil, der beim Übersetzen vergessen wird.

---

## 15. Mehrsprachigkeit (2026-10-23)

- [x] 15.2 **Beschriftungen aus den Komponenten gelöst – eine Datei je Sprache, ein schlanker Zugriff** (2026-10-23). Ohne diesen Schritt wäre jede Übersetzung eine Suche durch den Quelltext gewesen; er steht deshalb vor 15.1 und vor jeder weiteren Oberflächenarbeit.

  **Aufbau.** `src/i18n/de.ts` ist eine **flache** Tabelle `"Bereich.Stelle": "Text"` (296 Schlüssel, z. B. `details.maxStay`, `nearest.inRadius`). Flach, damit sich jede Beschriftung mit einer einzigen Suche finden lässt und eine Übersetzerin nicht durch Verschachtelung navigieren muss. `src/i18n/index.ts` ist der Zugriff: `t(key, vars?)` setzt `{name}`-Platzhalter ein, mehr nicht. `src/i18n/rich.tsx` hat `tRich(key, { link: <a/> })` für Sätze mit Element mittendrin (Links, `<strong>`, `<code>`).

  **Warum keine Bibliothek.** Die App braucht Platzhalter und Einzahl/Mehrzahl in zwei Fällen – das sind 30 Zeilen. Eine i18n-Bibliothek brächte Laufzeit, Konfiguration und Ladeverhalten mit, das im Funkloch (Service Worker) eigens bedacht werden müsste. D-08 verlangt ohnehin eingecheckte Dateien.

  **Schlüssel statt Text als Bezeichner, und der Compiler als Vollständigkeitsprüfung.** `MessageKey` ist `keyof typeof de`; jede weitere Sprache ist eine Datei `en.ts` vom Typ `Messages` (`Record<MessageKey, string>`), und **ein fehlender Schlüssel ist ein Typfehler**, kein leerer Knopf zur Laufzeit. Sie wird in `index.ts` in `catalogs` eingetragen – das ist alles. **Die Sprachwahl selbst fehlte damals noch** (`t` nimmt als drittes Argument eine Sprache, vorgegeben ist `DEFAULT_LOCALE = "de"`) – sie ist seit dem 2026-10-23 gebaut, siehe 15.5 und 15.3.

  **Einzahl und Mehrzahl als zwei Schlüssel** (`list.spacesOne` / `list.spacesMany`), nicht als Regelsprache: Englisch und Spanisch brauchen genau diese zwei Fälle. Kommt später eine Sprache mit mehr Formen (Polnisch hat drei), wird `t` dort erweitert – nicht vorher auf Verdacht.

  **Wo Listen Beschriftungen trugen, tragen sie jetzt Schlüssel**, nicht Text: `THEMES`, `MAPS_APPS`, `MAPS_CHOICES`, `KIND_LABELS`, `STATUS_LABELS`, `CONTACT_HINT`, `CONTACT_PRIVACY`. Die Komponenten rufen `t(...)` beim Zeichnen auf. Ein `t(...)` beim Laden des Moduls wäre bei einer Sprachumschaltung zur Laufzeit stehen geblieben. Die Prüfung in `feedback.test.ts` ruft deshalb `t(CONTACT_HINT)`.

  **Zwei Stellen waren nicht nur Text, sondern Textverarbeitung** und sind umgebaut, nicht verschoben: Die Navigationsleiste bildete „Navigation: Google Maps öffnen" aus `mapsLabel(...).replace("In ", "Navigation: ")` – das hängt am deutschen Wortlaut und wäre in jeder anderen Sprache stillschweigend falsch gewesen. Jetzt hat jede Karten-App ein eigenes `navigateLabel` (`mapsNavigateLabel`). Dasselbe bei der Mehrzahl der Stellplätze, die an drei Orten einzeln gebaut wurde und jetzt einen Schlüssel hat. **Der Wortlaut ist byte-genau erhalten**, auch das sprachlich schiefe „Navigation: der Standard-Karten-App öffnen" – es zu glätten wäre eine inhaltliche Änderung, keine Verschiebung.

  **Mitgenommen wurden auch Texte außerhalb der Komponenten:** Hinweistexte und Prüfmeldungen in `src/lib/` (Rückmeldungen, Passwortregeln, Höchstparkdauer-Einheiten, Karten-Apps, Darstellung), die Standortmeldungen in `useGeolocation`, Titel und Beschreibung in `layout.tsx` und `manifest.ts`, die Fehlerseiten und die Fehlertexte, die die API-Routen an die Oberfläche geben (`api.*`; dort steht jetzt dieselbe Zeichenkette wie in der Oberfläche, wenn eine Meldung auf beiden Seiten vorkommt, z. B. `account.emailInvalid`). **Bewusst nicht verschoben** sind die Parameterfehler von `GET /api/spots` („bbox erwartet vier Zahlen …"): Sie richten sich an Entwickler, die die Schnittstelle aufrufen, nicht an die Oberfläche; die kennt sie nicht und zeigt sie nie.

  **Die Ausnahmeliste aus D-08 ist unangetastet:** `DataDisclaimer` (Haftungshinweis), `src/app/impressum/page.tsx` und `src/app/datenschutz/page.tsx` bleiben als deutscher Text im Quelltext. Begründung: Sie sind nach D-08 **nie maschinell** zu übersetzen und brauchen eine fachliche Prüfung (10.2b). In einer Sprachdatei stünden sie neben Beschriftungen, die jemand vorübersetzen darf – und genau diese Nähe lädt dazu ein, sie mitzuübersetzen. Ihr Quelltext trägt die Texte als Ganzes und ist damit auch leichter rechtlich zu prüfen als 296 Schlüssel. **Der Rahmen um sie ist dagegen Beschriftung und steht in der Datei:** „Zurück zur Karte", „Stand: …" und der Hinweis „Diese Angaben fehlen noch" (`LegalPage`), die Links „Impressum" und „Datenschutzerklärung" in den Einstellungen. Eine englische Fassung muss wissen, was sie mit den Rechtstexten macht (D-08: Hinweis statt Behelfsübersetzung) – das ist Teil von 15.1, nicht von diesem Punkt.

  **Bewusst nicht Teil dieses Punkts** (stehen als 15.3 bzw. 15.5 offen): `html lang`, `de-DE` in `toLocaleString`/`toLocaleDateString`/`localeCompare`, das Komma in „1,5 km" und das Einheitenkürzel in `formatDistance`, die Spracherkennung.

  **Geprüft:** `typecheck`, `lint`, die Unit-Tests (366) und die E2E-Tests grün; die E2E-Tests hängen am Wortlaut und sind damit die eigentliche Prüfung, dass er unverändert ist (die Einheitentests prüfen Zeichenketten wie `clusterLabel` ebenfalls wörtlich). Die Oberfläche im Telefonformat angesehen.

- [x] 15.5 **Sprachwahl in den Einstellungen, Browsersprache als erster Vorschlag, Wahl am Konto** (2026-10-23). Gebaut mit nur Deutsch als Sprache, aber so, dass eine weitere Sprache **eine Datei plus eine Zeile** ist (`src/i18n/<code>.ts`, Eintrag in `catalogs` und `LOCALES` in `src/i18n/index.ts`).

  **Wie die Sprache zur Komponente kommt, und warum nicht anders.** `t()` hatte bisher keine „aktuelle" Sprache. Der naheliegende Weg – ein Modulwert, den die Sprachwahl setzt – ist auf dem **Server falsch**: Er rendert mehrere Besucher gleichzeitig, und ein gemeinsamer Wert wird zwischen ihnen überschrieben (die erste Anfrage zeichnet Englisch, die zweite stellt mitten im Rendern auf Deutsch um). Deshalb ein **React-Kontext** (`src/i18n/context.tsx`): `layout.tsx` setzt ihn aus der Anfrage, Komponenten holen `const t = useT()`, Sätze mit Element `useRich()`. Das war eine mechanische Umstellung aller Komponenten (`t(...)` blieb im Aufruf gleich, nur woher `t` kommt, änderte sich). Hilfsfunktionen außerhalb von Komponenten (`spotMeta`, `listMeta`, `shareText`, `districtLabel`, `spaceCount`) bekommen `t` als Argument; Bibliotheksfunktionen (`mapsLabel`, `validateFeedback`, `clusterLabel`, `formatBytes`, `formatDistance`) ein letztes Argument `locale`, vorgegeben Deutsch – die bestehenden Tests blieben dadurch unverändert grün.

  **Wie der Server die Sprache kennt – der kleinste tragfähige Weg** (`src/i18n/server.ts`, `getLocale`): Cookie `wheelee-lang`, sonst die Sprache am Konto, sonst `Accept-Language`, sonst Deutsch. **Warum ein Cookie und nicht nur `localStorage`:** Der Server muss `<html lang>` und die Beschriftungen schon im ersten HTML kennen; `localStorage` sieht er nicht, und ein Nachsetzen im Browser hieße erst Deutsch zeigen und dann umspringen (Screenreader läse die erste Sekunde mit der falschen Stimme). **Warum nicht die Browsersprache allein:** wer ein englisches Betriebssystem auf einem deutschen Telefon hat, will die Wahl behalten (15.5 im Wortlaut). **Die CSP-Nonce (10.7) braucht nichts Neues:** `layout.tsx` fragt ohnehin `headers()` ab und ist deshalb je Anfrage gerendert; die Cookie-Abfrage ändert daran nichts. Die Startseite war dadurch schon vorher dynamisch. Das Layout liefert Titel und Beschreibung über `generateMetadata`, weil sie je Sprache verschieden sind.

  **Wechsel ohne Neuladen.** `SettingsPanel` schreibt Speicher und Cookie (`src/i18n/preference.ts`), legt die Wahl – mit Konto – per `PUT /api/account/language` ab und ruft `router.refresh()`; das Layout wird neu geholt, Beschriftungen und `<html lang>` ändern sich gemeinsam, Zustand wie die geöffnete Karte bleibt erhalten. Es wird auf die Antwort des Kontos **gewartet**, ehe neu geholt wird: sonst läse der Server noch den alten Kontowert.

  **Am Konto (wie 11.3a).** Migration 6 hängt `language TEXT` an `account` an (Migrationen werden nur angehängt). Geprüft wird der Wert am Endpunkt `src/app/api/account/language/route.ts`, nicht in der Datenbank – die Liste der Sprachen steht im Code und wächst dort. **Das Konto gewinnt, sobald dort etwas steht** (`effectiveLanguage`, gleiche Begründung wie bei der Karten-App: ein zweites Gerät hat nicht „etwas anderes gewählt", sondern nichts). Durchgesetzt wird das in `LanguageSync` (in `MapSection`): weicht die Kontosprache von der angezeigten ab, wird das Cookie darauf gestellt und die Seite neu geholt – **höchstens einmal je Wert**, denn ohne Cookies bliebe der Unterschied bestehen und die Seite lüde endlos. Die Sprache kommt bei Anmeldung (`/api/auth/login`), Sitzung (`PublicUser`) und Datenauskunft (`/api/account/export`) mit.

  **Datenschutzerklärung nachgeführt** (Abschnitte 4, 5, 6 und das Kästchen oben): Es gibt jetzt ein zweites Cookie, `wheelee-lang`, und es wird **erst auf die Wahl** gesetzt – „kein Cookie ohne Handlung" gilt weiter, `e2e/datenschutz.spec.ts` prüft es unverändert. Rechtsgrundlage § 25 Abs. 2 Nr. 2 TDDDG wie beim Sitzungscookie (vom Nutzer ausdrücklich gewünschte Funktion). Der Text gehört zur Ausnahmeliste und wurde von Hand geändert, nicht übersetzt; **die fachliche Prüfung aus 10.2b muss die Änderung mit ansehen.** README (Abschnitt Datenschutz) nachgeführt.

  **E2E laufen mit Deutsch als Vorgabe:** `locale: "de-DE"` in `playwright.config.ts`, sonst schickte Playwright `en-US` und die Tests (die am deutschen Wortlaut hängen) sähen ab 15.1 eine englische Oberfläche.

- [x] 15.3 **Die Stellen, die nicht nach Text aussehen** (2026-10-23). Alles, was an `de-DE` festgenagelt war, folgt jetzt der Sprache: `localeTag(locale)` in `src/i18n/index.ts` liefert das BCP-47-Etikett (`de-DE`; Landesform, weil sie Zahlenschreibweise und Datumsreihenfolge steuert).
  - **`<html lang>`** kommt aus der Anfrage (`layout.tsx`), nicht mehr fest `de` – daran hängen Silbentrennung (`hyphens-auto`) und die Aussprache im Screenreader. Das erste HTML trägt die richtige Sprache, siehe 15.5.
  - **Entfernung** (`formatDistance(meters, locale)`): „1,5 km" gegen „1.5 km" über `toLocaleString`; Einheit `m`/`km` ist in allen vorgesehenen Sprachen gleich.
  - **Datum** (`formatDate`), **Zahlen** (Stellplätze, Zeichenzähler, Gewichtungen in `ReportedSpots`), **Dateigrößen** (`formatBytes`), **Zeitpunkte** (`FeedbackAdmin`), **Rückmeldungs-Prüfung** (`validateFeedback`) und **Sortierung der Städteliste** (`localeCompare`) laufen über `localeTag`.
  - **Bewusst deutsch geblieben:** der Datumsstand im Haftungshinweis (`DataDisclaimer` steht auf der Ausnahmeliste und ruft `formatDate` ohne Sprache auf), Impressum und Datenschutzerklärung, und der Vergleich Stadtteil/Stadtname in `SpotDetails` und `parking/display.ts` – das sind deutsche Ortsnamen, die deutsch (Groß-/Kleinschreibung, `ß`) zu vergleichen sind, nicht in der Sprache der Oberfläche.
  - **Nicht Teil dieses Punkts:** Zeitangaben aus `opening-hours.ts` (15.4).
  - Tests: `src/i18n/i18n.test.ts` (Vollständigkeit der Kataloge je Sprache und gleiche Platzhalter, `matchLocale`, Vorrang des Kontos, Formatierung), `store.test.ts` (Sprache am Konto), E2E `e2e/sprache.spec.ts` und zwei Fälle in `e2e/karten-app.spec.ts` (Sprache kommt mit der Anmeldung zurück, unbekannte wird abgewiesen). Die Konten-Tests sind absichtlich in der bestehenden Datei: Die Registrierung ist auf fünf je Stunde gedrosselt, jede weitere Registrierung rückt einen roten Lauf näher.

  **Geprüft:** `typecheck`, `lint`, Unit-Tests (428), E2E grün. Der erste Gesamtlauf fiel bei vier Tests mit `ECONNRESET`/Zeitüberschreitung durch – der Entwicklungsserver übersetzte beim ersten Aufruf gerade neu; derselbe Satz im zweiten Lauf bei warmem Server: alle grün. Das ist nicht an meiner Änderung gemessen, sondern an der Wiederholung ohne Änderung.

- [~] 15.1 **Englisch und Spanisch** (2026-10-23, Englisch zuerst, Spanisch im selben Durchgang gleich danach) – `src/i18n/en.ts` und `src/i18n/es.ts`, dieselben Schlüssel wie `de.ts`. **Maschinell vorübersetzt von mir, nicht von Muttersprachler:innen geprüft** – so steht es auch in der App (Einstellungen, unter der Sprachwahl) und so lautet D-08. Die Prüfung ist als 15.6 offen. Der Rest von 15.1 (Französisch, Italienisch, Polnisch, Niederländisch, die Frage nach Türkisch/Russisch/Arabisch) steht in `ToDos.md`.

  **Was die Vollständigkeit sichert:** `en: Messages` – ein fehlender Schlüssel ist ein Typfehler. Zusätzlich prüft `src/i18n/i18n.test.ts` für **jede** Sprache in `LOCALE_CODES`: keine fehlenden oder zusätzlichen Schlüssel, kein leerer Text, **dieselben Platzhalter wie die deutsche Vorlage** (ein verlorenes `{name}` fiele sonst erst als sichtbare Klammer in der Oberfläche auf). Neue Sprachen laufen ohne Änderung am Test mit.

  **Entscheidungen beim Übersetzen.** „Behindertenparkplatz" ist „disabled parking space" – bewusst nicht „handicapped" (gilt im Englischen als veraltet) und nicht „accessible parking" (mehrdeutig: das beschreibt den Zugang, nicht die Berechtigung). **Das ist meine Wahl, nicht geprüft – gehört zu dem, was ein Muttersprachler ansehen soll (15.6).**. Einheiten und Eigennamen bleiben (Straßennamen, Bahnhofstraße im Beispiel des Rückmeldeformulars, „OpenStreetMap-Mitwirkende" → „OpenStreetMap contributors" steht an der Stelle, die die Lizenz verlangt). Die Anrede ist wie im Deutschen das „du"/„you" der App. Typografische Anführungszeichen („…") statt ASCII, damit sie keine Zeichenkette beenden. Das Etikett für `Intl` ist `en-GB` (Datum Tag-Monat-Jahr, 24-Stunden-Uhr – für Reisende in Europa die vertraute Lesart); Zahlen und Entfernung schreiben sich damit „1.5 km", „1,234".

  **Spanisch** (`es.ts`): gleiche Mechanik, gleiche Tests – `i18n.test.ts` läuft ohne Änderung für jede Sprache in `LOCALE_CODES`. Etikett `es-ES` (Dezimalkomma, Tag-Monat-Jahr; „1,5 km" wie im Deutschen, „1.234.567"). Anrede „tú" (wie das „du" der App). „Behindertenparkplatz" ist „plaza de aparcamiento para personas con discapacidad" – die in Spanien übliche Formulierung für die Berechtigung, nicht „minusválidos" (gilt als überholt). **Eine Stelle habe ich nach dem Ansehen im Telefonformat geändert:** der Titel in der Kopfzeile (`app.title`) war in dieser Fassung so lang, dass er die Umschalter unter sich schob und die Kopfzeile zweizeilig machte – jetzt „Aparcamiento adaptado", kürzer, aber ungeprüft; „PMR" (personas con movilidad reducida) wäre noch kürzer, ist aber Einheimischen vorbehalten. Gehört zu dem, was ein Muttersprachler ansehen soll (15.6). Bei „Aviso legal (Impressum)" steht der deutsche Name dabei, weil auf dem Link, den man sucht, „Impressum" steht und auf der Seite dahinter auch.

  **Haftungshinweis, Impressum, Datenschutzerklärung bleiben deutsch (D-08).** Gebaut ist das, was D-08 dafür vorsieht – „Hinweis statt Behelfsübersetzung":
  - `LegalPage` (Rahmen von Impressum und Datenschutzerklärung): Zurück-Link, „Stand" und Datum folgen der Sprache; darunter steht `legal.germanOnly` – „nur auf Deutsch, die deutsche Fassung ist maßgeblich" – **in der Sprache der Oberfläche**, weil sonst ausgerechnet der, der den Text nicht lesen kann, den Hinweis nicht läse. Der Text selbst trägt `lang="de"`, damit ein Screenreader ihn deutsch spricht. Dasselbe unter den Links in den Einstellungen.
  - `DataDisclaimer`: Der Haftungshinweis steht deutsch (`lang="de"`); davor steht in anderer Sprache `disclaimer.germanOnly`. **Das ist der Punkt, an dem ich nicht entscheiden kann, sondern nur vorbereiten:** Der Hinweis ist sicherheitsrelevant („vor Ort gilt die Beschilderung, nicht die App"), und ein deutscher Text, den eine spanische Besucherin nicht lesen kann, sagt ihr das nicht. Mein kurzer Satz sagt es in ihrer Sprache – das ist aber ein **neuer, von mir maschinell formulierter Text**, kein Teil der geprüften Fassung. Er steht bis zur Freigabe so drin, ausdrücklich als offen markiert (15.6), und die Frage, ob es eine wörtliche, von einem Menschen freigegebene Fassung des ganzen Haftungshinweises braucht, steht dort bei Torsten.

  **Schnittstellenmeldungen in der Sprache der Anfrage.** `api.*` geht als Text an die Oberfläche; eine deutsche Meldung mitten in einer englischen Oberfläche wäre ein Bruch. Statt in 25 Endpunkten eine Sprache durchzureichen, steht sie je Anfrage in einem `AsyncLocalStorage` (`src/lib/request-locale.ts`); `withLogging` setzt sie – alle Endpunkte laufen dadurch –, und `t()` liest sie, wenn keine Sprache übergeben wird (`registerLocaleSource` in `index.ts`; nur auf dem Server gesetzt). Ein Modulwert wäre hier falsch aus demselben Grund wie in 15.5 – deshalb ein Test, der vier Anfragen mit zufälligen Verzögerungen nebeneinander laufen lässt und prüft, dass jede ihre eigene Sprache sieht. Sprache dort: Cookie, dann `Accept-Language`; die Kontosprache wird nicht nachgeschlagen, sie steht ohnehin im Cookie, sobald die Oberfläche sie angewendet hat.

  **Noch deutsch, bewusst:** `manifest.ts` (App-Name beim Installieren) und `global-error.tsx` (Absturzseite außerhalb des Layouts, ohne Sprachkontext) – beides ohne Anfrage-Kontext, und die Seite ist dort ohnehin das Letzte, was man sieht. Der Vergleich Stadtteil/Stadtname bleibt deutsch (15.3). Die Zeitangaben aus `opening-hours.ts` sind 15.4.

  **Geprüft:** `typecheck`, `lint`, Unit-Tests (439), E2E vollständig grün (74, 2 übersprungen – wie zuvor). Neue E2E in `e2e/sprache.spec.ts` (englischer Browser: `<html lang="en">`, Sprache als Vorschlag **ohne** ein Cookie zu setzen, Haftungshinweis deutsch mit Hinweis davor, Umschalten wirkt sofort und übersteht das Neuladen, Rechtstexte deutsch mit englischem Rahmen, Fehlermeldung der Schnittstelle englisch). Oberfläche im Telefonformat auf Englisch und Spanisch angesehen; ein E2E-Fall für Spanisch (Browsersprache `es-ES`) ist dazu gekommen. Ein erster Versuch, das Umschalten mit `check()` zu prüfen, scheiterte – nicht an der App, sondern weil das Optionsfeld bewusst erst nach dem Neuholen umspringt; der Test klickt jetzt. Die Hydrationswarnung wegen `nonce=""` in der Browser-Konsole ist nicht neu: Browser verstecken das Nonce-Attribut nach dem Laden, und sie tritt auch auf Deutsch auf.

- [x] 15.4 **Die Daten bleiben deutsch; Zeitangaben werden je Sprache ausgegeben, nicht je Sprache neu gedeutet** (2026-10-23).
  - **Straßennamen, Stadtnamen, Quellenangaben** werden nirgends übersetzt – wer „Bahnhofstraße" sucht, liest „Bahnhofstraße". Dafür war nichts zu bauen; der Punkt war, es **nicht** zu tun. (Die Sprache der Oberfläche steht auf `<html lang>`, die deutschen Daten darin sind nicht einzeln mit `lang="de"` ausgezeichnet – das wären tausende Stellen; ein Screenreader spricht deutsche Straßennamen in einer englischen Oberfläche mit englischer Stimme. Benannt als bekannte Grenze, nicht behoben.)
  - **Deutsch zeigt den Quelltext, wie er in den Daten steht** („Mo - Fr 8 - 18 Uhr"), unverändert gegenüber vorher.
  - **Andere Sprachen** (`formatTimeRestriction` in `src/lib/opening-hours.ts`): Die Angabe wird einmal **vollständig** verstanden (`understandRestriction`) und dann mit den Wochentags- und Monatsnamen der Sprache geschrieben – „Mon–Sat 09:00–20:00", „lun–sáb 09:00–20:00", „Apr–Oct: Mon–Sun …". Die Namen kommen aus `Intl` (`weekday: "short"`, `month: "short"`), nicht aus den Sprachdateien: Das sind keine Texte, die jemand vorübersetzt, sondern Gebietsschema-Daten, und es sind zwanzig Schlüssel weniger, die ein Muttersprachler prüfen müsste.
  - **Warum ein strenger zweiter Leser neben `parseWindows`.** `parseWindows` überspringt, was es nicht versteht – für „gilt gerade?" richtig, weil die verstandenen Fenster stimmen. Für die **Ausgabe** wäre es falsch: Ein übersprungener Abschnitt, ein verlorener Feiertagszusatz („PH off"), eine abgeschnittene Bemerkung („|| Ausfahrt jederzeit möglich") stünde in der englischen Ausgabe schlicht nicht da – eine Zeitangabe, die kürzer ist als die Wirklichkeit. `understandRestriction` liefert deshalb `null` bei allem Uneindeutigen (Ausnahmen mit `off`, `open`, Feiertage, HTML, `||`-Zusätze, offene Enden wie „08:00+"), und dann **bleibt der deutsche Quelltext stehen**. Das ist sichtbar unschön und sicher; das Gegenteil wäre unsichtbar falsch (Grundsatz am Kopf der Datei: im Zweifel nichts behaupten).
  - **Höchstparkdauer** (`maxStay(text, locale)`): Einheit aus `stay.*` (Einzahl/Mehrzahl), Zahl nach Gebietsschema („0,5 Stunden", „0.5 hours", „0,5 horas"). Gelesen wird weiter beides, Komma und Punkt – die Quellen schreiben beides.
  - **„gilt jetzt" / „gilt gerade nicht"** sind Beschriftungen (`restriction.*`, `details.restriction*`) und standen seit 15.1 in den Sprachdateien; der **Zustand** selbst (`restrictionState`) hat keinen Sprachparameter und kann keinen haben – das ist der Kern der Aufgabe, und ein Test hält es fest.
  - **Tests** (`opening-hours.test.ts`): Ausgabe je Sprache wörtlich (Tage, Monate, über Mitternacht, Mehrfachspannen); **für jede Sprache in `LOCALE_CODES`** (neue laufen ohne Änderung mit) dass jede Uhrzeit der Quelle in der Ausgabe steht, dass Unsicheres den Quelltext behält statt etwas wegzulassen, dass aus dem **Verstandenen** gerechnet derselbe Zustand herauskommt wie aus dem Quelltext (8 Formen × 8 Uhrzeiten × 5 Tage, einschließlich Saison und Mitternachtsübergang) und die Höchstparkdauern. E2E (`e2e/sprache.spec.ts`): derselbe Parkplatz in Aschaffenburg auf Englisch, Spanisch und Deutsch mit Standort per Playwright – **hängt am Bestand** (steht im Kommentar): Fiele die Zeitangabe bei einem späteren Import weg, braucht der Test einen anderen Parkplatz.
  - **Dabei gefunden und im Test festgehalten:** Der erste Versuch des englischen E2E scheiterte, weil der Klick auf „Details" kam, bevor der Standort da war – die Leiste zeigte noch den Parkplatz nahe der Hamburger Stadtmitte (402 km entfernt). Spanisch und Deutsch gingen durch, weil sie zufällig schneller waren. Der Test wartet jetzt auf „– 0 m", das nur der Parkplatz am Standort trägt.
  - **Geprüft:** `typecheck`, `lint`, Unit-Tests (455), E2E vollständig grün (77, 2 übersprungen – wie zuvor).

---

## 16. Städte zum Mitnehmen (2026-10-23)

- [x] 16.1 **Die Parkplatzdaten einer Stadt vorab laden** (2026-10-23). Einstellungen → „Ohne Netz: Parkplätze mitnehmen": Stadt wählen, „Vorab laden". Nur die Parkplatzdaten; **die Kartenkacheln (16.2) sind nicht angefasst** und warten weiter auf die Lizenzfrage. Ohne Netz bleibt die Karte darunter also grau, Marker, Nähe-Abfrage und Listen arbeiten – der Text in den Einstellungen sagt das.

  **Der kleinste tragfähige Weg: eine Route, ein eigener Speicher, ein Rückfall im Service Worker.**
  - `GET /api/offline?city=<slug>` liefert Stadt (`CityInfo`, mit `importedAt`) und alle Standorte (`spotsOfCity`, gefiltert über die IDs der Seed-Datei, nicht über ein Rechteck – das nähme Nachbargemeinden mit und ließe Ränder aus). **Eine eigene Route und nicht `/api/spots?city=`:** Der Service Worker behandelt `/api/spots` als „zuletzt geladener Ausschnitt" und legte die ganze Stadt unter einem Schlüssel ab, den nie wieder jemand trifft. `no-store`: Wer „Aktualisieren" drückt, will den Stand des Servers.
  - **Die Seite schreibt selbst in die Cache API** (`wheelee-city`, `src/lib/offline-cities.ts`), der Service Worker liest nur. Das erspart `postMessage`, eine Nachrichtenschleife und die Frage, was passiert, wenn der Service Worker gerade nicht läuft – Laden, Auflisten und Löschen funktionieren auch ohne ihn (z. B. im Entwicklungsbetrieb); nur das Ausliefern ohne Netz braucht ihn.
  - **Rückfall in `public/sw.js` (`answerFromCities`):** Bei fehlendem Netz und ohne gleichlautende frühere Antwort beantwortet er `bbox`, `lat`/`lng` und `id` aus den gespeicherten Städten – also gerade den Ausschnitt, den man vorher nie angesehen hat. **Er steht hinter dem bisherigen Verhalten**: erst Netz, dann die zuletzt gesehene Antwort (12.8), dann erst die Stadt. Das Verhalten ohne gespeicherte Stadt ist unverändert. Der Preis: Die Filterlogik (Rechteck, Luftlinie) steht ein zweites Mal im Service Worker, weil er kein TypeScript einbindet; der Kommentar dort verweist auf `spots.ts`. Der Offline-Test vergleicht die Antwort mit der des Servers, damit beide nicht auseinanderlaufen.
  - **Der Speicher heißt `wheelee-city` ohne Versionsnummer** und ist von der Aufräumung in `activate` ausgenommen; der Name steht in `sw.js` und in `offline-cities.ts`, beide müssen übereinstimmen. Mit einer Version im Namen hätte jede Änderung am Service Worker (`VERSION` wurde auf v2 gehoben) die mitgenommenen Städte stillschweigend gelöscht – genau im Funkloch, wenn man sie braucht.
  - **Kein Netz nötig außer dem eigenen Server:** `connect-src 'self'` unverändert, keine Gegenstelle, nichts Personenbezogenes. `e2e/datenschutz.spec.ts` bleibt grün.

  **Sichtbar und löschbar.** Je Stadt: Anzahl der Standorte, belegte Größe (Länge der gespeicherten Antwort – die tatsächliche Belegung auf dem Gerät liegt wegen Verwaltungsaufwand etwas darüber, für die Größenordnung genügt es), „Löschen" je Stadt, „Aktualisieren", Summe darunter. Köln hat rund 200 KB; die größten Seed-Dateien (Hamburg, Berlin) liegen bei rund 420 KB, geladen waren es bei Hamburg 306 KB – deshalb kein Speicherlimit und keine Warnung vor dem Laden.

  **Alter, und was „veraltet" heißt.** Es stehen zwei Daten da: **„Stand der Daten"** (`importedAt` – wann der Import der Stadt lief) und **„Geladen am"** (wann die Kopie auf das Gerät kam). Zwei Hinweise, weil es zwei Fehler gibt:
  - **Daten älter als 190 Tage** – „Der Stand ist älter als ein halbes Jahr …". Orientiert an Datenpflege.md, Abschnitt 3: Der vollständige Neuimport läuft halbjährlich; ein Stand, der älter ist als ein halbes Jahr plus eine Woche Spielraum, hat einen Durchgang verpasst. Das gilt auch bei frischer Kopie – eine heute geladene Kopie eines alten Imports ist nicht aktuell.
  - **Kopie älter als 31 Tage** – „Die Kopie ist über einen Monat alt. Mit Netz bitte aktualisieren." Die Aktualitätsprüfung läuft monatlich (Datenpflege.md, Abschnitt 3); danach kann der Server einen neueren Stand haben.
  Beide Schwellen stehen als `STALE_DATA_DAYS` und `STALE_COPY_DAYS` in `offline-cities.ts` und sind geprüft (`offline-cities.test.ts`). **Die Zahlen sind meine Setzung aus der Datenpflege, keine Vorgabe von Torsten** – bitte bestätigen oder ändern. Der Hinweis erscheint nur in den Einstellungen, nicht an der Karte: Ob die Karte gerade aus einer Kopie bedient wird, weiß die Oberfläche nicht (der Service Worker antwortet für sie), das wäre ein eigener Punkt.

  **Datenschutzerklärung nachgeführt** (Abschnitt 4): Der Zwischenspeicher, auch der, den die App schon vorher für 12.8/12.9 anlegte und der dort fehlte, steht jetzt dort, samt dem ausdrücklichen Vorabladen und der Löschmöglichkeit. Der Text gehört nach D-08 zur Ausnahmeliste und bleibt deutscher Quelltext; die Prüfung nach 10.2b steht weiter aus.

  **Geprüft:** `typecheck`, `lint`, Unit-Tests (381) und die gesamten E2E-Tests (60) **im Produktionsbau** grün, darunter neu `e2e/vorab-laden.spec.ts` (Laden, Größe, Alter, Löschen – auch im Entwicklungsbetrieb lauffähig – und der Offline-Fall mit einem Ausschnitt, den vorher nie jemand angefragt hat, nur mit Service Worker). Die Oberfläche im Telefonformat angesehen.

---

## Doppelt belegte Nummern berichtigt (2026-10-20, zweiter Durchgang)

- [x] **Abschnitt 10 trug zwei Nummern doppelt – für verschiedene Sachen.** Gefunden beim Aufräumen, und zwar nicht durch Hinsehen, sondern durch einen Abgleich der beiden Dateien: Welche Nummer steht in `ToDos.md` **und** hier?

  | Nummer   | Bedeutete zuerst                    | Bedeutete zusätzlich                       | Jetzt                                           |
  | -------- | ----------------------------------- | ------------------------------------------ | ----------------------------------------------- |
  | **10.3** | Lizenz- und Attributionshinweise    | Sicherheits-Kopfzeilen (gebaut 2026-10-17) | 10.3 bleibt Lizenz, Kopfzeilen → **10.6**       |
  | **10.5** | Haftungshinweis (gebaut 2026-10-10) | Datenschutz- und Sicherheitsprüfung        | 10.5 bleibt Haftungshinweis, Prüfung → **10.7** |

  **Warum das mehr ist als Ordnungsliebe:** Diese Nummern sind die Verweise, mit denen sich Code, Tests und die beiden Listen aufeinander beziehen – `next.config.ts` sagte „ToDo 10.3", `e2e/sicherheit.spec.ts` ebenfalls, und gemeint war beides Mal etwas anderes als das 10.3 in der offenen Liste. Wer „10.5" nachschlug, fand den Haftungshinweis und hielt die Sicherheitsprüfung für erledigt. **Ein Verweis, der auf zwei Dinge zeigt, ist schlechter als keiner** – aus demselben Grund, aus dem ein doppelter Eintrag schlimmer ist als keiner ([CLAUDE.md](CLAUDE.md)).

  **Die jüngeren Posten haben die neuen Nummern bekommen, nicht die älteren.** Lizenz (10.3) und Haftungshinweis (10.5) stehen in mehr Stellen und stammen aus der ursprünglichen Planung; sie umzubenennen hätte mehr Verweise gebrochen. Geändert sind: `next.config.ts`, `e2e/sicherheit.spec.ts`, die Reihenfolge-Tabelle und der Punkt selbst. **Beide alten Nummern stehen überall als „bis zum 2026-10-20 als 10.x geführt" daneben**, damit eine ältere Notiz oder ein Commit weiterhin auflösbar bleibt.

  **7.7 steht weiterhin zweimal, und das bleibt so** – zwei Durchgänge derselben Arbeit (82 → 93 → 96 %), der zweite nennt den ersten. Das ist die im Kopf dieser Datei genannte Ausnahme und keine Kollision.

- [x] **Eine Entscheidung stand in zwei Kästchen** (2026-10-20, betrifft 2e.5 und D-07). `2e.5` lautete „nächste Größenstufe – hängt an D-07", `D-07` „Importgrenze senken?". Zwei Haken für eine Sache heißt: Beim Erledigen wird einer nachgeführt. Geführt wird es jetzt bei **D-07**, wo die Entscheidungen stehen; die Nummer 2e.5 ist dort in der Überschrift genannt, damit sie nachschlagbar bleibt. Der abgeschlossene Teil – die Stufe „ab 50.000" – steht unverändert als eigener Eintrag weiter oben.

---

## Rückschnitt der offenen Liste (2026-10-20)

- [x] 10.3 **Lizenz- und Attributionshinweise – hier bleibt nichts offen.** ODbL-Nennung und Quellenangabe je Stadt sind seit dem 2026-10-10 fertig; was fehlte, war die Lizenz der 15 amtlichen Quellen, die keine angeben. **Das ist 2a.5 und wird dort geführt.** Bis zum 2026-10-19 stand es an beiden Stellen als eigenes Kästchen – eine Arbeit, zwei Haken, und beim Erledigen wäre nur einer nachgeführt worden. Seit dem 2026-10-20 steht 10.3 deshalb nicht mehr in der offenen Liste.

- [x] **Die offene Liste ist auf offene Punkte zurückgeschnitten** (2026-10-20, auf Zuruf: `ToDos.md` soll so kurz und knapp wie möglich sein). Kein gebauter Code, sondern eine Aufräumarbeit an den beiden Dateien – und sie steht hier, weil sonst niemand erführe, **warum** rund drei Viertel des Textes aus `ToDos.md` verschwunden sind, und der Nächste sie wieder aufnähme.

  **Der Befund:** Die Datei hatte 845 Zeilen, von denen nur etwa ein Viertel offene Aufgaben waren. Der Rest war Tagebuch („Arbeitsstand", „Was zuletzt geschah", vier Absätze „Davor am …"), waren Zählstandsnotizen über frühere Zählfehler, Abschnittsüberschriften mit dem Inhalt „Nichts offen" (5, 6, 7), und ausgelagerte Begründungen, die in `Erledigt.md`, `Datenpflege.md` oder `CLAUDE.md` schon vollständig standen. **Eine Liste, in der man den offenen Punkt zwischen Rückblicken suchen muss, beantwortet ihre einzige Frage nicht mehr:** Was ist noch zu tun?

  Was wohin gegangen ist, damit nichts verloren ist:

  - **Das Tagebuch ist weg, nicht umgezogen.** Jeder darin beschriebene Vorgang hat hier einen eigenen Eintrag mit Begründung – das Tagebuch war eine zweite, kürzere Fassung davon. Zwei Fassungen derselben Sache sind genau der Fall, bei dem später nur eine nachgeführt wird. Was von ihm gebraucht wird, ist der Einstieg nach einer Unterbrechung, und den leistet die Reihenfolge-Tabelle besser: Sie sagt, was als Nächstes dran ist, statt was zuletzt war.
  - **Die Abschnitte 5, 6 und 7 standen als leere Überschriften da**, mit der Begründung, die Nummerierung beider Dateien müsse dieselbe sein. Das trägt nicht: Wer „6.17" nachschlägt, sucht in `Erledigt.md`, und dort stehen die Abschnitte vollständig. Eine Überschrift, unter der „Nichts offen" steht, kostet beim Durchsehen Aufmerksamkeit und gibt nichts zurück.
  - **Die Fallstricke am Datenbestand** stehen jetzt unten in dieser Datei als eigener Abschnitt – sie sind Erfahrung und Begründung, also genau das, was diese Datei sammelt, und keine Aufgabe.
  - **Die „drei Befunde, die den Stand erklären"** (verworfener landesweiter Import, Arbeitsliste mit 204 statt 10.754 Gemeinden, Chemnitz mit Wohnmobilstellplätzen) sind hier bei 2e.7, 2e.10 und 2d.10 ausführlicher beschrieben als dort. Ersatzlos gestrichen.
  - **Die „Notizen zur Datenlage"** – die vier Fehlerklassen beim Import – stehen in [Datenpflege.md](Datenpflege.md) unter „Erfahrungen" und in der [README](README.md). Der Satz, der dort allein stand, ist unten im Fallstrick-Abschnitt erhalten.
  - **Die Stack-Tabelle (D-01)** stand in `ToDos.md` und in der README, in zwei verschiedenen Fassungen – die eine kannte Datenbank und Hosting, die andere nicht. Die README ist die richtige Stelle (dort sucht man einen Stack) und hat die beiden fehlenden Zeilen bekommen.
  - **Die Vollständigkeitsprüfung** („jeder offene Posten steht in der Tabelle") ist entfallen. Sie war ein Node-Einzeiler gegen eine Liste von über 800 Zeilen; bei der jetzigen Länge beantwortet das Hinsehen die Frage. Dass Reihenfolge-Tabelle und Abschnitt „Entscheidungen" zusammen alle Posten nennen, ist beim Kürzen Punkt für Punkt geprüft worden.
  - **2e.7a ist in 2e.11 eingeschmolzen.** Beide sagten dasselbe: Eine Overpass-Abfrage je Gemeinde ist bei 10.754 Gemeinden Missbrauch eines Gemeinschaftsdienstes, und der landesweite Lauf ist unter Last unzuverlässig. 2e.7a war die ältere, 2e.11 die ausgearbeitete Fassung mit dem Lösungsweg.
  - **Die Attributionsfrage aus 2e.11 ist keine offene Aufgabe und steht nicht mehr dort:** Die Geofabrik-Auszüge stehen unter ODbL, also unverändert gegenüber dem heutigen OSM-Bezug. Sie enthalten keine Benutzernamen und Changeset-IDs – für dieses Projekt kein Verlust, sondern eine Frage nach personenbezogenen Daten weniger.
  - **Die Zählstandsnotizen** („von 51 auf 44 durch Aufräumen", „nachgezählt, nicht fortgeschrieben") beschrieben zwei frühere Zählfehler. Die Lehre daraus steht als Regel in [CLAUDE.md](CLAUDE.md); der Einzeiler, der die Zahl liefert, steht weiter oben in beiden Dateien. Der Rückblick auf die falschen Zahlen selbst gehört nicht in eine Aufgabenliste.

  **Drei Zahlen wurden beim Kürzen nachgezählt statt übernommen**, und zwei davon waren erklärungsbedürftig:

  - **174 Standorte ohne Straßennamen** (3.0i), 33 Städte, Dormagen 82 von 82 – unverändert gegenüber dem 2026-10-19, jetzt mit den nächstgrößten Fällen daneben (Neumünster 14/97, Euskirchen 13/258, Eschweiler 7/55).
  - **Die Größenstufen widersprachen sich scheinbar:** An einer Stelle stand „ab 40.000 wären es 90 Gemeinden, ab 20.000 bereits 511", an einer anderen „ab 20.000 = 706". Beides ist richtig – die erste Reihe zählt die **zusätzlichen** Gemeinden, die zweite **alle**. Nachgezählt gegen `data/_gemeinden.json`: ab 50.000 sind es 195, ab 40.000 285, ab 20.000 706, ab 10.000 1.598, ab 5.000 2.943. In der Liste steht jetzt nur noch die eine, unmissverständliche Reihe. **Zwei Zahlenreihen, die dasselbe zu messen scheinen, sind schlimmer als eine ungenaue** – man glaubt dann keiner mehr.
  - **Die größte offene Gemeinde ist Cuxhaven mit 49.697 Einwohnern**, danach Speyer (49.564) und Leonberg (49.480).

  **Die Vorgehensweise selbst steht jetzt als Regel in [CLAUDE.md](CLAUDE.md)** – mit der Begründung, dass dieser Rückschnitt der zweite innerhalb von zwei Tagen war: Am 2026-10-19 fielen sieben Posten weg, die keine offenen Aufgaben waren. **Eine Liste, die zweimal in zwei Tagen aufgeräumt werden muss, hat kein Zählproblem, sondern ein Regelproblem.**

### Befund zu 12.5a: der ausgelieferte Stand ist älter als der 2026-10-11

Gemessen am 2026-10-19 gegen die laufende Seite. Der Punkt selbst bleibt offen
und steht in [ToDos.md](ToDos.md); die **Messung** ist abgeschlossen und steht
deshalb hier.

```
wheelee.de  →  /api/auth/login        404   (Konten)
               /api/feedback          404   (Rückmeldungen)
               /api/spots/x/ratings   404   (Bewertungen)
               /impressum             404
               /datenschutz           404
               keine Sicherheits-Kopfzeilen der App
```

Nicht ausgeliefert sind damit: Datenbank, Konten und Rückmeldungen (11.1,
17.0–17.5), die Zielsuche nach Nähe (6.23), die Sicherheits-Kopfzeilen (10.6),
Impressum und Datenschutzerklärung (10.2) und die Bewertungen (8.1–8.7).

**Aufgefallen ist es nicht durch eine Prüfung, sondern weil jemand die Seite
benutzen wollte.** In den Einstellungen der laufenden Seite stand noch „Fehler
melden ist noch nicht eingerichtet … `FEEDBACK_EMAIL`" – ein Text, den der
Quelltext seit dem 2026-10-11 nicht mehr kennt (17.3). Das ist der eigentliche
Befund: Acht Tage lang hat niemand gemerkt, dass nichts davon im Netz ist,
weil es keinen automatischen Weg dorthin gibt (12.5).

### Zählbefehl zu 3.0i

Die Zahl gehört nicht hingeschrieben, sondern ermittelt:

```bash
node -e "const fs=require('fs');let t=0,n=0;for(const f of fs.readdirSync('data')){if(!f.endsWith('.json')||/^_|\.(overrides|parsed|report|line-fixups)\.|^geocode-cache|^osm-address|^frankfurt-pdf-liste/.test(f))continue;const d=JSON.parse(fs.readFileSync('data/'+f,'utf8'));if(!d.spots)continue;t+=d.spots.length;n+=d.spots.filter(s=>!s.street).length;}console.log(n,'von',t);"
```

**Warum gezählt und nicht erinnert:** Die 3.0-Kette war zweimal abgeschlossen
und ist zweimal wieder aufgerissen – beim Import der Städte ab 50.000
Einwohnern und danach erneut. In der offenen Liste stand bis zum 2026-10-19
„66 von 17.206", ein richtiger Satz aus der Zeit mit 17.206 Standorten.

---

## Fallstricke beim Arbeiten am Datenbestand

Verschoben aus `ToDos.md` (2026-10-20): Das ist Erfahrung, keine Aufgabe. Die
laufenden Arbeitsregeln stehen in [CLAUDE.md](CLAUDE.md), der Weg eines
Imports in [Datenpflege.md](Datenpflege.md).

- **Der Import schleppt behobene Mängel wieder ein.** Nach dem Import der Städte ab 50.000 Einwohnern standen 21 % aller Standorte ohne Straßennamen da, weil `import:streets` nicht Teil der Importanleitung war. Jetzt als Schritt 5 in [Datenpflege.md](Datenpflege.md) festgeschrieben – **und nach jedem Import wirklich auszuführen**, auch nach einem einzelnen.
- **Einzelne Städte dauern sehr lange, ohne hängen zu sein.** Konstanz lief über 40 Minuten. Grund ist die Bauart: Jede Overpass-Abfrage trägt `[out:json][timeout:300]`; scheitert sie, wird sie zerlegt und über mehrere Spiegel mit Pausen wiederholt. Unter Last summiert sich das. Einen clientseitigen Abbruch (`AbortSignal.timeout`) gibt es nicht – wäre eine sinnvolle Ergänzung, damit ein Lauf kalkulierbar bleibt.
- **Overpass verträgt kein hohes Tempo.** Bei rund 100 Städten am Stück häufen sich HTTP 500/504. Zwischen den Schüben ein paar Minuten Pause.
- **`import:city -- --rest` greift keine fehlgeschlagenen Städte**, nur „offene". Nachholen geht namentlich: `npm run import:city -- <slug> <slug>`.
- **`sources:scan` ist billiger als es aussieht.** Es fragt GovData **einmal je Suchbegriff**, nicht je Stadt – ein vollständiger Neulauf kostet rund zehn Abfragen. Ändert sich eine Filterregel, ist der saubere Neulauf der richtige Weg und nicht das Bearbeiten des erzeugten Zwischenstands.
- **Frankfurt (Oder) bekam den Datensatz von Frankfurt am Main.** Die Zuordnung in `scan-sources.mts` streicht Klammerzusätze, wodurch beide auf „frankfurt" verkürzt wurden. Die Abstandsprüfung hat es gefangen, der Import fiel auf OSM zurück – behoben in 2d.11.
- **Ein Schwellenwert, der knapp danebenliegt, ist kein Schutz.** `looksTooSmall` verwirft eine amtliche Quelle unter 2,0 Stellplätzen je 10.000 Einwohner. Chemnitz lag bei 2,28 und kam mit Wohnmobilstellplätzen durch (2d.10). Gefangen hat es erst der Vergleich über alle Städte.
- **Die beiden Quellenarten sind nicht vergleichbar.** Amtliche Listen führen einzelne Stellplätze am Straßenrand, OpenStreetMap überwiegend Parkplätze mit ausgewiesenen Behindertenstellplätzen. Die Oberfläche sagt das, und so muss es bleiben.

---

## Erwägungen zu 13, 15 und 16

> **15 und 16 sind am 2026-10-20 freigegeben** und stehen seitdem als offene
> Punkte in [ToDos.md](ToDos.md) – mit Platz in der Reihenfolge. **Abschnitt 13
> (Finanzierung) bleibt gesperrt.** Die Erwägungen unten bleiben stehen: Sie
> sind jetzt die Grundlage der Umsetzung, nicht mehr die Begründung einer
> Sperre. Genau dafür standen sie hier – damit beim Freigeben nichts neu
> zusammengetragen werden muss. Wie übersetzt wird, ist als **D-08** weiter
> oben entschieden; wie 16 geteilt wurde (Daten jetzt, Kacheln später), steht
> in `ToDos.md` bei 16.1/16.2.

**Die Erwägungen stehen hier und nicht in der offenen Liste**, damit diese kurz
bleibt.

### 13. Finanzierung

- **13.1 Spenden-Knopf.** Zu klären: Anbieter (PayPal, Ko-fi, Stripe, Betterplace), Einmal- oder Dauerspende, und ob eine natürliche Person oder ein Verein empfängt – das hat steuerliche Folgen. Zurückhaltend platzieren: Wer auf einen Behindertenparkplatz angewiesen ist, soll nicht das Gefühl bekommen, für eine Selbstverständlichkeit zu zahlen.
- **13.2 Werbebanner (AdSense oder vergleichbar).** Technisch einfach, aber: AdSense setzt Tracking-Cookies, verlangt damit ein Einwilligungsbanner und widerspricht 10.4 („keine Tracker") sowie dem Sparsamkeitsgrundsatz des Konzepts. Werbung auf einer Karte, die man einhändig im Auto bedient, kostet Fläche und erzeugt Fehlklicks – genau bei der Zielgruppe, der die App helfen soll. Und bei einer Nischen-App ohne Reichweite steht der Erlös kaum im Verhältnis zum Vertrauensverlust. Weniger teure Alternativen: Spenden allein, Förderung durch Kommunen oder Sozialverbände, oder eine Anzeigenform ohne Tracking (etwa EthicalAds).
- **13.3** Falls Werbung kommt: Einwilligungsbanner, Impressum und Datenschutzerklärung müssen vorher stehen – ohne sie wäre es rechtswidrig.

### 15. Mehrsprachigkeit

Wer einen Behindertenparkausweis hat, hat ihn EU-weit – der blaue Parkausweis
gilt in allen Mitgliedstaaten. Jemand, der aus Frankreich oder Spanien
anreist, steht vor derselben Frage wie alle anderen, nur ohne Deutsch.
**Zurückgestellt auf Torstens Wunsch, bis die deutsche Fassung steht.**

- **15.1** Englisch, Spanisch, Französisch. Englisch zuerst: Es hilft am breitesten und deckt Sprachen mit ab, für die es keine eigene Fassung gibt.
- **15.2** Texte aus dem Quelltext lösen. Alle Beschriftungen stehen direkt in den Komponenten – für eine Sprache übersichtlich, für vier unhaltbar. Nötig wäre eine Übersetzungsdatei je Sprache und ein schlanker Zugriff; die App ist klein genug, dass es dafür keine große Bibliothek braucht.
- **15.3 Was dabei leicht übersehen wird**, weil es nicht nach Text aussieht: `<html lang="de">` steuert Silbentrennung (`hyphens-auto`) und die Aussprache im Screenreader – falsch gesetzt klingt die App für Blinde wie Kauderwelsch. Datums- und Zahlenformate sind an `de-DE` festgenagelt (`toLocaleDateString`, `toLocaleString`), ebenso die Sortierung der Städteliste (`localeCompare`). Die Entfernung schreibt „1,5 km" mit Komma – im Englischen ein Punkt. Das Rückmeldeformular ist Oberfläche wie jede andere; die **gespeicherten** Meldungen bleiben in ihrer Sprache, und die Übersicht für Administratoren braucht keine Übersetzung.
- **15.4 Die Daten bleiben deutsch, und das ist richtig so.** Straßennamen werden nicht übersetzt – wer „Bahnhofstraße" sucht, muss „Bahnhofstraße" lesen. Zeitangaben stehen teils als deutscher Freitext in den Quellen; deren Deutung ist sprachgebunden und müsste je Sprache **ausgegeben**, nicht neu geparst werden. Der Haftungshinweis ist rechtlich bedeutsam und gehört übersetzt, nicht sinngemäß übertragen.
- **15.5 Spracherkennung mit Umschalter**, nicht ohne. Die Browsersprache ist ein guter erster Vorschlag, aber wer ein englisches Betriebssystem auf einem deutschen Telefon hat, will die Wahl behalten – in die Einstellungen, neben Darstellung und Karten-App.

### 16. Städte zum Mitnehmen herunterladen

Die Grundlage ist seit 12.8/12.9 da: Ein Service Worker hält Seite, zuletzt
geladene Parkplätze und Kartenkacheln vor. Das reicht aber nur für das, was
man vorher ohnehin angesehen hat. **16.1 geht weiter: eine Stadt bewusst
vorab laden**, damit sie unterwegs vollständig verfügbar ist. Der Anlass ist
derselbe wie bei der ganzen App – wer auf einen Behindertenparkplatz
angewiesen ist, braucht ihn am ehesten dort, wo das Netz am schlechtesten ist:
in der Tiefgarage, im Parkhaus, im Funkloch kurz vor dem Ziel.

Vor dem Bauen zu klären:

- **Was genau wird geladen?** Die Parkplatzdaten einer Stadt sind klein (Köln rund 200 KB). Die Kacheln sind es nicht: ein Stadtgebiet in brauchbarer Zoomstufe geht in die Dutzende Megabyte. Ohne Kacheln gibt es eine Liste ohne Karte – weniger, aber vielleicht genug.
- **Wie viel Platz darf die App belegen?** Das muss sichtbar sein und sich löschen lassen. Eine App, die unbemerkt 200 MB belegt, fliegt vom Telefon.
- **Kachel-Vorabladen ist gegenüber OpenStreetMap heikel.** Die Nutzungsbedingungen untersagen massenhaftes Herunterladen. Für einen Stadtausschnitt je Nutzer:in bräuchte es eine ausdrückliche Erlaubnis, einen bezahlten Anbieter oder Vektorkacheln aus eigener Quelle. **Das ist die eigentliche Hürde, nicht die Technik.**
- **Wie alt dürfen mitgenommene Daten sein?** Ein vor drei Monaten geladener Stand, der sich als aktuell ausgibt, wäre schlimmer als gar keiner. Es bräuchte ein sichtbares Datum und einen Hinweis, wenn es alt wird.

Vorschlag für den Fall einer Freigabe: **in zwei Schritten.** Zuerst nur die
Parkplatzdaten je Stadt – klein, rechtlich unbedenklich, sofort nützlich. Die
Kacheln erst danach und erst, wenn die Lizenzfrage geklärt ist.
