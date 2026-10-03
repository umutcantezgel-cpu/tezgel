"use client";

import React, { useState, useEffect } from "react";
import { MotionConfig } from "framer-motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const triggerHydration = () => {
      setHasInteracted(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("scroll", triggerHydration);
      window.removeEventListener("touchstart", triggerHydration);
      window.removeEventListener("pointerdown", triggerHydration);
      window.removeEventListener("keydown", triggerHydration);
    };

    window.addEventListener("scroll", triggerHydration, { passive: true, once: true });
    window.addEventListener("touchstart", triggerHydration, { passive: true, once: true });
    window.addEventListener("pointerdown", triggerHydration, { passive: true, once: true });
    window.addEventListener("keydown", triggerHydration, { passive: true, once: true });

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => number }).requestIdleCallback(
        triggerHydration,
        { timeout: 2500 }
      );
      return () => {
        cleanup();
        if ("cancelIdleCallback" in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
        }
      };
    } else {
      const timeoutId = setTimeout(triggerHydration, 2000);
      return () => {
        cleanup();
        clearTimeout(timeoutId);
      };
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div data-motion-hydrated={hasInteracted ? "true" : "false"} className="contents">
        {children}
      </div>
    </MotionConfig>
  );
}

export default MotionProvider;

