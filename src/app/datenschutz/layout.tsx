import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import { COMPANY_DATA } from '@/config/company';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = createMetadata({
  title: 'Datenschutzerklärung nach DSGVO',
  description: 'Ausführliche Informationen zum Datenschutz und zur Verarbeitung personenbezogener Daten bei der Fliesenverlegung Tezgel gemäß EU-DSGVO.',
  path: '/datenschutz',
});

const pageUrl = `${SITE_URL}/datenschutz`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Datenschutz', path: '/datenschutz' },
];

const datenschutzSchema = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    name: `Datenschutzerklärung | ${COMPANY_DATA.legalName}`,
    description: 'Informationen zur Erhebung und Verarbeitung personenbezogener Daten nach DSGVO.',
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={datenschutzSchema} />
      {children}
    </>
  );
}
