// Weiterlesen (P4-02, KERN v1.2): Querverweise am Ende eines Hubs – `/fliesen` „Weiterführende Ratgeber zur
// Fliesenverlegung“, `/standorte` „Alle Leistungen im Überblick“ und die Linkbänder der Fachthemen-Hubs.
// Struktur: Überschrift links (Desktop 4/12), rechts eine zweispaltige Liste von Pfeillinks mit Fugen und ein
// Nachsatz (Satz mit eingebetteten Textlinks, Wortlaut als ReactNode vom Aufrufer). Ruhig, dicht, ohne Fläche.
import type { ReactNode } from 'react';
import { verbinde } from '@/components/kern/basis';
import { Pfeillink, type Verweis } from '@/components/kern/vorlagen/uebersicht/Abschnitt';

export type WeiterlesenProps = {
  titel?: ReactNode;
  titelId?: string;
  verweise: Verweis[];
  /** Satz nach der Liste (mit Textlinks aus `@/components/kern/basis`) */
  nachsatz?: ReactNode;
  className?: string;
};

export default function Weiterlesen({ titel, titelId, verweise, nachsatz, className }: WeiterlesenProps) {
  return (
    <div className={verbinde('grid gap-k-5 border-t border-k-tinte pt-k-5 lg:grid-cols-12 lg:gap-0', className)}>
      {titel ? (
        <h2 id={titelId} className="min-w-0 k-anzeige text-k-4 text-k-tinte wrap-break-word hyphens-auto lg:col-span-4 lg:pr-k-6">
          {titel}
        </h2>
      ) : null}
      <div className={verbinde('min-w-0', titel ? 'lg:col-span-8' : 'lg:col-span-12')}>
        <ul aria-labelledby={titelId} className="grid sm:grid-cols-2 sm:gap-x-k-5">
          {verweise.map((v) => (
            <li key={v.href} className="min-w-0 border-b border-k-fuge">
              <Pfeillink href={v.href} ariaLabel={v.ariaLabel}>
                {v.label}
              </Pfeillink>
            </li>
          ))}
        </ul>
        {nachsatz ? <p className="mt-k-5 max-w-(--k-mass) k-text text-k-2 text-k-tinte-2">{nachsatz}</p> : null}
      </div>
    </div>
  );
}
