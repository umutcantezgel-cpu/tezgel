// Vorschau P4-01 · Zustände der Vorlage Fachseite (ruhender Entwurf, wird nie freigeschaltet).
// Jeder Teil, der in den beiden Seiten oben nicht oder nur in einer Form vorkommt, steht hier mit Wortlaut echter
// Bestandsseiten (Konstanten maschinell übernommen, nur lucide-Icons entfernt): Barrierefreies Bad (langer H1, Merkfeld als
// Abschnitt, Felder-Raster 3), Innentreppe (Einstieg mit Nachsatz und Schriftfeld ohne Motiv, Tabelle mit vier Spalten,
// Stimme als eigener Abschnitt, Querverweise mit Beschreibung und Knöpfen), Balkonsanierung (Felder geordnet,
// Ablauf mit vier Schritten), Förderung (Faktenfeld-Raster mit Merkfeld H3, Fragen mit H3 und erster Frage offen),
// Fliesenreparatur (Felder mit eigenen Breiten und Listen, Abschluss mit Punkten und Hinweiszeile) und ein Leerzustand.
// Fokus: mit der Tabulatortaste durch die Seite (Ring 2 px an jedem Link, Knopf und summary).
// 320 px: über das Ansichtsraster des Orchestrators (Fotos 320/390/768/1440); alle Teile sind mobil zuerst gebaut.
// Keine Tailwind-Klassen in dieser Datei (`_entwurf` wird nicht gescannt).
import { COMPANY_DATA } from '@/config/company';
import { REVIEWS } from '@/config/reviews';
import { Textlink } from '@/components/kern/basis';
import { ANRISS } from '@/components/kern/start/vertrauen/stimmen-daten';
import {
  Abschluss,
  Ablauf,
  Einstieg,
  Faktenfeld,
  Felder,
  Fragen,
  Mass,
  Merkfeld,
  PlanDerSeite,
  Punkte,
  Querverweise,
  SchriftfeldBetrieb,
  Stimme,
  Tabelle,
  Trenner,
} from '@/components/kern/vorlagen/fachseite';
import { VorschauTrenner } from '@/components/kern/vorlagen/fachseite/Vorschau';

const GRANT_ITEMS = [
  { rate: '§ 40 SGB XI', title: 'Pflegekassen-Zuschuss', desc: 'Bis zu 4.180 € pro pflegebedürftiger Person für Maßnahmen zur Wohnumfeldverbesserung, z. B. die bodengleiche Dusche statt Badewanne.' },
  { rate: 'Pflegegrad 1–5', title: 'Voraussetzung', desc: 'Den Zuschuss der Pflegekasse erhalten Pflegebedürftige mit anerkanntem Pflegegrad.' },
  { rate: 'KfW 159', title: 'Altersgerecht Umbauen', desc: 'Über das KfW-Programm 159 („Altersgerecht Umbauen“) können barrierefreie Bäder gefördert werden.' },
  { rate: 'Antrag', title: 'Prüffähiger Kostenvoranschlag', desc: 'Wir erstellen den prüffähigen Kostenvoranschlag und begleiten Ihren Antrag von Anfang an.' }
];

const foerderFaqs = [
  {
    q: 'Wie läuft der Antrag auf den Pflegekassen-Zuschuss ab?',
    a: 'Wir erstellen für Ihr barrierefreies Bad den prüffähigen Kostenvoranschlag, den Sie bei Ihrer Pflegekasse einreichen. Stellen Sie den Antrag möglichst vor Beginn der Arbeiten – wir begleiten Sie von Anfang an.'
  },
  {
    q: 'Welche Voraussetzungen gelten für den Zuschuss der Pflegekasse?',
    a: 'Voraussetzung ist ein Pflegegrad (1–5). Die Pflegekasse bezuschusst dann Maßnahmen zur Wohnumfeldverbesserung – z. B. eine bodengleiche Dusche statt Badewanne oder schwellenlose Zugänge – mit bis zu 4.180 € pro pflegebedürftiger Person.'
  },
  {
    q: 'Gibt es auch Fördermittel für die Badsanierung?',
    a: 'Ja, über das KfW-Programm 159 („Altersgerecht Umbauen“) können barrierefreie Bäder gefördert werden. Zudem bezuschusst die Pflegekasse Maßnahmen zur Wohnumfeldverbesserung nach § 40 SGB XI mit bis zu 4.180 Euro pro pflegebedürftiger Person.'
  },
  {
    q: `Unterstützt ${COMPANY_DATA.legalName} mich bei den Formalitäten?`,
    a: 'Selbstverständlich! Wir erstellen den prüffähigen Kostenvoranschlag für Ihren Antrag und begleiten Sie Schritt für Schritt – vom kostenfreien Vor-Ort-Aufmaß bis zur Abnahme.'
  }
];

