import React from 'react';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, buildServiceNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

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

export default function BadLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={badSchema} />
      {children}
    </>
  );
}
