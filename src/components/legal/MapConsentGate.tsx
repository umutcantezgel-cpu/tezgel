"use client";

import { useState, useEffect, type CSSProperties } from "react";
import clsx from "clsx";
import { useConsent } from "@/hooks/useConsent";
import Icon from "@/components/icons/Icon";
import { etikettKlassen, knopfKlassen } from "@/components/kern/stile";

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

  // Ein Rahmen mit fester Höhe für Platzhalter und geladene Karte: kein Sprung beim Laden (CLS).
  const rahmen = clsx("karten-hoehe relative w-full overflow-hidden border border-fuge bg-fliese", className);
  const rahmenStil = {
    "--karten-hoehe": typeof height === "number" ? `${height}px` : height,
  } as CSSProperties;

  if (!isHydrated) {
    return (
      <div className={rahmen} style={rahmenStil}>
        <div className="flex h-full flex-col p-6">
          <span className={etikettKlassen}>
            <Icon name="schloss" groesse={4} />
            Karte
          </span>
        </div>
      </div>
    );
  }

  const hasConsent = manualAccepted || consent?.marketing;

  if (hasConsent) {
    if (children) {
      return (
        <div className={rahmen} style={rahmenStil}>
          <div className="h-full w-full">{children}</div>
        </div>
      );
    }
    if (src) {
      return (
        <div className={rahmen} style={rahmenStil}>
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={src}
            title={title}
            className="block h-full w-full border-0"
          />
        </div>
      );
    }
  }

  return (
    <div className={rahmen} style={rahmenStil}>
      <div className="flex h-full flex-col p-6">
        <span className={etikettKlassen}>
          <Icon name="schloss" groesse={4} />
          Karte
        </span>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-6 text-center">
          <p className="font-text text-fs-3 font-semibold text-tinte">Interaktive Karte geschützt (DSGVO)</p>
          <p className="max-w-md font-text text-fs-2 text-tinte-2">
            Um die interaktive Google Maps Karte mit Standorten und Routen anzuzeigen, ist Ihre Einwilligung in externe
            Medien erforderlich.
          </p>
          <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button type="button" onClick={handleAccept} className={knopfKlassen("haupt", "w-full sm:w-auto")}>
              Karte laden & zustimmen
            </button>
            <button type="button" onClick={openSettings} className={knopfKlassen("neben", "w-full sm:w-auto")}>
              Cookie-Einstellungen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapConsentGate;
