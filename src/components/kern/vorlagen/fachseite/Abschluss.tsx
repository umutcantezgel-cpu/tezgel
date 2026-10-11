// Abschluss der Fachseite (P4-01, KERN v1.2 K-011): der seitenbezogene Schlussaufruf des Bestands („Neues Bad oder neue Dusche
// geplant?“, „Fotos per WhatsApp senden“) – links bündig, nicht zentriert. Seit P4-10a ein Abschnitt mit dem gemeinsamen
// `Handlungsfeld` (Variante 7/5, Titel höchstens k-6, Knöpfe groß untereinander, Hauptknopf zuerst).
// Bewusst hell: Der gemeinsame Schlussabschnitt `FinalCTA` des Bestands hat im Kern seine eigene Fassung auf Tinte
// (`@/components/kern/start/Abschluss`); Seiten mit FinalCTA setzen jene ein, nicht diese.
// `davor`: Block vor dem Feld im selben Abschnitt (Bestand Balkonsanierung: „Was wir übernehmen – und was nicht“);
// `children`: Blöcke danach (Bestand: Ratgeber-Navigation im selben Abschnitt). `hauptaktion`: WhatsApp-Kanal weicht aus.
import { useId, type ReactNode } from 'react';
import type { IconName } from '@/components/kern/icons/geometrie';
import Abschnitt, { type AbschnittRahmenProps } from '@/components/kern/vorlagen/teile/Abschnitt';
import Handlungsfeld from '@/components/kern/vorlagen/teile/Handlungsfeld';
import type { KnopfAngabe } from '@/components/kern/vorlagen/teile/typen';

export type AbschlussProps = AbschnittRahmenProps & {
  etikett?: ReactNode;
  titel: ReactNode;
  titelId?: string;
  text?: ReactNode;
  /** Aufzählung im Feld (Bestand Reparatur: „Hilfreich sind: …“) */
  punkte?: readonly ReactNode[];
  /** Zeile mit Zeichen unter dem Text (Bestand Reparatur: Erreichbarkeit mit Uhr) */
  hinweis?: ReactNode;
  hinweisZeichen?: IconName;
  knoepfe: readonly KnopfAngabe[];
  davor?: ReactNode;
  children?: ReactNode;
};

export default function Abschluss({ etikett, titel, titelId, text, punkte, hinweis, hinweisZeichen, knoepfe, davor, children, dichte = 'normal', hauptaktion = true, ...rahmen }: AbschlussProps) {
  const eigeneId = `k-abschluss${useId()}`;
  const tid = titelId ?? eigeneId;
  return (
    <Abschnitt dichte={dichte} hauptaktion={hauptaktion} {...rahmen}>
      {davor ? <div className="mb-k-8">{davor}</div> : null}
      <section aria-labelledby={tid}>
        <Handlungsfeld
          etikett={etikett}
          titel={titel}
          titelId={tid}
          text={text}
          punkte={punkte}
          hinweis={hinweis}
          hinweisZeichen={hinweisZeichen}
          knoepfe={knoepfe}
          knopfGroesse="gross"
        />
      </section>
      {children ? <div className="mt-k-8">{children}</div> : null}
    </Abschnitt>
  );
}
