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

**Stand 2026-10-29 (D-11 in [Erledigt.md](Erledigt.md)): Torsten hat die Datenläufe in Stufen freigegeben** (Reihenfolge unten). Abgearbeitet wird von oben; 1.8 wartet auf sein Bescheid und wird übersprungen, bis er ihn gibt.

| #   | Was                                                              | Warum hier                                         |
| --- | ---------------------------------------------------------------- | -------------------------------------------------- |
| 1   | **10.16** Datenschutzerklärung (Platzhalter), **12.7a** Symbol   | Ohne Daten, ohne Netz                              |
| 2   | **3.10** auswerten (Lauf liegt vor), **3.4** laufen lassen, **3.3** bauen und laufen lassen | Prüfen vor dem Einspielen |
| 3   | **2d.8a** München amtlich, danach die übrigen acht Städte        | Ersetzt einen Bestand, deshalb nach den Prüfungen  |
| 4   | **2e.11** Saarland-Probelauf, dann **2e.6** in Stufen (D-07)     | Mit Streuungs- und Dichteprüfung                   |
| 5   | **1.8** Next 16                                                  | Erst nach Torstens Bescheid                        |
| 6   | **15.1** Niederländisch, Portugiesisch, Russisch                 | Zuletzt, jede erst nach der vorigen                |

**Neue Knöpfe und Meldungen kommen seit 15.2 gleich in
`src/i18n/de.ts`, nicht in die Komponente** (Aufbau in
[Erledigt.md](Erledigt.md) unter 15.2) – und in `en.ts` und `es.ts`: Ein fehlender
Schlüssel ist ein Typfehler, und neue Sätze gehen wie in 15.6 durch die
maschinelle Mehrfachprüfung.

**3.10 ist der Lauf, der aus dem gebauten Kreuzvergleich Nutzen macht** –
abgeglichen ist bislang eine Stadt.

---

## 1. Projekt-Setup

- [!] 1.8 **Next 16.** Behebt die zwei Audit-Wurzeln (`postcss` über `next`, `braces` über `eslint-config-next`); in `package.json` steht 15.5.28. **Wartet auf Torstens Bescheid, dass der Stand committet ist** (D-11) – bis dahin überspringen. Zu prüfen: `middleware.ts` (CSP-Nonce), Service Worker, `node:sqlite`, Produktionsbau.

## 2. Datenquellen und Import

- [ ] 2d.8a **München auf die amtliche Quelle umstellen** (entschieden, D-11 in [Erledigt.md](Erledigt.md); Befund dort unter 2d.8a: 568 Standorte statt 218). Zu tun: Importer um **handgepflegte Quellen** erweitern (München steht nicht in GovData, `sources:scan` würde einen Eintrag in `_quellen-status.json` überschreiben), WFS-Ebene `mor_wfs:behindertenparkplaetze` einlesen, **EPSG:25832 prüfen** (steht im GeoJSON unter `crs`), Status „Baustelle“ mit Zeitraum und Hinweis anzeigen, Lizenz dl-by-de 2.0 eintragen. **Danach die übrigen acht Städte ansehen:** `npm run sources:check` findet sie. Bei Kiel, Krefeld und Aachen ist die Ablehnung richtig (Anwohnerparken); bei Bochum, Bielefeld, Karlsruhe, Norderstedt und Viersen lohnt der Blick aufs Stadtportal.
- [ ] 2e.6 **Restliche Gemeinden aus OpenStreetMap, in Stufen** (Entscheidung D-07, [Erledigt.md](Erledigt.md)): ab 20.000, dann 10.000, dann 5.000, dann alle; jede Stufe erst nach den Prüfungen (Streuung über 15 km, Dichte über dem Dreifachen des Medians). Voraussetzung ist 2e.11.
- [~] 2e.11 **Massendaten ohne Overpass holen.** Der PBF-Leser steht (`scripts/import/pbf.mts`, Stand in [Erledigt.md](Erledigt.md)). Angeschlossen: `npm run import:osm-state -- <land> --pbf <datei> --dry`. **Offen:** einen Auszug laden (`https://download.geofabrik.de/europe/germany/<land>-latest.osm.pbf`, ODbL) und den ersten Probelauf an einem kleinen Land (Saarland) gegen die Overpass-Zahlen halten, nicht gleich NRW. Freigegeben (D-11).

