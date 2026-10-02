"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInView } from "framer-motion";

const ContactPremiumMap = dynamic(
  () => import("@/components/maps/ContactPremiumMap"),
  {
    ssr: false,
    loading: () => <MapFallback />,
  }
);

function MapFallback() {
  return (
    <div className="h-[450px] w-full rounded-3xl bg-neutral-100 border border-neutral-200 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-9 w-9 animate-spin rounded-full border-3 border-neutral-200 border-t-orange-600" />
        <span className="text-sm font-medium text-neutral-500">Karte wird geladen...</span>
      </div>
    </div>
  );
}

export default function ContactMapWrapper({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <div ref={ref} className={`w-full ${className}`}>
      {isInView ? <ContactPremiumMap /> : <MapFallback />}
    </div>
  );
}
