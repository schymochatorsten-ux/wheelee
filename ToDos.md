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

Erwartet: alle Unit-Tests grün (521 am 2026-10-24) ·
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

Abgearbeitet wird von oben. **Vor Platz 7 (Next 16) sagt Claude Bescheid, damit
Torsten den bis dahin fertigen Stand committet** – erst danach wird begonnen.

| #   | Was                                                              | Warum hier                                         |
| --- | ---------------------------------------------------------------- | -------------------------------------------------- |
| 1   | **10.2a** Anschrift für das Impressum                            | Höchste Priorität (Vorgabe 2026-10-24)             |
| 3   | **9.18** Zielsuche, **9.9** ARIA-Anteil                          | Gewünschte Verbesserung                            |
| 4   | **11.1 / 11.8** Passwort vergessen, E-Mail ändern                | Braucht SMTP-Zugangsdaten zum Echtbetrieb          |
| 5   | **12.11–12.15** Testdaten, Prüfungen, Sicherung                  | Qualität                                           |
| 6   | **9.2a / 12.7a** Dunkle Karte, Symbol                            | Darstellung                                        |
| 7   | **1.8** Next 16                                                  | Zuletzt vor den Daten; vorher Bescheid (s. o.)     |
| 8   | **Datenarbeit** 2e.11, dann 2e.6 in Stufen (D-07), 3.10, 3.3, 3.4, 2d.8a, 2c.4 / 2d.9 | Fällt unter die Vorgabe oben |

**Neue Knöpfe und Meldungen kommen seit 15.2 gleich in
`src/i18n/de.ts`, nicht in die Komponente** (Aufbau in
[Erledigt.md](Erledigt.md) unter 15.2) – und in `en.ts` und `es.ts`: Ein fehlender
Schlüssel ist ein Typfehler, und neue Sätze gehen wie in 15.6 durch die
maschinelle Mehrfachprüfung.

**3.10 ist der Lauf, der aus dem gebauten Kreuzvergleich Nutzen macht** –
abgeglichen ist bislang eine Stadt.

---

## 0. Entscheidungen und Angaben, die bei dir liegen

