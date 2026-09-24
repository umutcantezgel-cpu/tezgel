/**
 * Type-safe Schema.org Linked Data & Knowledge Graph builder for Fliesenverlegung Tezgel.
 * Uses interconnected canonical @id URIs and standard @graph notation.
 */

export const SITE_URL = 'https://tezgel.de';
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const FOUNDER_ID = `${SITE_URL}/#founder`;
export const LOCAL_BUSINESS_ID = `${SITE_URL}/#local-business`;
export const LOGO_ID = `${SITE_URL}/#logo`;

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
      url: `${SITE_URL}/images/logo/tezgel-mark.svg`,
      contentUrl: `${SITE_URL}/images/logo/tezgel-mark.svg`,
      caption: 'Fliesenverlegung Tezgel Logo',
    },
    image: `${SITE_URL}/images/logo/tezgel-mark.svg`,
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
      'Ihr Meisterbetrieb für exklusive Fliesenverlegung, fugenarme Großformate, barrierefreie Badsanierung und DIN 18534 Verbundabdichtung in Aßlar, Wetzlar und Hessen.',
    publisher: { '@id': ORG_ID },
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
    jobTitle: 'Inhaber & Handwerksmeister',
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
      'Meisterbetrieb für Fliesen-, Platten- und Mosaikverlegung, fugenlose Großformate, schlüsselfertige Badsanierung und DIN 18534 Verbundabdichtung in Aßlar, Wetzlar und Hessen.',
    url: SITE_URL,
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
    priceRange: '€€€',
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
 * Builds the complete root Knowledge Graph array.
 */
export function buildRootGraph(): { '@context': string; '@graph': SchemaNode[] } {
  return buildGraph([
    buildOrganizationNode(),
    buildWebSiteNode(),
    buildFounderNode(),
    buildLocalBusinessNode(),
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
      : `${SITE_URL}/images/logo/tezgel-mark.svg`,
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
