// Karriere (S-21 im Relaunch-Ablauf, Werkstatt-Planzeile E6-BAU-02, KERN v2): Erzählansicht nach dem Vorbild von
// /ueber-uns und der Themenfamilie. Einstieg mit Laserachse, Etikett, H1 links bündig, Vorspann und die beiden
// Bewerbungswege des Bestands als Knöpfe (E-Mail als Hauptknopf, Telefon); rechts das Planblatt „grossformat“ (Plan ohne
// Bemaßung, interaktiv; das Blatt trägt die rote Achse des Plans – die Verlegetechnik für Großformate ist Inhalt der Seite).
// Danach die Leitachse über die Abschnitte, Flächen Fliese und Kalk im Wechsel:
// 2. Was Sie bei uns erwartet: vier Felder mit Zeichen der eigenen Familie (Fliese) · 3. Stellenangebote als Zeilen an der
// Fuge – Ort als Mono-Etikett, Titel, Text, rechts „Jetzt bewerben“ als Nebenknopf (Kalk) · 4. Häufige Fragen zur
// Bewerbung, Kopf seitlich: Frage und Antwort an der Fuge, darunter die drei Wege Telefon, WhatsApp, E-Mail (Fliese).
// Danach das Qualitätsversprechen (Kalk).
// Wortlaut, Links und Lesefolge wie im Bestand; die erste Stelle und die Fragen spiegeln das JSON-LD in ./layout.tsx.
// Serverkomponente. Kein Auftritt und kein großer Moment; `spaet` auf allen Abschnitten unter dem ersten Bildschirm
// (keine Sprungziele, keine Formulare). Metadaten und JSON-LD bleiben in ./layout.tsx.
import { COMPANY_DATA } from '@/config/company';
import Icon from '@/components/icons/Icon';
import QualityPromise from '@/components/sections/QualityPromise';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { etikettKlassen } from '@/components/kern/stile';

const { contact, authority, headquarters, business } = COMPANY_DATA;

// Zeichen der eigenen Familie nach `icons/zuordnung.ts` (Award ohne Entsprechung → haken wie die HWK-Zeile auf /ueber-uns)
const HIGHLIGHTS = [
    { icon: 'haken', title: 'Eingetragener HWK-Fachbetrieb', desc: `Handwerk nach geprüften Standards – eingetragen bei der ${authority.name} als ${authority.responsibility}.` },
    { icon: 'untergrund', title: 'Anspruchsvolle Projekte', desc: 'Badsanierungen, bodengleiche Walk-In-Duschen, XXL-Großformate, Treppen, Naturstein sowie Balkone und Terrassen.' },
    { icon: 'aufmass', title: 'Moderne Verlegetechnik', desc: 'Nivelliersystem, Vakuumhebetechnik und spezialisierte Schneidtechnik für millimetergenaue Großformate.' },
    { icon: 'ort', title: 'Regionale Baustellen', desc: `Unsere Projekte liegen in ${headquarters.city}, Wetzlar, Gießen und Mittelhessen – für Großprojekte auch in ganz Hessen.` }
];

// The first entry is mirrored as JobPosting JSON-LD in ./layout.tsx.
const JOBS = [
    {
        title: 'Fliesenleger (m/w/d) – Geselle oder erfahrene Fachkraft',
        loc: `${headquarters.city} & Mittelhessen`,
        desc: 'Verlegung von Fliesen, Platten und Naturstein in Bädern, Wohnbereichen sowie auf Balkonen und Terrassen – von der Untergrundvorbereitung über die DIN-18534-Verbundabdichtung bis zur fugenarmen XXL-Großformatverlegung.'
    },
    {
        title: 'Ausbildung zum Fliesen-, Platten- und Mosaikleger (m/w/d)',
        loc: `${headquarters.city} & Mittelhessen`,
        desc: `Lerne das Fliesenhandwerk von Grund auf in einem eingetragenen Fachbetrieb der ${authority.shortName}.`,
        moreHref: '/karriere/ausbildung'
    },
    {
        title: 'Initiativbewerbung (m/w/d)',
        loc: `${headquarters.city} & Mittelhessen`,
        desc: 'Sie möchten im Fliesenhandwerk mit anpacken, finden aber keine passende Ausschreibung? Wir freuen uns über Ihre Initiativbewerbung.'
    }
];

// Keep in sync with the FAQPage JSON-LD in ./layout.tsx (same questions & answers).
const KARRIERE_FAQS = [
    {
        q: 'Wie läuft der Bewerbungsprozess ab?',
        a: `Ganz unkompliziert: Rufen Sie uns an unter ${contact.phone}, schreiben Sie per WhatsApp an ${contact.whatsapp} oder senden Sie eine kurze E-Mail an ${contact.email}.`
    },
    {
        q: 'Welche Arbeiten erwarten mich?',
        a: 'Das gesamte Spektrum des Fliesenhandwerks: Badsanierungen und barrierefreie Walk-In-Duschen, fugenarme Großformate, Wohnbereiche, Küchen und Treppen, Balkone und Terrassen, Untergrundvorbereitung mit DIN 18534 Verbundabdichtung sowie Naturstein.'
    },
    {
        q: 'Wo liegen die Baustellen?',
        a: `Vom Firmensitz in ${headquarters.city} aus arbeiten wir in ${business.serviceArea.slice(0, -1).join(', ')} – für Großprojekte auch in ganz Hessen.`
    }
];

