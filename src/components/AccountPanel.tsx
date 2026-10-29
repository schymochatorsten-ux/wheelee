"use client";

import { useRef, useState } from "react";
import { useT } from "@/i18n/context";
import { useMailEnabled } from "@/hooks/useMailEnabled";
import { useRich } from "@/i18n/rich";
import { MIN_PASSWORD_LENGTH } from "@/lib/auth/password-rules";
import { looksLikeEmail } from "@/lib/auth/email";
import type { PublicUser } from "@/lib/auth/user";
import type { ParkingSpot } from "@/lib/types";
import type { LatLng } from "@/lib/geo";
import { MyFavorites } from "./MyFavorites";
import { MyRatings } from "./MyRatings";

/**
 * Anmelden, Konto anlegen, abmelden (ToDos 11.1, 11.2).
 *
 * **Die App verlangt nirgends eine Anmeldung.** Karte, Zielsuche und das
 * Melden eines Fehlers funktionieren ohne Konto, und so muss es bleiben: Jede
 * zusätzliche Hürde trifft genau die Zielgruppe, der die App helfen soll.
 * Das Konto ist ein Angebot – es sorgt dafür, dass Rückmeldungen einem
 * wiederkehrenden Gegenüber zugeordnet sind, und es ist die Voraussetzung für
 * die Übersicht des Administrators.
 *
 * Es steht deshalb **in den Einstellungen** und nicht als eigener Reiter: Ein
 * dritter Reiter über der Karte kostet Platz für etwas, das die meisten nie
 * brauchen (vgl. 9.15).
 */

interface AccountPanelProps {
  user: PublicUser | null;
  /** Meldet die Änderung nach oben, damit Reiter und Vorbelegungen sofort stimmen. */
  onUserChange: (user: PublicUser | null) => void;
  /** Einen Parkplatz aus den eigenen Listen auf der Karte zeigen. */
  onShowSpot: (spot: ParkingSpot) => void;
  /** Eigener Standort, falls bekannt – für die Entfernung bei gespeicherten Parkplätzen. */
  position: LatLng | null;
}

const FIELD =
  "min-h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700 dark:bg-neutral-950";

type Mode = "anmelden" | "registrieren";

/**
 * Passwort ändern (ToDo 10.7). Der Server beendet dabei alle übrigen
 * Sitzungen; diese hier bleibt.
 */
function PasswordChange() {
  const t = useT();
  const tr = useRich();
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (busy) return;

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setError(t("account.passwordTooShort", { min: MIN_PASSWORD_LENGTH }));
      return;
    }

    setError(null);
    setBusy(true);
    try {
      const response = await fetch("/api/account/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setError(data.error ?? t("account.failed"));
        return;
      }
      setOldPassword("");
      setNewPassword("");
      setOpen(false);
      setDone(true);
    } catch {
      setError(t("account.offline"));
    } finally {
      setBusy(false);
    }
  };

  if (!open) {
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setDone(false);
          }}
          className="min-h-11 rounded-lg border border-neutral-300 px-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700"
        >
          {t("account.changePassword")}
        </button>
        {done && (
          <p role="status" className="mt-2 text-sm text-green-800 dark:text-green-400">
            {t("account.passwordChanged")}
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-3 border-t border-neutral-200 pt-3 dark:border-neutral-800"
    >
      <p className="text-xs text-neutral-500">{t("account.changePasswordNote")}</p>
      <div>
        <label htmlFor="konto-altes-passwort" className="text-sm font-medium">
          {t("account.oldPassword")}
        </label>
        <input
          id="konto-altes-passwort"
          type="password"
          autoComplete="current-password"
          required
          value={oldPassword}
          onChange={(event) => setOldPassword(event.target.value)}
          className={`${FIELD} mt-1`}
        />
      </div>
      <div>
        <label htmlFor="konto-neues-passwort" className="text-sm font-medium">
          {t("account.newPassword")}
        </label>
        <input
          id="konto-neues-passwort"
          type="password"
          autoComplete="new-password"
          required
          minLength={MIN_PASSWORD_LENGTH}
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          aria-describedby="konto-neues-passwort-hilfe"
          className={`${FIELD} mt-1`}
        />
        <p id="konto-neues-passwort-hilfe" className="mt-1 text-xs text-neutral-500">
          {tr(
            "account.passwordHelp",
            { example: <code>Passwort1!</code> },
            { min: MIN_PASSWORD_LENGTH },
          )}
        </p>
      </div>
      {error && (
        <p role="alert" className="text-sm font-medium text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={busy}
          className="min-h-11 flex-1 rounded-lg bg-blue-700 px-3 text-sm font-medium text-white hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-60"
        >
          {busy ? "…" : t("account.changePassword")}
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setError(null);
            setOldPassword("");
            setNewPassword("");
          }}
          className="min-h-11 rounded-lg border border-neutral-300 px-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700"
        >
          {t("account.cancel")}
        </button>
      </div>
    </form>
  );
}

