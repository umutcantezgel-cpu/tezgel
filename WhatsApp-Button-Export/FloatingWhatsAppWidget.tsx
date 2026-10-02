"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { companyInfo } from "@/lib/data/company";
import { openWhatsApp, buildWhatsAppUrl, isMobileDevice } from "@/lib/whatsapp";
import { widgetPhysicsCoordinator } from "@/lib/physics/widgetPhysicsCoordinator";

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
  side: "right";
  yRatio: number;
}

const SIZE = 60;
const FRICTION = 0.94; // Smooth deceleration allowing 2-4 wall bounces on hard throw
const BOUNCE = 0.72; // Elastic satisfying rebound
const MIN_VEL = 0.38; // Threshold to transition from bouncing to docking
const DRAG_THRESHOLD_MOUSE = 5; // Px movement required to distinguish click from drag
const DRAG_THRESHOLD_TOUCH = 10;
const MAX_VELOCITY = 42; // Prevent glitch speeds
const HISTORY_WINDOW_MS = 120; // Time window for release velocity calculation

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
  // Clearance above mobile bottom dock (FloatingDock) + iOS home bar
  const safeBottom = isMobile ? 102 : 24;

  const minX = margin;
  const maxX = Math.max(margin, w - size - margin);
  const minY = safeTop;
  const maxY = Math.max(minY, h - size - safeBottom);

  return { w, h, isMobile, margin, safeTop, safeBottom, minX, maxX, minY, maxY };
}

/* ── Initial position resolution (always starts or restores to right edge) ── */
function getInitialPosition(): { x: number; y: number; side: "right" } {
  if (typeof window === "undefined") {
    return { x: 300, y: 500, side: "right" };
  }
  const bounds = getWidgetBounds(SIZE);
  let initialX = bounds.maxX;
  let initialY = bounds.maxY;

  try {
    const raw = sessionStorage.getItem("tezgel_wa_button_pos");
    if (raw) {
      const parsed: StoredPosition = JSON.parse(raw);
      if (typeof parsed.yRatio === "number") {
        initialX = bounds.maxX;
        initialY = bounds.minY + parsed.yRatio * (bounds.maxY - bounds.minY);
      }
    }
  } catch {
    // Fallback to default
  }

  return { x: initialX, y: initialY, side: "right" };
}

