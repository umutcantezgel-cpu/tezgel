"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { CITIES } from "@/config/cities";
import { siteConfig } from "@/lib/config";
import MapConsentGate from "@/components/legal/MapConsentGate";

const ASSLAR_CENTER = { lat: 50.5900, lng: 8.4600 };
const SERVICE_RADIUS_KM = 45;
const DEFAULT_ZOOM = 10;

const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
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

function MapImplementation() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY));

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return;
    }

    let isSubscribed = true;

    async function init() {
      try {
        const win = window as unknown as { __GOOGLE_MAPS_INITIALIZED__?: boolean };
        if (!win.__GOOGLE_MAPS_INITIALIZED__) {
          setOptions({ key: apiKey!, v: "weekly" });
          win.__GOOGLE_MAPS_INITIALIZED__ = true;
        }

        const { Map } = (await importLibrary("maps")) as google.maps.MapsLibrary;
        const { Marker } = (await importLibrary("marker")) as google.maps.MarkerLibrary;

        if (!mapRef.current || !isSubscribed) return;

        const map = new Map(mapRef.current, {
          center: ASSLAR_CENTER,
          zoom: DEFAULT_ZOOM,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          gestureHandling: "cooperative",
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        // 45km Service Radius around Aßlar/Wetzlar
        new google.maps.Circle({
          map,
          center: ASSLAR_CENTER,
          radius: SERVICE_RADIUS_KM * 1000,
          fillColor: "#EA580C",
          fillOpacity: 0.08,
          strokeColor: "#EA580C",
          strokeOpacity: 0.4,
          strokeWeight: 2,
        });

        const infoWindow = new google.maps.InfoWindow();

        // Place HQ Marker
        const hqMarker = new Marker({
          position: ASSLAR_CENTER,
          map,
          title: "Fliesenverlegung Tezgel (Hauptsitz Aßlar)",
        });

        hqMarker.addListener("click", () => {
          infoWindow.setContent(`
            <div style="font-family: system-ui, sans-serif; padding: 4px; max-width: 240px;">
              <strong style="color: #EA580C; font-size: 15px;">Fliesenverlegung Tezgel</strong>
              <div style="font-size: 13px; color: #404040; margin-top: 4px;">${siteConfig.company.street}, ${siteConfig.company.postalCode} ${siteConfig.company.city}</div>
              <div style="font-size: 12px; color: #16A34A; font-weight: bold; margin-top: 4px;">Firmensitz & Meisterbetrieb</div>
              <a href="/kontakt" style="display:inline-block; margin-top:8px; color:#EA580C; font-weight:bold; font-size:12px;">Kontakt & Aufmaß &rarr;</a>
            </div>
          `);
          infoWindow.open(map, hqMarker);
        });

        // Place City Markers
        CITIES.forEach((city) => {
          const coords = CITY_COORDINATES[city.slug] || ASSLAR_CENTER;
          const marker = new Marker({
            position: coords,
            map,
            title: `Einsatzgebiet ${city.name}`,
          });

          marker.addListener("click", () => {
            infoWindow.setContent(`
              <div style="font-family: system-ui, sans-serif; padding: 4px; max-width: 240px;">
                <strong style="font-size: 14px; color: #171717;">Einsatzgebiet ${city.name}</strong>
                <div style="font-size: 12px; color: #737373; margin-top: 2px;">Entfernung ca. ${city.distanceKm} km von Aßlar</div>
                <div style="font-size: 12px; color: #EA580C; font-weight: bold; margin-top: 4px;">Fliesenverlegung & Badsanierung</div>
                <a href="/standorte/${city.slug}" style="display:inline-block; margin-top:6px; color:#EA580C; font-weight:bold; font-size:12px;">Mehr Details &rarr;</a>
              </div>
            `);
            infoWindow.open(map, marker);
          });
        });

        setIsLoaded(true);
      } catch (err) {
        console.error("Google Maps load error", err);
        setHasApiKey(false);
      }
    }

    init();

    return () => {
      isSubscribed = false;
    };
  }, []);

  if (!hasApiKey) {
    // Fallback: Embed Iframe
    const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
      siteConfig.company.fullAddress
    )}&t=&z=11&ie=UTF8&iwloc=&output=embed`;

    return (
      <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-neutral-200">
        <iframe
          title="Servicegebiet Fliesenverlegung Tezgel"
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-100">
      <div ref={mapRef} className="w-full h-full" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-neutral-500 text-sm">
          Karte wird geladen...
        </div>
      )}
    </div>
  );
}

export default function InteractiveServiceMap({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <MapConsentGate
        title="Interaktives Servicegebiet Fliesenverlegung Tezgel"
        height="450px"
      >
        <MapImplementation />
      </MapConsentGate>
    </div>
  );
}
