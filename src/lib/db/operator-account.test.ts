import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb } from "./sqlite";
import {
  accountForSession,
  authenticate,
  authenticateAsync,
  changePassword,
  createOperatorAccount,
  createSession,
  usernameProblem,
} from "./accounts";
import { isAdminAccount } from "../auth/session";

/** Konto durch die Betreiber:innen mit Startpasswort (ToDo 18.7), gegen eine echte Datenbank. */

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-operator-"));
  process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
  closeDb();
});

afterEach(() => {
  closeDb();
  delete process.env.WHEELEE_DB_PATH;
  fs.rmSync(folder, { recursive: true, force: true });
});

const START = "Start"; // kürzer als die Mindestlänge – ein Startpasswort unterliegt ihr nicht
const NEU = "ein gutes neues Passwort";

function admin() {
  return createOperatorAccount({
    email: "Torsten@Example.org",
    username: "Torsten",
    password: START,
    role: "admin",
  })!;
}

describe("Konto mit Startpasswort", () => {
  it("meldet sich mit Benutzername oder Adresse an, ohne auf Groß-/Kleinschreibung zu achten", () => {
    admin();
    expect(authenticate("Torsten", START)?.username).toBe("Torsten");
    expect(authenticate("torsten", START)).not.toBeNull();
    expect(authenticate("torsten@example.org", START)).not.toBeNull();
    expect(authenticate("Torsten", "falsch")).toBeNull();
    expect(authenticate("Unbekannt", START)).toBeNull();
  });

  it("hat bis zur Änderung keine Verwaltungsrechte und verlangt den Wechsel", async () => {
    admin();
    const account = (await authenticateAsync("Torsten", START))!;
    expect(account.role).toBe("admin");
    expect(account.mustChangePassword).toBe(true);
    expect(isAdminAccount(account)).toBe(false);
  });

  it("wird nach dem Passwortwechsel zum vollen Admin", async () => {
    const created = admin();
    const token = createSession(created.id);
    expect(changePassword(created.id, START, NEU, token)).toBe(true);

    const after = accountForSession(token)!;
    expect(after.mustChangePassword).toBe(false);
    expect(isAdminAccount(after)).toBe(true);
    expect(authenticate("Torsten", START)).toBeNull();
    expect(authenticate("Torsten", NEU)).not.toBeNull();
  });

  it("lehnt vergebene Adresse und vergebenen Namen ab", () => {
    admin();
    expect(
      createOperatorAccount({
        email: "andere@example.org",
        username: "torsten",
        password: START,
        role: "user",
      }),
    ).toBeNull();
    expect(
      createOperatorAccount({
        email: "torsten@example.org",
        username: "Anderer",
        password: START,
        role: "user",
      }),
    ).toBeNull();
  });
});

describe("usernameProblem", () => {
  it("lässt Namen zu, die nicht wie eine Adresse aussehen", () => {
    expect(usernameProblem("Torsten")).toBeNull();
    expect(usernameProblem("t.schmidt_2")).toBeNull();
    expect(usernameProblem("a@b")).not.toBeNull();
    expect(usernameProblem("ab")).not.toBeNull();
    expect(usernameProblem("mit Leerzeichen")).not.toBeNull();
  });
});
