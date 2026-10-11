import React from 'react';
import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import { COMPANY_DATA } from '@/config/company';
import { buildChecklist, buildSummaryLines, calculateArea, calculateStairs, fmt } from '@/lib/formulare/useFliesenKonfigurator';
import { linkClass } from './stile';

// Ergebnis: Zusammenfassung, Materialbedarf, Checkliste (E-011: aus FliesenKonfigurator.jsx verschoben, unverändert).
// E3-BAU-14: Darstellung nach KERN („Fuge statt Karte“): ein Feld, die Abschnitte durch 1-px-Fugen getrennt, Icons aus
// der Icon-Familie; Texte, Zeilen, Rechnung und Prüfliste unverändert.
export default function ResultSummary({ data }) {
    const summary = buildSummaryLines(data);
    const area = calculateArea(data);
    const stairs = calculateStairs(data);
    const checklist = buildChecklist(data);

    return (
        <div className="border border-fuge bg-kalk text-left">
            <div className="p-4">
                <h4 className="mb-3 flex items-center gap-2 text-fs-3 font-semibold text-tinte">
                    <Icon name="dokument" groesse={4} />
                    Ihr Projekt in Kürze
                </h4>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-1 text-fs-2 sm:grid-cols-3 sm:gap-y-2">
                    {summary.map(([k, v]) => (
                        <React.Fragment key={k}>
                            <dt className="font-semibold text-tinte">{k}</dt>
                            <dd className="mb-2 text-tinte-2 sm:col-span-2 sm:mb-0">{v}</dd>
                        </React.Fragment>
                    ))}
                </dl>
            </div>

            <div className="border-t border-fuge p-4">
                <h4 className="mb-3 flex items-center gap-2 text-fs-3 font-semibold text-tinte">
                    <Icon name="aufmass" groesse={4} />
                    Materialbedarf (Richtwert)
                </h4>
                <ul className="space-y-2 text-fs-2 text-tinte-2">
                    {area && area.valid && (
                        <li>
                            <strong className="font-semibold text-tinte">Fläche:</strong> {fmt(area.net)} m² netto. Mit einem Verschnitt von
                            ca. {area.pattern.min}–{area.pattern.max} % ({area.pattern.label}) ergibt sich ein Richtwert von{' '}
                            <strong className="font-semibold tabular-nums text-tinte">ca. {fmt(area.low)}–{fmt(area.high)} m²</strong>.
                        </li>
                    )}
                    {area && !area.valid && (
                        <li>
                            <strong className="font-semibold text-tinte">Fläche:</strong> Noch keine m²-Angabe – die Fläche wird beim Aufmaß ermittelt.
                        </li>
                    )}
                    {area && area.skirting && (
                        <li>
                            <strong className="font-semibold text-tinte">Sockel:</strong> ca. {fmt(area.skirting)} laufende Meter (separat, ohne Zuschlag).
                        </li>
                    )}
                    {stairs && stairs.valid && (
                        <li>
                            <strong className="font-semibold text-tinte">Treppe (netto):</strong> Trittstufen {fmt(stairs.treadArea, 2)} m²
                            {stairs.withRisers && <> + Setzstufen {fmt(stairs.riserArea, 2)} m²</>} ={' '}
                            <strong className="font-semibold tabular-nums text-tinte">{fmt(stairs.total, 2)} m²</strong>. Bei Treppen nennen wir
                            bewusst keinen Verschnittzuschlag, weil er stark von Format und Stufenmaß abhängt.
                        </li>
                    )}
                    {stairs && !stairs.valid && (
                        <li>
                            <strong className="font-semibold text-tinte">Treppe:</strong> {stairs.reason}
                        </li>
                    )}
                </ul>
                <p className="mt-3 text-fs-1 text-tinte-2">
                    Alle Mengen sind reine Orientierungswerte. Die tatsächliche Menge ermittelt {COMPANY_DATA.owner.fullName} beim
                    kostenfreien Vor-Ort-Aufmaß – dort werden auch Treppensockel, Anschlüsse und Zuschnitte festgelegt.
                </p>
            </div>

            {checklist.length > 0 && (
                <div className="border-t border-fuge p-4">
                    <h4 className="mb-3 flex items-center gap-2 text-fs-3 font-semibold text-tinte">
                        <Icon name="info" groesse={4} />
                        Das prüfen wir vorab
                    </h4>
                    <ul className="space-y-2 text-fs-2 text-tinte-2">
                        {checklist.map((item) => (
                            <li key={item.text} className="flex items-start gap-2">
                                <Icon name="haken" groesse={4} className="mt-px text-tinte" />
                                <span>
                                    {item.text}{' '}
                                    <Link href={item.href} className={linkClass}>
                                        {item.label}
                                    </Link>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
