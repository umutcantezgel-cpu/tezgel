// Dokument-Gerüst der Bestandsseiten (E-015): Inhalt des früheren Root-Layouts (Stand KERN v2), eingebunden über ./layout.tsx.
import type { Metadata, Viewport } from 'next';
import { preload } from 'react-dom';
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
import Verlegen from '@/components/verlegen/Verlegen';
import { KOPFSKRIPT } from '@/lib/motion/kopfskript';

// Schriften selbst gehostet (OFL 1.1, src/app/fonts/LIZENZEN.md). Archivo auf die genutzten Achsen beschnitten
// (wdth 74–100, wght 400–800); Ersatzschriften mit Metrik-Anpassung stehen in globals.css (KERN K-006, E-010).
// Ein Stylesheet (UM-E4-LEISTUNG, Maßnahme 1, E-101): Die zwei @font-face stehen als <style> im Kopf statt über
// next/font/local. next/font legt je Schrift ein eigenes CSS-Modul an; seit das Haupt-CSS über der Grenze liegt, bis zu der
// Turbopack CSS-Module in eine Datei zusammenlegt (zwischen 129 und 132 KB, UM-E4-START), kam es als zweite
// render-blockierende Datei. Jetzt ist globals.css das einzige CSS-Modul, also genau eine Datei, gleich wie groß sie wird
// (test/stylesheets.test.mjs). Inhalt wie vorher von next/font erzeugt: Familiennamen archivo und plexMono, dieselben
// Variablen und Werte; die Dateien laden als Asset mit Inhaltskennung unter /_next/static/media (wie vorher), Archivo
// vorgeladen wie vorher (preload), Plex Mono nicht.
import archivoDatei from '../fonts/archivo-variabel.woff2' with { turbopackModuleType: 'asset' };
import plexMonoDatei from '../fonts/plex-mono-400.woff2' with { turbopackModuleType: 'asset' };

const SCHRIFTEN =
  `@font-face{font-family:archivo;src:url(${archivoDatei}) format("woff2");font-display:swap;font-weight:400 800;font-stretch:74% 100%}` +
  `@font-face{font-family:plexMono;src:url(${plexMonoDatei}) format("woff2");font-display:swap;font-weight:400}` +
  ':root{--font-archivo:"archivo";--font-plex-mono:"plexMono"}';

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

// Sofortgefühl über Speculation Rules (UM-E3-SCROLL, KERN Regeln v4, AUFTRAG 8): nur öffentliche GET-Seiten derselben
// Herkunft. Nie Formulare und Rechner (die Arbeitsseiten, deren Inhalt das Formular oder der Rechner ist), nie /login, nie
// /api, keine Dateien. Abruf beim Zeigen (moderate: Zeiger 200 ms über dem Link oder Drücken), nur das HTML: Beim bloßen
// Lesen und Scrollen entsteht keine Last, und es läuft kein Skript der Zielseite. Genutzt wird der Abruf bei Wechseln als
// ganzes Dokument, vor allem bei Klicks vor der Hydrierung; danach wechseln B-01 und Next.js innerhalb des Dokuments.
// Bewusst kein prerender: Ein vorgerendertes Dokument führt seine Skripte aus (Hydrierung, Effekte, auch Statistik nach
// Einwilligung) und würde nach der Hydrierung nie aktiviert, weil B-01 den Klick übernimmt. Zuschalten erst nach Messung
// (INP, Bildrate von B-01) und mit Statistik, die auf die Aktivierung wartet (document.prerendering).
// Muster nach URL Pattern: Ohne „?“ und „#“ im Muster gelten alle Suchparameter und Anker mit.
const NIE_VORLADEN = [
  '/api/*',
  '/login{/*}?',
  '/kontakt{/*}?',
  '/termin{/*}?',
  '/beratung{/*}?',
  '/preise{/*}?',
  '/bad/badanfrage{/*}?',
  '/bad/badplaner{/*}?',
  '/bad/projekt-check{/*}?',
  '/fliesen/konfigurator{/*}?',
  '/fliesen/festpreisangebot{/*}?',
  '/_next/*',
  '/images/*',
  '/*.pdf',
];
const VORLADEN = JSON.stringify({
  prefetch: [
    {
      source: 'document',
      where: {
        and: [
          { href_matches: '/*' },
          { not: { href_matches: NIE_VORLADEN } },
          // Links mit Anker (oft dieselbe Seite, etwa /#ablauf auf /), Downloads und Links in ein anderes Fenster
          { not: { selector_matches: ['[href*="#"]', '[download]', '[target]:not([target="_self"])'] } },
        ],
      },
      eagerness: 'moderate',
    },
  ],
});

export const BESTAND_VIEWPORT: Viewport = {
  themeColor: '#F4F4F5', // = --color-kalk (Metadaten verlangen einen Farbwert)
  colorScheme: 'light',
};

export default function BestandDokument({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootKnowledgeGraph = buildRootGraph();
  // wie vorher next/font: Archivo vorladen (erstes Bild), Plex Mono nicht (preload: false)
  preload(archivoDatei, { as: 'font', type: 'font/woff2', crossOrigin: '' });

  return (
    <html lang="de" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Schriften (siehe SCHRIFTEN oben): kein eigenes Stylesheet, damit / und alle Seiten genau eine CSS-Datei laden */}
        <style dangerouslySetInnerHTML={{ __html: SCHRIFTEN }} />
        {/* Bewegung: Startklassen vor dem ersten Rendern, auch für den Eingang ohne Vorhang (KERN K-007, E-067-4) */}
        <script dangerouslySetInnerHTML={{ __html: KOPFSKRIPT }} />
        {/* Abruf öffentlicher Seiten beim Zeigen (UM-E3-SCROLL); Browser ohne Speculation Rules übergehen den Block */}
        <script type="speculationrules" dangerouslySetInnerHTML={{ __html: VORLADEN }} />
        <meta name="geo.region" content="DE-HE" />
        <meta name="geo.placename" content="Aßlar" />
        <meta name="geo.position" content="50.5900;8.4600" />
        <meta name="ICBM" content="50.5900, 8.4600" />
        <JsonLd schema={rootKnowledgeGraph} />
      </head>
      {/* min-h-svh: kleine Ansicht wie in globals.css (UM-E3-SCROLL) */}
      <body className="antialiased min-h-svh flex flex-col bg-kalk text-tinte font-text">
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
          {/* Seitenwechsel B-01 „Verlegen“: feste Schicht außerhalb von main (KERN K-007, E-010) */}
          <Verlegen />
        </ErrorBoundary>
      </body>
    </html>
  );
}
