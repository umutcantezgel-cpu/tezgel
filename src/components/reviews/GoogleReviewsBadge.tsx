import React from "react";
import GoogleIcon from "@/components/ui/GoogleIcon";
import Icon from "@/components/icons/Icon";
import { RATING_SUMMARY } from "@/config/reviews";

interface GoogleReviewsBadgeProps {
  rating?: number;
  count?: number;
  className?: string;
  /** als Feld in einem Raster an der Fuge (ohne eigenen Rahmen, volle Breite) */
  imRaster?: boolean;
}

// Kennwert-Link (KERN K-009): eckig an der Fuge, das Google-Logo in Form und Farbe, der Wert in der
// Anzeigeschrift mit „von 5“ in Mono dahinter (einmal, nicht doppelt) und die Anzahl in Mono (wie ReviewCard); im
// Raster mit Verweiszeichen am rechten Rand (externer Link). Hover wechselt nur die Randfarbe bzw. den Unterstrich.
export default function GoogleReviewsBadge({
  rating = RATING_SUMMARY.google.rating,
  count = RATING_SUMMARY.google.count,
  className = "",
  imRaster = false,
}: GoogleReviewsBadgeProps) {
  const wert = rating.toFixed(1).replace(".", ",");
  return (
    <a
      href="https://www.google.com/search?q=Fliesenverlegung+Tezgel+A%C3%9Flar+Bewertungen"
      target="_blank"
      rel="noopener noreferrer"
      title="Zu den Google Bewertungen von Fliesenverlegung Tezgel"
      data-motion="zustand"
      className={`${imRaster ? "flex w-full items-center gap-4 bg-fliese px-4 py-4 text-tinte underline decoration-transparent underline-offset-4 hover:decoration-tinte" : "inline-flex items-center gap-4 rounded-none border border-strich bg-fliese p-4 text-tinte hover:border-tinte lg:p-6"} ${className}`}
    >
      <GoogleIcon size={24} className="shrink-0" />
      <span className="flex flex-col">
        <span className="font-anzeige text-fs-5 font-semibold">
          {wert} <span className="font-mono text-fs-1 font-normal text-tinte-2">von 5</span>
        </span>
        <span className="font-mono text-fs-1 text-tinte-2">{count} Google-Rezensionen</span>
      </span>
      {imRaster && <Icon name="link-extern" groesse={5} className="ml-auto shrink-0 text-tinte-2" />}
    </a>
  );
}
