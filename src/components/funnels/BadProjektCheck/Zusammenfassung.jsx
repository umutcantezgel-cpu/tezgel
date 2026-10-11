import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Hinweis from '@/components/kern/Hinweis';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen, knopfKlassen, labelKlassen, linkKlassen, pflichtKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';
import { inputClass } from './stile';

// Zusammenfassung, Musterbad, Zuschuss und Anfrage (Formular, Erfolg, Fehler) (E-011: aus BadProjektCheck.jsx verschoben).
// E3-BAU-19: Darstellung nach dem KERN-Formularmuster. Infokästen als Hinweis; Erfolg als Hinweis art="erfolg" mit role="status";
// WhatsApp-Zustand als Hinweis art="merk" (die Anfrage ist mit dem Öffnen von WhatsApp noch nicht zugestellt); Sendefehler als
// Hinweis art="fehler" mit role="alert". Beschriftungen stehen sichtbar über den Feldern (bisher nur für Screenreader), Wortlaut gleich.
// Mikrotext (freigegeben): Die Bestätigungszeile steht ohne vorangestelltes Briefsymbol (wie E3-BAU-18).
export default function Zusammenfassung({ sqmLabel, scopeLabel, tierLabel, extras, matchingBath, contactOpen, setContactOpen, sentVia, setSentVia, referenceId, handleNewRequest, leadData, setLeadData, isSubmitting, errorMessage, handleLeadSubmit }) {
    return (
        <div className="flex min-w-0 flex-col justify-between gap-8 border border-fuge bg-kalk p-6 sm:p-8 lg:col-span-5">
            <div className="flex flex-col gap-6">
                <span className={etikettKlassen}>
                    <Fugenkreuz className="size-3 text-strich" />
                    Ihre Zusammenfassung
                </span>

                <dl aria-live="polite" className="divide-y divide-fuge border border-fuge bg-fliese px-4 text-fs-2">
                    {[
                        ['Badgröße', `ca. ${sqmLabel} m²`],
                        ['Umfang', scopeLabel],
                        ['Ausstattung', tierLabel],
                        ['Wünsche', extras.join(', ') || 'Keine Extras gewählt']
                    ].map(([term, value]) => (
                        <div key={term} className="flex flex-col gap-1 py-2 sm:flex-row sm:justify-between sm:gap-3">
                            <dt className="shrink-0 text-tinte-2">{term}</dt>
                            <dd className="break-words font-semibold text-tinte sm:text-right">{value}</dd>
                        </div>
                    ))}
                </dl>
                <p className="text-fs-2 text-tinte-2">
                    Jedes Bad ist anders: Untergrund, Leitungswege und Materialwahl entscheiden über den Aufwand. Den
                    verbindlichen Festpreis erhalten Sie deshalb nach dem kostenfreien Vor-Ort-Aufmaß.
                </p>

                {/* Reference to exact Musterbad */}
                <Hinweis art="merk">
                    <p className="flex items-center justify-between gap-2 font-semibold text-tinte">
                        <span>Musterbad-Vergleich:</span>
                        <Link href="/bad/musterbaeder" className={`${linkKlassen} inline-flex items-center gap-1 font-semibold`}>
                            Katalog
                            <Icon name="pfeil-rechts" groesse={4} />
                        </Link>
                    </p>
                    <p className="mt-2">
                        Passend:{' '}
                        <Link href={`/bad/musterbaeder/${matchingBath.slug}`} className={`${linkKlassen} font-semibold`}>
                            {matchingBath.label}
                        </Link>
                    </p>
                </Hinweis>

                {/* Subsidies banner */}
                <Hinweis art="merk">
                    <p className="font-semibold text-tinte">Bis zu 4.180 € Pflegekassen-Zuschuss</p>
                    <p className="mt-2">
                        Bei Pflegegrad für barrierefreie Bäder nach DIN 18040-2.{' '}
                        <Link href="/bad/barrierefreies-bad" className={`${linkKlassen} font-semibold`}>
                            Details zum barrierefreien Bad &amp; Zuschüssen
                        </Link>
                    </p>
                </Hinweis>
            </div>

            {/* Action Block */}
            <div className="flex flex-col gap-4 border-t border-fuge pt-6">
                {!contactOpen ? (
                    <Knopf onClick={() => setContactOpen(true)} icon="pfeil-rechts" className="w-full">
                        Angebot mit Festpreis anfordern
                    </Knopf>
                ) : sentVia === 'online' ? (
                    <Hinweis art="erfolg" rolle="status">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="font-semibold text-tinte">Projektcheck übermittelt</p>
                            {referenceId && (
                                <span className="border border-fuge bg-kalk px-2 py-1 font-mono text-fs-1 text-tinte">
                                    {referenceId}
                                </span>
                            )}
                        </div>
                        <p className="mt-2">
                            Vielen Dank, <strong className="font-semibold text-tinte">{leadData.name}</strong>! Ihre Projektangaben für ca. {sqmLabel} m² ({scopeLabel}) sind direkt bei Herrn Deniz Tezgel eingegangen.
                            {leadData.email && (
                                <span className="mt-2 block border-l-2 border-tinte pl-4 text-tinte">
                                    Eine Bestätigung wurde an <em>{leadData.email}</em> gesendet.
                                </span>
                            )}
                        </p>
                        <div className="mt-4 border-t border-fuge pt-4 text-fs-1 text-tinte-2">
                            <strong className="font-semibold text-tinte">Nächste Schritte:</strong>
                            <p className="mt-2">1. Herr Tezgel prüft Ihre Angaben &amp; Materialbedarf.</p>
                            <p>2. Rückruf binnen 24–48 Std. zur Vor-Ort-Aufmaß-Abstimmung.</p>
                        </div>
                        <button
                            type="button"
                            onClick={handleNewRequest}
                            className={knopfKlassen('text', 'mt-4')}
                            data-motion="druck"
                        >
                            Erneut anfragen oder anpassen
                        </button>
                    </Hinweis>
                ) : sentVia === 'whatsapp' ? (
                    <Hinweis art="merk" rolle="status">
                        <p className="font-semibold text-tinte">WhatsApp wurde geöffnet</p>
                        <p className="mt-2">
                            Bitte senden Sie die vorbereitete Nachricht mit Ihren Angaben dort ab – erst dann erreicht sie uns.
                        </p>
                        <button
                            type="button"
                            onClick={() => setSentVia(null)}
                            className={knopfKlassen('text', 'mt-4')}
                            data-motion="druck"
                        >
                            Erneut senden oder Kanal wechseln
                        </button>
                    </Hinweis>
                ) : (
                    <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
                        {errorMessage && (
                            <Hinweis art="fehler" rolle="alert">
                                {errorMessage}
                            </Hinweis>
                        )}

                        <div>
                            <div className="flex items-baseline">
                                <label htmlFor="budget-lead-name" className={labelKlassen}>
                                    Ihr Name
                                </label>
                                <span aria-hidden="true" className={pflichtKlassen}>*</span>
                            </div>
                            <input
                                id="budget-lead-name"
                                type="text"
                                required
                                autoComplete="name"
                                placeholder="Ihr Name *"
                                value={leadData.name}
                                onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <div className="flex items-baseline">
                                <label htmlFor="budget-lead-phone" className={labelKlassen}>
                                    Ihre Telefonnummer
                                </label>
                                <span aria-hidden="true" className={pflichtKlassen}>*</span>
                            </div>
                            <input
                                id="budget-lead-phone"
                                type="tel"
                                required
                                minLength={6}
                                autoComplete="tel"
                                placeholder="Ihre Telefonnummer *"
                                value={leadData.phone}
                                onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label htmlFor="budget-lead-email" className={labelKlassen}>
                                Ihre E-Mail-Adresse (optional)
                            </label>
                            <input
                                id="budget-lead-email"
                                type="email"
                                autoComplete="email"
                                placeholder="Ihre E-Mail-Adresse (optional für Bestätigung)"
                                value={leadData.email}
                                onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                                className={inputClass}
                            />
                        </div>

                        <div className="flex flex-col gap-3 border-t border-fuge pt-6">
                            <button
                                type="submit"
                                name="channel"
                                value="online"
                                disabled={isSubmitting}
                                className={knopfKlassen('haupt', 'w-full')}
                                data-motion="druck"
                            >
                                {isSubmitting ? (
                                    <span className="flex flex-col items-center gap-2">
                                        <span>Wird übertragen …</span>
                                        <span className="laden-fuge w-16" aria-hidden="true" />
                                    </span>
                                ) : (
                                    <>
                                        <span>Online anfragen (mit E-Mail-Bestätigung)</span>
                                        <Icon name="pfeil-rechts" groesse={5} />
                                    </>
                                )}
                            </button>
                            <button
                                type="submit"
                                name="channel"
                                value="whatsapp"
                                disabled={isSubmitting}
                                className={knopfKlassen('neben', 'w-full')}
                                data-motion="druck"
                            >
                                <Icon name="sprechblase" groesse={5} />
                                <span>Anfrage per WhatsApp senden</span>
                            </button>
                        </div>
                        <p className="flex items-start gap-2 text-fs-1 text-tinte-2">
                            <Icon name="schloss" groesse={4} className="mt-px" />
                            <span>
                                Ihre Angaben werden nur zur Bearbeitung Ihrer Anfrage verwendet.{' '}
                                <Link href="/datenschutz" className={linkKlassen}>
                                    Datenschutz
                                </Link>
                            </span>
                        </p>
                    </form>
                )}

                <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon" className="w-full">
                    Sofort anrufen: {COMPANY_DATA.contact.phone}
                </Knopf>
            </div>
        </div>
    );
}
