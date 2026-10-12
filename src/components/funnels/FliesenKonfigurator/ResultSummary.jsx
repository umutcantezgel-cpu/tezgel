import Link from 'next/link';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Icon from '@/components/icons/Icon';
import { COMPANY_DATA } from '@/config/company';
import { buildChecklist, buildSummaryLines, calculateArea, calculateStairs, fmt } from '@/lib/formulare/useFliesenKonfigurator';
import { linkClass } from './stile';

// Ergebnis als Schriftfeld an der Fuge (F-06, Fusion E-039; Grundgerüst B): drei Felder in einem Raster mit 1-px-Fugen –
// Projekt in Kürze (Begriff in Mono über bzw. neben dem Wert), Materialbedarf auf Kalk (Zahlen mit Einheit in Mono, ohne
// Umbruch zwischen Zahl und Einheit) und Prüfliste (Fugenkreuz als Marke). Fließtext und Fußnote im Zeilenmaß max-w-mass (A).
// Rechnung, Zeilen und Wortlaut aus dem Hook bzw. wie im Bestand; Überschriften h4.
// Spalten nach Behälterbreite: Projekt und Materialbedarf ab 56 rem nebeneinander, die Prüfliste darunter über beide.
const FELD = 'flex min-w-0 flex-col gap-4 p-4 @xl:p-6';
const KOPF = 'flex items-center gap-2 text-fs-4 text-tinte';

export default function ResultSummary({ data }) {
    const summary = buildSummaryLines(data);
    const area = calculateArea(data);
    const stairs = calculateStairs(data);
    const checklist = buildChecklist(data);

    return (
        <div className="grid grid-cols-1 gap-px border border-fuge bg-fuge text-left @4xl:grid-cols-2">
            <div className={`${FELD} bg-fliese`}>
                <h4 className={KOPF}>
                    <Icon name="dokument" groesse={5} />
                    Ihr Projekt in Kürze
                </h4>
                <dl className="border-t border-fuge">
                    {summary.map(([k, v]) => (
                        <div key={k} className="flex flex-col gap-1 border-b border-fuge py-2 @xl:flex-row @xl:items-baseline @xl:gap-4">
                            <dt className="font-mono text-fs-1 text-tinte-2 @xl:w-2/5 @xl:shrink-0">{k}</dt>
                            <dd className="min-w-0 flex-1 font-text text-fs-2 text-tinte">{v}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <div className={`${FELD} bg-kalk`}>
                <h4 className={KOPF}>
                    <Icon name="aufmass" groesse={5} />
                    Materialbedarf (Richtwert)
                </h4>
                <ul className="flex max-w-mass flex-col gap-2 font-text text-fs-2 text-tinte-2">
                    {area && area.valid && (
                        <li>
                            <strong className="font-semibold text-tinte">Fläche:</strong> <span className="whitespace-nowrap font-mono">{fmt(area.net)} m²</span> netto. Mit einem Verschnitt von
                            ca. <span className="whitespace-nowrap font-mono">{area.pattern.min}–{area.pattern.max} %</span> ({area.pattern.label}) ergibt sich ein Richtwert von{' '}
                            <strong className="font-mono font-normal text-tinte">ca. <span className="whitespace-nowrap">{fmt(area.low)}–{fmt(area.high)} m²</span></strong>.
                        </li>
                    )}
                    {area && !area.valid && (
                        <li>
                            <strong className="font-semibold text-tinte">Fläche:</strong> Noch keine m²-Angabe – die Fläche wird beim Aufmaß ermittelt.
                        </li>
                    )}
                    {area && area.skirting && (
                        <li>
                            <strong className="font-semibold text-tinte">Sockel:</strong> ca. <span className="whitespace-nowrap font-mono">{fmt(area.skirting)}</span> laufende Meter (separat, ohne Zuschlag).
                        </li>
                    )}
                    {stairs && stairs.valid && (
                        <li>
                            <strong className="font-semibold text-tinte">Treppe (netto):</strong> Trittstufen <span className="whitespace-nowrap font-mono">{fmt(stairs.treadArea, 2)} m²</span>
                            {stairs.withRisers && <> + Setzstufen <span className="whitespace-nowrap font-mono">{fmt(stairs.riserArea, 2)} m²</span></>} ={' '}
                            <strong className="whitespace-nowrap font-mono font-normal text-tinte">{fmt(stairs.total, 2)} m²</strong>. Bei Treppen nennen wir
                            bewusst keinen Verschnittzuschlag, weil er stark von Format und Stufenmaß abhängt.
                        </li>
                    )}
                    {stairs && !stairs.valid && (
                        <li>
                            <strong className="font-semibold text-tinte">Treppe:</strong> {stairs.reason}
                        </li>
                    )}
                </ul>
                <p className="max-w-mass border-t border-fuge pt-4 font-text text-fs-1 text-tinte-2">
                    Alle Mengen sind reine Orientierungswerte. Die tatsächliche Menge ermittelt {COMPANY_DATA.owner.fullName} beim
                    kostenfreien Vor-Ort-Aufmaß – dort werden auch Treppensockel, Anschlüsse und Zuschnitte festgelegt.
                </p>
            </div>

            {checklist.length > 0 && (
                <div className={`${FELD} bg-fliese @4xl:col-span-2`}>
                    <h4 className={KOPF}>
                        <Icon name="info" groesse={5} />
                        Das prüfen wir vorab
                    </h4>
                    <ul className="grid grid-cols-1 gap-x-6 gap-y-2 font-text text-fs-2 text-tinte-2 @4xl:grid-cols-2">
                        {checklist.map((item) => (
                            <li key={item.text} className="flex max-w-mass items-start gap-3">
                                <Fugenkreuz className="mt-2 size-3 text-strich" />
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
