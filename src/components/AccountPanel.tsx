"use client";

import { useRef, useState } from "react";
import { MIN_PASSWORD_LENGTH } from "@/lib/auth/password-rules";
import { looksLikeEmail } from "@/lib/auth/email";
import type { PublicUser } from "@/lib/auth/user";

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
}

const FIELD =
  "min-h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700 dark:bg-neutral-950";

type Mode = "anmelden" | "registrieren";

export function AccountPanel({ user, onUserChange }: AccountPanelProps) {
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
      setError("Diese E-Mail-Adresse sieht nicht richtig aus.");
      emailRef.current?.focus();
      return;
    }
    if (mode === "registrieren" && password.length < MIN_PASSWORD_LENGTH) {
      setError(`Das Passwort muss mindestens ${MIN_PASSWORD_LENGTH} Zeichen lang sein.`);
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
        setError(data.error ?? "Das hat nicht geklappt. Bitte später erneut versuchen.");
        return;
      }

      setPassword("");
      setEmail("");
      onUserChange({ email: data.user.email, isAdmin: data.user.isAdmin === true });
    } catch {
      setError("Keine Verbindung. Bitte später erneut versuchen.");
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
      setError("Abmelden hat nicht geklappt – keine Verbindung.");
    } finally {
      setBusy(false);
    }
  };

  if (user) {
    return (
      <div className="space-y-2">
        <p className="text-sm">
          Angemeldet als <span className="font-medium">{user.email}</span>
          {user.isAdmin && (
            <span className="ml-2 rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-900 dark:bg-blue-950 dark:text-blue-200">
              Administrator
            </span>
          )}
        </p>
        <p className="text-xs text-neutral-500">
          Dein Konto speichert nur die E-Mail-Adresse und das verschlüsselte Passwort. Dein Standort
          wird weiterhin nicht gespeichert – auch nicht mit Konto.
        </p>
        <button
          type="button"
          onClick={logout}
          disabled={busy}
          className="min-h-11 rounded-lg border border-neutral-300 px-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none disabled:opacity-60 dark:border-neutral-700"
        >
          {busy ? "…" : "Abmelden"}
        </button>
        {error && (
          <p role="alert" className="text-sm text-red-700 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div role="radiogroup" aria-label="Anmelden oder Konto anlegen" className="flex gap-2">
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
            {option === "anmelden" ? "Anmelden" : "Konto anlegen"}
          </button>
        ))}
      </div>

      <div>
        <label htmlFor="konto-email" className="text-sm font-medium">
          E-Mail-Adresse
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
          Passwort
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
            Mindestens {MIN_PASSWORD_LENGTH} Zeichen. Länge zählt mehr als Sonderzeichen – ein Satz,
            den du dir merken kannst, ist besser als <code>Passwort1!</code>.
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
        {busy ? "…" : mode === "anmelden" ? "Anmelden" : "Konto anlegen"}
      </button>

      {/*
        Ehrlich statt bequem: Ohne Mailversand gibt es keinen
        „Passwort vergessen"-Weg. Einen Knopf anzubieten, der nichts
        verschickt, wäre schlimmer als dieser Satz.
      */}
      <p className="text-xs text-neutral-500">
        Ein vergessenes Passwort lässt sich derzeit nicht selbst zurücksetzen – es gibt noch keinen
        Mailversand. Ein Konto ist für die Nutzung der App auch nicht nötig.
      </p>
    </form>
  );
}
