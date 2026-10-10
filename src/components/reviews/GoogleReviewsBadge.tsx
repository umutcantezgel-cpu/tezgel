import React from "react";
import GoogleIcon from "@/components/ui/GoogleIcon";
import { RATING_SUMMARY } from "@/config/reviews";

interface GoogleReviewsBadgeProps {
  rating?: number;
  count?: number;
  className?: string;
  /** als Feld in einem Raster an der Fuge (ohne eigenen Rahmen, volle Breite) */
  imRaster?: boolean;
}

// Kennwert-Link (KERN K-009): eckig an der Fuge, das Google-Logo in Form und Farbe, der Wert in der
// Anzeigeschrift, Sterne als „x von 5“ und die Anzahl in Mono (wie ReviewCard). Hover wechselt nur die Randfarbe.
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
        <span aria-hidden="true" className="font-anzeige text-fs-5 font-semibold">
          {wert}
        </span>
        <span className="font-mono text-fs-1 text-tinte-2">{wert} von 5</span>
        <span className="font-mono text-fs-1 text-tinte-2">{count} Google-Rezensionen</span>
      </span>
    </a>
  );
}
