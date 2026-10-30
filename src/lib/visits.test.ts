import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb } from "./db/sqlite";
import { dayKey, isBot, readVisits, recordVisit, resetVisitState, totalVisits } from "./visits";

/** Besucherzählung (ToDo 20.1), gegen eine echte Datenbank. */

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-visits-"));
  process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
  closeDb();
  resetVisitState();
});

afterEach(() => {
  closeDb();
  delete process.env.WHEELEE_DB_PATH;
  fs.rmSync(folder, { recursive: true, force: true });
});

const FIREFOX = "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0";
const SAFARI_IPHONE =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
const CHROME_ANDROID =
  "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36";

describe("isBot", () => {
  it("lässt gewöhnliche Browser durch", () => {
    for (const ua of [FIREFOX, SAFARI_IPHONE, CHROME_ANDROID]) expect(isBot(ua), ua).toBe(false);
  });

  it("erkennt Suchmaschinen und Sammler", () => {
    for (const ua of [
      "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
      "Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)",
      "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.1; +https://openai.com/gptbot)",
      "Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
      "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
      "Mozilla/5.0 (compatible; Applebot/0.1; +http://www.apple.com/go/applebot)",
    ]) {
      expect(isBot(ua), ua).toBe(true);
    }
  });

  it("erkennt Werkzeuge, Messdienste und Browser ohne Fenster", () => {
    for (const ua of [
      "curl/8.5.0",
      "python-requests/2.31.0",
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/126.0.0.0 Safari/537.36",
      "Mozilla/5.0 (Linux; Android 11; moto g power) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Mobile Safari/537.36 Chrome-Lighthouse",
      "Mozilla/5.0 (compatible; UptimeRobot/2.0; http://www.uptimerobot.com/)",
    ]) {
      expect(isBot(ua), ua).toBe(true);
    }
  });

  it("zählt eine fehlende oder winzige Kennung als Roboter", () => {
    expect(isBot(null)).toBe(true);
    expect(isBot("")).toBe(true);
    expect(isBot("Mozilla/5.0")).toBe(true);
  });
});

describe("dayKey", () => {
  it("rechnet in mitteleuropäischer Zeit, nicht in UTC", () => {
    // 23:30 UTC am 29. Oktober ist in Berlin (MEZ) schon der 30.
    expect(dayKey(new Date("2026-10-29T23:30:00Z"))).toBe("2026-10-30");
    expect(dayKey(new Date("2026-10-29T10:00:00Z"))).toBe("2026-10-29");
  });
});

describe("recordVisit", () => {
  const at = (iso: string) => new Date(iso);

  it("zählt einen Besucher einmal je Tag, weitere Aufrufe als Seitenaufrufe", () => {
    const now = at("2026-10-29T10:00:00Z");
    expect(recordVisit({ ip: "203.0.113.5", userAgent: FIREFOX, optedOut: false, now })).toBe("counted");
    expect(recordVisit({ ip: "203.0.113.5", userAgent: FIREFOX, optedOut: false, now })).toBe("repeat");
    expect(recordVisit({ ip: "203.0.113.5", userAgent: FIREFOX, optedOut: false, now })).toBe("repeat");

    expect(readVisits()).toEqual([{ day: "2026-10-29", visitors: 1, views: 3 }]);
  });

  it("unterscheidet verschiedene Besucher nach Adresse und Browser", () => {
    const now = at("2026-10-29T10:00:00Z");
    recordVisit({ ip: "203.0.113.5", userAgent: FIREFOX, optedOut: false, now });
    recordVisit({ ip: "203.0.113.6", userAgent: FIREFOX, optedOut: false, now });
    recordVisit({ ip: "203.0.113.5", userAgent: SAFARI_IPHONE, optedOut: false, now });
    expect(readVisits()[0]).toMatchObject({ visitors: 3, views: 3 });
  });

  it("zählt am nächsten Tag neu – dieselbe Person ist dann wieder ein Besucher", () => {
    recordVisit({ ip: "203.0.113.5", userAgent: FIREFOX, optedOut: false, now: at("2026-10-29T10:00:00Z") });
    recordVisit({ ip: "203.0.113.5", userAgent: FIREFOX, optedOut: false, now: at("2026-10-30T10:00:00Z") });
    const days = readVisits();
    expect(days.map((d) => [d.day, d.visitors])).toEqual([
      ["2026-10-30", 1],
      ["2026-10-29", 1],
    ]);
    expect(totalVisits()).toEqual({ visitors: 2, views: 2, since: "2026-10-29" });
  });

  it("zählt Roboter und „nicht verfolgen“ gar nicht", () => {
    const now = at("2026-10-29T10:00:00Z");
    expect(
      recordVisit({ ip: "203.0.113.5", userAgent: "Googlebot/2.1 (+http://www.google.com/bot.html)", optedOut: false, now }),
    ).toBe("bot");
    expect(recordVisit({ ip: "203.0.113.5", userAgent: FIREFOX, optedOut: true, now })).toBe("dnt");
    expect(readVisits()).toEqual([]);
  });

  it("speichert weder Adresse noch Browserkennung", () => {
    recordVisit({ ip: "203.0.113.77", userAgent: FIREFOX, optedOut: false, now: at("2026-10-29T10:00:00Z") });
    closeDb(); // schreibt den Zwischenstand aus der WAL-Datei in die Hauptdatei
    // Alle Dateien der Datenbank, auch `-wal`: Dort liegt, was noch nicht übernommen ist.
    const raw = Buffer.concat(
      fs.readdirSync(folder).map((name) => fs.readFileSync(path.join(folder, name))),
    );
    expect(raw.length).toBeGreaterThan(0);
    expect(raw.includes(Buffer.from("203.0.113.77"))).toBe(false);
    expect(raw.includes(Buffer.from("Firefox/130"))).toBe(false);
  });
});
