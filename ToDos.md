# ToDos – wheelee

Zentrale Aufgabenliste zum Projekt (Grundlage: [Konzept.md](Konzept.md)).
Wie Daten importiert, geprüft und aktuell gehalten werden, steht in
[Datenpflege.md](Datenpflege.md).

**Status-Legende:** `[ ]` offen · `[~]` in Arbeit · `[x]` erledigt · `[!]` blockiert / Entscheidung nötig · `[-]` verworfen / später

**Letzte Aktualisierung:** 2026-10-09

**Endziel:** jeden öffentlichen Behindertenparkplatz in Deutschland erfassen,
der sich aus einer öffentlichen Quelle importieren lässt – siehe
[Abschnitt 2e](#2e-ganz-deutschland).

**Stand in Zahlen:** 84 von rund 10.700 Gemeinden, 13.463 Standorte,
33.209 Stellplätze. Karte, Liste und Detailansicht laufen. Es fehlen vor allem:
Bewertungen (brauchen die Datenbank), Rechtstexte und Deployment – und der
weitaus größte Teil Deutschlands.

---

## Arbeitsstand

Hier steht, woran zuletzt gearbeitet wurde und was als Nächstes dran ist.
**Nach jeder abgeschlossenen Aufgabe aktualisieren**, damit nach einer
Unterbrechung nahtlos weitergearbeitet werden kann.

**Zuletzt abgeschlossen:** 7.8 Feedback-Knopf (2026-10-09)
**Gerade in Arbeit:** –

**Wartet auf dich:**

- **D-06 E-Mail-Adresse für Fehlermeldungen** – **erst ab 13.10.2026 ansprechen**, du legst die Adresse bis dahin an. Der Knopf ist fertig und sagt solange offen, dass die Adresse fehlt. Danach genügt eine Zeile in `src/lib/feedback.ts`.
- **D-02 Datenbank** (Supabase oder Neon) – blockiert Abschnitt 5 und damit die Bewertungen
- **D-03** Missbrauchsschutz · **D-05** Umgang mit ungenauen Positionen
- **10.2** Impressum und Datenschutzerklärung brauchen deine Angaben
- **Abschnitt 13 (Finanzierung)** ist gesperrt, bis du ihn freigibst

**Als Nächstes geplant**, in dieser Reihenfolge:

1. 6.15 Navigationsleiste mit × schließbar machen
2. 6.16 Kurze Auswahl naher Parkplätze statt nur des nächsten
3. 3.5 Dubletten zusammenführen – die Validierung meldet sie, behoben sind sie nicht
4. 10.5 Haftungshinweis sichtbar formulieren
5. 2d.9 Regensburg hat weder amtliche Daten noch OSM-Treffer
6. 3.9a Rostock: amtliche Quelle nennt 5 Standorte, OSM kennt 99
7. 9.7 Kontraste nach WCAG AA prüfen
8. 12.3 E2E-Smoke-Test

**Stand:** 148 Punkte – 57 erledigt, 89 offen, 5 brauchen deine Entscheidung,
3 gesperrt. **Tests: 107** (zu Beginn dieser Arbeitsreihe: 46).

---

## 0. Offene Entscheidungen

- [x] **D-01 Technologie-Stack bestätigt** (2026-10-08) – Next.js 15, TypeScript, Tailwind 4, Leaflet + OSM, Postgres, Vercel.
- [x] **D-04 Geocoding-Quelle** – Nominatim, 1 Anfrage/Sekunde, Antworten versioniert zwischengespeichert.
- [!] **D-02 Datenbank konkret wählen** – Supabase oder Neon. Blockiert Abschnitt 3 und damit die Bewertungen; die Seed-Dateien sind von der Wahl unabhängig.
- [!] **D-03 Missbrauchsschutz für Bewertungen ohne Accounts** – Empfehlung: eine Bewertung pro Parkplatz pro Gerät (LocalStorage) plus IP-Rate-Limit serverseitig.
- [!] **D-05 Umgang mit Parkplätzen ohne Koordinaten** – Empfehlung: nicht auf den Stadtteil-Mittelpunkt setzen, sondern als „Position ungenau" kennzeichnen und nur in der Liste führen. Derzeit faktisch gelöst, weil alle importierten Standorte Koordinaten haben.
- [!] **D-06 E-Mail-Adresse für Fehlermeldungen festlegen** – **ab 13.10.2026 nachfragen.** Du legst die Adresse bis dahin selbst an; vorher nicht erinnern. Der Feedback-Knopf ist gebaut, verschickt aber an eine Platzhalteradresse. Zu klären:
  - Welche Adresse soll es sein? Eine eigene wie `feedback@…` oder eine bestehende?
  - Sie wird im Quelltext stehen und ist damit öffentlich – auf Spam gefasst sein. Eine eigene Adresse mit Filter ist einer privaten vorzuziehen.
  - Bis zur Entscheidung steht `FEEDBACK_EMAIL` in `src/lib/feedback.ts` auf einem Platzhalter, den der Knopf sichtbar meldet, statt stillschweigend ins Leere zu schicken.

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
- [x] 2d.7 **Alle 83 Großstädte importiert** – 13.463 Standorte, 33.209 Stellplätze, davon 16 Städte amtlich
- [x] 2d.8 **Fünf Städte mit ungenutzter amtlicher Quelle untersucht** (2026-10-09). Ergebnis: bei keiner liegt es am Importer.
  - **Kiel und Krefeld haben überhaupt keine Behindertenparkplatz-Daten.** Ihre Treffer waren „Bewohnerparken Kiel" und „Bewohnerparken Krefeld" – Anwohnerparken, dieselbe Verwechslung wie bei Aachen. Dass der Importer sie ablehnt, ist richtig; OpenStreetMap ist dort die korrekte Quelle.
  - **Bochum, Bielefeld und Karlsruhe haben echte Datensätze, aber tote Links.** Bochums ArcGIS-Dienst existiert nicht mehr (der Server listet 58 Dienste, keiner davon passt), die Dateien auf `bochum.opendata.ruhr` antworten mit 403 auch mit Referer. Karlsruhes Dienstpfad liefert 404. Bielefelds Portal war nicht erreichbar.
  - **Die eigentliche Erkenntnis:** GovData verweist auf Dienste, die es nicht mehr gibt. Das trifft die monatliche Aktualitätsprüfung (4.4) – sie muss auch tote Links melden, nicht nur geänderte Datumsangaben.
- [ ] 2d.8a Bei Bochum, Bielefeld und Karlsruhe die aktuellen Bezugswege suchen – auf den Portalen der Städte statt über GovData. Der Gewinn wäre spürbar: Düsseldorf kam von 171 Standorten aus OSM auf 340 aus der amtlichen Quelle.
- [ ] 2d.9 **Regensburg** hat weder amtliche Daten noch OSM-Treffer – prüfen, ob die Abfrage oder die Datenlage schuld ist
- [ ] 2d.10 Auffällig niedrige OSM-Zahlen stichprobenartig prüfen, etwa Wuppertal mit 66 Standorten bei 359.000 Einwohnern

### 2e. Ganz Deutschland

> **Das Endziel des Projekts: jeden öffentlichen Behindertenparkplatz in
> Deutschland erfassen, der sich aus einer öffentlichen Quelle importieren
> lässt.** Nicht die größten Städte, nicht die wichtigsten – alle.

Die 84 bisher erfassten Städte sind ein Anfang, kein Zwischenstand kurz vor
dem Ziel. Deutschland hat rund 10.700 Gemeinden; zwei Drittel der Menschen
leben außerhalb der Großstädte. Gerade dort ist die Parkplatzsuche ohne Karte
mühsamer, weil es weniger Plätze gibt und niemand sie auflistet.

Was „importierbar" heißt: amtliche Daten der Gemeinde oder des Landes, sonst
OpenStreetMap. Beides ist frei nutzbar, beides kann der Importer bereits
lesen. Nicht importierbar sind Daten hinter Lizenzschranken (Parkopedia) oder
solche, die nur als Bild oder gedruckter Plan vorliegen.

- [ ] 2e.0 **Abdeckung messbar machen.** Ohne Maßstab bleibt „alle" eine Absichtserklärung. Nötig ist ein Bericht, der zeigt: wie viele Gemeinden erfasst, wie viele mit amtlicher Quelle, wie viele nur aus OSM, wie viele geprüft ohne Treffer. Erst damit ist erkennbar, ob das Ziel näher rückt.
- [ ] 2e.1 **Alle Gemeinden mit amtlichen Daten erfassen, unabhängig von der Einwohnerzahl.** Jeden GovData-Datensatz zu Behindertenparkplätzen durchgehen und die zugehörige Gemeinde importieren – das ist die billigste Ausweitung, weil die Daten gut sind und der Importer sie schon lesen kann.
- [ ] 2e.2 Landesportale einbeziehen, die GovData nicht lückenlos spiegelt: Open.NRW, MobiData BW, Open Data Hessen, daten.berlin.de, Geodatenportal Bayern
- [ ] 2e.3 **Landesweite Sammeldatensätze auswerten** – „Gebündelte Daten Behindertenparkplätze NRW" (Mobilithek) und die Park-API von MobiData BW decken in einem Zug viele Kommunen ab, auch kleine
- [ ] 2e.4 **Gemeinderegister aufbauen** statt der handgepflegten Städteliste. Das amtliche Gemeindeverzeichnis des Statistischen Bundesamts enthält alle rund 10.700 Gemeinden mit Schlüssel, Name und Einwohnerzahl – als Datei einlesen, nicht abtippen.
- [ ] 2e.5 Stufenweise vorgehen, größte zuerst: ab 50.000 Einwohnern (rund 190 Gemeinden), dann ab 20.000 (rund 650), dann ab 10.000, dann der Rest. So ist nach jeder Stufe ein nutzbarer Stand erreicht.
- [ ] 2e.6 Restliche Gemeinden aus OpenStreetMap – der Importer kann das bereits, es fehlt nur die Liste
- [ ] 2e.7 **Laufzeit und Last beherrschen.** Bei 10.700 Gemeinden ist eine Overpass-Abfrage je Gemeinde nicht vertretbar – das wäre Missbrauch eines Gemeinschaftsdienstes. Bessere Wege: ein landesweiter Overpass-Durchlauf je Bundesland statt je Gemeinde, oder ein eigener Auszug aus einem Planet-Download. Vor dem Massenimport zu entscheiden, nicht danach.
- [ ] 2e.8 **Datenhaltung überdenken, bevor es so weit ist.** Eine Seed-Datei je Gemeinde und alle Standorte im Browser trägt bei 84 Städten und 13.463 Standorten; bei mehreren tausend Gemeinden nicht mehr. Hängt an 5.4 (Bounding-Box-API) und sollte vor Stufe zwei von 2e.5 gelöst sein.
- [ ] 2e.9 Gemeinden ohne Treffer getrennt festhalten – „geprüft, nichts gefunden" ist etwas anderes als „noch nicht geprüft". Sonst wird jede Gemeinde bei jedem Durchlauf erneut abgefragt.

---

## 3. Datenvalidierung

### Befund der ersten Prüfung (2026-10-09)

`npm run validate` hat 84 Städte geprüft. Bericht: [data/\_validierung.md](data/_validierung.md).

- [ ] 3.0 **61 % aller Standorte haben keinen Straßennamen** (8.209 von 13.380). In Nürnberg heißen 473 von 487 Einträgen wörtlich „Behindertenparkplatz Nürnberg", in München 172 von 219. Ursache: OpenStreetMap-Objekte tragen selten ein `addr:street`, und der Importer hat für diesen Weg keine Adresse nachgeschlagen. Auf der Karte fällt es kaum auf, in der Liste und in der Detailansicht ist es wertlos. **Das ist der größte Qualitätsmangel im Bestand und hat Vorrang.**
  - [x] 3.0a **Behoben.** Von 61 % ohne Straßennamen auf **1 %** (89 von 13.463). 42 % der Standorte haben jetzt zusätzlich eine Hausnummer. Nürnberg hat statt 15 nun 279 verschiedene Bezeichnungen.
  - [x] 3.0b **Über OpenStreetMap statt über Nominatim gelöst** (`npm run import:streets`): eine Overpass-Abfrage je Stadt für alle benannten Straßen, dann lokal die nächstgelegene zuordnen – über ein Raster, sonst wären es Millionen Abstandsberechnungen. Statt 8.200 Einzelabfragen an einen freien Geocoder sind es rund 140 Abfragen, und der Lauf dauert Minuten statt Stunden. Hausnummern kommen aus den Adressobjekten derselben Abfrage.
  - [x] 3.0c `npm run import:addresses` (Nominatim, eine Anfrage je Standort) bleibt als Rückfallebene für Städte, in denen OpenStreetMap keine Straßen führt
  - [x] 3.0d **Die letzten Lücken geschlossen.** Von 89 verbliebenen Standorten bekamen 84 über die Rückwärtssuche einen Namen – wo keine Straße in Reichweite liegt, jetzt auch der Ortsteil („Parkplatz Silbermannstraße"). Es bleiben **5**, und die tragen aussagekräftige Namen aus OpenStreetMap („IKEA", „Tiefgarage Klinikum", „Wanderparkplatz Tiergarten"); eine Straße wäre dort keine Verbesserung.
  - [x] 3.0f **Datenfehler behoben: Platzhalter im Straßenfeld.** Bei 36 Standorten stand „Behindertenparkplatz Dresden" als _Straßenname_ – der Platzhalter war durch die Adress-Aufspaltung gelaufen. Dadurch galten sie als versorgt und wurden von jeder Nachbesserung übersprungen. Ursache im Importer behoben, Daten bereinigt, alle 36 haben jetzt eine echte Adresse.
  - [ ] 3.0g Kosmetik: Gelsenkirchen stellt jedem Eintrag „Behindertenparkplatz" voran, was in einer App voller Behindertenparkplätze überflüssig ist. Betrifft 218 Bezeichnungen, aber nur als Rückfallwert – angezeigt wird die Straße.
  - [x] 3.0e **Straßennummern als Namen behoben.** Betroffen waren 11 Standorte („A 9", „A 565", „B 10", „B 37", „L 534"). Zwei Änderungen: Autobahnen und Kraftfahrstraßen kommen als Namensgeber nicht mehr in Frage – dort gibt es keine Behindertenstellplätze –, und eine Straße mit richtigem Namen hat Vorrang vor einer nummerierten, auch wenn die etwas näher liegt. Jetzt null Standorte mit Straßennummer.

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
- [x] 3.8 Validierungslauf als eigenes Skript (`npm run validate`) mit Bericht je Stadt
- [x] 3.9 **Erste vollständige Prüfung durchgeführt** – sie hat vier echte Fehler gefunden, drei davon sofort behoben:
  - [x] **Aachen hatte den falschen Datensatz.** Importiert waren „Bewohnerparkzonen" – Anwohnerparken, nicht Behindertenparkplätze. Durchgerutscht, weil der Importer bei Diensten mit nur einer Ebene diese ungefragt nahm. Jetzt nur noch, wenn der Datensatz-Titel selbst von Behinderung handelt. Aachen hat jetzt 111 statt 28 Standorte.
  - [x] **Freiburg hatte 11.485 Stellplätze an 330 Standorten** – das 60-Fache des Üblichen. Die Zählung entfernte alle Nicht-Ziffern, aus „1.1.2012" wurde so 112012. Jetzt werden nur reine Zahlen bis 50 akzeptiert; Freiburg hat 334 Stellplätze.
  - [x] **„0 % von OpenStreetMap bestätigt" war irreführend**, wenn die Overpass-Abfrage gar nichts geliefert hatte. Ein nicht durchgeführter Abgleich wird jetzt als solcher ausgewiesen.
  - [ ] 3.9a **Rostock:** die amtliche Quelle nennt 5 Standorte, OpenStreetMap kennt 99. Das sind 0,2 Stellplätze je 10.000 Einwohner gegenüber 8,5 im Mittel – die amtliche Quelle ist fast leer und sollte nicht bevorzugt werden.
  - [ ] 3.9b Quellenwechsel automatisieren: Liefert eine amtliche Quelle auffällig weniger als OpenStreetMap, soll der Importer das melden statt stillschweigend die schlechtere Quelle zu nehmen.
- [ ] 3.10 Bestätigungsquoten nachgehen: Neuss 95 % und Ulm 81 % zeigen, dass ein hoher Wert erreichbar ist. Köln 24 %, Dresden 19 %, Düsseldorf 5 % – dort lohnt die Stichprobe, ob die amtlichen Koordinaten oder die OSM-Daten versetzt sind.

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
- [ ] 4.4 **Skript `npm run sources:check` bauen**, das die monatliche Prüfung durchführt:
  - liest das gespeicherte Änderungsdatum je Stadt aus `data/_import-status.json`
  - holt das aktuelle Datum der Quelle (CKAN `metadata_modified`, `HTTP HEAD` mit `Last-Modified`/`ETag`, WFS-`GetCapabilities`)
  - lädt dabei **keine** Parkplatzdaten herunter
  - schreibt `data/_aktualitaet.md`: unverändert / geändert / nicht prüfbar, je Stadt
  - nennt am Ende die fertigen Befehle für die Städte, die neu importiert werden sollten
  - **auch tote Links melden.** Die Untersuchung zu 2d.8 hat gezeigt, dass GovData auf Dienste verweist, die es nicht mehr gibt – Bochums ArcGIS-Dienst etwa. Ein Datensatz, der nicht mehr abrufbar ist, ist wichtiger zu wissen als einer, der sich geändert hat.
  - Ablauf und Takt stehen in [Datenpflege.md](Datenpflege.md#3-monatlich-auf-aktualität-prüfen)
- [ ] 4.5 Automatisieren, sobald die App läuft – etwa als monatlicher GitHub-Actions-Lauf, der bei Änderungen einen Pull Request mit den neuen Daten öffnet. So bleibt die Kontrolle beim Menschen.
- [ ] 4.6 Importdatum je Stadt in der Oberfläche zeigen („Daten vom …"), damit niemand veraltete Angaben für aktuell hält

---

## 5. Datenmodell und Backend

- [ ] 5.1 Schema `parking_spot`: id, city, street, house_number, label, district, lat, lng, spot_count, time_restriction, geo_accuracy, source, license, verified, created_at
- [ ] 5.2 Schema `rating`: id, spot_id, vote (`exists` / `gone`), created_at, device_hash
- [ ] 5.3 Tabelle `city` mit Quelle, Lizenz, Importdatum und Abdeckungsgrad
- [ ] 5.4 API: `GET /api/spots` mit Bounding-Box-Filter – 13.463 Standorte an den Browser zu schicken skaliert nicht ewig
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
- [~] 6.7 Mobile Leistung: Clustering und stückweises Laden sind drin, aber alle 13.463 Marker werden erzeugt. Besser: nur laden, was im Kartenausschnitt liegt (hängt mit 5.4 zusammen).
- [x] 6.8 **Beim Start auf den eigenen Standort zentrieren** statt auf den nächstgelegenen Parkplatz – die erste Frage beim Öffnen ist „wo bin ich"
- [x] 6.9 Knopf „zurück zu meinem Standort" (◎ in der Leiste über der Karte)
- [x] 6.10 **Navigationsleiste über der Karte:** nächster Parkplatz mit Entfernung und ein Knopf, der direkt die Navigation startet – ohne erst den richtigen Marker suchen zu müssen
- [x] 6.11 **Legende für die Markerfarben** (Fragezeichen unten rechts). Grün ist der nächstgelegene, Blau eine genaue Position, Rot eine nur ungefähre. Ohne Erklärung war besonders die dritte Farbe irreführend, obwohl es die wichtigste Information trägt.
- [ ] 6.12 **Zieladresse eingeben und am Ziel parken.** Bisher beantwortet die App nur „wo parke ich _hier_". Die häufigere Frage ist aber „wo parke ich _dort_, wo ich hinwill" – zum Arzttermin, zum Amt, zum Besuch. Man will das vor der Abfahrt wissen, nicht nach der Ankunft.
  - Eingabefeld für Ziel (Adresse oder Ortsname), Suche über Nominatim
  - Danach zwei Wege, beide sinnvoll:
    - **direkt navigieren** zum nächstgelegenen Behindertenparkplatz am Ziel statt zum Ziel selbst
    - **Liste der Parkplätze im Umkreis** des Ziels (Vorschlag: 300 m, 500 m und 1 km zur Auswahl), mit Entfernung zum Ziel statt zum eigenen Standort
  - Die Liste ist die bessere Voreinstellung: Der nächstgelegene Platz kann belegt sein, und wer die Alternativen kennt, fährt nicht zweimal.
  - Karte auf das Ziel zentrieren und den Zielpunkt eigens markieren, damit Ziel und Parkplatz unterscheidbar bleiben
  - Zuletzt gesuchte Ziele merken – wiederkehrende Fahrten sind der Normalfall
  - Technisch vorhanden ist alles: `sortByDistance` rechnet gegen jeden beliebigen Punkt, nicht nur gegen den eigenen Standort
- [ ] 6.14 Stadtwechsel ohne Standortfreigabe – eine Suche nach Ort oder Adresse fehlt (wird durch 6.12 weitgehend miterledigt)
- [ ] 6.13 Die Navigationsleiste verdeckt auf kleinen Displays rund ein Fünftel der Karte. Prüfen, ob sie sich beim Scrollen einklappen sollte. (Hängt mit 6.15 zusammen – ein Schließen-Knopf löst dasselbe Problem auf andere Weise.)
- [ ] 6.15 **Navigationsleiste schließbar machen.** Ein × rechts oben in der Leiste, das das Angebot „Nächster Behindertenparkplatz … navigieren" wegklappt und die Karte freigibt.
  - Wer die Karte selbst durchsehen will, soll den Vorschlag loswerden können
  - Nach dem Schließen ein kleiner Knopf am Rand, der sie zurückholt – nicht endgültig verschwinden lassen
  - Entscheidung merken, aber nur für die Sitzung: Beim nächsten Öffnen ist der Vorschlag wieder die wahrscheinlich hilfreichste Anzeige
  - Zusammen mit 6.9 (◎ zurück zum Standort) in einer Zeile unterbringen, damit nicht zwei Knopfreihen entstehen
- [ ] 6.16 **Statt nur des nächsten Parkplatzes eine kurze Auswahl zeigen.** Ein Knopf in der Leiste schaltet von „der eine nächste" auf „die nächsten drei bis fünf", aus denen man wählt.
  - Der Grund ist derselbe wie bei 6.12: Der nächstgelegene Platz kann belegt sein, und wer die Alternativen schon kennt, fährt nicht zweimal.
  - Je Eintrag: Adresse, Entfernung, Anzahl Stellplätze und – falls bekannt – ob eine Zeitbeschränkung gerade gilt
  - Auswahl setzt das Navigationsziel; der Knopf „Navigation starten" bleibt
  - Auf der Karte die angebotenen Parkplätze gemeinsam hervorheben, damit die Lage zueinander erkennbar ist
  - Als aufklappbare Liste in der Leiste, nicht als eigene Ansicht – sonst verliert man die Karte aus dem Blick
  - Überschneidet sich mit der vorhandenen Listenansicht; sinnvoll wäre, beide auf dieselbe Komponente zu stützen statt sie zweimal zu bauen

---

## 7. Parkplatzdetails und Navigation

- [x] 7.1 Detailansicht beim Markerklick, auf dem Smartphone als Bottom-Sheet
- [x] 7.2 Anzeige: Adresse, Stadtteil, Anzahl Stellplätze, Zeitbeschränkung, Entfernung
- [x] 7.3 „In Karten-App öffnen" mit Plattformerkennung – Apple Karten auf iOS, sonst Google Maps
- [x] 7.4 **Teilen-Funktion.** Auf dem Smartphone über das System-Teilen, sonst Link in die Zwischenablage. Geteilt wird ein OpenStreetMap-Link auf die Koordinate – der funktioniert überall und braucht keine App. Nützlicher als es klingt: Wer abgeholt wird oder jemanden begleitet, muss den Treffpunkt mitteilen können.
- [x] 7.5 **Zeitbeschränkungen gedeutet statt nur angezeigt** (`src/lib/opening-hours.ts`)
  - **801 Angaben waren gar keine Beschränkung** – „24/7", „von 00:00 Uhr bis 24:00 Uhr", „Mo-Su,PH 00:00-24:00". Als „Nur: 24/7" gelesen wirkten sie wie eine Einschränkung. Sie werden jetzt ausgeblendet; es bleiben 394 echte.
  - Davon versteht die App 83 % sicher und sagt in der Detailansicht, ob die Beschränkung **gerade gilt** oder **gerade nicht**
  - Wo die Angabe nicht zweifelsfrei deutbar ist, steht bewusst nichts. Eine falsch verstandene Zeitangabe ist schlimmer als keine: Wer glaubt, der Platz sei frei, und ein Knöllchen bekommt, ist schlechter dran als jemand, der selbst nachsieht.
  - `npm run report:times` zeigt, welche Formen noch fehlen und wie oft sie vorkommen
- [x] 7.6 **Hinweis auch in der Liste** – „Beschränkung gilt jetzt" steht neben dem Eintrag, dafür muss man die Details nicht öffnen
- [ ] 7.7 Die restlichen 17 % der Zeitangaben deuten lernen – meist Sonderfälle wie „Mo-Th 06:00-24:00, Fr-Sa 06:00-02:00" (über Mitternacht) oder „nur an Veranstaltungen". Lohnt erst, wenn die häufigen Formen abgedeckt sind.
- [ ] 7.8 **Feedback- und Fehlermeldeknopf.** Gut sichtbar, nicht in einem Untermenü. Öffnet eine vorbereitete E-Mail mit dem Betreff **„Wheelee Fehlermeldung"**.
  - Empfängeradresse ist **noch offen** – siehe D-06
  - Die Adresse steht als einzelne Konstante in `src/lib/feedback.ts` und ist in einer Zeile austauschbar
  - Vorausgefüllt werden Gerät, Browser und – falls die Detailansicht offen war – der betroffene Parkplatz samt ID. Das spart Rückfragen; ohne diese Angaben ist eine Fehlermeldung oft nicht nachvollziehbar.
  - Keine personenbezogenen Daten ohne Zutun: Der Standort wird **nicht** mitgeschickt

---

## 8. Bewertungen

Blockiert durch D-02 (Datenbank). **Noch nichts davon ist gebaut** – bisher
existiert nur die Festlegung, wie es funktionieren soll.

### Regeln (festgelegt 2026-10-09)

|                     | 👍 „Existiert"               | 👎 „Existiert nicht mehr"    |
| ------------------- | ---------------------------- | ---------------------------- |
| Benutzerkonto nötig | **nein**                     | **ja**                       |
| Begrenzung          | 1× pro Parkplatz pro Sitzung | 1× pro Parkplatz pro Sitzung |

Der Gedanke dahinter: Eine Bestätigung kann kaum Schaden anrichten – im
schlimmsten Fall bleibt ein Parkplatz gelistet, den es noch gibt. Eine Meldung
„existiert nicht mehr" entwertet dagegen einen Eintrag, auf den sich jemand
verlässt, und muss deshalb zurechenbar sein. Die niedrige Hürde steht da, wo
sie nützt, und die höhere da, wo sie schützt.

- [ ] 8.1 UI: 👍 „Existiert" / 👎 „Existiert nicht mehr" in der Detailansicht
- [ ] 8.2 **Upvote ohne Konto**, begrenzt auf einmal pro Parkplatz und Sitzung
- [ ] 8.3 **Downvote nur mit Benutzerkonto**, ebenfalls einmal pro Parkplatz und Sitzung. Ohne Anmeldung ist die Schaltfläche sichtbar, aber deaktiviert, mit Hinweis warum – nicht einfach weglassen, sonst wirkt die App kaputt.
- [ ] 8.4 Sitzungsbegrenzung serverseitig durchsetzen, nicht nur im Browser. LocalStorage allein ist kein Schutz, sondern eine Bequemlichkeit.
- [ ] 8.5 Zählerstände und Zeitpunkte anzeigen („zuletzt bestätigt am …")
- [ ] 8.6 Keine automatische Änderung der Parkplatzdaten durch Bewertungen (laut Konzept)
- [ ] 8.7 Optimistisches UI-Update mit Fehlerbehandlung bei Offline
- [ ] 8.8 Interne Übersicht gemeldeter Parkplätze für das manuelle Review
- [ ] 8.9 Bewertungen in die Validierung einbeziehen: mehrfach als „existiert nicht mehr" gemeldete Plätze gehören auf die Prüfliste aus Abschnitt 3
- [ ] 8.10 Abhängigkeit beachten: 8.3 setzt Abschnitt 11 (Benutzerkonten) voraus. Entweder Konten vorziehen oder zunächst nur Upvotes ausliefern.

---

## 9. Darstellung und Bedienung

- [x] 9.1 **Dark Mode mit Umschalter** – dunkel ist Vorgabe, auch wenn das System hell steht
  - Drei Stellungen: Dunkel (Vorgabe), Hell, System
  - Auswahl in `localStorage`, überlebt das Neuladen
  - Ein Skript im `<head>` setzt `data-theme`, bevor die Seite gezeichnet wird – sonst blitzte sie kurz hell auf, was bei einer dunklen Vorgabe am meisten stört
  - `dark:` in Tailwind hört jetzt auf `data-theme` statt auf die Systemeinstellung
  - Untergebracht in der Listenansicht unter „Einstellungen" – zwei Tipps entfernt, kein verstecktes Menü
- [ ] 9.1a Eigene Einstellungsseite, sobald mehr dazukommt (zusammen mit der Karten-App-Wahl aus 11.3). In der Liste ist der Umschalter erreichbar, aber nicht sein endgültiger Platz.
- [x] 9.2 **Kartenkacheln im Dunkelmodus abgedunkelt.** OpenStreetMap liefert nur helle Kacheln. Statt einen zweiten Anbieter mit eigener Lizenz einzubinden, kehrt ein CSS-Filter die Helligkeit um und dreht den Farbton zurück – Wasser bleibt blau, Grünflächen grün. Die Marker sind ausgenommen, ihre Farben tragen die Bedeutung.
- [ ] 9.2a Falls die gefilterte Karte auf Dauer nicht überzeugt: echte dunkle Kacheln einbinden (etwa CARTO Dark Matter). Das bringt bessere Lesbarkeit, aber einen weiteren Anbieter, dessen Nutzungsbedingungen und Attribution zu prüfen wären.
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

**Entschieden (2026-10-09):** Konten werden gebraucht, weil Downvotes sie
voraussetzen (siehe Abschnitt 8). Sie sind damit kein „vielleicht später" mehr,
sondern Voraussetzung für einen Teil der Kernfunktion.

- [ ] 11.1 Registrierung und Anmeldung, möglichst ohne Passwort (Magic Link oder Passkey) – jede zusätzliche Hürde trifft genau die Zielgruppe
- [ ] 11.2 Anmeldung so spät wie möglich verlangen: erst beim Downvote, nicht beim Öffnen der App
- [ ] 11.3 **Einstellung: bevorzugte Karten-App.** Derzeit rät die App anhand des Geräts – Apple Karten auf iPhone und Mac, sonst Google Maps. Wer etwas anderes nutzt, soll das einmal festlegen können statt es bei jeder Navigation hinzunehmen.
  - Auswahl aus den unterstützten Apps: Google Maps, Apple Karten, OpenStreetMap, HERE WeGo, Waze und „Standard-App des Geräts" (`geo:`-Link, den das Betriebssystem selbst zuordnet)
  - Die Liste steht bereits in `src/lib/navigation.ts` (`MAPS_APPS`) und ist um weitere Apps erweiterbar; es fehlt nur der Ort, an dem die Wahl gespeichert wird
  - Im Benutzerkonto speichern, damit die Einstellung auf allen Geräten gilt
  - Auch ohne Konto nutzbar machen (LocalStorage) – die Karten-App-Wahl ist nichts, wofür man sich anmelden sollte
  - Geräteerkennung bleibt die Voreinstellung, wenn nichts gewählt wurde
- [ ] 11.4 Eigene Bewertungen einsehen und zurückziehen
- [ ] 11.5 Gespeicherte Parkplätze (Favoriten) – häufig angefahrene Ziele
- [ ] 11.6 Vertrauensstufen: Wer wiederholt zutreffend meldet, bekommt mehr Gewicht in der Validierung
- [ ] 11.7 Datenschutz: Datensparsamkeit, Löschfunktion, Auskunft nach DSGVO

---

## 12. Qualität und Deployment

- [x] 12.1 Unit-Tests: Parser, Adress-Aufspaltung, Distanzberechnung, Karten-App-Links, Theme, Zeitangaben
- [x] 12.2 **Tests für die Importkette** – 25 neue Tests zu UTM-Umrechnung, Zonenerkennung aus `srsName`, Koordinatenableitung, Feldzuordnung, GML-Parser und CSV-Leser. Alle geprüften Fälle stammen aus echten Quellen, nicht aus Erfundenem; darunter der Dresden-Fehler, der belegt, dass die falsche Zone ein plausibel aussehendes Ergebnis liefert.
- [ ] 12.3 E2E-Smoke-Test: Karte lädt, Marker klickbar, Liste wechselt, Detailansicht öffnet
- [ ] 12.4 Lighthouse-Prüfung auf Mobil (Leistung und Barrierefreiheit)
- [ ] 12.5 Deployment-Pipeline (Vercel), Umgebungsvariablen dokumentieren
- [ ] 12.6 Fehler-Monitoring und minimales Logging
- [x] 12.7 **PWA-Grundlagen.** Manifest unter `/manifest.webmanifest`, eigenes Symbol (Kartenmarker mit Rollstuhl) als SVG, daraus erzeugte PNGs in 192 und 512 sowie ein maskable Symbol mit Rand, damit Android es beschneiden kann, ohne das Motiv anzuschneiden. `npm run icons` erzeugt sie neu. Die Platzhalter-Grafiken des Projektgerüsts sind entfernt.
- [ ] 12.7a Symbol gestalterisch überarbeiten – es ist funktional, aber von mir gezeichnet und kein Ersatz für eine richtige Gestaltung
- [ ] 12.9 Service Worker für „Zum Homescreen hinzufügen" im vollen Sinn: Ohne ihn startet die App zwar eigenständig, funktioniert aber nicht offline (hängt mit 12.8 zusammen)
- [ ] 12.8 Offline-Fähigkeit prüfen – im Parkhaus oder Funkloch ist genau dann kein Netz, wenn man die App braucht

---

## 13. Finanzierung

> **Nicht umsetzen, bevor du es ausdrücklich freigibst.** Dieser Abschnitt ist
> nur Vormerkung. Nichts davon ist gebaut, und nichts davon wird gebaut, bis
> du es Punkt für Punkt freigibst.

- [-] 13.1 **Spenden-Knopf.** Zu klären wären: Anbieter (PayPal, Ko-fi, Stripe, Betterplace), Einmal- oder Dauerspende, und ob eine natürliche Person oder ein Verein empfängt – das hat steuerliche Folgen. Zurückhaltend platzieren: Wer auf einen Behindertenparkplatz angewiesen ist, soll nicht das Gefühl bekommen, für eine Selbstverständlichkeit zu zahlen.
- [-] 13.2 **Werbebanner (Google AdSense oder vergleichbar).** Technisch einfach, bringt aber Folgen mit, die vor der Entscheidung auf dem Tisch liegen sollten:
  - **Datenschutz:** AdSense setzt Tracking-Cookies. Das verlangt ein Einwilligungsbanner und widerspricht 10.4 („keine Tracker") sowie dem Grundsatz des Konzepts, mit Daten sparsam umzugehen.
  - **Bedienbarkeit:** Werbung auf einer Karte, die man einhändig im Auto bedient, kostet Fläche und erzeugt Fehlklicks – genau bei der Zielgruppe, der die App helfen soll.
  - **Ertrag:** Bei einer Nischen-App ohne Reichweite steht der Erlös kaum im Verhältnis zum Vertrauensverlust.
  - **Alternativen, die weniger kosten:** Spenden allein, Förderung durch Kommunen oder Sozialverbände, oder eine datenschutzfreundliche Anzeigenform ohne Tracking (etwa EthicalAds).
- [-] 13.3 Falls Werbung kommt: Einwilligungsbanner, Impressum und Datenschutzerklärung müssen vorher stehen (10.2, 10.4) – ohne sie wäre es rechtswidrig.

---

## 14. Abschlusstest

**Erst ausführen, wenn alle übrigen Punkte erledigt sind.** Ein vollständiger
Durchgang durch die fertige App, von Hand, auf echten Geräten – nicht als
Ersatz für die automatischen Tests, sondern als letzter Blick darauf, ob das
Ganze im Alltag funktioniert.

- [ ] 14.1 Alle Funktionen durchspielen: Karte, Standort, nächster Parkplatz, Suche, Detailansicht, Navigation starten, Bewerten, Dark Mode umschalten
- [ ] 14.2 Alle Zustände der Standortbestimmung: erlaubt, abgelehnt, später erlaubt, Zeitüberschreitung, ungenau, Standort wechselt während der Nutzung
- [ ] 14.3 Echte Geräte: iPhone (Safari), Android (Chrome), Desktop; kleines Display, großes Display, Querformat
- [ ] 14.4 Schlechte Bedingungen: langsames Netz, Funkloch mitten in der Nutzung, Akkusparmodus, Sonnenlicht auf dem Display
- [ ] 14.5 Bedienung einhändig und im Sitzen, mit Handschuhen, bei Vergrößerung auf 200 %
- [ ] 14.6 Mit Screenreader und nur mit Tastatur durch alle Abläufe
- [ ] 14.7 Stichprobe in der Wirklichkeit: zehn Parkplätze aussuchen und vor Ort prüfen, ob sie existieren und die Angaben stimmen. Kein Test am Schreibtisch ersetzt das.
- [ ] 14.8 Von jemandem testen lassen, der die App wirklich braucht – Rollstuhlfahrer:innen oder Inhaber:innen eines Parkausweises. Deren Urteil wiegt schwerer als jede Prüfliste hier.
- [ ] 14.9 Gefundene Mängel sammeln, bewerten und vor der Veröffentlichung abarbeiten

### Zwischentest am 2026-10-09 (Vorgriff, ersetzt 13.1–13.9 nicht)

Ein Durchgang durch den heutigen Stand, mobil (375 × 812), in hellem und
dunklem Modus. **Was funktioniert:**

- Karte lädt mit Clustering, OpenStreetMap-Attribution sichtbar
- Standortbestimmung: abgelehnt, erneut versucht, erteilt – alle drei Wege führen zum richtigen Ergebnis
- Mit Standort: „Nächster Parkplatz: Rathausstraße – 70 m", Marker hervorgehoben, Liste korrekt nach Entfernung sortiert
- Detailansicht öffnet, Fokus springt auf „Schließen", Escape schließt
- „In Google Maps öffnen" erzeugt den richtigen Link mit Koordinate
- Alle 49 sichtbaren Marker haben Rolle, Namen und sind per Tastatur erreichbar
- 102 fokussierbare Elemente, **keines ohne Namen**, **kein Touch-Ziel unter 44 px**, kein horizontales Scrollen
- Heller und dunkler Modus funktionieren beide

**Was dabei auffiel und noch offen ist:**

- [x] 14.10 Dark-Mode-Umschalter ergänzt (siehe 9.1)
- [x] 14.11 „Stadtteil: Hamburg" behoben – das Feld heißt jetzt „Stadt", wenn die Quelle keinen Stadtteil nennt. Weglassen wäre falsch gewesen: Bei 84 Städten ist die Stadt eine nützliche Angabe, nur die Beschriftung war es nicht.
- [x] 14.12 „(nicht angegeben)" wird in der Oberfläche nicht mehr angezeigt. Die fehlende Lizenz bleibt ein Problem der Daten (2a.5), ist aber eine Verwaltungsnotiz und gehört in den Importbericht, nicht vor die Nutzer:innen.

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

- **84 Städte, 13.463 Standorte, 33.209 Stellplätze.** 16 Städte aus amtlicher Quelle (17.966 Stellplätze), der Rest aus OpenStreetMap.
- Die beiden Quellenarten sind nicht vergleichbar: amtliche Listen führen einzelne Stellplätze am Straßenrand, OpenStreetMap überwiegend Parkplätze mit ausgewiesenen Behindertenstellplätzen. Die Oberfläche sagt das, und so muss es bleiben.
- Vier Fehlerklassen sind beim Import aufgetreten und werden jetzt abgefangen; alle vier hätten Daten erzeugt, die beim Draufschauen richtig aussehen:
  - **Falsche UTM-Zone.** Dresdens Dienst liefert Zone 33. Als Zone 32 gedeutet ergaben sich Koordinaten bei 7,7° Ost – mitten in Deutschland, aber 450 km daneben.
  - **Stadtname als Teilstring.** „Essen" steckt in „Hessen"; Essen bekam dadurch den Frankfurter Datensatz.
  - **Leere Antwort als Ergebnis.** Overpass meldet Überlast teils mit HTTP 200 und leerer Liste.
  - **Themenfremde Treffer.** Die Suche schlug für Hamburg Werkstätten und Tagesförderstätten vor; der richtige Datensatz heißt „Behindertenstellplätze".
- Die Lehre daraus steckt in Abschnitt 3: Plausibilität je Datenpunkt reicht nicht, es braucht den Abgleich mit einer unabhängigen Quelle und Kennzahlen über die ganze Stadt.
