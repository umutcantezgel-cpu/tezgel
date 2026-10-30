// Bildfeld (KERN K-006, K-012): Foto im Raster mit Rahmen aus Fuge. next/image mit den festen Maßen der Bilddatei
// (das Seitenverhältnis bleibt, kein Zuschnitt per CSS, keine Layoutverschiebung). Beschriftung in Archivo, Quelle in Mono.
// v3: echte Fotos per Kennung aus `src/config/arbeiten.ts` (Maße, Alt-Text und Platzhalter aus der Bilddatei), `sizes` je
// Bildplatz aus `_werkstatt/bildplaetze.md`, unscharfer Platzhalter bis zum Laden. Vorgeladen wird nur das tatsächliche
// LCP-Bild (lcp); alle anderen Bilder laden verzögert.
// Bildauswahl je Breite (`gross`, UM-E4-START): ab einer Medienabfrage ein anderer Zuschnitt derselben Aufnahme (Art Direction
// nach der Next-16-Doku Image „Art direction“, getImageProps): <picture> mit einer <source> samt eigener Breite und Höhe (kein
// Layoutsprung), das <img> trägt den Zuschnitt darunter. Der Browser lädt genau eine Datei, mit hoher Priorität, wenn `lcp`.
// Beide Zuschnitte zeigen dieselbe Aufnahme, darum gilt ein Alt-Text. Unscharfer Platzhalter wie bei jedem Bildfeld (K-006;
// Nacharbeit UM-E4-START, Prüfung A: er fehlte am Startfoto): der des kleinen Zuschnitts als Hintergrund des <img>, deckend
// gefüllt (cover), auch unter dem großen Zuschnitt; beide zeigen dieselbe Aufnahme. getImageProps nimmt ihn nach dem Laden
// nicht weg; hinter einem deckenden Foto ist er dann nicht mehr zu sehen.
// Vorladen (lcp): Für ein einzelnes <img> mit hoher Priorität setzt React selbst ein preload in den Kopf, für ein <img> in
// <picture> nicht (die <source> könnte gewinnen). Darum hier je Zuschnitt ein preload mit eigener Medienabfrage, die sich
// ausschließen (gross.media und ihr Gegenteil): Es lädt genau die Datei vor, die das <picture> wählt (Messung UM-E4-START:
// ohne preload lag das LCP am Desktop rund 70 ms später).
import type { ReactNode } from 'react';
import { preload } from 'react-dom';
import Image, { getImageProps } from 'next/image';
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
  /** true nur für das tatsächliche LCP-Bild: sofort laden mit hoher Priorität (statt preload, Next-16-Doku Image; E-034) */
  lcp?: boolean;
  beschriftung?: ReactNode;
  /** Quelle, in Mono unter der Beschriftung */
  quelle?: ReactNode;
  /** anderer Zuschnitt derselben Aufnahme ab `media` (Kennung aus ARBEITEN, eigene sizes) */
  gross?: { arbeit: ArbeitId; media: string; sizes: string };
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
  const { spalten = 'voll', sizes, lcp = false, beschriftung, quelle, flaeche = false, gross, className } = props;
  const bild = props.arbeit ? ARBEITEN[props.arbeit] : props;
  return (
    <figure className={className} aria-hidden={bild.alt === '' || undefined}>
      <div className={flaeche ? 'bg-fliese' : 'border border-fuge bg-fliese'}>
        {gross ? (
          <Bildauswahl bild={bild} sizes={sizes ?? GROESSEN[spalten]} lcp={lcp} gross={gross} />
        ) : (
          <Image
            src={bild.src}
            alt={bild.alt}
            width={bild.breite}
            height={bild.hoehe}
            sizes={sizes ?? GROESSEN[spalten]}
            loading={lcp ? 'eager' : undefined}
            fetchPriority={lcp ? 'high' : undefined}
            placeholder={bild.blur ? 'blur' : 'empty'}
            blurDataURL={bild.blur}
            className="block h-auto w-full"
          />
        )}
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

/** Bildauswahl je Breite: <source> für den großen Zuschnitt ab `media`, darunter das <img> des kleinen (Art Direction) */
function Bildauswahl({ bild, sizes, lcp, gross }: { bild: { src: string; alt: string; breite: number; hoehe: number; blur?: string }; sizes: string; lcp: boolean; gross: NonNullable<Gemeinsam['gross']> }) {
  const g = ARBEITEN[gross.arbeit];
  const {
    props: { srcSet: grossSet, src: grossSrc },
  } = getImageProps({ src: g.src, alt: g.alt, width: g.breite, height: g.hoehe, sizes: gross.sizes });
  const { props: klein } = getImageProps({
    src: bild.src,
    alt: bild.alt,
    width: bild.breite,
    height: bild.hoehe,
    sizes,
    loading: lcp ? 'eager' : undefined,
    fetchPriority: lcp ? 'high' : undefined,
    placeholder: bild.blur ? 'blur' : 'empty',
    blurDataURL: bild.blur,
  });
  if (lcp) {
    preload(grossSrc, { as: 'image', imageSrcSet: grossSet, imageSizes: gross.sizes, fetchPriority: 'high', media: gross.media });
    preload(klein.src, { as: 'image', imageSrcSet: klein.srcSet, imageSizes: sizes, fetchPriority: 'high', media: `not all and ${gross.media}` });
  }
  return (
    <picture>
      <source media={gross.media} srcSet={grossSet} sizes={gross.sizes} width={g.breite} height={g.hoehe} />
      {/* Art Direction nach der Next-Doku: getImageProps liefert die Props des <img> */}
      <img {...klein} alt={bild.alt} className="block h-auto w-full" />
    </picture>
  );
}
