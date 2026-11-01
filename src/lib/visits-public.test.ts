import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb, db } from "./db/sqlite";
import { MIN_PUBLIC, publicReach } from "./visits";

/** Öffentliche Besucherzahl (ToDo 20.2): immer sichtbar, auch bei 0 oder 1. */

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-reach-"));
  process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
  closeDb();
});

afterEach(() => {
  closeDb();
  delete process.env.WHEELEE_DB_PATH;
  fs.rmSync(folder, { recursive: true, force: true });
});

const add = (day: string, visitors: number) =>
  db().prepare("INSERT INTO visit_day (day, visitors, views) VALUES (?, ?, ?)").run(day, visitors, visitors);

describe("publicReach", () => {
  it("zeigt die Zahl von Anfang an, auch bei 0 und 1", () => {
    expect(MIN_PUBLIC).toBe(0);
    expect(publicReach()).toBe(0);
    add("2026-11-01", 1);
    expect(publicReach()).toBe(1);
  });

  it("summiert die Tage ab der Mindestzahl", () => {
    add("2026-11-01", 20);
    add("2026-11-02", 30);
    expect(publicReach()).toBe(50);
  });
});
