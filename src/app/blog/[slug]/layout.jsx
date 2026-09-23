import { posts } from '@/config/posts';
import { COMPANY_DATA } from '@/config/company';
import { buildGraph, buildArticleNode, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  const path = `/blog/${post.slug}`;
  const title = post.title;
  const fullTitle = post.title.length > 38 ? post.title : `${post.title} | ${COMPANY_DATA.legalName}`;
  const description = post.excerpt ? (post.excerpt.length > 155 ? `${post.excerpt.slice(0, 152)}...` : post.excerpt) : post.title;

  return {
    title: post.title.length > 38 ? { absolute: post.title } : title,
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
      siteName: COMPANY_DATA.legalName,
      locale: 'de_DE',
      type: 'article',
      publishedTime: post.created_date || '2025-01-15T08:00:00+01:00',
      images: post.image ? [{ url: `${SITE_URL}${post.image}`, width: 1200, height: 630 }] : [],
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
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  let postSchemaGraph = null;
  if (post) {
    const pageUrl = `${SITE_URL}/blog/${post.slug}`;
    const breadcrumbs = [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ];

    postSchemaGraph = buildGraph([
      buildWebPageNode({
        url: pageUrl,
        name: `${post.title} | ${COMPANY_DATA.legalName}`,
        description: post.excerpt || post.title,
        breadcrumbItems: breadcrumbs,
      }),
      buildBreadcrumbNode(breadcrumbs, pageUrl),
      buildArticleNode({
        headline: post.title,
        description: post.excerpt || post.title,
        url: pageUrl,
        datePublished: post.created_date || '2025-01-15T08:00:00+01:00',
        image: post.image,
        keywords: post.tags && post.tags.length > 0 ? post.tags : [post.category],
      }),
    ]);
  }

  return (
    <>
      <JsonLd schema={postSchemaGraph} />
      {children}
    </>
  );
}
