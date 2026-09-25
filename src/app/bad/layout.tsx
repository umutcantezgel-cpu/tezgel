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
    name: 'Badsanierung & Badmodernisierung | Fliesenverlegung Tezgel',
    description:
      'Schlüsselfertige Badsanierung, barrierefreie Bäder nach DIN 18040-2 und bodengleiche Walk-In Duschen vom Fachbetrieb in Aßlar & Wetzlar.',
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
