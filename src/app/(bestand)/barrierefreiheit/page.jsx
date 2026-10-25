// Barrierefreiheit (E6-BAU-10, S-29): Lesemodus wie die Ratgeber-Artikel – kompakter Kopf (Einstieg art="arbeit",
// H1 text-fs-6), Text im Satzspiegel max-w-mass, Abschnitte an der Fuge, Maßnahmen als Fugenkreuz-Liste, die beiden
// Anschriften als Felder. Erklärungstext, Überschriften und Reihenfolge unverändert; Serverkomponente.
import React from 'react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import SeitenDaten from '@/components/seo/SeitenDaten';
import Einstieg from '@/components/kern/Einstieg';
import Knopf from '@/components/kern/Knopf';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Icon from '@/components/icons/Icon';
import { linkKlassen, seitenKlassen } from '@/components/kern/stile';

const TITEL = 'Erklärung zur Barrierefreiheit | Fliesen Tezgel';
const BESCHREIBUNG = 'Erklärung zur digitalen Barrierefreiheit der Fliesenverlegung Tezgel gemäß Barrierefreiheitsstärkungsgesetz (BFSG) und europäischen Standards EN 301 549.';

export const metadata = createMetadata({
    title: TITEL,
    description: BESCHREIBUNG,
    path: '/barrierefreiheit'
});

// Lesesatz (wie im Ratgeber-Artikel und auf den übrigen Rechtsseiten, S-28): Abschnitt mit Fuge oben, H2 text-fs-5,
// Inhalt mt-6, Text fs-3
const ABSCHNITT = 'mt-12 border-t border-fuge pt-8 first:mt-0 first:border-t-0 first:pt-0';
const H2 = 'text-fs-5 text-tinte';
// Anschrift als Feld (Fliese an der Fuge)
const FELD = 'mt-6 border border-fuge bg-fliese p-6';

// Maßnahme: Zeile an der Fuge mit Fugenkreuz (Liste wie im Ratgeber-Artikel und in der Datenschutzerklärung, S-28)
function Massnahme({ children }) {
    return (
        <li className="flex items-start gap-4 border-b border-fuge py-3">
            <Fugenkreuz className="mt-2 size-3 shrink-0 text-strich" />
            <span className="min-w-0 flex-1">{children}</span>
        </li>
    );
}

