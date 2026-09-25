export interface CityData {
  slug: string;
  name: string;
  /** Approximate distance from Wetzlar city centre (neighbouring our head office in Aßlar). */
  distanceKm: number;
  region: string;
  description: string;
  mapQuery: string;
}

export const CITIES: CityData[] = [
  {
    slug: 'wetzlar',
    name: 'Wetzlar',
    distanceKm: 0,
    region: 'Lahn-Dill-Kreis',
    description: 'Wetzlar grenzt direkt an unseren Firmensitz in Aßlar. Für Badsanierungen, Großformat-Fliesen und Balkonsanierungen sind wir dadurch schnell beim Aufmaß und jeden Tag pünktlich auf Ihrer Baustelle.',
    mapQuery: 'Wetzlar,Hessen,Deutschland',
  },
  {
    slug: 'giessen',
    name: 'Gießen',
    distanceKm: 25,
    region: 'Landkreis Gießen',
    description: 'In Gießen und im Landkreis Gießen verlegen wir Fliesen in Bädern, Wohnräumen und auf Terrassen – vom kostenfreien Vor-Ort-Aufmaß bis zur fertigen Fuge, mit Staubschutz bei bewohnten Sanierungen.',
    mapQuery: 'Gießen,Hessen,Deutschland',
  },
  {
    slug: 'marburg',
    name: 'Marburg',
    distanceKm: 40,
    region: 'Landkreis Marburg-Biedenkopf',
    description: 'Auch in Marburg und im Landkreis Marburg-Biedenkopf übernehmen wir komplette Badsanierungen und fugenarme Großformat-Verlegungen – mit normgerechter Verbundabdichtung nach DIN 18534.',
    mapQuery: 'Marburg,Hessen,Deutschland',
  },
  {
    slug: 'limburg',
    name: 'Limburg an der Lahn',
    distanceKm: 35,
    region: 'Landkreis Limburg-Weilburg',
    description: 'In Limburg und dem Landkreis Limburg-Weilburg sanieren wir Bäder, verlegen Wohnraum- und Treppenfliesen und bauen Balkone und Terrassen neu auf – mit transparentem Festpreisangebot.',
    mapQuery: 'Limburg+an+der+Lahn,Hessen,Deutschland',
  },
  {
    slug: 'bad-nauheim',
    name: 'Bad Nauheim',
    distanceKm: 40,
    region: 'Wetteraukreis',
    description: 'Für Bauherren und Eigentümer in Bad Nauheim planen und verlegen wir Fliesen und Naturstein – von der bodengleichen Walk-In-Dusche bis zur großformatigen Wohnraumfläche.',
    mapQuery: 'Bad+Nauheim,Hessen,Deutschland',
  },
  {
    slug: 'friedberg',
    name: 'Friedberg (Hessen)',
    distanceKm: 45,
    region: 'Wetteraukreis',
    description: 'In Friedberg und der Wetterau übernehmen wir Badsanierungen, Fliesenarbeiten im Neubau und die Untergrundvorbereitung – sauber abgestimmt und mit festen Terminen.',
    mapQuery: 'Friedberg,Hessen,Deutschland',
  },
  {
    slug: 'butzbach',
    name: 'Butzbach',
    distanceKm: 35,
    region: 'Wetteraukreis',
    description: 'Butzbach und Umgebung gehören zu unserem Einsatzgebiet: Wir verlegen Fliesen in Bad, Küche, Wohnbereich und auf dem Balkon – mit höchster Präzision aus dem Lahn-Dill-Kreis.',
    mapQuery: 'Butzbach,Hessen,Deutschland',
  },
  {
    slug: 'herborn',
    name: 'Herborn',
    distanceKm: 20,
    region: 'Lahn-Dill-Kreis',
    description: 'Herborn liegt im Lahn-Dill-Kreis nur eine kurze Fahrt von uns entfernt. Ob Bestandsbad oder Neubau – wir übernehmen Aufmaß, Abdichtung und Verlegung aus einer Hand.',
    mapQuery: 'Herborn,Hessen,Deutschland',
  },
  {
    slug: 'dillenburg',
    name: 'Dillenburg',
    distanceKm: 25,
    region: 'Lahn-Dill-Kreis',
    description: 'In Dillenburg und dem Dilltal sanieren wir Bäder schlüsselfertig und verlegen Großformate, Treppen und Terrassenbeläge – mit Staubschutz und besenreiner Übergabe.',
    mapQuery: 'Dillenburg,Hessen,Deutschland',
  },
  {
    slug: 'haiger',
    name: 'Haiger',
    distanceKm: 30,
    region: 'Lahn-Dill-Kreis',
    description: 'Auch in Haiger und den umliegenden Ortsteilen sind wir für Fliesen- und Badprojekte im Einsatz – von der barrierefreien Dusche bis zur Balkonsanierung.',
    mapQuery: 'Haiger,Hessen,Deutschland',
  },
  {
    slug: 'braunfels',
    name: 'Braunfels',
    distanceKm: 10,
    region: 'Lahn-Dill-Kreis',
    description: 'Braunfels liegt ganz in der Nähe unseres Firmensitzes. Kurze Wege machen Aufmaß, Materialauswahl und Abstimmung vor Ort besonders unkompliziert.',
    mapQuery: 'Braunfels,Hessen,Deutschland',
  },
  {
    slug: 'solms',
    name: 'Solms',
    distanceKm: 8,
    region: 'Lahn-Dill-Kreis',
    description: 'Solms gehört zu unseren direkten Nachbargemeinden. Hier sind wir schnell vor Ort – für die komplette Badsanierung ebenso wie für kleinere Fliesenarbeiten.',
    mapQuery: 'Solms,Hessen,Deutschland',
  },
  {
    slug: 'asslar',
    name: 'Aßlar',
    distanceKm: 5,
    region: 'Lahn-Dill-Kreis',
    description: 'In Aßlar ist unser Firmensitz in der Hohwardstraße 14. Hier sind wir zu Hause – mit persönlicher Beratung durch Inhaber Deniz Tezgel und kürzesten Wegen zu Ihrer Baustelle.',
    mapQuery: 'Aßlar,Hessen,Deutschland',
  },
];
