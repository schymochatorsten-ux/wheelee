"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useLocale, useT } from "@/i18n/context";

/**
 * Benutzer und Einladungen verwalten (ToDo 18.3) – nur für Administratoren.
 *
 * Die Zugangsprüfung steckt in den Routen unter `/api/admin/`; dass diese
 * Ansicht nur Admins gezeigt wird, ist Bequemlichkeit, keine Sperre.
 */

interface AccountView {
  id: string;
  email: string;
  role: "admin" | "user";
  lastLoginAt: string | null;
  disabledAt: string | null;
  isYou: boolean;
}

interface InvitationView {
  id: string;
  email: string;
  role: "admin" | "user";
  expiresAt: string;
  state: "open" | "used" | "expired" | "revoked";
}

/** Soviele Konten je Seite; der Server begrenzt unabhängig davon (ToDo 18.6). */
const PAGE_SIZE = 25;

const button =
  "min-h-11 rounded-lg border border-neutral-300 px-3 text-sm dark:border-neutral-700";

export function AdminUsers() {
  const t = useT();
  const locale = useLocale();
  const [accounts, setAccounts] = useState<AccountView[]>([]);
  const [invitations, setInvitations] = useState<InvitationView[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "user">("user");
  const [created, setCreated] = useState<{ email: string; link: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const [total, setTotal] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const date = (value: string) => new Date(value).toLocaleDateString(locale);

  // Die Suche wartet auf eine Tippause; eine neue Suche beginnt wieder bei der ersten Seite.
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(search.trim());
      setLimit(PAGE_SIZE);
    }, 250);
    return () => clearTimeout(timer);
  }, [search]);

  // Nur die jüngste Anfrage darf die Anzeige setzen: Eine langsame ältere Antwort
  // (ohne Suchbegriff) würde sonst die Treffer der neueren überschreiben.
  const latest = useRef(0);

  const load = useCallback(async () => {
    const mine = ++latest.current;
    try {
      const response = await fetch(
        `/api/admin/accounts?${new URLSearchParams({ q: query, limit: String(limit) })}`,
      );
      if (mine !== latest.current) return;
      if (response.status === 401) {
        setError(t("admin.unauthorized"));
        return;
      }
      if (!response.ok) {
        setError(t("users.failed"));
        return;
      }
      const data = (await response.json()) as {
        accounts: AccountView[];
        total: number;
        invitations: InvitationView[];
      };
      if (mine !== latest.current) return;
      setAccounts(data.accounts);
      setTotal(data.total);
      setInvitations(data.invitations);
      setError(null);
    } catch {
      setError(t("admin.noConnection"));
    }
  }, [t, query, limit]);

  useEffect(() => {
    void load();
  }, [load]);

  /** Eine Änderung senden und danach neu laden; die Antwort sagt, warum es nicht ging. */
  async function send(url: string, method: string, body?: unknown) {
    try {
      const response = await fetch(url, {
        method,
        headers: body ? { "Content-Type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? t("users.failed"));
        return false;
      }
      await load();
      return true;
    } catch {
      setError(t("admin.noConnection"));
      return false;
    }
  }

  async function invite(event: FormEvent) {
    event.preventDefault();
    setCreated(null);
    setCopied(false);
    try {
      const response = await fetch("/api/admin/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        path?: string;
        email?: string;
      };
      if (!response.ok || !data.path) {
        setError(data.error ?? t("users.failed"));
        return;
      }
      setError(null);
      setEmail("");
      setCreated({ email: data.email ?? email, link: window.location.origin + data.path });
      await load();
    } catch {
      setError(t("admin.noConnection"));
    }
  }

  async function copy(link: string) {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch {
      // Ohne Zwischenablage bleibt das Feld zum Markieren und Kopieren.
    }
  }

  return (
    <section aria-labelledby="benutzer" className="mt-8 space-y-4">
      <div>
        <h2 id="benutzer" className="text-base font-semibold">
          {t("users.title")}
        </h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{t("users.intro")}</p>
      </div>

      {error ? (
        <p role="alert" className="text-sm text-red-700 dark:text-red-400">
          {error}
        </p>
      ) : null}

      <form onSubmit={invite} className="flex flex-wrap items-end gap-3">
        <div className="min-w-0 flex-1 basis-full sm:basis-0">
          <label htmlFor="einladung-mail" className="block text-xs text-neutral-500 uppercase">
            {t("users.inviteEmail")}
          </label>
          <input
            id="einladung-mail"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 min-h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm dark:border-neutral-700 dark:bg-neutral-950"
          />
        </div>
        <div>
          <label htmlFor="einladung-rolle" className="block text-xs text-neutral-500 uppercase">
            {t("users.inviteRole")}
          </label>
          <select
            id="einladung-rolle"
            value={role}
            onChange={(event) => setRole(event.target.value as "admin" | "user")}
            className="mt-1 min-h-11 rounded-lg border border-neutral-300 bg-white px-2 text-sm dark:border-neutral-700 dark:bg-neutral-950"
          >
            <option value="admin">{t("users.role.admin")}</option>
            <option value="user">{t("users.role.user")}</option>
          </select>
        </div>
        <button type="submit" className={button}>
          {t("users.inviteSubmit")}
        </button>
      </form>

      {created ? (
        <div role="status" className="space-y-2 rounded-lg border border-neutral-300 p-3 text-sm dark:border-neutral-700">
          <p>{t("users.inviteCreated", { email: created.email })}</p>
          <input
            readOnly
            value={created.link}
            aria-label={t("users.copy")}
            onFocus={(event) => event.currentTarget.select()}
            className="min-h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 dark:border-neutral-700 dark:bg-neutral-950"
          />
          <button type="button" className={button} onClick={() => void copy(created.link)}>
            {copied ? t("users.copied") : t("users.copy")}
          </button>
        </div>
      ) : null}

      <div>
        <h3 className="text-sm font-semibold">{t("users.accounts")}</h3>
        <label htmlFor="konten-suche" className="mt-2 block text-xs text-neutral-500 uppercase">
          {t("users.search")}
        </label>
        <input
          id="konten-suche"
          type="search"
          value={search}
          maxLength={100}
          onChange={(event) => setSearch(event.target.value)}
          className="mt-1 min-h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm dark:border-neutral-700 dark:bg-neutral-950"
        />
        <p role="status" className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {total === null
            ? ""
            : total === 0
              ? t("users.noMatch")
              : t("users.count", { shown: accounts.length, total })}
        </p>
        <ul className="mt-2 space-y-2">
          {accounts.map((account) => (
            <li
              key={account.id}
              className="rounded-lg border border-neutral-300 p-3 text-sm dark:border-neutral-700"
            >
              <p className="font-medium break-all">
                {account.email}{" "}
                <span className="font-normal text-neutral-500">
                  · {t(`users.role.${account.role}`)}
                  {account.isYou ? ` · ${t("users.you")}` : ""}
                  {account.disabledAt ? ` · ${t("users.disabled")}` : ""}
                </span>
              </p>
              <p className="text-neutral-500">
                {account.lastLoginAt
                  ? t("users.lastLogin", { date: date(account.lastLoginAt) })
                  : t("users.never")}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  className={button}
                  onClick={() =>
                    void send(`/api/admin/accounts/${account.id}`, "PATCH", {
                      role: account.role === "admin" ? "user" : "admin",
                    })
                  }
                >
                  {account.role === "admin" ? t("users.makeUser") : t("users.makeAdmin")}
                </button>
                <button
                  type="button"
                  className={button}
                  onClick={() =>
                    void send(`/api/admin/accounts/${account.id}`, "PATCH", {
                      disabled: !account.disabledAt,
                    })
                  }
                >
                  {account.disabledAt ? t("users.enable") : t("users.disable")}
                </button>
                {account.isYou ? null : (
                  <button
                    type="button"
                    className={button}
                    onClick={() => {
                      if (window.confirm(t("users.deleteConfirm", { email: account.email }))) {
                        void send(`/api/admin/accounts/${account.id}`, "DELETE");
                      }
                    }}
                  >
                    {t("users.delete")}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
        {total !== null && accounts.length < total ? (
          <button
            type="button"
            className={`${button} mt-2 w-full`}
            onClick={() => setLimit((current) => current + PAGE_SIZE)}
          >
            {t("users.more")}
          </button>
        ) : null}
      </div>

      {invitations.length > 0 ? (
        <div>
          <h3 className="text-sm font-semibold">{t("users.invitations")}</h3>
          <ul className="mt-2 space-y-2">
            {invitations.map((invitation) => (
              <li
                key={invitation.id}
                className="rounded-lg border border-neutral-300 p-3 text-sm dark:border-neutral-700"
              >
                <p className="font-medium break-all">
                  {invitation.email}{" "}
                  <span className="font-normal text-neutral-500">
                    · {t(`users.role.${invitation.role}`)} · {t(`users.state.${invitation.state}`)}
                    {invitation.state === "open"
                      ? ` · ${t("users.expires", { date: date(invitation.expiresAt) })}`
                      : ""}
                  </span>
                </p>
                {invitation.state === "open" ? (
                  <button
                    type="button"
                    className={`${button} mt-2`}
                    onClick={() => void send(`/api/admin/invitations/${invitation.id}`, "DELETE")}
                  >
                    {t("users.revoke")}
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
