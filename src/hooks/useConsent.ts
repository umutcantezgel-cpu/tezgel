"use client";

/**
 * ══════════════════════════════════════════════════════════════
 * Consent Management Hook - Fliesenverlegung Tezgel
 * ══════════════════════════════════════════════════════════════
 * Liest & schreibt den rechtssicheren Cookie-Consent-Status.
 * Synchronisiert DSGVO-Audit-Trail, Event-Dispatcher und Cookie-Löschung.
 * ══════════════════════════════════════════════════════════════
 */

import { useState, useCallback, useEffect } from "react";
import {
  CONSENT_COOKIE_NAME,
  CONSENT_COOKIE_MAX_AGE_DAYS,
  CONSENT_VERSION,
  COOKIE_INVENTORY,
  type ConsentState,
  type ConsentCategory,
} from "@/lib/cookie-inventory";

// ─── Default state (before any consent is given) ───
export const DEFAULT_CONSENT: ConsentState = {
  essential: true,
  analytics: false,
  marketing: false,
  timestamp: "",
  version: CONSENT_VERSION,
};

// ─── Cookie helpers ───

export function readConsentCookie(): ConsentState | null {
  if (typeof document === "undefined") return null;
  try {
    const match = document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${CONSENT_COOKIE_NAME}=`));
    if (!match) return null;
    const json = decodeURIComponent(match.split("=").slice(1).join("="));
    const parsed = JSON.parse(json) as ConsentState;
    parsed.essential = true;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsentCookie(state: ConsentState): void {
  if (typeof document === "undefined") return;
  const maxAge = CONSENT_COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  const value = encodeURIComponent(JSON.stringify(state));
  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;

  // Auch in localStorage spiegeln zur nahtlosen Abwärtskompatibilität
  try {
    localStorage.setItem(
      "tezgel_consent_settings",
      JSON.stringify({ settings: state, version: CONSENT_VERSION, timestamp: state.timestamp })
    );
  } catch {
    // ignore
  }
}

export function deleteConsentCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${CONSENT_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax; Secure`;
  try {
    localStorage.removeItem("tezgel_consent_settings");
  } catch {
    // ignore
  }
}

// ─── Delete cookies by category on revocation ───
export function deleteCookiesByCategory(category: ConsentCategory): void {
  if (typeof document === "undefined") return;

  const targetCookies = COOKIE_INVENTORY.filter((c) => c.category === category);
  if (targetCookies.length === 0) return;

  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const rawName = cookie.split("=")[0] ?? "";
    const name = rawName.trim();

    const shouldDelete = targetCookies.some((tc) => {
      if (tc.name.endsWith("*")) {
        const prefix = tc.name.replace("*", "");
        return name.startsWith(prefix);
      }
      return tc.name === name;
    });

    if (shouldDelete) {
      const host = window.location.hostname;
      const domainParts = host.split(".");

      document.cookie = `${name}=; path=/; max-age=0; domain=${host}`;
      document.cookie = `${name}=; path=/; max-age=0`;
      if (domainParts.length >= 2) {
        const rootDomain = `.${domainParts.slice(-2).join(".")}`;
        document.cookie = `${name}=; path=/; max-age=0; domain=${rootDomain}`;
      }
    }
  }
}

// Helper for cryptographic Receipt-ID (DSGVO Art. 5 Abs. 2)
function generateReceiptId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "rcpt_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

// ─── Main Hook ───

export function useConsent() {
  // Initialize state via pure function to prevent cascading render cycles in React 19
  const [consent, setConsent] = useState<ConsentState | null>(() => {
    if (typeof document === "undefined") return null;
    const stored = readConsentCookie();
    if (stored && stored.version === CONSENT_VERSION) {
      return stored;
    }
    return null;
  });

  const [showBanner, setShowBanner] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.location.hash === "#cookie-settings";
  });

  // Listen to external hash change or custom trigger events, and schedule banner after initial paint
  useEffect(() => {
    const stored = readConsentCookie();
    if (!stored || stored.version !== CONSENT_VERSION) {
      // Defer banner slightly so browser paints Hero (H1 / LCP hero image) first
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 400);
      return () => clearTimeout(timer);
    }

    const handleHashChange = () => {
      if (window.location.hash === "#cookie-settings") {
        setShowBanner(true);
      }
    };

    const handleOpenSettings = () => {
      setShowBanner(true);
    };

    const handleExternalUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<ConsentState>;
      if (customEvent.detail) {
        setConsent(customEvent.detail);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("openCookieSettings", handleOpenSettings);
    window.addEventListener("cookie_consent_updated", handleExternalUpdate);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("openCookieSettings", handleOpenSettings);
      window.removeEventListener("cookie_consent_updated", handleExternalUpdate);
    };
  }, []);

  const updateConsent = useCallback(
    (updates: Partial<Pick<ConsentState, "analytics" | "marketing">>) => {
      const receiptId = consent?.receiptId || generateReceiptId();
      const newState: ConsentState = {
        essential: true,
        analytics: updates.analytics ?? consent?.analytics ?? false,
        marketing: updates.marketing ?? consent?.marketing ?? false,
        timestamp: new Date().toISOString(),
        version: CONSENT_VERSION,
        receiptId,
      };

      // Delete revoked cookies
      if (consent?.analytics && !newState.analytics) {
        deleteCookiesByCategory("analytics");
      }
      if (consent?.marketing && !newState.marketing) {
        deleteCookiesByCategory("marketing");
      }

      writeConsentCookie(newState);
      setConsent(newState);
      setShowBanner(false);

      if (typeof window !== "undefined") {
        const proofPayload = {
          action: consent ? "update" : "initial",
          receiptId,
          consent: {
            essential: true,
            analytics: newState.analytics,
            marketing: newState.marketing,
          },
          timestamp: newState.timestamp,
          version: newState.version,
          userAgent: navigator.userAgent,
          url: window.location.href,
        };

        window.dispatchEvent(new CustomEvent("cookie_consent_updated", { detail: newState }));
        window.dispatchEvent(new CustomEvent("consentUpdated", { detail: newState }));
        window.dispatchEvent(new CustomEvent("consent_proof_log", { detail: proofPayload }));

        console.info("[TEZGEL-CONSENT-PROOF]", JSON.stringify(proofPayload));
      }
    },
    [consent]
  );

  const acceptAll = useCallback(() => {
    updateConsent({ analytics: true, marketing: true });
  }, [updateConsent]);

  const acceptEssentialOnly = useCallback(() => {
    updateConsent({ analytics: false, marketing: false });
  }, [updateConsent]);

  const openSettings = useCallback(() => {
    setShowBanner(true);
  }, []);

  const preferences = consent || {
    essential: true as const,
    analytics: false,
    marketing: false,
    timestamp: "",
    version: CONSENT_VERSION,
  };

  return {
    consent,
    preferences,
    showBanner,
    acceptAll,
    acceptEssentialOnly,
    updateConsent,
    openSettings,
    setShowBanner,
    hasConsent: (category: ConsentCategory) => category === "essential" || Boolean(consent?.[category]),
  };
}

// ─── Standalone Helpers for non-React code ───

export function hasConsent(category: ConsentCategory): boolean {
  if (category === "essential") return true;
  const stored = readConsentCookie();
  if (!stored) return false;
  if (stored.version !== CONSENT_VERSION) return false;
  return stored[category] === true;
}

export function getStoredConsent(): ConsentState | null {
  return readConsentCookie();
}

export function hasStoredConsent(category: ConsentCategory): boolean {
  return hasConsent(category);
}
