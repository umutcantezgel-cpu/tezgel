// Logik der Karten-Einwilligung (F-12, MapConsentGate) – wörtlich aus der Komponente verschoben (P3-00l).
// Ohne Markup; Bestand und Kern-Ansicht nutzen denselben Hook.
import { useState, useEffect } from "react";
import { useConsent } from "@/hooks/useConsent";

export function useKartenEinwilligung() {
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

  const hasConsent = manualAccepted || consent?.marketing;

  return { isHydrated, hasConsent, handleAccept, openSettings };
}
