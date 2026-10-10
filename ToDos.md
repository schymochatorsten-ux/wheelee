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

**Stand in Zahlen:** 204 von **10.956** Gemeinden geprüft (1,9 %) – das sind
**41,7 % der Bevölkerung**. In der App: 209 Städte, 17.864 Standorte, davon
24 Städte aus amtlicher Quelle. Laufender Bericht:
[data/\_abdeckung.md](data/_abdeckung.md).

Karte, Liste, Detailansicht, Zielsuche, Einstellungen und Offline-Betrieb
laufen. Es fehlen vor allem: Bewertungen (brauchen die Datenbank),
Rechtstexte und Deployment – und der weitaus größte Teil Deutschlands.

---

## Arbeitsstand

Hier steht, woran zuletzt gearbeitet wurde und was als Nächstes dran ist.
**Nach jeder abgeschlossenen Aufgabe aktualisieren**, damit nach einer
Unterbrechung nahtlos weitergearbeitet werden kann.

**Zuletzt abgeschlossen:** 2026-10-10 – 2d.11, 3.0g, 3.0h, 3.5, 3.6, 3.9a,
3.9b, 4.1–4.4, 4.6, 5.4, 5.8, 6.7, 6.13, 6.15, 6.16, 9.1a, 9.7, 9.8, 10.5,
11.3, 12.3, 12.8, 12.9, 2e.8 sowie Lizenz und Importdatum im Datenmodell
(Teil von 2a.5/10.3).

**Gerade in Arbeit:** – (2e.10 und 2e.11 sind neu aufgenommen, aber noch nicht
begonnen: ausdrücklich erst nach Freigabe umsetzen)

**Aufgeräumt am 2026-10-10:** Die acht `[~]`-Punkte wiederholten ihren fertigen
Teil als „Fertig: …", obwohl er längst in [Erledigt.md](Erledigt.md) stand –
dieselbe Sache in zwei Dateien. Jetzt steht hier nur der offene Rest mit einem
Verweis. 2d.8a und 2d.9 sind dabei von `[~]` auf `[ ]` gewechselt: An ihnen ist
nichts mehr in Arbeit, es ist nur noch nichts getan. Der NRW-Befund aus 3.2 ist
nach `Erledigt.md` gewandert – eine ergebnislose Suche ist ein Ergebnis, das vor
der Wiederholung bewahrt.

**Zuletzt gelernt (2026-10-10):** Der landesweite Import (2e.7) ist gebaut
und lief, aber die damit erzeugten Daten für 473 Gemeinden wurden **wieder
entfernt**. Die Zuordnung ohne echte Grenzgeometrie bevorzugt systematisch
kleine Gemeinden neben großen Städten; 80 von 472 hatten unplausibel viele
Stellplätze. Nach dem Grundsatz des Projekts – „lieber kein Import als ein
falscher" – ist das kein vertretbarer Bestand. Gefunden hat es nicht das
Hinsehen, sondern zwei Kennzahlen: die Streuung der Standorte je Gemeinde
und Stellplätze je Einwohner.

**Zweiter Befund vom 2026-10-10:** Die Arbeitsliste führt 204 Gemeinden, das
Register 10.956. `_import-status.md` meldet deshalb „Alle Städte
abgearbeitet" – wahr für die eingestellte Einwohnergrenze, falsch für das
Endziel. Die übrigen 10.752 stehen nicht auf „offen", **sie kommen in der
Datei nicht vor.** Die Trennung „geprüft" gegen „nicht geprüft" ist richtig
gebaut, wird aber auf die falsche Grundmenge angewandt; siehe 2e.10.

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
- **Abschnitt 16 (nur nach Freigabe)** – derzeit: Städte zum Mitnehmen herunterladen

**Als Nächstes geplant**, in dieser Reihenfolge:

