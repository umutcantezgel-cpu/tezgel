import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildAboutPageNode, buildBreadcrumbNode, SITE_URL } from '@/lib/schema';
import { COMPANY_DATA } from '@/config/company';
import JsonLd from '@/components/seo/JsonLd';

const { legalName, owner, headquarters, authority, business } = COMPANY_DATA;

export const metadata = createMetadata({
  title: 'Über uns – Fliesen-Fachbetrieb in Aßlar',
  description: `Lernen Sie ${legalName} kennen: ${authority.certification}, gegründet ${business.establishmentYear} in ${headquarters.city}. Inhaber ${owner.fullName} – Fliesen, Großformate & Badsanierung in Mittelhessen.`,
  path: '/ueber-uns',
});

const pageUrl = `${SITE_URL}/ueber-uns`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Über uns', path: '/ueber-uns' },
];

const aboutSchema = buildGraph([
  buildAboutPageNode({
    url: pageUrl,
    name: `Über ${legalName} – Ihr Fliesen-Fachbetrieb in ${headquarters.city}`,
    description:
      `Lernen Sie ${legalName} und Inhaber ${owner.fullName} kennen. ${authority.certification} für Fliesen-, Platten- und Mosaikverlegung, Naturstein und Badsanierung in ${headquarters.city} und Mittelhessen.`,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={aboutSchema} />
      {children}
    </>
  );
}
