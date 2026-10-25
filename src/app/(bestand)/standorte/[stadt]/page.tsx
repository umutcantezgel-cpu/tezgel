import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CITIES, type CityData } from '@/config/cities';
import { CITY_HUB_DATA } from '@/lib/maps/getMapEmbedUrl';
import { buildCityLocalBusinessNode } from '@/lib/schema';
import { findCityConfig, getCityLandingPageSchema } from '@/lib/schemaPyramid';
import { createMetadata } from '@/lib/metadata';
import SeitenDaten from '@/components/seo/SeitenDaten';
import Einzugsband from '@/components/kern/Einzugsband';
// Schnellformular direkt eingebunden (F-07, Gutachten u7): Es steht so im ausgelieferten HTML und ist ohne JavaScript
// sichtbar (K-004), statt in einem verborgenen Streaming-Container hinter „Anfrageformular wird geladen...“.
import LeadQuickForm from '@/components/forms/LeadQuickForm';
import OrtsSeite from '@/components/vorlagen/OrtsSeite';
import { ortsInhalt, type Ortsinhalt } from '@/inhalte/orte';

// Standortseite `/standorte/[stadt]` (E3-BAU-10, KERN v3.6, Zusatz E3-BAU-K016): Ortsseite auf der Vorlage `OrtsSeite`.
// Der Inhalt kommt aus `ortsInhalt()` (`src/inhalte/orte.ts`, Muster `_werkstatt/texte/REF-ort-wetzlar.md`), die Metadaten
// aus dem Inhalt. Schlitz `karte`: das Einzugsband am eigenen Ort; `formular`: die Schnellanfrage der Ortsseiten (F-09,
// Quelle `standort-{slug}`); `nachbarn`: die fünf nächsten Orte. Strukturierte Daten über `SeitenDaten` mit Titel, Beschreibung
// und Brotkrumen aus dem Inhalt (E-053, vorher eigener Text im Seitenknoten), die Ortsknoten als `weitere`; `generateStaticParams`
// und `generateMetadata` bleiben.

/** Fotos der Ortsseite (K-016, Regel 4): Ziel der Leistungsseite und Name auf der Glasfläche (Wörter aus `galerie.ts`, höchstens sechs) */
const FOTOS: Record<string, { unterschrift: string; href: string }> = {
  'start-galerie-1': { unterschrift: 'Dusche ohne Stufe mit Sitzbank', href: '/bad/barrierefreies-bad' },
  'start-galerie-2': { unterschrift: 'Badewanne mit dunklen Mosaikfliesen', href: '/bad/badsanierung' },
  'start-galerie-3': { unterschrift: 'Balkon mit dunklen Fliesen', href: '/balkon-terrasse' },
  'start-galerie-4': { unterschrift: 'Terrasse mit großen hellgrauen Platten', href: '/balkon-terrasse' },
  'start-galerie-5': { unterschrift: 'Außentreppe mit Fliesen in Terrakotta', href: '/treppen' },
  'start-galerie-6': { unterschrift: 'Balkonboden vor dem Verlegen', href: '/balkon-terrasse' },
};

/** Weitere Kundenstimmen aus REVIEWS (K-016, Regel 5): Bad, Treppe, Boden, Balkon; die Stimme des Ortes steht zuerst */
const WEITERE_STIMMEN = ['erik-s', 'hasan-oe', 'elke-s', 'ute-t'];

/** Einleitung von „Was wir tun“ in zwei Sätzen (REF-ort-wetzlar.md, Lehre 2 aus Welle 1: der Glossarsatz war über 25 Wörter);
 *  gleich im Muster der Textdatei. OFFENE FRAGE im Bericht: die Teilung gehört in `orte.ts` für alle 13 Orte. */
const TUN_EINLEITUNG =
  'Wir prüfen zuerst den [[untergrund|Untergrund]]. Im Bad und auf dem Balkon kommt eine [[abdichtung|Abdichtung]]. Sie kommt nach [[din-18534|DIN 18534]] unter die Fliesen.';

