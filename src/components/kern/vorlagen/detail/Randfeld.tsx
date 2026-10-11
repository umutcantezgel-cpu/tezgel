// Randfeld (P4-02, KERN v1.2): Feld neben dem Hauptinhalt mit Titel, Satz, Wegen und Zusagen – `/blog` „Beratung
// gewünscht?“, Musterbad „Dieses Musterbad anfragen“, Referenz „Auf einen Blick“ (mit Steckbrief als Inhalt).
// Ersetzt `glass-bezel`/`ceramic-hero`-Seitenleisten (Schatten, Doppelrahmen, Icon-Chip) durch ein Feld auf Fliese mit
// Blattkante in Tinte. `klebend` hält es ab lg unter dem Kopf (top = Kopfhöhe); mobil steht es in Lesefolge
// nach dem Hauptinhalt bzw. dort, wo der Aufrufer es einsetzt. Kein Signaturmoment, kein Rot.
// P4-10a: Wege aus `teile/Knopfreihe`, Zusagen aus `teile/Punkte › Zusagen`, Titelstufe nach dem längsten Wort (Ort `rand`).
import type { ReactNode } from 'react';
import { verbinde } from '@/components/kern/basis';
import Knopfreihe from '@/components/kern/vorlagen/teile/Knopfreihe';
import { Zusagen } from '@/components/kern/vorlagen/teile/Punkte';
import { stufeNachWort } from '@/components/kern/vorlagen/teile/satz';
import { UMBRUCH, type KnopfAngabe } from '@/components/kern/vorlagen/teile/typen';

export type RandfeldProps = {
  /** Motiv über dem Titel (dekorativ, z. B. Musterfeld) */
  motiv?: ReactNode;
  titel: ReactNode;
  titelId?: string;
  /** Ebene wie im Bestand (Seitenleiste `/blog`: p, Detailseiten: h2) */
  titelEbene?: 'h2' | 'p';
  text?: ReactNode;
  /** Inhalt zwischen Text und Wegen (z. B. Steckbrief) */
  children?: ReactNode;
  /** Satz direkt über den Wegen (Bestand: „Planen Sie ein ähnliches Projekt?“) */
  vorWegen?: ReactNode;
  aktionen?: readonly KnopfAngabe[];
  /** Zusagen unter den Wegen mit eigenem Kopf (Bestand: „Ihre Sicherheiten bei …:“) */
  zusagen?: { titel: ReactNode; punkte: readonly ReactNode[] };
  klebend?: boolean;
  className?: string;
};

export default function Randfeld({ motiv, titel, titelId, titelEbene: Titel = 'h2', text, children, vorWegen, aktionen = [], zusagen, klebend = false, className }: RandfeldProps) {
  return (
    <div className={verbinde('flex flex-col gap-k-4 border border-k-fuge border-t-k-tinte bg-k-fliese p-k-5 lg:p-k-6', klebend && 'lg:sticky lg:top-(--k-kopf-hoehe)', className)}>
      {motiv}
      <Titel id={titelId} className={verbinde('k-anzeige text-k-tinte', stufeNachWort(titel, 'rand', 'text-k-4'), UMBRUCH)}>
        {titel}
      </Titel>
      {text ? <div className="k-text text-k-2 text-k-tinte-2">{text}</div> : null}
      {children}
      {vorWegen ? <p className="k-text text-k-2 font-semibold text-k-tinte">{vorWegen}</p> : null}
      <Knopfreihe knoepfe={aktionen} anordnung="spalte" />
      {zusagen ? (
        <div className="flex flex-col gap-k-2 border-t border-k-fuge pt-k-4">
          <p className="k-text text-k-2 font-semibold text-k-tinte">{zusagen.titel}</p>
          <Zusagen punkte={zusagen.punkte} form="mono" />
        </div>
      ) : null}
    </div>
  );
}
