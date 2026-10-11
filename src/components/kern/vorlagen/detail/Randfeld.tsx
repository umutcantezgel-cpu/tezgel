// Randfeld (P4-02, KERN v1.2): Feld neben dem Hauptinhalt mit Titel, Satz, Wegen und Zusagen – `/blog` „Beratung
// gewünscht?“, Musterbad „Dieses Musterbad anfragen“, Referenz „Auf einen Blick“ (mit Steckbrief als Inhalt).
// Ersetzt `glass-bezel`/`ceramic-hero`-Seitenleisten (Schatten, Doppelrahmen, Icon-Chip) durch ein Feld auf Fliese mit
// Blattkante in Tinte. `klebend` hält es ab lg unter dem Kopf (top = Kopfhöhe); mobil steht es in Lesefolge
// nach dem Hauptinhalt bzw. dort, wo der Aufrufer es einsetzt. Kein Signaturmoment, kein Rot.
import type { ReactNode } from 'react';
import { verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import { Aktionen, type Aktion } from '@/components/kern/vorlagen/uebersicht/Abschnitt';

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
  aktionen?: Aktion[];
  /** Zusagen unter den Wegen mit eigenem Kopf (Bestand: „Ihre Sicherheiten bei …:“) */
  zusagen?: { titel: ReactNode; punkte: ReactNode[] };
  klebend?: boolean;
  className?: string;
};

export default function Randfeld({ motiv, titel, titelId, titelEbene: Titel = 'h2', text, children, vorWegen, aktionen = [], zusagen, klebend = false, className }: RandfeldProps) {
  return (
    <div className={verbinde('flex flex-col gap-k-4 border border-k-fuge border-t-k-tinte bg-k-fliese p-k-5 lg:p-k-6', klebend && 'lg:sticky lg:top-(--k-kopf-hoehe)', className)}>
      {motiv}
      <Titel id={titelId} className="k-anzeige text-k-4 text-k-tinte wrap-break-word hyphens-auto">
        {titel}
      </Titel>
      {text ? <div className="k-text text-k-2 text-k-tinte-2">{text}</div> : null}
      {children}
      {vorWegen ? <p className="k-text text-k-2 font-semibold text-k-tinte">{vorWegen}</p> : null}
      <Aktionen aktionen={aktionen} gestapelt />
      {zusagen ? (
        <div className="flex flex-col gap-k-2 border-t border-k-fuge pt-k-4">
          <p className="k-text text-k-2 font-semibold text-k-tinte">{zusagen.titel}</p>
          <ul className="flex flex-col gap-k-1">
            {zusagen.punkte.map((p, i) => (
              <li key={i} className="flex min-w-0 items-start gap-k-2 k-mono text-k-1 text-k-tinte">
                <span aria-hidden="true" className="flex h-lh shrink-0 items-center">
                  <Icon name="haken" groesse={16} />
                </span>
                <span className="min-w-0 wrap-break-word hyphens-auto">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
