import React from 'react';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, buildServiceNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

const pageUrl = `${SITE_URL}/untergrund-abdichtung`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Untergrund & Abdichtung', path: '/untergrund-abdichtung' },
];

const untergrundSchema = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    name: 'Untergrundvorbereitung & Verbundabdichtung | Fliesenverlegung Tezgel',
    description:
      'Fachbetrieb für DIN 18534 Verbundabdichtung, Estrich-Belegreife, Gefälleausgleich und Entkopplung in Aßlar, Wetzlar und ganz Mittelhessen.',
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
  buildServiceNode({
    name: 'Untergrundvorbereitung & DIN 18534 Verbundabdichtung',
    serviceType: 'Estrichprüfung, Gefälleausgleich, Entkopplung & Verbundabdichtung',
    description:
      'Normgerechte Untergrundvorbereitung und DIN 18534 Verbundabdichtung im Sanitär- und Außenbereich in Aßlar, Wetzlar und Hessen.',
    url: pageUrl,
    areaServed: 'Aßlar, Wetzlar & Mittelhessen',
  }),
]);

export default function UntergrundLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={untergrundSchema} />
      {children}
    </>
  );
}
