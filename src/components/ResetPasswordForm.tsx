"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useT } from "@/i18n/context";

/**
 * Neues Passwort mit dem Link aus der Mail (ToDo 11.1).
 *
 * Das Token steht im **Fragment** des Links und wird wie bei der Einladung nur
 * hier im Browser gelesen, im Körper einer POST-Anfrage gesendet und danach aus
 * der Adresszeile entfernt.
 */
export function ResetPasswordForm() {
  const t = useT();
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const value = window.location.hash.replace(/^#/, "");
    setToken(value);
    if (value) window.history.replaceState(null, "", window.location.pathname);
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!token || busy) return;
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (response.ok) {
        setDone(true);
        setPassword("");
        return;
      }
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? t("reset.failed"));
    } catch {
      setError(t("reset.failed"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-4 text-xl font-semibold">{t("reset.title")}</h1>

      {done ? (
        <div role="status">
          <p className="mb-4">{t("reset.done")}</p>
          <Link href="/" className="underline">
            {t("invitation.toApp")}
          </Link>
        </div>
      ) : token === null ? null : token === "" ? (
        <p role="alert">{t("reset.missing")}</p>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-3">
          <p>{t("reset.intro")}</p>
          <label className="flex flex-col gap-1">
            <span>{t("reset.password")}</span>
            <input
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="min-h-11 rounded border px-3"
            />
          </label>
          {error ? <p role="alert">{error}</p> : null}
          <button type="submit" disabled={busy} className="min-h-11 rounded border px-4 font-medium">
            {t("reset.submit")}
          </button>
        </form>
      )}
    </main>
  );
}
