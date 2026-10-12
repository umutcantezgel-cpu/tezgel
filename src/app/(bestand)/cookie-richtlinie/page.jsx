// Cookie-Richtlinie (E6-BAU-10, S-29): Lesemodus wie die Ratgeber-Artikel – kompakter Kopf (Einstieg art="arbeit",
// H1 text-fs-6), Text im Satzspiegel max-w-mass, Abschnitte an der Fuge, die drei Kategorien als Felder im Fugenraster.
// Rechtstext, Überschriften und Reihenfolge unverändert; Serverkomponente.
import React from 'react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import Einstieg from '@/components/kern/Einstieg';
import Knopf from '@/components/kern/Knopf';
import { Feld } from '@/components/kern/Feldraster';
import { linkKlassen, seitenKlassen } from '@/components/kern/stile';

export const metadata = createMetadata({
    title: 'Cookie-Richtlinie (EU) | Fliesenverlegung Tezgel',
    description: 'Informationen über die Verwendung von Cookies und ähnlichen Technologien auf der Website der Fliesenverlegung Tezgel in Hessen.',
    path: '/cookie-richtlinie',
    robots: { index: false, follow: true },
});

// Lesesatz (wie im Ratgeber-Artikel und auf den übrigen Rechtsseiten, S-28): Abschnitt mit Fuge oben, H2 text-fs-5,
// Inhalt mt-6, H3 text-fs-4, Text fs-3
const ABSCHNITT = 'mt-12 border-t border-fuge pt-8 first:mt-0 first:border-t-0 first:pt-0';
const H2 = 'text-fs-5 text-tinte';
const H3 = 'text-fs-4 text-tinte';

export default function CookieRichtliniePage() {
    return (
        <>
            <Einstieg
                art="arbeit"
                etikett="EU-Richtlinie über den Schutz der Privatsphäre in der elektronischen Kommunikation"
                titel="Cookie-Richtlinie (EU)"
            />

            {/* LESEMODUS: Text im Satzspiegel, links an derselben Kante wie die H1 */}
            <div className={`${seitenKlassen} py-12 lg:py-16`}>
                <div className="max-w-mass text-fs-3 text-tinte">
                    <div className={ABSCHNITT}>
                        <h2 className={H2}>1. Einführung</h2>
                        <p className="mt-6">
                            Unsere Website, <a href={COMPANY_DATA.contact.website} className={linkKlassen}>{COMPANY_DATA.contact.website}</a> (im Folgenden: &bdquo;Die Website&ldquo;), verwendet Cookies und ähnliche Technologien (der Einfachheit halber werden all diese unter &bdquo;Cookies&ldquo; zusammengefasst). Cookies werden außerdem von uns beauftragten Drittparteien platziert.
                        </p>
                    </div>

                    <div className={ABSCHNITT}>
                        <h2 className={H2}>2. Was sind Cookies?</h2>
                        <p className="mt-6">
                            Ein Cookie ist eine kleine, einfache Datei, die mit den Seiten dieser Website gesendet und von Ihrem Browser auf der Festplatte Ihres Computers oder eines anderen Geräts gespeichert wird. Die darin gespeicherten Informationen können bei späteren Besuchen an unsere Server oder die Server der relevanten Drittparteien zurückgesendet werden.
                        </p>
                    </div>

                    <div className={ABSCHNITT}>
                        <h2 className={H2}>3. Cookie-Kategorien</h2>
                        {/* Felder statt Karten: drei Kategorien untereinander, getrennt nur durch 1-px-Fugen */}
                        <div className="mt-6 grid grid-cols-1 gap-px border border-fuge bg-fuge">
                            <Feld als="div">
                                <h3 className={H3}>Technisch notwendige / Funktionale Cookies (Immer aktiv)</h3>
                                <p className="mt-2">
                                    Einige Cookies stellen sicher, dass bestimmte Teile der Website einwandfrei funktionieren und Ihre Benutzervorlieben bekannt bleiben (z. B. Navigation, Formularzustände). Diese dürfen ohne vorherige Einwilligung gesetzt werden.
                                </p>
                            </Feld>

                            <Feld als="div">
                                <h3 className={H3}>Präferenz- &amp; Einstellungs-Cookies</h3>
                                <p className="mt-2">
                                    Präferenz-Cookies ermöglichen es der Website, sich an Informationen zu erinnern, die das Verhalten oder Aussehen der Website verändern (z. B. Ihre bevorzugte Region im Konfigurator).
                                </p>
                            </Feld>

                            <Feld als="div">
                                <h3 className={H3}>Statistik- &amp; Analyse-Cookies</h3>
                                <p className="mt-2">
                                    Wir verwenden analytische Cookies, um das Nutzungserlebnis für unsere Besucher zu optimieren und anonyme Einblicke in die Nutzung unserer Rechner und Konfiguratoren zu erhalten.
                                </p>
                            </Feld>
                        </div>
                    </div>

                    <div className={ABSCHNITT}>
                        <h2 className={H2}>4. Zustimmung verwalten &amp; widerrufen</h2>
                        <p className="mt-6">
                            Wenn Sie unsere Website zum ersten Mal besuchen, zeigen wir Ihnen ein Pop-up mit einer Erklärung zu Cookies an. Sobald Sie auf &bdquo;Einstellungen speichern&ldquo; klicken, geben Sie uns Ihr Einverständnis, die von Ihnen gewählten Kategorien von Cookies zu verwenden. Sie können die Verwendung von Cookies jederzeit über Ihren Browser oder unsere Cookie-Einstellungen deaktivieren bzw. widerrufen.
                        </p>
                    </div>

                    {/* Weiterführende Wege: Textlinks mit 44-px-Zielfläche (die Pfeile sind Teil des Linktexts und bleiben Zeichen) */}
                    <div className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-fuge pt-6">
                        <Knopf variante="text" href="/">&larr; Zurück zur Startseite</Knopf>
                        <Knopf variante="text" href="/datenschutz">Zur Datenschutzerklärung &rarr;</Knopf>
                    </div>
                </div>
            </div>
        </>
    );
}
