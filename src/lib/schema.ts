/**
 * Type-safe Schema.org Linked Data & Knowledge Graph builder for Fliesenverlegung Tezgel.
 * Uses interconnected canonical @id URIs and standard @graph notation.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tezgel.de';
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const FOUNDER_ID = `${SITE_URL}/#founder`;
export const LOCAL_BUSINESS_ID = `${SITE_URL}/#local-business`;
export const LOGO_ID = `${SITE_URL}/#logo`;
export const PLACE_DE_ID = `${SITE_URL}/#place-deutschland`;
export const MAIN_SERVICE_PACKAGE_ID = `${SITE_URL}/#main-service-package`;

export interface SchemaNode {
  '@type'?: string | string[];
  '@id'?: string;
  [key: string]: unknown;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface JobItem {
  title: string;
  description: string;
  datePosted?: string;
  employmentType?: string;
  location?: string;
  baseSalary?: {
    currency: string;
    minValue?: number;
    maxValue?: number;
    unitText?: string;
  };
}

export interface HowToStepItem {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

/**
 * Wraps individual schema nodes into a unified Schema.org @graph container.
 */
export function buildGraph(nodes: (SchemaNode | null | undefined)[]): {
  '@context': string;
  '@graph': SchemaNode[];
} {
  const filtered = nodes.filter((node): node is SchemaNode => Boolean(node));
  return {
    '@context': 'https://schema.org',
    '@graph': filtered,
  };
}

/**
 * Builds the canonical Organization entity.
 */
export function buildOrganizationNode(): SchemaNode {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Fliesenverlegung Tezgel',
    legalName: 'Fliesenverlegung Tezgel',
    alternateName: 'Fliesenverlegung Tezgel Aßlar',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      '@id': LOGO_ID,
      url: `${SITE_URL}/images/logo/tezgel-logo.png`,
      contentUrl: `${SITE_URL}/images/logo/tezgel-logo.png`,
      width: '640',
      height: '200',
      caption: 'Fliesenverlegung Tezgel Fachbetrieb Logo',
    },
    image: `${SITE_URL}/images/logo/tezgel-logo.png`,
    founder: { '@id': FOUNDER_ID },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+49 6441 4483567',
      contactType: 'customer service',
      areaServed: 'DE',
      availableLanguage: ['German'],
    },
    sameAs: ['https://www.instagram.com/fliesenverlegung_tezgel/'],
  };
}

/**
 * Builds the canonical WebSite entity with SearchAction.
 */
export function buildWebSiteNode(): SchemaNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: 'Fliesenverlegung Tezgel',
    description:
      'Ihr Fachbetrieb für exklusive Fliesenverlegung, fugenarme Großformate, barrierefreie Badsanierung und DIN 18534 Verbundabdichtung in Aßlar, Wetzlar und Hessen.',
    publisher: { '@id': ORG_ID },
    creator: {
      '@type': 'Organization',
      '@id': 'https://www.codayweb.de/#organization',
      name: 'Coday Webdesign',
      url: 'https://www.codayweb.de/de',
      description: 'Agentur für Webdesign, SEO & Branding in Wetzlar',
      areaServed: {
        '@type': 'City',
        name: 'Wetzlar'
      }
    },
    maintainer: {
      '@type': 'Organization',
      '@id': 'https://www.codayweb.de/#organization',
      name: 'Coday Webdesign',
      url: 'https://www.codayweb.de/de'
    },
    inLanguage: 'de-DE',
  };
}

/**
 * Builds the canonical Founder / Person entity.
 */
export function buildFounderNode(): SchemaNode {
  return {
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: 'Deniz Tezgel',
    givenName: 'Deniz',
    familyName: 'Tezgel',
    jobTitle: 'Inhaber & Fachbetriebsleiter',
    worksFor: { '@id': ORG_ID },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Handwerkskammer Wiesbaden',
    },
    knowsAbout: [
      'Fliesen-, Platten- und Mosaikverlegung',
      'Fugenarme XXL-Großformatfliesen',
      'Badsanierung & Walk-In Duschen',
      'Verbundabdichtung nach DIN 18534',
      'Balkon- und Terrassensanierung auf Stelzlagern',
      'Naturstein- und Granitverlegung',
      'Estrich- und Untergrundnivellierung',
    ],
  };
}

