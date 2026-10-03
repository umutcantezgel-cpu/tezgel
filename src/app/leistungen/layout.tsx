import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, ORG_ID, SITE_URL } from '@/lib/schema';
import { SERVICES } from '@/config/services';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = createMetadata({
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
    name: 'Leistungen | Fliesenverlegung Tezgel',
    description:
      'Fliesen-, Platten- und Mosaikverlegung, Badsanierung, Balkon- und Terrassensanierung sowie Untergrundvorbereitung und DIN 18534 Verbundabdichtung.',
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
  {
    '@type': 'OfferCatalog',
    '@id': `${pageUrl}#catalog`,
    name: 'Leistungen von Fliesenverlegung Tezgel',
    provider: { '@id': ORG_ID },
    itemListElement: SERVICES.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.name,
        description: service.shortDescription,
        url: `${SITE_URL}/leistungen/${service.id}`,
      },
    })),
  },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={leistungenSchema} />
      {children}
    </>
  );
}
