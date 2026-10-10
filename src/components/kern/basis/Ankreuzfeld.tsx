// Checkbox (K-011): eigene Darstellung, das native <input type="checkbox"> bleibt das bedienbare Element
// (appearance-none – Tastatur, Formular, Autofill und Screenreader unverändert). Gesetzt: Tinte-Fläche mit Haken in Kalk.
// Trefferfläche: die ganze Zeile (Beschriftung umschließt das Feld), mindestens 48 px hoch.
// Zustände: Ruhe · Hover (feiner Zeiger, Rand Tinte) · Fokus (2 px Tinte am Kästchen) · gesetzt · deaktiviert (gestrichelt, Cursor) · Fehler.
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { FeldMeldung, Hilfe, feldBeschreibung, useFeldIds } from '@/components/kern/basis/Feldrahmen';
import Icon from '@/components/kern/icons/Icon';
import { fokus, verbinde } from '@/components/kern/basis/klassen';

export type AnkreuzfeldProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'children'> & {
  /** Beschriftung (darf Links enthalten, z. B. zur Datenschutzerklärung) */
  children: ReactNode;
  hilfe?: ReactNode;
  fehler?: ReactNode;
  className?: string;
};

export const KAESTCHEN =
  'peer m-0 size-k-5 shrink-0 appearance-none rounded-k-1 border bg-k-fliese disabled:cursor-not-allowed disabled:border-dashed disabled:border-k-strich disabled:bg-k-kalk';

export default function Ankreuzfeld({ children, hilfe, fehler, className, id, disabled, 'aria-describedby': eigene, ...rest }: AnkreuzfeldProps) {
  const ids = useFeldIds(id);
  return (
    <div className={verbinde('flex min-w-0 flex-col', className)}>
      <label
        htmlFor={ids.id}
        className={verbinde('group flex min-h-k-7 items-start gap-k-3 py-k-3 k-text text-k-3', disabled ? 'cursor-not-allowed text-k-tinte-2' : 'cursor-pointer text-k-tinte')}
      >
        <span className="relative flex h-lh shrink-0 items-center">
          <input
            {...rest}
            id={ids.id}
            type="checkbox"
            disabled={disabled}
            aria-invalid={fehler ? true : undefined}
            aria-describedby={feldBeschreibung({ hilfe, fehler }, ids, eigene)}
            data-motion="zustand"
            className={verbinde(
              KAESTCHEN,
              fehler ? 'border-k-laser' : 'border-k-strich pointer-fine:enabled:group-hover:border-k-tinte',
              'checked:border-k-tinte checked:bg-k-tinte disabled:checked:border-solid disabled:checked:bg-k-fuge',
              fokus('hell'),
            )}
          />
          {/* Farbe an der Hülle, nicht am SVG: in forced-colors erbt das SVG die erzwungene Textfarbe.
              Haken über das Sprite (IconSprite steht im Kern-Layout am Anfang von body, also vor jedem Feld im HTML). */}
          <span className="pointer-events-none invisible absolute inset-0 flex items-center justify-center text-k-kalk peer-checked:visible peer-disabled:text-k-tinte-2">
            <Icon name="haken" groesse={24} />
          </span>
        </span>
        <span className="min-w-0">{children}</span>
      </label>
      {/* Hilfe und Meldung fluchten mit dem Text: Kästchen (k-5) + Abstand (k-3) */}
      {hilfe ? (
        <div className="ml-k-5 pl-k-3">
          <Hilfe id={ids.hilfeId}>{hilfe}</Hilfe>
        </div>
      ) : null}
      <FeldMeldung id={ids.meldungId} fehler={fehler} className="ml-k-5 pl-k-3" />
    </div>
  );
}
