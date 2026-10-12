// Datenschutzerklärung (E6-BAU-09 · S-28): Lesemodus wie die Ratgeber-Artikel (`blog/[slug]`) – kompakter Kopf
// (Einstieg art="arbeit", H1 text-fs-6), Rechtstext im Satzspiegel max-w-mass, Abschnitte an der Fuge, die verantwortliche
// Stelle als Feld (Fliese), Rechte als Liste an der Fuge (Fugenkreuz). Nur Darstellung: Wortlaut, Reihenfolge,
// Überschriften und Links sind unverändert.
import { COMPANY_DATA } from '@/config/company';
import Einstieg from '@/components/kern/Einstieg';
import Knopf from '@/components/kern/Knopf';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { linkKlassen, seitenKlassen } from '@/components/kern/stile';

// Lesesatz (wie im Ratgeber-Artikel): Abschnitt mit Fuge oben, H2 text-fs-5, H3 text-fs-4, Text fs-3
const ABSCHNITT = 'mt-12 border-t border-fuge pt-8 first:mt-0 first:border-t-0 first:pt-0';
const H2 = 'text-fs-5 text-tinte';
const H3 = 'mt-8 text-fs-4 text-tinte';

// Recht der betroffenen Person: Zeile an der Fuge mit Fugenkreuz (Liste wie im Ratgeber-Artikel)
function Recht({ children }) {
    return (
        <li className="flex items-start gap-4 border-b border-fuge py-3">
            <Fugenkreuz className="mt-2 size-3 shrink-0 text-strich" />
            <span className="min-w-0 flex-1">{children}</span>
        </li>
    );
}

