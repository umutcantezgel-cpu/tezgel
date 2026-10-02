"use client";

import { useState, useEffect } from "react";
import { MapPin, Settings2 } from "lucide-react";
import { useConsent } from "@/hooks/useConsent";

interface MapConsentGateProps {
  children?: React.ReactNode;
  src?: string;
  title?: string;
  className?: string;
  height?: string | number;
}

export function MapConsentGate({
  children,
  src,
  title = "Google Maps Standort",
  className = "",
  height = "420px",
}: MapConsentGateProps) {
  const { consent, updateConsent, openSettings } = useConsent();
  const [isHydrated, setIsHydrated] = useState(false);
  const [manualAccepted, setManualAccepted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
  }, []);

  const handleAccept = () => {
    setManualAccepted(true);
    updateConsent({ marketing: true, analytics: consent?.analytics ?? false });
  };

  if (!isHydrated) {
    return (
      <div
        style={{ minHeight: height }}
        className={`w-full bg-neutral-100 rounded-2xl animate-pulse ${className}`}
      />
    );
  }

  const hasConsent = manualAccepted || consent?.marketing;

  if (hasConsent) {
    if (children) {
      return <div className={className}>{children}</div>;
    }
    if (src) {
      return (
        <iframe
          width="100%"
          height={height}
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={src}
          title={title}
          className={`rounded-2xl ${className}`}
        />
      );
    }
  }

  return (
    <div
      style={{ minHeight: height }}
      className={`relative w-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-850 to-neutral-950 rounded-2xl text-center px-6 py-10 overflow-hidden border border-neutral-800 text-white ${className}`}
    >
      <div
        className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-orange-600/20 border border-orange-500/30 flex items-center justify-center mb-4 text-orange-400">
          <MapPin className="w-7 h-7 animate-pulse" />
        </div>

        <div className="font-bold text-white text-xl mb-2">
          Interaktive Karte geschützt (DSGVO)
        </div>

        <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6">
          Um die interaktive Google Maps Karte mit Standorten und Routen anzuzeigen,
          ist Ihre Einwilligung in externe Medien erforderlich.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <button
            type="button"
            onClick={handleAccept}
            className="h-11 px-6 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer"
          >
            Karte laden & zustimmen
          </button>

          <button
            type="button"
            onClick={openSettings}
            className="h-11 px-4 flex items-center justify-center gap-2 text-xs font-semibold text-neutral-300 hover:bg-white/10 transition-colors rounded-xl border border-white/10 cursor-pointer"
          >
            <Settings2 className="w-4 h-4" />
            Cookie-Einstellungen
          </button>
        </div>
      </div>
    </div>
  );
}

export default MapConsentGate;
