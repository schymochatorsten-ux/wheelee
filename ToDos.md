# ToDos – wheelee

**Hier steht nur, was offen ist.** Alles Fertige steht mit seiner Begründung in
[Erledigt.md](Erledigt.md); wie gepflegt wird, steht in
[CLAUDE.md](CLAUDE.md#aufgabenliste-pflegen). Fachliche Grundlage:
[Konzept.md](Konzept.md). Datenarbeit: [Datenpflege.md](Datenpflege.md).

**Legende:** `[ ]` offen · `[~]` teils gebaut, Rest hier · `[!]` braucht eine
Entscheidung oder Angabe von dir · `[-]` gesperrt bis zur Freigabe

**Letzte Aktualisierung:** 2026-10-20

**Stand (nachgezählt 2026-10-20):** 35 offen, 7 teils gebaut, 7 warten auf
dich, 3 Zeilen gesperrt (darin 9 Punkte aus 13, 15 und 16). Nachzählen statt
fortschreiben:

```bash
node -e "const t=require('fs').readFileSync('ToDos.md','utf8').split('\n').filter(x=>/^- \[(.)\]/.test(x)); console.log('gesamt',t.length); for(const m of [' ','~','!','-']) console.log(m, t.filter(x=>x.startsWith('- ['+m+']')).length);"
```

**Zahlen zum Bestand nicht hier nachlesen, sondern in
[data/\_abdeckung.md](data/_abdeckung.md) und
[data/\_import-status.md](data/_import-status.md)** – die Zeile hier stand
monatelang auf „84 Städte", lange nachdem es dreimal so viele waren.

---

## Vor dem Anfangen

Zwei Befehle, keine Netzabfrage, zusammen unter einer Minute. Weicht etwas ab,
**das zuerst klären** – besonders ein Slug, der nicht mehr passt: Er verwaist
eine Seed-Datei lautlos.

```bash
npm run test && npm run typecheck && npm run lint
npm run check:slugs
```

Erwartet: 305 Unit-Tests grün ·
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

| #   | Was                                                     | Warum hier                                            |
| --- | ------------------------------------------------------- | ----------------------------------------------------- |
| 1   | **12.5a** aktuellen Stand ausliefern                    | Alles seit dem 2026-10-11 Gebaute steht nicht im Netz |
| 2   | **8.8 / 8.9** Bewertungen zu Ende                       | Nützlich erst, wenn jemand die Meldungen sieht        |
| 3   | **3.0i** 174 Standorte ohne Straßennamen                | Eine ganze Stadt ist unbrauchbar (Dormagen 82/82)     |
| 4   | **3.1 / 3.7** Kreuzvergleich, bestätigt anzeigen        | Die Angabe, die vor einer vergeblichen Fahrt schützt  |
| 5   | **12.6 / 12.4** Monitoring, Lighthouse                  | Ab hier Betrieb statt Funktionen                      |
| 6   | **10.5 / 17.6 / 11.7** Nonce-CSP, Passwort, DSGVO       | Sorgfalt, kein akutes Risiko                          |
| 7   | **11.3a / 11.4 / 11.5 / 11.6** Konto-Komfort            | Niemand ist darauf angewiesen                         |
| 8   | **9.2a / 9.9 / 12.7a** Darstellung, Hilfsmitteltest     | 9.9 braucht echte Geräte                              |
| 9   | **1.8 / 4.5 / 12.5** Aufräumen, Automatisierung         | Der automatische Deploy, nachdem 12.5a von Hand lief  |
| 10  | **2c.3 / 2c.4 / 2d.9** Anfragen an Städte, OSM ergänzen | Briefe und Kartierung – läuft nebenher                |
| 11  | **Datenarbeit** 3.2–3.4, 3.10, 2d.8a, 2a.5, 2e.\*       | Fällt unter die Vorgabe oben                          |
| 12  | **14.1–14.9** Abschlusstest                             | Zuletzt, auf echten Geräten und mit Betroffenen       |

**3.1 steht auf Platz 4, obwohl es Overpass befragt:** Der offene Teil ist
Code, es kommt keine Gemeinde hinzu. 3.3, 3.4 und 3.10 sind dagegen echte
Läufe über den ganzen Bestand und stehen unter Platz 11.

---

## 0. Entscheidungen und Angaben, die bei dir liegen

- [!] **D-05 Parkplätze ohne Koordinaten.** Empfehlung: als „Position ungenau" kennzeichnen und nur in der Liste führen, nicht auf den Stadtteil-Mittelpunkt setzen. Faktisch gelöst – alle 18.072 Standorte haben Koordinaten.
- [!] **D-07 Importgrenze senken?** `MIN_POPULATION` in `scripts/import/german-cities.mts`. Die Stufe „ab 50.000" ist fertig (195 Gemeinden); die nächstgrößere offene wäre Cuxhaven mit 49.697. Nachgezählt am 2026-10-20: ab 40.000 sind es 285 Gemeinden, ab 20.000 706, ab 10.000 1.598, ab 5.000 2.943. Beide Importwege erzeugen seit 2e.7 richtige Daten; der einzige Einwand ist die Last auf Overpass (siehe 2e.11).
- [!] **10.2a Betreiberangaben für das Impressum.** `WHEELEE_OPERATOR_NAME`, `_ADDRESS`, `_EMAIL` in die `.env` auf dem NAS, Vorlage [deploy/env.beispiel](deploy/env.beispiel). Gebraucht werden Name, ladungsfähige Anschrift, Kontaktadresse. **Erst mit 12.5a zusammen ist die Pflicht erfüllt** – einzeln keines von beiden.
- [!] **10.2b Rechtstexte fachlich ansehen lassen.** Ob die Rechtsgrundlagen und die Einstufung nach § 5 DDG tragen, kann ich nicht beurteilen.
- [!] **1.7 Commits und Branch-Strategie** – blockiert: `git` ist auf diesem Rechner nicht im PATH.
- [!] **11.1 Anmeldung ohne Passwort** (Magic Link oder Passkey) und „Passwort vergessen". Gebaut ist E-Mail und Passwort (scrypt); beides setzt einen Mailversand voraus, über den noch nicht entschieden ist – siehe [wheelee-infrastruktur.md](wheelee-infrastruktur.md) Abschnitt 7.

---

## 1. Projekt-Setup

- [ ] 1.8 Audit-Findings: `postcss` (über `next`) und `braces` (über `eslint-config-next`) sind nur per Next-16-Upgrade behebbar – bewusst zurückgestellt.

## 2. Datenquellen und Import

- [~] 2a.5 **Lizenz je Stadt: 15 amtliche Quellen nennen keine** – darunter Hamburg, Köln, Dresden, also die größten Bestände. In der Oberfläche steht „Lizenz nicht angegeben", was ehrlich, aber für eine veröffentlichte App zu wenig ist. Die Lizenz steht meist auf dem Portal der Stadt, nur nicht im GovData-Metadatum; je Stadt nachschlagen und in `data/<stadt>.overrides.json` festhalten. (Datenmodell und Anzeige sind fertig; **10.3 wird hier geführt**, nicht doppelt.)
- [ ] 2c.3 Idstein und Weißenhorn: bei den Stadtverwaltungen nach einer amtlichen Liste fragen – die deutlich bessere Quelle.
- [ ] 2c.4 Fehlende Parkplätze in OpenStreetMap nachtragen; davon profitieren auch alle anderen Nutzungen.
- [ ] 2d.8a **Acht Städte mit ungenutzter amtlicher Quelle ansehen, fünf lohnen.** `npm run sources:check` findet sie von selbst. Bei Kiel, Krefeld und Aachen ist die Ablehnung richtig (Anwohnerparken); bei Bochum, Bielefeld, Karlsruhe, Norderstedt und Viersen lohnt der Blick aufs Stadtportal. Der Gewinn wäre spürbar: Düsseldorf kam von 171 OSM-Standorten auf 340 amtliche.
- [ ] 2d.9 **Regensburg: 156.000 Einwohner, kein einziger erfasster Platz.** Die Abfrage lief sauber durch und war leer – eine Lücke in OpenStreetMap, nicht in der Wirklichkeit. Anfrage bei der Straßenverkehrsbehörde, Nachtragen in OSM.
- [~] 2e.5 **Nächste Größenstufe** – hängt an D-07. Einmal versucht und zurückgenommen (2026-10-10, 473 Gemeinden wieder entfernt); der Grund dafür ist seit 2e.7 behoben, Register und Zählung sind bereit. Es bleibt die Last auf Overpass.
- [ ] 2e.6 **Restliche Gemeinden aus OpenStreetMap.** Der Importer kann es, die Liste steht (`data/_import-status.md`: 10.550 „noch nicht geprüft"), die Zuordnung stimmt seit 2e.7. Es fehlt nur noch ein Bezugsweg, der einen Gemeinschaftsdienst nicht überlastet – das ist 2e.11.
- [~] 2e.10 **Gemeinden ohne eigene Entscheidung kennzeichnen.** Rund ein Fünftel gehört zu Verbands-, Samt- oder Verwaltungsgemeinschaften; deren Straßenverkehrsbehörde sitzt beim Verband, und eine Anfrage an die Gemeinde läuft ins Leere. `data/_gemeinden.json` weiß es nicht – `art` kennt nur `Gemeinde`, `Stadt`, `Gemeindefreies Gebiet`, und `gemeinden.mts` liest nur Ebene 6 und 2 von VG250. Zuerst nachsehen, ob die Ebene im Datensatz enthalten ist. **Nicht raten:** Eine falsch als verbandsangehörig geführte Gemeinde schickt die Anfrage an die falsche Stelle, und die Antwort bleibt aus, ohne dass jemand den Grund erfährt.
- [ ] 2e.11 **Massendaten ohne Overpass holen.** Overpass ist ein Abfragedienst von Freiwilligen und antwortet unter Last mit 500/504 – oder, schlimmer, mit 200 und leerer Liste; beides ist hier eingetreten (am 2026-10-11 für NRW: 7 Objekte statt 14.025). Für 10.754 Gemeinden das falsche Werkzeug, auch gebündelt je Bundesland. Vorgesehener Weg sind die **Bundesland-Auszüge von Geofabrik** (`.osm.pbf`, ODbL, täglich, für Automatisierung gedacht): ein Download-Server ist für Massenbezug da, ein Abfragedienst nicht.
  - [ ] Aufwand ehrlich benennen: PBF ist Protocol Buffers mit zlib-Blöcken und delta-kodierten Knoten – deutlich mehr als der Shapefile-Leser. Dafür löst es die Abhängigkeit vom Gemeinschaftsdienst vollständig auf.
  - [ ] Zwischenstufe, falls PBF zu viel ist: `npm run import:osm-state` beibehalten, aber mit Pausen über die 16 Länder verteilt – 32 Abfragen für ganz Deutschland statt 10.754, und das ist vertretbar.

## 3. Datenvalidierung

- [ ] 3.0i **174 von 18.072 Standorten ohne Straßennamen** (1,0 %), verteilt auf 33 Städte – nachgezählt am 2026-10-20. **Dormagen ist der Befund: 82 von 82**, und 75 davon heißen „Behindertenparkplatz Dormagen"; Liste und Detailansicht sind für diese Stadt wertlos. Danach Neumünster 14/97, Euskirchen 13/258, Eschweiler 7/55. Zu tun: `npm run import:streets`, für Dormagen zusätzlich prüfen, ob das Adressfeld der Quelle erkannt wurde (ein Platzhalter bei 75 von 82 deutet auf einen nicht erkannten Spaltennamen, nicht auf fehlende Daten), dann `import:index` und `validate`. Zählbefehl in [Erledigt.md](Erledigt.md) bei 3.0i.
- [~] 3.1 **Kreuzvergleich amtlich gegen OpenStreetMap – die Hälfte steht** (`crossCheckWithOsm` in `validate.mts` paart und schreibt eine Quote). Offen:
  - [ ] **Drei Gruppen statt einer Zahl:** bestätigt, nur amtlich, nur OSM. Derzeit fällt weg, _welche_ es sind.
  - [ ] **Ergebnis je Standort festhalten**, nicht nur je Stadt – sonst kann 3.7 nichts kennzeichnen und der Lauf müsste für jede Anzeige wiederholt werden.
- [~] 3.2 **Landesweite Sammeldatensätze.** Karlsruhe ist eingebunden, NRW und BW sind ergebnislos geprüft. Offen:
  - [ ] Den Karlsruher Datensatz zum **Gegenprüfen** nutzen: für Karlsruhe und Baden-Baden liegen zwei unabhängige Quellen vor – Material für 3.1.
  - [ ] Weitere Landesportale ansehen: Open Data Hessen, daten.berlin.de, Geodatenportal Bayern, Transparenzportal Hamburg.
- [ ] 3.3 **Straßenabgleich:** nennt die Rückwärtssuche bei der Koordinate dieselbe Straße wie die Quelle? Kein Beweis für einen Fehler, aber ein guter Filter. Für Frankfurt gibt es das schon, für alle anderen nicht.
- [ ] 3.4 **Abstand zur nächsten Straße.** Ein Behindertenparkplatz liegt am Straßenrand; Punkte über 25 m von jeder Straße sind fast immer falsch verortet. Eine Overpass-Abfrage je Stadt.
- [ ] 3.7 **Bestätigte Standorte in der Detailansicht kennzeichnen.** Genau die Information, die vor einer vergeblichen Fahrt bewahrt. Setzt 3.1 voraus.
- [ ] 3.10 **Bestätigungsquoten nachgehen – erst wieder welche erzeugen.** In `data/_validierung.md` steht keine einzige: Der Abgleich braucht Netz, und `crossCheckWithOsm` gibt bei leerer OSM-Antwort `null` zurück statt „0 % bestätigt" zu behaupten. Also `npm run validate` **mit** Netz, dann die Ausreißer nach unten ansehen – dort ist entweder die amtliche Koordinate versetzt oder die OSM-Erfassung dünn, und das unterscheidet nur die Stichprobe.

## 4. Datenaktualität

- [ ] 4.5 Monatliche Änderungsprüfung automatisieren, sobald die App läuft – GitHub-Actions-Lauf, der bei Änderungen einen Pull Request öffnet. So bleibt die Entscheidung bei einem Menschen. `purgeExpired` (17.5) gehört dann hier hinein.

## 8. Bewertungen

- [ ] 8.8 **Übersicht gemeldeter Parkplätze für das manuelle Review.** Die Abfrage steht: `spotsReportedGone()` in `src/lib/db/ratings.ts` liefert die Plätze mit mindestens zwei „existiert nicht mehr"-Meldungen, nach Anzahl sortiert. Es fehlt die Ansicht – am ehesten als zweiter Abschnitt im Reiter „Rückmeldungen", der ohnehin nur Administratoren sieht, mit einem Klick auf die Karte wie bei den Meldungen.
- [ ] 8.9 **Bewertungen in die Validierung einbeziehen:** mehrfach als aufgehoben gemeldete Plätze gehören auf die Prüfliste aus Abschnitt 3. `npm run validate` müsste dafür die Datenbank lesen, was es bisher nicht tut.

## 9. Darstellung und Bedienung

- [ ] 9.2a Falls die gefilterte Karte auf Dauer nicht überzeugt: echte dunkle Kacheln (etwa CARTO Dark Matter). Bessere Lesbarkeit, aber ein weiterer Anbieter, dessen Bedingungen und Attribution zu prüfen wären.
- [ ] 9.9 Mit echten Hilfsmitteln testen, nicht nur mit Prüfwerkzeugen: NVDA oder VoiceOver, Tastatur, Vergrößerung.

## 10. Datenschutz und Recht

- [~] 10.5 **Aus der Sicherheitsprüfung vom 2026-10-17 bleibt offen:**
  - [ ] **Die CSP führt `'unsafe-inline'` bei den Skripten** und ist damit kein Schutz vor eingeschleustem Code in der eigenen Seite. Next schreibt die Hydrationsdaten inline, und das Theme-Skript muss vor dem ersten Zeichnen laufen. Der saubere Weg ist eine **Nonce je Anfrage** aus einer Middleware, an beide Stellen durchgereicht – Apparat, den die App nicht hat, deshalb ein eigener Punkt.
  - [ ] **Kein „Passwort ändern" und keine Sitzungsübersicht.** Wer vermutet, dass sein Passwort bekannt ist, kann nur sich abmelden – und das beendet eine Sitzung. Nötig ist beides zusammen: Passwort ändern **und** alle übrigen Sitzungen verwerfen. Hängt nicht an 11.1.

## 11. Benutzerkonten

- [ ] 11.3a Die Wahl der Karten-App liegt im Browser-Speicher und gilt nur je Gerät; jetzt, da es Konten gibt, zusätzlich dort ablegen.
- [ ] 11.4 Eigene Bewertungen einsehen und zurückziehen.
- [ ] 11.5 Gespeicherte Parkplätze (Favoriten) für häufig angefahrene Ziele.
- [ ] 11.6 Vertrauensstufen: wer wiederholt zutreffend meldet, bekommt mehr Gewicht in der Validierung. Baut auf den Bewertungen auf.
- [ ] 11.7 **Datensparsamkeit, Löschfunktion, Auskunft nach DSGVO.** Konto und Daten lassen sich derzeit nicht in der App löschen; die Datenschutzerklärung sagt das offen und nennt den Weg über eine formlose Nachricht. Solange das fehlt, ist auch die Sicherheitsprüfung (10.5) nicht vollständig.

## 12. Qualität und Deployment

- [!] 12.5a **Den aktuellen Stand ausliefern – Platz 1.** Die Seite läuft auf einem Stand von vor dem 2026-10-11: Konten, Rückmeldungen, Bewertungen, Rechtstexte und Sicherheits-Kopfzeilen antworten dort mit 404 (gemessen 2026-10-19, Befund in [Erledigt.md](Erledigt.md)). **Die Rechtspflicht aus 10.2 ist dadurch unerfüllt, obwohl die Seiten gebaut sind.** Zu tun: einmaliger Deploy von Hand – `git pull` und `docker compose up -d --build` in `/opt/wheelee`, danach die drei Variablen aus 10.2a in die `.env`; beim ersten Start legt die Migration die Tabellen an. **Das kann weder ich noch Torsten:** kein SSH-Zugang zum NAS, kein NPM-Zugang. Es braucht Niklas – oder einen eigenen Benutzer auf dem NAS mit Rechten nur auf `/opt/wheelee`.
- [~] 12.5 **Deploy automatisieren.** `Dockerfile`, `docker-compose.yml` und `deploy/env.beispiel` stehen. Offen ist, wie neue Commits auf das NAS kommen: Webhook oder systemd-Timer, Variante A oder B aus Abschnitt 6 von [wheelee-infrastruktur.md](wheelee-infrastruktur.md). **Dass dieser Punkt offen ist, hat 12.5a verursacht:** Ohne automatischen Weg hängt jeder Deploy daran, dass jemand daran denkt – und acht Tage lang hat niemand daran gedacht.
- [ ] 12.4 Lighthouse-Prüfung auf Mobil: Leistung und Barrierefreiheit.
- [ ] 12.6 Fehler-Monitoring und minimales Logging.
- [ ] 12.7a Symbol gestalterisch überarbeiten – funktional, aber von mir gezeichnet.

## 17. Rückmeldungen

- [ ] 17.6 **Die Adresse an einer ewig offenen Meldung bleibt ewig stehen.** 17.5 löscht nur **erledigte** Meldungen, und das ist richtig: Eine unbearbeitete Meldung ist nicht erledigt, sondern liegen geblieben, und sie nach einer Frist zu löschen hieße, einen Hinweis zu verlieren, weil sich niemand gekümmert hat. Damit bleibt eine freiwillige Antwortadresse unbegrenzt gespeichert – gegen die Zusage in `CONTACT_PRIVACY`. **Nicht einfach dieselbe Frist darüberlegen.** Zu entscheiden: nur die **Adresse** entfernen und den Text stehen lassen (Hinweis bleibt, Antwort wird unmöglich), oder offene Meldungen nach längerer Frist auf „verworfen" setzen (dann greift 17.5, aber eine Maschine entscheidet über einen Hinweis). Der erste Weg ist der naheliegende; er braucht eine zweite Frist und einen Hinweis in der Übersicht, warum dort keine Adresse mehr steht.

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
dann nicht, wenn gerade nichts anderes zu tun ist. Die Erwägungen zu jedem
Punkt stehen in [Erledigt.md](Erledigt.md) unter „Zurückgestellte Vorhaben",
damit sie beim Freigeben nicht neu zusammengetragen werden müssen.

- [-] 13.1 Spenden-Knopf · [-] 13.2 Werbebanner · [-] 13.3 Einwilligungsbanner, falls Werbung kommt
- [-] 15.1 Englisch, Spanisch, Französisch · [-] 15.2 Texte aus dem Quelltext lösen · [-] 15.3 Was dabei übersehen wird (`lang`, Datums- und Zahlenformate) · [-] 15.4 Die Daten bleiben deutsch · [-] 15.5 Spracherkennung mit Umschalter
- [-] 16.1 Städte zum Mitnehmen herunterladen – die eigentliche Hürde ist die Kachel-Lizenz, nicht die Technik
