// Punkte und Zusagen (P4-10a, gemeinsam für alle Vorlagen; K-003, K-006, K-010).
// Vorher doppelt: `fachseite/Punkte` (P4-01, Zeilen mit Zeichen) und `uebersicht/Abschnitt › Merkmale` (P4-02, Haken-Liste)
// sowie die Zusagen-Zeilen in `uebersicht/Einstieg` und `detail/Randfeld`.
// Punkte: Aufzählung mit Zeichen – Prüfpunkte mit Haken, Grenzen mit Hinweis-Zeichen, schlichte Listen mit Fugenkreuz,
// gezählt mit Listenmarke in Mono. Jeder Punkt ist eine Zeile zwischen 1-px-Fugen (K-003 „Fuge statt Karte“), jeder ein
// eigenes Element (Lehre 2). Zwei Spalten nach Platz: ab Behälterbreite 36rem (Container-Abfrage, nicht Fensterbreite).
// Zeichen dekorativ, die Bedeutung trägt der Text (K-006).
// Zusagen: kurze Haken-Zeilen ohne Fugen – `zeile` (Einstieg, nebeneinander) oder `mono` (Randfeld, Mono klein).
import type { ReactNode } from 'react';
import { Fugenkreuz, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import { UMBRUCH } from '@/components/kern/vorlagen/teile/typen';

export type PunkteProps = {
  punkte: readonly ReactNode[];
  zeichen?: 'haken' | 'hinweis' | 'kreuz' | 'keins';
  spalten?: 1 | 2;
  geordnet?: boolean;
  /** normal (Text k-3) · klein (Text k-2) · dicht (Text k-2, enge Zeilen; Merkmale, Ausstattung) */
  groesse?: 'normal' | 'klein' | 'dicht';
  className?: string;
};

const GROESSE = { normal: 'py-k-3 text-k-3', klein: 'py-k-3 text-k-2', dicht: 'py-k-2 text-k-2' } as const;

function Zeichen({ art }: { art: NonNullable<PunkteProps['zeichen']> }) {
  if (art === 'keins') return null;
  return (
    <span aria-hidden="true" className={verbinde('flex h-lh shrink-0 items-center', art === 'kreuz' ? 'text-k-strich' : 'text-k-tinte')}>
      {art === 'kreuz' ? <Fugenkreuz className="size-k-3" /> : <Icon name={art} groesse={20} />}
    </span>
  );
}

export function Punkte({ punkte, zeichen = 'haken', spalten = 1, geordnet = false, groesse = 'normal', className }: PunkteProps) {
  if (punkte.length === 0) return null;
  const Liste = geordnet ? 'ol' : 'ul';
  return (
    <div className={verbinde('@container', className)}>
      <Liste
        className={verbinde(
          'grid grid-cols-1 gap-x-k-7',
          spalten === 2 && '@xl:grid-cols-2',
          geordnet && 'list-decimal pl-k-5 marker:font-k-mono marker:text-k-tinte-2',
        )}
      >
        {punkte.map((punkt, i) => (
          <li
            key={i}
            className={verbinde(
              'min-w-0 border-b border-k-fuge k-text text-k-tinte first:border-t',
              spalten === 2 && '@xl:nth-2:border-t',
              GROESSE[groesse],
              !geordnet && 'flex items-start gap-k-3',
            )}
          >
            {!geordnet ? <Zeichen art={zeichen} /> : null}
            <span className={UMBRUCH}>{punkt}</span>
          </li>
        ))}
      </Liste>
    </div>
  );
}

export type ZusagenProps = {
  punkte: readonly ReactNode[];
  /** zeile: Einstieg, nebeneinander (Text 600) · mono: Randfeld, untereinander (Mono klein) */
  form?: 'zeile' | 'mono';
  className?: string;
};

export function Zusagen({ punkte, form = 'zeile', className }: ZusagenProps) {
  if (punkte.length === 0) return null;
  const mono = form === 'mono';
  return (
    <ul className={verbinde('flex flex-col', mono ? 'gap-k-1' : 'gap-k-2 sm:flex-row sm:flex-wrap sm:gap-x-k-5', className)}>
      {punkte.map((p, i) => (
        <li key={i} className={verbinde('flex min-w-0 items-start gap-k-2 text-k-tinte', mono ? 'k-mono text-k-1' : 'k-text text-k-2 font-semibold')}>
          <span aria-hidden="true" className="flex h-lh shrink-0 items-center">
            <Icon name="haken" groesse={mono ? 16 : 20} />
          </span>
          <span className={UMBRUCH}>{p}</span>
        </li>
      ))}
    </ul>
  );
}
