import React from 'react';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, buildServiceNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

const pageUrl = `${SITE_URL}/fliesenreparatur`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Fliesenreparatur', path: '/fliesenreparatur' },
];

const reparaturSchema = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    name: 'Fliesenreparatur & Fliesen-Austausch | Fliesenverlegung Tezgel',
    description:
      'Professionelle Fliesenreparatur in Aßlar & Wetzlar: Austausch gerissener Fliesen, Verschließen von Bohrlöchern und fugenlose Nachbesserung.',
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
  buildServiceNode({
    name: 'Fliesenreparatur & Fliesen-Austausch',
    serviceType: 'Fliesenreparatur, Fugensanierung & Nachbesserung',
    description:
      'Fachgerechte Fliesenreparatur und Austausch einzelner Platten ohne Beschädigung benachbarter Fliesen in Aßlar, Wetzlar und Hessen.',
    url: pageUrl,
    areaServed: 'Aßlar, Wetzlar & Mittelhessen',
  }),
]);

export default function FliesenreparaturLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={reparaturSchema} />
      {children}
    </>
  );
}
