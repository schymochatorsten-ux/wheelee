"use client";

import { useCallback, useEffect, useState } from "react";
import { useT } from "@/i18n/context";
import { SettingsSection } from "./SettingsSection";
import { Switch } from "./ui/List";

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
  notifyEmail: string | null;
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
  notifyEmail: "",
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
      notifyEmail: next.config?.notifyEmail ?? "",
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
          notifyEmail: form.notifyEmail,
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
    "mt-1 w-full min-h-11 rounded-xl bg-neutral-200/80 px-3 text-sm focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:bg-neutral-800/70";
  const button =
    "min-h-11 rounded-xl bg-neutral-200/80 px-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none disabled:opacity-50 dark:bg-neutral-800";

  return (
    <SettingsSection
      title={t("adminMail.title")}
      description={t("adminMail.intro")}
      /*
        Der Zustand steht neben der Überschrift, und zwar als Satz statt als
        Ampel: „Der Versand läuft" ist die Frage, die jemand hat, wenn er
        diesen Block öffnet – sie gehört an die Gruppe, nicht in das Formular.
      */
      aside={
        <span className="text-sm font-medium">
          {state?.active ? t("adminMail.statusOn") : t("adminMail.statusOff")}
          {state?.source === "env" && ` – ${t("adminMail.fromEnv")}`}
          {state?.source === "db" && ` – ${t("adminMail.fromDatabase")}`}
        </span>
      }
    >
      {/*
        Liegen in der Umgebung noch Angaben, muss das dastehen: Sonst sucht
        jemand den Fehler in seiner Eingabe, während in Wahrheit die
        gespeicherte Zeile gilt – oder umgekehrt.
      */}
      {state?.envPresent && state.source === "db" && (
        <p className="mb-3 text-xs text-amber-700 dark:text-amber-300">
          {t("adminMail.envOverridden")}
        </p>
      )}

      <div className="space-y-3">
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
          {/*
            Schalter statt Kästchen (ToDo 9.31): Ein- und Ausschalten sieht in
            der ganzen App gleich aus, hier wie bei der Standortfreigabe.
          */}
          <div className="flex items-end gap-3 pb-2 text-sm">
            <span className="flex-1">{t("adminMail.secure")}</span>
            <Switch
              checked={form.secure}
              onChange={(next) => setForm({ ...form, secure: next })}
              label={t("adminMail.secure")}
            />
          </div>
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
          <span className="mt-1 block text-xs text-neutral-500">
            {t("adminMail.publicUrlNote")}
          </span>
        </label>

        {/*
          Die Benachrichtigung steht bei den Zugangsdaten und nicht bei den
          Rückmeldungen: Sie setzt den Versand voraus, und wer sie einträgt,
          hat gerade diesen eingerichtet.
        */}
        <label className="block text-sm">
          {t("adminMail.notify")}
          <input
            className={field}
            type="email"
            value={form.notifyEmail}
            autoComplete="off"
            placeholder={t("adminMail.notifyNone")}
            onChange={(event) => setForm({ ...form, notifyEmail: event.target.value })}
          />
          <span className="mt-1 block text-xs text-neutral-500">{t("adminMail.notifyNote")}</span>
        </label>

        {/*
          **Das Feld „Versanddienstleister“ ist am 2026-11-11 aus der
          Oberfläche genommen** (Anweisung von Torsten, zusammen mit dem
          Abschnitt in der Datenschutzerklärung, der es las). Es hätte sonst
          eine Angabe erfragt, die nirgends mehr erscheint, und sein
          Hinweistext hätte etwas Falsches behauptet.

          **Die Spalte `provider` bleibt in der Datenbank** (Migration 14):
          Schritte werden nur angehängt, nie geändert, und ein bereits
          eingetragener Name soll nicht beim nächsten Speichern verschwinden –
          `saveMailConfig` schreibt ihn unverändert zurück.
        */}
        <div className="flex items-center gap-3 text-sm">
          <span className="flex-1">{t("adminMail.enabled")}</span>
          <Switch
            checked={form.enabled}
            onChange={(next) => setForm({ ...form, enabled: next })}
            label={t("adminMail.enabled")}
          />
        </div>
      </div>

      {/*
        Der Hinweis auf die Datenschutzerklärung (ToDo 10.16) steht **über** den
        Knöpfen und nicht im Kleingedruckten darunter: Mit dem Einschalten
        verarbeitet die App erstmals Adressen für den Versand, und das gehört
        in die Erklärung, bevor jemand den Schalter umlegt.
      */}
      <p className="mt-3 text-xs text-amber-700 dark:text-amber-300">
        {t("adminMail.privacyNote")}
      </p>

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
    </SettingsSection>
  );
}
