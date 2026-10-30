import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Fliesen-Ratgeber & Badsanierung Tipps | Tezgel',
  description: 'Praxiswissen & Ratgeber zu Badsanierung, Fliesenverlegung & DIN 18534 Abdichtung vom Fliesenleger-Fachbetrieb Tezgel aus Aßlar. Jetzt informieren!',
  path: '/blog',
});

// Der Inhaltsspeicher (ContentProvider) steht nicht mehr hier, sondern in page.jsx um die Artikelliste (UM-E4-LEISTUNG,
// Maßnahme 3): Nur die Liste liest ihn; die Beitragsseiten unter /blog/[slug] lesen ihre Daten serverseitig und tragen so
// weder den Speicher noch seine Vorgaben im Dokument (früher hier, E-010, davor im Wurzel-Layout).
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
