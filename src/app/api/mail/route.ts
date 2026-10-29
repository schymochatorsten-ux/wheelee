import { NextResponse } from "next/server";
import { mailConfigured } from "@/lib/mail";

/**
 * Ob der Mailversand eingerichtet ist (D-10). Die Oberfläche fragt das, bevor
 * sie „Passwort vergessen" oder „E-Mail ändern" anbietet. Verrät nichts außer
 * ja oder nein.
 */
export function GET() {
  return NextResponse.json({ enabled: mailConfigured() }, { headers: { "Cache-Control": "no-store" } });
}
