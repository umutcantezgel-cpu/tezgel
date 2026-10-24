// Großer Moment `galerie-filter` (KERN v3.4 K-007, /referenzen, E3-GRAF-08): Galerie „Unsere Arbeiten“ mit Filter nach Raum.
// Serverkomponente: baut je Foto das Bildfeld (next/image mit festen Maßen, Platzhalter, verzögertes Laden; verborgene Fotos
// laden erst, wenn sie gezeigt werden) und gibt die fertigen Knoten an die Insel GalerieWahl, die nur auswählt. Platz:
// Schlitz momente.beleg der ErzaehlSeite, direkt unter der H2 „Unsere Arbeiten in Bildern.“ (#unsere-arbeiten).
import Bildfeld from '@/components/kern/Bildfeld';
import GalerieWahl from './GalerieWahl';
import { GALERIE, SATZ } from './daten';

/** sizes wie die Galerie der Startseite (_werkstatt/bildplaetze.md, start-galerie): drei Spalten ab lg, sonst zwei */
const GROESSEN = '(min-width: 1024px) 30vw, 50vw';

export default function GalerieFilter({ satz = SATZ }: { satz?: string }) {
  return (
    <GalerieWahl
      satz={satz}
      fotos={GALERIE.map((f) => ({
        bild: f.bild,
        gruppe: f.gruppe,
        knoten: <Bildfeld arbeit={f.bild} sizes={GROESSEN} beschriftung={f.unterschrift} flaeche />,
      }))}
    />
  );
}
