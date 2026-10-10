// Nur für die Vorschau `src/app/(kern)/_entwurf/p3-09-b` (wird nie freigeschaltet). Liegt im Komponentenordner, weil
// Tailwind `_entwurf` nicht liest (kern-global.css: @source not …/_entwurf) – sonst fehlten die Klassen.
// Formularplatz in realistischer Höhe (≈ 560 px = 35rem, über eine CSS-Variable) und eine markierte Folgefläche.
import type { CSSProperties } from 'react';

const MARKE = 'k-mono text-k-1 text-k-tinte-2';

export function FormularPlatzhalter() {
  return (
    <div
      style={{ '--k-formular-hoehe': '35rem' } as CSSProperties}
      className="flex min-h-(--k-formular-hoehe) p-k-3"
    >
      <div className="flex-1 border border-dashed border-k-strich p-k-5">
        <p className={MARKE}>
          Vorschau: hier steht das Hero-Formular <span className="whitespace-nowrap">(P3-13)</span>
        </p>
      </div>
    </div>
  );
}

export function Folgeflaeche() {
  return (
    <div className="mx-auto max-w-(--k-seite) px-(--k-rand) pb-k-9">
      <div aria-hidden="true" className="flex min-h-screen items-start border border-dashed border-k-strich p-k-5">
        <span className={MARKE}>Vorschau P3-09b · Folgefläche: hier beginnen die weiteren Abschnitte der Startseite</span>
      </div>
    </div>
  );
}
