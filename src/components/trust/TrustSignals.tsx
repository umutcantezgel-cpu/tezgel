import React from "react";
import { ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustItem {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

const defaultItems: TrustItem[] = [
  { icon: ShieldCheck, text: "Kostenlos & unverbindlich" },
  { icon: Clock, text: "Antwort in der Regel binnen 24h" },
  { icon: CheckCircle2, text: "Vor-Ort-Aufmaß ohne Risiko" },
];

const craftItems: TrustItem[] = [
  { icon: ShieldCheck, text: "Verbindliche Festpreis-Garantie" },
  { icon: CheckCircle2, text: "DIN 18534 Abdichtung" },
  { icon: Clock, text: "Pünktliche Baustellen-Termine" },
];

interface TrustSignalsProps {
  variant?: "inline" | "stacked";
  preset?: "default" | "craft";
  items?: TrustItem[];
  className?: string;
}

export default function TrustSignals({
  variant = "inline",
  preset = "default",
  items,
  className,
}: TrustSignalsProps) {
  const resolvedItems = items ?? (preset === "craft" ? craftItems : defaultItems);

  return (
    <div
      className={cn(
        "flex gap-x-4 gap-y-2 text-xs sm:text-sm font-medium text-neutral-600",
        variant === "inline"
          ? "flex-wrap items-center justify-center"
          : "flex-col items-start",
        className
      )}
      role="list"
      aria-label="Vertrauenssignale"
    >
      {resolvedItems.map((item, idx) => (
        <div key={idx} className="flex items-center gap-1.5" role="listitem">
          <item.icon
            className="h-4 w-4 text-emerald-600 shrink-0"
            aria-hidden="true"
          />
          <span>{item.text}</span>
          {variant === "inline" && idx < resolvedItems.length - 1 && (
            <span className="text-neutral-300 ml-2 hidden sm:inline" aria-hidden="true">·</span>
          )}
        </div>
      ))}
    </div>
  );
}
