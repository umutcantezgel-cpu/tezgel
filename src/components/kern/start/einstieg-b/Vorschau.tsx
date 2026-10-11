// Nur für die Vorschau `src/app/(kern)/_entwurf/p3-09-b` (wird nie freigeschaltet). Liegt im Komponentenordner, weil
// Tailwind `_entwurf` nicht liest (kern-global.css: @source not …/_entwurf) – sonst fehlten die Klassen.
// Markierte Folgefläche unter dem Einstieg (das Formular zeigt die Vorschau echt: HeroKontakt, P3-09c).
const MARKE = 'k-mono text-k-1 text-k-tinte-2';

export function Folgeflaeche() {
  return (
    <div className="mx-auto max-w-(--k-seite) px-(--k-rand) pb-k-9">
      <div aria-hidden="true" className="flex min-h-screen items-start border border-dashed border-k-strich p-k-5">
        <span className={MARKE}>Vorschau P3-09b · Folgefläche: hier beginnen die weiteren Abschnitte der Startseite</span>
      </div>
    </div>
  );
}