const CAUSES = [
  {
    title: 'Fehlendes Gefälle',
    text: 'Liegt die Fläche waagerecht oder sogar zum Haus geneigt, bleibt Wasser stehen, dringt in Fugen ein und gefriert im Winter.'
  },
  {
    title: 'Abdichtungsfehler',
    text: 'Keine Abdichtung, eine Abdichtung ohne ausreichend hohe Anschlüsse an Wand und Tür oder eine Abdichtung unter einem Estrich, der sich dann dauerhaft mit Wasser vollsaugt.'
  },
  {
    title: 'Falscher Aufbau',
    text: 'Innenfliesen ohne Frostbeständigkeit, ein Mörtelbett ohne Entwässerung, fehlende Bewegungsfugen oder eine Kante, über die Wasser an der Stirnseite herunterläuft.'
  }
];

const STEPS = [
  {
    step: '01',
    title: 'Rückbau',
    text: 'Alter Belag, Mörtelbett und – wenn nötig – ein durchfeuchteter Estrich werden entfernt, bis ein tragfähiger Untergrund freiliegt.'
  },
  {
    step: '02',
    title: 'Untergrundprüfung',
    text: 'Wir prüfen Tragfähigkeit, Feuchte, Ebenheit und Gefälle. Schäden an der Betonplatte selbst werden vor dem Weiterbau durch einen Fachbetrieb instand gesetzt.'
  },
  {
    step: '03',
    title: 'Gefälle & Abdichtung',
    text: 'Ein Gefälle vom Gebäude weg wird hergestellt, darauf folgt die Abdichtung mit sauber ausgebildeten Anschlüssen an Wand, Tür, Brüstung und Durchdringungen.'
  },
  {
    step: '04',
    title: 'Neuer Belag',
    text: 'Je nach Aufbauhöhe und Situation folgt ein Belag auf Stelzlagern, im Splittbett oder in gebundener Verlegung – mit Randabschluss und Tropfkante.'
  }
];

const EDGES = [
  {
    title: 'Gehrungskante',
    how: 'Tritt- und Setzstufe werden an der Kante im 45°-Winkel geschnitten und passgenau gestoßen; die Kante wird leicht gefast.',
    pros: 'Durchgehende Materialoptik ohne sichtbares Metall; wirkt wie aus dem Vollen gearbeitet.',
    cons: 'Hoher Schneidaufwand, nur mit dichtem, durchgefärbtem Material wirklich schön; die Kante ist stoßempfindlicher als mit Profil.'
  },
  {
    title: 'Stufenprofil',
    how: 'Ein Treppenkantenprofil – etwa aus Edelstahl – wird beim Verlegen mit eingebettet und schließt die Vorderkante ab.',
    pros: 'Schützt die Fliesenkante vor Abplatzungen, deutlich sichtbare Stufenkante; manche Profile haben eine rutschhemmende Einlage.',
    cons: 'Metall bleibt sichtbar und prägt die Optik; das Profil muss zur Belagdicke passen.'
  },
  {
    title: 'Stufenplatte',
    how: 'Fertige Stufenfliesen oder Natursteinplatten mit werkseitig bearbeiteter Vorderkante (gerundet oder gefast).',
    pros: 'Robuste, ab Werk saubere Kante; beim Naturstein massiver Eindruck.',
    cons: 'Abmessungen durch das Sortiment bzw. den Zuschnitt vorgegeben; passende Bodenfliesen im gleichen Dekor sind nicht immer verfügbar.'
  }
];

