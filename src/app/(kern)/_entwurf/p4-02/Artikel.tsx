// Vorschau P4-02 · Vorlage Artikel: `/blog/fliesen-reinigen-pflegen` wortgetreu aus `(bestand)/blog/[slug]/page.jsx`
// mit Inhaltsverzeichnis, Lesesatz (Markdown), Schlagworten, Rückmeldung, Teilen, Verfasser und verwandten Artikeln.
// Vorschau-Daten statt Logik (OFFENE FRAGE G9): Anker-Kennungen der Überschriften und die Auswahl der verwandten Artikel
// stehen hier als Ergebnis der Bestandslogik ausgeschrieben; die Teilen-Ziele werden aus Adresse und Titel gebildet,
// bis ein gemeinsamer Helfer sie liefert. Zustände: Verzeichnis mit aktivem Eintrag, Teilen-Blatt (nativ, Knopf öffnet),
// Abstimmung vor und nach dem Klick, langer Titel.
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ReactNode } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { posts } from '@/config/posts';
import { SITE_URL } from '@/lib/schema';
import { Abschnitt } from '@/components/kern/vorlagen/teile';
import Kopf from '@/components/kern/vorlagen/liste/Kopf';
import Raster from '@/components/kern/vorlagen/detail/Raster';
import Inhaltsverzeichnis from '@/components/kern/vorlagen/artikel/Inhaltsverzeichnis';
import { Lesetext, lesesatz } from '@/components/kern/vorlagen/artikel/Satz';
import Teilen, { type TeilenZiel } from '@/components/kern/vorlagen/artikel/Teilen';
import { Rueckmeldung, Schlagworte, Verfasser, Vorspann } from '@/components/kern/vorlagen/artikel/Teile';
import Verwandte from '@/components/kern/vorlagen/artikel/Verwandte';
import { Platzflaeche, Tafelkopf } from '@/components/kern/vorlagen/teile/Vorschau';
import { bild, kategorieName } from './daten';

const SLUG = 'fliesen-reinigen-pflegen';
const post = posts.find((p) => p.slug === SLUG)!;

// Ergebnis von `generateSlug` (Bestand) für die Überschriften dieses Artikels, als Vorschau-Daten.
const ANKER: Record<string, string> = {
  'Die Pflicht: Unterhaltsreinigung im Alltag': 'die-pflicht-unterhaltsreinigung-im-alltag',
  'Die richtigen Reiniger je nach Material': 'die-richtigen-reiniger-je-nach-material',
  'Was Fliesen und Fugen schadet': 'was-fliesen-und-fugen-schadet',
  'Zementschleier nach der Verlegung': 'zementschleier-nach-der-verlegung',
  'Die Kür: Grundreinigung und Fugenpflege': 'die-kür-grundreinigung-und-fugenpflege',
  'Silikonfugen als Wartungsfugen im Blick behalten': 'silikonfugen-als-wartungsfugen-im-blick-behalten',
  Fazit: 'fazit',
};
const anker = (kinder: ReactNode) => (typeof kinder === 'string' ? ANKER[kinder] : undefined);
const EINTRAEGE = Object.entries(ANKER).map(([text, id]) => ({ id, text, ebene: 2 as const }));

// Ergebnis von `RelatedPosts` (Bestand: gleiche Kategorie bzw. Schlagworte, aufgefüllt in Konfig-Reihenfolge).
const VERWANDT = ['schimmel-fliesenfugen-vermeiden', 'feinsteinzeug-oder-naturstein-vergleich', 'handwerkerbonus-fliesenarbeiten'];

function ziele(adresse: string, titel: string, beschreibung: string): TeilenZiel[] {
  const u = encodeURIComponent(adresse);
  const t = encodeURIComponent(titel);
  return [
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, extern: true },
    { name: 'Twitter/X', href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, extern: true },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, extern: true },
    { name: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${titel} ${adresse}`)}`, extern: true, zeichen: 'whatsapp' },
    { name: 'E-Mail', href: `mailto:?subject=${t}&body=${encodeURIComponent(`${beschreibung}\n\n${adresse}`)}`, zeichen: 'mail' },
  ];
}

export default function VorschauArtikel() {
  const { legalName, owner, authority, headquarters } = COMPANY_DATA;
  const adresse = `${SITE_URL}/blog/${post.slug}`;
  return (
    <>
      <Tafelkopf>Vorschau P4-02 · Vorlage Artikel · /blog/{SLUG} wortgetreu (Arbeitsseite, Lesemodus)</Tafelkopf>
      <Kopf
        titelId="artikel-titel"
        ruecklink={{ href: '/blog', titel: 'Zurück zur Ratgeber-Übersicht' }}
        etiketten={[kategorieName(post.category), ...(post.featured ? ['Empfehlung'] : [])]}
        titel={post.title}
        vorspann={`${post.title} – Fachwissen, Praxistipps und rechtliche Vorgaben für Bauherren und Modernisierer von Fachbetrieb Tezgel.`}
        kennungen={[
          { zeichen: 'kalender', text: post.date },
          { zeichen: 'uhr', text: `${post.readTime} Lesezeit` },
        ]}
      />
      <Abschnitt dichte="eng">
        <Raster
          rand="links"
          randBreite={3}
          neben={<Inhaltsverzeichnis kopf="Inhalt" name="Inhaltsverzeichnis" eintraege={EINTRAEGE} aktiv={EINTRAEGE[0].id} />}
          haupt={
            <article aria-labelledby="artikel-titel">
              <Vorspann>Praxis-Leitfaden von Fachbetriebsleiter Deniz Tezgel: {post.excerpt}</Vorspann>
              <Lesetext>
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={lesesatz({ anker })}>
                  {post.content}
                </ReactMarkdown>
              </Lesetext>
              <Schlagworte worte={post.tags} className="mt-k-6" />
              <Rueckmeldung
                frage="War dieser Leitfaden hilfreich?"
                knopf="Ja, sehr hilfreich"
                dank="Danke für Ihr Feedback!"
                teilen={
                  <Teilen
                    id="artikel-teilen"
                    knopf="Teilen"
                    titel="Artikel teilen"
                    ziele={ziele(adresse, post.title, post.excerpt)}
                    schliessen="Schließen"
                  />
                }
              />
              <Rueckmeldung frage="Zustand · nach der Abstimmung:" knopf="Ja, sehr hilfreich" dank="Danke für Ihr Feedback!" abgestimmt />
              <Verfasser
                className="mt-k-7"
                kopf="Verfasst von"
                name={legalName}
                rolle={`${owner.fullName} · ${owner.title}`}
                text={`${authority.certification} – ${authority.responsibility} mit Sitz in ${headquarters.city}.`}
                initiale={legalName.charAt(0).toUpperCase()}
                verweis={{ titel: `Mehr über ${owner.fullName}`, href: '/ueber-uns' }}
              />
              <Verwandte
                className="mt-k-7"
                titel="Das könnte Sie auch interessieren"
                titelId="verwandte-titel"
                mehr="Artikel lesen"
                artikel={VERWANDT.map((slug) => posts.find((p) => p.slug === slug)!).map((p) => ({
                  href: `/blog/${p.slug}`,
                  titel: p.title,
                  kategorie: kategorieName(p.category),
                  text: 'Fachbeitrag von Fliesenverlegung Tezgel – praxisnahe Hinweise zu Planung, Material und Ausführung.',
                  bild: bild(p.image),
                }))}
              />
            </article>
          }
        />
      </Abschnitt>
      <Platzflaeche>Qualitätsversprechen (gemeinsamer Abschnitt, nicht P4-02)</Platzflaeche>
    </>
  );
}
