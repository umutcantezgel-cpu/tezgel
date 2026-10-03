/**
 * ==============================================================================
 * UNIVERSAL SITE & ENTITY CONFIGURATION - FLIESENVERLEGUNG TEZGEL
 * ==============================================================================
 * Single source of truth for all structured data (JSON-LD), OpenGraph meta tags,
 * canonical URLs, and company information.
 * ==============================================================================
 */

export const SITE_CONFIG = {
  // Canonical production URL (never use a trailing slash)
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tezgel.de',

  // Core Brand & Company Data
  companyName: 'Fliesenverlegung Tezgel',
  legalName: 'Fliesenverlegung Tezgel',
  tradeName: 'Fliesenverlegung Tezgel Aßlar & Wetzlar',
  alternateNames: [
    'Fliesenverlegung Tezgel Aßlar',
    'Fliesenleger Tezgel',
    'Tezgel Fliesen & Bad',
    'Fliesenverlegung Deniz Tezgel',
  ],
  slogan: {
    de: 'Die Zufriedenheit unserer Kunden ist die beste Reklame für uns.',
    en: 'Customer satisfaction is our best recommendation.',
  },
  description: {
    de: 'Ihr Fachbetrieb für exklusive Fliesenverlegung, fugenarme Großformate, barrierefreie Badsanierung und DIN 18534 Verbundabdichtung in Aßlar, Wetzlar und Hessen.',
    en: 'Your specialized contractor for premium tile laying, XXL large formats, barrier-free bathroom renovations and DIN 18534 composite sealing in Asslar, Wetzlar and Hesse.',
  },

  // Founding & Business Attributes
  foundingDate: '2008',
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Überweisung, Bar',
  numberOfEmployees: 5,
  vatID: 'DE 259249094',
  taxID: 'FA Wetzlar',

  // Contact Channels
  contact: {
    email: 'info@tezgel.de',
    telephone: '+49 6441 4483567',
    telephoneFormatted: '06441 / 44 83 567',
    mobile: '+49 172 6728504',
    mobileFormatted: '0172 / 67 28 504',
    whatsappNumber: '491726728504',
    whatsappLink: 'https://wa.me/491726728504',
    fax: '06441 / 44 83 548',
    openingHours: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:30',
      closes: '18:00',
      fridayCloses: '17:00',
      saturday: '08:00 – 14:00 Uhr (Vor-Ort-Termine nach Vereinbarung)',
    },
    googleMapsUrl: 'https://maps.google.com/?q=Hohwardstra%C3%9Fe+14,+35614+A%C3%9Flar',
  },

  // Echte Physische Unternehmens-Adresse (HQ)
  headquarters: {
    streetAddress: 'Hohwardstraße 14',
    postalCode: '35614',
    addressLocality: 'Aßlar',
    addressRegion: 'Hessen',
    addressCountry: 'DE',
    geo: {
      latitude: 50.5900,
      longitude: 8.4600,
    },
  },

  // Inhaber / Gründer
  founder: {
    name: 'Deniz Tezgel',
    givenName: 'Deniz',
    familyName: 'Tezgel',
    jobTitle: 'Inhaber & Fachbetriebsleiter',
    profileUrl: '/ueber-uns',
    alumniOf: 'Handwerkskammer Wiesbaden',
    knowsAbout: [
      'Fliesen-, Platten- und Mosaikverlegung',
      'Fugenarme XXL-Großformatfliesen',
      'Badsanierung & Walk-In Duschen',
      'Verbundabdichtung nach DIN 18534',
      'Balkon- und Terrassensanierung auf Stelzlagern',
      'Naturstein- und Granitverlegung',
      'Estrich- und Untergrundnivellierung',
    ],
    sameAs: [
      'https://www.instagram.com/fliesenverlegung_tezgel/',
    ],
  },

  // Authority & Chamber Registration
  authority: {
    name: 'Handwerkskammer Wiesbaden',
    shortName: 'HWK Wiesbaden',
    certification: 'Eingetragener Fachbetrieb der HWK Wiesbaden',
    court: 'Amtsgericht Wetzlar',
  },

  // Service Portfolio
  services: [
    'Badsanierung & Barrierefreie Walk-In-Duschen',
    'Fugenarme Großformatverlegung (XXL-Fliesen)',
    'Wohnbereiche, Neubau, Küchen & Treppenanlagen',
    'Balkon- & Terrassensanierung auf Stelzlagern',
    'Untergrundvorbereitung & DIN 18534 Verbundabdichtung',
    'Naturstein- und Granitverlegung',
    'Fliesenreparatur & Schadensbehebung',
  ],

  // Target Service Areas
  serviceArea: [
    'Aßlar',
    'Wetzlar',
    'Lahn-Dill-Kreis',
    'Gießen',
    'Marburg',
    'Limburg an der Lahn',
    'Bad Nauheim',
    'Friedberg (Hessen)',
    'Butzbach',
    'Herborn',
    'Dillenburg',
    'Haiger',
    'Braunfels',
    'Solms',
    'Lahnau',
    'Hüttenberg',
    'Mittelhessen',
    'Hessen',
  ],

  // Verified Social Profiles
  socialProfiles: [
    'https://www.instagram.com/fliesenverlegung_tezgel/',
  ],

  // Brand Media Assets
  media: {
    ogImage: '/images/logo/tezgel-logo.png',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    logo: '/images/logo/tezgel-logo.png',
    logoSize: 512,
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;

export default SITE_CONFIG;
