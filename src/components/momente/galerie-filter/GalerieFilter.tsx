// Großer Moment `galerie-filter` (KERN v3.4 K-007, /referenzen, E3-GRAF-08): Galerie „Unsere Arbeiten“ mit Filter nach Raum.
// Serverkomponente: baut je Foto das Glasbild (vollständig, Name und Link zur Leistung auf der Glasfläche, K-016; next/image
// mit festen Maßen, Platzhalter, verzögertes Laden; verborgene Fotos laden erst, wenn sie gezeigt werden) und gibt die
// fertigen Knoten an die Insel GalerieWahl, die nur auswählt. Platz: Schlitz momente.beleg der ErzaehlSeite, direkt unter
// der H2 „Unsere Arbeiten in Bildern.“ (#unsere-arbeiten). Eingeklappt und im Verband (UM-E4-SICHT-FIX M-C3): siehe GalerieWahl.
// Platzhalter (UM-E4-SICHT-FIX R-1): Der unscharfe Platzhalter jedes Fotos (WebP, 16 px, aus ARBEITEN) steht als kleines
// Rasterbild hinter dem Foto, gestreckt und damit weich, statt des SVG mit Weichzeichner von next/image: Jedes dieser SVG ist ein
// eigenes Dokument, das der Browser beim ersten Zeichnen anlegt (Leistungsspur /referenzen m390: rund 9 ms je Foto bei CPU 4×,
// beim Aufklappen 18 auf einmal, beim Hereinscrollen 6).
import Glasbild from '@/components/kern/Glasbild';
import { ARBEITEN } from '@/config/arbeiten';
import GalerieWahl from './GalerieWahl';
import { GALERIE, GRUPPEN, SATZ } from './daten';

/** sizes zu den Spalten der Galerie: drei ab etwa 1024 px, zwei ab etwa 700 px, darunter eine (K-016: je Foto groß) */
const GROESSEN = '(min-width: 1024px) 30vw, (min-width: 700px) 45vw, 100vw';

export default function GalerieFilter({ satz = SATZ }: { satz?: string }) {
  return (
    <GalerieWahl
      satz={satz}
      fotos={GALERIE.map((f) => ({
        bild: f.bild,
        gruppe: f.gruppe,
        // unscharfer Platzhalter als kleines Rasterbild (UM-E4-SICHT-FIX R-1, GalerieWahl und globals.css „Galerie“)
        platzhalter: ARBEITEN[f.bild].blur,
        // ohne Unterschrift darunter: Name und Weg zur Leistung auf der Glasfläche (K-016, E-047)
        // ohne Maus nur der Name auf dem kurzen Verlauf, „Ansehen“ bleibt für den Vorleser (verlauf, M-C3 Nr. 2)
        knoten: <Glasbild arbeit={f.bild} name={f.unterschrift} href={GRUPPEN.find((g) => g.id === f.gruppe)?.href} sizes={GROESSEN} verlauf />,
      }))}
    />
  );
}
