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
  /** gezeichnete Vorschau im Platzhalter (dekorativ), z. B. das Einzugsband – statt leerer Fläche */
  vorschau?: React.ReactNode;
  /** ab welcher Breite die Vorschau erscheint: „immer“ auch mobil (dort nach dem Einwilligungstext), sonst ab md bzw. xl (Standard md) */
  vorschauAb?: "immer" | "md" | "xl";
  /**
   * Höhe des Platzhalters. fest (Standard): Platzhalter und Karte haben `height` (kein Sprung, CLS).
   * inhalt: der Platzhalter folgt dem Inhalt – unter md ohne Mindesthöhe, ab md mindestens `height`; die geladene
   * Karte bleibt auf `height`.
   */
  hoehenModus?: "fest" | "inhalt";
}

/** Sichtbarkeit der Vorschau je Breite; „immer“ steht mobil nach dem Einwilligungstext (order), mit Fuge darüber. */
const VORSCHAU_KLASSEN = {
  immer: "block max-md:order-last max-md:border-t max-md:border-fuge",
  md: "hidden md:block",
  xl: "hidden xl:block",
} as const;

export function MapConsentGate({
  children,
  src,
  title = "Google Maps Standort",
  className = "",
  height = "420px",
  vorschau,
  vorschauAb = "md",
  hoehenModus = "fest",
}: MapConsentGateProps) {
  // Einwilligungslogik (Hydrierung, Zustimmung per Klick, Marketing-Kategorie, Einstellungen öffnen) im gemeinsamen
  // Hook useKartenEinwilligung (P3-00l) – dieselbe Logik wie die Kern-Ansicht; hier nur das Markup.
  const { isHydrated, hasConsent: eingewilligt, handleAccept, openSettings } = useKartenEinwilligung();

  // Ein Rahmen mit fester Höhe für Platzhalter und geladene Karte: kein Sprung beim Laden (CLS).
  const rahmen = clsx("karten-hoehe relative w-full overflow-hidden border border-fuge bg-fliese", className);
  // Platzhalter mit Inhaltshöhe: ein Raster mit zwei Elementen in einer Zelle – eine leere Fläche mit der Höhe `height`
  // (nur ab md) und der Inhalt. Die Zeile ist so hoch wie der größere der beiden: unter md folgt sie dem Inhalt,
  // ab md wächst sie nicht unter `height`, und sie wächst mit der Vorschau, wenn die nicht mehr hineinpasst.
  // Die Fuge liegt als Umriss innen (kein Rand): ein Rand würde die Höhe um 2 px über die der geladenen Karte heben (CLS).
  // h-full: in einem gestreckten Elternteil (Kartenspalte ab lg) füllt der Platzhalter die Spalte; sonst folgt er dem Inhalt.
  const rahmenInhalt = clsx("relative grid h-full w-full overflow-hidden bg-fliese outline outline-1 -outline-offset-1 outline-fuge", className);
  const rahmenStil = {
    "--karten-hoehe": typeof height === "number" ? `${height}px` : height,
  } as CSSProperties;

  // Vor der Hydrierung (Server und erster Browserlauf) gilt noch keine Einwilligung: das Einwilligungs-Tor mit Texten
  // und Knöpfen steht sofort im Dokument; die Karte erscheint erst danach und nur mit Einwilligung.
  const hasConsent = isHydrated && eingewilligt;
  const inhaltshoehe = hoehenModus === "inhalt";

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
    <div className={inhaltshoehe ? rahmenInhalt : rahmen} style={rahmenStil}>
      {inhaltshoehe && <div aria-hidden="true" className="karten-hoehe col-start-1 row-start-1 hidden md:block" />}
      <div className={inhaltshoehe ? "col-start-1 row-start-1 flex flex-col p-6" : "flex h-full flex-col p-6"}>
        <span className={etikettKlassen}>
          <Icon name="schloss" groesse={4} />
          Karte
        </span>
        {vorschau && (
          <div aria-hidden="true" className={clsx("min-h-0 flex-1 overflow-hidden pt-4", VORSCHAU_KLASSEN[vorschauAb])}>
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