1. 6.12 fertigstellen: Zielmarker, Umkreis-Auswahl, Browserprüfung, E2E-Test
2. 2e.10 Arbeitsliste auf alle 10.956 Gemeinden stellen – ohne sie ist „die
   restlichen Gemeinden" keine abarbeitbare Menge, und der Importstand meldet
   fälschlich „alles abgearbeitet"
3. 2e.7 Punkt-in-Fläche-Test aus VG250-EW – der Blocker für jede weitere Stufe
4. 3.1 / 3.3 / 3.4 Kreuzvergleich, Straßenabgleich, Abstand zur Straße
5. 3.7 bestätigte Standorte in der Detailansicht kennzeichnen
6. 2d.8a die acht Städte mit ungenutzter amtlicher Quelle einzeln ansehen
7. 12.4 Lighthouse, 12.6 Fehler-Monitoring
8. 2a.5 die fehlenden Lizenzen der 15 amtlichen Quellen nachschlagen

**Stand:** 57 offen, 6 in Arbeit, 5 brauchen deine Entscheidung, 9 bewusst
zurückgestellt (Finanzierung, Mehrsprachigkeit, Offline-Download). Dazu 20
offene Unterpunkte innerhalb dieser Posten. **Gezählt wird die oberste Ebene**
– sonst ergibt jede Sitzung eine andere Zahl.
90 erledigte Einträge stehen in [Erledigt.md](Erledigt.md).
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

- [~] 2a.5 Lizenz je Stadt. Datenmodell und Anzeige sind fertig – siehe [Erledigt.md](Erledigt.md). Offen ist nur noch:
  - [ ] **Es fehlen die Lizenzen selbst: 15 der amtlichen Quellen nennen keine** – darunter Hamburg, Köln und Dresden, also die größten Bestände. In der Oberfläche steht jetzt offen „Lizenz nicht angegeben", was ehrlich, aber für eine veröffentlichte App zu wenig ist. Die Lizenz steht meist auf dem Portal der Stadt, nur nicht im GovData-Metadatum; das muss je Stadt nachgeschlagen und in `data/<stadt>.overrides.json` oder einer eigenen Lizenzliste festgehalten werden.

### 2c. Idstein und Weißenhorn

- [ ] 2c.3 Bei beiden Stadtverwaltungen nach einer amtlichen Liste fragen – das wäre die deutlich bessere Quelle
- [ ] 2c.4 Fehlende Parkplätze in OpenStreetMap nachtragen; davon profitieren auch alle anderen Nutzungen

### 2d. Alle deutschen Großstädte

Laufender Stand: **[data/\_import-status.md](data/_import-status.md)** – von den Skripten selbst geschrieben, nach jeder einzelnen Stadt aktualisiert.

- [ ] 2d.8a **Die acht Städte mit ungenutzter amtlicher Quelle einzeln ansehen.** `npm run sources:check` findet sie von selbst (siehe [Erledigt.md](Erledigt.md)); zu tun bleibt das Ansehen. Bei Kiel, Krefeld und Aachen ist die Ablehnung laut 2d.8 richtig (Anwohnerparken); bei Bochum, Bielefeld, Karlsruhe, Norderstedt und Viersen lohnt der Blick auf das Stadtportal. Der Gewinn wäre spürbar: Düsseldorf kam von 171 Standorten aus OSM auf 340 aus der amtlichen Quelle.
- [ ] 2d.9 **Regensburg: 156.000 Einwohner, kein einziger erfasster Behindertenparkplatz.** Dass die Abfrage sauber durchlief und leer war, ist seit 2e.9 festgehalten – das ist eine Lücke in OpenStreetMap, keine in der Wirklichkeit. Hier lohnt die Anfrage bei der Straßenverkehrsbehörde (Schritt 3 der Quellensuche) und das Nachtragen in OSM (2c.4).
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

