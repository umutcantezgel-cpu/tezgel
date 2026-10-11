// Vorschau P4-02 · Vorlage Übersicht: `/fliesen` wortgetreu aus `(bestand)/fliesen/page.jsx` zusammengesetzt.
// Wortlaut der seitenlokalen Listen (GUIDE_SECTIONS, WEITERLESEN, Zusagen) als Kopie, Daten aus `@/config/*`.
// Gemeinsame Abschnitte: Abschluss als Kern-Abschnitt (Standardwortlaut FinalCTA), Konfigurator und Qualitätsversprechen
// als markierte Platzflächen.
// Nur Komponenten, keine eigenen Klassen (`_entwurf` wird von Tailwind nicht gelesen).
// P4-10a: dieselben Inhalte über die gemeinsamen Teile (`@/components/kern/vorlagen/teile` bzw. die Namen der Übersicht).
import { COMPANY_DATA } from '@/config/company';
import { RATING_SUMMARY } from '@/config/reviews';
import { TOPIC_HUBS } from '@/config/topics';
import { Textlink } from '@/components/kern/basis';
import { Abschnitt, Querverweise } from '@/components/kern/vorlagen/teile';
import Einstieg from '@/components/kern/vorlagen/uebersicht/Einstieg';
import Verzeichnis from '@/components/kern/vorlagen/uebersicht/Verzeichnis';
import Felder from '@/components/kern/vorlagen/uebersicht/Felder';
import Projektband from '@/components/kern/vorlagen/uebersicht/Projektband';
import { Platzflaeche, Tafelkopf } from '@/components/kern/vorlagen/teile/Vorschau';
import Abschluss from '@/components/kern/start/Abschluss';

const FLIESEN_HUB = TOPIC_HUBS.find((hub) => hub.id === 'fliesen');
const HUB_PAGES = FLIESEN_HUB ? FLIESEN_HUB.pages.filter((page) => page.path !== FLIESEN_HUB.path) : [];
const OTHER_HUBS = TOPIC_HUBS.filter((hub) => hub.id !== 'fliesen');

const GUIDE_SECTIONS = [
  {
    id: 'raeume',
    eyebrow: 'Räume',
    title: 'Wohnbereich, Küche, Flur und Diele – worauf es jeweils ankommt',
    text: 'Jeder Raum stellt andere Anforderungen an den Belag. Im Wohnbereich zählen ruhige Flächen und saubere Übergänge, in der Küche Fleck- und Fettbeständigkeit sowie belastbare Fugen, im Flur Abriebfestigkeit, Schmutzfang und Trittsicherheit bei nassen Schuhen. Wer mehrere Räume in einem Zug belegt, plant Fugenachsen und Verlegerichtung über die Türen hinweg.',
    links: [
      { label: 'Küche fliesen', href: '/fliesen/kueche' },
      { label: 'Flur & Diele fliesen', href: '/fliesen/flur-diele' },
      { label: 'Fugenachsen über mehrere Räume', href: '/fliesen/verlegemuster' },
    ],
  },
  {
    id: 'neubau-bestand',
    eyebrow: 'Neubau oder Bestand',
    title: 'Zwei Ausgangslagen, zwei Abläufe',
    text: 'Im Neubau ist der Fliesenleger ein Glied im Bauablauf: Estrich, Putz und Installation müssen fertig sein, der Estrich belegreif. Im bewohnten Bestand geht es um Etappen, Räumung, Staubschutz und die Frage, ob alte Fliesen bleiben können oder zurückgebaut werden. Beide Wege beginnen mit einem Aufmaß und einer Prüfung des Untergrunds.',
    links: [
      { label: 'Fliesen im Neubau', href: '/fliesen/neubau' },
      { label: 'Renovierung im Bestand', href: '/fliesen/renovierung' },
      { label: 'Estrich & Belegreife', href: '/untergrund-abdichtung/estrich-belegreife' },
    ],
  },
  {
    id: 'formate',
    eyebrow: 'Formate & Materialien',
    title: 'Feinsteinzeug, Holzoptik, XXL-Großformate',
    text: 'Feinsteinzeug ist dicht, frostbeständig und für fast alle Bereiche geeignet – vom Wohnzimmer bis zur Terrasse. Holzoptik-Dielen verbinden Dielencharakter mit keramischer Pflegeleichtigkeit, Großformate schaffen fugenarme, ruhige Flächen. Je größer und länger das Format, desto höher die Anforderungen an Ebenheit, Bettung und Handling.',
    links: [
      { label: 'Fliesenarten im Vergleich', href: '/fliesen/fliesenarten' },
      { label: 'Fliesen in Holzoptik', href: '/fliesen/holzoptik' },
      { label: 'XXL-Großformate', href: '/fliesen/grossformat' },
    ],
  },
  {
    id: 'technik',
    eyebrow: 'Verlegetechnik',
    title: 'Verlegetechnik, Verlegemuster und saubere Abschlüsse',
    text: 'Ein dauerhafter Belag entsteht aus dem Zusammenspiel von Untergrund, Kleber, Bettung und Fugen. Das Verlegemuster bestimmt Raumwirkung und Verschnitt, Sockel, Gehrungskanten und Profile entscheiden über den fertigen Eindruck. Auf Fußbodenheizung kommen verformbare Kleber und ein durchdachter Fugenplan hinzu.',
    links: [
      { label: 'Verlegetechnik & Werkstoffe', href: '/fliesen/verlegetechnik' },
      { label: 'Verlegemuster & Abschlüsse', href: '/fliesen/verlegemuster' },
      { label: 'Fliesen auf Fußbodenheizung', href: '/fliesen/auf-fussbodenheizung' },
    ],
  },
  {
    id: 'planung',
    eyebrow: 'Planung & Qualität',
    title: 'Konfigurator, Angebot verstehen, Abnahme',
    text: 'Mit dem Fliesen-Konfigurator bereiten Sie Ihr Projekt strukturiert vor und erhalten einen Richtwert für den Materialbedarf. Das verbindliche Festpreisangebot entsteht erst nach dem kostenfreien Vor-Ort-Aufmaß. Bei der Abnahme prüfen wir gemeinsam Ebenheit, Fugenbild und Anschlüsse – und bei älteren Flächen hilft oft schon eine Fugensanierung.',
    links: [
      { label: 'Fliesen-Konfigurator', href: '/fliesen/konfigurator' },
      { label: 'Festpreisangebot verstehen', href: '/fliesen/festpreisangebot' },
      { label: 'Abnahme & Qualität', href: '/fliesen/abnahme' },
      { label: 'Fugensanierung', href: '/fliesen/fugensanierung' },
    ],
  },
];

