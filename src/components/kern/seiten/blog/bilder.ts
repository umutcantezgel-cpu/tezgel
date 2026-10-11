// Bilder der Ratgeber-Liste `/blog` (P4-08d, KERN v1.2 K-008): Zuschnitt auf den Rahmen (`cover`) ist der Standard.
// Vier Bilder tragen unten rechts sichtbar das Zeichen eines Bildgenerators (geprüft an den Originalen, intern I-01); der
// Zuschnitt dürfte es abschneiden, darum stehen sie ungeschnitten (`einpassen`, `contain`) auf Kalk.
// `gaeste-bad.png` trägt die Kennzeichnung nur in den Metadaten (C2PA), nicht im Bild – es wird normal zugeschnitten.
// Alt-Text: Bestandswortlaut (Artikeltitel), bis MIKROTEXTE beschreibende Alt-Texte mit „(generierte Darstellung)“ freigibt
// (M-17, Vorschlag in der Rückgabe P4-08d).
import type { BildAngaben } from '@/components/kern/vorlagen/liste/Bild';

const MIT_ZEICHEN = new Set([
  '/images/bad/bad-beleuchtete-nischen.webp',
  '/images/bad/bad-freistehende-wanne.webp',
  '/images/bad/bad-tageslicht.webp',
  '/images/bad/walk-in-dusche.webp',
]);

export function bildVon(src: string | undefined, alt: string): BildAngaben | undefined {
  if (!src) return undefined;
  return { src, alt, einpassen: MIT_ZEICHEN.has(src) };
}