- [!] **D-05 Parkplätze ohne Koordinaten.** Empfehlung: als „Position ungenau" kennzeichnen und nur in der Liste führen. Faktisch gelöst – alle 18.072 Standorte haben Koordinaten.
- [!] **10.2a Anschrift für das Impressum.** Name und E-Mail sind festgelegt (`WHEELEE_OPERATOR_NAME`, `_EMAIL`); die **ladungsfähige Anschrift fehlt bewusst** (Torsten 2026-10-24: „erstmal weglassen"). Ohne sie ist das Impressum nach § 5 DDG unvollständig; die Seite nennt den Mangel (E2E-geprüft). Vorlage: [deploy/env.beispiel](deploy/env.beispiel).

## 1. Projekt-Setup

- [ ] 1.8 **Next 16.** Behebt die zwei Audit-Wurzeln (`postcss` über `next`, `braces` über `eslint-config-next`); hier läuft 15.5.27. **Erst nachdem Torsten den bis dahin fertigen Stand committet hat** (Reihenfolge, Platz 7). Zu prüfen: `middleware.ts` (CSP-Nonce), Service Worker, `node:sqlite`, Produktionsbau.

## 2. Datenquellen und Import

- [ ] 2c.4 Fehlende Parkplätze in OpenStreetMap nachtragen; davon profitieren auch alle anderen Nutzungen.
- [ ] 2d.8a **Neun Städte mit ungenutzter amtlicher Quelle ansehen.** **München zuerst:** Datensatz „Behindertenparkplätze“ auf opendata.muenchen.de, dl-by-de 2.0, WFS, täglich aktualisiert; im Bestand stehen 219 Standorte aus OSM (Details in [Erledigt.md](Erledigt.md), 3.2). Die übrigen acht: `npm run sources:check` findet sie. Bei Kiel, Krefeld und Aachen ist die Ablehnung richtig (Anwohnerparken); bei Bochum, Bielefeld, Karlsruhe, Norderstedt und Viersen lohnt der Blick aufs Stadtportal.
- [ ] 2d.9 **Regensburg: 156.000 Einwohner, kein einziger erfasster Platz** – eine Lücke in OpenStreetMap. Anfrage bei der Straßenverkehrsbehörde, Nachtragen in OSM.
- [ ] 2e.6 **Restliche Gemeinden aus OpenStreetMap, in Stufen** (Entscheidung D-07, [Erledigt.md](Erledigt.md)): ab 20.000, dann 10.000, dann 5.000, dann alle; jede Stufe erst nach den Prüfungen (Streuung über 15 km, Dichte über dem Dreifachen des Medians). Voraussetzung ist 2e.11.
- [ ] 2e.11 **Massendaten ohne Overpass holen.** Vorgesehen sind die **Bundesland-Auszüge von Geofabrik** (`.osm.pbf`, ODbL, täglich). Aufwand: PBF-Leser (Protocol Buffers, zlib-Blöcke, Delta-Kodierung) ohne neue Abhängigkeit, wie `zip.mts` und `xlsx.mts`. Zwischenstufe, falls das zu viel ist: `import:osm-state` mit Pausen über die 16 Länder.

## 3. Datenvalidierung

- [ ] 3.3 **Straßenabgleich:** nennt die Rückwärtssuche bei der Koordinate dieselbe Straße wie die Quelle? Für Frankfurt gibt es das schon, für alle anderen nicht.
- [ ] 3.4 **Abstand zur nächsten Straße.** Punkte über 25 m von jeder Straße sind fast immer falsch verortet. Eine Overpass-Abfrage je Stadt.
- [ ] 3.10 **Den Kreuzvergleich über alle 23 amtlichen Städte laufen lassen.** Abgeglichen ist bislang **eine** Stadt (Germersheim). `npm run validate` **mit** Netz; ansehen: Ausreißer nach unten und die Gruppe **„nur OSM"**.

## 9. Darstellung und Bedienung

- [ ] 9.2a Echte dunkle Kacheln, nur wenn ein kostenloser Anbieter dies erlaubt (etwa CARTO Dark Matter); Bedingungen und Attribution online prüfen, kostenpflichtig wird abgelehnt.
- [ ] 9.9 Test mit NVDA/VoiceOver und Vergrößerung macht Torsten selbst; die ARIA-Struktur der Zielsuche ist angepasst (9.18, [Erledigt.md](Erledigt.md)).
- [~] 9.18 **Zielsuche: Rest.** Gebaut sind (a)–(e), siehe [Erledigt.md](Erledigt.md). Offen: **(f) Enter ohne sichtbare Liste** setzt ungesehen das Ziel (`DestinationSearch.tsx`, `onKeyDown`); mit Vorschau statt blindem Setzen, dazu der E2E-Test „Enter sucht sofort“ anpassen. Ein zweiter Geocoder nur mit ausdrücklicher Zusage.

## 10. Datenschutz und Recht


## 11. Benutzerkonten

- [ ] 11.1 **„Passwort vergessen" per Mail** (Entscheidung D-10 in [Erledigt.md](Erledigt.md): SMTP über Umgebungsvariablen, Paket `nodemailer`). Link einmalig, eine Stunde gültig, nur als Hash gespeichert; ohne SMTP-Zugangsdaten sind die Mail-Funktionen ausgeblendet. Magic Link und Passkey entfallen.
- [ ] 11.8 **E-Mail-Adresse selbst ändern.** Nur mit Passwort, dann Bestätigungsmail an die **neue** Adresse; erst der Klick tauscht sie. Gleicher Mailweg wie 11.1.

## 12. Qualität und Deployment

- [ ] 12.7a Symbol gestalterisch überarbeiten – funktional, aber von mir gezeichnet.
- [ ] 12.11 **Testdaten aufräumen:** E2E-Specs hinterlassen Konten in `.data/`; am Ende des Laufs entfernen oder je Lauf eine eigene Datei nutzen.
- [ ] 12.12 **E2E auch gegen den Produktionsbau** (`next start`), damit Service Worker, Kopfzeilen und der übersprungene Offline-Test mitlaufen.
- [ ] 12.13 **Konsistente Sicherung der SQLite-Datei** (`VACUUM INTO` oder `.backup` statt Kopie der laufenden WAL-Datei), als Befehl und dokumentiert.
- [ ] 12.14 **Prüfen, ob die `*.test.mts` unter `scripts/import/` in `npm run test` laufen**, sonst aufnehmen.
- [ ] 12.15 **Die Erwartungszahl der Unit-Tests** in „Vor dem Anfangen" nicht von Hand führen; Prüfung, die sie abgleicht.

## 15. Mehrsprachigkeit

- [~] 15.1 **Weitere Sprachen – zurückgestellt (Torsten, 2026-10-24: „erstmal nicht").** Französisch, Italienisch, Polnisch, Niederländisch, Türkisch, Russisch, Arabisch; Aufbau und Gründe in [Erledigt.md](Erledigt.md) unter 15.1 und 15.6.

---

## Gesperrt bis zu deiner Freigabe

**Nichts hiervon wird gebaut, bevor du es Punkt für Punkt freigibst.** Die Erwägungen stehen in
[Erledigt.md](Erledigt.md) unter „Erwägungen zu 13, 15 und 16".

**Abschnitt 13 – Finanzierung.** Wer trägt die Kosten, und zu welchem Preis?

- [-] 13.1 Spenden-Knopf · [-] 13.2 Werbebanner (widerspricht 10.4 „keine Tracker") · [-] 13.3 Einwilligungsbanner, falls Werbung kommt