const applyHref = (title) => `mailto:${contact.email}?subject=${encodeURIComponent(`Bewerbung ${title}`)}`;

export default function KarrierePage() {
    return (
        <>
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, die zwei Bewerbungswege; rechts das Planblatt „grossformat“ */}
            <Einstieg
                art="erzaehl"
                etikett={
                    <>
                        <Fugenkreuz className="size-3 shrink-0 text-strich" />
                        Werde Teil unseres Teams
                    </>
                }
                titel={<>Fliesenleger Jobs &amp; Karriere bei Tezgel in Wetzlar &amp; Aßlar</>}
                vorspann={
                    <p>
                        Fliesenleger Jobs in Wetzlar &amp; Aßlar gesucht: Verstärken Sie das Team von {COMPANY_DATA.legalName} als Geselle oder erfahrene Fachkraft. Bewerben Sie sich direkt bei Inhaber {COMPANY_DATA.owner.fullName} – ein starkes Team von bis zu 12 Handwerkern im Einsatz in Mittelhessen.
                    </p>
                }
                aktionen={
                    <>
                        <Knopf href={applyHref(JOBS[0].title)} iconLinks="mail">
                            Jetzt per E-Mail bewerben
                        </Knopf>
                        <Knopf href={`tel:${contact.phoneLink}`} variante="neben" iconLinks="telefon">
                            <span className="font-mono font-normal">{contact.phone}</span>
                        </Knopf>
                    </>
                }
                rand={
                    <Planblatt felder={planfelder('Fliesenleger Jobs', 'grossformat')}>
                        <Verlegeplan plan="grossformat" ohneAchse bemassung={false} interaktiv />
                    </Planblatt>
                }
            />

            <Leitachse>
                {/* 2. WAS SIE BEI UNS ERWARTET: vier Felder (zwei Spalten ab md, vier ab lg – ohne Restzelle), je Feld ein Zeichen */}
                <Abschnitt
                    titelId="karriere-erwartung-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Arbeiten im Fachbetrieb"
                    titel="Was Sie bei uns erwartet"
                >
                    <Feldraster spalten={4}>
                        {HIGHLIGHTS.map(({ icon, title, desc }) => (
                            <Feld key={title}>
                                <span aria-hidden="true" className="flex size-6 items-center justify-center text-tinte">
                                    <Icon name={icon} groesse={6} />
                                </span>
                                <h3 className="mt-6 text-fs-4 text-tinte">{title}</h3>
                                <p className="mt-2 max-w-mass font-text text-fs-2 text-tinte-2">{desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 3. STELLENANGEBOTE: je Stelle eine Zeile an der Fuge – links Ort (Mono), Titel, Text und der Verweis zur
                    Ausbildung, rechts „Jetzt bewerben“ (Nebenknopf: der Hauptknopf des Bildschirms bleibt im Einstieg) */}
                <Abschnitt titelId="karriere-stellen-heading" leitachse spaet titel={<>Aktuelle Stellenangebote in {headquarters.city}</>}>
                    <div className="border-t border-tinte">
                        {JOBS.map((job) => (
                            <article
                                key={job.title}
                                className="grid grid-cols-4 gap-y-6 border-b border-fuge py-8 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12 lg:py-12"
                            >
                                <div className="col-span-4 md:col-span-8">
                                    <p className={etikettKlassen}>
                                        <Icon name="ort" groesse={4} />
                                        {job.loc}
                                    </p>
                                    <h3 className="mt-4 text-fs-5 text-tinte">{job.title}</h3>
                                    <p className="mt-4 max-w-mass font-text text-fs-3 text-tinte-2">{job.desc}</p>
                                    {job.moreHref && (
                                        <Knopf href={job.moreHref} variante="text" icon="pfeil-rechts" className="mt-2">
                                            Mehr zur Ausbildung
                                        </Knopf>
                                    )}
                                </div>
                                <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:justify-self-end">
                                    <Knopf href={applyHref(job.title)} variante="neben" icon="pfeil-rechts" className="w-full sm:w-auto">
                                        Jetzt bewerben
                                    </Knopf>
                                </div>
                            </article>
                        ))}
                    </div>
                </Abschnitt>

                {/* 4. HÄUFIGE FRAGEN ZUR BEWERBUNG: Kopf links, rechts Frage und Antwort an der Fuge; darunter die drei Wege */}
                <Abschnitt
                    titelId="karriere-fragen-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    kopf="seitlich"
                    etikett="Bewerbung"
                    titel="Häufige Fragen zur Bewerbung"
                >
                    <div className="border-t border-tinte">
                        {KARRIERE_FAQS.map((faq) => (
                            <div key={faq.q} className="border-b border-fuge py-6">
                                <h3 className="text-fs-4 text-tinte">{faq.q}</h3>
                                <p className="mt-2 max-w-mass font-text text-fs-3 text-tinte-2">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                    {/* pb-1: der Fokusring der letzten Zeile bleibt innerhalb der spaet-Hülle (content-visibility beschneidet am Rand) */}
                    <div className="mt-8 flex flex-col gap-3 pb-1 sm:flex-row sm:flex-wrap">
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
            </Leitachse>

            <QualityPromise />
        </>
    );
}
