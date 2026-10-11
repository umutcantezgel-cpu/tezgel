import type { Metadata, Viewport } from 'next';
import { archivo, plexMono } from '@/app/fonts/kern';
import { KERN_METADATA, KERN_VIEWPORT } from '@/lib/kern/metadaten';
import { KOPF_SKRIPT } from '@/lib/motion/kopfskript';
import BewegungsRegie from '@/lib/motion/BewegungsRegie';
import TrackingScripts from '@/components/common/TrackingScripts';
import Sprunglink from '@/components/kern/schale/Sprunglink';
import IconSprite from '@/components/kern/icons/IconSprite';
import Kopf from '@/components/kern/kopf-b/Kopf';
import Fuss from '@/components/kern/fuss/Fuss';
import UntereLeiste from '@/components/kern/fuss/UntereLeiste';
import WhatsAppKanal from '@/components/kern/fuss/WhatsAppKanal';
import BannerInsel from '@/components/kern/einwilligung/BannerInsel';
import { buildRootGraph } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';
import '@/styles/kern-global.css';

// Root-Layout der Kern-Seiten (E-015). Ruhend, bis die erste Kern-Seite freigeschaltet ist (P3-16).
// Pflichtinhalt nach Plan Runde 3, Bauregel 4; Fuß (contentinfo nach main), untere Leiste, WhatsApp-Kanal (P3-07) und
// Einwilligungsbanner (P3-08) sind eingehängt, der Kopf ist Variante B (E-022),
// Content- und Auth-Kontext mit den Seiten, die sie brauchen (Blog W6, Login W9).
export const metadata: Metadata = KERN_METADATA;
export const viewport: Viewport = KERN_VIEWPORT;

export default function KernLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const rootKnowledgeGraph = buildRootGraph();
  return (
    <html lang="de" className={`${archivo.variable} ${plexMono.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: KOPF_SKRIPT }} />
        <meta name="geo.region" content="DE-HE" />
        <meta name="geo.placename" content="Aßlar" />
        <meta name="geo.position" content="50.5900;8.4600" />
        <meta name="ICBM" content="50.5900, 8.4600" />
        <JsonLd schema={rootKnowledgeGraph} />
      </head>
      <body className="min-h-screen flex flex-col">
        <Sprunglink />
        <IconSprite />
        <TrackingScripts />
        <Kopf />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Fuss />
        <UntereLeiste />
        <WhatsAppKanal />
        <BannerInsel />
        <BewegungsRegie />
      </body>
    </html>
  );
}
