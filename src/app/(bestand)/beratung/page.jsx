// Kostenlose Fachberatung (S-25 · E6-BAU-06, KERN v2): Arbeitsansicht nach dem Muster von (bestand)/kontakt. Kompakter
// Einstieg (Kennzeile, H1, Vorspann, „Termin vereinbaren“ als Hauptknopf zum Sprungziel #booking, Telefon als Nebenknopf);
// danach in der Lesefolge des Bestands:
// 2. Beratungsablauf, Kopf seitlich, die vier Stufen als Zeitleiste (Schrittfolge senkrecht, Nummer stumm wie im Bestand) ·
// 3. Checkliste (Fliese) als Liste an der Fuge, ab md zweispaltig mit Fuge dazwischen, Haken der eigenen Familie ·
// 4. Terminvereinbarung (CalendlySection, #booking): Wege als Felder und Erreichbarkeit · 5. Häufige Fragen (Fliese), Kopf
// seitlich, Frage und Antwort an der Fuge · 6. Direkter Kontakt mit den drei Wegen als Nebenknöpfe · Abschluss ohne Achse.
// Flächen Kalk und Fliese im Wechsel; kein großer Moment, keine Auftritte, kein Rot (nur druck an den Knöpfen).
// Serverkomponente; Bewegungsbibliothek und fremde Icons entfallen. `spaet` nur unterhalb des Sprungziels #booking (Fragen, Direktkontakt):
// Abschnitte über dem Ziel zeichnen sofort, damit der Sprung vom Einstieg nicht daneben landet.
// Texte, Überschriften, Links, IDs und Lesefolge wie im Bestand; Metadaten und JSON-LD bleiben in ./layout.tsx.
import { COMPANY_DATA } from '@/config/company';
import CalendlySection from '@/components/common/CalendlySection';
import FinalCTA from '@/components/ui/FinalCTA';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Knopf from '@/components/kern/Knopf';
import Schrittfolge from '@/components/kern/Schrittfolge';
import Icon from '@/components/icons/Icon';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';

// Keep in sync with the FAQPage JSON-LD in ./layout.tsx (same questions & answers).
const consultationFaqs = [
  {
    q: 'Ist das Erstgespräch wirklich 100% kostenlos und unverbindlich?',
    a: 'Ja. Sowohl die telefonische Erstberatung als auch das Vor-Ort-Aufmaß bei Ihnen in Aßlar, Wetzlar und Umgebung sind für Sie vollkommen kostenfrei und ohne jede Verpflichtung.'
  },
  {
    q: 'Wie lange dauert ein typischer Beratungstermin?',
    a: 'Für eine fundierte Ersteinschätzung planen wir in der Regel 30 bis 45 Minuten ein. Bei komplexen Sanierungsprojekten nehmen wir uns gerne auch 60 Minuten Zeit.'
  },
  {
    q: 'Welche Unterlagen sollte ich für den Termin bereitlegen?',
    a: 'Hilfreich sind Informationen zum Baujahr des Gebäudes, vorhandene Grundrisse oder Skizzen, Fotos des Badezimmers bzw. der zu belegenden Flächen sowie – falls vorhanden – Ideen zu Fliesenformat und Farbe.'
  },
  {
    q: 'Beraten Sie auch zu Zuschüssen für das barrierefreie Bad?',
    a: 'Ja. Für den Zuschuss der Pflegekasse zum barrierefreien Bad erstellen wir den prüffähigen Kostenvoranschlag und unterstützen Sie bei der Antragsstellung.'
  }
];

const beratungSteps = [
  {
    step: '01',
    title: 'Bedarfsanalyse',
    desc: 'Wir erfassen Ihre Wünsche, Raumgegebenheiten, gestalterischen Ziele und Ihr Budget.'
  },
  {
    step: '02',
    title: 'Technische Prüfung',
    desc: 'Prüfung von Ebenheit, Restfeuchte und Tragfähigkeit des Untergrunds sowie der Abdichtung in Nassbereichen.'
  },
  {
    step: '03',
    title: 'Material & Zuschuss-Check',
    desc: 'Beratung zu Formaten, Fugenbild und Rutschhemmung – und Prüfung möglicher Zuschüsse, z. B. der Pflegekasse für barrierefreie Bäder.'
  },
  {
    step: '04',
    title: 'Transparenter Kostenvoranschlag',
    desc: 'Detailliertes Festpreis-Angebot ohne versteckte Kosten mit verlässlichem Zeitplan.'
  }
];

const checklist = [
  { title: 'Maße & Fotos', text: 'Ungefähre Raummaße und Fotos der Flächen, die neu belegt werden sollen.' },
  { title: 'Gebäudedaten', text: 'Ungefähres Baujahr, Wohnfläche und Informationen zum vorhandenen Belag bzw. Untergrund.' },
  { title: 'Grundriss oder Skizzen', text: 'Skizzen vom Badezimmer oder den Wohnräumen erleichtern die Vorplanung enorm.' },
  { title: 'Wunschtermin & Budget', text: 'Ein grober Zeitrahmen für die geplante Umsetzung Ihrer Maßnahme.' }
];

