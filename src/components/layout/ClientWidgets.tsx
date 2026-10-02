"use client";

import dynamic from 'next/dynamic';

const FloatingWhatsAppWidget = dynamic(() => import('@/components/common/FloatingWhatsAppWidget'), { ssr: false });
const ConsentManager = dynamic(() => import('@/components/common/ConsentManager'), { ssr: false });

export function ClientWidgets() {
  return (
    <>
      <FloatingWhatsAppWidget />
      <ConsentManager />
    </>
  );
}
