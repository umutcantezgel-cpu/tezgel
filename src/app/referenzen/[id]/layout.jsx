import { PORTFOLIO_PROJECTS, isLegacyProject } from '@/config/projects';
import { buildGraph, buildProjectNode, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

export function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((project) => ({
    id: project.id.toString(),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.id.toString() === id);
  if (!project) return {};

  const path = `/referenzen/${project.id}`;
  const title = `${project.title} in ${project.location}`;
  const fullTitle = `${title} | Fliesenverlegung Tezgel`;
  const description = project.description ? (project.description.length > 155 ? `${project.description.slice(0, 152)}...` : project.description) : 'Projektbeispiel von Fliesenverlegung Tezgel';

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
  const project = PORTFOLIO_PROJECTS.find((p) => p.id.toString() === id);

  let projectSchemaGraph = null;
  if (project) {
    const pageUrl = `${SITE_URL}/referenzen/${project.id}`;
    const breadcrumbs = [
      { name: 'Home', path: '/' },
      { name: 'Referenzen', path: '/referenzen' },
      { name: project.title, path: pageUrl },
    ];
    const primaryImage = project.images?.find((img) => img.type === 'after')?.url || project.images?.[0]?.url;

    projectSchemaGraph = buildGraph([
      buildWebPageNode({
        url: pageUrl,
        name: `${project.title} | Fliesenverlegung Tezgel`,
        description: project.description,
        breadcrumbItems: breadcrumbs,
      }),
      buildBreadcrumbNode(breadcrumbs, pageUrl),
      // The Project node credits the organization as creator, so it is only
      // emitted for projects listed in TEZGEL_PROJECT_IDS (config/projects.js).
      isLegacyProject(project)
        ? null
        : buildProjectNode({
            name: project.title,
            description: project.description,
            url: pageUrl,
            locationCreated: project.location,
            image: primaryImage,
          }),
    ]);
  }

  return (
    <>
      <JsonLd schema={projectSchemaGraph} />
      {children}
    </>
  );
}
