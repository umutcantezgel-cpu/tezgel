import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/schema';

const BASE_URL = SITE_URL;
const SITE_NAME = 'Fliesenverlegung Tezgel';

export function createMetadata(options: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const canonicalUrl = `${BASE_URL}${options.path === '/' ? '' : options.path}`;
  const rawTitle = options.title.trim();
  let fullTitle = rawTitle;

  if (rawTitle.includes('Fliesenverlegung Tezgel') || rawTitle.includes('Tezgel')) {
    fullTitle = rawTitle;
  } else if (rawTitle.length + 26 <= 65) {
    fullTitle = `${rawTitle} | ${SITE_NAME}`;
  } else if (rawTitle.length + 9 <= 65) {
    fullTitle = `${rawTitle} · Tezgel`;
  } else {
    fullTitle = `${rawTitle.slice(0, 56)} · Tezgel`;
  }

  const defaultOgImage = `${BASE_URL}/images/logo/tezgel-logo.png`;
  const ogImages = options.image
    ? [{ url: options.image.startsWith('http') ? options.image : `${BASE_URL}${options.image}`, width: 1200, height: 630 }]
    : [{ url: defaultOgImage, width: 1200, height: 630 }];

  return {
    title: { absolute: fullTitle },
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
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: options.description,
      images: ogImages.map(img => img.url),
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
