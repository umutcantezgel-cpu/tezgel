"use client";

import React, { useState, useMemo, useCallback } from "react";
import clsx from "clsx";
import { APIProvider, Map, AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import { CITIES } from "@/config/cities";
import { COMPANY_DATA } from "@/config/company";
import MapConsentGate from "@/components/legal/MapConsentGate";
import Einzugsband from "@/components/kern/Einzugsband";
import { ZONEN } from "@/lib/einzugszonen";
import Icon from "@/components/icons/Icon";
import { etikettKlassen, feldKlassen, knopfKlassen } from "@/components/kern/stile";
import { triggerHaptic } from "@/lib/haptics";
import {
  CITY_HUB_DATA,
  CITY_COORDINATES,
  TEZGEL_HQ_COORDS,
  getMapEmbedUrl,
  getDirectionsUrl,
} from "@/lib/maps/getMapEmbedUrl";

/** Kartenhöhe auf Smartphone-Breite; ab lg füllt die Fläche die Höhe der linken Spalte. */
const KARTE_HOEHE = "440px";

// Entfernungsfilter mit denselben Zonen wie das Einzugsband (≤ 10 / ≤ 25 / ≤ 50 km, src/lib/einzugszonen.ts)
const ENTFERNUNGEN: { label: string; val: number | null }[] = [
  { label: "Alle", val: null },
  ...ZONEN.map((z) => ({ label: z.etikett, val: z.bis })),
];

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

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY;

  const filteredCities = useMemo(() => {
    return CITIES.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.region.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDistance = distanceFilter === null || c.distanceKm <= distanceFilter;
      return matchesSearch && matchesDistance;
    });
  }, [searchTerm, distanceFilter]);

  const currentHub = CITY_HUB_DATA[selectedSlug] || CITY_HUB_DATA.asslar;
  const targetCoords = CITY_COORDINATES[selectedSlug] || TEZGEL_HQ_COORDS;

  const addressQuery =
    selectedSlug === "asslar" ? COMPANY_DATA.headquarters.fullAddress : `${currentHub.name}, Hessen, Deutschland`;

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
    <div className={clsx("flex w-full flex-col border border-fuge bg-fliese lg:flex-row", className)}>
      {/* Links: Standort, Suche, Stadtliste, Kurzprofil des gewählten Ortes */}
      <div className="flex w-full shrink-0 flex-col justify-between gap-6 border-b border-fuge bg-kalk p-4 sm:p-6 lg:w-2/5 lg:border-b-0 lg:border-r">
        <div className="flex flex-col gap-4">
          <p className={etikettKlassen}>
            <Icon name="ort" groesse={4} />
            <span>Standort & Einsatzradius</span>
          </p>
          <h3 className="font-text text-fs-4 font-semibold text-tinte">Mittelhessen vor Ort</h3>
          <p className="font-text text-fs-2 text-tinte-2">
            Firmensitz Aßlar – täglicher Einsatz in Wetzlar, Gießen & Lahn-Dill.
          </p>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Icon name="suche" groesse={4} className="text-tinte-2" />
            </div>
            <input
              type="text"
              aria-label="Stadt oder Kreis filtern"
              placeholder="Stadt oder Kreis filtern..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={clsx(feldKlassen, "pl-12")}
            />
          </div>

          {/* Filterzeile: vier gleich breite Spalten im 1-px-Raster (Strich), eine Zeile auch bei 390 px */}
          <div className="grid grid-cols-4 divide-x divide-strich border border-strich">
            {ENTFERNUNGEN.map((f) => (
              <button
                key={f.label}
                type="button"
                aria-pressed={distanceFilter === f.val}
                onClick={() => setDistanceFilter(f.val)}
                className="min-h-11 bg-fliese px-2 py-3 text-center font-text text-fs-2 text-tinte hover:bg-kalk aria-pressed:bg-tinte aria-pressed:text-kalk"
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* genau fünf Zeilen à 44 px + Fugen (max-h-56): keine angeschnittene Zeile */}
          <ul className="max-h-56 overflow-y-auto border border-fuge bg-fliese">
            {filteredCities.map((city) => {
              const isSelected = selectedSlug === city.slug;
              return (
                <li key={city.slug} className="border-b border-fuge last:border-b-0">
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => handleSelectCity(city.slug)}
                    className="flex h-11 w-full items-center justify-between gap-3 px-3 text-left font-text text-fs-2 text-tinte hover:bg-kalk aria-pressed:bg-tinte aria-pressed:text-kalk"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <Icon name="ort" groesse={4} />
                      <span className="truncate">{city.name}</span>
                    </span>
                    <span className="shrink-0 font-mono text-fs-1">
                      {city.distanceKm === 0 ? "angrenzend" : `ca. ${city.distanceKm} km`}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t border-fuge pt-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-text text-fs-3 font-semibold text-tinte">{currentHub.name}</span>
            <span className={etikettKlassen}>
              <Icon name="uhr" groesse={4} />
              <span>{currentHub.driveTimeText}</span>
            </span>
          </div>

          <p className="mt-2 font-text text-fs-2 text-tinte-2">{currentHub.tagline}</p>

          <div className="mt-4 flex gap-3">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={knopfKlassen("haupt", "flex-1")} data-motion="druck"
            >
              <span>Route</span>
              <Icon name="link-extern" groesse={4} />
            </a>

            <a
              href={`tel:${COMPANY_DATA.contact.phoneLink}`}
              aria-label={`Fliesenverlegung Tezgel anrufen: ${COMPANY_DATA.contact.phone}`}
              className={knopfKlassen("neben", "flex-1")} data-motion="druck"
            >
              <Icon name="telefon" groesse={4} />
              <span>Anrufen</span>
            </a>
          </div>
        </div>
      </div>

      {/* Rechts: Kartenfläche hinter Einwilligung */}
      {/* Platzhalter folgt dem Inhalt (E4-NACH-12/-17, E3-SICHT-ARB Befunde 7, 10): mobil Text und Zonen ohne Leerfeld,
          ab md mindestens KARTE_HOEHE, ab lg so hoch wie die Ortsliste; die geladene Karte steht auf KARTE_HOEHE */}
      <div className="relative w-full lg:h-auto lg:min-w-0 lg:flex-1">
        <MapConsentGate
          src={embedUrl}
          title={`Google Maps Ansicht ${currentHub.name}`}
          height={KARTE_HOEHE}
          className="w-full"
          vorschau={<Einzugsband kompakt />}
          vorschauAb="immer"
          hoehenModus="inhalt"
        >
          {apiKey ? (
            <APIProvider apiKey={apiKey}>
              <div className="relative h-full w-full">
                <Map
                  mapId="DEMO_MAP_ID"
                  defaultCenter={targetCoords}
                  defaultZoom={13}
                  gestureHandling="cooperative"
                  disableDefaultUI={false}
                  internalUsageAttributionIds={["gmp_git_agentskills_v1"]}
                  className="h-full w-full"
                >
                  <ContactCameraController targetCoords={targetCoords} />

                  {/* Firmensitz */}
                  <AdvancedMarker position={TEZGEL_HQ_COORDS} title="Fliesenverlegung Tezgel HQ Aßlar">
                    <Pin
                      background="var(--color-laser)"
                      borderColor="var(--color-fliese)"
                      glyphColor="var(--color-fliese)"
                      scale={1.2}
                    />
                  </AdvancedMarker>

                  {/* Gewählter Ort, wenn nicht Aßlar */}
                  {selectedSlug !== "asslar" && (
                    <AdvancedMarker position={targetCoords} title={`Einsatzgebiet ${currentHub.name}`}>
                      <Pin
                        background="var(--color-tinte)"
                        borderColor="var(--color-laser)"
                        glyphColor="var(--color-fliese)"
                        scale={1.15}
                      />
                    </AdvancedMarker>
                  )}
                </Map>

                <div className="absolute right-4 top-4 z-10">
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={knopfKlassen("neben")} data-motion="druck"
                  >
                    <Icon name="pfeil-rechts" groesse={4} />
                    <span>Navigation starten</span>
                    <Icon name="link-extern" groesse={4} />
                  </a>
                </div>
              </div>
            </APIProvider>
          ) : (
            <div className="relative h-full w-full">
              <iframe
                title={`Kartenansicht ${currentHub.name}`}
                src={embedUrl}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-full w-full border-0"
              />
              <div className="absolute right-4 top-4 z-10">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={knopfKlassen("neben")} data-motion="druck"
                >
                  <Icon name="pfeil-rechts" groesse={4} />
                  <span>In Google Maps öffnen</span>
                  <Icon name="link-extern" groesse={4} />
                </a>
              </div>
            </div>
          )}
        </MapConsentGate>
      </div>
    </div>
  );
}
