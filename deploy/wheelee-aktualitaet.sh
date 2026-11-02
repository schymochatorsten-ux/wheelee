#!/bin/sh
# Täglicher Datenlauf (ToDo 19.2, 19.10): prüfen, ob amtliche Quellen sich
# geändert haben, höchstens WHEELEE_MAX_STAEDTE geänderte Städte neu
# importieren, das Ergebnis committen und nach origin/main pushen. Der Push löst
# den normalen Webhook-Deploy aus – aber nur, wenn sich Standortdaten wirklich
# geändert haben; an den meisten Tagen endet der Lauf nach einer halben Minute
# ohne Commit.
#
# **Er arbeitet nicht in /opt/wheelee, sondern in einem eigenen Klon** unter
# $WHEELEE_ARBEIT/repo. Zwei Gründe:
#   1. Der Deploy macht in /opt/wheelee `git reset --hard`. Liefe der Import
#      dort, ginge er kaputt (oder der Deploy verwürfe die halbe Arbeit),
#      sobald während der Stunde ein Push eintrifft.
#   2. Der Deploy überspringt sich, solange eine Sperre gehalten wird. Eine
#      Sperre über den ganzen Lauf würde einen Code-Push lautlos verschlucken.
#
# Ressourcen (gemessen auf dem Entwicklungsrechner, siehe deploy/Datenlauf.md):
# Prüfung rund 200 MB und 20 s, Import mit gemerkten Adressen 200 MB und 3 s,
# Straßennamen bis rund 500 MB (wartet meist auf Overpass). Der Container ist
# deshalb auf 1 CPU und 1 GB gedeckelt und läuft mit niedriger Priorität.
#
# Schalter (Umgebung, siehe wheelee-aktualitaet.service):
#   WHEELEE_AUTO_PUSH=1        pushen; sonst bleibt der Stand auf Zweig daten-update
#   WHEELEE_TROCKEN=1          nur zeigen, was fällig wäre; ändert und pusht nichts
#   WHEELEE_VALIDIERUNG_MONATE Monate (zweistellig, durch Leerzeichen), in denen
#                              einmal `validate` läuft; Vorgabe "01 07"
#   WHEELEE_MAX_STAEDTE        Städte je Lauf; Vorgabe 5
#   WHEELEE_MAX_DATEIEN        Obergrenze geänderter Seed-Dateien; Vorgabe 15
set -eu

ARBEIT="${WHEELEE_ARBEIT:-/var/lib/wheelee-update}"
QUELLE="${WHEELEE_ORDNER:-/opt/wheelee}"
CLONE="$ARBEIT/repo"
MAX_DATEIEN="${WHEELEE_MAX_DATEIEN:-15}"

mkdir -p "$ARBEIT/state" "$ARBEIT/npm-cache"

# Nie zwei Läufe gleichzeitig (etwa Timer und Handstart).
exec 8>"$ARBEIT/lauf.lock"
flock -n 8 || { echo "Ein Datenlauf läuft bereits – dieser Aufruf endet."; exit 0; }

# Dieselbe Adresse und derselbe Schlüssel wie beim Deploy.
URL="$(git -C "$QUELLE" remote get-url origin)"
if [ ! -d "$CLONE/.git" ]; then
  git clone --quiet "$URL" "$CLONE"
fi
git -C "$CLONE" remote set-url origin "$URL"
git -C "$CLONE" fetch --quiet origin main
git -C "$CLONE" checkout --quiet -B main origin/main
git -C "$CLONE" reset --quiet --hard origin/main

# `validate` einmal in jedem der genannten Monate, beim ersten Lauf darin. Der
# Lauf ist täglich; ohne Merkzettel liefe die Prüfung im Januar und Juli
# 62 Tage hintereinander.
monat="$(date +%m)"
STEMPEL="validate-$(date +%Y-%m)"
VALIDIEREN=0
case " ${WHEELEE_VALIDIERUNG_MONATE:-01 07} " in
  *" $monat "*) [ -e "$ARBEIT/state/$STEMPEL" ] || VALIDIEREN=1 ;;
esac

