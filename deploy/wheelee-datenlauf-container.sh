#!/bin/sh
# Der Teil des Monatslaufs, der im Wegwerf-Container läuft (ToDo 19.10).
# Aufgerufen von wheelee-aktualitaet.sh, nie direkt.
#
# Umgebung: TROCKEN=1 (nur zeigen, was fällig wäre), VALIDIEREN=1 (danach
# `npm run validate`).
set -eu

# Der Container arbeitet als root. Was er in den Klon schreibt, soll am Ende
# wieder dem Benutzer gehören, der den Klon verwaltet; sonst scheitert dessen
# nächster `git reset --hard` an fremden Dateien. Auch bei einem Fehler.
eigner="$(stat -c %u:%g /app/package.json)"
trap 'chown -R "$eigner" /app/data /app/src/lib/parking 2>/dev/null || true' EXIT

# Abhängigkeiten nur installieren, wenn sich die Lock-Datei geändert hat. Die
# node_modules bleiben im Klon liegen (sie sind ignoriert und überstehen
# `git reset --hard`); eine Neuinstallation je Monat wären 600 MB Schreibzugriffe
# für nichts.
hash="$(sha256sum package-lock.json | cut -d' ' -f1)"
if [ "$(cat node_modules/.lockhash 2>/dev/null || true)" != "$hash" ]; then
  echo "Abhängigkeiten werden installiert (Lock-Datei neu oder erster Lauf)."
  npm ci --prefer-offline --no-audit --no-fund
  echo "$hash" > node_modules/.lockhash
fi

if [ "${TROCKEN:-0}" = "1" ]; then
  npm run data:update -- --dry
  exit 0
fi

npm run data:update

# Die Abgleichs-Prüfung gegen OpenStreetMap fragt Overpass für jede amtliche
# Stadt ab; das genügt halbjährlich (Datenpflege.md, „Takt“).
if [ "${VALIDIEREN:-0}" = "1" ]; then
  npm run validate
fi
