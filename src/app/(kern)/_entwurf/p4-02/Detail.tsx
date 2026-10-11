// Vorschau P4-02 · Vorlage Detail: `/referenzen/barrierefreies-duschbad` (Platzhalter-Referenz, langer Titel) und
// `/bad/musterbaeder/basic-bad-4_6` wortgetreu aus `(bestand)/referenzen/[id]/page.jsx` bzw.
// `(bestand)/bad/musterbaeder/[slug]/page.jsx`. Platzhalter-Referenzen zeigen nur, was `src/config/projects.js` belegt:
// keine Orte, Jahre, Bauzeiten, Fotos oder Stimmen.
import { COMPANY_DATA } from '@/config/company';
import { MUSTERBAEDER } from '@/config/musterbaeder';
import { PORTFOLIO_PROJECTS, categories as projektKategorien, isPlaceholderProject } from '@/config/projects';
import { Abschnitt } from '@/components/kern/vorlagen/teile';
import Kopf from '@/components/kern/vorlagen/liste/Kopf';
import Raster from '@/components/kern/vorlagen/detail/Raster';
import Randfeld from '@/components/kern/vorlagen/detail/Randfeld';
import Steckbrief from '@/components/kern/vorlagen/detail/Steckbrief';
import Bestandteile from '@/components/kern/vorlagen/detail/Bestandteile';
import { Musterfeld, Umfang, Vermerk } from '@/components/kern/vorlagen/detail/Umfang';
import { Platzflaeche, Tafelkopf } from '@/components/kern/vorlagen/teile/Vorschau';

function Referenz({ id }: { id: string }) {
  const project = PORTFOLIO_PROJECTS.find((p) => p.id === id)!;
  const placeholder = isPlaceholderProject(project);
  const categoryName = projektKategorien.find((c) => c.id === project.category)?.name || project.category;
  return (
    <>
      <Kopf
        seitenart="erzaehl"
        titelId={`referenz-${id}`}
        ruecklink={{ href: '/referenzen', titel: 'Zurück zur Referenzen-Übersicht' }}
        etiketten={[...(placeholder ? ['Projektdokumentation in Vorbereitung'] : []), categoryName]}
        titel={project.title}
        vorspann={project.description}
        knoepfe={[
          ...(project.serviceLink ? [{ text: `Leistungsdetails: ${project.title}`, href: project.serviceLink, art: 'haupt' as const, zeichen: 'pfeil' as const }] : []),
          { text: 'Vor-Ort-Aufmaß anfragen', href: '/kontakt', art: 'neben' },
        ]}
      />
      <Abschnitt>
        <Raster
          haupt={
            <div className="flex flex-col gap-k-7">
              <Umfang
                titel={placeholder ? 'Was ein solches Projekt umfasst' : `Projekt-Überblick: ${project.title}`}
                text={
                  placeholder
                    ? `Dieses Leistungsbeispiel beschreibt einen typischen Projekttyp aus dem Bereich ${categoryName}. Der genaue Umfang richtet sich nach Ihrem Objekt und wird beim Vor-Ort-Aufmaß festgelegt.`
                    : undefined
                }
                gruppen={[
                  { titel: 'Typischer Leistungsumfang', punkte: project.scopeItems },
                  { titel: 'Unser Qualitätsstandard', punkte: COMPANY_DATA.qualityPromises.slice(0, 4).map((q) => q.title), spalten: 2 },
                ]}
              />
              {placeholder ? (
                <Vermerk
                  titel="Fotos und Details folgen"
                  text={`Detaillierte Baustellenfotos und Kundendokumentationen für ${project.title} veröffentlichen wir aus Diskretionsgründen ausschließlich mit ausdrücklicher Freigabe der Bauherren. Authentische Erfahrungsberichte finden Sie in unseren Google-Bewertungen.`}
                  verweis={{ titel: 'Echte Kundenbewertungen lesen', href: '/referenzen#bewertungen' }}
                />
              ) : null}
            </div>
          }
          neben={
            <Randfeld
              klebend
              motiv={<Musterfeld zeichen={project.category === 'bad' ? 'bad' : undefined} />}
              titel={placeholder ? 'Auf einen Blick' : 'Projektdaten im Detail'}
              vorWegen="Planen Sie ein ähnliches Projekt?"
              aktionen={[
                { text: 'Jetzt Beratung anfragen', href: '/kontakt', art: 'haupt', zeichen: 'pfeil' },
                ...(project.serviceLink ? [{ text: `Fachbereich zu ${project.title} ansehen`, href: project.serviceLink }] : []),
              ]}
            >
              <Steckbrief
                angaben={[
                  { begriff: 'Kategorie', wert: categoryName },
                  ...(placeholder ? [{ begriff: 'Status', wert: 'Dokumentation in Vorbereitung', zeichen: 'hinweis' as const }] : []),
                ]}
              />
            </Randfeld>
          }
        />
      </Abschnitt>
      <Platzflaeche>Qualitätsversprechen (gemeinsamer Abschnitt, nicht P4-02)</Platzflaeche>
    </>
  );
}

