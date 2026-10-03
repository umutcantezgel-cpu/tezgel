"use client";

import React, { useState, useCallback, useTransition } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import { CITIES } from "@/config/cities";
import { siteConfig } from "@/lib/config";
import MapConsentGate from "@/components/legal/MapConsentGate";
import {
  CITY_HUB_DATA,
  CITY_COORDINATES,
  TEZGEL_HQ_COORDS,
  TEZGEL_SERVICE_RADIUS_KM,
  getDirectionsUrl,
  getOsmEmbedUrl,
} from "@/lib/maps/getMapEmbedUrl";
import {
  MapPin,
  Navigation,
  ExternalLink,
  Clock,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";

const ASSLAR_CENTER = TEZGEL_HQ_COORDS;
const DEFAULT_ZOOM = 10;

/**
 * Camera controller for smooth pan and zoom on city selection.
 */
function CameraController({ targetCoords }: { targetCoords: { lat: number; lng: number } | null }) {
  const map = useMap();

  React.useEffect(() => {
    if (!map || !targetCoords) return;
    map.panTo(targetCoords);
    map.setZoom(12);
  }, [map, targetCoords]);

  return null;
}

/**
 * Modern Google Maps Platform Canvas using @vis.gl/react-google-maps and AdvancedMarkerElement.
 */
function ModernGoogleMapsCanvas({
  selectedSlug,
  onSelectCity,
}: {
  selectedSlug: string;
  onSelectCity: (slug: string) => void;
}) {
  const selectedCity = CITY_HUB_DATA[selectedSlug] || CITY_HUB_DATA.asslar;
  const [infoOpen, setInfoOpen] = useState(false);

  const handleMarkerClick = useCallback(
    (slug: string) => {
      triggerHaptic("light");
      onSelectCity(slug);
      setInfoOpen(true);
    },
    [onSelectCity]
  );

  return (
    <div className="relative w-full h-[460px] rounded-2xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-100">
      <Map
        mapId="DEMO_MAP_ID"
        defaultCenter={ASSLAR_CENTER}
        defaultZoom={DEFAULT_ZOOM}
        gestureHandling="cooperative"
        disableDefaultUI={false}
        internalUsageAttributionIds={["gmp_git_agentskills_v1"]}
        className="w-full h-full"
      >
        <CameraController targetCoords={CITY_COORDINATES[selectedSlug] || null} />

        {/* Tezgel HQ Marker */}
        <AdvancedMarker
          position={ASSLAR_CENTER}
          title="Fliesenverlegung Tezgel (Hauptsitz Aßlar)"
          onClick={() => handleMarkerClick("asslar")}
        >
          <Pin
            background="#EA580C"
            borderColor="#FFFFFF"
            glyphColor="#FFFFFF"
            scale={1.25}
          />
        </AdvancedMarker>

        {/* 12 Satellite City Markers */}
        {CITIES.filter((c) => c.slug !== "asslar").map((city) => {
          const coords = CITY_COORDINATES[city.slug];
          if (!coords) return null;
          const isSelected = selectedSlug === city.slug;

          return (
            <AdvancedMarker
              key={city.slug}
              position={coords}
              title={`Einsatzgebiet ${city.name}`}
              onClick={() => handleMarkerClick(city.slug)}
            >
              <Pin
                background={isSelected ? "#EA580C" : "#FFFFFF"}
                borderColor="#EA580C"
                glyphColor={isSelected ? "#FFFFFF" : "#EA580C"}
                scale={isSelected ? 1.15 : 0.85}
              />
            </AdvancedMarker>
          );
        })}

        {/* InfoWindow for Selected City */}
        {infoOpen && (
          <InfoWindow
            position={CITY_COORDINATES[selectedSlug] || ASSLAR_CENTER}
            onCloseClick={() => setInfoOpen(false)}
          >
            <div className="p-1 max-w-[240px] font-sans">
              <div className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-0.5">
                {selectedCity.distanceKm === 0 ? "Firmensitz" : `ca. ${selectedCity.distanceKm} km`}
              </div>
              <h4 className="font-bold text-neutral-900 text-sm">{selectedCity.name}</h4>
              <p className="text-[11px] text-neutral-600 mt-1 leading-snug">
                {selectedCity.tagline}
              </p>
              <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {selectedCity.driveTimeText}
                </span>
                <a
                  href={getDirectionsUrl(`${selectedCity.name}, Hessen`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                >
                  <span>Route</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </InfoWindow>
        )}
      </Map>
    </div>
  );
}

/**
 * 20x Interactive Vector Radar Canvas for Zero-Failure Experience without API Key.
 */
function InteractiveRadarCanvas({
  selectedSlug,
  onSelectCity,
}: {
  selectedSlug: string;
  onSelectCity: (slug: string) => void;
}) {
  const [showOsmTiles, setShowOsmTiles] = useState(false);
  const selectedCity = CITY_HUB_DATA[selectedSlug] || CITY_HUB_DATA.asslar;

  if (showOsmTiles) {
    const coords = CITY_COORDINATES[selectedSlug] || ASSLAR_CENTER;
    const osmUrl = getOsmEmbedUrl(coords.lat, coords.lng, selectedSlug === "asslar" ? 11 : 13);
    return (
      <div className="relative w-full h-[460px] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl">
        <iframe
          title={`OpenStreetMap Ansicht ${selectedCity.name}`}
          src={osmUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          <button
            type="button"
            onClick={() => setShowOsmTiles(false)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900/90 backdrop-blur-md text-white text-xs font-bold border border-neutral-700 shadow-md hover:bg-neutral-800 transition-all cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-orange-400" />
            <span>Vektor-Radar anzeigen</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[460px] rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden flex items-center justify-center select-none shadow-xl">
      {/* Background Radar Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

      {/* Concentric Radius Rings */}
      <div className="absolute w-32 h-32 rounded-full border border-orange-500/30" />
      <span className="absolute translate-y-[-72px] text-[10px] font-bold text-orange-500/60 bg-neutral-950 px-1 rounded">
        10 km
      </span>

      <div className="absolute w-60 h-60 rounded-full border border-orange-500/25" />
      <span className="absolute translate-y-[-128px] text-[10px] font-bold text-orange-500/50 bg-neutral-950 px-1 rounded">
        25 km
      </span>

      <div className="absolute w-96 h-96 rounded-full border border-orange-500/20" />
      <span className="absolute translate-y-[-200px] text-[10px] font-bold text-orange-500/40 bg-neutral-950 px-1 rounded">
        {TEZGEL_SERVICE_RADIUS_KM} km Einsatzradius
      </span>

      {/* Animated Radar Pulse Waves */}
      <div className="absolute w-72 h-72 rounded-full border border-orange-500/20 animate-ping [animation-duration:4s]" />
      <div className="absolute w-96 h-96 rounded-full border border-orange-500/15 animate-ping [animation-duration:6s]" />

      {/* Center Pin: Aßlar Headquarters */}
      <div
        className="relative z-20 flex flex-col items-center cursor-pointer transition-transform hover:scale-110"
        onClick={() => onSelectCity("asslar")}
      >
        <div className="p-3 rounded-full bg-orange-600 text-white shadow-xl shadow-orange-600/50 ring-4 ring-orange-500/30 animate-pulse">
          <MapPin className="w-5 h-5 fill-current" />
        </div>
        <div className="mt-1.5 px-3 py-1 rounded-full bg-neutral-900/95 border border-orange-500/50 text-[11px] font-bold text-white backdrop-blur-md shadow-md">
          Aßlar (Firmensitz)
        </div>
      </div>

      {/* Satellite City Nodes */}
      <div className="absolute inset-0 pointer-events-none">
        {CITIES.filter((c) => c.slug !== "asslar").map((city, idx) => {
          const isSelected = selectedSlug === city.slug;
          // Distribute visually around the center proportional to angle and distance
          const angle = (idx * (360 / 12) - 90) * (Math.PI / 180);
          const radiusScale = Math.min(180, Math.max(70, city.distanceKm * 3.8));
          const x = Math.cos(angle) * radiusScale;
          const y = Math.sin(angle) * radiusScale;

          return (
            <div
              key={city.slug}
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                left: "50%",
                top: "50%",
              }}
              className="absolute pointer-events-auto"
            >
              <button
                type="button"
                onClick={() => {
                  triggerHaptic("light");
                  onSelectCity(city.slug);
                }}
                className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer backdrop-blur-md border ${
                  isSelected
                    ? "bg-orange-600 text-white border-orange-400 shadow-lg shadow-orange-600/40 scale-110 z-30"
                    : "bg-neutral-900/85 text-neutral-300 border-neutral-700 hover:border-orange-500/60 hover:text-white"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? "bg-white" : "bg-orange-500 group-hover:scale-125"
                  } transition-transform`}
                />
                <span>{city.name}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Top Left: Controls & Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900/90 border border-neutral-700/80 backdrop-blur-md text-xs text-neutral-200 shadow-md">
          <ShieldCheck className="w-4 h-4 text-orange-400" />
          <span className="font-semibold">Einsatzgebiet 45 km Mittelhessen</span>
        </div>
      </div>

      {/* Top Right: Toggle OpenStreetMap Tiles */}
      <div className="absolute top-4 right-4 z-20">
        <button
          type="button"
          onClick={() => setShowOsmTiles(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 text-neutral-900 text-xs font-bold border border-neutral-200 shadow-md hover:bg-white transition-all cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5 text-orange-600" />
          <span>Straßenkarte (OSM)</span>
        </button>
      </div>
    </div>
  );
}

/**
 * 20x Interactive Service Dominance Map Component.
 */
export default function InteractiveServiceMap({ className = "" }: { className?: string }) {
  const [selectedSlug, setSelectedSlug] = useState<string>("asslar");
  const [, startTransition] = useTransition();

  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY;

  const currentCity = CITY_HUB_DATA[selectedSlug] || CITY_HUB_DATA.asslar;
  const directionsUrl = getDirectionsUrl(
    selectedSlug === "asslar" ? siteConfig.company.fullAddress : `${currentCity.name}, Hessen`
  );

  const handleSelectCity = useCallback((slug: string) => {
    startTransition(() => {
      setSelectedSlug(slug);
    });
  }, []);

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* ── Top: Interactive City Quick-Selector Pill Strip ── */}
      <div className="w-full overflow-x-auto pb-1 no-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {CITIES.map((city) => {
            const isSelected = selectedSlug === city.slug;
            return (
              <button
                key={city.slug}
                type="button"
                onClick={() => handleSelectCity(city.slug)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-orange-600 text-white shadow-md shadow-orange-600/30 scale-105"
                    : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-orange-600"}`} />
                <span>{city.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isSelected ? "bg-orange-700 text-orange-100" : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {city.distanceKm === 0 ? "HQ" : `${city.distanceKm} km`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Center: Interactive Map Canvas with DSGVO Gate ── */}
      <MapConsentGate
        title={`Einsatzgebiet Fliesenverlegung Tezgel – ${currentCity.name}`}
        height="460px"
      >
        {apiKey ? (
          <APIProvider apiKey={apiKey}>
            <ModernGoogleMapsCanvas
              selectedSlug={selectedSlug}
              onSelectCity={handleSelectCity}
            />
          </APIProvider>
        ) : (
          <InteractiveRadarCanvas
            selectedSlug={selectedSlug}
            onSelectCity={handleSelectCity}
          />
        )}
      </MapConsentGate>

      {/* ── Bottom: High-Conversion Regional Service Hub Card ── */}
      <div className="p-5 sm:p-6 bg-gradient-to-br from-neutral-900 to-neutral-950 text-white rounded-2xl border border-neutral-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30">
                {currentCity.distanceKm === 0 ? "Firmensitz & Meister-Erfahrung" : `Einsatzgebiet ${currentCity.name}`}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <Clock className="w-3 h-3" />
                <span>{currentCity.driveTimeText}</span>
              </span>
            </div>

            <h3 className="text-xl font-bold tracking-tight text-white">
              Fliesenverlegung & Badsanierung in {currentCity.name}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
              {currentCity.tagline}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {currentCity.services.map((service, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-300 bg-neutral-800/80 px-2.5 py-1 rounded-lg border border-neutral-700/60"
                >
                  <CheckCircle2 className="w-3 h-3 text-orange-400" />
                  <span>{service}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <a
              href="/kontakt#express-anfrage"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
            >
              <span>Kostenloses Vor-Ort-Aufmaß</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-neutral-200 text-xs font-semibold border border-white/10 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-orange-400" />
              <span>Route in Google Maps</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
