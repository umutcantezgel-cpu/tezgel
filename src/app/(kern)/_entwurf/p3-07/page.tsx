import type { Metadata } from 'next';
import { Feld } from '@/components/kern/basis';
import Fuss from '@/components/kern/fuss/Fuss';
import UntereLeiste from '@/components/kern/fuss/UntereLeiste';
import WhatsAppKanal from '@/components/kern/fuss/WhatsAppKanal';

// Vorschau P3-07 (wird nie freigeschaltet): Fuß, untere Leiste (unter lg) und WhatsApp-Kanal (ab lg).
// Das Icon-Sprite rendert das Kern-Layout (kein eigenes, sonst doppelte IDs).
// Platzhalterflächen sind gestrichelt und als Platzhalter beschriftet; das Platzhalter-Feld unten rechts zeigt, dass der
// Kanal Formularfeldern ausweicht (bis dorthin scrollen: der Kanal verschwindet, danach erscheint er wieder; über der
// Abschlusszeile des Fußes ebenso). Zustände: Hover mit der Maus, Fokus mit Tab, aktiv durch Gedrückthalten prüfen.
export const metadata: Metadata = { title: 'Entwurf P3-07', robots: { index: false, follow: false } };

export default function VorschauFuss() {
  return (
    <>
      <div className="mx-auto flex max-w-(--k-seite) flex-col gap-k-6 px-(--k-rand) py-k-8">
        <div aria-hidden="true" className="flex min-h-screen items-end border border-dashed border-k-strich p-k-5">
          <span className="k-mono text-k-1 text-k-tinte-2">Platzhalter P3-07 · Seiteninhalt zum Scrollen · weiter nach unten</span>
        </div>
        <div className="grid grid-cols-1 gap-k-6 lg:grid-cols-12">
          <div aria-hidden="true" className="flex min-h-k-10 items-end border border-dashed border-k-strich p-k-5 lg:col-span-8">
            <span className="k-mono text-k-1 text-k-tinte-2">Platzhalter P3-07 · Inhalt links</span>
          </div>
          <form className="flex flex-col gap-k-4 border border-dashed border-k-strich p-k-5 lg:col-span-4" action="#">
            <span className="k-mono text-k-1 text-k-tinte-2">Platzhalter P3-07 · Formular rechts (Kanal weicht aus)</span>
            <Feld beschriftung="Platzhalter-Feld" name="platzhalter" />
          </form>
        </div>
        <div aria-hidden="true" className="flex min-h-screen items-end border border-dashed border-k-strich p-k-5">
          <span className="k-mono text-k-1 text-k-tinte-2">Platzhalter P3-07 · Seitenende · darunter der Fuß</span>
        </div>
      </div>
      <Fuss />
      <UntereLeiste />
      <WhatsAppKanal />
    </>
  );
}
