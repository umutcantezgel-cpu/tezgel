// Dokument-Gerüst der Bestandsseiten (E-015): Inhalt des früheren Root-Layouts (Stand KERN v2), eingebunden über ./layout.tsx.
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
// Pfad nach dem Umzug in die Gruppe (bestand); globals.css ist die einzige Quelle der Gestaltungswerte (KERN K-005).
import '@/app/globals.css';
import { HeaderWrapper } from '@/components/layout/HeaderWrapper';
import { ClientWidgets } from '@/components/layout/ClientWidgets';
import MobileBottomBar from '@/components/layout/MobileBottomBar';
import Footer from '@/components/common/Footer';
import TrackingScripts from '@/components/common/TrackingScripts';
import SkipNav from '@/components/ui/SkipNav';
import { ErrorBoundary } from '@/components/providers/ErrorBoundary';
import { buildRootGraph, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';
import BewegungsWaechter from '@/components/kern/BewegungsWaechter';
import { KOPFSKRIPT } from '@/lib/motion/kopfskript';

// Schriften selbst gehostet (OFL 1.1, src/app/fonts/LIZENZEN.md). Archivo auf die genutzten Achsen beschnitten
// (wdth 74–100, wght 400–800); Ersatzschriften mit Metrik-Anpassung stehen in globals.css (KERN K-006, E-010).
const archivo = localFont({
  src: '../fonts/archivo-variabel.woff2',
  variable: '--font-archivo',
  display: 'swap',
  weight: '400 800',
  adjustFontFallback: false,
  declarations: [{ prop: 'font-stretch', value: '74% 100%' }],
});

const plexMono = localFont({
  src: '../fonts/plex-mono-400.woff2',
  variable: '--font-plex-mono',
  display: 'swap',
  weight: '400',
  preload: false,
  adjustFontFallback: false,
});

export const BESTAND_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Fliesenleger Wetzlar & Aßlar | Fliesenverlegung Tezgel',
    template: '%s | Fliesenverlegung Tezgel'
  },
  description: 'Ihr Fliesenleger für Wetzlar & Aßlar: Badsanierung, fugenarme Großformate & Terrassen. Abdichtung DIN 18534. Jetzt kostenfreies Vor-Ort-Aufmaß anfragen!',
  keywords: [
    'Fliesenverlegung Tezgel',
    'Deniz Tezgel',
    'Fliesenleger Aßlar',
    'Fliesenleger Wetzlar',
    'Badsanierung Aßlar Wetzlar',
    'Großformatfliesen Hessen',
    'XXL Fliesen verlegen',
    'Balkonsanierung Stelzlager',
    'DIN 18534 Verbundabdichtung',
    'Fliesen Handwerkskammer Wiesbaden'
  ],
  authors: [
    { name: 'Deniz Tezgel - Fliesenverlegung Tezgel' },
    { name: 'Coday Webdesign Wetzlar', url: 'https://www.codayweb.de/de' }
  ],
  creator: 'Coday Webdesign Wetzlar',
  publisher: 'Fliesenverlegung Tezgel',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    title: 'Fliesenleger Wetzlar & Aßlar | Fliesenverlegung Tezgel',
    description: 'Ihr Fliesenleger für Wetzlar & Aßlar: Badsanierung, fugenarme Großformate & Terrassen. Abdichtung DIN 18534. Jetzt kostenfreies Vor-Ort-Aufmaß anfragen!',
    siteName: 'Fliesenverlegung Tezgel',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    google: 'google831a76ab6f34b9f6',
  },
  // Build identifier: lets the post-deploy smoke test verify which commit is live.
  other: {
    'x-build': process.env.VERCEL_GIT_COMMIT_SHA ?? 'local',
  },
};

export const BESTAND_VIEWPORT: Viewport = {
  themeColor: '#F5F4F0', // = --color-kalk (Metadaten verlangen einen Farbwert)
  colorScheme: 'light',
};

export default function BestandDokument({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootKnowledgeGraph = buildRootGraph();

  return (
    <html lang="de" data-scroll-behavior="smooth" suppressHydrationWarning className={`${archivo.variable} ${plexMono.variable}`}>
      <head>
        {/* Bewegung: Startklasse vor dem ersten Rendern (KERN K-007) */}
        <script dangerouslySetInnerHTML={{ __html: KOPFSKRIPT }} />
        <meta name="geo.region" content="DE-HE" />
        <meta name="geo.placename" content="Aßlar" />
        <meta name="geo.position" content="50.5900;8.4600" />
        <meta name="ICBM" content="50.5900, 8.4600" />
        <JsonLd schema={rootKnowledgeGraph} />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-kalk text-tinte font-text">
        <SkipNav />
        {/* Provider liegen an ihrem Nutzungsort (E-010): Inhalte unter /blog, Anmeldung unter /login */}
        <ErrorBoundary>
          <TrackingScripts />
          <HeaderWrapper />
          {/* Platz für die untere Leiste (bis lg) liegt im Fuß, nicht hier: sonst steht zwischen dunklem Abschluss und Fuß
              ein heller Streifen (E3-NACH-04, Sichtabnahme E2-SICHT-2 Befund 22) */}
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileBottomBar />
          <ClientWidgets />
          <BewegungsWaechter />
        </ErrorBoundary>
      </body>
    </html>
  );
}
