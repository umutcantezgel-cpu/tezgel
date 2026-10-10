import { createMetadata } from '@/lib/metadata';

// /termin/page.jsx is a client component, so its metadata lives here.
export const metadata = createMetadata({
  title: 'Termin vereinbaren | Fliesenleger Tezgel Wetzlar',
  description:
    'Termin bei Fliesenleger Tezgel in Aßlar: Wunschthema wählen & Terminanfrage für Vor-Ort-Aufmaß in Wetzlar & Hessen direkt online oder per WhatsApp senden.',
  path: '/termin',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
