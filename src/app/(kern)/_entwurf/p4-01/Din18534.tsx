// Vorschau P4-01 · /untergrund-abdichtung/din-18534 aus der Vorlage Fachseite zusammengesetzt (ruhender Entwurf).
// Wortlaut, Ziele, IDs und Reihenfolge wörtlich aus `src/app/(bestand)/untergrund-abdichtung/din-18534/page.jsx`
// (Konstanten unten maschinell übernommen, nur die lucide-Icons entfernt); Daten aus `@/config/company`.
// Keine Tailwind-Klassen in dieser Datei (`_entwurf` wird nicht gescannt) – nur Vorlagen-Teile mit Props.
// Strukturwechsel (K-011): Einstieg · Kennliste seitlich · Tabelle auf Fliese · Felder-Raster · Felder-Zeilen auf Fliese
// mit Notiz · Prüfpunkte · Fragen seitlich · Abschluss · Querverweise · Qualitätsversprechen.
// Auftritte: Stoffe und Prüfpunkte (2 von 10 Abschnitten, K-009).
// P4-10a: Einstieg mit dem ruhenden Plan der Seite (`PLAN_JE_PFAD`: abdichtung) statt der Vignette und mit dem Schriftfeld (E-027).
import { COMPANY_DATA } from '@/config/company';
import { Textlink } from '@/components/kern/basis';
import {
  Abschluss,
  Einstieg,
  Faktenfeld,
  Felder,
  Fragen,
  Notiz,
  PlanDerSeite,
  Punkteliste,
  Qualitaetsversprechen,
  Querverweise,
  SchriftfeldBetrieb,
  Tabelle,
  Trenner,
} from '@/components/kern/vorlagen/fachseite';

const NORM_PARTS = [
  { part: 'Teil 1', text: 'Anforderungen, Planungs- und Ausführungsgrundsätze, Wassereinwirkungsklassen' },
  { part: 'Teil 2', text: 'Abdichtung mit bahnenförmigen Abdichtungsstoffen (ohne Fliesenverbund)' },
  { part: 'Teil 3', text: 'Flüssig zu verarbeitende Abdichtungsstoffe im Verbund mit Fliesen und Platten (AIV-F)' },
  { part: 'Teil 4', text: 'Abdichtung mit Gussasphalt oder Asphaltmastix' },
  { part: 'Teil 5', text: 'Bahnenförmige Abdichtungsstoffe im Verbund mit Fliesen und Platten (AIV-B)' },
  { part: 'Teil 6', text: 'Plattenförmige Abdichtungsstoffe im Verbund mit Fliesen und Platten (AIV-P)' }
];

const WATER_CLASSES = [
  {
    cls: 'W0-I',
    level: 'gering',
    definition: 'Flächen mit nicht häufiger Einwirkung aus Spritzwasser',
    examples: 'Wandflächen über Waschbecken in Bädern und über Spülbecken in häuslichen Küchen; Bodenflächen im häuslichen Bereich ohne Ablauf, z. B. in Küchen, Hauswirtschaftsräumen oder Gäste-WCs'
  },
  {
    cls: 'W1-I',
    level: 'mäßig',
    definition: 'Flächen mit häufiger Einwirkung aus Spritzwasser oder nicht häufiger Einwirkung aus Brauchwasser, ohne Intensivierung durch anstauendes Wasser',
    examples: 'Wandflächen über Badewannen und in Duschen in häuslichen Bädern; Bodenflächen im häuslichen Bereich mit Ablauf; Bodenflächen in Bädern mit oder ohne Ablauf, sofern keine hohe Wassereinwirkung aus dem Duschbereich besteht'
  },
  {
    cls: 'W2-I',
    level: 'hoch',
    definition: 'Flächen mit häufiger Einwirkung aus Spritz- und/oder Brauchwasser, vor allem auf dem Boden zeitweise durch anstauendes Wasser intensiviert',
    examples: 'Bodenflächen in Räumen mit bodengleicher Dusche; Wandflächen von Duschen in Sport- und Gewerbestätten'
  },
  {
    cls: 'W3-I',
    level: 'sehr hoch',
    definition: 'Flächen mit sehr häufiger oder lang anhaltender Einwirkung aus Spritz- und/oder Brauchwasser und/oder Wasser aus intensiven Reinigungsverfahren, durch anstauendes Wasser intensiviert',
    examples: 'Vor allem Flächen im Bereich von Schwimmbeckenumgängen sowie Duschanlagen in Sport- und Gewerbestätten und Flächen in gewerblichen Küchen oder Wäschereien'
  }
];

