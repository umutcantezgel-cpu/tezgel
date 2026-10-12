// Ausbildung (S-21 im Relaunch-Ablauf, Werkstatt-Planzeile E6-BAU-02, KERN v2): Erzählansicht nach dem Vorbild von
// /ueber-uns und der Themenfamilie. Einstieg mit Laserachse, Etikett, H1 links bündig und Vorspann – ohne Knöpfe, wie im
// Bestand (die Wege stehen im Aufruf darunter); rechts das Planblatt „fugen“ (Plan ohne Bemaßung, interaktiv; das Blatt
// trägt die rote Achse des Plans – das Fugenbild als Grundlage des Handwerks, das man hier lernt).
// Danach die Leitachse über die Abschnitte: 2. Was du lernst · Wo du lernst · Was du mitbringst als Feldraster mit drei
// Feldern (H2 wie im Bestand; zwei Spalten ab md mit dem letzten Feld über beide, drei ab lg) auf Kalk · 3. Bereit für deine
// Zukunft?: Text links, rechts die Wege E-Mail (Hauptknopf), Telefon, WhatsApp und der Verweis auf alle Stellen (Fliese).
// Danach das Qualitätsversprechen (Kalk).
// Wortlaut, Links, Überschriftenebenen und Lesefolge wie im Bestand; Metadaten unverändert. Serverkomponente. Kein
// Auftritt und kein großer Moment; `spaet` auf beiden Abschnitten unter dem Einstieg (keine Sprungziele, keine Formulare).
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
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

const APPRENTICESHIP_TITLE = 'Fliesen-, Platten- und Mosaikleger (m/w/d)';

export const metadata = createMetadata({
    title: 'Ausbildung Fliesenleger (m/w/d) | Fachbetrieb Tezgel',
    description: 'Ausbildung zum Fliesenleger (m/w/d) in Aßlar & Wetzlar bei Tezgel: solides Handwerk, modernste Verlegetechnik & starkes Team. Jetzt unkompliziert bewerben!',
    path: '/karriere/ausbildung'
});

export default function AusbildungPage() {
    const { contact, owner, authority, headquarters } = COMPANY_DATA;

    const cards = [
        { title: 'Was du lernst', desc: 'Das Fliesenhandwerk in der Praxis: Untergrundvorbereitung, Abdichtung nach DIN 18534 sowie die Verlegung von Fliesen, Großformaten und Naturstein – im Bad, im Wohnbereich und auf Balkon und Terrasse.' },
        { title: 'Wo du lernst', desc: `In einem eingetragenen Fachbetrieb der ${authority.name} mit Firmensitz in ${headquarters.city} – unter Inhaber & Fachbetriebsleiter ${owner.fullName}.` },
        { title: 'Was du mitbringst', desc: 'Handwerkliches Geschick, Sorgfalt und Freude an präziser Arbeit, Teamgeist und Zuverlässigkeit.' }
    ];

    return (
        <>
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann; rechts das Planblatt „fugen“ */}
            <Einstieg
                art="erzaehl"
                etikett={
                    <>
                        <Fugenkreuz className="size-3 shrink-0 text-strich" />
                        Ausbildung im Fachbetrieb
                    </>
                }
                titel={<>Ausbildung zum {APPRENTICESHIP_TITLE}</>}
                vorspann={
                    <p>
                        Starte deine Ausbildung zum Fliesen-, Platten- und Mosaikleger (m/w/d) bei {COMPANY_DATA.legalName} in {headquarters.city}: Du möchtest ein zukunftssicheres Handwerk lernen, bei dem du täglich siehst, was du geschaffen hast? Bewirb dich unkompliziert per E-Mail, Telefon oder WhatsApp.
                    </p>
                }
                rand={
                    <Planblatt felder={planfelder('Ausbildung Fliesenleger (m/w/d)', 'fugen')}>
                        <Verlegeplan plan="fugen" ohneAchse bemassung={false} interaktiv />
                    </Planblatt>
                }
            />

            <Leitachse>
                {/* 2. WAS DU LERNST · WO DU LERNST · WAS DU MITBRINGST: drei Felder mit Haken (wie im Bestand), H2 je Feld */}
                <Abschnitt leitachse spaet>
                    <Feldraster spalten={3}>
                        {cards.map((card, i) => {
                            const letzter = i === cards.length - 1;
                            return (
                                <Feld key={card.title} spanne={letzter ? 2 : undefined} className={letzter ? 'lg:col-span-1' : undefined}>
                                    <Icon name="haken" groesse={6} className="text-tinte" />
                                    <h2 className="mt-6 text-fs-5 text-tinte">{card.title}</h2>
                                    <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{card.desc}</p>
                                </Feld>
                            );
                        })}
                    </Feldraster>
                </Abschnitt>

                {/* 3. BEREIT FÜR DEINE ZUKUNFT?: H3 wie im Bestand mit Text links; rechts die Wege wie im Abschluss der Startseite –
                    E-Mail als Hauptknopf, Telefon (Mono) und WhatsApp als Nebenknöpfe, darunter der Verweis auf alle Stellen */}
                <Abschnitt flaeche="fliese" leitachse spaet>
                    {/* py-1: Fokusringe des ersten Knopfs und des letzten Verweises bleiben innerhalb der spaet-Hülle
                        (content-visibility beschneidet am Rand) */}
                    <div className="grid grid-cols-4 gap-y-8 py-1 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12">
                        <div className="col-span-4 md:col-span-8 lg:col-span-7">
                            <h3 className="text-fs-6 text-tinte">Bereit für deine Zukunft?</h3>
                            <p className="mt-6 max-w-mass font-text text-fs-3 text-tinte-2">
                                Bewirb dich unkompliziert per E-Mail oder ruf uns direkt an für ein erstes Kennenlernen.
                            </p>
                        </div>
                        <div className="col-span-4 flex flex-col gap-3 md:col-span-6 lg:col-span-5">
                            <Knopf
                                href={`mailto:${contact.email}?subject=${encodeURIComponent(`Bewerbung Ausbildung ${APPRENTICESHIP_TITLE}`)}`}
                                iconLinks="mail"
                                className="w-full"
                            >
                                Jetzt per E-Mail bewerben
                            </Knopf>
                            <Knopf href={`tel:${contact.phoneLink}`} variante="neben" iconLinks="telefon" className="w-full">
                                <span className="font-mono font-normal">{contact.phone}</span>
                            </Knopf>
                            <Knopf
                                href={contact.whatsappLink}
                                extern
                                variante="neben"
                                vorne={<WhatsAppLogo className="size-5 shrink-0" />}
                                className="w-full"
                            >
                                WhatsApp
                            </Knopf>
                            <p className="mt-3">
                                <Knopf href="/karriere" variante="text" icon="pfeil-rechts">
                                    Alle Stellenangebote ansehen
                                </Knopf>
                            </p>
                        </div>
                    </div>
                </Abschnitt>
            </Leitachse>

            <QualityPromise />
        </>
    );
}
