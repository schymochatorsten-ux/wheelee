# ToDos – wheelee

**Hier steht nur, was offen ist.** Alles Fertige steht mit seiner Begründung in
[Erledigt.md](Erledigt.md); wie gepflegt wird, steht in
[CLAUDE.md](CLAUDE.md#aufgabenliste-pflegen). Fachliche Grundlage:
[Konzept.md](Konzept.md). Datenarbeit: [Datenpflege.md](Datenpflege.md).

**Legende:** `[ ]` offen · `[~]` teils gebaut, Rest hier · `[!]` braucht eine
Entscheidung oder Angabe von dir · `[-]` gesperrt bis zur Freigabe

**Letzte Aktualisierung:** 2026-10-24

**Stand:** wird nachgezählt, nicht fortgeschrieben:

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

Erwartet: alle Unit-Tests grün ·
`Verzeichnis: 10.754 Gemeinden · davon an der Reihe: 204 · Seed-Dateien: 209`
· „✅ Register und Seed-Dateien stimmen überein".

Vor dem ersten landesweiten Lauf einmal `npm run import:grenzen` (lädt 66 MB
vom BKG, die nicht im Repository liegen; erwartet `10.956 Flächen` und
`17.801 von 18.072 Standorten (98.50 %)`).

---

## Reihenfolge

**Die Vorgabe vom 2026-10-17 („kein Datenimport, solange inhaltliche Punkte
offen sind“) ist am 2026-10-29 aufgehoben** (D-11): Die inhaltlichen Punkte,
die offen blieben, hängen nicht mehr an der Datenarbeit. Geblieben ist, dass
jede Stufe erst nach den Prüfungen geschrieben wird.

**Stand 2026-10-29 (D-11 in [Erledigt.md](Erledigt.md)): Torsten hat die Datenläufe in Stufen freigegeben** (Reihenfolge unten). Abgearbeitet wird von oben. 1.8 (Next 16) ist am 2026-10-30 erledigt.

| #   | Was                                                              | Warum hier                                         |
| --- | ---------------------------------------------------------------- | -------------------------------------------------- |
| 2   | **3.3** nach Stufe 2 wiederholen                                | Prüfen vor dem Einspielen                          |
| 3   | **2d.8a** Bochum (braucht die Datei von Torsten)                 | Portal sperrt den Abruf                            |
| 4   | **2e.13**, dann **2e.6** Stufe 2 und folgende                    | Straßen zuerst, sonst fehlt die Prüfung            |
| 6   | **15.1** Niederländisch, Portugiesisch, Russisch                 | Zuletzt, jede erst nach der vorigen                |

**Neue Knöpfe und Meldungen kommen seit 15.2 gleich in
`src/i18n/de.ts`, nicht in die Komponente** (Aufbau in
[Erledigt.md](Erledigt.md) unter 15.2) – und in `en.ts` und `es.ts`: Ein fehlender
Schlüssel ist ein Typfehler, und neue Sätze gehen wie in 15.6 durch die
maschinelle Mehrfachprüfung.

**3.10 ist der Lauf, der aus dem gebauten Kreuzvergleich Nutzen macht** –
abgeglichen ist bislang eine Stadt.

---


## 2. Datenquellen und Import

- [~] 2d.8a **Städte mit ungenutzter amtlicher Quelle.** München und Bielefeld sind umgestellt (Befund in [Erledigt.md](Erledigt.md)). **Offen: Bochum.** Der Server antwortet mit 403, der ArcGIS-Dienst ist weg. **Braucht Torsten:** die CSV oder das GeoJSON „Bochum – Behindertenparkplätze“ (CC0) von `bochum.opendata.ruhr` im Browser laden und in den Arbeitsordner legen; vorher prüfen, ob sie Koordinaten enthält.
- [~] 2e.6 **Restliche Gemeinden aus OpenStreetMap, in Stufen** (D-07). **Stufe 1 (ab 20.000) und 2 (ab 10.000) sind eingespielt** (Stand in [Erledigt.md](Erledigt.md), „2e.6 Stufe 2"). **Offen:** Stufe 3 (ab 5.000: `MIN_POPULATION` auf 5.000) und 4 (alle), derselbe Ablauf mit den vorhandenen Auszügen; bei `--trotzdem` danach `data/zossen.json` löschen. Vor Stufe 3 messen, ob `/api/cities` (423 KB bei 1.494 Städten) noch tragbar ist.

## 3. Datenvalidierung

- [~] 3.3 **Straßenabgleich:** Werkzeug steht (`npm run check:street-names -- <stadt> [--n 60 | --alle]`, Stand in [Erledigt.md](Erledigt.md)). **Gelaufen** für 22 Städte, Karlsruhe und eine Stichprobe von 12 neuen Gemeinden (Befund in [Erledigt.md](Erledigt.md), 3.3, 3.12 und 2e.12). Die Stichprobe für die neuen Gemeinden ist mit den 50 aus 2e.12 gelaufen (78 %). **Offen:** nur noch die Wiederholung nach Stufe 2.
- [!] 3.11 **Sollen OSM-Standorte, die die Stadt nicht führt, zusätzlich zur amtlichen Liste angezeigt werden?** Der Kreuzvergleich (3.10, Befund in [Erledigt.md](Erledigt.md)) fand in 22 Städten **1.916 Standorte nur in OSM** (Köln 752, Dresden 225, Dortmund 164, Frankfurt 155, Düsseldorf 152). Oft sind es Parkplätze mit ausgewiesenen Stellplätzen (Kliniken, Märkte), die die Stadt als Straßenraum-Liste nicht führt – beides ist richtig. **Braucht von dir:** zusätzlich zeigen (als „nur OSM“ gekennzeichnet, mit Hinweis), weiter nur amtlich, oder je Stadt entscheiden. Aufwand: mittel (Zusammenführen im Import, Kennzeichnung in der Detailansicht; das Muster „bestätigt“ gibt es schon).



## 10. Datenschutz und Recht

Befunde der rechtlichen Durchsicht vom 2026-10-29 stehen in [Erledigt.md](Erledigt.md) („Rechtliche Durchsicht“); der Entwurf des Verarbeitungsverzeichnisses liegt in [Verarbeitungsverzeichnis.md](Verarbeitungsverzeichnis.md). **Beides ersetzt keine Rechtsberatung.**

- [!] 10.17 **Art. 9 DSGVO: Gesundheitsbezug.** Wer Behindertenparkplätze als Favoriten speichert oder bewertet, lässt Rückschlüsse auf die Gesundheit zu, auch wenn die App nie danach fragt. **Braucht eine Antwort von einer juristisch urteilsfähigen Person**, ob das als besondere Kategorie gilt und ob bei der Registrierung eine ausdrückliche Einwilligung nötig ist (Checkbox, Art. 9 Abs. 2 lit. a). Danach ggf. Registrierung und Einladung anpassen, Datenschutzerklärung ergänzen.
- [!] 10.18 **Gesamtprüfung durch eine rechtskundige Person** vor der Veröffentlichung: Rechtsgrundlagen der Datenschutzerklärung, Verarbeitungsverzeichnis, Einordnung der Offline-Kopien im Browser (§ 25 TDDDG, „unbedingt erforderlich“?), Drittlandhinweis zu den Kartenkacheln. Sie war schon vor diesem Datum vorgesehen (README, „Rechtstexte“).

## 15. Mehrsprachigkeit

- [~] 15.1 **Weitere europäische Sprachen** (wieder aufgenommen 2026-10-24, Torsten: nur europäische, Englisch inklusive; Türkisch und Arabisch entfallen). Gebaut sind Deutsch, Englisch, Spanisch, Französisch, Italienisch, Polnisch (Stand in [Erledigt.md](Erledigt.md), 15.1). Eine nach der anderen, jede maschinell vorübersetzt wie in 15.6: Niederländisch, Portugiesisch, Russisch (Russisch hat wie Polnisch drei Zahlwortformen, siehe dort). Für Italienisch und Polnisch fehlt noch die mehrfache maschinelle Prüfung nach 15.6. Je Sprache: `src/i18n/<code>.ts`, Eintrag in `index.ts`, Zeile in `opening-hours.test.ts` (Höchstparkdauer), ein E2E-Test in `sprache.spec.ts`. Die Systemsprache wird bereits als erster Vorschlag ausgewertet (siehe [Erledigt.md](Erledigt.md), 15.5); Aufbau und Gründe unter 15.1 und 15.6.

---

## Gesperrt bis zu deiner Freigabe

**Nichts hiervon wird gebaut, bevor du es Punkt für Punkt freigibst.** Die Erwägungen stehen in
[Erledigt.md](Erledigt.md) unter „Erwägungen zu 13, 15 und 16".

**Abschnitt 19 – Erweiterungsvorschläge (Durchsicht vom 2026-10-29).** Jeweils ein Satz, warum es sich lohnen würde:

- [-] 19.1 **Automatische Zugänglichkeitsprüfung** (`@axe-core/playwright` als Entwicklungsabhängigkeit, ein E2E-Test je Ansicht): Die Zielgruppe ist barrierebedürftig, und ein Kontrastfehler fällt sonst erst im Gebrauch auf.
- [-] 19.2 **Monatlicher Aktualitätslauf auf dem NAS** (systemd-Timer für `sources:check` und `validate`, Ergebnis als Datei): Datenpflege.md verlangt ihn, er läuft bisher nur von Hand.
- [-] 19.3 **Zeitgesteuerte Sicherung** (`db:backup` als Timer mit Rotation): Das Verfahren steht, der Takt nicht.
- [-] 19.4 **Öffentliche Abdeckungsseite** („Wie vollständig sind die Daten für meine Stadt?“, aus `_abdeckung.md`): Die App sagt schon, dass OSM-Daten unvollständig sind; mit Zahl je Stadt wird das nachprüfbar.
- [-] 19.5 **„Nur OSM“ und „aufgehoben gemeldet“ als OSM-Hinweise zurückgeben** (von Hand, über OpenStreetMap-Notizen): Wer hier einen Fehler findet, hilft allen, die dieselbe Karte nutzen.
- [-] 19.6 **Laufender Betriebsmonitor** (Eintrag in nfuptime, steht in der Checkliste von `wheelee-infrastruktur.md`): Ein Ausfall fiele sonst erst durch Nutzer:innen auf.
- [-] 19.7 **Hinweis „Daten dieser Stadt sind älter als N Monate“ in der Listenansicht** (nutzt `generatedAt` je Seed): Die Offline-Ansicht warnt schon bei sechs Monaten, die Online-Ansicht nicht.
- [-] 19.8 **Geteilte Lizenzliste in der App** (alle Quellenvermerke mit Link auf einer Seite statt je Stadt in der Liste): dl-de/by-2.0 verlangt den Vermerk, und er ist heute nur in der Städteliste zu finden.

**Abschnitt 13 – Finanzierung.** Wer trägt die Kosten, und zu welchem Preis?

- [-] 13.1 Spenden-Knopf · [-] 13.2 Werbebanner (widerspricht 10.4 „keine Tracker") · [-] 13.3 Einwilligungsbanner, falls Werbung kommt
