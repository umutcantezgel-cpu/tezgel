export interface CityData {
  slug: string;
  name: string;
  /** kurze Form für Titel, wenn der volle Name sie über 58 Zeichen bringt (Ortsseite, Leistung × Ort) */
  kurzname?: string;
  /** Approximate distance from Wetzlar city centre (neighbouring our head office in Aßlar). */
  distanceKm: number;
  region: string;
  /** Satz auf der Karte in /standorte, nur mit einer echten Angabe zum Ort (Wetzlar: Lager, Aßlar: Firmensitz), sonst leer (SEO-Runde b4) */
  description: string;
  mapQuery: string;
}

export const CITIES: CityData[] = [
  {
    slug: 'wetzlar',
    name: 'Wetzlar',
    distanceKm: 0,
    region: 'Lahn-Dill-Kreis',
    description: 'Wetzlar grenzt an Aßlar, wo unser Firmensitz ist. Unser Lager liegt im Dillfeld in Wetzlar.',
    mapQuery: 'Wetzlar,Hessen,Deutschland',
  },
  {
    slug: 'giessen',
    name: 'Gießen',
    distanceKm: 25,
    region: 'Landkreis Gießen',
    description: '',
    mapQuery: 'Gießen,Hessen,Deutschland',
  },
  {
    slug: 'marburg',
    name: 'Marburg',
    distanceKm: 40,
    region: 'Landkreis Marburg-Biedenkopf',
    description: '',
    mapQuery: 'Marburg,Hessen,Deutschland',
  },
  {
    slug: 'limburg',
    name: 'Limburg an der Lahn',
    kurzname: 'Limburg',
    distanceKm: 35,
    region: 'Landkreis Limburg-Weilburg',
    description: '',
    mapQuery: 'Limburg+an+der+Lahn,Hessen,Deutschland',
  },
  {
    slug: 'bad-nauheim',
    name: 'Bad Nauheim',
    distanceKm: 40,
    region: 'Wetteraukreis',
    description: '',
    mapQuery: 'Bad+Nauheim,Hessen,Deutschland',
  },
  {
    slug: 'friedberg',
    name: 'Friedberg (Hessen)',
    kurzname: 'Friedberg',
    distanceKm: 45,
    region: 'Wetteraukreis',
    description: '',
    mapQuery: 'Friedberg,Hessen,Deutschland',
  },
  {
    slug: 'butzbach',
    name: 'Butzbach',
    distanceKm: 35,
    region: 'Wetteraukreis',
    description: '',
    mapQuery: 'Butzbach,Hessen,Deutschland',
  },
  {
    slug: 'herborn',
    name: 'Herborn',
    distanceKm: 20,
    region: 'Lahn-Dill-Kreis',
    description: '',
    mapQuery: 'Herborn,Hessen,Deutschland',
  },
  {
    slug: 'dillenburg',
    name: 'Dillenburg',
    distanceKm: 25,
    region: 'Lahn-Dill-Kreis',
    description: '',
    mapQuery: 'Dillenburg,Hessen,Deutschland',
  },
  {
    slug: 'haiger',
    name: 'Haiger',
    distanceKm: 30,
    region: 'Lahn-Dill-Kreis',
    description: '',
    mapQuery: 'Haiger,Hessen,Deutschland',
  },
  {
    slug: 'braunfels',
    name: 'Braunfels',
    distanceKm: 10,
    region: 'Lahn-Dill-Kreis',
    description: '',
    mapQuery: 'Braunfels,Hessen,Deutschland',
  },
  {
    slug: 'solms',
    name: 'Solms',
    distanceKm: 8,
    region: 'Lahn-Dill-Kreis',
    description: '',
    mapQuery: 'Solms,Hessen,Deutschland',
  },
  {
    slug: 'asslar',
    name: 'Aßlar',
    distanceKm: 5,
    region: 'Lahn-Dill-Kreis',
    description: 'In Aßlar ist unser Firmensitz, in der Hohwardstraße 14. Von hier kommen wir zu Ihnen.',
    mapQuery: 'Aßlar,Hessen,Deutschland',
  },
];
