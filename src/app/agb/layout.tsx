import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import { COMPANY_DATA } from '@/config/company';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = createMetadata({
  title: 'AGB – Geschäftsbedingungen',
  description: `Allgemeine Geschäftsbedingungen der ${COMPANY_DATA.legalName} für handwerkliche Werk- und Montageleistungen.`,
  path: '/agb',
});

const pageUrl = `${SITE_URL}/agb`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'AGB', path: '/agb' },
];

const agbSchema = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    name: `Allgemeine Geschäftsbedingungen (AGB) | ${COMPANY_DATA.legalName}`,
    description: `Geschäftsbedingungen für handwerkliche Dienstleistungen und Werkverträge der ${COMPANY_DATA.legalName}.`,
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={agbSchema} />
      {children}
    </>
  );
}
