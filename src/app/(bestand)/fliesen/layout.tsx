import React from 'react';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, buildServiceNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';
import { FLIESEN } from '@/inhalte/fliesen';

const pageUrl = `${SITE_URL}/fliesen`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Fliesen-Ratgeber', path: '/fliesen' },
];

const fliesenSchema = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    // wie Titel und Beschreibung der Seite (Abnahme E3-BAU-05, wie E3-BAU-01)
    name: FLIESEN.meta.titel,
    description: FLIESEN.meta.beschreibung,
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
  buildServiceNode({
    name: 'Fliesenverlegung & Großformate',
    serviceType: 'Fliesen-, Platten- und Mosaikverlegung',
    description:
      'Fachgerechte Fliesenverlegung im Innen- und Außenbereich in Aßlar, Wetzlar und Hessen: XXL-Großformate, Feinsteinzeug, Fugenbilder und Renovierung.',
    url: pageUrl,
    areaServed: 'Aßlar, Wetzlar & Mittelhessen',
  }),
]);

export default function FliesenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={fliesenSchema} />
      {children}
    </>
  );
}
