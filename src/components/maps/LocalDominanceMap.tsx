'use client';

import React from 'react';
import { MapPin, Trophy, ShieldCheck, Star } from 'lucide-react';

export interface LocalDominanceMapProps {
  className?: string;
  centerCity?: string;
  radiusKm?: number;
  topRankings?: string[];
}

/**
 * Local Dominance Radar Visualization
 * Shows regional market coverage with animated pulsing radar waves.
 */
export function LocalDominanceMap({
  className = '',
  centerCity = 'Aßlar & Wetzlar',
  radiusKm = 25,
  topRankings = ['#1 Fachbetrieb Aßlar & Wetzlar', '5,0★ Google-Bewertung (27 Rezensionen)', 'Eingetragener HWK-Betrieb'],
}: LocalDominanceMapProps) {
  return (
    <div
      className={`relative w-full h-84 rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden flex items-center justify-center ${className}`}
    >
      {/* Background Radar Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

      {/* Pulsing Radar Wave 1 */}
      <div className="absolute w-44 h-44 rounded-full border border-orange-500/30 animate-ping [animation-duration:3s]" />

      {/* Pulsing Radar Wave 2 */}
      <div className="absolute w-68 h-68 rounded-full border border-orange-500/20 animate-ping [animation-duration:4.5s]" />

      {/* Fixed Distance Rings */}
      <div className="absolute w-36 h-36 rounded-full border border-neutral-700/60" />
      <div className="absolute w-60 h-60 rounded-full border border-neutral-700/40" />
      <div className="absolute w-80 h-80 rounded-full border border-neutral-800/80" />

      {/* Center Business Pin */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="p-3.5 rounded-full bg-orange-600 text-white shadow-xl shadow-orange-600/40 ring-4 ring-orange-500/20 animate-pulse">
          <MapPin className="w-6 h-6 fill-current" />
        </div>
        <div className="mt-2.5 px-3.5 py-1 rounded-full bg-neutral-900/95 border border-neutral-700 text-xs font-bold text-white backdrop-blur-md shadow-md">
          Zentrum: {centerCity}
        </div>
      </div>

      {/* Top Floating Badges */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
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
            <span>{badge}</span>
          </div>
        ))}
      </div>

      {/* Radius Indicator */}
      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900/90 border border-neutral-700/80 text-xs text-neutral-300 backdrop-blur-md shadow-sm z-10">
        <ShieldCheck className="w-4 h-4 text-orange-400" />
        <span className="font-medium">Radius: ca. {radiusKm} km Vor-Ort-Einsatz</span>
      </div>
    </div>
  );
}

export default LocalDominanceMap;
