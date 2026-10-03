'use client';

import React from 'react';
import { MapPin, ArrowRight, Navigation } from 'lucide-react';
import { SITE_CONFIG } from '@/shared/config/site';

export interface InteractiveMapProps {
  className?: string;
  height?: string;
  showInfoBox?: boolean;
  addressTitle?: string;
  streetAddress?: string;
  postalCodeCity?: string;
  googleMapsUrl?: string;
}

/**
 * Interactive Google Maps Embed with Reduced Contrast Filter & Floating Direction Box
 */
export function InteractiveMap({
  className = '',
  height = '420px',
  showInfoBox = true,
  addressTitle = SITE_CONFIG.companyName,
  streetAddress = SITE_CONFIG.headquarters.streetAddress,
  postalCodeCity = `${SITE_CONFIG.headquarters.postalCode} ${SITE_CONFIG.headquarters.addressLocality}`,
  googleMapsUrl = SITE_CONFIG.contact.googleMapsUrl,
}: InteractiveMapProps) {
  const encodedAddress = encodeURIComponent(`${streetAddress}, ${postalCodeCity}`);
  const iframeSrc = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-neutral-200 shadow-sm ${className}`}
      style={{ height }}
    >
      {/* Google Maps iFrame */}
      <iframe
        title={`Standort von ${addressTitle}`}
        src={iframeSrc}
        width="100%"
        height="100%"
        style={{
          border: 0,
          filter: 'grayscale(20%) contrast(1.05)',
        }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full"
      />

      {/* Floating Info Box */}
      {showInfoBox && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs p-4 rounded-xl bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-xl text-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-orange-50 text-orange-600 shrink-0 mt-0.5">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900">
                {addressTitle}
              </h4>
              <p className="text-neutral-600 text-xs mt-0.5 leading-relaxed">
                {streetAddress}
                <br />
                {postalCodeCity}
              </p>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 font-bold text-xs text-orange-600 hover:text-orange-700 hover:underline"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Route planen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InteractiveMap;
