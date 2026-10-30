import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb, db } from "./sqlite";
import {
  authenticate,
  authenticateAsync,
  changePassword,
  createAccount,
  deleteAccount,
  setRole,
} from "./accounts";
import { createInvitation, redeemInvitation } from "./invitations";
import {
  confirmEmailChange,
  createResetToken,
  createVerificationToken,
  requestEmailChange,
  resetPassword,
} from "./mail-tokens";
import { hashPassword, verifyPasswordAsync } from "../auth/password";
import { isAdminAccount } from "../auth/session";
import { readJson } from "../read-json";
import { BACKOFF, loginPauseSeconds, recordLoginFailure, resetLoginBackoff } from "../login-backoff";

/** Härtung der Konten (ToDo 10.19), gegen eine echte Datenbank. */

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-haertung-"));
  process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
  closeDb();
  resetLoginBackoff();
});

afterEach(() => {
  closeDb();
  delete process.env.WHEELEE_DB_PATH;
  delete process.env.ADMIN_EMAILS;
  fs.rmSync(folder, { recursive: true, force: true });
});

const PASSWORT = "ein gutes langes Passwort";

/** Ein Konto an `bootstrapAdmins` vorbei anlegen, so wie es vor dem Start schon bestand. */
function vorhandenesKonto(email: string, bestaetigt = true): void {
  const jetzt = new Date().toISOString();
  db()
    .prepare("INSERT INTO account (id, email, password_hash, created_at, email_verified_at) VALUES (?, ?, ?, ?, ?)")
    .run(email, email, hashPassword(PASSWORT), jetzt, bestaetigt ? jetzt : null);
}

describe("ADMIN_EMAILS als einmalige Hochstufung", () => {
  it("hebt ein vorhandenes Konto zum Admin in der Datenbank", () => {
    process.env.ADMIN_EMAILS = "chef@example.org";
    vorhandenesKonto("chef@example.org");
    const chef = authenticate("chef@example.org", PASSWORT);
    expect(chef?.role).toBe("admin");
    expect(isAdminAccount(chef!)).toBe(true);
  });

  it("hebt ein Konto mit unbestätigter Adresse nicht", () => {
    process.env.ADMIN_EMAILS = "chef@example.org";
    vorhandenesKonto("chef@example.org", false);
    expect(authenticate("chef@example.org", PASSWORT)?.role).toBe("user");
  });

  it("gibt einer erst danach registrierten Adresse nichts", () => {
    process.env.ADMIN_EMAILS = "chef@example.org";
    createAccount("anderer@example.org", PASSWORT); // löst den Lauf aus
    const eindringling = createAccount("chef@example.org", PASSWORT)!;
    expect(eindringling.role).toBe("user");
    expect(isAdminAccount(eindringling)).toBe(false);
    expect(authenticate("chef@example.org", PASSWORT)?.role).toBe("user");
  });

  it("hängt nach dem Lauf nicht mehr an der Umgebung", () => {
    process.env.ADMIN_EMAILS = "chef@example.org";
    vorhandenesKonto("chef@example.org");
    const chef = authenticate("chef@example.org", PASSWORT)!;
    const zweiter = createAccount("zweiter@example.org", PASSWORT)!;
    setRole(zweiter.id, "admin");
    delete process.env.ADMIN_EMAILS;
    expect(isAdminAccount(authenticate("chef@example.org", PASSWORT)!)).toBe(true);
    expect(chef.role).toBe("admin");
  });

  it("lässt den Besitzer nicht ohne Schutz gehen: er ist das letzte Admin-Konto", () => {
    process.env.ADMIN_EMAILS = "chef@example.org";
    vorhandenesKonto("chef@example.org");
    const chef = authenticate("chef@example.org", PASSWORT)!;
    expect(deleteAccount(chef.id, PASSWORT)).toBe("last-admin");
  });

  it("stuft nichts hoch, wenn schon ein Admin in der Datenbank steht", () => {
    const vorhandenerAdmin = createAccount("admin@example.org", PASSWORT)!;
    setRole(vorhandenerAdmin.id, "admin");
    closeDb();
    process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
    process.env.ADMIN_EMAILS = "chef@example.org";
    vorhandenesKonto("chef@example.org");
    expect(authenticate("chef@example.org", PASSWORT)?.role).toBe("user");
  });
});

