import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/tokens.css';
import './globals.css';
import { HeaderWrapper } from '@/components/layout/HeaderWrapper';
import { ClientWidgets } from '@/components/layout/ClientWidgets';
import FloatingDock from '@/components/layout/FloatingDock';
import Footer from '@/components/common/Footer';
import TrackingScripts from '@/components/common/TrackingScripts';
import { ContentProvider } from '@/contexts/ContentContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { buildRootGraph } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tezgel.de'),
  title: {
    default: 'Fliesenverlegung Tezgel | Meisterbetrieb für exklusive Fliesen & Badsanierung Aßlar & Wetzlar',
    template: '%s | Fliesenverlegung Tezgel'
  },
  description: 'Ihr Meisterbetrieb für fugenarme Großformate, barrierefreie Badsanierung, Feinsteinzeug, Terrassen auf Stelzlagern & DIN 18534 Verbundabdichtung in Aßlar, Wetzlar und ganz Hessen.',
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
  authors: [{ name: 'Deniz Tezgel - Fliesenverlegung Tezgel' }],
  creator: 'Fliesenverlegung Tezgel',
  publisher: 'Fliesenverlegung Tezgel',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    title: 'Fliesenverlegung Tezgel | Meisterbetrieb Aßlar & Wetzlar',
    description: 'Ihr Meisterbetrieb für exklusive Fliesenverlegung, fugenarme Großformate, Badsanierung, Terrassen & DIN 18534 Verbundabdichtung in Aßlar, Wetzlar und ganz Hessen.',
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
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootKnowledgeGraph = buildRootGraph();

  return (
    <html lang="de" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <meta name="geo.region" content="DE-HE" />
        <meta name="geo.placename" content="Aßlar" />
        <meta name="geo.position" content="50.5900;8.4600" />
        <meta name="ICBM" content="50.5900, 8.4600" />
        <JsonLd schema={rootKnowledgeGraph} />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
        <AuthProvider>
          <ContentProvider>
            <TrackingScripts />
            <HeaderWrapper />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <FloatingDock />
            <ClientWidgets />
          </ContentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
