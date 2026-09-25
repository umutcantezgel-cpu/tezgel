import React from 'react';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, buildServiceNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

const pageUrl = `${SITE_URL}/treppen`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Treppen & Treppensanierung', path: '/treppen' },
];

const treppenSchema = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    name: 'Treppenverlegung & Treppensanierung | Fliesenverlegung Tezgel',
    description:
      'Treppenverlegung und Treppensanierung in Aßlar & Wetzlar: Trittsichere Fliesen- und Natursteinbeläge für Innentreppen, Außentreppen und Mehrfamilienhäuser.',
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
  buildServiceNode({
    name: 'Treppenverlegung & Treppensanierung',
    serviceType: 'Innentreppen, Außentreppen & Treppenhäuser',
    description:
      'Fachbetrieb für Treppenbeläge in Aßlar, Wetzlar und Mittelhessen: Rutschfeste Fliesen, Kantenprofile, Setz- und Trittstufen und Entkopplung.',
    url: pageUrl,
    areaServed: 'Aßlar, Wetzlar & Mittelhessen',
  }),
]);

export default function TreppenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={treppenSchema} />
      {children}
    </>
  );
}
