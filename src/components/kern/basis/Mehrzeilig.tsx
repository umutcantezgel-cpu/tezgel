// Mehrzeiliges Feld (textarea) mit denselben Zuständen wie Feld; Höhe ab 128 px, senkrecht ziehbar.
import type { ComponentPropsWithRef } from 'react';
import { Feldrahmen, feldBeschreibung, feldKlassen, useFeldIds, type FeldAngaben } from '@/components/kern/basis/Feldrahmen';
import { verbinde } from '@/components/kern/basis/klassen';

export type MehrzeiligProps = FeldAngaben & Omit<ComponentPropsWithRef<'textarea'>, keyof FeldAngaben>;

export default function Mehrzeilig({ beschriftung, zusatz, hilfe, fehler, erfolg, className, id, disabled, rows = 4, 'aria-describedby': eigene, ...rest }: MehrzeiligProps) {
  const ids = useFeldIds(id);
  return (
    <Feldrahmen beschriftung={beschriftung} zusatz={zusatz} hilfe={hilfe} fehler={fehler} erfolg={erfolg} className={className} ids={ids} deaktiviert={disabled}>
      <textarea
        {...rest}
        id={ids.id}
        rows={rows}
        disabled={disabled}
        aria-invalid={fehler ? true : undefined}
        aria-describedby={feldBeschreibung({ hilfe, fehler, erfolg }, ids, eigene)}
        data-motion="zustand"
        className={verbinde(feldKlassen({ ungueltig: Boolean(fehler), gueltig: Boolean(erfolg) }), 'min-h-k-10 resize-y')}
      />
    </Feldrahmen>
  );
}
