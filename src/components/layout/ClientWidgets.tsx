"use client";

import dynamic from 'next/dynamic';

const WaterCursor = dynamic(() => import('@/components/ui/WaterCursor'), { ssr: false });
const FloatingWhatsAppWidget = dynamic(() => import('@/components/common/FloatingWhatsAppWidget'), { ssr: false });
const CookieConsent = dynamic(() => import('@/components/common/CookieConsent'), { ssr: false });

export function ClientWidgets() {
  return (
    <>
      <WaterCursor tint="aqua" />
      <FloatingWhatsAppWidget />
      <CookieConsent />
    </>
  );
}
