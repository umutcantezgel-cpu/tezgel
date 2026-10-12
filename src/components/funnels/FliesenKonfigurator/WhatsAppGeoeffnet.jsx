import Icon from '@/components/icons/Icon';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';
import ResultSummary from './ResultSummary';

// Ansicht nach dem Öffnen von WhatsApp (F-06, Fusion E-039; Grundgerüst B, wie die WhatsApp-Ansicht der Express-Anfrage):
// Etikett mit Sprechblase, Hinweis, dass noch nicht gesendet ist, Ergebnis als Schriftfeld, Telefonnummer in Mono, Anrufen
// als Hauptknopf. Texte und Verhalten unverändert.
export default function WhatsAppGeoeffnet({ data, setSentVia }) {
    return (
        <div className="@container">
            <div className="border border-strich bg-fliese p-6 @xl:p-8 @4xl:p-12" role="status">
                <span className={etikettKlassen}>
                    <Icon name="sprechblase" groesse={4} className="text-tinte" />
                    WhatsApp wurde geöffnet
                </span>
                <p className="mt-6 font-anzeige text-fs-5 font-semibold text-tinte">
                    WhatsApp wurde geöffnet – bitte absenden
                </p>
                <p className="mt-4 max-w-mass font-text text-fs-3 text-tinte-2">
                    Ihre Anfrage ist vorbereitet, aber noch nicht verschickt. Senden Sie die Nachricht in{' '}
                    WhatsApp ab. Fotos von Raum, Untergrund oder Treppe
                    können Sie gern per WhatsApp nachsenden. Auf dieser Website wird nichts gespeichert.
                </p>

                <div className="mt-8">
                    <ResultSummary data={data} />
                </div>

                <p className="mt-8 max-w-mass font-text text-fs-3 font-semibold text-tinte">
                    Das verbindliche Festpreisangebot folgt nach dem kostenfreien Vor-Ort-Aufmaß durch {COMPANY_DATA.owner.fullName}.
                </p>

                <div className="mt-6 flex flex-col items-stretch gap-3 @xl:flex-row @xl:items-center">
                    <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} iconLinks="telefon" className="text-center">
                        Direkt anrufen: <span className="whitespace-nowrap font-mono">{COMPANY_DATA.contact.phone}</span>
                    </Knopf>
                    <Knopf variante="neben" onClick={() => setSentVia(null)} iconLinks="pfeil-links">
                        Zurück zur Anfrage
                    </Knopf>
                </div>
            </div>
        </div>
    );
}
