// Vorschau P4-02 · Vorlage Liste: `/blog` wortgetreu aus `(bestand)/blog/page.jsx`, `BlogCard.jsx`, `BlogSidebar.jsx`,
// dazu die Zustände „Kategorie aktiv“ und „Suche ohne Treffer“ (statisch gesetzt, ohne Hook) und `/referenzen` als
// Erzählseiten-Liste mit den Platzhalter-Referenzen aus `src/config/projects.js`.
// Die Auswahl der Beiträge je Zustand ist Vorschau-Datenwahl, keine Seitenlogik (die kommt als Hook, OFFENE FRAGE G9).
import { COMPANY_DATA } from '@/config/company';
import { categories } from '@/config/blog';
import { posts } from '@/config/posts';
import { PORTFOLIO_PROJECTS, categories as projektKategorien, isPlaceholderProject } from '@/config/projects';
import { RATING_SUMMARY } from '@/config/reviews';
import { Abschnitt } from '@/components/kern/vorlagen/uebersicht/Abschnitt';
import Felder from '@/components/kern/vorlagen/uebersicht/Felder';
import Projektband from '@/components/kern/vorlagen/uebersicht/Projektband';
import Kopf from '@/components/kern/vorlagen/liste/Kopf';
import Filterleiste from '@/components/kern/vorlagen/liste/Filterleiste';
import Beitragsliste, { type Beitrag } from '@/components/kern/vorlagen/liste/Beitragsliste';
import Raster from '@/components/kern/vorlagen/detail/Raster';
import Randfeld from '@/components/kern/vorlagen/detail/Randfeld';
import { Musterfeld } from '@/components/kern/vorlagen/detail/Umfang';
import { Platzflaeche, Tafelkopf } from '@/components/kern/vorlagen/detail/Vorschautafel';
import { bild, kategorieName } from './daten';

type Post = (typeof posts)[number];

const ALLE = categories[0];
const KATEGORIEN = [
  { id: ALLE.id, name: ALLE.name },
  ...categories.filter((c) => c.id !== 'all' && posts.some((p) => p.category === c.id)).map((c) => ({ id: c.id, name: c.name })),
];

function beitrag(post: Post): Beitrag {
  return {
    href: `/blog/${post.slug}`,
    titel: post.title,
    text: post.excerpt,
    kategorie: kategorieName(post.category),
    datum: post.date,
    lesezeit: post.readTime,
    bild: bild(post.image),
  };
}

const LEER = { text: 'Keine Artikel zur Suchanfrage gefunden.', zuruecksetzen: 'Filter zurücksetzen' };

function Blogseite({ aktiv, suchwert, kennung }: { aktiv: string; suchwert: string; kennung: string }) {
  const { legalName, headquarters, owner, contact } = COMPANY_DATA;
  const featured = posts.find((p) => p.featured);
  const ohneFilter = aktiv === 'all' && !suchwert;
  const gefiltert = posts.filter((p) => (aktiv === 'all' || p.category === aktiv) && (!suchwert || p.title.toLowerCase().includes(suchwert.toLowerCase())));
  const liste = gefiltert.filter((p) => !(featured && ohneFilter && p.id === featured.id));
  return (
    <>
      <Kopf
        titelId={`${kennung}-titel`}
        etiketten={['Ratgeber & Fachwissen']}
        titel="Fliesen-Ratgeber & Badsanierung Tipps"
        text={`Praxisnaher Fliesen-Ratgeber mit wertvollen Tipps rund um Badsanierung, Fliesenverlegung und DIN 18534 Verbundabdichtung – von Ihrem Fachbetrieb ${legalName} aus ${headquarters.city}.`}
        aktionen={[
          { label: 'Projekt unverbindlich anfragen', href: '/kontakt', art: 'haupt', pfeil: true },
          { label: 'Häufige Fragen', href: '/faq' },
        ]}
      />
      <Abschnitt seitenart="arbeit" abstand="eng">
        <Filterleiste
          suche={{ id: `${kennung}-suche`, beschriftung: 'Artikel suchen', platzhalter: 'Artikel suchen...', wert: suchwert }}
          gruppenTitel="Kategorien"
          kategorien={KATEGORIEN}
          aktiv={aktiv}
        />
        <Raster
          className="mt-k-6"
          haupt={
            <Beitragsliste
              hervorhebung={
                featured && ohneFilter
                  ? { ...beitrag(featured), lesezeit: `${featured.readTime} Lesezeit`, marke: 'Empfohlener Leitfaden', mehr: 'Vollständigen Leitfaden lesen' }
                  : undefined
              }
              beitraege={liste.map(beitrag)}
              mehr="Artikel lesen"
              leer={LEER}
              erstesBildVorladen={kennung === 'blog'}
            />
          }
          neben={
            <Randfeld
              klebend
              titelEbene="p"
              titel="Beratung gewünscht?"
              text={`Fragen zu Badsanierung, Fliesen oder Abdichtung? ${owner.fullName} berät Sie persönlich – inklusive kostenfreiem Vor-Ort-Aufmaß.`}
              aktionen={[
                { label: 'Kontakt aufnehmen', href: '/kontakt', art: 'haupt', pfeil: true },
                { label: contact.phone, href: `tel:${contact.phoneLink}`, zeichen: 'telefon', mono: true },
              ]}
            />
          }
        />
      </Abschnitt>
    </>
  );
}

