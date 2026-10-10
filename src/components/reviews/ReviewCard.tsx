import React from "react";
import Link from "next/link";
import GoogleIcon from "@/components/ui/GoogleIcon";
import { STIMMEN, teileAnriss } from "@/lib/stimmen";

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

// Kundenstimme (KERN K-009): wörtliches Zitat mit genau einem Anriss, Quelle und Bewertung in Mono,
// Randnotiz mit Verweis auf Tezgels Ablauf oder Leistung.
export default function ReviewCard({ review }: { review: ReviewItem }) {
  const name = review.authorName || review.author || "Kunde";
  const zusatz = review.id ? STIMMEN[review.id] : undefined;
  const teile = teileAnriss(review.text, zusatz?.anriss);

  return (
    <article className="flex h-full w-4/5 shrink-0 snap-start flex-col bg-fliese p-6 sm:w-1/2 lg:w-1/3 lg:p-8">
      <p className="flex items-center gap-2 font-mono text-fs-1 text-tinte-2">
        <span>{review.source}</span>
        {review.topic && <><span aria-hidden="true">·</span><span>{review.topic}</span></>}
      </p>
      <blockquote className="mt-4 flex-1 text-fs-3 text-tinte">
        <p>
          „{teile ? <>{teile[0]}<mark data-motion="anriss">{teile[1]}</mark>{teile[2]}</> : review.text}“
        </p>
      </blockquote>
      <footer className="mt-6 border-t border-fuge pt-4">
        <p className="flex items-center justify-between gap-3 font-text text-fs-2 font-semibold text-tinte">
          <span>{name}</span>
          <span className="flex items-center gap-2 font-mono text-fs-1 font-normal text-tinte-2">
            <span>{review.rating} von 5</span>
            {review.source === "Google" && <GoogleIcon size={16} />}
          </span>
        </p>
        {zusatz && (
          <p className="mt-3 font-mono text-fs-1 text-tinte-2">
            <span aria-hidden="true">→ </span>
            <Link href={zusatz.verweis.href} className="underline decoration-strich underline-offset-4 transition-colors dauer-1 ease-setzen hover:text-tinte hover:decoration-tinte">
              {zusatz.verweis.text}
            </Link>
          </p>
        )}
      </footer>
    </article>
  );
}
