import React from "react";
import { Check } from "lucide-react";

interface PriceCardProps {
  title: string;
  price: number | string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export default function PriceCard({
  title,
  price,
  description,
  features,
  isPopular = false,
  ctaText = "Vor-Ort-Aufmaß anfordern",
  ctaHref = "/kontakt#express-anfrage",
}: PriceCardProps) {
  return (
    <div
      className={`group relative flex flex-col rounded-3xl bg-white p-7 sm:p-8 transition-all duration-300 overflow-hidden ${
        isPopular
          ? "border-2 border-orange-500 shadow-xl ring-2 ring-orange-500/10 hover:-translate-y-1.5"
          : "border border-neutral-200 shadow-sm hover:shadow-md hover:-translate-y-1"
      }`}
    >
      {isPopular && (
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500" />
      )}

      {isPopular && (
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 bg-orange-600 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Empfohlener Standard
          </span>
        </div>
      )}

      <div className="mb-5">
        <h3 className="text-xl font-bold text-neutral-900 tracking-tight">{title}</h3>
        <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{description}</p>
      </div>

      <div className="mb-6 flex items-baseline gap-1">
        <span className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
          {typeof price === "number" ? `ab ${price} €` : price}
        </span>
        {typeof price === "number" && (
          <span className="text-xs font-semibold text-neutral-500">/ m² Richtpreis</span>
        )}
      </div>

      <ul className="space-y-3 mb-8 flex-1 text-sm text-neutral-700">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mt-0.5 border border-orange-200/60">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="leading-snug">{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={ctaHref}
        className={`w-full py-3 px-4 rounded-xl text-center text-sm font-bold transition-all ${
          isPopular
            ? "bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-950/20"
            : "bg-neutral-100 hover:bg-neutral-200 text-neutral-900"
        }`}
      >
        {ctaText}
      </a>
    </div>
  );
}
