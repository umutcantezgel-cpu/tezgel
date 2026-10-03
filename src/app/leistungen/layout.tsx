import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Fliesenleger Leistungen Wetzlar | Fachbetrieb Tezgel',
  description: 'Alle Fliesenleger-Leistungen von Tezgel in Wetzlar & Aßlar: Badsanierung, XXL-Großformate, Terrassen, Naturstein & Abdichtung. Jetzt Festpreis anfragen!',
  path: '/leistungen',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