export default function DatenschutzPage() {
    return (
        <>
            {/* KOPF (Arbeitsansicht): Etikett (vormals Badge, Wortlaut gleich) und H1 */}
            <Einstieg
                art="arbeit"
                etikett={<>Datenschutz nach der DSGVO &amp; BDSG</>}
                titel="Datenschutzerklärung"
            />

            {/* LESEMODUS: Rechtstext im Satzspiegel, Lesefolge wie im Bestand */}
            <div className={`${seitenKlassen} py-12 lg:py-16`}>
                <div className="max-w-mass text-fs-3 text-tinte">

                    {/* 1. Datenschutz auf einen Blick */}
                    <div className={ABSCHNITT}>
                        <h2 className={H2}>1. Datenschutz auf einen Blick</h2>
                        <h3 className="mt-6 text-fs-4 text-tinte">Allgemeine Hinweise</h3>
                        <p className="mt-4">
                            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                        </p>
                        <h3 className={H3}>Datenerfassung auf dieser Website</h3>
                        <p className="mt-4">
                            <strong className="font-semibold">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber: {COMPANY_DATA.owner.fullName}, {COMPANY_DATA.legalName}, {COMPANY_DATA.headquarters.street}, {COMPANY_DATA.headquarters.postalCode} {COMPANY_DATA.headquarters.city}.
                        </p>
                        <p className="mt-6">
                            <strong className="font-semibold">Wie erfassen wir Ihre Daten?</strong><br />
                            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z. B. Angaben im Express-Anfrage-Funnel, Kontaktaufnahme per E-Mail oder WhatsApp). Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst (z. B. Browsertyp, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                        </p>
                    </div>

                    {/* 2. Verantwortliche Stelle: Feld auf Fliese statt Kasten */}
                    <div className={ABSCHNITT}>
                        <h2 className={H2}>2. Hinweis zur verantwortlichen Stelle</h2>
                        <p className="mt-6">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                        <div className="mt-6 border border-fuge bg-fliese p-6">
                            <p className="font-semibold">{COMPANY_DATA.legalName}</p>
                            <p>Inhaber: {COMPANY_DATA.owner.fullName}</p>
                            <p>{COMPANY_DATA.headquarters.street}</p>
                            <p>{COMPANY_DATA.headquarters.postalCode} {COMPANY_DATA.headquarters.city}</p>
                            <p className="mt-3">Telefon: <span className="whitespace-nowrap font-mono">{COMPANY_DATA.contact.phone}</span></p>
                            <p>Mobilfunk / WhatsApp: <span className="whitespace-nowrap font-mono">{COMPANY_DATA.contact.mobile}</span></p>
                            <p>E-Mail: <a href={`mailto:${COMPANY_DATA.contact.email}`} className={linkKlassen}>{COMPANY_DATA.contact.email}</a></p>
                        </div>
                    </div>

                    {/* 3. Lokale Schriften */}
                    <div className={ABSCHNITT}>
                        <h2 className={H2}>3. Lokale Schriften (Next.js Font Optimization)</h2>
                        <p className="mt-6">
                            Diese Website nutzt zur einheitlichen Darstellung von Schriftarten lokale Schriften, die über die Next.js Font-Pipeline bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Schriftdateien direkt von unserem Webserver. Es wird <strong className="font-semibold">keine</strong> Verbindung zu externen Servern von Drittanbietern (wie Google Fonts) aufgebaut und keine IP-Adresse dorthin übertragen.
                        </p>
                    </div>

                    {/* 4. WhatsApp-Kommunikation */}
                    <div className={ABSCHNITT}>
                        <h2 className={H2}>4. Kontaktaufnahme via WhatsApp</h2>
                        <p className="mt-6">
                            Wir bieten Ihnen die Möglichkeit, über die Anwendung &bdquo;WhatsApp&ldquo; schnell und unkompliziert Kontakt mit Herrn {COMPANY_DATA.owner.fullName} aufzunehmen. Anbieter von WhatsApp ist die WhatsApp Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland.
                        </p>
                        <p className="mt-6">
                            Die Nutzung erfolgt auf rein freiwilliger Basis (Art. 6 Abs. 1 lit. a DSGVO). Wenn Sie auf einen WhatsApp-Button klicken, öffnet sich die WhatsApp-Anwendung auf Ihrem Endgerät oder WhatsApp Web. Die Datenübertragung (Telefonnummer, Nachrichtentext) erfolgt direkt zwischen Ihnen und uns über die Ende-zu-Ende-Verschlüsselung von WhatsApp. Details zum Datenschutz bei WhatsApp finden Sie unter: <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className={`${linkKlassen} break-words`}>https://www.whatsapp.com/legal/privacy-policy</a>.
                        </p>
                    </div>

                    {/* 5. Ihre Rechte: Liste an der Fuge mit Fugenkreuz (wie im Ratgeber-Artikel) */}
                    <div className={ABSCHNITT}>
                        <h2 className={H2}>5. Ihre Rechte als betroffene Person</h2>
                        <p className="mt-6">Sie haben im Rahmen der DSGVO jederzeit das Recht auf:</p>
                        <ul className="mt-6 border-t border-fuge">
                            <Recht>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</Recht>
                            <Recht>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</Recht>
                            <Recht>Löschung Ihrer Daten (&bdquo;Recht auf Vergessenwerden&ldquo;, Art. 17 DSGVO)</Recht>
                            <Recht>Einschränkung der Datenverarbeitung (Art. 18 DSGVO)</Recht>
                            <Recht>Datenübertragbarkeit (Art. 20 DSGVO)</Recht>
                            <Recht>Widerruf Ihrer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</Recht>
                            <Recht>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</Recht>
                        </ul>
                        <h3 className={H3}>Beschwerderecht bei der Aufsichtsbehörde:</h3>
                        <p className="mt-4">
                            Der Hessische Beauftragte für Datenschutz und Informationsfreiheit<br />
                            Gustav-Stresemann-Ring 1, 65189 Wiesbaden<br />
                            Website: <a href="https://datenschutz.hessen.de" target="_blank" rel="noopener noreferrer" className={`${linkKlassen} break-words`}>https://datenschutz.hessen.de</a>
                        </p>
                    </div>

                    {/* 6. Technischer Dienstleister */}
                    <div className={ABSCHNITT}>
                        <h2 className={H2}>6. Technischer Dienstleister &amp; Website-Betreuung</h2>
                        <p className="mt-6">
                            Für die technische Konzeption, Entwicklung und laufende Betreuung dieser Website arbeiten wir mit folgendem Dienstleister zusammen:{' '}
                            <strong className="font-semibold">Coday Webdesign Wetzlar</strong> &mdash; Agentur für Webdesign, SEO &amp; Branding in Wetzlar.{' '}
                            <a
                                href="https://www.codayweb.de/de"
                                target="_blank"
                                rel="noopener"
                                title="Coday Webdesign Wetzlar – Agentur für Webdesign &amp; SEO"
                                className={`${linkKlassen} font-semibold`}
                            >
                                codayweb.de
                            </a>
                        </p>
                        <p className="mt-4 text-fs-2 text-tinte-2">
                            Die Zusammenarbeit erfolgt im Rahmen einer datenschutzkonformen Auftragsverarbeitung gemäß Art. 28 DSGVO, um den sicheren und technisch einwandfreien Betrieb dieser Webpräsenz zu gewährleisten.
                        </p>
                    </div>

                    {/* Weiter: Rückweg und nächste Rechtsseite als Textlinks an der Fuge */}
                    <div className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-fuge pt-6">
                        <Knopf variante="text" href="/">&larr; Zurück zur Startseite</Knopf>
                        <Knopf variante="text" href="/impressum">Zum Impressum &rarr;</Knopf>
                    </div>

                </div>
            </div>
        </>
    );
}
