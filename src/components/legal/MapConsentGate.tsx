"use client";

import type { CSSProperties } from "react";
import clsx from "clsx";
import { useKartenEinwilligung } from "@/lib/formulare/useKartenEinwilligung";
import Icon from "@/components/icons/Icon";
import { etikettKlassen, knopfKlassen } from "@/components/kern/stile";

interface MapConsentGateProps {
  children?: React.ReactNode;
  src?: string;
  title?: string;
  className?: string;
  height?: string | number;
  /** gezeichnete Vorschau im Platzhalter (dekorativ, ab md), z. B. das Einzugsband – statt leerer Fläche */
  vorschau?: React.ReactNode;
  /** ab welcher Breite die Vorschau erscheint (Standard md); schmale Kartenflächen zeigen sie erst ab xl */
  vorschauAb?: "md" | "xl";
}

export function MapConsentGate({
  children,
  src,
  title = "Google Maps Standort",
  className = "",
  height = "420px",
  vorschau,
  vorschauAb = "md",
}: MapConsentGateProps) {
  // Einwilligungslogik (Hydrierung, Zustimmung per Klick, Marketing-Kategorie, Einstellungen öffnen) im gemeinsamen
  // Hook useKartenEinwilligung (P3-00l) – dieselbe Logik wie die Kern-Ansicht; hier nur das Markup.
  const { isHydrated, hasConsent: eingewilligt, handleAccept, openSettings } = useKartenEinwilligung();

  // Ein Rahmen mit fester Höhe für Platzhalter und geladene Karte: kein Sprung beim Laden (CLS).
  const rahmen = clsx("karten-hoehe relative w-full overflow-hidden border border-fuge bg-fliese", className);
  const rahmenStil = {
    "--karten-hoehe": typeof height === "number" ? `${height}px` : height,
  } as CSSProperties;

  // Vor der Hydrierung (Server und erster Browserlauf) gilt noch keine Einwilligung: das Einwilligungs-Tor mit Texten
  // und Knöpfen steht sofort im Dokument; die Karte erscheint erst danach und nur mit Einwilligung.
  const hasConsent = isHydrated && eingewilligt;

  if (hasConsent) {
    if (children) {
      return (
        <div className={rahmen} style={rahmenStil}>
          <div className="h-full w-full">{children}</div>
        </div>
      );
    }
    if (src) {
      return (
        <div className={rahmen} style={rahmenStil}>
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={src}
            title={title}
            className="block h-full w-full border-0"
          />
        </div>
      );
    }
  }

  return (
    <div className={rahmen} style={rahmenStil}>
      <div className="flex h-full flex-col p-6">
        <span className={etikettKlassen}>
          <Icon name="schloss" groesse={4} />
          Karte
        </span>
        {vorschau && (
          <div aria-hidden="true" className={clsx("hidden min-h-0 flex-1 overflow-hidden pt-4", vorschauAb === "xl" ? "xl:block" : "md:block")}>
            {vorschau}
          </div>
        )}
        <div
          className={
            vorschau
              ? "flex flex-col items-center justify-center gap-4 py-6 text-center md:items-start md:border-t md:border-fuge md:pb-0 md:pt-4 md:text-left"
              : "flex flex-1 flex-col items-center justify-center gap-4 py-6 text-center"
          }
        >
          <p className="font-text text-fs-3 font-semibold text-tinte">Interaktive Karte geschützt (DSGVO)</p>
          <p className="max-w-md font-text text-fs-2 text-tinte-2">
            Um die interaktive Google Maps Karte mit Standorten und Routen anzuzeigen, ist Ihre Einwilligung in externe
            Medien erforderlich.
          </p>
          <div className={clsx("flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center", vorschau && "md:justify-start")}>
            <button type="button" onClick={handleAccept} className={knopfKlassen("haupt", "w-full sm:w-auto")} data-motion="druck">
              Karte laden & zustimmen
            </button>
            <button type="button" onClick={openSettings} className={knopfKlassen("neben", "w-full sm:w-auto")} data-motion="druck">
              Cookie-Einstellungen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapConsentGate;
