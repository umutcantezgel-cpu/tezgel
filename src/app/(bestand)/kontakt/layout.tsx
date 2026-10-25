import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildContactPageNode, buildBreadcrumbNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';
import { KONTAKT } from '@/inhalte/kontakt';

export const metadata = createMetadata({
  title: 'Kontakt & Vor-Ort-Aufmaß | Fliesenleger Tezgel Aßlar',
  description: 'Kontaktieren Sie Fliesenleger Tezgel in Aßlar: kostenfreies Vor-Ort-Aufmaß, persönliche Beratung & Festpreis für Wetzlar & Hessen. Jetzt anfragen!',
  path: '/kontakt',
});

const pageUrl = `${SITE_URL}/kontakt`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Kontakt', path: '/kontakt' },
];

const contactSchema = buildGraph([
  buildContactPageNode({
    url: pageUrl,
    // wie Titel und Beschreibung der Seite (Zusatz E3-BAU-K016, Regel 6; Abnahme E3-BAU-09)
    name: KONTAKT.meta.titel,
    description: KONTAKT.meta.beschreibung,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={contactSchema} />
      {children}
    </>
  );
}
