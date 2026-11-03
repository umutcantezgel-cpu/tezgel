import type { MetadataRoute } from 'next';
import { posts } from '@/config/posts';
import { SERVICES } from '@/config/services';
import { PORTFOLIO_PROJECTS } from '@/config/projects';
import { TOPIC_PAGES } from '@/config/topics';
import { CITIES } from '@/config/cities';
import { MUSTERBAEDER } from '@/config/musterbaeder';
import { SITE_URL } from '@/lib/schema';
import { adresseIndexiert } from '@/lib/seo/indexierung';
import { ARBEITEN } from '@/config/arbeiten';
import { GALERIE } from '@/components/momente/galerie-filter/daten';
import { START } from '@/inhalte/start';
import { BAD } from '@/inhalte/bad';
import { BADSANIERUNG } from '@/inhalte/bad-badsanierung';
import { BARRIEREFREIES_BAD } from '@/inhalte/barrierefreies-bad';
import { BALKON_TERRASSE } from '@/inhalte/balkon-terrasse';
import { LEISTUNGEN } from '@/inhalte/leistungen';
import { REFERENZEN } from '@/inhalte/referenzen';
import { UEBER_UNS } from '@/inhalte/ueber-uns';
import { KONTAKT } from '@/inhalte/kontakt';
import { FLIESEN } from '@/inhalte/fliesen';
import { ortsInhalt } from '@/inhalte/orte';

export const dynamic = 'force-static';

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

/**
 * Static routes; topic hubs, services, cities, Musterbäder, references and
 * blog posts are generated from their configs below. /login is an internal
 * utility page excluded via robots.txt.
 */
const STATIC_ROUTES: Array<[path: string, changeFrequency: ChangeFrequency, priority: number]> = [
  ['', 'weekly', 1.0],

  // Badsanierung
  ['/bad', 'monthly', 0.9],
  ['/bad/badsanierung', 'monthly', 0.9],
  ['/bad/fliesen', 'monthly', 0.9],
  ['/bad/barrierefreies-bad', 'monthly', 0.9],
  ['/bad/bad-aus-einer-hand', 'monthly', 0.8],
  ['/bad/musterbaeder', 'monthly', 0.9],
  ['/bad/badplaner', 'monthly', 0.8],
  ['/bad/projekt-check', 'monthly', 0.9],
  ['/bad/badanfrage', 'monthly', 0.9],

  // Fachgewerke
  ['/leistungen', 'monthly', 0.9],

  // Standorte & Ausstellung
  ['/standorte', 'monthly', 0.8],
  ['/ausstellung/wetzlar', 'monthly', 0.7],
  ['/ausstellung/giessen', 'monthly', 0.7],

  // Ratgeber & Service
  ['/blog', 'weekly', 0.7],
  ['/faq', 'monthly', 0.7],
  ['/beratung', 'monthly', 0.8],
  ['/foerderung', 'monthly', 0.7],
  ['/referenzen', 'monthly', 0.8],
  ['/downloads', 'monthly', 0.5],

  // Unternehmen & Kontakt
  ['/ueber-uns', 'monthly', 0.7],
  ['/unternehmen', 'monthly', 0.7],
  ['/team', 'monthly', 0.6],
  ['/partner', 'monthly', 0.5],
  ['/karriere', 'monthly', 0.6],
  ['/karriere/ausbildung', 'monthly', 0.5],
  ['/kontakt', 'monthly', 0.9],
  ['/termin', 'monthly', 0.8],
  ['/preise', 'monthly', 0.8],

  // Barrierefreiheit (indexable legal page)
  ['/barrierefreiheit', 'yearly', 0.2],
];

// SEO-Runde (03.11.2026, T13): Bild-Sitemap. Die Fotos liefert next/image mit einer Adresse aus, die sich mit jedem Deploy
// ändert (dpl=…); hier steht je Seite die feste Datei unter /images/arbeiten/. Gesammelt werden alle Foto-Kennungen aus den
// Inhalten der Seite (jede Zeichenkette, die eine Kennung aus ARBEITEN ist), auf /referenzen dazu die Galerie, auf den
// Ortsseiten die Fotos wie in ortsInhalt (src/app/(bestand)/standorte/[stadt]/page.tsx). Nur was die Seite zeigt:
// test/titleLength.test.mjs (Test 8d) prüft jedes Bild der Sitemap gegen das gebaute HTML.
const ARBEIT_IDS = new Set<string>(Object.keys(ARBEITEN));

