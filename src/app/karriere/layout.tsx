import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildJobPostingNode, buildFaqNode, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import { COMPANY_DATA } from '@/config/company';
import JsonLd from '@/components/seo/JsonLd';

const { contact, headquarters, business, legalName } = COMPANY_DATA;

export const metadata = createMetadata({
  title: 'Karriere & Jobs – Fliesenleger (m/w/d) in Aßlar',
  description: `Werden Sie Teil von ${legalName} in ${headquarters.city}: Wir suchen Fliesenleger (m/w/d) – Geselle oder Fachkraft – und freuen uns über Ausbildungs- und Initiativbewerbungen.`,
  path: '/karriere',
});

const pageUrl = `${SITE_URL}/karriere`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Karriere & Jobs', path: '/karriere' },
];

// Mirrors the first (open) position shown in ./page.jsx.
const jobs = [
  {
    title: 'Fliesenleger (m/w/d) – Geselle oder Fachkraft',
    description:
      'Verlegung von Fliesen, Platten und Naturstein in Bädern, Wohnbereichen sowie auf Balkonen und Terrassen – von der Untergrundvorbereitung über die DIN-18534-Verbundabdichtung bis zur fugenarmen XXL-Großformatverlegung.',
  },
];

// Must mirror the visible questions & answers in ./page.jsx.
const karriereFaqs = [
  {
    question: 'Wie läuft der Bewerbungsprozess ab?',
    answer: `Ganz unkompliziert: Rufen Sie uns an unter ${contact.phone}, schreiben Sie per WhatsApp an ${contact.whatsapp} oder senden Sie eine kurze E-Mail an ${contact.email}.`,
  },
  {
    question: 'Welche Arbeiten erwarten mich?',
    answer:
      'Das gesamte Spektrum des Fliesenhandwerks: Badsanierungen und barrierefreie Walk-In-Duschen, fugenarme Großformate, Wohnbereiche, Küchen und Treppen, Balkone und Terrassen, Untergrundvorbereitung mit DIN 18534 Verbundabdichtung sowie Naturstein.',
  },
  {
    question: 'Wo liegen die Baustellen?',
    answer: `Vom Firmensitz in ${headquarters.city} aus arbeiten wir in ${business.serviceArea.slice(0, -1).join(', ')} – für Großprojekte auch in ganz Hessen.`,
  },
];

const karriereGraph = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    name: `Karriere & Jobs bei ${legalName} in ${headquarters.city}`,
    description:
      'Stellenangebot für Fliesenleger (m/w/d) – Geselle oder Fachkraft – sowie Ausbildungs- und Initiativbewerbungen im Fliesen-Fachbetrieb.',
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
  ...jobs.map((job) => buildJobPostingNode(job, pageUrl)),
  buildFaqNode(karriereFaqs, pageUrl),
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={karriereGraph} />
      {children}
    </>
  );
}
