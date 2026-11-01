# Monatlicher Datenlauf auf dem NAS – Einrichtung

Für Torsten und Niklas. Das Skript ist fertig (ToDo 19.2, 19.10), **aber auf dem
NAS nie gelaufen** – der Lauf im Container und der Push sind nicht erprobt.
Deshalb unten erst ein Trockenlauf, dann ein echter Lauf **ohne** Push, und erst
danach der Timer.

## Was der Lauf tut

Einmal im Monat (am 1., 04:30, bis zu eine Stunde später):

1. Klon des Repositories unter `/var/lib/wheelee-update/repo` auf `origin/main`
   bringen.
2. In einem Wegwerf-Container (`node:24-alpine`): prüfen, ob sich eine amtliche
   Quelle geändert hat (`sources:check`, fragt nur nach Änderungsdaten, lädt
   nichts) und die betroffenen **amtlichen** Städte neu importieren
   (`npm run data:update`). Ein Ergebnis wird nur übernommen, wenn die Stadt
   amtlich bleibt und nicht unter 70 % ihres Bestands fällt; sonst kommt der alte
   Stand zurück. Sind die Standorte nach dem Neuholen identisch, ändert sich
   nichts.
3. In den Monaten Januar und Juli zusätzlich `npm run validate` (Abgleich der
   amtlichen Städte mit OpenStreetMap).
4. **Nur wenn sich Standortdaten wirklich geändert haben:** committen und nach
   `origin/main` pushen. Der Push löst den normalen Webhook-Deploy aus (Abbild
   neu bauen). Ändert sich nichts, gibt es weder Commit noch Neubau.

Nicht automatisch: die rund 3.700 OpenStreetMap-Gemeinden (kein Änderungsdatum,
und tausende Overpass-Abfragen laufen nie ungesehen) sowie Bochum und Köln
(2d.8a, brauchen eine Entscheidung).

## Warum monatlich

- Amtliche Listen ändern sich selten; eine Prüfung kostet fast nichts, aber **jeder
  Push baut auf dem NAS das Abbild neu** (Installation, Build – das ist die mit
  Abstand größte Last im ganzen Vorgang). Je seltener, desto weniger davon.
- GovData meldet `metadata_modified` auch bei geänderter Beschreibung. Beim ersten
  Lauf blieb die Standortzahl bei sieben von neun „geänderten“ Städten gleich
  (nur Frankfurt wich ab, Köln wurde verworfen). Bei wöchentlichem Takt gäbe es
  das Rauschen viermal so oft. Deshalb gibt es die Gleichheitsprüfung, und
  deshalb bleibt es bei einmal im Monat.
- `Persistent=true`: Ist das NAS am 1. aus, läuft der Lauf beim nächsten Start nach.
- Die Validierung gegen OpenStreetMap halbjährlich, wie in `Datenpflege.md`
  vorgesehen; sie fragt Overpass für jede amtliche Stadt.

## Ressourcen

Gemessen am 2026-11-01 auf dem Entwicklungsrechner (Windows, Node 24; auf dem NAS
nicht gemessen):

| Schritt | Dauer | Arbeitsspeicher (Spitze) |
| --- | --- | --- |
| Prüfung aller Quellen | rund 20 s | rund 200 MB |
| Neuimport einer Stadt (Adressen im Zwischenspeicher) | 3 s | rund 200 MB |
| Straßennamen nachtragen (Overpass) | Minuten, wartet auf den Dienst | bis rund 500 MB |
| Erstlauf mit neun Städten, Adressen neu nachgeschlagen | rund 1 Stunde | siehe oben |

Die Zeit geht fast ganz für Fremddienste drauf (Nominatim: eine Anfrage je
Sekunde, Overpass mit Pausen), nicht für Rechenarbeit. Daraus folgt:

- Der Container ist auf **1 CPU, 1 GB RAM (ohne Swap), 256 Prozesse** gedeckelt und
  hat niedrige CPU-Gewichtung (`--cpu-shares=128`); das Skript läuft mit `Nice=19`
  und Leerlauf-IO. Die App selbst wird dadurch nicht spürbar gebremst.
- Abhängigkeiten werden **nur installiert, wenn sich `package-lock.json`
  geändert hat** (rund 600 MB, einige Minuten). Sonst entfällt das ganz.
- Der Klon liegt dauerhaft da (rund 100 MB), statt jedes Mal neu geholt zu werden.
- Plattenplatz insgesamt: grob 1 GB unter `/var/lib/wheelee-update` plus das Abbild
  `node:24-alpine` (rund 160 MB).
- **Die größte Last ist der Neubau nach dem Push**, nicht der Lauf. Er entsteht
  nur bei echter Datenänderung.

Drehknöpfe, falls nötig (Umgebungsvariablen in `wheelee-aktualitaet.service`):
`WHEELEE_CPUS`, `WHEELEE_VALIDIERUNG_MONATE`, `WHEELEE_MAX_DATEIEN`.

## Einrichten (Niklas am NAS, Torsten dabei)

Alles als Benutzer `niklas`, der auch den Webhook betreibt. Reihenfolge einhalten.

### 1. Voraussetzungen prüfen

```bash
git -C /opt/wheelee remote -v        # Adresse, über die der Deploy holt
docker ps                            # Benutzer darf Docker
systemctl status wheelee-webhook --no-pager   # Deploy läuft
```

Notieren, ob die Adresse `git@github.com:…` (SSH) oder `https://…` ist.

### 2. Schreibrecht für das Repository

