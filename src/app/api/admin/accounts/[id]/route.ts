import { NextResponse } from "next/server";
import {
  resetPasswordByAdmin,
  setDisabled,
  setEmailByAdmin,
  setRole,
  setUsername,
} from "@/lib/db/accounts";
import { deleteAccountByAdmin } from "@/lib/db/admin";
import { userFromRequest } from "@/lib/auth/session";
import { withLogging } from "@/lib/log";
import { t } from "@/i18n";
import { readJson } from "@/lib/read-json";

/**
 * Ein Konto verwalten (ToDo 18.3) – nur für Administratoren.
 *
 *     PATCH  /api/admin/accounts/<id>   { role?, disabled?, username?, email?, password? }
 *     DELETE /api/admin/accounts/<id>
 *
 * **Je Aufruf genau eine Änderung** (ToDo 18.8). Das ist keine Bequemlichkeit,
 * sondern die Folge daraus, dass die Änderungen nicht gemeinsam in einer
 * Transaktion laufen: Scheiterte die zweite, bliebe die erste bestehen, und
 * die Oberfläche zeigte einen Fehler, obwohl etwas geändert wurde. Mehrere
 * Felder auf einmal werden deshalb mit 400 abgelehnt, statt sie nacheinander
 * zu versuchen.
 *
 * Das **letzte aktive Admin-Konto** lässt sich weder herabstufen noch sperren
 * noch löschen (409); geprüft wird in der Datenbankschicht. Das eigene Konto
 * löscht man hier nicht, sondern über die Kontoeinstellungen mit Passwort.
 * Admin ist man nur durch die Rolle in der Datenbank (ToDo 10.19); `ADMIN_EMAILS`
 * hebt beim ersten Zugriff vorhandene Konten einmalig dorthin.
 *
 * Rolle und Sperre wirken sofort, denn `isAdmin` wird je Anfrage aus der
 * Datenbank gelesen. Das Protokoll hält Pfad (mit Konto-ID) und Status fest,
 * nie die Adresse.
 */

type Context = { params: Promise<{ id: string }> };

async function admin(request: Request, context: Context) {
  const user = userFromRequest(request);
  if (!user?.isAdmin) return null;
  return { user, id: (await context.params).id };
}

async function patchHandler(request: Request, context: Context) {
  const acting = await admin(request, context);
  if (!acting) return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });

  let body: {
    role?: unknown;
    disabled?: unknown;
    username?: unknown;
    email?: unknown;
    password?: unknown;
  };
  try {
    body = (await readJson(request)) as typeof body;
  } catch {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  const felder = (["role", "disabled", "username", "email", "password"] as const).filter(
    (name) => body[name] !== undefined,
  );
  if (felder.length !== 1) {
    return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
  }

  switch (felder[0]) {
    case "role": {
      if (body.role !== "admin" && body.role !== "user") {
        return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
      }
      if (!setRole(acting.id, body.role)) {
        return NextResponse.json({ error: t("api.adminCannotChange") }, { status: 409 });
      }
      break;
    }

    case "disabled": {
      if (typeof body.disabled !== "boolean") {
        return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
      }
      if (!setDisabled(acting.id, body.disabled)) {
        return NextResponse.json({ error: t("api.adminCannotChange") }, { status: 409 });
      }
      break;
    }

    case "username": {
      // `null` entfernt den Namen: Ein Konto ohne Namen meldet sich mit der
      // Adresse an und ist kein Konto mit Mangel (18.7).
      if (body.username !== null && typeof body.username !== "string") {
        return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
      }
      const wert = body.username === null ? null : body.username.trim() || null;
      const result = setUsername(acting.id, wert);
      if (result === "not-found") {
        return NextResponse.json({ error: t("api.notFound") }, { status: 404 });
      }
      if (result === "taken") {
        return NextResponse.json({ error: t("api.usernameTaken") }, { status: 409 });
      }
      if (result === "invalid") {
        return NextResponse.json({ error: t("api.usernameInvalid") }, { status: 400 });
      }
      break;
    }

    case "email": {
      if (typeof body.email !== "string") {
        return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
      }
      const result = setEmailByAdmin(acting.id, body.email);
      if (result === "not-found") {
        return NextResponse.json({ error: t("api.notFound") }, { status: 404 });
      }
      if (result === "taken") {
        return NextResponse.json({ error: t("api.emailTaken") }, { status: 409 });
      }
      if (result === "invalid") {
        return NextResponse.json({ error: t("api.invalidEmail") }, { status: 400 });
      }
      break;
    }

    case "password": {
      /*
       * Ein Startpasswort, kein endgültiges: Es unterliegt nicht der
       * Mindestlänge, muss aber vorhanden sein. Es geht **nur** in diese
       * Richtung – ausgegeben wird nie eines, und der Administrator teilt es
       * selbst mit.
       */
      if (typeof body.password !== "string" || body.password.length === 0) {
        return NextResponse.json({ error: t("api.invalidRequest") }, { status: 400 });
      }
      const result = resetPasswordByAdmin(acting.id, acting.user.id, body.password);
      if (result === "not-found") {
        return NextResponse.json({ error: t("api.notFound") }, { status: 404 });
      }
      if (result === "self") {
        // Das eigene Passwort wird mit dem bisherigen geändert (10.7), damit
        // eine gestohlene Sitzung allein nicht genügt.
        return NextResponse.json({ error: t("api.passwordSelf") }, { status: 409 });
      }
      break;
    }
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}

async function deleteHandler(request: Request, context: Context) {
  const acting = await admin(request, context);
  if (!acting) return NextResponse.json({ error: t("api.notSignedIn") }, { status: 401 });

  const result = deleteAccountByAdmin(acting.id, acting.user.id);
  if (result === "not-found") {
    return NextResponse.json({ error: t("api.notFound") }, { status: 404 });
  }
  if (result !== "deleted") {
    return NextResponse.json({ error: t("api.adminCannotChange") }, { status: 409 });
  }
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}

export const PATCH = withLogging(patchHandler);
export const DELETE = withLogging(deleteHandler);
