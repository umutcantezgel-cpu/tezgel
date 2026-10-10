// Einstieg (KERN K-006, K-009): Erzählansicht – H1 links bündig an der Laserachse, Vorspann, Aktionen,
// Randspalte (Plan oder Schriftfeld). Arbeitsansicht – kompakter Kopf (H1 text-fs-6), keine Inszenierung.
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Laserachse from './Laserachse';
import { etikettKlassen, seitenKlassen } from './stile';

export interface EinstiegProps {
  art?: 'erzaehl' | 'arbeit';
  etikett?: ReactNode;
  titel: ReactNode;
  /** zweite Zeile der H1 (Teil der Überschrift, kleiner gesetzt) */
  unterzeile?: ReactNode;
  vorspann?: ReactNode;
  aktionen?: ReactNode;
  /** Randspalte rechts (Desktop) bzw. nach den Aktionen (mobil) */
  rand?: ReactNode;
  /** Inhalt unter dem Einstieg im selben Raster (z. B. Merkmale) */
  fuss?: ReactNode;
  achse?: boolean;
  id?: string;
  className?: string;
}

export default function Einstieg({ art = 'erzaehl', etikett, titel, unterzeile, vorspann, aktionen, rand, fuss, achse = art === 'erzaehl', id, className }: EinstiegProps) {
  const erzaehl = art === 'erzaehl';
  return (
    <header id={id} className={clsx('relative border-b border-fuge', erzaehl ? 'pt-32 pb-16 lg:pt-32 lg:pb-24' : 'pt-32 pb-12 lg:pb-16', className)}>
      <div className={clsx(seitenKlassen, 'relative')}>
        {achse && <Laserachse className="left-2 md:left-4 lg:left-8" />}
        <div className={clsx('grid grid-cols-4 gap-y-12 md:grid-cols-8 lg:grid-cols-12', erzaehl ? 'lg:gap-x-12' : 'lg:gap-x-8')}>
          <div className={clsx('col-span-4 md:col-span-8', rand ? 'lg:col-span-7' : 'lg:col-span-9', achse && 'pl-4 md:pl-6 lg:pl-8')}>
            {etikett && <p className={clsx(etikettKlassen, 'mb-6')}>{etikett}</p>}
            <h1 className={clsx('text-tinte', erzaehl ? 'text-fs-7' : 'text-fs-6')} data-motion={erzaehl ? 'sig-flucht' : undefined}>
              {titel}
              {unterzeile && <span className="mt-4 block text-fs-5 text-tinte-2">{unterzeile}</span>}
            </h1>
            {vorspann && <div className="mt-8 max-w-mass text-fs-4 text-tinte">{vorspann}</div>}
            {aktionen && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{aktionen}</div>}
          </div>
          {rand && <div className="col-span-4 md:col-span-8 lg:col-span-5">{rand}</div>}
        </div>
        {fuss && <div className={clsx('mt-12', achse && 'pl-4 md:pl-6 lg:pl-8')}>{fuss}</div>}
      </div>
    </header>
  );
}
