import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, SITE_URL, ORG_ID } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = createMetadata({
  title: 'Fliesen-Ratgeber & Badsanierung Tipps | Tezgel',
  description: 'Praxiswissen & Ratgeber zu Badsanierung, Fliesenverlegung & DIN 18534 Abdichtung vom Fliesenleger-Fachbetrieb Tezgel aus Aßlar. Jetzt informieren!',
  path: '/blog',
});

const pageUrl = `${SITE_URL}/blog`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Ratgeber & Blog', path: '/blog' },
];

const blogSchema = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    name: 'Ratgeber & Blog | Fliesenverlegung Tezgel',
    description:
      'Fachartikel rund um Badsanierung, Fliesen und Abdichtung vom Fliesenleger-Fachbetrieb in Aßlar.',
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
  {
    '@type': 'Blog',
    '@id': `${pageUrl}#blog`,
    name: 'Fliesenverlegung Tezgel Ratgeber',
    description: 'Fachwissen und Ratgeber rund um Badsanierung, Fliesen und barrierefreie Bäder.',
    publisher: { '@id': ORG_ID },
    url: pageUrl,
  },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={blogSchema} />
      {children}
    </>
  );
}
