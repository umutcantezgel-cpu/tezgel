import { PORTFOLIO_PROJECTS, isPlaceholderProject } from '@/config/projects';
import { buildGraph, buildProjectNode, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

export function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((project) => ({
    id: project.id.toString(),
  }));
}

const truncate = (text, max = 155) =>
  text.length > max ? `${text.slice(0, max - 3).trimEnd()}...` : text;

const getMetaTitle = (project) => {
  if (isPlaceholderProject(project)) return `${project.title}: typischer Leistungsumfang`;
  return project.location ? `${project.title} in ${project.location}` : project.title;
};

const getMetaDescription = (project) => {
  if (isPlaceholderProject(project)) {
    const scope = Array.isArray(project.scopeItems) ? project.scopeItems.slice(0, 3).join(', ') : '';
    const text = scope
      ? `Typischer Leistungsumfang: ${scope}. Projektdokumentation in Vorbereitung.`
      : 'Typischer Leistungsumfang dieses Projekttyps. Projektdokumentation in Vorbereitung.';
    return truncate(text);
  }
  return project.description ? truncate(project.description) : 'Projektbeispiel von Fliesenverlegung Tezgel';
};

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.id.toString() === id);
  if (!project) return {};

  const path = `/referenzen/${project.id}`;
  const title = getMetaTitle(project);
  const fullTitle = `${title} | Fliesenverlegung Tezgel`;
  const description = getMetaDescription(project);

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
      { name: project.title, path: `/referenzen/${project.id}` },
    ];
    const primaryImage = project.images?.find((img) => img.type === 'after')?.url || project.images?.[0]?.url;

    projectSchemaGraph = buildGraph([
      buildWebPageNode({
        url: pageUrl,
        name: `${getMetaTitle(project)} | Fliesenverlegung Tezgel`,
        description: project.description,
        breadcrumbItems: breadcrumbs,
      }),
      buildBreadcrumbNode(breadcrumbs, pageUrl),
      // The Project node credits the organization as creator, so it is only
      // emitted for documented projects (placeholder: false in config/projects.js).
      isPlaceholderProject(project)
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
