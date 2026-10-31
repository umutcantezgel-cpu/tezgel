// Großer Moment vorher-nachher (KERN v3 K-007, E3-GRAF-07, Seite /referenzen, eigener Abschnitt über momente.belegZwei,
// E-045): dieselbe Treppe vorher und nachher in einem Bild, getrennt von einem Lot in Tinte mit Griff (das eine Rot je
// Bildschirm trägt die Leitachse, E-045). Links vom Lot das Vorher-Foto, rechts das Nachher-Foto; der Regler (Zeiger und
// Tastatur, direkt) verschiebt das Lot. Beide Fotos über Bildfeld (K-012) mit gleichen Maßen (Bildplätze ref-vorher und
// ref-nachher). Bewegt wird nur translate über --teilung (bewegung.css, Abschnitt vorher-nachher), ohne Übergang; reduziert
// gleich. Ohne JavaScript steht das Lot in der Mitte, beide Fotos stehen dann ganz darunter (noscript). Die Überschrift ist
// die H2 des Abschnitts (titelId), der Regler trägt ihren Namen. Mittig unter der Überschrift (K-016, Abnahme E3-BAU-07).
// Anleitung über dem Regler, „Vorher“ und „Nachher“ am Griff (UM-E4-SICHT-FIX M-C3 Nr. 3): Anleitung und Regler stehen in
// einem Bildschirm (Höhe bis 80svh, .vn-hoehe in bewegung.css); die beiden Wörter wandern mit dem Lot, ohne JavaScript
// entfallen sie mit dem Griff. Nacharbeit SF-C1: Die Anleitung steht außerhalb des Bildkastens in der Breite des Rahmens
// (auf q844 brach sie sonst in 110 px um); ab lg steht sie links neben dem Regler (zwei Spalten, der Regler in gleicher
// Größe, keine leere Fläche um eine 370-px-Säule). Die Wörter am Griff stehen nur, wenn die Bühne mindestens 18rem breit
// ist, sonst wie vorher als Zeile unter dem Bild; nahe am Rand blenden sie aus, bevor die Bühne sie anschneiden würde (nur
// opacity, an --teilung gebunden, bewegung.css). Serverkomponente; nur der Regler ist eine Insel.
import { useId, type CSSProperties } from 'react';
import Bildfeld from '@/components/kern/Bildfeld';
import Fotos from '@/components/vorlagen/teile/Fotos';
import { ARBEITEN, type ArbeitId } from '@/config/arbeiten';
import Regler from './Regler';

/** sizes laut _werkstatt/bildplaetze.md (ref-vorher, ref-nachher) */
const GROESSEN = '(min-width: 1024px) 40vw, 100vw';

export interface VorherNachherProps {
  /** Foto vorher, gleiche Maße wie nachher (ref-vorher) */
  vorher: ArbeitId;
  /** Foto nachher (ref-nachher) */
  nachher: ArbeitId;
  /** id der H2 des Abschnitts (Name des Reglers) */
  titelId: string;
  /** Unterschrift unter dem Regler aus dem Seitentext */
  unterschrift: string;
}

export default function VorherNachher({ vorher, nachher, titelId, unterschrift }: VorherNachherProps) {
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, '');
  const hinweisId = `vn-${uid}-hinweis`;
  // Seitenverhältnis der Fotos für die Höhenbegrenzung (.vn-hoehe in bewegung.css): ganzes Foto in einem Bildschirm
  const seite = { '--vn-seite': ARBEITEN[nachher].breite / ARBEITEN[nachher].hoehe } as CSSProperties;
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md lg:max-w-seite">
        <figure className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-12">
          <figcaption id={hinweisId} className="mb-4 text-center font-text text-fs-3 text-pretty text-tinte-2 lg:mb-0 lg:max-w-2/3 lg:justify-self-end lg:text-left lg:text-fs-4">
            {unterschrift}
          </figcaption>
          <div className="vn-hoehe @container mx-auto w-full lg:mx-0" style={seite}>
            <div className="vn-buehne relative overflow-hidden border border-fuge bg-fliese" data-motion="vorher-nachher">
              <div className="vn-fenster absolute inset-0 overflow-hidden">
                <Bildfeld arbeit={vorher} sizes={GROESSEN} flaeche className="vn-gegen" />
              </div>
              <Bildfeld arbeit={nachher} sizes={GROESSEN} flaeche />
              <div aria-hidden="true" className="vn-teiler pointer-events-none absolute inset-0">
                <span className="absolute inset-y-0 left-0 w-1 -translate-x-1/2 border-x border-fliese bg-tinte" />
                {/* „Vorher“ links, „Nachher“ rechts vom Lot, knapp unter dem Griff (Griff 44 px um die Mitte); erst ab 18rem
                    Bühnenbreite */}
                <span className="vn-wort-vor absolute top-1/2 right-full mt-8 mr-3 hidden border border-fuge bg-fliese px-2 py-1 font-text text-fs-2 font-semibold text-tinte noscript:hidden @2xs:block">
                  Vorher
                </span>
                <span className="vn-wort-nach absolute top-1/2 left-0 mt-8 ml-3 hidden border border-fuge bg-fliese px-2 py-1 font-text text-fs-2 font-semibold text-tinte noscript:hidden @2xs:block">
                  Nachher
                </span>
              </div>
              <Regler titelId={titelId} hinweisId={hinweisId} />
            </div>
            {/* schmale Bühne (q844, große Schrift): die Wörter als Zeile unter dem Bild wie vor M-C3 */}
            <p aria-hidden="true" className="mt-3 flex justify-between gap-4 font-text text-fs-2 font-semibold text-tinte @2xs:hidden">
              <span>Vorher</span>
              <span>Nachher</span>
            </p>
          </div>
        </figure>
        <noscript>
          <div className="mt-8">
            <Fotos fotos={[{ bild: vorher, unterschrift: 'Vorher' }, { bild: nachher, unterschrift: 'Nachher' }]} spalten={2} />
          </div>
        </noscript>
      </div>
    </div>
  );
}
