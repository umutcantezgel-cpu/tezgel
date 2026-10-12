// Förderung & Zuschüsse (S-27 · E6-BAU-08, KERN v2): Arbeitsansicht nach dem Muster von (bestand)/kontakt. Kompakter Einstieg
// (Kennzeile, H1, Vorspann, Projektcheck als Hauptknopf, Beratung als Nebenknopf); danach die Förderprogramme als Feldraster mit
// Kennwerten in Mono und darunter, an derselben Fuge, das breite Feld zum Pflegekassen-Zuschuss (Kalk) · Häufige Fragen, Kopf seitlich:
// Frage und Antwort an der Fuge, darunter Telefon und der Weg zu allen FAQ (Fliese) · Qualitätsversprechen (Kalk) ·
// Express-Anfrage #anfrage mit der Rückfrage daneben (Fliese) · Abschluss ohne Achse (Kalk).
// Kennwerte und die Zahlen der Beträge stehen in Mono (Messbares, K-006), der Wortlaut bleibt. Kein großer Moment, keine Auftritte, keine Leitachse.
// `spaet` nur auf den Fragen (Bedienelemente am Ende, kein Sprungziel); nicht auf #anfrage (Sprungziel mit Formular).
// Texte, Überschriften, Links, IDs und Lesefolge wie im Bestand; Metadaten und JSON-LD bleiben in ./layout.tsx.
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import { COMPANY_DATA } from '@/config/company';
import QualityPromise from '@/components/sections/QualityPromise';
import { FinalCTA } from '@/components/ui/FinalCTA';
import Icon from '@/components/icons/Icon';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Knopf from '@/components/kern/Knopf';
import Rueckfrage from '@/components/kern/Rueckfrage';
import { etikettKlassen } from '@/components/kern/stile';

// Express-Anfrage nachladen wie auf der Startseite und /leistungen (Tempo); ohne JavaScript bleiben die direkten Wege stehen
const TezgelAnfrageFunnel = dynamic(() => import('@/components/funnels/TezgelAnfrageFunnel'), {
    loading: () => <FormularPlatzhalter />,
});

const GRANT_ITEMS = [
    { rate: '§ 40 SGB XI', title: 'Pflegekassen-Zuschuss', desc: 'Bis zu 4.180 € pro pflegebedürftiger Person für Maßnahmen zur Wohnumfeldverbesserung, z. B. die bodengleiche Dusche statt Badewanne.' },
    { rate: 'Pflegegrad 1–5', title: 'Voraussetzung', desc: 'Den Zuschuss der Pflegekasse erhalten Pflegebedürftige mit anerkanntem Pflegegrad.' },
    { rate: 'KfW 159', title: 'Altersgerecht Umbauen', desc: 'Über das KfW-Programm 159 („Altersgerecht Umbauen“) können barrierefreie Bäder gefördert werden.' },
    { rate: 'Antrag', title: 'Prüffähiger Kostenvoranschlag', desc: 'Wir erstellen den prüffähigen Kostenvoranschlag und begleiten Ihren Antrag von Anfang an.' }
];

// Keep in sync with the FAQPage JSON-LD in ./layout.tsx (same questions & answers).
const foerderFaqs = [
    {
        q: 'Wie läuft der Antrag auf den Pflegekassen-Zuschuss ab?',
        a: 'Wir erstellen für Ihr barrierefreies Bad den prüffähigen Kostenvoranschlag, den Sie bei Ihrer Pflegekasse einreichen. Stellen Sie den Antrag möglichst vor Beginn der Arbeiten – wir begleiten Sie von Anfang an.'
    },
    {
        q: 'Welche Voraussetzungen gelten für den Zuschuss der Pflegekasse?',
        a: 'Voraussetzung ist ein Pflegegrad (1–5). Die Pflegekasse bezuschusst dann Maßnahmen zur Wohnumfeldverbesserung – z. B. eine bodengleiche Dusche statt Badewanne oder schwellenlose Zugänge – mit bis zu 4.180 € pro pflegebedürftiger Person.'
    },
    {
        q: 'Gibt es auch Fördermittel für die Badsanierung?',
        a: 'Ja, über das KfW-Programm 159 („Altersgerecht Umbauen“) können barrierefreie Bäder gefördert werden. Zudem bezuschusst die Pflegekasse Maßnahmen zur Wohnumfeldverbesserung nach § 40 SGB XI mit bis zu 4.180 Euro pro pflegebedürftiger Person.'
    },
    {
        q: `Unterstützt ${COMPANY_DATA.legalName} mich bei den Formalitäten?`,
        a: 'Selbstverständlich! Wir erstellen den prüffähigen Kostenvoranschlag für Ihren Antrag und begleiten Sie Schritt für Schritt – vom kostenfreien Vor-Ort-Aufmaß bis zur Abnahme.'
    }
];

// Beträge (K-006: Messbares): die Zahl in Mono, die Einheit in der Textschrift – sonst stünde zwischen beiden ein volles
// Mono-Leerzeichen; Zahl und Einheit brechen nicht auseinander. Ebenso bleibt „§ 40 SGB XI“ auf einer Zeile (mobil stand
// das Paragrafenzeichen sonst allein am Zeilenende). Der Wortlaut bleibt unverändert.
const BETRAG = /(\d{1,3}(?:\.\d{3})* (?:€|Euro)|§ \d+ SGB [IVX]+)/;
function Betrag({ children }) {
    const [zahl, einheit] = children.split(' ');
    return (
        <span className="whitespace-nowrap">
            <span className="font-mono">{zahl}</span> {einheit}
        </span>
    );
}
function mitBetraegen(text) {
    return text.split(BETRAG).map((teil, i) => {
        if (i % 2 === 0) return teil;
        return teil.startsWith('§') ? <span key={i} className="whitespace-nowrap">{teil}</span> : <Betrag key={i}>{teil}</Betrag>;
    });
}

