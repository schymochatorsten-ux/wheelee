# ToDos – wheelee

Zentrale Aufgabenliste zum Projekt (Grundlage: [Konzept.md](Konzept.md)).
Hier steht nur, was **offen** ist; abgeschlossene Punkte stehen mit ihrer
Begründung in [Erledigt.md](Erledigt.md). Wie Daten importiert, geprüft und
aktuell gehalten werden, steht in [Datenpflege.md](Datenpflege.md).

**Status-Legende:** `[ ]` offen · `[~]` in Arbeit · `[x]` erledigt · `[!]` blockiert / Entscheidung nötig · `[-]` verworfen / später

**Letzte Aktualisierung:** 2026-10-19

**Endziel:** jeden öffentlichen Behindertenparkplatz in Deutschland erfassen,
der sich aus einer öffentlichen Quelle importieren lässt – siehe
[Abschnitt 2e](#2e-ganz-deutschland).

**Stand in Zahlen:** 204 von **10.754** Gemeinden mit Einwohnern geprüft
(1,9 %) – das sind **41,7 % der Bevölkerung**. In der App: 209 Städte, 18.072
Standorte, davon 23 Städte aus amtlicher Quelle. Laufende Berichte:
[data/\_abdeckung.md](data/_abdeckung.md) und
[data/\_import-status.md](data/_import-status.md).

Karte, Liste, Detailansicht, Zielsuche, Einstellungen und Offline-Betrieb
laufen, und seit dem 2026-10-11 ist die App unter
[wheelee.de](https://wheelee.de) erreichbar. Seit demselben Tag gibt es eine
Datenbank (SQLite), Konten und Rückmeldungen – alles in
[Erledigt.md](Erledigt.md). Es fehlen vor allem: Bewertungen, Rechtstexte –
und der weitaus größte Teil Deutschlands.

---

## Arbeitsstand

Hier steht, woran zuletzt gearbeitet wurde und was als Nächstes dran ist.
**Nach jeder abgeschlossenen Aufgabe aktualisieren**, damit nach einer
Unterbrechung nahtlos weitergearbeitet werden kann.

**Gerade in Arbeit:** nichts. Die Arbeit ist an einem sauberen Punkt beendet:
alle Prüfungen grün, keine halbfertige Änderung im Baum.

**Zuletzt am 2026-10-19, dritter Durchgang: Bewertungen gebaut** (8.1–8.7) –
die letzte Kernfunktion aus dem Konzept. Auf deine Vorgabe hin gilt eine
**geänderte Regel**: Sehen darf jede:r, bewerten nur mit Konto in beide
Richtungen, höchstens einmal je Parkplatz. Der Schutz steckt in
`UNIQUE (spot_id, account_id)` und nicht im Browser-Speicher; damit ist auch
**D-03 entschieden**. Offen bleiben 8.8 (Übersicht der gemeldeten Plätze) und
8.9 (Bewertungen in die Validierung).

**Davor am 2026-10-19: Impressum und
Datenschutzerklärung gebaut** (10.2) – der erste Punkt der neuen Reihenfolge.
Die Seite war acht Tage lang ohne beides erreichbar. Die Betreiberangaben
kommen aus der Umgebung, damit eine private Wohnadresse nicht in die
Git-Historie gerät; fehlen sie, nennt die Seite den Mangel, statt Platzhalter
zu zeigen. Die Datenschutzerklärung ist aus dem Code belegt und nennt den
Abruf der Kartenkacheln als den einen fremden Zugriff – das übersieht jeder
Generator. **Offen bleibt 10.2a: Ohne deine Angaben auf dem NAS ist nur die
Technik fertig, nicht die Pflicht.**

**Davor am 2026-10-19:** Die Liste geprüft – sie führte an sieben Stellen
**keine offenen Aufgaben**: ein abgehakter Unterpunkt in 2e.11; 8.10, dessen
Frage die Konten seit dem 2026-10-11 beantworten; und Abschnitt 5 vollständig
(5.1/5.3/5.7 verworfen, weil die Parkplatzdaten bewusst Seed-Dateien bleiben;
5.2/5.5/5.6 doppelt zu 8.2–8.4). Dazu drei Berichtigungen: **3.0i ist neu** –
174 statt der hier behaupteten 66 Standorte ohne Straßennamen, Dormagen 82
von 82; **3.1** ist zur Hälfte gebaut (`crossCheckWithOsm` in `validate.mts`);
**3.10** zitierte Quoten, die im aktuellen Bericht gar nicht stehen. Die
Doppelung 2a.5 ↔ 10.3 ist aufgelöst. Begründungen in
[Erledigt.md](Erledigt.md).

**Davor am 2026-10-17:** Zwei Punkte ohne offene Entscheidung abgearbeitet.
**17.5 Aufräumen**: Erledigte Rückmeldungen laufen nach zwölf Monaten ab, samt
der freiwilligen Antwortadresse – das Formular versprach das, niemand löste es
ein. Abgelaufene Sitzungen gehen mit. **10.3 Sicherheitsprüfung**: Die App
lieferte **keine einzige** Sicherheits-Kopfzeile aus; CSP, `nosniff`,
`frame-ancestors`, `Referrer-Policy`, `Permissions-Policy` und HSTS stehen
jetzt, festgehalten von fünf E2E-Tests. Befund, Begründungen und die Liste der
geprüften Punkte **ohne** Befund in [Erledigt.md](Erledigt.md); was daraus
offen bleibt, steht als 10.5 und 17.6 hier.

**Davor am 2026-10-16, zweiter Durchgang:** Die **Zielsuche ordnet ihre
Treffer jetzt nach Nähe** (6.23, auf Zuruf). Sie fragte Nominatim ohne jeden
Ortsbezug und bekam dessen Sortierung nach Bekanntheit zurück – wer von Köln
aus „Bahnhofstraße" tippte, sah Treffer aus dem Spreewald, Hannover und
Heilbronn, aber keinen aus Köln. Dazu Entfernung an jedem Vorschlag,
Entdopplung, Löschknopf, Enter, „Erneut". Begründung und Messwerte in
[Erledigt.md](Erledigt.md).

**Davor am 2026-10-16, erster Durchgang:** Diese Liste war an fünf Stellen überholt – D-02,
17.0 bis 17.4, 11.1/11.2 und 12.5 standen als offen oder unentschieden da,
obwohl sie seit dem 2026-10-11 gebaut und in [Erledigt.md](Erledigt.md)
beschrieben sind; die Stack-Tabelle nannte weiter Postgres und Vercel.
Nachgeführt sind die Einträge selbst, die Stack-Tabelle und die Zählstände.
**In `Erledigt.md` wurde nichts ergänzt** – die Begründungen standen dort
schon vollständig, nur der Rückschnitt hier fehlte.

### Hier weitermachen

**1. Zuerst prüfen, ob die Ausgangslage noch stimmt** – zwei Befehle, keine
Netzabfrage, zusammen unter einer Minute:

```bash
npm run test && npm run typecheck && npm run lint
npm run check:slugs
```

Erwartet: 305 Unit-Tests grün und
`Verzeichnis: 10.754 Gemeinden · davon an der Reihe: 204 · Seed-Dateien: 209`
mit „✅ Register und Seed-Dateien stimmen überein". Weicht das ab, hat sich
seit dem 2026-10-17 etwas geändert – **das klären, bevor Neues anfängt.**
Besonders ein Slug, der nicht mehr passt: Er verwaist eine Seed-Datei
lautlos.

**2. Der Punkt-in-Fläche-Test braucht die Grenzdatei** – 66 MB vom BKG, die
nicht im Repository liegen. Vor dem ersten landesweiten Lauf einmal:

```bash
npm run import:grenzen
```

Er lädt sie nach `data/raw/`, baut die Flächen und prüft sich selbst gegen den
Bestand. Erwartet: `10.956 Flächen für 10.956 Gemeinden` und
`17.801 von 18.072 Standorten … (98.50 %)`.

### Reihenfolge der Abarbeitung

> **Vorgabe vom 2026-10-17, unverändert gültig.** Es wird **kein weiterer
> Datenimport** angefangen, solange auf dieser Liste inhaltliche Punkte offen
> sind. Der Import ist der Teil, der sich beliebig lange fortsetzen lässt –
> 10.550 Gemeinden stehen offen, und er wird nie „fertig" im Sinne einer
> abgehakten Liste. Mehr Städte in einer App, der etwas Grundsätzliches fehlt,
> verbessern nichts.

**Diese Liste ist die verbindliche Reihenfolge** (zuletzt geordnet
2026-10-19). Abgearbeitet wird von oben; ein Punkt wird erst angefangen, wenn
der darüber abgeschlossen ist. Was fertig ist, steht nicht mehr hier, sondern
in [Erledigt.md](Erledigt.md) – deshalb stehen oben keine durchgestrichenen
Zeilen.

| #   | Was                                                           | Warum an dieser Stelle                                              |
| --- | ------------------------------------------------------------- | ------------------------------------------------------------------- |
| 1   | **8.8 / 8.9** Bewertungen zu Ende führen                      | Das Gebaute wird erst nützlich, wenn jemand die Meldungen sieht     |
| 2   | **3.0i** 174 Standorte ohne Straßennamen                      | Eine ganze Stadt ist unbrauchbar; vorhandene Daten vervollständigen |
| 3   | **3.1 / 3.7** Kreuzvergleich zu Ende, bestätigt anzeigen      | Die Angabe, die vor einer vergeblichen Fahrt schützt                |
| 4   | **12.6 / 12.4** Fehler-Monitoring, Lighthouse                 | Ab hier geht es um den Betrieb, nicht mehr um Funktionen            |
| 5   | **10.5 / 17.6 / 11.7** Nonce-CSP, Passwort ändern, DSGVO      | Sorgfalt, kein akutes Risiko – das akute war 10.2 und ist erledigt  |
| 6   | **11.3a / 11.4 / 11.5 / 11.6** Konto-Komfort                  | Niemand ist darauf angewiesen; 11.6 baut auf den Bewertungen auf    |
| 7   | **9.2a / 9.9 / 12.7a** Darstellung, Hilfsmitteltest           | 9.9 braucht echte Geräte und Hilfsmittel                            |
| 8   | **1.8 / 4.5 / 12.5** Aufräumen und Automatisierung            | Hängt teils an Entscheidungen (Webhook oder Timer)                  |
| 9   | **2c.3 / 2c.4 / 2d.9** Anfragen an Städte, OSM ergänzen       | Briefe und Kartierung – läuft nebenher, hält nichts auf             |
| 10  | **Datenarbeit**: 3.2, 3.3, 3.4, 3.10, 2d.8a, 2a.5/10.3, 2e.\* | Fällt unter die Vorgabe oben – erst wenn 1 bis 9 stehen             |
| 11  | **14.1–14.9** Abschlusstest                                   | Laut Abschnitt 14 zuletzt, auf echten Geräten und mit Betroffenen   |

**Wo 3.1 hingehört, war widersprüchlich** und ist am 2026-10-19 geklärt: Der
offene Teil ist **Code** (drei Gruppen statt einer Zahl, Ergebnis je Standort
festhalten) und steht deshalb auf Platz 3. Dass der Lauf dafür Overpass
befragt, macht ihn nicht zum Datenimport – es kommt keine Gemeinde hinzu. Die
Punkte 3.3, 3.4 und 3.10 sind dagegen echte Läufe über den ganzen Bestand und
stehen unter Platz 10.

**Außer der Reihe, weil es nicht an mir liegt:**

- **10.2a** – deine Angaben für das Impressum. Bis sie in der `.env` auf dem
  NAS stehen, nennen beide Rechtstexte den Mangel, und **die gesetzliche
  Pflicht ist nicht erfüllt.** Das ist der einzige Punkt mit laufendem Risiko.
- **10.2b** – die Rechtstexte einmal fachlich ansehen lassen.
- **D-05** – Umgang mit ungenauen Positionen; faktisch gelöst, weil alle
  18.072 Standorte Koordinaten haben.
- **1.7** – Commits und Branch-Strategie; `git` ist auf diesem Rechner nicht
  im PATH, daran ändert keine Reihenfolge etwas.
- **11.1** – Anmeldung ohne Passwort und „Passwort vergessen"; beides setzt
  einen Mailversand voraus, über den noch nicht entschieden ist.
- **Abschnitte 13, 15, 16** – gesperrt bis zu deiner Freigabe.

**Diese Aufstellung ist vollständig:** Jeder offene Posten der obersten Ebene
steht entweder in der Tabelle oder hier darunter. Nachprüfen:

```bash
node -e "const t=require('fs').readFileSync('ToDos.md','utf8');const s=t.indexOf('### Reihenfolge der Abarbeitung'),e=t.indexOf('### Was zuletzt geschah',s);const g=new Set([...t.slice(s,e).matchAll(/\b([0-9]+[a-z]?\.[0-9]+[a-z]?)\b/g)].map(m=>m[1]));const o=[...t.matchAll(/^- \[([ ~!])\] \*{0,2}([0-9]+[a-z]?\.[0-9]+[a-z]?)/gm)].map(m=>m[2]);const f=o.filter(n=>!g.has(n)&&!n.startsWith('2e.')&&!n.startsWith('14.'));console.log(f.length?'nicht eingeordnet: '+f.join(' '):'alle eingeordnet');"
```

**Nicht anfangen:** Abschnitt 13, 15 und 16 sowie 2e.11 – alle gesperrt bis zu
einer ausdrücklichen Freigabe.

**Eine Entscheidung liegt bei dir, nicht auf der Liste:** Die Stufe „ab
50.000" ist vollständig abgearbeitet. Die nächstgrößere offene Gemeinde wäre
Cuxhaven mit 49.697 Einwohnern; dafür muss `MIN_POPULATION` sinken. Seit 2e.7
erzeugen **beide** Wege richtige Daten – der Einzelimport über `import:city`
und der landesweite Lauf. Der einzige Einwand ist die Last auf Overpass: ab
40.000 wären es 90 Gemeinden, ab 20.000 bereits 511. Und der Dienst war am
2026-10-11 so überlastet, dass von drei Teilabfragen für
Nordrhein-Westfalen zwei leer zurückkamen.

### Was zuletzt geschah (2026-10-10 und 2026-10-11)

Zuerst auf Zuruf an der Oberfläche: **6.17–6.20** (Sprung auf die Karte aus
jedem Eintrag, rote Luftlinie zum Bezugspunkt, Auswahl auch am eingegebenen
Ziel, Vorschläge beim Tippen) und **9.11–9.14** (Reiter „Liste" ausgeblendet,
Kopfzeile still und ohne Bestandszahlen, schlankere Menüs).

Zuletzt am 2026-10-11 auf Zuruf **9.15**: Kopfzeile, Statuszeile,
Parkplatzvorschlag und Auswahlliste sind kleiner und ruhiger; die Zielsuche
sitzt als schmale Schaltfläche oben links. Karte, Einstellungen und alle
44-px-Trefferflächen bleiben unverändert.

Am 2026-10-11 dann **2e.7**: Die Zuordnung der landesweiten Treffer zu
Gemeinden entscheidet jetzt die amtliche Grenzfläche aus VG250-EW statt des
umschließenden Rechtecks – mit einem eigenen Shapefile-Leser, weil dieselbe
Auslieferung auch das Gemeindeverzeichnis trägt. 98,5 % des Bestands ordnen
sich selbst wieder zu, und von den 830 Standorten der Nachbarn Herdeckes
landet keiner mehr dort. Nebenbei kam heraus, dass ein unvollständiger
Overpass-Lauf bisher geschrieben hätte: 7 Objekte für ganz
Nordrhein-Westfalen statt 14.025.

Davor am selben Tag **2e.10**: Die Arbeitsliste führt alle 10.754 Gemeinden mit
Einwohnern statt nur die 204 oberhalb der Importgrenze. Dabei kamen zwei
Folgefehler ans Licht (`check:slugs` meldete fünf Fehlalarme,
`report:abdeckung` rechnete gegen eine andere Gesamtzahl als der Importstand)
und ein selbst erzeugtes Risiko, das sofort geschlossen wurde: `--rest` sah
plötzlich 10.550 offene Gemeinden.

Danach nach der Vorgabe „günstigstes zuerst": **10.4**, **7.7**, **6.22**,
**6.21**, **6.16a**, **2d.10**. Begründungen stehen in
[Erledigt.md](Erledigt.md).

Davor, am selben Tag: der Import der Städte ab 50.000 Einwohnern, die
Zielsuche, der Haftungshinweis, Lizenz und Importdatum, Kontraste und
Schriftskalierung, Einstellungen als eigene Ansicht und die ersten
E2E-Tests.

### Drei Befunde, die den Stand erklären

**1. Der landesweite Import (2e.7) lief – und seine Daten wurden verworfen.**
473 Gemeinden waren geschrieben. Die Zuordnung ohne echte Grenzgeometrie
bevorzugt systematisch kleine Gemeinden neben großen Städten; 80 von 472
hatten unplausibel viele Stellplätze. Nach dem Grundsatz „lieber kein Import
als ein falscher" kein vertretbarer Bestand. **Seit 2026-10-11 behoben:** Es
entscheidet die amtliche Fläche, nicht das Rechteck. Was bleibt, ist der
Bezugsweg – Overpass verträgt die Last nicht (2e.11).

**2. Die Arbeitsliste führte 204 Gemeinden, das Register 10.754** – die
übrigen standen nicht auf „offen", sie kamen in der Datei nicht vor. **Seit
2e.10 behoben:** `_import-status.md` meldet jetzt 10.550 offene Gemeinden und
nennt die nächste, statt „alles abgearbeitet" zu behaupten.

**3. Chemnitz zeigte Wohnmobilstellplätze als Behindertenparkplätze.** 13
Standorte aus einer amtlichen Quelle namens „Parkplätze Wohnmobil", die der
Relevanzfilter durchgelassen hatte. Nach dem Neuimport: 221 echte Standorte.
Filter korrigiert, Tests dazu.

**Was alle drei gemeinsam haben:** Gefunden hat sie nicht das Hinsehen,
sondern Kennzahlen über den ganzen Bestand – Streuung je Gemeinde und
Stellplätze je Einwohner. Die beiden stehen aus genau diesem Grund in
[CLAUDE.md](CLAUDE.md).

### Fallstricke, die hier wirklich aufgetreten sind

Diese Liste wurde am 2026-10-10 entdoppelt – mehrere Einträge standen zweimal
da, zwei waren überholt. Die laufenden Arbeitsregeln stehen in
[CLAUDE.md](CLAUDE.md); hier steht, was beim Arbeiten am Datenbestand
schiefging.

- **Der Import schleppt behobene Mängel wieder ein.** Nach dem Import der
  Städte ab 50.000 Einwohnern standen 21 % aller Standorte ohne Straßennamen
  da, weil `import:streets` nicht Teil der Importanleitung war. Ist jetzt als
  Schritt 5 in [Datenpflege.md](Datenpflege.md) festgeschrieben – **und nach
  jedem Import wirklich auszuführen**, auch nach einem einzelnen.
- **Einzelne Städte dauern sehr lange, ohne hängen zu sein.** Konstanz lief
  über 40 Minuten. Grund ist die Bauart: Jede Overpass-Abfrage trägt
  `[out:json][timeout:300]`; scheitert sie, wird sie zerlegt und über mehrere
  Spiegel mit Pausen wiederholt. Unter Last summiert sich das. Einen
  clientseitigen Abbruch (`AbortSignal.timeout`) gibt es nicht – wäre eine
  sinnvolle Ergänzung, damit ein Lauf kalkulierbar bleibt.
- **Overpass verträgt kein hohes Tempo.** Bei rund 100 Städten am Stück häufen
  sich HTTP 500/504. Zwischen den Schüben ein paar Minuten Pause einlegen.
- **`npm run import:city -- --rest` greift keine fehlgeschlagenen Städte**,
  nur „offene". Nachholen geht namentlich:
  `npm run import:city -- <slug> <slug>`.
- **`npm run sources:scan` ist billiger als es aussieht.** Es fragt GovData
  **einmal je Suchbegriff**, nicht je Stadt – ein vollständiger Neulauf kostet
  rund zehn Abfragen. Wenn sich eine Filterregel ändert, ist der saubere
  Neulauf also der richtige Weg und nicht das Bearbeiten des erzeugten
  Zwischenstands.
- **Frankfurt (Oder) bekam den Datensatz von Frankfurt am Main.** Die
  Städtezuordnung in `scan-sources.mts` streicht Klammerzusätze, wodurch beide
  auf „frankfurt" verkürzt werden. Die Abstandsprüfung hat es gefangen, der
  Import fiel auf OSM zurück – siehe 2d.11.
- **Ein Schwellenwert, der knapp danebenliegt, ist kein Schutz.**
  `looksTooSmall` verwirft eine amtliche Quelle unter 2,0 Stellplätzen je
  10.000 Einwohner. Chemnitz lag bei 2,28 und kam mit Wohnmobilstellplätzen
  durch (2d.10). Gefangen hat es erst der Vergleich über alle Städte.

**Wartet auf dich:**

- **D-03** Missbrauchsschutz · **D-05** Umgang mit ungenauen Positionen
- **10.2** Impressum und Datenschutzerklärung brauchen deine Angaben
- **Abschnitt 13 (Finanzierung)** ist gesperrt, bis du ihn freigibst
- **Abschnitt 15 (Mehrsprachigkeit)** ist auf deinen Wunsch zurückgestellt – Englisch, Spanisch und Französisch erst nach der deutschen Fassung
- **Abschnitt 16 (nur nach Freigabe)** – derzeit: Städte zum Mitnehmen herunterladen

**Stand (2026-10-19, dritter Durchgang):** 37 offen, 9 in Arbeit, 3 brauchen
deine Angaben oder Entscheidung, 9 bewusst zurückgestellt (Finanzierung,
Mehrsprachigkeit, Offline-Download). Dazu 14 offene Unterpunkte innerhalb
dieser Posten. **Gezählt wird die oberste Ebene** – sonst ergibt jede Sitzung
eine andere Zahl.

> **Von 51 auf 44 durch Aufräumen, nicht durch Arbeit** (2026-10-19). Die
> Liste führte sieben Posten, die keine offenen Aufgaben waren: die sechs aus
> Abschnitt 5 (drei verworfen, drei doppelt zu Abschnitt 8) und 8.10, dessen
> Frage die Konten seit dem 2026-10-11 beantwortet haben. Hinzu kam **ein**
> echter Punkt, der fehlte: 3.0i, die 174 Standorte ohne Straßennamen.
> **Eine kleinere Zahl heißt hier also nicht, dass mehr fertig ist** – sie
> heißt, dass die Liste wieder sagt, was sie sagen soll.

> **Nachgezählt, nicht fortgeschrieben** (2026-10-17). Die Zahl stand kurz auf
> 52, weil sie aus der vorigen weitergerechnet statt neu ermittelt wurde.
> Ein Zählstand, den man im Kopf addiert, driftet – er lässt sich in einem
> Durchlauf prüfen:
>
> ```bash
> node -e "const l=require('fs').readFileSync('ToDos.md','utf8').split('\n'); const t=l.filter(x=>/^- \[(.)\]/.test(x)); console.log('gesamt',t.length); for (const m of [' ','~','!','-']) console.log(m, t.filter(x=>x.startsWith('- ['+m+']')).length); console.log('Unterpunkte', l.filter(x=>/^\s+- \[ \]/.test(x)).length);"
> ```

123 erledigte Einträge stehen in [Erledigt.md](Erledigt.md).
**Tests: 305 Unit-Tests + 42 E2E-Tests.**

---

## 0. Offene Entscheidungen

**D-03 (Missbrauchsschutz) ist am 2026-10-19 entschieden und umgesetzt** –
siehe [Erledigt.md](Erledigt.md). Die ursprüngliche Empfehlung (Gerätekennung
im Browser-Speicher plus IP-Grenze) wurde dabei **verworfen**: Beides ist zu
schwach, um eine Zählung zu tragen. Entschieden wurde Anmeldepflicht plus
Eindeutigkeit im Schema.

- [!] **D-05 Umgang mit Parkplätzen ohne Koordinaten** – Empfehlung: nicht auf den Stadtteil-Mittelpunkt setzen, sondern als „Position ungenau" kennzeichnen und nur in der Liste führen. Derzeit faktisch gelöst, weil alle importierten Standorte Koordinaten haben.
  **Entschieden und hier abgeräumt:** D-01, D-02 (Datenbank: SQLite), D-04 und
  D-06 stehen mit ihrer Begründung in [Erledigt.md](Erledigt.md).

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

- [ ] 2d.8a **Die acht Städte mit ungenutzter amtlicher Quelle einzeln ansehen – davon lohnen fünf.** (Die Zusammenfassung oben nannte lange „fünf", dieser Eintrag „acht"; beides stimmt und las sich wie ein Widerspruch. Acht Städte haben eine ungenutzte Quelle, bei dreien ist die Ablehnung richtig.) `npm run sources:check` findet sie von selbst (siehe [Erledigt.md](Erledigt.md)); zu tun bleibt das Ansehen. Bei Kiel, Krefeld und Aachen ist die Ablehnung laut 2d.8 richtig (Anwohnerparken); bei Bochum, Bielefeld, Karlsruhe, Norderstedt und Viersen lohnt der Blick auf das Stadtportal. Der Gewinn wäre spürbar: Düsseldorf kam von 171 Standorten aus OSM auf 340 aus der amtlichen Quelle.
- [ ] 2d.9 **Regensburg: 156.000 Einwohner, kein einziger erfasster Behindertenparkplatz.** Dass die Abfrage sauber durchlief und leer war, ist seit 2e.9 festgehalten – das ist eine Lücke in OpenStreetMap, keine in der Wirklichkeit. Hier lohnt die Anfrage bei der Straßenverkehrsbehörde (Schritt 3 der Quellensuche) und das Nachtragen in OSM (2c.4).

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
  - [ ] **Nächste Stufe „ab 20.000" = 706 Gemeinden. Einmal versucht und wieder zurückgenommen** (2026-10-10): Die Grenze stand kurzzeitig auf 20.000, und der landesweite Lauf hat 473 Gemeinden geschrieben. Weil die Zuordnung nicht stimmte, sind die Daten wieder entfernt und die Grenze steht wieder auf 50.000. **Der Grund dafür ist seit 2e.7 behoben** (Punkt-in-Fläche-Test, siehe [Erledigt.md](Erledigt.md)); das Register (2e.4) und die Zählung (2e.0) sind bereit, und das Umstellen ist eine Zahl. Was bleibt, ist die Last auf Overpass – siehe 2e.11.
  - [ ] Danach ab 10.000 (1.598 Gemeinden) und ab 5.000 (2.943).
- [ ] 2e.6 Restliche Gemeinden aus OpenStreetMap – der Importer kann das bereits. **Die Liste steht seit 2e.10:** `data/_import-status.md` führt alle 10.754 Gemeinden mit Einwohnern, davon 10.550 als „noch nicht geprüft". Es fehlt jetzt nicht mehr die Liste und seit 2e.7 auch nicht mehr die Zuordnung, sondern ein Bezugsweg, der einen Gemeinschaftsdienst nicht überlastet – das ist 2e.11.
- [ ] 2e.7a Ursprüngliche Überlegung, weiterhin gültig als Rückfallebene: Bei 10.700 Gemeinden ist eine Overpass-Abfrage je Gemeinde nicht vertretbar – das wäre Missbrauch eines Gemeinschaftsdienstes. Der landesweite Durchlauf je Bundesland steht (2e.7); **er ist aber unter Last unzuverlässig.** Am 2026-10-11 lieferten für Nordrhein-Westfalen 2 von 3 Teilabfragen nichts: 7 Objekte statt 14.025. Der Lauf schreibt in diesem Fall nichts mehr, aber vorangekommen ist er auch nicht. Der eigene Auszug aus einem Planet-Download bleibt deshalb auf der Liste (2e.11).

- [~] 2e.10 **Die Arbeitsliste führt jetzt alle Gemeinden** – siehe [Erledigt.md](Erledigt.md). Offen bleibt eine Kennzeichnung, für die die Daten fehlen:

  - [ ] **Gemeinden ohne eigene Entscheidung kennzeichnen.** Rund ein Fünftel der Gemeinden gehört zu Verbands-, Samt- oder Verwaltungsgemeinschaften. Ihre Straßenverkehrsbehörde sitzt beim Verband, nicht in der Gemeinde – für Schritt 3 der Quellensuche ([Datenpflege.md](Datenpflege.md)) ist der Verband der richtige Adressat, und eine Anfrage an die Gemeinde läuft ins Leere.

    **Das Register weiß es derzeit nicht.** `data/_gemeinden.json` kennt im Feld `art` nur drei Werte: `Gemeinde`, `Stadt`, `Gemeindefreies Gebiet`. Die Zugehörigkeit zu einem Verband steht in VG250 auf einer eigenen Verwaltungsebene, die `scripts/import/gemeinden.mts` nicht ausliest – dort werden nur Ebene 6 (Gemeinde) und 2 (Land) verarbeitet.

    Zu tun wäre also zuerst: nachsehen, ob die Ebene im bezogenen Datensatz enthalten ist, und sie gegebenenfalls mit einlesen. **Nicht raten:** Eine Gemeinde fälschlich als verbandsangehörig zu führen, schickt eine Anfrage an die falsche Stelle und die Antwort bleibt aus, ohne dass jemand den Grund erfährt.

- [ ] 2e.11 **Prüfen, ob die Massendaten ganz ohne Overpass zu holen sind.**

  Overpass ist ein **Abfragedienst**, von Freiwilligen bezahlt, und antwortet unter Last mit HTTP 500/504 – oder, schlimmer, mit HTTP 200 und leerer Liste. Beides ist bei diesem Projekt schon eingetreten. Für 10.754 Gemeinden ist er das falsche Werkzeug, auch gebündelt je Bundesland.

  Der dafür vorgesehene Weg sind die **Bundesland-Auszüge von Geofabrik** (`.osm.pbf`, ODbL, täglich aktualisiert, mit stabilem JSON-Index und ausdrücklich für Automatisierung gedacht). Das ist der Unterschied, auf den es hier ankommt: Ein Download-Server ist für Massenbezug da, ein Abfragedienst nicht. Was vorher zu klären ist:

  > **Nicht mehr blockiert.** Dieser Punkt durfte lange nicht angefasst werden,
  > solange die Zuordnung nicht stimmte: Ein schnellerer Bezug hätte nur
  > schneller falsche Daten erzeugt – genau der Fall, der am 2026-10-10 zum
  > Entfernen von 473 Gemeinden führte. **Seit dem 2026-10-11 ist die Bedingung
  > erfüllt** (2e.7: Die Zuordnung entscheidet die amtliche Grenzfläche,
  > geprüft an 18.072 Standorten). Das ist eine Voraussetzung, keine Aufgabe –
  > sie stand bis zum 2026-10-19 fälschlich als abgehakter Punkt in dieser
  > offenen Liste.
  - [ ] **Der Aufwand ist ehrlich zu benennen:** PBF ist Protocol Buffers mit zlib-komprimierten Blöcken und delta-kodierten Knoten – deutlich mehr als ein Shapefile-Leser. Dagegen steht, dass es die Abhängigkeit von einem Gemeinschaftsdienst vollständig auflöst und der Lauf beliebig wiederholbar wird, ohne jemandem zur Last zu fallen.
  - [ ] **Attribution bleibt ODbL**, also unverändert gegenüber dem heutigen OSM-Bezug. Die Auszüge enthalten keine Benutzernamen und Changeset-IDs; für dieses Projekt ist das kein Verlust, sondern erspart die Frage nach personenbezogenen Daten.
  - [ ] Zwischenstufe, falls PBF zu viel ist: `npm run import:osm-state` beibehalten, aber mit Pausen und über die 16 Länder verteilt – der Lauf steht ja. Dann bleibt es bei 32 Abfragen für ganz Deutschland statt 10.754, und das ist vertretbar.

---

## 3. Datenvalidierung

### Befund der ersten Prüfung (2026-10-09)

`npm run validate` hat 84 Städte geprüft. Bericht: [data/\_validierung.md](data/_validierung.md).

Die 3.0-Kette (Straßennamen nachtragen) war zweimal abgeschlossen und ist
zweimal wieder aufgerissen – beim Import der Städte ab 50.000 Einwohnern und
danach erneut. Der Stand wird deshalb **gezählt, nicht erinnert** (3.0i).

Bisher prüft der Import nur, ob eine Koordinate überhaupt plausibel ist (liegt sie
in Deutschland, liegt sie nahe der richtigen Stadt). Das fängt grobe Fehler ab,
aber keine einzelne falsch verorteten Parkplätze. Dafür braucht es einen
Abgleich mit einer zweiten, unabhängigen Quelle.

- [ ] 3.0i **174 Standorte haben keinen Straßennamen, einer ganzen Stadt fehlen alle.** (Aufgenommen 2026-10-19.)

      **Dieser Punkt fehlte, weil eine Zahl stehen blieb.** Hier stand „3.0-Kette abgeschlossen: 66 von 17.206 Standorten ohne Straßennamen" – ein richtiger Satz aus der Zeit mit 17.206 Standorten. Inzwischen sind es 18.072, und nachgezählt im Bestand:

      ```
      ohne Straßenname: 174 von 18.072 (1,0 %), verteilt auf 33 Städte
        Dormagen 82/82 · Neumünster 14/97 · Euskirchen 13/258 · Eschweiler 7/55 …
      ```

      **Dormagen ist der eigentliche Befund:** 82 von 82 Standorten ohne Straße, dazu heißen 75 davon „Behindertenparkplatz Dormagen". Liste und Detailansicht sind für diese Stadt damit wertlos – man sieht 82-mal denselben Namen ohne Adresse. `data/_validierung.md` führt das als 🔴, aber niemand hat es auf diese Liste geholt.

      Zu tun: `npm run import:streets` (nimmt von selbst nur Städte mit offenen Standorten), für Dormagen zusätzlich prüfen, ob das Adressfeld der Quelle erkannt wurde – ein Platzhalter bei 75 von 82 Einträgen deutet auf einen nicht erkannten Spaltennamen, nicht auf fehlende Daten. Danach `npm run import:index` und `npm run validate`.

      **Das zählt als Datenpflege, nicht als neuer Import** (siehe die Vorgabe oben): Es kommt keine Gemeinde hinzu, vorhandene Standorte werden vervollständigt.

      **Die Zahl gehört nicht hierher geschrieben, sondern ermittelt:**

      ```bash
      node -e "const fs=require('fs');let t=0,n=0;for(const f of fs.readdirSync('data')){if(!f.endsWith('.json')||/^_|\.(overrides|parsed|report|line-fixups)\.|^geocode-cache|^osm-address|^frankfurt-pdf-liste/.test(f))continue;const d=JSON.parse(fs.readFileSync('data/'+f,'utf8'));if(!d.spots)continue;t+=d.spots.length;n+=d.spots.filter(s=>!s.street).length;}console.log(n,'von',t);"
      ```

- [~] 3.1 **Kreuzvergleich amtliche Daten gegen OpenStreetMap – die Hälfte steht.** `crossCheckWithOsm` in `scripts/import/validate.mts` holt für jede amtliche Stadt die OSM-Standorte, paart sie innerhalb von `CONFIRM_METERS` und schreibt die Quote in den Bericht. Was von der ursprünglichen Beschreibung **fehlt**:
  - [ ] **Die drei Gruppen statt einer Zahl:** _bestätigt_, _nur amtlich_ (in OSM nicht erfasst), _nur OSM_ (neu oder in der amtlichen Liste vergessen). Derzeit wird nur gezählt, wie viele einen Gegenpart haben – welche es sind, fällt weg.
  - [ ] **Das Ergebnis je Standort festhalten**, nicht nur je Stadt. Ohne das kann 3.7 die bestätigten Standorte nicht kennzeichnen, und der Lauf müsste für jede Anzeige wiederholt werden.
- [~] 3.2 **Landesweite Sammeldatensätze als dritte Quelle.** Karlsruhe ist eingebunden, NRW und BW sind ergebnislos geprüft – beides in [Erledigt.md](Erledigt.md). Offen bleibt:
  - [ ] Zum **Gegenprüfen** (statt zum Lückenschließen) taugt der Karlsruher Datensatz weiterhin: Für Karlsruhe und Baden-Baden liegen jetzt zwei unabhängige Quellen vor. Das ist Material für 3.1.
  - [ ] Weitere Landesportale einzeln ansehen: Open Data Hessen, daten.berlin.de, Geodatenportal Bayern, Transparenzportal Hamburg.
- [ ] 3.3 **Straßenabgleich.** Für jeden Standort prüfen, ob die Rückwärtssuche bei der Koordinate dieselbe Straße nennt wie die Quelle. Eine Abweichung ist kein Beweis für einen Fehler, aber ein guter Filter: nur die Treffer müssen von Hand angesehen werden. Für Frankfurt gibt es das schon im Importreport; es fehlt für alle anderen Städte.
- [ ] 3.4 **Abstand zur nächsten Straße.** Ein Behindertenparkplatz liegt am Straßenrand. Punkte, die mehr als etwa 25 m von jeder Straße entfernt sind, sind fast immer falsch verortet. Über eine einzige Overpass-Abfrage je Stadt prüfbar.
- [ ] 3.7 Ergebnis sichtbar machen: Standorte, die von zwei Quellen bestätigt sind, in der Detailansicht als geprüft kennzeichnen. Das ist genau die Information, die Nutzer:innen vor einer vergeblichen Fahrt bewahrt.
- [ ] 3.10 **Bestätigungsquoten nachgehen – aber erst wieder welche erzeugen.** Der Punkt nannte bis zum 2026-10-19 feste Zahlen (Neuss 95 %, Ulm 81 %, Köln 24 %, Dresden 19 %, Düsseldorf 5 %) und las sich dadurch wie eine fertige Grundlage. **In `data/_validierung.md` (Stand 2026-10-10) steht keine einzige Bestätigungsquote** – der Abgleich lief beim letzten Lauf nicht durch, weil er Netzzugriff braucht und `crossCheckWithOsm` bei leerer OSM-Antwort bewusst `null` zurückgibt, statt „0 % bestätigt" zu behaupten.

      Die zitierten Zahlen stammen also aus einem früheren Lauf und sind nicht mehr belegt. Zuerst `npm run validate` **mit** Netz laufen lassen, dann die Ausreißer nach unten ansehen: Dort ist entweder die amtliche Koordinate versetzt oder die OSM-Erfassung dünn, und das unterscheidet nur die Stichprobe.

---

## 4. Datenaktualität

Parkplätze verschwinden und kommen hinzu. Die Daten einmal zu importieren
genügt nicht – es braucht einen regelmäßigen, möglichst billigen Blick darauf,
ob sich an der Quelle etwas getan hat.

- [ ] 4.5 Automatisieren, sobald die App läuft – etwa als monatlicher GitHub-Actions-Lauf, der bei Änderungen einen Pull Request mit den neuen Daten öffnet. So bleibt die Kontrolle beim Menschen.

---

## 5. Datenmodell und Backend

**Nichts offen** (aufgeräumt 2026-10-19). Der Abschnitt stammte aus der
Planung vom 2026-10-08 und beschrieb ein Datenmodell, das so **nicht gebaut
wurde** – teils bewusst anders entschieden, teils doppelt zu Abschnitt 8.
Begründungen in [Erledigt.md](Erledigt.md):

- **5.1, 5.3, 5.7** (Schema `parking_spot`, Tabelle `city`, Seed-Lauf in die
  Datenbank) sind **verworfen**: Die Parkplatzdaten bleiben versionierte
  Seed-Dateien, die Datenbank führt nur, was zur Laufzeit entsteht.
- **5.2, 5.5, 5.6** (Schema `rating`, Bewertungs-Aggregat, `POST …/ratings`)
  stehen jetzt bei **8.2–8.4**, wo auch die fachlichen Regeln stehen.

Der Abschnitt bleibt als Überschrift stehen, weil die Nummerierung beider
Dateien dieselbe ist – wie bei 6 und 7.

---

## 6. Karte und Standort

**Nichts offen** (Stand 2026-10-10). Karte, Standort, Zielsuche, Umkreis,
Auswahl über der Karte, Luftlinie und Offline-Betrieb sind gebaut; alles steht
in [Erledigt.md](Erledigt.md). Der Abschnitt bleibt stehen, weil die
Nummerierung beider Dateien dieselbe ist – ein fehlender Abschnitt 6 würde beim
Nachschlagen von „6.17" nur verwirren.

---

## 7. Parkplatzdetails und Navigation

**Nichts offen** (Stand 2026-10-10). Zuletzt wurde 7.7 abgeschlossen: 96 % der
Zeitangaben werden sicher gedeutet. Die verbliebenen 17 sind überwiegend gar
keine Zeitangaben („nur an Veranstaltungen", „matchdays only") – daraus lässt
sich ehrlich nichts machen, und das ist das Ergebnis, nicht eine offene
Aufgabe.

---

## 8. Bewertungen

**Gebaut am 2026-10-19.** Damit ist die letzte Kernfunktion aus dem Konzept
da. Auch **D-03 (Missbrauchsschutz) ist damit entschieden**: Der Schutz steckt
in der Eindeutigkeitsbedingung `UNIQUE (spot_id, account_id)` und in der
Anmeldepflicht, nicht im Browser-Speicher – die Begründung samt der
verworfenen Alternativen steht in [Erledigt.md](Erledigt.md).

### Regeln (geändert 2026-10-19)

|            | 👍 „Existiert"             | 👎 „Existiert nicht mehr"  |
| ---------- | -------------------------- | -------------------------- |
| Ansehen    | **ohne Konto**             | **ohne Konto**             |
| Bewerten   | **nur mit Konto**          | **nur mit Konto**          |
| Begrenzung | 1× pro Parkplatz pro Konto | 1× pro Parkplatz pro Konto |

**Das ist eine Änderung gegenüber dem 2026-10-09**, wo der Daumen hoch ohne
Konto möglich sein sollte. Der Grund: Anonym wäre er nur über den
Browser-Speicher zu begrenzen gewesen, und den hebelt ein privates Fenster
aus. Mit Anmeldepflicht heißen zehn Bestätigungen zehn Konten – erst damit ist
die Zählung eine Auskunft. Dass die Zählerstände **ohne** Konto sichtbar sind,
hält den Verlust klein. Die ausführliche Begründung steht in
[Erledigt.md](Erledigt.md).

**8.1 bis 8.7 sind seit dem 2026-10-19 gebaut** – Knöpfe in der
Detailansicht, Anmeldepflicht serverseitig geprüft, Eindeutigkeit im Schema,
Zählerstände mit Zeitpunkten, optimistische Anzeige mit Rücknahme bei
Fehlern. Begründungen in [Erledigt.md](Erledigt.md). Offen bleibt:

- [ ] 8.8 **Interne Übersicht gemeldeter Parkplätze für das manuelle Review.**
      Die Abfrage dafür steht schon: `spotsReportedGone()` in
      `src/lib/db/ratings.ts` liefert die Parkplätze mit mindestens zwei
      „existiert nicht mehr"-Meldungen, nach Anzahl sortiert. Es fehlt die
      Ansicht – am ehesten als zweiter Abschnitt im Reiter „Rückmeldungen",
      der ohnehin nur für Administratoren sichtbar ist. Von dort sollte ein
      Klick auf die Karte führen, wie bei den Rückmeldungen auch.
- [ ] 8.9 **Bewertungen in die Validierung einbeziehen:** mehrfach als
      „existiert nicht mehr" gemeldete Plätze gehören auf die Prüfliste aus
      Abschnitt 3. Das ist der Punkt, an dem aus Bewertungen Datenpflege wird
      – `npm run validate` müsste die Datenbank lesen, was es bisher nicht
      tut.

**8.10 ist entfallen** (2026-10-19): Der Punkt stellte die Wahl „Konten
vorziehen oder zunächst nur Upvotes ausliefern". Die Konten sind seit dem
2026-10-11 gebaut – die Frage ist nicht beantwortet worden, sondern überholt.
Siehe [Erledigt.md](Erledigt.md).

---

## 9. Darstellung und Bedienung

- [ ] 9.2a Falls die gefilterte Karte auf Dauer nicht überzeugt: echte dunkle Kacheln einbinden (etwa CARTO Dark Matter). Das bringt bessere Lesbarkeit, aber einen weiteren Anbieter, dessen Nutzungsbedingungen und Attribution zu prüfen wären.
- [ ] 9.9 Mit echten Hilfsmitteln testen, nicht nur mit Prüfwerkzeugen (NVDA oder VoiceOver, Tastatur, Vergrößerung)

---

## 10. Datenschutz und Recht

**10.2 (Impressum und Datenschutzerklärung) ist seit dem 2026-10-19 gebaut** –
siehe [Erledigt.md](Erledigt.md). Zwei Dinge bleiben, die nicht daran hängen:

- [!] 10.2a **Die Betreiberangaben fehlen noch auf dem Server.** Beide Seiten
  stehen, zeigen aber einen Hinweis statt deiner Daten, solange
  `WHEELEE_OPERATOR_NAME`, `WHEELEE_OPERATOR_ADDRESS` und
  `WHEELEE_OPERATOR_EMAIL` nicht in der `.env` auf dem NAS stehen. Vorlage:
  [deploy/env.beispiel](deploy/env.beispiel). **Das ist der Punkt, an dem
  die Pflicht wirklich erfüllt ist** – bis dahin ist nur die Technik
  fertig. Gebraucht werden Name, ladungsfähige Anschrift und eine
  Kontaktadresse.
- [ ] 10.2b **Einmal rechtlich ansehen lassen.** Die Texte beschreiben die
      Verarbeitung wahrheitsgemäß und aus dem Code belegt. Ob die Einordnung
      trägt – vor allem die genannten Rechtsgrundlagen und die Einstufung als
      „geschäftsmäßig" nach § 5 DDG –, kann ich nicht beurteilen, und eine
      selbstbewusst formulierte Falschauskunft wäre schlechter als eine
      offene Frage.
- [~] 10.3 Lizenz- und Attributionshinweise. ODbL-Nennung und Quellenangabe je Stadt sind fertig (siehe [Erledigt.md](Erledigt.md)). Was fehlt, ist die Lizenz der 15 amtlichen Quellen, die keine angeben – **das ist 2a.5 und wird dort geführt**, nicht hier. (Bis zum 2026-10-19 stand es an beiden Stellen als eigener Haken: eine Arbeit, zwei Kästchen, und beim Erledigen wäre nur eines davon nachgeführt worden.)

- [~] 10.5 **Datenschutz- und Sicherheitsprüfung.** Am 2026-10-17 durchgeführt;
  Befund, Behebung und die Liste der geprüften Punkte **ohne** Befund stehen in
  [Erledigt.md](Erledigt.md). Geschlossen wurden die fehlenden
  Sicherheits-Kopfzeilen (es gab keine einzige) und die unbegrenzte
  Aufbewahrung von Rückmeldungen und Sitzungen (17.5). Offen bleibt daraus:

  - [ ] **Die Inhaltsrichtlinie führt `'unsafe-inline'` bei den Skripten** und
        ist damit kein Schutz vor eingeschleustem Code in der eigenen Seite.
        Next schreibt die Hydrationsdaten inline, und das Theme-Skript muss vor
        dem ersten Zeichnen laufen. Der saubere Weg ist eine **Nonce je
        Anfrage**, erzeugt in einer Middleware und an beide Stellen
        durchgereicht. Das ist Apparat, den die App bisher nicht hat – deshalb
        als eigener Punkt und nicht nebenbei.
  - [ ] **Kein „Passwort ändern" und keine Sitzungsübersicht.** Wer vermutet,
        dass sein Passwort bekannt ist, kann derzeit nichts tun außer sich
        abzumelden – und das beendet nur die eine Sitzung. Nötig wäre beides
        zusammen: Passwort ändern **und** dabei alle übrigen Sitzungen des
        Kontos verwerfen. Hängt nicht an 11.1 (Magic Link), sondern ist davon
        unabhängig.
  - [ ] **Kein Konto-Löschen und keine Auskunft** – das ist 11.7 und steht
        dort; hier nur als Querverweis, damit die Sicherheitsprüfung nicht
        vollständig aussieht, solange das fehlt.

---

## 11. Benutzerkonten

Laut Konzept bewusst nicht im ersten Umfang. Für später vorgemerkt, weil mehrere
spätere Funktionen daran hängen.

**Entschieden (2026-10-09):** Konten werden gebraucht, weil Downvotes sie
voraussetzen (siehe Abschnitt 8). Sie sind damit kein „vielleicht später" mehr,
sondern Voraussetzung für einen Teil der Kernfunktion.

**Gebaut am 2026-10-11:** Registrierung, Anmeldung und Sitzung (11.1) sowie
die Festlegung, dass die App ohne Konto vollständig benutzbar bleibt (11.2) –
beides mit Begründung in [Erledigt.md](Erledigt.md).

- [~] 11.1 Anmeldung **ohne Passwort** (Magic Link oder Passkey) bleibt offen. Gebaut ist E-Mail und Passwort (scrypt); ein Magic Link setzt einen Mailversand voraus, über den noch nicht entschieden ist – siehe Abschnitt 7 von [wheelee-infrastruktur.md](wheelee-infrastruktur.md). Dazu gehört auch „Passwort vergessen", das aus demselben Grund fehlt.
- [ ] 11.3a Die Wahl der Karten-App (erledigt, siehe [Erledigt.md](Erledigt.md)) liegt im Browser-Speicher und gilt damit nur je Gerät. Sobald es Konten gibt, zusätzlich dort ablegen.
- [ ] 11.4 Eigene Bewertungen einsehen und zurückziehen
- [ ] 11.5 Gespeicherte Parkplätze (Favoriten) – häufig angefahrene Ziele
- [ ] 11.6 Vertrauensstufen: Wer wiederholt zutreffend meldet, bekommt mehr Gewicht in der Validierung
- [ ] 11.7 Datenschutz: Datensparsamkeit, Löschfunktion, Auskunft nach DSGVO

---

## 12. Qualität und Deployment

- [ ] 12.4 Lighthouse-Prüfung auf Mobil (Leistung und Barrierefreiheit)
- [~] 12.5 Deployment. Die App läuft seit dem 2026-10-11 im Container auf dem NAS, **nicht auf Vercel** (siehe [wheelee-infrastruktur.md](wheelee-infrastruktur.md)); `Dockerfile`, `docker-compose.yml`, `deploy/env.beispiel` und die Umgebungsvariablen in der [README](README.md#konten-und-rückmeldungen) stehen. Offen ist nur noch der automatische Weg: Webhook oder systemd-Timer – Variante A oder B aus Abschnitt 6 des Briefings ist noch nicht entschieden.
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
  - Das Rückmeldeformular (Abschnitt 17) ist Oberfläche wie jede andere – die beiden Auswahlknöpfe „Fehler melden" und „Verbesserungsvorschlag" ebenso. Die **gespeicherten** Meldungen bleiben in der Sprache, in der sie geschrieben wurden; die Übersichtsseite für Administratoren braucht keine Übersetzung.
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

## 17. Rückmeldungen: Fehler melden und Vorschläge

**Gebaut am 2026-10-11, bis auf das Aufräumen.** Rückmeldungen laufen **nicht
über E-Mail**, sondern in eine eigene Tabelle; Administratoren sehen sie als
Reiter in der App. Wer Administrator ist, steht in `ADMIN_EMAILS` (17.0).

**Erledigt und mit Begründung in [Erledigt.md](Erledigt.md):** 17.0
(Administrator über die Umgebung), 17.1 (Tabelle `feedback`), 17.2
(`POST /api/feedback` mit Prüfung und Drosselung), 17.3 (Formular statt
`mailto:`, damit ist `FEEDBACK_EMAIL` entfallen) und 17.4 (Übersicht für
Administratoren, serverseitig geprüft, mit E2E-Test auf 401). Dort steht auch,
warum E-Mail der falsche Weg war und warum die freiwillige Rückmeldeadresse
die eine bewusste Abweichung von 17.1 ist.

**17.5 (Aufräumen nach Frist) ist seit dem 2026-10-17 gebaut** – siehe
[Erledigt.md](Erledigt.md). Daraus ergab sich ein neuer Punkt:

- [ ] 17.6 **Die Adresse an einer ewig offenen Meldung bleibt ewig stehen.**
      17.5 löscht nur **erledigte** Meldungen, und das ist richtig so: Eine
      Meldung, die niemand bearbeitet hat, ist nicht erledigt, sondern liegen
      geblieben; sie nach einer Frist zu löschen hieße, einen Hinweis auf einen
      womöglich falschen Parkplatz zu verlieren, weil sich niemand darum
      gekümmert hat.

      Damit bleibt aber eine freiwillig angegebene Antwortadresse unbegrenzt
      gespeichert, wenn die Meldung nie bearbeitet wird – und das widerspricht
      der Zusage im Formular (`CONTACT_PRIVACY`) ebenso wie Abschnitt 10.

      **Nicht einfach dieselbe Frist darüberlegen.** Zu entscheiden wäre, was
      genau geschieht: nur die **Adresse** entfernen und den Meldungstext
      stehen lassen (dann bleibt der Hinweis erhalten, die Antwort wird
      unmöglich), oder offene Meldungen nach längerer Frist auf „verworfen"
      setzen (dann greift 17.5, aber eine Maschine entscheidet über einen
      Hinweis). Der erste Weg ist der naheliegende; er braucht aber eine
      zweite Frist und einen Hinweis in der Übersicht, warum dort plötzlich
      keine Adresse mehr steht.

---

## Bestätigter Stack (D-01, 2026-10-08; Datenbank und Hosting berichtigt 2026-10-11)

| Bereich     | Technologie                                                 |
| ----------- | ----------------------------------------------------------- |
| Framework   | Next.js 15.5 (App Router), React 19.1, TypeScript           |
| Styling     | Tailwind CSS 4                                              |
| Karte       | Leaflet 1.9 + react-leaflet 5, `leaflet.markercluster`, OSM |
| Datenbank   | SQLite über `node:sqlite` (D-02, 2026-10-11)                |
| Datenimport | tsx-Skripte: WFS, ArcGIS, GeoJSON, CSV, Overpass, Nominatim |
| Tests       | Vitest 5                                                    |
| Hosting     | Docker auf dem eigenen NAS, hinter Tailscale – nicht Vercel |

---

## Notizen zur Datenlage

- **209 Städte, 18.072 Standorte** (Stand 2026-10-10). 23 davon aus amtlicher Quelle, der Rest aus OpenStreetMap. Die laufenden Zahlen stehen in [data/\_validierung.md](data/_validierung.md) und [data/\_abdeckung.md](data/_abdeckung.md) – **dort nachsehen, nicht hier**: Diese Zeile stand monatelang auf „84 Städte, 13.463 Standorte", lange nachdem es dreimal so viele waren.
- Die beiden Quellenarten sind nicht vergleichbar: amtliche Listen führen einzelne Stellplätze am Straßenrand, OpenStreetMap überwiegend Parkplätze mit ausgewiesenen Behindertenstellplätzen. Die Oberfläche sagt das, und so muss es bleiben.
- Vier Fehlerklassen sind beim Import aufgetreten und werden jetzt abgefangen; alle vier hätten Daten erzeugt, die beim Draufschauen richtig aussehen:
  - **Falsche UTM-Zone.** Dresdens Dienst liefert Zone 33. Als Zone 32 gedeutet ergaben sich Koordinaten bei 7,7° Ost – mitten in Deutschland, aber 450 km daneben.
  - **Stadtname als Teilstring.** „Essen" steckt in „Hessen"; Essen bekam dadurch den Frankfurter Datensatz.
  - **Leere Antwort als Ergebnis.** Overpass meldet Überlast teils mit HTTP 200 und leerer Liste.
  - **Themenfremde Treffer.** Die Suche schlug für Hamburg Werkstätten und Tagesförderstätten vor; der richtige Datensatz heißt „Behindertenstellplätze".
- Die Lehre daraus steckt in Abschnitt 3: Plausibilität je Datenpunkt reicht nicht, es braucht den Abgleich mit einer unabhängigen Quelle und Kennzahlen über die ganze Stadt.
