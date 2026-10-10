// Logik des WhatsApp-Kanals (F-10, FloatingWhatsAppWidget) – wörtlich aus der Komponente verschoben (P3-00p).
// Ohne Markup; Bestand und Kern-Ansicht nutzen denselben Hook. Physik, Tooltip, Abzeichen und Ziehen bleiben in der Komponente.
import { useRef, useCallback } from "react";
import { companyInfo } from "@/lib/data/company";
import { openWhatsApp, buildWhatsAppUrl, isMobileDevice } from "@/lib/whatsapp";

/* ── Contextual messages tailored to Fliesenverlegung Tezgel ── */
export function getContextualMessage(pathname: string): string {
  if (pathname.includes("/bad")) {
    return "Hallo Herr Tezgel, ich interessiere mich für eine Badsanierung bzw. barrierefreie Walk-In-Dusche.";
  }
  if (pathname.includes("/balkon-terrasse")) {
    return "Hallo Herr Tezgel, ich interessiere mich für eine Balkon- oder Terrassensanierung auf Stelzlagern.";
  }
  if (pathname.includes("/fliesenreparatur")) {
    return "Hallo Herr Tezgel, ich benötige fachmännische Hilfe bei einer Fliesenreparatur oder Schadensbehebung.";
  }
  if (pathname.includes("/fliesen")) {
    return "Hallo Herr Tezgel, ich habe eine Frage zu Großformatfliesen und Verlegearbeiten.";
  }
  if (pathname.includes("/naturstein")) {
    return "Hallo Herr Tezgel, ich interessiere mich für Naturstein- und Granitverlegung.";
  }
  if (pathname.includes("/treppen")) {
    return "Hallo Herr Tezgel, ich möchte eine Treppe mit Fliesen oder Naturstein belegen lassen.";
  }
  if (pathname.includes("/untergrund-abdichtung")) {
    return "Hallo Herr Tezgel, ich habe eine Frage zur Untergrundvorbereitung und DIN 18534 Verbundabdichtung.";
  }
  if (pathname.includes("/schadensanalyse") || pathname.includes("/termin")) {
    return "Hallo Herr Tezgel, ich möchte ein unverbindliches Vor-Ort-Aufmaß bzw. eine Schadensanalyse anfragen.";
  }
  if (pathname.includes("/kontakt")) {
    return "Hallo Herr Tezgel, ich möchte ein Projekt anfragen bzw. einen Beratungstermin vereinbaren.";
  }
  if (pathname.includes("/standorte") || pathname.includes("/ausstellung")) {
    return "Hallo Herr Tezgel, ich komme aus der Region und interessiere mich für Ihre Fliesenarbeiten.";
  }
  return "Hallo Herr Tezgel, ich hätte eine Frage zu Ihren Fliesen- und Sanierungsleistungen.";
}

export function useWhatsAppKanal(pathname: string) {
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
    const contextMessage = getContextualMessage(pathname);

    if (isMobileDevice()) {
      openWhatsApp({ phone: cleanNumber, text: contextMessage });
    } else {
      const url = buildWhatsAppUrl(cleanNumber, contextMessage);
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, [pathname, trackClick]);

  // Nur zur Anzeige (Kern-Ansicht); reiner Ausdruck ohne Hook, ohne Nebenwirkung. Der Klick berechnet den Text weiter selbst.
  const contextMessage = getContextualMessage(pathname);

  return { triggerWhatsAppAction, trackClick, contextMessage };
}
