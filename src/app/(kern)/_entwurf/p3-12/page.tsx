// Vorschau P3-12 (ruhender Entwurf, wird nie freigeschaltet): Vertrauensleiste und Garantien, Kundenstimmen mit
// Karussell (F-19) und Servicegebiet (F-12) in der Reihenfolge der Startseite.
// Karte: Der echte Platzhalter (useKartenEinwilligung) steht in der Planfläche; „Karte laden & zustimmen“ willigt nur lokal
// ein (Cookie wie im Bestand) und zeigt dann einen beschrifteten Rahmen – kein Aufruf von OpenStreetMap oder Google Maps.
// Das Icon-Sprite rendert das Kern-Layout. Nur Klassen, die auch in gescannten Kern-Dateien vorkommen (`_entwurf` ist
// von @source ausgenommen).
import type { Metadata } from 'next';
import { Etikett } from '@/components/kern/basis';
import Vertrauen from '@/components/kern/start/Vertrauen';
import Stimmen from '@/components/kern/start/Stimmen';
import { ServicegebietRahmen } from '@/components/kern/start/Servicegebiet';
import KarteImBlick from '@/components/kern/start/vertrauen/KarteImBlick';

export const metadata: Metadata = {
  title: 'Vorschau P3-12 Vertrauen',
  robots: { index: false, follow: false },
};

function VorschauKarte() {
  return (
    <div className="flex items-center justify-center bg-k-fliese p-k-4 k-mono text-k-1 text-k-tinte-2">
      Vorschau: hier lädt die Karte (OpenStreetMap Ansicht Aßlar)
    </div>
  );
}

export default function VorschauP312() {
  return (
    <>
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <div aria-hidden="true" className="flex min-h-screen items-end border border-dashed border-k-strich p-k-5">
          <span className="k-mono text-k-1 text-k-tinte-2">Platzhalter P3-12 · erster Bildschirm (Einstieg) · darunter Vertrauensleiste und Garantien</span>
        </div>
        <Etikett rahmen className="mt-k-5">
          Vorschau P3-12 · Kern v1.2 · ruhender Entwurf
        </Etikett>
      </div>
      <Vertrauen />
      <Stimmen />
      <ServicegebietRahmen
        karte={
          <KarteImBlick>
            <VorschauKarte />
          </KarteImBlick>
        }
      />
    </>
  );
}
