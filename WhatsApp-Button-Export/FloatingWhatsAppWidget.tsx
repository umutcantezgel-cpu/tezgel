"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { companyInfo } from "@/lib/data/company";
import { openWhatsApp, buildWhatsAppUrl, isMobileDevice } from "@/lib/whatsapp";

/* ═══════════════════════════════════════════════════════════════════════════
 * Floating WhatsApp CTA Widget - Fliesenverlegung Tezgel
 *
 * Features:
 *  1. Physics-based drag & throw (momentum, bounce, friction)
 *  2. Edge-snapping after release (docks to nearest screen edge)
 *  3. Safe-area bounding (above mobile dock, below header)
 *  4. Session position persistence across page transitions
 *  5. Pulse animation when idle
 *  6. Smart tooltip ("Chat starten 💬") adapting to left/right dock position
 *  7. Notification badge ("1") for first 30 seconds
 *  8. Contextual WhatsApp messages tailored to Tezgel's tile & bathroom services
 *  9. Haptic feedback on mobile touch interaction
 * 10. Universal cross-device launcher (iOS Safari, Android Chrome, Desktop)
 * 11. Analytics event tracking on click
 * ═══════════════════════════════════════════════════════════════════════════ */

interface StoredPosition {
  side: "left" | "right";
  yRatio: number;
}

const SIZE = 60;
const FRICTION = 0.92;
const BOUNCE = 0.6;
const MIN_VEL = 0.3;
const DRAG_THRESHOLD_TOUCH = 14; // Higher tolerance for mobile finger taps to prevent accidental drag cancels
const DRAG_THRESHOLD_MOUSE = 7;

