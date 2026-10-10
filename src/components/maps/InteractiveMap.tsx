'use client';

import clsx from 'clsx';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { COMPANY_DATA } from '@/config/company';
import MapConsentGate from '@/components/legal/MapConsentGate';
import Icon from '@/components/icons/Icon';
import { knopfKlassen } from '@/components/kern/stile';
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
 * Standortkarte (DSGVO-Gate über MapConsentGate)
 * ══════════════════════════════════════════════════════════════
 * - Verwendet @vis.gl/react-google-maps mit AdvancedMarker bei API-Key.
 * - Ohne API-Key: Einbettung über den Kartendienst, erst nach Einwilligung.
 * - Der Info-Kasten steht im Fluss unter der Karte und überdeckt den Platzhalter-Knopf nie.
 */
export function InteractiveMap({
  className = '',
  height = '420px',
  showInfoBox = true,
  addressTitle = COMPANY_DATA.legalName,
  streetAddress = COMPANY_DATA.headquarters.street,
  postalCodeCity = `${COMPANY_DATA.headquarters.postalCode} ${COMPANY_DATA.headquarters.city}`,
  googleMapsUrl = COMPANY_DATA.headquarters.mapsUrl,
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
    <div className={clsx('w-full', className)}>
      <MapConsentGate
        src={apiKey ? undefined : iframeSrc}
        title={`Standort von ${addressTitle}`}
        height={height}
        className="w-full"
      >
        {apiKey ? (
          <APIProvider apiKey={apiKey}>
            <Map
              className="h-full w-full"
              defaultCenter={TEZGEL_HQ_COORDS}
              defaultZoom={15}
              mapId="DEMO_MAP_ID"
              gestureHandling="cooperative"
              disableDefaultUI={false}
              internalUsageAttributionIds={['gmp_git_agentskills_v1']}
            >
              <AdvancedMarker position={TEZGEL_HQ_COORDS} title={addressTitle}>
                <Pin background="var(--color-laser)" glyphColor="var(--color-fliese)" borderColor="var(--color-laser-tief)" />
              </AdvancedMarker>
            </Map>
          </APIProvider>
        ) : null}
      </MapConsentGate>

      {showInfoBox && (
        <div className="flex flex-col gap-4 border border-t-0 border-fuge bg-fliese p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <Icon name="ort" groesse={5} className="mt-1 text-tinte" />
            <div>
              <h4 className="font-text text-fs-3 font-semibold text-tinte">{addressTitle}</h4>
              <p className="mt-1 font-text text-fs-2 text-tinte-2">
                {streetAddress}
                <br />
                {postalCodeCity}
              </p>
            </div>
          </div>
          <a
            href={effectiveDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={knopfKlassen('neben', 'shrink-0')} data-motion="druck"
          >
            <span>Route planen</span>
            <Icon name="pfeil-rechts" groesse={4} />
          </a>
        </div>
      )}
    </div>
  );
}

export default InteractiveMap;
