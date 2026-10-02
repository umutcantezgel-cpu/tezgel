"use client";

import { ShieldCheck, Award, Ruler, Sparkles, CheckCircle2, Star, MapPin } from "lucide-react";

export default function TrustStrip() {
  const trustItems = [
    { icon: MapPin, text: "Aßlar & Wetzlar regional vor Ort" },
    { icon: Award, text: "Eingetragener HWK Wiesbaden Fachbetrieb" },
    { icon: ShieldCheck, text: "DIN 18534 Verbundabdichtung" },
    { icon: Ruler, text: "XXL-Großformat Nivelliertechnik" },
    { icon: Sparkles, text: "Staubschutz & Sauberkeits-Garantie" },
    { icon: CheckCircle2, text: "Verbindliche Festpreis-Kalkulation" },
    { icon: Star, text: "5,0 Google-Bewertungen (27 Rezensionen)" },
  ];

  const track = [...trustItems, ...trustItems];

  return (
    <section
      aria-label="Vertrauenssignale und Meister-Garantien"
      className="bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-2xl shadow-sm h-14 sm:h-16 flex items-center overflow-hidden relative z-20 w-full mx-auto"
    >
      <h2 className="sr-only">Vertrauenssignale und Meister-Garantien</h2>

      <div className="flex w-full overflow-hidden trust-strip-mask group">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-active:[animation-play-state:paused] items-center py-2">
          {track.map((item, idx) => {
            const isClone = idx >= trustItems.length;
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 sm:gap-2.5 shrink-0 px-3 sm:px-4 md:px-5"
                aria-hidden={isClone ? "true" : undefined}
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-orange-50 border border-orange-200/60 flex items-center justify-center shrink-0 text-orange-600">
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                </div>
                <span className="font-semibold text-xs sm:text-sm text-neutral-800 whitespace-nowrap">
                  {item.text}
                </span>
                <div
                  className="w-px h-4 sm:h-5 bg-neutral-200 ml-2 sm:ml-3"
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .trust-strip-mask {
          -webkit-mask-image: linear-gradient(to right, transparent 0px, black 16px, black calc(100% - 16px), transparent);
          mask-image: linear-gradient(to right, transparent 0px, black 16px, black calc(100% - 16px), transparent);
        }
        @media (min-width: 640px) {
          .trust-strip-mask {
            -webkit-mask-image: linear-gradient(to right, transparent, black 32px, black calc(100% - 32px), transparent);
            mask-image: linear-gradient(to right, transparent, black 32px, black calc(100% - 32px), transparent);
          }
        }
      `,
        }}
      />
    </section>
  );
}
