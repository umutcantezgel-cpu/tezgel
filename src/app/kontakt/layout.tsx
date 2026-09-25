import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildContactPageNode, buildBreadcrumbNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = createMetadata({
  title: 'Kontakt & Vor-Ort-Aufmaß in Aßlar',
  description: 'Kontaktieren Sie Fliesenverlegung Tezgel in Aßlar: Fliesenverlegung, Badsanierung & DIN 18534 Abdichtung mit persönlicher Beratung und Aufmaß vor Ort.',
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
    name: 'Kontakt aufnehmen | Fliesenverlegung Tezgel',
    description:
      'Kontakt zum Fliesenleger-Fachbetrieb Fliesenverlegung Tezgel in Aßlar – für Fliesenverlegung, Badsanierung und Verbundabdichtung in Wetzlar und Mittelhessen.',
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
