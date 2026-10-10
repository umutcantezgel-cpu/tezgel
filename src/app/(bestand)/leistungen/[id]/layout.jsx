import { SERVICES } from '@/config/services';
import { createMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id);
  if (!service) return {};

  const path = `/leistungen/${service.id}`;
  const serviceHubTitles = {
    bad: 'Badsanierung & Komplettbäder Wetzlar | Tezgel',
    wohnen: 'Fliesenverlegung Wohnbereich Wetzlar | Tezgel',
    aussen: 'Balkon- & Terrassensanierung Wetzlar | Tezgel',
    untergrund: 'DIN 18534 Abdichtung & Untergrund | Fliesen Tezgel',
  };
  const title = serviceHubTitles[service.id] || `${service.name} Wetzlar | Tezgel`;
  const description = `${service.shortDescription}. Fachbetrieb für ${service.name} in Aßlar, Wetzlar & Mittelhessen – kostenfreies Vor-Ort-Aufmaß & Festpreisangebot.`;

  return createMetadata({
    title,
    description,
    path
  });
}

export default function Layout({ children }) {
  return children;
}
