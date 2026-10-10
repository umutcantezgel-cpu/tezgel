// Feldgruppe (fieldset + legend) für Auswahlknöpfe und zusammengehörige Checkboxen.
// Hilfe und Fehlermeldung (Versatz-Zeichen + role="alert") stehen einmal für die Gruppe und sind per aria-describedby verknüpft.
// anordnung: untereinander · nebeneinander (umbrechend) · kacheln (Felder ohne Zwischenraum, 1-px-Fugen in Strich,
// zusammen mit Auswahlknopf art="kachel"; die Felder tragen den rechten und unteren Rand, die Gruppe den linken und oberen).
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { FeldMeldung, Hilfe, useFeldIds } from '@/components/kern/basis/Feldrahmen';
import { beschreibung, verbinde } from '@/components/kern/basis/klassen';

export type FeldgruppeProps = Omit<ComponentPropsWithRef<'fieldset'>, 'children'> & {
  legende: ReactNode;
  zusatz?: ReactNode;
  hilfe?: ReactNode;
  fehler?: ReactNode;
  anordnung?: 'untereinander' | 'nebeneinander' | 'kacheln';
  /** Spalten für kacheln ab 768 px (2) bzw. 1024 px (3, 4); mobil eine Spalte */
  spalten?: 2 | 3 | 4;
  children: ReactNode;
};

// Umbrüche nur an den Rasterstufen von K-007 (768 · 1024)
const KACHEL_SPALTEN: Record<2 | 3 | 4, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
};

export default function Feldgruppe({ legende, zusatz, hilfe, fehler, anordnung = 'untereinander', spalten = 2, children, className, id, disabled, 'aria-describedby': eigene, ...rest }: FeldgruppeProps) {
  const ids = useFeldIds(id);
  const innen =
    anordnung === 'kacheln'
      ? verbinde('grid grid-cols-1 border-l border-t border-k-strich', KACHEL_SPALTEN[spalten])
      : anordnung === 'nebeneinander'
        ? 'flex flex-wrap gap-x-k-6'
        : 'flex flex-col';
  return (
    <fieldset
      {...rest}
      id={ids.id}
      disabled={disabled}
      aria-describedby={beschreibung(hilfe ? ids.hilfeId : undefined, fehler ? ids.meldungId : undefined, eigene)}
      className={verbinde('m-0 flex min-w-0 flex-col gap-k-2 border-0 p-0', className)}
    >
      <legend className={verbinde('mb-k-2 p-0 k-text text-k-2 font-semibold', disabled ? 'text-k-tinte-2' : 'text-k-tinte')}>
        {legende}
        {zusatz ? <span className="k-mono text-k-1 font-normal text-k-tinte-2"> {zusatz}</span> : null}
      </legend>
      {hilfe ? <Hilfe id={ids.hilfeId}>{hilfe}</Hilfe> : null}
      <div className={innen}>{children}</div>
      <FeldMeldung id={ids.meldungId} fehler={fehler} />
    </fieldset>
  );
}
