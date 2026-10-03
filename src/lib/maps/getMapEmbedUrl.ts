/**
 * ═══════════════════════════════════════════════════════════════════════════
 * Universal Map Embed & Navigation Utility - Fliesenverlegung Tezgel
 * ═══════════════════════════════════════════════════════════════════════════
 * Provides DSGVO-compliant, zero-failure embed URLs, drive time estimates,
 * and route links for interactive location maps across the website.
 *
 * Governed by Google Maps Platform Developer Guidelines:
 * Reference: https://developers.google.com/maps/documentation?utm_campaign=gmp_git_agentskills_v1
 *
 * Architecture:
 *  1. If NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is available:
 *     Leverages @vis.gl/react-google-maps with AdvancedMarkerElement and official
 *     Google Maps Embed API v1.
 *  2. If NO API key is available (default / development / preview):
 *     Seamlessly falls back to high-performance OpenStreetMap (OSM) embed and
 *     interactive SVG vector radar controller (HTTP 200, no X-Frame-Options block).
 *  3. Always generates native external Google Maps navigation links
 *     for one-click turn-by-turn route planning on iOS, Android, and Desktop.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export interface MapCoordinates {
  lat: number;
  lng: number;
}

/** Firmensitz Fliesenverlegung Tezgel in Aßlar */
export const TEZGEL_HQ_COORDS: MapCoordinates = {
  lat: 50.5900,
  lng: 8.4600,
};

export const TEZGEL_HQ_ADDRESS = "Hohwardstraße 14, 35614 Aßlar";
export const TEZGEL_SERVICE_RADIUS_KM = 45;

/** Exakte Geokoordinaten für das Einzugsgebiet Lahn-Dill, Mittelhessen & Wetterau */
export const CITY_COORDINATES: Record<string, MapCoordinates> = {
  asslar: { lat: 50.5900, lng: 8.4600 },
  wetzlar: { lat: 50.5607, lng: 8.5046 },
  giessen: { lat: 50.5873, lng: 8.6755 },
  marburg: { lat: 50.8022, lng: 8.7668 },
  limburg: { lat: 50.3837, lng: 8.0583 },
  "bad-nauheim": { lat: 50.3664, lng: 8.7424 },
  friedberg: { lat: 50.3353, lng: 8.7561 },
  butzbach: { lat: 50.4344, lng: 8.6708 },
  herborn: { lat: 50.6833, lng: 8.3000 },
  dillenburg: { lat: 50.7397, lng: 8.2867 },
  haiger: { lat: 50.7425, lng: 8.2047 },
  braunfels: { lat: 50.5144, lng: 8.3889 },
  solms: { lat: 50.5408, lng: 8.4072 },
};

export interface CityHubMetadata {
  slug: string;
  name: string;
  coords: MapCoordinates;
  distanceKm: number;
  driveTimeText: string;
  driveTimeMinutes: number;
  services: string[];
  tagline: string;
}

/**
 * Calculates realistic regional driving time from Aßlar headquarters.
 */
export function calculateEstimatedDriveTime(distanceKm: number): { minutes: number; text: string; formatted: string } {
  if (distanceKm <= 0) {
    const text = "Direkt vor Ort (Firmensitz)";
    return { minutes: 0, text, formatted: text };
  }
  const minutes = distanceKm <= 10
    ? Math.max(5, Math.round(distanceKm * 1.3 + 3))
    : Math.round(distanceKm * 1.15 + 4);

  const text = `ca. ${minutes} Min. ab Aßlar`;
  return { minutes, text, formatted: text };
}

