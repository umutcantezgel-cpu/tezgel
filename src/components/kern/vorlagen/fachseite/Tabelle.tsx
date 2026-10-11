// Tabelle (P4-01, KERN v1.2 K-003 „Fuge statt Karte“, K-005, K-007, Lehre 6): echte <table> mit Beschriftung,
// Spaltenköpfen (`scope="col"`) und Zeilenköpfen (`scope="row"`), Zeilen durch 1-px-Fugen getrennt, Kopfzeile in Mono.
// Mobil lesbar ohne Querscrollen (Reflow 320): unter md wird jede Zeile zu einem Block – Zeilenkopf oben, darunter je Zelle
// ihr Spaltenname (Etikett, `aria-hidden`, nur Sicht) und der Inhalt. Weil `display: block` in manchen Browsern die
// Tabellensemantik löscht, tragen alle Teile ihre Rolle ausdrücklich (table, rowgroup, row, columnheader, rowheader, cell);
// die Kopfzeile bleibt mobil für Screenreader erhalten (`sr-only`), sichtbar sind die Etiketten je Zelle.
// Kein Bedienelement, kein Querscrollen, keine Zebrastreifen, keine Farben als Bedeutung. Wortlaut vollständig von der Seite.
import type { ReactNode } from 'react';
import { verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import Abschnitt, { type AbschnittProps } from '@/components/kern/vorlagen/fachseite/Abschnitt';
import { UMBRUCH, feldFlaeche, istText } from '@/components/kern/vorlagen/fachseite/typen';

export type Tabellenzeile = {
  /** Zeilenkopf (erste Spalte, `th scope="row"`) */
  kopf: ReactNode;
  /** Zusatz unter dem Zeilenkopf (Bestand DIN 18534: Stufe „gering“ unter „W0-I“) */
  zusatz?: ReactNode;
  /** übrige Zellen in Spaltenreihenfolge */
  zellen: readonly ReactNode[];
};

export type TabelleProps = AbschnittProps & {
  /** Spaltenköpfe, erste = Spalte der Zeilenköpfe (Wortlaut gleich; mobil als Etikett je Zelle wiederholt) */
  spalten: readonly string[];
  zeilen: readonly Tabellenzeile[];
  /** <caption>; im Bestand meist `sr-only` */
  beschriftung?: ReactNode;
  beschriftungSichtbar?: boolean;
  /** Zeilenkopf in Mono (Klassen, Normteile) statt Text */
  kopfMono?: boolean;
  /** Hinweis unter der Tabelle (Bestand: Info-Zeichen + Satz) */
  fussnote?: ReactNode;
};

export function Tabellenblock({
  spalten,
  zeilen,
  beschriftung,
  beschriftungSichtbar = false,
  kopfMono = false,
  fussnote,
  flaeche = 'fliese',
}: Pick<TabelleProps, 'spalten' | 'zeilen' | 'beschriftung' | 'beschriftungSichtbar' | 'kopfMono' | 'fussnote'> & { flaeche?: 'fliese' | 'kalk' }) {
  if (zeilen.length === 0) return null;
  const [kopfSpalte, ...datenSpalten] = spalten;
  return (
    <>
      <div className={verbinde('border border-k-fuge', flaeche === 'fliese' ? 'bg-k-fliese' : 'bg-k-kalk')}>
        <table role="table" className="w-full border-collapse text-left max-md:block">
          {beschriftung ? (
            <caption
              className={
                beschriftungSichtbar
                  ? 'border-b border-k-fuge px-k-4 py-k-3 text-left k-mono text-k-1 text-k-tinte-2 max-md:block lg:px-k-5'
                  : 'sr-only'
              }
            >
              {beschriftung}
            </caption>
          ) : null}
          <thead role="rowgroup" className="max-md:sr-only">
            <tr role="row" className="border-b border-k-strich">
              <th role="columnheader" scope="col" className="px-k-4 py-k-3 align-bottom k-mono text-k-1 font-normal text-k-tinte-2 lg:px-k-5">
                {kopfSpalte}
              </th>
              {datenSpalten.map((s) => (
                <th key={s} role="columnheader" scope="col" className="px-k-4 py-k-3 align-bottom k-mono text-k-1 font-normal text-k-tinte-2 lg:px-k-5">
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody role="rowgroup" className="max-md:block">
            {zeilen.map((z, zi) => (
              <tr key={zi} role="row" className="border-b border-k-fuge align-top last:border-b-0 max-md:block max-md:px-k-4 max-md:py-k-5">
                <th role="rowheader" scope="row" className="px-k-4 py-k-4 text-left align-top font-normal max-md:block max-md:p-0 md:w-1/5 lg:px-k-5">
                  <span className={verbinde('block text-k-tinte', kopfMono ? 'k-mono text-k-3' : 'k-text text-k-3 font-semibold', UMBRUCH)}>{z.kopf}</span>
                  {z.zusatz ? <span className={verbinde('mt-k-1 block k-mono text-k-1 text-k-tinte-2', UMBRUCH)}>{z.zusatz}</span> : null}
                </th>
                {z.zellen.map((zelle, i) => (
                  <td key={i} role="cell" className="px-k-4 py-k-4 align-top k-text text-k-2 text-k-tinte max-md:block max-md:px-0 max-md:pt-k-4 max-md:pb-0 lg:px-k-5">
                    {datenSpalten[i] ? (
                      <span aria-hidden="true" className="mb-k-1 block k-mono text-k-1 text-k-tinte-2 md:hidden">
                        {datenSpalten[i]}
                      </span>
                    ) : null}
                    <span className={verbinde('block', UMBRUCH)}>{zelle}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {fussnote ? (
        <div className="mt-k-4 flex max-w-(--k-mass) items-start gap-k-2 k-text text-k-2 text-k-tinte-2">
          <span aria-hidden="true" className="flex h-lh shrink-0 items-center text-k-tinte">
            <Icon name="hinweis" groesse={20} />
          </span>
          <div className="min-w-0">{istText(fussnote) ? <p>{fussnote}</p> : fussnote}</div>
        </div>
      ) : null}
    </>
  );
}

export default function Tabelle({ spalten, zeilen, beschriftung, beschriftungSichtbar, kopfMono, fussnote, children, ...abschnitt }: TabelleProps) {
  const flaeche = feldFlaeche(abschnitt.flaeche ?? 'kalk');
  return (
    <Abschnitt {...abschnitt}>
      <Tabellenblock
        spalten={spalten}
        zeilen={zeilen}
        beschriftung={beschriftung}
        beschriftungSichtbar={beschriftungSichtbar}
        kopfMono={kopfMono}
        fussnote={fussnote}
        flaeche={flaeche}
      />
      {children ? <div className="mt-k-8">{children}</div> : null}
    </Abschnitt>
  );
}
