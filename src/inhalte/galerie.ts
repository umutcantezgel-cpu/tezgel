// Galerie der Startseite „So sieht unsere Arbeit aus.“ (KERN v3 K-012): sechs echte Fotos, je Raum eins, mit kurzer
// Unterschrift nur über das, was zu sehen ist (keine Projektorte, K-015). Auch Quelle der drei Fotos je Ortsseite
// (`orte.ts`, fest je Ort, damit die Seite stabil bleibt).
import type { ArbeitId } from '@/config/arbeiten';

export const GALERIE_START: { bild: ArbeitId; unterschrift: string }[] = [
  { bild: 'start-galerie-1', unterschrift: 'Dusche ohne Stufe mit Sitzbank und Mosaik' },
  { bild: 'start-galerie-2', unterschrift: 'Badewanne mit dunklen Mosaikfliesen' },
  { bild: 'start-galerie-3', unterschrift: 'Balkon mit dunklen Fliesen, jede Reihe um ein Stück versetzt' },
  { bild: 'start-galerie-4', unterschrift: 'Terrasse mit großen hellgrauen Platten' },
  { bild: 'start-galerie-5', unterschrift: 'Außentreppe mit Fliesen in Terrakotta' },
  { bild: 'start-galerie-6', unterschrift: 'Balkonboden vor dem Verlegen: ein blaues Band dichtet die Ränder ab' },
];
