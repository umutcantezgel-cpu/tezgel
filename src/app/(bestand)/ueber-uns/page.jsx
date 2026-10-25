// Über uns (E3-BAU-08, Vorlage ErzaehlSeite, E-025, K-016 „Ruhe“, E-047): die Seite setzt Vorlage, Inhalt und Metadaten aus
// `src/inhalte/ueber-uns.ts`. Schlitz `momente.beleg`: die gezeichnete Einsatzkarte (großer Moment `karte`, E3-GRAF-09). Schlitz
// `werkzeug`: die Unternehmensgeschichte mit dem Fugenband (`CompanyHistory`, Bestand; hat eigene Überschrift und Abstände).
// Strukturierte Daten (JSON-LD) bleiben in `layout.tsx`.
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import Einsatzkarte from '@/components/momente/karte/Einsatzkarte';
import CompanyHistory from '@/components/sections/CompanyHistory';
import { createMetadata } from '@/lib/metadata';
import { UEBER_UNS } from '@/inhalte/ueber-uns';

export const metadata = createMetadata({
  title: UEBER_UNS.meta.titel,
  description: UEBER_UNS.meta.beschreibung,
  path: '/ueber-uns',
});

export default function AboutPage() {
  return (
    <ErzaehlSeite
      inhalt={UEBER_UNS}
      momente={{
        beleg: <Einsatzkarte unterschrift="Von Aßlar aus arbeiten wir in Wetzlar, Gießen und Herborn." verweis={{ name: 'Alle Orte ansehen', href: '/standorte' }} />,
      }}
      werkzeug={{ id: 'company-history', titelId: 'company-history-heading', titel: '', inhalt: <CompanyHistory /> }}
    />
  );
}
