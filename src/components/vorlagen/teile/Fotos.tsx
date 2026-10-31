// Vorlagen · Fotos als verlegte Fläche (KERN v3 K-012; E-023, E-025): echte Fotos mit kurzer Unterschrift in einem
// geraden Raster mit 1-px-Fugen (kein Versatz: den tragen Lage und Ablauf), schmal einspaltig (große Systemschrift: ein
// Foto über die volle Breite), ab 42 rem zweispaltig (am Handy untereinander statt aneinandergequetscht, K-016), ab 64 rem
// dreispaltig.
// Glaspaar (UM-E4-SICHT-FIX M-B6 Nr. 2 und 3, K-016): zwei Fotos desselben Vorgangs als zwei Glasbilder an einer 1-px-Fuge, der
// Name auf der Glasfläche statt einer Unterschrift darunter, jedes Foto ganz im eigenen Seitenverhältnis und höchstens 70svh
// hoch (glas-hoch, --bild-format aus der Bilddatei): Kopf und Paar passen bei d1440 in eine Bildschirmhöhe. Ab md nebeneinander
// und gemeinsam mittig, darunter untereinander. Serverkomponente.
import type { CSSProperties } from 'react';
import clsx from 'clsx';
import Bildfeld from '@/components/kern/Bildfeld';
import Glasbild from '@/components/kern/Glasbild';
import { ARBEITEN, type ArbeitId } from '@/config/arbeiten';

export interface Foto {
  bild: ArbeitId;
  unterschrift: string;
}

export default function Fotos({ fotos, spalten = 3 }: { fotos: Foto[]; spalten?: 1 | 2 | 3 }) {
  return (
    <div className="@container">
      {/* ein einzelnes Foto steht mittig in der Breite einer Textspalte, nicht über die ganze Seite (K-016) */}
      <ul className={clsx('grid grid-cols-1 gap-px border border-fuge bg-fuge', spalten === 1 ? 'mx-auto max-w-mass' : '@2xl:grid-cols-2', spalten === 3 && '@5xl:grid-cols-3')}>
        {fotos.map((f) => (
          <li key={f.bild} className="bg-kalk">
            <Bildfeld
              arbeit={f.bild}
              sizes={spalten === 3 ? '(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw' : spalten === 2 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 40rem, 100vw'}
              beschriftung={f.unterschrift}
              flaeche
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Seitenverhältnis (Breite : Höhe) eines Fotos aus ARBEITEN als CSS-Variable für glas-hoch */
export function bildFormat(bild: ArbeitId): CSSProperties {
  const { breite, hoehe } = ARBEITEN[bild];
  return { '--bild-format': breite / hoehe } as CSSProperties;
}

/** Zwei Glasbilder an einer 1-px-Fuge (Zweierbild im Beleg, M-B6 Nr. 3): ab md nebeneinander, gemeinsam mittig, die Fuge links am
 *  zweiten Bild; darunter untereinander mit der Fuge oben. Ohne Link, der Name steht immer auf dem kurzen Verlauf (verlauf).
 *  Ohne Link ist die Glasfläche aria-hidden (kern/Glasbild); der Name bleibt darum als Bildunterschrift für Vorleser im Baum
 *  (figcaption, nur für Hilfsmittel), wie vorher die sichtbare Unterschrift (Prüfung SF-B2). */
export function Glaspaar({ fotos }: { fotos: Foto[] }) {
  return (
    <div className="flex flex-col items-center md:flex-row md:items-start md:justify-center">
      {fotos.map((f, i) => (
        <figure key={f.bild} style={bildFormat(f.bild)} className={clsx('glas-hoch', i > 0 && 'border-t border-fuge md:border-t-0 md:border-l')}>
          <Glasbild arbeit={f.bild} name={f.unterschrift} verlauf sizes="(min-width: 768px) 50vw, 100vw" />
          <figcaption className="sr-only">{f.unterschrift}</figcaption>
        </figure>
      ))}
    </div>
  );
}
