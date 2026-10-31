// Über uns (E3-BAU-08, Vorlage ErzaehlSeite, E-025, K-016 „Ruhe“, E-047): die Seite setzt Vorlage, Inhalt und Metadaten aus
// `src/inhalte/ueber-uns.ts`. Schlitz `momente.beleg`: die gezeichnete Einsatzkarte (großer Moment `karte`, E3-GRAF-09). Schlitz
// `nachTun` (UM-E4-SICHT-FIX M-B7, Nacharbeit SF-B): die Unternehmensgeschichte mit dem Fugenband (`CompanyHistory`, Bestand;
// eigene Überschrift, im Rahmen eines Werkzeug-Abschnitts für den Seitenrand) direkt nach „Was wir tun“ und vor den Werten. Vorher
// stand sie als Werkzeug hinter dem nächsten Schritt, und die Seite endete zweimal. Direkt nach der Lage (`nachLage`) stünde
// ihr Satz zu 2019 als erstes Vorkommen von „Abdichtung“ und „bodengleiche Duschen“ mit beiden Erklärungen bei 35 Wörtern
// (höchstens 25); das bleibt M-C4 mit einer Textentscheidung.
// Danach im selben Schlitz die Werte als Vertrauensliste (UM-E4-EP2, Inhalt `WERTE`); das Qualitätsversprechen kommt aus dem
// Inhalt.
// Strukturierte Daten (JSON-LD) bleiben in `layout.tsx`.
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import { Werkzeug } from '@/components/vorlagen/ArbeitsSeite';
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
      nachTun={
        <>
          <Werkzeug werkzeug={{ id: 'company-history', titelId: 'company-history-heading', titel: '', inhalt: <CompanyHistory /> }} />
          <Werte inhalt={WERTE} />
        </>
      }
      momente={{
        beleg: <Einsatzkarte unterschrift="Von Aßlar aus arbeiten wir in Wetzlar, Gießen und Herborn." verweis={{ name: 'Alle Orte ansehen', href: '/standorte' }} />,
      }}
    />
  );
}
