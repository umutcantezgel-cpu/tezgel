import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Fliesenschäden analysieren: Risse & Feuchte | Tezgel',
  description:
    'Gerissene Fliesen, Hohlstellen oder feuchte Fugen? Kostenfreie Schadensanalyse vor Ort in Wetzlar & Aßlar. Fliesenleger-Fachbetrieb Tezgel berät Sie!',
  path: '/schadensanalyse',
});

export default function SchadensanalyseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