const MATERIALS = [
  {
    title: 'Flüssig verarbeitet (AIV-F)',
    desc: 'Polymerdispersionen, rissüberbrückende mineralische Dichtschlämmen oder Reaktionsharze werden gestrichen, gerollt oder gespachtelt. Sie passen sich jeder Geometrie an und sind im privaten Bad der häufigste Fall.'
  },
  {
    title: 'Bahnen (AIV-B)',
    desc: 'Werkseitig gefertigte Dichtbahnen mit gleichmäßiger Dicke werden im Kleberbett verlegt und an den Stößen überlappend verklebt. Sie eignen sich gut für große, ebene Flächen und enge Zeitpläne.'
  },
  {
    title: 'Platten (AIV-P)',
    desc: 'Abgedichtete Bauplatten dienen zugleich als Wandbekleidung oder Unterkonstruktion, etwa an Vorwänden oder Wannenschürzen. Stöße und Anschlüsse werden mit den zugehörigen Systemkomponenten gedichtet.'
  }
];

const DETAILS = [
  {
    title: 'Dichtband an Wand-Boden-Anschlüssen',
    desc: 'Wo Wand und Boden oder zwei Wände aufeinandertreffen, entstehen Bewegungen. Ein Dichtband mit Dehnzone wird in die erste Abdichtungslage eingebettet und überbrückt diese Fuge, statt sie starr zu überspachteln.'
  },
  {
    title: 'Innen- und Außenecken',
    desc: 'Vorgeformte Ecken aus demselben System schließen die Dichtbänder in den Raumecken lückenlos an. Eingeschnittene oder überlappend gefaltete Bänder sind hier die klassische Schwachstelle.'
  },
  {
    title: 'Dichtmanschetten an Rohrdurchführungen',
    desc: 'Jede Durchdringung – Armaturenanschluss, Wanddurchführung, Unterputz-Körper – erhält eine elastische Manschette, die in die Abdichtung eingebunden wird. So bleibt die Fläche auch an diesen Punkten geschlossen.'
  },
  {
    title: 'Bodenabläufe und Duschrinnen',
    desc: 'Ablauf oder Rinne brauchen einen Anschlussflansch oder eine werkseitige Dichtmanschette, an die die Flächenabdichtung angebunden wird. Einbau und Anschluss ans Abwassernetz übernimmt der Installateur – wir stimmen die Höhen vorher ab.'
  },
  {
    title: 'Schichtdicke und Deckung',
    desc: 'Flüssige Abdichtungen werden in mindestens zwei Arbeitsgängen aufgetragen, bis die vorgeschriebene Mindesttrockenschichtdicke erreicht ist. Sie ist je Stoffgruppe unterschiedlich und in den Produktunterlagen angegeben.'
  }
];

const FAQ = [
  {
    q: 'Reichen gut verfugte Fliesen nicht als Schutz aus?',
    a: 'Nein. Fliesen und Zementfugen sind nicht wasserdicht, und Silikonfugen sind Wartungsfugen, die altern. Die eigentliche Dichtebene liegt bei der Verbundabdichtung unter dem Kleberbett.'
  },
  {
    q: 'Brauche ich auch im Gäste-WC ohne Dusche eine Abdichtung?',
    a: 'Bodenflächen im häuslichen Bereich ohne Ablauf fallen in der Regel in die Klasse W0-I. Ob dort abgedichtet werden muss, hängt vor allem vom Untergrund ab: Feuchteempfindliche Untergründe wie Gipsbauplatten oder Holzwerkstoffe brauchen im Spritzwasserbereich einen Schutz, mineralische Untergründe oft nicht.'
  },
  {
    q: 'Welche Klasse gilt für die bodengleiche Dusche im Einfamilienhaus?',
    a: 'Die Bodenfläche in einem Raum mit bodengleicher Dusche ordnet DIN 18534-1 der Klasse W2-I zu, die Wandflächen der Dusche im häuslichen Bad der Klasse W1-I. Welche Abdichtungsstoffe in welcher Klasse zulässig sind, regeln Norm und Verwendbarkeitsnachweis des Produkts.'
  },
  {
    q: 'Kann man die fertige Abdichtung prüfen?',
    a: 'Vor dem Fliesen lässt sich die Abdichtung noch vollständig einsehen: Deckung, Schichtdicke, eingebettete Bänder und Manschetten. Wir empfehlen, diesen Zustand fotografisch festzuhalten – später ist er unter Fliese und Kleber nicht mehr sichtbar.'
  }
];

