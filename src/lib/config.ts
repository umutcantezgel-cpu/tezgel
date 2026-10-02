// ============================================================
// SINGLE SOURCE OF TRUTH — Zentrale Konfiguration Tezgel
// ============================================================
// Alle UI-Komponenten, SEO-Generatoren und Maps lesen hieraus.
// ============================================================

export interface SiteConfig {
  company: {
    name: string;
    tagline: string;
    tradeName: string;
    owner: {
      firstName: string;
      lastName: string;
      fullName: string;
      title: string;
    };
    street: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    fullAddress: string;
    foundedYear: number;
    motto: string;
  };
  taxId: string;
  vatId: string;
  authority: {
    name: string;
    shortName: string;
    certification: string;
  };
  contact: {
    phone: {
      main: string;
      formatted: string;
      link: string;
    };
    mobile: {
      main: string;
      formatted: string;
      link: string;
    };
    email: string;
    whatsapp: string;
    whatsappFormatted: string;
    whatsappLink: string;
    fax: string;
    mapsUrl: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  mapCenter: {
    lat: number;
    lng: number;
  };
  pricing: {
    consultationCost: number;
    consultationCostFormatted: string;
    baseEstimateSquareMeter: number;
    startingPrice: number;
    startingPriceFormatted: string;
    travelCostLocal: number;
    travelCostLocalFormatted: string;
  };
  openingHours: {
    store: string;
    emergency: string;
    saturday: string;
  };
  financial: {
    acceptedPayments: string[];
    pricingTexts: {
      headline: string;
      baseNote: string;
      consistencyNote: string;
      transparencyNote: string;
      legalNote: string;
    };
  };
  partnership: {
    isHwkMember: boolean;
    chamber: string;
    certifications: string[];
  };
  socialMedia: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
  seo: {
    siteUrl: string;
    defaultKeywords: string[];
    ogImage: string;
    locale: string;
    authors: Array<{ name: string; url?: string }>;
    creator?: string;
    publisher?: string;
  };
  formspree: {
    formId: string;
  };
  calendly: {
    defaultUrl: string;
  };
}

export const siteConfig: SiteConfig = {
  company: {
    name: "Fliesenverlegung Tezgel",
    tagline: "Fachbetrieb für exklusive Fliesen & Badsanierung",
    tradeName: "Fliesenverlegung Tezgel Aßlar & Wetzlar",
    owner: {
      firstName: "Deniz",
      lastName: "Tezgel",
      fullName: "Deniz Tezgel",
      title: "Inhaber & Fachbetriebsleiter",
    },
    street: "Hohwardstraße 14",
    postalCode: "35614",
    city: "Aßlar",
    state: "Hessen",
    country: "Deutschland",
    fullAddress: "Hohwardstraße 14, 35614 Aßlar, Deutschland",
    foundedYear: 2008,
    motto: "Die Zufriedenheit unserer Kunden ist die beste Reklame für uns.",
  },
  taxId: "FA Wetzlar",
  vatId: "DE 259249094",
  authority: {
    name: "Handwerkskammer Wiesbaden",
    shortName: "HWK Wiesbaden",
    certification: "Eingetragener Fachbetrieb der HWK Wiesbaden",
  },
  contact: {
    phone: {
      main: "064414483567",
      formatted: "06441 / 44 83 567",
      link: "tel:+4964414483567",
    },
    mobile: {
      main: "01726728504",
      formatted: "0172 / 67 28 504",
      link: "tel:+491726728504",
    },
    email: "info@tezgel.de",
    whatsapp: "491726728504",
    whatsappFormatted: "0172 / 67 28 504",
    whatsappLink: "https://wa.me/491726728504",
    fax: "06441 / 44 83 548",
    mapsUrl: "https://maps.google.com/?q=Hohwardstra%C3%9Fe+14,+35614+A%C3%9Flar",
  },
  geo: {
    latitude: 50.5900,
    longitude: 8.4600,
  },
  mapCenter: {
    lat: 50.5900,
    lng: 8.4600,
  },
  pricing: {
    consultationCost: 0,
    consultationCostFormatted: "0 € (Kostenfreies Vor-Ort-Aufmaß)",
    baseEstimateSquareMeter: 45,
    startingPrice: 45,
    startingPriceFormatted: "ab 45 €/m²",
    travelCostLocal: 0,
    travelCostLocalFormatted: "0 € in Aßlar, Wetzlar & nahem Umland",
  },
  openingHours: {
    store: "Mo - Fr: 07:30 – 18:00 Uhr",
    emergency: "Vor-Ort-Termine nach Vereinbarung (Mo - Sa)",
    saturday: "Sa: 08:00 – 14:00 Uhr (Aufmaß- & Beratungstermine)",
  },
  financial: {
    acceptedPayments: ["Überweisung", "Rechnung", "Barzahlung"],
    pricingTexts: {
      headline: "Verbindliche Festpreiskalkulation & transparentes Aufmaß",
      baseNote: "Kalkulation nach individuellem Aufmaß und Materialanforderung – ohne versteckte Überraschungen.",
      consistencyNote: "Feste Zusagen für Material, Quadratmeter und Fertigstellungstermine.",
      transparencyNote: "Mehraufwand durch unvorhersehbare Untergrundschäden wird stets vor Beginn abgestimmt.",
      legalNote: "Alle Angebote verstehen sich transparent kalkuliert inkl. der gesetzlichen Mehrwertsteuer.",
    },
  },
  partnership: {
    isHwkMember: true,
    chamber: "Handwerkskammer Wiesbaden",
    certifications: [
      "Eingetragener Fachbetrieb Handwerkskammer Wiesbaden",
      "Normgerechte DIN 18534 Verbundabdichtung",
      "Spezialisiert auf fugenarme XXL-Großformate",
      "Staubschutz-Garantie bei bewohnten Sanierungen",
    ],
  },
  socialMedia: {
    instagram: "https://www.instagram.com/fliesenverlegung_tezgel/",
    whatsapp: "https://wa.me/491726728504",
  },
  seo: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://tezgel.de",
    defaultKeywords: [
      "Fliesenleger Aßlar",
      "Fliesenleger Wetzlar",
      "Badsanierung Aßlar Wetzlar",
      "Großformatfliesen Hessen",
      "XXL Fliesen verlegen",
      "Balkonsanierung Stelzlager",
      "DIN 18534 Verbundabdichtung",
      "Fliesenverlegung Tezgel",
    ],
    ogImage: "/images/bad/walk-in-dusche.webp",
    locale: "de_DE",
    authors: [{ name: "Deniz Tezgel" }],
    creator: "Fliesenverlegung Tezgel",
    publisher: "Fliesenverlegung Tezgel",
  },
  formspree: {
    formId: process.env.NEXT_PUBLIC_FORMSPREE_ID || "",
  },
  calendly: {
    defaultUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "",
  },
};

export default siteConfig;
