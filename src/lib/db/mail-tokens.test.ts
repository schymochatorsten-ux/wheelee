import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb, db } from "./sqlite";
import { authenticate, createAccount, createSession, accountForSession, setDisabled } from "./accounts";
import {
  confirmEmailChange,
  createResetToken,
  requestEmailChange,
  resetPassword,
} from "./mail-tokens";

/** Einmal-Links per Mail (ToDos 11.1, 11.8), gegen eine echte Datenbank. */

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-mailtoken-"));
  process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
  closeDb();
});

afterEach(() => {
  closeDb();
  delete process.env.WHEELEE_DB_PATH;
  fs.rmSync(folder, { recursive: true, force: true });
});

const ALT = "ein gutes langes Passwort";
const NEU = "ein ganz anderes langes Passwort";

function konto(email = "a@example.org") {
  const account = createAccount(email, ALT);
  if (!account) throw new Error("Konto nicht angelegt");
  return account;
}

describe("Passwort zurücksetzen", () => {
  it("setzt das Passwort, beendet alle Sitzungen und gilt nur einmal", () => {
    const account = konto();
    const sitzung = createSession(account.id);
    const link = createResetToken("A@Example.org");
    expect(link).not.toBeNull();

    expect(resetPassword(link!.token, NEU)).toBe(true);
    expect(authenticate("a@example.org", NEU)).not.toBeNull();
    expect(authenticate("a@example.org", ALT)).toBeNull();
    expect(accountForSession(sitzung)).toBeNull();

    expect(resetPassword(link!.token, "noch ein langes Passwort")).toBe(false);
    expect(authenticate("a@example.org", NEU)).not.toBeNull();
  });

  it("kennt unbekannte und gesperrte Adressen nicht – und gibt dann nichts heraus", () => {
    expect(createResetToken("niemand@example.org")).toBeNull();
    const account = konto();
    konto("admin@example.org");
    db().prepare("UPDATE account SET role = 'admin' WHERE email = ?").run("admin@example.org");
    expect(setDisabled(account.id, true)).toBe(true);
    expect(createResetToken("a@example.org")).toBeNull();
  });

  it("entwertet den früheren Link, wenn ein neuer angefordert wird", () => {
    konto();
    const erster = createResetToken("a@example.org")!;
    const zweiter = createResetToken("a@example.org")!;
    expect(resetPassword(erster.token, NEU)).toBe(false);
    expect(resetPassword(zweiter.token, NEU)).toBe(true);
  });

  it("lehnt abgelaufene und erfundene Tokens ab", () => {
    konto();
    const link = createResetToken("a@example.org")!;
    db().prepare("UPDATE mail_token SET expires_at = ?").run(new Date(Date.now() - 1000).toISOString());
    expect(resetPassword(link.token, NEU)).toBe(false);
    expect(resetPassword("", NEU)).toBe(false);
    expect(resetPassword("erfunden", NEU)).toBe(false);
  });

  it("speichert nur den Hash des Tokens", () => {
    konto();
    const link = createResetToken("a@example.org")!;
    const rows = db().prepare("SELECT token_hash FROM mail_token").all() as { token_hash: string }[];
    expect(rows).toHaveLength(1);
    expect(rows[0].token_hash).not.toContain(link.token);
  });

  it("nimmt einen Token der anderen Art nicht an", () => {
    const account = konto();
    const antrag = requestEmailChange(account.id, ALT, "neu@example.org");
    expect(antrag.status).toBe("ok");
    if (antrag.status !== "ok") return;
    expect(resetPassword(antrag.token, NEU)).toBe(false);
  });
});

describe("E-Mail-Adresse ändern", () => {
  it("verlangt das Passwort", () => {
    const account = konto();
    expect(requestEmailChange(account.id, "falsch", "neu@example.org")).toEqual({
      status: "wrong-password",
    });
  });

  it("tauscht die Adresse erst beim Klick, einmalig, und lässt Sitzungen bestehen", () => {
    const account = konto();
    const sitzung = createSession(account.id);
    const antrag = requestEmailChange(account.id, ALT, "Neu@Example.org");
    if (antrag.status !== "ok") throw new Error("Antrag nicht angenommen");

    expect(authenticate("a@example.org", ALT)).not.toBeNull();
    expect(confirmEmailChange(antrag.token)).toBe("neu@example.org");
    expect(authenticate("neu@example.org", ALT)).not.toBeNull();
    expect(authenticate("a@example.org", ALT)).toBeNull();
    expect(accountForSession(sitzung)).not.toBeNull();

    expect(confirmEmailChange(antrag.token)).toBeNull();
  });

  it("meldet gleiche und vergebene Adressen, ohne einen Token auszustellen", () => {
    const account = konto();
    konto("b@example.org");
    expect(requestEmailChange(account.id, ALT, "A@example.org").status).toBe("same");
    expect(requestEmailChange(account.id, ALT, "b@example.org").status).toBe("taken");
    const row = db().prepare("SELECT COUNT(*) AS n FROM mail_token").get() as { n: number };
    expect(Number(row.n)).toBe(0);
  });

  it("scheitert, wenn die Adresse zwischen Antrag und Klick vergeben wurde", () => {
    const account = konto();
    const antrag = requestEmailChange(account.id, ALT, "neu@example.org");
    if (antrag.status !== "ok") throw new Error("Antrag nicht angenommen");
    konto("neu@example.org");
    expect(confirmEmailChange(antrag.token)).toBeNull();
    expect(authenticate("a@example.org", ALT)).not.toBeNull();
  });
});
