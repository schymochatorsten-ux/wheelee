# Täglicher Datenlauf auf dem NAS – Einrichtung

Für Torsten und Niklas. Das Skript ist fertig (ToDo 19.2, 19.10), **aber auf dem
NAS nie gelaufen** – der Lauf im Container und der Push sind nicht erprobt.
Deshalb unten erst ein Trockenlauf, dann ein echter Lauf **ohne** Push, und erst
danach der Timer.

## Was der Lauf tut

Einmal am Tag (04:30, bis zu eine Stunde später). An den meisten Tagen ist nichts
fällig und der Lauf nach rund einer halben Minute vorbei – ohne Commit, ohne Push,
ohne Neubau:

1. Klon des Repositories unter `/var/lib/wheelee-update/repo` auf `origin/main`
   bringen.
2. In einem Wegwerf-Container (`node:24-alpine`): prüfen, ob sich eine amtliche
   Quelle geändert hat (`sources:check`, fragt nur nach Änderungsdaten, lädt
   nichts) und die betroffenen **amtlichen** Städte neu importieren
   (`npm run data:update`) – **höchstens 5 je Lauf**, die am längsten
   unbesehenen zuerst; der Rest bleibt vorgemerkt und kommt an den Folgetagen
   dran. Ein Ergebnis wird nur übernommen, wenn die Stadt amtlich bleibt und nicht
   unter 70 % ihres Bestands fällt; sonst kommt der alte Stand zurück und der
   Import wird erst nach einer Woche wiederholt. Sind die Standorte nach dem
   Neuholen identisch, ändert sich nichts, und die Stadt gilt bis zur nächsten
   Änderung der Quelle als erledigt.
3. In den Monaten Januar und Juli **einmal** (beim ersten Lauf des Monats)
   zusätzlich `npm run validate` (Abgleich der amtlichen Städte mit
   OpenStreetMap). Ein Merkzettel `validate-JJJJ-MM` im Zustandsverzeichnis
   verhindert, dass die Prüfung dann 62 Tage hintereinander läuft.
4. Die Datei geprueft.json (wann jede Stadt zuletzt verglichen wurde, für /abdeckung) kopiert das Skript bei **jedem** Lauf per docker exec in das Volume der App; sie löst keinen Neubau aus.
5. **Nur wenn sich Standortdaten wirklich geändert haben:** committen und nach
   `origin/main` pushen. Der Push löst den normalen Webhook-Deploy aus (Abbild
   neu bauen). Ändert sich nichts, gibt es weder Commit noch Neubau.

Nicht automatisch: die rund 3.700 OpenStreetMap-Gemeinden (kein Änderungsdatum,
und tausende Overpass-Abfragen laufen nie ungesehen) sowie Bochum und Köln
(2d.8a, brauchen eine Entscheidung).

## Warum täglich (und nicht monatlich)

Die Frage war, ob ein seltener Großlauf oder ein täglicher Kleinlauf besser ist.
Täglich gewinnt, **weil die Prüfung fast nichts kostet und die teure Folge, der
Neubau des Abbilds, ohnehin nur bei echter Datenänderung entsteht**:

- Die Prüfung ist rund 20 Sekunden und 200 MB. Täglich heißt: eine geänderte
  Quelle ist binnen eines Tages in der App, nicht binnen eines Monats.
- Statt einmal im Monat viele Städte (und Nominatim/Overpass auf einen Schlag) sind
  es höchstens 5 je Lauf. Das schont die Fremddienste und hält jeden Commit klein
  genug, um ihn anzusehen.
- Das Rauschen ist beherrscht: GovData meldet `metadata_modified` auch bei
  geänderter Beschreibung (im ersten Lauf blieb die Standortzahl bei sieben von
  neun „geänderten“ Städten gleich). Damit das täglich keine Dauerschleife wird,
  merkt sich der Lauf, was er angesehen hat (`looked`), wiederholt Verworfenes erst
  nach einer Woche (`tried`) und führt Aufgeschobenes weiter (`pending`).
  Ohne diese Merker würde eine einzige Metadatenänderung jeden Tag dieselbe
  Abfrage auslösen.
- `Persistent=true`: Ist das NAS nachts aus, läuft der Lauf beim nächsten Start nach.
- **Was täglich nicht passiert:** die Validierung gegen OpenStreetMap (sie fragt
  Overpass für jede amtliche Stadt) bleibt halbjährlich, wie in `Datenpflege.md`.

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
`WHEELEE_CPUS`, `WHEELEE_MAX_STAEDTE` (Vorgabe 5), `WHEELEE_VALIDIERUNG_MONATE`,
`WHEELEE_MAX_DATEIEN` (Vorgabe 15).

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

Der erste Lauf installiert die Abhängigkeiten (einige Minuten). Fällig ist am
Anfang vermutlich nur Köln (dessen Dienst liefert kein JSON mehr): Der Import wird
verworfen, der alte Stand bleibt – das ist ein guter Test der Notbremse und
kein Fehler. Werden Städte importiert, dauert es länger, wenn Adressen
nachgeschlagen werden müssen (Nominatim: eine Anfrage je Sekunde). Danach im Klon
ansehen:

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

Im Alltag ist an den meisten Tagen **nichts zu sehen**. Kontrolle, wenn man
wissen will, ob der Lauf lebt:

```bash
systemctl list-timers 'wheelee-*'                          # nächster Lauf
journalctl -u wheelee-aktualitaet --since '2 days ago' | tail -n 30
```

## Ersten Admin anlegen (ToDo 10.20, 18.7)

Unabhängig vom Datenlauf, aber mit demselben Klon. Voraussetzung: Der Stand mit
`admin:create` ist deployt und im Klon (`git -C /var/lib/wheelee-update/repo pull`
oder ein Trockenlauf von oben), und die `node_modules` im Klon sind da (erster
Datenlauf).

```bash
docker volume ls | grep wheelee-data        # genauen Namen des Volumes ablesen
read -rs -p "Startpasswort: " WHEELEE_START_PASSWORD; echo; export WHEELEE_START_PASSWORD
docker run --rm --user 1001:1001 -e HOME=/tmp \
  -e WHEELEE_DB_PATH=/app/var/wheelee.sqlite -e WHEELEE_START_PASSWORD \
  -v <NAME-DES-VOLUMES>:/app/var \
  -v /var/lib/wheelee-update/repo:/work -w /work \
  node:24-alpine npx tsx scripts/create-admin.mts \
  --username Torsten --email <ADRESSE VON TORSTEN>
unset WHEELEE_START_PASSWORD
```

- `--user 1001:1001` ist die Kennung, unter der die App läuft: Sonst legt der Lauf
  Dateien an (`-wal`, `-shm`), die der App nicht gehören und die sie nicht öffnen kann.
- Das Startpasswort wird nur abgefragt, nicht ausgegeben und landet nicht in der
  Shell-Historie. Es unterliegt nicht der Mindestlänge, ist aber ein Wegwerfwert.
- **Sofort danach** auf `https://wheelee.de` mit Name (oder Adresse) und
  Startpasswort anmelden und ein eigenes Passwort setzen; bis dahin gibt das
  Konto keine Verwaltungsrechte.
- Antwortet das Skript „schon vergeben“, ändert es nichts.

## Wenn etwas schiefgeht

| Beobachtung | Bedeutung | Was tun |
| --- | --- | --- |
| `systemctl status wheelee-aktualitaet` zeigt `failed` | Push gescheitert oder mehr als 15 Dateien geändert; die letzte Zeile nennt den Grund | Stand liegt im Klon auf `daten-update`; ansehen, dann von Hand übernehmen oder verwerfen |
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
