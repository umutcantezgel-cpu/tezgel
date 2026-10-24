// Bildfeld (KERN K-006, K-012): Foto im Raster mit Rahmen aus Fuge. next/image mit den festen Maßen der Bilddatei
// (das Seitenverhältnis bleibt, kein Zuschnitt per CSS, keine Layoutverschiebung). Beschriftung in Archivo, Quelle in Mono.
// v3: echte Fotos per Kennung aus `src/config/arbeiten.ts` (Maße, Alt-Text und Platzhalter aus der Bilddatei), `sizes` je
// Bildplatz aus `_werkstatt/bildplaetze.md`, unscharfer Platzhalter bis zum Laden. Vorgeladen wird nur das tatsächliche
// LCP-Bild (lcp); alle anderen Bilder laden verzögert.
import type { ReactNode } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ARBEITEN, type ArbeitId } from '@/config/arbeiten';

export type BildfeldSpalten = 'voll' | 'halb' | 'drittel';

/** sizes je Anteil an der Satzbreite; das Drittel folgt dem Feldraster (2 Spalten ab md, 3 ab lg) */
const GROESSEN: Record<BildfeldSpalten, string> = {
  voll: '(min-width: 1312px) 1312px, 100vw',
  halb: '(min-width: 768px) 50vw, 100vw',
  drittel: '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
};

interface Gemeinsam {
  spalten?: BildfeldSpalten;
  /** eigene sizes des Bildplatzes; geht vor `spalten` */
  sizes?: string;
  /** true nur für das tatsächliche LCP-Bild (preload) */
  lcp?: boolean;
  beschriftung?: ReactNode;
  /** Quelle, in Mono unter der Beschriftung */
  quelle?: ReactNode;
  /** als Fliese einer verlegten Fläche (Raster mit 1-px-Fugen): Bild ohne eigenen Rahmen, Beschriftung mit Innenabstand
   *  und ohne Silbentrennung */
  flaeche?: boolean;
  className?: string;
}

interface MitArbeit extends Gemeinsam {
  /** Foto aus `ARBEITEN` (Bildplatz-Kennung) */
  arbeit: ArbeitId;
  src?: never;
}

interface MitDatei extends Gemeinsam {
  arbeit?: never;
  src: string;
  /** Pflicht. Leerer String nur bei rein dekorativen Bildern; dann ist das figure für Screenreader ausgeblendet */
  alt: string;
  /** Breite und Höhe der Bilddatei in Pixeln (aus der Datei gelesen, nicht geschätzt) */
  breite: number;
  hoehe: number;
  /** Platzhalter als Daten-URL (optional) */
  blur?: string;
}

export type BildfeldProps = MitArbeit | MitDatei;

export default function Bildfeld(props: BildfeldProps) {
  const { spalten = 'voll', sizes, lcp = false, beschriftung, quelle, flaeche = false, className } = props;
  const bild = props.arbeit ? ARBEITEN[props.arbeit] : props;
  return (
    <figure className={className} aria-hidden={bild.alt === '' || undefined}>
      <div className={flaeche ? 'bg-fliese' : 'border border-fuge bg-fliese'}>
        <Image
          src={bild.src}
          alt={bild.alt}
          width={bild.breite}
          height={bild.hoehe}
          sizes={sizes ?? GROESSEN[spalten]}
          preload={lcp}
          placeholder={bild.blur ? 'blur' : 'empty'}
          blurDataURL={bild.blur}
          className="block h-auto w-full"
        />
      </div>
      {(beschriftung || quelle) && (
        <figcaption className={flaeche ? 'px-4 pt-3 pb-4' : 'mt-3'}>
          {beschriftung && <span className={clsx('block font-text text-fs-2 text-tinte', flaeche && 'hyphens-none')}>{beschriftung}</span>}
          {quelle && <span className="mt-1 block font-mono text-fs-1 text-tinte-2">{quelle}</span>}
        </figcaption>
      )}
    </figure>
  );
}