/** Inhalt des Ortes mit Fotos und Stimmen nach Regel 4 und 5 (Texte bleiben wörtlich aus `ortsInhalt`) */
function inhaltFuer(city: CityData): Ortsinhalt {
  const inhalt = ortsInhalt(city, CITY_HUB_DATA[city.slug]?.distanceKm ?? city.distanceKm, CITIES.indexOf(city));
  const eigene = inhalt.beleg.stimmen ?? [];
  return {
    ...inhalt,
    tun: { ...inhalt.tun, einleitung: TUN_EINLEITUNG },
    beleg: {
      ...inhalt.beleg,
      fotos: inhalt.beleg.fotos.map((f) => ({ ...f, ...FOTOS[f.bild] })),
      stimmen: [...eigene, ...WEITERE_STIMMEN.filter((id) => !eigene.includes(id))],
    },
  };
}

export function generateStaticParams() {
  return CITIES.map((city) => ({ stadt: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stadt: string }>;
}): Promise<Metadata> {
  const { stadt } = await params;
  const city = CITIES.find((c) => c.slug === stadt);
  if (!city) return {};

  const { meta } = inhaltFuer(city);
  return createMetadata({
    title: meta.titel,
    description: meta.beschreibung,
    path: `/standorte/${city.slug}`,
  });
}

function getNearbyCities(currentSlug: string, count: number = 5) {
  const current = CITIES.find((c) => c.slug === currentSlug);
  if (!current) return [];

  return CITIES
    .filter((c) => c.slug !== currentSlug)
    .sort((a, b) => {
      const distA = Math.abs(a.distanceKm - current.distanceKm);
      const distB = Math.abs(b.distanceKm - current.distanceKm);
      if (distA === distB) return a.distanceKm - b.distanceKm;
      return distA - distB;
    })
    .slice(0, count);
}

export default async function StandortPage({
  params,
}: {
  params: Promise<{ stadt: string }>;
}) {
  const { stadt } = await params;
  const city = CITIES.find((c) => c.slug === stadt);
  if (!city) notFound();

  const inhalt = inhaltFuer(city);
  const cityConfig = findCityConfig(city.slug);
  const cityTierNodes = cityConfig
    ? getCityLandingPageSchema(cityConfig)['@graph']
    : [
        buildCityLocalBusinessNode({
          cityName: city.name,
          citySlug: city.slug,
          distanceKm: city.distanceKm,
          description: `Fachbetrieb für Fliesen-, Platten- und Mosaikverlegung, Badsanierung und DIN 18534 Verbundabdichtung in ${city.name}. Kostenfreies Vor-Ort-Aufmaß & Festpreisangebot.`,
        }),
      ];


  const nachbarn = getNearbyCities(city.slug, 5).map((n) => ({ name: n.name, href: `/standorte/${n.slug}` }));

  return (
    <>
      <SeitenDaten
        pfad={`/standorte/${city.slug}`}
        titel={inhalt.meta.titel}
        beschreibung={inhalt.meta.beschreibung}
        brotkrumen={inhalt.worum.brotkrumen}
        weitere={cityTierNodes}
      />
      <OrtsSeite
        inhalt={inhalt}
        nachbarn={nachbarn}
        karte={<Einzugsband aktuell={city.slug} form="stapel" />}
        formular={
          // heading leer: die Vorlage trägt die Überschrift; ohne leere Angabe setzte LeadQuickForm ihre eigene Kopfzeile.
          // Zusage wie im Bestand (M-07), mit Punkt statt Gedankenstrich (K-010); LeadQuickForm zeigt sie auch ohne Überschrift
          <LeadQuickForm
            variant="card"
            sourceTag={`standort-${city.slug}`}
            titelId="stadt-schnellanfrage-titel"
            heading=""
            subheading="Tragen Sie Ihre Kontaktdaten ein. Fachbetriebsleiter Deniz Tezgel meldet sich innerhalb von 24 Stunden persönlich."
          />
        }
      />
    </>
  );
}
