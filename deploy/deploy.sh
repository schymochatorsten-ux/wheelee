#!/usr/bin/env bash
#
# Deploy nach einem Push auf origin/main (ToDo: Push-to-Deploy, 2026-10-11).
#
# Wird vom Webhook-Dienst aufgerufen, nie direkt aus dem Netz. Der Dienst
# prüft vorher die GitHub-Signatur und den Branch; hier wird nichts mehr
# geglaubt, was von außen kommt – das Skript nimmt keinerlei Parameter
# entgegen.

set -euo pipefail

cd /opt/wheelee

# Ein Lauf nach dem anderen. Zwei Pushes kurz hintereinander würden sonst
# zwei Builds auf denselben Ordner loslassen.
exec 9>/tmp/wheelee-deploy.lock
flock -n 9 || {
  echo "Ein Deploy läuft bereits – dieser Aufruf wird übersprungen."
  exit 0
}

echo "=== $(date --iso-8601=seconds) Deploy beginnt ==="

vorher="$(git rev-parse HEAD)"
git fetch --quiet origin main
git reset --hard origin/main
nachher="$(git rev-parse HEAD)"

if [ "$vorher" = "$nachher" ]; then
  echo "Kein neuer Stand ($nachher) – nichts zu tun."
  exit 0
fi

echo "Neuer Stand: ${vorher:0:7} → ${nachher:0:7}"
git --no-pager log --oneline "${vorher}..${nachher}" | head -n 10

# `--build` baut neu, `-d` lässt den alten Container laufen, bis der neue
# steht. Schlägt der Build fehl, bleibt die laufende Fassung unberührt –
# deshalb wird hier nichts vorher gestoppt.
docker compose up -d --build

# Alte, nicht mehr verwendete Abbilder abräumen. Ohne das füllt jeder
# Deploy den Datenträger um rund 400 MB weiter.
docker image prune -f --filter "label!=keep"

echo "=== $(date --iso-8601=seconds) Deploy fertig ==="
