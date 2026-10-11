// Nur für die Vorschauen `src/app/(kern)/_entwurf/p4-0x` (werden nie freigeschaltet). Liegt im gescannten Kern-Ordner, weil
// Tailwind `_entwurf` nicht liest (kern-global.css: @source not …/_entwurf) – sonst fehlten die Klassen. Keine Seite bindet sie ein.
// Vorher doppelt: `fachseite/Vorschau` (P4-01: VorschauTrenner, VorschauPlatzhalter) und `detail/Vorschautafel` (P4-02: Tafelkopf,
// Platzflaeche). Trennband: was folgt (Seite oder Zustand); Platzhalter: gestrichelte Fläche für Abschnitte anderer Pakete.
// Pfade in den Hinweisen sind Kennungen und dürfen umbrechen (sonst verbreitern sie die Seite bei 320 px).
import type { ReactNode } from 'react';
import { Etikett, verbinde } from '@/components/kern/basis';

/** Band über die volle Breite: was folgt (Seite oder Zustand). */
export function VorschauTrenner({ children, hinweis }: { children: ReactNode; hinweis?: ReactNode }) {
  return (
    <div className="border-y border-dashed border-k-strich bg-k-fliese">
      <div className="mx-auto flex max-w-(--k-seite) flex-col gap-k-1 px-(--k-rand) py-k-4">
        <Etikett kreuz ton="tinte" className="wrap-break-word">
          {children}
        </Etikett>
        {hinweis ? <p className="min-w-0 k-mono text-k-1 text-k-tinte-2 wrap-break-word">{hinweis}</p> : null}
      </div>
    </div>
  );
}

/** Gestrichelter Platzhalter (z. B. Formular aus P4-05a), damit die Fläche im Foto erkennbar ist. `gerahmt`: eigener Rand. */
export function VorschauPlatzhalter({ children, gerahmt = false }: { children: ReactNode; gerahmt?: boolean }) {
  const flaeche = (
    <div aria-hidden={gerahmt ? 'true' : undefined} className="flex min-h-k-10 items-center justify-center border border-dashed border-k-strich p-k-5">
      <p className="min-w-0 k-mono text-k-1 text-k-tinte-2 wrap-break-word">{children}</p>
    </div>
  );
  return gerahmt ? <div className={verbinde('mx-auto max-w-(--k-seite) px-(--k-rand) py-k-7')}>{flaeche}</div> : flaeche;
}

/** Alter Name P4-02: Trennband der Vorlagen und Zustände. */
export function Tafelkopf({ children }: { children: ReactNode }) {
  return <VorschauTrenner>{children}</VorschauTrenner>;
}

/** Alter Name P4-02: markierte Fläche für gemeinsame Abschnitte anderer Pakete. */
export function Platzflaeche({ children }: { children: ReactNode }) {
  return <VorschauPlatzhalter gerahmt>{children}</VorschauPlatzhalter>;
}
