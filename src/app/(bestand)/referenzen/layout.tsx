import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, SITE_URL, ORG_ID } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';
import { REFERENZEN } from '@/inhalte/referenzen';

export const metadata = createMetadata({
  title: 'Referenzen & Bewertungen | Fliesenleger Tezgel ★ 5,0',
  description: 'Kundenbewertungen & Referenzen von Fliesenleger Tezgel: Bäder, Terrassen, Treppen & Großformate in Wetzlar, Aßlar & Mittelhessen. 5,0 Google-Bewertung!',
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
    // wie Titel und Beschreibung der Seite (Zusatz E3-BAU-07, Regel 6.6)
    name: REFERENZEN.meta.titel,
    description: REFERENZEN.meta.beschreibung,
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