function fotoKennungen(wert: unknown, ziel: Set<string> = new Set()): Set<string> {
  if (typeof wert === 'string') {
    if (ARBEIT_IDS.has(wert)) ziel.add(wert);
  } else if (Array.isArray(wert)) {
    for (const eintrag of wert) fotoKennungen(eintrag, ziel);
  } else if (wert && typeof wert === 'object') {
    for (const eintrag of Object.values(wert)) fotoKennungen(eintrag, ziel);
  }
  return ziel;
}

const BILDQUELLEN: ReadonlyArray<readonly [path: string, quelle: unknown]> = [
  // Startseite: das Einstiegsfoto unter lg ist fest start-bad (src/components/start/Startbild.tsx); die Auswahl der Lage zeigt
  // nur Zeichnungen, ihre Felder bild ruhen (src/components/vorlagen/teile/Lage.tsx, LageFliesen)
  [START.pfad, ['start-bad', { ...START, lage: undefined }]],
  [BAD.pfad, BAD],
  [BADSANIERUNG.pfad, BADSANIERUNG],
  [BARRIEREFREIES_BAD.pfad, BARRIEREFREIES_BAD],
  [BALKON_TERRASSE.pfad, BALKON_TERRASSE],
  [LEISTUNGEN.pfad, LEISTUNGEN],
  // /referenzen: dazu Vorher und Nachher der Außentreppe, die die Seite im Vergleich zeigt
  [REFERENZEN.pfad, [REFERENZEN, GALERIE, 'ref-vorher', 'ref-nachher']],
  [UEBER_UNS.pfad, UEBER_UNS],
  [KONTAKT.pfad, KONTAKT],
  [FLIESEN.pfad, FLIESEN],
  ...CITIES.map((city, index) => [`/standorte/${city.slug}`, ortsInhalt(city, city.distanceKm, index)] as const),
  // SEO-Runde T11: Fotos ähnlicher Arbeiten auf den Leistungsbeispielen (beispielFotos in src/config/projects.js)
  ...PORTFOLIO_PROJECTS.map((project) => [`/referenzen/${project.id}`, project.beispielFotos ?? []] as const),
];

/** Feste Bildadressen je Seitenpfad („“ für die Startseite wie in STATIC_ROUTES) */
export const BILDER_JE_SEITE: ReadonlyMap<string, string[]> = new Map(
  BILDQUELLEN.map(([pfad, quelle]) => [
    pfad === '/' ? '' : pfad,
    [...fotoKennungen(quelle)].map((id) => `${SITE_URL}${ARBEITEN[id as keyof typeof ARBEITEN].src}`),
  ]),
);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, changeFrequency: ChangeFrequency, priority: number) => {
    const images = BILDER_JE_SEITE.get(path);
    return {
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
      ...(images && images.length > 0 ? { images } : {}),
    };
  };

  const rawEntries: MetadataRoute.Sitemap = [
    ...STATIC_ROUTES.map(([path, changeFrequency, priority]) => entry(path, changeFrequency, priority)),
    ...SERVICES.map((service) => entry(`/leistungen/${service.id}`, 'monthly', 0.9)),
    ...SERVICES.flatMap((service) =>
      CITIES.map((city) => entry(`/leistungen/${service.id}/${city.slug}`, 'monthly', 0.7))
    ),
    ...CITIES.map((city) => entry(`/standorte/${city.slug}`, 'monthly', 0.8)),
    ...MUSTERBAEDER.map((bad) => entry(`/bad/musterbaeder/${bad.slug}`, 'monthly', 0.7)),
    ...TOPIC_PAGES.map((page) => entry(page.path, 'monthly', page.path.split('/').length === 2 ? 0.8 : 0.7)),
    ...PORTFOLIO_PROJECTS.map((project) => entry(`/referenzen/${project.id}`, 'monthly', 0.5)),
    ...posts.map((post) => entry(`/blog/${post.slug}`, 'monthly', 0.6)),
  ];

  // Deduplicate by URL to guarantee clean sitemap output
  const uniqueMap = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const item of rawEntries) {
    if (!uniqueMap.has(item.url)) {
      uniqueMap.set(item.url, item);
    }
  }

  // SEO-Runde (T12): ohne die Rechtstexte mit noindex (src/lib/seo/indexierung.ts)
  return Array.from(uniqueMap.values()).filter((item) => adresseIndexiert(item.url));
}
