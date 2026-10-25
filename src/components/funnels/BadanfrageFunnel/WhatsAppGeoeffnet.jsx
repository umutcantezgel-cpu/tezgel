import Knopf from '@/components/kern/Knopf';
import { etikettKlassen } from '@/components/kern/stile';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import { COMPANY_DATA } from '@/config/company';
import { feldClass } from './stile';

// Ansicht nach dem Öffnen von WhatsApp (Q-01: Darstellung nach KERN v2 wie die Express-Anfrage; Texte, Überschrift H3
// und Verhalten unverändert). Markenzeichen nur als Logo (K-005), keine grüne Fläche.
// Fusion F-04: Die Überschrift nimmt nach dem Öffnen den Fokus auf (tabIndex -1, siehe index); der Behälter der
// Container-Abfragen ist die Wurzel in index.
export default function WhatsAppGeoeffnet({ handleBackFromWhatsApp, calculatedSqm, scopeTitle }) {
    return (
        <div className={feldClass} role="status">
            <span className={etikettKlassen}>
                <WhatsAppLogo className="size-4 shrink-0" />
                WhatsApp geöffnet
            </span>
            <h3 className="mt-6 text-fs-5 text-tinte" tabIndex={-1} data-fokusziel>
                Fast geschafft. Senden Sie die Nachricht jetzt ab.
            </h3>
            <p className="mt-4 max-w-mass text-fs-3 text-tinte-2">
                Ihre Badanfrage ({calculatedSqm} m² &middot; {scopeTitle}) ist in WhatsApp vorbereitet. Senden Sie die Nachricht einfach ab. {COMPANY_DATA.owner.fullName} meldet sich umgehend bei Ihnen.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 @2xl:flex-row @2xl:items-center">
                <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} iconLinks="telefon">
                    Anrufen: <span className="whitespace-nowrap font-mono">{COMPANY_DATA.contact.phone}</span>
                </Knopf>
                <Knopf variante="neben" onClick={handleBackFromWhatsApp}>
                    Zurück
                </Knopf>
            </div>
        </div>
    );
}
