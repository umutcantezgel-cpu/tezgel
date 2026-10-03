import { SITE_URL, ORG_ID, PLACE_DE_ID, buildMainProductOfferNode, type SchemaNode } from './schema';
import { SITE_CONFIG } from '@/shared/config/site';

/**
 * ==============================================================================
 * 3-TIER LOCAL SEO SCHEMA PYRAMID - FLIESENVERLEGUNG TEZGEL
 * ==============================================================================
 * Prevents Google's "Fake Business Location" penalties when building local SEO
 * landing pages for multiple cities.
 *
 * THE 3 TIERS:
 * 1. State / Master Region Hub: Declares an AdministrativeArea containing sub-regions.
 * 2. County / District Hub: Declares an AdministrativeArea with areaServed pointing to cities.
 * 3. City Landing Page:
 *    - Emits a real `City` node with exact city coordinates and Wikidata URI.
 *    - Emits a `LocalBusiness` node that retains the ACTUAL physical HQ address (Hohwardstraße 14, 35614 Aßlar).
 *    - Connects the business to the city via `areaServed: { '@id': '{cityId}' }`.
 *    - Emits a `Product` / `Service` node carrying customer reviews for SERP star snippets.
 * ==============================================================================
 */

export interface CityConfig {
  name: string;
  slug: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  wikidataId?: string;
  countySlug: string;
  countyName: string;
  distanceKm: number;
}

export interface CountyConfig {
  name: string;
  slug: string;
  wikidataId?: string;
  cities: CityConfig[];
}

export interface StateConfig {
  name: string;
  slug: string;
  wikidataId?: string;
  counties: CountyConfig[];
}

