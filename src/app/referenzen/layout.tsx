import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, SITE_URL, ORG_ID } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = createMetadata({
  title: 'Referenzen & Kundenbewertungen',
  description: 'Echte Kundenbewertungen von Fliesenverlegung Tezgel zu Bädern, Balkonen, Treppen und kompletten Häusern in Aßlar, Wetzlar und Mittelhessen – dazu typische Leistungsbeispiele.',
  path: '/referenzen',
});

const pageUrl = `${SITE_URL}/referenzen`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Referenzen', path: '/referenzen' },
];

const referenzenSchema = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    name: 'Referenzen & Kundenbewertungen | Fliesenverlegung Tezgel',
    description:
      'Kundenbewertungen und typische Leistungsbeispiele des Fliesenleger-Meisterbetriebs Fliesenverlegung Tezgel aus Aßlar.',
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
  {
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#collection`,
    name: 'Fliesenverlegung Tezgel – Referenzen & Kundenbewertungen',
    description: 'Echte Kundenstimmen aus Aßlar, Wetzlar und Mittelhessen sowie typische Leistungsbeispiele.',
    publisher: { '@id': ORG_ID },
  },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={referenzenSchema} />
      {children}
    </>
  );
}