export default function BarrierefreiheitPage() {
    return (
        <>
            <SeitenDaten
                pfad="/barrierefreiheit"
                titel={TITEL}
                beschreibung={BESCHREIBUNG}
                brotkrumen={[{ name: 'Start', href: '/' }, { name: 'Erklärung zur Barrierefreiheit' }]}
            />
            <Einstieg
                art="arbeit"
                etikett={<>Barrierefreiheitsstärkungsgesetz (BFSG) &middot; EN 301 549 / WCAG 2.1 AA</>}
                titel="Erklärung zur Barrierefreiheit"
            />

            {/* LESEMODUS: Text im Satzspiegel, links an derselben Kante wie die H1 */}
            <div className={`${seitenKlassen} py-12 lg:py-16`}>
                <div className="max-w-mass text-fs-3 text-tinte">
                    <div className={`${ABSCHNITT} space-y-6`}>
                        <p>
                            Die <strong className="font-semibold">{COMPANY_DATA.legalName}</strong> ist bemüht, ihre Website im Einklang mit den nationalen Rechtsvorschriften zur Umsetzung des Barrierefreiheitsstärkungsgesetzes (BFSG) sowie den Vorgaben der europäischen Norm <strong className="font-mono font-normal">EN 301 549</strong> (Web Content Accessibility Guidelines WCAG 2.1 auf Konformitätsstufe AA) barrierefrei zugänglich zu machen.
                        </p>
                        <p>
                            Diese Erklärung zur Barrierefreiheit gilt für das Webangebot unter <a href={COMPANY_DATA.contact.website} className={linkKlassen}>{COMPANY_DATA.contact.website}</a>.
                        </p>
                    </div>

                    <div className={ABSCHNITT}>
                        <h2 className={H2}>Stand der Vereinbarkeit mit den Anforderungen</h2>
                        <p className="mt-6">
                            Dieses Webangebot ist mit den Vorgaben der WCAG 2.1 Stufe AA größtenteils vereinbar. Folgende Maßnahmen wurden implementiert:
                        </p>
                        {/* Maßnahmen als Fugenkreuz-Liste (wie die Listen der Ratgeber-Artikel) */}
                        <ul className="mt-6 border-t border-fuge">
                            {/* „H1–H4“ bricht nicht am Halbgeviertstrich um (Darstellung, Wortlaut gleich) */}
                            <Massnahme>Vollständige semantische HTML5-Strukturierung (Überschriftenhierarchien <span className="whitespace-nowrap">H1–H4</span>, ARIA-Landmarks)</Massnahme>
                            <Massnahme>Tastaturnavigierbarkeit aller interaktiven Menüs, Schaltflächen, Funnels und Rechner</Massnahme>
                            <Massnahme>Hohe Farbkontrastverhältnisse (mindestens 4,5:1 für Fließtexte und 3:1 für Bedienelemente)</Massnahme>
                            <Massnahme>Auszeichnung von Alternativtexten für informative Bildelemente</Massnahme>
                            <Massnahme>Skalierbarkeit von Schriften und responsive Darstellbarkeit ohne horizontalen Bildlauf</Massnahme>
                        </ul>
                    </div>

                    <div className={ABSCHNITT}>
                        <h2 className={H2}>Feedback und Kontaktangaben</h2>
                        <p className="mt-6">
                            Sind Ihnen Mängel beim barrierefreien Zugang zu Inhalten von <a href={COMPANY_DATA.contact.website} className={linkKlassen}>{COMPANY_DATA.contact.website}</a> aufgefallen? Oder haben Sie Fragen zur Umsetzung der Barrierefreiheit? Sie können sich jederzeit bei uns melden:
                        </p>
                        <div className={FELD}>
                            <p className="font-semibold">{COMPANY_DATA.legalName}</p>
                            <p>Ansprechpartner: {COMPANY_DATA.owner.fullName}</p>
                            <p>{COMPANY_DATA.headquarters.street}, {COMPANY_DATA.headquarters.postalCode} {COMPANY_DATA.headquarters.city}</p>
                            <p>Telefon: <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className={`${linkKlassen} font-mono`}>{COMPANY_DATA.contact.phone}</a></p>
                            <p>E-Mail: <a href={`mailto:${COMPANY_DATA.contact.email}`} className={linkKlassen}>{COMPANY_DATA.contact.email}</a></p>
                        </div>
                    </div>

                    <div className={ABSCHNITT}>
                        <h2 className={H2}>Durchsetzungsverfahren / Schlichtungsstelle</h2>
                        <p className="mt-6">
                            Sollten Sie auf Mitteilungen oder Anfragen zur Barrierefreiheit innerhalb von sechs Wochen keine zufriedenstellende Antwort erhalten, können Sie sich an die Schlichtungsstelle nach dem Behindertengleichstellungsgesetz (BGG) wenden:
                        </p>
                        <p className={FELD}>
                            <span className="font-semibold">Schlichtungsstelle nach dem Behindertengleichstellungsgesetz bei dem Beauftragten der Bundesregierung für die Belange von Menschen mit Behinderungen</span><br />
                            Mauerstraße 53, 10117 Berlin<br />
                            Telefon: <span className="font-mono">030 18 527-2805</span><br />
                            E-Mail: <a href="mailto:info@schlichtungsstelle-bgg.de" className={linkKlassen}>info@schlichtungsstelle-bgg.de</a><br />
                            Website: <a href="https://www.schlichtungsstelle-bgg.de" target="_blank" rel="noopener noreferrer" className={`${linkKlassen} inline-flex items-center gap-1`}>www.schlichtungsstelle-bgg.de<Icon name="link-extern" groesse={4} /></a>
                        </p>
                    </div>

                    {/* Weiterführende Wege: Textlinks mit 44-px-Zielfläche (die Pfeile sind Teil des Linktexts und bleiben Zeichen) */}
                    <div className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-fuge pt-6">
                        <Knopf variante="text" href="/">&larr; Zurück zur Startseite</Knopf>
                        <Knopf variante="text" href="/kontakt">Kontakt aufnehmen &rarr;</Knopf>
                    </div>
                </div>
            </div>
        </>
    );
}
