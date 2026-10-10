// Tabelle (KERN K-005, K-009): Datentabelle als benannte Region mit Tastaturfokus. Auf schmalen Bildschirmen behält
// die Tabelle ihre Spalten und scrollt in der Region; die Fuge am rechten Rand zeigt, dass mehr kommt.
// Kopfzeile in Mono mit 2-px-Hauptlinie, Zeilen durch 1-px-Fugen getrennt. Zahlen stehen rechtsbündig in Mono
// (Ausrichtung je Spalte). Kopfzeilen und Zahlen brechen nicht innerhalb eines Wertes um („Tabelle 3“, „2 mm“),
// Fließtext in den übrigen Zellen darf umbrechen. Die erste Spalte ist Zeilenkopf (th scope="row"), sofern gesetzt.
import type { ReactNode } from 'react';
import clsx from 'clsx';

export type TabellenAusrichtung = 'links' | 'rechts';

export interface TabelleProps {
  /** Name der Tabelle: Bereichsname (aria-label) und Beschriftung für Screenreader (caption) */
  name: string;
  kopf: ReactNode[];
  zeilen: ReactNode[][];
  /** Hinweis unter der Tabelle, außerhalb des scrollenden Bereichs, Mono */
  legende?: ReactNode;
  /** erste Spalte als Zeilenkopf (th scope="row") */
  ersteSpalteKopf?: boolean;
  /** Ausrichtung je Spalte; Standard links. rechts = rechtsbündig in Mono (Zahlen, Messwerte) */
  ausrichtung?: TabellenAusrichtung[];
  className?: string;
}

export default function Tabelle({ name, kopf, zeilen, legende, ersteSpalteKopf = true, ausrichtung = [], className }: TabelleProps) {
  const rechts = (spalte: number) => ausrichtung[spalte] === 'rechts';
  const zellenKlasse = (spalte: number, fett = false) =>
    clsx(
      'px-4 py-3 align-top text-fs-2 text-tinte',
      rechts(spalte) ? 'whitespace-nowrap text-right font-mono' : clsx('text-left font-text', fett && 'font-semibold'),
    );

  return (
    <div className={className}>
      <div role="region" aria-label={name} tabIndex={0} className="overflow-x-auto border border-fuge bg-fliese">
        <table className="min-w-full border-collapse">
          <caption className="sr-only">{name}</caption>
          <thead>
            <tr className="border-b-2 border-tinte">
              {kopf.map((zelle, spalte) => (
                <th
                  key={spalte}
                  scope="col"
                  className={clsx(
                    'whitespace-nowrap px-4 py-3 align-bottom font-mono text-fs-1 font-normal text-tinte-2',
                    rechts(spalte) ? 'text-right' : 'text-left',
                  )}
                >
                  {zelle}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {zeilen.map((zeile, zeilenNr) => (
              <tr key={zeilenNr} className="border-b border-fuge last:border-b-0">
                {zeile.map((zelle, spalte) =>
                  ersteSpalteKopf && spalte === 0 ? (
                    <th key={spalte} scope="row" className={zellenKlasse(spalte, true)}>
                      {zelle}
                    </th>
                  ) : (
                    <td key={spalte} className={zellenKlasse(spalte)}>
                      {zelle}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {legende && <div className="mt-3 font-mono text-fs-1 text-tinte-2">{legende}</div>}
    </div>
  );
}