const READ_MORE = [
  { label: 'Leistung: Untergrund & DIN 18534 Abdichtung', href: '/leistungen/untergrund' },
  { label: 'Barrierefreies Bad mit bodengleicher Dusche', href: '/bad/barrierefreies-bad' },
  { label: 'Bad aus einer Hand: Gewerke koordiniert', href: '/bad/bad-aus-einer-hand' },
  { label: 'Undichte Dusche: die Warnzeichen', href: '/blog/undichte-dusche-warnzeichen' }
];

const VOR_DEM_FLIESEN = [
  'Untergrund vorbereiten: tragfähig, sauber, eben und – je nach Produkt – grundiert. Auf einem ungeeigneten Untergrund haftet auch die beste Abdichtung nicht.',
  'Dichtbänder, Ecken und Manschetten in die erste Lage einbetten, danach die Fläche in mindestens zwei Arbeitsgängen vollflächig und ohne Fehlstellen beschichten.',
  'Die Mindesttrockenschichtdicke hängt von der Stoffgruppe ab und steht in den Produktunterlagen. Kontrolliert wird sie über die Verbrauchsmenge je Quadratmeter und stichprobenartig an der frischen Schicht.',
  'Jede Lage trocknen lassen, bevor die nächste folgt, und erst fliesen, wenn die Abdichtung laut Hersteller belegbar ist. Temperatur und Luftfeuchte im Raum beeinflussen diese Zeiten deutlich.',
  'Vor dem Fliesen alle Anschlüsse sichtprüfen. Wir empfehlen, den fertigen Zustand zu fotografieren, denn nach dem Verlegen ist er nicht mehr einsehbar.',
];

