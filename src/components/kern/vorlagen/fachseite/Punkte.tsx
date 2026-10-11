// Punkte und Punkteliste (P4-01, KERN v1.2 K-006, K-010): Aufzählungen des Bestands mit Zeichen – Prüfpunkte mit Haken
// („Vor dem Fliesen“, „Was repariert wird“), Grenzen mit Hinweis-Zeichen („Wann eine Reparatur nicht mehr sinnvoll ist“),
// schlichte Listen mit Fugenkreuz. Jeder Punkt ist eine Zeile über einer 1-px-Fuge (K-003 „Fuge statt Karte“);
// `geordnet` zählt mit Listenmarke in Tinte-2 (Bestand: list-decimal). Zeichen dekorativ, die Bedeutung trägt der Text
// (K-006: nie nur Farbe oder Form). Haken und Hinweis aus der Icon-Familie, Fugenkreuz aus den Grundbausteinen.
// `Punkte` ist der Block (auch in Feldern und im Abschluss), `Punkteliste` der Abschnitt.
import type { ReactNode } from 'react';
import { Fugenkreuz, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import Abschnitt, { type AbschnittProps } from '@/components/kern/vorlagen/fachseite/Abschnitt';
import { UMBRUCH } from '@/components/kern/vorlagen/fachseite/typen';

export type PunkteProps = {
  punkte: readonly ReactNode[];
  zeichen?: 'haken' | 'hinweis' | 'kreuz' | 'keins';
  spalten?: 1 | 2;
  geordnet?: boolean;
  groesse?: 'normal' | 'klein';
  className?: string;
};

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
    <Liste
      className={verbinde(
        'grid grid-cols-1 gap-x-k-7',
        spalten === 2 && 'md:grid-cols-2',
        geordnet && 'list-decimal pl-k-5 marker:font-k-mono marker:text-k-tinte-2',
        className,
      )}
    >
      {punkte.map((punkt, i) => (
        <li
          key={i}
          className={verbinde(
            'border-t border-k-fuge py-k-3 k-text text-k-tinte',
            groesse === 'klein' ? 'text-k-2' : 'text-k-3',
            !geordnet && 'flex items-start gap-k-3',
          )}
        >
          {!geordnet ? <Zeichen art={zeichen} /> : null}
          <span className={UMBRUCH}>{punkt}</span>
        </li>
      ))}
    </Liste>
  );
}

export type PunktelisteProps = AbschnittProps & Omit<PunkteProps, 'className'>;

export default function Punkteliste({ punkte, zeichen, spalten = 2, geordnet, groesse, children, ...abschnitt }: PunktelisteProps) {
  return (
    <Abschnitt {...abschnitt}>
      <Punkte punkte={punkte} zeichen={zeichen} spalten={spalten} geordnet={geordnet} groesse={groesse} />
      {children ? <div className="mt-k-8">{children}</div> : null}
    </Abschnitt>
  );
}
