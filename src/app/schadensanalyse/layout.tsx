import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Fliesenschäden analysieren: Risse, Hohlstellen, Feuchte',
  description:
    'Gerissene Fliesen, Hohlstellen, feuchte Fugen oder Ausblühungen? Beim kostenfreien Vor-Ort-Termin prüft der Meister Ursache und Untergrund und rät zur Lösung.',
  path: '/schadensanalyse',
});

export default function SchadensanalyseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