export const CITY_HUB_DATA: Record<string, CityHubMetadata> = {
  asslar: {
    slug: "asslar",
    name: "Aßlar",
    coords: CITY_COORDINATES.asslar,
    distanceKm: 0,
    ...(() => {
      const d = calculateEstimatedDriveTime(0);
      return { driveTimeMinutes: d.minutes, driveTimeText: d.text };
    })(),
    services: ["Badsanierung", "Großformatfliesen", "Fliesenreparatur", "Balkon & Terrasse"],
    tagline: "Firmensitz & Meister-Erfahrung – schnellste Reaktionszeit für Ihr Projekt.",
  },
  wetzlar: {
    slug: "wetzlar",
    name: "Wetzlar",
    coords: CITY_COORDINATES.wetzlar,
    distanceKm: 5,
    ...(() => {
      const d = calculateEstimatedDriveTime(5);
      return { driveTimeMinutes: d.minutes, driveTimeText: d.text };
    })(),
    services: ["Komplettbäder", "Barrierefreie Duschen", "XXL-Großformat", "Treppensanierung"],
    tagline: "Täglich auf Baustellen in Wetzlar & Stadtteilen für anspruchsvolle Fliesenarbeiten.",
  },
  giessen: {
    slug: "giessen",
    name: "Gießen",
    coords: CITY_COORDINATES.giessen,
    distanceKm: 25,
    ...(() => {
      const d = calculateEstimatedDriveTime(25);
      return { driveTimeMinutes: d.minutes, driveTimeText: d.text };
    })(),
    services: ["Badsanierung schlüsselfertig", "Wohnraumfliesen", "Stelzlager-Terrassen", "Naturstein"],
    tagline: "Zuverlässiger Fachbetrieb für Gießen, Kleinlinden, Wieseck & Umgebung.",
  },
  marburg: {
    slug: "marburg",
    name: "Marburg",
    coords: CITY_COORDINATES.marburg,
    distanceKm: 40,
    ...(() => {
      const d = calculateEstimatedDriveTime(40);
      return { driveTimeMinutes: d.minutes, driveTimeText: d.text };
    })(),
    services: ["Fugenlose Bäder", "DIN 18534 Abdichtung", "Terrassenbeläge", "Altbausanierung"],
    tagline: "Komplettservice für Marburg & Landkreis Marburg-Biedenkopf mit Festpreisgarantie.",
  },
  limburg: {
    slug: "limburg",
    name: "Limburg an der Lahn",
    coords: CITY_COORDINATES.limburg,
    distanceKm: 35,
    ...(() => {
      const d = calculateEstimatedDriveTime(35);
      return { driveTimeMinutes: d.minutes, driveTimeText: d.text };
    })(),
    services: ["Bäder aus einer Hand", "Walk-In-Duschen", "Großformate", "Balkonsanierung"],
    tagline: "Höchste Verlegepräzision für Limburg, Weilburg und das Lahntal.",
  },
  "bad-nauheim": {
    slug: "bad-nauheim",
    name: "Bad Nauheim",
    coords: CITY_COORDINATES["bad-nauheim"],
    distanceKm: 40,
    ...(() => {
      const d = calculateEstimatedDriveTime(40);
      return { driveTimeMinutes: d.minutes, driveTimeText: d.text };
    })(),
    services: ["Designbäder", "Naturstein & Marmor", "Feinsteinzeug", "Terrassenplatten"],
    tagline: "Premium-Fliesenverlegung in Bad Nauheim und der Wetterau.",
  },
  friedberg: {
    slug: "friedberg",
    name: "Friedberg (Hessen)",
    coords: CITY_COORDINATES.friedberg,
    distanceKm: 45,
    ...(() => {
      const d = calculateEstimatedDriveTime(45);
      return { driveTimeMinutes: d.minutes, driveTimeText: d.text };
    })(),
    services: ["Badsanierung", "Neubau-Fliesenarbeiten", "Estrich-Vorbereitung", "Treppenbeläge"],
    tagline: "Termintreue & saubere Ausführung mit Staubschutz in Friedberg.",
  },
  butzbach: {
    slug: "butzbach",
    name: "Butzbach",
    coords: CITY_COORDINATES.butzbach,
    distanceKm: 35,
    ...(() => {
      const d = calculateEstimatedDriveTime(35);
      return { driveTimeMinutes: d.minutes, driveTimeText: d.text };
    })(),
    services: ["Küche & Wohnbereich", "Bäder modernisieren", "Fugensanierung", "Terrassen"],
    tagline: "Ihr regionaler Fliesenleger-Fachbetrieb für Butzbach & Umgebung.",
  },
  herborn: {
    slug: "herborn",
    name: "Herborn",
    coords: CITY_COORDINATES.herborn,
    distanceKm: 20,
    ...(() => {
      const d = calculateEstimatedDriveTime(20);
      return { driveTimeMinutes: d.minutes, driveTimeText: d.text };
    })(),
    services: ["Komplettbäder", "Großformatverlegung", "Verbundabdichtung", "Balkone"],
    tagline: "Kurze Anfahrtswege für Herborn, Sinn, Merkenbach & Dilltal.",
  },
  dillenburg: {
    slug: "dillenburg",
    name: "Dillenburg",
    coords: CITY_COORDINATES.dillenburg,
    distanceKm: 25,
    ...(() => {
      const d = calculateEstimatedDriveTime(25);
      return { driveTimeMinutes: d.minutes, driveTimeText: d.text };
    })(),
    services: ["Barrierefreie Bäder", "Treppensanierung", "Fliesenreparatur", "Außentreppen"],
    tagline: "Fachgerechte Verlegung nach DIN 18534 in Dillenburg & Umgebung.",
  },
  haiger: {
    slug: "haiger",
    name: "Haiger",
    coords: CITY_COORDINATES.haiger,
    distanceKm: 30,
    ...(() => {
      const d = calculateEstimatedDriveTime(30);
      return { driveTimeMinutes: d.minutes, driveTimeText: d.text };
    })(),
    services: ["Badsanierung", "Wohnflächen", "Balkonplatten", "Reparaturservice"],
    tagline: "Zuverlässiger Partner für Fliesen- & Sanierungsarbeiten in Haiger.",
  },
  braunfels: {
    slug: "braunfels",
    name: "Braunfels",
    coords: CITY_COORDINATES.braunfels,
    distanceKm: 10,
    ...(() => {
      const d = calculateEstimatedDriveTime(10);
      return { driveTimeMinutes: d.minutes, driveTimeText: d.text };
    })(),
    services: ["Badsanierung", "Großformat", "Naturstein", "Terrassensanierung"],
    tagline: "Direkte Nachbarschaft zu Aßlar – schnell vor Ort für persönliches Aufmaß.",
  },
  solms: {
    slug: "solms",
    name: "Solms",
    coords: CITY_COORDINATES.solms,
    distanceKm: 8,
    ...(() => {
      const d = calculateEstimatedDriveTime(8);
      return { driveTimeMinutes: d.minutes, driveTimeText: d.text };
    })(),
    services: ["Komplettbäder", "Bodenfliesen", "Fliesenreparatur", "Stelzlager"],
    tagline: "In wenigen Minuten vor Ort für Ihr Bauvorhaben in Solms, Burgsolms & Oberbiel.",
  },
};

