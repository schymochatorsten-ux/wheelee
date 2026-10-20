# Datenpflege – Handbuch

Wie Parkplatzdaten in dieses Projekt kommen, wie sie geprüft werden und wie
sie aktuell bleiben. Dieses Dokument ist die verbindliche Arbeitsanweisung für
die drei wiederkehrenden Aufgaben:

1. [Neue Daten importieren](#1-neue-daten-importieren)
2. [Vorhandene Daten prüfen](#2-vorhandene-daten-prüfen)
3. [Monatlich auf Aktualität prüfen](#3-monatlich-auf-aktualität-prüfen)

Es beschreibt den Weg, nicht die Ausnahmen. Alles, was beim Aufbau schiefging
und warum die Schutzmaßnahmen so aussehen, steht unter
[Erfahrungen](#erfahrungen-die-in-dieses-vorgehen-eingeflossen-sind).

---

## Grundsätze

Vier Regeln, die über allem stehen:

**Amtlich vor allem anderen.** Eine Liste der Stadtverwaltung ist vollständig,
kennt einzelne Stellplätze statt nur Parkplätze und trägt eine klare Lizenz.
OpenStreetMap ist die Rückfallebene, nicht die Standardquelle.

**Lieber kein Import als ein falscher.** Eine Stadt, die fehlt, ist ein
sichtbarer Mangel. Eine Stadt mit falschen Koordinaten ist eine vergebliche
Fahrt für jemanden, der auf den Parkplatz angewiesen ist. Im Zweifel bricht
der Import ab und meldet den Grund.

**Jeder Schritt ist wiederholbar und schreibt seinen Stand sofort fort.**
Kein Lauf darf so lang sein, dass ein Abbruch Arbeit vernichtet.

**Was unsicher ist, wird gekennzeichnet, nicht geglättet.** Unvollständige
Quellen werden in der Oberfläche als unvollständig benannt.

---

## 1. Neue Daten importieren

### Schritt 1: Quelle ermitteln

Nie direkt mit OpenStreetMap anfangen. Zuerst prüfen, ob es etwas Besseres gibt:

```bash
npm run sources -- "Musterstadt"
```

Das durchsucht **GovData**, das Metaportal, in dem Bund, Länder und Kommunen
ihre offenen Datensätze zusammenführen, und nennt Titel, Lizenz und
Downloadformate.

Findet es nichts, in dieser Reihenfolge weitersuchen:

1. **Landesportal** – Open.NRW, MobiData BW, Open Data Hessen, daten.berlin.de,
   Geodatenportal Bayern. GovData spiegelt diese nicht lückenlos.
2. **Website der Stadt** – nach „Parken", „Behindertenparkplätze",
   „Schwerbehindertenparkplätze" suchen. Oft liegt dort ein PDF.
3. **Straßenverkehrsbehörde der Stadt anfragen.** Sie _führt_ die Liste in
   jedem Fall, weil jeder Stellplatz förmlich angeordnet werden muss. Viele
   Städte geben sie auf Nachfrage heraus, ohne sie zu veröffentlichen.
4. **Erst dann OpenStreetMap.**

Für viele Städte auf einmal:

```bash
npm run sources:scan
```

Prüft alle Städte des Registers in einem Durchgang und schreibt
`data/_quellen-status.md` und `data/_quellen-status.json`. Diese Dateien
steuern danach den Import.

### Schritt 2: Stadt ins Register eintragen

Neue Städte kommen nach `scripts/import/german-cities.mts` – mit Name, Slug,
Einwohnerzahl und Bundesland. Die Einwohnerzahl bestimmt die
Bearbeitungsreihenfolge.

### Schritt 3: Importieren

```bash
npm run import:city -- musterstadt    # eine bestimmte Stadt
npm run import:city -- --next         # die nächste offene
npm run import:city -- --rest         # alle offenen, größte zuerst
npm run import:city -- --rest --max 10
```

Der Importer entscheidet je Stadt selbst: zuerst WFS, dann ArcGIS-REST, dann
GeoJSON, JSON, CSV – und erst wenn nichts davon trägt, OpenStreetMap. Er ordnet
die Spalten automatisch zu und schlägt Adressen nach, wenn die Quelle keine
Straßennamen führt.

Vier Zustände hält er dabei auseinander. Zwei davon werden leicht verwechselt
und bedeuten Verschiedenes: **„geprüft, nichts gefunden"** (⚪) heißt, die
Abfrage lief sauber durch und war leer; **„noch nicht geprüft"** (⬜) heißt,
niemand hat je nachgesehen. Nur Letztere nimmt `--rest`. Eine geprüft-leere
Gemeinde erneut abzufragen wäre bei tausenden Gemeinden ein Missbrauch von
Overpass – und dass eine Gemeinde geprüft ist und nichts hat, ist selbst eine
Information, die in die Abdeckungsrechnung gehört. Fehlgeschlagene Städte (❌)
greift `--rest` ebenfalls nicht; die werden namentlich nachgeholt.

**Nach jeder einzelnen Stadt** schreibt er `data/_import-status.md` und
`data/_import-status.json` fort: verwendete Quelle, genaue Abruf-URL, Anzahl
Standorte und Stellplätze, Probleme. Ein Abbruch ist dadurch folgenlos – die
Datei nennt oben die nächste offene Stadt samt fertigem Befehl.

### Schritt 4: Ergebnis ansehen, bevor es weitergeht

Nicht nur die Zeilenzahl lesen. Mindestens:

```bash
node -e "const d=require('./data/musterstadt.json'); \
  console.log(d.spots.length, 'Standorte,', new Set(d.spots.map(s=>s.label)).size, 'verschiedene Namen'); \
  d.spots.slice(0,5).forEach(s=>console.log(' ', s.label, '|', s.lat.toFixed(4), s.lng.toFixed(4)));"
```

Drei Fragen, die hier beantwortet sein müssen:

- **Liegen die Koordinaten in der Stadt?** Der Importer prüft den Abstand zum
  Stadtmittelpunkt, aber ein Blick auf zwei, drei Werte kostet nichts.
- **Haben die Einträge verschiedene Namen?** Steht überall derselbe Platzhalter,
  wurde das Adressfeld nicht erkannt.
- **Passt die Größenordnung zur Stadt?** Eine Großstadt mit zehn Standorten ist
  ein Fehler, keine Datenlage.

### Schritt 5: Straßennamen nachtragen – nicht überspringen

```bash
npm run import:streets        # alle Städte mit offenen Standorten
npm run import:addresses      # Rückfallebene, wo OSM keine Straßen führt
```

**Dieser Schritt gehört zum Import, nicht zur Kür.** OpenStreetMap-Objekte
tragen selten ein `addr:street`; ohne diesen Lauf heißen die Standorte
„Behindertenparkplatz <Stadt>" und sind in Liste und Detailansicht wertlos.
Beim Import der Städte ab 50.000 Einwohnern wurde er vergessen – damit lagen
21 % aller Standorte ohne Straßennamen vor, genau der Mangel, der für die
ersten 84 Städte schon einmal behoben worden war.

`npm run import:streets` nimmt von selbst nur Städte mit offenen Standorten,
ist also gefahrlos wiederholbar. Er braucht eine Overpass-Abfrage je Stadt und
läuft entsprechend lange; einplanen statt abbrechen.

### Schritt 6: Dubletten zusammenführen

```bash
npm run data:dedupe -- --dry   # erst ansehen
npm run data:dedupe
```

Führt nur zusammen, was unter 1,5 m auseinanderliegt **und** gleich heißt –
also dasselbe Objekt aus zwei Blickwinkeln. Weiter auseinanderliegende
Einträge bleiben stehen: Eine markierte Bucht ist rund 3,5 m breit, zwei
Einträge in 4 m Abstand sind zwei echte Plätze.

### Schritt 7: Einbinden und prüfen

```bash
npm run import:index    # Seed-Index neu erzeugen
npm run typecheck
npm run lint
npm run test
npm run build
```

`import:index` liest, was tatsächlich in `data/` liegt. Die Liste von Hand zu
pflegen wäre eine Fehlerquelle – eine importierte Stadt, die nicht in der App
auftaucht, fiele kaum auf.

### Schritt 8: Korrekturen

Manuelle Korrekturen gehören in `data/<stadt>.overrides.json`, Schlüssel ist
die Parkplatz-ID. Sie gewinnen gegen Importer und Geocoding und überleben jeden
erneuten Lauf. Niemals die Seed-Datei direkt bearbeiten – der nächste Import
überschreibt sie.

---

## 2. Vorhandene Daten prüfen

Der Import prüft nur, ob eine Koordinate _überhaupt_ plausibel ist. Ob der
einzelne Parkplatz an der richtigen Stelle liegt, zeigt erst der Abgleich mit
einer unabhängigen Quelle.

```bash
npm run validate              # alle Städte
npm run validate -- berlin    # eine Stadt
```

Ergebnis: `data/_validierung.md` mit Befund je Stadt und einer Liste der
Standorte, die angesehen werden sollten.

### Was geprüft wird

**Ohne Netzzugriff**, weil die Daten schon da sind:

| Prüfung                         | Was sie findet                                               |
| ------------------------------- | ------------------------------------------------------------ |
| Koordinate in Deutschland       | grob falsche Verortung, falsches Koordinatensystem           |
| Abstand zum Stadtmittelpunkt    | Verwechslung von Städten, falsche UTM-Zone                   |
| Dubletten unter 10 m            | derselbe Parkplatz doppelt, etwa aus zwei Quellen            |
| Stellplätze je 10.000 Einwohner | Städte mit lückenhafter Datenlage                            |
| Vollständigkeit der Felder      | fehlende Adressen, Platzhalternamen, Stadtteil = Stadtname   |
| Verteilung der Namen            | nicht erkanntes Adressfeld (alle Einträge heißen gleich)     |
| Bewertungen der Nutzer:innen    | Parkplätze, die mehrere Konten als aufgehoben gemeldet haben |

**Mit Netzzugriff**, als zweite Quelle:

| Prüfung                            | Was sie findet                                              |
| ---------------------------------- | ----------------------------------------------------------- |
| Amtliche Daten gegen OpenStreetMap | **drei Gruppen:** bestätigt, nur amtlich, nur OSM           |
| Landesweite Sammeldatensätze       | NRW über die Mobilithek, Baden-Württemberg über MobiData BW |
| Straßenabgleich per Rückwärtssuche | Koordinate liegt in einer anderen Straße als angegeben      |
| Abstand zur nächsten Straße        | Punkte über 25 m von jeder Straße sind fast immer falsch    |

**Die Bewertungen sind die einzige Quelle, die eine Änderung in der
Wirklichkeit bemerkt** – ein aufgehobener Parkplatz steht in keiner
Importdatei. Sie ändern aber nichts von selbst: Der Bericht führt sie als
eigenen Abschnitt „Als aufgehoben gemeldet" samt der Zahl der Bestätigungen
daneben, und was damit geschieht, entscheidet ein Mensch.

**Die Datenbank liegt im Betrieb auf dem NAS.** Wer den Bericht auf seinem
Rechner erzeugt, hat sie nicht – dann steht dort ausdrücklich „nicht geprüft".
Das ist kein Mangel des Laufs, sondern die ehrliche Auskunft: „nichts
gemeldet" wäre eine Behauptung über Daten, die niemand angesehen hat.

### Wie die Befunde zu lesen sind

Ein Befund ist kein Beweis für einen Fehler, sondern eine Liste, die ein Mensch
ansehen sollte. Bestätigte Standorte sind die verlässlichsten – sie kennen zwei
unabhängige Quellen. Standorte nur aus einer Quelle sind nicht falsch, nur
ungeprüft.

**Die dritte Gruppe ist die, auf die es ankommt: „nur OSM".** Dort kennt
OpenStreetMap einen Stellplatz, den die amtliche Liste nicht führt – entweder
neu entstanden oder dort vergessen. Eine amtliche Liste gilt als vollständig,
und genau deshalb sucht niemand in ihr nach Fehlendem; der Bericht führt diese
Standorte mit Koordinate auf. Was damit geschieht, entscheidet der Blick vor
Ort oder eine Anfrage bei der Stadt.

Das Ergebnis **je Standort** steht in `data/_bestaetigt.json`, und die
Detailansicht liest es von dort („Von zwei Quellen bestätigt"). **Eine ID, die
dort fehlt, heißt „nicht geprüft" – nicht „nicht bestätigt".** Erst 23 der 209
Städte haben überhaupt eine zweite Quelle.

**Die wirksamste Prüfung ist die billigste:** Stellplätze je Einwohner über
alle Städte auftragen. Ausreißer nach unten zeigen fast immer eine Lücke in der
Datenlage, nicht in der Wirklichkeit.

### Nach der Prüfung

Gefundene Fehler nach `data/<stadt>.overrides.json`. Ist die ganze Quelle
schlecht, lieber eine bessere suchen (zurück zu Abschnitt 1) als hunderte
Einzelkorrekturen pflegen.

---

## 3. Monatlich auf Aktualität prüfen

Parkplätze verschwinden und kommen hinzu. Der Check ist bewusst so billig wie
möglich: **er lädt keine Daten, er fragt nur nach dem Änderungsdatum.**

```bash
npm run sources:check
```

### Wie er funktioniert

| Quellenart         | Abfrage                                         | Aufwand                                   |
| ------------------ | ----------------------------------------------- | ----------------------------------------- |
| GovData-Datensätze | Feld `metadata_modified` der CKAN-API           | **eine Anfrage für alle Städte**          |
| direkte Dateien    | `HTTP HEAD`, Header `Last-Modified` oder `ETag` | eine Anfrage je Datei, kein Download      |
| WFS-Dienste        | `GetCapabilities`                               | klein, trägt oft ein Aktualisierungsdatum |
| OpenStreetMap      | kein Änderungsdatum je Stadt                    | fester Takt statt Prüfung                 |

Das gespeicherte Datum je Stadt steht in `data/_import-status.json`. Der Check
vergleicht nur und schreibt `data/_aktualitaet.md` – er importiert nichts.

### Takt

| Was                                    | Wie oft                                       | Warum                                                                                         |
| -------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Änderungsprüfung                       | **monatlich**                                 | kostet fast nichts, findet jede gemeldete Änderung                                            |
| Neuimport einer Stadt                  | **bei gemeldeter Änderung**                   | nur dann gibt es wirklich etwas Neues                                                         |
| Vollständiger Neuimport aller Städte   | **halbjährlich**                              | manche Portale pflegen ihr Änderungsdatum nicht – darauf allein darf man sich nicht verlassen |
| OpenStreetMap-Städte                   | **vierteljährlich**                           | kein Änderungsdatum verfügbar, aber dort wird laufend kartiert                                |
| Vollständige Validierung (Abschnitt 2) | **halbjährlich**, zusammen mit dem Vollimport | prüft die Daten, nicht nur ihr Alter                                                          |

### Danach

```bash
npm run import:city -- <stadt>   # nur die gemeldeten Städte
npm run import:index
npm run validate -- <stadt>
```

Sobald die App läuft, gehört der Check in einen monatlichen
GitHub-Actions-Lauf, der bei Änderungen einen Pull Request mit den neuen Daten
öffnet. So bleibt die Entscheidung bei einem Menschen.

---

## Dateien in `data/`

| Datei                          | Inhalt                               | Von Hand?              |
| ------------------------------ | ------------------------------------ | ---------------------- |
| `<stadt>.json`                 | Seed-Datei der App                   | nein, wird erzeugt     |
| `<stadt>.overrides.json`       | geprüfte manuelle Korrekturen        | **ja**                 |
| `_import-status.md` / `.json`  | Importstand je Stadt                 | nein                   |
| `_quellen-status.md` / `.json` | welche Stadt hat welche Quelle       | nein                   |
| `_validierung.md`              | Befunde der Datenprüfung             | nein                   |
| `_bestaetigt.json`             | Kreuzvergleich je Standort           | nein, aber versioniert |
| `_aktualitaet.md`              | Ergebnis der monatlichen Prüfung     | nein                   |
| `_address-cache.json`          | Ergebnisse der Adress-Rückwärtssuche | nein, aber versioniert |
| `frankfurt.line-fixups.json`   | geprüfte Ausnahmen des PDF-Parsers   | **ja**                 |

Alles, was mit `_` beginnt, ist Arbeitsstand und wird von Skripten geschrieben.

---

## Erfahrungen, die in dieses Vorgehen eingeflossen sind

Vier Fehler sind beim Aufbau wirklich passiert. Jeder hätte Daten erzeugt, die
beim Draufschauen richtig aussehen – deshalb die Schutzmaßnahmen:

**Falsche UTM-Zone.** Dresdens Dienst liefert Zone 33. Als Zone 32 gedeutet
ergaben sich Koordinaten bei 7,7° Ost – mitten in Deutschland, aber 450 km
daneben, und jeder Punkt für sich plausibel. _Daraus folgt:_ Die Zone wird aus
`srsName` gelesen, nie geraten, und der Import prüft den Abstand zur Stadt.

**Stadtname als Teilstring.** „Essen" steckt in „Hessen"; Essen bekam dadurch
den Frankfurter Datensatz zugewiesen. _Daraus folgt:_ Vergleich auf
Wortgrenzen, und der Abstandstest hätte es ebenfalls gefangen.

**Leere Antwort als Ergebnis.** Overpass meldet Überlast teils mit HTTP 200 und
leerer Liste. Ungeprüft übernommen heißt das „diese Stadt hat keine
Behindertenparkplätze". _Daraus folgt:_ Ein leeres Ergebnis gilt erst nach
Bestätigung durch einen zweiten Spiegel.

**Themenfremde Treffer.** Die Suche schlug für Hamburg Werkstätten und
Tagesförderstätten vor; der richtige Datensatz heißt „Behindertenstellplätze".
Hamburg landete erst bei 10 Standorten für 1,9 Millionen Einwohner. _Daraus
folgt:_ Datensätze müssen sowohl von Parken als auch von Behinderung handeln –
und die Kennzahl „Stellplätze je Einwohner" hätte es sofort gezeigt.

Die gemeinsame Lehre: **Plausibilität je Datenpunkt genügt nicht.** Es braucht
den Abgleich mit einer unabhängigen Quelle und Kennzahlen über die ganze Stadt.
