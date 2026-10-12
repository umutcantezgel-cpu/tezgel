'use client';

// Regionale Marktabdeckung der Stadtseite (E4-NACH-09, Befund 27/28/29; E3-SICHT-2-ERZ Befund 19–21, E4-N2-08): helle
// Fliesenfläche mit Fugen. Links der Ausschnitt des Einzugsbands – nur die Zone der Stadt ab dem Firmensitz, die Stadt mit
// Fugenkreuz, in einer Spalte bis max-w-mass, Entfernungen in Mono direkt neben dem Ort; rechts der Text (Rangliste,
// Zentrum, Fahrtzeit, Radius, Route in Google Maps als Nebenknopf). Das volle Einzugsband steht nur im Planblatt des Einstiegs.
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { etikettForm, etikettKlassen, knopfKlassen } from '@/components/kern/stile';
import { CITIES } from '@/config/cities';
import { gruppiereNachZone, mitEntfernungAbSitz } from '@/lib/einzugszonen';
import { getDirectionsUrl, calculateEstimatedDriveTime, CITY_HUB_DATA } from '@/lib/maps/getMapEmbedUrl';

export interface LocalDominanceMapProps {
  className?: string;
  centerCity?: string;
  radiusKm?: number;
  topRankings?: string[];
  citySlug?: string;
}

// Zonen des Einzugsbands (Entfernungen ab Aßlar, dieselbe Quelle wie das Band im Planblatt)
const ZONEN = gruppiereNachZone(mitEntfernungAbSitz(CITIES, CITY_HUB_DATA));

// Entfernung ab dem Firmensitz (Bestandswortlaut des Bands)
const entfernung = (km: number) => (km === 0 ? 'Firmensitz' : `ca. ${km} km`);

/**
 * ══════════════════════════════════════════════════════════════
 * Regionale Marktabdeckung (Stadtseite)
 * ══════════════════════════════════════════════════════════════
 * - Ausschnitt: die Zone der Stadt ab Aßlar mit den Nachbarorten dieser Zone; die eigene Stadt trägt das Fugenkreuz.
 * - Rangliste als Felder an der Fuge: Sterne für Bewertungen, Haken für Angaben.
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
  const zone = ZONEN.find((gruppe) => gruppe.orte.some((o) => o.slug === citySlug));

  return (
    <div className={clsx('flex flex-col gap-8 border border-fuge bg-fliese p-6 text-tinte lg:flex-row lg:items-start lg:gap-x-12 lg:p-8', className)}>
      {/* Ausschnitt: die Zone der Stadt als Zeichnung mit Lot, höchstens max-w-mass breit; Entfernung direkt neben dem Ort */}
      {zone && (
        <div className="w-fit max-w-mass">
          <p className={clsx(etikettForm, 'mb-4 text-tinte')}>
            <Fugenkreuz className="size-3 shrink-0 text-tinte" />
            <span>Firmensitz Aßlar</span>
          </p>
          <div className="border-l-2 border-tinte pl-4">
            <p className={etikettKlassen}>{zone.zone.etikett}</p>
            <ul className="mt-2 border-t border-fuge">
              {zone.orte.map((o) => {
                const ist = o.slug === citySlug;
                return (
                  <li key={o.slug} className="flex items-center justify-between gap-x-6 border-b border-fuge py-2 font-text text-fs-2 text-tinte">
                    <span className="flex min-w-0 items-center gap-2">
                      {ist ? <Fugenkreuz className="size-3 shrink-0 text-tinte" /> : <span aria-hidden="true" className="size-3 shrink-0" />}
                      <span className={clsx('wrap-break-word', ist && 'font-semibold')}>{o.name}</span>
                    </span>
                    <span className="shrink-0 font-mono text-fs-1 text-tinte-2">{entfernung(o.distanceKm)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {/* Text neben dem Ausschnitt: Rangliste, Zentrum und Fahrtzeit, Radius und Route */}
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        {/* Rangliste: Felder an der Fuge */}
        <ul className="grid gap-px border border-fuge bg-fuge">
          {topRankings.map((badge, idx) => (
            <li key={idx} className="flex items-center gap-3 bg-fliese px-4 py-3 font-text text-fs-2 text-tinte">
              <Icon name={badge.includes('★') ? 'stern' : 'haken'} groesse={4} className="text-tinte-2" />
              <span>{badge}</span>
            </li>
          ))}
        </ul>

        {/* Zentrum und Fahrtzeit */}
        <div className="flex flex-col gap-2 font-mono text-fs-1 text-tinte-2">
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
    </div>
  );
}

export default LocalDominanceMap;
