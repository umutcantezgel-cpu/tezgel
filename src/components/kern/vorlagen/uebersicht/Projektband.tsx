// Projektband (P4-02, KERN v1.2): Übergang vom Lesen zum Anfragen auf Hubs und Listen – `/fliesen` „Vom Ratgeber zum
// Projekt“, `/referenzen` „Überzeugen Sie sich selbst …“, `/standorte` „Ihre Stadt ist nicht aufgeführt?“.
// Ersetzt `ceramic-hero`-Bänder (zentriert, Verlauf) durch ein Planblatt auf Fliese mit Blattkante in Tinte:
// links Etikett, Überschrift, Text, Zusagen (Haken), Zitat; rechts der Beleg in Mono (Bewertung aus RATING_SUMMARY,
// Maß statt Behauptung, K-003) und die Wege. Beide Spalten durch eine Fuge getrennt; mobil untereinander, Text zuerst.
// Kein Formular (das steht im Abschluss bzw. eigenen Abschnitt), kein Rot.
import type { ReactNode } from 'react';
import { Etikett, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import { Aktionen, Merkmale, type Aktion } from '@/components/kern/vorlagen/uebersicht/Abschnitt';

export type ProjektbandProps = {
  etikett?: ReactNode;
  titel: ReactNode;
  titelId?: string;
  text?: ReactNode;
  punkte?: ReactNode[];
  /** Zitat (z. B. Motto aus COMPANY_DATA), wörtlich */
  zitat?: ReactNode;
  /** Beleg: Wert in Mono (z. B. „5,0“) und Zeile darunter (z. B. „aus 27 Google-Rezensionen (Stand …)“) */
  beleg?: { wert: ReactNode; text: ReactNode };
  aktionen?: Aktion[];
  className?: string;
};

export default function Projektband({ etikett, titel, titelId, text, punkte = [], zitat, beleg, aktionen = [], className }: ProjektbandProps) {
  const rechts = beleg || aktionen.length > 0;
  return (
    <div className={verbinde('grid border border-k-fuge border-t-k-tinte bg-k-fliese lg:grid-cols-12', className)}>
      <div className={verbinde('flex min-w-0 flex-col gap-k-5 p-k-5 lg:p-k-7', rechts ? 'lg:col-span-7 lg:border-r lg:border-k-fuge' : 'lg:col-span-12')}>
        {etikett ? <Etikett kreuz>{etikett}</Etikett> : null}
        <h2 id={titelId} className="k-anzeige text-k-5 text-k-tinte wrap-break-word hyphens-auto">
          {titel}
        </h2>
        {text ? <div className="max-w-(--k-mass) k-text text-k-3 text-k-tinte-2">{text}</div> : null}
        {punkte.length > 0 ? <Merkmale punkte={punkte} dicht /> : null}
        {zitat ? <blockquote className="max-w-(--k-mass) border-t border-k-fuge pt-k-4 k-text text-k-3 text-k-tinte">{zitat}</blockquote> : null}
      </div>
      {rechts ? (
        <div className="flex min-w-0 flex-col gap-k-5 border-t border-k-fuge p-k-5 lg:col-span-5 lg:border-t-0 lg:p-k-7">
          {beleg ? (
            <div className="flex flex-col gap-k-1 border-b border-k-fuge pb-k-5">
              <p className="flex items-center gap-k-2 k-mono text-k-6 text-k-tinte">
                <span aria-hidden="true" className="flex shrink-0">
                  <Icon name="stern-voll" groesse={24} />
                </span>
                <span>{beleg.wert}</span>
              </p>
              <p className="k-mono text-k-1 text-k-tinte-2">{beleg.text}</p>
            </div>
          ) : null}
          <Aktionen aktionen={aktionen} gestapelt />
        </div>
      ) : null}
    </div>
  );
}
