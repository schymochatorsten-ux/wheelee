#!/bin/sh
# Monatlicher Aktualitätslauf (ToDo 19.2): prüft, ob die amtlichen Quellen sich
# seit dem Import geändert haben (`sources:check`) und gleicht die amtlichen
# Standorte mit OpenStreetMap ab (`validate`). Ergebnis als Dateien im
# Arbeitsordner: data/_aktualitaet.md, data/_validierung.md.
#
# Der Produktions-Container hat weder `tsx` noch die Skripte (nur das
# Standalone-Paket), deshalb läuft der Lauf in einem Wegwerf-Container mit
# demselben Node wie das Image und dem Arbeitsordner als Volume. Er schreibt
# nur in data/, ändert keine Seed-Dateien und committet nichts: Was sich
# geändert hat, liest ein Mensch im Bericht (Datenpflege.md).
set -eu

ORDNER="${WHEELEE_ORDNER:-/opt/wheelee}"

docker run --rm \
  -v "$ORDNER":/app -w /app \
  node:24-alpine \
  sh -c 'npm ci --no-audit --no-fund && npm run sources:check && npm run validate'