Der Deploy liest nur. Der Datenlauf muss **schreiben** (`git push origin
HEAD:main`).

- **SSH-Adresse mit Deploy-Key:** In GitHub unter Repository → Settings → Deploy
  keys den bestehenden Schlüssel löschen und denselben öffentlichen Schlüssel
  (`cat ~/.ssh/<schluessel>.pub`) neu eintragen, **mit Haken „Allow write
  access“**. GitHub erlaubt denselben Schlüssel nicht zweimal und lässt sich den
  Schreibzugriff nicht nachträglich ändern. Alternativ ein zweiter, eigener
  Schlüssel nur für den Datenlauf (dann `~/.ssh/config` mit eigenem Host-Alias und
  die Adresse im Klon entsprechend setzen – Niklas weiß, wie das beim Webhook
  gelöst ist).
- **HTTPS-Adresse:** braucht ein Token mit Schreibrecht auf dieses Repository; das
  nicht ins Repository und nicht in die `.service`, sondern in die
  Git-Zugangsdaten des Benutzers.
- **Ist `main` geschützt** (Pull-Request-Pflicht)? Dann wird der Push abgewiesen.
  Entweder die Regel für diesen Schlüssel lockern oder bei `WHEELEE_AUTO_PUSH=0`
  bleiben und den Zweig `daten-update` von Hand per Pull Request übernehmen.

### 3. Arbeitsverzeichnis anlegen

```bash
sudo mkdir -p /var/lib/wheelee-update
sudo chown niklas:niklas /var/lib/wheelee-update
```

### 4. Trockenlauf (ändert nichts)

```bash
sudo -u niklas env WHEELEE_TROCKEN=1 sh /opt/wheelee/deploy/wheelee-aktualitaet.sh
```

Erwartet: Klon wird angelegt, Abhängigkeiten installiert (einige Minuten, nur beim
ersten Mal), dann eine Zeile wie `N amtliche Stadt/Städte fällig: …` und zum Schluss
`Trockenlauf: nichts geändert, nichts gepusht.` Bricht er hier ab, ist es fast
immer Docker (Rechte), das Netz oder die Git-Adresse.

### 5. Echter Lauf ohne Push

```bash
sudo -u niklas env WHEELEE_AUTO_PUSH=0 sh /opt/wheelee/deploy/wheelee-aktualitaet.sh
```

Dauert beim ersten Mal bis zu eine Stunde, wenn Adressen nachgeschlagen werden
müssen. Danach im Klon ansehen:

```bash
cd /var/lib/wheelee-update/repo
git log --oneline -3 daten-update        # falls es Änderungen gab
git diff --stat origin/main daten-update
cat data/_auto-update.md                 # was geschah, je Stadt
```

Ändert sich nichts, steht „Keine Änderung an den Standortdaten“. Das ist ein
gültiges Ergebnis.

### 6. Push prüfen

```bash
cd /var/lib/wheelee-update/repo
git push --dry-run origin HEAD:main
```

Meldet das `Permission denied` oder `403`, fehlt das Schreibrecht (Schritt 2).
Endgültig zeigt es erst ein echter Push.

### 7. Timer einschalten

```bash
sudo cp /opt/wheelee/deploy/wheelee-aktualitaet.{service,timer} /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now wheelee-aktualitaet.timer
systemctl list-timers 'wheelee-*'
```

`WHEELEE_AUTO_PUSH=1` steht in der `.service`. Soll der erste automatische Lauf noch
nichts pushen, vor dem Kopieren auf `0` setzen.

Danach den Dienst **einmal von Hand mit Push** starten, solange beide am Gerät sind:

```bash
sudo systemctl start wheelee-aktualitaet.service
journalctl -u wheelee-aktualitaet -f
```

Bei einer Datenänderung muss danach im `journalctl -u wheelee-webhook` ein Deploy
auftauchen und `https://wheelee.de` mit den neuen Daten antworten.

## Wenn etwas schiefgeht

| Beobachtung | Bedeutung | Was tun |
| --- | --- | --- |
| `systemctl status wheelee-aktualitaet` zeigt `failed` | Push gescheitert oder mehr als 40 Dateien geändert; die letzte Zeile nennt den Grund | Stand liegt im Klon auf `daten-update`; ansehen, dann von Hand übernehmen oder verwerfen |
| „Ein Datenlauf läuft bereits“ | Handstart und Timer überschnitten sich | nichts, der zweite endet von selbst |
| Stadt steht im Bericht als „verworfen“ | Quelle liefert nichts mehr oder deutlich weniger | `data/_auto-update.md` lesen; Quelle prüfen (so wurde Kölns kaputter Dienst entdeckt) |
| Falsche Daten sind live | Quelle hat Unsinn geliefert, der die Prüfungen passierte | auf dem PC den Commit „Daten: automatische Aktualisierung …“ zurücknehmen und pushen; der Deploy stellt es wieder her |

Abschalten: `sudo systemctl disable --now wheelee-aktualitaet.timer`. Aufräumen:
`sudo rm -r /var/lib/wheelee-update` (der Docker-Zwischenspeicher darin gehört
`root`).

## Was nicht erprobt ist

Der Container-Lauf, der Push mit Schreibschlüssel und der Rebase bei zwischenzeitlich
weitergezogenem `main` sind am 2026-11-01 nur geschrieben und gelesen, nicht
ausgeführt worden (auf dem Entwicklungsrechner gibt es kein Docker). Die
Datenseite (`npm run data:update`) lief dort dagegen vollständig.