echo "=== $(date --iso-8601=seconds) Datenlauf beginnt (validate: $VALIDIEREN) ==="

docker run --rm --name wheelee-datenlauf \
  --cpus="${WHEELEE_CPUS:-1}" --cpu-shares=128 \
  --memory=1g --memory-swap=1g --pids-limit=256 \
  -e NODE_OPTIONS=--max-old-space-size=768 \
  -e WHEELEE_STATE_DIR=/state \
  -e WHEELEE_MAX_STAEDTE="${WHEELEE_MAX_STAEDTE:-5}" \
  -e TROCKEN="${WHEELEE_TROCKEN:-0}" -e VALIDIEREN="$VALIDIEREN" -e STEMPEL="$STEMPEL" \
  -v "$CLONE":/app -v "$ARBEIT/state":/state -v "$ARBEIT/npm-cache":/root/.npm \
  -w /app node:24-alpine sh deploy/wheelee-datenlauf-container.sh

if [ "${WHEELEE_TROCKEN:-0}" = "1" ]; then
  echo "Trockenlauf: nichts geändert, nichts gepusht."
  exit 0
fi

# „Zuletzt geprüft“ für /abdeckung (ToDo 19.15): in das Volume der App kopieren, nicht
# ins Repository – ein Lauf ohne Datenänderung soll keinen Neubau auslösen. Fehlt der
# Container (z. B. beim ersten Einrichten), ist das nur eine Warnung.
if [ -f "$ARBEIT/state/geprueft.json" ]; then
  docker exec -i "${WHEELEE_APP_CONTAINER:-wheelee}" sh -c "cat > /app/var/geprueft.json" < "$ARBEIT/state/geprueft.json" \
    || echo "Warnung: geprueft.json konnte nicht in den App-Container kopiert werden."
fi

cd "$CLONE"

# Was zählt als Änderung der Daten? Ein Seed einer Stadt oder die Seed-Liste.
# Berichte und Statusdateien (data/_*) ändern sich bei jedem Lauf und sind
# allein kein Grund für einen Commit – sonst baute das NAS jeden Monat das
# Abbild neu, auch wenn sich nichts verändert hat.
geaendert="$(git status --porcelain -- data src/lib/parking/seeds.generated.ts \
  | grep -v ' data/_' || true)"

if [ -z "$geaendert" ]; then
  echo "Keine Änderung an den Standortdaten – nichts zu committen."
  git checkout --quiet -- .
  git clean -fdq data
  exit 0
fi

anzahl="$(printf '%s\n' "$geaendert" | wc -l)"
echo "Geänderte Dateien ($anzahl):"
printf '%s\n' "$geaendert"

ablegen() {
  git branch -f daten-update HEAD
  git reset --quiet --hard origin/main
  echo "NICHT gepusht: $1"
  echo "Der Stand liegt im Klon $CLONE auf dem Zweig daten-update."
  exit "${2:-1}"
}

git add data src/lib/parking/seeds.generated.ts
git -c user.name="wheelee-auto" -c user.email="wheelee-auto@localhost" \
  commit --quiet -m "Daten: automatische Aktualisierung $(date +%F)"

if [ "$anzahl" -gt "$MAX_DATEIEN" ]; then
  ablegen "$anzahl geänderte Dateien, mehr als die Obergrenze von $MAX_DATEIEN – das sieht nach einem Fehler aus, nicht nach einer Aktualisierung"
fi

if [ "${WHEELEE_AUTO_PUSH:-0}" != "1" ]; then
  ablegen "WHEELEE_AUTO_PUSH ist nicht 1 (so eingestellt)" 0
fi

# Ist main während des Laufs weitergezogen (Code-Push), die Daten obendrauf setzen.
git fetch --quiet origin main
git rebase --quiet origin/main || { git rebase --abort; ablegen "Rebase auf den neuen Stand von origin/main gescheitert"; }
git push --quiet origin HEAD:main || ablegen "git push gescheitert (Schreibschlüssel? siehe deploy/Datenlauf.md)"

echo "=== $(date --iso-8601=seconds) Daten gepusht; der Webhook baut neu ==="
