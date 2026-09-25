import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildFaqNode, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import { COMPANY_DATA } from '@/config/company';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = createMetadata({
  title: 'Förderung & Zuschüsse für das barrierefreie Bad',
  description: 'Bis zu 4.180 € Pflegekassen-Zuschuss für barrierefreie Bäder (§ 40 SGB XI): Wir erstellen den prüffähigen Kostenvoranschlag in Aßlar & Wetzlar.',
  path: '/foerderung',
});

const pageUrl = `${SITE_URL}/foerderung`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Förderung & Zuschüsse', path: '/foerderung' },
];

// Must mirror the visible questions & answers in ./page.jsx.
const foerderFaqs = [
  {
    question: 'Wie läuft der Antrag auf den Pflegekassen-Zuschuss ab?',
    answer:
      'Wir erstellen für Ihr barrierefreies Bad den prüffähigen Kostenvoranschlag, den Sie bei Ihrer Pflegekasse einreichen. Stellen Sie den Antrag möglichst vor Beginn der Arbeiten – wir begleiten Sie von Anfang an.',
  },
  {
    question: 'Welche Voraussetzungen gelten für den Zuschuss der Pflegekasse?',
    answer:
      'Voraussetzung ist ein Pflegegrad (1–5). Die Pflegekasse bezuschusst dann Maßnahmen zur Wohnumfeldverbesserung – z. B. eine bodengleiche Dusche statt Badewanne oder schwellenlose Zugänge – mit bis zu 4.180 € pro pflegebedürftiger Person.',
  },
  {
    question: 'Gibt es auch Fördermittel für die Badsanierung?',
    answer:
      'Ja, über das KfW-Programm 159 („Altersgerecht Umbauen“) können barrierefreie Bäder gefördert werden. Zudem bezuschusst die Pflegekasse Maßnahmen zur Wohnumfeldverbesserung nach § 40 SGB XI mit bis zu 4.180 Euro pro pflegebedürftiger Person.',
  },
  {
    question: `Unterstützt ${COMPANY_DATA.legalName} mich bei den Formalitäten?`,
    answer:
      'Selbstverständlich! Wir erstellen den prüffähigen Kostenvoranschlag für Ihren Antrag und begleiten Sie Schritt für Schritt – vom kostenfreien Vor-Ort-Aufmaß bis zur Abnahme.',
  },
];

const foerderungGraph = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    name: 'Förderung & Zuschüsse für das barrierefreie Bad',
    description:
      'Pflegekassen-Zuschuss nach § 40 SGB XI und KfW-Programm 159 für barrierefreie Bäder: prüffähiger Kostenvoranschlag und Begleitung beim Antrag.',
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
  buildFaqNode(foerderFaqs, pageUrl),
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={foerderungGraph} />
      {children}
    </>
  );
}
