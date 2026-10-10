// Schriftfeld (KERN K-009): das Stempelfeld des Fußes für helle Flächen. Stammdaten stehen in Feldern an
// der Fuge, das Mono-Etikett liegt über dem Wert. SchriftfeldBetrieb füllt die Felder nur aus COMPANY_DATA.
import type { ReactNode } from 'react';
import clsx from 'clsx';
import { COMPANY_DATA } from '@/config/company';

export interface SchriftfeldFeld {
  etikett: string;
  wert: ReactNode;
  /** über alle Spalten */
  breit?: boolean;
}

export interface SchriftfeldProps {
  felder: SchriftfeldFeld[];
  spalten?: 1 | 2 | 3;
  flaeche?: 'fliese' | 'kalk';
  className?: string;
}

const RASTER = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-3',
} as const;

export default function Schriftfeld({ felder, spalten = 2, flaeche = 'fliese', className }: SchriftfeldProps) {
  return (
    <dl className={clsx('grid gap-px border border-fuge bg-fuge', RASTER[spalten], className)}>
      {felder.map((f) => (
        <div key={f.etikett} className={clsx('p-4', f.breit && 'col-span-full', flaeche === 'kalk' ? 'bg-kalk' : 'bg-fliese')}>
          <dt className="font-mono text-fs-1 text-tinte-2">{f.etikett}</dt>
          <dd className="mt-1 text-fs-2 text-tinte">{f.wert}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Vorgefertigtes Schriftfeld des Betriebs: Inhaber, Kammer, Betrieb seit, Sitz – nur aus COMPANY_DATA. */
export function SchriftfeldBetrieb({ flaeche = 'fliese', className }: { flaeche?: 'fliese' | 'kalk'; className?: string } = {}) {
  const { owner, authority, business, headquarters } = COMPANY_DATA;
  return (
    <Schriftfeld
      spalten={2}
      flaeche={flaeche}
      className={className}
      felder={[
        { etikett: 'Inhaber', wert: owner.fullName },
        { etikett: 'Kammer', wert: authority.name },
        { etikett: 'Betrieb seit', wert: <span className="font-mono">{business.establishmentYear}</span> },
        {
          etikett: 'Sitz',
          wert: (
            <>
              {headquarters.street}, <span className="font-mono">{headquarters.postalCode}</span> {headquarters.city}
            </>
          ),
        },
      ]}
    />
  );
}
