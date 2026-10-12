"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Icon from "@/components/icons/Icon";
import { triggerHaptic } from "@/lib/haptics";
import ReviewCard, { ReviewItem } from "./ReviewCard";
import { REVIEWS } from "@/config/reviews";

interface ReviewCarouselProps {
  reviews?: ReviewItem[];
  className?: string;
  /** Zähler „n von N“ neben den Knöpfen (Startseite); Standard aus */
  zaehler?: boolean;
}

/** Index der Karte, deren linke Kante der Scrollposition am nächsten liegt. */
function naechsteKarte(el: HTMLElement): number {
  const karten = Array.from(el.children) as HTMLElement[];
  if (karten.length === 0) return 0;
  const start = karten[0].offsetLeft;
  let beste = 0;
  let abstand = Number.POSITIVE_INFINITY;
  karten.forEach((karte, i) => {
    const d = Math.abs(karte.offsetLeft - start - el.scrollLeft);
    if (d < abstand) {
      abstand = d;
      beste = i;
    }
  });
  return beste;
}

// Kundenstimmen als Feldband (KERN K-009): Felder an der Fuge, Weiter/Zurück per Knopf und Tastatur.
// Struktur bleibt für die Funktionstests: Steuerleiste > Knopfgruppe > Knöpfe, danach direkt das Band.
// E020-F-4: Karten gleich hoch (`*:h-auto`, Streckung der Zeile), Band ohne sichtbare Scrollleiste,
// optionaler Zähler „n von N“; die Zählerangabe ist erst nach einer Bedienung Live-Region.
export default function ReviewCarousel({
  reviews = REVIEWS,
  className = "",
  zaehler = false,
}: ReviewCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [erste, setErste] = useState(1);
  const [bedient, setBedient] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    setErste(naechsteKarte(el) + 1);
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
    setBedient(true);
    const el = scrollContainerRef.current;
    if (!el) return;
    const breite = el.firstElementChild instanceof HTMLElement ? el.firstElementChild.offsetWidth + 1 : el.clientWidth;
    el.scrollBy({ left: direction === "left" ? -breite : breite, behavior: "smooth" });
  };

  const knopf =
    "inline-flex size-11 items-center justify-center rounded-none border border-strich bg-fliese text-tinte transition-colors dauer-1 ease-setzen hover:border-tinte disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className={`relative w-full ${className}`}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
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
          {zaehler ? (
            <p
              aria-live={bedient ? "polite" : "off"}
              aria-atomic="true"
              className="min-w-24 text-center font-mono text-fs-1 text-tinte tabular-nums"
            >
              {erste} von {reviews.length}
            </p>
          ) : null}
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
        className="flex snap-x snap-mandatory gap-px overflow-x-auto border border-fuge bg-fuge ohne-scrollleiste *:h-auto"
        tabIndex={0}
        onKeyDown={() => setBedient(true)}
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
