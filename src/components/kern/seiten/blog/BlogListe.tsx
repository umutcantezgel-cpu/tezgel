'use client';

// Ratgeber-Liste `/blog` (F-16, P4-08d, KERN v1.2): Client-Insel für Suche, Kategorien, Filter und Leerzustand.
// Logik unverändert aus `useBlogListe` (G9), derselbe Hook wie im Bestand `(bestand)/blog/page.jsx`; die Ansicht liegt in
// `ListeAnsicht`. Der Hook liest Kategorien und Beiträge aus dem Inhaltskontext des Bestands (`useContent`): Das Kern-Layout
// trägt keinen Kontext (Layout-Kommentar „Content-Kontext mit den Seiten, die sie brauchen“), darum bringt die Insel
// `ContentProvider` selbst mit. Server-Inhalte (Randfeld) kommen als Prop herein und bleiben Server-Komponenten.
import type { ReactNode } from 'react';
import { ContentProvider } from '@/contexts/ContentContext';
import { useBlogListe } from '@/lib/formulare/useBlogListe';
import ListeAnsicht from '@/components/kern/seiten/blog/ListeAnsicht';

function Liste({ beratung }: { beratung?: ReactNode }) {
  const liste = useBlogListe();
  return <ListeAnsicht liste={liste} beratung={beratung} />;
}

export default function BlogListe({ beratung }: { beratung?: ReactNode }) {
  return (
    <ContentProvider>
      <Liste beratung={beratung} />
    </ContentProvider>
  );
}
