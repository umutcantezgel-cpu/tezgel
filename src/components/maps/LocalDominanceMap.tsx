'use client';

import React from 'react';
import { MapPin, Trophy, ShieldCheck, Star, Navigation, ExternalLink, Clock } from 'lucide-react';
import { getDirectionsUrl, calculateEstimatedDriveTime, CITY_HUB_DATA } from '@/lib/maps/getMapEmbedUrl';

export interface LocalDominanceMapProps {
  className?: string;
  centerCity?: string;
  radiusKm?: number;
  topRankings?: string[];
  citySlug?: string;
}

/**
 * ══════════════════════════════════════════════════════════════
 * 20x Local Dominance Radar Visualization
 * ══════════════════════════════════════════════════════════════
 * - Zeigt regionale Marktabdeckung mit animiertem Puls-Radar.
 * - Berechnet dynamische Vor-Ort-Anfahrtszeit ab Aßlar.
 * - Direkte Verlinkung zur Google Maps Routenplanung.
 */
export function LocalDominanceMap({
  className = '',
  centerCity = 'Aßlar & Wetzlar',
  radiusKm = 25,
  topRankings = ['#1 Fachbetrieb Aßlar & Wetzlar', '5,0★ Google-Bewertung (27 Rezensionen)', 'Eingetragener HWK-Betrieb'],
  citySlug,
}: LocalDominanceMapProps) {
  // Normalize slug for city hub lookup
  const cleanCity = centerCity.split(' ')[0] || '';
  const normalizedSlug = (citySlug || cleanCity)
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss');

  const hubData = CITY_HUB_DATA[normalizedSlug];
  const distanceKm = hubData ? hubData.distanceKm : Math.max(5, Math.round(radiusKm * 0.7));
  const driveInfo = calculateEstimatedDriveTime(distanceKm);
  const routeUrl = getDirectionsUrl(centerCity);

  return (
    <div
      className={`relative w-full min-h-[360px] rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden flex flex-col items-center justify-center p-6 ${className}`}
    >
      {/* Background Radar Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none" />

      {/* Pulsing Radar Wave 1 */}
      <div className="absolute w-44 h-44 rounded-full border border-orange-500/30 animate-ping [animation-duration:3s] pointer-events-none" />

      {/* Pulsing Radar Wave 2 */}
      <div className="absolute w-68 h-68 rounded-full border border-orange-500/20 animate-ping [animation-duration:4.5s] pointer-events-none" />

      {/* Fixed Distance Rings */}
      <div className="absolute w-36 h-36 rounded-full border border-neutral-700/60 pointer-events-none" />
      <div className="absolute w-60 h-60 rounded-full border border-neutral-700/40 pointer-events-none" />
      <div className="absolute w-80 h-80 rounded-full border border-neutral-800/80 pointer-events-none" />

      {/* Center Business Pin */}
      <div className="relative z-10 flex flex-col items-center my-auto">
        <div className="p-3.5 rounded-full bg-orange-600 text-white shadow-xl shadow-orange-600/40 ring-4 ring-orange-500/20 animate-pulse">
          <MapPin className="w-6 h-6 fill-current" />
        </div>
        <div className="mt-2.5 px-3.5 py-1 rounded-full bg-neutral-900/95 border border-neutral-700 text-xs font-bold text-white backdrop-blur-md shadow-md text-center">
          Zentrum: {centerCity}
        </div>
        <div className="mt-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[11px] font-semibold backdrop-blur-md">
          <Clock className="w-3 h-3 text-orange-400" />
          <span>Fahrtzeit ab Aßlar: {driveInfo.text}</span>
        </div>
      </div>

      {/* Top Floating Badges */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 max-w-[calc(100%-2rem)]">
        {topRankings.map((badge, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900/90 border border-neutral-700/80 text-xs font-semibold text-orange-400 backdrop-blur-md shadow-sm"
          >
            {idx === 0 ? (
              <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            ) : idx === 1 ? (
              <Star className="w-3.5 h-3.5 text-amber-400 fill-current shrink-0" />
            ) : (
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            )}
            <span className="truncate">{badge}</span>
          </div>
        ))}
      </div>

      {/* Bottom Bar: Radius & Google Maps Link */}
      <div className="mt-auto pt-4 w-full flex flex-col sm:flex-row items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900/90 border border-neutral-700/80 text-xs text-neutral-300 backdrop-blur-md shadow-sm">
          <ShieldCheck className="w-4 h-4 text-orange-400" />
          <span className="font-medium">Radius: ca. {radiusKm} km Vor-Ort-Einsatz</span>
        </div>

        <a
          href={routeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Route in Google Maps</span>
          <ExternalLink className="w-3 h-3 opacity-80" />
        </a>
      </div>
    </div>
  );
}

export default LocalDominanceMap;
