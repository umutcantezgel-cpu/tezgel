import Link from 'next/link';
import { ArrowRight, Phone, Info, BadgePercent, MessageCircle, Send, CheckCircle2, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { inputClass } from './stile';

// Zusammenfassung, Musterbad, Zuschuss und Anfrage (Formular, Erfolg, Fehler) (E-011: aus BadProjektCheck.jsx verschoben, Markup unverändert).
export default function Zusammenfassung({ sqmLabel, scopeLabel, tierLabel, extras, matchingBath, contactOpen, setContactOpen, sentVia, setSentVia, referenceId, handleNewRequest, leadData, setLeadData, isSubmitting, errorMessage, handleLeadSubmit }) {
    return (
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200">
            <div className="space-y-4">
                <span className="eyebrow eyebrow-sky">
                    <Info className="w-3.5 h-3.5" />
                    Ihre Zusammenfassung
                </span>

                <dl aria-live="polite" className="p-4 rounded-2xl bg-white border border-slate-200 text-xs divide-y divide-slate-100">
                    {[
                        ['Badgröße', `ca. ${sqmLabel} m²`],
                        ['Umfang', scopeLabel],
                        ['Ausstattung', tierLabel],
                        ['Wünsche', extras.join(', ') || 'Keine Extras gewählt']
                    ].map(([term, value]) => (
                        <div key={term} className="flex justify-between gap-3 py-2 first:pt-0 last:pb-0">
                            <dt className="font-bold text-slate-600 shrink-0">{term}</dt>
                            <dd className="font-bold text-slate-900 text-right">{value}</dd>
                        </div>
                    ))}
                </dl>
                <p className="text-xs text-slate-600">
                    Jedes Bad ist anders: Untergrund, Leitungswege und Materialwahl entscheiden über den Aufwand. Den
                    verbindlichen Festpreis erhalten Sie deshalb nach dem kostenfreien Vor-Ort-Aufmaß.
                </p>

                {/* Reference to exact Musterbad */}
                <div className="p-3.5 rounded-tile-sm bg-white border border-slate-200 space-y-1 text-xs">
                    <p className="font-bold text-slate-900 flex items-center justify-between gap-2">
                        <span>Musterbad-Vergleich:</span>
                        <Link href="/bad/musterbaeder" className="text-orange-600 hover:text-orange-700 hover:underline underline-offset-2 font-bold inline-flex items-center gap-1">
                            Katalog
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </p>
                    <p className="text-slate-700">
                        Passend:{' '}
                        <Link
                             href={`/bad/musterbaeder/${matchingBath.slug}`}
                             className="font-bold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2"
                         >
                             {matchingBath.label}
                         </Link>
                     </p>
                </div>

                {/* Subsidies banner */}
                <div className="p-3.5 rounded-tile-sm bg-sky-50 border border-sky-200 text-xs space-y-1 text-slate-700">
                    <p className="font-bold text-slate-900 flex items-center gap-1.5">
                        <BadgePercent className="w-4 h-4 text-sky-600" />
                        Bis zu 4.180 € Pflegekassen-Zuschuss
                    </p>
                    <p>
                        Bei Pflegegrad für barrierefreie Bäder nach DIN 18040-2.{' '}
                        <Link href="/bad/barrierefreies-bad" className="font-bold text-sky-800 hover:underline underline-offset-2">
                            Details zum barrierefreien Bad &amp; Zuschüssen
                        </Link>
                    </p>
                </div>
            </div>

            {/* Action Block */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
                {!contactOpen ? (
                    <button
                        type="button"
                        onClick={() => setContactOpen(true)}
                        className="btn-primary w-full text-xs"
                    >
                        Angebot mit Festpreis anfordern
                        <ArrowRight className="w-4 h-4" />
                    </button>
                ) : sentVia === 'online' ? (
                    <div className="p-4 rounded-tile-sm bg-orange-50 border border-orange-200 text-orange-950 text-xs space-y-3" role="status">
                        <div className="flex items-center justify-between gap-2">
                            <p className="font-black flex items-center gap-1.5 text-sm text-slate-900">
                                <CheckCircle2 className="w-4 h-4 text-orange-600" />
                                Projektcheck übermittelt
                            </p>
                            {referenceId && (
                                <span className="px-2 py-0.5 bg-white border border-orange-300 rounded font-mono text-[11px] font-bold text-slate-800">
                                    {referenceId}
                                </span>
                            )}
                        </div>
                        <p className="text-slate-700 leading-relaxed">
                            Vielen Dank, <strong>{leadData.name}</strong>! Ihre Projektangaben für ca. {sqmLabel} m² ({scopeLabel}) sind direkt bei Herrn Deniz Tezgel eingegangen.
                            {leadData.email && (
                                <span className="block mt-1 text-orange-800 font-semibold">
                                    ✉️ Eine Bestätigung wurde an <em>{leadData.email}</em> gesendet.
                                </span>
                            )}
                        </p>
                        <div className="p-2.5 rounded-lg bg-white border border-orange-200 text-[11px] text-slate-600 space-y-1">
                            <strong className="text-slate-900 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                                Nächste Schritte:
                            </strong>
                            <p>1. Herr Tezgel prüft Ihre Angaben &amp; Materialbedarf.</p>
                            <p>2. Rückruf binnen 24–48 Std. zur Vor-Ort-Aufmaß-Abstimmung.</p>
                        </div>
                        <button
                            type="button"
                            onClick={handleNewRequest}
                            className="font-bold text-orange-600 hover:text-orange-700 underline underline-offset-2"
                        >
                            Erneut anfragen oder anpassen
                        </button>
                    </div>
                ) : sentVia === 'whatsapp' ? (
                    <div className="p-4 rounded-tile-sm bg-orange-50 border border-orange-200 text-orange-950 text-xs space-y-2" role="status">
                        <p className="font-black flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-orange-600" />
                            WhatsApp wurde geöffnet
                        </p>
                        <p className="text-slate-700">
                            Bitte senden Sie die vorbereitete Nachricht mit Ihren Angaben dort ab – erst dann erreicht sie uns.
                        </p>
                        <button
                            type="button"
                            onClick={() => setSentVia(null)}
                            className="font-bold text-orange-600 hover:text-orange-700 underline underline-offset-2"
                        >
                            Erneut senden oder Kanal wechseln
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleLeadSubmit} className="space-y-2.5">
                        {errorMessage && (
                            <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                                <span>{errorMessage}</span>
                            </div>
                        )}

                        <label htmlFor="budget-lead-name" className="sr-only">Ihr Name</label>
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
                        <label htmlFor="budget-lead-phone" className="sr-only">Ihre Telefonnummer</label>
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
                        <label htmlFor="budget-lead-email" className="sr-only">Ihre E-Mail-Adresse (optional)</label>
                        <input
                            id="budget-lead-email"
                            type="email"
                            autoComplete="email"
                            placeholder="Ihre E-Mail-Adresse (optional für Bestätigung)"
                            value={leadData.email}
                            onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                            className={inputClass}
                        />
                        <button
                            type="submit"
                            name="channel"
                            value="online"
                            disabled={isSubmitting}
                            className="btn-primary w-full text-xs flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    Wird übertragen …
                                </>
                            ) : (
                                <>
                                    <Send className="w-3.5 h-3.5" />
                                    Online anfragen (mit E-Mail-Bestätigung)
                                </>
                            )}
                        </button>
                        <button
                            type="submit"
                            name="channel"
                            value="whatsapp"
                            disabled={isSubmitting}
                            className="glass-button-whatsapp w-full text-xs"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Anfrage per WhatsApp senden
                        </button>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                            Ihre Angaben werden nur zur Bearbeitung Ihrer Anfrage verwendet.{' '}
                            <Link href="/datenschutz" className="font-bold text-orange-600 underline underline-offset-2 hover:text-orange-700">
                                Datenschutz
                            </Link>
                        </p>
                    </form>
                )}

                <a
                    href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                    className="btn-ghost w-full text-xs"
                >
                    <Phone className="w-3.5 h-3.5 text-orange-600" />
                    Sofort anrufen: {COMPANY_DATA.contact.phone}
                </a>
            </div>
        </div>
    );
}
