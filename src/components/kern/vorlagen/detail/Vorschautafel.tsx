// Nur für die Vorschau `src/app/(kern)/_entwurf/p4-02` (wird nie freigeschaltet). Liegt im Komponentenordner, weil
// Tailwind `_entwurf` nicht liest (kern-global.css: @source not …/_entwurf) – sonst fehlten die Klassen.
// Tafelkopf trennt die Vorlagen und Zustände; Platzfläche markiert gemeinsame Abschnitte, die nicht zu P4-02 gehören
// (Qualitätsversprechen, Bewertungen, Abschluss, Formulare, Karten) – an ihrer Stelle setzt die Welle den Kern-Abschnitt ein.
import type { ReactNode } from 'react';

const MARKE = 'k-mono text-k-1 text-k-tinte-2';

export function Tafelkopf({ children }: { children: ReactNode }) {
  return (
    <div className="border-y-2 border-k-tinte bg-k-fliese">
      <p className="mx-auto max-w-(--k-seite) px-(--k-rand) py-k-3 k-mono text-k-1 text-k-tinte">{children}</p>
    </div>
  );
}

export function Platzflaeche({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-(--k-seite) px-(--k-rand) py-k-7">
      <div aria-hidden="true" className="flex min-h-k-10 items-center border border-dashed border-k-strich p-k-5">
        <span className={MARKE}>{children}</span>
      </div>
    </div>
  );
}

/** Schmale Spalte (320 px) für den Reflow-Blick innerhalb der Desktop-Vorschau; echte 320er-Prüfung über die Ansicht. */
export function Schmal({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-80 max-w-full border-x border-dashed border-k-strich">{children}</div>;
}
