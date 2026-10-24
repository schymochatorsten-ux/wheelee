import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb, db } from "./sqlite";
import { createAccount, setRole } from "./accounts";
import { createInvitation } from "./invitations";
import { countAccounts, deleteAccountByAdmin, listAccounts, listInvitations, revokeInvitation } from "./admin";
import { purgeExpired } from "./cleanup";

/** Benutzerverwaltung (ToDo 18.3), gegen eine echte Datenbank. */

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-admin-"));
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

describe("listAccounts / listInvitations", () => {
  it("liefert weder Passwort-Hash noch Token", () => {
    const chef = konto("chef@example.org");
    createInvitation(chef.id, "neu@example.org", "user");
    const text = JSON.stringify([listAccounts(), listInvitations()]);
    expect(text).not.toContain("scrypt");
    expect(text).not.toContain("token");
    expect(text).toContain("chef@example.org");
  });

  it("begrenzt, sucht und stellt Admins und gesperrte Konten voran (ToDo 18.6)", () => {
    const chef = konto("chef@example.org");
    setRole(chef.id, "admin");
    const alt = konto("alt@example.org");
    for (const n of ["a", "b", "c"]) konto(`${n}@example.org`);
    const gesperrt = konto("gesperrt@example.org");
    db().prepare("UPDATE account SET disabled_at = ? WHERE id = ?").run("2026-01-01T00:00:00.000Z", gesperrt.id);

    expect(countAccounts()).toBe(6);
    const alle = listAccounts().map((a) => a.email);
    expect(alle.slice(0, 2)).toEqual(["chef@example.org", "gesperrt@example.org"]);
    expect(listAccounts({ limit: 2 }).map((a) => a.email)).toEqual(alle.slice(0, 2));
    expect(listAccounts({ limit: 0 })).toEqual([]);

    // Teilsuche ohne Rücksicht auf Groß-/Kleinschreibung; Gesamtzahl unabhängig vom Limit.
    expect(listAccounts({ query: "ALT@" }).map((a) => a.email)).toEqual(["alt@example.org"]);
    expect(countAccounts("@example")).toBe(6);
    expect(listAccounts({ query: "@example", limit: 3 })).toHaveLength(3);
    expect(alt.id).toBeTruthy();
  });

  it("behandelt Sonderzeichen der Suche als Zeichen, nicht als Muster", () => {
    konto("a_b@example.org");
    konto("axb@example.org");
    expect(listAccounts({ query: "a_b" }).map((a) => a.email)).toEqual(["a_b@example.org"]);
    expect(countAccounts("%")).toBe(0);
  });

  it("benennt den Stand einer Einladung", () => {
    const chef = konto("chef@example.org");
    const offen = createInvitation(chef.id, "a@example.org", "user")!;
    const alt = createInvitation(chef.id, "b@example.org", "user")!;
    const weg = createInvitation(chef.id, "c@example.org", "user")!;
    db().prepare("UPDATE invitation SET expires_at = ? WHERE id = ?").run("2020-01-01T00:00:00.000Z", alt.id);
    revokeInvitation(weg.id);

    const states = Object.fromEntries(listInvitations().map((i) => [i.email, i.state]));
    expect(states).toEqual({
      "a@example.org": "open",
      "b@example.org": "expired",
      "c@example.org": "revoked",
    });
    expect(offen.id).toBeTruthy();
  });
});

describe("revokeInvitation", () => {
  it("zieht nur eine offene zurück", () => {
    const chef = konto("chef@example.org");
    const einladung = createInvitation(chef.id, "a@example.org", "user")!;
    expect(revokeInvitation(einladung.id)).toBe(true);
    expect(revokeInvitation(einladung.id)).toBe(false);
    expect(revokeInvitation("gibt-es-nicht")).toBe(false);
  });
});

describe("deleteAccountByAdmin", () => {
  it("löscht ein fremdes Konto samt Antwortadresse", () => {
    const chef = konto("chef@example.org");
    const opfer = konto("opfer@example.org");
    db()
      .prepare(
        `INSERT INTO feedback (kind, message, contact_email, account_id, status, created_at)
         VALUES ('fehler', 'x', 'opfer@example.org', ?, 'neu', '2026-10-23T10:00:00.000Z')`,
      )
      .run(opfer.id);

    expect(deleteAccountByAdmin(opfer.id, chef.id)).toBe("deleted");
    expect(listAccounts().map((a) => a.email)).toEqual(["chef@example.org"]);
    const row = db().prepare("SELECT contact_email FROM feedback").get() as {
      contact_email: string | null;
    };
    expect(row.contact_email).toBeNull();
  });

  it("löscht weder sich selbst noch das letzte Admin-Konto noch ein unbekanntes", () => {
    const chef = konto("chef@example.org");
    const andere = konto("andere@example.org");
    setRole(chef.id, "admin");

    expect(deleteAccountByAdmin(chef.id, chef.id)).toBe("self");
    expect(deleteAccountByAdmin(chef.id, andere.id)).toBe("last-admin");
    expect(deleteAccountByAdmin("gibt-es-nicht", chef.id)).toBe("not-found");
  });
});

describe("purgeExpired: Einladungen", () => {
  it("löscht abgeschlossene Einladungen nach dreißig Tagen, offene nicht", () => {
    const chef = konto("chef@example.org");
    const offen = createInvitation(chef.id, "offen@example.org", "user")!;
    const alt = createInvitation(chef.id, "alt@example.org", "user")!;
    const jung = createInvitation(chef.id, "jung@example.org", "user")!;
    revokeInvitation(alt.id);
    revokeInvitation(jung.id);
    const vorLangem = new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString();
    db().prepare("UPDATE invitation SET revoked_at = ? WHERE id = ?").run(vorLangem, alt.id);

    const result = purgeExpired();
    expect(result.invitations).toBe(1);
    expect(listInvitations().map((i) => i.email).sort()).toEqual([
      "jung@example.org",
      "offen@example.org",
    ]);
    expect(offen.id).toBeTruthy();
  });
});