- [~] 2e.5 Stufenweise vorgehen, größte zuerst. Die Stufe „ab 50.000" ist abgeschlossen (siehe [Erledigt.md](Erledigt.md)); die Grenze ist die Konstante `MIN_POPULATION` in `scripts/import/german-cities.mts`.
  - [ ] **Nächste Stufe „ab 20.000" = 706 Gemeinden. Einmal versucht und wieder zurückgenommen** (2026-10-10): Die Grenze stand kurzzeitig auf 20.000, und der landesweite Lauf hat 473 Gemeinden geschrieben. Weil die Zuordnung nicht stimmte (siehe 2e.7), sind die Daten wieder entfernt und die Grenze steht wieder auf 50.000. **Die Stufe hängt allein an 2e.7** – das Register (2e.4) und die Zählung (2e.0) sind bereit, und das Umstellen ist eine Zahl.
  - [ ] Danach ab 10.000 (1.598 Gemeinden) und ab 5.000 (2.943).
- [ ] 2e.6 Restliche Gemeinden aus OpenStreetMap – der Importer kann das bereits, es fehlt nur die Liste. **Die Liste ist 2e.10**: Das Register hat alle 10.956 Gemeinden, die Arbeitsliste führt bisher nur 204.
- [~] 2e.7 **Laufzeit und Last beherrschen – das Werkzeug steht, die Zuordnung taugt noch nicht.**

  `npm run import:osm-state -- <bundesland>` bzw. `--alle` holt mit **zwei Abfragen je Bundesland**, was bisher 10.956 Einzelabfragen gekostet hätte. Der gebaute Teil steht in [Erledigt.md](Erledigt.md); der Lauf selbst funktioniert, 12 von 16 Ländern liefen durch.

  **Die damit erzeugten Daten für 473 Gemeinden sind wieder entfernt worden.** Nicht weil der Lauf scheiterte, sondern weil die Zuordnung der Treffer zu Gemeinden nachweislich falsch ist:

  - [ ] **Der verbleibende Fehler ist grundsätzlich.** Ohne die echte Grenzgeometrie entscheidet das umschließende Rechteck und die Entfernung zur Rechteckmitte. In dicht besiedelten Gegenden überlappen die Rechtecke stark, und **die kleinere Gemeinde gewinnt systematisch**: Ihr Mittelpunkt liegt jedem Punkt im Überlappungsbereich näher. Herdecke (22.772 Einwohner) bekam dadurch 109 Standorte bis hinauf nach Witten – 86 Stellplätze je 10.000 Einwohner statt der üblichen 7. **80 von 472 Gemeinden lagen über dem Dreifachen des Medians.**
  - [ ] **Was es braucht: ein echter Punkt-in-Fläche-Test.** Die Wege sind am 2026-10-10 verglichen worden; **empfohlen ist VG250-EW als Shapefile**, und zwar aus einem Grund, der schwerer wiegt als die Dateigröße: Es ist **dasselbe Produkt, aus dem das Gemeindeverzeichnis schon kommt**.

    | Weg                                | Umfang           | Lizenz       | Was fehlt dafür                             |
    | ---------------------------------- | ---------------- | ------------ | ------------------------------------------- |
    | **VG250-EW Shapefile** (empfohlen) | 66 MB            | dl-de/by-2-0 | ein `.shp`/`.dbf`-Leser                     |
    | VG1000-EW Shapefile                | 9 MB             | dl-de/by-2-0 | derselbe Leser, aber generalisierte Grenzen |
    | VG250-EW GeoPackage                | 69 MB            | dl-de/by-2-0 | ein SQLite-Leser – deutlich mehr Arbeit     |
    | Overpass `out geom`                | viele MB je Land | ODbL         | nichts, aber es belastet Overpass erneut    |

    Warum das Shapefile und nicht das GeoPackage, obwohl beide dasselbe enthalten: Ein GeoPackage ist eine SQLite-Datenbank, und die zu lesen heißt, ein Dateiformat mit B-Bäumen und Seitenverwaltung nachzubauen oder eine Abhängigkeit aufzunehmen. Ein Shapefile ist eine Folge von Binärsätzen mit festen Feldlängen – in derselben Größenordnung wie [`xlsx.mts`](scripts/import/xlsx.mts), das aus demselben Grund von Hand geschrieben ist.

    **Die halbe Arbeit ist schon getan**, und das ist der eigentliche Punkt dieser Empfehlung:

    - **Die Quelle läuft bereits.** [`gemeinden.mts`](scripts/import/gemeinden.mts) lädt `vg250-ew_12-31.ee.excel.ebenen.zip` aus demselben Verzeichnis. Die Geometrie-Fassung ist dieselbe Datei in einem anderen Format: `vg250-ew_12-31.utm32s.shape.ebenen.zip`. Gleicher Stand, gleicher AGS, gleiche Einwohnerzahlen – Register und Grenzen können deshalb nicht auseinanderlaufen. Zwei verschiedene Quellen für Namen und Grenzen wären eine Fehlerquelle, die niemand bemerkt.
    - **Die Lizenz ist geklärt und der Quellenvermerk steht schon im Code** (`BKG_QUELLENVERMERK`). Es kommt keine neue Lizenzfrage hinzu – das war bei der Wahl BKG statt Destatis bereits der Ausschlussgrund.
    - **ZIP-Leser vorhanden:** [`zip.mts`](scripts/import/zip.mts) (`extractFile`).
    - **Koordinatenumrechnung vorhanden:** Die Shapes liegen in UTM32; [`geo-source.mts`](scripts/import/geo-source.mts) hat `utmToWgs84` samt Zonenerkennung – geschrieben wegen des Dresden-Fehlers.
    - Zu bauen bleibt: ein `.shp`-Leser (Satztyp 5, Polygon: Teile und Punkte), ein `.dbf`-Leser für AGS und Namen, und ein Punkt-in-Polygon-Test nach dem Strahlverfahren. **Mehrteilige Gemeinden und Löcher sind dabei keine Theorie:** Ein Shapefile-Polygon besteht aus mehreren Ringen, und deren Umlaufrichtung unterscheidet Außengrenze von Loch. Wer nur den ersten Ring prüft, verliert Exklaven; wer die Richtung ignoriert, ordnet eine umschlossene Gemeinde der umgebenden zu. Beides kommt in Deutschland vor – gemeindefreie Gebiete und vollständig umschlossene Gemeinden sind der Normalfall, nicht die Ausnahme.

    **Was der Test zusätzlich können muss:** Das umschließende Rechteck bleibt als Vorfilter nützlich – 10.956 Polygone für jeden von zehntausenden Punkten durchzurechnen ist unnötig. Es entscheidet dann aber nicht mehr, sondern sortiert nur die Kandidaten vor, und das Polygon entscheidet. Genau so verschwindet der Herdecke-Fehler.

    **Der Prüfstein steht bereit:** 2e.7 ist erst gelöst, wenn ein Probelauf für die 202 schon importierten Gemeinden dieselbe Zuordnung ergibt wie der Einzelimport – und wenn Herdecke wieder bei etwa 7 Stellplätzen je 10.000 Einwohnern liegt statt bei 86. Beide Kennzahlen aus [CLAUDE.md](CLAUDE.md) sind dafür da.

    **VG1000-EW (9 MB) ist die Rückfallebene, nicht die Abkürzung.** Generalisierte Grenzen weichen um einige hundert Meter ab – und Behindertenparkplätze liegen an Straßen, die oft genau die Gemeindegrenze sind. Für eine erste Durchrechnung taugt es, für den Bestand nicht.

  - [ ] Zwei weitere Fundstücke aus dem Probelauf, die noch offen sind: „friedberg" und „friedberg-by" erhielten **dieselben** 123 Standorte – die Unterscheidung gleichnamiger Gemeinden greift noch nicht überall. Und Bad Kreuznach meldete landesweit 8 Standorte, einzeln geprüft aber null; auch das deutet auf fehlzugeordnete Nachbarn.
  - [ ] Vier Länder liefen gar nicht durch (Baden-Württemberg, Schleswig-Holstein wegen Überlast; Berlin und Bremen sind Stadtstaaten und werden jetzt übersprungen).

