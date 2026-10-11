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

Das Secret steht **nicht** im Repo. Die Datei hier ist eine Vorlage; die
echte Konfiguration liegt unter `/etc/wheelee/hooks.json` – außerhalb des
Arbeitsbaums, damit kein Deploy sie überschreibt.

## Einrichten

```bash
sudo apt install -y webhook

sudo mkdir -p /etc/wheelee
sudo sed "s/__SECRET__/$(sudo cat /opt/wheelee/.webhook-secret)/" \
  /opt/wheelee/deploy/hooks.template.json | sudo tee /etc/wheelee/hooks.json >/dev/null
sudo chmod 600 /etc/wheelee/hooks.json

chmod +x /opt/wheelee/deploy/deploy.sh
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

| Feld | Wert |
| --- | --- |
| Location | `/_hook` |
| Scheme | `http` |
| Forward Hostname/IP | `100.71.71.105` |
| Forward Port | `3016` |

## In GitHub

Repo → Settings → Webhooks → Add webhook

| Feld | Wert |
| --- | --- |
| Payload URL | `https://wheelee.de/_hook/wheelee-deploy` |
| Content type | `application/json` |
| Secret | der Inhalt von `/opt/wheelee/.webhook-secret` |
| Events | nur `push` |

## Mitlesen

```bash
journalctl -u wheelee-webhook -f
```
