import { SERVICES } from '@/config/services';
import { buildGraph, buildServiceNode, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id);
  if (!service) return {};

  const path = `/leistungen/${service.id}`;
  const title = `${service.name} in Aßlar, Wetzlar & Umgebung`;
  const fullTitle = `${title} | Fliesenverlegung Tezgel`;
  const description = `${service.shortDescription}. Ihr Fliesenleger-Fachbetrieb aus Aßlar für Wetzlar und Mittelhessen – kostenfreies Vor-Ort-Aufmaß & verbindliches Festpreisangebot.`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        'de': path,
        'x-default': path,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: 'Fliesenverlegung Tezgel',
      locale: 'de_DE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
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
