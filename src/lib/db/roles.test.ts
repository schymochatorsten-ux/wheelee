import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb } from "./sqlite";
import {
  accountForSession,
  activeAdminCount,
  authenticate,
  createAccount,
  createSession,
  deleteAccount,
  setDisabled,
  setRole,
} from "./accounts";

/** Rolle und Sperre am Konto (ToDo 18.1), gegen eine echte Datenbank. */

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-roles-"));
  process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
  closeDb();
});

afterEach(() => {
  closeDb();
  delete process.env.WHEELEE_DB_PATH;
  fs.rmSync(folder, { recursive: true, force: true });
});

const PASSWORT = "ein gutes langes Passwort";

function konto(email: string) {
  const account = createAccount(email, PASSWORT);
  if (!account) throw new Error("Konto nicht angelegt");
  return account;
}

describe("Konto selbst löschen (ToDo 10.15 a)", () => {
  it("verweigert dem letzten aktiven Admin das Löschen", () => {
    const chef = konto("chef@example.org");
    setRole(chef.id, "admin");
    expect(deleteAccount(chef.id, PASSWORT)).toBe("last-admin");
    expect(activeAdminCount()).toBe(1);
  });

  it("verrät die Rolle nicht, solange das Passwort falsch ist", () => {
    const chef = konto("chef@example.org");
    setRole(chef.id, "admin");
    expect(deleteAccount(chef.id, "falsch falsch falsch")).toBe("wrong-password");
  });

  it("erlaubt es, sobald ein zweiter aktiver Admin da ist", () => {
    const chef = konto("chef@example.org");
    const zweiter = konto("zweiter@example.org");
    setRole(chef.id, "admin");
    setRole(zweiter.id, "admin");
    expect(deleteAccount(chef.id, PASSWORT)).toBe("deleted");
  });

  it("zählt einen gesperrten Admin nicht als aktiv", () => {
    const chef = konto("chef@example.org");
    const gesperrt = konto("gesperrt@example.org");
    setRole(chef.id, "admin");
    setRole(gesperrt.id, "admin");
    setDisabled(gesperrt.id, true);
    expect(deleteAccount(chef.id, PASSWORT)).toBe("last-admin");
  });
});

describe("Rolle", () => {
  it("neue Konten sind normale Nutzer", () => {
    const account = konto("a@example.org");
    expect(account.role).toBe("user");
    expect(account.disabledAt).toBeNull();
    expect(activeAdminCount()).toBe(0);
  });

  it("setRole macht zum Admin und liest sich beim Anmelden zurück", () => {
    const account = konto("a@example.org");
    expect(setRole(account.id, "admin")).toBe(true);
    expect(authenticate("a@example.org", PASSWORT)?.role).toBe("admin");
    expect(activeAdminCount()).toBe(1);
  });

  it("das letzte aktive Admin-Konto lässt sich nicht herabstufen", () => {
    const a = konto("a@example.org");
    setRole(a.id, "admin");
    expect(setRole(a.id, "user")).toBe(false);
    expect(activeAdminCount()).toBe(1);

    const b = konto("b@example.org");
    setRole(b.id, "admin");
    expect(setRole(a.id, "user")).toBe(true);
    expect(setRole(b.id, "user")).toBe(false);
  });

  it("ein unbekanntes Konto ändert nichts", () => {
    expect(setRole("gibt-es-nicht", "admin")).toBe(false);
    expect(setDisabled("gibt-es-nicht", true)).toBe(false);
  });
});

describe("Sperre", () => {
  it("ein gesperrtes Konto kann sich nicht anmelden und verliert seine Sitzungen", () => {
    const account = konto("a@example.org");
    const token = createSession(account.id);
    expect(accountForSession(token)?.id).toBe(account.id);

    expect(setDisabled(account.id, true)).toBe(true);
    expect(authenticate("a@example.org", PASSWORT)).toBeNull();
    expect(accountForSession(token)).toBeNull();

    expect(setDisabled(account.id, false)).toBe(true);
    expect(authenticate("a@example.org", PASSWORT)?.id).toBe(account.id);
  });

  it("das letzte aktive Admin-Konto lässt sich nicht sperren", () => {
    const a = konto("a@example.org");
    setRole(a.id, "admin");
    expect(setDisabled(a.id, true)).toBe(false);
    expect(authenticate("a@example.org", PASSWORT)).not.toBeNull();
  });

  it("ein gesperrter Admin zählt nicht als aktiv", () => {
    const a = konto("a@example.org");
    const b = konto("b@example.org");
    setRole(a.id, "admin");
    setRole(b.id, "admin");
    expect(setDisabled(a.id, true)).toBe(true);
    expect(activeAdminCount()).toBe(1);
    expect(setRole(b.id, "user")).toBe(false);
  });
});
