# Push-to-Deploy für wheelee

Ein Push auf `origin/main` löst auf dem NAS einen Neubau aus. Der Weg:

```
GitHub → https://wheelee.de/_hook/wheelee-deploy
       → VPS: Nginx Proxy Manager (Custom Location /_hook)
       → Tailscale → NAS 100.71.71.105:3016
       → webhook prüft Signatur und Branch
       → deploy.sh: git reset --hard origin/main && docker compose up -d --build
```

**Warum Signaturprüfung und nicht „nur" eine schwer zu erratende URL:** Der
Endpunkt ist aus dem Internet erreichbar. Ohne `X-Hub-Signature-256` könnte
jeder, der die Adresse kennt oder errät, beliebig oft einen Build auslösen –
auf einem Gerät, das auch alle anderen Dienste des Haushalts trägt.

**Warum `git reset --hard` und nicht `git pull`:** Ein Merge kann scheitern
und einen halb zusammengeführten Baum hinterlassen, der dann gebaut wird. Der
Server hat keine eigenen Änderungen zu schützen; er soll exakt den Stand von
`origin/main` zeigen.

**Warum `bash deploy.sh` und nicht das Skript direkt:** Das Repo wird unter
Windows gepflegt, und dort gibt es kein Ausführbar-Bit. Ein `chmod +x` auf
dem NAS hält nur bis zum nächsten Pull, der die Datei ersetzt – der zweite
Deploy scheiterte genau daran mit „permission denied". Der Aufruf über
`bash` ist unabhängig davon.

Das Secret steht **nicht** im Repo. Die Datei hier ist eine Vorlage; die
echte Konfiguration liegt unter `/etc/wheelee/hooks.json` – außerhalb des
Arbeitsbaums, damit kein Deploy sie überschreibt.

## Einmalig vor dem ersten Start: `.env` anlegen

Seit dem 2026-10-11 hat wheelee Konten und Rückmeldungen und damit eine
Datenbank. Zwei Dinge sind dafür **einmal** einzurichten; ohne sie startet die
App zwar, aber niemand kommt an die Rückmeldungen heran.

```bash
cp /opt/wheelee/deploy/env.beispiel /opt/wheelee/.env
nano /opt/wheelee/.env     # ADMIN_EMAILS auf die eigene Adresse setzen
chmod 600 /opt/wheelee/.env
docker compose up -d --build
```

**Reihenfolge bei `ADMIN_EMAILS`:** Zuerst mit dieser Adresse ein Konto registrieren,
dann die Adresse eintragen und den Container neu starten. Beim ersten Zugriff wird
das vorhandene Konto zum Admin in der Datenbank; danach zählt nur noch die Rolle
(ToDo 10.19). Eine Adresse, die erst nach dem Start registriert wird, bekommt nichts.

Danach **in der App ein Konto mit genau dieser Adresse anlegen** (Einstellungen
→ Konto). Die Adresse allein genügt nicht – sie sagt nur, wer Administrator
sein darf; das Konto dazu entsteht wie jedes andere.

Zwei Punkte, die sich leicht übersehen lassen:

- **`.env` liegt nur auf dem NAS**, nie im Repository – `git reset --hard`
  beim Deploy darf sie nicht überschreiben. Sie ist über `.gitignore`
  ausgeschlossen, und `docker-compose.yml` bindet sie mit
  `required: false` ein: Fehlt sie, startet der Container trotzdem.
- **Die Datenbank liegt im Volume `wheelee-data`**, nicht im Abbild. Das ist
  der Unterschied zu allen bisherigen Deploys: Ein Neubau war früher ein
  vollständiger Ersatz, der nichts verlieren konnte. Jetzt gibt es Daten, die
  ihn überleben müssen.

```bash
# Gegenprobe, dass das Volume wirklich benutzt wird:
docker compose exec wheelee ls -l /app/var
```

## Zeitgesteuerte Läufe (ToDo 19.2, 19.3)

Zwei Timer liegen bereit, **sind aber nur Dateien, bis du sie auf dem NAS
einschaltest** – sie wurden nicht auf dem NAS ausprobiert. Beim Einrichten
`User=`/`Group=` in den `.service`-Dateien anpassen (wie beim Webhook).

- `wheelee-sicherung` – täglich 03:30, `VACUUM INTO` im Container, die letzten
  14 Sicherungen bleiben (`WHEELEE_SICHERUNGEN` ändert die Zahl).
- `wheelee-aktualitaet` – am Monatsersten, `sources:check` und `validate` in
  einem Wegwerf-Container; Ergebnis in `data/_aktualitaet.md` und
  `data/_validierung.md`. Ändert keine Seed-Dateien.

```bash
sudo chmod +x /opt/wheelee/deploy/*.sh
sudo cp /opt/wheelee/deploy/wheelee-{sicherung,aktualitaet}.{service,timer} /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now wheelee-sicherung.timer wheelee-aktualitaet.timer
systemctl list-timers 'wheelee-*'
sudo systemctl start wheelee-sicherung.service   # einmal von Hand zur Probe
```

## Einrichten

```bash
sudo apt install -y webhook

sudo mkdir -p /etc/wheelee
sudo sed "s/__SECRET__/$(sudo cat /opt/wheelee/.webhook-secret)/" \
  /opt/wheelee/deploy/hooks.template.json | sudo tee /etc/wheelee/hooks.json >/dev/null
sudo chmod 600 /etc/wheelee/hooks.json

sudo cp /opt/wheelee/deploy/wheelee-webhook.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now wheelee-webhook
```

Prüfen:

```bash
systemctl status wheelee-webhook --no-pager
curl -s -o /dev/null -w '%{http_code}\n' http://100.71.71.105:3016/_hook/wheelee-deploy
```

Erwartet: `active (running)` und `200` (ohne gültige Signatur lehnt der
Dienst die Ausführung ab, antwortet aber).

Die Datei muss für den Dienst lesbar sein – sie gehört `root`, der Dienst
läuft als `niklas`:

```bash
sudo chown root:docker /etc/wheelee/hooks.json && sudo chmod 640 /etc/wheelee/hooks.json
```

## Im NPM

Beim bestehenden Proxy Host `wheelee.de` unter **Custom Locations**:

| Feld                | Wert            |
| ------------------- | --------------- |
| Location            | `/_hook`        |
| Scheme              | `http`          |
| Forward Hostname/IP | `100.71.71.105` |
| Forward Port        | `3016`          |

## In GitHub

Repo → Settings → Webhooks → Add webhook

| Feld         | Wert                                          |
| ------------ | --------------------------------------------- |
| Payload URL  | `https://wheelee.de/_hook/wheelee-deploy`     |
| Content type | `application/json`                            |
| Secret       | der Inhalt von `/opt/wheelee/.webhook-secret` |
| Events       | nur `push`                                    |

## Mitlesen

```bash
journalctl -u wheelee-webhook -f
```
