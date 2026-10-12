'use client';

// Regionale Marktabdeckung der Stadtseite (E4-NACH-09, Befund 27/28/29): helle Fliesenfläche mit Fugen statt des Radars auf
// Tinte. Die Zonen ab Aßlar als Zonenliste (Einzugsband, kompakt, stapelnd) mit der eigenen Stadt hervorgehoben; die Rangliste
// als Felder an der Fuge; Zentrum, Fahrtzeit und Radius wie im Bestand; Route in Google Maps als Nebenknopf.
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Einzugsband from '@/components/kern/Einzugsband';
import { knopfKlassen } from '@/components/kern/stile';
import { getDirectionsUrl, calculateEstimatedDriveTime, CITY_HUB_DATA } from '@/lib/maps/getMapEmbedUrl';

export interface LocalDominanceMapProps {
  className?: string;
  centerCity?: string;
  radiusKm?: number;
  topRankings?: string[];
  citySlug?: string;
}

/**
 * ══════════════════════════════════════════════════════════════
 * Regionale Marktabdeckung (Stadtseite)
 * ══════════════════════════════════════════════════════════════
 * - Rangliste als Felder an der Fuge: Sterne für Bewertungen, Haken für Angaben.
 * - Zonenliste ab Aßlar (Einzugsband, kompakt) mit der eigenen Stadt hervorgehoben.
 * - Berechnet die Fahrtzeit ab Aßlar und verlinkt auf die Routenplanung.
 */
export function LocalDominanceMap({
  className = '',
  centerCity = 'Aßlar & Wetzlar',
  radiusKm = 25,
  topRankings = ['5,0★ Google-Bewertung (27 Rezensionen)', 'Eingetragener HWK-Betrieb'],
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
    <div className={clsx('flex flex-col gap-6 border border-fuge bg-fliese p-6 text-tinte lg:p-8', className)}>
      {/* Rangliste: Felder an der Fuge */}
      <ul className="grid gap-px border border-fuge bg-fuge">
        {topRankings.map((badge, idx) => (
          <li key={idx} className="flex items-center gap-3 bg-fliese px-4 py-3 font-text text-fs-2 text-tinte">
            <Icon name={badge.includes('★') ? 'stern' : 'haken'} groesse={4} className="text-tinte-2" />
            <span>{badge}</span>
          </li>
        ))}
      </ul>

      {/* Zonen ab Aßlar: stapelnd, ohne Lot in Rot; die eigene Stadt trägt das Fugenkreuz */}
      <Einzugsband aktuell={citySlug} kompakt form="stapel" />

      {/* Zentrum und Fahrtzeit */}
      <div className="flex flex-col gap-2 font-mono text-fs-1 text-tinte-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
        <span>Zentrum: {centerCity}</span>
        <span className="inline-flex items-center gap-2">
          <Icon name="uhr" groesse={4} />
          <span>Fahrtzeit ab Aßlar: {driveInfo.text}</span>
        </span>
      </div>

      {/* Fußzeile: Radius und Routenlink */}
      <div className="flex flex-col gap-4 border-t border-fuge pt-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex items-center gap-2 font-text text-fs-2 text-tinte-2">
          <Icon name="haken" groesse={4} />
          <span>Radius: ca. {radiusKm} km Vor-Ort-Einsatz</span>
        </span>

        <a href={routeUrl} target="_blank" rel="noopener noreferrer" className={knopfKlassen('neben', 'shrink-0')} data-motion="druck">
          <span>Route in Google Maps</span>
          <Icon name="link-extern" groesse={4} />
        </a>
      </div>
    </div>
  );
}

export default LocalDominanceMap;
