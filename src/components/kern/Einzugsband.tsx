// Einzugsband (KERN K-007 einzugsband): das Einzugsgebiet als Fugenband in drei Zonen (≤ 10 / ≤ 25 / ≤ 50 km,
// Breiten 3 : 3 : 4 ab md – K-007 nannte 2 : 3 : 5, dort wurden Ortsnamen der Zone ≤ 10 km gekürzt, E3-NACH-05),
// am linken Rand das rote Lot des Firmensitzes Aßlar. Je Zone die Orte – als Linkliste die
// Hauptform; das Band ordnet nur (kein Maßstab: die Entfernungen der Konfiguration sind gerundete Angaben).
// `kompakt`: ruhige Vorschau ohne Links und ohne Bewegung (z. B. im Kartenplatzhalter vor der Einwilligung).
// Sonst setzen sich die Zonenkanten beim Eintritt nacheinander (bewegung.css); reduziert und ohne JS stehen sie fertig.
// Serverkomponente.
import Link from 'next/link';
import clsx from 'clsx';
import Fugenkreuz from './Fugenkreuz';
import { etikettKlassen } from './stile';
import { CITIES } from '@/config/cities';
import { gruppiereNachZone } from '@/lib/einzugszonen';

const BREITE: Record<string, string> = { nah: 'md:col-span-3', mittel: 'md:col-span-3', weit: 'md:col-span-4' };

const entfernung = (km: number) => (km === 0 ? 'angrenzend' : `ca. ${km} km`);

export interface EinzugsbandProps {
  /** Slug der aktuellen Stadtseite: der Ort bekommt das Fugenkreuz und aria-current */
  aktuell?: string;
  kompakt?: boolean;
  className?: string;
}

export default function Einzugsband({ aktuell, kompakt = false, className }: EinzugsbandProps) {
  const gruppen = gruppiereNachZone(CITIES);
  return (
    <div className={clsx('einzugsband relative', className)} data-motion={kompakt ? undefined : 'einzugsband'}>
      <p className={clsx(etikettKlassen, kompakt ? 'mb-2' : 'mb-4')}>
        <Fugenkreuz className="size-3 text-laser" />
        <span className="text-tinte">Firmensitz Aßlar</span>
      </p>
      <ol className="grid grid-cols-1 border-l-2 border-laser md:grid-cols-10">
        {gruppen.map(({ zone, orte }) => (
          <li key={zone.id} className={clsx('einzugsband-zone relative border-b border-r border-fuge bg-fliese', BREITE[zone.id])}>
            <span className="einzugsband-kante absolute inset-x-0 top-0 h-px bg-tinte" aria-hidden="true" />
            <div className={kompakt ? 'px-3 py-2' : 'p-4 lg:p-6'}>
              <p className={etikettKlassen}>
                <span className="text-tinte">{zone.etikett}</span>
              </p>
              <ul className={clsx('flex flex-col', kompakt ? 'mt-1' : 'mt-4')}>
                {orte.map((o) => {
                  const ist = o.slug === aktuell;
                  const inhalt = (
                    <>
                      <span className="flex min-w-0 items-center gap-2">
                        {ist && <Fugenkreuz className="size-3 text-laser" />}
                        <span className={clsx('min-w-0 wrap-break-word hyphens-auto', ist && 'font-semibold')}>{o.name}</span>
                      </span>
                      <span className="shrink-0 font-mono text-fs-1 text-tinte-2">{entfernung(o.distanceKm)}</span>
                    </>
                  );
                  return (
                    <li key={o.slug} className={clsx(!kompakt && 'border-t border-fuge first:border-t-0')}>
                      {kompakt ? (
                        <span className="flex items-center justify-between gap-3 py-1 font-text text-fs-1 text-tinte">{inhalt}</span>
                      ) : (
                        <Link
                          href={`/standorte/${o.slug}`}
                          aria-current={ist ? 'page' : undefined}
                          className="flex min-h-11 items-center justify-between gap-3 py-2 font-text text-fs-2 text-tinte underline decoration-transparent underline-offset-4 hover:decoration-tinte"
                        >
                          {inhalt}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
