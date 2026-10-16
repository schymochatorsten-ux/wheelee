# wheelee als Container – gebaut auf dem Zielrechner, kein Registry-Push.
#
# Drei Stufen, damit im laufenden Abbild weder Quellcode noch Bauwerkzeug
# liegt: `deps` installiert, `builder` baut, `runner` führt aus.

# Node 24 LTS, schlank. Die Version steht fest statt „latest": Ein Deploy
# soll denselben Stand ergeben wie der vorige, auch in einem halben Jahr.
#
# **Node 24 und nicht 22, seit es eine Datenbank gibt:** Erst dort ist
# `node:sqlite` im Standardumfang und ohne Versuchsflagge nutzbar. Die
# Alternative wäre `better-sqlite3` gewesen – eine native Abhängigkeit, für
# die dieses Alpine-Abbild erst Compiler und Python nachziehen müsste. Siehe
# `src/lib/db/sqlite.ts`.
FROM node:24-alpine AS deps
WORKDIR /app
# Nur die Abhängigkeitsdateien kopieren: Solange sie sich nicht ändern,
# bleibt die Installation im Docker-Cache und jeder Deploy spart Minuten.
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Next sammelt sonst anonyme Nutzungsdaten beim Bauen.
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Wo die Datenbank liegt. **Außerhalb des Arbeitsverzeichnisses der App und
# in einem eigenen Volume** (siehe docker-compose.yml): Ein Deploy baut das
# Abbild neu, und alles, was im Abbild liegt, ist danach weg. Konten und
# Rückmeldungen dürfen das nicht sein.
ENV WHEELEE_DB_PATH=/app/var/wheelee.sqlite

# Nicht als root laufen lassen. Das Abbild enthält zwar nichts Geheimes,
# aber ein Prozess, der aus dem Internet erreichbar ist, braucht keine
# Rechte, die er nie benutzt.
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Das Verzeichnis muss **vor** dem Umschalten auf `nextjs` existieren und ihm
# gehören: Docker legt einen Volume-Einhängepunkt sonst als `root` an, und die
# App könnte ihre eigene Datenbank nicht anlegen – sichtbar erst beim ersten
# Start, mit „SQLITE_CANTOPEN".
RUN mkdir -p /app/var && chown nextjs:nodejs /app/var

# Die drei Teile des `standalone`-Builds. `static` und `public` liegen
# bewusst getrennt: Sie werden ausgeliefert, nicht ausgeführt.
COPY --from=builder /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000
VOLUME ["/app/var"]

# Der Container meldet selbst, ob die App antwortet – sonst gilt ein
# abgestürzter Node-Prozess als „läuft", solange der Container lebt.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
