import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildServiceNode, buildFaqNode, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import { COMPANY_DATA } from '@/config/company';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = createMetadata({
  title: 'Kostenlose Fachberatung vereinbaren',
  description: `Kostenlose Erstberatung & Vor-Ort-Aufmaß von ${COMPANY_DATA.legalName}: Badsanierung, XXL-Fliesen, Wohnbereiche und Terrassen in Aßlar, Wetzlar & Mittelhessen – persönlich und unverbindlich.`,
  path: '/beratung',
});

const pageUrl = `${SITE_URL}/beratung`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Kostenlose Fachberatung', path: '/beratung' },
];

// Must mirror the visible questions & answers in ./page.jsx.
const beratungFaqs = [
  {
    question: 'Ist das Erstgespräch wirklich 100% kostenlos und unverbindlich?',
    answer:
      'Ja. Sowohl die telefonische Erstberatung als auch das Vor-Ort-Aufmaß bei Ihnen in Aßlar, Wetzlar und Umgebung sind für Sie vollkommen kostenfrei und ohne jede Verpflichtung.',
  },
  {
    question: 'Wie lange dauert ein typischer Beratungstermin?',
    answer:
      'Für eine fundierte Ersteinschätzung planen wir in der Regel 30 bis 45 Minuten ein. Bei komplexen Sanierungsprojekten nehmen wir uns gerne auch 60 Minuten Zeit.',
  },
  {
    question: 'Welche Unterlagen sollte ich für den Termin bereitlegen?',
    answer:
      'Hilfreich sind Informationen zum Baujahr des Gebäudes, vorhandene Grundrisse oder Skizzen, Fotos des Badezimmers bzw. der zu belegenden Flächen sowie – falls vorhanden – Ideen zu Fliesenformat und Farbe.',
  },
  {
    question: 'Beraten Sie auch zu Zuschüssen für das barrierefreie Bad?',
    answer:
      'Ja. Für den Zuschuss der Pflegekasse zum barrierefreien Bad erstellen wir den prüffähigen Kostenvoranschlag und unterstützen Sie bei der Antragsstellung.',
  },
];

const beratungGraph = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    name: 'Kostenlose Fachberatung für Fliesen & Badsanierung in Aßlar & Wetzlar',
    description:
      'Vereinbaren Sie Ihre unverbindliche Beratung und das kostenfreie Vor-Ort-Aufmaß für Badsanierung, Fliesenverlegung, Wohnbereiche und Terrassen.',
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
  buildServiceNode({
    name: 'Kostenlose Fachberatung & Vor-Ort-Aufmaß',
    serviceType: 'Beratung Fliesenverlegung & Badsanierung',
    description:
      'Individuelle Vor-Ort-Beratung, Untergrundprüfung, Material- und Fugenbildplanung sowie transparente Angebotserstellung für Ihr Vorhaben.',
    url: pageUrl,
    offers: [
      { name: 'Vor-Ort-Aufmaß', description: 'Besichtigung Ihrer Räumlichkeiten in Mittelhessen' },
      { name: 'Material & Fugenbild', description: 'Beratung zu Formaten, Fugenachsen und Rutschhemmung' },
      { name: 'Festpreisangebot', description: 'Transparente Kostenaufstellung nach Quadratmetern und Arbeitsaufwand' },
    ],
  }),
  buildFaqNode(beratungFaqs, pageUrl),
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={beratungGraph} />
      {children}
    </>
  );
}
