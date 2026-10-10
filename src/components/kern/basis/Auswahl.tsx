// Auswahlliste (natives <select>, eigene Darstellung mit Winkel). Optionen kommen als <option>-Kinder;
// ein Leerzustand ist eine erste Option mit value="" und Wortlaut des Aufrufers. Zustände wie Feld.
import type { ComponentPropsWithRef } from 'react';
import { Feldrahmen, feldBeschreibung, feldKlassen, useFeldIds, type FeldAngaben } from '@/components/kern/basis/Feldrahmen';
import { ZeichenWinkel } from '@/components/kern/basis/Zeichen';
import { verbinde } from '@/components/kern/basis/klassen';

export type AuswahlProps = FeldAngaben & Omit<ComponentPropsWithRef<'select'>, keyof FeldAngaben>;

export default function Auswahl({ beschriftung, zusatz, hilfe, fehler, erfolg, className, id, disabled, children, 'aria-describedby': eigene, ...rest }: AuswahlProps) {
  const ids = useFeldIds(id);
  return (
    <Feldrahmen beschriftung={beschriftung} zusatz={zusatz} hilfe={hilfe} fehler={fehler} erfolg={erfolg} className={className} ids={ids} deaktiviert={disabled}>
      <div className="relative">
        <select
          {...rest}
          id={ids.id}
          disabled={disabled}
          aria-invalid={fehler ? true : undefined}
          aria-describedby={feldBeschreibung({ hilfe, fehler, erfolg }, ids, eigene)}
          data-motion="zustand"
          className={verbinde('peer cursor-pointer appearance-none pr-k-8', feldKlassen({ ungueltig: Boolean(fehler), gueltig: Boolean(erfolg) }))}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-k-3 flex items-center text-k-tinte peer-disabled:text-k-tinte-2">
          <ZeichenWinkel className="size-k-5" />
        </span>
      </div>
    </Feldrahmen>
  );
}
