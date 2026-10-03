/**
 * ═══════════════════════════════════════════════════════════════════════════
 * Universal Map Embed & Navigation Utility - Fliesenverlegung Tezgel
 * ═══════════════════════════════════════════════════════════════════════════
 * Provides DSGVO-compliant, zero-failure embed URLs and route links for
 * interactive location maps across the website.
 *
 * Architecture:
 *  1. If NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is available:
 *     Generates official Google Maps Embed API v1 URL.
 *  2. If NO API key is available (default / development / preview):
 *     Generates high-performance OpenStreetMap (OSM) embed with centered
 *     marker and calibrated bounding box (HTTP 200, no X-Frame-Options block).
 *  3. Always generates native external Google Maps navigation links
 *     for one-click route planning on iOS, Android, and Desktop.
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
