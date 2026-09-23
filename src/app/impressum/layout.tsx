import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import { COMPANY_DATA } from '@/config/company';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = createMetadata({
  title: 'Impressum & rechtliche Angaben',
  description: `Impressum und gesetzliche Anbieterkennzeichnung der ${COMPANY_DATA.legalName}, ${COMPANY_DATA.headquarters.street}, ${COMPANY_DATA.headquarters.postalCode} ${COMPANY_DATA.headquarters.city}. Inhaber ${COMPANY_DATA.owner.fullName}.`,
  path: '/impressum',
});

const pageUrl = `${SITE_URL}/impressum`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Impressum', path: '/impressum' },
];

const impressumSchema = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    name: `Impressum & rechtliche Angaben | ${COMPANY_DATA.legalName}`,
    description: `Gesetzliche Anbieterkennzeichnung der ${COMPANY_DATA.legalName} in ${COMPANY_DATA.headquarters.city}.`,
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={impressumSchema} />
      {children}
    </>
  );
}
