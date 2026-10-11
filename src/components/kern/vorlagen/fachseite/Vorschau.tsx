// Nur für die Vorschau P4-01 (`src/app/(kern)/_entwurf/p4-01`, wird nie freigeschaltet): Trennbänder zwischen den
// zusammengesetzten Seiten und Zuständen sowie ein markierter Platzhalter für Formulare anderer Pakete.
// Liegt im gescannten Kern-Ordner, weil `_entwurf` von `@source` ausgenommen ist (Klassen dort würden nicht erzeugt).
// Keine Seite bindet diese Datei ein.
import type { ReactNode } from 'react';
import { Etikett } from '@/components/kern/basis';

/** Band über die volle Breite: was folgt (Seite oder Zustand). */
export function VorschauTrenner({ children, hinweis }: { children: ReactNode; hinweis?: ReactNode }) {
  return (
    <div className="border-y border-dashed border-k-strich bg-k-fliese">
      <div className="mx-auto flex max-w-(--k-seite) flex-col gap-k-1 px-(--k-rand) py-k-4">
        <Etikett kreuz ton="tinte">
          {children}
        </Etikett>
        {hinweis ? <p className="k-mono text-k-1 text-k-tinte-2">{hinweis}</p> : null}
      </div>
    </div>
  );
}

/** Gestrichelter Platzhalter (z. B. Formular aus P4-05a), damit die Fläche im Foto erkennbar ist. */
export function VorschauPlatzhalter({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-k-10 items-center justify-center border border-dashed border-k-strich p-k-5">
      <p className="k-mono text-k-1 text-k-tinte-2">{children}</p>
    </div>
  );
}
