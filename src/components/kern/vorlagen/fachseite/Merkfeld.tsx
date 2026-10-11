// Merkfeld (P4-01, KERN v1.2 K-003, K-011): hervorgehobener Einzelhinweis mit Handlung – Bestand: Zuschuss-Kasten
// „Bis zu 4.180 € Zuschuss von der Pflegekasse“ (barrierefreies Bad, Förderung). Seit P4-10a das gemeinsame `Handlungsfeld`
// (Variante 8/4, Titel höchstens k-5, Etikett als Feldkopf, Knöpfe untereinander). Die Hervorhebung trägt die Struktur
// (Feldkopf, Fuge, Fläche), nicht Farbe oder Schatten; kein Rot (K-003 Nr. 2).
// Mit `ebene="h2"` ist das Merkfeld ein eigener Abschnitt (Bestand: `<section aria-labelledby="zuschuss-heading">`),
// mit `ebene="h3"` ein Block in einem anderen Abschnitt (Bestand Förderung: nach dem Zuschuss-Raster).
import { useId, type ReactNode } from 'react';
import Abschnitt, { type AbschnittRahmenProps } from '@/components/kern/vorlagen/teile/Abschnitt';
import Handlungsfeld from '@/components/kern/vorlagen/teile/Handlungsfeld';
import type { KnopfAngabe } from '@/components/kern/vorlagen/teile/typen';

export type MerkfeldProps = {
  etikett?: ReactNode;
  titel: ReactNode;
  titelId?: string;
  ebene?: 'h2' | 'h3';
  text?: ReactNode;
  knoepfe?: readonly KnopfAngabe[];
  /** nur bei ebene h2: Rahmen des eigenen Abschnitts */
  rahmen?: Omit<AbschnittRahmenProps, 'ariaLabel'>;
  className?: string;
};

export default function Merkfeld({ rahmen, titelId, ebene = 'h3', etikett, titel, text, knoepfe, className }: MerkfeldProps) {
  const eigeneId = `k-merkfeld${useId()}`;
  const tid = titelId ?? eigeneId;
  const feld = (
    <Handlungsfeld
      etikett={etikett}
      titel={titel}
      titelId={tid}
      ebene={ebene}
      groesse="mittel"
      text={text}
      knoepfe={knoepfe}
      anteil="8/4"
      innen="normal"
      className={className}
    />
  );
  if (ebene === 'h3') return feld;
  // Eigener Abschnitt: benannt über die H2 des Merkfelds (Abschnitt selbst ohne Kopf).
  return (
    <Abschnitt dichte="eng" {...rahmen}>
      <section aria-labelledby={tid}>{feld}</section>
    </Abschnitt>
  );
}
