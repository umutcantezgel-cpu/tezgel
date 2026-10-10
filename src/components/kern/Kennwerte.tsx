// Kennwerte (KERN K-009, Mono): Zahlen an der Fuge. Etikett in Mono über dem Wert, der Wert groß im
// Anzeigeschnitt, die Quelle klein in Mono darunter. Die Spaltenzahl folgt der Anzahl der Werte (höchstens 4).
import type { ReactNode } from 'react';
import clsx from 'clsx';

export interface KennwertEintrag {
  wert: ReactNode;
  etikett: string;
  quelle?: ReactNode;
}

export interface KennwerteProps {
  werte: KennwertEintrag[];
  className?: string;
}

const RASTER = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
} as const;

export default function Kennwerte({ werte, className }: KennwerteProps) {
  const anzahl = Math.min(Math.max(werte.length, 1), 4) as 1 | 2 | 3 | 4;
  return (
    <dl className={clsx('grid gap-px border border-fuge bg-fuge', RASTER[anzahl], className)}>
      {werte.map((w, i) => (
        <div key={i} className="flex flex-col gap-2 bg-fliese p-4 sm:p-6 lg:p-8">
          <dt className="font-mono text-fs-1 text-tinte-2">{w.etikett}</dt>
          <dd className="font-anzeige text-fs-6 font-semibold text-tinte">{w.wert}</dd>
          {w.quelle && <dd className="font-mono text-fs-1 text-tinte-2">{w.quelle}</dd>}
        </div>
      ))}
    </dl>
  );
}
