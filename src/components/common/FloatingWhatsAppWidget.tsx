"use client";

import { usePathname } from "next/navigation";
import { companyInfo } from "@/lib/data/company";
import { useWhatsAppKanal } from "@/lib/formulare/useWhatsAppKanal";
import WhatsAppLogo from "@/components/ui/WhatsAppLogo";

/* ═══════════════════════════════════════════════════════════════════════════
 * WhatsApp-Knopf - Fliesenverlegung Tezgel (KERN K-009, E-008, E3-NACH-06)
 *
 * Flacher 44-px-Knopf im Kopf neben der Rufnummer, nur ab lg (keine schwebende Ebene über dem Inhalt mehr);
 * darunter trägt die untere Leiste WhatsApp. Kennung und Name bleiben (Tests F-10).
 * Verhalten wie im Bestand: seitenbezogene Nachricht, Entprellung (450 ms),
 * Analyse-Ereignis nur, wenn gtag nach Einwilligung geladen ist,
 * mobil direkte Navigation, Desktop neuer Tab – alles im gemeinsamen Hook
 * useWhatsAppKanal (src/lib/formulare, P3-00p), dieselbe Logik wie die Kern-Ansicht.
 * Kein Benachrichtigungs-Abzeichen ohne echte Nachricht (E-012).
 * ═══════════════════════════════════════════════════════════════════════════ */

export default function FloatingWhatsAppWidget() {
  const pathname = usePathname() || "/";

  // Analytics-Ereignis whatsapp_click und WhatsApp-Start (450-ms-Sperre, Weg mobil/Desktop) im Hook
  const { triggerWhatsAppAction } = useWhatsAppKanal(pathname);

  const whatsappNumber = companyInfo.socialMedia.whatsapp;
  if (!whatsappNumber) return null;

  return (
    <button
      type="button"
      id="whatsapp-floating-btn"
      aria-label="Nachricht per WhatsApp an Fliesenverlegung Tezgel senden"
      onClick={triggerWhatsAppAction}
      className="hidden size-11 shrink-0 items-center justify-center border border-strich bg-fliese text-tinte transition-colors dauer-1 ease-setzen hover:border-tinte lg:inline-flex"
      data-motion="druck"
    >
      <WhatsAppLogo className="size-5" />
      <span className="sr-only">WhatsApp</span>
    </button>
  );
}