export default function Beratung() {
    const { contact } = COMPANY_DATA;

    return (
        <>
            {/* 1. EINSTIEG: Kennzeile (vormals Badge), H1, Vorspann; Termin als Hauptknopf, Telefon als Nebenknopf */}
            <Einstieg
                art="arbeit"
                etikett="Kostenlose Erstberatung vom Fliesen-Fachbetrieb"
                titel="Kostenlose Fliesenberatung in Wetzlar"
                vorspann={
                    <p>
                        Jetzt Ihre kostenlose Fliesenberatung in Wetzlar und Aßlar vereinbaren: Ob Badsanierung, XXL-Großformate, Wohnbereich oder Terrasse – Fachbetrieb Tezgel nimmt sich Zeit für Ihre Fragen, prüft den Untergrund und findet mit Ihnen die optimale Lösung.
                    </p>
                }
                aktionen={
                    <>
                        <Knopf href="#booking" icon="pfeil-rechts">
                            Termin vereinbaren
                        </Knopf>
                        <Knopf href={`tel:${contact.phoneLink}`} variante="neben" iconLinks="telefon">
                            <span className="font-mono font-normal">{contact.phone}</span>
                        </Knopf>
                    </>
                }
            />

            {/* 2. ABLAUF: Kopf seitlich, die vier Stufen als Zeitleiste (Titel bleiben h3, Nummer stumm wie im Bestand) */}
            <Abschnitt
                art="arbeit"
                kopf="seitlich"
                titelId="ablauf-heading"
                etikett="Transparenter Ablauf"
                titel="Unser 4-Stufen-Beratungsablauf"
                einleitung={<p>Vom ersten Gespräch bis zum transparenten Angebot – strukturiert, kompetent und partnerschaftlich.</p>}
            >
                <Schrittfolge
                    nummerStumm
                    schritte={beratungSteps.map((step) => ({
                        nummer: step.step,
                        titel: step.title,
                        text: step.desc
                    }))}
                />
            </Abschnitt>

            {/* 3. CHECKLISTE: Liste an der Fuge, ab md zwei Spalten mit Fuge dazwischen; Titel und Text bleiben ein Satz */}
            <Abschnitt
                art="arbeit"
                flaeche="fliese"
                titelId="checkliste-heading"
                titel="Checkliste: So bereiten Sie Ihren Termin optimal vor"
                einleitung={<p>Bringen Sie gerne folgende Unterlagen mit (falls zur Hand)</p>}
            >
                <ul className="grid grid-cols-1 border-t border-fuge md:grid-cols-2">
                    {checklist.map((item) => (
                        <li key={item.title} className="flex items-start gap-4 border-b border-fuge py-6 md:odd:pr-6 md:even:border-l md:even:pl-6">
                            <Icon name="haken" groesse={5} className="mt-1 text-strich" />
                            <p className="min-w-0 text-fs-3 text-tinte-2">
                                <strong className="font-semibold text-tinte">{item.title}:</strong> {item.text}
                            </p>
                        </li>
                    ))}
                </ul>
            </Abschnitt>

            {/* 4. TERMINVEREINBARUNG (#booking) */}
            <CalendlySection />

            {/* 5. HÄUFIGE FRAGEN: Kopf seitlich, Frage (h3) und Antwort an der Fuge – spiegeln das FAQPage-JSON-LD */}
            <Abschnitt
                art="arbeit"
                flaeche="fliese"
                kopf="seitlich"
                spaet
                titelId="fragen-heading"
                etikett="Häufige Fragen"
                titel="Häufige Fragen zur Beratung"
                einleitung={<p>Alles Wichtige rund um Ablauf, Kosten und Zuschüsse.</p>}
            >
                <div className="border-t border-tinte">
                    {consultationFaqs.map((faq) => (
                        <div key={faq.q} className="border-b border-fuge py-6">
                            <h3 className="text-fs-4 text-tinte">{faq.q}</h3>
                            <p className="mt-2 max-w-mass font-text text-fs-3 text-tinte-2">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </Abschnitt>

            {/* 6. DIREKTER KONTAKT: die drei Wege als Nebenknöpfe (der Hauptknopf dieses Bildschirms steht im Abschluss) */}
            <Abschnitt
                art="arbeit"
                spaet
                titelId="direkt-heading"
                titel="Sie möchten lieber direkt mit uns sprechen?"
                einleitung={<p>Rufen Sie uns während unserer Geschäftszeiten an oder schreiben Sie uns eine kurze Nachricht.</p>}
            >
                {/* pb-1: der Fokusring der Knöpfe bleibt innerhalb der spaet-Hülle (content-visibility beschneidet am Rand) */}
                <div className="flex flex-col gap-3 pb-1 sm:flex-row sm:flex-wrap">
                    <Knopf href={`tel:${contact.phoneLink}`} variante="neben" iconLinks="telefon">
                        <span className="font-mono font-normal">{contact.phone}</span>
                    </Knopf>
                    <Knopf href={contact.whatsappLink} extern variante="neben" vorne={<WhatsAppLogo className="size-5 shrink-0" />}>
                        WhatsApp
                    </Knopf>
                    <Knopf href={`mailto:${contact.email}`} variante="neben" iconLinks="mail">
                        {contact.email}
                    </Knopf>
                </div>
            </Abschnitt>

            <FinalCTA achse={false} />
        </>
    );
}
