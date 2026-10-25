import Icon from '@/components/icons/Icon';
import Knopf from '@/components/kern/Knopf';
import Rufnummer from '@/components/kern/Rufnummer';
import { etikettKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';
import { labelOf, ROOM_OPTIONS } from '@/lib/formulare/useFliesenKonfigurator';
import ResultSummary from './ResultSummary';

// Erfolgsansicht nach dem Absenden (F-06, Fusion E-039; Grundgerüst B, wie die Erfolgsansicht der Express-Anfrage): Haken
// und Text im Etikett, Vorgangsnummer in Mono, Ergebnis als Schriftfeld, Telefonnummer in Mono, Anrufen als Hauptknopf.
// Die Dankeszeile in der größeren Stufe von A (text-fs-6, die Stufe der Arbeitsansicht) als Blickfang. Texte und Verhalten
// unverändert; das Brief-Emoji vor der Bestätigungszeile ist durch das Mail-Zeichen ersetzt (Emojis sind im KERN ausgeschlossen).
export default function Erfolg({ data, referenceId, handleNewRequest }) {
    const roomsText = data.rooms.map((id) => labelOf(ROOM_OPTIONS, id)).join(', ') || 'Fliesenprojekt';
    return (
        <div className="@container">
            <div className="border border-strich bg-fliese p-6 @xl:p-8 @4xl:p-12" role="status">
                <div className="flex flex-wrap items-center gap-3">
                    <span className={etikettKlassen}>
                        <Icon name="haken" groesse={4} className="text-abnahme" />
                        Konfiguration erfolgreich übermittelt
                    </span>
                    {referenceId && (
                        <span className="border border-fuge bg-kalk px-2 py-1 font-mono text-fs-1 text-tinte">
                            Vorgangsnummer: {referenceId}
                        </span>
                    )}
                </div>
                <p className="mt-6 font-anzeige text-fs-6 font-semibold text-tinte">
                    Vielen Dank, {data.name}!
                </p>
                <p className="mt-4 max-w-mass font-text text-fs-3 text-tinte-2">
                    Ihre Konfiguration für <strong className="font-semibold text-tinte">{roomsText}</strong> ist erfolgreich bei Fliesenverlegung Tezgel eingegangen.
                    {data.email && (
                        <span className="mt-3 flex items-start gap-2 border-l-2 border-tinte pl-4 text-fs-2 text-tinte">
                            <Icon name="mail" groesse={4} className="mt-1" />
                            <span>
                                Eine ausführliche Bestätigung mit allen Angaben und Materialschätzungen wurde an <em>{data.email}</em> gesendet.
                            </span>
                        </span>
                    )}
                </p>

                <div className="mt-8 border-t border-fuge pt-6 font-text text-fs-2 text-tinte-2">
                    <div className="flex items-center gap-2 font-semibold text-tinte">
                        <Icon name="uhr" groesse={4} />
                        Nächste Schritte:
                    </div>
                    <p className="mt-2 max-w-mass">
                        1. Inhaber Deniz Tezgel prüft Ihre Raum- und Materialangaben sowie Machbarkeit und Vorarbeiten.<br />
                        2. Wir melden uns binnen <strong className="font-semibold text-tinte">24 bis 48 Stunden</strong> telefonisch, um vorab alles zu klären und den Termin abzusprechen.<br />
                        3. Kostenfreier Termin bei Ihnen vor Ort für Ihr verbindliches Festpreisangebot.
                    </p>
                </div>

                <div className="mt-8">
                    <ResultSummary data={data} />
                </div>

                <div className="mt-8 flex flex-col items-stretch gap-3 @xl:flex-row @xl:items-center">
                    <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} iconLinks="telefon" className="text-center">
                        Direkt anrufen: <Rufnummer />
                    </Knopf>
                    <Knopf variante="neben" onClick={handleNewRequest}>
                        Neue Konfiguration starten
                    </Knopf>
                </div>
            </div>
        </div>
    );
}
