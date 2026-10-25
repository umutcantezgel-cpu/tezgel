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
 * ✅ Jederzeit reaktivierbar via #cookie-settings & Widerrufs-Knopf
 * Darstellung (KERN K-009): Schriftfeld – mobil über der unteren Leiste, am Desktop links unten (≤ 28rem);
 * ruhig, ohne Ziehen und ohne Schatten. Inhalt, Reihenfolge, Knopfnamen und Logik wie im Bestand;
 * die Logik liegt im Hook useEinwilligungsBanner (src/lib/formulare, P3-00p).
 * ══════════════════════════════════════════════════════════════
 */

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEinwilligungsBanner } from "@/lib/formulare/useEinwilligungsBanner";
import { CONSENT_CATEGORY_INFO, COOKIE_INVENTORY, type ConsentCategory } from "@/lib/cookie-inventory";
import Icon from "@/components/icons/Icon";
import { knopfKlassen, linkKlassen } from "@/components/kern/stile";

const marke = "inline-flex items-center font-mono text-fs-1";

export default function CookieConsent() {
  // Steuerlogik (Einstellungszustände, #cookie-settings, Ereignis openCookieSettings, Handler) im gemeinsamen Hook
  // useEinwilligungsBanner (P3-00p) – dieselbe Logik wie die Kern-Ansicht; hier nur das Markup.
  const {
    consent,
    showBanner,
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
  } = useEinwilligungsBanner();

  // Plätze des Widerruf-Schilds: unter lg das erste Feld der unteren Leiste, sonst die Rechtszeile im Fuß (E3-NACH-06 –
  // keine schwebende Ebene mehr über dem Inhalt). Das Schild bleibt dieser Knopf mit dieser Logik; es wird nur dorthin
  // eingehängt, sobald die Komponente geladen ist. Je Breite ist genau ein Schild sichtbar.
  const pathname = usePathname();
  const [schildPlatz, setSchildPlatz] = useState<HTMLElement | null>(null);
  const [fussPlatz, setFussPlatz] = useState<HTMLElement | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSchildPlatz(document.getElementById("leiste-schild"));
    setFussPlatz(document.getElementById("fuss-schild"));
  }, [pathname]);

  return (
    <>
      {showBanner && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Cookie-Einwilligungsbanner gemäß DSGVO und TTDSG"
          aria-describedby="cookie-consent-description"
          className="hoehe-banner ueber-leiste-12 fixed left-0 right-0 z-50 overflow-y-auto overscroll-contain border-t border-tinte bg-fliese text-tinte lg:bottom-6 lg:left-6 lg:right-auto lg:w-full lg:max-w-md lg:border"
        >
          {!showSettings ? (
            /* ── Banner View ── */
            <div className="p-4 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <p className="pt-2 text-fs-3 font-semibold text-tinte">
                  <span>Privatsphäre & Cookie-Einstellungen</span>
                </p>
                {/* Close button = Nur Essentiell */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="-mr-2 inline-flex size-11 shrink-0 items-center justify-center text-tinte-2 transition-colors dauer-1 ease-setzen hover:text-tinte"
                  aria-label="Cookie-Banner schließen – nur essentielle Cookies werden gesetzt"
                  title="Schließen = Nur essentielle Cookies"
                  data-motion="zustand"
                >
                  <Icon name="schliessen" groesse={4} />
                </button>
              </div>
              {/* Zwei Blöcke statt einem: kein Textblock des Banners wird größer als die Überschrift der Seite (LCP). */}
              <p id="cookie-consent-description" className="mt-2 text-fs-1 text-tinte-2">
                <span className="block">
                  Wir nutzen Cookies auf unserer Website. Einige sind <strong className="font-semibold text-tinte">technisch notwendig</strong> für den Betrieb,
                  während andere uns helfen, unser Online-Angebot zu verbessern und interaktive Karten bereitzustellen.
                </span>
                <span className="mt-2 block">
                  Nicht-essentielle Cookies setzen wir nur mit Ihrer Einwilligung (§25 TTDSG, Art. 6 Abs. 1 lit. a DSGVO).{" "}
                  <Link
                    href="/datenschutz"
                    className={clsx(linkKlassen, "inline-flex items-center gap-1 font-semibold")}
                    aria-label="Datenschutzerklärung von Fliesenverlegung Tezgel lesen"
                  >
                    Datenschutz
                    <Icon name="link-extern" groesse={4} />
                  </Link>
                  {" · "}
                  <Link href="/impressum" className={clsx(linkKlassen, "font-semibold")}>
                    Impressum
                  </Link>
                </span>
              </p>

              {/* Current consent status (shown on re-open) */}
              {consent && consent.timestamp && (
                <div className="mt-4 border-l-2 border-strich bg-kalk px-3 py-2 text-fs-1 text-tinte">
                  <strong className="font-semibold">Aktueller Status:</strong>{" "}
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

              {/* Action Buttons: "Ablehnen" ist gleichwertig zu "Akzeptieren" (gleiche Form, gleiche Größe). Bei großer
                  Systemschrift ist der Banner höher als sein Platz und scrollt in sich; die Knopfreihe klebt dann an seinem
                  unteren Rand, damit alle drei Wahlen ohne Suchen im Bild stehen (Tor E3, Probelauf P1; Text, Knöpfe und
                  Verhalten unverändert, G8). Passt alles hinein, ändert sich nichts. */}
              <div className="sticky bottom-0 mt-4 grid grid-cols-2 gap-2 bg-fliese">
                <button type="button" onClick={handleAcceptAll} className={knopfKlassen("haupt", "px-3")} data-motion="druck">
                  Alle akzeptieren
                </button>
                <button type="button" onClick={handleDeclineAll} className={knopfKlassen("haupt", "px-3")} data-motion="druck">
                  Alle ablehnen
                </button>
                <button type="button" onClick={handleOpenSettings} className={knopfKlassen("text", "col-span-2 justify-center")}>
                  Einstellungen
                </button>
              </div>
            </div>
          ) : (
            /* ── Settings View (Granular) ── */
            <div className="p-4 md:p-6">
              <div className="flex items-center gap-3">
                <Icon name="schloss" groesse={5} className="text-tinte-2" />
                <p className="text-fs-3 font-semibold text-tinte">
                  Cookie-Einstellungen individuell anpassen
                </p>
              </div>
              <p className="mt-2 text-fs-1 text-tinte-2">
                Bestimmen Sie selbst, welche Kategorien Sie zulassen möchten. Technisch notwendige Cookies
                sind für den reibungslosen Betrieb erforderlich und können nicht abgewählt werden (§25 Abs. 2 TTDSG).
              </p>

              <div className="mt-4 border-t border-fuge">
                {(Object.entries(CONSENT_CATEGORY_INFO) as [ConsentCategory, (typeof CONSENT_CATEGORY_INFO)[ConsentCategory]][]).map(
                  ([key, info]) => {
                    const relatedCookies = COOKIE_INVENTORY.filter((c) => c.category === key);
                    const isExpanded = expandedCategory === key;
                    const isChecked = key === "essential" ? true : key === "analytics" ? analyticsChecked : marketingChecked;
                    const umschalten = () => {
                      if (key === "analytics") setAnalyticsChecked(!analyticsChecked);
                      if (key === "marketing") setMarketingChecked(!marketingChecked);
                    };

                    return (
                      <div key={key} className="border-b border-fuge">
                        <div
                          className={clsx("flex items-start gap-3 py-3", !info.required && "cursor-pointer transition-colors dauer-1 ease-setzen hover:bg-kalk")}
                          onClick={!info.required ? umschalten : undefined}
                          role={!info.required ? "button" : undefined}
                          aria-pressed={!info.required ? isChecked : undefined}
                          tabIndex={!info.required ? 0 : undefined}
                          onKeyDown={
                            !info.required
                              ? (e) => {
                                  if (e.key === " " || e.key === "Enter") {
                                    e.preventDefault();
                                    umschalten();
                                  }
                                }
                              : undefined
                          }
                        >
                          <span
                            className={clsx(
                              "mt-1 inline-flex size-5 shrink-0 items-center justify-center border",
                              isChecked ? (info.required ? "border-abnahme bg-abnahme text-kalk" : "border-tinte bg-tinte text-kalk") : "border-strich bg-fliese"
                            )}
                            aria-hidden="true"
                          >
                            {isChecked && <Icon name="haken" groesse={4} />}
                          </span>

                          <span className="flex-1">
                            <span className="flex flex-wrap items-center gap-2 text-fs-2 font-semibold">
                              <span className={info.required ? "text-abnahme" : "text-tinte"}>{info.label}</span>
                              {info.required ? (
                                <span className={clsx(marke, "text-abnahme")}>Erforderlich</span>
                              ) : isChecked ? (
                                <span className={clsx(marke, "text-tinte")}>Aktiviert</span>
                              ) : null}
                            </span>
                            <span className="mt-1 block text-fs-1 text-tinte-2">{info.description}</span>
                          </span>
                        </div>

                        {/* Cookie Details Expansion */}
                        {relatedCookies.length > 0 && (
                          <>
                            <button
                              type="button"
                              onClick={() => setExpandedCategory(isExpanded ? null : key)}
                              aria-expanded={isExpanded}
                              className="flex min-h-11 w-full items-center justify-between gap-2 text-fs-1 font-semibold text-tinte-2 transition-colors dauer-1 ease-setzen hover:text-tinte"
                              data-motion="zustand"
                            >
                              <span>{relatedCookies.length} Cookie(s) & Details einsehen</span>
                              <Icon name="winkel-unten" groesse={4} className={isExpanded ? "rotate-180" : undefined} />
                            </button>
                            {isExpanded && (
                              <div className="flex flex-col gap-2 pb-3">
                                {relatedCookies.map((cookie) => (
                                  <div key={cookie.name} className="border border-fuge bg-kalk p-3 text-fs-1">
                                    <div className="flex items-center justify-between gap-2">
                                      <code className="font-mono font-semibold text-tinte">{cookie.name}</code>
                                      <span className="font-mono text-tinte-2">{cookie.duration}</span>
                                    </div>
                                    <p className="mt-1 text-tinte">{cookie.purpose}</p>
                                    <p className="mt-1 font-mono text-tinte-2">Anbieter: {cookie.provider}</p>
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

              {/* Settings Action Buttons: Akzeptieren und Ablehnen gleichwertig */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button type="button" onClick={handleSaveSettings} className={knopfKlassen("haupt", "col-span-2")} data-motion="druck">
                  Auswahl speichern
                </button>
                <button type="button" onClick={handleAcceptAll} className={knopfKlassen("neben", "px-3")} data-motion="druck">
                  Alle akzeptieren
                </button>
                <button type="button" onClick={handleDeclineAll} className={knopfKlassen("neben", "px-3")} data-motion="druck">
                  Alle ablehnen
                </button>
                <button type="button" onClick={() => setShowSettings(false)} className={knopfKlassen("text", "col-span-2 justify-center")}>
                  Zurück
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Widerruf jederzeit (Art. 7 Abs. 3 DSGVO): flacher Knopf. Unter lg im ersten Feld der unteren Leiste, ab lg und auf
          Seiten ohne Leiste in der Rechtszeile des Fußes (eingehängt per Portal, dieselbe Logik). */}
      {!showBanner && schildPlatz && createPortal(
        <button
          type="button"
          onClick={handleShieldClick}
          className="flex size-full items-center justify-center text-tinte-2 hover:bg-fliese hover:text-tinte"
          aria-label="Cookie-Einstellungen verwalten"
          title="Cookie-Einstellungen öffnen"
          data-motion="zustand"
        >
          <Icon name="schloss" groesse={5} />
        </button>,
        schildPlatz,
      )}
      {!showBanner && fussPlatz && createPortal(
        <button
          type="button"
          onClick={handleShieldClick}
          className="hidden min-h-11 items-center gap-2 py-1 text-kalk underline decoration-nacht-fuge underline-offset-4 transition-colors dauer-1 ease-setzen hover:decoration-kalk lg:inline-flex"
          aria-label="Cookie-Einstellungen verwalten"
          title="Cookie-Einstellungen öffnen"
          data-motion="zustand"
        >
          <Icon name="schloss" groesse={4} />
          <span>Cookie-Einstellungen</span>
        </button>,
        fussPlatz,
      )}
    </>
  );
}
