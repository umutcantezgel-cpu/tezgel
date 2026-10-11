import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildAboutPageNode, buildBreadcrumbNode, SITE_URL } from '@/lib/schema';
import { COMPANY_DATA } from '@/config/company';
import JsonLd from '@/components/seo/JsonLd';
import Einstieg from '@/components/kern/seiten/ueber-uns/Einstieg';
import Betrieb from '@/components/kern/seiten/ueber-uns/Betrieb';
import Werte from '@/components/kern/seiten/ueber-uns/Werte';
import Geschichte from '@/components/kern/seiten/ueber-uns/Geschichte';
import Qualitaetsversprechen from '@/components/kern/vorlagen/fachseite/Qualitaetsversprechen';
import Abschluss from '@/components/kern/start/Abschluss';

// Hauptseite „/ueber-uns“ in Kern-Erscheinung (P4-08e, ruhender Entwurf; Freischaltung in W8-01 mit freischalten.sh).
// Erzählseite (GRUNDMENGE.json), ohne Signaturmoment (K-009: SIG-1/2/3 gehören zu /, /bad, /leistungen).
// Abschnitte in der Reihenfolge des Bestands `src/app/(bestand)/ueber-uns/page.jsx`:
//   Einstieg (Hero) · Unser Betrieb mit Kennzahlen (Schriftfeld) · Werte mit Wegen · CompanyHistory · QualityPromise · FinalCTA.
// Metadaten und JSON-LD wörtlich aus `src/app/(bestand)/ueber-uns/layout.tsx`: Das Bestands-Layout gilt für die Kern-Route
// nicht (es fällt mit der Freischaltung weg), darum stehen beide hier – gleiche Aufrufe, gleiche Werte, gleicher Hash.
const { legalName, owner, headquarters, authority, business } = COMPANY_DATA;

export const metadata: Metadata = createMetadata({
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
    name: `Über ${legalName} – Ihr Fliesen-Fachbetrieb in ${headquarters.city}`,
    description:
      `Lernen Sie ${legalName} und Inhaber ${owner.fullName} kennen. ${authority.certification} für Fliesen-, Platten- und Mosaikverlegung, Naturstein und Badsanierung in ${headquarters.city} und Mittelhessen.`,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
]);

export default function UeberUns() {
  return (
    <>
      <JsonLd schema={aboutSchema} />
      <Einstieg />
      <Betrieb />
      <Werte />
      <Geschichte />
      <Qualitaetsversprechen flaeche="fliese" />
      <Abschluss
        headline="Lernen Sie uns persönlich kennen: Kostenfreies Vor-Ort-Aufmaß mit Deniz Tezgel."
        subtitle="Über 15 Jahre Praxiserfahrung • Verbindlicher Festpreis • HWK-Fachbetrieb"
        buttonText="Jetzt persönlichen Termin anfragen"
      />
    </>
  );
}
