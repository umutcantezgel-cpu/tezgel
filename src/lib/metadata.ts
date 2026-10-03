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
    if (base.length + 9 <= 53) {
      candidate = `${base} · Tezgel`;
    } else {
      let cut = base.slice(0, 44);
      const lastSpace = cut.lastIndexOf(' ');
      if (lastSpace > 25) {
        cut = cut.slice(0, lastSpace);
      }
      candidate = `${cut.trim()} · Tezgel`;
    }
  }

  // Ensure minimum length of 45 characters for Seobility
  if (candidate.length < 45) {
    if (candidate.includes(' · Tezgel')) {
      const parts = candidate.split(' · Tezgel');
      const prefix = parts[0];
      if (prefix.length + 21 <= 53) {
        candidate = `${prefix} · Fachbetrieb Tezgel`;
      } else if (prefix.length + 18 <= 53) {
        candidate = `${prefix} – Fliesen Tezgel`;
      }
    }
    if (candidate.length < 45 && candidate.length + 9 <= 53) {
      candidate = `${candidate} – Hessen`;
    } else if (candidate.length < 45 && candidate.length + 7 <= 53) {
      candidate = `${candidate} Profi`;
    }
  }

  // Ensure maximum length strictly <= 53 characters (< 550px)
  if (candidate.length > 53) {
    const cut = candidate.slice(0, 53);
    const lastSpace = cut.lastIndexOf(' ');
    candidate = (lastSpace > 42 ? cut.slice(0, lastSpace) : cut).trim();
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