/** Zweite Instanz des Qualitätsversprechens auf derselben Vorschauseite: eigene Titel-ID, damit IDs eindeutig bleiben. */
export default function Din18534({ qualitaetId }: { qualitaetId?: string }) {
  const { contact } = COMPANY_DATA;
  return (
    <>
      <Einstieg
        titelId="din-heading"
        etikett={
          <>
            <span>Abdichtung im Verbund</span>
            <Trenner />
            <span>DIN 18534</span>
          </>
        }
        titel="Verbundabdichtung nach DIN 18534:"
        unterzeile="dicht unter der Fliese"
        vorspann="Die Fliese sieht man, die Abdichtung darunter nicht – und doch entscheidet sie, ob Dusche, Wanne und Boden auf Dauer trocken bleiben. Wir erklären, wie DIN 18534 Flächen nach ihrer Wasserbelastung einteilt und welche Details in Bad, Dusche, Gäste-WC und Hauswirtschaftsraum wirklich zählen."
        knoepfe={[
          { text: 'Abdichtung besprechen', href: '/kontakt', zeichen: 'pfeil' },
          { text: 'Details zur Badsanierung', href: '/bad/badsanierung', art: 'neben' },
        ]}
        motiv={<PlanDerSeite pfad="/untergrund-abdichtung/din-18534" />}
        schriftfeld={<SchriftfeldBetrieb />}
      />

      <Faktenfeld
        titelId="regelt-heading"
        etikett="Geltungsbereich"
        titel="Was DIN 18534 regelt – und was nicht"
        einleitung={
          <>
            <p>
              DIN 18534 ist die Norm für die Abdichtung von Innenräumen. Sie legt fest, wie Wand- und Bodenflächen gegen Spritz- und
              Brauchwasser geschützt werden, und unterscheidet dafür Wassereinwirkungsklassen und Abdichtungsbauarten.
            </p>
            <p>
              Nicht erfasst sind etwa Balkone, Loggien und Terrassen, erdberührte Bauteile und Schwimmbecken selbst – dafür gelten
              eigene Normen der Reihe DIN 18531 bis DIN 18535.
            </p>
          </>
        }
        kopfLage="seitlich"
        dichte="normal"
        anordnung="zeilen"
        untertitel="Die sechs Teile der Norm"
        eintraege={NORM_PARTS.map((t) => ({ wert: t.part, text: t.text }))}
        fussnote="Für Fliesenbeläge sind vor allem die Teile 1, 3, 5 und 6 maßgeblich: die Abdichtung im Verbund, kurz AIV."
      />

      <Tabelle
        titelId="klassen-heading"
        etikett="DIN 18534-1"
        titel="Wassereinwirkungsklassen W0-I bis W3-I mit Beispielen"
        einleitung="Das „I“ steht für Innenraum. Die Klasse wird für jede Fläche einzeln bestimmt – im selben Bad kann die Wand über dem Waschtisch W0-I sein, der Boden mit bodengleicher Dusche W2-I."
        flaeche="fliese"
        beschriftung="Wassereinwirkungsklassen nach DIN 18534-1 mit Anwendungsbeispielen"
        spalten={['Klasse', 'Wassereinwirkung', 'Anwendungsbeispiele']}
        kopfMono
        zeilen={WATER_CLASSES.map((k) => ({ kopf: k.cls, zusatz: k.level, zellen: [k.definition, k.examples] }))}
        fussnote="Vereinfachte Wiedergabe der Beispiele aus DIN 18534-1, Tabelle 1. Maßgeblich ist die Norm in ihrer geltenden Fassung; die Zuordnung Ihrer Flächen klären wir bei der Planung."
      />

      <Felder
        titelId="stoffe-heading"
        etikett="Abdichtungsstoffe"
        titel="Flüssige Abdichtung, Bahnen oder Platten?"
        einleitung="Alle drei Bauarten sind normgerecht, wenn das Produkt für die jeweilige Wassereinwirkungsklasse einen Verwendbarkeitsnachweis hat – je nach Produkt ein allgemeines bauaufsichtliches Prüfzeugnis (abP) oder eine Europäische Technische Bewertung mit CE-Kennzeichnung."
        spalten={3}
        auftritt
        eintraege={MATERIALS.map((m) => ({ titel: m.title, inhalt: m.desc }))}
        nachsatz="Wichtig ist das System: Abdichtung, Dichtbänder, Ecken, Manschetten und Fliesenkleber sollten aufeinander abgestimmt sein und als Kombination vom Hersteller freigegeben werden."
      />

      <Felder
        titelId="details-heading"
        etikett="Kritische Punkte"
        titel="Dichtbänder, Manschetten, Abläufe: wo Abdichtungen versagen"
        einleitung="Auf der freien Fläche ist eine Abdichtung selten das Problem. Undicht wird es an Übergängen, Durchdringungen und Abläufen – deshalb gehört dort die meiste Sorgfalt hin."
        flaeche="fliese"
        anordnung="zeilen"
        eintraege={DETAILS.map((d) => ({ titel: d.title, inhalt: d.desc }))}
      >
        <Notiz>
          <p>
            <strong>Zusammenspiel mit der Installation:</strong> Rohrleitungen, Vorwandelemente und den Ablauf setzt der
            Sanitärinstallateur. Wir sind als Fliesenleger für die Abdichtung und den Belag zuständig und stimmen Einbauhöhen, Flansche
            und Manschetten vorher mit ihm ab – bei Bedarf koordiniert im Rahmen von{' '}
            <Textlink href="/bad/bad-aus-einer-hand">Bad aus einer Hand</Textlink>.
          </p>
        </Notiz>
      </Felder>

      <Punkteliste
        titelId="schicht-heading"
        etikett="Vor dem Fliesen"
        titel="Schichtdicken, Trocknung und Dokumentation vor dem Fliesen"
        auftritt
        punkte={VOR_DEM_FLIESEN}
      />

      <Fragen
        titelId="faq-heading"
        titel="Häufige Fragen zur Abdichtung"
        dichte="normal"
        fragen={FAQ.map((f) => ({ frage: f.q, antwort: f.a }))}
      />

      <Abschluss
        titelId="cta-heading"
        titel="Neues Bad oder neue Dusche geplant?"
        text="Beim Vor-Ort-Termin ordnen wir Ihre Flächen den Wassereinwirkungsklassen zu und besprechen Abdichtung, Anschlüsse und Ablaufsituation – normgerecht nach DIN 18534."
        knoepfe={[
          { text: 'Termin anfragen', href: '/kontakt', zeichen: 'pfeil' },
          { text: contact.phone, href: `tel:${contact.phoneLink}`, art: 'neben', zeichen: 'telefon', mono: true },
          { text: 'WhatsApp', href: contact.whatsappLink, art: 'neben', zeichen: 'whatsapp', extern: true },
        ]}
      />

      <Querverweise
        titelId="ratgeber-heading"
        titel="Weiterführende Ratgeber zur DIN 18534 Verbundabdichtung"
        verweise={READ_MORE.map((l) => ({ titel: l.label, href: l.href }))}
      />

      <Qualitaetsversprechen titelId={qualitaetId} />
    </>
  );
}
