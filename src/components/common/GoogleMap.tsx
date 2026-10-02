"use client";

import React, { useState } from 'react';
import { MapPin, ExternalLink, Navigation, ShieldCheck, Eye } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { useConsent } from '@/hooks/useConsent';

interface GoogleMapProps {
  /** Zieladresse für die Karte (Standard: Betriebssitz Aßlar) */
  address?: string;
  /** Direkter Google Maps Link für Navigation (Standard: COMPANY_DATA.headquarters.mapsUrl) */
  mapsUrl?: string;
  /** Titel des Standorts */
  title?: string;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Höhe der Karte (Standard: 380px) */
  height?: string | number;
  /** Ob die Karte sofort geladen werden soll (sofern Marketing-Consent aktiv) */
  autoLoadWithConsent?: boolean;
}

/**
 * ══════════════════════════════════════════════════════════════
 * DSGVO-konforme Google Maps Standort-Komponente (2-Klick-Lösung)
 * ══════════════════════════════════════════════════════════════
 * - Verwendet NEXT_PUBLIC_GOOGLE_MAPS_API_KEY aus den Vercel Environment Variables.
 * - DSGVO Zwei-Klick-Lösung: Keine Übertragung von IP-Adressen an Google vor expliziter Einwilligung.
 * - Synchronisiert mit dem globalen CookieConsent (useConsent).
 * - Enthält barrierefreie Steuerung und direkte Routenplanung.
 */
export default function GoogleMap({
  address = COMPANY_DATA.headquarters.fullAddress,
  mapsUrl = COMPANY_DATA.headquarters.mapsUrl,
  title = "Fliesenverlegung Tezgel – Betriebssitz & Werkstatt",
  className = "",
  height = "380px",
  autoLoadWithConsent = true,
}: GoogleMapProps) {
  const { consent } = useConsent();
  const [userLoaded, setUserLoaded] = useState(false);

  // Marketing-Consent aus Cookie-Banner ODER Klick auf "Interaktive Karte laden"
  const isAllowedToLoad = userLoaded || (autoLoadWithConsent && consent?.marketing);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY;

  // Iframe-URL generieren
  // 1. Wenn API-Key vorhanden: Offizielle Google Maps Embed API v1
  // 2. Fallback: Standard Google Maps Query Embed
  const encodedAddress = encodeURIComponent(address);
  const embedUrl = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}&language=de`
    : `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-900 shadow-sm ${className}`}>
      {!isAllowedToLoad ? (
        // 2-Klick DSGVO-Vorschau
        <div
          style={{ minHeight: height }}
          className="relative flex flex-col items-center justify-center p-6 text-center text-white bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 overflow-hidden"
        >
          {/* Subtiler dekorativer Karten-Raster-Hintergrund */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-md mx-auto space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-orange-600/20 text-orange-400 border border-orange-500/30">
              <MapPin className="w-8 h-8 animate-pulse" />
            </div>

            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30 mb-2">
                Google Maps Standort
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
              <p className="text-sm text-neutral-300 mt-1 flex items-center justify-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>{address}</span>
              </p>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mx-auto">
              Zum Schutz Ihrer Daten wird die interaktive Google-Karte erst nach Ihrer Zustimmung geladen. Dabei können Daten an Google übertragen werden.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setUserLoaded(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <Eye className="w-4 h-4" />
                <span>Interaktive Karte laden</span>
              </button>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-200 text-sm font-semibold transition-colors"
              >
                <Navigation className="w-4 h-4 text-orange-400" />
                <span>In Google Maps öffnen</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            <div className="pt-2 text-[11px] text-neutral-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>DSGVO-konforme Zwei-Klick-Lösung</span>
            </div>
          </div>
        </div>
      ) : (
        // Aktive interaktive Google Map
        <div className="relative w-full" style={{ height }}>
          <iframe
            title={title}
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full filter saturate-[0.95]"
          />

          {/* Schnellzugriff-Bar oben rechts auf der Karte */}
          <div className="absolute top-3 right-3 z-10">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-sm text-neutral-900 text-xs font-bold shadow-md hover:bg-white transition-all border border-neutral-200"
            >
              <Navigation className="w-3.5 h-3.5 text-orange-600" />
              <span>Route planen</span>
              <ExternalLink className="w-3 h-3 text-neutral-500" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
