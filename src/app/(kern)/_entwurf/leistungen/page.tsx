// Hauptseite „/leistungen“ in Kern-Erscheinung (P4-08b, ruhender Entwurf nach E-015/E-017; Freischaltung in ihrer Welle mit
// `freischalten.sh`). Erzählseite laut GRUNDMENGE.json, Signaturmoment SIG-3 „Verlegeplan je Leistung“ (K-009).
// Abschnitte in Bestandsreihenfolge (`src/app/(bestand)/leistungen/page.jsx`): Einstieg · Fachgewerke (#gewerke, je Leistung
// #<id>) · Ablauf · Projektanfrage (Preisrechner) · Express-Anfrage (#express-anfrage) · Abschluss (Kern-Fassung von FinalCTA).
// Metadaten wörtlich wie das Bestands-Layout `src/app/(bestand)/leistungen/layout.tsx` (createMetadata: Titel, Beschreibung,
// Pfad → Canonical, Open Graph, robots); JSON-LD wörtlich wie die Bestandsseite (`leistungenSchema`, gleiche Bausteine, gleicher Hash).
// Keine Klassen in dieser Datei: `_entwurf` wird von Tailwind nicht gescannt, alle Gestaltung liegt in
// `@/components/kern/seiten/leistungen/*` (Lehre 12: Bausteine außerhalb über `@/`).
import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import { SERVICES } from '@/config/services';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';
import Einstieg from '@/components/kern/seiten/leistungen/Einstieg';
import Gewerke from '@/components/kern/seiten/leistungen/Gewerke';
import Ablauf from '@/components/kern/seiten/leistungen/Ablauf';
import { ExpressAnfrage, Projektanfrage } from '@/components/kern/seiten/leistungen/Anfrage';
import Abschluss from '@/components/kern/start/Abschluss';

export const metadata: Metadata = createMetadata({
  title: 'Fliesenleger Leistungen Wetzlar | Fachbetrieb Tezgel',
  description: 'Alle Fliesenleger-Leistungen von Tezgel in Wetzlar & Aßlar: Badsanierung, XXL-Großformate, Terrassen, Naturstein & Abdichtung. Jetzt Festpreis anfragen!',
  path: '/leistungen',
});

const pageUrl = `${SITE_URL}/leistungen`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Leistungen', path: '/leistungen' },
];

const leistungenSchema = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    name: 'Fliesenleger Leistungen Wetzlar | Fachbetrieb Tezgel',
    description:
      'Alle Fliesenleger-Leistungen von Tezgel in Wetzlar & Aßlar: Badsanierung, XXL-Großformate, Terrassen, Naturstein & Abdichtung.',
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

export default function Leistungen() {
  return (
    <>
      <JsonLd schema={leistungenSchema} />
      <Einstieg />
      <Gewerke />
      <Ablauf />
      <Projektanfrage />
      <ExpressAnfrage />
      <Abschluss />
    </>
  );
}
