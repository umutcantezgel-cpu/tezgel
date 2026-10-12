// Terminvereinbarung (S-25 · E6-BAU-06, KERN v2): eingebunden nur auf /beratung (Sprungziel #booking). Kopf gestapelt wie
// ein Abschnitt der Arbeitsansicht (H2 #booking-heading, Einleitung), darunter ein gerahmtes Feld auf Fliese: die drei Wege
// Telefon · WhatsApp · E-Mail als Felder an der Fuge (Etikett in Mono über dem Wert, ab md nebeneinander), unten die
// Leiste mit der Erreichbarkeit (Zeiten in Mono) und dem Hauptknopf zur Express-Anfrage.
// Kein Drittanbieter: Die frühere Kalender-Einbindung ist im Bestand bereits durch die direkten Wege ersetzt – es lädt
// nichts von außen, eine Einwilligung ist hier nicht nötig (Verhalten unverändert). Serverkomponente ohne Zustand.
// Sprungziel ohne eigenes scroll-mt (scroll-padding-top in globals.css) und ohne spaet (R-01a, Werkstatt-Mantel).
import Abschnitt from '@/components/kern/Abschnitt';
import Knopf from '@/components/kern/Knopf';
import Icon from '@/components/icons/Icon';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import { COMPANY_DATA } from '@/config/company';

// Zeitangabe mit Zusatz in Klammern: der Zusatz bricht mobil als Ganzes um, nicht am Bindestrich (Wortlaut unverändert)
function mitZusatz(text) {
    const i = text.indexOf(' (');
    if (i < 0) return text;
    return (
        <>
            {text.slice(0, i)} <span className="whitespace-nowrap">{text.slice(i + 1)}</span>
        </>
    );
}

const CalendlySection = () => {
    const { contact, hours, owner } = COMPANY_DATA;

    const channels = [
        {
            zeichen: <Icon name="telefon" groesse={6} className="text-tinte-2" />,
            label: 'Telefon',
            value: contact.phone,
            href: `tel:${contact.phoneLink}`
        },
        {
            zeichen: <WhatsAppLogo className="size-6 shrink-0" />,
            label: 'WhatsApp',
            value: contact.whatsapp,
            href: contact.whatsappLink,
            external: true
        },
        {
            zeichen: <Icon name="mail" groesse={6} className="text-tinte-2" />,
            label: 'E-Mail',
            value: contact.email,
            href: `mailto:${contact.email}?subject=${encodeURIComponent('Terminanfrage Beratung / Vor-Ort-Aufmaß')}`
        }
    ];

    return (
        <Abschnitt
            art="arbeit"
            id="booking"
            titelId="booking-heading"
            titel="Termin vereinbaren"
            einleitung={
                <p>
                    {/* „E-Mail“ bricht nicht am Bindestrich (Wortlaut unverändert) */}
                    Rufen Sie uns an, schreiben Sie per WhatsApp oder senden Sie eine <span className="whitespace-nowrap">E-Mail</span> – {owner.fullName} stimmt
                    Ihren Wunschtermin für Beratung und kostenfreies Vor-Ort-Aufmaß persönlich mit Ihnen ab.
                </p>
            }
        >
            <div className="border border-fuge bg-fliese">
                {/* Wege an der Fuge: mobil als Zeilen (Zeichen · Etikett über Wert · Richtung), ab md als Felder nebeneinander
                    (Zeichen und Richtung oben, darunter Etikett in Mono über dem Wert); Unterstreichung dunkelt bei Hover */}
                <ul className="grid grid-cols-1 gap-px bg-fuge md:grid-cols-3">
                    {channels.map(({ zeichen, label, value, href, external }) => {
                        const richtung = <Icon name={external ? 'link-extern' : 'pfeil-rechts'} groesse={5} className="text-tinte-2" />;
                        return (
                            <li key={label} className="bg-fliese">
                                <a
                                    href={href}
                                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                    className="group flex h-full min-h-11 items-center gap-4 px-4 py-4 text-tinte sm:px-6 md:flex-col md:items-stretch md:px-4 md:py-6 lg:px-6"
                                >
                                    <span className="flex items-center justify-between gap-4">
                                        {zeichen}
                                        <span className="hidden md:flex">{richtung}</span>
                                    </span>
                                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                                        <span className="font-mono text-fs-1 text-tinte-2">{label}</span>
                                        <span className="font-mono text-fs-3 underline decoration-strich underline-offset-4 group-hover:decoration-tinte">
                                            {value}
                                        </span>
                                    </span>
                                    <span className="flex md:hidden">{richtung}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>

                {/* Leiste: Erreichbarkeit links, Hauptknopf rechts (mobil darunter, volle Breite) */}
                <div className="flex flex-col gap-6 border-t border-fuge px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between md:px-4 lg:px-6">
                    <div className="flex items-start gap-4 text-fs-2 text-tinte">
                        <Icon name="uhr" groesse={5} className="mt-1 text-tinte-2" />
                        <div>
                            <p className="font-semibold">Erreichbarkeit</p>
                            <p className="mt-1 font-mono">{hours.formattedWeekdays}</p>
                            <p className="font-mono">{mitZusatz(hours.formattedSaturday)}</p>
                        </div>
                    </div>
                    <Knopf href="/kontakt#express-anfrage" icon="pfeil-rechts" className="w-full md:w-auto md:shrink-0">
                        Express-Anfrage stellen
                    </Knopf>
                </div>
            </div>
        </Abschnitt>
    );
};

export default CalendlySection;
