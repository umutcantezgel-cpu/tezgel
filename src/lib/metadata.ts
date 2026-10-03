import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/schema';

const BASE_URL = SITE_URL;
const SITE_NAME = 'Fliesenverlegung Tezgel';

function sanitizeTitle(raw: string): string {
  const trimmed = raw.trim();
  let candidate = trimmed;

  if (trimmed.includes('Fliesenverlegung Tezgel')) {
    candidate = trimmed;
  } else if (trimmed.includes('Tezgel')) {
    if (trimmed.length + 15 <= 65) {
      candidate = `${trimmed} | Fachbetrieb`;
    } else {
      candidate = trimmed;
    }
  } else if (trimmed.length + 26 <= 65) {
    candidate = `${trimmed} | ${SITE_NAME}`;
  } else if (trimmed.length + 9 <= 65) {
    candidate = `${trimmed} · Tezgel`;
  } else {
    candidate = `${trimmed.slice(0, 56)} · Tezgel`;
  }

  // Ensure minimum length of 45 characters for Seobility
  if (candidate.length < 45) {
    if (candidate.length + 18 <= 65) {
      candidate = `${candidate} – Fachbetrieb`;
    } else if (candidate.length + 10 <= 65) {
      candidate = `${candidate} – Hessen`;
    }
  }

  // Ensure maximum length of 65 characters
  if (candidate.length > 65) {
    candidate = candidate.slice(0, 65).trim();
  }

  return candidate;
}

function sanitizeDescription(raw: string): string {
  let desc = raw.trim().replace(/\s+/g, ' ');

  // If too short (< 120 chars), append standard trust CTA to reach 120-155 chars
  if (desc.length < 120) {
    const pad = ' Jetzt unverbindlich beraten lassen & kostenfreies Vor-Ort-Aufmaß anfragen!';
    if (desc.length + pad.length <= 155) {
      desc = `${desc}${pad}`;
    } else {
      const shortPad = ' Kostenfreies Aufmaß & Festpreisangebot anfragen.';
      if (desc.length + shortPad.length <= 155) {
        desc = `${desc}${shortPad}`;
      }
    }
  }

  // If too long (> 155 chars), trim cleanly at word boundary
  if (desc.length > 155) {
    const cut = desc.slice(0, 151);
    const lastSpace = cut.lastIndexOf(' ');
    desc = `${(lastSpace > 110 ? cut.slice(0, lastSpace) : cut).trim()}...`;
  }

  return desc;
}

export function createMetadata(options: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const canonicalUrl = `${BASE_URL}${options.path === '/' ? '' : options.path}`;
  const fullTitle = sanitizeTitle(options.title);
  const fullDesc = sanitizeDescription(options.description);

  const defaultOgImage = `${BASE_URL}/images/logo/tezgel-logo.png`;
  const ogImages = options.image
    ? [{ url: options.image.startsWith('http') ? options.image : `${BASE_URL}${options.image}`, width: 1200, height: 630 }]
    : [{ url: defaultOgImage, width: 1200, height: 630 }];

  return {
    title: { absolute: fullTitle },
    description: fullDesc,
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
