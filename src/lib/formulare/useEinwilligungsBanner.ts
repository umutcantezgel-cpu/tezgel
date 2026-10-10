// Steuerlogik des Einwilligungsbanners (F-11, CookieConsent) – wörtlich aus der Komponente verschoben (P3-00p).
// Ohne Markup; Bestand und Kern-Ansicht nutzen denselben Hook. Physik, Ziehen, ResizeObserver, Positionen und
// widgetPhysicsCoordinator bleiben in der Komponente.
import { useState, useEffect } from "react";
import { useConsent } from "@/hooks/useConsent";
import { type ConsentCategory } from "@/lib/cookie-inventory";

export function useEinwilligungsBanner() {
  const {
    consent,
    showBanner,
    acceptAll,
    acceptEssentialOnly,
    updateConsent,
    setShowBanner,
  } = useConsent();

  const [showSettings, setShowSettings] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<ConsentCategory | null>(null);

  // Global event listener to listen for `#cookie-settings` in the URL
  useEffect(() => {
    const handleOpenSettingsEvent = () => {
      setShowBanner(true);
      setShowSettings(true);
      if (consent) {
        setAnalyticsChecked(consent.analytics);
        setMarketingChecked(consent.marketing);
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === "#cookie-settings") {
        handleOpenSettingsEvent();
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };

    if (window.location.hash === "#cookie-settings") {
      handleHashChange();
    }

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("openCookieSettings", handleOpenSettingsEvent);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("openCookieSettings", handleOpenSettingsEvent);
    };
  }, [consent, setShowBanner]);

  const handleSaveSettings = () => {
    updateConsent({
      analytics: analyticsChecked,
      marketing: marketingChecked,
    });
    setShowSettings(false);
  };

  const handleClose = () => {
    acceptEssentialOnly();
    setShowSettings(false);
  };

  const handleOpenSettings = () => {
    setAnalyticsChecked(consent?.analytics ?? false);
    setMarketingChecked(consent?.marketing ?? false);
    setShowSettings(true);
  };

  const handleDeclineAll = () => {
    setAnalyticsChecked(false);
    setMarketingChecked(false);
    acceptEssentialOnly();
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    setAnalyticsChecked(true);
    setMarketingChecked(true);
    acceptAll();
    setShowSettings(false);
  };

  // Schild „Cookie-Einstellungen verwalten“ (vorher inline `onClick` im Markup), Körper wörtlich.
  const handleShieldClick = () => {
    setShowBanner(true);
    setShowSettings(true);
    setAnalyticsChecked(consent?.analytics ?? false);
    setMarketingChecked(consent?.marketing ?? false);
  };

  return {
    consent,
    showBanner,
    setShowBanner,
    showSettings,
    setShowSettings,
    analyticsChecked,
    setAnalyticsChecked,
    marketingChecked,
    setMarketingChecked,
    expandedCategory,
    setExpandedCategory,
    handleSaveSettings,
    handleClose,
    handleOpenSettings,
    handleDeclineAll,
    handleAcceptAll,
    handleShieldClick,
  };
}