const BAD_FELD = {
  id: 'bad',
  eyebrow: 'Bad, Dusche & Gäste-WC',
  title: 'Badsanierung hat einen eigenen Bereich',
  text: 'Rund ums Bad – Walk-In-Dusche, Abdichtung nach DIN 18534, Fliesen im Nassbereich, Gäste-WC – finden Sie alles gesammelt im Bad-Bereich. Dieser Ratgeber konzentriert sich auf die übrigen Räume und die Verlegetechnik.',
  links: [
    { label: 'Zum Bad-Bereich', href: '/bad' },
    { label: 'Fliesen im Bad', href: '/bad/fliesen' },
    { label: 'Gäste-WC fliesen', href: '/blog/gaeste-wc-fliesen' },
  ],
};

const WEITERLESEN = [
  { label: 'Feinsteinzeug oder Naturstein?', href: '/blog/feinsteinzeug-oder-naturstein-vergleich' },
  { label: 'Rutschfeste Fliesen: R-Klassen erklärt', href: '/blog/rutschfeste-fliesen-r-klassen' },
  { label: 'Fliesen richtig reinigen und pflegen', href: '/blog/fliesen-reinigen-pflegen' },
  { label: 'Referenzen ansehen', href: '/referenzen' },
];

export default function VorschauUebersicht() {
  const google = RATING_SUMMARY.google;
  const { business, authority, legalName, owner, contact } = COMPANY_DATA;
  return (
    <>
      <Tafelkopf>Vorschau P4-02 · Vorlage Übersicht · /fliesen wortgetreu</Tafelkopf>
      <Einstieg
        titelId="fliesen-hub-heading"
        etiketten={[`Fliesen-Ratgeber · Gegründet ${business.establishmentYear} · Fachbetrieb (${authority.shortName})`]}
        titel="Fliesen-Ratgeber: Formate, Räume und Verlegetechnik verständlich erklärt"
        vorspann="In unserem Fliesen-Ratgeber erklären wir Formate, Räume, Material und Verlegetechnik verständlich aus der Praxis. Welche Fliese passt in welchen Raum, was verlangen Großformate vom Untergrund und woran erkennen Sie eine saubere Verlegung? Hier bündeln wir das Fachwissen aus unserem Alltag als Fachbetrieb Fliesen Tezgel – damit Sie Ihre Möglichkeiten kennen, bevor Sie anfragen."
        knoepfe={[
          { text: 'Projekt im Konfigurator vorbereiten', href: '/fliesen/konfigurator', art: 'haupt', zeichen: 'pfeil' },
          { text: 'Leistung: Wohnbereiche & Neubau', href: '/leistungen/wohnen' },
        ]}
      />

      <Abschnitt
        titelId="fliesen-themen-heading"
        kopfLage="geteilt"
        etikett="Alle Themen"
        titel={`${FLIESEN_HUB ? FLIESEN_HUB.name : 'Fliesen & Verlegung'} im Überblick`}
        einleitung={FLIESEN_HUB ? `${FLIESEN_HUB.description}.` : undefined}
      >
        <Verzeichnis labelledBy="fliesen-themen-heading" eintraege={HUB_PAGES.map((p) => ({ href: p.path, titel: p.name, beschreibung: p.desc }))} />
      </Abschnitt>

      <Abschnitt
        titelId="fliesen-wissen-heading"
        flaeche="fliese"
        fugen="oben"
        kopfLage="geteilt"
        etikett="Wissen kompakt"
        titel="Vom Raum bis zur Abnahme: die wichtigsten Weichen"
      >
        <Felder
          flaeche="kalk"
          eintraege={[...GUIDE_SECTIONS, BAD_FELD].map((s) => ({
            id: `guide-${s.id}`,
            etiketten: [s.eyebrow],
            titel: s.title,
            inhalt: s.text,
            verweise: s.links.map((l) => ({ titel: l.label, href: l.href })),
          }))}
        />
      </Abschnitt>

      <Abschnitt
        titelId="fliesen-weitere-heading"
        kopfLage="geteilt"
        etikett="Weitere Fachthemen"
        titel="Unter der Fliese und über das Wohnen hinaus"
        einleitung="Ein Fliesenbelag ist nur so gut wie sein Untergrund. Diese Ratgeber-Bereiche vertiefen die angrenzenden Themen."
      >
        <Verzeichnis
          labelledBy="fliesen-weitere-heading"
          eintraege={OTHER_HUBS.map((hub) => ({
            href: hub.path,
            titel: hub.name,
            beschreibung: hub.description,
            zusatz: `${hub.pages.length} ${hub.pages.length === 1 ? 'Seite' : 'Seiten'}`,
          }))}
        />
      </Abschnitt>

      <Abschnitt titelId="fliesen-projekt-heading" dichte="eng">
        <Projektband
          titelId="fliesen-projekt-heading"
          etikett="Vom Ratgeber zum Projekt"
          titel="Wohnbereiche, Küche, Flur und Neubau – ausgeführt vom Fachbetrieb"
          text={`Seit ${business.establishmentYear} verlegt ${legalName} Fliesen, Platten und Naturstein. Der Betrieb ist eingetragener Fachbetrieb der ${authority.name}. Sie erhalten ein kostenfreies Vor-Ort-Aufmaß, danach ein verbindliches Festpreisangebot, und bei Arbeiten im bewohnten Bestand gilt unsere Staubschutz-Garantie. Kundinnen und Kunden haben bei uns vom einzelnen Raum bis zum kompletten Haus fliesen lassen.`}
          punkte={[
            'Kostenfreies Vor-Ort-Aufmaß mit Prüfung des Untergrunds',
            'Verbindliche Festpreis-Kalkulation ohne versteckte Zusatzkosten',
            `Persönliche Betreuung durch ${owner.fullName}`,
          ]}
          beleg={{ wert: google.displayRating, text: `aus ${google.count} ${google.label} (Stand ${RATING_SUMMARY.asOf})` }}
          knoepfe={[
            { text: 'Zur Leistungsseite Wohnbereiche & Neubau', href: '/leistungen/wohnen', art: 'haupt', zeichen: 'pfeil' },
            { text: contact.phone, href: `tel:${contact.phoneLink}`, zeichen: 'telefon', mono: true },
            { text: 'Fotos per WhatsApp senden', href: contact.whatsappLink, zeichen: 'whatsapp', extern: true },
          ]}
        />
      </Abschnitt>

      <Querverweise
        form="liste"
        landmarke="section"
        dichte="eng"
        titelId="fliesen-ratgeber-heading"
        titel="Weiterführende Ratgeber zur Fliesenverlegung"
        verweise={WEITERLESEN.map((l) => ({ titel: l.label, href: l.href }))}
          nachsatz={
            <>
              Persönliche Beratung vor Ihrer Entscheidung? <Textlink href="/beratung">Fachberatung anfragen</Textlink> oder unseren{' '}
              <Textlink href="/blog">Fliesen-Ratgeber-Blog</Textlink> durchstöbern.
            </>
          }
      />

      <Platzflaeche>#konfigurator · Fliesen-Konfigurator (F-06, eigener Kern-Baustein)</Platzflaeche>
      <Platzflaeche>Qualitätsversprechen (gemeinsamer Abschnitt, nicht P4-02)</Platzflaeche>
      <Abschluss />
    </>
  );
}