const WEITERLESEN = [
  { title: 'Treppen im Überblick', path: '/treppen', desc: 'Voraussetzungen, Belagsarten und Steigungen' },
  { title: 'Wohnbereiche fliesen', path: '/leistungen/wohnen', desc: 'Flur, Wohnraum und Treppe aus einem Guss' },
  { title: 'Verlegemuster & Abschlüsse', path: '/fliesen/verlegemuster', desc: 'Fugenbild, Kanten und Sockel' },
  { title: 'Rutschhemmung', path: '/blog/rutschfeste-fliesen-r-klassen', desc: 'R-Klassen nach DIN EN 16165 erklärt' }
];

const REPAIRS = [
  'Einzelne gesprungene, abgeplatzte oder hohl liegende Boden- und Wandfliesen',
  'Lose oder beschädigte Sockelfliesen',
  'Ausgebrochene Zementfugen und gerissene Silikonfugen',
  'Beschädigte Stufenkanten und lose Stufenplatten',
  'Bohrlöcher nach einem Umbau oder Fliesen hinter entfernten Einbauten'
];

const NOT_WORTH_IT = [
  'Viele Fliesen klingen hohl oder lösen sich auf größerer Fläche',
  'Risse laufen über mehrere Fliesen hinweg – ein Hinweis auf Bewegungen im Untergrund',
  'Hinter den Fliesen ist es dauerhaft feucht, die Abdichtung ist vermutlich defekt',
  'Es sind so viele Ersatzfliesen nötig, dass keine passenden mehr zu bekommen sind'
];

const SOLUTIONS = [
  { title: 'Bodengleiche Walk-In-Duschen', desc: 'Schwellenloser Einstieg ohne Stolperfallen. Integrierte Duschrinne, rutschhemmende Fliesen (R10B) und breite Glaszugänge.' },
  { title: 'Wanne-zur-Dusche-Umbau', desc: 'Wir tauschen Ihre alte, hohe Badewanne gegen eine moderne, begehbare Duschzone – normgerecht abgedichtet nach DIN 18534.' },
  { title: 'Unterfahrbare Waschtische', desc: 'Ergonomische Waschtischanlagen mit Beinfreiheit für Rollstuhlfahrer und komfortable Einhebel- oder Sensorarmaturen.' },
  { title: 'Komfort- & Dusch-WCs', desc: 'Höhenverstellbare oder erhöhte WCs für bequemes Aufstehen sowie moderne Dusch-WCs für optimale Intimhygiene auf Knopfdruck.' },
  { title: 'Design-Haltegriffsysteme', desc: 'Stabile, geprüfte Stützklappgriffe und Duschhandläufe, die sich harmonisch in modernes Baddesign einfügen.' },
  { title: 'Rutschhemmung & Beleuchtung', desc: 'Sichere Bodenbeläge, blendfreie LED-Beleuchtung mit Orientierungslicht und schwellenlose Bewegungsflächen.' }
];

const ANFRAGE_FOTOS = [
  'eine Nahaufnahme des Schadens',
  'ein Übersichtsfoto des Raums bzw. der Fläche',
  'Format der Fliese (z. B. mit Zollstock im Bild)',
  'ob noch Restfliesen vorhanden sind',
];

const WASSER_TRITT_AUS = [
  'Absperrventil bzw. Hauptabsperrhahn hinter dem Wasserzähler schließen',
  'Elektrische Geräte im betroffenen Bereich nur stromlos schalten, wenn das gefahrlos möglich ist',
  'Wasser aufnehmen und den Schaden für die Versicherung fotografieren',
  'Einen Installateur mit der Behebung der Leckage beauftragen',
];

