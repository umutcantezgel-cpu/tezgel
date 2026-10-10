// Einstieg Variante A (P3-09a) · Platzhalter nur für die Vorschau `_entwurf/p3-09-a` (wird nie freigeschaltet).
// Liegt im Komponentenordner, weil Tailwind `_entwurf` nicht liest (kern-global.css): Nur so entstehen die Klassen.
// Höhe des Formularplatzes realistisch (≈ 560 px = 35rem) über eine CSS-Variable (K-004 Ausnahme), keine freien Klassenwerte.
import type { CSSProperties } from 'react';

/** Markierter Platz für das Hero-Formular (P3-13). */
export function FormularPlatzhalter() {
  return (
    <div
      style={{ '--k-formular-hoehe': '35rem' } as CSSProperties}
      className="flex min-h-(--k-formular-hoehe) items-start border border-dashed border-k-strich bg-k-fliese p-k-5"
    >
      <span className="k-mono text-k-1 text-k-tinte-2">Vorschau: hier steht das Hero-Formular (P3-13)</span>
    </div>
  );
}

/** Markierte Fläche unter dem Einstieg (zeigt, wo der nächste Abschnitt beginnt). */
export function FlaechePlatzhalter() {
  return (
    <div className="mx-auto max-w-(--k-seite) px-(--k-rand) pb-k-9">
      <div aria-hidden="true" className="flex min-h-screen items-start border border-dashed border-k-strich p-k-5">
        <span className="k-mono text-k-1 text-k-tinte-2">Platzhalter P3-09a · nächster Abschnitt der Startseite</span>
      </div>
    </div>
  );
}
