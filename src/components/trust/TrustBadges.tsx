import React from "react";
import { Award, ShieldCheck, Check, Sparkles, Clock, Ruler } from "lucide-react";

export interface TrustBadgeItem {
  icon?: React.ElementType;
  text: string;
}

interface TrustBadgesProps {
  badges?: TrustBadgeItem[];
  className?: string;
}

const defaultBadges: TrustBadgeItem[] = [
  { icon: Award, text: "HWK Wiesbaden Fachbetrieb" },
  { icon: ShieldCheck, text: "DIN 18534 Verbundabdichtung" },
  { icon: Ruler, text: "XXL-Großformat Nivellierung" },
  { icon: Sparkles, text: "Garantierter Staubschutz" },
  { icon: Clock, text: "Termintreue & Festpreis" },
];

export default function TrustBadges({ badges = defaultBadges, className = "" }: TrustBadgesProps) {
  return (
    <div
      role="list"
      aria-label="Vertrauensvorteile"
      className={`flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-2.5 my-4 ${className}`}
    >
      {badges.map((badge, i) => {
        const IconComp = badge.icon || Check;
        return (
          <div
            key={i}
            role="listitem"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-700 bg-neutral-100/80 px-3 py-1.5 rounded-full border border-neutral-200/80 shadow-xs"
          >
            <IconComp className="h-4 w-4 text-orange-600 shrink-0" aria-hidden="true" />
            <span>{badge.text}</span>
          </div>
        );
      })}
    </div>
  );
}
