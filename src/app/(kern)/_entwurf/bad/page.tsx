import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, buildServiceNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';
import Einstieg from '@/components/kern/seiten/bad/Einstieg';
import Kategorien from '@/components/kern/seiten/bad/Kategorien';
import { AnfrageStation, ProjektCheckStation } from '@/components/kern/seiten/bad/Werkzeuge';
import Abschluss from '@/components/kern/start/Abschluss';

// Hauptseite „/bad“ in Kern-Erscheinung (P4-08a, ruhender Entwurf; Freischaltung in W1 mit freischalten.sh).
// Erzählseite (GRUNDMENGE `seitenart`), Signaturmoment SIG-2 „Laser zieht den Ablauf“ an den Schrittfugen der drei
// Stationen Qualitäts-Kategorien → Projektcheck → Badanfrage (`seiten/bad/Schrittfuge`).
// Reihenfolge, Wortlaut, IDs und Ziele wie `src/app/(bestand)/bad/page.jsx`; Metadaten wörtlich wie dort (Titel,
// Beschreibung, Pfad), JSON-LD wörtlich aus `src/app/(bestand)/bad/layout.tsx` (Bestands-Layout gilt für die Kern-Route
// nicht, darum steht beides hier). Klassen nur in den gescannten Kern-Bausteinen, hier keine.
export const metadata: Metadata = createMetadata({
  title: 'Badsanierung Wetzlar & Aßlar | Fachbetrieb Tezgel',
  description: 'Schlüsselfertige Badsanierung in Wetzlar & Aßlar: barrierefreie Walk-In Duschen, XXL-Fliesen & DIN 18534 Abdichtung. Jetzt Festpreisangebot anfragen!',
  path: '/bad',
});

const pageUrl = `${SITE_URL}/bad`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Bad & Badsanierung', path: '/bad' },
];

const badSchema = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    name: 'Badsanierung Wetzlar & Aßlar | Fachbetrieb Tezgel',
    description:
      'Schlüsselfertige Badsanierung in Wetzlar & Aßlar: barrierefreie Walk-In Duschen, XXL-Fliesen & DIN 18534 Abdichtung. Jetzt Festpreisangebot anfragen!',
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
  buildServiceNode({
    name: 'Badsanierung & Badmodernisierung',
    serviceType: 'Badsanierung, Walk-In Duschen & Barrierefreie Bäder',
    description:
      'Fachmännische Badsanierung aus einer Hand in Aßlar, Wetzlar und Mittelhessen: Barrierefreie Bäder, bodengleiche Duschen, Großformatfliesen und Verbundabdichtung.',
    url: pageUrl,
    areaServed: 'Aßlar, Wetzlar & Mittelhessen',
  }),
]);

export default function BadSeite() {
  return (
    <>
      <JsonLd schema={badSchema} />
      <Einstieg />
      <Kategorien />
      <ProjektCheckStation />
      <AnfrageStation />
      <Abschluss />
    </>
  );
}
