// Merkliste (KERN K-009, Fugenkreuz): Einträge an der Fuge. Spalten 1: Liste, das Fugenkreuz steht als Marke
// am Eintrag. Spalten 2 und 4: Feldraster mit einem Feld je Eintrag; „Punkt 01“ als Mono-Etikett bei
// nummeriert; der Fuß sitzt unten an einer Fuge. Fläche tinte wie der Abschluss (FinalCTA).
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Fugenkreuz from './Fugenkreuz';

export interface MerklisteEintrag {
  titel: ReactNode;
  text?: ReactNode;
  fuss?: ReactNode;
}

export interface MerklisteProps {
  eintraege: MerklisteEintrag[];
  spalten?: 1 | 2 | 4;
  /** Mono-Etikett „Punkt 01“ über dem Titel */
  nummeriert?: boolean;
  flaeche?: 'fliese' | 'tinte';
  className?: string;
}

const RASTER = {
  2: 'md:grid-cols-2',
  4: 'md:grid-cols-2 lg:grid-cols-4',
} as const;

const nummer = (i: number) => `Punkt ${String(i + 1).padStart(2, '0')}`;

export default function Merkliste({ eintraege, spalten = 1, nummeriert = false, flaeche = 'fliese', className }: MerklisteProps) {
  const tinte = flaeche === 'tinte';

  if (spalten === 1) {
    return (
      <ul className={clsx('border-t', tinte ? 'border-nacht-fuge' : 'border-fuge', className)}>
        {eintraege.map((e, i) => (
          <li key={i} className={clsx('flex items-start gap-4 border-b py-4 lg:gap-6', tinte ? 'border-nacht-fuge' : 'border-fuge')}>
            <Fugenkreuz className="mt-2 size-3 shrink-0 text-laser" />
            <div className="min-w-0 flex-1">
              {nummeriert && <p className={clsx('font-mono text-fs-1', tinte ? 'text-nacht-2' : 'text-tinte-2')}>{nummer(i)}</p>}
              <p className={clsx('font-anzeige text-fs-4 font-semibold', nummeriert && 'mt-2', tinte ? 'text-kalk' : 'text-tinte')}>{e.titel}</p>
              {e.text && <div className={clsx('mt-2 text-fs-2 text-pretty hyphens-auto', tinte ? 'text-nacht-2' : 'text-tinte-2')}>{e.text}</div>}
              {e.fuss && <div className={clsx('mt-4 border-t pt-4', tinte ? 'border-nacht-fuge' : 'border-fuge')}>{e.fuss}</div>}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={clsx('grid grid-cols-1 gap-px border', tinte ? 'border-nacht-fuge bg-nacht-fuge' : 'border-fuge bg-fuge', RASTER[spalten], className)}>
      {eintraege.map((e, i) => (
        <li key={i} className={clsx('flex flex-col p-6 lg:p-8', tinte ? 'bg-tinte' : 'bg-fliese')}>
          <div className="flex flex-1 flex-col">
            {nummeriert && <p className={clsx('font-mono text-fs-1', tinte ? 'text-nacht-2' : 'text-tinte-2')}>{nummer(i)}</p>}
            <p className={clsx('font-anzeige text-fs-3 font-semibold', nummeriert && 'mt-4', tinte ? 'text-kalk' : 'text-tinte')}>{e.titel}</p>
            {e.text && <div className={clsx('mt-2 text-fs-2 text-pretty hyphens-auto', tinte ? 'text-nacht-2' : 'text-tinte-2')}>{e.text}</div>}
          </div>
          {e.fuss && <div className={clsx('mt-6 border-t pt-4', tinte ? 'border-nacht-fuge' : 'border-fuge')}>{e.fuss}</div>}
        </li>
      ))}
    </ul>
  );
}
