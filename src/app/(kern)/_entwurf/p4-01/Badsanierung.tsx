// Vorschau P4-01 · /bad/badsanierung aus der Vorlage Fachseite zusammengesetzt (ruhender Entwurf, wird nie freigeschaltet).
// Wortlaut, Ziele, IDs und Reihenfolge wörtlich aus `src/app/(bestand)/bad/badsanierung/page.jsx`; Daten aus `@/config/*`.
// Keine Tailwind-Klassen in dieser Datei (`_entwurf` wird nicht gescannt) – nur Vorlagen-Teile mit Props.
// Der BadanfrageFunnel (F-04) bekommt seine Kern-Ansicht in P4-05a; bis dahin steht ein markierter Platzhalter.
import { COMPANY_DATA } from '@/config/company';
import { REVIEWS } from '@/config/reviews';
import VerlegeplanBad from '@/components/kern/motive/VerlegeplanBad';
import { ANRISS } from '@/components/kern/start/vertrauen/stimmen-daten';
import { Ablauf, Anfrage, Einstieg, Qualitaetsversprechen, Stimme, Trenner } from '@/components/kern/vorlagen/fachseite';
import { VorschauPlatzhalter } from '@/components/kern/vorlagen/fachseite/Vorschau';

const WORKFLOW_STEPS = [
  { step: '01', title: 'Vor-Ort-Beratung & Aufmaß', desc: 'Wir messen Ihr bestehendes Bad millimetergenau aus und erfassen Ihre Wünsche, Lebensgewohnheiten und Ihr Budget.' },
  { step: '02', title: 'Badplanung & Materialauswahl', desc: 'Gemeinsame Planung von Aufteilung, Fliesenformat und Fugenbild sowie Auswahl von Keramik, Armaturen, Fliesen und Beleuchtung.' },
  { step: '03', title: 'Verbindliches Festpreisangebot', desc: 'Sie erhalten ein detailliertes Angebot mit Festpreisgarantie und einem verbindlichen Bauzeitplan ohne versteckte Kosten.' },
  { step: '04', title: 'Staubarme Demontage', desc: 'Luftreiniger, Staubschutzwände und Schutzvliese verhindern die Staubausbreitung in Ihren Wohnräumen beim Rückbau der alten Installationen.' },
  { step: '05', title: 'Abdichtung & Fachverlegung', desc: 'Normgerechte Verbundabdichtung nach DIN 18534 und millimetergenaue Fliesenverlegung – Sanitär-, Trockenbau- und Elektroarbeiten werden im Bauablauf eng abgestimmt.' },
  { step: '06', title: 'Endreinigung & Abnahme', desc: 'Besenreine Endreinigung, Funktionsprüfung aller Elemente, Hinweise zur Pflege und gemeinsame Abnahme Ihres neuen Bades.' },
];

export default function Badsanierung() {
  const { authority, contact, owner } = COMPANY_DATA;
  const review = REVIEWS.find((r) => r.id === 'c-wolf');

  return (
    <>
      <Einstieg
        titelId="badsanierung-heading"
        etikett={
          <>
            <span>HWK Fachbetrieb</span>
            <Trenner />
            <span>{authority.shortName}</span>
          </>
        }
        titel="Badsanierung in Aßlar & Wetzlar:"
        unterzeile="Ihr neues Traumbad ohne Stress & zum Festpreis"
        vorspann={`Ihre professionelle Badsanierung in Aßlar & Wetzlar: Als spezialisierter Fachbetrieb Tezgel realisieren wir schlüsselfertige Komplettbäder und Ihr neues Traumbad ohne Stress zum verbindlichen Festpreis. Wir verwandeln alte Bäder in moderne Wohlfühloasen – mit persönlicher Betreuung durch ${owner.fullName} und konsequentem Staubschutz.`}
        knoepfe={[
          { text: 'Bad-Projektcheck starten', href: '/bad/projekt-check', zeichen: 'pfeil' },
          { text: contact.phone, href: `tel:${contact.phoneLink}`, zeichen: 'telefon', mono: true },
        ]}
        motiv={<VerlegeplanBad achse={false} />}
      />

      <Ablauf
        titelId="workflow-heading"
        etikett="Der Weg zum neuen Bad"
        titel="In 6 Schritten zu Ihrem schlüsselfertigen Wohlfühlbad"
        einleitung={`Abgestimmte Gewerke und persönliche Betreuung durch ${owner.fullName}. Sie lehnen sich entspannt zurück.`}
        schritte={WORKFLOW_STEPS.map((s) => ({ nummer: s.step, titel: s.title, text: s.desc, titelVorsatz: `Schritt ${s.step}: ` }))}
      >
        {review ? (
          <Stimme
            zitat={review.text}
            anriss={ANRISS[review.id]}
            name={review.author}
            quelle={`${review.source}-Rezension`}
            thema={review.topic}
            bewertung={{ wert: review.rating, max: 5, text: `${review.rating} von 5 Sternen` }}
            aktionen={[
              { text: 'Aufmaß anfragen', href: '/kontakt', art: 'haupt' },
              { text: 'Alle Bewertungen', href: '/referenzen', art: 'neben', zeichen: 'pfeil' },
            ]}
          />
        ) : null}
      </Ablauf>

      <Qualitaetsversprechen />

      <Anfrage id="anfrage" ariaLabel="Badanfrage">
        <VorschauPlatzhalter>BadanfrageFunnel (F-04) · Kern-Ansicht folgt in P4-05a</VorschauPlatzhalter>
      </Anfrage>
    </>
  );
}
