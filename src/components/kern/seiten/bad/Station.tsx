// Station des Ablaufs auf /bad (P4-08a, KERN v1.2 K-007, K-009 SIG-2): ein Abschnitt, der an einer Schrittfuge beginnt.
// Rahmen für die drei Stationen Qualitäts-Kategorien, Projektcheck und Badanfrage; der Inhalt (Überschrift, Felder, Insel)
// kommt von der Station selbst. `relative` ist Bezug der Lotlinie aus der Schrittfuge. Unter lg steht der Inhalt 16 px
// eingerückt neben dem Lot (wie der Einstieg von `/`), damit die Achse nie Text schneidet (K-007).
// Name wie im Bestand: über die Überschrift im Inhalt (`titelId`) oder über `ariaLabel` (Bestand: Abschnitte der Formulare).
// Abstände der Erzählseite (K-007): 64/96 px oben und unten – zwei Stationen auf Kalk folgen einander, ihre Grenze ist
// die Schrittfuge, kein Flächenwechsel.
import type { ReactNode } from 'react';
import { verbinde } from '@/components/kern/basis';
import type { Flaeche } from '@/components/kern/vorlagen/teile';
import Schrittfuge from '@/components/kern/seiten/bad/Schrittfuge';

export type StationProps = {
  /** Anker des Bestands (`projekt-check`, `anfrage`) */
  id?: string;
  /** Name, wenn die Überschrift in einer Insel liegt (Bestand: `aria-label`) */
  ariaLabel?: string;
  /** ID der sichtbaren Überschrift im Inhalt */
  titelId?: string;
  flaeche?: Flaeche;
  children: ReactNode;
};

export default function Station({ id, ariaLabel, titelId, flaeche = 'kalk', children }: StationProps) {
  return (
    <section
      id={id}
      aria-label={titelId ? undefined : ariaLabel}
      aria-labelledby={titelId}
      className={verbinde('relative pt-k-8 pb-k-8 lg:pt-k-9 lg:pb-k-9', flaeche === 'fliese' ? 'border-y border-k-fuge bg-k-fliese' : 'bg-k-kalk')}
    >
      <Schrittfuge flaeche={flaeche} />
      <div className="mx-auto mt-k-6 max-w-(--k-seite) px-(--k-rand)">
        <div className="min-w-0 pl-k-4 lg:pl-0">{children}</div>
      </div>
    </section>
  );
}
