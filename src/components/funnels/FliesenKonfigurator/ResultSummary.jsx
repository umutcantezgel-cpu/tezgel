import React from 'react';
import Link from 'next/link';
import { Check, ClipboardList, Info, Ruler } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { buildChecklist, buildSummaryLines, calculateArea, calculateStairs, fmt } from '@/lib/formulare/useFliesenKonfigurator';
import { linkClass } from './stile';

// Ergebnis: Zusammenfassung, Materialbedarf, Checkliste (E-011: aus FliesenKonfigurator.jsx verschoben, unverändert).
export default function ResultSummary({ data }) {
    const summary = buildSummaryLines(data);
    const area = calculateArea(data);
    const stairs = calculateStairs(data);
    const checklist = buildChecklist(data);

    return (
        <div className="space-y-4 text-left">
            <div className="p-5 rounded-tile-md bg-slate-50 border border-slate-200">
                <h4 className="flex items-center gap-2 text-sm font-black text-slate-900 mb-3">
                    <ClipboardList className="w-4 h-4 text-orange-600" aria-hidden="true" />
                    Ihr Projekt in Kürze
                </h4>
                <dl className="grid grid-cols-1 sm:grid-cols-[max-content_1fr] gap-x-4 gap-y-1.5 text-sm">
                    {summary.map(([k, v]) => (
                        <React.Fragment key={k}>
                            <dt className="font-bold text-slate-800">{k}</dt>
                            <dd className="text-slate-700 mb-1 sm:mb-0">{v}</dd>
                        </React.Fragment>
                    ))}
                </dl>
            </div>

            <div className="p-5 rounded-tile-md bg-orange-50 border border-orange-200">
                <h4 className="flex items-center gap-2 text-sm font-black text-slate-900 mb-3">
                    <Ruler className="w-4 h-4 text-orange-600" aria-hidden="true" />
                    Materialbedarf (Richtwert)
                </h4>
                <ul className="space-y-2 text-sm text-slate-700">
                    {area && area.valid && (
                        <li>
                            <strong className="text-slate-900">Fläche:</strong> {fmt(area.net)} m² netto. Mit einem Verschnitt von
                            ca. {area.pattern.min}–{area.pattern.max} % ({area.pattern.label}) ergibt sich ein Richtwert von{' '}
                            <strong className="text-orange-950 tabular-nums">ca. {fmt(area.low)}–{fmt(area.high)} m²</strong>.
                        </li>
                    )}
                    {area && !area.valid && (
                        <li>
                            <strong className="text-slate-900">Fläche:</strong> Noch keine m²-Angabe – die Fläche wird beim Aufmaß ermittelt.
                        </li>
                    )}
                    {area && area.skirting && (
                        <li>
                            <strong className="text-slate-900">Sockel:</strong> ca. {fmt(area.skirting)} laufende Meter (separat, ohne Zuschlag).
                        </li>
                    )}
                    {stairs && stairs.valid && (
                        <li>
                            <strong className="text-slate-900">Treppe (netto):</strong> Trittstufen {fmt(stairs.treadArea, 2)} m²
                            {stairs.withRisers && <> + Setzstufen {fmt(stairs.riserArea, 2)} m²</>} ={' '}
                            <strong className="text-orange-950 tabular-nums">{fmt(stairs.total, 2)} m²</strong>. Bei Treppen nennen wir
                            bewusst keinen Verschnittzuschlag, weil er stark von Format und Stufenmaß abhängt.
                        </li>
                    )}
                    {stairs && !stairs.valid && (
                        <li>
                            <strong className="text-slate-900">Treppe:</strong> {stairs.reason}
                        </li>
                    )}
                </ul>
                <p className="mt-3 text-xs text-slate-700 leading-relaxed">
                    Alle Mengen sind reine Orientierungswerte. Die tatsächliche Menge ermittelt {COMPANY_DATA.owner.fullName} beim
                    kostenfreien Vor-Ort-Aufmaß – dort werden auch Treppensockel, Anschlüsse und Zuschnitte festgelegt.
                </p>
            </div>

            {checklist.length > 0 && (
                <div className="p-5 rounded-tile-md bg-sky-50 border border-sky-200">
                    <h4 className="flex items-center gap-2 text-sm font-black text-slate-900 mb-3">
                        <Info className="w-4 h-4 text-sky-600" aria-hidden="true" />
                        Das prüfen wir vorab
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                        {checklist.map((item) => (
                            <li key={item.text} className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" aria-hidden="true" />
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
