import { COMPANY_DATA } from '@/config/company';

/**
 * Normalizes any phone number into an international E.164-compatible digit string without leading '+' or '00'.
 * Defaults to company WhatsApp number if empty or invalid.
 */
export function formatWhatsAppNumber(phone?: string): string {
  if (!phone) {
    return COMPANY_DATA.contact.whatsappNumber || '491726728504';
  }

  // Strip all non-digit characters
  let cleaned = phone.replace(/[^0-9]/g, '');

  // Convert leading 0049 to 49
  if (cleaned.startsWith('0049')) {
    cleaned = cleaned.slice(2);
  }
  // Convert German domestic format starting with 01 to 491
  else if (cleaned.startsWith('01')) {
    cleaned = '49' + cleaned.slice(1);
  }

  return cleaned || COMPANY_DATA.contact.whatsappNumber || '491726728504';
}

/**
 * Builds a standardized, fully encoded WhatsApp URL.
 * Uses `https://wa.me/` which is the official Universal Link registered with iOS and Android.
 */
export function buildWhatsAppUrl(phone?: string, text?: string): string {
  const cleanPhone = formatWhatsAppNumber(phone);
  if (!text || text.trim() === '') {
    return `https://api.whatsapp.com/send?phone=${cleanPhone}`;
  }
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(text.trim())}`;
}

/**
 * Robust check if current client is a mobile device (iOS, Android, iPad, mobile tablet).
 * Safe for SSR (returns false on server).
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  const userAgent = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || '';

  // Standard mobile OS checks
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  // Modern iPadOS returns MacIntel but has touch points
  const isIPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;

  // Narrow screen touch device check
  const isNarrowTouch = window.innerWidth < 768 && (navigator.maxTouchPoints > 0 || 'ontouchstart' in window);

  return isMobileUA || isIPadOS || isNarrowTouch;
}

export interface WhatsAppOpenOptions {
  phone?: string;
  text?: string;
  /** Custom window target for desktop. Defaults to '_blank'. */
  target?: '_blank' | '_self';
}

/**
 * Universally opens WhatsApp across all devices:
 * - Mobile (iOS Safari, Android Chrome): Direct navigation (`window.location.href`) prevents
 *   Safari/Chrome popup blocker suppression and avoids leaving behind empty blank tabs.
 * - Desktop (macOS, Windows): Opens in a new tab (`window.open(..., '_blank')`) so the Tezgel website
 *   remains open and active while WhatsApp Web opens.
 */
export function openWhatsApp(options: WhatsAppOpenOptions = {}): void {
  if (typeof window === 'undefined') return;

  const url = buildWhatsAppUrl(options.phone, options.text);

  if (isMobileDevice()) {
    // Direct navigation is recognized by iOS & Android OS to launch native WhatsApp app
    window.location.href = url;
  } else {
    // Desktop: open WhatsApp Web in new tab with popup-blocker fallback
    const target = options.target || '_blank';
    try {
      const newWin = window.open(url, target, 'noopener,noreferrer');
      // If popup blocker blocked new tab, fall back to current window
      if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
        window.location.href = url;
      }
    } catch {
      window.location.href = url;
    }
  }
}

/**
 * Seitenbezogene Begrüßung für WhatsApp (aus FloatingWhatsAppWidget verschoben, E-015): genutzt vom
 * Desktop-Knopf `#whatsapp-floating-btn` und vom WhatsApp-Feld der unteren Leiste (mobil). Wortlaut unverändert.
 */
export function kontextNachricht(pathname: string): string {
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