export default function Zustaende() {
  const { contact, hours } = COMPANY_DATA;
  const treppe = REVIEWS.find((r) => r.id === 'sara-j');

  return (
    <>
      <VorschauTrenner hinweis="Langer Text: längste H1 der Fachseiten, Komposita in Feldern; Merkfeld als eigener Abschnitt (H2)">
        Zustand · Barrierefreies Bad
      </VorschauTrenner>
      <Einstieg
        titelId="barrierefrei-heading"
        etikett={
          <>
            <span>DIN 18040-2</span>
            <Trenner />
            <span>Barrierefreies Wohnen</span>
          </>
        }
        titel="Barrierefreie Badmodernisierung in Aßlar & Wetzlar:"
        unterzeile="Sicherheit, Komfort & bis zu 4.180 € Zuschuss"
        vorspann="Eine barrierefreie Badmodernisierung und Badsanierung nach DIN 18040-2 durch Fachbetrieb Tezgel in Aßlar & Wetzlar schenkt Sicherheit, Komfort und Selbstbestimmung im eigenen Zuhause. Wir gestalten Ihr Badezimmer altersgerecht, rollstuhlgerecht oder barrierearm – mit bodengleichen Duschen, rutschfesten Böden und bis zu 4.180 € Zuschuss der Pflegekasse."
        knoepfe={[
          { text: 'Pflegekassen-Beratung vereinbaren', href: '/kontakt', zeichen: 'pfeil' },
          { text: contact.phone, href: `tel:${contact.phoneLink}`, zeichen: 'telefon', mono: true },
        ]}
        motiv={<PlanDerSeite pfad="/bad/barrierefreies-bad" />}
      />
      <Merkfeld
        ebene="h2"
        titelId="zuschuss-heading"
        etikett="Zuschuss für wohnumfeldverbessernde Maßnahmen (§ 40 SGB XI)"
        titel="Bis zu 4.180 € Zuschuss von der Pflegekasse"
        text="Bereits ab Pflegegrad 1 bezuschusst die Pflegekasse den Umbau auf ein barrierefreies Bad mit bis zu 4.180 € pro Person (bei Ehepaaren mit Pflegegrad sogar bis zu 8.360 €). Wir erstellen für Sie den förderkonformen Kostenvoranschlag."
        knoepfe={[{ text: 'Beratung anfordern', href: '/kontakt', zeichen: 'pfeil' }]}
      />
      <Felder
        titelId="loesungen-heading"
        etikett="Barrierefreie Lösungen"
        titel="Unsere barrierefreien Bad-Lösungen im Detail"
        einleitung="Ästhetik trifft auf maximale Sicherheit – ohne sterilen Krankenhaus-Charakter."
        spalten={3}
        eintraege={SOLUTIONS.map((s) => ({ titel: s.title, inhalt: s.desc }))}
      />

      <VorschauTrenner hinweis="Einstieg ohne Motiv mit Schriftfeld (E-027: Kennzeile, Kammer, Bewertung) und Nachsatz; Tabelle mit vier Spalten ohne Beschriftung (mobil Etiketten über data-spalte); Stimme als eigener Abschnitt; Querverweise mit Beschreibung und Knöpfen">
        Zustand · Innentreppe
      </VorschauTrenner>
      <Einstieg
        titelId="innentreppe-heading"
        etikett={
          <>
            <span>Treppen</span>
            <Trenner />
            <span>Innenbereich</span>
          </>
        }
        titel="Innentreppe fliesen:"
        unterzeile="Stufen, Setzstufen und Sockel aus einem Guss"
        vorspann="Ob Neubau oder Renovierung: Eine massive Betontreppe im Haus lässt sich mit Feinsteinzeug oder Naturstein passend zum Wohnbereich belegen. Entscheidend sind exaktes Aufmaß, die richtige Kantenlösung und eine vollflächige Verlegung."
        knoepfe={[
          { text: 'Aufmaß für Ihre Treppe anfragen', href: '/kontakt', zeichen: 'pfeil' },
          { text: 'Alle Treppentypen', href: '/treppen', art: 'neben' },
        ]}
        nachsatz={
          <p>
            Voraussetzung ist eine tragfähige Massivtreppe – Holz- und Stahltreppen sind für starre Beläge nicht ohne Weiteres
            geeignet. <Textlink href="/treppen">Was sich belegen lässt</Textlink>
          </p>
        }
        schriftfeld={<SchriftfeldBetrieb />}
      />
      <Tabelle
        titelId="kanten-heading"
        etikett="Kantenlösungen im Vergleich"
        titel="Gehrung, Profil oder Stufenplatte?"
        einleitung="Die Vorderkante ist die am stärksten beanspruchte Stelle jeder Stufe – und prägt die Optik der ganzen Treppe. Welche Lösung passt, hängt von Material, Nutzung und Geschmack ab."
        flaeche="fliese"
        spalten={['Lösung', 'Ausführung', 'Vorteile', 'Zu beachten']}
        zeilen={EDGES.map((e) => ({ kopf: e.title, zellen: [e.how, e.pros, e.cons] }))}
      />
      {treppe ? (
        <Stimme
          abschnitt="Kundenstimme"
          zitat={treppe.text}
          anriss={ANRISS[treppe.id]}
          name={treppe.author}
          quelle={`${treppe.source}-Rezension`}
          thema={treppe.topic}
          bewertung={{ wert: treppe.rating, max: 5, text: `${treppe.rating} von 5 Sternen` }}
        />
      ) : null}
      <Querverweise
        landmarke="section"
        titelId="innentreppe-ratgeber-heading"
        titel="Weiterführende Ratgeber zu Innentreppen & Fliesenbelägen"
        verweise={WEITERLESEN.map((l) => ({ titel: l.title, href: l.path, beschreibung: l.desc }))}
        aktionen={[
          { text: 'Beratung zu Material und Kanten', href: '/beratung', art: 'neben' },
          { text: contact.phone, href: `tel:${contact.phoneLink}`, art: 'neben', zeichen: 'telefon', mono: true },
        ]}
      />

      <VorschauTrenner hinweis="Felder geordnet (Nummer „1“ wie im Bestand) mit Nachsatz und Verweis; Ablauf mit vier Schritten in einer Reihe, ohne Auftritt">
        Zustand · Balkonsanierung
      </VorschauTrenner>
      <Felder
        titelId="balkon-ursachen-heading"
        etikett="Ursachen"
        titel="Drei Fehler stecken hinter fast jedem Schaden"
        flaeche="fliese"
        geordnet
        spalten={3}
        eintraege={CAUSES.map((c, i) => ({ titel: c.title, inhalt: c.text, nummer: String(i + 1) }))}
        nachsatz={
          <p>
            Welche Ursache bei Ihrem Balkon vorliegt, klären wir vor Ort. Wie wir dabei vorgehen, beschreibt die Seite{' '}
            <Textlink href="/schadensanalyse">Schadensanalyse</Textlink>.
          </p>
        }
      />
      <Ablauf
        titelId="balkon-ablauf-heading"
        etikett="Ablauf"
        titel="In vier Schritten zum sanierten Balkon"
        auftritt={false}
        schritte={STEPS.map((s) => ({ nummer: s.step, titel: s.title, text: s.text }))}
        nachsatz={
          <p>
            Welcher Belagsaufbau im vierten Schritt passt, vergleichen wir im{' '}
            <Textlink href="/balkon-terrasse">Ratgeber Balkon &amp; Terrasse</Textlink>.
          </p>
        }
      />

      <VorschauTrenner hinweis="Faktenfeld als Raster mit Werten in Mono und Merkfeld (H3) im selben Abschnitt; Fragen mit H3, Kopf oben, erste Frage beim Laden offen, Knöpfe darunter">
        Zustand · Förderung
      </VorschauTrenner>
      <Faktenfeld
        etikett="Zuschüsse im Überblick"
        titel="Diese Förderung gibt es für Ihr barrierefreies Bad"
        einleitung="Welche Zuschüsse in Ihrem Fall infrage kommen, besprechen wir gemeinsam beim kostenfreien Vor-Ort-Aufmaß."
        eintraege={GRANT_ITEMS.map((g) => ({ wert: g.rate, titel: g.title, text: g.desc }))}
      >
        <Merkfeld
          etikett="Barrierefreie Bäder (§ 40 SGB XI)"
          titel="Bis zu 4.180 € Zuschuss für Ihr barrierefreies Bad"
          text="Für Pflegebedürftige (Pflegegrad 1–5) übernimmt die Pflegekasse bis zu 4.180 € für Maßnahmen zur Wohnumfeldverbesserung (z. B. bodengleiche Dusche statt Badewanne, schwellenlose Zugänge). Wir erstellen den prüffähigen Kostenvoranschlag."
          knoepfe={[{ text: 'Beratung vereinbaren', href: '/kontakt', zeichen: 'pfeil' }]}
        />
      </Faktenfeld>
      <Fragen
        etikett="Häufige Fragen"
        titel="Förderung für Ihr Bad – kurz erklärt"
        kopfLage="oben"
        ebene="h3"
        fragen={foerderFaqs.map((f, i) => ({ frage: f.q, antwort: f.a, offen: i === 0 }))}
        aktionen={[
          { text: contact.phone, href: `tel:${contact.phoneLink}`, art: 'neben', zeichen: 'telefon', mono: true },
          { text: 'Weitere Fragen & Antworten', href: '/faq', art: 'text', zeichen: 'pfeil' },
        ]}
      />

      <VorschauTrenner hinweis="Felder mit H2 ohne Abschnittsüberschrift (aria-label), Listen im Feld, großes Feld über zwei Spalten (spanne); Abschluss mit Punkten, Hinweiszeile und WhatsApp als Hauptweg">
        Zustand · Fliesenreparatur
      </VorschauTrenner>
      <Felder
        ariaLabel="Leistungen und Erstmaßnahmen"
        ebene="h2"
        spalten={2}
        dichte="normal"
        eintraege={[
          { titel: 'Was repariert wird', inhalt: <Punkte punkte={REPAIRS} groesse="klein" /> },
          {
            titel: 'Wasser tritt aus? Erst absperren, dann Installateur',
            inhalt: (
              <>
                <Punkte punkte={WASSER_TRITT_AUS} geordnet groesse="klein" />
                <p>
                  Leitungsarbeiten gehören nicht zu unserem Handwerk. Sobald die Leitung repariert und der Untergrund trocken ist,
                  erneuern wir Fliesen und Abdichtung – nach vereinbartem Termin.
                </p>
              </>
            ),
          },
        ]}
      />
      <Felder
        ariaLabel="Grenzen der Reparatur"
        ebene="h2"
        spalten={4}
        dichte="normal"
        eintraege={[
          {
            titel: 'Wann eine Reparatur nicht mehr sinnvoll ist',
            spanne: 2,
            inhalt: (
              <>
                <Punkte punkte={NOT_WORTH_IT} zeichen="hinweis" groesse="klein" />
                <p>
                  Dann würde eine Reparatur nur das Symptom beheben. Sinnvoller ist eine Teil- oder Komplettsanierung – wir sagen
                  Ihnen offen, was sich lohnt.
                </p>
              </>
            ),
          },
          {
            titel: 'Fugen und Silikon erneuern',
            inhalt: (
              <>
                <p>Sitzen die Fliesen fest und nur die Fugen sind verschlissen, genügt oft eine Fugensanierung.</p>
                <p>
                  <Textlink href="/fliesen/fugensanierung">Zur Fugensanierung</Textlink>
                </p>
              </>
            ),
          },
          {
            titel: 'Ursache unklar?',
            inhalt: (
              <>
                <p>Wenn Risse wiederkehren oder Feuchtigkeit im Spiel ist, klären wir zuerst die Ursache.</p>
                <p>
                  <Textlink href="/schadensanalyse">Zur Schadensanalyse</Textlink>
                </p>
              </>
            ),
          },
        ]}
      />
      <Abschluss
        titelId="anfragen-heading"
        etikett="Reparatur anfragen"
        titel="Fotos per WhatsApp senden"
        text="Mit ein paar Fotos können wir den Aufwand besser einschätzen. Hilfreich sind:"
        punkte={ANFRAGE_FOTOS}
        hinweis={`Erreichbar ${hours.formattedWeekdays} und ${hours.formattedSaturday}. Den Termin stimmen wir persönlich mit Ihnen ab.`}
        knoepfe={[
          {
            text: (
              <>
                WhatsApp: <Mass>{contact.whatsapp}</Mass>
              </>
            ),
            href: contact.whatsappLink,
            zeichen: 'whatsapp',
            extern: true,
          },
          { text: 'Kontaktformular', href: '/kontakt', art: 'neben' },
        ]}
      />

      <VorschauTrenner hinweis="Querverweise ohne Einträge: keine Ausgabe (kein leerer Rahmen, keine Überschrift ohne Inhalt)">
        Zustand · Leer
      </VorschauTrenner>
      <Querverweise titel="Weiterführende Ratgeber" verweise={[]} />
    </>
  );
}
