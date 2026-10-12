"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const FloatingWhatsAppWidget = dynamic(() => import('@/components/common/FloatingWhatsAppWidget'), { ssr: false });
const CookieConsent = dynamic(() => import('@/components/common/CookieConsent'), { ssr: false });

// Einwilligungsbanner sofort, WhatsApp-Knopf im Leerlauf (KERN K-009). Der Wasser-Cursor ist entfallen (E-008).
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
      {isIdleReady && <FloatingWhatsAppWidget />}
    </>
  );
}
