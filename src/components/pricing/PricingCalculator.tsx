"use client";

import { useState } from "react";
import {
  CRAFT_SERVICES,
  ROOM_SIZES,
  ADDON_OPTIONS,
  type CraftServiceType,
  type RoomSizeType,
} from "./pricing.constants";
import {
  Bath,
  Maximize2,
  Home,
  Sun,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Ruler,
  Sparkles,
} from "lucide-react";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import HeartbeatCTA from "@/components/animations/HeartbeatCTA";
import { siteConfig } from "@/lib/config";
import { triggerHaptic } from "@/lib/haptics";

const SERVICE_ICONS: Record<CraftServiceType, React.ElementType> = {
  bad: Bath,
  grossformat: Maximize2,
  wohnbereich: Home,
  balkon: Sun,
  abdichtung: ShieldCheck,
};

export default function PricingCalculator() {
  const [serviceType, setServiceType] = useState<CraftServiceType>("bad");
  const [roomSize, setRoomSize] = useState<RoomSizeType>("medium");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["staubschutz"]);

  const toggleAddon = (id: string) => {
    triggerHaptic("light");
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedService = CRAFT_SERVICES[serviceType];
  const selectedSize = ROOM_SIZES[roomSize];

  const calculatedBase =
    selectedService.fixedBase +
    selectedService.basePricePerSqm * selectedSize.approxSqm;

  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = ADDON_OPTIONS.find((a) => a.id === addonId);
    return sum + (addon ? addon.cost : 0);
  }, 0);

  const totalPrice = Math.round(calculatedBase + addonsTotal);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-neutral-200/90 overflow-hidden max-w-5xl mx-auto flex flex-col lg:flex-row">
      {/* ── Left Panel: Interactive Toggles ── */}
      <div className="flex-[3] p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-neutral-200 bg-neutral-50/50 flex flex-col">
        {/* Step Indicator */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              1
            </span>
            <span className="text-xs sm:text-sm font-bold text-neutral-800">Gewerk</span>
          </div>
          <div className="flex-1 h-[2px] bg-orange-200" />
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              2
            </span>
            <span className="text-xs sm:text-sm font-bold text-neutral-800">Fläche</span>
          </div>
          <div className="flex-1 h-[2px] bg-orange-200" />
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              3
            </span>
            <span className="text-xs sm:text-sm font-bold text-neutral-800">Optionen</span>
          </div>
        </div>

        {/* 1. Gewerk Auswahl */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
            1. Welches Fliesen- oder Badprojekt planen Sie?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {Object.values(CRAFT_SERVICES).map((srv) => {
              const Icon = SERVICE_ICONS[srv.id];
              const isSelected = serviceType === srv.id;
              return (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => {
                    triggerHaptic("light");
                    setServiceType(srv.id);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? "bg-white border-orange-500 ring-2 ring-orange-500/20 shadow-sm"
                      : "bg-white/80 border-neutral-200 hover:border-neutral-300 hover:bg-white"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-orange-600 text-white"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-900 leading-tight">
                      {srv.title}
                    </div>
                    <div className="text-xs text-neutral-500 mt-0.5 leading-snug">
                      {srv.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Raumgröße / Fläche */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
            2. Geschätzte Grundfläche:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.values(ROOM_SIZES).map((size) => {
              const isSelected = roomSize === size.id;
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => {
                    triggerHaptic("light");
                    setRoomSize(size.id);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white border-orange-500 ring-2 ring-orange-500/20 shadow-sm"
                      : "bg-white/80 border-neutral-200 hover:border-neutral-300 hover:bg-white"
                  }`}
                >
                  <div className="text-xs font-bold text-neutral-900">{size.label}</div>
                  <div className="text-[11px] font-semibold text-orange-600 mt-0.5">
                    {size.areaText}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Zusatzoptionen */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
            3. Zusatzleistungen & Vorbereitungen:
          </label>
          <div className="space-y-2">
            {ADDON_OPTIONS.map((addon) => {
              const isChecked = selectedAddons.includes(addon.id);
              return (
                <button
                  key={addon.id}
                  type="button"
                  onClick={() => toggleAddon(addon.id)}
                  className={`w-full p-2.5 sm:p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                    isChecked
                      ? "bg-orange-50/70 border-orange-300 text-neutral-900"
                      : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        isChecked
                          ? "bg-orange-600 border-orange-600 text-white"
                          : "border-neutral-300 bg-white"
                      }`}
                    >
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs sm:text-sm font-medium">{addon.label}</span>
                  </div>
                  <span className="text-xs font-bold text-neutral-900 shrink-0">
                    +{addon.cost} €
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Right Panel: Price Display & Immediate Conversion ── */}
      <div className="flex-[2] p-6 sm:p-8 lg:p-10 bg-neutral-900 text-white flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/30 text-orange-400 border border-orange-500/30 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparenter Vorab-Richtwert</span>
          </div>

          <div className="text-xs text-neutral-400 font-medium">Kalkulierter Richtwert ab:</div>
          <div className="text-4xl sm:text-5xl font-black text-white tracking-tight my-2 flex items-baseline gap-1">
            <span>ca.</span>
            <AnimatedNumber value={totalPrice} />
            <span className="text-2xl font-bold text-orange-400">€</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed mb-6">
            Inkl. Verlegematerialien, Facharbeit & Vorbereitung. Exakter Endpreis nach
            kostenfreiem Vor-Ort-Aufmaß in Aßlar, Wetzlar & Hessen.
          </p>

          <div className="space-y-2.5 border-t border-neutral-800 pt-5 text-xs text-neutral-300">
            <div className="flex items-center justify-between">
              <span>Vor-Ort-Aufmaß & Schadensanalyse:</span>
              <span className="font-bold text-emerald-400">0 € (Kostenfrei)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Gewerk:</span>
              <span className="font-semibold text-white">{selectedService.title}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Größe:</span>
              <span className="font-semibold text-white">{selectedSize.areaText}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Festpreis-Garantie:</span>
              <span className="font-semibold text-emerald-400">Inklusive</span>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <HeartbeatCTA className="w-full">
            <a
              href={siteConfig.contact.phone.link}
              onClick={() => triggerHaptic("medium")}
              className="flex items-center justify-center gap-2 w-full h-13 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-950/50 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Angebot telefonisch besprechen</span>
            </a>
          </HeartbeatCTA>

          <a
            href="/kontakt#express-anfrage"
            className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-white/10 hover:bg-white/15 text-neutral-200 text-xs font-semibold border border-white/10 transition-colors"
          >
            <Ruler className="w-3.5 h-3.5 text-orange-400" />
            <span>Kostenfreies Vor-Ort-Aufmaß buchen</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export { PricingCalculator };
