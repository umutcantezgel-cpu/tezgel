// Bild (P4-02, KERN v1.2, K-004/K-008): next/image im festen Rahmen 2:1 oder 1:1 mit 1-px-Fugenrahmen, ohne Filter,
// ohne Zoom beim Hover, ohne Text auf dem Bild. Zuschnitt auf den Rahmen (`cover`) ist der Standard; trägt das Bild eine
// Kennzeichnung (z. B. das Zeichen eines Bildgenerators unten rechts), die der Zuschnitt abschneiden würde, steht es
// ungeschnitten (`einpassen`, `contain`) auf Kalk. Alt-Text beschreibt, was zu sehen ist; generierte Bilder tragen
// „(generierte Darstellung)“ (M-17, MIKROTEXTE Klasse 2) – der Wortlaut kommt vom Aufrufer.
// `preload` nur für das LCP-Bild (Next 16 statt `priority`); Qualität Standard (images.qualities [75]).
import Image from 'next/image';
import { verbinde } from '@/components/kern/basis';

export type BildAngaben = {
  src: string;
  /** beschreibend; leer ('') nur, wenn das Bild rein dekorativ ist */
  alt: string;
  /** Kennzeichnung im Bild sichtbar halten: ungeschnitten auf Kalk */
  einpassen?: boolean;
};

export type BildProps = BildAngaben & {
  verhaeltnis?: '2/1' | '1/1';
  /** `sizes` für next/image (Pflicht nach K-004) */
  sizes: string;
  preload?: boolean;
  /** Fugenrahmen: voll (Standard) · unten (Bild als Kopf eines Feldes) · keiner (Feld trägt die Fuge) */
  rahmen?: 'voll' | 'unten' | 'keiner';
  className?: string;
};

const RAHMEN = { voll: 'border border-k-fuge', unten: 'border-b border-k-fuge', keiner: '' } as const;

export default function Bild({ src, alt, einpassen = false, verhaeltnis = '2/1', sizes, preload = false, rahmen = 'voll', className }: BildProps) {
  return (
    <div className={verbinde('relative w-full overflow-hidden bg-k-kalk', RAHMEN[rahmen], verhaeltnis === '1/1' ? 'aspect-square' : 'aspect-2/1', className)}>
      <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className={einpassen ? 'object-contain' : 'object-cover'} />
    </div>
  );
}
