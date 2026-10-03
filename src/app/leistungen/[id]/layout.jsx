import { SERVICES } from '@/config/services';
import { buildGraph, buildServiceNode, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    id: service.id,
  }));
}

import { createMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id);
  if (!service) return {};

  const path = `/leistungen/${service.id}`;
  const serviceHubTitles = {
    bad: 'Badsanierung & Komplettbäder · Tezgel Mittelhessen',
    wohnen: 'Wohnbereich & Fliesenverlegung · Tezgel Hessen',
    aussen: 'Balkon- & Terrassensanierung · Tezgel Mittelhessen',
    untergrund: 'DIN 18534 Abdichtung & Untergrund · Tezgel Hessen',
  };
  const title = serviceHubTitles[service.id] || `${service.name} · Tezgel Hessen`;
  const description = `${service.shortDescription}. Fachbetrieb für ${service.name} in Aßlar, Wetzlar & Mittelhessen – kostenfreies Vor-Ort-Aufmaß & Festpreisangebot.`;

  return createMetadata({
    title,
    description,
    path
  });
}

export default async function Layout({ children, params }) {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id);

  let serviceSchemaGraph = null;
  if (service) {
    const pageUrl = `${SITE_URL}/leistungen/${service.id}`;
    const breadcrumbs = [
      { name: 'Home', path: '/' },
      { name: 'Leistungen', path: '/leistungen' },
      { name: service.name, path: `/leistungen/${service.id}` },
    ];

    serviceSchemaGraph = buildGraph([
      buildWebPageNode({
        url: pageUrl,
        name: `${service.name} | Fliesenverlegung Tezgel`,
        description: service.shortDescription,
        breadcrumbItems: breadcrumbs,
      }),
      buildBreadcrumbNode(breadcrumbs, pageUrl),
      buildServiceNode({
        name: `${service.name} in Aßlar, Wetzlar & Mittelhessen`,
        serviceType: service.name,
        description: service.shortDescription,
        url: pageUrl,
        image: service.heroImage ?? undefined,
        offers: (service.features || []).map((feat) => ({ name: feat })),
      }),
    ]);
  }

  return (
    <>
      <JsonLd schema={serviceSchemaGraph} />
      {children}
    </>
  );
}
