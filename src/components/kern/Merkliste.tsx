// Merkliste (KERN K-009, Fugenkreuz): Einträge an der Fuge. Spalten 1: Liste, das Fugenkreuz steht als Marke
// am Eintrag. Spalten 2 und 4: Feldraster mit einem Feld je Eintrag; „Punkt 01“ als Mono-Etikett bei
// nummeriert; der Fuß sitzt unten an einer Fuge. Fläche tinte wie der Abschluss (FinalCTA).
// verband (nur mit spalten 2, Halbverband für Listen): Einträge als Zeilen an der Fuge ohne Felder; die Mono-Nummer
// „01“ ist die Marke, ab md beginnt jeder zweite Eintrag eine halbe Zeile tiefer. Lesefolge im DOM bleibt 1 … n.
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
  /** Halbverband (mit spalten 2): Zeilen an der Fuge, Nummer als Marke, fuss entfällt */
  verband?: boolean;
  /** Mono-Etikett „Punkt 01“ über dem Titel; mit verband nur die Nummer „01“ */
  nummeriert?: boolean;
  flaeche?: 'fliese' | 'tinte';
  className?: string;
}

const RASTER = {
  2: 'md:grid-cols-2',
  4: 'md:grid-cols-2 lg:grid-cols-4',
} as const;

const nummerZiffer = (i: number) => String(i + 1).padStart(2, '0');
const nummer = (i: number) => `Punkt ${nummerZiffer(i)}`;

export default function Merkliste({ eintraege, spalten = 1, verband = false, nummeriert = false, flaeche = 'fliese', className }: MerklisteProps) {
  const tinte = flaeche === 'tinte';

  if (verband) {
    return (
      <ul className={clsx('grid grid-cols-1 md:grid-cols-2 md:gap-x-12', className)}>
        {eintraege.map((e, i) => (
          <li
            key={i}
            className={clsx(
              'flex gap-6 border-t py-6 last:border-b md:even:mt-12 md:[&:nth-last-child(-n+2)]:border-b',
              tinte ? 'border-nacht-fuge' : 'border-fuge',
            )}
          >
            {nummeriert && <span className={clsx('w-8 shrink-0 font-mono text-fs-2', tinte ? 'text-nacht-2' : 'text-tinte-2')}>{nummerZiffer(i)}</span>}
            <div className="min-w-0 flex-1">
              <p className={clsx('font-anzeige text-fs-4 font-semibold', tinte ? 'text-kalk' : 'text-tinte')}>{e.titel}</p>
              {e.text && <div className={clsx('mt-2 text-fs-2 text-pretty hyphens-auto', tinte ? 'text-nacht-2' : 'text-tinte-2')}>{e.text}</div>}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  if (spalten === 1) {
    return (
      <ul className={clsx('border-t', tinte ? 'border-nacht-fuge' : 'border-fuge', className)}>
        {eintraege.map((e, i) => (
          <li key={i} className={clsx('flex items-start gap-4 border-b py-4 lg:gap-6', tinte ? 'border-nacht-fuge' : 'border-fuge')}>
            <Fugenkreuz className={clsx('mt-2 size-3 shrink-0', tinte ? 'text-nacht-2' : 'text-strich')} />
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
