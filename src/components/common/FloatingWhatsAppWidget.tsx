"use client";

import { useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { companyInfo } from "@/lib/data/company";
import { openWhatsApp, buildWhatsAppUrl, isMobileDevice, kontextNachricht } from "@/lib/whatsapp";
import WhatsAppLogo from "@/components/ui/WhatsAppLogo";

/* ═══════════════════════════════════════════════════════════════════════════
 * WhatsApp-Knopf - Fliesenverlegung Tezgel (KERN K-009, E-008)
 *
 * Flacher Knopf rechts unten, nur ab md; mobil trägt die untere Leiste WhatsApp.
 * Verhalten wie im Bestand: seitenbezogene Nachricht, Entprellung (450 ms),
 * Analyse-Ereignis nur, wenn gtag nach Einwilligung geladen ist,
 * mobil direkte Navigation, Desktop neuer Tab.
 * ═══════════════════════════════════════════════════════════════════════════ */

export default function FloatingWhatsAppWidget() {
  const pathname = usePathname() || "/";

  // Analytics event tracking
  const trackClick = useCallback(() => {
    if (typeof window !== "undefined") {
      const win = window as unknown as { gtag?: (...args: unknown[]) => void };
      if (typeof win.gtag === "function") {
        win.gtag("event", "whatsapp_click", {
          event_category: "engagement",
          event_label: pathname,
        });
      }
    }
  }, [pathname]);

  // Unified WhatsApp launcher with debounce to prevent double-activation
  const lastActionTimeRef = useRef(0);
  const triggerWhatsAppAction = useCallback(() => {
    const now = Date.now();
    if (now - lastActionTimeRef.current < 450) return;
    lastActionTimeRef.current = now;

    trackClick();
    const cleanNumber = companyInfo.socialMedia.whatsapp?.replace(/[^0-9]/g, "");
    const contextMessage = kontextNachricht(pathname);

    if (isMobileDevice()) {
      openWhatsApp({ phone: cleanNumber, text: contextMessage });
    } else {
      const url = buildWhatsAppUrl(cleanNumber, contextMessage);
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, [pathname, trackClick]);

  const whatsappNumber = companyInfo.socialMedia.whatsapp;
  if (!whatsappNumber) return null;

  return (
    <button
      type="button"
      id="whatsapp-floating-btn"
      aria-label="WhatsApp-Nachricht an Fliesenverlegung Tezgel senden"
      onClick={triggerWhatsAppAction}
      className="fixed bottom-6 right-6 z-30 hidden min-h-11 items-center gap-2 border border-strich bg-fliese px-4 font-text text-fs-2 font-semibold text-tinte transition-colors dauer-1 ease-setzen hover:border-tinte md:inline-flex"
      data-feste-ebene
      data-motion="druck"
    >
      <WhatsAppLogo className="size-5" />
      <span>WhatsApp</span>
    </button>
  );
}
