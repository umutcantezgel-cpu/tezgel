import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login | Fliesenverlegung Tezgel',
  description: 'Interner Verwaltungsbereich und administrativer Zugang für Fliesenverlegung Tezgel in Aßlar & Wetzlar. Bitte autorisieren Sie sich mit Ihren Zugangsdaten.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