- [ ] 2e.7a Ursprüngliche Überlegung, weiterhin gültig als Rückfallebene: Bei 10.700 Gemeinden ist eine Overpass-Abfrage je Gemeinde nicht vertretbar – das wäre Missbrauch eines Gemeinschaftsdienstes. Bessere Wege: ein landesweiter Overpass-Durchlauf je Bundesland statt je Gemeinde, oder ein eigener Auszug aus einem Planet-Download. Vor dem Massenimport zu entscheiden, nicht danach.

- [ ] 2e.10 **Die Arbeitsliste auf alle 10.956 Gemeinden stellen.**

  Die Trennung „geprüft, nichts gefunden" gegen „noch nicht geprüft" ist gebaut und richtig (2e.9) – **aber sie wird auf die falsche Grundmenge angewandt.** `loadStatus()` in [`status.mts`](scripts/import/status.mts) baut die Liste aus `germanCities`, und das ist das Register **gefiltert auf `MIN_POPULATION`**:

  ```
  Einträge in data/_import-status.json:    204   (202 fertig, 2 leer, 0 offen)
  Gemeinden in data/_gemeinden.json:    10.956
  nirgends erfasst:                     10.752
  ```

  **Der Importstand meldet deshalb „Alle Städte abgearbeitet".** Das ist für die eingestellte Grenze wahr und für das Endziel des Projekts falsch. Die 10.752 fehlenden Gemeinden stehen nicht auf `offen` – sie kommen in der Datei nicht vor. Eine Gemeinde, die in keiner Liste steht, fehlt niemandem auf; das ist dieselbe Art von Fehler, die bei der handgetippten Städteliste 13 Städte über 50.000 Einwohnern verschwinden ließ, darunter Wilhelmshaven.

  Zu tun:

  - [ ] `loadStatus()` über **alle** Gemeinden des Registers führen, nicht über den gefilterten Auszug. `MIN_POPULATION` steuert dann nur noch die **Reihenfolge der Abarbeitung**, nicht mehr, wer überhaupt gezählt wird. Das ist die eigentliche Umstellung: Die Einwohnergrenze ist eine Aussage über Vorrang, nicht über Zugehörigkeit.
  - [ ] Damit wird `_import-status.md` zur vollständigen Arbeitsliste – 10.956 Zeilen. Zu groß für eine Datei, die ein Mensch liest: Die Markdown-Fassung sollte zusammenfassen (je Bundesland und je Größenstufe, wie viele geprüft und wie viele offen sind) und die Einzelzeilen nur für die Gemeinden führen, die nicht `offen` sind. Die JSON-Fassung bleibt vollständig – sie wird von Skripten gelesen, nicht von Menschen.
  - [ ] **Gemeinden ohne eigene Entscheidung kennzeichnen.** Rund 20 % der Gemeinden gehören zu Verbands-, Samt- oder Verwaltungsgemeinschaften. Ihre Straßenverkehrsbehörde sitzt beim Verband, nicht in der Gemeinde – für Schritt 3 der Quellensuche ([Datenpflege.md](Datenpflege.md)) ist der Verband der richtige Adressat. Das ist ein Hinweis in der Liste, keine eigene Logik.
  - [ ] **Verarbeitungseinheit festlegen und in der Liste führen.** Gemeinde für Gemeinde zu fragen ist der Fehler, den 2e.7 gerade behebt. Sinnvoll sind zwei Ebenen: **Bundesland** (16) als Einheit des Abrufs, **Landkreis** (rund 400) als Einheit der Prüfung – ein Landkreis ist klein genug, dass die Kennzahlen aus [CLAUDE.md](CLAUDE.md) aussagekräftig bleiben, und groß genug, dass die Arbeit nicht in 11.000 Einzelschritte zerfällt. Der AGS trägt den Kreisschlüssel in den Stellen 1–5; es braucht also keine zusätzliche Quelle.

  Das ist **Voraussetzung für 2e.5 und 2e.6**: Ohne vollständige Arbeitsliste ist „die restlichen Gemeinden" keine Menge, die man abarbeiten kann. 2e.6 sagt bisher „es fehlt nur die Liste" – das hier ist die Liste.