export const HESSEN_GEO_HIERARCHY: StateConfig = {
  name: 'Hessen',
  slug: 'hessen',
  wikidataId: 'Q1198',
  counties: [
    {
      name: 'Lahn-Dill-Kreis',
      slug: 'lahn-dill-kreis',
      wikidataId: 'Q7905',
      cities: [
        {
          name: 'Aßlar',
          slug: 'asslar',
          postalCode: '35614',
          latitude: 50.5900,
          longitude: 8.4600,
          wikidataId: 'Q547844',
          countySlug: 'lahn-dill-kreis',
          countyName: 'Lahn-Dill-Kreis',
          distanceKm: 0,
        },
        {
          name: 'Wetzlar',
          slug: 'wetzlar',
          postalCode: '35578',
          latitude: 50.5558,
          longitude: 8.5028,
          wikidataId: 'Q4161',
          countySlug: 'lahn-dill-kreis',
          countyName: 'Lahn-Dill-Kreis',
          distanceKm: 0,
        },
        {
          name: 'Herborn',
          slug: 'herborn',
          postalCode: '35745',
          latitude: 50.6833,
          longitude: 8.3000,
          wikidataId: 'Q516801',
          countySlug: 'lahn-dill-kreis',
          countyName: 'Lahn-Dill-Kreis',
          distanceKm: 20,
        },
        {
          name: 'Dillenburg',
          slug: 'dillenburg',
          postalCode: '35683',
          latitude: 50.7389,
          longitude: 8.2861,
          wikidataId: 'Q516804',
          countySlug: 'lahn-dill-kreis',
          countyName: 'Lahn-Dill-Kreis',
          distanceKm: 25,
        },
        {
          name: 'Haiger',
          slug: 'haiger',
          postalCode: '35708',
          latitude: 50.7417,
          longitude: 8.2028,
          wikidataId: 'Q516808',
          countySlug: 'lahn-dill-kreis',
          countyName: 'Lahn-Dill-Kreis',
          distanceKm: 30,
        },
        {
          name: 'Braunfels',
          slug: 'braunfels',
          postalCode: '35619',
          latitude: 50.5167,
          longitude: 8.3833,
          wikidataId: 'Q516812',
          countySlug: 'lahn-dill-kreis',
          countyName: 'Lahn-Dill-Kreis',
          distanceKm: 10,
        },
        {
          name: 'Solms',
          slug: 'solms',
          postalCode: '35606',
          latitude: 50.5333,
          longitude: 8.4167,
          wikidataId: 'Q516816',
          countySlug: 'lahn-dill-kreis',
          countyName: 'Lahn-Dill-Kreis',
          distanceKm: 8,
        },
      ],
    },
    {
      name: 'Landkreis Gießen',
      slug: 'landkreis-giessen',
      wikidataId: 'Q7901',
      cities: [
        {
          name: 'Gießen',
          slug: 'giessen',
          postalCode: '35390',
          latitude: 50.5833,
          longitude: 8.6667,
          wikidataId: 'Q3870',
          countySlug: 'landkreis-giessen',
          countyName: 'Landkreis Gießen',
          distanceKm: 25,
        },
      ],
    },
    {
      name: 'Landkreis Marburg-Biedenkopf',
      slug: 'landkreis-marburg-biedenkopf',
      wikidataId: 'Q7898',
      cities: [
        {
          name: 'Marburg',
          slug: 'marburg',
          postalCode: '35037',
          latitude: 50.8167,
          longitude: 8.7667,
          wikidataId: 'Q3935',
          countySlug: 'landkreis-marburg-biedenkopf',
          countyName: 'Landkreis Marburg-Biedenkopf',
          distanceKm: 40,
        },
      ],
    },
    {
      name: 'Landkreis Limburg-Weilburg',
      slug: 'landkreis-limburg-weilburg',
      wikidataId: 'Q7906',
      cities: [
        {
          name: 'Limburg an der Lahn',
          slug: 'limburg',
          postalCode: '65549',
          latitude: 50.3833,
          longitude: 8.0667,
          wikidataId: 'Q6856',
          countySlug: 'landkreis-limburg-weilburg',
          countyName: 'Landkreis Limburg-Weilburg',
          distanceKm: 35,
        },
      ],
    },
    {
      name: 'Wetteraukreis',
      slug: 'wetteraukreis',
      wikidataId: 'Q7904',
      cities: [
        {
          name: 'Bad Nauheim',
          slug: 'bad-nauheim',
          postalCode: '61231',
          latitude: 50.3667,
          longitude: 8.7500,
          wikidataId: 'Q487053',
          countySlug: 'wetteraukreis',
          countyName: 'Wetteraukreis',
          distanceKm: 40,
        },
        {
          name: 'Friedberg (Hessen)',
          slug: 'friedberg',
          postalCode: '61169',
          latitude: 50.3333,
          longitude: 8.7500,
          wikidataId: 'Q490204',
          countySlug: 'wetteraukreis',
          countyName: 'Wetteraukreis',
          distanceKm: 45,
        },
        {
          name: 'Butzbach',
          slug: 'butzbach',
          postalCode: '35510',
          latitude: 50.4333,
          longitude: 8.6667,
          wikidataId: 'Q490208',
          countySlug: 'wetteraukreis',
          countyName: 'Wetteraukreis',
          distanceKm: 35,
        },
      ],
    },
  ],
};

/**
 * TIER 1: State Master Hub Schema
 */
export function getStateHubSchema(state: StateConfig = HESSEN_GEO_HIERARCHY) {
  const stateUrl = `${SITE_URL}/standorte`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AdministrativeArea',
        '@id': `${stateUrl}#state-hub`,
        name: state.name,
        sameAs: state.wikidataId ? `https://www.wikidata.org/wiki/${state.wikidataId}` : undefined,
        containedInPlace: { '@id': PLACE_DE_ID },
        containsPlace: state.counties.map((c) => ({
          '@type': 'AdministrativeArea',
          name: c.name,
          sameAs: c.wikidataId ? `https://www.wikidata.org/wiki/${c.wikidataId}` : undefined,
        })),
      },
    ],
  };
}

/**
 * TIER 2: County / District Hub Schema
 */
