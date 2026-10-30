#!/bin/sh
# Konsistente Sicherung der Datenbank mit Rotation (ToDo 19.3).
#
# Das Verfahren steht in der README ("Sicherung"): VACUUM INTO im laufenden
# Container, weil im WAL-Modus die Hauptdatei allein einen Stand zeigt, der so
# nie bestanden hat. Neu hier ist nur der Takt (wheelee-sicherung.timer) und
# die Rotation: die letzten KEEP Sicherungen bleiben, ältere fallen weg. Ein
# gelöschtes Konto steht bis dahin noch in den Sicherungen (Datenschutzerklärung).
set -eu

KEEP="${WHEELEE_SICHERUNGEN:-14}"
CONTAINER="${WHEELEE_CONTAINER:-wheelee}"

docker exec "$CONTAINER" sh -c '
  set -eu
  mkdir -p /app/var/sicherung
  ziel="/app/var/sicherung/wheelee-$(date +%F).sqlite"
  [ -e "$ziel" ] || node -e "const {DatabaseSync}=require(\"node:sqlite\");new DatabaseSync(process.env.WHEELEE_DB_PATH).prepare(\"VACUUM INTO ?\").run(process.argv[1])" "$ziel"
  ls -1t /app/var/sicherung/wheelee-*.sqlite | tail -n +'"$((KEEP + 1))"' | xargs -r rm -f
  ls -l /app/var/sicherung
'
