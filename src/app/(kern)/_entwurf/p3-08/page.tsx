// Vorschau P3-08 (ruhender Entwurf, wird nie freigeschaltet): Einwilligungsbanner (E-013) und Karten-Platzhalter (F-12).
// Feste Zustände im Fluss (ohne Cookie, ohne Netz) und darunter die echten Teile mit Logik: Der feste Banner erscheint
// wie live unten (Erstbesuch); seine Knöpfe setzen den Cookie tezgel_consent_status. Der echte Platzhalter lädt als Kind nur
// einen beschrifteten Rahmen – kein Aufruf von Google Maps. Das Icon-Sprite rendert das Kern-Layout.
// Relativer Import wie P3-03: freischalten.sh verschiebt den Ordner, ein @/…/_entwurf/…-Pfad bräche dabei.
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Etikett } from '@/components/kern/basis';
import BannerInsel from '@/components/kern/einwilligung/BannerInsel';
import KartenPlatzhalter from '@/components/kern/einwilligung/KartenPlatzhalter';
import { BannerZustaende, KartenRahmen, KartenZustaende } from './Vorschau';

export const metadata: Metadata = {
  title: 'Vorschau P3-08 Einwilligung',
  robots: { index: false, follow: false },
};

function Abschnitt({ id, titel, children }: { id: string; titel: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-k-5 border-t border-k-fuge py-k-7">
      <h2 id={id} className="k-anzeige text-k-5">
        {titel}
      </h2>
      {children}
    </section>
  );
}

export default function VorschauP308() {
  return (
    <div className="mx-auto flex max-w-(--k-seite) flex-col px-(--k-rand) py-k-7">
      <Etikett rahmen>Vorschau P3-08 · Kern v1.2 · ruhender Entwurf</Etikett>
      <h1 className="k-anzeige mt-k-5 text-k-6">Einwilligung</h1>

      <Abschnitt id="t-banner" titel="Einwilligungsbanner · Zustände">
        <BannerZustaende />
      </Abschnitt>

      <Abschnitt id="t-karte" titel="Karten-Platzhalter · Zustände">
        <KartenZustaende />
      </Abschnitt>

      <Abschnitt id="t-echt" titel="Mit Logik">
        <p className="k-text max-w-(--k-mass) text-k-3 text-k-tinte-2">
          Echter Platzhalter (useKartenEinwilligung) und echter Banner (useEinwilligungsBanner, unten am Rand).
        </p>
        <KartenPlatzhalter>
          <KartenRahmen />
        </KartenPlatzhalter>
      </Abschnitt>

      <BannerInsel />
    </div>
  );
}
