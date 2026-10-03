"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";
import ReviewCard, { ReviewItem } from "./ReviewCard";
import { REVIEWS } from "@/config/reviews";

interface ReviewCarouselProps {
  reviews?: ReviewItem[];
  className?: string;
}

export default function ReviewCarousel({
  reviews = REVIEWS,
  className = "",
}: ReviewCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    triggerHaptic("light");
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -360 : 360;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Scroll Controls */}
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
          Echte Kundenstimmen aus Mittelhessen
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Vorherige Rezensionen"
            className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Nächste Rezensionen"
            className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Cards track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {reviews.map((rev, idx) => (
          <ReviewCard key={rev.id || idx} review={rev} />
        ))}
      </div>
    </div>
  );
}
