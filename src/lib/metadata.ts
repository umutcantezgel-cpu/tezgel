import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/schema';

const BASE_URL = SITE_URL;
const SITE_NAME = 'Fliesenverlegung Tezgel';

function sanitizeTitle(raw: string): string {
  const trimmed = raw.trim().replace(/\s+/g, ' ');
  const base = trimmed
    .replace(/\s*\|\s*Fliesenverlegung Tezgel/gi, '')
    .replace(/\s*–\s*Referenzen Fliesenverlegung Tezgel/gi, '')
    .replace(/\s*\|\s*Ratgeber Fliesenverlegung Tezgel/gi, '')
    .replace(/\s*–\s*Fachbetrieb Fliesen Tezgel/gi, '')
    .replace(/\s*·\s*Tezgel/gi, '')
    .replace(/\s*\|\s*Fachbetrieb/gi, '')
    .replace(/\s*–\s*Fachbetrieb/gi, '')
    .trim();

  let candidate: string;
  if (/Tezgel/i.test(base)) {
    candidate = base;
  } else {
    if (base.length + 9 <= 58) {
      candidate = `${base} · Tezgel`;
    } else if (base.length <= 58 && base.length >= 45) {
      candidate = base;
    } else {
      let cut = base.slice(0, 48);
      const lastSpace = cut.lastIndexOf(' ');
      if (lastSpace > 20) {
        cut = cut.slice(0, lastSpace);
      }
      cut = cut.replace(/\s+(in|und|für|mit|bei|&|-|–)\s*$/gi, '').trim();
      candidate = `${cut} · Tezgel`;
    }
  }

  // Ensure minimum length of 45 characters for Seobility
  if (candidate.length < 45) {
    if (candidate.includes(' · Tezgel')) {
      const parts = candidate.split(' · Tezgel');
      const prefix = parts[0];
      if (prefix.length + 21 <= 58) {
        candidate = `${prefix} · Fachbetrieb Tezgel`;
      } else if (prefix.length + 18 <= 58) {
        candidate = `${prefix} · Fliesen Tezgel`;
      } else if (prefix.length + 16 <= 58) {
        candidate = `${prefix} – Tezgel Hessen`;
      }
    } else {
      if (candidate.length + 9 <= 58) {
        candidate = `${candidate} · Tezgel`;
      } else if (candidate.length + 7 <= 58) {
        candidate = `${candidate} Hessen`;
      }
    }
  }

  // Guard: strictly clamp to <= 58 chars (SERP Budget < 580px)
  if (candidate.length > 58) {
    const cut = candidate.slice(0, 58);
    const lastSpace = cut.lastIndexOf(' ');
    candidate = (lastSpace > 45 ? cut.slice(0, lastSpace) : cut).trim();
  }

  // Final sanitation: never allow dangling prepositions before brand or title end
  candidate = candidate
    .replace(/\s+(in|und|für|mit|&)\s+·\s+Tezgel/gi, ' · Tezgel')
    .replace(/\s+(in|und|für|mit|&)\s*$/gi, '')
    .trim();

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

export interface MetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
}

export function generatePageMetadata(options: MetadataOptions): Metadata {
  const canonicalUrl = `${BASE_URL}${options.path === '/' ? '' : options.path}`;
  const fullTitle = sanitizeTitle(options.title);
  const fullDesc = sanitizeDescription(options.description);

  const shouldIndex = options.robots?.index !== undefined ? options.robots.index : true;
  const shouldFollow = options.robots?.follow !== undefined ? options.robots.follow : true;

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
      index: shouldIndex,
      follow: shouldFollow,
      googleBot: {
        index: shouldIndex,
        follow: shouldFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export const createMetadata = generatePageMetadata;

