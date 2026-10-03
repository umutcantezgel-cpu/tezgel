import React from "react";
import { Star } from "lucide-react";
import GoogleIcon from "@/components/ui/GoogleIcon";
import { RATING_SUMMARY } from "@/config/reviews";

interface GoogleReviewsBadgeProps {
  rating?: number;
  count?: number;
  className?: string;
}

export default function GoogleReviewsBadge({
  rating = RATING_SUMMARY.google.rating,
  count = RATING_SUMMARY.google.count,
  className = "",
}: GoogleReviewsBadgeProps) {
  return (
    <a
      href="https://www.google.com/search?q=Fliesenverlegung+Tezgel+A%C3%9Flar+Bewertungen"
      target="_blank"
      rel="noopener noreferrer"
      title="Zu den Google Bewertungen von Fliesenverlegung Tezgel"
      className={`inline-flex items-center gap-3.5 rounded-full bg-white px-5 py-2.5 shadow-sm border border-neutral-200/90 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer ${className}`}
    >
      <div className="flex items-center justify-center w-8 h-8 bg-neutral-100 rounded-full shrink-0">
        <GoogleIcon size={18} />
      </div>
      <div>
        <div className="flex items-center gap-1.5 leading-none">
          <span className="font-extrabold text-neutral-900 text-sm sm:text-base">
            {rating.toFixed(1).replace(".", ",")}
          </span>
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
            ))}
          </div>
        </div>
        <div className="text-[11px] font-semibold text-neutral-700 mt-1">
          {count} verifizierte Google-Rezensionen
        </div>
      </div>
    </a>
  );
}
