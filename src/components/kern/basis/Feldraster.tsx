// Feldraster (K-003 „Fuge statt Karte“, K-007): Felder ohne Zwischenraum, getrennt nur durch 1-px-Fugen.
// Spalten 4 (mobil) · 8 (ab 768 px) · 12 (ab 1024 px). Die Felder tragen den rechten und unteren Rand, das Raster den
// linken und oberen – so entsteht jede Fuge genau einmal, auch bei unvollständiger letzter Reihe (keine Füllfläche).
import type { HTMLAttributes, ReactNode } from 'react';
import { verbinde, type Grund } from '@/components/kern/basis/klassen';

type Mobil = 1 | 2 | 3 | 4;
type Tablett = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type Desktop = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Breite = { mobil?: Mobil; tablett?: Tablett; desktop?: Desktop };

// Wörtliche Klassen, damit Tailwind sie findet.
const MOBIL: Record<Mobil, string> = { 1: 'col-span-1', 2: 'col-span-2', 3: 'col-span-3', 4: 'col-span-4' };
const TABLETT: Record<Tablett, string> = {
  1: 'md:col-span-1', 2: 'md:col-span-2', 3: 'md:col-span-3', 4: 'md:col-span-4',
  5: 'md:col-span-5', 6: 'md:col-span-6', 7: 'md:col-span-7', 8: 'md:col-span-8',
};
const DESKTOP: Record<Desktop, string> = {
  1: 'lg:col-span-1', 2: 'lg:col-span-2', 3: 'lg:col-span-3', 4: 'lg:col-span-4', 5: 'lg:col-span-5', 6: 'lg:col-span-6',
  7: 'lg:col-span-7', 8: 'lg:col-span-8', 9: 'lg:col-span-9', 10: 'lg:col-span-10', 11: 'lg:col-span-11', 12: 'lg:col-span-12',
};

const FUGE: Record<Grund, string> = { hell: 'border-k-fuge', tinte: 'border-k-nacht-fuge' };

export type FeldrasterProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  auf?: Grund;
  als?: 'div' | 'ul' | 'ol' | 'section' | 'dl';
};

export function Feldraster({ children, auf = 'hell', als: Element = 'div', className, ...rest }: FeldrasterProps) {
  return (
    <Element {...rest} className={verbinde('grid grid-cols-4 border-l border-t md:grid-cols-8 lg:grid-cols-12', FUGE[auf], className)}>
      {children}
    </Element>
  );
}

export type RasterfeldProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  /** Spalten je Ansicht; Standard: mobil 4, Tablett 4, Desktop 4 */
  breite?: Breite;
  /** Innenabstand: normal 24 px (Desktop 32 px) · eng 16 px · keiner */
  innen?: 'normal' | 'eng' | 'keiner';
  /** Fläche: keine (Grund scheint durch) · fliese · kalk · tinte (Fugen dann in Nacht-Fuge) */
  flaeche?: 'keine' | 'fliese' | 'kalk' | 'tinte';
  auf?: Grund;
  als?: 'div' | 'li' | 'article' | 'section' | 'figure';
};

const INNEN = { normal: 'p-k-5 lg:p-k-6', eng: 'p-k-4', keiner: '' } as const;
const FLAECHE = { keine: '', fliese: 'bg-k-fliese', kalk: 'bg-k-kalk', tinte: 'bg-k-tinte text-k-kalk' } as const;

export function Rasterfeld({ children, breite, innen = 'normal', flaeche = 'keine', auf = 'hell', als: Element = 'div', className, ...rest }: RasterfeldProps) {
  const { mobil = 4, tablett = 4, desktop = 4 } = breite ?? {};
  return (
    <Element
      {...rest}
      className={verbinde('min-w-0 border-r border-b', flaeche === 'tinte' ? FUGE.tinte : FUGE[auf], MOBIL[mobil], TABLETT[tablett], DESKTOP[desktop], INNEN[innen], FLAECHE[flaeche], className)}
    >
      {children}
    </Element>
  );
}

export default Feldraster;