describe("Mail-Links nach Passwort- und Adresswechsel", () => {
  it("entwertet einen offenen Reset-Link, wenn das Passwort geändert wird", () => {
    const konto = createAccount("a@example.org", PASSWORT)!;
    const link = createResetToken("a@example.org")!;
    expect(changePassword(konto.id, PASSWORT, "ein ganz anderes Passwort", undefined)).toBe(true);
    expect(resetPassword(link.token, "wieder ein neues Passwort")).toBe(false);
  });

  it("entwertet einen offenen Reset-Link, wenn die Adresse bestätigt wurde", () => {
    const konto = createAccount("a@example.org", PASSWORT)!;
    const antrag = requestEmailChange(konto.id, PASSWORT, "neu@example.org");
    expect(antrag.status).toBe("ok");
    const link = createResetToken("a@example.org")!;
    if (antrag.status !== "ok") throw new Error("kein Antrag");
    expect(confirmEmailChange(antrag.token)).toBe("neu@example.org");
    expect(resetPassword(link.token, "wieder ein neues Passwort")).toBe(false);
  });
});

describe("Bestätigte Adresse (ToDo 10.21)", () => {
  const lesen = (email: string) =>
    db().prepare("SELECT email_verified_at AS v FROM account WHERE email = ?").get(email) as { v: string | null };

  it("ist bei einem neuen Konto leer und nach dem Link gesetzt", () => {
    const konto = createAccount("a@example.org", PASSWORT)!;
    expect(lesen("a@example.org").v).toBeNull();
    expect(confirmEmailChange(createVerificationToken(konto.id, konto.email))).toBe("a@example.org");
    expect(lesen("a@example.org").v).not.toBeNull();
  });

  it("gilt für ein über eine Einladung angelegtes Konto von Anfang an", () => {
    const chef = createAccount("chef@example.org", PASSWORT)!;
    const einladung = createInvitation(chef.id, "gast@example.org", "user")!;
    redeemInvitation(einladung.token, PASSWORT);
    expect(lesen("gast@example.org").v).not.toBeNull();
  });

  it("gilt auch nach einem bestätigten Adresswechsel", () => {
    const konto = createAccount("a@example.org", PASSWORT)!;
    const antrag = requestEmailChange(konto.id, PASSWORT, "neu@example.org");
    if (antrag.status !== "ok") throw new Error("kein Antrag");
    confirmEmailChange(antrag.token);
    expect(lesen("neu@example.org").v).not.toBeNull();
  });
});

describe("Konto löschen und Einladungen", () => {
  it("entfernt die Adresse auch aus den Einladungen", () => {
    const chef = createAccount("chef@example.org", PASSWORT)!;
    const einladung = createInvitation(chef.id, "gast@example.org", "user")!;
    const eingeloest = redeemInvitation(einladung.token, PASSWORT);
    if (!("account" in eingeloest)) throw new Error("nicht eingelöst");

    expect(deleteAccount(eingeloest.account.id, PASSWORT)).toBe("deleted");
    const rest = db().prepare("SELECT COUNT(*) AS n FROM invitation WHERE email = ?").get("gast@example.org") as {
      n: number;
    };
    expect(Number(rest.n)).toBe(0);
  });
});

describe("Anmeldung", () => {
  it("prüft asynchron dasselbe wie synchron", async () => {
    createAccount("a@example.org", PASSWORT);
    expect((await authenticateAsync("a@example.org", PASSWORT))?.email).toBe("a@example.org");
    expect(await authenticateAsync("a@example.org", "falsch falsch falsch")).toBeNull();
    expect(await authenticateAsync("niemand@example.org", PASSWORT)).toBeNull();
  });

  it("verträgt viele gleichzeitige Prüfungen", async () => {
    const hash = hashPassword(PASSWORT);
    const ergebnisse = await Promise.all(
      Array.from({ length: 6 }, (_, i) => verifyPasswordAsync(i % 2 ? PASSWORT : "falsch", hash)),
    );
    expect(ergebnisse).toEqual([false, true, false, true, false, true]);
  });
});

describe("Pause nach Fehlversuchen", () => {
  it("verdrängt bei voller Tabelle den ältesten Eintrag statt neue zu ignorieren", () => {
    const start = Date.now();
    for (let i = 0; i < BACKOFF.maxTracked; i += 1) recordLoginFailure(`a${i}@example.org`, start);
    for (let i = 0; i <= BACKOFF.freeFailures + 1; i += 1) recordLoginFailure("ziel@example.org", start + i);
    expect(loginPauseSeconds("ziel@example.org", start + BACKOFF.freeFailures + 2)).toBeGreaterThan(0);
  });
});

describe("JSON-Rümpfe", () => {
  const anfrage = (body: string) => new Request("http://x.test/", { method: "POST", body });

  it("nimmt Objekte an", async () => {
    expect(await readJson(anfrage('{"a":1}'))).toEqual({ a: 1 });
  });

  it.each(["null", "5", '"text"', "[1]", "true"])("lehnt %s ab", async (inhalt) => {
    await expect(readJson(anfrage(inhalt))).rejects.toThrow(SyntaxError);
  });
});
