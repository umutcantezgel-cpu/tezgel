// Knopfreihe (P4-10a, gemeinsam für alle Vorlagen; K-011 Knöpfe): Knöpfe aus Angaben der Seite, gebaut mit `Knopf`.
// Vorher doppelt: `fachseite/Knopfreihe` (P4-01) und `uebersicht/Abschnitt › Aktionen` (P4-02).
// reihe: nebeneinander, mobil der erste Knopf über die volle Breite, die übrigen teilen sich die Zeile (wie Einstieg `/`).
// spalte: untereinander, jeder Knopf über die volle Breite (Abschluss, Randfeld, Seitenfeld).
// Art: ohne Angabe ist der erste Knopf der Hauptknopf (Tinte), die übrigen sind Nebenknöpfe (K-011: Hauptknopf zuerst).
// Zustände kommen aus `Knopf`: Ruhe, Hover (feiner Zeiger), Fokus 2 px, aktiv (`druck`); Links sind nie deaktiviert.
import { Knopf, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import type { Grund } from '@/components/kern/basis/klassen';
import type { KnopfAngabe } from '@/components/kern/vorlagen/teile/typen';

export type KnopfreiheProps = {
  knoepfe: readonly KnopfAngabe[];
  anordnung?: 'reihe' | 'spalte';
  auf?: Grund;
  groesse?: 'normal' | 'gross';
  className?: string;
};

export default function Knopfreihe({ knoepfe, anordnung = 'reihe', auf = 'hell', groesse = 'normal', className }: KnopfreiheProps) {
  if (knoepfe.length === 0) return null;
  const spalte = anordnung === 'spalte';
  return (
    <div className={verbinde(spalte ? 'flex flex-col gap-k-3' : 'flex flex-wrap gap-k-3', className)}>
      {knoepfe.map((k, i) => {
        const art = k.art ?? (i === 0 ? 'haupt' : 'neben');
        const zeichen = k.zeichen ? <Icon name={k.zeichen} groesse={20} /> : undefined;
        const hinten = k.zeichen === 'pfeil' ? zeichen : undefined;
        const vorne = k.zeichen && k.zeichen !== 'pfeil' ? zeichen : undefined;
        const breite = spalte ? (art === 'text' ? 'w-fit' : undefined) : art === 'text' ? 'w-fit' : i === 0 ? 'w-full sm:w-auto' : 'grow sm:grow-0';
        return (
          <Knopf
            key={`${k.href}-${i}`}
            href={k.href}
            art={art}
            auf={auf}
            groesse={groesse}
            breit={spalte && art !== 'text'}
            aria-label={k.ariaLabel}
            target={k.extern ? '_blank' : undefined}
            rel={k.extern ? 'noopener noreferrer' : undefined}
            vorne={vorne}
            hinten={hinten}
            className={breite}
          >
            {k.mono ? <span className="k-mono font-normal">{k.text}</span> : k.text}
          </Knopf>
        );
      })}
    </div>
  );
}
