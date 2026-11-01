// Vorlagen · Fotos als verlegte Fläche (KERN v3 K-012; E-023, E-025): echte Fotos mit kurzer Unterschrift in einem
// geraden Raster mit 1-px-Fugen (kein Versatz: den tragen Lage und Ablauf), schmal einspaltig (große Systemschrift: ein
// Foto über die volle Breite), ab 42 rem zweispaltig (am Handy untereinander statt aneinandergequetscht, K-016), ab 64 rem
// dreispaltig.
// Glaspaar (UM-E4-SICHT-FIX M-B6 Nr. 2 und 3, K-016): zwei Fotos desselben Vorgangs als zwei Glasbilder, der Name auf der
// Glasfläche statt einer Unterschrift darunter, jedes Foto ganz im eigenen Seitenverhältnis (--bild-format aus der Bilddatei).
// Ab md nebeneinander und gemeinsam mittig, darunter untereinander. Verband an einer echten Fuge (UM-E4-SICHT-FIX-2 M2-A4; Sicht
// Anlauf 2: die Fotos stießen bei x 720 ohne Fuge aneinander, mobil mit 2 px übereinander, und die Haarlinie zählte in der Breite
// des zweiten Bildes mit, die Unterkanten standen 1 bis 2 px versetzt): eine Fliesenstufe Fuge (gap-6) auf allen Breiten statt
// der Haarlinie. Ab md ungleich (Nacharbeit SF2-A2, Prüfung: auf /bad/barrierefreies-bad stand das Paar mit einem Versatz von 96 px
// fast so da wie die zwei gleich großen Hochformate der Galerie direkt davor): das erste Foto zwei Drittel so groß wie das zweite
// (glas-hoch-zwei-drittel neben glas-hoch, globals.css), beide unten bündig. Der Kopf des ersten steht so ein Drittel der Fotohöhe
// tiefer (Drittelverband), ohne das Paar zu verlängern: Kopf und Paar passen bei d1440 in eine Bildschirmhöhe.
// Serverkomponente.
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

/** Zwei Glasbilder im Verband (Zweierbild im Beleg, M-B6 Nr. 3, M2-A4): ab md nebeneinander, gemeinsam mittig, an einer Fuge
 *  der Stufe 6, das erste zwei Drittel so groß, beide unten bündig; darunter untereinander mit derselben Fuge, beide gleich breit
 *  (höchstens 70svh hoch). Das kleinere ist das erste: Der Weg geht vom Bau zum größeren Bild, und der kürzere Name des ersten
 *  Fotos bleibt auf der schmaleren Kachel bei zwei Zeilen (Bildunterschriften der Inhalte). Ohne Link, der Name steht immer auf
 *  dem kurzen Verlauf (verlauf). Ohne Link ist die Glasfläche aria-hidden (kern/Glasbild); der Name bleibt darum als
 *  Bildunterschrift für Vorleser im Baum (figcaption, nur für Hilfsmittel), wie vorher die sichtbare Unterschrift (Prüfung SF-B2).
 *  Statischer Versatz, keine Bewegung. */
export function Glaspaar({ fotos }: { fotos: Foto[] }) {
  return (
    <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-center">
      {fotos.map((f, i) => (
        <figure key={f.bild} style={bildFormat(f.bild)} className={clsx('glas-hoch', i === 0 && fotos.length > 1 && 'md:glas-hoch-zwei-drittel')}>
          <Glasbild arbeit={f.bild} name={f.unterschrift} verlauf sizes="(min-width: 768px) 50vw, 100vw" />
          <figcaption className="sr-only">{f.unterschrift}</figcaption>
        </figure>
      ))}
    </div>
  );
}
