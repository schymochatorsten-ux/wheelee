import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb, db } from "./sqlite";
import { authenticate, createAccount } from "./accounts";
import { createInvitation, redeemInvitation } from "./invitations";

/** Einladungen (ToDo 18.2), gegen eine echte Datenbank. */

let folder: string;

beforeEach(() => {
  folder = fs.mkdtempSync(path.join(os.tmpdir(), "wheelee-invite-"));
  process.env.WHEELEE_DB_PATH = path.join(folder, "test.sqlite");
  closeDb();
});

afterEach(() => {
  closeDb();
  delete process.env.WHEELEE_DB_PATH;
  fs.rmSync(folder, { recursive: true, force: true });
});

const PASSWORT = "ein gutes langes Passwort";

function admin() {
  const account = createAccount("chef@example.org", PASSWORT);
  if (!account) throw new Error("Konto nicht angelegt");
  return account;
}

describe("Einladung", () => {
  it("legt bei Einlösung ein Konto mit eingeladener Adresse und Rolle an", () => {
    const einladung = createInvitation(admin().id, "Neu@Example.org", "admin");
    expect(einladung).not.toBeNull();

    const result = redeemInvitation(einladung!.token, PASSWORT);
    expect("account" in result && result.account.email).toBe("neu@example.org");
    expect("account" in result && result.account.role).toBe("admin");
    expect(authenticate("neu@example.org", PASSWORT)?.role).toBe("admin");
  });

  it("speichert nur den Hash des Tokens", () => {
    const einladung = createInvitation(admin().id, "neu@example.org", "user")!;
    const rows = db().prepare("SELECT token_hash FROM invitation").all() as {
      token_hash: string;
    }[];
    expect(rows).toHaveLength(1);
    expect(rows[0].token_hash).not.toContain(einladung.token);
    expect(einladung.token.length).toBeGreaterThanOrEqual(43);
  });

  it("lässt sich nur einmal einlösen", () => {
    const einladung = createInvitation(admin().id, "neu@example.org", "user")!;
    expect("account" in redeemInvitation(einladung.token, PASSWORT)).toBe(true);
    expect(redeemInvitation(einladung.token, PASSWORT)).toEqual({ error: "invalid" });
  });

  it("lehnt abgelaufene, unbekannte und leere Token gleich ab", () => {
    const einladung = createInvitation(admin().id, "neu@example.org", "user")!;
    db().prepare("UPDATE invitation SET expires_at = ?").run("2020-01-01T00:00:00.000Z");
    expect(redeemInvitation(einladung.token, PASSWORT)).toEqual({ error: "invalid" });
    expect(redeemInvitation("irgendwas", PASSWORT)).toEqual({ error: "invalid" });
    expect(redeemInvitation("", PASSWORT)).toEqual({ error: "invalid" });
    expect(authenticate("neu@example.org", PASSWORT)).toBeNull();
  });

  it("eine neue Einladung für dieselbe Adresse zieht die alte zurück", () => {
    const chef = admin();
    const alt = createInvitation(chef.id, "neu@example.org", "user")!;
    const neu = createInvitation(chef.id, "neu@example.org", "admin")!;
    expect(redeemInvitation(alt.token, PASSWORT)).toEqual({ error: "invalid" });
    const result = redeemInvitation(neu.token, PASSWORT);
    expect("account" in result && result.account.role).toBe("admin");
  });

  it("lädt niemanden ein, der schon ein Konto hat", () => {
    const chef = admin();
    expect(createInvitation(chef.id, "CHEF@example.org", "user")).toBeNull();
  });

  it("verbraucht die Einladung nicht, wenn die Adresse inzwischen vergeben ist", () => {
    const chef = admin();
    const einladung = createInvitation(chef.id, "neu@example.org", "user")!;
    createAccount("neu@example.org", PASSWORT);
    expect(redeemInvitation(einladung.token, PASSWORT)).toEqual({ error: "exists" });
    const row = db().prepare("SELECT used_at FROM invitation").get() as { used_at: string | null };
    expect(row.used_at).toBeNull();
  });
});
