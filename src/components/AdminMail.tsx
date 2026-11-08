"use client";

import { useCallback, useEffect, useState } from "react";
import { useT } from "@/i18n/context";

/**
 * Mailversand einrichten (ToDo 10.22) – nur für Administratoren.
 *
 * **Warum es diese Seite gibt:** Bis hierher standen die SMTP-Daten allein in
 * der `.env` auf dem NAS. Dorthin kommt nur, wer Zugang zum Gerät hat – ein
 * abgelaufenes Postfachpasswort hätte also einen Termin gekostet, und bis
 * dahin gäbe es kein „Passwort vergessen". Jetzt reicht ein Konto mit
 * Verwaltungsrecht.
 *
 * Die Zugangsprüfung steckt in `/api/admin/mail`; dass die Ansicht nur Admins
 * gezeigt wird, ist Bequemlichkeit, keine Sperre.
 *
 * **Das Passwort wird nie angezeigt.** Der Server schickt es nicht zurück
 * (Begründung dort); das Feld bleibt leer und wird nur mitgeschickt, wenn
 * jemand etwas hineingeschrieben hat. „Leer lassen = unverändert" steht
 * deshalb daneben – sonst hielte man es für gelöscht.
 */

interface Config {
  host: string;
  port: number;
  secure: boolean;
  username: string | null;
  fromAddress: string;
  publicUrl: string;
  enabled: boolean;
  provider: string | null;
  hasPassword: boolean;
  updatedAt: string;
}

interface State {
  source: "db" | "env" | "none";
  envPresent: boolean;
  active: boolean;
  config: Config | null;
}

const EMPTY = {
  host: "",
  port: "587",
  secure: false,
  username: "",
  password: "",
  fromAddress: "",
  publicUrl: "",
  enabled: true,
  provider: "",
};