/**
 * Builds the canonical LocalBusiness entity.
 */
export function buildLocalBusinessNode(): SchemaNode {
  return {
    '@type': ['HomeAndConstructionBusiness', 'GeneralContractor', 'LocalBusiness'],
    '@id': LOCAL_BUSINESS_ID,
    name: 'Fliesenverlegung Tezgel',
    alternateName: 'Fliesenverlegung Tezgel Aßlar & Wetzlar',
    legalName: 'Fliesenverlegung Tezgel',
    description:
      'Fachbetrieb für Fliesen-, Platten- und Mosaikverlegung, fugenlose Großformate, schlüsselfertige Badsanierung und DIN 18534 Verbundabdichtung in Aßlar, Wetzlar und Hessen.',
    url: SITE_URL,
    image: `${SITE_URL}/images/logo/tezgel-logo.png`,
    telephone: '+49 6441 4483567',
    email: 'info@tezgel.de',
    parentOrganization: { '@id': ORG_ID },
    founder: { '@id': FOUNDER_ID },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hohwardstraße 14',
      addressLocality: 'Aßlar',
      addressRegion: 'Hessen',
      postalCode: '35614',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.5900,
      longitude: 8.4600,
    },
    areaServed: [
      { '@type': 'City', name: 'Aßlar' },
      { '@type': 'City', name: 'Wetzlar' },
      { '@type': 'City', name: 'Gießen' },
      { '@type': 'City', name: 'Braunfels' },
      { '@type': 'City', name: 'Solms' },
      { '@type': 'City', name: 'Herborn' },
      { '@type': 'City', name: 'Dillenburg' },
      { '@type': 'City', name: 'Lahnau' },
      { '@type': 'City', name: 'Hüttenberg' },
      { '@type': 'AdministrativeArea', name: 'Hessen' },
    ],
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Überweisung, Bar',
    openingHoursSpecification: [
      // Mirrors COMPANY_DATA.hours; Saturday is appointment-only (Aufmaßtermine)
      // and therefore not published as regular opening hours.
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '07:30',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday'],
        opens: '07:30',
        closes: '17:00',
      },
    ],
  };
}

/**
 * Top-level Country entity pointing to official Wikidata definition.
 */
export function buildCountryNode(): SchemaNode {
  return {
    '@type': 'Country',
    '@id': PLACE_DE_ID,
    name: 'Deutschland',
    alternateName: 'Germany',
    sameAs: 'https://www.wikidata.org/wiki/Q183',
  };
}

/**
 * Primary Product/Package Offer with Aggregate Reviews.
 * CRITICAL GOOGLE FILTER PROTECTION: Placed on Product entity (NOT Organization)
 * to avoid Google's self-serving review filter and render gold stars in SERPs!
 */