## 3. Datenvalidierung

- [ ] 3.3 **Straßenabgleich:** nennt die Rückwärtssuche bei der Koordinate dieselbe Straße wie die Quelle? Für Frankfurt gibt es das schon, für alle anderen nicht.
- [~] 3.4 **Abstand zur nächsten Straße.** Werkzeug steht (`npm run check:streets -- <stadt>`, Stand in [Erledigt.md](Erledigt.md)). **Offen:** einmal für die 23 amtlichen Städte laufen lassen (eine Overpass-Abfrage je Stadt, mit Pausen, erst nach dem laufenden 3.10) und die gemeldeten Standorte ansehen.
- [ ] 3.10 **Den Kreuzvergleich über alle 23 amtlichen Städte laufen lassen.** Abgeglichen ist bislang **eine** Stadt (Germersheim). `npm run validate` **mit** Netz; ansehen: Ausreißer nach unten und die Gruppe **„nur OSM"**.


## 10. Datenschutz und Recht

- [ ] 10.16 **Datenschutzerklärung um den Mailversand ergänzen** (entschieden: Platzhalter-Abschnitt, D-11). Zu schreiben: Abschnitt zu „Passwort vergessen“ und „E-Mail ändern“ (Zweck, Rechtsgrundlage, Token eine Stunde gültig, danach gelöscht, Mailanbieter sieht die Adresse). Der Anbieter kommt aus einer Variable (`WHEELEE_MAIL_PROVIDER`), **der Abschnitt erscheint nur, wenn der Mailversand eingeschaltet ist**; ohne Angabe steht dort ein sichtbarer Hinweis statt eines erfundenen Namens (wie beim Impressum). Ansatz: `src/app/datenschutz/page.tsx`, Test in `e2e/rechtstexte.spec.ts`. **Nach dem Bau trägt Torsten den Anbieter und den Stand des Auftragsverarbeitungsvertrags in die `.env` ein** (Eintrag in `deploy/env.beispiel`); bis dahin keine SMTP-Variablen setzen.


## 12. Qualität und Deployment

- [ ] 12.7a Symbol gestalterisch überarbeiten (entschieden: ein Vorschlag, D-11). Quelle ist `scripts/make-icons.mts` (`npm run icons`) und `public/icon.svg`. Vorschlag **zum Ansehen ablegen**, nicht gleich ersetzen; Übernahme erst nach Torstens OK.

## 15. Mehrsprachigkeit

- [~] 15.1 **Weitere europäische Sprachen** (wieder aufgenommen 2026-10-24, Torsten: nur europäische, Englisch inklusive; Türkisch und Arabisch entfallen). Gebaut sind Deutsch, Englisch, Spanisch, Französisch, Italienisch, Polnisch (Stand in [Erledigt.md](Erledigt.md), 15.1). Eine nach der anderen, jede maschinell vorübersetzt wie in 15.6: Niederländisch, Portugiesisch, Russisch (Russisch hat wie Polnisch drei Zahlwortformen, siehe dort). Für Italienisch und Polnisch fehlt noch die mehrfache maschinelle Prüfung nach 15.6. Je Sprache: `src/i18n/<code>.ts`, Eintrag in `index.ts`, Zeile in `opening-hours.test.ts` (Höchstparkdauer), ein E2E-Test in `sprache.spec.ts`. Die Systemsprache wird bereits als erster Vorschlag ausgewertet (siehe [Erledigt.md](Erledigt.md), 15.5); Aufbau und Gründe unter 15.1 und 15.6.

---

## Gesperrt bis zu deiner Freigabe

**Nichts hiervon wird gebaut, bevor du es Punkt für Punkt freigibst.** Die Erwägungen stehen in
[Erledigt.md](Erledigt.md) unter „Erwägungen zu 13, 15 und 16".

**Abschnitt 13 – Finanzierung.** Wer trägt die Kosten, und zu welchem Preis?

- [-] 13.1 Spenden-Knopf · [-] 13.2 Werbebanner (widerspricht 10.4 „keine Tracker") · [-] 13.3 Einwilligungsbanner, falls Werbung kommt
