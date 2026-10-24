"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useT } from "@/i18n/context";

/**
 * Einladung annehmen (ToDo 18.2).
 *
 * Das Token steht im **Fragment** des Links (`/einladung#…`). Ein Fragment
 * erreicht nie einen Server und taucht in keinem Protokoll und keinem Referer
 * auf; erst hier wird es gelesen und im Körper einer POST-Anfrage gesendet.
 * Danach wird es aus der Adresszeile entfernt, damit es nicht im Verlauf oder
 * in einem Lesezeichen stehen bleibt.
 */
export function InvitationForm() {
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
      const response = await fetch("/api/auth/invitation", {
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
      setError(data.error ?? t("invitation.failed"));
    } catch {
      setError(t("invitation.failed"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-4 text-xl font-semibold">{t("invitation.title")}</h1>

      {done ? (
        <div role="status">
          <p className="mb-4">{t("invitation.done")}</p>
          <Link href="/" className="underline">
            {t("invitation.toApp")}
          </Link>
        </div>
      ) : token === null ? null : token === "" ? (
        <p role="alert">{t("invitation.missing")}</p>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-3">
          <p>{t("invitation.intro")}</p>
          <label className="flex flex-col gap-1">
            <span>{t("invitation.password")}</span>
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
            {t("invitation.submit")}
          </button>
        </form>
      )}
    </main>
  );
}
