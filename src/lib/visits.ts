import { createHash, randomBytes } from "node:crypto";
import { db } from "./db/sqlite";

/**
 * Besucherzählung (ToDo 20.1) – **ohne Cookie, ohne Speicherung einer
 * Kennung, ohne Dritte**.
 *
 * Die Frage ist „wie viele Menschen haben die Seite heute benutzt?", nicht „wer".
 * Deshalb steht in der Datenbank nur eine Summe je Tag (`visit_day`).
 *
 * **Wie ein Besucher von einem anderen unterschieden wird, ohne ihn zu
 * merken:** Aus IP-Adresse und Browserkennung entsteht ein Hash, gesalzen mit
 * einem Zufallswert, den der Prozess für jeden Tag neu würfelt und nie
 * speichert. Der Hash lebt **nur im Arbeitsspeicher**, nur bis zum Tagesende und
 * ist von keinem anderen Tag aus vergleichbar – wer an zwei Tagen kommt, zählt
 * zweimal. Ein Neustart des Containers vergisst die Menge; wer danach noch
 * einmal kommt, zählt am selben Tag ein zweites Mal (leichte Überzählung, gewollt:
 * lieber das als etwas Dauerhaftes aufzubewahren).
 *
 * **Echte Besucher:** Gezählt wird nur, was nach dem Laden der Seite per
 * JavaScript einen Ping schickt (`VisitBeacon`). Das schließt alles aus, was
 * Seiten nur abruft. Dazu kommt ein Filter auf bekannte Roboter (`isBot`), auch
 * auf solche, die JavaScript ausführen (Googlebot, Messdienste, Linkvorschauen,
 * KI-Sammler). **Do Not Track und Global Privacy Control werden respektiert:**
 * Wer das einstellt, wird nicht gezählt – die Zahl ist deshalb eine Untergrenze.
 */

/**
 * Bekannte Roboter und Werkzeuge, nach Kennungen in `User-Agent`. Bewusst
 * großzügig: Eine fälschlich ausgeschlossene Person fehlt in einer Zahl, ein
 * fälschlich gezählter Roboter verfälscht sie.
 */
const BOT_PATTERN = new RegExp(
  [
    "bot", "crawl", "spider", "slurp", "scrap", "fetch", "preview", "archiv",
    "headless", "phantom", "puppeteer", "playwright", "selenium", "webdriver",
    "lighthouse", "pagespeed", "gtmetrix", "pingdom", "uptime", "monitor", "statuscake",
    "checker", "scanner", "validator", "probe", "feed", "reader",
    "curl", "wget", "python", "java/", "okhttp", "httpclient", "axios", "node-fetch", "go-http", "libwww", "postman",
    "facebookexternalhit", "whatsapp", "telegram", "twitter", "slack", "discord", "linkedin", "skype", "embedly", "quora",
    "ahrefs", "semrush", "mj12", "dotbot", "petalbot", "bytespider", "yandex", "baidu", "sogou", "duckduck", "applebot",
    "gptbot", "claude", "anthropic", "ccbot", "perplexity", "amazonbot", "cohere", "diffbot",
    "google-", "googleother", "adsbot", "mediapartners", "storebot", "chrome-lighthouse",
  ].join("|"),
  "iu",
);

/** `true`, wenn die Kennung auf einen Roboter hindeutet – oder gar keine da ist. */
export function isBot(userAgent: string | null | undefined): boolean {
  if (!userAgent) return true;
  const ua = userAgent.trim();
  // Browser nennen sich seit dreißig Jahren „Mozilla/…" und sind lang. Alles
  // Kürzere ist ein Werkzeug, das sich nicht einmal verkleidet.
  if (ua.length < 30) return true;
  return BOT_PATTERN.test(ua);
}

/** Kalendertag in Mitteleuropa, „2026-10-29". */
export function dayKey(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/** Der Zustand des laufenden Tages – Salz und Menge der gesehenen Hashes. */
let today: { day: string; salt: Buffer; seen: Set<string> } | null = null;

/** Obergrenze, damit ein Beschuss mit gefälschten Kennungen den Speicher nicht füllt. */
const MAX_SEEN_PER_DAY = 200_000;

function stateFor(day: string) {
  if (!today || today.day !== day) {
    // Alles vom Vortag fällt hier weg – Salz und Hashes.
    today = { day, salt: randomBytes(16), seen: new Set() };
  }
  return today;
}

export type VisitResult = "counted" | "repeat" | "bot" | "dnt" | "full";

export interface VisitInput {
  ip: string;
  userAgent: string | null;
  /** `DNT: 1` oder `Sec-GPC: 1` gesetzt. */
  optedOut: boolean;
  now?: Date;
}

/**
 * Einen Besuch verbuchen. Schreibt höchstens eine Zeile je Tag fort.
 *
 * Ein wiederholter Ping desselben Besuchers am selben Tag zählt als weiterer
 * **Seitenaufruf**, nicht als weiterer Besucher.
 */
export function recordVisit(input: VisitInput): VisitResult {
  if (input.optedOut) return "dnt";
  if (isBot(input.userAgent)) return "bot";

  const day = dayKey(input.now);
  const state = stateFor(day);
  const hash = createHash("sha256")
    .update(state.salt)
    .update(`|${input.ip}|${input.userAgent ?? ""}`)
    .digest("base64url");

  const isNew = !state.seen.has(hash);
  if (isNew) {
    // Ist die Menge voll, wird weiter gezählt, aber nicht mehr unterschieden: die
    // Besucherzahl bleibt stehen, die Aufrufe laufen weiter.
    if (state.seen.size >= MAX_SEEN_PER_DAY) {
      db()
        .prepare(
          `INSERT INTO visit_day (day, visitors, views) VALUES (?, 0, 1)
           ON CONFLICT(day) DO UPDATE SET views = views + 1`,
        )
        .run(day);
      return "full";
    }
    state.seen.add(hash);
  }

  db()
    .prepare(
      `INSERT INTO visit_day (day, visitors, views) VALUES (?, ?, 1)
       ON CONFLICT(day) DO UPDATE SET visitors = visitors + excluded.visitors, views = views + 1`,
    )
    .run(day, isNew ? 1 : 0);

  return isNew ? "counted" : "repeat";
}

export interface VisitDay {
  day: string;
  visitors: number;
  views: number;
}

/** Die letzten `days` Tage, neueste zuerst; Tage ohne Zeile fehlen. */
export function readVisits(days = 30): VisitDay[] {
  const rows = db()
    .prepare("SELECT day, visitors, views FROM visit_day ORDER BY day DESC LIMIT ?")
    .all(Math.min(Math.max(1, Math.floor(days)), 366)) as {
    day: string;
    visitors: number;
    views: number;
  }[];
  return rows.map((row) => ({
    day: row.day,
    visitors: Number(row.visitors),
    views: Number(row.views),
  }));
}

/** Summe über alle Tage – für die Kopfzeile der Auswertung. */
export function totalVisits(): { visitors: number; views: number; since: string | null } {
  const row = db()
    .prepare("SELECT COALESCE(SUM(visitors), 0) AS visitors, COALESCE(SUM(views), 0) AS views, MIN(day) AS since FROM visit_day")
    .get() as { visitors: number; views: number; since: string | null };
  return { visitors: Number(row.visitors), views: Number(row.views), since: row.since };
}

/** Nur für Tests: den Tageszustand vergessen. */
export function resetVisitState(): void {
  today = null;
}