- [ ] 2e.11 **Prüfen, ob die Massendaten ganz ohne Overpass zu holen sind.**

  Overpass ist ein **Abfragedienst**, von Freiwilligen bezahlt, und antwortet unter Last mit HTTP 500/504 – oder, schlimmer, mit HTTP 200 und leerer Liste. Beides ist bei diesem Projekt schon eingetreten. Für 10.956 Gemeinden ist er das falsche Werkzeug, auch gebündelt je Bundesland.

  Der dafür vorgesehene Weg sind die **Bundesland-Auszüge von Geofabrik** (`.osm.pbf`, ODbL, täglich aktualisiert, mit stabilem JSON-Index und ausdrücklich für Automatisierung gedacht). Das ist der Unterschied, auf den es hier ankommt: Ein Download-Server ist für Massenbezug da, ein Abfragedienst nicht. Was vorher zu klären ist:

  - [ ] **Der Aufwand ist ehrlich zu benennen:** PBF ist Protocol Buffers mit zlib-komprimierten Blöcken und delta-kodierten Knoten – deutlich mehr als ein Shapefile-Leser. Dagegen steht, dass es die Abhängigkeit von einem Gemeinschaftsdienst vollständig auflöst und der Lauf beliebig wiederholbar wird, ohne jemandem zur Last zu fallen.
  - [ ] **Erst nach 2e.7 entscheiden, nicht davor.** Solange die Zuordnung nicht stimmt, erzeugt ein schnellerer Bezug nur schneller falsche Daten – genau der Fall, der am 2026-10-10 zum Entfernen von 473 Gemeinden geführt hat.
  - [ ] **Attribution bleibt ODbL**, also unverändert gegenüber dem heutigen OSM-Bezug. Die Auszüge enthalten keine Benutzernamen und Changeset-IDs; für dieses Projekt ist das kein Verlust, sondern erspart die Frage nach personenbezogenen Daten.
  - [ ] Zwischenstufe, falls PBF zu viel ist: `npm run import:osm-state` beibehalten, aber mit Pausen und über die 16 Länder verteilt – der Lauf steht ja. Dann bleibt es bei 32 Abfragen für ganz Deutschland statt 10.956, und das ist vertretbar.

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
- [~] 3.2 **Landesweite Sammeldatensätze als dritte Quelle.** Karlsruhe ist eingebunden, NRW und BW sind ergebnislos geprüft – beides in [Erledigt.md](Erledigt.md). Offen bleibt:
  - [ ] Zum **Gegenprüfen** (statt zum Lückenschließen) taugt der Karlsruher Datensatz weiterhin: Für Karlsruhe und Baden-Baden liegen jetzt zwei unabhängige Quellen vor. Das ist Material für 3.1.
  - [ ] Weitere Landesportale einzeln ansehen: Open Data Hessen, daten.berlin.de, Geodatenportal Bayern, Transparenzportal Hamburg.