export function getCountyHubSchema(county: CountyConfig) {
  const countyUrl = `${SITE_URL}/standorte`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AdministrativeArea',
        '@id': `${countyUrl}#county-${county.slug}`,
        name: county.name,
        sameAs: county.wikidataId ? `https://www.wikidata.org/wiki/${county.wikidataId}` : undefined,
        containedInPlace: { '@id': `${SITE_URL}/standorte#state-hub` },
        areaServed: county.cities.map((city) => ({
          '@id': `${SITE_URL}/standorte/${city.slug}#city`,
        })),
      },
    ],
  };
}

/**
 * TIER 3: City Landing Page Schema (Anti-Fake-Location Pattern)
 * 1. Emits the real City entity with accurate geo and wikidata link
 * 2. Emits LocalBusiness pointing to real Aßlar headquarters
 * 3. Associates business with city strictly via areaServed
 * 4. Carries product package with verified aggregate reviews
 */
export function getCityLandingPageSchema(
  city: CityConfig,
  serviceName?: string,
  options?: { includeProductRating?: boolean }
) {
  const cityPageUrl = `${SITE_URL}/standorte/${city.slug}`;
  const cityId = `${cityPageUrl}#city`;

  const cityNode = {
    '@type': 'City',
    '@id': cityId,
    name: city.name,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: city.latitude,
      longitude: city.longitude,
    },
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: city.countyName,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Hessen',
        sameAs: 'https://www.wikidata.org/wiki/Q1198',
      },
    },
    sameAs: city.wikidataId ? `https://www.wikidata.org/wiki/${city.wikidataId}` : undefined,
  };

  const localBusinessNode = {
    '@type': ['HomeAndConstructionBusiness', 'GeneralContractor', 'LocalBusiness'],
    '@id': `${cityPageUrl}#localbusiness`,
    name: `Fliesenverlegung Tezgel – ${city.name}`,
    description: `Fliesenleger & Fachbetrieb für Badsanierung, barrierefreie Duschen, Großformate & DIN 18534 Abdichtung für Kunden in ${city.name}. Ausgeführt von unserem Fachbetrieb in Aßlar.`,
    url: cityPageUrl,
    image: `${SITE_CONFIG.baseUrl}/images/logo/tezgel-logo.png`,
    telephone: SITE_CONFIG.contact.telephone,
    email: SITE_CONFIG.contact.email,
    parentOrganization: { '@id': ORG_ID },
    areaServed: { '@id': cityId },
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.headquarters.streetAddress,
      addressLocality: SITE_CONFIG.headquarters.addressLocality,
      addressRegion: SITE_CONFIG.headquarters.addressRegion,
      postalCode: SITE_CONFIG.headquarters.postalCode,
      addressCountry: SITE_CONFIG.headquarters.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.headquarters.geo.latitude,
      longitude: SITE_CONFIG.headquarters.geo.longitude,
    },
    priceRange: SITE_CONFIG.priceRange,
    currenciesAccepted: SITE_CONFIG.currenciesAccepted,
    paymentAccepted: SITE_CONFIG.paymentAccepted,
  };

  const nodes: SchemaNode[] = [cityNode, localBusinessNode];

  if (options?.includeProductRating) {
    const productNode = buildMainProductOfferNode({
      name: serviceName ? `${serviceName} in ${city.name}` : `Fliesenverlegung & Badsanierung ${city.name}`,
      description: `Hochwertige Fliesenverlegung und schlüsselfertige Badsanierung für Kunden in ${city.name} und Umgebung.`,
      url: cityPageUrl,
    });
    nodes.push(productNode);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

/**
 * Helper to locate CityConfig by slug in the Hessen Geo Hierarchy.
 */
export function findCityConfig(slug: string): CityConfig | undefined {
  for (const county of HESSEN_GEO_HIERARCHY.counties) {
    const found = county.cities.find((c) => c.slug === slug);
    if (found) return found;
  }
  return undefined;
}