/** Konto löschen (ToDo 11.7): Warnung und Passwort, erst dann der Aufruf. */
function DeleteAccount({ onDeleted }: { onDeleted: () => void }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (busy) return;
    setError(null);
    setBusy(true);
    try {
      const response = await fetch("/api/account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setError(data.error ?? t("account.failed"));
        return;
      }
      onDeleted();
    } catch {
      setError(t("account.offline"));
    } finally {
      setBusy(false);
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="min-h-11 rounded-lg border border-red-300 px-3 text-sm font-medium text-red-800 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-red-900 dark:text-red-300"
      >
        {t("account.delete")}
      </button>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-3 border-t border-neutral-200 pt-3 dark:border-neutral-800"
    >
      <p role="note" className="text-sm">
        {t("account.deleteWarning")}
      </p>
      <div>
        <label htmlFor="konto-loeschen-passwort" className="text-sm font-medium">
          {t("account.deletePassword")}
        </label>
        <input
          id="konto-loeschen-passwort"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={`${FIELD} mt-1`}
        />
      </div>
      {error && (
        <p role="alert" className="text-sm font-medium text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={busy}
          className="min-h-11 flex-1 rounded-lg bg-red-700 px-3 text-sm font-medium text-white hover:bg-red-800 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-60"
        >
          {busy ? "…" : t("account.deleteConfirm")}
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setError(null);
            setPassword("");
          }}
          className="min-h-11 rounded-lg border border-neutral-300 px-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700"
        >
          {t("account.cancel")}
        </button>
      </div>
    </form>
  );
}

const SECONDARY_BUTTON =
  "min-h-11 rounded-lg border border-neutral-300 px-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700";
const PRIMARY_BUTTON =
  "min-h-11 flex-1 rounded-lg bg-blue-700 px-3 text-sm font-medium text-white hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-60";

/**
 * „Passwort vergessen" (ToDo 11.1). Nur sichtbar, wenn der Mailversand
 * eingerichtet ist (D-10); die Antwort ist immer dieselbe, ob es die Adresse
 * gibt oder nicht.
 */
function ForgotPassword() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const submit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (busy) return;
    if (!looksLikeEmail(email)) {
      setError(t("account.emailInvalid"));
      return;
    }
    setError(null);
    setBusy(true);
    try {
      const response = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setError(data.error ?? t("account.failed"));
        return;
      }
      setSent(true);
    } catch {
      setError(t("account.offline"));
    } finally {
      setBusy(false);
    }
  };

  if (sent) {
    return (
      <p role="status" className="text-sm text-green-800 dark:text-green-400">
        {t("account.forgotSent")}
      </p>
    );
  }

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="text-sm underline">
        {t("account.forgot")}
      </button>
    );
  }

  return (
    <div className="space-y-3 border-t border-neutral-200 pt-3 dark:border-neutral-800">
      <p className="text-xs text-neutral-500">{t("account.forgotIntro")}</p>
      <div>
        <label htmlFor="konto-vergessen-email" className="text-sm font-medium">
          {t("account.email")}
        </label>
        <input
          id="konto-vergessen-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          // Steht in der Anmeldemaske: Enter soll den Link anfordern, nicht
          // das Anmeldeformular absenden, und ein Pflichtfeld hier würde das
          // Anmelden blockieren.
          onKeyDown={(event) => {
            if (event.key === "Enter") submit(event);
          }}
          className={`${FIELD} mt-1`}
        />
      </div>
      {error && (
        <p role="alert" className="text-sm font-medium text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
      <div className="flex gap-2">
        <button type="button" onClick={submit} disabled={busy} className={PRIMARY_BUTTON}>
          {busy ? "…" : t("account.forgotSend")}
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setError(null);
          }}
          className={SECONDARY_BUTTON}
        >
          {t("account.cancel")}
        </button>
      </div>
    </div>
  );
}