- [ ] 3.3 **Straßenabgleich.** Für jeden Standort prüfen, ob die Rückwärtssuche bei der Koordinate dieselbe Straße nennt wie die Quelle. Eine Abweichung ist kein Beweis für einen Fehler, aber ein guter Filter: nur die Treffer müssen von Hand angesehen werden. Für Frankfurt gibt es das schon im Importreport; es fehlt für alle anderen Städte.
- [ ] 3.4 **Abstand zur nächsten Straße.** Ein Behindertenparkplatz liegt am Straßenrand. Punkte, die mehr als etwa 25 m von jeder Straße entfernt sind, sind fast immer falsch verortet. Über eine einzige Overpass-Abfrage je Stadt prüfbar.
- [ ] 3.7 Ergebnis sichtbar machen: Standorte, die von zwei Quellen bestätigt sind, in der Detailansicht als geprüft kennzeichnen. Das ist genau die Information, die Nutzer:innen vor einer vergeblichen Fahrt bewahrt.
- [ ] 3.10 Bestätigungsquoten nachgehen: Neuss 95 % und Ulm 81 % zeigen, dass ein hoher Wert erreichbar ist. Köln 24 %, Dresden 19 %, Düsseldorf 5 % – dort lohnt die Stichprobe, ob die amtlichen Koordinaten oder die OSM-Daten versetzt sind.

