import type { Metadata, Viewport } from 'next';
import { SITE_URL } from '@/lib/schema';

// Metadaten-Vorgaben der Kern-Seiten (Plan Runde 3, Bauregel 4): gleiche Werte wie im Bestand (`(bestand)/_dokument.tsx`),
// hier eigenständig, damit Kern-Seiten weder `globals.css` noch `tokens.css` laden. Der Kandidat-Tor vergleicht den <head>.
export const KERN_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Fliesenleger Wetzlar & Aßlar | Fliesenverlegung Tezgel',
    template: '%s | Fliesenverlegung Tezgel'
  },
  description: 'Ihr Fliesenleger für Wetzlar & Aßlar: Badsanierung, fugenlose Großformate & Terrassen. DIN 18534 zertifiziert. Jetzt kostenfreies Vor-Ort-Aufmaß anfragen!',
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
    description: 'Ihr Fliesenleger für Wetzlar & Aßlar: Badsanierung, fugenlose Großformate & Terrassen. DIN 18534 zertifiziert. Jetzt kostenfreies Vor-Ort-Aufmaß anfragen!',
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

export const KERN_VIEWPORT: Viewport = {
  themeColor: '#FFFFFF',
  colorScheme: 'light',
};
