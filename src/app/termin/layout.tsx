import { createMetadata } from '@/lib/metadata';

// /termin/page.jsx is a client component, so its metadata lives here.
export const metadata = createMetadata({
  title: 'Termin vereinbaren',
  description:
    'Wunschthema und Wunschtermin wählen und die Terminanfrage für Beratung oder Vor-Ort-Aufmaß per WhatsApp oder E-Mail direkt an Fliesenverlegung Tezgel in Aßlar senden.',
  path: '/termin',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
