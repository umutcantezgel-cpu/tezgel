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
// (auf q844 brach sie sonst in 110 px um); bis UM-E4-SICHT-FIX-2 stand sie ab lg links neben dem Regler (zwei Spalten, seit
// M2-C2 die Bühne, unten). Die Wörter am Griff stehen nur, wenn die Bühne mindestens 18rem breit
// ist, sonst wie vorher als Zeile unter dem Bild; nahe am Rand blenden sie aus, bevor die Bühne sie anschneiden würde (nur
// opacity, an --teilung gebunden, bewegung.css). Serverkomponente; nur der Regler ist eine Insel.
// Bühne statt Breite (UM-E4-SICHT-FIX-2 M2-C2 Nr. 1, Sicht E4 Anlauf 2: am Desktop nur 370 px, die Anleitung als zweiter Strang
// daneben): auf allen Breiten einspaltig mittig, die Anleitung mittig über dem Regler (M-C3 Nr. 3 bleibt). Mit `aufTinte` steht
// der Moment auf der Fläche Tinte des Abschnitts (/referenzen): Anleitung in nacht-2, Rahmen der Bühne in nacht-fuge, das Lot in
// Kalk mit Kanten in Tinte (der Griff ist schon hell), die Wörter am Griff bleiben. Ab lg reicht die Bühne bis zur Bildschirmhöhe
// unter dem Kopf (bewegung.css .vn-hoehe): d1440 rund 410 px breit, d1920 rund 500 px. Breiter ginge nur mit anderem Zuschnitt
// (E-104 Nr. 6).
import { useId, type CSSProperties } from 'react';
import clsx from 'clsx';
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
  /** Der Abschnitt steht auf Tinte (Bühne, M2-C2): helle Anleitung, Rahmen und Lot */
  aufTinte?: boolean;
}

export default function VorherNachher({ vorher, nachher, titelId, unterschrift, aufTinte = false }: VorherNachherProps) {
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, '');
  const hinweisId = `vn-${uid}-hinweis`;
  // Seitenverhältnis der Fotos für die Höhenbegrenzung (.vn-hoehe in bewegung.css): ganzes Foto in einem Bildschirm
  const seite = { '--vn-seite': ARBEITEN[nachher].breite / ARBEITEN[nachher].hoehe } as CSSProperties;
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md lg:max-w-seite">
        <figure>
          <figcaption id={hinweisId} className={clsx('mx-auto mb-4 max-w-mass text-center font-text text-fs-3 text-pretty lg:mb-6', aufTinte ? 'text-nacht-2' : 'text-tinte-2')}>
            {unterschrift}
          </figcaption>
          <div className="vn-hoehe @container mx-auto w-full" style={seite}>
            <div className={clsx('vn-buehne relative overflow-hidden border bg-fliese', aufTinte ? 'border-nacht-fuge' : 'border-fuge')} data-motion="vorher-nachher">
              <div className="vn-fenster absolute inset-0 overflow-hidden">
                <Bildfeld arbeit={vorher} sizes={GROESSEN} flaeche className="vn-gegen" />
              </div>
              <Bildfeld arbeit={nachher} sizes={GROESSEN} flaeche />
              <div aria-hidden="true" className="vn-teiler pointer-events-none absolute inset-0">
                <span className={clsx('absolute inset-y-0 left-0 w-1 -translate-x-1/2 border-x', aufTinte ? 'border-tinte bg-kalk' : 'border-fliese bg-tinte')} />
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
            <p aria-hidden="true" className={clsx('mt-3 flex justify-between gap-4 font-text text-fs-2 font-semibold @2xs:hidden', aufTinte ? 'text-kalk' : 'text-tinte')}>
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
