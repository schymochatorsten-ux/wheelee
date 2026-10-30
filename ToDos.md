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
| 3   | **2d.8a** Bochum (braucht die Datei von Torsten)                 | Portal sperrt den Abruf                            |
| 6   | **15.1** weitere Prüfrunden der Übersetzungen (it, pl, nl, pt, ru) | Sprachen sind gebaut, eine Runde ist gelaufen    |

**Neue Knöpfe und Meldungen kommen seit 15.2 gleich in
`src/i18n/de.ts`, nicht in die Komponente** (Aufbau in
[Erledigt.md](Erledigt.md) unter 15.2) – und in `en.ts` und `es.ts`: Ein fehlender
Schlüssel ist ein Typfehler, und neue Sätze gehen wie in 15.6 durch die
maschinelle Mehrfachprüfung.

**3.10 ist der Lauf, der aus dem gebauten Kreuzvergleich Nutzen macht** –
abgeglichen ist bislang eine Stadt.

---


## 2. Datenquellen und Import

- [~] 2d.8a **Städte mit ungenutzter amtlicher Quelle.** München und Bielefeld sind umgestellt (Befund in [Erledigt.md](Erledigt.md)). **Offen: Bochum.** Der Server antwortet mit 403, der ArcGIS-Dienst ist weg. **Aufgehoben (Torsten, 2026-10-30), falls ich es nicht selbst kann – kann ich nicht.** **Braucht Torsten:** die CSV oder das GeoJSON „Bochum – Behindertenparkplätze“ (CC0) von `bochum.opendata.ruhr` im Browser laden und in den Arbeitsordner legen; vorher prüfen, ob sie Koordinaten enthält.

## 3. Datenvalidierung



## 15. Mehrsprachigkeit

- [~] 15.1 **Zweite und dritte Prüfrunde der Übersetzungen** nach 15.6 fehlt noch für Italienisch, Polnisch, Niederländisch, Portugiesisch und Russisch (eine Runde ist gelaufen, Befund in [Erledigt.md](Erledigt.md), 15.1). Alle Sprachen sind gebaut; eine weitere Sprache braucht je `src/i18n/<code>.ts`, Eintrag in `index.ts`, Zeile in `opening-hours.test.ts` und einen E2E-Test in `sprache.spec.ts`.

---

## 19. Betrieb und Pflege

Was von 19 baubar war, ist gebaut (19.1, 19.4, 19.7, 19.8; Begründung in [Erledigt.md](Erledigt.md)). Offen ist, was auf dem NAS oder von Hand geschieht:

- [~] 19.2 **Monatlicher Aktualitätslauf auf dem NAS.** Skript und Timer liegen in `deploy/wheelee-aktualitaet.*`, auf dem NAS nicht erprobt. **Braucht Torsten:** einschalten (Befehle in `deploy/README.md`, „Zeitgesteuerte Läufe“) und nach dem ersten Lauf `data/_aktualitaet.md` ansehen.
- [~] 19.3 **Zeitgesteuerte Sicherung.** Skript und Timer liegen in `deploy/wheelee-sicherung.*` (täglich, 14 Sicherungen), auf dem NAS nicht erprobt. **Braucht Torsten:** einschalten wie 19.2 und einmal mit `systemctl start wheelee-sicherung.service` prüfen.
- [!] 19.5 **„Nur OSM“ und „aufgehoben gemeldet“ als OpenStreetMap-Hinweise zurückgeben.** Geschieht von Hand in OSM-Notizen mit eigenem Konto; die Liste der Kandidaten steht in `data/_validierung.md`.
- [!] 19.6 **Laufender Betriebsmonitor** (Eintrag in nfuptime, siehe Checkliste in `wheelee-infrastruktur.md`). Braucht Zugang zu nfuptime.

## Gesperrt bis zu deiner Freigabe

**Nichts hiervon wird gebaut, bevor du es freigibst.** Die Erwägungen stehen in
[Erledigt.md](Erledigt.md) unter „Erwägungen zu 13, 15 und 16".

**Abschnitt 13 – Finanzierung.** Wer trägt die Kosten, und zu welchem Preis?

- [-] 13.1 Spenden-Knopf · [-] 13.2 Werbebanner (widerspricht 10.4 „keine Tracker") · [-] 13.3 Einwilligungsbanner, falls Werbung kommt
