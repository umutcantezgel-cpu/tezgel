import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/schema';
import { seitenBeschreibung } from '@/lib/beschreibung';

const BASE_URL = SITE_URL;
const SITE_NAME = 'Fliesenverlegung Tezgel';

function cleanTrailingWords(text: string): string {
  let cleaned = text.trim().replace(/[,:;\-–—/\\|&]+\s*$/g, '').trim();
  const stopWords = /\s+(in|und|für|mit|bei|&|-|–|der|die|das|den|dem|des|ein|eine|einer|oder|wie|ob|als|vom|beim|zum|zur|im|am|ab|darf|kann|soll)\s*$/gi;
  while (stopWords.test(cleaned) || /[,:;\-–—/\\|&]+\s*$/.test(cleaned)) {
    cleaned = cleaned.replace(stopWords, '').replace(/[,:;\-–—/\\|&]+\s*$/g, '').trim();
  }
  return cleaned;
}

function sanitizeTitle(raw: string): string {
  const trimmed = cleanTrailingWords(raw.trim().replace(/\s+/g, ' '));

  // If already intentionally crafted within the 45-58 chars budget and contains brand, keep as is
  if (/Tezgel/i.test(trimmed) && trimmed.length >= 45 && trimmed.length <= 58) {
    return trimmed;
  }

  const base = cleanTrailingWords(
    trimmed
      .replace(/\s*\|\s*Fliesenverlegung Tezgel/gi, '')
      .replace(/\s*–\s*Referenzen Fliesenverlegung Tezgel/gi, '')
      .replace(/\s*\|\s*Ratgeber Fliesenverlegung Tezgel/gi, '')
      .replace(/\s*–\s*Fachbetrieb Fliesen Tezgel/gi, '')
      .replace(/\s*\|\s*Fachbetrieb Tezgel/gi, '')
      .replace(/\s*–\s*Fachbetrieb Tezgel/gi, '')
      .replace(/\s*\|\s*Tezgel Fachbetrieb/gi, '')
      .replace(/\s*–\s*Tezgel Fachbetrieb/gi, '')
      .replace(/\s*·\s*Tezgel/gi, '')
      .replace(/\s*\|\s*Tezgel/gi, '')
      .replace(/\s*–\s*Tezgel/gi, '')
      .replace(/\s*\|\s*Fachbetrieb/gi, '')
      .replace(/\s*–\s*Fachbetrieb/gi, '')
      .trim()
  );

  let candidate: string;
  if (/Tezgel/i.test(base)) {
    candidate = base;
  } else {
    // SEO-Runde T10 (docs/seo/arbeit/plan-p2-bis-p8.md, Abschnitt 3): nur noch zwei Formen des Markenzusatzes,
    // „| Fliesenverlegung Tezgel“ und kurz „· Tezgel“; Titel werden bewusst gesetzt, die Auffüllung erfindet nichts dazu
    const voll = `${base} | ${SITE_NAME}`;
    const kurz = `${base} · Tezgel`;
    if (voll.length <= 58 && (voll.length >= 45 || kurz.length < 45)) {
      candidate = voll;
    } else if (kurz.length <= 58) {
      candidate = kurz;
    } else if (base.length <= 58 && base.length >= 45) {
      candidate = base;
    } else {
      let cut = base.slice(0, 48);
      const lastSpace = cut.lastIndexOf(' ');
      if (lastSpace > 20) {
        cut = cut.slice(0, lastSpace);
      }
      cut = cleanTrailingWords(cut);
      candidate = `${cut} · Tezgel`;
    }
  }

  // SEO-Runde T10: keine Auffüllung mehr mit „Fachbetrieb Tezgel“, „Fliesen Tezgel“, „– Tezgel Hessen“ oder „in Hessen“.
  // Kürzere Titel bleiben kurz; die Seiten setzen ihre Titel mit 45 bis 58 Zeichen selbst (test/titleLength.test.mjs).

  // Guard: strictly clamp to <= 58 chars (SERP Budget < 580px)
  if (candidate.length > 58) {
    const cut = candidate.slice(0, 58);
    const lastSpace = cut.lastIndexOf(' ');
    candidate = (lastSpace > 45 ? cut.slice(0, lastSpace) : cut).trim();
  }

  // Final sanitation: clean before brand and title end
  candidate = candidate
    .replace(/\s*[,:;\-–—/\\|&]+\s*·\s*Tezgel/gi, ' · Tezgel')
    .replace(/\s+(in|und|für|mit|&|oder|der|die|das|wie|darf|kann|soll)\s+·\s+Tezgel/gi, ' · Tezgel')
    .replace(/\s+(in|und|für|mit|&|oder|der|die|das|wie|darf|kann|soll)\s*$/gi, '')
    .replace(/[,:;\-–—/\\|&]+\s*$/g, '')
    .trim();

  return candidate;
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
  // eigene Beschreibung zur Adresse vor der übergebenen, auf 120 bis 155 Zeichen gebracht (lib/beschreibung.ts, E3-SEO-META)
  const fullDesc = seitenBeschreibung(options.path, options.description);

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
      description: fullDesc,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'de_DE',
      type: 'website',
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDesc,
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

