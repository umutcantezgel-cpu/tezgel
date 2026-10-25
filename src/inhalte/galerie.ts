// Fotos der Ortsseiten (KERN v3 K-012): sechs echte Fotos mit kurzer Unterschrift nur über das, was zu sehen ist (keine
// Projektorte, K-015). Jede Ortsseite zeigt drei davon (`orte.ts`, fest je Ort, damit die Seite stabil bleibt). Wetzlar
// (Index 0) bekommt die Plätze 0, 2 und 4: Fotos, die auf keiner anderen Hauptansicht stehen (E4-W0-BILDER). Die
// Startseite hat seit K-016 eigene Fotos in `start.ts`.
import type { ArbeitId } from '@/config/arbeiten';

export const GALERIE_START: { bild: ArbeitId; unterschrift: string }[] = [
  { bild: 'ort-gaeste-wc', unterschrift: 'Gäste-WC mit weißen Metrofliesen' },
  { bild: 'start-galerie-1', unterschrift: 'Dusche mit Sitzbank und Mosaik' },
  { bild: 'start-galerie-5', unterschrift: 'Außentreppe mit Fliesen in Terrakotta' },
  { bild: 'start-beleg-bad', unterschrift: 'Badewanne mit dunklen Mosaikfliesen' },
  { bild: 'ort-terrasse-erdtoene', unterschrift: 'Terrasse mit rustikalen Fliesen in Erdtönen' },
  { bild: 'start-galerie-3', unterschrift: 'Balkon mit dunklen Fliesen, jede Reihe um ein Stück versetzt' },
];
