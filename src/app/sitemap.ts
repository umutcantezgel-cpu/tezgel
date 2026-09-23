import { MetadataRoute } from 'next';
import { posts, isHvacPost } from '@/config/posts';
import { SERVICES } from '@/config/services';
import { PORTFOLIO_PROJECTS, isLegacyProject } from '@/config/projects';
import { CITIES } from '@/config/cities';
import { MUSTERBAEDER } from '@/config/musterbaeder';
import { SITE_URL } from '@/lib/schema';

export const dynamic = 'force-static';

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

/**
 * Indexable Tezgel routes only. Legacy HVAC routes (/heizung, /lueftung,
 * /haustechnik, /energie, /gewerbe, /energieberatung, /notdienst) are
 * noindexed and intentionally not listed here; /login and /termin are
 * utility pages without search value.
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
  ['/bad/budgetkalkulator', 'monthly', 0.9],
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

  // Rechtliches
  ['/impressum', 'yearly', 0.3],
  ['/datenschutz', 'yearly', 0.3],
  ['/agb', 'yearly', 0.2],
  ['/widerruf', 'yearly', 0.2],
  ['/cookie-richtlinie', 'yearly', 0.2],
  ['/barrierefreiheit', 'yearly', 0.2],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, changeFrequency: ChangeFrequency, priority: number) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    ...STATIC_ROUTES.map(([path, changeFrequency, priority]) => entry(path, changeFrequency, priority)),
    ...SERVICES.map((service) => entry(`/leistungen/${service.id}`, 'monthly', 0.9)),
    ...SERVICES.flatMap((service) =>
      CITIES.map((city) => entry(`/leistungen/${service.id}/${city.slug}`, 'monthly', 0.7))
    ),
    ...CITIES.map((city) => entry(`/standorte/${city.slug}`, 'monthly', 0.8)),
    ...MUSTERBAEDER.map((bad) => entry(`/bad/musterbaeder/${bad.slug}`, 'monthly', 0.7)),
    ...PORTFOLIO_PROJECTS.filter((project) => !isLegacyProject(project)).map((project) =>
      entry(`/referenzen/${project.id}`, 'monthly', 0.6)
    ),
    ...posts.filter((post) => !isHvacPost(post)).map((post) => entry(`/blog/${post.slug}`, 'monthly', 0.6)),
  ];
}