export interface MapEmbedOptions {
  address?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  apiKey?: string;
}

/**
 * Generates an OpenStreetMap embed URL with calibrated bounding box and pin marker.
 */
export function getOsmEmbedUrl(lat: number, lng: number, zoom = 14): string {
  const delta = 0.035 * Math.pow(2, 14 - zoom);
  const minLng = (lng - delta).toFixed(4);
  const maxLng = (lng + delta).toFixed(4);
  const minLat = (lat - delta * 0.65).toFixed(4);
  const maxLat = (lat + delta * 0.65).toFixed(4);
  return `https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik&marker=${lat.toFixed(4)}%2C${lng.toFixed(4)}`;
}

/**
 * Generates official Google Maps Embed API v1 URL when an API key is available.
 */
export function getGoogleMapsEmbedUrl(query: string, apiKey: string, zoom = 14): string {
  return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(query)}&language=de&zoom=${zoom}`;
}

/**
 * Generates a direct universal link to Google Maps navigation / route planning.
 */
export function getDirectionsUrl(query: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

/**
 * Resolves the optimal embed URL:
 * - Uses Google Maps Embed API v1 if API key is provided
 * - Falls back to OpenStreetMap embed if no API key is configured
 */
export function getMapEmbedUrl(options: MapEmbedOptions = {}): string {
  const lat = options.lat ?? TEZGEL_HQ_COORDS.lat;
  const lng = options.lng ?? TEZGEL_HQ_COORDS.lng;
  const zoom = options.zoom ?? 14;
  const address = options.address || TEZGEL_HQ_ADDRESS;
  const apiKey =
    options.apiKey ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    process.env.GOOGLE_MAPS_API_KEY;

  if (apiKey) {
    return getGoogleMapsEmbedUrl(address, apiKey, zoom);
  }

  return getOsmEmbedUrl(lat, lng, zoom);
}
