"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/i18n/context";

/**
 * Adresswechsel bestätigen (ToDo 11.8). Token im Fragment, wie bei
 * `ResetPasswordForm`. **Ein Knopf statt Selbstauslösung beim Laden:** Der Link
 * soll nur der Mensch einlösen, der ihn geöffnet hat – nicht ein Programm, das
 * Mail-Links vorab abruft.
 */
export function ConfirmEmailForm() {
  const t = useT();
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Einmal lesen (Begründung in `InvitationForm`: Strict Mode baut zweimal ein).
  const fromLink = useRef<string | null>(null);
  useEffect(() => {
    if (fromLink.current === null) {
      fromLink.current = window.location.hash.replace(/^#/, "");
      if (fromLink.current) window.history.replaceState(null, "", window.location.pathname);
    }
    setToken(fromLink.current);
  }, []);

  async function confirm() {
    if (!token || busy) return;
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/account/email/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string; email?: string };
      if (response.ok && data.email) {
        setEmail(data.email);
        return;
      }
      setError(data.error ?? t("confirmEmail.failed"));
    } catch {
      setError(t("confirmEmail.failed"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-4 text-xl font-semibold">{t("confirmEmail.title")}</h1>

      {email ? (
        <div role="status">
          <p className="mb-4">{t("confirmEmail.done", { email })}</p>
          <Link href="/" className="underline">
            {t("invitation.toApp")}
          </Link>
        </div>
      ) : token === null ? null : token === "" ? (
        <p role="alert">{t("confirmEmail.missing")}</p>
      ) : (
        <div className="flex flex-col gap-3">
          <p>{t("confirmEmail.intro")}</p>
          {error ? <p role="alert">{error}</p> : null}
          <button
            type="button"
            onClick={confirm}
            disabled={busy}
            className="min-h-11 rounded border px-4 font-medium"
          >
            {t("confirmEmail.submit")}
          </button>
        </div>
      )}
    </main>
  );
}
