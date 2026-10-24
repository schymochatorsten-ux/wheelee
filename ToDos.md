# ToDos – wheelee

**Hier steht nur, was offen ist.** Alles Fertige steht mit seiner Begründung in
[Erledigt.md](Erledigt.md); wie gepflegt wird, steht in
[CLAUDE.md](CLAUDE.md#aufgabenliste-pflegen). Fachliche Grundlage:
[Konzept.md](Konzept.md). Datenarbeit: [Datenpflege.md](Datenpflege.md).

**Legende:** `[ ]` offen · `[~]` teils gebaut, Rest hier · `[!]` braucht eine
Entscheidung oder Angabe von dir · `[-]` gesperrt bis zur Freigabe

**Letzte Aktualisierung:** 2026-10-24

**Stand (nachgezählt 2026-10-24):** 24 offen, 1 teils gebaut, 9 warten auf
dich, 1 gesperrte Zeile (Abschnitt 13, darin drei Punkte). Neu am 2026-10-24:
10.11–10.15 (10.11, 10.13, 10.14 am selben Tag erledigt) und Abschnitt 18 (18.1–18.3, 18.5, 18.6, D-09 sowie 10.8–10.10 am selben Tag erledigt); **höchste Priorität haben
Abschnitt 10 (Sicherheit, Datenschutz, Recht) und Abschnitt 18
(Administration).** Nachzählen statt fortschreiben:

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

Erwartet: 475 Unit-Tests grün ·
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

| #   | Was                                                                  | Warum hier                                            |
| --- | -------------------------------------------------------------------- | ----------------------------------------------------- |
| 1   | **10.12 / 10.15 / 10.2** Folgen der Sicherheits- und Datenschutzprüfung (10.8–10.10 erledigt 2026-10-24), Cookies, Impressum | **Höchste Priorität (Vorgabe 2026-10-24)** – 10.12 und 10.2 brauchen Torsten |
| 2   | **18.4** Erste Einladung                                            | **Höchste Priorität (Vorgabe 2026-10-24)** (18.1–18.3, 18.5, 18.6 gebaut) |
| 3   | **12.5a** aktuellen Stand ausliefern                                 | Ohne ihn ist nichts von 1 und 2 im Netz               |
| 4   | **15.1** Weitere Sprachen – zurückgestellt (2026-10-24)             | Nichts zu tun, bis Torsten es wieder aufnimmt         |
| 5   | **9.2a / 9.9 / 12.7a** Darstellung, Hilfsmitteltest                  | 9.9 braucht echte Geräte                              |
| 6   | **1.8 / 4.5** Aufräumen, Automatisierung                             | Erst, nachdem 12.5a im Netz steht                     |
| 7   | **2c.4 / 2d.9** Anfrage an Regensburg, OSM ergänzen                  | Brief und Kartierung – läuft nebenher                 |
| 8   | **Datenarbeit** 3.10, 3.3, 3.4, 2d.8a, 2e.6, 2e.11              | Fällt unter die Vorgabe oben                          |
| 9   | **14.1–14.9** Abschlusstest                                          | Zuletzt, auf echten Geräten, in den Sprachen von 15   |

**Neue Knöpfe und Meldungen kommen seit 15.2 gleich in
`src/i18n/de.ts`, nicht in die Komponente** (Aufbau in
[Erledigt.md](Erledigt.md) unter 15.2) – und in `en.ts` und `es.ts`: Ein fehlender
Schlüssel ist ein Typfehler, und neue Sätze gehen wie in 15.6 durch die
maschinelle Mehrfachprüfung. Die Sprachen selbst (`15.1`) stehen
hinter den restlichen deutschen Funktionen: Wer vorher übersetzt, übersetzt
alles noch einmal, was 9.2a hinzufügt.

**3.10 ist der Lauf, der aus dem gebauten Kreuzvergleich Nutzen macht** –
abgeglichen ist bislang eine Stadt; er steht unter Platz 7, weil er über den
ganzen Bestand läuft.

**Außer der Reihe, weil es nicht an mir liegt:** 16.2 (Kartenkacheln vorab –
Lizenzfrage), dazu alles unter „Entscheidungen".

---

## 0. Entscheidungen und Angaben, die bei dir liegen

- [!] **D-05 Parkplätze ohne Koordinaten.** Empfehlung: als „Position ungenau" kennzeichnen und nur in der Liste führen, nicht auf den Stadtteil-Mittelpunkt setzen. Faktisch gelöst – alle 18.072 Standorte haben Koordinaten.
- [!] **D-07 Importgrenze senken? (= 2e.5)** `MIN_POPULATION` in `scripts/import/german-cities.mts`. Die Stufe „ab 50.000" ist fertig (195 Gemeinden); die nächstgrößere offene wäre Cuxhaven mit 49.697. Nachgezählt am 2026-10-20: ab 40.000 sind es 285 Gemeinden, ab 20.000 706, ab 10.000 1.598, ab 5.000 2.943. Beide Importwege erzeugen seit 2e.7 richtige Daten; der einzige Einwand ist die Last auf Overpass (siehe 2e.11). Ein Versuch wurde am 2026-10-10 zurückgenommen – 473 Gemeinden wieder entfernt, Grund seit 2e.7 behoben.
- [!] **10.2a Betreiberangaben für das Impressum.** `WHEELEE_OPERATOR_NAME`, `_ADDRESS`, `_EMAIL` in die `.env` auf dem NAS, Vorlage [deploy/env.beispiel](deploy/env.beispiel). Gebraucht werden Name, ladungsfähige Anschrift, Kontaktadresse. **Erst mit 12.5a zusammen ist die Pflicht erfüllt** – einzeln keines von beiden.
- [!] **10.2b Rechtstexte fachlich ansehen lassen.** Ob die Rechtsgrundlagen und die Einstufung nach § 5 DDG tragen, kann ich nicht beurteilen. Dazu die Einstufung der Browser-Speicher nach § 25 TDDDG (Fragen in `Erledigt.md`, 10.11).
- [!] **1.7 Commits und Branch-Strategie** – blockiert: `git` ist auf diesem Rechner nicht im PATH.
- [!] **11.1 Anmeldung ohne Passwort** (Magic Link oder Passkey) und „Passwort vergessen". Gebaut ist E-Mail und Passwort (scrypt); beides setzt einen Mailversand voraus, über den noch nicht entschieden ist – siehe [wheelee-infrastruktur.md](wheelee-infrastruktur.md) Abschnitt 7.

---

## 1. Projekt-Setup

- [ ] 1.8 **Audit-Findings: Next 16 ist da, das Upgrade behebt sie** (nachgesehen 2026-10-21). Unverändert zwei Wurzeln: `postcss` über `next` und `braces` über `eslint-config-next`. Hier läuft 15.5.27 mit `postcss 8.4.31`, Next **16.4.2** bringt `8.5.23`; `braces` hängt ohnehin nur am Linter und damit an der Entwicklung, nicht am Ausgelieferten. **Empfehlung: erst nach 12.5a.** Einen Sprung über eine Hauptversion zu machen, während der ausgelieferte Stand ein halbes Jahr alt ist, hieße zwei Fehlerquellen auf einmal – erst soll das Gebaute im Netz stehen, dann wird der Unterbau gehoben.

## 2. Datenquellen und Import

- [ ] 2c.4 Fehlende Parkplätze in OpenStreetMap nachtragen; davon profitieren auch alle anderen Nutzungen.
- [ ] 2d.8a **Neun Städte mit ungenutzter amtlicher Quelle ansehen.** **München zuerst:** Datensatz „Behindertenparkplätze“ auf opendata.muenchen.de, dl-by-de 2.0, WFS, täglich aktualisiert; im Bestand stehen 219 Standorte aus OSM (gefunden bei 3.2, Details in [Erledigt.md](Erledigt.md)). Die übrigen acht, fünf davon lohnend: `npm run sources:check` findet sie von selbst. Bei Kiel, Krefeld und Aachen ist die Ablehnung richtig (Anwohnerparken); bei Bochum, Bielefeld, Karlsruhe, Norderstedt und Viersen lohnt der Blick aufs Stadtportal. Der Gewinn wäre spürbar: Düsseldorf kam von 171 OSM-Standorten auf 340 amtliche.
- [ ] 2d.9 **Regensburg: 156.000 Einwohner, kein einziger erfasster Platz.** Die Abfrage lief sauber durch und war leer – eine Lücke in OpenStreetMap, nicht in der Wirklichkeit. Anfrage bei der Straßenverkehrsbehörde, Nachtragen in OSM.
- [ ] 2e.6 **Restliche Gemeinden aus OpenStreetMap.** Der Importer kann es, die Liste steht (`data/_import-status.md`: 10.550 „noch nicht geprüft"), die Zuordnung stimmt seit 2e.7. Es fehlt nur noch ein Bezugsweg, der einen Gemeinschaftsdienst nicht überlastet – das ist 2e.11.
- [ ] 2e.11 **Massendaten ohne Overpass holen.** Overpass ist ein Abfragedienst von Freiwilligen und antwortet unter Last mit 500/504 – oder, schlimmer, mit 200 und leerer Liste; beides ist hier eingetreten (am 2026-10-11 für NRW: 7 Objekte statt 14.025). Für 10.754 Gemeinden das falsche Werkzeug, auch gebündelt je Bundesland. Vorgesehener Weg sind die **Bundesland-Auszüge von Geofabrik** (`.osm.pbf`, ODbL, täglich, für Automatisierung gedacht): ein Download-Server ist für Massenbezug da, ein Abfragedienst nicht.
  - [ ] Aufwand ehrlich benennen: PBF ist Protocol Buffers mit zlib-Blöcken und delta-kodierten Knoten – deutlich mehr als der Shapefile-Leser. Dafür löst es die Abhängigkeit vom Gemeinschaftsdienst vollständig auf.
  - [ ] Zwischenstufe, falls PBF zu viel ist: `npm run import:osm-state` beibehalten, aber mit Pausen über die 16 Länder verteilt – 32 Abfragen für ganz Deutschland statt 10.754, und das ist vertretbar.

## 3. Datenvalidierung

- [ ] 3.3 **Straßenabgleich:** nennt die Rückwärtssuche bei der Koordinate dieselbe Straße wie die Quelle? Kein Beweis für einen Fehler, aber ein guter Filter. Für Frankfurt gibt es das schon, für alle anderen nicht.
- [ ] 3.4 **Abstand zur nächsten Straße.** Ein Behindertenparkplatz liegt am Straßenrand; Punkte über 25 m von jeder Straße sind fast immer falsch verortet. Eine Overpass-Abfrage je Stadt.
- [ ] 3.10 **Den Kreuzvergleich über alle 23 amtlichen Städte laufen lassen.** Code und Anzeige stehen seit 3.1/3.7; abgeglichen ist bislang **eine** Stadt (Germersheim), weil Overpass am 2026-10-20 unter Last stand. Also `npm run validate` **mit** Netz, dann zweierlei ansehen: die Ausreißer nach unten (versetzte amtliche Koordinate oder dünne OSM-Erfassung – das unterscheidet nur die Stichprobe) und die Gruppe **„nur OSM"**, also Stellplätze, die der amtlichen Liste fehlen. Für Germersheim sind das 11 bei 6 amtlichen Standorten.

## 4. Datenaktualität

- [ ] 4.5 Monatliche Änderungsprüfung automatisieren, sobald die App läuft – GitHub-Actions-Lauf, der bei Änderungen einen Pull Request öffnet. So bleibt die Entscheidung bei einem Menschen. `purgeExpired` (17.5) gehört dann hier hinein.

## 9. Darstellung und Bedienung

- [ ] 9.2a Falls die gefilterte Karte auf Dauer nicht überzeugt: echte dunkle Kacheln (etwa CARTO Dark Matter). Bessere Lesbarkeit, aber ein weiterer Anbieter, dessen Bedingungen und Attribution zu prüfen wären.
- [ ] 9.9 Mit echten Hilfsmitteln testen, nicht nur mit Prüfwerkzeugen: NVDA oder VoiceOver, Tastatur, Vergrößerung.

## 10. Datenschutz und Recht

- [!] 10.12 **Weiterleitungsserver und Sicherung klären** (aufgenommen 2026-10-24, aus 10.8/10.9). Braucht Torsten: (1) Führt der Nginx Proxy Manager auf dem Strato-VPS Zugriffsprotokolle mit IP, wie lange, und gibt es einen Auftragsverarbeitungsvertrag mit Strato? (2) Wie lange hält das NAS-Backup die SQLite-Datei – bis dahin steht ein gelöschtes Konto noch in Sicherungen. (3) Ist die Sicherung der laufenden Datei konsistent (WAL)? Ergebnis gehört in Abschnitt 9/10 der Datenschutzerklärung und zu 10.2b.
- [ ] 10.15 **Konto-Schutz nachziehen – Entscheidung nötig** (aufgenommen 2026-10-24, aus 10.9/10.10). (a) `DELETE /api/account` lässt den **letzten aktiven Admin** sich selbst löschen (`account/route.ts`, `deleteAccount`); sollte wie `setRole` mit 409 verweigern. (b) Einladung ohne Rollenangabe ergibt `admin` (`admin/invitations/route.ts:45`); Vorschlag: `user` als Standard – ändert, was die Verwaltungsoberfläche sendet, daher vorher prüfen. (c) Anmeldedrosselung ist je Herkunft+Adresse; verteiltes Durchprobieren eines Kontos wird nicht gebremst. Eine zusätzliche Grenze je Adresse allein (z. B. 100/h) bremst, sperrt aber auch die Besitzerin aus – **Entscheidung Torsten**.

## 18. Administration und Einladungen

**Höchste Priorität (Vorgabe 2026-10-24).** Heute ist Administrator, wer in `ADMIN_EMAILS` steht (17.0 in `Erledigt.md`); es gibt keine Verwaltung. Jede:r kann sich weiterhin selbst ein normales Konto anlegen (11.1/11.2) – das bleibt unverändert und wird nicht an eine Einladung gebunden.

- [ ] 18.4 **Erste Einladung an Torsten.Schymocha@Gmail.com.** **Erst nach dem Deploy (12.5a) möglich:** Die Einladung entsteht in der Verwaltung der laufenden Seite, nicht lokal. Es wird ein Link erzeugt, den du an die Adresse weitergibst; die App sendet nichts.

---

## 12. Qualität und Deployment

- [!] 12.5a **Den aktuellen Stand ausliefern – Platz 1.** Die Seite läuft auf einem Stand von vor dem 2026-10-11: Konten, Rückmeldungen, Bewertungen, Rechtstexte und Sicherheits-Kopfzeilen antworten dort mit 404 (gemessen 2026-10-19, Befund in [Erledigt.md](Erledigt.md)). **Die Rechtspflicht aus 10.2 ist dadurch unerfüllt, obwohl die Seiten gebaut sind.** Zu tun: einmaliger Deploy von Hand – `git pull` und `docker compose up -d --build` in `/opt/wheelee`, danach die drei Variablen aus 10.2a in die `.env`; beim ersten Start legt die Migration die Tabellen an. **Das kann weder ich noch Torsten:** kein SSH-Zugang zum NAS, kein NPM-Zugang. Es braucht Niklas – oder einen eigenen Benutzer auf dem NAS mit Rechten nur auf `/opt/wheelee`.
- [ ] 12.7a Symbol gestalterisch überarbeiten – funktional, aber von mir gezeichnet.

## 15. Mehrsprachigkeit

**Freigegeben am 2026-10-20.** Wer einen blauen Parkausweis hat, hat ihn
EU-weit; wer aus Frankreich oder Spanien anreist, steht vor derselben Frage
ohne Deutsch. **Wie übersetzt wird, ist als D-08 entschieden** (Dateien je
Sprache, maschinell vorübersetzt, von Menschen geprüft, mit Ausnahmeliste) –
Begründung in [Erledigt.md](Erledigt.md), ebenso die übrigen Erwägungen.

- [~] 15.1 **Weitere Sprachen – zurückgestellt (Torsten, 2026-10-24: „erstmal nicht").** Französisch, Italienisch, Polnisch, Niederländisch, Türkisch, Russisch, Arabisch; Aufbau und Gründe in [Erledigt.md](Erledigt.md) unter 15.1 und 15.6.

## 16. Eine Stadt vorab herunterladen

**Freigegeben am 2026-10-20.** Der Service Worker hält bisher nur vor, was man
ohnehin angesehen hat (12.8/12.9). Dieser Abschnitt geht weiter: eine Stadt
bewusst vorab laden, damit sie unterwegs vollständig verfügbar ist – im
Parkhaus, in der Tiefgarage, im Funkloch kurz vor dem Ziel. **Geteilt in zwei
Punkte, weil der eine gebaut werden kann und der andere auf eine Lizenz
wartet.**

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