export function AdminMail() {
  const t = useT();
  const [state, setState] = useState<State | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const apply = useCallback((next: State) => {
    setState(next);
    setForm({
      host: next.config?.host ?? "",
      port: String(next.config?.port ?? 587),
      secure: next.config?.secure ?? false,
      username: next.config?.username ?? "",
      // Immer leer: Der Server liefert das Passwort nicht aus.
      password: "",
      fromAddress: next.config?.fromAddress ?? "",
      publicUrl: next.config?.publicUrl ?? "",
      enabled: next.config?.enabled ?? true,
      provider: next.config?.provider ?? "",
    });
  }, []);

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/mail");
      if (!response.ok) {
        setError(response.status === 401 ? t("admin.unauthorized") : t("adminMail.loadFailed"));
        return;
      }
      apply((await response.json()) as State);
      setError(null);
    } catch {
      setError(t("admin.noConnection"));
    }
  }, [apply, t]);

  useEffect(() => {
    void load();
  }, [load]);

  async function save() {
    setBusy(true);
    setNote(null);
    setError(null);
    try {
      const response = await fetch("/api/admin/mail", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: form.host,
          port: Number(form.port),
          secure: form.secure,
          username: form.username,
          // Nur mitschicken, wenn etwas eingetippt wurde – sonst bliebe jedes
          // Speichern ein Löschen des Passworts.
          ...(form.password === "" ? {} : { password: form.password }),
          fromAddress: form.fromAddress,
          publicUrl: form.publicUrl,
          enabled: form.enabled,
          provider: form.provider,
        }),
      });
      const data = (await response.json()) as State & { error?: string };
      if (!response.ok) {
        setError(data.error ?? t("adminMail.saveFailed"));
        return;
      }
      apply(data);
      setNote(t("adminMail.saved"));
    } catch {
      setError(t("admin.noConnection"));
    } finally {
      setBusy(false);
    }
  }

  async function test() {
    setBusy(true);
    setNote(null);
    setError(null);
    try {
      const response = await fetch("/api/admin/mail/test", { method: "POST" });
      const data = (await response.json()) as { sentTo?: string; error?: string };
      if (!response.ok) {
        setError(data.error ?? t("adminMail.testFailed"));
        return;
      }
      setNote(t("adminMail.testSent", { email: data.sentTo ?? "" }));
    } catch {
      setError(t("admin.noConnection"));
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    setBusy(true);
    setNote(null);
    setError(null);
    try {
      const response = await fetch("/api/admin/mail", { method: "DELETE" });
      if (!response.ok) {
        setError(t("adminMail.saveFailed"));
        return;
      }
      apply((await response.json()) as State);
      setNote(t("adminMail.cleared"));
    } catch {
      setError(t("admin.noConnection"));
    } finally {
      setBusy(false);
    }
  }

  const field =
    "mt-1 w-full min-h-11 rounded-lg border border-neutral-300 px-3 text-sm focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700 dark:bg-neutral-900";
  const button =
    "min-h-11 rounded-lg border border-neutral-300 px-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none disabled:opacity-50 dark:border-neutral-700";

  return (
    <section
      aria-labelledby="mail-titel"
      className="border-t border-neutral-200 pt-4 dark:border-neutral-800"
    >
      <h2 id="mail-titel" className="text-base font-semibold">
        {t("adminMail.title")}
      </h2>
      <p className="mt-1 text-xs text-neutral-500">{t("adminMail.intro")}</p>

      {/*
        Der Zustand zuerst, und zwar als Satz statt als Ampel: „Der Versand
        läuft" ist die Frage, die jemand hat, wenn er diese Seite öffnet.
      */}
      <p className="mt-3 text-sm font-medium">
        {state?.active ? t("adminMail.statusOn") : t("adminMail.statusOff")}
        {state?.source === "env" && ` – ${t("adminMail.fromEnv")}`}
        {state?.source === "db" && ` – ${t("adminMail.fromDatabase")}`}
      </p>

      {/*
        Liegen in der Umgebung noch Angaben, muss das dastehen: Sonst sucht
        jemand den Fehler in seiner Eingabe, während in Wahrheit die
        gespeicherte Zeile gilt – oder umgekehrt.
      */}
      {state?.envPresent && state.source === "db" && (
        <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">
          {t("adminMail.envOverridden")}
        </p>
      )}

      <div className="mt-4 space-y-3">
        <label className="block text-sm">
          {t("adminMail.host")}
          <input
            className={field}
            value={form.host}
            autoComplete="off"
            onChange={(event) => setForm({ ...form, host: event.target.value })}
          />
        </label>

        <div className="flex gap-3">
          <label className="block w-28 text-sm">
            {t("adminMail.port")}
            <input
              className={field}
              inputMode="numeric"
              value={form.port}
              onChange={(event) => setForm({ ...form, port: event.target.value })}
            />
          </label>
          <label className="flex items-end gap-2 pb-2 text-sm">
            <input
              type="checkbox"
              className="size-5"
              checked={form.secure}
              onChange={(event) => setForm({ ...form, secure: event.target.checked })}
            />
            {t("adminMail.secure")}
          </label>
        </div>

        <label className="block text-sm">
          {t("adminMail.username")}
          <input
            className={field}
            value={form.username}
            autoComplete="off"
            onChange={(event) => setForm({ ...form, username: event.target.value })}
          />
        </label>

        <label className="block text-sm">
          {t("adminMail.password")}
          <input
            className={field}
            type="password"
            value={form.password}
            autoComplete="new-password"
            placeholder={
              state?.config?.hasPassword ? t("adminMail.passwordKept") : t("adminMail.passwordNone")
            }
            onChange={(event) => setForm({ ...form, password: event.target.value })}
          />
          <span className="mt-1 block text-xs text-neutral-500">{t("adminMail.passwordNote")}</span>
        </label>

        <label className="block text-sm">
          {t("adminMail.from")}
          <input
            className={field}
            value={form.fromAddress}
            autoComplete="off"
            onChange={(event) => setForm({ ...form, fromAddress: event.target.value })}
          />
        </label>

        <label className="block text-sm">
          {t("adminMail.publicUrl")}
          <input
            className={field}
            value={form.publicUrl}
            autoComplete="off"
            placeholder="https://wheelee.de"
            onChange={(event) => setForm({ ...form, publicUrl: event.target.value })}
          />
          <span className="mt-1 block text-xs text-neutral-500">{t("adminMail.publicUrlNote")}</span>
        </label>

        {/*
          Der Versanddienstleister steht hier und nicht bei den Rechtstexten:
          Er ist genau dann einzutragen, wenn jemand den Versand einrichtet,
          und sonst nie. Fehlt er, nennt die Datenschutzerklärung den Mangel
          (10.16) – deshalb ist er kein Pflichtfeld, aber der Hinweis daneben
          sagt, was sonst dort steht.
        */}
        <label className="block text-sm">
          {t("adminMail.provider")}
          <input
            className={field}
            value={form.provider}
            autoComplete="off"
            onChange={(event) => setForm({ ...form, provider: event.target.value })}
          />
          <span className="mt-1 block text-xs text-neutral-500">{t("adminMail.providerNote")}</span>
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="size-5"
            checked={form.enabled}
            onChange={(event) => setForm({ ...form, enabled: event.target.checked })}
          />
          {t("adminMail.enabled")}
        </label>
      </div>

      {/*
        Der Hinweis auf die Datenschutzerklärung (ToDo 10.16) steht **über** den
        Knöpfen und nicht im Kleingedruckten darunter: Mit dem Einschalten
        verarbeitet die App erstmals Adressen für den Versand, und das gehört
        in die Erklärung, bevor jemand den Schalter umlegt.
      */}
      <p className="mt-3 text-xs text-amber-700 dark:text-amber-300">{t("adminMail.privacyNote")}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className={button} disabled={busy} onClick={() => void save()}>
          {t("adminMail.save")}
        </button>
        <button
          type="button"
          className={button}
          disabled={busy || !state?.active}
          onClick={() => void test()}
        >
          {t("adminMail.test")}
        </button>
        {state?.source === "db" && (
          <button type="button" className={button} disabled={busy} onClick={() => void reset()}>
            {t("adminMail.clear")}
          </button>
        )}
      </div>

      {note && (
        <p role="status" className="mt-3 text-sm text-green-700 dark:text-green-400">
          {note}
        </p>
      )}
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
    </section>
  );
}