function Musterbad({ slug }: { slug: string }) {
  const bath = MUSTERBAEDER.find((b) => b.slug === slug)!;
  const { contact, legalName } = COMPANY_DATA;
  // Bestand liest `bath.sizeM2`, das Feld gibt es in `musterbaeder.js` nicht: Ausgabe „( m²)“ (Altfehler, OFFENE FRAGE).
  const groesse = '';
  return (
    <>
      <Kopf
        seitenart="erzaehl"
        titelId="musterbad-heading"
        ruecklink={{ href: '/bad/musterbaeder', titel: 'Zurück zur Musterbad-Übersicht' }}
        etiketten={[bath.size, bath.tier]}
        titel={`Musterbad ${bath.title} – Komplettbad & Badsanierung`}
        vorspann={`${bath.headline}: Unser Musterbad ${bath.title} bietet Ihnen ein schlüsselfertiges Komplettbad und eine professionelle Badsanierung von Fachbetrieb Tezgel in Aßlar und Wetzlar. Entdecken Sie alle Ausstattungsdetails, Sanitärobjekte und Markenkomponenten für Ihre Badplanung.`}
        hinweis="Verbindlicher Festpreis nach kostenfreiem Vor-Ort-Aufmaß – abgestimmt auf Ihren Grundriss."
      />
      <Abschnitt
        titelId="komponenten-heading"
        kopfLage="geteilt"
        kopfGroesse="mittel"
        etikett="Ausstattung"
        titel="Detaillierte Ausstattungs- und Komponentenliste"
        einleitung={`Transparente Komponentenübersicht für das ${bath.title} (${groesse} m²): Alle Sanitärelemente, Armaturen und Fliesenoberflächen stimmen wir passgenau auf Ihren Grundriss ab.`}
      >
        <Raster
          haupt={<Bestandteile gruppen={bath.components.map((c) => ({ name: c.category, punkte: c.items }))} />}
          neben={
            <Randfeld
              klebend
              titelId="musterbad-anfragen-heading"
              titel="Dieses Musterbad anfragen"
              text={`Möchten Sie das ${bath.title} (${groesse} m²) in Ihrem Zuhause umsetzen? Wir passen Fliesenraster, Sanitärobjekte und Anschlüsse exakt an Ihre Raumsituation an.`}
              aktionen={[
                { text: 'Konzept unverbindlich anfragen', href: '#anfrage', art: 'haupt', zeichen: 'pfeil' },
                { text: `Direkt anrufen: ${contact.phone}`, href: `tel:${contact.phoneLink}`, zeichen: 'telefon' },
              ]}
              zusagen={{ titel: `Ihre Sicherheiten bei ${legalName}:`, punkte: ['Festpreisgarantie', 'Verbindlicher Bauzeitplan', 'Staubarme Sanierung'] }}
            />
          }
        />
      </Abschnitt>
      <Platzflaeche>#anfrage · Badanfrage (F-04, Kern-Ansicht aus P4-05a)</Platzflaeche>
    </>
  );
}

export default function VorschauDetail() {
  return (
    <>
      <Tafelkopf>Vorschau P4-02 · Vorlage Detail · /referenzen/barrierefreies-duschbad (Platzhalter-Referenz, langer Titel)</Tafelkopf>
      <Referenz id="barrierefreies-duschbad" />
      <Tafelkopf>Vorschau P4-02 · Vorlage Detail · /bad/musterbaeder/basic-bad-4_6</Tafelkopf>
      <Musterbad slug="basic-bad-4_6" />
    </>
  );
}