---

## 4. Datenaktualität

Parkplätze verschwinden und kommen hinzu. Die Daten einmal zu importieren
genügt nicht – es braucht einen regelmäßigen, möglichst billigen Blick darauf,
ob sich an der Quelle etwas getan hat.

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
- [~] 10.3 Lizenz- und Attributionshinweise. ODbL-Nennung und Quellenangabe je Stadt sind fertig (siehe [Erledigt.md](Erledigt.md)).
  - [ ] Was fehlt, ist die Lizenz der 15 amtlichen Quellen, die keine angeben – beschrieben unter 2a.5.
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

## 16. Erst nach ausdrücklicher Freigabe

> **Nichts aus diesem Abschnitt wird gebaut, bevor du es Punkt für Punkt
> freigibst** – auch dann nicht, wenn gerade nichts anderes zu tun ist.
> Dasselbe gilt für [Abschnitt 13](#13-finanzierung) (Finanzierung) und
> [Abschnitt 15](#15-mehrsprachigkeit) (Mehrsprachigkeit).

- [-] 16.1 **Städte zum Mitnehmen herunterladen.** Die Grundlage ist seit 12.8/12.9 da: Ein Service Worker hält Seite, zuletzt geladene Parkplätze und Kartenkacheln vor, sodass im Funkloch nicht eine weiße Seite steht. Das reicht aber nur für das, was man vorher ohnehin angesehen hat. Dieser Punkt geht weiter: **eine Stadt bewusst vorab laden**, damit sie unterwegs vollständig verfügbar ist, ohne Netz.
  - Der Anlass ist derselbe wie bei der ganzen App: Wer auf einen Behindertenparkplatz angewiesen ist, braucht ihn am ehesten dort, wo das Netz am schlechtesten ist – in der Tiefgarage, im Parkhaus, im Funkloch kurz vor dem Ziel.
  - Zu klären wäre vor dem Bauen:
    - **Was genau wird geladen?** Die Parkplatzdaten einer Stadt sind klein (Köln rund 200 KB). Die Kartenkacheln sind es nicht: Ein Stadtgebiet in brauchbarer Zoomstufe geht in die Dutzende Megabyte. Ohne Kacheln gibt es eine Liste ohne Karte – das ist weniger, aber vielleicht genug.
    - **Wie viel Platz darf die App belegen?** Das muss sichtbar sein, und es muss sich löschen lassen. Eine App, die unbemerkt 200 MB belegt, fliegt vom Telefon.
    - **Kachel-Vorabladen ist gegenüber OpenStreetMap heikel.** Die Nutzungsbedingungen untersagen massenhaftes Herunterladen von Kacheln. Für einen Stadtausschnitt je Nutzer:in bräuchte es entweder eine ausdrückliche Erlaubnis, einen bezahlten Kachelanbieter oder Vektorkacheln aus eigener Quelle. **Das ist die eigentliche Hürde, nicht die Technik.**
    - **Wie alt dürfen mitgenommene Daten sein?** Ein vor drei Monaten geladener Stand, der sich als aktuell ausgibt, wäre schlimmer als gar keiner. Es bräuchte ein sichtbares Datum und einen Hinweis, wenn es alt wird.
  - Vorschlag für den Fall einer Freigabe: **in zwei Schritten.** Zuerst nur die Parkplatzdaten je Stadt – klein, rechtlich unbedenklich, sofort nützlich. Die Kacheln erst danach und erst, wenn die Lizenzfrage geklärt ist.

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
