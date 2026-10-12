// Einstieg (KERN K-006, K-009): Erzählansicht – H1 links bündig an der Laserachse, Vorspann, Aktionen,
// Randspalte (Planblatt: Plan und Schriftfeld über die Höhe der Textspalte). Arbeitsansicht – kompakter Kopf (H1 text-fs-6).
// Lange Titel (> 44 Zeichen) auch in Erzählansichten text-fs-6; Etiketten unter sm Glied für Glied untereinander.
// Startseite: SIG-1 Kreuzlinie (kreuzlinie), die Zeilen der H1 tragen data-motion="sig-flucht".
// Flucht: Lot bzw. Kreuzlinie stehen im Seitenrand vor der Inhaltskante; Etikett, H1 und Text beginnen an derselben
// Kante wie alle Abschnitte (kein Einzug).
import { Children, isValidElement, type ReactNode } from 'react';
import clsx from 'clsx';
import Laserachse from './Laserachse';
import Kreuzlinie from './Kreuzlinie';
import { ACHSE_LAGE } from './Leitachse';
import { etikettKlassen, seitenKlassen } from './stile';

export interface EinstiegProps {
  art?: 'erzaehl' | 'arbeit';
  /** Pfad über dem Etikett (Brotkrumen-Navigation als eigenes Element, nicht im Etikett-Absatz) */
  pfad?: ReactNode;
  etikett?: ReactNode;
  titel: ReactNode;
  /** H1 in festen Zeilen (je Zeile ein Block); mit kreuzlinie rücken die Zeilen gestaffelt in die Flucht */
  titelZeilen?: ReactNode[];
  /** zweite Zeile der H1 (Teil der Überschrift, kleiner gesetzt) */
  unterzeile?: ReactNode;
  vorspann?: ReactNode;
  aktionen?: ReactNode;
  /** Randspalte rechts (Desktop) bzw. nach den Aktionen (mobil) */
  rand?: ReactNode;
  /** Inhalt in der Textspalte nach den Aktionen (z. B. Zusagen, Leitsatz) – vor der Randspalte im Lesefluss */
  merkmale?: ReactNode;
  /** Inhalt unter dem Einstieg im selben Raster */
  fuss?: ReactNode;
  achse?: boolean;
  /** SIG-1 (nur Startseite): Kreuzlinie statt Laserachse, die Zeilen der H1 rücken in die Flucht */
  kreuzlinie?: boolean;
  id?: string;
  className?: string;
}

/** Länge des sichtbaren Texts eines Knotens (für die H1-Stufe: lange Titel eine Stufe kleiner, E4-NACH-01) */
function textLaenge(knoten: ReactNode): number {
  let n = 0;
  Children.forEach(knoten, (k) => {
    if (typeof k === 'string' || typeof k === 'number') n += String(k).length;
    else if (isValidElement<{ children?: ReactNode }>(k)) n += textLaenge(k.props.children);
  });
  return n;
}

/** Ab dieser Zeichenzahl steht die H1 einer Erzählansicht in text-fs-6 (≤ 3 Zeilen bei 1440 px, E3-SICHT-ERZ Befund 4) */
const LANGER_TITEL = 44;
/** Ab dieser Zeichenzahl steht der Vorspann in text-fs-3 (statt bis zu sieben Zeilen fs-4 bei 1440 px, E3-SICHT-2-ERZ Befunde 10, 25);
 *  unter sm immer text-fs-3, damit Plan bzw. Kennwerte mobil früher kommen (Befund Q4) */
const LANGER_VORSPANN = 280;

export default function Einstieg({ art = 'erzaehl', pfad, etikett, titel, titelZeilen, unterzeile, vorspann, aktionen, merkmale, rand, fuss, achse = art === 'erzaehl', kreuzlinie = false, id, className }: EinstiegProps) {
  const erzaehl = art === 'erzaehl';
  const langerTitel = textLaenge(titelZeilen ?? titel) > LANGER_TITEL;
  const langerVorspann = textLaenge(vorspann) > LANGER_VORSPANN;
  return (
    <header id={id} className={clsx('relative border-b border-fuge', erzaehl ? 'pt-24 pb-16 lg:pt-32 lg:pb-24' : 'pt-24 pb-12 lg:pt-32 lg:pb-16', className)}>
      <div className={clsx(seitenKlassen, 'relative')}>
        {kreuzlinie ? <Kreuzlinie className={clsx('-top-8', ACHSE_LAGE)} /> : achse && <Laserachse className={ACHSE_LAGE} />}
        <div className={clsx('grid grid-cols-4 gap-y-12 md:grid-cols-8 lg:grid-cols-12', erzaehl ? 'lg:gap-x-12' : 'lg:gap-x-8')}>
          <div className={clsx('col-span-4 md:col-span-8', rand ? 'lg:col-span-7' : 'lg:col-span-9')}>
            {pfad && <div className="mb-6">{pfad}</div>}
            {etikett && <p className={clsx(etikettKlassen, 'etikett-zeile mb-6 flex-wrap')}>{etikett}</p>}
            <h1 className={clsx('text-tinte', erzaehl && !langerTitel ? 'text-fs-7' : 'text-fs-6')} data-motion={kreuzlinie ? 'sig-flucht' : undefined}>
              {titelZeilen ? (
                titelZeilen.map((zeile, i) => (
                  <span key={i} className="block">
                    {zeile}
                    {i < titelZeilen.length - 1 && ' '}
                  </span>
                ))
              ) : (
                <span className="block">{titel}</span>
              )}
              {unterzeile && <span className="mt-4 block text-fs-5 text-tinte-2">{unterzeile}</span>}
            </h1>
            {vorspann && <div className={clsx('mt-6 max-w-mass text-tinte sm:mt-8', langerVorspann ? 'text-fs-3' : 'text-fs-3 sm:text-fs-4')}>{vorspann}</div>}
            {aktionen && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{aktionen}</div>}
            {merkmale && <div className="mt-12">{merkmale}</div>}
          </div>
          {/* Randspalte: Kinder mit h-full (Planblatt) füllen die Höhe der Textspalte */}
          {rand && <div className="col-span-4 flex flex-col md:col-span-8 lg:col-span-5">{rand}</div>}
        </div>
        {fuss && <div className="mt-12">{fuss}</div>}
      </div>
    </header>
  );
}
