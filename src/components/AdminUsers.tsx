"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useLocale, useT } from "@/i18n/context";
import { SettingsSection } from "./SettingsSection";

/**
 * Benutzer und Einladungen verwalten (ToDo 18.3) – nur für Administratoren.
 *
 * Die Zugangsprüfung steckt in den Routen unter `/api/admin/`; dass diese
 * Ansicht nur Admins gezeigt wird, ist Bequemlichkeit, keine Sperre.
 */

interface AccountView {
  id: string;
  email: string;
  username: string | null;
  role: "admin" | "user";
  createdAt: string;
  lastLoginAt: string | null;
  disabledAt: string | null;
  emailVerified: boolean;
  mustChangePassword: boolean;
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

  /**
   * Welches Konto gerade aufgeklappt ist, und was in seinen Feldern steht
   * (ToDo 18.8).
   *
   * **Nur eines auf einmal.** Die Felder zeigen den gespeicherten Stand; blieben
   * mehrere Formulare offen, während die Liste sich nach jeder Änderung neu
   * lädt, stünden dort halb getippte Werte neben frisch geladenen – und man
   * sähe nicht mehr, welcher davon gilt.
   */
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState({ username: "", email: "", password: "" });
  const [saved, setSaved] = useState<string | null>(null);

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

  function openEditor(account: AccountView) {
    setEditing(account.id);
    setSaved(null);
    setError(null);
    // Das Passwortfeld bleibt leer: Es gibt keinen Wert zum Anzeigen, nur
    // einen zum Setzen.
    setDraft({ username: account.username ?? "", email: account.email, password: "" });
  }

  /**
   * Eine einzelne Änderung am Konto. Der Endpunkt nimmt genau ein Feld je
   * Aufruf (die Begründung steht dort), deshalb hat jede Zeile ihren Knopf.
   */
  async function change(id: string, body: Record<string, unknown>, keepOpen = true) {
    setSaved(null);
    if (await send(`/api/admin/accounts/${id}`, "PATCH", body)) {
      setSaved(id);
      if (!keepOpen) setEditing(null);
      if ("password" in body) setDraft((current) => ({ ...current, password: "" }));
    }
  }

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
    <SettingsSection title={t("users.title")} description={t("users.intro")}>
      <div className="space-y-4">
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
                {account.username ? `${account.username} · ` : ""}
                {account.email}{" "}
                <span className="font-normal text-neutral-500">
                  · {t(`users.role.${account.role}`)}
                  {account.isYou ? ` · ${t("users.you")}` : ""}
                  {account.disabledAt ? ` · ${t("users.disabled")}` : ""}
                </span>
              </p>
              {/*
                Zwei Zustände, die sonst unsichtbar wären und beide etwas
                bedeuten: Eine unbestätigte Adresse wird von `ADMIN_EMAILS`
                nicht gehoben (10.19), und ein Konto mit Startpasswort hat
                noch keine Verwaltungsrechte (18.7). Wer das nicht sieht,
                sucht den Fehler woanders.
              */}
              {!account.emailVerified || account.mustChangePassword ? (
                <p className="text-amber-700 dark:text-amber-300">
                  {[
                    account.emailVerified ? null : t("users.unverified"),
                    account.mustChangePassword ? t("users.startPassword") : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              ) : null}
              <p className="text-neutral-500">
                {t("users.created", { date: date(account.createdAt) })} ·{" "}
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
                <button
                  type="button"
                  className={button}
                  aria-expanded={editing === account.id}
                  onClick={() =>
                    editing === account.id ? setEditing(null) : openEditor(account)
                  }
                >
                  {editing === account.id ? t("users.editClose") : t("users.edit")}
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

              {editing === account.id ? (
                <div className="mt-3 space-y-3 border-t border-neutral-200 pt-3 dark:border-neutral-800">
                  <div>
                    <label
                      htmlFor={`name-${account.id}`}
                      className="block text-xs text-neutral-500 uppercase"
                    >
                      {t("users.username")}
                    </label>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <input
                        id={`name-${account.id}`}
                        value={draft.username}
                        autoComplete="off"
                        onChange={(event) =>
                          setDraft({ ...draft, username: event.target.value })
                        }
                        placeholder={t("users.usernameNone")}
                        className="min-h-11 min-w-0 flex-1 rounded-lg border border-neutral-300 bg-white px-3 text-sm dark:border-neutral-700 dark:bg-neutral-950"
                      />
                      <button
                        type="button"
                        className={button}
                        onClick={() =>
                          void change(account.id, { username: draft.username.trim() || null })
                        }
                      >
                        {t("users.apply")}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={`mail-${account.id}`}
                      className="block text-xs text-neutral-500 uppercase"
                    >
                      {t("users.email")}
                    </label>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <input
                        id={`mail-${account.id}`}
                        type="email"
                        value={draft.email}
                        autoComplete="off"
                        onChange={(event) => setDraft({ ...draft, email: event.target.value })}
                        className="min-h-11 min-w-0 flex-1 rounded-lg border border-neutral-300 bg-white px-3 text-sm dark:border-neutral-700 dark:bg-neutral-950"
                      />
                      <button
                        type="button"
                        className={button}
                        onClick={() => void change(account.id, { email: draft.email })}
                      >
                        {t("users.apply")}
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-neutral-500">{t("users.emailNote")}</p>
                  </div>

                  {/*
                    Das eigene Passwort wird hier nicht gesetzt: Dafür ist das
                    bisherige anzugeben (10.7), damit eine gestohlene Sitzung
                    allein nicht genügt. Der Knopf fehlt deshalb, statt eine
                    Fehlermeldung zu provozieren.
                  */}
                  {account.isYou ? null : (
                    <div>
                      <label
                        htmlFor={`pw-${account.id}`}
                        className="block text-xs text-neutral-500 uppercase"
                      >
                        {t("users.newPassword")}
                      </label>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <input
                          id={`pw-${account.id}`}
                          type="password"
                          value={draft.password}
                          autoComplete="new-password"
                          onChange={(event) =>
                            setDraft({ ...draft, password: event.target.value })
                          }
                          className="min-h-11 min-w-0 flex-1 rounded-lg border border-neutral-300 bg-white px-3 text-sm dark:border-neutral-700 dark:bg-neutral-950"
                        />
                        <button
                          type="button"
                          className={button}
                          disabled={draft.password.length === 0}
                          onClick={() =>
                            void change(account.id, { password: draft.password })
                          }
                        >
                          {t("users.apply")}
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-neutral-500">
                        {t("users.newPasswordNote")}
                      </p>
                    </div>
                  )}

                  {saved === account.id ? (
                    <p role="status" className="text-sm text-green-700 dark:text-green-400">
                      {t("users.saved")}
                    </p>
                  ) : null}
                </div>
              ) : null}
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
      </div>
    </SettingsSection>
  );
}
