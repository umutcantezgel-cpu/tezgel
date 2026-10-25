// Leistungen (KERN v3.6 K-009 Seitenformel, K-016 „Ruhe“; Text _werkstatt/texte/leistungen.md, E3-BAU-04, E-048): Erzählseite
// aus `src/inhalte/leistungen.ts`, gesetzt von der Vorlage ErzaehlSeite. Ruhig statt voll: Einstieg mittig mit vollständigem
// Foto; in „Was wir tun“ die vier Bereiche als Karten mit ihrem Verlegeplan (Plan-Morph zur Leistungsseite und sig-plan
// bleiben, E-037; Kennungen #gewerke, #bad, #wohnen, #aussen, #untergrund wie im Bestand), darunter der große Moment
// `formatregler`; der Ablauf mit den Planständen der Szene (SzeneAblauf ruhig, E-037); im nächsten Schritt die
// Express-Anfrage (TezgelAnfrageFunnel, Überschrift #express-anfrage, Logik, Pflichtfelder und Empfänger unverändert, G8);
// danach die Projektanfrage des Preisrechners (#kosten-rechner, nennt keinen Preis). Strukturierte Daten (WebPage, Brotkrumen, OfferCatalog) wie im Bestand.
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import { SERVICES } from '@/config/services';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/seo/JsonLd';
import { PricingCalculator } from '@/components/pricing/PricingCalculator';
import SzeneAblauf from '@/components/kern/SzeneAblauf';
import Leistungsplaene from '@/components/leistungen/Leistungsplaene';
import Formatregler from '@/components/momente/formatregler/Formatregler';
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import { LEISTUNGEN, LEISTUNGSPLAENE, RECHNER_SATZ } from '@/inhalte/leistungen';

export const metadata = createMetadata({
  title: LEISTUNGEN.meta.titel,
  description: LEISTUNGEN.meta.beschreibung,
  path: '/leistungen',
});

const pageUrl = `${SITE_URL}/leistungen`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Leistungen', path: '/leistungen' },
];

// Express-Anfrage nachladen (Tempo, wie auf der Startseite)
const TezgelAnfrageFunnel = dynamic(() => import('@/components/funnels/TezgelAnfrageFunnel'), {
  loading: () => <FormularPlatzhalter />,
});

const leistungenSchema = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    name: LEISTUNGEN.meta.titel,
    description: LEISTUNGEN.meta.beschreibung,
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
  {
    '@type': 'OfferCatalog',
    '@id': `${pageUrl}#catalog`,
    name: 'Leistungen von Fliesenverlegung Tezgel',
    itemListElement: SERVICES.map((service) => ({
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'EUR',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/termin`,
      itemOffered: {
        '@type': 'Service',
        name: service.name,
        description: service.shortDescription,
        url: `${SITE_URL}/leistungen/${service.id}`,
      },
    })),
  },
]);

// die drei Schritte des Seitentexts mit den Planständen der Szene (ruhig, ohne Scrollbindung; Motiv „fugen“, damit die Pläne
// der Bereiche darüber nicht doppelt stehen)
const schritte = LEISTUNGEN.ablauf.schritte.map((s, i) => ({
  nummer: String(i + 1).padStart(2, '0'),
  titel: s.titel,
  text: <p className="max-w-mass">{s.text}</p>,
}));

export default function ServiceHubPage() {
  return (
    <>
      <JsonLd schema={leistungenSchema} />
      <ErzaehlSeite
        inhalt={LEISTUNGEN}
        momente={{
          tun: (
            <>
              <Leistungsplaene bereiche={LEISTUNGSPLAENE} />
              <div className="mt-24">
                <Formatregler />
              </div>
            </>
          ),
          ablauf: <SzeneAblauf plan="fugen" bewegt={false} schritte={schritte} />,
        }}
        formular={<TezgelAnfrageFunnel />}
        formularId="express-anfrage"
        werkzeug={{ id: 'kosten-rechner', titelId: 'rechner-heading', titel: 'Oder beschreiben Sie Ihr Vorhaben genauer.', einleitung: RECHNER_SATZ, inhalt: <PricingCalculator /> }}
      />
    </>
  );
}
