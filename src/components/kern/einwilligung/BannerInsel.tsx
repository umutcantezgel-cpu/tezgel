'use client';

// Lader des Einwilligungsbanners (P3-08): rendert ihn erst nach dem Mount, wie der Bestand (`ClientWidgets`, next/dynamic,
// ssr:false). Der Banner liest Cookie und Adresse beim ersten Rendern – auf dem Server gäbe das einen Hydrationsfehler.
// Kein Zeitverzug hier; der vorhandene Zeitpunkt (400 ms nach dem Mount beim Erstbesuch) gehört zur Logik in `useConsent`.
// Einbindung im Kern-Layout (P3-06/P3-16): direkt nach Sprunglink und IconSprite, damit der Banner früh in der Tab-Folge steht.
import dynamic from 'next/dynamic';

const Banner = dynamic(() => import('@/components/kern/einwilligung/Banner'), { ssr: false });

export default function BannerInsel() {
  return <Banner />;
}
