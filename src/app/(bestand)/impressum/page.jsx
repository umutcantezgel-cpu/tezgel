// Impressum (E6-BAU-09 · S-28): Lesemodus wie die Ratgeber-Artikel (`blog/[slug]`) – kompakter Kopf (Einstieg
// art="arbeit", H1 text-fs-6), Rechtstext im Satzspiegel max-w-mass, Abschnitte an der Fuge. Nur Darstellung:
// Wortlaut, Reihenfolge, Überschriften und Links sind unverändert; Nummern und Kennungen in Mono (K-006).
import { COMPANY_DATA } from '@/config/company';
import Einstieg from '@/components/kern/Einstieg';
import Knopf from '@/components/kern/Knopf';
import { linkKlassen, seitenKlassen } from '@/components/kern/stile';

// Lesesatz (wie im Ratgeber-Artikel): Abschnitt mit Fuge oben, H2 text-fs-5, H3 text-fs-4, Text fs-3
const ABSCHNITT = 'mt-12 border-t border-fuge pt-8 first:mt-0 first:border-t-0 first:pt-0';
const H2 = 'text-fs-5 text-tinte';
const H3 = 'mt-8 text-fs-4 text-tinte first:mt-0';

export default function ImpressumPage() {
    return (
        <>
            {/* KOPF (Arbeitsansicht): Etikett (vormals Badge, Wortlaut gleich) und H1 */}
            <Einstieg
                art="arbeit"
                etikett="Rechtliche Pflichtangaben nach § 5 Digitale-Dienste-Gesetz (DDG)"
                titel="Impressum"
            />

            {/* LESEMODUS: Rechtstext im Satzspiegel, Lesefolge wie im Bestand */}
            <div className={`${seitenKlassen} py-12 lg:py-16`}>
                <div className="max-w-mass text-fs-3 text-tinte">

                    {/* Angaben nach § 5 DDG */}
                    <div className={ABSCHNITT}>
                        <h2 className={H2}>Angaben gemäß § 5 DDG:</h2>
                        <div className="mt-6">
                            <p className="font-semibold">{COMPANY_DATA.legalName}</p>
                            <p>Inhaber: <strong className="font-semibold">{COMPANY_DATA.owner.fullName}</strong></p>
                            <p>{COMPANY_DATA.headquarters.street}</p>
                            <p>{COMPANY_DATA.headquarters.postalCode} {COMPANY_DATA.headquarters.city}</p>
                            <p className="text-tinte-2">Deutschland / Hessen</p>
                        </div>
                    </div>

                    {/* Kontakt: Nummern in Mono (K-006) */}
                    <div className={ABSCHNITT}>
                        <h2 className={H2}>Kontakt &amp; Erreichbarkeit:</h2>
                        <div className="mt-6 space-y-2">
                            <p>Telefon: <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className={`${linkKlassen} whitespace-nowrap font-mono`}>{COMPANY_DATA.contact.phone}</a></p>
                            <p>Mobilfunk / WhatsApp: <a href={COMPANY_DATA.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className={`${linkKlassen} whitespace-nowrap font-mono`}>{COMPANY_DATA.contact.mobile}</a></p>
                            <p>Telefax: <span className="whitespace-nowrap font-mono">{COMPANY_DATA.contact.fax}</span></p>
                            <p>E-Mail: <a href={`mailto:${COMPANY_DATA.contact.email}`} className={linkKlassen}>{COMPANY_DATA.contact.email}</a></p>
                        </div>
                    </div>

                    {/* Steuer und Kennung */}
                    <div className={ABSCHNITT}>
                        <h2 className={H2}>Umsatzsteuer-Identifikationsnummer:</h2>
                        <p className="mt-6">Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
                        <p className="mt-2 font-mono text-fs-4">{COMPANY_DATA.tax.ustId}</p>
                    </div>

                    {/* Kammer und Berufsrecht */}
                    <div className={ABSCHNITT}>
                        <h2 className={H2}>Zuständige Kammer &amp; Aufsichtsbehörde:</h2>
                        <div className="mt-6">
                            <p className="font-semibold">{COMPANY_DATA.authority.name}</p>
                            <p>Bierstadter Straße 45, 65189 Wiesbaden</p>
                        </div>
                        <p className="mt-6">
                            Berufsbezeichnung: Fliesen-, Platten- und Mosaiklegerbetrieb (verliehen in der Bundesrepublik Deutschland)
                        </p>
                        <p className="mt-2">
                            Berufsrechtliche Regelungen: Handwerksordnung (HwO) (einsehbar unter: <a href="https://www.gesetze-im-internet.de/hwo/" target="_blank" rel="noopener noreferrer" className={`${linkKlassen} break-words`}>www.gesetze-im-internet.de/hwo/</a>)
                        </p>
                    </div>

                    {/* Streitbeilegung */}
                    <div className={ABSCHNITT}>
                        {/* Schrägstrich bleibt am ersten Teil: keine Zeile beginnt mit „/“ */}
                        <h2 className={H2}>Verbraucherstreitbeilegung<span className="whitespace-nowrap"> /</span> Universalschlichtungsstelle:</h2>
                        <p className="mt-6">
                            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                        </p>
                    </div>

                    {/* Konzeption und Umsetzung */}
                    <div className={ABSCHNITT}>
                        <h2 className={H2}>Konzeption, Webdesign &amp; Realisierung:</h2>
                        <p className="mt-6">
                            <a
                                href="https://www.codayweb.de/de"
                                target="_blank"
                                rel="noopener"
                                title="Coday Webdesign – Agentur für Webseiten &amp; SEO in Wetzlar"
                                className={`${linkKlassen} font-semibold`}
                            >
                                Coday Webdesign Wetzlar – Agentur für Webdesign &amp; SEO
                            </a>
                        </p>
                        <p className="mt-2 text-tinte-2">
                            Technische Konzeption, Webdesign, Suchmaschinenoptimierung und laufende Betreuung durch Coday Webdesign in Wetzlar.
                        </p>
                        <p className="mt-2 text-fs-2 text-tinte-2">
                            Website:{' '}
                            <a
                                href="https://www.codayweb.de/de"
                                target="_blank"
                                rel="noopener"
                                title="codayweb.de – Webdesign &amp; SEO Wetzlar"
                                className={linkKlassen}
                            >
                                codayweb.de
                            </a>
                        </p>
                    </div>

                    {/* Haftung und Urheberrecht (H3 wie im Bestand) */}
                    <div className={ABSCHNITT}>
                        <h3 className={H3}>Haftung für Inhalte</h3>
                        <p className="mt-4">
                            Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                        </p>

                        <h3 className={H3}>Haftung für Links</h3>
                        <p className="mt-4">
                            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                        </p>

                        <h3 className={H3}>Urheberrecht</h3>
                        <p className="mt-4">
                            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                        </p>
                    </div>

                    {/* Weiter: Rückweg und nächste Rechtsseite als Textlinks an der Fuge */}
                    <div className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-fuge pt-6">
                        <Knopf variante="text" href="/">&larr; Zurück zur Startseite</Knopf>
                        <Knopf variante="text" href="/datenschutz">Zur Datenschutzerklärung &rarr;</Knopf>
                    </div>

                </div>
            </div>
        </>
    );
}
