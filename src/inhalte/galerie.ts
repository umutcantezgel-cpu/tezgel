// Fotos der Ortsseiten (KERN v3 K-012): sechs echte Fotos mit kurzer Unterschrift nur über das, was zu sehen ist (keine
// Projektorte, K-015). Jede Ortsseite zeigt drei davon (`orte.ts`, fest je Ort, damit die Seite stabil bleibt); Wetzlar zeigt seit
// der SEO-Runde P5 eigene Fotos (`orte-eigen.ts`), vorher die Plätze 0, 2 und 4. Bildtabelle
// UM-E4-SICHT-FIX-2 M2-B1 (E-113 Nr. 7; Sicht Anlauf 2, 4a: Laub, Pflanzkübel, Klobürste und Balken; 4b: die Reihe zeigte die
// Fliesenarbeit kaum): fertige Arbeiten aus Bad, Terrasse und Treppe. Die Regel aus E4-W0-BILDER („Wetzlar zeigt nur Fotos, die
// auf keiner anderen Hauptansicht stehen“) gilt nicht mehr: start-beleg-terrasse, start-beleg-bad und start-beleg-treppe stehen
// auch auf /, badsanierung-einstieg auch auf /bad/badsanierung, balkon-beleg-aluprofil auch auf /balkon-terrasse (kein Foto
// zweimal auf derselben Seite, außerhalb der Galerie von /referenzen jedes höchstens zweimal). Die Startseite hat seit K-016
// eigene Fotos in `start.ts`.
import type { ArbeitId } from '@/config/arbeiten';

export const GALERIE_START: { bild: ArbeitId; unterschrift: string }[] = [
  { bild: 'badsanierung-einstieg', unterschrift: 'Badewanne mit Ornamentfliesen und Nische' },
  { bild: 'start-beleg-bad', unterschrift: 'Badewanne mit dunklen Mosaikfliesen' },
  { bild: 'start-beleg-terrasse', unterschrift: 'Terrasse mit blaugrauen Fliesen' },
  { bild: 'balkon-beleg-aluprofil', unterschrift: 'Terrassenkante mit hellem Aluprofil' },
  { bild: 'kontakt-eingang', unterschrift: 'Treppenstufen mit beigen Fliesen' },
  { bild: 'start-beleg-treppe', unterschrift: 'Außentreppe mit anthrazitfarbenen Fliesen' },
];
