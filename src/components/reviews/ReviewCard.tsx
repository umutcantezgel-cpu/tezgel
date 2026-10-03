import React from "react";
import { Star, CheckCircle2 } from "lucide-react";
import GoogleIcon from "@/components/ui/GoogleIcon";

export interface ReviewItem {
  id?: string;
  author?: string;
  authorName?: string;
  rating: number;
  source: string;
  topic?: string;
  text: string;
  date?: string;
  location?: string;
}

export default function ReviewCard({ review }: { review: ReviewItem }) {
  const name = review.authorName || review.author || "Kunde";
  const initial = name.charAt(0).toUpperCase();

  return (
    <article className="group flex flex-col bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-neutral-200/90 hover:border-orange-300 hover:shadow-md transition-all duration-300 shrink-0 min-w-[280px] sm:min-w-[340px] max-w-[380px] snap-center h-full relative overflow-hidden">
      {/* Primary Accent Line Top */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 group-hover:h-[4px] transition-all duration-300" />

      {/* Header: Avatar + Name + Rating */}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-full font-bold text-base shrink-0 bg-orange-100 text-orange-800 ring-2 ring-orange-200/50 shadow-xs">
            {initial}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base text-neutral-900 flex items-center gap-1.5">
              <span>{name}</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-label="Verifizierter Kunde" />
            </span>
            <div className="flex items-center gap-1.5 text-xs text-neutral-700 mt-0.5 font-medium">
              {review.topic && (
                <span className="font-semibold text-orange-800 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                  {review.topic}
                </span>
              )}
              {review.location && <span>• {review.location}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex-1 flex flex-col mt-1">
        {/* Star Rating */}
        <div className="flex gap-1 mb-3 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < review.rating ? "fill-current" : "fill-transparent text-neutral-200"}`}
              aria-hidden="true"
            />
          ))}
        </div>

        <p className="relative z-10 text-sm text-neutral-700 font-medium leading-relaxed italic line-clamp-4">
          &quot;{review.text}&quot;
        </p>
      </div>

      {/* Footer / Source */}
      <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between relative z-10">
        <span className="text-[11px] font-semibold text-neutral-700 uppercase tracking-wider">
          {review.source} Rezension
        </span>
        <GoogleIcon size={16} className="opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
    </article>
  );
}
