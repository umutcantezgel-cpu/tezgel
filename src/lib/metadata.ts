import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/schema';

const BASE_URL = SITE_URL;
const SITE_NAME = 'Fliesenverlegung Tezgel';

/**
 * Robots directive for legacy routes that are kept buildable but must not be
 * indexed (off-topic HVAC content that is not part of the Tezgel portfolio).
 */
export const NOINDEX_ROBOTS: Metadata['robots'] = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true,
  },
};

export function createMetadata(options: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const canonicalUrl = `${BASE_URL}${options.path === '/' ? '' : options.path}`;
  const isHomePage = options.path === '/' || options.path === '';
  const fullTitle = isHomePage 
    ? `${options.title} | ${SITE_NAME}`
    : `${options.title} | ${SITE_NAME}`;

  return {
    title: isHomePage ? { absolute: fullTitle } : options.title,
    description: options.description,
    alternates: { 
      canonical: canonicalUrl,
      languages: {
        'de': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    openGraph: {
      title: fullTitle,
      description: options.description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'de_DE',
      type: 'website',
      images: options.image ? [{ url: options.image, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: options.description,
    },
    robots: options.noIndex
      ? NOINDEX_ROBOTS
      : {
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
