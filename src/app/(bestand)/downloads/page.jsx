// Downloads & Infomaterial (S-27 · E6-BAU-08, KERN v2): Arbeitsansicht nach dem Muster von (bestand)/kontakt. Kompakter Einstieg
// (Kennzeile, H1, Vorspann), rechts daneben das Feld „Unterlagen auf Anfrage“ mit Anfrage als Hauptknopf und E-Mail als
// Nebenknopf (mobil nach dem Vorspann, Lesefolge wie im Bestand) · Online-Ratgeber als Register: Zeilen an der Fuge mit
// laufender Nummer in Mono, Titel, Text und Ziel; die ganze Zeile ist der Link (Fliese) · Qualitätsversprechen (Kalk).
// Es gibt keine veröffentlichten Dateien (nichts unter /public): Unterlagen gehen auf Anfrage per E-Mail hinaus, die Online-Ratgeber
// ersetzen die frühere PDF-Liste – darum stehen hier weder Dateityp noch Größe. Kein großer Moment, keine Auftritte.
// Texte, Überschriften, Links und Lesefolge wie im Bestand; Metadaten unverändert.
import Link from 'next/link';
import clsx from 'clsx';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';
import Icon from '@/components/icons/Icon';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Knopf from '@/components/kern/Knopf';
import { linkKlassen } from '@/components/kern/stile';

export const metadata = createMetadata({
    title: 'Downloads & Infomaterial | Fliesenverlegung Tezgel',
    description: 'Infomaterial & Checklisten rund um Fliesenverlegung, Badsanierung & Fördermittel vom Fachbetrieb Tezgel in Aßlar & Wetzlar. Jetzt online informieren!',
    path: '/downloads'
});

// No downloadable files are currently published (nothing under /public).
// Documents are sent on request; these online guides replace the former PDF list.
const RESOURCES = [
    { title: 'Checkliste zur Terminvorbereitung', desc: 'Welche Maße, Fotos und Unterlagen Ihnen und uns beim Beratungstermin helfen.', href: '/beratung', cta: 'Zur Checkliste' },
    { title: 'Förderung & Zuschüsse', desc: 'Pflegekassen-Zuschuss und KfW-Programm 159 für das barrierefreie Bad im Überblick.', href: '/foerderung', cta: 'Zur Förderung' },
    { title: 'Häufige Fragen', desc: 'Antworten zu Großformaten, Abdichtung nach DIN 18534, Balkon & Terrasse und Festpreisangebot.', href: '/faq', cta: 'Zu den FAQ' },
    { title: 'Materialien & Systeme', desc: 'Verlegewerkstoffe, Abdichtungssysteme und Fliesen, mit denen wir arbeiten.', href: '/partner', cta: 'Zu den Materialien' }
];

export default function DownloadsPage() {
    const { contact } = COMPANY_DATA;

    return (
        <>
            {/* 1. EINSTIEG: Kennzeile (vormals Badge), H1, Vorspann; rechts (mobil darunter) die Unterlagen auf Anfrage */}
            <Einstieg
                art="arbeit"
                etikett={
                    <>
                        <Icon name="dokument" groesse={4} />
                        Wissenscenter &amp; Dokumente
                    </>
                }
                titel={<>Downloads &amp; Infomaterial</>}
                vorspann={
                    <p>
                        Nützliche Downloads &amp; Infomaterial zu Ihrem Projekt senden wir Ihnen gern persönlich zu. Die wichtigsten Informationen rund um Fliesen und Badsanierung finden Sie direkt hier auf der Website.
                    </p>
                }
                rand={
                    <section aria-labelledby="unterlagen-heading" className="border border-fuge bg-fliese p-6 lg:p-8">
                        <h2 id="unterlagen-heading" className="text-fs-5 text-tinte">
                            Unterlagen auf Anfrage
                        </h2>
                        <p className="mt-4 font-text text-fs-3 text-tinte-2">
                            Sie benötigen Dokumente zu Ihrem Vorhaben? Sprechen Sie uns an – wir senden Ihnen die gewünschten Informationen per E-Mail zu.
                        </p>
                        <div className="mt-8 flex flex-col gap-3">
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Unterlagen anfragen
                            </Knopf>
                            <Knopf href={`mailto:${contact.email}?subject=${encodeURIComponent('Anfrage Unterlagen')}`} variante="neben" iconLinks="mail">
                                {contact.email}
                            </Knopf>
                        </div>
                    </section>
                }
            />

            {/* 2. ONLINE-RATGEBER als Register: Nummer in Mono (Marke, für Screenreader stumm), Titel und Text, rechts das Ziel;
                Hover und Fokus wechseln die Fläche auf Kalk und ziehen die Unterstreichung des Ziels nach */}
            <Abschnitt art="arbeit" id="online-ratgeber" flaeche="fliese" titel="Online-Ratgeber & Checklisten">
                <ul className="border-t border-tinte">
                    {RESOURCES.map(({ title, desc, href, cta }, i) => (
                        <li key={href} className="border-b border-fuge">
                            <Link
                                href={href}
                                data-motion="zustand"
                                className="group flex items-start gap-4 px-4 py-6 transition-colors dauer-1 ease-setzen hover:bg-kalk focus-visible:bg-kalk active:bg-kalk md:gap-6 md:px-6 lg:px-8"
                            >
                                <span aria-hidden="true" className="w-8 shrink-0 font-mono text-fs-2 text-tinte-2">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="flex min-w-0 flex-1 flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-12">
                                    <span className="min-w-0">
                                        <span className="block font-text text-fs-4 font-semibold text-tinte">{title}</span>
                                        <span className="mt-2 block max-w-mass font-text text-fs-3 text-tinte-2">{desc}</span>
                                    </span>
                                    <span className="inline-flex shrink-0 items-center gap-2 font-text text-fs-2 font-semibold text-tinte underline decoration-strich underline-offset-4 group-hover:decoration-tinte">
                                        {cta}
                                        <Icon name="pfeil-rechts" groesse={5} />
                                    </span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <p className="mt-8 flex flex-wrap items-center gap-x-3 font-text text-fs-3 text-tinte-2">
                    Lieber persönlich?{' '}
                    <a href={`tel:${contact.phoneLink}`} className={clsx(linkKlassen, 'inline-flex min-h-11 items-center gap-2 font-mono')}>
                        <Icon name="telefon" groesse={4} />
                        {contact.phone}
                    </a>
                </p>
            </Abschnitt>

            <QualityPromise art="arbeit" />
        </>
    );
}
