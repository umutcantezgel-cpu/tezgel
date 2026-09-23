import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, SITE_URL, ORG_ID } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = createMetadata({
  title: 'Ratgeber zu Badsanierung & Fliesen',
  description: 'Praxiswissen rund um Badsanierung, Fliesen und Abdichtung vom Fliesenleger-Meisterbetrieb Tezgel aus Aßlar.',
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
      'Fachartikel rund um Badsanierung, Fliesen und Abdichtung vom Fliesenleger-Meisterbetrieb in Aßlar.',
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
