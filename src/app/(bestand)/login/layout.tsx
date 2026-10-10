import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'Admin Login | Fliesenverlegung Tezgel',
  description: 'Interner Verwaltungsbereich und administrativer Zugang für Fliesenverlegung Tezgel in Aßlar & Wetzlar. Bitte autorisieren Sie sich mit Ihren Zugangsdaten.',
  robots: {
    index: false,
    follow: false,
  },
};

// Anmeldung nur hier im Bündel (E-010, vorher im Wurzel-Layout); Logik unverändert
export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
