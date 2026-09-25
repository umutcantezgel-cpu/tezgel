import React from 'react';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, buildServiceNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

const pageUrl = `${SITE_URL}/naturstein`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Naturstein', path: '/naturstein' },
];

const natursteinSchema = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    name: 'Natursteinverlegung & Naturstein-Ratgeber | Fliesenverlegung Tezgel',
    description:
      'Fachbetrieb für Naturstein in Aßlar & Wetzlar: Granit, Marmor, Kalkstein, Travertin und Schiefer fachgerecht verlegt und dauerhaft veredelt.',
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
  buildServiceNode({
    name: 'Natursteinverlegung & Veredelung',
    serviceType: 'Granit-, Marmor-, Kalkstein- & Schieferverlegung',
    description:
      'Fachgerechte Verlegung von Natursteinbelägen in Aßlar, Wetzlar und Hessen: Verfärbungsfreie Verklebung, passende Fugenmörtel und Oberflächenschutz.',
    url: pageUrl,
    areaServed: 'Aßlar, Wetzlar & Mittelhessen',
  }),
]);

export default function NatursteinLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={natursteinSchema} />
      {children}
    </>
  );
}