export default function FoerderungPage() {
    return (
        <>
            {/* 1. EINSTIEG: Kennzeile (vormals Badge), H1, Vorspann; Projektcheck als Hauptknopf, Beratung als Nebenknopf */}
            <Einstieg
                art="arbeit"
                etikett={<>Pflegekasse (§ 40 SGB XI) &middot; KfW 159</>}
                titel={<>Förderung &amp; Zuschüsse für Ihr barrierefreies Bad</>}
                vorspann={
                    <p>
                        Verschenken Sie kein Geld: Für barrierefreie Bäder gibt es bis zu <Betrag>4.180 €</Betrag> von der Pflegekasse. Wir begleiten Ihren Antrag von Anfang an.
                    </p>
                }
                aktionen={
                    <>
                        <Knopf href="/bad/projekt-check" icon="pfeil-rechts">
                            Bad-Projektcheck starten
                        </Knopf>
                        <Knopf href="/kontakt" variante="neben">
                            Beratung vereinbaren
                        </Knopf>
                    </>
                }
            />

            {/* 2. FÖRDERPROGRAMME: Feldraster mit Kennwert in Mono je Programm; darunter an derselben Fuge das Feld zum Zuschuss
                für barrierefreie Bäder mit dem Weg zur Beratung (vormals Doppelrahmen) */}
            <Abschnitt
                art="arbeit"
                id="zuschuesse"
                etikett="Zuschüsse im Überblick"
                titel="Diese Förderung gibt es für Ihr barrierefreies Bad"
                einleitung={<p>Welche Zuschüsse in Ihrem Fall infrage kommen, besprechen wir gemeinsam beim kostenfreien Vor-Ort-Aufmaß.</p>}
            >
                <Feldraster spalten={4}>
                    {GRANT_ITEMS.map((item) => (
                        <Feld key={item.title}>
                            <p className="border-b border-fuge pb-4 font-mono text-fs-4 text-tinte">{item.rate}</p>
                            <h3 className="mt-6 text-fs-4 text-tinte">{item.title}</h3>
                            <p className="mt-2 font-text text-fs-2 text-tinte-2">{mitBetraegen(item.desc)}</p>
                        </Feld>
                    ))}
                </Feldraster>

                <div className="flex flex-col gap-8 border-x border-b border-fuge bg-fliese p-6 md:flex-row md:items-end md:justify-between lg:p-8">
                    <div className="max-w-mass">
                        <p className={etikettKlassen}>
                            <Icon name="bad" groesse={4} />
                            Barrierefreie Bäder (§ 40 SGB XI)
                        </p>
                        <h3 className="mt-4 text-fs-5 text-tinte">
                            Bis zu 4.180 € Zuschuss für Ihr barrierefreies Bad
                        </h3>
                        <p className="mt-4 font-text text-fs-3 text-tinte-2">
                            Für Pflegebedürftige (Pflegegrad 1–5) übernimmt die Pflegekasse bis zu <Betrag>4.180 €</Betrag> für Maßnahmen zur Wohnumfeldverbesserung (z. B. bodengleiche Dusche statt Badewanne, schwellenlose Zugänge). Wir erstellen den prüffähigen Kostenvoranschlag.
                        </p>
                    </div>
                    <Knopf href="/kontakt" icon="pfeil-rechts" className="shrink-0">
                        Beratung vereinbaren
                    </Knopf>
                </div>
            </Abschnitt>

            {/* 3. HÄUFIGE FRAGEN, Kopf seitlich: Frage und Antwort an der Fuge (spiegeln das FAQPage-JSON-LD), darunter Telefon und
                der Weg zu allen Fragen. pb-1: der Fokusring der letzten Zeile bleibt in der spaet-Hülle (content-visibility) */}
            <Abschnitt
                art="arbeit"
                flaeche="fliese"
                kopf="seitlich"
                etikett="Häufige Fragen"
                titel="Förderung für Ihr Bad – kurz erklärt"
                spaet
            >
                <div className="border-t border-tinte">
                    {foerderFaqs.map((faq) => (
                        <div key={faq.q} className="border-b border-fuge py-6">
                            <h3 className="text-fs-4 text-tinte">{faq.q}</h3>
                            <p className="mt-2 max-w-mass font-text text-fs-3 text-tinte-2">{mitBetraegen(faq.a)}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 pb-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
                    <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                        <span className="font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
                    </Knopf>
                    <Knopf href="/faq" variante="text" icon="pfeil-rechts">
                        Weitere Fragen &amp; Antworten
                    </Knopf>
                </div>
            </Abschnitt>

            <QualityPromise art="arbeit" />

            {/* 4. EXPRESS-ANFRAGE #anfrage: Funnel (8 Spalten) und Rückfrage (4 Spalten, ab lg klebend) im selben Raster */}
            <Abschnitt art="arbeit" id="anfrage" aria-label="Express-Anfrage" flaeche="fliese">
                <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                    <div className="min-w-0 lg:col-span-8">
                        <TezgelAnfrageFunnel />
                    </div>
                    <div className="lg:col-span-4">
                        <Rueckfrage />
                    </div>
                </div>
            </Abschnitt>

            <FinalCTA achse={false} />
        </>
    );
}
