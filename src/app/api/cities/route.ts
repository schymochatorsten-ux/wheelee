import { NextResponse } from "next/server";
import { getCities } from "@/lib/parking/spots";
import { withLogging } from "@/lib/log";

/**
 * Alle Städte mit Quelle, Lizenz und Zahlen (ToDo 19.9).
 *
 *     GET /api/cities
 *
 * Die Liste stand bisher im HTML der Startseite. Mit 648 Städten waren das
 * 179 KB, mit jeder Importstufe (2e.6) mehr – und gebraucht wird sie erst in der
 * Liste „Alle Städte" und in den Einstellungen, nicht für den ersten Eindruck.
 * Die Startseite trägt jetzt nur die Standardstadt; der Rest kommt von hier.
 */

/** Ändert sich nur durch einen neuen Import, also selten. */
const CACHE_CONTROL = "public, max-age=3600, stale-while-revalidate=86400";

function getHandler() {
  return NextResponse.json({ cities: getCities() }, { headers: { "Cache-Control": CACHE_CONTROL } });
}

export const GET = withLogging(getHandler);