/* ── Contextual messages tailored to Fliesenverlegung Tezgel ── */
function getContextualMessage(pathname: string): string {
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

/* ── Calculate responsive bounds & sizes ── */
function getWidgetBounds(size: number) {
  const w = typeof window !== "undefined" ? window.innerWidth : 1280;
  const h = typeof window !== "undefined" ? window.innerHeight : 800;
  const isMobile = w < 768;
  const margin = isMobile ? 12 : 24;
  const safeTop = 72; // below sticky header
  // Ensure comfortable clearance above mobile bottom dock (FloatingDock) + iOS home bar
  const safeBottom = isMobile ? 102 : 24;

  const minX = margin;
  const maxX = Math.max(margin, w - size - margin);
  const minY = safeTop;
  const maxY = Math.max(minY, h - size - safeBottom);

  return { w, h, isMobile, margin, safeTop, safeBottom, minX, maxX, minY, maxY };
}

/* ── Initial position resolution ── */
function getInitialPosition(): { x: number; y: number; side: "left" | "right" } {
  if (typeof window === "undefined") {
    return { x: 300, y: 500, side: "right" };
  }
  const bounds = getWidgetBounds(SIZE);
  let initialX = bounds.maxX;
  let initialY = bounds.maxY;
  let initialSide: "left" | "right" = "right";

  try {
    const raw = sessionStorage.getItem("tezgel_wa_button_pos");
    if (raw) {
      const parsed: StoredPosition = JSON.parse(raw);
      if (parsed.side === "left" || parsed.side === "right") {
        initialSide = parsed.side;
        initialX = parsed.side === "left" ? bounds.minX : bounds.maxX;
        initialY = bounds.minY + parsed.yRatio * (bounds.maxY - bounds.minY);
      }
    }
  } catch {
    // Fallback to default
  }

  return { x: initialX, y: initialY, side: initialSide };
}

/* ── Edge-snap target: find nearest screen edge and clamp within safe bounds ── */
function getSnapTarget(x: number, y: number, size: number) {
  const bounds = getWidgetBounds(size);
  const midX = x + size / 2;
  const distLeft = midX;
  const distRight = bounds.w - midX;

  const clampedY = Math.max(bounds.minY, Math.min(bounds.maxY, y));
  if (distLeft < distRight) {
    return { x: bounds.minX, y: clampedY, side: "left" as const };
  }
  return { x: bounds.maxX, y: clampedY, side: "right" as const };
}

export default function FloatingWhatsAppWidget() {
  const [initialState] = useState(getInitialPosition);
  const [coords, setCoords] = useState<{ x: number; y: number }>(() => ({
    x: initialState.x,
    y: initialState.y,
  }));
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [currentSide, setCurrentSide] = useState<"left" | "right">(initialState.side);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showBadge, setShowBadge] = useState(true);

  const btnRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname() || "";

  // Position state (refs for 60fps physics animations without causing React re-renders)
  const posRef = useRef({ x: initialState.x, y: initialState.y });
  const velRef = useRef({ x: 0, y: 0 });
  const isPointerDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const wasDraggedRef = useRef(false);
  const isSnappingRef = useRef(false);
  const pointerDownTimeRef = useRef(0);
  const justHandledTapRef = useRef(false);
  const pointerTypeRef = useRef<string>("mouse");
  const dragStartRef = useRef({ x: 0, y: 0 });
  const lastPointerRef = useRef({ x: 0, y: 0, t: 0 });
  const prevPointerRef = useRef({ x: 0, y: 0, t: 0 });
  const animFrameRef = useRef<number>(0);
  const snapFrameRef = useRef<number>(0);
  const animateFnRef = useRef<(() => void) | null>(null);

  // Directly update DOM transform during 60fps animations for optimal performance
  const updateTransform = useCallback((x: number, y: number) => {
    posRef.current = { x, y };
    if (btnRef.current) {
      btnRef.current.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    }
  }, []);

  // Save dock position to sessionStorage
  const persistPosition = useCallback((side: "left" | "right", y: number) => {
    try {
      const bounds = getWidgetBounds(SIZE);
      const span = bounds.maxY - bounds.minY;
      const yRatio = span > 0 ? (y - bounds.minY) / span : 0.8;
      const payload: StoredPosition = { side, yRatio: Math.max(0, Math.min(1, yRatio)) };
      sessionStorage.setItem("tezgel_wa_button_pos", JSON.stringify(payload));
    } catch {
      // Ignore storage errors in private browsing
    }
  }, []);

  // Edge-snap animation (spring-like easing)
  const snapToEdge = useCallback(() => {
    const target = getSnapTarget(posRef.current.x, posRef.current.y, SIZE);
    isSnappingRef.current = true;
    setIsSnapping(true);
    setCurrentSide(target.side);
    persistPosition(target.side, target.y);

    const startX = posRef.current.x;
    const startY = posRef.current.y;
    const startTime = performance.now();
    const duration = 380; // ms

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      const nextX = startX + (target.x - startX) * eased;
      const nextY = startY + (target.y - startY) * eased;
      updateTransform(nextX, nextY);

      if (progress < 1) {
        snapFrameRef.current = requestAnimationFrame(step);
      } else {
        isSnappingRef.current = false;
        setIsSnapping(false);
        updateTransform(target.x, target.y);
        setCoords({ x: target.x, y: target.y });
      }
    };

    snapFrameRef.current = requestAnimationFrame(step);
  }, [persistPosition, updateTransform]);

  // Keep animateFnRef fresh
  useEffect(() => {
    animateFnRef.current = () => {
      if (isDraggingRef.current) return;

      const p = posRef.current;
      const v = velRef.current;
      const bounds = getWidgetBounds(SIZE);

      v.x *= FRICTION;
      v.y *= FRICTION;

      if (Math.abs(v.x) < MIN_VEL && Math.abs(v.y) < MIN_VEL) {
        v.x = 0;
        v.y = 0;
        snapToEdge();
        return;
      }

      let nextX = p.x + v.x;
      let nextY = p.y + v.y;

      // Bounce off safe edges
      if (nextX <= bounds.minX) {
        nextX = bounds.minX;
        v.x = Math.abs(v.x) * BOUNCE;
      } else if (nextX >= bounds.maxX) {
        nextX = bounds.maxX;
        v.x = -Math.abs(v.x) * BOUNCE;
      }

      if (nextY <= bounds.minY) {
        nextY = bounds.minY;
        v.y = Math.abs(v.y) * BOUNCE;
      } else if (nextY >= bounds.maxY) {
        nextY = bounds.maxY;
        v.y = -Math.abs(v.y) * BOUNCE;
      }

      updateTransform(nextX, nextY);
      animFrameRef.current = requestAnimationFrame(() => {
        animateFnRef.current?.();
      });
    };
  }, [snapToEdge, updateTransform]);

  // Trigger physics animation
  const startPhysicsAnimation = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    animateFnRef.current?.();
  }, []);

  // Timers for tooltip and badge
  useEffect(() => {
    const tooltipTimer = setTimeout(() => setShowTooltip(true), 5000);
    const badgeTimer = setTimeout(() => setShowBadge(false), 30000);

    return () => {
      clearTimeout(tooltipTimer);
      clearTimeout(badgeTimer);
    };
  }, []);

  // Track analytics event helper
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

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;

      isPointerDownRef.current = true;
      isDraggingRef.current = false;
      wasDraggedRef.current = false;
      isSnappingRef.current = false;
      setIsDragging(false);
      setIsSnapping(false);

      cancelAnimationFrame(animFrameRef.current);
      cancelAnimationFrame(snapFrameRef.current);
      velRef.current = { x: 0, y: 0 };

      const now = Date.now();
      pointerDownTimeRef.current = now;
      pointerTypeRef.current = e.pointerType || "mouse";
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      lastPointerRef.current = { x: e.clientX, y: e.clientY, t: now };
      prevPointerRef.current = { x: e.clientX, y: e.clientY, t: now };

      try {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    },
    []
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isPointerDownRef.current) return;

      const totalDx = e.clientX - dragStartRef.current.x;
      const totalDy = e.clientY - dragStartRef.current.y;
      const dist = Math.hypot(totalDx, totalDy);
      const threshold = pointerTypeRef.current === "touch" ? DRAG_THRESHOLD_TOUCH : DRAG_THRESHOLD_MOUSE;

      // Only enter drag state if pointer has intentionally moved beyond jitter threshold
      if (!isDraggingRef.current && dist > threshold) {
        isDraggingRef.current = true;
        wasDraggedRef.current = true;
        setIsDragging(true);

        // Hide tooltip & badge on intentional drag
        setShowTooltip(false);
        setShowBadge(false);

        // Haptic feedback on mobile when drag begins
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          try {
            navigator.vibrate(20);
          } catch {
            // ignore
          }
        }
      }

      if (!isDraggingRef.current) return;

      const dx = e.clientX - lastPointerRef.current.x;
      const dy = e.clientY - lastPointerRef.current.y;

      const bounds = getWidgetBounds(SIZE);
      const nextX = Math.max(bounds.minX, Math.min(bounds.maxX, posRef.current.x + dx));
      const nextY = Math.max(bounds.minY, Math.min(bounds.maxY, posRef.current.y + dy));

      updateTransform(nextX, nextY);

      prevPointerRef.current = { ...lastPointerRef.current };
      lastPointerRef.current = { x: e.clientX, y: e.clientY, t: Date.now() };
    },
    [updateTransform]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isPointerDownRef.current) return;
      isPointerDownRef.current = false;

      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }

      // Case A: User was actively dragging the button
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);

        const dt = Math.max(1, lastPointerRef.current.t - prevPointerRef.current.t);
        const vx = ((lastPointerRef.current.x - prevPointerRef.current.x) / dt) * 16;
        const vy = ((lastPointerRef.current.y - prevPointerRef.current.y) / dt) * 16;

        const maxV = 36;
        velRef.current = {
          x: Math.max(-maxV, Math.min(maxV, vx)),
          y: Math.max(-maxV, Math.min(maxV, vy)),
        };

        if (Math.abs(velRef.current.x) > MIN_VEL || Math.abs(velRef.current.y) > MIN_VEL) {
          startPhysicsAnimation();
        } else {
          snapToEdge();
        }
        return;
      }

      // Case B: Clean tap/click on touch or mouse without dragging
      const duration = Date.now() - pointerDownTimeRef.current;
      if (!wasDraggedRef.current && duration < 500) {
        justHandledTapRef.current = true;
        setTimeout(() => {
          justHandledTapRef.current = false;
        }, 500);

        trackClick();

        const cleanNumber = companyInfo.socialMedia.whatsapp?.replace(/[^0-9]/g, "");
        const contextMessage = getContextualMessage(pathname);
        openWhatsApp({ phone: cleanNumber, text: contextMessage });
      }
    },
    [pathname, snapToEdge, startPhysicsAnimation, trackClick]
  );

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (wasDraggedRef.current || justHandledTapRef.current) {
        e.preventDefault();
        return;
      }

      // Keyboard navigation (Enter / Space) or standard browser click fallback
      trackClick();

      if (isMobileDevice()) {
        e.preventDefault();
        const cleanNumber = companyInfo.socialMedia.whatsapp?.replace(/[^0-9]/g, "");
        const contextMessage = getContextualMessage(pathname);
        openWhatsApp({ phone: cleanNumber, text: contextMessage });
      }
    },
    [pathname, trackClick]
  );

  // Keep widget safely clamped within viewport on resize or orientation change
  useEffect(() => {
    const handleResize = () => {
      const bounds = getWidgetBounds(SIZE);
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

  // Cleanup frame handles on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      cancelAnimationFrame(snapFrameRef.current);
    };
  }, []);

  const whatsappNumber = companyInfo.socialMedia.whatsapp;
  if (!whatsappNumber) return null;

  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
  const contextMessage = getContextualMessage(pathname);
  const whatsappUrl = buildWhatsAppUrl(cleanNumber, contextMessage);

  const isIdle = !isDragging && !isSnapping;
  const isLeft = currentSide === "left";

  const tooltipLeft = isLeft ? coords.x + SIZE + 12 : coords.x - 128;
  const tooltipTop = coords.y + 12;

  return (
    <>
      {/* Tooltip (Smart positioning depending on docking side) */}
      {showTooltip && isIdle && (
        <div
          style={{
            position: "fixed",
            zIndex: 9996,
            left: tooltipLeft,
            top: tooltipTop,
            pointerEvents: "none",
            opacity: 1,
            animation: "fadeIn 0.25s ease-out",
          }}
        >
          <div
            style={{
              background: "rgba(23, 23, 23, 0.95)",
              color: "#ffffff",
              fontSize: 12.5,
              fontWeight: 600,
              padding: "7px 13px",
              borderRadius: 12,
              whiteSpace: "nowrap",
              boxShadow: "0 6px 20px rgba(0,0,0,0.28)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              fontFamily: "var(--font-jakarta), system-ui, -apple-system, sans-serif",
            }}
          >
            Chat starten 💬
          </div>
        </div>
      )}

      {/* Main Floating Button */}
      <a
        ref={btnRef}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp-Nachricht an Fliesenverlegung Tezgel senden"
        id="whatsapp-floating-btn"
        role="button"
        tabIndex={0}
        onClick={onClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          transform: `translate3d(${coords.x}px, ${coords.y}px, 0px)`,
          zIndex: 9997,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: SIZE,
          height: SIZE,
          borderRadius: "50%",
          backgroundColor: "#25D366",
          color: "#ffffff",
          textDecoration: "none",
          userSelect: "none",
          touchAction: "none",
          cursor: isDragging ? "grabbing" : "grab",
          boxShadow: isDragging
            ? "0 10px 36px rgba(37,211,102,0.65), 0 0 0 6px rgba(37,211,102,0.25)"
            : "0 6px 26px rgba(37,211,102,0.5), 0 0 0 3px rgba(37,211,102,0.22)",
          scale: isDragging ? "1.12" : "1",
          transition: isDragging || isSnapping ? "none" : "box-shadow 0.25s, scale 0.2s",
          willChange: "transform",
          animation: isIdle ? "wa-pulse 2.2s ease-in-out infinite" : "none",
        }}
      >
        {/* Notification Badge */}
        {showBadge && (
          <span
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              color: "#ffffff",
              fontSize: 11,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #ffffff",
              boxShadow: "0 2px 8px rgba(239,68,68,0.45)",
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              pointerEvents: "none",
              animation: "fadeIn 0.3s ease-out",
            }}
          >
            1
          </span>
        )}

        {/* WhatsApp Icon */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          style={{ fill: "#ffffff", pointerEvents: "none" }}
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
