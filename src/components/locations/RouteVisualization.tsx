"use client";

import React from "react";
import { Navigation, MapPin, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { CityData } from "@/config/cities";

interface RouteVisualizationProps {
  city: CityData;
  className?: string;
}

export default function RouteVisualization({ city, className = "" }: RouteVisualizationProps) {
  // Approximate driving time calculation (1.5 min per km + 5 min base)
  const drivingMinutes = Math.max(8, Math.round(city.distanceKm * 1.3 + 5));

  return (
    <section className={`py-12 sm:py-16 bg-gradient-to-b from-neutral-50 to-white border-y border-neutral-200/80 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-3">
            <Navigation className="w-3.5 h-3.5 text-orange-600" />
            <span>Kurze Anfahrtswege in Mittelhessen</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
            Schnell bei Ihnen in {city.name}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2 leading-relaxed">
            Direkte Anfahrt von unserem Betriebssitz in Aßlar über die B49 und A45 –
            ohne lange Wartezeiten, persönlich vor Ort.
          </p>
        </div>

        {/* 3 Step Visual Route */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-center">
          {/* Step 1: Start HQ */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center mb-3">
              <MapPin className="w-6 h-6 text-neutral-700" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Startpunkt</span>
            <div className="text-lg font-bold text-neutral-900 mt-0.5">Aßlar (Firmensitz)</div>
            <p className="text-xs text-neutral-500 mt-1">{siteConfig.company.street}</p>
          </div>

          {/* Step 2: Route details */}
          <div className="bg-orange-50/80 rounded-2xl p-6 border border-orange-200/80 text-center flex flex-col items-center shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center mb-3 shadow-sm">
              <Clock className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-700">Fahrtzeit & Strecke</span>
            <div className="text-2xl font-black text-orange-600 mt-0.5">
              ca. {drivingMinutes} Min.
            </div>
            <p className="text-xs font-medium text-neutral-600 mt-1">
              {city.distanceKm === 0 ? "Direkte Nachbarschaft" : `ca. ${city.distanceKm} km Entfernung`}
            </p>
          </div>

          {/* Step 3: Destination */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 border border-emerald-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Ihr Projekt</span>
            <div className="text-lg font-bold text-neutral-900 mt-0.5">{city.name}</div>
            <p className="text-xs text-neutral-500 mt-1">Kostenfreies Vor-Ort-Aufmaß</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href={siteConfig.contact.phone.link}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-bold shadow-md transition-all"
          >
            <span>Jetzt Vor-Ort-Termin für {city.name} anfragen</span>
            <ArrowRight className="w-4 h-4 text-orange-400" />
          </a>
        </div>
      </div>
    </section>
  );
}
