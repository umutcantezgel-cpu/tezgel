import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildAboutPageNode, buildBreadcrumbNode, SITE_URL } from '@/lib/schema';
import { COMPANY_DATA } from '@/config/company';
import JsonLd from '@/components/seo/JsonLd';
import { UEBER_UNS } from '@/inhalte/ueber-uns';

const { owner, headquarters, authority, business } = COMPANY_DATA;

export const metadata = createMetadata({
  title: 'Über uns | Fliesenleger-Fachbetrieb Tezgel Aßlar',
  description: `Über Fliesenverlegung Tezgel in ${headquarters.city}: ${authority.certification} seit ${business.establishmentYear}. Inhaber ${owner.fullName} – Fliesen & Bad in Wetzlar & Hessen.`,
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
    // wie Titel und Beschreibung der Seite (Abnahme E3-BAU-08)
    name: UEBER_UNS.meta.titel,
    description: UEBER_UNS.meta.beschreibung,
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
