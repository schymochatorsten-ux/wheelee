# Arbeitsweise – die Regeln liegen außerhalb des Repositories

**Alle Projektunterlagen stehen in `AAAPrivat/`** (seit 2026-11-12, auf
Torstens Wunsch): `CLAUDE.md` mit den Arbeitsregeln, `ToDos.md`,
`Erledigt.md`, `README.md`, `Konzept.md`, `Datenpflege.md`,
`wheelee-infrastruktur.md`, `Verarbeitungsverzeichnis.md` und die
Betriebsanleitungen unter `AAAPrivat/deploy/`. Der Ordner steht in
`.gitignore`; was dort liegt, geht nie nach GitHub.

**Zu Beginn jeder Sitzung `AAAPrivat/CLAUDE.md` lesen, dann
`AAAPrivat/ToDos.md`.** Diese Datei hier ist nur der Zeiger darauf – sie
bleibt im Repository, weil die Regeln sonst gar nicht erst gefunden werden.
Was der Ordner sonst bedeutet, steht in `AAAPrivat/LIESMICH-privat.md`.

Nicht verschoben wurde, was die Maschinerie braucht: die erzeugten Berichte
unter `data/*.md` (sie werden von den Importskripten geschrieben und gelesen,
und ihre Zahlen stehen ohnehin öffentlich auf `/abdeckung`), `deploy/env.beispiel`
und `AGENTS.md` – letztere schreibt `next dev` bei jedem Lauf neu.
