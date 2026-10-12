// Bildfeld (KERN K-006, K-009): Foto im Raster mit Rahmen aus Fuge. next/image mit den festen Maßen der Bilddatei
// (das Seitenverhältnis bleibt, kein Zuschnitt per CSS, keine Layoutverschiebung). Beschriftung in Archivo, Quelle in Mono.
// Vorgeladen wird nur das tatsächliche LCP-Bild (lcp); alle anderen Bilder laden verzögert.
import type { ReactNode } from 'react';
import Image from 'next/image';

export type BildfeldSpalten = 'voll' | 'halb' | 'drittel';

/** sizes je Anteil an der Satzbreite; das Drittel folgt dem Feldraster (2 Spalten ab md, 3 ab lg) */
const GROESSEN: Record<BildfeldSpalten, string> = {
  voll: '(min-width: 1312px) 1312px, 100vw',
  halb: '(min-width: 768px) 50vw, 100vw',
  drittel: '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
};

export interface BildfeldProps {
  src: string;
  /** Pflicht. Leerer String nur bei rein dekorativen Bildern; dann ist das figure für Screenreader ausgeblendet */
  alt: string;
  /** Breite und Höhe der Bilddatei in Pixeln (aus der Datei gelesen, nicht geschätzt) */
  breite: number;
  hoehe: number;
  spalten?: BildfeldSpalten;
  /** true nur für das tatsächliche LCP-Bild (preload) */
  lcp?: boolean;
  beschriftung?: ReactNode;
  /** Quelle, in Mono unter der Beschriftung */
  quelle?: ReactNode;
  className?: string;
}

export default function Bildfeld({ src, alt, breite, hoehe, spalten = 'voll', lcp = false, beschriftung, quelle, className }: BildfeldProps) {
  return (
    <figure className={className} aria-hidden={alt === '' || undefined}>
      <div className="border border-fuge bg-fliese">
        <Image src={src} alt={alt} width={breite} height={hoehe} sizes={GROESSEN[spalten]} preload={lcp} className="block h-auto w-full" />
      </div>
      {(beschriftung || quelle) && (
        <figcaption className="mt-3">
          {beschriftung && <span className="block font-text text-fs-2 text-tinte">{beschriftung}</span>}
          {quelle && <span className="mt-1 block font-mono text-fs-1 text-tinte-2">{quelle}</span>}
        </figcaption>
      )}
    </figure>
  );
}
