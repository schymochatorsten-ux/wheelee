#!/bin/sh
# Monatlicher Aktualitätslauf mit Neuimport (ToDo 19.2, 19.10).
#
# 1. `npm run data:update` prüft, ob sich amtliche Quellen geändert haben, und
#    importiert die betroffenen Städte neu (Schutz gegen Verschlechterung:
#    scripts/import/update-guard.mts). Danach `validate` für den Abgleich mit
#    OpenStreetMap.
# 2. Geänderte Daten werden committet und nach origin/main gepusht, wenn
#    WHEELEE_AUTO_PUSH=1 gesetzt ist. Der Push löst den normalen Webhook-Deploy
#    aus. Ohne ihn würde der nächste `git reset --hard` im Deploy die Daten
#    wieder verwerfen. Scheitert der Push (z. B. kein Schreibschlüssel), bleibt
#    der Stand auf dem Zweig `daten-update`, und main wird zurückgesetzt.
#
# Der Produktions-Container hat weder `tsx` noch die Skripte (nur das
# Standalone-Paket), deshalb läuft der Import in einem Wegwerf-Container mit
# demselben Node wie das Image und dem Arbeitsordner als Volume.
set -eu

ORDNER="${WHEELEE_ORDNER:-/opt/wheelee}"
cd "$ORDNER"

# Ein Lauf nach dem anderen, gemeinsam mit dem Deploy: Sonst baut er auf einem
# Ordner, den der Lauf gerade umschreibt.
exec 9>/tmp/wheelee-deploy.lock
flock 9

git fetch --quiet origin main
git reset --hard origin/main

docker run --rm \
  -v "$ORDNER":/app -w /app \
  node:24-alpine \
  sh -c 'npm ci --no-audit --no-fund && npm run data:update && npm run validate; \
         chown -R "$(stat -c %u:%g /app/package.json)" /app/data /app/node_modules /app/src/lib/parking'

if [ -z "$(git status --porcelain data src/lib/parking/seeds.generated.ts)" ]; then
  echo "Keine Datenänderung."
  exit 0
fi

git add data src/lib/parking/seeds.generated.ts
git -c user.name="wheelee-auto" -c user.email="wheelee-auto@localhost" \
  commit --quiet -m "Daten: automatische Aktualisierung $(date +%F)"

if [ "${WHEELEE_AUTO_PUSH:-0}" = "1" ] && git push --quiet origin HEAD:main; then
  echo "Daten nach origin/main gepusht; der Webhook baut neu."
else
  git branch -f daten-update HEAD
  git reset --hard origin/main
  echo "Nicht gepusht. Der Stand liegt auf dem Zweig daten-update (Bericht: data/_auto-update.md)."
fi
