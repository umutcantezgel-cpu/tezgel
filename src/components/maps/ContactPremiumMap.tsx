"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { CITIES } from "@/config/cities";
import { siteConfig } from "@/lib/config";
import MapConsentGate from "@/components/legal/MapConsentGate";
import {
  MapPin,
  Phone,
  Search,
  Navigation,
  ExternalLink,
  Clock,
} from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";
import {
  CITY_HUB_DATA,
  CITY_COORDINATES,
  TEZGEL_HQ_COORDS,
  getMapEmbedUrl,
  getDirectionsUrl,
} from "@/lib/maps/getMapEmbedUrl";

function ContactCameraController({ targetCoords }: { targetCoords: { lat: number; lng: number } }) {
  const map = useMap();

  React.useEffect(() => {
    if (!map) return;
    map.panTo(targetCoords);
    map.setZoom(13);
  }, [map, targetCoords]);

  return null;
}

export default function ContactPremiumMap({ className = "" }: { className?: string }) {
  const [selectedSlug, setSelectedSlug] = useState<string>("asslar");
  const [searchTerm, setSearchTerm] = useState("");
  const [distanceFilter, setDistanceFilter] = useState<number | null>(null);

  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY;

  const filteredCities = useMemo(() => {
    return CITIES.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.region.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDistance =
        distanceFilter === null || c.distanceKm <= distanceFilter;
      return matchesSearch && matchesDistance;
    });
  }, [searchTerm, distanceFilter]);

  const currentHub = CITY_HUB_DATA[selectedSlug] || CITY_HUB_DATA.asslar;
  const targetCoords = CITY_COORDINATES[selectedSlug] || TEZGEL_HQ_COORDS;

  const addressQuery =
    selectedSlug === "asslar"
      ? siteConfig.company.fullAddress
      : `${currentHub.name}, Hessen, Deutschland`;

  const embedUrl = getMapEmbedUrl({
    address: addressQuery,
    lat: targetCoords.lat,
    lng: targetCoords.lng,
    zoom: selectedSlug === "asslar" ? 14 : 13,
  });

  const directionsUrl = getDirectionsUrl(addressQuery);

  const handleSelectCity = useCallback((slug: string) => {
    triggerHaptic("light");
    setSelectedSlug(slug);
  }, []);

  return (
    <div className={`w-full bg-white rounded-3xl border border-neutral-200/90 shadow-xl overflow-hidden flex flex-col lg:flex-row ${className}`}>
      {/* ── Left: Interactive Location Command Center ── */}
      <div className="w-full lg:w-96 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-neutral-200 bg-neutral-50/70 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1.5">
            <MapPin className="w-4 h-4" />
            <span>Standort & Einsatzradius</span>
          </div>
          <h3 className="text-xl font-bold text-neutral-900 tracking-tight mb-1">
            Mittelhessen vor Ort
          </h3>
          <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
            Firmensitz Aßlar – täglicher Einsatz in Wetzlar, Gießen & Lahn-Dill.
          </p>

          {/* Search Input */}
          <div className="relative mb-2.5">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Stadt oder Kreis filtern..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs"
            />
          </div>

          {/* Quick Distance Filter Pills */}
          <div className="flex gap-1.5 mb-3">
            {[
              { label: "Alle", val: null },
              { label: "≤ 15 km", val: 15 },
              { label: "≤ 30 km", val: 30 },
              { label: "≤ 45 km", val: 45 },
            ].map((f) => (
              <button
                key={f.label}
                type="button"
                onClick={() => setDistanceFilter(f.val)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  distanceFilter === f.val
                    ? "bg-neutral-900 text-white"
                    : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* City Selection List */}
          <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1 no-scrollbar">
            {filteredCities.map((city) => {
              const isSelected = selectedSlug === city.slug;

              return (
                <button
                  key={city.slug}
                  type="button"
                  onClick={() => handleSelectCity(city.slug)}
                  className={`w-full px-3 py-2 text-left rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? "bg-orange-600 text-white shadow-md shadow-orange-600/30 scale-[1.02]"
                      : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200/80"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <MapPin className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-white" : "text-orange-600"}`} />
                    <span className="truncate">{city.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                        isSelected ? "bg-orange-700 text-orange-100" : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {city.distanceKm === 0 ? "Firmensitz" : `ca. ${city.distanceKm} km`}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Hub Snapshot Box */}
        <div className="mt-4 pt-4 border-t border-neutral-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-bold text-neutral-900">{currentHub.name}</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
              <Clock className="w-3 h-3" />
              <span>{currentHub.driveTimeText}</span>
            </span>
          </div>

          <p className="text-[11px] text-neutral-600 line-clamp-2 leading-relaxed mb-3">
            {currentHub.tagline}
          </p>

          <div className="flex gap-2">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5 text-orange-400" />
              <span>Route</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <a
              href={siteConfig.contact.phone.link}
              aria-label={`Fliesenverlegung Tezgel anrufen: ${siteConfig.contact.phone.formatted}`}
              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 text-xs font-bold border border-orange-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Anrufen</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Right: Map Canvas with 2-Click DSGVO Gate ── */}
      <div className="flex-1 min-h-[440px] lg:min-h-[520px] relative bg-neutral-100">
        <MapConsentGate
          src={embedUrl}
          title={`Google Maps Ansicht ${currentHub.name}`}
          height="100%"
          className="w-full h-full min-h-[440px] lg:min-h-[520px]"
        >
          {apiKey ? (
            <APIProvider apiKey={apiKey}>
              <div className="w-full h-full min-h-[440px] lg:min-h-[520px] relative">
                <Map
                  mapId="DEMO_MAP_ID"
                  defaultCenter={targetCoords}
                  defaultZoom={13}
                  gestureHandling="cooperative"
                  disableDefaultUI={false}
                  internalUsageAttributionIds={["gmp_git_agentskills_v1"]}
                  className="w-full h-full min-h-[440px] lg:min-h-[520px]"
                >
                  <ContactCameraController targetCoords={targetCoords} />

                  {/* HQ Pin */}
                  <AdvancedMarker position={TEZGEL_HQ_COORDS} title="Fliesenverlegung Tezgel HQ Aßlar">
                    <Pin background="#EA580C" borderColor="#FFFFFF" glyphColor="#FFFFFF" scale={1.2} />
                  </AdvancedMarker>

                  {/* Selected City Pin if not Aßlar */}
                  {selectedSlug !== "asslar" && (
                    <AdvancedMarker position={targetCoords} title={`Einsatzgebiet ${currentHub.name}`}>
                      <Pin background="#171717" borderColor="#EA580C" glyphColor="#FFFFFF" scale={1.15} />
                    </AdvancedMarker>
                  )}
                </Map>

                {/* Floating Fast-Nav Button */}
                <div className="absolute top-3 right-3 z-10">
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-neutral-900 text-xs font-bold shadow-md hover:bg-white transition-all border border-neutral-200"
                  >
                    <Navigation className="w-3.5 h-3.5 text-orange-600" />
                    <span>Navigation starten</span>
                    <ExternalLink className="w-3 h-3 text-neutral-400" />
                  </a>
                </div>
              </div>
            </APIProvider>
          ) : (
            <div className="relative w-full h-full min-h-[440px] lg:min-h-[520px]">
              <iframe
                title={`Kartenansicht ${currentHub.name}`}
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[440px] lg:min-h-[520px]"
              />
              <div className="absolute top-3 right-3 z-10">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-neutral-900 text-xs font-bold shadow-md hover:bg-white transition-all border border-neutral-200"
                >
                  <Navigation className="w-3.5 h-3.5 text-orange-600" />
                  <span>In Google Maps öffnen</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </div>
            </div>
          )}
        </MapConsentGate>
      </div>
    </div>
  );
}