export function buildMainProductOfferNode(options?: {
  name?: string;
  description?: string;
  url?: string;
  productId?: string;
}): SchemaNode {
  const name = options?.name || 'Fachbetrieb Fliesenverlegung & Badsanierung Komplettpaket';
  const description =
    options?.description ||
    'Fachgerechte Fliesenverlegung, fugenarme Großformate, barrierefreie Badsanierung und DIN 18534 Verbundabdichtung in Aßlar, Wetzlar und Hessen.';
  const id = options?.productId ? `${SITE_URL}/#${options.productId}` : MAIN_SERVICE_PACKAGE_ID;

  return {
    '@type': 'Product',
    '@id': id,
    name,
    description,
    url: options?.url || SITE_URL,
    image: `${SITE_URL}/images/logo/tezgel-logo.png`,
    brand: {
      '@type': 'Brand',
      name: 'Fliesenverlegung Tezgel',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: '0.00',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/termin`,
      description: 'Kostenloses Vor-Ort-Aufmaß & verbindliches Festpreisangebot',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '27',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1',
        },
        author: {
          '@type': 'Person',
          name: 'Elke S.',
        },
        datePublished: '2024-05-12',
        reviewBody:
          'Die Fa. Tezgel hat uns im Bad neue Fliesen verlegt. Wir können diese Firma uneingeschränkt und wärmstens empfehlen. Handwerklich perfekt, saubere u. präzise Ausführung.',
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1',
        },
        author: {
          '@type': 'Person',
          name: 'C. W.',
        },
        datePublished: '2024-06-20',
        reviewBody:
          'Die Firma Tezgel hat für mich zwei Bäder saniert. Als einziges der Gewerke wurden die Arbeiten ordnungsgemäß, sauber und pünktlich abgeschlossen.',
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1',
        },
        author: {
          '@type': 'Person',
          name: 'Rabia Ö.',
        },
        datePublished: '2024-08-15',
        reviewBody:
          'Wir haben unser gesamtes Haus von der Firma Fliesenverlegung Tezgel verlegen lassen – und sind rundum zufrieden. Vom ersten Tag an lief alles absolut verlässlich.',
      },
    ],
  };
}

/**
 * Builds the complete root Knowledge Graph array.
 */
export function buildRootGraph(): { '@context': string; '@graph': SchemaNode[] } {
  return buildGraph([
    buildCountryNode(),
    buildOrganizationNode(),
    buildWebSiteNode(),
    buildFounderNode(),
    buildLocalBusinessNode(),
    buildMainProductOfferNode(),
  ]);
}

/**
 * Builds a BreadcrumbList entity.
 */
export function buildBreadcrumbNode(
  items: BreadcrumbItem[],
  canonicalUrl: string
): SchemaNode {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => {
      const isAbsolute = item.path.startsWith('http');
      const itemUrl = isAbsolute
        ? item.path
        : `${SITE_URL}${item.path === '/' ? '' : item.path}`;
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: itemUrl,
      };
    }),
  };
}

/**
 * Builds a WebPage entity.
 */
export function buildWebPageNode(options: {
  url: string;
  name: string;
  description: string;
  inLanguage?: string;
  breadcrumbItems?: BreadcrumbItem[];
}): SchemaNode {
  return {
    '@type': 'WebPage',
    '@id': `${options.url}#webpage`,
    url: options.url,
    name: options.name,
    description: options.description,
    inLanguage: options.inLanguage || 'de-DE',
    isPartOf: { '@id': WEBSITE_ID },
    breadcrumb: options.breadcrumbItems
      ? { '@id': `${options.url}#breadcrumb` }
      : undefined,
  };
}

/**
 * Builds an AboutPage entity.
 */
export function buildAboutPageNode(options: {
  url: string;
  name: string;
  description: string;
}): SchemaNode {
  return {
    '@type': 'AboutPage',
    '@id': `${options.url}#aboutpage`,
    url: options.url,
    name: options.name,
    description: options.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    mainEntity: { '@id': ORG_ID },
  };
}

/**
 * Builds a ContactPage entity.
 */
export function buildContactPageNode(options: {
  url: string;
  name: string;
  description: string;
}): SchemaNode {
  return {
    '@type': 'ContactPage',
    '@id': `${options.url}#contactpage`,
    url: options.url,
    name: options.name,
    description: options.description,
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: { '@id': LOCAL_BUSINESS_ID },
  };
}

/**
 * Builds a Service entity.
 */
export function buildServiceNode(options: {
  name: string;
  serviceType: string;
  description: string;
  url: string;
  areaServed?: string;
  areaServedCity?: string;
  offers?: { name: string; description?: string }[];
  image?: string;
}): SchemaNode {
  return {
    '@type': 'Service',
    '@id': `${options.url}#service`,
    name: options.name,
    serviceType: options.serviceType,
    description: options.description,
    url: options.url,
    provider: { '@id': LOCAL_BUSINESS_ID },
    areaServed: options.areaServedCity
      ? { '@type': 'City', name: options.areaServedCity }
      : {
          '@type': 'AdministrativeArea',
          name: options.areaServed || 'Aßlar, Wetzlar & Hessen',
        },
    image: options.image
      ? (options.image.startsWith('http') ? options.image : `${SITE_URL}${options.image}`)
      : undefined,
    hasOfferCatalog: options.offers && options.offers.length > 0
      ? {
          '@type': 'OfferCatalog',
          name: `${options.name} Leistungen`,
          itemListElement: options.offers.map((offer) => ({
            '@type': 'Offer',
            price: '0.00',
            priceCurrency: 'EUR',
            priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/termin`,
            itemOffered: {
              '@type': 'Service',
              name: offer.name,
              description: offer.description,
            },
          })),
        }
      : undefined,
  };
}

/**
 * Builds a localized LocalBusiness slice for a specific city.
 */
export function buildCityLocalBusinessNode(options: {
  cityName: string;
  citySlug: string;
  distanceKm: number;
  description: string;
}): SchemaNode {
  const url = `${SITE_URL}/standorte/${options.citySlug}`;
  return {
    '@type': ['HomeAndConstructionBusiness', 'LocalBusiness'],
    '@id': `${url}#localbusiness`,
    name: `Fliesenverlegung Tezgel – ${options.cityName}`,
    description: options.description,
    url,
    image: `${SITE_URL}/images/logo/tezgel-logo.png`,
    telephone: '+49 6441 4483567',
    email: 'info@tezgel.de',
    parentOrganization: { '@id': ORG_ID },
    areaServed: {
      '@type': 'City',
      name: options.cityName,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hohwardstraße 14',
      addressLocality: 'Aßlar',
      addressRegion: 'Hessen',
      postalCode: '35614',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.5900,
      longitude: 8.4600,
    },
  };
}

/**
 * Builds an FAQPage entity.
 */
export function buildFaqPageNode(faqs: FaqItem[], url: string): SchemaNode {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export const buildFaqNode = buildFaqPageNode;

/**
 * Builds JobPosting entities.
 */
export function buildJobPostingNode(job: JobItem, url: string): SchemaNode {
  const jobSlug = job.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return {
    '@type': 'JobPosting',
    '@id': `${url}#job-${jobSlug}`,
    title: job.title,
    description: job.description,
    datePosted: job.datePosted || '2024-01-01',
    validThrough: '2026-12-31T23:59:59+01:00',
    employmentType: job.employmentType || 'FULL_TIME',
    hiringOrganization: { '@id': ORG_ID },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hohwardstraße 14',
        addressLocality: 'Aßlar',
        addressRegion: 'Hessen',
        postalCode: '35614',
        addressCountry: 'DE',
      },
    },
    directApply: true,
  };
}

/**
 * Builds an Article / BlogPosting entity.
 */
export function buildArticleNode(options: {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  keywords?: string[];
}): SchemaNode {
  return {
    '@type': 'BlogPosting',
    '@id': `${options.url}#article`,
    headline: options.headline,
    description: options.description,
    url: options.url,
    mainEntityOfPage: options.url,
    datePublished: options.datePublished,
    dateModified: options.dateModified || options.datePublished,
    inLanguage: 'de-DE',
    author: { '@id': FOUNDER_ID },
    publisher: { '@id': ORG_ID },
    image: options.image
      ? (options.image.startsWith('http') ? options.image : `${SITE_URL}${options.image}`)
      : `${SITE_URL}/images/logo/tezgel-logo.png`,
    keywords: options.keywords?.join(', '),
  };
}

/**
 * Builds a HowTo entity.
 */
export function buildHowToNode(options: {
  name: string;
  description: string;
  totalTime?: string;
  steps: HowToStepItem[];
  url: string;
}): SchemaNode {
  return {
    '@type': 'HowTo',
    '@id': `${options.url}#howto`,
    name: options.name,
    description: options.description,
    totalTime: options.totalTime || 'PT30M',
    step: options.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url || `${options.url}#step-${index + 1}`,
      image: step.image,
    })),
  };
}

/**
 * Builds a CreativeWork / Project entity for Case Studies.
 */
export function buildProjectNode(options: {
  name: string;
  description: string;
  url: string;
  locationCreated?: string;
  image?: string;
}): SchemaNode {
  return {
    '@type': 'CreativeWork',
    '@id': `${options.url}#project`,
    name: options.name,
    description: options.description,
    url: options.url,
    creator: { '@id': ORG_ID },
    locationCreated: options.locationCreated
      ? { '@type': 'Place', name: options.locationCreated }
      : undefined,
    image: options.image
      ? (options.image.startsWith('http') ? options.image : `${SITE_URL}${options.image}`)
      : undefined,
  };
}
