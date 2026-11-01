import { SITE_URL, LOCAL_BUSINESS_ID, PLACE_DE_ID, type SchemaNode } from './schema';

/**
 * Orte und Kreise für die strukturierten Daten der Ortsseiten.
 *
 * SEO-Runde P1 (docs/seo/KONTEXT.md, Abschnitt 5):
 * - T04: Eine Ortsseite meldet keinen zweiten Betrieb mehr. Es gibt genau ein LocalBusiness mit der echten Anschrift in
 *   Aßlar (`LOCAL_BUSINESS_ID` aus schema.ts, Wurzelgraph). Die Ortsseite beschreibt die Leistung für den Ort als `Service`
 *   mit `provider` auf diesen Betrieb und `areaServed` auf den Ort. Vorher stand hier je Ort ein LocalBusiness
 *   „Fliesenverlegung Tezgel – <Ort>“ mit der Aßlarer Anschrift, also eine vorgetäuschte Filiale.
 * - T02: Kein `Product` mit Bewertungen mehr auf den Ortsseiten.
 * - T03: Wikidata-Kennungen am 01.11.2026 über die Wikidata-API geprüft (Bezeichnung, Beschreibung und Postleitzahl).
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
  wikidataId: 'Q1199',
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
          wikidataId: 'Q558494',
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
          wikidataId: 'Q4178',
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
          wikidataId: 'Q18998',
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
          wikidataId: 'Q517381',
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
          wikidataId: 'Q516448',
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
          wikidataId: 'Q525612',
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
          wikidataId: 'Q566156',
          countySlug: 'lahn-dill-kreis',
          countyName: 'Lahn-Dill-Kreis',
          distanceKm: 8,
        },
      ],
    },
    {
      name: 'Landkreis Gießen',
      slug: 'landkreis-giessen',
      wikidataId: 'Q7904',
      cities: [
        {
          name: 'Gießen',
          slug: 'giessen',
          postalCode: '35390',
          latitude: 50.5833,
          longitude: 8.6667,
          wikidataId: 'Q3874',
          countySlug: 'landkreis-giessen',
          countyName: 'Landkreis Gießen',
          distanceKm: 25,
        },
      ],
    },
    {
      name: 'Landkreis Marburg-Biedenkopf',
      slug: 'landkreis-marburg-biedenkopf',
      wikidataId: 'Q7902',
      cities: [
        {
          name: 'Marburg',
          slug: 'marburg',
          postalCode: '35037',
          latitude: 50.8167,
          longitude: 8.7667,
          wikidataId: 'Q3869',
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
          wikidataId: 'Q16026',
          countySlug: 'landkreis-limburg-weilburg',
          countyName: 'Landkreis Limburg-Weilburg',
          distanceKm: 35,
        },
      ],
    },
    {
      name: 'Wetteraukreis',
      slug: 'wetteraukreis',
      wikidataId: 'Q7910',
      cities: [
        {
          name: 'Bad Nauheim',
          slug: 'bad-nauheim',
          postalCode: '61231',
          latitude: 50.3667,
          longitude: 8.7500,
          wikidataId: 'Q16105',
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
          wikidataId: 'Q516485',
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
          wikidataId: 'Q569680',
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
 * Ortsseite: der Ort (`City` mit Koordinaten und Wikidata-Kennung) und die Leistung für diesen Ort (`Service`).
 * Der Betrieb selbst steht nur einmal im Wurzelgraph (T04).
 */
export function getCityLandingPageSchema(city: CityConfig, serviceName?: string) {
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
        sameAs: 'https://www.wikidata.org/wiki/Q1199',
      },
    },
    sameAs: city.wikidataId ? `https://www.wikidata.org/wiki/${city.wikidataId}` : undefined,
  };

  const serviceNode = {
    '@type': 'Service',
    '@id': `${cityPageUrl}#service`,
    name: serviceName ? `${serviceName} in ${city.name}` : `Fliesenverlegung in ${city.name}`,
    serviceType: 'Fliesenverlegung',
    description: `Fliesenverlegung, Badsanierung, Duschen ohne Stufe, Großformate und Abdichtung nach DIN 18534 für Kunden in ${city.name}, ausgeführt vom Fachbetrieb in Aßlar.`,
    url: cityPageUrl,
    provider: { '@id': LOCAL_BUSINESS_ID },
    areaServed: { '@id': cityId },
  };

  const nodes: SchemaNode[] = [cityNode, serviceNode];

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
