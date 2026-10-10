import Ablauf from '@/components/kern/start/Ablauf';
import Grossformat from '@/components/kern/start/Grossformat';

// Vorschau P3-11 (wird nie freigeschaltet): Ablauf und Großformat der Startseite untereinander.
// Davor eine markierte Platzhalterfläche über eine Bildschirmhöhe, damit der Scroll-Auftritt des Ablaufs sichtbar wird.
// Nur Klassen, die auch in gescannten Kern-Dateien vorkommen (`_entwurf` ist von @source ausgenommen).
export default function VorschauStartAblaufGrossformat() {
  return (
    <>
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <div aria-hidden="true" className="flex min-h-screen items-end border border-dashed border-k-strich p-k-5">
          <span className="k-mono text-k-1 text-k-tinte-2">Platzhalter P3-11 · erster Bildschirm (Einstieg) · weiter nach unten</span>
        </div>
      </div>
      <Ablauf />
      <Grossformat />
    </>
  );
}
