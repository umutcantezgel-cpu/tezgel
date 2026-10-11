// Vorschau P4-02 · gemeinsame Vorschaudaten. Alt-Texte der (generierten) Bilder in `public/images/bad/` als Vorschlag
// für MIKROTEXTE Klasse 2 (M-17): beschreibt, was zu sehen ist, mit „(generierte Darstellung)“; die Bestands-Alt-Texte
// sind der Artikeltitel. `einpassen`: Das Bild trägt unten rechts das Zeichen des Bildgenerators, das der 2:1-Zuschnitt
// abschneiden würde (K-008) – es steht ungeschnitten auf Kalk.
import { categories } from '@/config/blog';
import type { BildAngaben } from '@/components/kern/vorlagen/liste/Bild';

export const BILDER: Record<string, Omit<BildAngaben, 'src'>> = {
  '/images/bad/bad-glastuer.webp': {
    alt: 'Bad mit raumhoher Glaswand vor der bodengleichen Dusche, freistehender Wanne und Boden in Holzoptik im Fischgrätmuster (generierte Darstellung)',
  },
  '/images/bad/bad-holz-dampf.webp': {
    alt: 'Bad mit großformatigen Wandplatten in Rostoptik, dampfender Dusche hinter Glas und Waschschale auf Holzunterschrank (generierte Darstellung)',
  },
  '/images/bad/bad-holz-waschtisch.webp': {
    alt: 'Bad mit großformatigen Wandplatten in Rostoptik, Glasdusche, Spiegel und Waschschale auf Holzunterschrank (generierte Darstellung)',
  },
  '/images/bad/wandfliesen-gruen.webp': {
    alt: 'Küchenrückwand aus grün glasierten Stäbchenfliesen hinter einer messingfarbenen Armatur (generierte Darstellung)',
  },
  '/images/bad/bad-freistehende-wanne.webp': {
    alt: 'Freistehende Badewanne vor bodentiefen Fenstern, Boden aus großformatigen hellen Natursteinplatten (generierte Darstellung)',
    einpassen: true,
  },
  '/images/bad/bad-tageslicht.webp': {
    alt: 'Freistehende Badewanne vor einer Fensterfront mit Blick ins Grüne, daneben Waschtisch auf Holzunterschrank (generierte Darstellung)',
    einpassen: true,
  },
  '/images/bad/gaeste-bad.png': {
    alt: 'Bad mit Wandplatten in Marmoroptik, Glasdusche, Wand-WC und Waschtisch mit Spiegel und Bildschirmanzeige (generierte Darstellung)',
    einpassen: true,
  },
  '/images/bad/walk-in-dusche.webp': {
    alt: 'Bodengleiche Dusche mit weißen Wandfliesen, Haltegriffen, Klappsitz und Duschrinne unter einem Oberlicht (generierte Darstellung)',
    einpassen: true,
  },
  '/images/bad/bad-beleuchtete-nischen.webp': {
    alt: 'Bad mit beleuchteten Wandnischen in der Dusche, Glaswand und freistehender Wanne vor einem großen Fenster (generierte Darstellung)',
    einpassen: true,
  },
};

export function bild(src: string | undefined): BildAngaben | undefined {
  if (!src) return undefined;
  const angaben = BILDER[src];
  return angaben ? { src, ...angaben } : undefined;
}

export function kategorieName(id: string): string {
  return categories.find((c) => c.id === id)?.name ?? id;
}
