import type { Metadata } from 'next';
import Kopf from '@/components/kern/kopf-a/Kopf';
import MobilInhalt from '@/components/kern/kopf-a/MobilInhalt';
import Planblatt from '@/components/kern/kopf-a/Planblatt';
import { BEREICHE } from '@/components/kern/kopf-a/daten';

// Vorschau P3-06 Variante A „Schriftfeld“ (wird nie freigeschaltet).
// Oben der echte Kopf (fest beim Scrollen; ab lg Hauptnavigation mit Planblättern, unter lg Menü-Schalter mit Mobilblatt),
// darunter Vorschau-Flächen zum Scrollen und eine Tafel mit Standbildern: jedes Planblatt statisch geöffnet und das
// Mobilblatt zweimal (alle Bereiche zu · erster Bereich offen). Das Icon-Sprite rendert das Kern-Layout (kein eigenes).
// Zustände: Hover mit der Maus, Fokus mit Tab, aktiv durch Gedrückthalten; Escape schließt Planblatt bzw. Mobilblatt.
export const metadata: Metadata = { title: 'Entwurf P3-06 · Kopf A', robots: { index: false, follow: false } };

const FLAECHE = 'flex items-end border border-dashed border-k-strich p-k-5';
const MARKE = 'k-mono text-k-1 text-k-tinte-2';

export default function VorschauKopfA() {
  return (
    <>
      <Kopf />
      <div className="mx-auto flex max-w-(--k-seite) flex-col gap-k-6 px-(--k-rand) py-k-8">
        <div aria-hidden="true" className={`${FLAECHE} min-h-screen`}>
          <span className={MARKE}>Vorschau-Fläche P3-06a · Platzhalter zum Scrollen · der Kopf bleibt oben stehen</span>
        </div>

        <section aria-label="Tafel: Planblätter statisch geöffnet" className="flex flex-col gap-k-4">
          <p className={MARKE}>Tafel 1 · Planblätter (Mega-Menü ab lg), statisch geöffnet, je Bereich eines</p>
          {BEREICHE.map((bereich) => (
            <div key={bereich.name} className="flex flex-col gap-k-2">
              <p className={MARKE}>Planblatt · {bereich.name}</p>
              <div className="border border-k-fuge">
                <Planblatt bereich={bereich} />
              </div>
            </div>
          ))}
        </section>

        <section aria-label="Tafel: Mobilblatt statisch geöffnet" className="flex flex-col gap-k-4">
          <p className={MARKE}>Tafel 2 · Mobilblatt (unter lg), statisch geöffnet: links alle Bereiche zu, rechts der erste Bereich offen</p>
          <div className="flex flex-wrap items-start gap-k-6">
            <div className="w-full max-w-(--k-mass) border border-k-strich bg-k-kalk">
              <MobilInhalt statisch />
            </div>
            <div className="w-full max-w-(--k-mass) border border-k-strich bg-k-kalk">
              <MobilInhalt statisch offenerBereich={0} />
            </div>
          </div>
        </section>

        <div aria-hidden="true" className={`${FLAECHE} min-h-screen`}>
          <span className={MARKE}>Vorschau-Fläche P3-06a · Platzhalter · Seitenende</span>
        </div>
      </div>
    </>
  );
}
