"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Icon from "@/components/icons/Icon";
import { triggerHaptic } from "@/lib/haptics";
import ReviewCard, { ReviewItem } from "./ReviewCard";
import { REVIEWS } from "@/config/reviews";

interface ReviewCarouselProps {
  reviews?: ReviewItem[];
  className?: string;
}

// Kundenstimmen als Feldband (KERN K-009): Felder an der Fuge, Weiter/Zurück per Knopf und Tastatur.
// Struktur bleibt für die Funktionstests: Steuerleiste > Knopfgruppe > Knöpfe, danach direkt das Band.
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
    const breite = el.firstElementChild instanceof HTMLElement ? el.firstElementChild.offsetWidth + 1 : el.clientWidth;
    el.scrollBy({ left: direction === "left" ? -breite : breite, behavior: "smooth" });
  };

  const knopf =
    "inline-flex size-11 items-center justify-center rounded-none border border-strich bg-fliese text-tinte transition-colors dauer-1 ease-setzen hover:border-tinte disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className={`relative w-full ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="font-mono text-fs-1 text-tinte-2">
          Echte Kundenstimmen aus Mittelhessen
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Vorherige Rezensionen"
            className={knopf}
            data-motion="druck"
          >
            <Icon name="pfeil-rechts" className="-scale-x-100" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Nächste Rezensionen"
            className={knopf}
            data-motion="druck"
          >
            <Icon name="pfeil-rechts" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex snap-x snap-mandatory gap-px overflow-x-auto border border-fuge bg-fuge ohne-scrollleiste"
        tabIndex={0}
        role="region"
        aria-label="Kundenstimmen"
      >
        {reviews.map((rev, idx) => (
          <ReviewCard key={rev.id || idx} review={rev} />
        ))}
      </div>
    </div>
  );
}
