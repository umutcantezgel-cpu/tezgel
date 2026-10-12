// AGB (E6-BAU-09 · S-28): Lesemodus wie die Ratgeber-Artikel (`blog/[slug]`) – kompakter Kopf (Einstieg art="arbeit",
// H1 text-fs-6), Bedingungen im Satzspiegel max-w-mass, Paragrafen an der Fuge, Absatznummern in Mono (K-006).
// Nur Darstellung: Wortlaut, Reihenfolge, Überschriften und Links sind unverändert.
import { COMPANY_DATA } from '@/config/company';
import Einstieg from '@/components/kern/Einstieg';
import Knopf from '@/components/kern/Knopf';
import { seitenKlassen } from '@/components/kern/stile';

// Lesesatz (wie im Ratgeber-Artikel): Paragraf mit Fuge oben, H2 text-fs-5, Absätze fs-3
const ABSCHNITT = 'mt-12 border-t border-fuge pt-8 first:mt-0 first:border-t-0 first:pt-0';
const H2 = 'text-fs-5 text-tinte';
const ABSATZ = 'mt-6';
// Absatznummer „(1)“ in Mono: Gliederungszeichen wie Schrittnummern (K-006), Text bleibt in Archivo
const NR = 'font-mono text-tinte-2';

export default function AGBPage() {
    return (
        <>
            {/* KOPF (Arbeitsansicht): Etikett (vormals Badge, Wortlaut gleich) und H1 */}
            <Einstieg
                art="arbeit"
                etikett="Geschäftsbedingungen für Werk- und Montageleistungen"
                titel="Allgemeine Geschäftsbedingungen (AGB)"
            />

            {/* LESEMODUS: Bedingungen im Satzspiegel, Lesefolge wie im Bestand */}
            <div className={`${seitenKlassen} py-12 lg:py-16`}>
                <div className="max-w-mass text-fs-3 text-tinte">

                    <div className={ABSCHNITT}>
                        <h2 className={H2}>§ 1 Geltungsbereich &amp; Vertragspartner</h2>
                        <p className={ABSATZ}>
                            <span className={NR}>(1)</span> Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge über Lieferungen, Montage-, Installations- und Wartungsleistungen zwischen der <strong className="font-semibold">{COMPANY_DATA.legalName}</strong>, Inhaber {COMPANY_DATA.owner.fullName}, {COMPANY_DATA.headquarters.street}, {COMPANY_DATA.headquarters.postalCode} {COMPANY_DATA.headquarters.city} (nachfolgend &bdquo;Auftragnehmer&ldquo;) und ihren Kunden (nachfolgend &bdquo;Auftraggeber&ldquo;).
                        </p>
                        <p className={ABSATZ}>
                            <span className={NR}>(2)</span> Abweichende oder ergänzende Bedingungen des Auftraggebers werden nicht Vertragsbestandteil, es sei denn, der Auftragnehmer stimmt ihrer Geltung ausdrücklich schriftlich zu.
                        </p>
                    </div>

                    <div className={ABSCHNITT}>
                        <h2 className={H2}>§ 2 Angebot, Festpreis &amp; Vertragsschluss</h2>
                        <p className={ABSATZ}>
                            <span className={NR}>(1)</span> Angebote des Auftragnehmers sind, sofern nicht ausdrücklich als verbindlich gekennzeichnet, freibleibend.
                        </p>
                        <p className={ABSATZ}>
                            <span className={NR}>(2)</span> Ein verbindlicher Vertrag kommt durch schriftliche Auftragsbestätigung oder durch Beginn der Ausführungsarbeiten zustande.
                        </p>
                        <p className={ABSATZ}>
                            <span className={NR}>(3)</span> Sofern ein Festpreis vereinbart wurde, gilt dieser für die im Angebot exakt beschriebenen Leistungen. Mehrleistungen, die auf nachträglichen Sonderwünschen des Auftraggebers oder unvorhersehbaren bauseitigen Hindernissen beruhen, werden gesondert nach tatsächlichem Aufwand bzw. Nachtragsangebot vergütet.
                        </p>
                    </div>

                    <div className={ABSCHNITT}>
                        <h2 className={H2}>§ 3 Ausführungsfristen &amp; Mitwirkungspflichten</h2>
                        <p className={ABSATZ}>
                            <span className={NR}>(1)</span> Ausführungsfristen sind verbindlich, sofern sie im Bauzeitenplan schriftlich fixiert wurden.
                        </p>
                        <p className={ABSATZ}>
                            <span className={NR}>(2)</span> Der Auftraggeber sorgt für ungehinderten Zugang zur Baustelle sowie die kostenlose Bereitstellung von Wasser und Baustrom.
                        </p>
                    </div>

                    <div className={ABSCHNITT}>
                        <h2 className={H2}>§ 4 Abnahme &amp; Gewährleistung</h2>
                        <p className={ABSATZ}>
                            <span className={NR}>(1)</span> Nach Fertigstellung der Leistung erfolgt eine gemeinsame förmliche Abnahme.
                        </p>
                        <p className={ABSATZ}>
                            <span className={NR}>(2)</span> Für Werkleistungen an Bauwerken (Badsanierungen) gilt die gesetzliche Gewährleistungsfrist nach BGB (5 Jahre). Für Wartungs- und Reparaturarbeiten gilt die gesetzliche Frist von 2 Jahren bzw. die Bedingungen des Herstellers.
                        </p>
                    </div>

                    <div className={ABSCHNITT}>
                        <h2 className={H2}>§ 5 Gerichtsstand &amp; Schlussbestimmungen</h2>
                        <p className={ABSATZ}>
                            <span className={NR}>(1)</span> Es gilt das Recht der Bundesrepublik Deutschland.
                        </p>
                        <p className={ABSATZ}>
                            <span className={NR}>(2)</span> Erfüllungsort und Gerichtsstand für alle Streitigkeiten mit Kaufleuten oder juristischen Personen des öffentlichen Rechts ist <strong className="font-semibold">Wetzlar</strong>.
                        </p>
                    </div>

                    {/* Weiter: Rückweg und nächste Rechtsseite als Textlinks an der Fuge */}
                    <div className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-fuge pt-6">
                        <Knopf variante="text" href="/">&larr; Zurück zur Startseite</Knopf>
                        <Knopf variante="text" href="/widerruf">Zur Widerrufsbelehrung &rarr;</Knopf>
                    </div>

                </div>
            </div>
        </>
    );
}
