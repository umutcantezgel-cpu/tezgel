import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  // Die Vorlage im Wurzel-Layout hängt „| Fliesenverlegung Tezgel“ an (SEO-Runde, Gesamtprobe: vorher doppelt)
  title: 'Anmeldung zum Verwaltungsbereich',
  description: 'Interner Verwaltungsbereich der Fliesenverlegung Tezgel in Aßlar. Bitte melden Sie sich mit Ihren Zugangsdaten an, um fortzufahren.',
  robots: {
    index: false,
    follow: false,
  },
};

// Anmeldung nur hier im Bündel (E-010, vorher im Wurzel-Layout); Logik unverändert
export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