export default function FloatingWhatsAppWidget() {
  const [initialState] = useState(getInitialPosition);
  const [coords, setCoords] = useState<{ x: number; y: number }>(() => ({
    x: initialState.x,
    y: initialState.y,
  }));
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showBadge, setShowBadge] = useState(true);

  const btnRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname() || "";

  // Position & physics refs (for smooth 60fps animations without React re-renders)
  const posRef = useRef({ x: initialState.x, y: initialState.y });
  const velRef = useRef({ x: 0, y: 0 });
  const isPointerDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const wasDraggedRef = useRef(false);
  const justFinishedDragRef = useRef(false);
  const isSnappingRef = useRef(false);
  const pointerDownTimeRef = useRef(0);
  const pointerTypeRef = useRef<string>("mouse");
  const dragStartPointerRef = useRef({ x: 0, y: 0 });
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const pointerHistoryRef = useRef<Array<{ x: number; y: number; t: number }>>([]);
  const pointerIdRef = useRef<number | null>(null);
  const windowListenersRef = useRef<{
    move: (e: PointerEvent) => void;
    up: (e: PointerEvent) => void;
  } | null>(null);

  const animFrameRef = useRef<number>(0);
  const snapFrameRef = useRef<number>(0);
  const animateFnRef = useRef<(() => void) | null>(null);

  // Directly update DOM transform during 60fps physics animations
  const updateTransform = useCallback((x: number, y: number) => {
    posRef.current = { x, y };
    if (btnRef.current) {
      btnRef.current.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    }
  }, []);

  // Save docked position to sessionStorage
  const persistPosition = useCallback((y: number) => {
    try {
      const bounds = getWidgetBounds(SIZE);
      const span = bounds.maxY - bounds.minY;
      const yRatio = span > 0 ? (y - bounds.minY) / span : 0.8;
      const payload: StoredPosition = { side: "right", yRatio: Math.max(0, Math.min(1, yRatio)) };
      sessionStorage.setItem("tezgel_wa_button_pos", JSON.stringify(payload));
    } catch {
      // Ignore storage errors in private browsing
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

  // Smooth dock to right screen edge
  const snapToRightEdge = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    cancelAnimationFrame(snapFrameRef.current);

    const bounds = getWidgetBounds(SIZE);
    const targetX = bounds.maxX; // Always dock to the right edge
    const clampedY = Math.max(bounds.minY, Math.min(bounds.maxY, posRef.current.y));

    isSnappingRef.current = true;
    setIsSnapping(true);
    persistPosition(clampedY);

    const startX = posRef.current.x;
    const startY = posRef.current.y;
    const startTime = performance.now();
    const distance = Math.hypot(targetX - startX, clampedY - startY);
    const duration = Math.min(450, Math.max(260, distance * 0.4));

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      const nextX = startX + (targetX - startX) * eased;
      const nextY = startY + (clampedY - startY) * eased;
      updateTransform(nextX, nextY);

      if (progress < 1) {
        snapFrameRef.current = requestAnimationFrame(step);
      } else {
        isSnappingRef.current = false;
        setIsSnapping(false);
        updateTransform(targetX, clampedY);
        setCoords({ x: targetX, y: clampedY });
      }
    };

    snapFrameRef.current = requestAnimationFrame(step);
  }, [persistPosition, updateTransform]);

  // Wall bounce physics loop
  useEffect(() => {
    animateFnRef.current = () => {
      if (isDraggingRef.current) return;

      const p = posRef.current;
      const v = velRef.current;
      const bounds = getWidgetBounds(SIZE);

      v.x *= FRICTION;
      v.y *= FRICTION;

      let nextX = p.x + v.x;
      let nextY = p.y + v.y;
      let didBounce = false;

      // Elastic bounce off Left & Right walls
      if (nextX <= bounds.minX) {
        nextX = bounds.minX;
        v.x = Math.abs(v.x) * BOUNCE;
        didBounce = true;
      } else if (nextX >= bounds.maxX) {
        nextX = bounds.maxX;
        v.x = -Math.abs(v.x) * BOUNCE;
        didBounce = true;
      }

      // Elastic bounce off Top & Bottom safe bounds
      if (nextY <= bounds.minY) {
        nextY = bounds.minY;
        v.y = Math.abs(v.y) * BOUNCE;
        didBounce = true;
      } else if (nextY >= bounds.maxY) {
        nextY = bounds.maxY;
        v.y = -Math.abs(v.y) * BOUNCE;
        didBounce = true;
      }

      if (didBounce && typeof navigator !== "undefined" && navigator.vibrate) {
        try {
          navigator.vibrate(8);
        } catch {
          // ignore
        }
      }

      updateTransform(nextX, nextY);

      // Check and resolve 2-body collision with Cookie Banner
      widgetPhysicsCoordinator.checkAndResolveCollision();

      // Once momentum dissipates, smoothly snap into dock on the right edge
      const speed = Math.hypot(v.x, v.y);
      if (speed < MIN_VEL) {
        v.x = 0;
        v.y = 0;
        snapToRightEdge();
        return;
      }

      animFrameRef.current = requestAnimationFrame(() => {
        animateFnRef.current?.();
      });
    };
  }, [snapToRightEdge, updateTransform]);

  const startPhysicsAnimation = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    cancelAnimationFrame(snapFrameRef.current);
    animateFnRef.current?.();
  }, []);

  // Register WhatsApp widget in 2-body physics coordinator
  useEffect(() => {
    return widgetPhysicsCoordinator.registerCircle({
      id: "whatsapp-btn",
      mass: 1,
      radius: SIZE / 2,
      getCenter: () => ({
        x: posRef.current.x + SIZE / 2,
        y: posRef.current.y + SIZE / 2,
      }),
      getVel: () => velRef.current,
      applyImpulse: (vx: number, vy: number) => {
        velRef.current.x += vx;
        velRef.current.y += vy;
      },
      displace: (dx: number, dy: number) => {
        const bounds = getWidgetBounds(SIZE);
        const nextX = Math.max(bounds.minX, Math.min(bounds.maxX, posRef.current.x + dx));
        const nextY = Math.max(bounds.minY, Math.min(bounds.maxY, posRef.current.y + dy));
        updateTransform(nextX, nextY);
      },
      wakePhysics: () => {
        startPhysicsAnimation();
      },
    });
  }, [startPhysicsAnimation, updateTransform]);

  // Timers for initial tooltip and badge
  useEffect(() => {
    const tooltipTimer = setTimeout(() => setShowTooltip(true), 5000);
    const badgeTimer = setTimeout(() => setShowBadge(false), 30000);

    return () => {
      clearTimeout(tooltipTimer);
      clearTimeout(badgeTimer);
    };
  }, []);

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

  // Global window pointermove handler (registered during pointer down)
  const onWindowPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isPointerDownRef.current || (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current)) {
        return;
      }

      const totalDx = e.clientX - dragStartPointerRef.current.x;
      const totalDy = e.clientY - dragStartPointerRef.current.y;
      const dist = Math.hypot(totalDx, totalDy);
      const threshold = pointerTypeRef.current === "touch" ? DRAG_THRESHOLD_TOUCH : DRAG_THRESHOLD_MOUSE;

      // Enter drag state once movement exceeds threshold
      if (!isDraggingRef.current && dist > threshold) {
        isDraggingRef.current = true;
        wasDraggedRef.current = true;
        setIsDragging(true);
        setShowTooltip(false);
        setShowBadge(false);

        // Clear accidental text selection
        if (typeof window !== "undefined" && window.getSelection) {
          window.getSelection()?.removeAllRanges();
        }

        if (typeof navigator !== "undefined" && navigator.vibrate) {
          try {
            navigator.vibrate(15);
          } catch {
            // ignore
          }
        }
      }

      if (!isDraggingRef.current) return;

      // Prevent native scroll or text drag while actively dragging the widget
      if (e.cancelable) {
        e.preventDefault();
      }

      const bounds = getWidgetBounds(SIZE);
      const nextX = Math.max(bounds.minX, Math.min(bounds.maxX, dragStartPosRef.current.x + totalDx));
      const nextY = Math.max(bounds.minY, Math.min(bounds.maxY, dragStartPosRef.current.y + totalDy));

      updateTransform(nextX, nextY);

      // Record rolling pointer history (last 120ms) for high-accuracy fling calculation
      const now = performance.now();
      pointerHistoryRef.current.push({ x: e.clientX, y: e.clientY, t: now });
      const cutoff = now - HISTORY_WINDOW_MS;
      pointerHistoryRef.current = pointerHistoryRef.current.filter((sample) => sample.t >= cutoff);
    },
    [updateTransform]
  );

  // Global window pointerup/pointercancel handler
  const onWindowPointerUp = useCallback(
    (e: PointerEvent) => {
      if (!isPointerDownRef.current || (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current)) {
        return;
      }

      isPointerDownRef.current = false;
      pointerIdRef.current = null;
      removeWindowListeners();

      // Case A: User was dragging or flinging the widget
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);

        justFinishedDragRef.current = true;
        setTimeout(() => {
          justFinishedDragRef.current = false;
          wasDraggedRef.current = false;
        }, 200);

        // Compute fling velocity from the rolling history buffer
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

        velRef.current = {
          x: Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, vx)),
          y: Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, vy)),
        };

        const speed = Math.hypot(velRef.current.x, velRef.current.y);
        if (speed > 1.2) {
          startPhysicsAnimation();
        } else {
          snapToRightEdge();
        }
        return;
      }

      // Case B: Clean tap on touch devices
      const duration = Date.now() - pointerDownTimeRef.current;
      if (!wasDraggedRef.current && duration < 400 && pointerTypeRef.current === "touch") {
        trackClick();
        const cleanNumber = companyInfo.socialMedia.whatsapp?.replace(/[^0-9]/g, "");
        const contextMessage = getContextualMessage(pathname);
        openWhatsApp({ phone: cleanNumber, text: contextMessage });
      }
    },
    [pathname, removeWindowListeners, snapToRightEdge, startPhysicsAnimation, trackClick]
  );

  // Pointer down on the anchor element
  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      if (e.button !== 0) return;

      isPointerDownRef.current = true;
      isDraggingRef.current = false;
      wasDraggedRef.current = false;
      justFinishedDragRef.current = false;
      isSnappingRef.current = false;
      setIsDragging(false);
      setIsSnapping(false);

      cancelAnimationFrame(animFrameRef.current);
      cancelAnimationFrame(snapFrameRef.current);
      velRef.current = { x: 0, y: 0 };

      const now = performance.now();
      pointerDownTimeRef.current = Date.now();
      pointerTypeRef.current = e.pointerType || "mouse";
      pointerIdRef.current = e.pointerId;

      dragStartPointerRef.current = { x: e.clientX, y: e.clientY };
      dragStartPosRef.current = { x: posRef.current.x, y: posRef.current.y };
      pointerHistoryRef.current = [{ x: e.clientX, y: e.clientY, t: now }];

      // Attach window listeners to ensure 100% reliable tracking across the entire screen
      windowListenersRef.current = { move: onWindowPointerMove, up: onWindowPointerUp };
      window.addEventListener("pointermove", onWindowPointerMove, { passive: false });
      window.addEventListener("pointerup", onWindowPointerUp, { passive: false });
      window.addEventListener("pointercancel", onWindowPointerUp, { passive: false });
    },
    [onWindowPointerMove, onWindowPointerUp]
  );

  // Click handler
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Disallow link activation if user was dragging or throwing
      if (wasDraggedRef.current || justFinishedDragRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      trackClick();

      // On mobile devices, use direct openWhatsApp launcher to prevent blank tabs
      if (isMobileDevice()) {
        e.preventDefault();
        const cleanNumber = companyInfo.socialMedia.whatsapp?.replace(/[^0-9]/g, "");
        const contextMessage = getContextualMessage(pathname);
        openWhatsApp({ phone: cleanNumber, text: contextMessage });
      }
      // On desktop, the native <a href target="_blank"> handles opening WhatsApp Web seamlessly
    },
    [pathname, trackClick]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      removeWindowListeners();
      cancelAnimationFrame(animFrameRef.current);
      cancelAnimationFrame(snapFrameRef.current);
    };
  }, [removeWindowListeners]);

  // Keep widget clamped on viewport resize
  useEffect(() => {
    const handleResize = () => {
      const bounds = getWidgetBounds(SIZE);
      const clampedX = bounds.maxX; // Always stay docked on the right edge
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

  const whatsappNumber = companyInfo.socialMedia.whatsapp;
  if (!whatsappNumber) return null;

  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
  const contextMessage = getContextualMessage(pathname);
  const whatsappUrl = buildWhatsAppUrl(cleanNumber, contextMessage);

  const isIdle = !isDragging && !isSnapping;

  return (
    <>
      {/* Tooltip (Smart positioning to the left of the docked right button) */}
      {showTooltip && isIdle && (
        <div
          style={{
            position: "fixed",
            zIndex: 9996,
            left: coords.x - 128,
            top: coords.y + 12,
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
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        onClick={onClick}
        onPointerDown={onPointerDown}
        onMouseEnter={() => {
          if (!isDraggingRef.current && !isSnappingRef.current) {
            setShowTooltip(true);
          }
        }}
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
          WebkitUserSelect: "none",
          touchAction: "none",
          cursor: isDragging ? "grabbing" : "grab",
          boxShadow: isDragging
            ? "0 14px 44px rgba(37,211,102,0.7), 0 0 0 6px rgba(37,211,102,0.3)"
            : "0 6px 26px rgba(37,211,102,0.5), 0 0 0 3px rgba(37,211,102,0.22)",
          scale: isDragging ? "1.12" : "1",
          transition: isDragging || isSnapping ? "none" : "box-shadow 0.25s, scale 0.2s",
          willChange: "transform",
        }}
      >
        {/* Notification Badge */}
        {showBadge && (
          <span
            aria-hidden="true"
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
