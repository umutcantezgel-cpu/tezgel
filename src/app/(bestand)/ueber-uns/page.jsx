// Über uns (E3-BAU-08, Vorlage ErzaehlSeite, E-025, K-016 „Ruhe“, E-047): die Seite setzt Vorlage, Inhalt und Metadaten aus
// `src/inhalte/ueber-uns.ts`. Schlitz `momente.beleg`: die gezeichnete Einsatzkarte (großer Moment `karte`, E3-GRAF-09). Schlitz
// `werkzeug`: die Unternehmensgeschichte mit dem Fugenband (`CompanyHistory`, Bestand; hat eigene Überschrift und Abstände).
// Schlitz `nachTun`: die Werte als Vertrauensliste (UM-E4-EP2, Inhalt `WERTE`); das Qualitätsversprechen kommt aus dem Inhalt.
// Strukturierte Daten (JSON-LD) bleiben in `layout.tsx`.
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import Einsatzkarte from '@/components/momente/karte/Einsatzkarte';
import CompanyHistory from '@/components/sections/CompanyHistory';
import Werte from '@/components/ueber-uns/Werte';
import { createMetadata } from '@/lib/metadata';
import { UEBER_UNS, WERTE } from '@/inhalte/ueber-uns';

export const metadata = createMetadata({
  title: UEBER_UNS.meta.titel,
  description: UEBER_UNS.meta.beschreibung,
  path: '/ueber-uns',
});

export default function AboutPage() {
  return (
    <ErzaehlSeite
      inhalt={UEBER_UNS}
      nachTun={<Werte inhalt={WERTE} />}
      momente={{
        beleg: <Einsatzkarte unterschrift="Von Aßlar aus arbeiten wir in Wetzlar, Gießen und Herborn." verweis={{ name: 'Alle Orte ansehen', href: '/standorte' }} />,
      }}
      werkzeug={{ id: 'company-history', titelId: 'company-history-heading', titel: '', inhalt: <CompanyHistory /> }}
    />
  );
}
