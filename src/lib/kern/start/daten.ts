// KOPIE aus `src/app/(bestand)/page.tsx` (P3-10, KERN v1.2): `PORTAL_HUBS` wörtlich – Texte, Links, Reihenfolgen und `cta` –
// sowie die Etiketten (`tag`) aus `SERVICE_IMAGES`. Die Bestandsseite entfällt mit der Freischaltung von `/`;
// bis dahin prüft `_relaunch/werkzeuge/texte2.mjs` den Wortlaut beider Fassungen. Änderungen nur in beiden Dateien zugleich.
// Abweichung zur Vorlage: ohne lucide-Icons und ohne Icon-Feld (K-003 Prinzip 5, S-11: keine Icon-Kachel); die Fotos
// (`src`, `alt`) entfallen zugunsten der gezeichneten Vignetten (K-003 Prinzip 4), nur das Etikett bleibt (K-012 Klasse 3).
// `SERVICES`, `TOPIC_HUBS` und `CITIES` werden aus der Konfiguration gelesen, nicht kopiert.
import { CITIES } from '@/config/cities';

export type PortalLink = { label: string; href: string };

export type PortalHub = {
  eyebrow: string;
  title: string;
  text: string;
  links: PortalLink[];
  cta: PortalLink;
};

export const PORTAL_HUBS: PortalHub[] = [
  {
    eyebrow: 'Komplettbäder',
    title: 'Badsanierung & Wellness',
    text: 'Barrierefreie Walk-in-Duschen, fugenarme Großformate und staubgeschützte Komplettsanierung.',
    links: [
      { label: 'Badsanierung komplett', href: '/bad/badsanierung' },
      { label: 'Fliesen & XXL-Großformat', href: '/bad/fliesen' },
      { label: 'Barrierefreies Bad', href: '/bad/barrierefreies-bad' },
      { label: 'Bad aus einer Hand', href: '/bad/bad-aus-einer-hand' },
      { label: 'Musterbäder', href: '/bad/musterbaeder' },
    ],
    cta: { label: 'Zur Bad-Übersicht', href: '/bad' },
  },
  {
    eyebrow: 'Planungshilfen',
    title: 'Rechner & Planung',
    text: 'Badprojekt in 2 Minuten beschreiben, das Bad Schritt für Schritt planen und Fördermöglichkeiten prüfen.',
    links: [
      { label: 'Projektcheck', href: '/bad/projekt-check' },
      { label: 'Badplaner', href: '/bad/badplaner' },
      { label: 'Geführte Badanfrage', href: '/bad/badanfrage' },
      { label: 'Beratung vor Ort', href: '/beratung' },
      { label: 'Förderung & Zuschüsse', href: '/foerderung' },
    ],
    cta: { label: 'Projektcheck starten', href: '/bad/projekt-check' },
  },
  {
    eyebrow: 'Standorte Hessen',
    title: `${CITIES.length} Städte & Regionen`,
    text: 'Vom Firmensitz in Aßlar aus im Lahn-Dill-Kreis, im Raum Gießen, in Marburg und der Wetterau im Einsatz.',
    links: CITIES.map((city) => ({ label: city.name, href: `/standorte/${city.slug}` })),
    cta: { label: 'Alle Standorte', href: '/standorte' },
  },
  {
    eyebrow: 'Referenzen & Wissen',
    title: 'Bewertungen & Ratgeber',
    text: 'Echte Kundenstimmen, Antworten auf häufige Fragen und Ratgeber rund um Bad und Fliesen.',
    links: [
      { label: 'Referenzen & Bewertungen', href: '/referenzen' },
      { label: 'Ratgeber & Blog', href: '/blog' },
      { label: 'Häufige Fragen', href: '/faq' },
      { label: 'Über Deniz Tezgel', href: '/ueber-uns' },
      { label: 'Kontakt & Aufmaß', href: '/kontakt' },
    ],
    cta: { label: 'Zu den Bewertungen', href: '/referenzen' },
  },
];

/** Etiketten der Fachgewerke (Bestand: `SERVICE_IMAGES[id].tag`, dort als Schild auf dem Foto). */
export const FACHGEWERK_ETIKETTEN: Record<string, string> = {
  bad: 'Komplettbad & Dusche',
  wohnen: 'Wohnbereiche & Neubau',
  aussen: 'Balkon & Terrasse',
  untergrund: 'DIN 18534 Abdichtung',
};

/** Lange Linklisten (Bestand: mehr als 6 Einträge) stehen als umbrechende Mono-Etiketten. */
export const LANGE_LISTE_AB = 7;
