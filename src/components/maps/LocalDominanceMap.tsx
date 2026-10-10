'use client';

import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { knopfKlassen } from '@/components/kern/stile';
import { getDirectionsUrl, calculateEstimatedDriveTime, CITY_HUB_DATA } from '@/lib/maps/getMapEmbedUrl';

export interface LocalDominanceMapProps {
  className?: string;
  centerCity?: string;
  radiusKm?: number;
  topRankings?: string[];
  citySlug?: string;
}

/** Ringe um den Mittelpunkt im Raster ±160 (Innen-, Mittel- und Außenring) */
const RINGE = [56, 96, 136];

/**
 * ══════════════════════════════════════════════════════════════
 * Regionale Marktabdeckung (Stadtseite)
 * ══════════════════════════════════════════════════════════════
 * - Rangliste als Felder an der Fuge, Radar mit Ringen und Fugenkreuz im Mittelpunkt.
 * - Berechnet die Fahrtzeit ab Aßlar und verlinkt auf die Routenplanung.
 */
export function LocalDominanceMap({
  className = '',
  centerCity = 'Aßlar & Wetzlar',
  radiusKm = 25,
  topRankings = ['#1 Fachbetrieb Aßlar & Wetzlar', '5,0★ Google-Bewertung (27 Rezensionen)', 'Eingetragener HWK-Betrieb'],
  citySlug,
}: LocalDominanceMapProps) {
  // Normalize slug for city hub lookup
  const cleanCity = centerCity.split(' ')[0] || '';
  const normalizedSlug = (citySlug || cleanCity)
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss');

  const hubData = CITY_HUB_DATA[normalizedSlug];
  const distanceKm = hubData ? hubData.distanceKm : Math.max(5, Math.round(radiusKm * 0.7));
  const driveInfo = calculateEstimatedDriveTime(distanceKm);
  const routeUrl = getDirectionsUrl(centerCity);

  return (
    <div className={clsx('flaeche-tinte flex flex-col gap-6 border border-nacht-fuge bg-tinte p-6 text-kalk lg:p-8', className)}>
      {/* Rangliste: Felder an der Fuge */}
      <ul className="grid gap-px border border-nacht-fuge bg-nacht-fuge">
        {topRankings.map((badge, idx) => (
          <li key={idx} className="flex items-center gap-3 bg-tinte px-4 py-3 font-text text-fs-2 text-kalk">
            <Icon name={idx < 2 ? 'stern' : 'haken'} groesse={4} className="text-nacht-2" />
            <span>{badge}</span>
          </li>
        ))}
      </ul>

      {/* Radar: Ringe um den Firmensitz, Fugenkreuz im Mittelpunkt */}
      <div className="relative mx-auto w-full max-w-md">
        <svg viewBox="-160 -160 320 320" aria-hidden="true" focusable="false" className="block h-auto w-full">
          {RINGE.map((r) => (
            <circle
              key={r}
              cx={0}
              cy={0}
              r={r}
              fill="none"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              className="stroke-nacht-fuge"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Fugenkreuz className="size-6 text-laser" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 text-center font-mono text-fs-1 text-nacht-2">
        <span>Zentrum: {centerCity}</span>
        <span className="inline-flex items-center gap-2">
          <Icon name="uhr" groesse={4} />
          <span>Fahrtzeit ab Aßlar: {driveInfo.text}</span>
        </span>
      </div>

      {/* Fußzeile: Radius und Routenlink */}
      <div className="flex flex-col gap-4 border-t border-nacht-fuge pt-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex items-center gap-2 font-text text-fs-2 text-nacht-2">
          <Icon name="haken" groesse={4} />
          <span>Radius: ca. {radiusKm} km Vor-Ort-Einsatz</span>
        </span>

        <a href={routeUrl} target="_blank" rel="noopener noreferrer" className={knopfKlassen('hell', 'shrink-0')}>
          <span>Route in Google Maps</span>
          <Icon name="link-extern" groesse={4} />
        </a>
      </div>
    </div>
  );
}

export default LocalDominanceMap;
