import React from 'react';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, buildServiceNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

const pageUrl = `${SITE_URL}/balkon-terrasse`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Balkon & Terrasse', path: '/balkon-terrasse' },
];

const balkonSchema = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    name: 'Balkon & Terrasse fliesen Wetzlar | Fachbetrieb Tezgel',
    description:
      'Balkon & Terrasse fliesen lassen in Wetzlar & Aßlar: frostsichere Keramik, Stelzlager & Naturstein. Jetzt kostenfreies Vor-Ort-Aufmaß anfragen!',
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
  buildServiceNode({
    name: 'Balkon- & Terrassensanierung',
    serviceType: 'Balkonsanierung, Stelzlager & Terrassenplatten',
    description:
      'Fachgerechte Sanierung von Außenflächen in Aßlar, Wetzlar und Hessen: Verlegung von Feinsteinzeugplatten auf Stelzlagern, Entwässerung und Abdichtung.',
    url: pageUrl,
    areaServed: 'Aßlar, Wetzlar & Mittelhessen',
  }),
]);

export default function BalkonTerrasseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={balkonSchema} />
      {children}
    </>
  );
}