const PROJEKT_ZEICHEN = { bad: 'bad' } as const;
const projektKategorie = (id: string) => projektKategorien.find((c) => c.id === id)?.name || id;

function Referenzenliste() {
  const { contact, owner, motto } = COMPANY_DATA;
  const { google } = RATING_SUMMARY;
  return (
    <>
      <Kopf
        seitenart="erzaehl"
        titelId="referenzen-titel"
        etiketten={[`${google.displayRating} · ${google.count} ${google.label}`]}
        titel="Referenzen & Bewertungen Fliesenleger Tezgel"
        text="Echte Referenzen & Bewertungen für Fliesenleger Tezgel: Erfahren Sie, was unsere Kunden in Aßlar, Wetzlar und Mittelhessen über Bäder, Balkone, Treppen und Großformatfliesen sagen – mit 5,0 Sternen transparent und wörtlich aus Google-Rezensionen."
        aktionen={[
          { label: 'Bewertungen lesen', href: '#bewertungen', art: 'haupt', pfeil: true },
          { label: 'Vor-Ort-Aufmaß anfragen', href: '/kontakt' },
        ]}
      />
      <Platzflaeche>#bewertungen · Bewertungen (gemeinsamer Abschnitt ReviewsSection, nicht P4-02)</Platzflaeche>
      <Abschnitt
        titelId="projekte-heading"
        kopf={{
          etikett: 'Projektdokumentationen folgen',
          titel: 'Leistungsbeispiele',
          text: 'Diese Beispiele zeigen, was zu typischen Projekten gehört. Fotos und Details realer Projekte veröffentlichen wir erst, wenn unsere Kunden zugestimmt haben.',
        }}
      >
        <Felder
          spalten={3}
          labelledBy="projekte-heading"
          felder={PORTFOLIO_PROJECTS.map((project) => ({
            motiv: <Musterfeld zeichen={PROJEKT_ZEICHEN[project.category as keyof typeof PROJEKT_ZEICHEN]} rahmen={false} />,
            etiketten: [projektKategorie(project.category)],
            status: isPlaceholderProject(project) ? 'Referenzprojekt – Projektdokumentation in Vorbereitung' : 'Referenzprojekt',
            titel: project.title,
            titelHref: `/referenzen/${project.id}`,
            liste: { punkte: project.scopeItems.slice(0, 3) },
            verweise: [
              { label: `Leistungsumfang: ${project.title}`, href: `/referenzen/${project.id}`, ariaLabel: `Leistungsumfang ansehen: ${project.title}` },
              ...(project.serviceLink ? [{ label: `Leistungsdetails zu ${project.title}`, href: project.serviceLink, ariaLabel: `Mehr zur Leistung: ${project.title}` }] : []),
            ],
          }))}
        />
      </Abschnitt>
      <Abschnitt titelId="referenzen-cta" abstand="eng">
        <Projektband
          titelId="referenzen-cta"
          etikett="Kostenfrei & unverbindlich"
          titel="Überzeugen Sie sich selbst von unserer Fachqualität"
          text={`Kostenfreies Vor-Ort-Aufmaß durch ${owner.fullName} – in Aßlar, Wetzlar, Gießen und Umgebung.`}
          zitat={`„${motto}“`}
          aktionen={[
            { label: 'Aufmaß anfragen', href: '/kontakt', art: 'haupt', pfeil: true },
            { label: 'WhatsApp', href: contact.whatsappLink, zeichen: 'whatsapp', extern: true },
            { label: contact.phone, href: `tel:${contact.phoneLink}`, zeichen: 'telefon', mono: true },
          ]}
        />
      </Abschnitt>
    </>
  );
}

export default function VorschauListe() {
  return (
    <>
      <Tafelkopf>Vorschau P4-02 · Vorlage Liste · /blog wortgetreu (Arbeitsseite)</Tafelkopf>
      <Blogseite kennung="blog" aktiv="all" suchwert="" />
      <Platzflaeche>Qualitätsversprechen (gemeinsamer Abschnitt, nicht P4-02)</Platzflaeche>
      <Tafelkopf>Zustand · Filter aktiv: Kategorie „Pflege &amp; Werterhalt“ gedrückt</Tafelkopf>
      <Blogseite kennung="blog-filter" aktiv="pflege" suchwert="" />
      <Tafelkopf>Zustand · leere Liste: Suche „xqzwjkpv“ ohne Treffer</Tafelkopf>
      <Blogseite kennung="blog-leer" aktiv="all" suchwert="xqzwjkpv" />
      <Tafelkopf>Vorschau P4-02 · Vorlage Liste · /referenzen (Erzählseite laut GRUNDMENGE) mit Platzhalter-Referenzen</Tafelkopf>
      <Referenzenliste />
    </>
  );
}