/**
 * E-Mail-Adresse ändern (ToDo 11.8). Passwort und neue Adresse; die Mail geht
 * an die **neue** Adresse, erst der Klick tauscht sie.
 */
function EmailChange() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (busy) return;
    if (!looksLikeEmail(newEmail)) {
      setError(t("account.emailInvalid"));
      return;
    }
    setError(null);
    setBusy(true);
    try {
      const response = await fetch("/api/account/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, newEmail }),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setError(data.error ?? t("account.failed"));
        return;
      }
      setPassword("");
      setNewEmail("");
      setOpen(false);
      setSent(true);
    } catch {
      setError(t("account.offline"));
    } finally {
      setBusy(false);
    }
  };

  if (!open) {
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setSent(false);
          }}
          className={SECONDARY_BUTTON}
        >
          {t("emailChange.open")}
        </button>
        {sent && (
          <p role="status" className="mt-2 text-sm text-green-800 dark:text-green-400">
            {t("emailChange.sent")}
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-3 border-t border-neutral-200 pt-3 dark:border-neutral-800"
    >
      <p className="text-xs text-neutral-500">{t("emailChange.note")}</p>
      <div>
        <label htmlFor="konto-neue-email" className="text-sm font-medium">
          {t("emailChange.newEmail")}
        </label>
        <input
          id="konto-neue-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
          className={`${FIELD} mt-1`}
        />
      </div>
      <div>
        <label htmlFor="konto-email-passwort" className="text-sm font-medium">
          {t("emailChange.password")}
        </label>
        <input
          id="konto-email-passwort"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={`${FIELD} mt-1`}
        />
      </div>
      {error && (
        <p role="alert" className="text-sm font-medium text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
      <div className="flex gap-2">
        <button type="submit" disabled={busy} className={PRIMARY_BUTTON}>
          {busy ? "…" : t("emailChange.submit")}
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setError(null);
            setPassword("");
            setNewEmail("");
          }}
          className={SECONDARY_BUTTON}
        >
          {t("account.cancel")}
        </button>
      </div>
    </form>
  );
}

