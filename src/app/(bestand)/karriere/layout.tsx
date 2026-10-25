import { createMetadata } from '@/lib/metadata';
import { COMPANY_DATA } from '@/config/company';

const { headquarters } = COMPANY_DATA;

export const metadata = createMetadata({
  title: 'Fliesenleger Jobs Wetzlar & Aßlar | Karriere Tezgel',
  description: `Fliesenleger (m/w/d) gesucht! Jobs bei Fliesenverlegung Tezgel in ${headquarters.city} & Wetzlar: faire Bezahlung, modernes Werkzeug & gutes Team. Jetzt bewerben!`,
  path: '/karriere',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
