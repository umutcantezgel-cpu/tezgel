import { createMetadata } from '@/lib/metadata';
import SeitenDaten from '@/components/seo/SeitenDaten';

// /termin/page.jsx is a client component, so its metadata lives here – und mit ihr die strukturierten Daten der Seite
// (SeitenDaten, E3-SEO-JSONLD-NACH, E-054): als Serverkomponente, damit Schema und Meta-Tabelle nicht ins Client-Bundle
// der Seite gelangen. /termin hat keine Unterseiten, die die Daten erben könnten.
const TITEL = 'Termin vereinbaren | Fliesenleger Tezgel Wetzlar';
const BESCHREIBUNG =
  'Termin bei Fliesenleger Tezgel in Aßlar: Wunschthema wählen & Terminanfrage für Vor-Ort-Aufmaß in Wetzlar & Hessen direkt online oder per WhatsApp senden.';

export const metadata = createMetadata({
  title: TITEL,
  description: BESCHREIBUNG,
  path: '/termin',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SeitenDaten
        pfad="/termin"
        titel={TITEL}
        beschreibung={BESCHREIBUNG}
        brotkrumen={[{ name: 'Start', href: '/' }, { name: 'Termin vereinbaren bei Fliesenleger Tezgel' }]}
      />
      {children}
    </>
  );
}