export function AccountPanel({ user, onUserChange, onShowSpot, position }: AccountPanelProps) {
  const mailEnabled = useMailEnabled();
  const t = useT();
  const tr = useRich();
  const [mode, setMode] = useState<Mode>("anmelden");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (busy) return;

    if (!looksLikeEmail(email)) {
      setError(t("account.emailInvalid"));
      emailRef.current?.focus();
      return;
    }
    if (mode === "registrieren" && password.length < MIN_PASSWORD_LENGTH) {
      setError(t("account.passwordTooShort", { min: MIN_PASSWORD_LENGTH }));
      return;
    }

    setError(null);
    setBusy(true);

    try {
      const response = await fetch(mode === "anmelden" ? "/api/auth/login" : "/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await response.json()) as { user?: PublicUser; error?: string };

      if (!response.ok || !data.user) {
        setError(data.error ?? t("account.failed"));
        return;
      }

      setPassword("");
      setEmail("");
      onUserChange({
        email: data.user.email,
        isAdmin: data.user.isAdmin === true,
        // Die am Konto gewählte Karten-App kommt mit der Anmeldung zurück
        // (ToDo 11.3a); ohne sie gilt weiter, was im Browser steht.
        mapsPreference: data.user.mapsPreference ?? null,
        language: data.user.language ?? null,
      });
    } catch {
      setError(t("account.offline"));
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    setBusy(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      onUserChange(null);
    } catch {
      setError(t("account.logoutFailed"));
    } finally {
      setBusy(false);
    }
  };

  if (user) {
    return (
      <div className="space-y-2">
        <p className="text-sm">
          {tr("account.signedInAs", {
            email: <span className="font-medium">{user.email}</span>,
          })}
          {user.isAdmin && (
            <span className="ml-2 rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-900 dark:bg-blue-950 dark:text-blue-200">
              {t("account.admin")}
            </span>
          )}
        </p>
        <p className="text-xs text-neutral-500">{t("account.storedData")}</p>
        <button
          type="button"
          onClick={logout}
          disabled={busy}
          className="min-h-11 rounded-lg border border-neutral-300 px-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none disabled:opacity-60 dark:border-neutral-700"
        >
          {busy ? "…" : t("account.logout")}
        </button>
        {error && (
          <p role="alert" className="text-sm text-red-700 dark:text-red-400">
            {error}
          </p>
        )}
        <MyFavorites onShowSpot={onShowSpot} position={position} />
        <MyRatings onShowSpot={onShowSpot} />
        <PasswordChange />
        {mailEnabled && <EmailChange />}
        <div className="border-t border-neutral-200 pt-3 dark:border-neutral-800">
          <p className="text-xs text-neutral-500">{t("account.exportNote")}</p>
          <a
            href="/api/account/export"
            download
            className="mt-2 inline-flex min-h-11 items-center rounded-lg border border-neutral-300 px-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700"
          >
            {t("account.export")}
          </a>
        </div>
        <DeleteAccount onDeleted={() => onUserChange(null)} />
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div role="radiogroup" aria-label={t("account.modeGroup")} className="flex gap-2">
        {(["anmelden", "registrieren"] as Mode[]).map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={mode === option}
            onClick={() => {
              setMode(option);
              setError(null);
            }}
            className={`min-h-11 flex-1 rounded-lg border px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
              mode === option
                ? "border-blue-700 bg-blue-700 text-white"
                : "border-neutral-300 dark:border-neutral-700"
            }`}
          >
            {option === "anmelden" ? t("account.login") : t("account.register")}
          </button>
        ))}
      </div>

      <div>
        <label htmlFor="konto-email" className="text-sm font-medium">
          {t("account.email")}
        </label>
        <input
          id="konto-email"
          ref={emailRef}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={`${FIELD} mt-1`}
        />
      </div>

      <div>
        <label htmlFor="konto-passwort" className="text-sm font-medium">
          {t("account.password")}
        </label>
        <input
          id="konto-passwort"
          type="password"
          // „new-password" sagt dem Passwortspeicher, dass er eines
          // vorschlagen soll – beim Anmelden wäre das falsch, dort soll er das
          // gespeicherte einsetzen.
          autoComplete={mode === "registrieren" ? "new-password" : "current-password"}
          required
          minLength={mode === "registrieren" ? MIN_PASSWORD_LENGTH : undefined}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-describedby="konto-passwort-hilfe"
          className={`${FIELD} mt-1`}
        />
        {mode === "registrieren" && (
          <p id="konto-passwort-hilfe" className="mt-1 text-xs text-neutral-500">
            {tr(
              "account.passwordHelp",
              { example: <code>Passwort1!</code> },
              { min: MIN_PASSWORD_LENGTH },
            )}
          </p>
        )}
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-red-700 dark:text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="min-h-12 w-full rounded-xl bg-blue-700 px-4 font-medium text-white hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-60"
      >
        {busy ? "…" : mode === "anmelden" ? t("account.login") : t("account.register")}
      </button>

      {/*
        Ehrlich statt bequem: Ohne Mailversand gibt es keinen
        „Passwort vergessen"-Weg. Einen Knopf anzubieten, der nichts
        verschickt, wäre schlimmer als dieser Satz.
      */}
      {mailEnabled ? (
        mode === "anmelden" && <ForgotPassword />
      ) : (
        <p className="text-xs text-neutral-500">{t("account.forgotNote")}</p>
      )}
    </form>
  );
}
