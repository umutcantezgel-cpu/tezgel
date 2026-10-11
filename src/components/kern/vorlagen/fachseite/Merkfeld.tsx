// Merkfeld (P4-01, KERN v1.2 K-003, K-011): hervorgehobener Einzelhinweis mit Handlung – Bestand: Zuschuss-Kasten
// „Bis zu 4.180 € Zuschuss von der Pflegekasse“ (barrierefreies Bad, Förderung; doppelter Glasrahmen mit Icon-Kachel).
// Im Kern zwei Fugenfelder: links Etikett als Feldkopf (Rahmen), Titel, Text; rechts die Knöpfe untereinander.
// Die Hervorhebung trägt die Struktur (Feldkopf, Fuge, Fläche), nicht Farbe oder Schatten; kein Rot (K-003 Nr. 2).
// Mit `ebene="h2"` ist das Merkfeld ein eigener Abschnitt (Bestand: `<section aria-labelledby="zuschuss-heading">`),
// mit `ebene="h3"` ein Block in einem anderen Abschnitt (Bestand Förderung: nach dem Zuschuss-Raster).
import { useId, type ReactNode } from 'react';
import { Etikett, Feldraster, Rasterfeld, verbinde } from '@/components/kern/basis';
import Abschnitt, { type AbschnittRahmenProps } from '@/components/kern/vorlagen/fachseite/Abschnitt';
import Knopfreihe from '@/components/kern/vorlagen/fachseite/Knopfreihe';
import { UMBRUCH, istText, type KnopfAngabe } from '@/components/kern/vorlagen/fachseite/typen';

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

function Merkblock({ etikett, titel, titelId, ebene: Titel = 'h3', text, knoepfe = [], className }: Omit<MerkfeldProps, 'rahmen'> & { titelId: string }) {
  return (
    <Feldraster className={className}>
      <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: knoepfe.length ? 8 : 12 }} flaeche="fliese" className="flex flex-col">
        {etikett ? (
          <Etikett rahmen ton="tinte" className="self-start">
            {etikett}
          </Etikett>
        ) : null}
        <Titel id={titelId} className={verbinde('k-anzeige text-k-5 text-k-tinte', etikett ? 'mt-k-4' : undefined, UMBRUCH)}>
          {titel}
        </Titel>
        {text ? (
          <div className={verbinde('mt-k-4 flex max-w-(--k-mass) flex-col gap-k-3 k-text text-k-3 text-k-tinte-2', UMBRUCH)}>
            {istText(text) ? <p>{text}</p> : text}
          </div>
        ) : null}
      </Rasterfeld>
      {knoepfe.length ? (
        <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 4 }} className="flex flex-col justify-center">
          <Knopfreihe knoepfe={knoepfe} anordnung="spalte" />
        </Rasterfeld>
      ) : null}
    </Feldraster>
  );
}

export default function Merkfeld({ rahmen, titelId, ebene = 'h3', ...merk }: MerkfeldProps) {
  const eigeneId = `k-merkfeld${useId()}`;
  const tid = titelId ?? eigeneId;
  if (ebene === 'h3') return <Merkblock {...merk} ebene="h3" titelId={tid} />;
  // Eigener Abschnitt: benannt über die H2 des Merkfelds (Abschnitt selbst ohne Kopf).
  return (
    <Abschnitt dichte="eng" {...rahmen}>
      <section aria-labelledby={tid}>
        <Merkblock {...merk} ebene="h2" titelId={tid} />
      </section>
    </Abschnitt>
  );
}
