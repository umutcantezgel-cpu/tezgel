"use client";

/**
 * ══════════════════════════════════════════════════════════════
 * DSGVO + TTDSG Cookie-Consent Banner - Fliesenverlegung Tezgel
 * ══════════════════════════════════════════════════════════════
 * Compliance-Kriterien:
 * ✅ "Alle ablehnen" gleichwertig prominent wie "Alle akzeptieren" (§25 TTDSG)
 * ✅ Keine vorangekreuzten nicht-essentiellen Checkboxen (Art. 7 DSGVO)
 * ✅ Schließen = "Nur Essentiell" (kein Default-Opt-In)
 * ✅ Klare Zweckbeschreibung pro Cookie-Kategorie
 * ✅ Verlinkung zu /datenschutz & /impressum
 * ✅ Consent-Timestamp & Versionierung im Cookie gespeichert
 * ✅ Jederzeit reaktivierbar via #cookie-settings & Floating-Shield
 * ✅ Brand-Design im Fliesenverlegung Tezgel Orange & Charcoal
 * ══════════════════════════════════════════════════════════════
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { useConsent } from "@/hooks/useConsent";
import { CONSENT_CATEGORY_INFO, COOKIE_INVENTORY, type ConsentCategory } from "@/lib/cookie-inventory";
import { Shield, X, Cookie, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { widgetPhysicsCoordinator } from "@/lib/physics/widgetPhysicsCoordinator";

/* ── Viewport boundary calculations (protects mobile bottom dock) ── */
function getBannerBounds(cardWidth: number, cardHeight: number) {
  const w = typeof window !== "undefined" ? window.innerWidth : 1280;
  const h = typeof window !== "undefined" ? window.innerHeight : 800;
  const isMobile = w < 768;
  const margin = isMobile ? 12 : 24;
  const safeTop = 72; // Below sticky header
  // Ensure the banner NEVER covers the mobile FloatingDock (Anrufen, WhatsApp, Aufmaß)
  const safeBottom = isMobile ? 86 : 24;

  const minX = margin;
  const maxX = Math.max(margin, w - cardWidth - margin);
  const minY = safeTop;
  const maxY = Math.max(minY, h - cardHeight - safeBottom);

  return { w, h, isMobile, minX, maxX, minY, maxY };
}

/* ── Initial banner placement (top position on mobile to free the bottom dock) ── */
function getInitialBannerPosition(cardWidth: number): { x: number; y: number } {
  if (typeof window === "undefined") {
    return { x: 24, y: 76 };
  }
  const w = window.innerWidth;
  const isMobile = w < 768;
  const x = Math.max(isMobile ? 12 : 24, Math.round((w - cardWidth) / 2));
  const y = isMobile ? 76 : 80;
  return { x, y };
}

