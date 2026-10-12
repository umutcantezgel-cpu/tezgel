"use client";

import React, { useState, useCallback, useTransition } from "react";
import clsx from "clsx";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useMap } from "@vis.gl/react-google-maps";
import { CITIES } from "@/config/cities";
import MapConsentGate from "@/components/legal/MapConsentGate";
import Icon from "@/components/icons/Icon";
import Fugenkreuz from "@/components/kern/Fugenkreuz";
import { knopfKlassen, linkKlassen, etikettKlassen } from "@/components/kern/stile";
import { KARTE_HOEHE, ServiceKurzprofil, ServiceStadtleiste } from "@/components/maps/ServiceMapWrapper";
import {
  CITY_HUB_DATA,
  CITY_COORDINATES,
  TEZGEL_HQ_COORDS,
  TEZGEL_SERVICE_RADIUS_KM,
  getDirectionsUrl,
  getOsmEmbedUrl,
} from "@/lib/maps/getMapEmbedUrl";
import { triggerHaptic } from "@/lib/haptics";

const ASSLAR_CENTER = TEZGEL_HQ_COORDS;
const DEFAULT_ZOOM = 10;
/** Ringe bei 10 km, 25 km und dem Einsatzradius, maßstäblich im Raster ±160 */
const RINGE = [10, 25, TEZGEL_SERVICE_RADIUS_KM].map((km) => Math.round((km / TEZGEL_SERVICE_RADIUS_KM) * 160));

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
 * Google-Maps-Fläche mit Markierungen je Einsatzort (mit API-Schlüssel).
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
    <div className="relative h-full w-full">
      <Map
        mapId="DEMO_MAP_ID"
        defaultCenter={ASSLAR_CENTER}
        defaultZoom={DEFAULT_ZOOM}
        gestureHandling="cooperative"
        disableDefaultUI={false}
        internalUsageAttributionIds={["gmp_git_agentskills_v1"]}
        className="h-full w-full"
      >
        <CameraController targetCoords={CITY_COORDINATES[selectedSlug] || null} />

        {/* Firmensitz */}
        <AdvancedMarker
          position={ASSLAR_CENTER}
          title="Fliesenverlegung Tezgel (Hauptsitz Aßlar)"
          onClick={() => handleMarkerClick("asslar")}
        >
          <Pin background="var(--color-laser)" borderColor="var(--color-fliese)" glyphColor="var(--color-fliese)" scale={1.25} />
        </AdvancedMarker>

        {/* Satelliten-Orte */}
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
                background={isSelected ? "var(--color-laser)" : "var(--color-fliese)"}
                borderColor="var(--color-laser)"
                glyphColor={isSelected ? "var(--color-fliese)" : "var(--color-laser)"}
                scale={isSelected ? 1.15 : 0.85}
              />
            </AdvancedMarker>
          );
        })}

        {/* Infofenster für den gewählten Ort */}
        {infoOpen && (
          <InfoWindow
            position={CITY_COORDINATES[selectedSlug] || ASSLAR_CENTER}
            onCloseClick={() => setInfoOpen(false)}
          >
            <div className="p-1 font-text">
              <div className="font-mono text-fs-1 text-laser-tief">
                {selectedCity.distanceKm === 0 ? "Firmensitz" : `ca. ${selectedCity.distanceKm} km`}
              </div>
              <h4 className="font-text text-fs-2 font-semibold text-tinte">{selectedCity.name}</h4>
              <p className="mt-1 font-text text-fs-1 text-tinte-2">{selectedCity.tagline}</p>
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-fuge pt-2">
                <span className="font-mono text-fs-1 text-tinte">{selectedCity.driveTimeText}</span>
                <a
                  href={getDirectionsUrl(`${selectedCity.name}, Hessen`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(linkKlassen, "inline-flex items-center gap-1 font-semibold text-fs-1")}
                >
                  <span>Route</span>
                  <Icon name="link-extern" groesse={4} />
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
 * Schematischer Radar ohne API-Schlüssel: Ringe, Laserachse durch den Firmensitz, Umschalter auf OpenStreetMap.
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
      <div className="relative h-full w-full">
        <iframe
          title={`OpenStreetMap Ansicht ${selectedCity.name}`}
          src={osmUrl}
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-full w-full border-0"
        />
        <div className="absolute left-4 top-4 z-10">
          <button type="button" onClick={() => setShowOsmTiles(false)} className={knopfKlassen("neben")} data-motion="druck">
            <span>Vektor-Radar anzeigen</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-kalk">
      <svg
        viewBox="-200 -200 400 400"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 h-full w-full"
      >
        {RINGE.map((r) => (
          <circle
            key={r}
            cx={0}
            cy={0}
            r={r}
            fill="none"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            className="stroke-strich"
          />
        ))}
        <line x1={-200} y1={0} x2={200} y2={0} strokeWidth={2} vectorEffect="non-scaling-stroke" className="stroke-laser" />
        <line x1={0} y1={-200} x2={0} y2={200} strokeWidth={2} vectorEffect="non-scaling-stroke" className="stroke-laser" />
      </svg>

      <div className="absolute inset-x-4 top-4 z-10 flex flex-wrap items-start justify-between gap-2">
        <span className={clsx(etikettKlassen, "border border-fuge bg-fliese px-3 py-1")}>
          <Icon name="haken" groesse={4} />
          <span>Einsatzgebiet 45 km Mittelhessen</span>
        </span>
        <button type="button" onClick={() => setShowOsmTiles(true)} className={knopfKlassen("neben")} data-motion="druck">
          <span>Straßenkarte (OSM)</span>
        </button>
      </div>

      <button
        type="button"
        onClick={() => onSelectCity("asslar")}
        className={clsx(knopfKlassen("neben"), "relative z-20")}
        data-motion="druck"
      >
        <Fugenkreuz className="size-3 text-laser" />
        <span>Aßlar (Firmensitz)</span>
      </button>

      <div className="absolute inset-x-4 bottom-4 z-10 flex flex-wrap gap-x-4 gap-y-2 font-mono text-fs-1 text-tinte-2">
        <span>10 km</span>
        <span>25 km</span>
        <span>{TEZGEL_SERVICE_RADIUS_KM} km Einsatzradius</span>
      </div>
    </div>
  );
}

/**
 * Die Karte selbst: Google-Karte mit Schlüssel, sonst Radar. Sie liegt im Einwilligungs-Tor und lädt in
 * ServiceMapWrapper erst nach Einwilligung und im Blick nach.
 */
export function ServiceKarteInhalt({
  selectedSlug,
  onSelectCity,
}: {
  selectedSlug: string;
  onSelectCity: (slug: string) => void;
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY;

  if (apiKey) {
    return (
      <APIProvider apiKey={apiKey}>
        <ModernGoogleMapsCanvas selectedSlug={selectedSlug} onSelectCity={onSelectCity} />
      </APIProvider>
    );
  }
  return <InteractiveRadarCanvas selectedSlug={selectedSlug} onSelectCity={onSelectCity} />;
}

/**
 * Einwilligungs-Tor mit der Karte (Rahmen, Texte, Knöpfe). Die Stadtleiste und das Kurzprofil stehen in
 * ServiceMapWrapper, damit sie beim Laden der Karte nicht nachwachsen (kein Sprung).
 */
export function ServiceKarte({
  selectedSlug,
  onSelectCity,
}: {
  selectedSlug: string;
  onSelectCity: (slug: string) => void;
}) {
  const currentCity = CITY_HUB_DATA[selectedSlug] || CITY_HUB_DATA.asslar;

  return (
    <MapConsentGate
      title={`Einsatzgebiet Fliesenverlegung Tezgel – ${currentCity.name}`}
      height={KARTE_HOEHE}
      className="w-full"
    >
      <ServiceKarteInhalt selectedSlug={selectedSlug} onSelectCity={onSelectCity} />
    </MapConsentGate>
  );
}

/**
 * Einsatzgebiet als Ganzes (Stadtleiste, Karte, Kurzprofil) mit eigener Auswahl.
 */
export default function InteractiveServiceMap({ className = "" }: { className?: string }) {
  const [selectedSlug, setSelectedSlug] = useState<string>("asslar");
  const [, startTransition] = useTransition();

  const handleSelectCity = useCallback((slug: string) => {
    startTransition(() => {
      setSelectedSlug(slug);
    });
  }, []);

  return (
    <div className={clsx("w-full", className)}>
      <ServiceStadtleiste selectedSlug={selectedSlug} onSelectCity={handleSelectCity} />
      <ServiceKarte selectedSlug={selectedSlug} onSelectCity={handleSelectCity} />
      <ServiceKurzprofil selectedSlug={selectedSlug} />
    </div>
  );
}
