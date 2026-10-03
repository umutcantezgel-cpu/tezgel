'use client';

import React from 'react';
import { MapPin, ArrowRight, Navigation } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { SITE_CONFIG } from '@/shared/config/site';
import MapConsentGate from '@/components/legal/MapConsentGate';
import { getMapEmbedUrl, getDirectionsUrl, TEZGEL_HQ_COORDS } from '@/lib/maps/getMapEmbedUrl';

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
 * ══════════════════════════════════════════════════════════════
 * 20x Interactive Map Component (DSGVO 2-Klick-Gate)
 * ══════════════════════════════════════════════════════════════
 * - Verwendet @vis.gl/react-google-maps AdvancedMarker bei API-Key.
 * - DSGVO-geschützt über MapConsentGate.
 * - Fließendes Fallback auf OpenStreetMap / Embed wenn kein Key vorhanden ist.
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
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const address = `${streetAddress}, ${postalCodeCity}`;
  const iframeSrc = getMapEmbedUrl({
    address,
    lat: TEZGEL_HQ_COORDS.lat,
    lng: TEZGEL_HQ_COORDS.lng,
    zoom: 15,
  });
  const effectiveDirectionsUrl = googleMapsUrl || getDirectionsUrl(address);

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-neutral-200 shadow-sm ${className}`}
      style={{ height }}
    >
      <MapConsentGate
        src={apiKey ? undefined : iframeSrc}
        title={`Standort von ${addressTitle}`}
        height="100%"
        className="w-full h-full"
      >
        {apiKey ? (
          <APIProvider apiKey={apiKey}>
            <Map
              style={{ width: '100%', height: '100%' }}
              defaultCenter={TEZGEL_HQ_COORDS}
              defaultZoom={15}
              mapId="DEMO_MAP_ID"
              gestureHandling="cooperative"
              disableDefaultUI={false}
              internalUsageAttributionIds={["gmp_git_agentskills_v1"]}
            >
              <AdvancedMarker position={TEZGEL_HQ_COORDS} title={addressTitle}>
                <Pin background="#ea580c" glyphColor="#ffffff" borderColor="#c2410c" />
              </AdvancedMarker>
            </Map>
          </APIProvider>
        ) : null}
      </MapConsentGate>

      {/* Floating Info Box */}
      {showInfoBox && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs p-4 rounded-xl bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-xl text-sm z-10">
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
                href={effectiveDirectionsUrl}
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