export default function CookieConsent() {
  const {
    consent,
    showBanner,
    acceptAll,
    acceptEssentialOnly,
    updateConsent,
    setShowBanner,
  } = useConsent();

  const [showSettings, setShowSettings] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<ConsentCategory | null>(null);

  // Physics & 2D dragging state
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>(() => {
    if (typeof window !== "undefined") {
      const w = window.innerWidth;
      const isMobile = w < 768;
      const estimatedWidth = isMobile ? w - 24 : Math.min(w - 48, 860);
      return getInitialBannerPosition(estimatedWidth);
    }
    return { x: 12, y: 76 };
  });
  const [isDragging, setIsDragging] = useState(false);

  const cardDimensionsRef = useRef({ w: 360, h: 280 });
  const posRef = useRef(coords);
  const velRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const isPointerDownRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const dragStartPointerRef = useRef({ x: 0, y: 0 });
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const pointerHistoryRef = useRef<Array<{ x: number; y: number; t: number }>>([]);
  const windowListenersRef = useRef<{
    move: (e: PointerEvent) => void;
    up: (e: PointerEvent) => void;
  } | null>(null);

  const animFrameRef = useRef<number>(0);
  const animateFnRef = useRef<(() => void) | null>(null);

  // Directly update DOM transform during 60fps physics animations
  const updateTransform = useCallback((x: number, y: number) => {
    posRef.current = { x, y };
    if (cardRef.current) {
      cardRef.current.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    }
  }, []);

  // Remove window pointer listeners cleanly
  const removeWindowListeners = useCallback(() => {
    if (windowListenersRef.current) {
      window.removeEventListener("pointermove", windowListenersRef.current.move);
      window.removeEventListener("pointerup", windowListenersRef.current.up);
      window.removeEventListener("pointercancel", windowListenersRef.current.up);
      windowListenersRef.current = null;
    }
  }, []);

  // Initial horizontal centering & top positioning (Zero forced reflow - pure layout math)
  useEffect(() => {
    if (typeof window === "undefined" || !showBanner) return;
    const w = window.innerWidth;
    const isMobile = w < 768;
    const estimatedWidth = isMobile ? w - 24 : Math.min(w - 48, 860);
    cardDimensionsRef.current.w = estimatedWidth;
    const initial = getInitialBannerPosition(estimatedWidth);
    posRef.current = initial;
    updateTransform(initial.x, initial.y);
  }, [showBanner, updateTransform]);

  // Passive ResizeObserver for dimensions - eliminates forced synchronous layout reflows
  useEffect(() => {
    if (typeof window === "undefined" || !cardRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.borderBoxSize && entry.borderBoxSize.length > 0) {
          cardDimensionsRef.current = {
            w: entry.borderBoxSize[0].inlineSize || cardDimensionsRef.current.w,
            h: entry.borderBoxSize[0].blockSize || cardDimensionsRef.current.h,
          };
        } else if (entry.contentRect) {
          cardDimensionsRef.current = {
            w: entry.contentRect.width || cardDimensionsRef.current.w,
            h: entry.contentRect.height || cardDimensionsRef.current.h,
          };
        }
      }
    });
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [showBanner]);

  // Wall bounce physics loop with 2-body collision resolution
  useEffect(() => {
    animateFnRef.current = () => {
      if (isDraggingRef.current) return;

      const p = posRef.current;
      const v = velRef.current;
      const { w: cardWidth, h: cardHeight } = cardDimensionsRef.current;
      const bounds = getBannerBounds(cardWidth, cardHeight);

      v.x *= 0.94;
      v.y *= 0.94;

      let nextX = p.x + v.x;
      let nextY = p.y + v.y;
      let didBounce = false;

      if (nextX <= bounds.minX) {
        nextX = bounds.minX;
        v.x = Math.abs(v.x) * 0.65;
        didBounce = true;
      } else if (nextX >= bounds.maxX) {
        nextX = bounds.maxX;
        v.x = -Math.abs(v.x) * 0.65;
        didBounce = true;
      }

      if (nextY <= bounds.minY) {
        nextY = bounds.minY;
        v.y = Math.abs(v.y) * 0.65;
        didBounce = true;
      } else if (nextY >= bounds.maxY) {
        nextY = bounds.maxY;
        v.y = -Math.abs(v.y) * 0.65;
        didBounce = true;
      }

      if (didBounce && typeof navigator !== "undefined" && navigator.vibrate) {
        try {
          navigator.vibrate(6);
        } catch {
          // ignore
        }
      }

      updateTransform(nextX, nextY);

      // Check and resolve 2-body collision with WhatsApp widget!
      widgetPhysicsCoordinator.checkAndResolveCollision();

      const speed = Math.hypot(v.x, v.y);
      if (speed < 0.25) {
        v.x = 0;
        v.y = 0;
        setCoords({ x: nextX, y: nextY });
        return;
      }

      animFrameRef.current = requestAnimationFrame(() => {
        animateFnRef.current?.();
      });
    };
  }, [updateTransform]);

  const startPhysicsAnimation = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    animateFnRef.current?.();
  }, []);

  // Register in 2-body physics coordinator
  useEffect(() => {
    if (!showBanner) return;

    return widgetPhysicsCoordinator.registerBox({
      id: "cookie-banner",
      mass: 4,
      getBounds: () => {
        const { w, h } = cardDimensionsRef.current;
        return {
          left: posRef.current.x,
          top: posRef.current.y,
          right: posRef.current.x + w,
          bottom: posRef.current.y + h,
        };
      },
      getVel: () => velRef.current,
      applyImpulse: (vx: number, vy: number) => {
        velRef.current.x += vx;
        velRef.current.y += vy;
      },
      displace: (dx: number, dy: number) => {
        const { w, h } = cardDimensionsRef.current;
        const bounds = getBannerBounds(w, h);
        const nextX = Math.max(bounds.minX, Math.min(bounds.maxX, posRef.current.x + dx));
        const nextY = Math.max(bounds.minY, Math.min(bounds.maxY, posRef.current.y + dy));
        updateTransform(nextX, nextY);
      },
      wakePhysics: () => {
        startPhysicsAnimation();
      },
    });
  }, [showBanner, startPhysicsAnimation, updateTransform]);

  // Window pointer handlers for smooth dragging & throwing
  const onWindowPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isPointerDownRef.current || (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current)) {
        return;
      }

      const totalDx = e.clientX - dragStartPointerRef.current.x;
      const totalDy = e.clientY - dragStartPointerRef.current.y;
      const dist = Math.hypot(totalDx, totalDy);

      // Distinguish drag from tap (> 8px movement required)
      if (!isDraggingRef.current && dist > 8) {
        isDraggingRef.current = true;
        setIsDragging(true);

        if (typeof window !== "undefined" && window.getSelection) {
          window.getSelection()?.removeAllRanges();
        }
      }

      if (!isDraggingRef.current) return;

      if (e.cancelable) {
        e.preventDefault();
      }

      const { w: cardWidth, h: cardHeight } = cardDimensionsRef.current;
      const bounds = getBannerBounds(cardWidth, cardHeight);

      const nextX = Math.max(bounds.minX, Math.min(bounds.maxX, dragStartPosRef.current.x + totalDx));
      const nextY = Math.max(bounds.minY, Math.min(bounds.maxY, dragStartPosRef.current.y + totalDy));

      updateTransform(nextX, nextY);

      // Collision check during active drag
      widgetPhysicsCoordinator.checkAndResolveCollision();

      const now = performance.now();
      pointerHistoryRef.current.push({ x: e.clientX, y: e.clientY, t: now });
      const cutoff = now - 120;
      pointerHistoryRef.current = pointerHistoryRef.current.filter((sample) => sample.t >= cutoff);
    },
    [updateTransform]
  );

  const onWindowPointerUp = useCallback(
    (e: PointerEvent) => {
      if (!isPointerDownRef.current || (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current)) {
        return;
      }

      isPointerDownRef.current = false;
      pointerIdRef.current = null;
      removeWindowListeners();

      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);

        const now = performance.now();
        const recent = pointerHistoryRef.current.filter((sample) => now - sample.t <= 100);

        let vx = 0;
        let vy = 0;

        if (recent.length >= 2) {
          const oldest = recent[0];
          const newest = recent[recent.length - 1];
          const dt = Math.max(10, newest.t - oldest.t);
          vx = ((newest.x - oldest.x) / dt) * 16;
          vy = ((newest.y - oldest.y) / dt) * 16;
        }

        const maxV = 32;
        velRef.current = {
          x: Math.max(-maxV, Math.min(maxV, vx)),
          y: Math.max(-maxV, Math.min(maxV, vy)),
        };

        const speed = Math.hypot(velRef.current.x, velRef.current.y);
        if (speed > 1.0) {
          startPhysicsAnimation();
        } else {
          setCoords({ x: posRef.current.x, y: posRef.current.y });
        }
      }
    },
    [removeWindowListeners, startPhysicsAnimation]
  );

  // Card pointer down (only on non-interactive parts)
  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0) return;

      // Never intercept button clicks, links, or form controls
      const target = e.target as HTMLElement;
      if (target.closest("button, a, input, [role='button'], label, [tabindex='0']")) {
        return;
      }

      isPointerDownRef.current = true;
      isDraggingRef.current = false;
      setIsDragging(false);

      cancelAnimationFrame(animFrameRef.current);
      velRef.current = { x: 0, y: 0 };

      const now = performance.now();
      pointerIdRef.current = e.pointerId;
      dragStartPointerRef.current = { x: e.clientX, y: e.clientY };
      dragStartPosRef.current = { x: posRef.current.x, y: posRef.current.y };
      pointerHistoryRef.current = [{ x: e.clientX, y: e.clientY, t: now }];

      windowListenersRef.current = { move: onWindowPointerMove, up: onWindowPointerUp };
      window.addEventListener("pointermove", onWindowPointerMove, { passive: false });
      window.addEventListener("pointerup", onWindowPointerUp, { passive: false });
      window.addEventListener("pointercancel", onWindowPointerUp, { passive: false });
    },
    [onWindowPointerMove, onWindowPointerUp]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      removeWindowListeners();
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [removeWindowListeners]);

  // Viewport resize clamping
  useEffect(() => {
    const handleResize = () => {
      const { w: cardWidth, h: cardHeight } = cardDimensionsRef.current;
      const bounds = getBannerBounds(cardWidth, cardHeight);
      const clampedX = Math.max(bounds.minX, Math.min(bounds.maxX, posRef.current.x));
      const clampedY = Math.max(bounds.minY, Math.min(bounds.maxY, posRef.current.y));
      if (clampedX !== posRef.current.x || clampedY !== posRef.current.y) {
        updateTransform(clampedX, clampedY);
        setCoords({ x: clampedX, y: clampedY });
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [updateTransform]);

  // Global event listener to listen for `#cookie-settings` in the URL
  useEffect(() => {
    const handleOpenSettingsEvent = () => {
      setShowBanner(true);
      setShowSettings(true);
      if (consent) {
        setAnalyticsChecked(consent.analytics);
        setMarketingChecked(consent.marketing);
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === "#cookie-settings") {
        handleOpenSettingsEvent();
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };

    if (window.location.hash === "#cookie-settings") {
      handleHashChange();
    }

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("openCookieSettings", handleOpenSettingsEvent);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("openCookieSettings", handleOpenSettingsEvent);
    };
  }, [consent, setShowBanner]);

  const handleSaveSettings = () => {
    updateConsent({
      analytics: analyticsChecked,
      marketing: marketingChecked,
    });
    setShowSettings(false);
  };

  const handleClose = () => {
    acceptEssentialOnly();
    setShowSettings(false);
  };

  const handleOpenSettings = () => {
    setAnalyticsChecked(consent?.analytics ?? false);
    setMarketingChecked(consent?.marketing ?? false);
    setShowSettings(true);
  };

  const handleDeclineAll = () => {
    setAnalyticsChecked(false);
    setMarketingChecked(false);
    acceptEssentialOnly();
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    setAnalyticsChecked(true);
    setMarketingChecked(true);
    acceptAll();
    setShowSettings(false);
  };

  return (
    <>
      {showBanner && (
        <div
          ref={cardRef}
          role="dialog"
          aria-modal="false"
          aria-label="Cookie-Einwilligungsbanner gemäß DSGVO und TTDSG"
          aria-describedby="cookie-consent-description"
          onPointerDown={onPointerDown}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            transform: `translate3d(${coords.x}px, ${coords.y}px, 0px)`,
            zIndex: 9998,
            width: typeof window !== "undefined" && window.innerWidth < 768 ? "calc(100vw - 24px)" : "min(860px, calc(100vw - 48px))",
            maxWidth: 860,
            touchAction: "none",
            userSelect: isDragging ? "none" : "auto",
            willChange: "transform",
          }}
          className={`rounded-2xl border border-neutral-200/90 bg-white shadow-[0_12px_44px_rgba(0,0,0,0.18)] backdrop-blur-xl max-h-[82vh] overflow-y-auto overscroll-contain transition-shadow ${
            isDragging ? "shadow-[0_20px_50px_rgba(0,0,0,0.3)]" : ""
          }`}
        >
          {/* Subtle Drag Handle Bar */}
          <div
            className="w-full flex items-center justify-center pt-2.5 pb-0.5 cursor-grab active:cursor-grabbing select-none touch-none group"
            aria-hidden="true"
            title="Frei verschiebbar & werfbar"
          >
            <div className="w-12 h-1.5 rounded-full bg-neutral-200 group-hover:bg-neutral-300 transition-colors" />
          </div>
            {!showSettings ? (
              /* ── Banner View ── */
              <div className="p-5 sm:p-6 md:p-6 relative">
                {/* Close button = Nur Essentiell */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute top-3 right-3 p-2 text-neutral-400 hover:text-neutral-900 transition-colors rounded-lg hover:bg-neutral-100"
                  aria-label="Cookie-Banner schließen – nur essentielle Cookies werden gesetzt"
                  title="Schließen = Nur essentielle Cookies"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="hidden sm:flex shrink-0 w-11 h-11 rounded-xl bg-orange-50 border border-orange-200/60 items-center justify-center">
                    <Cookie className="w-5 h-5 text-orange-700" />
                  </div>
                  <div className="flex-1 pr-6">
                    <p className="text-base font-bold text-neutral-900 mb-1.5 flex items-center gap-2">
                      <span>Privatsphäre & Cookie-Einstellungen</span>
                    </p>
                    <p id="cookie-consent-description" className="text-sm text-neutral-700 leading-relaxed mb-4">
                      Wir nutzen Cookies auf unserer Website. Einige sind <strong>technisch notwendig</strong> für den Betrieb, 
                      während andere uns helfen, unser Online-Angebot zu verbessern und interaktive Karten bereitzustellen. 
                      Nicht-essentielle Cookies setzen wir nur mit Ihrer Einwilligung (§25 TTDSG, Art. 6 Abs. 1 lit. a DSGVO).{" "}
                      <Link
                        href="/datenschutz"
                        className="underline hover:text-neutral-900 transition-colors inline-flex items-center gap-1 font-medium"
                        aria-label="Datenschutzerklärung von Fliesenverlegung Tezgel lesen"
                      >
                        Datenschutz
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                      {" · "}
                      <Link
                        href="/impressum"
                        className="underline hover:text-neutral-900 transition-colors font-medium"
                      >
                        Impressum
                      </Link>
                    </p>

                    {/* Current consent status (shown on re-open) */}
                    {consent && consent.timestamp && (
                      <div className="bg-orange-50/70 border border-orange-200/80 rounded-xl px-3.5 py-2.5 mb-4 text-xs text-orange-950">
                        <strong>Aktueller Status:</strong>{" "}
                        {consent.analytics && consent.marketing
                          ? "Alle Cookies akzeptiert"
                          : consent.analytics
                            ? "Analyse erlaubt · Marketing abgelehnt"
                            : consent.marketing
                              ? "Marketing erlaubt · Analyse abgelehnt"
                              : "Nur technisch notwendige Cookies"}
                        {" "}(seit {new Date(consent.timestamp).toLocaleDateString("de-DE")})
                      </div>
                    )}

                    {/* Action Buttons: "Ablehnen" ist gleichwertig zu "Akzeptieren" */}
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <button
                        type="button"
                        onClick={handleAcceptAll}
                        className="px-5 py-2.5 bg-orange-700 hover:bg-orange-800 active:scale-[0.99] text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-sm min-h-[44px] flex-1 text-center"
                      >
                        Alle akzeptieren
                      </button>
                      <button
                        type="button"
                        onClick={handleDeclineAll}
                        className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 active:scale-[0.99] text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-sm min-h-[44px] flex-1 text-center"
                      >
                        Alle ablehnen
                      </button>
                      <button
                        type="button"
                        onClick={handleOpenSettings}
                        className="px-5 py-2.5 text-neutral-700 hover:text-neutral-950 text-sm font-semibold transition-colors underline-offset-4 hover:underline min-h-[44px] text-center"
                      >
                        Einstellungen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ── Settings View (Granular) ── */
              <div className="p-5 sm:p-6 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-orange-600 shrink-0" />
                  <p className="text-base font-bold text-neutral-900">
                    Cookie-Einstellungen individuell anpassen
                  </p>
                </div>
                <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                  Bestimmen Sie selbst, welche Kategorien Sie zulassen möchten. Technisch notwendige Cookies 
                  sind für den reibungslosen Betrieb erforderlich und können nicht abgewählt werden (§25 Abs. 2 TTDSG).
                </p>

                <div className="space-y-3 mb-5">
                  {(Object.entries(CONSENT_CATEGORY_INFO) as [ConsentCategory, (typeof CONSENT_CATEGORY_INFO)[ConsentCategory]][]).map(
                    ([key, info]) => {
                      const relatedCookies = COOKIE_INVENTORY.filter((c) => c.category === key);
                      const isExpanded = expandedCategory === key;
                      const isChecked = key === "essential" ? true : key === "analytics" ? analyticsChecked : marketingChecked;

                      return (
                        <div
                          key={key}
                          className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                            info.required
                              ? "border-emerald-200 bg-emerald-50/20"
                              : isChecked
                                ? "border-orange-500 bg-orange-50/10 shadow-sm"
                                : "border-neutral-200 hover:border-neutral-300"
                          }`}
                        >
                          <div
                            className={`flex items-start gap-3.5 p-3.5 sm:p-4 transition-colors ${
                              !info.required ? "cursor-pointer" : ""
                            }`}
                            onClick={
                              !info.required
                                ? () => {
                                    if (key === "analytics") setAnalyticsChecked(!analyticsChecked);
                                    if (key === "marketing") setMarketingChecked(!marketingChecked);
                                  }
                                : undefined
                            }
                            role={!info.required ? "button" : undefined}
                            tabIndex={!info.required ? 0 : undefined}
                            onKeyDown={
                              !info.required
                                ? (e) => {
                                    if (e.key === " " || e.key === "Enter") {
                                      e.preventDefault();
                                      if (key === "analytics") setAnalyticsChecked(!analyticsChecked);
                                      if (key === "marketing") setMarketingChecked(!marketingChecked);
                                    }
                                  }
                                : undefined
                            }
                          >
                            <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                              <div
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                                  isChecked
                                    ? info.required
                                      ? "bg-emerald-600 border-emerald-600 text-white"
                                      : "bg-orange-600 border-orange-600 text-white"
                                    : "bg-white border-neutral-300"
                                }`}
                                aria-hidden="true"
                              >
                                {isChecked && (
                                  <svg
                                    className="w-3.5 h-3.5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                            </div>

                            <div className="flex-1">
                              <span className="text-sm font-semibold flex items-center gap-2 flex-wrap mb-1">
                                <span
                                  className={
                                    info.required
                                      ? "text-emerald-900"
                                      : isChecked
                                        ? "text-neutral-900"
                                        : "text-neutral-700"
                                  }
                                >
                                  {info.label}
                                </span>
                                {info.required ? (
                                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    Erforderlich
                                  </span>
                                ) : isChecked ? (
                                  <span className="text-[10px] font-bold text-orange-800 bg-orange-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    Aktiviert
                                  </span>
                                ) : null}
                              </span>
                              <p className={`text-xs leading-relaxed ${isChecked ? "text-neutral-700" : "text-neutral-600"}`}>
                                {info.description}
                              </p>
                            </div>
                          </div>

                          {/* Cookie Details Expansion */}
                          {relatedCookies.length > 0 && (
                            <>
                              <button
                                type="button"
                                onClick={() => setExpandedCategory(isExpanded ? null : key)}
                                className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors border-t border-neutral-100"
                              >
                                <span>{relatedCookies.length} Cookie(s) & Details einsehen</span>
                                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                              </button>
                              {isExpanded && (
                                <div className="px-3.5 pb-3 space-y-2 bg-neutral-50/60 border-t border-neutral-100">
                                  {relatedCookies.map((cookie) => (
                                    <div
                                      key={cookie.name}
                                      className="bg-white border border-neutral-200/80 rounded-lg p-2.5 text-xs mt-2"
                                    >
                                      <div className="flex items-center justify-between mb-0.5">
                                        <code className="font-mono font-bold text-neutral-900 bg-neutral-100 px-1.5 py-0.5 rounded text-[11px]">
                                          {cookie.name}
                                        </code>
                                        <span className="text-neutral-600 text-[11px] font-medium">{cookie.duration}</span>
                                      </div>
                                      <p className="text-neutral-700 mt-1">{cookie.purpose}</p>
                                      <p className="text-neutral-500 text-[10px] mt-0.5 font-medium">Anbieter: {cookie.provider}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>

                {/* Settings Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={handleSaveSettings}
                    className="px-5 py-2.5 bg-orange-700 hover:bg-orange-800 active:scale-[0.99] text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-sm min-h-[44px] flex-1 text-center"
                  >
                    Auswahl speichern
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 active:scale-[0.99] text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-sm min-h-[44px] flex-1 text-center"
                  >
                    Alle akzeptieren
                  </button>
                  <button
                    type="button"
                    onClick={handleDeclineAll}
                    className="px-5 py-2.5 bg-white border border-neutral-300 hover:bg-neutral-50 active:scale-[0.99] text-neutral-800 text-sm font-bold rounded-xl transition-all duration-200 min-h-[44px] flex-1 text-center"
                  >
                    Alle ablehnen
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSettings(false)}
                    className="px-5 py-2.5 text-neutral-600 hover:text-neutral-900 text-sm font-semibold transition-colors min-h-[44px] text-center"
                  >
                    Zurück
                  </button>
                </div>
              </div>
            )}
        </div>
      )}

      {/* Floating Shield Badge: Einfacher Widerruf jederzeit möglich */}
      {!showBanner && (
        <button
          type="button"
          onClick={() => {
            setShowBanner(true);
            setShowSettings(true);
            setAnalyticsChecked(consent?.analytics ?? false);
            setMarketingChecked(consent?.marketing ?? false);
          }}
          className="fixed bottom-20 left-4 md:bottom-4 md:left-4 z-[9995] w-10 h-10 md:w-11 md:h-11 bg-white/95 backdrop-blur-md rounded-full shadow-[0_4px_18px_rgba(0,0,0,0.12)] border border-neutral-200/90 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 text-neutral-700 hover:text-orange-600 group"
          aria-label="Cookie-Einstellungen verwalten"
          title="Cookie-Einstellungen öffnen"
        >
          <div className="relative">
            <Shield className="w-4 h-4 md:w-5 md:h-5 text-neutral-600 group-hover:text-orange-600 transition-colors" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white shadow-xs" />
          </div>
        </button>
      )}
    </>
  );
}
