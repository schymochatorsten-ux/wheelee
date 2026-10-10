# ToDos – wheelee

Zentrale Aufgabenliste zum Projekt (Grundlage: [Konzept.md](Konzept.md)).
Hier steht nur, was **offen** ist; abgeschlossene Punkte stehen mit ihrer
Begründung in [Erledigt.md](Erledigt.md). Wie Daten importiert, geprüft und
aktuell gehalten werden, steht in [Datenpflege.md](Datenpflege.md).

**Status-Legende:** `[ ]` offen · `[~]` in Arbeit · `[x]` erledigt · `[!]` blockiert / Entscheidung nötig · `[-]` verworfen / später

**Letzte Aktualisierung:** 2026-10-10

**Endziel:** jeden öffentlichen Behindertenparkplatz in Deutschland erfassen,
der sich aus einer öffentlichen Quelle importieren lässt – siehe
[Abschnitt 2e](#2e-ganz-deutschland).

**Stand in Zahlen:** 187 von rund 10.700 Gemeinden geprüft (davon 185 mit
Treffer, 2 geprüft ohne Treffer), 17.206 Standorte. Karte, Liste,
Detailansicht, Einstellungen und Offline-Betrieb laufen. Es fehlen vor allem:
Bewertungen (brauchen die Datenbank), Rechtstexte und Deployment – und der
weitaus größte Teil Deutschlands.

---

## Arbeitsstand

Hier steht, woran zuletzt gearbeitet wurde und was als Nächstes dran ist.
**Nach jeder abgeschlossenen Aufgabe aktualisieren**, damit nach einer
Unterbrechung nahtlos weitergearbeitet werden kann.

**Zuletzt abgeschlossen:** 2026-10-10 – 2d.11, 3.0g, 3.0h, 3.5, 3.6, 3.9a,
3.9b, 4.1–4.4, 4.6, 5.4, 5.8, 6.7, 6.13, 6.15, 6.16, 9.1a, 9.7, 9.8, 10.5,
11.3, 12.3, 12.8, 12.9, 2e.8 sowie Lizenz und Importdatum im Datenmodell
(Teil von 2a.5/10.3).

**Gerade in Arbeit:**

- **6.12 Zielsuche – gebaut, aber noch nicht im Browser geprüft.**
  `src/lib/geocode.ts`, `src/app/api/geocode/route.ts` und
  `src/components/DestinationSearch.tsx` sind fertig und in `MapSection`
  eingebunden; `typecheck`, `lint`, Unit- und E2E-Tests sind grün.
  **Es fehlt die Prüfung im Browser** und damit alles, was man erst dabei
  sieht: ob die Suchleiste am unteren Rand die Legende verdeckt und ob die
  Trefferliste auf dem Telefon brauchbar ist. Außerdem fehlen der **eigene
  Zielmarker** (bisher springt die Karte nur hin) und ein E2E-Test.

### Was zuletzt geschah

Der Import der Städte ab 50.000 Einwohnern ist abgeschlossen (siehe
[Erledigt.md](Erledigt.md)). Danach wurde die offene Liste abgearbeitet: die
Navigationsleiste schließbar gemacht und um eine Auswahl erweitert, der
Haftungshinweis eingebaut, Lizenz und Importdatum sichtbar gemacht, zwei
Fehlalarme der Validierung abgestellt, Kontraste und Schriftskalierung
geprüft und repariert, Einstellungen als eigene Ansicht, und ein
E2E-Smoke-Test mit Playwright.

**Fallstricke, die dabei aufgetreten sind**

- **Quelldateien nie mit PowerShell umschreiben.** `Get-Content | Set-Content`
  liest UTF-8 als Windows-1252; aus „Nächster" wird „NÃ¤chster". Zwei
  Komponenten waren an 39 bzw. 42 Stellen beschädigt, und `typecheck`, `lint`
  und 148 Unit-Tests liefen trotzdem grün durch – beschädigte Umlaute in
  Zeichenketten sind syntaktisch gültig. Gefunden hat es erst der neue
  E2E-Test. Für Massenänderungen das Edit-Werkzeug oder ein Node-Skript
  nehmen.
- **Der Import hat einen behobenen Mangel wieder eingeschleppt.** Nach dem
  Import standen 21 % aller Standorte ohne Straßennamen da, weil
  `import:streets` nicht Teil der Importanleitung war. Ist jetzt als Schritt 5
  in [Datenpflege.md](Datenpflege.md) festgeschrieben.
- **Einzelne Städte dauern sehr lange, ohne hängen zu sein.** Konstanz lief über
  40 Minuten. Grund ist die Bauart: Jede Overpass-Abfrage trägt
  `[out:json][timeout:300]`, scheitert sie, wird sie zerlegt und über mehrere
  Spiegel mit Pausen wiederholt. Unter Last summiert sich das. Einen
  clientseitigen Abbruch (`AbortSignal.timeout`) gibt es nicht – wäre eine
  sinnvolle Ergänzung, damit ein Lauf kalkulierbar bleibt.
- **Overpass verträgt dieses Tempo nicht.** Bei rund 100 Städten am Stück
  häufen sich HTTP 500/504. Zwischen den Schüben ein paar Minuten Pause
  einlegen. Spätestens für Stufe 2 ist der Weg über einen landesweiten Lauf
  nötig (2e.7) – Gemeinde für Gemeinde zu fragen ist bei tausenden Gemeinden
  nicht vertretbar.
- **`npm run import:city -- --rest` greift keine fehlgeschlagenen Städte**,
  nur „offene". Nachholen geht namentlich:
  `npm run import:city -- <slug> <slug>`.
- **`npm run dev` warf einen 500er** (`ENOENT … _document.js`) wegen eines
  alten `.next`-Stands. `npm run clean` und Neustart beheben es; genau der in
  der README beschriebene Fall.
- **Die Startseite ist über 6 MB HTML**, weil alle Standorte in die Seite
  serialisiert werden. Siehe 5.4 und 2e.8 – aus dem Bedenken ist ein Befund
  geworden.

- **Einzelne Städte dauern sehr lange, ohne hängen zu sein.** Konstanz lief über
  40 Minuten. Grund ist die Bauart: Jede Overpass-Abfrage trägt
  `[out:json][timeout:300]`, scheitert sie, wird sie zerlegt und über mehrere
  Spiegel mit Pausen wiederholt. Unter Last summiert sich das. Einen
  clientseitigen Abbruch (`AbortSignal.timeout`) gibt es nicht – wäre eine
  sinnvolle Ergänzung, damit ein Lauf kalkulierbar bleibt.
- **Overpass verträgt dieses Tempo nicht.** Bei rund 100 Städten am Stück
  häufen sich HTTP 500/504. Zwischen den Schüben ein paar Minuten Pause
  einlegen. Spätestens für Stufe 2 ist der Weg über einen landesweiten Lauf
  nötig (2e.7) – Gemeinde für Gemeinde zu fragen ist bei tausenden Gemeinden
  nicht vertretbar.
- **Frankfurt (Oder) bekam den Datensatz von Frankfurt am Main.** Die
  Städtezuordnung in `scan-sources.mts` streicht Klammerzusätze, wodurch beide
  auf „frankfurt" verkürzt werden. Die Abstandsprüfung hat es gefangen, der
  Import fiel auf OSM zurück – siehe 2d.11.
- **`npm run dev` warf einen 500er** (`ENOENT … _document.js`) wegen eines
  alten `.next`-Stands. `npm run clean` und Neustart beheben es; genau der in
  der README beschriebene Fall.
- **Die Startseite ist jetzt 6,1 MB HTML**, weil alle 16.585 Standorte in die
  Seite serialisiert werden. Siehe 5.4 und 2e.8 – aus dem Bedenken ist ein
  Befund geworden.

**Wartet auf dich:**

- **D-06 E-Mail-Adresse für Fehlermeldungen** – **erst ab 13.10.2026 ansprechen**, du legst die Adresse bis dahin an. Der Knopf ist fertig und sagt solange offen, dass die Adresse fehlt. Danach genügt eine Zeile in `src/lib/feedback.ts`.
- **D-02 Datenbank** (Supabase oder Neon) – blockiert Abschnitt 5 und damit die Bewertungen
- **D-03** Missbrauchsschutz · **D-05** Umgang mit ungenauen Positionen
- **10.2** Impressum und Datenschutzerklärung brauchen deine Angaben
- **Abschnitt 13 (Finanzierung)** ist gesperrt, bis du ihn freigibst
- **Abschnitt 15 (Mehrsprachigkeit)** ist auf deinen Wunsch zurückgestellt – Englisch, Spanisch und Französisch erst nach der deutschen Fassung

**Als Nächstes geplant**, in dieser Reihenfolge:

1. 6.12 fertigstellen: Zielmarker, Umkreis-Auswahl, Browserprüfung, E2E-Test
2. 2e.4 Gemeinderegister aus VG250-EW – Voraussetzung für jede weitere Stufe
3. 2e.7 landesweite Overpass-Läufe statt einer Abfrage je Gemeinde
4. 3.1 / 3.3 / 3.4 Kreuzvergleich, Straßenabgleich, Abstand zur Straße
5. 3.7 bestätigte Standorte in der Detailansicht kennzeichnen
6. 2d.8a die acht Städte mit ungenutzter amtlicher Quelle einzeln ansehen
7. 12.4 Lighthouse, 12.6 Fehler-Monitoring
8. 2a.5 die fehlenden Lizenzen der 15 amtlichen Quellen nachschlagen

**Stand:** 68 offen, 8 in Arbeit, 5 brauchen deine Entscheidung, 8 bewusst
zurückgestellt (Finanzierung, Mehrsprachigkeit).
92 erledigte Punkte stehen in [Erledigt.md](Erledigt.md).
**Tests: 161 Unit-Tests + 6 E2E-Tests.**

---

## 0. Offene Entscheidungen

- [!] **D-02 Datenbank konkret wählen** – Supabase oder Neon. Blockiert Abschnitt 3 und damit die Bewertungen; die Seed-Dateien sind von der Wahl unabhängig.
- [!] **D-03 Missbrauchsschutz für Bewertungen ohne Accounts** – Empfehlung: eine Bewertung pro Parkplatz pro Gerät (LocalStorage) plus IP-Rate-Limit serverseitig.
- [!] **D-05 Umgang mit Parkplätzen ohne Koordinaten** – Empfehlung: nicht auf den Stadtteil-Mittelpunkt setzen, sondern als „Position ungenau" kennzeichnen und nur in der Liste führen. Derzeit faktisch gelöst, weil alle importierten Standorte Koordinaten haben.
- [!] **D-06 E-Mail-Adresse für Fehlermeldungen festlegen** – **ab 13.10.2026 nachfragen.** Du legst die Adresse bis dahin selbst an; vorher nicht erinnern. Der Feedback-Knopf ist gebaut, verschickt aber an eine Platzhalteradresse. Zu klären:
  - Welche Adresse soll es sein? Eine eigene wie `feedback@…` oder eine bestehende?
  - Sie wird im Quelltext stehen und ist damit öffentlich – auf Spam gefasst sein. Eine eigene Adresse mit Filter ist einer privaten vorzuziehen.
  - Bis zur Entscheidung steht `FEEDBACK_EMAIL` in `src/lib/feedback.ts` auf einem Platzhalter, den der Knopf sichtbar meldet, statt stillschweigend ins Leere zu schicken.

---

## 1. Projekt-Setup

- [!] 1.7 Erste Commits + Branch-Strategie – **blockiert:** `git` ist auf diesem Rechner nicht im PATH
- [ ] 1.8 Audit-Findings bereinigen: `postcss` (über `next`) und `braces` (über `eslint-config-next`) sind nur per Next-16-Upgrade behebbar – bewusst zurückgestellt

---

## 2. Datenquellen und Import

### 2a. Quellenstrategie

- [~] 2a.5 Lizenz je Stadt ins Datenmodell aufnehmen und in der Oberfläche anzeigen.
  - [x] **Datenmodell und Anzeige stehen** (2026-10-10). `license` ist ein eigenes Feld der Seed-Dateien; der Importer schreibt es, für ältere Dateien zerlegt `src/lib/parking/license.ts` die Quellenangabe. Die Listenansicht nennt je Stadt Quelle, Lizenz und Importdatum.
  - [ ] **Es fehlen die Lizenzen selbst: 15 der amtlichen Quellen nennen keine** – darunter Hamburg, Köln und Dresden, also die größten Bestände. In der Oberfläche steht jetzt offen „Lizenz nicht angegeben", was ehrlich, aber für eine veröffentlichte App zu wenig ist. Die Lizenz steht meist auf dem Portal der Stadt, nur nicht im GovData-Metadatum; das muss je Stadt nachgeschlagen und in `data/<stadt>.overrides.json` oder einer eigenen Lizenzliste festgehalten werden.

### 2c. Idstein und Weißenhorn

- [ ] 2c.3 Bei beiden Stadtverwaltungen nach einer amtlichen Liste fragen – das wäre die deutlich bessere Quelle
- [ ] 2c.4 Fehlende Parkplätze in OpenStreetMap nachtragen; davon profitieren auch alle anderen Nutzungen

### 2d. Alle deutschen Großstädte

Laufender Stand: **[data/\_import-status.md](data/_import-status.md)** – von den Skripten selbst geschrieben, nach jeder einzelnen Stadt aktualisiert.

- [~] 2d.8a Bei Bochum, Bielefeld und Karlsruhe die aktuellen Bezugswege suchen – auf den Portalen der Städte statt über GovData. Der Gewinn wäre spürbar: Düsseldorf kam von 171 Standorten aus OSM auf 340 aus der amtlichen Quelle.
  - [x] **Automatisch erkennbar gemacht** (2026-10-10): `npm run sources:check` meldet als „amtliche Quelle ungenutzt", welche Städte aus OpenStreetMap kommen, obwohl ihre amtliche Quelle antwortet. Derzeit acht – man muss sie nicht mehr von Hand suchen.
  - [ ] Die acht einzeln ansehen. Bei Kiel, Krefeld und Aachen ist die Ablehnung laut 2d.8 richtig (Anwohnerparken); bei Bochum, Bielefeld, Karlsruhe, Norderstedt und Viersen lohnt der Blick auf das Stadtportal.
- [~] 2d.9 **Regensburg** hat weder amtliche Daten noch OSM-Treffer. Seit 2e.9 ist der Befund wenigstens festgehalten statt ungeklärt: Regensburg steht als „geprüft, nichts gefunden" im Importstand, die Abfrage lief also sauber durch und war leer. Offen bleibt die eigentliche Frage – eine Stadt mit 156.000 Einwohnern ohne einen einzigen erfassten Behindertenparkplatz ist eine Lücke in OpenStreetMap, keine in der Wirklichkeit. Hier lohnt die Anfrage bei der Straßenverkehrsbehörde (Schritt 3 der Quellensuche) und das Nachtragen in OSM (2c.4).
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

- [~] 2e.0 **Abdeckung messbar machen.** Ohne Maßstab bleibt „alle" eine Absichtserklärung. Nötig ist ein Bericht, der zeigt: wie viele Gemeinden erfasst, wie viele mit amtlicher Quelle, wie viele nur aus OSM, wie viele geprüft ohne Treffer. Erst damit ist erkennbar, ob das Ziel näher rückt.
  Die Zustände dafür gibt es seit 2e.9 (siehe [Erledigt.md](Erledigt.md)), und `data/_import-status.md` weist sie aus.
  - [ ] Es fehlt der Bezug auf **alle** rund 10.700 Gemeinden statt nur auf die im Register. Solange das Register handgepflegt ist, misst die Prozentzahl nur den eigenen Arbeitsvorrat, nicht die Abdeckung Deutschlands – ehrlich wird sie erst mit 2e.4.
- [ ] 2e.1 **Alle Gemeinden mit amtlichen Daten erfassen, unabhängig von der Einwohnerzahl.** Jeden GovData-Datensatz zu Behindertenparkplätzen durchgehen und die zugehörige Gemeinde importieren – das ist die billigste Ausweitung, weil die Daten gut sind und der Importer sie schon lesen kann.
- [ ] 2e.2 Landesportale einbeziehen, die GovData nicht lückenlos spiegelt: Open.NRW, MobiData BW, Open Data Hessen, daten.berlin.de, Geodatenportal Bayern
- [ ] 2e.3 **Landesweite Sammeldatensätze auswerten** – „Gebündelte Daten Behindertenparkplätze NRW" (Mobilithek) und die Park-API von MobiData BW decken in einem Zug viele Kommunen ab, auch kleine
- [ ] 2e.4 **Gemeinderegister aufbauen** statt der handgepflegten Städteliste. **Quelle ist gefunden und geprüft (2026-10-09):**
  - **Nehmen: BKG, „Verwaltungsgebiete 1:250 000 mit Einwohnerzahlen" (VG250-EW).** Enthält alle Gemeinden mit amtlichem Gemeindeschlüssel, Name, Einwohnerzahl, Fläche und Geometrie. Lizenz **Datenlizenz Deutschland – Namensnennung 2.0 (dl-de/by-2-0)**, also frei nutzbar bei Quellenangabe – die Attribution gehört dann neben die OSM-Angabe in die Oberfläche (10.3).
  - Fertige Excel-Fassung, rund 7 MB, keine Geometrie nötig:
    `https://daten.gdz.bkg.bund.de/produkte/vg/vg250-ew_ebenen_1231/aktuell/vg250-ew_12-31.ee.excel.ebenen.zip`
    Verzeichnis `.../aktuell/` zeigt immer auf den neuesten Stand; daneben liegen Shape- und GeoPackage-Fassungen mit 64–69 MB.
  - **Nicht nehmen: das Gemeindeverzeichnis (GV100AD) von Destatis.** Inhaltlich dasselbe, aber die Downloadseite nennt **keine Lizenz**. Nach dem Grundsatz „lieber kein Import als ein falscher" ist eine ungeklärte Lizenz ein Ausschlussgrund, solange es eine klar lizenzierte Alternative gibt. Das Format (feste Spaltenbreiten, `GV100AD_TTMMJJ.txt`) wäre außerdem unbequemer als die Excel-Fassung.
  - Die Gemeindegeometrie brauchen wir nicht aus dieser Quelle: Der OSM-Importer holt die Grenzrelation ohnehin über Nominatim. Aus VG250-EW genügen **Schlüssel, Name, Bundesland, Einwohnerzahl** – also genau die vier Felder, die `german-cities.mts` heute von Hand führt.
  - Umsetzung: ein Skript `import:gemeinden`, das die ZIP lädt, das Gemeindeblatt liest und das Register erzeugt. `german-cities.mts` wird damit zur erzeugten Datei; der Dateikopf sagt das bereits an.
- [~] 2e.5 Stufenweise vorgehen, größte zuerst: **Stufe „ab 50.000" ist abgeschlossen** (siehe [Erledigt.md](Erledigt.md)). Es folgen: ab 20.000 (rund 650 Gemeinden), ab 10.000, dann der Rest.
  - [ ] **Vor Stufe „ab 20.000" zu lösen:** 2e.4 (Register aus VG250-EW) und 2e.7 (landesweite Overpass-Läufe statt einer Abfrage je Gemeinde). Die Datenhaltung (2e.8/5.4) ist seit 2026-10-10 geklärt – die App lädt nur noch den Kartenausschnitt.
- [ ] 2e.6 Restliche Gemeinden aus OpenStreetMap – der Importer kann das bereits, es fehlt nur die Liste
- [ ] 2e.7 **Laufzeit und Last beherrschen.** Bei 10.700 Gemeinden ist eine Overpass-Abfrage je Gemeinde nicht vertretbar – das wäre Missbrauch eines Gemeinschaftsdienstes. Bessere Wege: ein landesweiter Overpass-Durchlauf je Bundesland statt je Gemeinde, oder ein eigener Auszug aus einem Planet-Download. Vor dem Massenimport zu entscheiden, nicht danach.

---

## 3. Datenvalidierung

### Befund der ersten Prüfung (2026-10-09)

`npm run validate` hat 84 Städte geprüft. Bericht: [data/\_validierung.md](data/_validierung.md).

Die 3.0-Kette (Straßennamen für 61 % der Standorte nachtragen) ist
abgeschlossen – siehe [Erledigt.md](Erledigt.md). Sie war aber durch den
Import der Städte ab 50.000 Einwohnern **wieder aufgerissen**:

Die 3.0-Kette ist jetzt für alle 187 Städte abgeschlossen (3.0h, siehe
[Erledigt.md](Erledigt.md)): 66 von 17.206 Standorten ohne Straßennamen.

Bisher prüft der Import nur, ob eine Koordinate überhaupt plausibel ist (liegt sie
in Deutschland, liegt sie nahe der richtigen Stadt). Das fängt grobe Fehler ab,
aber keine einzelne falsch verorteten Parkplätze. Dafür braucht es einen
Abgleich mit einer zweiten, unabhängigen Quelle.

- [ ] 3.1 **Kreuzvergleich amtliche Daten gegen OpenStreetMap.** Für jede Stadt beide Quellen holen und Standorte paaren, die weniger als etwa 30 m auseinanderliegen. Daraus drei Gruppen: _bestätigt_ (beide kennen den Platz), _nur amtlich_ (wahrscheinlich in OSM nicht erfasst), _nur OSM_ (möglicherweise neu oder in der amtlichen Liste vergessen). Der Importer holt beide Quellen ohnehin schon – es fehlt nur der Vergleich.
- [ ] 3.2 **Landesweite Sammeldatensätze als dritte Quelle.** Auf der Mobilithek gibt es „Gebündelte Daten Behindertenparkplätze NRW", über MobiData BW eine Park-API für Baden-Württemberg. Beide fassen zusammen, was die Kommunen melden, und eignen sich sowohl zum Gegenprüfen als auch zum Schließen von Lücken – sie decken unter anderem Bochum, Bielefeld, Krefeld und Karlsruhe ab, also vier der fünf Städte aus 2d.8.
- [ ] 3.3 **Straßenabgleich.** Für jeden Standort prüfen, ob die Rückwärtssuche bei der Koordinate dieselbe Straße nennt wie die Quelle. Eine Abweichung ist kein Beweis für einen Fehler, aber ein guter Filter: nur die Treffer müssen von Hand angesehen werden. Für Frankfurt gibt es das schon im Importreport; es fehlt für alle anderen Städte.
- [ ] 3.4 **Abstand zur nächsten Straße.** Ein Behindertenparkplatz liegt am Straßenrand. Punkte, die mehr als etwa 25 m von jeder Straße entfernt sind, sind fast immer falsch verortet. Über eine einzige Overpass-Abfrage je Stadt prüfbar.
- [ ] 3.7 Ergebnis sichtbar machen: Standorte, die von zwei Quellen bestätigt sind, in der Detailansicht als geprüft kennzeichnen. Das ist genau die Information, die Nutzer:innen vor einer vergeblichen Fahrt bewahrt.
- [ ] 3.10 Bestätigungsquoten nachgehen: Neuss 95 % und Ulm 81 % zeigen, dass ein hoher Wert erreichbar ist. Köln 24 %, Dresden 19 %, Düsseldorf 5 % – dort lohnt die Stichprobe, ob die amtlichen Koordinaten oder die OSM-Daten versetzt sind.

---

## 4. Datenaktualität

Parkplätze verschwinden und kommen hinzu. Die Daten einmal zu importieren
genügt nicht – es braucht einen regelmäßigen, möglichst billigen Blick darauf,
ob sich an der Quelle etwas getan hat.

- [x] 4.2 **Takt festgelegt** – Änderungsprüfung monatlich, Neuimport bei gemeldeter Änderung, Vollimport halbjährlich, OpenStreetMap vierteljährlich. Steht in [Datenpflege.md](Datenpflege.md) und ist in `sources:check` eingebaut (`OSM_INTERVAL_DAYS`, `FULL_REIMPORT_DAYS`).
- [ ] 4.5 Automatisieren, sobald die App läuft – etwa als monatlicher GitHub-Actions-Lauf, der bei Änderungen einen Pull Request mit den neuen Daten öffnet. So bleibt die Kontrolle beim Menschen.

---

## 5. Datenmodell und Backend

- [ ] 5.1 Schema `parking_spot`: id, city, street, house_number, label, district, lat, lng, spot_count, time_restriction, geo_accuracy, source, license, verified, created_at
- [ ] 5.2 Schema `rating`: id, spot_id, vote (`exists` / `gone`), created_at, device_hash
- [ ] 5.3 Tabelle `city` mit Quelle, Lizenz, Importdatum und Abdeckungsgrad
- [ ] 5.5 API: `GET /api/spots/:id` inklusive Bewertungs-Aggregat
- [ ] 5.6 API: `POST /api/spots/:id/ratings` mit Validierung und Rate-Limit
- [ ] 5.7 Migrationen und Seed-Lauf aus den Dateien in `data/`

---

## 6. Karte und Standort

- [~] 6.12 **Zieladresse eingeben und am Ziel parken.** Grundgerüst steht (siehe Arbeitsstand): Suche über einen eigenen Endpunkt `/api/geocode` (damit Nominatim eine ordentliche Kennung bekommt, was der Browser nicht kann), Trefferliste, zuletzt gesuchte Ziele im Browser-Speicher, und das Ziel ersetzt den eigenen Standort als Bezugspunkt für Liste und Navigationsleiste. **Offen:** eigener Zielmarker auf der Karte, Umkreis-Auswahl (300 m / 500 m / 1 km), Prüfung im Browser, E2E-Test.
  - [x] Eingabefeld, Suche über Nominatim, Trefferliste, zuletzt gesuchte Ziele
  - [x] Karte zentriert auf das Ziel; Liste und Navigationsleiste rechnen ab dem Ziel statt ab dem eigenen Standort
  - [ ] **Zielpunkt eigens markieren**, damit Ziel und Parkplatz unterscheidbar bleiben – bisher springt die Karte nur hin
  - [ ] **Umkreis-Auswahl** (300 m, 500 m, 1 km) statt fester Anzahl. Die Liste ist die bessere Voreinstellung: Der nächstgelegene Platz kann belegt sein, und wer die Alternativen kennt, fährt nicht zweimal.
  - [ ] Im Browser prüfen und einen E2E-Test ergänzen
- [ ] 6.14 Stadtwechsel ohne Standortfreigabe – eine Suche nach Ort oder Adresse fehlt (wird durch 6.12 weitgehend miterledigt)
- [ ] 6.16a Die Auswahl aus 6.16 und die Listenansicht zeigen dasselbe in zwei Komponenten. Sinnvoll wäre, beide auf dieselbe Zeilen-Komponente zu stützen statt sie doppelt zu pflegen – aufgefallen beim Bauen von 6.16, aber keine Voraussetzung für irgendetwas.

---

## 7. Parkplatzdetails und Navigation

- [~] 7.7 Zeitangaben deuten: **von 82 % auf 93 %** gebracht (2026-10-10), siehe [Erledigt.md](Erledigt.md).
  - [ ] Die verbleibenden 29 Angaben sind **überwiegend gar keine Zeitangaben**: „nur an Veranstaltungen", „Je nach Messe", „matchdays only", „Parkplatz durch Baustelle stark eingeschränkt". Sie werden als Text angezeigt, und mehr lässt sich daraus ehrlich nicht machen. Lohnender wäre, die Quellen zu bitten, so etwas nicht ins Zeitfeld zu schreiben.
  - [ ] Echte Reste, falls jemand Lust hat: `Apr-Oct: Mo-Su 09:00-18:00` (Jahreszeiten), `open; Fr 06:00-14:00 off` (Ausnahmen), `<br>Mo-Fr 9:00-20:00<br>` (HTML in den Daten), `M0 - Fr` (Null statt O).

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

- [ ] 9.2a Falls die gefilterte Karte auf Dauer nicht überzeugt: echte dunkle Kacheln einbinden (etwa CARTO Dark Matter). Das bringt bessere Lesbarkeit, aber einen weiteren Anbieter, dessen Nutzungsbedingungen und Attribution zu prüfen wären.
- [ ] 9.9 Mit echten Hilfsmitteln testen, nicht nur mit Prüfwerkzeugen (NVDA oder VoiceOver, Tastatur, Vergrößerung)

---

## 10. Datenschutz und Recht

- [ ] 10.2 Impressum und Datenschutzerklärung – für eine veröffentlichte Seite in Deutschland Pflicht
- [~] 10.3 Lizenz- und Attributionshinweise: Die ODbL-Nennung steht jetzt sowohl unter der Karte als auch in der Listenansicht, und jede Stadt nennt ihre Quelle einzeln. Was fehlt, ist die Lizenz der 15 amtlichen Quellen, die keine angeben – das hängt an 2a.5 und ist dort beschrieben.
- [ ] 10.4 Keine Tracker, keine Drittanbieter-Cookies; falls Statistik, dann datenschutzfreundlich und mit Einwilligung

---

## 11. Benutzerkonten

Laut Konzept bewusst nicht im ersten Umfang. Für später vorgemerkt, weil mehrere
spätere Funktionen daran hängen.

**Entschieden (2026-10-09):** Konten werden gebraucht, weil Downvotes sie
voraussetzen (siehe Abschnitt 8). Sie sind damit kein „vielleicht später" mehr,
sondern Voraussetzung für einen Teil der Kernfunktion.

- [ ] 11.1 Registrierung und Anmeldung, möglichst ohne Passwort (Magic Link oder Passkey) – jede zusätzliche Hürde trifft genau die Zielgruppe
- [ ] 11.2 Anmeldung so spät wie möglich verlangen: erst beim Downvote, nicht beim Öffnen der App
- [ ] 11.3a Die Wahl der Karten-App (erledigt, siehe [Erledigt.md](Erledigt.md)) liegt im Browser-Speicher und gilt damit nur je Gerät. Sobald es Konten gibt, zusätzlich dort ablegen.
- [ ] 11.4 Eigene Bewertungen einsehen und zurückziehen
- [ ] 11.5 Gespeicherte Parkplätze (Favoriten) – häufig angefahrene Ziele
- [ ] 11.6 Vertrauensstufen: Wer wiederholt zutreffend meldet, bekommt mehr Gewicht in der Validierung
- [ ] 11.7 Datenschutz: Datensparsamkeit, Löschfunktion, Auskunft nach DSGVO

---

## 12. Qualität und Deployment

- [ ] 12.4 Lighthouse-Prüfung auf Mobil (Leistung und Barrierefreiheit)
- [ ] 12.5 Deployment-Pipeline (Vercel), Umgebungsvariablen dokumentieren
- [ ] 12.6 Fehler-Monitoring und minimales Logging
- [ ] 12.7a Symbol gestalterisch überarbeiten – es ist funktional, aber von mir gezeichnet und kein Ersatz für eine richtige Gestaltung

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

Ein Zwischentest am 2026-10-09 hat drei Mängel gefunden und behoben; Befund
und Ergebnis stehen in [Erledigt.md](Erledigt.md).

---

## 15. Mehrsprachigkeit

> **Bewusst später.** Nichts davon wird umgesetzt, bevor die deutsche Fassung
> steht – also mindestens bis Bewertungen, Rechtstexte und Deployment
> erledigt sind. Hier steht es, damit die Entscheidung bewusst getroffen ist
> und nicht vergessen wird.

Wer einen Behindertenparkausweis hat, hat ihn EU-weit: Der blaue Parkausweis
gilt in allen Mitgliedstaaten. Jemand, der aus Frankreich oder Spanien
anreist, steht vor derselben Frage wie alle anderen – nur ohne Deutsch. Dazu
kommen Menschen, die in Deutschland leben und besser Englisch als Deutsch
sprechen.

- [-] 15.1 **Englisch, Spanisch und Französisch** als weitere Sprachen. Englisch zuerst: Es hilft am breitesten und deckt auch Sprachen mit ab, für die es keine eigene Fassung gibt.
- [-] 15.2 **Texte aus dem Quelltext lösen.** Derzeit stehen alle Beschriftungen direkt in den Komponenten. Das ist für eine Sprache übersichtlich und für vier unhaltbar. Nötig wäre eine Übersetzungsdatei je Sprache und ein schlanker Zugriff darauf – die App ist klein genug, dass es dafür keine große Bibliothek braucht.
- [-] 15.3 **Was dabei leicht übersehen wird**, weil es nicht nach Text aussieht:
  - `<html lang="de">` steuert die Silbentrennung (`hyphens-auto`) und die Aussprache im Screenreader. Falsch gesetzt klingt die App für Blinde wie Kauderwelsch.
  - Datums- und Zahlenformate sind an `de-DE` festgenagelt (`toLocaleDateString`, `toLocaleString`), ebenso die Sortierung der Städteliste (`localeCompare`).
  - Die Entfernungsformatierung schreibt „1,5 km" mit Komma – im Englischen ein Punkt.
  - Der Betreff der Fehlermeldung („Wheelee Fehlermeldung") landet in einer echten E-Mail.
- [-] 15.4 **Die Daten bleiben deutsch, und das ist richtig so.** Straßennamen werden nicht übersetzt – wer „Bahnhofstraße" sucht, muss „Bahnhofstraße" lesen. Zeitangaben stehen teils als deutscher Freitext in den Quellen („werktags 8-18 Uhr"); deren Deutung ist sprachgebunden und müsste je Sprache **ausgegeben**, nicht neu geparst werden. Der Haftungshinweis ist rechtlich bedeutsam und gehört übersetzt, nicht sinngemäß übertragen.
- [-] 15.5 **Spracherkennung mit Umschalter**, nicht ohne. Die Browsersprache ist ein guter erster Vorschlag, aber wer ein englisches Betriebssystem auf einem deutschen Telefon hat, will die Wahl behalten – in die Einstellungen, neben Darstellung und Karten-App.

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
