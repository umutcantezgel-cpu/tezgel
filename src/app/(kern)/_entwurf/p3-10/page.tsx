import Fachbereiche from '@/components/kern/start/Fachbereiche';
import Fachgewerke from '@/components/kern/start/Fachgewerke';
import Etikett from '@/components/kern/basis/Etikett';
import { Feldraster, Rasterfeld } from '@/components/kern/basis/Feldraster';
import { VIGNETTEN } from '@/components/kern/motive/vignetten';

// Vorschau P3-10 (wird nie freigeschaltet): Fachbereiche und Fachgewerke der Startseite untereinander, danach eine Tafel
// mit den vier Plan-Vignetten groß. Die Fachbereiche stehen über den Fachgewerken, so liegt deren gestaffelter Auftritt
// unterhalb des ersten Bildschirms. Kein eigenes IconSprite (rendert das Kern-Layout).
// Nur Klassen, die auch in gescannten Kern-Dateien vorkommen (`_entwurf` ist von @source ausgenommen).
export default function VorschauStartFachbereicheFachgewerke() {
  return (
    <>
      <Fachbereiche />
      <Fachgewerke />
      <section aria-labelledby="p3-10-tafel" className="py-k-9 lg:py-k-10">
        <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
          <Etikett als="p" id="p3-10-tafel" kreuz>
            Vorschau P3-10 · Vignetten groß
          </Etikett>
          <Feldraster className="mt-k-5">
            {Object.entries(VIGNETTEN).map(([name, Vignette]) => (
              <Rasterfeld key={name} breite={{ mobil: 4, tablett: 8, desktop: 6 }} flaeche="fliese" className="text-k-tinte">
                <Etikett>{name}</Etikett>
                <div className="mt-k-5">
                  <Vignette />
                </div>
              </Rasterfeld>
            ))}
          </Feldraster>
        </div>
      </section>
    </>
  );
}
