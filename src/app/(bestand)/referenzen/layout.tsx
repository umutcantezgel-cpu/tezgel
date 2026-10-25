import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Referenzen & Bewertungen | Fliesenleger Tezgel ★ 5,0',
  description: 'Kundenbewertungen & Referenzen von Fliesenleger Tezgel: Bäder, Terrassen, Treppen & Großformate in Wetzlar, Aßlar & Mittelhessen. 5,0 Google-Bewertung!',
  path: '/referenzen',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
