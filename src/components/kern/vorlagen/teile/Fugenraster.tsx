// Fugenraster (P4-10a, KERN v1.2 K-003 „Fuge statt Karte“, K-007): Felder ohne Zwischenraum, getrennt nur durch 1-px-Fugen –
// mit der Spaltenzahl nach dem Platz des Behälters (Container-Abfrage), nicht nach der Fensterbreite. So passt dieselbe
// Feldliste in die volle Seitenbreite, in den Inhalt eines seitlichen Abschnitts (Sp. 6–12) und in die Hauptspalte neben einem
// Randfeld, ohne dass eine Zelle schmaler wird als 18rem (288 px). Vorher: `basis/Feldraster` mit Spalten je Fensterbreite
// (4/8/12) bzw. `gap-px`-Raster in P4-02; bei 1024 px standen vier Felder mit je 232 px nebeneinander, und „Verbundabdichtung“
// brach mitten im Wort (wortbruch.mjs, Vorschau a361e9c).
// Spalten je Behälterbreite (Tailwind 4: `@container` am Behälter, Varianten `@xl` = 36rem, `@4xl` = 56rem, `@6xl` = 72rem):
//   spalten 1: immer 1
//   spalten 2: 1 · ab 36rem 2
//   spalten 3: 1 · ab 36rem 2 · ab 56rem 3
//   spalten 4: 1 · ab 36rem 2 · ab 72rem 4 (drei je Reihe entfallen: vier Felder stünden sonst 3 + 1)
// `spanne 2`: das Feld nimmt zwei Spalten, sobald es zwei gibt (Bestand Reparatur: großes Feld neben zwei kleinen).
// Fugen: Raster links und oben, Felder rechts und unten – jede Fuge entsteht genau einmal, auch in der letzten Reihe.
import type { HTMLAttributes, ReactNode } from 'react';
import { verbinde, type Grund } from '@/components/kern/basis/klassen';

export type Spalten = 1 | 2 | 3 | 4;

// Wörtliche Klassen, damit Tailwind sie findet.
const SPALTEN: Record<Spalten, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 @xl:grid-cols-2',
  3: 'grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-3',
  4: 'grid-cols-1 @xl:grid-cols-2 @6xl:grid-cols-4',
};

const FUGE: Record<Grund, string> = { hell: 'border-k-fuge', tinte: 'border-k-nacht-fuge' };

export type FugenrasterProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  spalten?: Spalten;
  auf?: Grund;
  als?: 'div' | 'ul' | 'ol';
  /** Klassen am Behälter (Abstand nach außen) */
  className?: string;
  /** Klassen am Raster selbst (z. B. Blattkante) */
  rasterKlasse?: string;
};

export function Fugenraster({ children, spalten = 3, auf = 'hell', als: Element = 'div', className, rasterKlasse, ...rest }: FugenrasterProps) {
  return (
    <div className={verbinde('@container', className)}>
      <Element {...rest} className={verbinde('grid border-t border-l', SPALTEN[spalten], FUGE[auf], rasterKlasse)}>
        {children}
      </Element>
    </div>
  );
}

export type FugenfeldProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  /** 2 = über zwei Spalten, sobald es zwei gibt */
  spanne?: 1 | 2;
  /** Innenabstand: normal 24 px (ab lg 32 px) · eng 16 px · keiner */
  innen?: 'normal' | 'eng' | 'keiner';
  /** Fläche: keine (Grund scheint durch) · fliese · kalk */
  flaeche?: 'keine' | 'fliese' | 'kalk';
  auf?: Grund;
  als?: 'div' | 'li' | 'article';
};

const INNEN = { normal: 'p-k-5 lg:p-k-6', eng: 'p-k-4', keiner: '' } as const;
const FLAECHE = { keine: '', fliese: 'bg-k-fliese', kalk: 'bg-k-kalk' } as const;

export function Fugenfeld({ children, spanne = 1, innen = 'normal', flaeche = 'keine', auf = 'hell', als: Element = 'div', className, ...rest }: FugenfeldProps) {
  return (
    <Element {...rest} className={verbinde('min-w-0 border-r border-b', FUGE[auf], spanne === 2 && '@xl:col-span-2', INNEN[innen], FLAECHE[flaeche], className)}>
      {children}
    </Element>
  );
}
