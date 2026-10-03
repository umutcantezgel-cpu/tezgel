"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const WaterCursor = dynamic(() => import('@/components/ui/WaterCursor'), { ssr: false });
const FloatingWhatsAppWidget = dynamic(() => import('@/components/common/FloatingWhatsAppWidget'), { ssr: false });
const CookieConsent = dynamic(() => import('@/components/common/CookieConsent'), { ssr: false });

export function ClientWidgets() {
  const [isIdleReady, setIsIdleReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('requestIdleCallback' in window) {
      const id = (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => number }).requestIdleCallback(
        () => setIsIdleReady(true),
        { timeout: 1500 }
      );
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
        }
      };
    } else {
      const timer = setTimeout(() => setIsIdleReady(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <CookieConsent />
      {isIdleReady && (
        <>
          <WaterCursor tint="aqua" />
          <FloatingWhatsAppWidget />
        </>
      )}
    </>
  );
}
