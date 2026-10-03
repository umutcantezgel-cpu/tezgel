"use client";

import React, { useState } from "react";
import { CITIES } from "@/config/cities";
import { siteConfig } from "@/lib/config";
import MapConsentGate from "@/components/legal/MapConsentGate";
import { MapPin, Phone, Search, Navigation, ExternalLink } from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";
import { getMapEmbedUrl, getDirectionsUrl, CITY_COORDINATES, TEZGEL_HQ_COORDS } from "@/lib/maps/getMapEmbedUrl";

export default function ContactPremiumMap({ className = "" }: { className?: string }) {
  const [selectedSlug, setSelectedSlug] = useState<string>("asslar");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCities = CITIES.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentCity = CITIES.find((c) => c.slug === selectedSlug) || CITIES[0];

  const coords = CITY_COORDINATES[currentCity?.slug || "asslar"] || TEZGEL_HQ_COORDS;
  const addressQuery = currentCity?.slug === "asslar"
    ? siteConfig.company.fullAddress
    : `${currentCity.name}, Hessen, Deutschland`;

  const embedUrl = getMapEmbedUrl({
    address: addressQuery,
    lat: coords.lat,
    lng: coords.lng,
    zoom: currentCity?.slug === "asslar" ? 14 : 12,
  });
  const directionsUrl = getDirectionsUrl(addressQuery);

  return (
    <div className={`w-full bg-white rounded-3xl border border-neutral-200/90 shadow-lg overflow-hidden flex flex-col lg:flex-row ${className}`}>
      {/* ── Left: Location Finder Sidebar ── */}
      <div className="w-full lg:w-96 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-neutral-200 bg-neutral-50/60 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 mb-2">
            <MapPin className="w-4 h-4" />
            <span>Standort & Einsatzradius</span>
          </div>
          <h3 className="text-xl font-bold text-neutral-900 tracking-tight mb-1">
            Mittelhessen vor Ort
          </h3>
          <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
            Firmensitz in Aßlar – täglich auf Baustellen in Wetzlar, Gießen & Lahn-Dill-Kreis.
          </p>

          {/* Search box */}
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Stadt oder Kreis filtern..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* City pills list */}
          <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1">
            {filteredCities.map((city) => {
              const isSelected = selectedSlug === city.slug;
              return (
                <button
                  key={city.slug}
                  type="button"
                  onClick={() => {
                    triggerHaptic("light");
                    setSelectedSlug(city.slug);
                  }}
                  className={`w-full px-3 py-2 text-left rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? "bg-orange-700 text-white shadow-xs"
                      : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200/80"
                  }`}
                >
                  <span className="truncate">{city.name}</span>
                  <span className={`text-[10px] shrink-0 ml-2 font-medium ${isSelected ? "text-orange-100" : "text-neutral-600"}`}>
                    {city.distanceKm === 0 ? "Firmensitz" : `ca. ${city.distanceKm} km`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected City summary box */}
        <div className="mt-5 pt-4 border-t border-neutral-200">
          <div className="text-xs font-bold text-neutral-900 mb-1 flex items-center justify-between">
            <span>{currentCity.name}</span>
            <span className="text-orange-800 font-bold text-[11px]">
              {currentCity.distanceKm === 0 ? "Direkt vor Ort" : `ca. ${currentCity.distanceKm} km`}
            </span>
          </div>
          <p className="text-[11px] text-neutral-600 line-clamp-2 leading-relaxed mb-3">
            {currentCity.description}
          </p>

          <div className="flex gap-2">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-orange-400" />
              <span>Route</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <a
              href={siteConfig.contact.phone.link}
              aria-label={`Fliesenverlegung Tezgel anrufen: ${siteConfig.contact.phone.formatted}`}
              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-800 text-xs font-bold border border-orange-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Anrufen</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Right: Map Container with 2-Click Gate ── */}
      <div className="flex-1 min-h-[420px] lg:min-h-[500px] relative bg-neutral-100">
        <MapConsentGate
          src={embedUrl}
          title={`Google Maps Ansicht ${currentCity.name}`}
          height="100%"
          className="w-full h-full min-h-[420px] lg:min-h-[500px]"
        />
      </div>
    </div>
  );
}
