# ToDos – wheelee

**Hier steht nur, was offen ist.** Alles Fertige steht mit seiner Begründung in
[Erledigt.md](Erledigt.md); wie gepflegt wird, steht in
[CLAUDE.md](CLAUDE.md#aufgabenliste-pflegen). Fachliche Grundlage:
[Konzept.md](Konzept.md). Datenarbeit: [Datenpflege.md](Datenpflege.md).

**Legende:** `[ ]` offen · `[~]` teils gebaut, Rest hier · `[!]` braucht eine
Entscheidung oder Angabe von dir · `[-]` gesperrt bis zur Freigabe

**Letzte Aktualisierung:** 2026-10-21

**Stand (nachgezählt 2026-10-21):** 33 offen, 5 teils gebaut, 9 warten auf
dich, 1 gesperrte Zeile (Abschnitt 13, darin drei Punkte). Fertig an diesem
Tag: 12.6 (Protokoll und Fehlerseiten), 12.4 (Lighthouse) mit 9.17 und 12.10
daraus, 17.6 (Antwortadresse an offenen Meldungen) und 11.3a (Karten-App am
Konto). Neu dazu: 9.16, dein gemeldeter Anzeigefehler. Nachzählen statt
fortschreiben:

```bash
node -e "const t=require('fs').readFileSync('ToDos.md','utf8').split('\n').filter(x=>/^- \[(.)\]/.test(x)); console.log('gesamt',t.length); for(const m of [' ','~','!','-']) console.log(m, t.filter(x=>x.startsWith('- ['+m+']')).length);"
```

**Zahlen zum Bestand nicht hier nachlesen, sondern in
[data/\_abdeckung.md](data/_abdeckung.md) und
[data/\_import-status.md](data/_import-status.md)** – hier veralten sie still
und werden trotzdem geglaubt.

---

## Vor dem Anfangen

Zwei Befehle, keine Netzabfrage, zusammen unter einer Minute. Weicht etwas ab,
**das zuerst klären** – besonders ein Slug, der nicht mehr passt: Er verwaist
eine Seed-Datei lautlos.

```bash
npm run test && npm run typecheck && npm run lint
npm run check:slugs
```

Erwartet: 334 Unit-Tests grün ·
`Verzeichnis: 10.754 Gemeinden · davon an der Reihe: 204 · Seed-Dateien: 209`
· „✅ Register und Seed-Dateien stimmen überein".

Vor dem ersten landesweiten Lauf einmal `npm run import:grenzen` (lädt 66 MB
vom BKG, die nicht im Repository liegen; erwartet `10.956 Flächen` und
`17.801 von 18.072 Standorten (98.50 %)`).

---

## Reihenfolge

**Vorgabe vom 2026-10-17, unverändert gültig: kein weiterer Datenimport,
solange inhaltliche Punkte offen sind** – auch nicht nebenbei. Der Import
lässt sich beliebig lange fortsetzen und ist nie „fertig"; die inhaltlichen
Punkte sind endlich und halten die Veröffentlichung auf.

Abgearbeitet wird von oben. Ein Punkt wird erst angefangen, wenn der darüber
abgeschlossen ist.

| #   | Was                                                                  | Warum hier                                               |
| --- | -------------------------------------------------------------------- | -------------------------------------------------------- |
| 1   | **12.5a** aktuellen Stand ausliefern                                 | Alles seit dem 2026-10-11 Gebaute steht nicht im Netz    |
| 2   | **9.16** Hinweisstreifen am Kartenrand                               | Gemeldet, klein, und der zweite Teil braucht dich        |
| 3   | **15.2** Texte aus dem Quelltext lösen                               | **Vor** jeder weiteren Oberflächenarbeit – sonst zweimal |
| 4   | **10.7 / 11.7** Nonce-CSP, Passwort ändern, DSGVO                    | Sorgfalt, kein akutes Risiko                             |
| 5   | **16.1** Parkplatzdaten einer Stadt vorab laden                      | Klein, rechtlich unbedenklich, sofort nützlich           |
| 6   | **11.4 / 11.5 / 11.6** Konto-Komfort                                 | Niemand ist darauf angewiesen                            |
| 7   | **9.2a / 9.9 / 12.7a** Darstellung, Hilfsmitteltest                  | 9.9 braucht echte Geräte                                 |
| 8   | **15.1 / 15.3 / 15.4 / 15.5** Englisch, Spanisch, dann weitere       | Erst wenn die deutschen Texte stehen – sonst zweimal     |
| 9   | **1.8 / 4.5 / 12.5** Aufräumen, Automatisierung                      | Der automatische Deploy, nachdem 12.5a von Hand lief     |
| 10  | **2c.3 / 2c.4 / 2d.9** Anfragen an Städte, OSM ergänzen              | Briefe und Kartierung – läuft nebenher                   |
| 11  | **Datenarbeit** 3.10, 3.2, 3.3, 3.4, 2d.8a, 2a.5, 2e.6, 2e.10, 2e.11 | Fällt unter die Vorgabe oben                             |
| 12  | **14.1–14.9** Abschlusstest                                          | Zuletzt, auf echten Geräten, in den Sprachen von 15      |

**Warum Abschnitt 15 an zwei Stellen steht, und das ist der Kern der
Einordnung:** `15.2` ist eine Umbauarbeit (Beschriftungen aus den Komponenten
in Dateien) und macht jede spätere Oberflächenänderung billiger – **danach**
kommen neue Knöpfe gleich in die Übersetzungsdatei. Die Sprachen selbst
(`15.1`) stehen dagegen hinter den restlichen deutschen Funktionen: Wer vorher
übersetzt, übersetzt alles noch einmal, was 11.4 bis 11.6 und 9.2a hinzufügen.

**3.10 ist der Lauf, der aus dem gebauten Kreuzvergleich Nutzen macht** –
abgeglichen ist bislang eine Stadt; er steht unter Platz 11, weil er über den
ganzen Bestand läuft.

**Außer der Reihe, weil es nicht an mir liegt:** 16.2 (Kartenkacheln vorab –
Lizenzfrage), dazu alles unter „Entscheidungen".

---

## 0. Entscheidungen und Angaben, die bei dir liegen

- [!] **D-05 Parkplätze ohne Koordinaten.** Empfehlung: als „Position ungenau" kennzeichnen und nur in der Liste führen, nicht auf den Stadtteil-Mittelpunkt setzen. Faktisch gelöst – alle 18.072 Standorte haben Koordinaten.
- [!] **D-07 Importgrenze senken? (= 2e.5)** `MIN_POPULATION` in `scripts/import/german-cities.mts`. Die Stufe „ab 50.000" ist fertig (195 Gemeinden); die nächstgrößere offene wäre Cuxhaven mit 49.697. Nachgezählt am 2026-10-20: ab 40.000 sind es 285 Gemeinden, ab 20.000 706, ab 10.000 1.598, ab 5.000 2.943. Beide Importwege erzeugen seit 2e.7 richtige Daten; der einzige Einwand ist die Last auf Overpass (siehe 2e.11). Ein Versuch wurde am 2026-10-10 zurückgenommen – 473 Gemeinden wieder entfernt, Grund seit 2e.7 behoben.
- [!] **10.2a Betreiberangaben für das Impressum.** `WHEELEE_OPERATOR_NAME`, `_ADDRESS`, `_EMAIL` in die `.env` auf dem NAS, Vorlage [deploy/env.beispiel](deploy/env.beispiel). Gebraucht werden Name, ladungsfähige Anschrift, Kontaktadresse. **Erst mit 12.5a zusammen ist die Pflicht erfüllt** – einzeln keines von beiden.
- [!] **10.2b Rechtstexte fachlich ansehen lassen.** Ob die Rechtsgrundlagen und die Einstufung nach § 5 DDG tragen, kann ich nicht beurteilen.
- [!] **1.7 Commits und Branch-Strategie** – blockiert: `git` ist auf diesem Rechner nicht im PATH.
- [!] **11.1 Anmeldung ohne Passwort** (Magic Link oder Passkey) und „Passwort vergessen". Gebaut ist E-Mail und Passwort (scrypt); beides setzt einen Mailversand voraus, über den noch nicht entschieden ist – siehe [wheelee-infrastruktur.md](wheelee-infrastruktur.md) Abschnitt 7.

---

## 1. Projekt-Setup

- [ ] 1.8 **Audit-Findings: Next 16 ist da, das Upgrade behebt sie** (nachgesehen 2026-10-21). Unverändert zwei Wurzeln: `postcss` über `next` und `braces` über `eslint-config-next`. Hier läuft 15.5.27 mit `postcss 8.4.31`, Next **16.4.2** bringt `8.5.23`; `braces` hängt ohnehin nur am Linter und damit an der Entwicklung, nicht am Ausgelieferten. **Empfehlung: erst nach 12.5a.** Einen Sprung über eine Hauptversion zu machen, während der ausgelieferte Stand ein halbes Jahr alt ist, hieße zwei Fehlerquellen auf einmal – erst soll das Gebaute im Netz stehen, dann wird der Unterbau gehoben.

## 2. Datenquellen und Import

- [~] 2a.5 **Lizenz je Stadt: 13 der 23 amtlichen Quellen nennen keine** (nachgezählt 2026-10-20; hier stand „15") – darunter Hamburg, Köln, Dresden, Berlin, Düsseldorf, also die größten Bestände. In der Oberfläche steht „Lizenz nicht angegeben", was ehrlich, aber für eine veröffentlichte App zu wenig ist. Die Lizenz steht meist auf dem Portal der Stadt, nur nicht im GovData-Metadatum; je Stadt nachschlagen und in `data/<stadt>.overrides.json` festhalten. (Datenmodell und Anzeige sind fertig; **10.3 wird hier geführt**, nicht doppelt.)
- [ ] 2c.3 Idstein und Weißenhorn: bei den Stadtverwaltungen nach einer amtlichen Liste fragen – die deutlich bessere Quelle.
- [ ] 2c.4 Fehlende Parkplätze in OpenStreetMap nachtragen; davon profitieren auch alle anderen Nutzungen.
- [ ] 2d.8a **Acht Städte mit ungenutzter amtlicher Quelle ansehen, fünf lohnen.** `npm run sources:check` findet sie von selbst. Bei Kiel, Krefeld und Aachen ist die Ablehnung richtig (Anwohnerparken); bei Bochum, Bielefeld, Karlsruhe, Norderstedt und Viersen lohnt der Blick aufs Stadtportal. Der Gewinn wäre spürbar: Düsseldorf kam von 171 OSM-Standorten auf 340 amtliche.
- [ ] 2d.9 **Regensburg: 156.000 Einwohner, kein einziger erfasster Platz.** Die Abfrage lief sauber durch und war leer – eine Lücke in OpenStreetMap, nicht in der Wirklichkeit. Anfrage bei der Straßenverkehrsbehörde, Nachtragen in OSM.
- [ ] 2e.6 **Restliche Gemeinden aus OpenStreetMap.** Der Importer kann es, die Liste steht (`data/_import-status.md`: 10.550 „noch nicht geprüft"), die Zuordnung stimmt seit 2e.7. Es fehlt nur noch ein Bezugsweg, der einen Gemeinschaftsdienst nicht überlastet – das ist 2e.11.
- [~] 2e.10 **Gemeinden ohne eigene Entscheidung kennzeichnen.** Rund ein Fünftel gehört zu Verbands-, Samt- oder Verwaltungsgemeinschaften; deren Straßenverkehrsbehörde sitzt beim Verband, und eine Anfrage an die Gemeinde läuft ins Leere. `data/_gemeinden.json` weiß es nicht – `art` kennt nur `Gemeinde`, `Stadt`, `Gemeindefreies Gebiet`, und `gemeinden.mts` liest nur Ebene 6 und 2 von VG250. Zuerst nachsehen, ob die Ebene im Datensatz enthalten ist. **Nicht raten:** Eine falsch als verbandsangehörig geführte Gemeinde schickt die Anfrage an die falsche Stelle, und die Antwort bleibt aus, ohne dass jemand den Grund erfährt.
- [ ] 2e.11 **Massendaten ohne Overpass holen.** Overpass ist ein Abfragedienst von Freiwilligen und antwortet unter Last mit 500/504 – oder, schlimmer, mit 200 und leerer Liste; beides ist hier eingetreten (am 2026-10-11 für NRW: 7 Objekte statt 14.025). Für 10.754 Gemeinden das falsche Werkzeug, auch gebündelt je Bundesland. Vorgesehener Weg sind die **Bundesland-Auszüge von Geofabrik** (`.osm.pbf`, ODbL, täglich, für Automatisierung gedacht): ein Download-Server ist für Massenbezug da, ein Abfragedienst nicht.
  - [ ] Aufwand ehrlich benennen: PBF ist Protocol Buffers mit zlib-Blöcken und delta-kodierten Knoten – deutlich mehr als der Shapefile-Leser. Dafür löst es die Abhängigkeit vom Gemeinschaftsdienst vollständig auf.
  - [ ] Zwischenstufe, falls PBF zu viel ist: `npm run import:osm-state` beibehalten, aber mit Pausen über die 16 Länder verteilt – 32 Abfragen für ganz Deutschland statt 10.754, und das ist vertretbar.

## 3. Datenvalidierung

- [~] 3.2 **Landesweite Sammeldatensätze.** Karlsruhe ist eingebunden, NRW und BW sind ergebnislos geprüft. Offen:
  - [ ] Den Karlsruher Datensatz zum **Gegenprüfen** nutzen: für Karlsruhe und Baden-Baden liegen zwei unabhängige Quellen vor – Material für 3.1.
  - [ ] Weitere Landesportale ansehen: Open Data Hessen, daten.berlin.de, Geodatenportal Bayern, Transparenzportal Hamburg.
- [ ] 3.3 **Straßenabgleich:** nennt die Rückwärtssuche bei der Koordinate dieselbe Straße wie die Quelle? Kein Beweis für einen Fehler, aber ein guter Filter. Für Frankfurt gibt es das schon, für alle anderen nicht.
- [ ] 3.4 **Abstand zur nächsten Straße.** Ein Behindertenparkplatz liegt am Straßenrand; Punkte über 25 m von jeder Straße sind fast immer falsch verortet. Eine Overpass-Abfrage je Stadt.
- [ ] 3.10 **Den Kreuzvergleich über alle 23 amtlichen Städte laufen lassen.** Code und Anzeige stehen seit 3.1/3.7; abgeglichen ist bislang **eine** Stadt (Germersheim), weil Overpass am 2026-10-20 unter Last stand. Also `npm run validate` **mit** Netz, dann zweierlei ansehen: die Ausreißer nach unten (versetzte amtliche Koordinate oder dünne OSM-Erfassung – das unterscheidet nur die Stichprobe) und die Gruppe **„nur OSM"**, also Stellplätze, die der amtlichen Liste fehlen. Für Germersheim sind das 11 bei 6 amtlichen Standorten.

## 4. Datenaktualität

- [ ] 4.5 Monatliche Änderungsprüfung automatisieren, sobald die App läuft – GitHub-Actions-Lauf, der bei Änderungen einen Pull Request öffnet. So bleibt die Entscheidung bei einem Menschen. `purgeExpired` (17.5) gehört dann hier hinein.

## 9. Darstellung und Bedienung

- [ ] 9.2a Falls die gefilterte Karte auf Dauer nicht überzeugt: echte dunkle Kacheln (etwa CARTO Dark Matter). Bessere Lesbarkeit, aber ein weiterer Anbieter, dessen Bedingungen und Attribution zu prüfen wären.
- [!] 9.16 **Der Hinweis am Kartenrand hilft im Weitwinkel nicht** (gemeldet 2026-10-21). Die Darstellung ist berichtigt (siehe `Erledigt.md`); offen bleibt der Inhalt: Bei kontinentaler Zoomstufe ist „näher heranzoomen" wahr, aber nutzlos – es wären ein Dutzend Stufen, und im Ausschnitt liegt überwiegend Ausland ohne Daten. **Deine Entscheidung:** ab welcher Zoomstufe der Hinweis erscheint – und ob darunter stattdessen ein Satz steht, der sagt, dass erst ab Stadtgröße etwas zu sehen ist.
- [ ] 9.9 Mit echten Hilfsmitteln testen, nicht nur mit Prüfwerkzeugen: NVDA oder VoiceOver, Tastatur, Vergrößerung.

## 10. Datenschutz und Recht

- [~] 10.7 **Aus der Sicherheitsprüfung vom 2026-10-17 bleibt offen** (bis zum 2026-10-20 als 10.5 geführt – doppelt belegt mit dem Haftungshinweis):
  - [ ] **Die CSP führt `'unsafe-inline'` bei den Skripten** und ist damit kein Schutz vor eingeschleustem Code in der eigenen Seite. Next schreibt die Hydrationsdaten inline, und das Theme-Skript muss vor dem ersten Zeichnen laufen. Der saubere Weg ist eine **Nonce je Anfrage** aus einer Middleware, an beide Stellen durchgereicht – Apparat, den die App nicht hat, deshalb ein eigener Punkt.
  - [ ] **Kein „Passwort ändern" und keine Sitzungsübersicht.** Wer vermutet, dass sein Passwort bekannt ist, kann nur sich abmelden – und das beendet eine Sitzung. Nötig ist beides zusammen: Passwort ändern **und** alle übrigen Sitzungen verwerfen. Hängt nicht an 11.1.

## 11. Benutzerkonten

- [ ] 11.4 Eigene Bewertungen einsehen und zurückziehen.
- [ ] 11.5 Gespeicherte Parkplätze (Favoriten) für häufig angefahrene Ziele.
- [ ] 11.6 Vertrauensstufen: wer wiederholt zutreffend meldet, bekommt mehr Gewicht in der Validierung. Baut auf den Bewertungen auf.
- [ ] 11.7 **Datensparsamkeit, Löschfunktion, Auskunft nach DSGVO.** Konto und Daten lassen sich derzeit nicht in der App löschen; die Datenschutzerklärung sagt das offen und nennt den Weg über eine formlose Nachricht. Solange das fehlt, ist auch die Sicherheitsprüfung (10.7) nicht vollständig.

## 12. Qualität und Deployment

- [!] 12.5a **Den aktuellen Stand ausliefern – Platz 1.** Die Seite läuft auf einem Stand von vor dem 2026-10-11: Konten, Rückmeldungen, Bewertungen, Rechtstexte und Sicherheits-Kopfzeilen antworten dort mit 404 (gemessen 2026-10-19, Befund in [Erledigt.md](Erledigt.md)). **Die Rechtspflicht aus 10.2 ist dadurch unerfüllt, obwohl die Seiten gebaut sind.** Zu tun: einmaliger Deploy von Hand – `git pull` und `docker compose up -d --build` in `/opt/wheelee`, danach die drei Variablen aus 10.2a in die `.env`; beim ersten Start legt die Migration die Tabellen an. **Das kann weder ich noch Torsten:** kein SSH-Zugang zum NAS, kein NPM-Zugang. Es braucht Niklas – oder einen eigenen Benutzer auf dem NAS mit Rechten nur auf `/opt/wheelee`.
- [~] 12.5 **Deploy automatisieren.** `Dockerfile`, `docker-compose.yml` und `deploy/env.beispiel` stehen. Offen ist, wie neue Commits auf das NAS kommen: Webhook oder systemd-Timer, Variante A oder B aus Abschnitt 6 von [wheelee-infrastruktur.md](wheelee-infrastruktur.md). **Dass dieser Punkt offen ist, hat 12.5a verursacht:** Ohne automatischen Weg hängt jeder Deploy daran, dass jemand daran denkt – und acht Tage lang hat niemand daran gedacht.
- [ ] 12.7a Symbol gestalterisch überarbeiten – funktional, aber von mir gezeichnet.

## 15. Mehrsprachigkeit

**Freigegeben am 2026-10-20.** Wer einen blauen Parkausweis hat, hat ihn
EU-weit; wer aus Frankreich oder Spanien anreist, steht vor derselben Frage
ohne Deutsch. **Wie übersetzt wird, ist als D-08 entschieden** (Dateien je
Sprache, maschinell vorübersetzt, von Menschen geprüft, mit Ausnahmeliste) –
Begründung in [Erledigt.md](Erledigt.md), ebenso die übrigen Erwägungen.

- [ ] 15.2 **Zuerst die Struktur: Beschriftungen aus den Komponenten in eine Datei je Sprache**, dazu ein schlanker Zugriff – die App ist klein genug, dass es keine große Bibliothek braucht. Ohne diesen Schritt ist jede Übersetzung eine Suche durch den Quelltext. Steht auf Platz 3, **vor** jeder weiteren Oberflächenarbeit.
- [ ] 15.1 **Englisch und Spanisch zuerst** (Vorgabe vom 2026-10-20), danach die häufigsten europäischen Sprachen – vorgesehen: Französisch, Italienisch, Polnisch, Niederländisch.
  - [ ] **Eine Frage dazu bleibt offen und gehört dir:** Für Menschen, die **in** Deutschland leben und besser eine andere Sprache sprechen, wären Türkisch, Russisch und Arabisch die größeren Gruppen – eine andere Zielgruppe als die EU-Reisenden. Arabisch bringt zusätzlich Rechts-nach-links-Layout mit, und das ist Umbau an jeder Ansicht, nicht eine weitere Datei.
- [ ] 15.3 **Was dabei übersehen wird, weil es nicht nach Text aussieht:** `<html lang>` steuert Silbentrennung **und** die Aussprache im Screenreader; Datums- und Zahlenformate hängen an `de-DE` (`toLocaleDateString`, `toLocaleString`), ebenso die Sortierung der Städteliste (`localeCompare`); die Entfernung schreibt „1,5 km" mit Komma, englisch mit Punkt. **Das ist der Teil, der beim Übersetzen vergessen wird** – deshalb ein eigener Punkt.
- [ ] 15.4 **Die Daten bleiben deutsch, und das ist richtig so.** Straßennamen werden nicht übersetzt – wer „Bahnhofstraße" sucht, muss „Bahnhofstraße" lesen. Zeitangaben stehen teils als deutscher Freitext in den Quellen; sie werden **je Sprache ausgegeben, nicht je Sprache neu geparst** (`opening-hours.ts`). Der Haftungshinweis und die Rechtstexte stehen auf der Ausnahmeliste aus D-08: nie maschinell.
- [ ] 15.5 **Spracherkennung mit Umschalter**, nicht ohne: Die Browsersprache ist ein guter erster Vorschlag, aber wer ein englisches Betriebssystem auf einem deutschen Telefon hat, will die Wahl behalten – in die Einstellungen, neben Darstellung und Karten-App.

## 16. Eine Stadt vorab herunterladen

**Freigegeben am 2026-10-20.** Der Service Worker hält bisher nur vor, was man
ohnehin angesehen hat (12.8/12.9). Dieser Abschnitt geht weiter: eine Stadt
bewusst vorab laden, damit sie unterwegs vollständig verfügbar ist – im
Parkhaus, in der Tiefgarage, im Funkloch kurz vor dem Ziel. **Geteilt in zwei
Punkte, weil der eine gebaut werden kann und der andere auf eine Lizenz
wartet.**

- [ ] 16.1 **Die Parkplatzdaten einer Stadt vorab laden.** Klein (Köln rund 200 KB), rechtlich unbedenklich, sofort nützlich – ohne Kacheln bleibt eine Liste ohne Karte, das ist weniger, aber vielleicht genug. Dazu gehört zweierlei: **der belegte Platz muss sichtbar sein und sich löschen lassen** (eine App, die unbemerkt 200 MB belegt, fliegt vom Telefon), und **das Alter der mitgenommenen Daten muss dastehen** – ein drei Monate alter Stand, der sich als aktuell ausgibt, wäre schlimmer als keiner.
- [!] 16.2 **Die Kartenkacheln vorab laden – wartet auf die Lizenzfrage.** Die Nutzungsbedingungen von OpenStreetMap untersagen massenhaftes Herunterladen; ein Stadtgebiet in brauchbarer Zoomstufe geht in die Dutzende Megabyte. Es bräuchte eine ausdrückliche Erlaubnis, einen bezahlten Kachelanbieter oder Vektorkacheln aus eigener Quelle. **Das ist die eigentliche Hürde, nicht die Technik** – und sie liegt nicht bei mir. (Vorher 16.1, geteilt am 2026-10-20.)

---

## 14. Abschlusstest

**Erst wenn alles übrige erledigt ist.** Ein vollständiger Durchgang von Hand,
auf echten Geräten – nicht als Ersatz für die automatischen Tests, sondern als
letzter Blick, ob das Ganze im Alltag funktioniert.

- [ ] 14.1 Alle Funktionen durchspielen: Karte, Standort, nächster Parkplatz, Suche, Detailansicht, Navigation, Bewerten, Dark Mode.
- [ ] 14.2 Alle Zustände der Standortbestimmung: erlaubt, abgelehnt, später erlaubt, Zeitüberschreitung, ungenau, Wechsel während der Nutzung.
- [ ] 14.3 Echte Geräte: iPhone (Safari), Android (Chrome), Desktop; klein, groß, Querformat.
- [ ] 14.4 Schlechte Bedingungen: langsames Netz, Funkloch mitten in der Nutzung, Akkusparmodus, Sonnenlicht auf dem Display.
- [ ] 14.5 Einhändig und im Sitzen, mit Handschuhen, bei 200 % Vergrößerung.
- [ ] 14.6 Mit Screenreader und nur mit Tastatur durch alle Abläufe.
- [ ] 14.7 Stichprobe in der Wirklichkeit: zehn Parkplätze vor Ort prüfen. Kein Test am Schreibtisch ersetzt das.
- [ ] 14.8 Von jemandem testen lassen, der die App wirklich braucht. Deren Urteil wiegt schwerer als jede Prüfliste hier.
- [ ] 14.9 Gefundene Mängel sammeln, bewerten und vor der Veröffentlichung abarbeiten.

---

## Gesperrt bis zu deiner Freigabe

**Nichts hiervon wird gebaut, bevor du es Punkt für Punkt freigibst** – auch
dann nicht, wenn gerade nichts anderes zu tun ist. Die Erwägungen stehen in
[Erledigt.md](Erledigt.md) unter „Erwägungen zu 13, 15 und 16".

**Abschnitt 13 – Finanzierung.** Wer trägt die Kosten, und zu welchem Preis?

- [-] 13.1 Spenden-Knopf · [-] 13.2 Werbebanner (widerspricht 10.4 „keine Tracker") · [-] 13.3 Einwilligungsbanner, falls Werbung kommt

**15 und 16 sind am 2026-10-20 freigegeben** und stehen jetzt als offene Punkte
oben – Mehrsprachigkeit in Abschnitt 15, der Vorab-Download in Abschnitt 16.
