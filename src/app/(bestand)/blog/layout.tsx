import { createMetadata } from '@/lib/metadata';
import { ContentProvider } from '@/contexts/ContentContext';

export const metadata = createMetadata({
  title: 'Fliesen-Ratgeber & Badsanierung Tipps | Tezgel',
  description: 'Praxiswissen & Ratgeber zu Badsanierung, Fliesenverlegung & DIN 18534 Abdichtung vom Fliesenleger-Fachbetrieb Tezgel aus Aßlar. Jetzt informieren!',
  path: '/blog',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Ratgeber-Inhalte nur hier im Bündel (E-010, vorher im Wurzel-Layout) */}
      <ContentProvider>{children}</ContentProvider>
    </>
  );
}
