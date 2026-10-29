import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/ResetPasswordForm";

/**
 * Neues Passwort setzen (ToDo 11.1). Das Token kommt im Fragment des Links und
 * wird nur im Browser gelesen – siehe `ResetPasswordForm`.
 */

export const metadata: Metadata = {
  title: "Passwort zurücksetzen – wheelee",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function PasswortZuruecksetzen() {
  return <ResetPasswordForm />;
}
