// Abschnitt (KERN K-006, K-009): Kopf mit Mono-Etikett (vormals Badge, Wortlaut bleibt) und H2,
// wahlweise gestapelt oder seitlich (Kopf links, Inhalt rechts). Flächen: Kalk, Fliese, Tinte.
import type { ReactNode } from 'react';
import clsx from 'clsx';
import { etikettKlassen, seitenKlassen } from './stile';

export interface AbschnittProps {
  id?: string;
  /** id der H2 für aria-labelledby; Standard: `${id}-titel` */
  titelId?: string;
  etikett?: ReactNode;
  /** laufende Nummer im Mono-Etikett, z. B. „02“ */
  nummer?: string;
  titel?: ReactNode;
  einleitung?: ReactNode;
  art?: 'erzaehl' | 'arbeit';
  flaeche?: 'kalk' | 'fliese' | 'tinte';
  kopf?: 'gestapelt' | 'seitlich';
  breite?: 'seite' | 'mass';
  /** data-motion="auftritt" für den Inhalt (nur Erzählansichten, höchstens jeder zweite Abschnitt) */
  auftritt?: boolean;
  className?: string;
  children?: ReactNode;
  'aria-label'?: string;
}

export default function Abschnitt({ id, titelId, etikett, nummer, titel, einleitung, art = 'erzaehl', flaeche = 'kalk', kopf = 'gestapelt', breite = 'seite', auftritt = false, className, children, ...rest }: AbschnittProps) {
  const hId = titelId ?? (id ? `${id}-titel` : undefined);
  const tinte = flaeche === 'tinte';
  const kopfInhalt = (titel || etikett) && (
    <div className={clsx(kopf === 'seitlich' ? 'lg:col-span-4' : 'max-w-mass')}>
      {(etikett || nummer) && (
        <p className={clsx(etikettKlassen, 'mb-4', tinte && 'text-nacht-2')}>
          {nummer && <span className={tinte ? 'text-kalk' : 'text-tinte'}>{nummer}</span>}
          {nummer && etikett && <span aria-hidden="true">·</span>}
          {etikett}
        </p>
      )}
      {titel && <h2 id={hId} className={clsx('text-fs-6', tinte ? 'text-kalk' : 'text-tinte')}>{titel}</h2>}
      {einleitung && <div className={clsx('mt-6 text-fs-3', tinte ? 'text-nacht-2' : 'text-tinte-2')}>{einleitung}</div>}
    </div>
  );
  return (
    <section
      id={id}
      aria-labelledby={titel ? hId : undefined}
      aria-label={!titel ? rest['aria-label'] : undefined}
      className={clsx(
        'relative scroll-mt-24',
        art === 'erzaehl' ? 'py-24 lg:py-32' : 'py-12 lg:py-16',
        flaeche === 'fliese' && 'border-y border-fuge bg-fliese',
        tinte && 'flaeche-tinte bg-tinte text-kalk',
        className,
      )}
    >
      <div className={clsx(seitenKlassen, breite === 'mass' && 'max-w-mass')}>
        {kopf === 'seitlich' ? (
          <div className="grid grid-cols-4 gap-y-12 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12">
            {kopfInhalt}
            <div className="col-span-4 md:col-span-8" data-motion={auftritt ? 'auftritt' : undefined}>{children}</div>
          </div>
        ) : (
          <>
            {kopfInhalt}
            <div className={clsx(kopfInhalt && 'mt-12')} data-motion={auftritt ? 'auftritt' : undefined}>{children}</div>
          </>
        )}
      </div>
    </section>
  );
}
