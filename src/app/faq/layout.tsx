import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildFaqNode, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import { COMPANY_DATA } from '@/config/company';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = createMetadata({
  title: 'FAQ – Häufige Fragen zu Fliesen & Badsanierung',
  description: `Antworten zu XXL-Fliesen, Badsanierung, DIN 18534 Abdichtung, Balkon & Terrasse, Pflegekassen-Zuschuss und Festpreisangebot – vom Fliesen-Meisterbetrieb ${COMPANY_DATA.legalName} aus ${COMPANY_DATA.headquarters.city}.`,
  path: '/faq',
});

const pageUrl = `${SITE_URL}/faq`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'FAQ', path: '/faq' },
];

// Must mirror the visible questions & answers in ./page.jsx.
const faqs = [
  {
    question: 'Welche Fliesenkleber und Fugenmassen verwenden Sie?',
    answer: 'Wir verwenden ausschließlich flexible C2-TE-S1/S2 Fliesenkleber und verfärbungsfreie Premium-Fugenmassen – für einen dauerhaft festen Verbund und ein sauberes Fugenbild.',
  },
  {
    question: 'Wann lohnen sich großformatige Fliesen (XXL)?',
    answer: 'Großformate sorgen für fugenarme, planebene Flächen mit ruhigem, monolithischem Raumgefühl – im Bad ebenso wie im Wohnbereich. Mit Nivelliersystem und Vakuumhebetechnik verlegen wir sie millimetergenau und ohne Überzähne.',
  },
  {
    question: 'Was kostet die Fliesenverlegung pro Quadratmeter?',
    answer: 'Das hängt von Format, Material und Zustand des Untergrunds ab. Nach dem kostenfreien Vor-Ort-Aufmaß erhalten Sie eine transparente Kostenaufstellung nach Quadratmetern und Arbeitsaufwand – als verbindliches Festpreisangebot.',
  },
  {
    question: 'Können neue Fliesen auf einen vorhandenen Belag verlegt werden?',
    answer: 'Das hängt vom Zustand des Altbelags ab. Beim Vor-Ort-Aufmaß prüfen wir Ebenheit, Restfeuchte und Tragfähigkeit des Untergrunds und empfehlen Ihnen die fachgerechte Lösung.',
  },
  {
    question: 'Was kostet eine Komplettbadsanierung aus einer Hand?',
    answer: 'Die Kosten hängen von Raumgröße, Ausstattung und Zustand des Untergrunds ab. Wir erstellen Ihnen nach einem kostenlosen Aufmaß vor Ort ein verbindliches Festpreisangebot.',
  },
  {
    question: 'Wie lange dauert ein kompletter Badumbau?',
    answer: 'Die Dauer hängt vom Umfang der Arbeiten ab. Vor Baustart erhalten Sie einen verbindlichen Bauzeitenplan mit festen Zusagen für Baustart und Fertigstellung – damit Ihr Alltag planbar bleibt.',
  },
  {
    question: 'Gibt es Zuschüsse für barrierefreie Bäder?',
    answer: 'Ja! Bei Vorliegen eines Pflegegrads (Pflegegrad 1–5) bezuschusst die Pflegekasse den altersgerechten Badumbau mit bis zu 4.000 € pro Person.',
  },
  {
    question: 'Wie wird eine bodengleiche Dusche dauerhaft dicht?',
    answer: 'Durch eine normgerechte Verbundabdichtung nach DIN 18534: Lückenlose Abdichtungsbahnen und Dichtmanschetten in Nassräumen sorgen für dauerhafte Dichtigkeit und Schimmelschutz.',
  },
  {
    question: 'Welche Beläge eignen sich für Balkon und Terrasse?',
    answer: 'Wir verlegen frostsichere 2-cm-Keramikplatten auf Stelzlagern – mit durchdachter Entwässerung für Balkon und Terrasse.',
  },
  {
    question: 'Welche Rutschhemmung brauche ich?',
    answer: 'Das hängt vom Einsatzbereich ab. Bei der Material- und Fugenbildplanung beraten wir Sie zu normgerechter Rutschhemmung (R10/R11) – passend zu Ihrem Raum und Belag.',
  },
  {
    question: 'Unterstützen Sie bei der Beantragung von Zuschüssen?',
    answer: 'Ja. Für den Zuschuss der Pflegekasse zum barrierefreien Bad erstellen wir den prüffähigen Kostenvoranschlag und begleiten Ihren Antrag von Anfang an.',
  },
  {
    question: 'Gibt es bei Ihnen eine Festpreisgarantie?',
    answer: 'Ja! Nach dem kostenfreien Vor-Ort-Aufmaß erhalten Sie ein verbindliches Festpreisangebot ohne versteckte Zusatzkosten.',
  },
  {
    question: 'In welchem Gebiet sind Sie tätig?',
    answer: `Vom Firmensitz in ${COMPANY_DATA.headquarters.city} aus sind wir in ${COMPANY_DATA.business.serviceArea.slice(0, -1).join(', ')} sowie für Großprojekte in ganz Hessen für Sie im Einsatz.`,
  },
];

const faqGraph = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    name: 'Häufig gestellte Fragen (FAQ) zu Fliesen & Badsanierung',
    description:
      `Antworten auf häufige Fragen rund um Fliesen, Großformate, Badsanierung, Abdichtung, Zuschüsse und Festpreisangebote von ${COMPANY_DATA.legalName} in ${COMPANY_DATA.headquarters.city}.`,
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
  buildFaqNode(faqs, pageUrl),
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={faqGraph} />
      {children}
    </>
  );
}
