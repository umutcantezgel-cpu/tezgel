"use client";

/**
 * ══════════════════════════════════════════════════════════════
 * DSGVO + TTDSG Cookie-Consent Banner - Fliesenverlegung Tezgel
 * ══════════════════════════════════════════════════════════════
 * Compliance-Kriterien:
 * ✅ "Alle ablehnen" gleichwertig prominent wie "Alle akzeptieren" (§25 TTDSG)
 * ✅ Keine vorangekreuzten nicht-essentiellen Checkboxen (Art. 7 DSGVO)
 * ✅ Schließen = "Nur Essentiell" (kein Default-Opt-In)
 * ✅ Klare Zweckbeschreibung pro Cookie-Kategorie
 * ✅ Verlinkung zu /datenschutz & /impressum
 * ✅ Consent-Timestamp & Versionierung im Cookie gespeichert
 * ✅ Jederzeit reaktivierbar via #cookie-settings & Floating-Shield
 * ✅ Brand-Design im Fliesenverlegung Tezgel Orange & Charcoal
 * ══════════════════════════════════════════════════════════════
 */

import { useState, useEffect } from "react";
import { useConsent } from "@/hooks/useConsent";
import { CONSENT_CATEGORY_INFO, COOKIE_INVENTORY, type ConsentCategory } from "@/lib/cookie-inventory";
import { Shield, X, Cookie, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
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

  return (
    <>
      {showBanner && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Cookie-Einwilligungsbanner gemäß DSGVO und TTDSG"
          aria-describedby="cookie-consent-description"
          className="fixed bottom-0 left-0 right-0 z-[9999] p-3 sm:p-4 md:p-6 pb-[max(1.25rem,calc(env(safe-area-inset-bottom)+76px))] md:pb-6 pointer-events-none animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="pointer-events-auto mx-auto max-w-4xl max-h-[85vh] overflow-y-auto overscroll-contain rounded-2xl border border-neutral-200 bg-white shadow-[0_-8px_35px_rgba(0,0,0,0.16)] backdrop-blur-xl">
            {!showSettings ? (
              /* ── Banner View ── */
              <div className="p-5 sm:p-6 md:p-6 relative">
                {/* Close button = Nur Essentiell */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute top-3 right-3 p-2 text-neutral-400 hover:text-neutral-900 transition-colors rounded-lg hover:bg-neutral-100"
                  aria-label="Cookie-Banner schließen – nur essentielle Cookies werden gesetzt"
                  title="Schließen = Nur essentielle Cookies"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="hidden sm:flex shrink-0 w-11 h-11 rounded-xl bg-orange-50 border border-orange-200/60 items-center justify-center">
                    <Cookie className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1 pr-6">
                    <h2 className="text-base font-bold text-neutral-900 mb-1.5 flex items-center gap-2">
                      <span>Privatsphäre & Cookie-Einstellungen</span>
                    </h2>
                    <p id="cookie-consent-description" className="text-sm text-neutral-700 leading-relaxed mb-4">
                      Wir nutzen Cookies auf unserer Website. Einige sind <strong>technisch notwendig</strong> für den Betrieb, 
                      während andere uns helfen, unser Online-Angebot zu verbessern und interaktive Karten bereitzustellen. 
                      Nicht-essentielle Cookies setzen wir nur mit Ihrer Einwilligung (§25 TTDSG, Art. 6 Abs. 1 lit. a DSGVO).{" "}
                      <Link
                        href="/datenschutz"
                        className="underline hover:text-neutral-900 transition-colors inline-flex items-center gap-1 font-medium"
                        aria-label="Datenschutzerklärung von Fliesenverlegung Tezgel lesen"
                      >
                        Datenschutz
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                      {" · "}
                      <Link
                        href="/impressum"
                        className="underline hover:text-neutral-900 transition-colors font-medium"
                      >
                        Impressum
                      </Link>
                    </p>

                    {/* Current consent status (shown on re-open) */}
                    {consent && consent.timestamp && (
                      <div className="bg-orange-50/70 border border-orange-200/80 rounded-xl px-3.5 py-2.5 mb-4 text-xs text-orange-950">
                        <strong>Aktueller Status:</strong>{" "}
                        {consent.analytics && consent.marketing
                          ? "Alle Cookies akzeptiert"
                          : consent.analytics
                            ? "Analyse erlaubt · Marketing abgelehnt"
                            : consent.marketing
                              ? "Marketing erlaubt · Analyse abgelehnt"
                              : "Nur technisch notwendige Cookies"}
                        {" "}(seit {new Date(consent.timestamp).toLocaleDateString("de-DE")})
                      </div>
                    )}

                    {/* Action Buttons: "Ablehnen" ist gleichwertig zu "Akzeptieren" */}
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <button
                        type="button"
                        onClick={handleAcceptAll}
                        className="px-5 py-2.5 bg-orange-700 hover:bg-orange-800 active:scale-[0.99] text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-sm min-h-[44px] flex-1 text-center"
                      >
                        Alle akzeptieren
                      </button>
                      <button
                        type="button"
                        onClick={handleDeclineAll}
                        className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 active:scale-[0.99] text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-sm min-h-[44px] flex-1 text-center"
                      >
                        Alle ablehnen
                      </button>
                      <button
                        type="button"
                        onClick={handleOpenSettings}
                        className="px-5 py-2.5 text-neutral-700 hover:text-neutral-950 text-sm font-semibold transition-colors underline-offset-4 hover:underline min-h-[44px] text-center"
                      >
                        Einstellungen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ── Settings View (Granular) ── */
              <div className="p-5 sm:p-6 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-orange-600 shrink-0" />
                  <h2 className="text-base font-bold text-neutral-900">
                    Cookie-Einstellungen individuell anpassen
                  </h2>
                </div>
                <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                  Bestimmen Sie selbst, welche Kategorien Sie zulassen möchten. Technisch notwendige Cookies 
                  sind für den reibungslosen Betrieb erforderlich und können nicht abgewählt werden (§25 Abs. 2 TTDSG).
                </p>

                <div className="space-y-3 mb-5">
                  {(Object.entries(CONSENT_CATEGORY_INFO) as [ConsentCategory, (typeof CONSENT_CATEGORY_INFO)[ConsentCategory]][]).map(
                    ([key, info]) => {
                      const relatedCookies = COOKIE_INVENTORY.filter((c) => c.category === key);
                      const isExpanded = expandedCategory === key;
                      const isChecked = key === "essential" ? true : key === "analytics" ? analyticsChecked : marketingChecked;

                      return (
                        <div
                          key={key}
                          className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                            info.required
                              ? "border-emerald-200 bg-emerald-50/20"
                              : isChecked
                                ? "border-orange-500 bg-orange-50/10 shadow-sm"
                                : "border-neutral-200 hover:border-neutral-300"
                          }`}
                        >
                          <div
                            className={`flex items-start gap-3.5 p-3.5 sm:p-4 transition-colors ${
                              !info.required ? "cursor-pointer" : ""
                            }`}
                            onClick={
                              !info.required
                                ? () => {
                                    if (key === "analytics") setAnalyticsChecked(!analyticsChecked);
                                    if (key === "marketing") setMarketingChecked(!marketingChecked);
                                  }
                                : undefined
                            }
                            role={!info.required ? "button" : undefined}
                            tabIndex={!info.required ? 0 : undefined}
                            onKeyDown={
                              !info.required
                                ? (e) => {
                                    if (e.key === " " || e.key === "Enter") {
                                      e.preventDefault();
                                      if (key === "analytics") setAnalyticsChecked(!analyticsChecked);
                                      if (key === "marketing") setMarketingChecked(!marketingChecked);
                                    }
                                  }
                                : undefined
                            }
                          >
                            <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                              <div
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                                  isChecked
                                    ? info.required
                                      ? "bg-emerald-600 border-emerald-600 text-white"
                                      : "bg-orange-600 border-orange-600 text-white"
                                    : "bg-white border-neutral-300"
                                }`}
                                aria-hidden="true"
                              >
                                {isChecked && (
                                  <svg
                                    className="w-3.5 h-3.5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                            </div>

                            <div className="flex-1">
                              <span className="text-sm font-semibold flex items-center gap-2 flex-wrap mb-1">
                                <span
                                  className={
                                    info.required
                                      ? "text-emerald-900"
                                      : isChecked
                                        ? "text-neutral-900"
                                        : "text-neutral-700"
                                  }
                                >
                                  {info.label}
                                </span>
                                {info.required ? (
                                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    Erforderlich
                                  </span>
                                ) : isChecked ? (
                                  <span className="text-[10px] font-bold text-orange-800 bg-orange-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    Aktiviert
                                  </span>
                                ) : null}
                              </span>
                              <p className={`text-xs leading-relaxed ${isChecked ? "text-neutral-700" : "text-neutral-500"}`}>
                                {info.description}
                              </p>
                            </div>
                          </div>

                          {/* Cookie Details Expansion */}
                          {relatedCookies.length > 0 && (
                            <>
                              <button
                                type="button"
                                onClick={() => setExpandedCategory(isExpanded ? null : key)}
                                className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50 transition-colors border-t border-neutral-100"
                              >
                                <span>{relatedCookies.length} Cookie(s) & Details einsehen</span>
                                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                              </button>
                              {isExpanded && (
                                <div className="px-3.5 pb-3 space-y-2 bg-neutral-50/60 border-t border-neutral-100">
                                  {relatedCookies.map((cookie) => (
                                    <div
                                      key={cookie.name}
                                      className="bg-white border border-neutral-200/80 rounded-lg p-2.5 text-xs mt-2"
                                    >
                                      <div className="flex items-center justify-between mb-0.5">
                                        <code className="font-mono font-bold text-neutral-900 bg-neutral-100 px-1.5 py-0.5 rounded text-[11px]">
                                          {cookie.name}
                                        </code>
                                        <span className="text-neutral-500 text-[11px]">{cookie.duration}</span>
                                      </div>
                                      <p className="text-neutral-600 mt-1">{cookie.purpose}</p>
                                      <p className="text-neutral-400 text-[10px] mt-0.5">Anbieter: {cookie.provider}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>

                {/* Settings Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={handleSaveSettings}
                    className="px-5 py-2.5 bg-orange-700 hover:bg-orange-800 active:scale-[0.99] text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-sm min-h-[44px] flex-1 text-center"
                  >
                    Auswahl speichern
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 active:scale-[0.99] text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-sm min-h-[44px] flex-1 text-center"
                  >
                    Alle akzeptieren
                  </button>
                  <button
                    type="button"
                    onClick={handleDeclineAll}
                    className="px-5 py-2.5 bg-white border border-neutral-300 hover:bg-neutral-50 active:scale-[0.99] text-neutral-800 text-sm font-bold rounded-xl transition-all duration-200 min-h-[44px] flex-1 text-center"
                  >
                    Alle ablehnen
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSettings(false)}
                    className="px-5 py-2.5 text-neutral-600 hover:text-neutral-900 text-sm font-semibold transition-colors min-h-[44px] text-center"
                  >
                    Zurück
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Shield Badge: Einfacher Widerruf jederzeit möglich */}
      {!showBanner && (
        <button
          type="button"
          onClick={() => {
            setShowBanner(true);
            setShowSettings(true);
            setAnalyticsChecked(consent?.analytics ?? false);
            setMarketingChecked(consent?.marketing ?? false);
          }}
          className="fixed bottom-4 left-4 z-[9995] w-10 h-10 md:w-11 md:h-11 bg-white/95 backdrop-blur-md rounded-full shadow-[0_4px_18px_rgba(0,0,0,0.12)] border border-neutral-200/90 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 text-neutral-700 hover:text-orange-600 group"
          aria-label="Cookie-Einstellungen verwalten"
          title="Cookie-Einstellungen öffnen"
        >
          <div className="relative">
            <Shield className="w-4 h-4 md:w-5 md:h-5 text-neutral-600 group-hover:text-orange-600 transition-colors" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white shadow-xs" />
          </div>
        </button>
      )}
    </>
  );
}
