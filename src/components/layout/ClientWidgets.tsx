"use client";

import dynamic from 'next/dynamic';

const CookieConsent = dynamic(() => import('@/components/common/CookieConsent'), { ssr: false });

// Einwilligungsbanner (KERN K-009). Der WhatsApp-Knopf sitzt seit E3-NACH-06 im Kopf (vorher hier im Leerlauf geladen);
// der Wasser-Cursor ist entfallen (E-008).
export function ClientWidgets() {
  return <CookieConsent />;
}
